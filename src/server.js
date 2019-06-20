/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import userRoute2 from './routes/usingDb/user';
import carRoute2 from './routes/usingDb/car';
import orderRoute2 from './routes/usingDb/order';
import flagRoute2 from './routes/usingDb/flag';
import viewsRoute from './routes/views';

require('dotenv').config();

const app = express();
const swaggerDocumentV2 = require('../swagger_v2.json');

const PORT = process.env.PORT || 5000;
const allowedOrigins = ['https://github.com', 'https://eziamakanv.github.io', 'https://automobile-mart.herokuapp.com', process.env.SECRET_ORIGIN];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    console.log(origin);
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

/*
  API V2
*/
app.use('/api/v2/auth', cors(corsOptions), userRoute2);
app.use('/api/v2/car', cors(corsOptions), carRoute2);
app.use('/api/v2/order', cors(corsOptions), orderRoute2);
app.use('/api/v2/flag', cors(corsOptions), flagRoute2);
app.use('/api/v2/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentV2));
app.use('/', viewsRoute);
// Not Found Handler
app.use((req, res) => { res.status(404).send('Not Found!'); });

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
}

export default app;