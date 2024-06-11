import User from "../model/userModel.js";
import jwt from 'jsonwebtoken';

// logic for user registration
export const createUser = async (req, res)=>{
    try {
        const {username,email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(409).json({message:"User already exists. Please try another email"});
        }
        const createdUser = await User.create({username,email,password});
        res.status(201).json({createdUser,message:"User registrated successfully"});
    } catch (error) {
        res.status(500).json({message:"Error white registration"});
    }
}

export const userLogin = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const userExists = await User.findOne({email});
        if(!userExists){
            return res.status(404).json({message:"Credentails do not match"});
        }
        const user = await userExists.comparedPassword(password);

        if(!user){
            return res.status(404).json({message:"Email or password do not match"});
        }
        
        const token = await jwt.sign({
            userId:userExists._id,
            username:userExists.username,
            email
        },
        process.env.SECRET_KEY,
        )    
        res.cookie('token', token 
        //     {
        //     httpOnly: true, // Accessible only by web server
        //     secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        //     sameSite: 'strict' // CSRF protection
        //   }
        );
        const userWithNoPassword = await User.findOne({email},{password:0});
        res.status(200).json({user:userWithNoPassword,token, message:"Login successful"});
        
    } catch (error) {
        res.status(500).json({message:"Error in login"});
    }
}

export const userProfile = async(req, res)=>{
    try {
        const {token} = req.cookies;
        // console.log(token);

        const user = await jwt.verify(token,process.env.SECRET_KEY);
        // console.log(user);
        res.status(200).json(user);
        // console.log(user);
        
    } catch (error) {
        res.status(500).json({message:"Error in profile"})
    }
}

export const logout = async(req, res)=>{
    try {
        res.cookie('token',"");
        res.json({message:"Logout successfull"})
    } catch (error) {
        res.status(500).json({mesaage:"Error in user logout"});
    }
}