require("dotenv").config();

//required packages
var keys = require("./keys.js");
//spotify api in node
var Spotify = require('node-spotify-api');
//our own keys we've defined
var spotify = new Spotify(keys.spotify);

var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");

//optional packages
var chalk = require("chalk");

//ask the user to select an option 
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

//type in the title to get more details
// var movieTitle = process.argv.slice(2).join("+");
// //var one = 1; 
// console.log(movieTitle);

// axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy")
// .then(function(response) {

//     console.log(chalk.green("Title: " + response.data.Title +
//     "\nYear released: " + response.data.Released + 
//     "\nIMBD rating: " + response.data.imdbRating +
//     "\nRotten Tomato rating: " + response.data.Ratings + 
//     "\nCountry produced: " + response.data.Country + 
//     "\nLanguage: " + response.data.Language +
//     "\nPlot: " + response.data.Plot + 
//     "\nActors: " + response.data.Actors))
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

//get venue details from artists and bands
var artist = process.argv.slice(2).join("+");
console.log(artist);

axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response) {
        //console.log(response);

        for (var i = 0; i <= 3; i++) {

            console.log(response.data[i].lineup)
            console.log(chalk.blue("Venue name: " + response.data[i].venue.name +
                "\nVenue location: " + response.data[i].venue.city + " , " + response.data[i].venue.country +
                "\nVenue date: " + (chalk.red(moment(response.data[i].datetime).format('L')))))

    }
    })