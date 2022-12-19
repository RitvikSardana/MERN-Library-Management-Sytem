const router = require("express").Router();
const User = require("../models/User");
const Book = require("../models/Book");
const { json } = require("body-parser");

router.post("/addUser", async (req, res) => {
  try {
    const user = new User(req.body.user);
    const savedUser = await user.save();
    console.log(savedUser);
    res.status(200).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
});

router.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});

router.get("/getUser/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});

router.patch("/getUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id, {
      $set: { ...req.body.user, inStock: true },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});

router.delete("/getUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});

router.patch("/issuebook", async (req, res) => {
  const { bookId, id: userId } = req.body;

  try {
    let book = await Book.findOneAndUpdate(
      { id: bookId, quantity: { $gt: 0 } },
      { $inc: { quantity: -1 } }
    );
    if (book.quantity === 1) {
      book = await Book.updateOne({ id: bookId }, { $set: { inStock: 0 } });
    }
    let user = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { issuedBook: book.title } }
    );

    res.status(200).json({ book, user });
  } catch (error) {
    console.log(error);
    res.status(401).json(error);

    throw error;
  }
});
router.patch("/returnBook", async (req, res) => {
  const { user } = req.body;
  let { issuedBook, _id: id } = user;

  try {
    const book = await Book.findOne({ title: issuedBook });
    let { price } = book;


    const user = await User.findOneAndUpdate(
      { _id: id, balance: { $gte: -500 } },
      {
        $inc: { balance: -price },
        $set: { issuedBook: "" },
      }
    );
    res.status(200).json("ok");
  } catch (error) {
    res.status(401).json({data:"Out Of Funds"})
    throw error
  }


});

module.exports = router;
