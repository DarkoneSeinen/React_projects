const books = [
  {
    title: "Clean Code",
    author: "Robert Martin",
    published: 2008,
    genres: ["refactoring"]
  },
  {
    title: "Agile software development",
    author: "Robert Martin",
    published: 2002,
    genres: ["agile", "patterns", "design"]
  },
  {
    title: "Refactoring, edition 2",
    author: "Martin Fowler",
    published: 2018,
    genres: ["refactoring"]
  },
  {
    title: "Refactoring to patterns",
    author: "Joshua Kerievsky",
    published: 2008,
    genres: ["refactoring", "patterns"]
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    author: "Sandi Metz",
    published: 2012,
    genres: ["refactoring", "design"]
  },
  {
    title: "Crime and punishment",
    author: "Fyodor Dostoevsky",
    published: 1866,
    genres: ["classic", "crime"]
  },
  {
    title: "The Demon",
    author: "Fyodor Dostoevsky",
    published: 1872,
    genres: ["classic", "revolution"]
  }
]

const authors = [
  { name: "Robert Martin", born: 1952 },
  { name: "Martin Fowler", born: 1963 },
  { name: "Fyodor Dostoevsky", born: 1821 },
  { name: "Joshua Kerievsky", born: null },
  { name: "Sandi Metz", born: null }
]

module.exports = { books, authors }
