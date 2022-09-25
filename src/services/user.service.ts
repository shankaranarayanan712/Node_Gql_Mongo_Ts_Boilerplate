import { encryptPassword } from '../helpers/bcryptHelper';
import { CreateUserRequest } from '../interface/request/user.request.interface';
import { UserResponse } from '../interface/response/user.response';

const Users = require('../models/user');
export class UserService {
  async create(request: CreateUserRequest): Promise<UserResponse> {
    try {
      const password = await encryptPassword(request.password);
      const user = { ...request, password };
      const result = await Users.create(user);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getAll(): Promise<UserResponse[]> {
    try {
      const result = await Users.find({});
      return result;
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, updateObj: Partial<CreateUserRequest>): Promise<UserResponse> {
    try {
      const result = Users.findOneAndUpdate({ _id: id }, updateObj);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<UserResponse> {
    try {
      const result = await Users.findById(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
