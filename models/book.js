import mongoose, { Schema } from "mongoose";
import Author from "./Author.js";

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
    maxLength: [100, "Book title cannot exceed 100 characters"]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Author,
    required: [true, "Author name is required"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Year of publication is required"],
    min: [1000, "Year cannot be before 1000"],
    max: [new Date().getFullYear(), "Year cannot be in the future"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Book = mongoose.model("Book", bookSchema);
export default Book;