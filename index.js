import dotenv from 'dotenv';
import express from 'express';
import connectToDb from './database/db.js';
import bookRoutes from './routes/book-routes.js';
import authRoutes from './routes/auth-routes.js';
import homeRoutes from './routes/home-routes.js';
import adminRoutes from './routes/admin-routes.js';
import imageRoutes from './routes/image-routes.js';
import productRoutes from './routes/product-routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//connect to database
connectToDb()

// Middleware to parse JSON bodies
app.use(express.json());

// routes
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/products", productRoutes)

app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
})

