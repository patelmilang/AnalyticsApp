
const express = require("express");
const cors = require("cors");
// const sequelize = require('./models/connection');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
const sendmail = require('./utils/mail.util');
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



const {
  ConnectionServiceClient,
} = require('@google-cloud/bigquery-connection');


app.get("/google", async (req, res) => {
  // Creates a client
await callGetConnection();
  res.json({ message: "Welcome to application." });
});


 const connectionClient = new ConnectionServiceClient();
 async function callGetConnection() {

  await authenticateImplicitWithAdc('serene-foundry-350604');
      const name = 'serene-foundry-350604'
//   // Construct request
   const request = {
    name,
   };

//   // Run request
  // const response = await connectionClient.getConnection(name);
  
 }
 const {Storage} = require('@google-cloud/storage');

 async function authenticateImplicitWithAdc(projectId) {
   // This snippet demonstrates how to list buckets.
   // NOTE: Replace the client created below with the client required for your application.
   // Note that the credentials are not specified when constructing the client.
   // The client library finds your credentials using ADC.
   const storage = new Storage({
     projectId,
   });
   const [buckets] = await storage.getBuckets();
   console.log('Buckets:');
 
   for (const bucket of buckets) {
     console.log(`- ${bucket.name}`);
   }
 
   console.log('Listed all storage buckets.');
 }
 
 
// // // set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


