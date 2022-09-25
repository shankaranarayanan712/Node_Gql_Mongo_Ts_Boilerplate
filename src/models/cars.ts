import mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true,
      unique: true
   }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Car', CarSchema);

