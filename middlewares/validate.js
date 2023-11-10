export const bodyValidate = (validator) => {
  return async function (req, res, next) {
    const resultValidate = validator.validate(req.body);
    if (resultValidate.error) {
      const errorMessage = resultValidate.error.details[0].message;
      return res.status(400).json({
        status: "error",
        code: 400,
        message: errorMessage,
      });
    }
    return next();
  };
};
