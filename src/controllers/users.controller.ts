import { CreateUserRequest } from '../interface/request/user.request.interface';
import { UserService } from '../services/user.service';
import { buildErrorResponse } from '../utils/buildErrorResponse';
import { successResponse } from '../utils/successResponse';
import {
  addUserRequestValidationSchema,
  updateUserRequestValidationSchema,
} from '../validator/user.request.validator';

export class UsersController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async addUser(request: CreateUserRequest) {
    try {
      const { error } = addUserRequestValidationSchema.validate(request);
      if (error) throw error;
      const result = await this.userService.create(request);
      return successResponse(result, 'created');
    } catch (error) {
      return buildErrorResponse(error);
    }
  }
  async getUsers() {
    try {
      const result = await this.userService.getAll();
      return successResponse(result, 'fetch');
    } catch (error) {
      return buildErrorResponse(error);
    }
  }
  async updateUser(id: string, request: Partial<CreateUserRequest>) {
    try {
      if (!id) throw new Error('Invalid request, id must be provided');
      const { error } = updateUserRequestValidationSchema.validate(request);
      if (error) throw error;
      const result = await this.userService.update(id, request);
      if (result) return successResponse(result, 'updated');
    } catch (error) {
      return buildErrorResponse(error);
    }
  }

  async getUserById(id: string) {
    try {
      if (!id) throw new Error('Invalid request, id is Required');
      const result = await this.userService.findById(id);
      return successResponse(result, 'fetch');
    } catch (error) {
      return buildErrorResponse(error);
    }
  }
}
