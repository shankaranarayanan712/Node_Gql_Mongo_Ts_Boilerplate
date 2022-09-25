const dotenv = require('dotenv');
dotenv.config();

import express from 'express';
const chai = require('chai')
import { ApolloServer, gql } from 'apollo-server-express';
import 'graphql-import-node';
import typeDefs from './schema';
import { makeExecutableSchema } from '@graphql-tools/schema'
import { MongoHelper } from '../../src/helpers/mongoHelpers';
import authResolver from '../../src/graphql/resolvers/auth.resolver';
import bookingResolver from '../../src/graphql/resolvers/booking.resolver';
import carResolver from '../../src/graphql/resolvers/car.resolver';
import officeResolver from '../../src/graphql/resolvers/office.resolver';
import userResolver from '../../src/graphql/resolvers/user.resolvers';

const resolvers = [carResolver, userResolver, authResolver, bookingResolver,officeResolver];
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


const app = express();
const mHelper = new MongoHelper();
mHelper.initiateMongoConnection();

const testServer = new ApolloServer({
  schema
});

export = testServer;
