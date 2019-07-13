"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Authentication = _interopRequireDefault(require("../../middleware/usingDb/Authentication"));

var _Car = _interopRequireDefault(require("../../controllers/usingDb/Car"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
// Multipart middleware to parse file uploads
const multipart = require('connect-multiparty');

const multipartMiddleware = multipart({
  uploadDir: './tempImages'
}); // Folder to store temp image files n.b delete later

const router = _express.default.Router();

router.post('/', _Authentication.default.verifyToken, multipartMiddleware, _Car.default.createCar);
router.patch('/:car_id/status', _Authentication.default.verifyToken, _Car.default.updateStatus);
router.patch('/:car_id/price', _Authentication.default.verifyToken, _Car.default.updatePrice);
router.get('/myCar', _Authentication.default.verifyToken, _Car.default.viewMyCars);
router.get('/:car_id', _Authentication.default.verifyToken, _Car.default.viewSpecificCar);
router.get('/', _Authentication.default.verifyToken, _Car.default.viewCars);
router.delete('/:car_id', _Authentication.default.adminVerifyToken, _Car.default.deleteCar);
var _default = router;
exports.default = _default;