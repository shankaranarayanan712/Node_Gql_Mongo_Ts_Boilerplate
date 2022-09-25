const dotenv = require('dotenv');
dotenv.config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './graphql/schema';
import { MongoHelper } from './helpers/mongoHelpers';
import { seedData } from './seed';
import { AuthMiddleware } from './middleware/auth.middleware';
const app = express();
const mHelper = new MongoHelper();
const auth = new AuthMiddleware();
mHelper.initiateMongoConnection();

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    return await auth.validateUser(req);
  },
});

app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });

seedData();

const httpServer = createServer(app);

httpServer.listen({ port: process.env.PORT }, (): void =>
  console.log(`\n🚀 GraphQL is now running on http://localhost:${process.env.PORT}/graphql`)
);