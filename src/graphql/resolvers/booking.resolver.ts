import { Context } from '../../models/context';
import { IResolvers } from 'graphql-tools';
import { BookingController } from '../../controllers/booking.controller';
import { buildErrorResponse } from '../../utils/buildErrorResponse';

const bookingController = new BookingController();

const carBookingResolver: IResolvers = {
  Query: {
    getOfficeBookings: (_, inputObject: any) => {
      return bookingController.getOfficeBookings(inputObject);
    },
    getCarBookings: (_, inputObject: any) => {
      return bookingController.getCarBookings(inputObject);
    },
    filterCarBookings: (_, inputObject, ctx: Context) => {
      if (ctx.hasOwnProperty('isUserLogged') && !ctx?.isUserLogged)
      return buildErrorResponse({
        code: 401,
        message: 'Unauthorized, Please Login/provide token  to perform this action',
      });
      return bookingController.filterCarBookings(inputObject.input);
      
    },
    filterOfficeBookings: (_, inputObject, ctx: Context) => {
      if (ctx.hasOwnProperty('isUserLogged') && !ctx?.isUserLogged)
        return buildErrorResponse({
          code: 401,
          message: 'Unauthorized, Please Login/provide token to perform this action',
        });
      return bookingController.filterOfficeBookings(inputObject.input);
    },
  },
  Mutation: {
    createCarBooking: (_, inputObject, ctx: Context) => {
      if (ctx.hasOwnProperty('isUserLogged') && !ctx?.isUserLogged)
        return buildErrorResponse({
          code: 401,
          message: 'Unauthorized, Please Login/provide token to perform booking',
        });
      return bookingController.createCarBooking(inputObject.input);
    },
    createOfficeBooking: (_, inputObject, ctx: Context) => {
      if (ctx.hasOwnProperty('isUserLogged') && !ctx?.isUserLogged)
        return buildErrorResponse({
          code: 401,
          message: 'Unauthorized, Please Login/provide token to perform booking',
        });
      return bookingController.createOfficeBooking(inputObject.input);
    },
  },
};

export default carBookingResolver;
