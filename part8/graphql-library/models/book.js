const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  published: Number,
  genres: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
})

module.exports = mongoose.model('Book', bookSchema)