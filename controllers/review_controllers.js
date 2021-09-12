const express = require('express');
const router = express.Router();
const { Review, Restaurant } = require('../models')

router.post('/', function (req,res, next) {
  Review.create(req.body, function (error, createdReview) {
    if (error) {
      console.log(error);
      req.error=error;
      return next();
    }

    return res.redirect(`/restaurants/${createdReview.restaurant}`);
  })
})

module.exports = router;