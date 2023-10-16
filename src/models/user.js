const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  newsPreference: String,
});

const User = mongoose.model("User", userSchema);

const userSchemaValidations = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).required(),
  newsPreference: Joi.string().required(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).required(),
});

// module.exports = User;
// module.exports = userSchemaValidations;
// module.exports = loginValidation;

module.exports = {
  User,
  userSchemaValidations,
  loginValidation,
};
