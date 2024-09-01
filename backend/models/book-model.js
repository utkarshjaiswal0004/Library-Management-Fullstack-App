const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  copies: { type: Number, required: true },
  imageUrl: { type: String },
});

module.exports = mongoose.model("Book", BookSchema);
