import Book from "../models/book.js"


const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({})
    if (allBooks.length > 0) {
      res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        books: allBooks
      })
    } else {
      res.status(404).json({
        success: false,
        message: "No books found"
      })
    }
  } catch (error) {
    console.log("Error fetching books:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id
    const bookDetails = await Book.findById(bookId)
    if (!bookDetails) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      })
    } else {
      res.status(200).json({
        success: true,
        message: "Book fetched successfully",
        book: bookDetails
      })
    }

  } catch (error) {
    console.log("Error fetching book by ID:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      year
    } = req.body
    const newlyCreatedBook = await Book.create({
      title,
      author,
      year
    })
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      book: newlyCreatedBook
    })
  } catch (error) {
    console.log("Error creating book:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const updateBook = async (req, res) => {

  try {
    const bookId = req.params.id
    const {
      title,
      author,
      year
    } = req.body

    const updatedBook = await Book.findByIdAndUpdate({
      _id: bookId
    }, {
      title,
      author,
      year
    }, {
      new: true,
      runValidators: true
    })
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      })
    } else {
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        book: updatedBook
      })
    }
  } catch (error) {
    console.log("Error updating book:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id
    const deletedBook = await Book.findByIdAndDelete(bookId)
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      })
    } else {
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        book: deletedBook
      })
    }
  } catch (error) {
    console.log("Error deleting book:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

// Export the controller functions
export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};