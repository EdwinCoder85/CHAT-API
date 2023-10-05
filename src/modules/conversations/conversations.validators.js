const { check } = require("express-validator");
const validateResult = require("../../middlewares/validator.middleware");

const conversationValidator = [
  check("title", "Error in title field")
  .exists()
  .withMessage("The title property is not included")
  .notEmpty()
  .withMessage("The title value must not be empty")
  .isString()
  .withMessage("The title value must be string")
  .isLength({ min: 20, max: 50 })
  .withMessage(""),
  check("type", "Error in title field")
    .exists()
    .withMessage("The type property is not included")
    .notEmpty()
    .withMessage("The type value must not be empty")
    .isString()
    .withMessage("The type value must be string"),
    validateResult,
];