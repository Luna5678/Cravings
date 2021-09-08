const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: String,
    categories: [String],
    location: {
      address: String,
      city: String,
      zipcode: Number,
      country: String,
      state: String
    },
    phone: String
  }
)

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;