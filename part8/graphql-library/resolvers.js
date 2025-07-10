const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),

    allBooks: async (_, args) => {
      return args.genre
        ? Book.find({ genres: { $in: [args.genre] } }).populate('author')
        : Book.find({}).populate('author')
    },

    allAuthors: async () => {
      const authors = await Author.find({})
      const bookCounts = await Book.aggregate([
        { $group: { _id: '$author', count: { $sum: 1 } } }
      ])
      const countMap = {}
      bookCounts.forEach(b => {
        countMap[b._id.toString()] = b.count
      })

      return authors.map(author => ({
        ...author.toObject(),
        bookCount: countMap[author._id.toString()] || 0
      }))
    },

    me: (_, __, context) => context.currentUser,
  },

  Author: {
    bookCount: (root) => root.bookCount
  },

  Mutation: {
    addBook: async (_, args, context) => {
      if (!context.currentUser) throw new GraphQLError('Not authenticated')

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const book = new Book({ ...args, author: author._id })
      await book.save()
      const populatedBook = await book.populate('author')

      pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })
      return populatedBook
    },

    editAuthor: async (_, { name, setBornTo }, context) => {
      if (!context.currentUser) throw new GraphQLError('Not authenticated')

      const author = await Author.findOne({ name })
      if (!author) return null
      author.born = setBornTo
      return author.save()
    },

    createUser: async (_, args) => {
      const user = new User(args)
      return await user.save()
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ username })
      if (!user || password !== 'password') throw new GraphQLError('Invalid credentials')

      const userForToken = { username: user.username, id: user._id }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
