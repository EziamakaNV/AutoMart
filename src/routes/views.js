/* eslint-disable linebreak-style */
import express from 'express';

import Authentication from '../middleware/Authentication';

const router = express.Router();

const option = { root: process.cwd() };

const sendFile = (res, path, options) => {
  return res.sendFile(path, options);
};

router.get('/', (req, res) => {
  sendFile(res, 'UI/landing_page.html', option);
});

router.get('/register', (req, res) => {
  sendFile(res, 'UI/sign_up.html', option);
});

router.get('/login', (req, res) => {
  sendFile(res, 'UI/sign_in.html', option);
});

// NB Dont forget to change the auth middleware
// When switching to database mode
router.get('/profile', Authentication.verifyToken, (req, res) => {
  sendFile(res, 'UI/profile_page.html', option);
});

export default router;