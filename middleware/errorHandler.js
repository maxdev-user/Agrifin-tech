import constants from '../constants.js';
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : constants.SERVER_ERROR;
  let errorTitle = "";
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      errorTitle = 'Validation Field';
      break;
    case constants.NOT_FOUND:
      errorTitle = 'Not Found';
      break;
    case constants.UNAUTHORIZED:
      errorTitle = 'Unauthorized';
      break;
    case constants.FORBIDDEN:
      errorTitle = 'Forbidden';
      break;
    case constants.SERVER_ERROR:
      errorTitle = 'Server Error';
      break;
    default:
      errorTitle = 'Unknown Error';
      break;
  }
  res.status(statusCode).json({
    title: errorTitle,
    message: err.message,
    stackTrace: err.stack
  });
};

export default errorHandler;
