import mongoose from 'mongoose'
import config from './utils/config.js' // este ya lo debes tener
import logger from './utils/logger.js' // si lo tienes, si no, usa console.log

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })
