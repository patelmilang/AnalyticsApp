
const express = require("express");
const cors = require("cors");
// const sequelize = require('./models/connection');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const logger = require("./logger/logger");

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(cookieParser());
app.use('/api', indexRouter)
app.use('/api/user', authRouter);

 

// // simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});





// // // set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


