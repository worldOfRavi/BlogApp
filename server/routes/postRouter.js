import express from 'express';
import multer from "multer";
const uploadMiddleware = multer({ dest: 'uploads/' })
const router = express.Router();
import { createPost,getAllPost,postDetails, EditPost } from '../controller/postController.js';

router.route("/create").post(uploadMiddleware.single("file"), createPost);
router.route("/getposts").get(getAllPost);
router.route("/:id").get(postDetails).put(uploadMiddleware.single("file"),EditPost);

export default router;