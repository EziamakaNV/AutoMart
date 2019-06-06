/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import Validation from '../../validations/Validation';

import response from '../../responses/Response';

import UserModel from '../../models/usingDb/User';

require('dotenv').config();

class UserController {
  static async signup(req, res) {
    try {
      const {
        firstName,
        lastName,
        password,
        address,
      } = req.body;
  
      // Remove empty spaces from the email and set to lowercase
      const email = req.body.email.replace(/\s/g, '').toLowerCase(); // The .replace is from Stack Overflow. It removes empty spaces
  
      // Use Joi to validate input
      const validationObject = {
        firstName,
        lastName,
        email,
        password,
        address,
      };
  
      const { error } = Validation.signUpValidation(validationObject);
  
      if (error) {
        response(res, 400, error);
      } else {
        // Check if the email exists on record
        const userExists = await UserModel.findUser(email);
        if (userExists) {
          res.status(400).json({ status: 400, error: 'Email already exists', success: false });
        } else { // Store user data
          // Hash password
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          const userObject = { firstName, lastName, email, password: hashedPassword, address, isAdmin: false };
          const newUser = await UserModel.createUser(userObject);
          // Generate jwt
          const token = jwt.sign({ id: newUser.id, email }, process.env.JWT_SECRET, { expiresIn: '8760h' });
          // Set cookie header
          res.cookie('jwt', token, { maxAge: 31540000000, httpOnly: true });
          // Final response
          res.status(200).json({
            status: 200,
            data: { token, id: newUser.id, firstName, lastName, email, hashedPassword },
            success: true,
          });
        }
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async signin(req, res) {
    try {
      const { password } = req.body;
      // Remove empty spaces from the email and set to lowercase
      const email = req.body.email.replace(/\s/g, '').toLowerCase();
      const validationObject = { email, password };
      const { error } = Validation.loginValidation(validationObject);

      if (error) {
        res.status(400).json({ status: 400, error: `Issue with credentials supplied. Problem: ${error}` });
      } else {
        const user = await UserModel.findUser(email);

        if (user) {
        // Compare passwords
          const match = await bcrypt.compare(password, user.password);
          if (match) { // (same-boolean) If the passwords match
            const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '8760h' });
            res.cookie('jwt', token, { maxAge: 31540000000, httpOnly: true });
            res.status(200).json({
              status: 200,
              data: { token, id: user.id, first_name: user.firstName, last_name: user.lastName, email } });
          } else {
            res.status(401).json({ status: 401, error: 'The Email/Paswword is incorrect' });
          }
        } else {
          res.status(401).json({ status: 401, error: 'The Email/Paswword is incorrect' });
        }
      }
    } catch (error) {
      response(res, 500, error);
    }
  }
}

export default UserController;
