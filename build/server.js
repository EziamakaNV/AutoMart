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

var _flag = _interopRequireDefault(require("./routes/flag"));

var _user2 = _interopRequireDefault(require("./routes/usingDb/user"));

var _car2 = _interopRequireDefault(require("./routes/usingDb/car"));

var _order2 = _interopRequireDefault(require("./routes/usingDb/order"));

var _flag2 = _interopRequireDefault(require("./routes/usingDb/flag"));

var _views = _interopRequireDefault(require("./routes/views"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable eol-last */
require('dotenv').config();

const app = (0, _express.default)();

const swaggerDocument = require('../swagger.json'); // const swaggerDocumentV2 = require('../swagger_v2.json');


const PORT = process.env.PORT || 5000;
app.use((0, _cookieParser.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_express.default.static('public'));
app.use('/api/v1/auth', _user.default);
app.use('/api/v1/car', _car.default);
app.use('/api/v1/order', _order.default);
app.use('/api/v1/flag', _flag.default); // Swagger API doc

app.use('/api/v1/docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDocument));
/*
  API V2
*/

app.use('/api/v2/auth', _user2.default);
app.use('/api/v2/car', _car2.default);
app.use('/api/v2/order', _order2.default);
app.use('/api/v2/flag', _flag2.default); // app.use('/api/v2/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentV2));

app.use('/', _views.default); // Not Found Handler

app.use((req, res) => {
  res.status(404).send('Not Found!');
});

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log("App listening on port ".concat(PORT)));
}

var _default = app;
exports.default = _default;