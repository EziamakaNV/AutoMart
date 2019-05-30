"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _user = _interopRequireDefault(require("./routes/user"));

var _car = _interopRequireDefault(require("./routes/car"));

var _order = _interopRequireDefault(require("./routes/order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable eol-last */
require('dotenv').config();

const app = (0, _express.default)();

const swaggerDocument = require('../swagger.json');

const PORT = process.env.PORT || 5000;
app.use((0, _cookieParser.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use('/api/v1/auth', _user.default);
app.use('/api/v1/car', _car.default);
app.use('/api/v1/order', _order.default); // Swagger API doc

app.use('/api/v1/docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDocument));

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log("App listening on port ".concat(PORT)));
}

var _default = app;
exports.default = _default;