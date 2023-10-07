const { Router } = require("express");
const {
  createConversation,
  createGroupConversation,
  getAllConversations,
} = require("./conversations.controllers");
const authenticate = require("../../middlewares/auth.middleware");
const { conversationValidator } = require("./conversations.validators");
const router = Router();

// crear conversaciones
// crear conversaciones grupales
// obtener todas las conversaciones
// obtener una conversación con todos los mensajes

// * RUTA PROTEGIDAS a traves de authenticate
router.post("/", authenticate, conversationValidator, createConversation);
router.post("/group", authenticate, conversationValidator, createGroupConversation);

router.get("/:id", authenticate, getAllConversations);

module.exports = router;
