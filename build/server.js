"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _cors = _interopRequireDefault(require("cors"));

var _user = _interopRequireDefault(require("./routes/usingDb/user"));

var _car = _interopRequireDefault(require("./routes/usingDb/car"));

var _order = _interopRequireDefault(require("./routes/usingDb/order"));

var _flag = _interopRequireDefault(require("./routes/usingDb/flag"));

var _views = _interopRequireDefault(require("./routes/views"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable eol-last */
require('dotenv').config();

const app = (0, _express.default)();

const swaggerDocumentV2 = require('../swagger_v2.json');

const PORT = process.env.PORT || 5000;
const allowedOrigins = ['https://adc-autograder.herokuapp.com', 'https://github.com', 'https://eziamakanv.github.io', 'https://automobile-mart.herokuapp.com', process.env.SECRET_ORIGIN];
const corsOptions = {
  credentials: true,
  origin: (_origin, callback) => {
    _origin;

    if (allowedOrigins.indexOf(_origin) !== -1 || !_origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};
app.use((0, _cookieParser.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_express.default.static('public'));
/*
  API V1
*/

app.use('/api/v1/auth', (0, _cors.default)(corsOptions), _user.default);
app.use('/api/v1/car', (0, _cors.default)(corsOptions), _car.default);
app.use('/api/v1/order', (0, _cors.default)(corsOptions), _order.default);
app.use('/api/v1/flag', (0, _cors.default)(corsOptions), _flag.default);
app.use('/api/v1/docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDocumentV2));
app.use('/', (0, _cors.default)(corsOptions), _views.default); // Not Found Handler

app.use((req, res) => {
  res.status(404).send('Not Found!');
});

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => "App listening on port ".concat(PORT));
}

var _default = app;
exports.default = _default;