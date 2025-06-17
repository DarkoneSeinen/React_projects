import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import blogsRouter from './controllers/blogs.js'
import config from './utils/config.js'
import logger from './utils/logger.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import tokenExtractor from './middleware/tokenExtractor.js'




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
app.use('/api/login', loginRouter)
app.use(tokenExtractor)


export default app
