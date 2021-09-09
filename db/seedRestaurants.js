require('../config/db.connection');
const Restaurant = require('../models/Restaurant');

Restaurant.deleteMany({}, function(error, deletedRestaurants) {
  if (error) return console.log(error);

  Restaurant.insertMany(
    [
      {
        name: "Howlin' Ray's",
        image: "https://s3-media1.fl.yelpcdn.com/bphoto/YiQBbn9bTpDLMCufWigAug/o.jpg",
        categories: ["southern", "chicken", "sandwich"],
        location: {
          address: "727 N Broadway Ste 128",
          city: "Los Angeles",
          zipcode: 90012,
          country: "US",
          state: "CA"
        },
        phone: "2139358399",
        hours: ["Closed", 
          "Closed", 
          "10:00 AM - 7:00 PM", 
          "10:00 AM - 7:00 PM", 
          "10:00 AM - 7:00 PM", 
          "10:00 AM - 7:00 PM", 
          "10:00 AM - 7:00 PM"]
      },
      {
        name: "Wurstküche",
        image: "https://s3-media2.fl.yelpcdn.com/bphoto/gzEMY8RZP2oIBnUMs1-76w/o.jpg",
        categories: ["hotdog", "german", "gastropub"],
        location: {
          address: "800 E 3rd St",
          city: "Los Angeles",
          zipcode: 90013,
          country: "US",
          state: "CA",
        },
        phone: "2136874444",
        hours: ["11:30 AM - 10:00 PM", 
          "11:30 AM - 10:00 PM", 
          "11:30 AM - 10:00 PM", 
          "11:30 AM - 10:00 PM", 
          "11:30 AM - 10:00 PM", 
          "11:30 AM - 12:00 AM (Next day)", 
          "11:30 AM - 12:00 AM (Next day)"]
      },
      {
        name: "Slurpin' Ramen Bar - Los Angeles",
        image: "https://s3-media2.fl.yelpcdn.com/bphoto/axO_FH4VwDYcPQOuabFi6g/o.jpg",
        categories: ["ramen", "noodles", "japanese"],
        location: {
          address: "3500 W 8th St",
          city: "Los Angeles",
          zipcode: 90005,
          country: "US",
          state: "CA",
        },
        phone: "2133888607",
        hours: ["11:30 AM - 1:00 AM (Next day)", 
          "11:30 AM - 1:00 AM (Next day)", 
          "11:30 AM - 1:00 AM (Next day)", 
          "11:30 AM - 1:00 AM (Next day)", 
          "11:30 AM - 1:00 AM (Next day)", 
          "11:30 AM - 1:00 AM (Next day)", 
          "11:30 AM - 1:00 AM (Next day)"]
      },
      {
        name: "Morrison Atwater Village",
        image: "https://s3-media2.fl.yelpcdn.com/bphoto/fNFdhU_I6Iw7J1jM5nVmAw/o.jpg",
        categories: ["gastropubs", "burgers", "salad"],
        location: {
          address: "3179 Los Feliz Blvd",
          city: "Los Angeles",
          zipcode: 90039,
          country: "US",
          state: "CA",
        },
        phone: "3236671839",
        hours: ["12:00 PM - 9:00 PM",
          "12:00 PM - 9:00 PM",
          "12:00 PM - 9:00 PM",
          "12:00 PM - 9:00 PM", 
          "12:00 PM - 10:00 PM", 
          "12:00 PM - 11:00 PM", 
          "12:00 PM - 11:00 PM"
          ]
      },
      {
        name: "Daikokuya Little Tokyo",
        image: "https://s3-media3.fl.yelpcdn.com/bphoto/GG71SxFbzBd9-SRMRtB1EQ/o.jpg",
        categories: ["ramen", "noodles", "japanese"],
        location: {
          address: "327 E 1st St",
          city: "Los Angeles",
          zipcode: 90012,
          country: "US",
          state: "CA"
        },
        phone: "2136261680",
        hours: ["11:00 AM - 10:00 PM", 
        "11:00 AM - 10:00 PM", 
        "11:00 AM - 10:00 PM", 
        "11:00 AM - 10:00 PM", 
        "11:00 AM - 10:00 PM", 
        "11:00 AM - 10:00 PM", 
        "11:00 AM - 10:00 PM"]
      }
    ],
  
  function(error, createdRestaurants) {
    if (error) {
      return console.log(error);
    }
    console.log("Restaurant seed has been planted!");
  }
  )
});