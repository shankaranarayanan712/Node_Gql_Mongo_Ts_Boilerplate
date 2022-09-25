import mongoose = require("mongoose");

const OfficeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true
    },
    city: {
        type: String,
        required: true
        },
    zip: {
        type: String,
        required: true
        },
    email: {
        type: String,
        required: true
        },
    phone: {
        type: String,
        required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Office', OfficeSchema);

