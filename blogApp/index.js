const express = require("express"); //taking instance of express framework

//making instance of server of name app
const app = express();

/*
//this for intial cheking our environment pusopose
//activate server
app.listen(3000,()=>{
    console.log("App is running SuccesFully");
})

//default Route

app.get("/",(req,res)=>{
    res.send("<h1>This is HomePage of blogApp </h1>");
})
*/

//loading configuration
require("dotenv").config();

//finding PORT no
const PORT = process.env.PORT || 3000;

//middleWare
//if we need to parse json body then we do it
app.use(express.json());

//import Routes
const blog = require("./routes/blog");

//mouting this route
app.use("/api/v1",blog)

const connectWithdb=require("./config/database");
connectWithdb();

//start the server
app.listen(PORT,()=>{
    console.log(`App is started at Port no ${PORT}`);
})

app.get("/",(req,res)=>{
    res.send("<h1> This is my HomePage of blogApp</h1>")
})
