const { check } = require("express-validator");
const validateResult = require("../../middlewares/validator.middleware");

const registerUserValidator = [
  check("firstname", "Error in firstname field")
    .exists()
    .withMessage("The firstname property is not included")
    .notEmpty()
    .withMessage("The firstname must not be empty")
    .isString()
    .withMessage("The firstname value must be string")
    .isLength({ min: 2, max: 50 })
    .withMessage("The length of the name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]/)
    .withMessage("firstname only accepts letters"),
  check("lastname", "Error in lastname field")
    .exists()
    .withMessage("The lastname property is not included")
    .notEmpty()
    .withMessage("The lastname must not be empty")
    .isString()
    .withMessage("The lastname value must be string")
    .isLength({ min: 2, max: 50 })
    .withMessage("The length of the last name to be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]/)
    .withMessage("The lastname only accepts letters"),
  check("email", "Error in email field")
    .exists()
    .withMessage("The email property is not included")
    .notEmpty()
    .withMessage("The email property must not be empty")
    .isString()
    .withMessage("The email property must be string")
    .isLength({ min: 7, max: 50 })
    .withMessage("The email must be a minimum of 7 and a maximum of 50 characters"),
  check("password", "Error in password field")
    .exists()
    .withMessage("The password property is not included")
    .notEmpty()
    .withMessage("The password property must not be empty")
    .isString()
    .withMessage("The email property must be string")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%-^&*]{8,}$/
    )
    .withMessage(
      "The password must be a minimum of 8 characters, one uppercase letter, one lowercase letter and one special character"
    ),
  validateResult,
];

const loginValidator = [
  check("email", "Error in email field")
    .exists()
    .withMessage("The email property is not included")
    .notEmpty()
    .withMessage("The email property must not be empty")
    .isString()
    .withMessage("The email property must be string")
    .isEmail()
    .withMessage("The email property does not have the email format"),
  check("password", "Error in password field")
    .exists()
    .withMessage("The password property is not included")
    .notEmpty()
    .withMessage("The password property must not be empty")
    .isString()
    .withMessage("The password property must be string"),
];

module.exports = {
  registerUserValidator,
  loginValidator,
};
