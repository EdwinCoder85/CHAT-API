// import express from 'express';
const path = require("node:path");
const express = require("express"); // cjs - common java script
const morgan = require("morgan");
const cors = require("cors");
const apiv1Routes = require("./routes/apiv1.routes");
const errorRoutes = require("./routes/error.routes");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/avatar", express.static(path.join(__dirname, "../public")))

app.get("/", (req, res) => {
  res.send("ok");
});

apiv1Routes(app);
errorRoutes(app);

// los middlewares de error los ubicamos despues de todas nuestras rutas

module.exports = app;
