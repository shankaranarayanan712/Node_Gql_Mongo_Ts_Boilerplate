const User = require('../models/users');
import * as jwt from 'jsonwebtoken';
export class AuthMiddleware {
  /**
   * This function returns either true of false based information present in the database
   * @param req
   */
  public async validateUser(req: any) {
    //This is just for this POC and will have to be removed with secure auth mechanism
    if(!req?.headers) return { isUserLogged: true, };
    const token = req.headers.authorization || '';
    try {
      const payload = <{ data: string; iat: number }>(
        jwt.verify(token, <string>process.env.auth_encryption_salt)
      );
      const email = payload['data'];
      return await User.find({ email: email }).then((response: any) => {
        if (response.length > 0) {
          return { isUserLogged: true, email: email };
        }
        return { isUserLogged: false };
      });
    } catch (error) {
      return { isUserLogged: false };
    }
  }


}
