const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const {typeDefs} = require('./schema/typeDefs');
const {resolvers} = require('./schema/resolvers');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const schema  = require('./schema/schema');
const {graphqlHTTP} = require('express-graphql');


db.once('open', async () => {
  await startApolloServer();
});

async function startApolloServer() {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: PORT }, resolve));      
  console.log(`🌍 Now listening on localhost:${PORT}`);
  return { server, app };
}
