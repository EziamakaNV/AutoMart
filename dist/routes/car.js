"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Authentication = _interopRequireDefault(require("../middleware/Authentication"));

var _Car = _interopRequireDefault(require("../controllers/Car"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/', _Authentication.default.verifyToken, _Car.default.createCar);
router.patch('/:carId/status', _Authentication.default.verifyToken, _Car.default.updateStatus);
router.patch('/:carId/price', _Authentication.default.verifyToken, _Car.default.updatePrice);
router.get('/:carId', _Authentication.default.verifyToken, _Car.default.viewSpecificCar);
router.get('/', _Authentication.default.verifyToken, _Car.default.viewCars);
var _default = router;
exports.default = _default;