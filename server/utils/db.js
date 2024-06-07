import mongoose from "mongoose";

// function to connect to database
const URI = process.env.URI;

const connectDB = async()=>{
    try {
        await mongoose.connect(URI);
        console.log("Connected to database successfully");
    } catch (error) {
        console.error("Failed to connect to database");
        process.exit(0);
    }
}

export default connectDB;