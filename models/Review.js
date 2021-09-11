const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    content: {
      type: String,
      required: [true, "Please provide a reason for your rating."],
    },
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: "Restaurant",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;