const userRoutes = require("../modules/user/user.routes");
const conversationsRoutes = require("../modules/conversations/conversations.routes");
const messageRoutes = require("../modules/messages/messages.routes");
const apiv1Routes = (app) => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/conversations', conversationsRoutes);
  app.use("/api/v1/messages", messageRoutes);
};

module.exports = apiv1Routes;


