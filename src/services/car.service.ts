import { CarResponse } from '../interface/response/car.response';

const Cars = require('../models/cars');
export class CarService {
  async listCars(): Promise<CarResponse> {
    try {
      const result = await Cars.find({});
      return result;
    } catch (error) {
      throw error;
    }
  }
  async findById(id: string): Promise<CarResponse> {
    try {
      const result = await Cars.findById(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
