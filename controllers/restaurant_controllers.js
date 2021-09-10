const { response } = require('express');
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
    return res.render('restaurants/index.ejs', context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
})

router.get('/:id', async(req,res,next) => {
  try {
    const foundRestaurant = await Restaurant.findById(req.params.id);
    const context = {
      restaurant: foundRestaurant,
    }
    return res.render('restaurants/show.ejs', context);

  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
})

router.get('/search', function (req,res,next) {
  const q = req.query.q;

  Restaurant.find({
      categories: {
        $regex: new RegExp(q)
      },
    }, function (err, data) {
      const context = {
        restaurants: data
      }
      return res.render('restaurants/index.ejs', context)
    }
    )
})

module.exports = router;