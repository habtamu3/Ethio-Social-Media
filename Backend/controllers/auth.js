import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            location,
            occupation,
            friends // Assuming this is an array of friends
        } = req.body;

        // Check if picture file is uploaded
        const picturePath = req.file ? req.file.path : null;

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            location,
            occupation,
            picturePath,
            friends,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Send response
        res.status(201).json(savedUser);
    } catch (error) {
        // Handle errors
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const login=async(req,res)=>{
    try{
        const {email, password}=req.body;
        const user=await User.findOne({email:email});
        if(!user) return res.status(400).json({msg:"User does not exist"});
        const match=await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({msg:"invald credentials"});
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token,user});

    }catch(error){
        res.status(500).json({error:error.message});
    }
}