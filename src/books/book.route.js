const express = require('express')
const router = express.Router();
const {postBook, getAllBooks, getBook, updateBook, deleteBook} = require('./Controllers/book.controller.js');
const verifyAdminToken = require('../middleware/verifyAdminToken.js');
// const Book = require('./book.model')
// post a book
// post when submit something frontend to db
// get -> get something back from db
// put/patch -> edit or update something
// express.Router is better than app.get() provide better maintainability

// frontend => backend Server => controller => book schema => database => send to server => back to frontend
router.post("/create-book", verifyAdminToken,  postBook)

// get all books
router.get("/", getAllBooks)

// get a single book
router.get("/:id", getBook)

// update a book
router.put("/update/:id", verifyAdminToken, updateBook)

// delete book
router.delete("/:id", verifyAdminToken, deleteBook)

module.exports = router