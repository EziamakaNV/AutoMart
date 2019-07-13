/* eslint-disable linebreak-style */
import moment from 'moment';

import db from './Db/index';

class FlagModel {
  static createFlag(flag) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO flags (car_id, created_on, reason, description, owner) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [flag.car_id, moment(new Date()), flag.reason, flag.description, flag.owner];
      db.query(query, values).then(result => resolve(result.rows[0])).catch(error => reject(error));
    });
  }

  static previousFlagExists(car_id, owner) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM flags WHERE car_id = $1 AND owner = $2';
      const values = [car_id, owner];
      db.query(query, values).then((result) => {
        if (result.rows.length === 0) {
          resolve(false);
        } else {
          resolve(result.rows[0]);
        }
      }).catch(err => reject(err));
    });
  }
}

export default FlagModel;
