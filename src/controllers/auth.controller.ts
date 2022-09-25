import { buildErrorResponse } from '../utils/buildErrorResponse';
import { successResponse } from '../utils/successResponse';
import * as jwt from 'jsonwebtoken';
import { authRequestValidationSchema } from '../validator/auth.request.validator';
import { LoginRequest } from '../interface/request/login.request';
import { decryptPassword } from '../helpers/bcryptHelper';
const Users = require('../models/user');

export class AuthController {
  async login(request: LoginRequest) {
    try {
      const { error } = authRequestValidationSchema.validate(request);
      if (error) throw error;
      const { email, password } = request;
      const user = await Users.findOne({ email });
      if (!user) throw new Error('user not found');
      const passwordMatch = await decryptPassword(password, user.password);
      if(!passwordMatch) throw new Error('Wrong password');
      const token = jwt.sign({ data: user.email }, <string>process.env.auth_encryption_salt);
      return successResponse({ email: user.email, token }, 'user logged in');
    } catch (error) {
      return buildErrorResponse(error);
    }
  }
}
