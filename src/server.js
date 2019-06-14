/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
import express from 'express';

import bodyParser from 'body-parser';

import cookieParser from 'cookie-parser';

import swaggerUi from 'swagger-ui-express';

import cors from 'cors';

import userRoute from './routes/user';

import carRoute from './routes/car';

import orderRoute from './routes/order';

import flagRoute from './routes/flag';

import userRoute2 from './routes/usingDb/user';

import carRoute2 from './routes/usingDb/car';

import orderRoute2 from './routes/usingDb/order';

import flagRoute2 from './routes/usingDb/flag';

import viewsRoute from './routes/views';

require('dotenv').config();

const app = express();

const swaggerDocument = require('../swagger.json');

// const swaggerDocumentV2 = require('../swagger_v2.json');

const PORT = process.env.PORT || 8000;

const allowedOrigins = ['https://github.com', 'https://eziamakanv.github.io', process.env.SECRET_ORIGIN];

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => { // Reference: https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not '
                + 'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

// app.use(cors(corsOptions));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api/v1/auth', cors(corsOptions), userRoute);

app.use('/api/v1/car', cors(corsOptions), carRoute);

app.use('/api/v1/order', cors(corsOptions), orderRoute);

app.use('/api/v1/flag', cors(corsOptions), flagRoute);

// Swagger API doc
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*
  API V2
*/

app.use('/api/v2/auth', cors(corsOptions), userRoute2);

app.use('/api/v2/car', cors(corsOptions), carRoute2);

app.use('/api/v2/order', cors(corsOptions), orderRoute2);

app.use('/api/v2/flag', cors(corsOptions), flagRoute2);

// app.use('/api/v2/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentV2));

app.use('/', viewsRoute);

// Not Found Handler
app.use((req, res) => { res.status(404).send('Not Found!'); });

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
}

export default app;