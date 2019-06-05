"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Order = _interopRequireDefault(require("../../controllers/usingDb/Order"));

var _Authentication = _interopRequireDefault(require("../../middleware/Authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/', _Authentication.default.verifyToken, _Order.default.createOrder);
router.patch('/:orderId/price', _Authentication.default.verifyToken, _Order.default.updateOrder);
var _default = router;
exports.default = _default;