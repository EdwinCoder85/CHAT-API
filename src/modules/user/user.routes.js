const { Router } = require("express");
const { User, Participant } = require("../../models");
const {
  registerUser,
  loginUser,
  validateUserEmail,
  getAllUsers,
  uploadAvatar,
} = require("./user.controllers");
const authenticate = require("../../middlewares/auth.middleware");
const { registerUserValidator, loginValidator } = require("./user.validator");
const upload = require("../../middlewares/imageUpload.middleware");
const router = Router();

router
  .route("/")
  .get(getAllUsers)
  .post(registerUserValidator, registerUser)
  .get(async (req, res, next) => {
    try {
      const result = User.findAll({
        include: {
          model: Participant,
        },
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

router.put("/:id", authenticate, upload.single("avatar"), uploadAvatar);

router.post("/login", loginValidator, loginUser);

router.post("/validate", validateUserEmail);

module.exports = router;
