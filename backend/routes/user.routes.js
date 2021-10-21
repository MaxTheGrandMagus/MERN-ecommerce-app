import express from "express";
const router = express.Router();
import { authUser, getUserProfile, registerUser, updateUserProfile } from "../controllers/user.controller.js";
import { protect } from '../middleware/auth.middleware.js';


router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)



export default router;