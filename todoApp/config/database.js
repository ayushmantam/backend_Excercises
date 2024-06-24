//getting mongoose instance

const mongoose = require("mongoose");

require("dotenv").config();

//function to make connection between database and App
const dbConnect = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(()=>{
    console.log("DB ka connection is successful ===>>>")
  })
  .catch((error)=> {
    console.log("Issue in DB Connection")
    console.error(error.message);
    //what is mean of this ?
    process.exit(1);
  });
};

//feed databaseurl in process object we use .env library
//for it we install it by npm i dotenv

module.exports=dbConnect; 