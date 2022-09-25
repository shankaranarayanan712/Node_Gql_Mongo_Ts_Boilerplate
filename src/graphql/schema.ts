import 'graphql-import-node';
import * as rootDefs from './schemas/schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import userResolver from './resolvers/user.resolvers';
import carResolver from './resolvers/car.resolver';
import authResolver from './resolvers/auth.resolver';
import bookingResolver from './resolvers/booking.resolver';
import officeResolver from './resolvers/office.resolver';

const resolvers = [carResolver, userResolver, authResolver, bookingResolver,officeResolver];
//console.log("resolvers", resolvers)
const schema = makeExecutableSchema({
  typeDefs: [rootDefs],
  resolvers,
});

export default schema;
