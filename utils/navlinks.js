module.exports = function navLinks(req,res,next) {
  if (req.session.currentUser) {
    res.locals.routes = [
      { href: '/restaurants', title: "Restaurants"},
      { href: '/profile', title: "Profile"},
      { href: '/logout', title: "Logout" },
    ];
  } else {
    res.locals.routes = [
      { href: '/restaurants', title: "Restaurants"},
      { href: '/register', title: "Register"},
      { href: '/login', title: "Log In"},
    ]
  }
  next();
};