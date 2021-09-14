const express = require('express');
const router = express.Router();
const { User, Review, Restaurant } = require('../models');

router.get('/:id', async function (req,res,next) {
  try {
    const foundUser = await User.findById( req.params.id );
    const foundReviews = await Review.find({ user: req.params.id} ).sort('-createdAt');
    const allRestaurants = await Restaurant.find({})
    const context = {
      profile: foundUser,
      reviews: foundReviews,
      restaurants: allRestaurants,
    };
    return res.render('profile/show.ejs', context)
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
})

module.exports = router;