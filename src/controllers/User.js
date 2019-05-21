/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import entities from '../models/entities';

import Validation from '../validations/Validation';

require('dotenv').config();

class UserController {
  static signup(req, res) {
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
      res.status(400).json({ status: 400, error: `Issue with supplied parameters. Error: ${error}` });
    } else {
      // Check if the email exists on record
      let emailAlreadyExists = false;

      entities.Users.forEach((user) => {
        if (user.email === email) emailAlreadyExists = true;
      });

      if (emailAlreadyExists) {
        res.status(400).json({ status: 400, error: 'Email already exists', success: false });
      } else { // Store user data
        // Hash password
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
          if (err) {
            res.status(500).json({ status: 500, error: 'Server error. Try again', success: false });
          } else {
            // Get user id
            const userId = entities.Users.length + 1;
            // Store details
            entities.Users.push({
              id: userId,
              firstName,
              lastName,
              email,
              password: hashedPassword,
              address,
              isAdmin: false,
            });
            // Generate jwt
            const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '8760h' });
            // Set cookie header
            res.cookie('jwt', token, { maxAge: 31540000000, httpOnly: true });
            // Final response
            res.status(200).json({
              status: 200,
              data: { token, id: userId, firstName, lastName, email, hashedPassword },
              success: true,
            });
            console.log(entities.Users);
          }
        });
      }
    }
  }

  static signin(req, res) {
    const { password } = req.body;
    // Remove empty spaces from the email and set to lowercase
    const email = req.body.email.replace(/\s/g, '').toLowerCase();
    const validationObject = { email, password };
    const { error } = Validation.loginValidation(validationObject);

    if (error) {
      res.status(400).json({ status: 400, error: `Issue with credentials supplied. Problem: ${error}` });
    } else {
      let emailExists = false;
      let hashedPassword;
      let userId;
      let firstName;
      let lastName;

      // Check if the email is on record
      entities.Users.forEach((user) => {
        if (user.email === email) {
          emailExists = true;
          hashedPassword = user.password;
          userId = user.id;
          firstName = user.firstName;
          lastName = user.lastName;
        }

      });

      if (emailExists) {
        // Compare passwords
        bcrypt.compare(password, hashedPassword, (err, same) => {
          if (err) {
            res.status(500).json({ status: 500, error: 'Internal Server Error', success: false });
          } else if (same) { // (same-boolean) If the passwords match
            const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '8760h' });
            res.cookie('jwt', token, { maxAge: 31540000000, httpOnly: true });
            res.status(200).json({
              status: 200,
              data: { token, id: userId, first_name: firstName, last_name: lastName, email } });
          } else {
            res.status(401).json({ status: 401, error: 'The Username/Paswword is incorrect' });
          }
        });
      } else {
        res.status(401).json({ status: 401, error: 'The Username/Paswword is incorrect' });
      }
    }
  }
}

export default UserController;