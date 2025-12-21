import User from "../../models/User.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../../lib/env.js";


export const signup = async (req,res)=>{
    const {fullName, email, password} = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message:"All fields are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message:"Password must be at least of 6 characters"
            });
        }

        //checking the email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message:"Invalid email format"
            });
        }

        const user = await User.findOne({email});
        if (user) return res.status(400).json({message:"User already exists"})
    
        //hashing the password
        const salt = await bcrypt.genSalt(10)    
        const hashedPassword = await bcrypt.hash(password,salt)

        //creating new user
        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res)
            const savedUser = await newUser.save()

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

            //send the welcome mail
            try {
                await sendWelcomeEmail(savedUser.email,savedUser.fullName, ENV.CLIENT_URI);
            } catch (error) {
                console.error("Failed to send welcome email:", error);
            }
            
        } else{
            res.status(400).json({
                message:"Invalid user data"
            });
        }
    } catch (error) {
         console.error("Error in signup controller");
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}