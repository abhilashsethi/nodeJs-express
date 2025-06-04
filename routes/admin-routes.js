import express from 'express';
import { getAllUsers } from '../controllers/auth-controller.js';
import adminMiddleware from '../middleware/admin-middleware.js';
import authMiddleware from '../middleware/auth-middleware.js';

const router = express.Router();

router.get("/welcome", authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome to the admin page"
  })
})

router.get("/all-users", authMiddleware, adminMiddleware, getAllUsers)

export default router;