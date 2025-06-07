import express from 'express';
import { createAuthor, createBook, createNewBook, deleteBook, getAllBooks, getBookById, updateBook } from '../controllers/book-controller.js';

const router = express.Router();

router.get('/get', getAllBooks)
router.get("/get/:id", getBookById)
router.post('/add', createBook)
router.put('/update/:id', updateBook)
router.delete('/delete/:id', deleteBook)
router.post('/add-author', createAuthor)
router.post('/add-new-book', createNewBook)

// Export the router
export default router;