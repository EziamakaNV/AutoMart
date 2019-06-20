import express from 'express';

import FlagController from '../../controllers/usingDb/Flag';

import Authentication from '../../middleware/usingDb/Authentication';

const router = express.Router();

router.post('/', Authentication.verifyToken, FlagController.createFlag);

export default router;