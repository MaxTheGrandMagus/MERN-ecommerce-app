import express from "express";
const router = express.Router();
import { 
    getProducts, 
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview
} from "../controllers/product.controller.js";
import { protect, admin } from '../middleware/auth.middleware.js';


router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)

export default router;