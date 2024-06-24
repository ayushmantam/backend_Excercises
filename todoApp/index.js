const express = require("express");
const app = express();

// load config from env
//for getting value from .env folder
require("dotenv").config();

PORT = process.env.PORT || 4000;

// //middleware to parse json request body
//parsing process
app.use(express.json());

//import routes for TODO API
const todoroutes = require("./routes/todos");

// ///route the todo  API routes;
//mounting ==> locahost/api/v1/createRotues
app.use("/api/V1", todoroutes); 

//start server
// app.listen(3000,()=>{
//   console.log("App is running Successfully");
// })
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
  console.log("app is running successfully--->>>");
});

// //connet to the database
const dbConnect = require("./config/database");
dbConnect();

//default route
app.get("/", (req, res) => {
  res.send("<h1> this is HOMEPAGE baby<h1/>");
});
