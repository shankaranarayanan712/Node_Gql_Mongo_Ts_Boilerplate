import { CarService } from '../services/car.service';
import { buildErrorResponse } from '../utils/buildErrorResponse';
import { successResponse } from '../utils/successResponse'


export class CarsController {
  private carService: CarService;
  constructor() {
    this.carService = new CarService();
  }
  async listCars() {
    try {
      const result = await this.carService.listCars()
      return successResponse(result, 'fetch');
    } catch (error) {
      return buildErrorResponse(error)
    }
  }
}

