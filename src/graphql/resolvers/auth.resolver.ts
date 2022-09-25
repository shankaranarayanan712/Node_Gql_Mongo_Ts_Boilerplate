
import { IResolvers } from 'graphql-tools';
import { AuthController } from '../../controllers/auth.controller';

const authController = new AuthController();

const authResolver: IResolvers = {
  Mutation: {
    login: (_, inputObject) => {
      return authController.login(inputObject.input);
    }, 
  }
};

export default authResolver;
