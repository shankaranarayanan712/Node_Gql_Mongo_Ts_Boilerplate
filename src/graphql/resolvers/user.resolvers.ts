import { Context } from '../../models/context';
import { IResolvers } from 'graphql-tools';
import * as jwt from 'jsonwebtoken';
import { AppConstants } from '../../constants/app.constants';
import { UsersController } from '../../controllers/users.controller';
import { BookingService } from '../../services/booking.service';

const usersController = new UsersController();

const bookingService = new BookingService();

const userResolver: IResolvers = {
  Query: {
    token: (_, args: any) => {
      return jwt.sign({ data: args[AppConstants.EMAIL] }, <string>process.env.auth_encryption_salt);
    },
    getUsers: (_: void, args: any, ctx: Context) => {
      return usersController.getUsers();
    },
    getUserById: (_: void, args: any, ctx: Context) => {
      const id: string = args.id;
      return usersController.getUserById(id);
    },
  },
  Mutation: {
    addUser: (_, inputObject, ctx: Context) => {
      return usersController.addUser(inputObject?.input);
    },
    updateUser: (_, inputObject, ctx: Context) => {
      const { id, input } = inputObject;
      return usersController.updateUser(id, input);
    },
  },
  User: {
    async carBookings(user) {
      const officeBookings = await bookingService.getCarBooking({ userId: user.id });
      return officeBookings;
    },
  },
};

export default userResolver;
