const express = require('express');

const app = express();

const PORT = 4000;

// SECTION Internal Modules
const restaurantControllers = require('./controllers/restaurant_controllers');

// SECTION Middleware 
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
  res.send('Cravings Homepage')
});

app.use('/restaurants', restaurantControllers);

app.get('/*', (req, res) => {
  res.send('Uh oh error')
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));