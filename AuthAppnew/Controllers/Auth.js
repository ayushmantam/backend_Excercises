const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt=require("jsonwebtoken");
require("dotenv").config();
exports.signup = async (req, res) => {
    try {
        // Get data from request body
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Secure password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user 
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered, please try again later"
        });
    }
};


exports.login = async (req, res) => {
    try {
        //data fetch
        const { email, password } = req.body;

        //validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'please fill all the details carefully'
            })
        }

        //check for registered user
        const user = await User.findOne({ email });
        //if not a registered user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered!!',
            }
            )
        }
        
        const payload={
            email:user.email,
            id:user._id,
            role:user.role,
        }
        //password verfication & generate a JWT token
        if(await bcrypt.compare(password,user.password)){ //password matched

            let token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});

            // user.toObject();
            user.token=token;
            user.password=undefined;

            const options={
                expiresIn:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("cookierKaNaam",token,options).status(200).json({
                success:true,
                token,
                user,
                message:'User Logged In successfully',
            })

        }
        else{
            return res.status(401).json({
                success: false,
                message: 'password Incorrect',
            }
            )
        }

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login failure"
        });
    }
}