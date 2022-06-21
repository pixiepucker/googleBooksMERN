const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// import typeDefs and resolvers
const { typeDefs, resovlers } = require('./schemas');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
// new ApolloServer
const server = new ApolloServer({
  typeDefs,
  resovlers,
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startApolloServer = async (typeDefs, resovlers) => {
  await server.start();

  server.applyMiddleware({ app });

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.use(routes);

  db.once('open', () => {
    app.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT}`)

      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    );
  });
};

startApolloServer(typeDefs, resolvers);
