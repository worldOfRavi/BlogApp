import express from 'express';
import { createUser, userLogin, userProfile,logout } from '../controller/authController.js';

const router = express.Router();


router.route("/register").post(createUser);
router.route("/login").post(userLogin);
router.route("/profile").get(userProfile);
router.route("/logout").post(logout);

export default router;