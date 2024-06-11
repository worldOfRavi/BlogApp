import "dotenv/config";
import express from 'express';
import cors from 'cors';
import connectDB from "./utils/db.js";
import authRoutes from "./routes/authRouter.js";
import postRoutes from "./routes/postRouter.js";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize the express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/post", postRoutes);

// Get the file URL of the current module
const __filename = fileURLToPath(import.meta.url);

// Resolve the directory name from the file URL
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port number ${PORT}`);
    });
});
