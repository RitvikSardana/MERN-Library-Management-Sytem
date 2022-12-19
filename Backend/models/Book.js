const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    rating: {
      type: String,
    },
    title: {
      type: String,
    },
    author:{
        type:String
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    quantity :{
      type:Number,
    },
    price: {
      type:Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);