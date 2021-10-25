import express from "express";
const router = express.Router();
import { addOrderItems, getOrderById } from "../controllers/order.controller.js";
import { protect } from '../middleware/auth.middleware.js';


router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)


export default router;