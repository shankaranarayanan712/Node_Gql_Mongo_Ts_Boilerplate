import { OfficeResponse } from '../interface/response/office.response';

const Office = require('../models/office');
export class OfficeService {
  async listOffices(): Promise<OfficeResponse[]> {
    try {
      const result = await Office.find({});
      return result;
    } catch (error) {
      throw error;
    }
  }
  async findById(id: string): Promise<OfficeResponse> {
    try {
      const result = await Office.findById(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
