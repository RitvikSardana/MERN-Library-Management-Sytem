const router = require("express").Router();
const axios = require("axios");
const { json } = require("body-parser");
const Book = require("../models/Book");
const User = require("../models/User")
router.post("/addBook", async (req, res) => {
  try {
    const { name, quantity, price } = req.body.book;
    let url = `https://frappe.io/api/method/frappe-library?title=${name}`;
    let response = await axios.get(url);
    let data = response.data.message;
    data = data.slice(0, 1)[0];
    const book = new Book({
      id: data.isbn,
      rating: data.average_rating,
      title: data.title,
      author: data.authors,
      quantity: quantity,
      price: price,
    });
    const savedBook = await book.save();
    console.log(savedBook);
    res.status(200).json(savedBook);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
});

router.get("/getBooks", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});

router.get("/getIssuedBook", async (req, res) => {
  try {
    // const users = await User.find({issuedBook:{$exists:true},issuedBook:{$ne:""}});
    const users = await User.find({ issuedBook: { $exists: true, $ne: "" } });
    const usersIssuedBooks = users.map((user)=>user.issuedBook.trim());
    const issuedBooks = await Book.find({title:{$in:usersIssuedBooks}})
    res.status(200).json(issuedBooks)
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});

router.get("/getBook/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(req.body.book)

  try {
    const book = await Book.findOne({ id });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});

router.patch("/getBook/:id", async (req, res) => {
  const id = req.params.id;
  const { quantity, price } = req.body.book;
  // console.log(quantity,price)
  try {
    const book = await Book.findOneAndUpdate(
      { id: id },
      { $set: { quantity, price } }
    );
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});

router.delete("/getBook/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findOneAndDelete({ id: id });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});

module.exports = router;
