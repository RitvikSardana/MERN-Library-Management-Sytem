const router = require("express").Router();
const User = require("../models/User");
const Book = require("../models/Book");
const { json } = require("body-parser");

router.post("/addUser", async (req, res) => {
  try {
    const user = new User(req.body.user);
    const savedUser = await user.save();
    res.status(200).json({success:true,data:"User Added Succesfully"});
  } catch (err) {
    console.log(err);
    res.status(500).json({success:false,data:"Something Went Wrong, Please try again later"});
  }
});

router.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({success:true,data:users});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,data:"Something Went Wrong, Please try again later"});

  }
});

router.get("/getUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({success:true,data:user});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,data:"Something Went Wrong, Please try again later"});
  }
});

router.patch("/getUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id, {
      $set: { ...req.body.user, inStock: true },
    });
    res.status(200).json({success:true,data:"User Updated"});

  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,data:"Something Went Wrong, Please try again later"});

  }
});

router.delete("/getUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({success:true,data:"User Deleted"});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,data:"Something Went Wrong, Please try again later"});

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
    console.log("ISSUE BOOK",book.quantity)
    let user = await User.findById(userId);
    if (user.balance - book.price > -500) { 
      let user = await User.findByIdAndUpdate(
        { _id: userId },
        { $set: { issuedBook: book.title } }
      );
      res.status(200).json({success:true,data:"BOOK ISSUED"})
    } // then only issue a book
    else {
      console.log("INSUFFICIENT FUNDS")
      res.status(200).json({success:false,data:"INSUFFICIENT FUNDS"})

    }

  } catch (error) {
    res.status(500).json({success:false,data:"Something Went Wrong, Please try again later"});
    throw error;
  }
});

router.patch("/returnBook", async (req, res) => {
  const { user } = req.body;
  let { issuedBook, _id: id } = user;

  try {
    const book = await Book.findOneAndUpdate({ title: issuedBook },{$inc :{quantity:+1}});
    let { price } = book;
    const user = await User.findOneAndUpdate( 
      { _id: id, balance: { $gte: -500 } },
      {
        $inc: { balance: -price },
        $set: { issuedBook: "" },
      }
    );
    res.status(200).json({success:true,data:"Succesfully Returned the Book "});
  } catch (error) {
    res.status(500).json({success:false,data:"Something Went Wrong, Please try again later"});

    throw error;
  }
});

module.exports = router;
