const { Review, Restaurant } = require('../models'); 

Review.deleteMany({}, function(error, deletedReviews) {
  if (error) return console.log(error);

  Review.insertMany(
    [
      {
        rating: 5,
        content: "Yumm!! I love a crispy, spicy chicken sandwich.",
        restaurant: "613be01faf2f634dcadcb88a",
      },
      {
        rating: 4,
        content: "Hella good",
        restaurant: "613be01faf2f634dcadcb88b",
      },
      {
        rating: 5,
        content: "You must slurp the ramen to compliment the chef",
        restaurant: "613be01faf2f634dcadcb88c",
      },
      {
        rating: 3,
        content: "I only liked their dessert",
        restaurant: "613be01faf2f634dcadcb88d",
      },
      {
        rating: 5,
        content: "Long wait time but worth it.",
        restaurant: "613be01faf2f634dcadcb88e",
      }
    ],

    function(error, createdReviews) {
    if (error) {
      return console.log(error);
    }
    console.log("Review seed has been planted!");
  }
  )
});

