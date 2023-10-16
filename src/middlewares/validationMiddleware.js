const { userSchemaValidations, loginValidation } = require("../models/user");

const validateUserRegister = (req, res, next) => {
  const { error } = userSchemaValidations.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  next();
};

const validateUserLogin = (req, res, next) => {
  const { error } = loginValidation.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  next();
};

module.exports = {
  validateUserRegister,
  validateUserLogin,
};
