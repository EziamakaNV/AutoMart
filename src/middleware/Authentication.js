/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';

require('dotenv').config();

class Authentication {
  static async verifyToken(req, res, next) {
    const token = req.cookies.jwt;
    // Check for the token
    if (!token) {
      res.status(401).json({ status: 401, error: 'Missing token', success: false });
    } else {
      try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        // Create user object in the request
        req.user = decoded;
        next();
      } catch (error) {
        res.status(500).json({ status: 500, error: `Issue with jwt token. Problem: ${error}` });
      }
    }
  }
}

export default Authentication;
