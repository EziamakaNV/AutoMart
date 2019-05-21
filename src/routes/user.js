import express from 'express';

import UserController from '../controllers/User';

const router = express.Router();

router.post('/signup', UserController.signup);

router.post('/signin', UserController.signin);

export default router;