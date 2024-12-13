const Book = require('../book.model.js')
const postBook = async (req, res) => {
    console.log(req.body)
    try{
        const newBook = await Book({...req.body})
        await newBook.save();
       return res.status(200).send({message:"Book posted successfully", book: newBook})
    }catch(error){
        console.error("Error creating book", error)
       return res.status(500).send({message: "Failed to create book"})
    }
}

// get all books
const getAllBooks = async (req, res) => {
    try{
        const books = await Book.find().sort({createdAt: -1})
       return res.status(200).send(books)
    }catch(error){
        console.error("Error while fetching book", error)
       return res.status(500).send({message: "Failed to fetch book"})
    }
}

const getBook = async (req, res) => {
    try{
    const {id} = req.params
    console.log(id)
    const book = await Book.findById(id)
    // res.status(200).send(book)
    if(!book){
        return  res.status(404).send({message: "Book not found!"})
    }
    return res.status(200).send(book)
 } catch(error){
    console.error("Error fetching book", error);
    return res.status(500).send({message: "Failed to fetch book"})
 }
}

const updateBook = async (req, res) => { 
     try{
        const {id} = req.params
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true})
        if(!updatedBook){
           return res.status(404).send({message: "Book is not Found!"})
        }
       return res.status(200).send({
            message: "Book Updated Successfully",
            book: updateBook
        })
     }catch(error){
        console.error("Error updating book", error)
       return res.status(500).send({message: "Failed to update a book"})
     }
}

const deleteBook = async (req, res) => {
    try{
        const {id} = req.params
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook){
          return  res.status(404).send({message: "Book is not Found!"})

        }
       return res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    }catch(error){
        console.error("Error deleting a book", error);
       return res.status(500).send({message: "Failed to delete a book"})
    }
}

module.exports = {
    postBook,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook
}