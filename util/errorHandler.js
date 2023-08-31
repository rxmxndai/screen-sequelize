const customError = require("./customError");

const globalErrorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;
  const data = error.data;
  
  // custom thrown error
  if (error instanceof customError) {
    return res.status(status).json({message, data})
  }

  return res.status(status).json({ message: message, data});
};

module.exports = globalErrorHandler;
