const express = require('express');
const app = express();
require('./config/db.connection');
const PORT = 4000;


// SECTION Auth Modules
// const session = require('express-session');
// const MongoStore = require('connect-mongo');


// SECTION Internal Modules
const restaurantControllers = require('./controllers/restaurant_controllers');


// SECTION Middleware 
app.set('view engine', 'ejs');

// Session controller
// app.use(
//   session({
//     store: MongoStore.create()
//   })
// );

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Custom middleware logger
function logger(req,res,next) {
  console.log(`${req.url}: ${req.method} - ${new Date().toLocaleTimeString()}`);
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