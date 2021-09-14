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
});

router.delete('/:id', async function(req,res,next) {
  try {
    await Review.findByIdAndDelete(req.params.id);
    return res.redirect(`/profile/${req.session.currentUser.id}`);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
})

module.exports = router;
