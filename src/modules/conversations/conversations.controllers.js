const { Conversation, User, Participant } = require("../../models");

const createConversation = async (req, res, next) => {
  try {
    const { userId, participantId } = req.body;
    // creo la conversación
    const conversation = await Conversation.create({ createdBy: userId });
    // agregar a los participantes a la conversacion -> creandolos en la tabla pivote
    const { id: conversationId } = conversation;
    const user = await User.findByPk(userId);
    const participant = await User.findByPk(participantId);
    await conversation.addUser(user); // instancia de un usuario
    await conversation.addUser(participant);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

// poder manipular la tabla pivote
/*
@participantId -> arreglo de ids
*/
const createGroupConversation = async (req, res, next) => {
  try {
    // ? cuantos participantes se van a enviar cuando se crea el grupo
    const { userId, participantsIds, title } = req.body;
    const conversation = await Conversation.create({
      createdBy: userId,
      title,
      type: "group",
    });
    // necesitamos crear a los participantes en la table pivote
    // {UserId, ConversationId}
    // agregar al UserId dentro del arreglo de participantsIds
    const createParticipants = [...participantsIds, userId].map(
      (participant) => ({
        ConversationId: conversation.id,
        UserId: participant,
      })
    );
    // console.log(createParticipants);
    await Participant.bulkCreate(createParticipants);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const getAllConversations = async (req, res, next) => {
  try {
    const { id } = req.params;

    const conversations = await Participant.findAll({
      where: { UserId: id },
      // attributes: {
      //   exclude: ["UserId", "ConversationId"],
      // },
      include: {
        model: Conversation,
        include: {
          model: Participant,
          include: {
            model: User,
            attributes: ["firstname", "lastname", "avatar"],
          },
        },
      },
    });
    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversation,
  createGroupConversation,
  getAllConversations,
};
