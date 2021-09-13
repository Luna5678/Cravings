const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');

router.get('/register', function (req,res,next) {
  return res.render('auth/register.ejs');
})

router.post('/register', async function (req,res) {
  try {
    if (req.body.password !== req.body.passwordTwo) {
      const context = {
        error: "Passwords do not match.",
      };
      return res.render('auth/register.ejs', context);
    };

    const foundUser = await User.exists({ 
      $or: [ {email: req.body.email}, {username: req.body.username} ],
    });
    if (foundUser) {
      const context = {
        error: "Username or email already exists. Please log in."
      }
      return res.render('auth/register.ejs', context);
    };
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;

    const createdUser = await User.create(req.body);

    return res.redirect('/');

  } catch (error) {
    const context = {
      error: error,
    };
    return res.render('auth/register.ejs', context);
  }
});

router.get('/logout', async function(req,res,next) {
  try {
    await req.session.destroy();
    return res.redirect('/login');
  } catch (error) {
    return res.send(error);
  }
})

module.exports = router;