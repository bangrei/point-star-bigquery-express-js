var { body } = require("express-validator");

const formValidator = [
  body("name", "Name is required!").not().isEmpty(),
  body("email", "Invalid email address").isEmail(),
  body("phone", "phone must be Alphanumeric").isAlphanumeric(),
  body("address", "Address is required!").not().isEmpty(),
  body("country", "Country is required!").not().isEmpty(),
  body("state", "State is required!").not().isEmpty(),
  body("city", "City is required!").not().isEmpty(),
  body("zipcode", "ZIP code is required!").not().isEmpty(),
  body("dob", "Invalid date of birth").isISO8601(),
  body("business", "Business type is required!").not().isEmpty(),
];

module.exports = formValidator;
