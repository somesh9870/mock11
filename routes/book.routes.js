const express = require("express");
const BookModel = require("../models/book.model");
const isAuth = require("../middlewares/auth.middleware");

const bookRouter = express.Router();

// route to get all the books and we can also search basis on any possible combination
bookRouter.get("/books", async (req, res) => {
  const { title, author, category, price, quantity } = req.query;
  let query = {};

  if (title) {
    query.title = RegExp(title, "i");
  }

  if (author) {
    query.author = RegExp(author, "i");
  }

  if (category) {
    query.category = RegExp(category, "i");
  }

  if (price) {
    query.price = RegExp(title, "i");
  }

  if (quantity) {
    query.quantity = RegExp(quantity, "i");
  }

  try {
    const books = await BookModel.find(query);
    res.status(200).send(books);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

bookRouter.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findOne({ _id: id });
    res.status(200).send(book);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// // This endpoint will give only those books whose category is 'from query'.

// bookRouter.get("/books?category=cat", async (req, res) => {
//   const {cat } = req.query;
//   try {
//     const books = BookModel.find({category: cat });
//     res.status(200).send(books);
//   } catch (err) {
//     res.status(400).send({ msg: err.message });
//   }
// });

// This endpoint will give only those books whose author is 'from query' and the category is 'from query'.

// bookRouter.get("/books?author=authorr&category=cat", async (req, res) => {
//   const { authorr, cat } = req.query;
//   try {
//     const books = BookModel.find({ author: authorr, category: cat});
//     res.status(200).send(books);
//   } catch (err) {
//     res.status(400).send({ msg: err.message });
//   }
// });

// This endpoint should allow admin to add new books to the system. (Protected Route)

bookRouter.post("/books", isAuth, async (req, res) => {
  const payload = req.body;
  try {
    const book = new BookModel(payload);
    await book.save();
    res.status(201).send({ msg: "Book added successfully" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// This endpoint will allow admin to update the details of a specific book identified by its ID. (Protected Route)
bookRouter.patch("/books/:id", isAuth, async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    await BookModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(204).send({ msg: "Book has been updated successfully" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// This endpoint will allow admin to delete a specific book identified by its ID. (Protected Route)
bookRouter.delete("/books/:id", isAuth, async (req, res) => {
  const { id } = req.params;
  try {
    await BookModel.findByIdAndDelete({ _id: id });
    res.status(202).send({ msg: "Book deleted successfully" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = bookRouter;
