const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');

router.post('/register', async function (req,res) {
  try {
    const foundUser = await User.exists({ 
      $or: [ {email: req.body.email}, {username: req.body.username} ],
    });
    if (foundUser) return res.redirect('/');
    
    const salt = await bcrypt.genSalt(10);

  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;