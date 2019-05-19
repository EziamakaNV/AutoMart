/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
import express from 'express';

import bodyParser from 'body-parser';

import cookieParser from 'cookie-parser';

import userRoute from './routes/user';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());

app.use(express.static('UI'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('api/v1/auth', userRoute);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));