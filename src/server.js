/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
import express from 'express';

import bodyParser from 'body-parser';

import cookieParser from 'cookie-parser';

import swaggerUi from 'swagger-ui-express';

import userRoute from './routes/user';

import carRoute from './routes/car';

import orderRoute from './routes/order';

require('dotenv').config();

const app = express();

const swaggerDocument = require('../swagger.json');

const PORT = process.env.PORT || 5000;

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', userRoute);

app.use('/api/v1/car', carRoute);

app.use('/api/v1/order', orderRoute);

// Swagger API doc
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
}

export default app;