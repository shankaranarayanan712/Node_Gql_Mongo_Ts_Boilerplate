import { OfficeService } from '../services/office.service';
import { buildErrorResponse } from '../utils/buildErrorResponse';
import { successResponse } from '../utils/successResponse'

export class OfficeController {
  private officeService: OfficeService;
  constructor() {
    this.officeService = new OfficeService();
  }
  async listOffice() {
    try {
      const result = await this.officeService.listOffices();
      return successResponse(result, 'fetch');
    } catch (error) {
      return buildErrorResponse(error)
    }
  }
}

