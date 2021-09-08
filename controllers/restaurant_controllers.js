const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
  return res.send("Restaurants Index Page");
  next();
})

module.exports = router;