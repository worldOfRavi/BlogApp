import "dotenv/config"
import express from 'express';
import cors from 'cors';
const app = express();
import connectDB from "./utils/db.js";
import authRoutes from "./routes/authRouter.js"

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/auth",authRoutes);

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port number ${PORT}`);
    })
})


