import express from 'express';
import { createUser, userLogin } from '../controller/authController.js';

const router = express.Router();


router.route("/register").post(createUser);
router.route("/login").post(userLogin);

export default router;