const { Router } = require("express");
const {
  createConversation,
  createGroupConversation,
  getAllConversations,
} = require("./conversations.controllers");
const { conversationValidator, conversationGroupValidator } = require("./conversations.validators");
const authenticate = require("../../middlewares/auth.middleware");
const router = Router();

// crear conversaciones
// crear conversaciones grupales
// obtener todas las conversaciones
// obtener una conversación con todos los mensajes

// * RUTA PROTEGIDAS a traves de authenticate
router.post("/", authenticate, conversationValidator, createConversation);
router.post(
  "/group",
  authenticate,
  conversationGroupValidator,
  createGroupConversation
);

router.get("/:id", authenticate, getAllConversations);

module.exports = router;
