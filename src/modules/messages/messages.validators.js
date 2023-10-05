const { check, validationResult } = require("express-validator");
const validateResult = require("../../middlewares/validator.middleware");

const messageValidator = [
  check("Content", "error in content field")
    .exists()
    .withMessage("The content field is not included")
    .notEmpty()
    .withMessage("The content field must not be empty")
    .isString()
    .withMessage("The content value must be string")
    .isLength({ min: 10, max: 50 })
    .withMessage("The length of the name must be between 10 and 50 characters"),
    validateResult
];


module.exports = {
  messageValidator
};