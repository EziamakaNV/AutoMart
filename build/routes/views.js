"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Authentication = _interopRequireDefault(require("../middleware/usingDb/Authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
const router = _express.default.Router();

const option = {
  root: process.cwd()
};

const sendFile = (res, path, options) => {
  return res.sendFile(path, options);
};

router.get('/', (req, res) => {
  sendFile(res, 'UI/landing_page.html', option);
});
router.get('/register', (req, res) => {
  sendFile(res, 'UI/sign_up.html', option);
});
router.get('/login', (req, res) => {
  sendFile(res, 'UI/sign_in.html', option);
}); // NB Dont forget to change the auth middleware
// When switching to database mode

router.get('/profile', _Authentication.default.verifyToken, (req, res) => {
  sendFile(res, 'UI/profile_page.html', option);
});
router.get('/car/:id', _Authentication.default.verifyToken, (req, res) => {
  sendFile(res, 'UI/specific_car.html', option);
});
router.get('/logout', _Authentication.default.verifyToken, (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true
  });
  res.clearCookie('user');
  res.redirect('/');
});
var _default = router;
exports.default = _default;