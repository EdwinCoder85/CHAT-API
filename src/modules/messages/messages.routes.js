const { Router } = require("express");
const {
  createConversationMessage,
  getConversationMessages,
} = require("./messages.controllers");
const { messageValidator } = require("./messages.validators");
const authenticate = require("../../middlewares/auth.middleware");

const router = Router();
// * se requiere los mensajes de una sola conversacion
// * se va crear un mensaje de la conversacion
router
  .route("/conversation/:id")
  .post(authenticate, messageValidator, createConversationMessage)
  .get(authenticate, getConversationMessages);

module.exports = router;
