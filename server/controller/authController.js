import User from "../model/userModel.js";
import bcrypt from 'bcrypt';

// logic for user registration
export const createUser = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(409).json({message:"User already exists. Please try another email"});
        }
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password,salt);
        const createdUser = await User.create({email,password});
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
        // const comparedPassword = await bcrypt.compare(password,user.password);
        const user = await userExists.comparedPassword(password);

        if(!user){
            return res.status(404).json({message:"Email or password do not match"});
        }
        
        res.status(200).json({user, message:"Login successfull"});
        
    } catch (error) {
        res.status(500).json({message:"Error in login"});
    }
}