/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';

import UserModel from '../../models/usingDb/User';

import response from '../../responses/Response';

require('dotenv').config();

class Authentication {
  static async verifyToken(req, res, next) {
    const token = req.cookies.jwt;
    // Check for the token
    if (!token) {
      res.status(401).json({ status: 401, error: 'Missing token', success: false });
    } else {
      try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        // Create user object in the request
        req.user = user;
        next();
      } catch (error) {
        res.status(500).json({ status: 500, error: `Issue with jwt token. Problem: ${error}` });
      }
    }
  }

  static async adminVerifyToken(req, res, next) {
    const token = req.cookies.jwt;
    // Check for the token
    if (!token) {
      res.status(401).json({ status: 401, error: 'Missing token', success: false });
    } else {
      try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        // Check if the user is an admin
        const isUserAdmin = await UserModel.isAdmin(user.id);
        if (isUserAdmin) {
          req.user = user;
          next();
        } else {
          response(res, 401, 'You are not an Admin');
        }
      } catch (error) {
        res.status(500).json({ status: 500, error: `Issue with jwt token. Problem: ${error}` });
      }
    }
  }
}

export default Authentication;
