import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';
import adminMiddleware from '../middleware/admin-middleware.js';
import { upload } from '../middleware/upload-middleware.js';
import { deleteImageController, fetchImagesController, uploadImage } from '../controllers/image-controller.js';

const router = express.Router();

router.post("/upload", authMiddleware, adminMiddleware, upload.single("image"), uploadImage)
router.get("/get", authMiddleware, fetchImagesController)
router.delete("/:id", authMiddleware, adminMiddleware, deleteImageController)


export default router;