import express from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from '../controllers/book-controller.js';

const router = express.Router();

router.get('/get', getAllBooks)
router.get("/get/:id", getBookById)
router.post('/add', createBook)
router.put('/update/:id', updateBook)
router.delete('/delete/:id', deleteBook)

// Export the router
export default router;