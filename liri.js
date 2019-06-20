require("dotenv").config();

//required packages
var keys = require("./keys.js");
//spotify api in node
var Spotify = require('node-spotify-api');
//our own keys we've defined
var spotify = new Spotify(keys.spotify); 

var inquirer = require("inquirer");
var axios = require("axios");

// inquirer.prompt ([
// {
//     type: "list", 
//     message: "What do you want to do first?", 
//     choices: ["concert-this","spotify-this-song", "movie-this", "do-what-it-says"],
//     name: "category" } 
// ]).then(function(response){
//     if (response.category === "concert-this") {
//         process.argv[2] = "concert-this";
//         console.log("hey!");
//     }
//     if (response.category === "spotify-this-song") {
//         console.log("Why!"); 
//     } 
//     if (response.category === "movie-this") {
//         console.log("No movies for you..."); 
//     }
//     if (response.category === "do-what-it-says") {
//         console.log("I REFUSE!");
//     }
// })

// var movieTitle = process.argv.slice(2).join("+");
// //var one = 1; 
// console.log(movieTitle);

// axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy")
// .then(function(response) {

//     console.log("Title: " + response.data.Title +
//     "\nYear released: " + response.data.Released + 
//     "\nIMBD rating: " + response.data.imdbRating +
//     "\nRotten Tomato rating: " + response.data.Ratings + 
//     "\nCountry produced: " + response.data.Country + 
//     "\nLanguage: " + response.data.Language +
//     "\nPlot: " + response.data.Plot + 
//     "\nActors: " + response.data.Actors)
//     //"\nRotten Tomato rating: " + response.data.Ratings[one].Value 
// })

// .catch(function(error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log("---------------Data---------------");
//       console.log(error.response.data);
//       console.log("---------------Status---------------");
//       console.log(error.response.status);
//       console.log("---------------Status---------------");
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an object that comes back with details pertaining to the error that occurred.
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log("Error", error.message);
//     }
//     console.log(error.config);
//   });

// "\nRotten Tomato rating: " + response.data.Ratings[1].Value 

var artist = process.argv.slice(2).join("+");
console.log(artist);

axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
.then(function(response) {
//console.log(response);
console.log(response.data[0].lineup)
console.log("Venue name: " + response.data[0].venue.name +
"\nVenue location: " + response.data[0].venue.city + " , " + response.data[0].venue.country +
"\nVenue date: " + response.data[0].datetime)

})