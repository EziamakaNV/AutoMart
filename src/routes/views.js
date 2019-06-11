/* eslint-disable linebreak-style */
import express from 'express';

import Authentication from '../middleware/Authentication';

const router = express.Router();

const options = { root: process.cwd() };

router.get('/', (req, res) => {
  res.sendFile('UI/landing_page.html', options);
});

router.get('/register', (req, res) => {
  res.sendFile('UI/sign_up.html', options);
});

export default router;