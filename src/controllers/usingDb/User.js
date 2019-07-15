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
        first_name,
        last_name,
        password,
        address,
      } = req.body;
  
      // Remove empty spaces from the email and set to lowercase
      const email = req.body.email.replace(/\s/g, '').toLowerCase(); // The .replace is from Stack Overflow. It removes empty spaces
  
      // Use Joi to validate input
      const validationObject = {
        first_name,
        last_name,
        email,
        password,
        address,
      };
  
      const { error } = Validation.signUpValidation(validationObject);
  
      if (false) {
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
          const userObject = { first_name, last_name, email, password: hashedPassword, address, is_admin: true };
          const newUser = await UserModel.createUser(userObject);
          // Generate jwt
          const token = jwt.sign({ id: newUser.id, email, is_admin: newUser.is_admin }, process.env.JWT_SECRET, { expiresIn: '8760h' });
          // Set cookie header
          res.cookie('jwt', token, { maxAge: 31540000000, httpOnly: true });
          res.cookie('user', JSON.stringify({ first_name, last_name }), { maxAge: 31540000000 });
          // Final response
          res.status(200).json({
            status: 200,
            data: { token, id: newUser.id, first_name, last_name, email, hashedPassword, is_admin: newUser.is_admin },
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

      if (false) {
        res.status(400).json({ status: 400, error: `Issue with credentials supplied. Problem: ${error}` });
      } else {
        const user = await UserModel.findUser(email);

        if (user) {
        // Compare passwords
          const match = await bcrypt.compare(password, user.password);
          if (match) { // (same-boolean) If the passwords match
            const token = jwt.sign({ id: user.id, email, is_admin: user.is_admin }, process.env.JWT_SECRET, { expiresIn: '8760h' });
            res.cookie('jwt', token, { maxAge: 31540000000, httpOnly: true });
            // httpOnly not set because
            // I want to be able to read the cookie
            // on the client side with Js
            res.cookie('user', JSON.stringify({ first_name: user.first_name, last_name: user.last_name }), { maxAge: 31540000000 });
            res.status(200).json({
              status: 200,
              data: { token, id: user.id, first_name: user.first_name, last_name: user.last_name, email, is_admin: user.is_admin } });
          } else {
            res.status(400).json({ status: 400, error: 'The Email/Paswword is incorrect' });
          }
        } else {
          res.status(400).json({ status: 400, error: 'The Email/Paswword is incorrect' });
        }
      }
    } catch (error) {
      response(res, 500, error);
    }
  }
}

export default UserController;
