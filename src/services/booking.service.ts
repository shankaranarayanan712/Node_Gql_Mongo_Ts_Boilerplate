import { BookCarRequest, FilterCarBookingRequest } from '../interface/request/car.request.interface';
import {
  BookOfficeRequest,
  FilterOfficerBookingRequest,
  GetBookingsOfUser,
} from '../interface/request/office.request.interface';
import { CarBookingResponse, OfficeBookingResponse } from '../interface/response/booking.response';
import { Status } from '../models/constants';
import { CarService } from './car.service';
import { OfficeService } from './office.service';
import { UserService } from './user.service';

const CarBooking = require('../models/car.booking');
const OfficeBooking = require('../models/office.booking');

export class BookingService {
  private userService: UserService;
  private officeService: OfficeService;
  private carService: CarService;
  constructor() {
    this.userService = new UserService();
    this.officeService = new OfficeService();
    this.carService = new CarService();
  }
  async createCarBooking(request: BookCarRequest): Promise<CarBookingResponse> {
    try {
      await this.validateCarBooking(request);
      const bookingObject = this.transformBookingRequest(request);
      const bookings = await this.getCarBookingsInDateRange(bookingObject, Status.BOOKED);
      if (bookings?.length) throw new Error('Car already Booked in this time peroid');
      const result = await CarBooking.create(bookingObject);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createOfficeBooking(request: BookOfficeRequest): Promise<OfficeBookingResponse> {
    try {
      await this.validateOfficeBooking(request);
      const bookingObject = this.transformBookingRequest(request);
      const bookings = await this.getOfficeBookingsInDateRange(bookingObject);
      if (bookings?.length) throw new Error('Office already Booked in this time peroid');

      const result = await OfficeBooking.create(bookingObject);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getOfficeBooking(request: GetBookingsOfUser): Promise<OfficeBookingResponse> {
    try {
      const result = await OfficeBooking.find({ userId: request.userId });
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getCarBooking(request: GetBookingsOfUser): Promise<OfficeBookingResponse> {
    try {
      const result = await CarBooking.find({ userId: request.userId });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async filterCarBookings(request: FilterCarBookingRequest): Promise<CarBookingResponse[]> {
    try {
      const bookingObject = this.transformBookingRequest(request);
      const query = {
        ...(bookingObject.carId && { carId: bookingObject.carId }),
        ...(bookingObject.userId && { userId: bookingObject.userId }),
        ...(bookingObject.startDate && {
          startDate: {
            $gte: bookingObject.startDate.toISOString(),
          },
        }),
        ...(bookingObject.endDate && {
          endDate: {
            $lte: bookingObject.endDate.toISOString(),
          },
        }),
        ...(bookingObject.status && { status: bookingObject.status }),
      };
      const bookings = await CarBooking.find({ $and: [query] });
      return bookings;
    } catch (error) {
      throw error;
    }
  }

  async filterOfficeBookings(request: FilterOfficerBookingRequest): Promise<OfficeBookingResponse[]> {
    try {
      const bookingObject = this.transformBookingRequest(request);
      const query = {
        ...(bookingObject.officeId && { officeId: bookingObject.officeId }),
        ...(bookingObject.userId && { userId: bookingObject.userId }),
        ...(bookingObject.startDate && {
          startDate: {
            $gte: bookingObject.startDate.toISOString(),
          },
        }),
        ...(bookingObject.endDate && {
          endDate: {
            $lte: bookingObject.endDate.toISOString(),
          },
        }),
        ...(bookingObject.status && { status: bookingObject.status }),
      };
      const bookings = await OfficeBooking.find({ $and: [query] });
      return bookings;
    } catch (error) {
      throw error;
    }
  }

  private async getOfficeBookingsInDateRange(request) {
    try {
      const query = {
        officeId: request.officeId,
        startDate: {
          $gte: request.startDate.toISOString(),
        },
        endDate: {
          $lte: request.endDate.toISOString(),
        },
        status: 'BOOKED',
      };
      const bookings = await OfficeBooking.find(query);
      return bookings;
    } catch (error) {
      throw error;
    }
  }
  private async getCarBookingsInDateRange(request, status: string) {
    try {
      const query = {
        carId: request.carId,
        startDate: {
          $gte: request.startDate.toISOString(),
        },
        endDate: {
          $lte: request.endDate.toISOString(),
        },
        status: 'BOOKED',
      };
      const bookings = await CarBooking.find(query);
      return bookings;
    } catch (error) {
      throw error;
    }
  }

  private transformBookingRequest(inputObject: any) {
    if (!inputObject) return new Error('Request cannot be empty');
    return {
      ...inputObject,
      startDate: inputObject.startDate ? new Date(inputObject.startDate) : undefined,
      endDate: inputObject.endDate ? new Date(inputObject.endDate) : undefined,
    };
  }
  private async validateCarBooking(request: BookCarRequest) {
    const promises: any = [
      this.userService.findById(request.userId),
      this.carService.findById(request.carId),
    ];
    const [user, car] = await Promise.all(promises);
    if (!user) throw new Error('User not found, please provide a valid user to proeed with booking');
    if (!car) throw new Error('car not found, please provide a valid car to proeed with booking');
  }
  private async validateOfficeBooking(request: BookOfficeRequest) {
    const promises: any = [
      this.userService.findById(request.userId),
      this.officeService.findById(request.officeId),
    ];
    const [user, office] = await Promise.all(promises);
    if (!user) throw new Error('User not found, please provide a valid user to proeed with booking');
    if (!office) throw new Error('office not found, please provide a valid office to proeed with booking');
  }
}
