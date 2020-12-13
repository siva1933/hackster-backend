const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const teamRoutes = require("./routes/team");
const uri = `mongodb+srv://siva_1933:C26qgYsY6Akb7QR@demoapps.qaxs4.mongodb.net/hacksters?retryWrites=true&w=majority`;

const app = express();
app.use(bodyParser.json());

app.use("/api/hackster", teamRoutes);

app.use((error, req, res, next) => {
  res.status(error.statusCode || 422).json({
    message: error.message,
    errors: error.errors || [],
  });
});

app.use("/", (req, res, next) => {
  res.send({
    success: true,
    message: "Up and running...!",
  });
});

mongoose
  .connect(uri)
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => {
    console.error(err);
  });
