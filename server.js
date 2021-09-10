const express = require('express');
require('./config/db.connection');
const app = express();
const PORT = 4000;


// SECTION Auth 
const session = require('express-session');
require('dotenv').config();
const MongoStore = require('connect-mongo');


// SECTION Internal Modules
const restaurantControllers = require('./controllers/restaurant_controllers');


// SECTION Middleware 
app.set('view engine', 'ejs');


// Session controller
app.use(
  session({
    store: MongoStore.create({ mongoUrl:process.env.MONGODB_URI }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
    }
  })
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


// Custom middleware logger
function logger(req,res,next) {
  console.log(`${req.url}: ${req.method} - ${new Date().toLocaleTimeString()}`);
  console.log(req.session);
  next();
};
app.use(logger);


// SECTION Routes
app.get('/', (req,res) => {
  res.render('home');
});

app.use('/restaurants', restaurantControllers);

app.get('/*', (req, res) => {
  res.send('Uh oh error')
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`));