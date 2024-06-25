const express = require("express");
const router = express.Router();
  
const {login,signup} = require("../Controllers/Auth"); 
const {auth,isStudent,isAdmin}=require("../middlewares/auth");
router.post("/signup", signup); 
router.post("/login", login); 
 
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for tests',
    })
})
//protected routes 
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for students',
    })
})

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for Admin',
    })
})

module.exports = router;