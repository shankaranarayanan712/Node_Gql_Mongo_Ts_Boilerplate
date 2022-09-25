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
      return ctx?.isUserLogged
        ? bookingController.filterCarBookings(inputObject.input)
        : buildErrorResponse({ code: 401, message: 'Unauthorized, Please Login to perform this action' });
    },
    filterOfficeBookings: (_, inputObject, ctx: Context) => {
      return ctx?.isUserLogged
        ? bookingController.filterOfficeBookings(inputObject)
        : buildErrorResponse({ code: 401, message: 'Unauthorized, Please Login to perform this action' });
    },
  },
  Mutation: {
    createCarBooking: (_, inputObject, ctx: Context) => {
      if (Object.hasOwnProperty('isUserLogged') && !ctx?.isUserLogged)
        return buildErrorResponse({ code: 401, message: 'Unauthorized, Please Login to perform booking' });
      return bookingController.createCarBooking(inputObject.input);
    },
    createOfficeBooking: (_, inputObject, ctx: Context) => {
      if (Object.hasOwnProperty('isUserLogged') && !ctx?.isUserLogged)
        return buildErrorResponse({ code: 401, message: 'Unauthorized, Please Login to perform booking' });
      return bookingController.createOfficeBooking(inputObject.input);
    },
  },
};

export default carBookingResolver;
