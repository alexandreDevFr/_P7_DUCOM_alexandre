const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const Post = require("./models/post");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const path = require("path");
var morgan = require('morgan')
// Add configuration file
const config = require('./config');
// Data Sanitization against XSS
const xss = require('xss-clean');
// Add 14 middleware to prevent few attacks
const helmet = require('helmet');
// Data Sanitization against NoSQL Injection Attacks
const mongoSanitize = require('express-mongo-sanitize');
require("dotenv").config();
const app = express();
// Helmet
app.use(helmet());
app.use(express.json())

app.use(morgan('dev'))

//debug mod of mongoose
//mongoose.set('debug', true);
//


// connexion to mongoDB
mongoose
  .connect(
    "mongodb+srv://" + config.user + ":" + config.password + "@cluster0.2jv9w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Add CORS in the headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// app.use(bodyParser.json());

// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());

// Prevent DOS attacks
app.use(express.json({ limit: '10kb' })); // Body limit is 10kb
//
// Data Sanitization against XSS attacks
app.use(xss());


//


app.use("/api", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/posts", postsRoutes);

module.exports = app;
