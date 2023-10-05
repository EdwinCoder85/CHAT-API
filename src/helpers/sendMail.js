const transporter = require("./mailer");
const jwt = require("jsonwebtoken");
const path = require("path");
const ejs = require("ejs");
const getImages = require("./getImages");
require("dotenv").config();

const sendMail = (email, subject, template, attachments) => {
  transporter.sendMail({
    to: email,
    subject, // subject: subject
    html: template,
    attachments
    // html: `<h1> Hola ${firstname} ${lastname} Dar click en el <a href="http://localhost:5173/auth/email-validation?token=${token}">enlace</a> para verificar el correo</h1>`,
  });
};

const getTemplate = async (templatePath, templateVar) => {
  const emailTemplate = path.join(
    __dirname,
    templatePath
  );
  const template = await ejs.renderFile(emailTemplate, templateVar); // paso un objeto con todas las variables
  return template;
};

const sendWelcomeEmail = async (email, data) => {
  // generar el token
  const token = jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, {
    expiresIn: "3d",
    algorithm: "HS512",
  });
  // renderizar el template
  const template = await getTemplate("../views/welcome/welcome-email.ejs", {
    ...data,
    token,
    url: process.env.FRONT_URL
  });

  // obtener las imagenes a adjuntar
  // ! TODO crear funcion para obtener el arreglo de imagenes de manera asincrona
  const attachments = await getImages('/views/welcome/images');

  // const attachments = [
  //   {
  //   filename: 'illo_welcome_1.png',
  //   path: path.join(__dirname, '../views/welcome/images/illo_welcome_1.png'),
  //   cid: 'illo_welcome'
  // },
  // {
  //   filename: 'Logo.png',
  //   path: path.join(__dirname, '../views/welcome/images/Logo.png'),
  //   cid: 'logo'
  // },
  // {
  //   filename: 'facebook2x.png',
  //   path: path.join(__dirname, '../views/welcome/images/facebook2x.png'),
  //   cid: 'facebook'
  // },
  // {
  //   filename: 'twitter2x.png',
  //   path: path.join(__dirname, '../views/welcome/images/twitter2x.png'),
  //   cid: 'twitter'
  // },
  // {
  //   filename: 'instagram2x.png',
  //   path: path.join(__dirname, '../views/welcome/images/instagram2x.png'),
  //   cid: 'instagram'
  // },
  // {
  //   filename: 'pinterest2x.png',
  //   path: path.join(__dirname, '../views/welcome/images/pinterest2x.png'),
  //   cid: 'pinterest'
  // },
  // {
  //   filename: 'Beefree-logo.png',
  //   path: path.join(__dirname, '../views/welcome/images/Beefree-logo.png'),
  //   cid: 'Beefree-logo'
  // }
  // ]


  // firstname, lastname, token
  // enviar el correo
  sendMail(email, "Bienvenido a academlo chat", template, attachments);
};

module.exports = sendWelcomeEmail;
