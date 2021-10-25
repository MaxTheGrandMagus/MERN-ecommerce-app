import express from "express";
const router = express.Router();
import { addOrderItems } from "../controllers/order.controller.js";
import { protect } from '../middleware/auth.middleware.js';


router.route('/').post(protect, addOrderItems)


export default router;