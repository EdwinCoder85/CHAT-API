// * Si requiere crear mensajes se requiere del modelo de conversacion
const { Message, User } = require("../../models");

const createConversationMessage = async (req, res, next) => {
  try {
    const { id: conversationId } = req.params;
    // * senderId es quien envia el mensaje
    const { senderId, content } = req.body;

    await Message.create({
      conversationId,
      senderId,
      content,
    });

    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const getConversationMessages = async (req, res, next) => {
  try {
    const { id: conversationId } = req.params;

    const messages = await Message.findAll({
      where: { conversationId },
      include: {
        model: User,
        attributes: ["firstname", "lastname"]
      }
    });
    res.json(messages);
    // * buscarian la conversacion y le harian include con messages
    // * con un where
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversationMessage,
  getConversationMessages
};
