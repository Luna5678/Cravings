const express = require('express');
const router = express.Router();
const { Review, Restaurant } = require('../models')

router.post('/', async function (req,res, next) {
  try {
    const createdReview = await Review.create(req.body);
    return res.redirect(`/restaurants/${createdReview.restaurant}`);
  } catch (error) {
    const context = {
      error,
    };
    return next();
  }
  // Review.create(req.body, function (error, createdReview) {
  //   if (error) {
  //     console.log(error);
  //     req.error=error;
  //     return next();
  //   }

    
  // })
});

module.exports = router;