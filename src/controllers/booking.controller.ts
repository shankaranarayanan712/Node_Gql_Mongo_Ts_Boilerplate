import { BookCarRequest } from '../interface/request/car.request.interface';
import { BookOfficeRequest, GetBookingsOfUser } from '../interface/request/office.request.interface';
import { BookingService } from '../services/booking.service';
import { buildErrorResponse } from '../utils/buildErrorResponse';
import { successResponse } from '../utils/successResponse';
import {
  createCarBookingRequestValidationSchema,
  createOfficeBookingRequestValidationSchema,
  getBookingRequestValidationSchema,
} from '../validator/booking.validator';

export class BookingController {
  private bookingService: BookingService;
  constructor() {
    this.bookingService = new BookingService();
  }
  async createCarBooking(request: BookCarRequest) {
    try {
      const { error } = createCarBookingRequestValidationSchema.validate(request);
      if (error) throw error;
      const result = await this.bookingService.createCarBooking(request);
      return successResponse(result, 'created');
    } catch (error) {
      return buildErrorResponse(error);
    }
  }

  async createOfficeBooking(request: BookOfficeRequest) {
    try {
      const { error } = createOfficeBookingRequestValidationSchema.validate(request);
      if (error) throw error;
      const result = await this.bookingService.createOfficeBooking(request);
      return successResponse(result, 'created');
    } catch (error) {
      return buildErrorResponse(error);
    }
  }

  async getOfficeBookings(request: GetBookingsOfUser) {
    try {
      const { error } = getBookingRequestValidationSchema.validate(request);
      if (error) throw error;
      const result = await this.bookingService.getOfficeBooking(request);
      return successResponse(result, 'fetch');
    } catch (error) {
      return buildErrorResponse(error);
    }
  }
  async getCarBookings(request: GetBookingsOfUser) {
    try {
      const { error } = getBookingRequestValidationSchema.validate(request);
      if (error) throw error;
      const result = await this.bookingService.getCarBooking(request);
      return successResponse(result, 'fetch');
    } catch (error) {
      return buildErrorResponse(error);
    }
  }

  async filterCarBookings(inputObject: Partial<BookCarRequest>) {
    try {
      const result = await this.bookingService.filterCarBookings(inputObject);
      return successResponse(result, 'fetch');
    } catch (error) {
      return buildErrorResponse(error);
    }
  }

  async filterOfficeBookings(inputObject: Partial<BookOfficeRequest>) {
    try {
      const result = await this.bookingService.filterOfficeBookings(inputObject);
      return successResponse(result, 'fetch');
    } catch (error) {
      return buildErrorResponse(error);
    }
  }
}
