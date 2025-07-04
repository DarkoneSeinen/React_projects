const gql = require('graphql-tag')
const { books, authors } = require('./data')

let bookData = [...books]
let authorData = [...authors]

const typeDefs = gql`
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => bookData.length,
    authorCount: () => authorData.length,
    allBooks: (root, args) => {
      let filtered = bookData
      if (args.author) {
        filtered = filtered.filter(b => b.author === args.author)
      }
      if (args.genre) {
        filtered = filtered.filter(b => b.genres.includes(args.genre))
      }
      return filtered
    },
    allAuthors: () => authorData
  },

  Author: {
    bookCount: (root) =>
      bookData.filter(b => b.author === root.name).length
  },

  Mutation: {
    addBook: (root, args) => {
      const newBook = { ...args }
      bookData = bookData.concat(newBook)

      if (!authorData.find(a => a.name === args.author)) {
        authorData.push({ name: args.author, born: null })
      }

      return newBook
    },

    editAuthor: (root, args) => {
      const author = authorData.find(a => a.name === args.name)
      if (!author) return null

      const updatedAuthor = { ...author, born: args.setBornTo }
      authorData = authorData.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }
  }
}

module.exports = { typeDefs, resolvers }
