class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, req, res /* next */) => {
  // eslint-disable-line no-unused-vars
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export { ErrorHandler, handleError };
