const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { typeDefs, resolvers } = require('./schema')

const server = new ApolloServer({
  typeDefs,
  resolvers,
})


startStandaloneServer(server, {
  listen: { port: 4000 },
  cors: {
    origin: '*', // o mejor: origin: 'https://literate-space-trout-979xvx5x4xgwf7vp5-5173.app.github.dev'
  },
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
