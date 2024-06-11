import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
// method for hashing the password
userSchema.pre('save',async function(next){
    const user = this;
    if(!user.isModified("password")){
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password,salt);
        user.password = hashedPassword;
    } catch (error) {
        next(error)
    }
})

// method for comparing the password
userSchema.methods.comparedPassword= async function(password){
    return bcrypt.compare(password, this.password);
}

const User = new model("User",userSchema);

export default User;