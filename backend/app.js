const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const citiesRoutes = require("./routes/cities");
const managersRoutes = require("./routes/managers");
const driversRoutes = require("./routes/drivers");

const app = express();

mongoose
  .connect(
    "mongodb+srv://amit:35sKKp2yAFS9EZVH@cluster0-nhmu0.mongodb.net/node-angular?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Database Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/cities", citiesRoutes);
app.use("/api/managers", managersRoutes);
app.use("/api/drivers", driversRoutes);

module.exports = app;
