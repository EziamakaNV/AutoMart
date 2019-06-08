/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
import express from 'express';

import bodyParser from 'body-parser';

import cookieParser from 'cookie-parser';

import swaggerUi from 'swagger-ui-express';

import userRoute from './routes/user';

import carRoute from './routes/car';

import orderRoute from './routes/order';

import flagRoute from './routes/flag';

import userRoute2 from './routes/usingDb/user';

import carRoute2 from './routes/usingDb/car';

import orderRoute2 from './routes/usingDb/order';

import flagRoute2 from './routes/usingDb/flag';

require('dotenv').config();

const app = express();

const swaggerDocument = require('../swagger.json');

// const swaggerDocumentV2 = require('../swagger_v2.json');

const PORT = process.env.PORT || 5000;

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', userRoute);

app.use('/api/v1/car', carRoute);

app.use('/api/v1/order', orderRoute);

app.use('/api/v1/flag', flagRoute);

// Swagger API doc
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*
  API V2
*/

app.use('/api/v2/auth', userRoute2);

app.use('/api/v2/car', carRoute2);

app.use('/api/v2/order', orderRoute2);

app.use('/api/v2/flag', flagRoute2);

// app.use('/api/v2/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentV2));

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
}

export default app;