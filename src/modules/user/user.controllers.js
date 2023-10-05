const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    // {firstname, lastname, email, password}
    // vamos a realizar una consulta a la base de datos innecesaria
    // validar los datos
    await User.create(newUser);
    res.status(201).end();
    // enviar un correo al usuario
  } catch (error) {
    next(error);
  }
};
// manejar las excepciones
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    // null || {} -> objeto json
    if (!user) {
      throw {
        status: 400,
        error: "User does not exist mid",
        message: "You need register before login",
      };
    }
    // * contraseña en user.password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw {
        status: 400,
        error: "Incorrect password",
        message: "The password does not match with the user",
      };
    }

    if (!user.validEmail) {
      throw {
        status: 401,
        error: "Email verification needed",
        message: "Look at your email message for a verification email",
      };
    }

    // * generar token
    const copyUser = { ...user.dataValues };
    delete copyUser.password;
    const token = jwt.sign(copyUser, process.env.JWT_SECRET, {
      algorithm: "HS512",
      expiresIn: "1d",
    });

    copyUser.token = token;
    res.json(copyUser);
  } catch (error) {
    // res.status(400).json(error);
    next(error);
  }
};

const validateUserEmail = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw {
        status: 400,
        message: "Token is required",
      };
    }
    const { email } = jwt.verify(token, process.env.JWT_EMAIL_SECRET, {
      algorithms: "HS512",
    }); // * {email}
    const user = await User.findOne({ where: { email } }); // * es una instancia de ese usuario
    if (user.validEmail) {
      throw {
        status: 400,
        message: "Email is already verified",
      };
    }
    user.validEmail = true;
    user.save();
    res.json({
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    const { file } = req;
    const { id } = req.params;
    // construir una url para la imagen
    // http://localhost:8001/avatars/1696388259083-2fcf7e1c3e57d993a11f90046a3c9fa6.jpg
    // https://lñsadkjfklsadfjadslkf.fl0.com/avatars/1696388259083-2fcf7e1c3e57d993a11f90046a3c9fa6.jpg
    const imagUrl = `${process.env.APP_URL}/avatar/${file.filename}`;
    await User.update({ avatar: imagUrl }, { where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  validateUserEmail,
  getAllUsers,
  uploadAvatar,
};
