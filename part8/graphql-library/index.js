const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { createServer } = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws') // 👈 Importación correcta
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())

mongoose.connect(process.env.MONGODB_URI)

const schema = makeExecutableSchema({ typeDefs, resolvers })

const httpServer = createServer(app)

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
})

useServer({ schema }, wsServer) // 👈 Llamada correcta

const server = new ApolloServer({ schema })

const start = async () => {
  await server.start()
  app.use('/graphql', express.json(), expressMiddleware(server, {
    context: async ({ req }) => {
      const auth = req?.headers?.authorization
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
      return {}
    },
  }))

  httpServer.listen(4000, () => {
    console.log('✅ Server ready at http://localhost:4000/graphql')
    console.log('✅ Subscriptions ready at ws://localhost:4000/graphql')
  })
}

start()
