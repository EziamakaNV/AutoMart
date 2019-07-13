/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';

import UserModel from '../../models/usingDb/User';

import response from '../../responses/Response';

require('dotenv').config();

class Authentication {
  static async verifyToken(req, res, next) {
    const token = req.cookies.jwt || req.body.token;
    // Check for the token
    if (!token) {
      res.status(400).json({ status: 400, error: 'Missing token', success: false });
    } else {
      try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        // Create user object in the request
        req.user = user;
        req.token = token;
        next();
        // Check if the user is still in the DB
        // const userExists = await UserModel.findUser(user.email);
        // if (userExists) {
        //   // Create user object in the request
        //   req.user = user;
        //   next();
        // } else {
        //   response(res, 400, 'Malicious token request. You dont exist on the DB!');
        // }
      } catch (error) {
        res.status(500).json({ status: 500, error: `Issue with jwt token. Problem: ${error}` });
      }
    }
  }

  static async adminVerifyToken(req, res, next) {
    const token = req.cookies.jwt || req.body.token;
    // Check for the token
    if (!token) {
      res.status(400).json({ status: 400, error: 'Missing token', success: false });
    } else {
      try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        // Check if the user is an admin
        const isUserAdmin = await UserModel.is_admin(user.id);
        if (isUserAdmin) {
          req.user = user;
          req.token = token;
          next();
        } else {
          response(res, 400, 'You are not an Admin');
        }
      } catch (error) {
        res.status(500).json({ status: 500, error: `Issue with jwt token. Problem: ${error}` });
      }
    }
  }
}

export default Authentication;
