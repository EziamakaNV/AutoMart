"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Authentication = _interopRequireDefault(require("../middleware/Authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
const router = _express.default.Router();

const options = {
  root: process.cwd()
};
router.get('/', (req, res) => {
  res.sendFile('UI/landing_page.html', options);
});
router.get('/register', (req, res) => {
  res.sendFile('UI/sign_up.html', options);
});
var _default = router;
exports.default = _default;