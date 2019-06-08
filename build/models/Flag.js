"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.flags");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
class FlagModel {
  constructor() {
    this.flags = [];
  }

  createFlag(flag) {
    const newFlag = {
      id: this.flags.length + 1,
      carId: flag.carId,
      createdOn: (0, _moment.default)(new Date()),
      reason: flag.reason,
      description: flag.description,
      owner: flag.owner
    };
    this.flags.push(newFlag);
    return {
      id: newFlag.id,
      reason: newFlag.reason,
      description: newFlag.description
    };
  }

  previousFlagExists(carId, owner) {
    return this.flags.find(flag => flag.carId === carId && flag.owner === owner);
  }

}

var _default = new FlagModel();

exports.default = _default;