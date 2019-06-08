/* eslint-disable linebreak-style */
import moment from 'moment';

class FlagModel {
  constructor() {
    this.flags = [];
  }

  createFlag(flag) {
    const newFlag = {
      id: this.flags.length + 1,
      carId: flag.carId,
      createdOn: moment(new Date()),
      reason: flag.reason,
      description: flag.description,
      owner: flag.owner,
    };
    this.flags.push(newFlag);
    return { id: newFlag.id, reason: newFlag.reason, description: newFlag.description };
  }

  previousFlagExists(carId, owner) {
    return this.flags.find(flag => flag.carId === carId && flag.owner === owner);
  }
}

export default new FlagModel();
