const express=require("express");
const app=express();

require('dotenv').config();

app.use(express.json());

require("./config/database").connect();
//route import and mount 
   
const user=require("./routes/user");
app.use("/api/v1",user);

const PORT = process.env.PORT || 3000;  // Use po  rt 3000 or another available port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
