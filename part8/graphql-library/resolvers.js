const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (_, args) => {
      return args.genre
        ? Book.find({ genres: { $in: [args.genre] } }).populate('author')
        : Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (_, __, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (_, args, context) => {
      if (!context.currentUser) throw new GraphQLError('Not authenticated')

      let author = await Author.findOne({ name: args.author })
      if (!author) author = new Author({ name: args.author })
      await author.save()

      const book = new Book({ ...args, author: author._id })
      await book.save()
      return book.populate('author')
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
    }
  },

  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root._id })
  },
}

module.exports = resolvers