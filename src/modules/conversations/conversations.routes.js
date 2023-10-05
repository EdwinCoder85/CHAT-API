const { Router } = require("express");
const {
  createConversation,
  createGroupConversation,
  getAllConversations,
} = require("./conversations.controllers");
const authenticate = require("../../middlewares/auth.middleware");

const router = Router();

// crear conversaciones
// crear conversaciones grupales
// obtener todas las conversaciones
// obtener una conversación con todos los mensajes

// * RUTA PROTEGIDAS a traves de authenticate
router.post("/", authenticate, createConversation);
router.post("/group", authenticate, createGroupConversation);

router.get("/:id", getAllConversations);

module.exports = router;
