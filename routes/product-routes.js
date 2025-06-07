import express from 'express';
import { getProductAnalysis, getProductStats, insertSampleProducts } from '../controllers/product-controller.js';

const router = express.Router();

router.post("/add", insertSampleProducts);
router.get("/stats", getProductStats);
router.get("/analysis", getProductAnalysis)

export default router;