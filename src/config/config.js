require("dotenv").config();

// * con un archivo de extension js ya se puede exportar como objeto

module.exports = {
  development: {
    username: "postgres",
    password: "root",
    database: "chat_db_27",
    host: "localhost",
    dialect: "postgres",
    logging: false
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_PORT,
    logging: false, // no quiero que sequelize haga console.log
    dialectOptions: { ssl: { required: true, rejectUnauthorized: false } }
  },
};