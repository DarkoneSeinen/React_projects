// controllers/blogs.js
import express from 'express'
const blogsRouter = express.Router()

blogsRouter.get('/', (req, res) => {
  res.json([{ title: 'Hello Blog', author: 'Admin' }])
})

export default blogsRouter
