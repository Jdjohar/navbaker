const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cake", cakeSchema);
