import app from './app.js'
import http from 'http'
import config from './utils/config.js'
import logger from './utils/logger.js'
import dotenv from 'dotenv'
import cors from 'cors'



const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

dotenv.config()
app.use(cors())


