const { check } = require("express-validator");
const validateResult = require("../../middlewares/validator.middleware");

const conversationValidator = [
  check("userId", "Error in user field")
    .exists()
    .withMessage("The user property is not included")
    .notEmpty()
    .withMessage("The user value must not be empty")
    .isNumeric()
    .withMessage("The user value must be numeric"),
  check("participantId", "Error in participants field")
    .exists()
    .withMessage("The participant property is not included")
    .notEmpty()
    .withMessage("The participant value must not be empty")
    .isNumeric()
    .withMessage("The participant value must be numeric"),
  validateResult,
];

const conversationGroupValidator = [
  check("userId", "Error in user field")
    .exists()
    .withMessage("The user property is not included")
    .notEmpty()
    .withMessage("The user value must not be empty")
    .isNumeric()
    .withMessage("The user value must be numeric"),
  check("participantsIds", "Error in participants field")
    .exists()
    .withMessage("The participants property is not included")
    .notEmpty()
    .withMessage("The participants value must not be empty")
    .isArray()
    .withMessage("The value of the participants must be an arrangement"),
  check("title", "Error in title field")
    .exists()
    .withMessage("The title property is not included")
    .notEmpty()
    .withMessage("The title value must not be empty")
    .isString()
    .withMessage("The title value must be string"),
  validateResult,
];

module.exports = {
  conversationValidator,
  conversationGroupValidator,
};
