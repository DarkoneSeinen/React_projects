import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import blogsRouter from './controllers/blogs.js'
import config from './utils/config.js'
import logger from './utils/logger.js'
const usersRouter = require('./controllers/users')


mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)


export default app
