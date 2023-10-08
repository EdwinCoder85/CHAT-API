const { check } = require("express-validator");
const validateResult = require("../../middlewares/validator.middleware");

const messageValidator = [
  check("content", "Error in content field")
    .exists()
    .withMessage("The content field is not included")
    .notEmpty()
    .withMessage("The content field must not be empty")
    .isString()
    .withMessage("The content value must be string")
    .isLength({ min: 10, max: 50 })
    .withMessage("The length of the name must be between 10 and 50 characters"),
  check("senderId", "Error in sender field")
    .exists()
    .withMessage("The sender property is not included")
    .notEmpty()
    .withMessage("The sender value must not be empty")
    .isNumeric()
    .withMessage("The sender value must be numeric"),
  validateResult,
];

module.exports = {
  messageValidator,
};
