const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email:{
        type:String,
        unique:true
    },
    age: {
      type: Number,
    },
    issuedBook: {
      type: String,
    },
    balance: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
