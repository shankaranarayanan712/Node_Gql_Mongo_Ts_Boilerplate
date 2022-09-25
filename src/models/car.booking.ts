import mongoose = require("mongoose");
import { Status } from "./constants";

const CarBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    carId: {
      type: String,
      required: true
    },
    paymentTransactionId: {
    //refers to payment transactionId, presently it is out of scope
    //but we would need this to make sure the payment status in future
    type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      
    },
    status: {
        type: Status, 
        required: true,
        default: Status.BOOKED
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CarBooking', CarBookingSchema);

