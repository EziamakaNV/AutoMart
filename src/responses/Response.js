/* eslint-disable linebreak-style */
const response = (responseObject, statusCode, dataOrError) => {
  const res = responseObject;
  let x;
  if (statusCode >= 400) {
    x = 'error';
    return res.status(statusCode).json({ status: statusCode, [x]: `${dataOrError}`, success: false });
  }
  x = 'data';
  return res.status(statusCode).json({ status: statusCode, [x]: dataOrError, success: true });
};

export default response;
