require('ts-tiny-invariant');

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const typeDefs = require('./utils/schema');
const resolvers = require('./utils/resolvers');
const TrackAPI = require('./datasources/track-api');

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  dataSources: () => {
    return {
      trackAPI: new TrackAPI(),
    };
  },
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
  console.log(`🚀 Server path is at ${server.graphqlPath}`);
}

startApolloServer();

app.get('/', (req, res) => {
  res.redirect(`${server.graphqlPath}`);
});

module.exports = httpServer;
