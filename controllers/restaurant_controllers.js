const express = require('express');
const router = express.Router();
require('../config/db.connection');
const Restaurant = require('../models/Restaurant');

router.get('/', async (req,res,next) => {
  try {
    const allRestaurants = await Restaurant.find({});
    const context = {
      restaurants: allRestaurants,
    }
    return res.render('restaurants/index.ejs', context)
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
})

module.exports = router;