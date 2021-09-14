const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { removeListener } = require('../models/Restaurant');

// Registration form

router.get('/register', function (req,res,next) {
  return res.render('auth/register.ejs');
})

// Login form

router.get('/login', function(req,res,next) {
  return res.render('auth/login.ejs');
})

// Registration verifications

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

    return res.redirect('/login');

  } catch (error) {
    const context = {
      error: error,
    };
    return res.render('auth/register.ejs', context);
  }
});

// Login verifications

router.post('/login', async function(req,res,next) {
  try {
    const foundUser = await User.findOne( { username: req.body.username });
    if (!foundUser) {
      const context = {
        error: "This username and password combination does not exist.",
      };
      return res.render('auth/login.ejs', context);
    };

    const match = await bcrypt.compare(req.body.password, foundUser.password);
    if (!match) {
      const context = {
        error: "This username and password combination does not exist.",
      }
      return res.render('auth/login.ejs', context);
    };

    req.session.currentUser = {
      id: foundUser._id,
      username: foundUser.username
    };
    return res.redirect('/restaurants');

  } catch (error) {
    console.log(error);
    return res.send(error);
  };
});

// Populate Edit Profile Form

router.get('/:id/edit', async function(req,res,next) {
  // Redirects if user tries to edit a diff user's profile
  if (req.session.currentUser.id !== req.params.id) {
    return res.redirect(`/${req.session.currentUser.id}/edit`);
  }
  
  try {
    const foundUser = await User.findById(req.session.currentUser.id);
    const context = {
      user: foundUser,
    }
    return res.render('auth/edit.ejs', context)
  } catch (error) {
    console.log(error);
        return res.send(error);
  }
})

// Put Route for Updating Profile

router.put('/profile/:id', async function(req,res,next) {
  try {
    const foundUser = await User.findById(req.session.currentUser.id);

    const foundEmail = await User.exists({email: req.body.email});
    if (foundEmail && (req.body.email !== foundUser.email)) {
      const context = {
        user: foundUser,
        error: "New email already exists."
      }
      return res.render('auth/edit.ejs', context);
    };

    const foundUsername = await User.exists({username: req.body.username});
    if (foundUsername && (req.body.username !== foundUser.username)) {
      const context = {
        user: foundUser,
        error: "New username already exists."
      }
      return res.render('auth/edit.ejs', context);
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.session.currentUser.id, 
      { $set: {avatar: req.body.avatar,
          username: req.body.username,
          email: req.body.email,
          bio: req.body.bio} }, 
      { new: true }
    );

    return res.redirect(`/profile/${req.session.currentUser.id}`);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
})

// Put Route for Updating Password
router.put('/pw/:id', async function(req,res,next) {
  try {
    const foundUser = await User.findById(req.session.currentUser.id);

    if (req.body.password !== req.body.passwordTwo) {
      const context = {
        user: foundUser,
        error: "Passwords do not match.",
      };
      return res.render('auth/edit.ejs', context);
    };

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;

    const updatedUser = await User.findByIdAndUpdate(
      req.session.currentUser.id, 
      { $set: {password: hash} }, 
      { new: true }
    );

    return res.redirect(`/profile/${req.session.currentUser.id}`);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
  
});

// Logout 

router.get('/logout', async function(req,res,next) {
  try {
    await req.session.destroy();
    return res.redirect('/login');
  } catch (error) {
    return res.send(error);
  }
})


// Delete Account

router.delete('/:id', async function (req, res, next) {
    try {
        await User.findByIdAndDelete(req.session.currentUser.id);
        await req.session.destroy();
        return res.redirect('/register');
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

module.exports = router;