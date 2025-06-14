import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import config from './utils/config.js'
import logger from './utils/logger.js'
import blogsRouter from './controllers/blogs.js'

const app = express()

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('Error connecting to MongoDB:', err.message))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

export default app
