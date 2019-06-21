require("dotenv").config();

//required packages
var keys = require("./keys.js");
// console.log(keys.spotify)
//spotify api in node
var Spotify = require('node-spotify-api');
//our own keys we've defined
var spotify = new Spotify(keys.spotify);

var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
//optional packages
var chalk = require("chalk");



//puts the choices in array for easy identification
var selector = ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"];

var selectMe = function () {
  //ask the user to select an option 

  inquirer.prompt([
    {
      type: "list",
      message: "What do you want to do?",
      choices: selector,
      name: "category"
    }
  ]).then(function (response) {
    if (response.category === selector[0]) {

      bandsinTown();
    }
    else if (response.category === selector[1]) {
      spotifyMe();
    }
    else if (response.category === selector[2]) {
      moviesOMBD();

    }
    else if (response.category === selector[3]) {
      dowhatitSays();
    }
  });
}
//run this first
selectMe();


var moviesOMBD = function () {

  inquirer.prompt([
    {
      type: "input",
      message: "What movie do you want to see?",
      name: "usermovie"

    }
  ]).then(function (responseMovie) {
    if (responseMovie.usermovie === "") {
      console.log("\n-----------------------\n");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!\n");

    } else {
      if (responseMovie.usermovie) {
        var queryURL = "http://www.omdbapi.com/?t=" + responseMovie.usermovie.split(" ").join("+") + "&y=&plot=short&apikey=trilogy"
      }
      axios.get(queryURL)
        .then(function (response) {

          console.log(chalk.magenta("\nTitle: " + response.data.Title +
            "\nYear released: " + response.data.Released +
            "\nIMBD rating: " + response.data.imdbRating +
            "\nRotten Tomato rating: " + response.data.Ratings[0].Value +
            "\nCountry produced: " + response.data.Country +
            "\nLanguage: " + response.data.Language +
            "\nPlot: " + response.data.Plot +
            "\nActors: " + response.data.Actors + "\n\n"))
        })
    }
    selectMe();

  })
}


//get venue details from artists and bands
var bandsinTown = function () {
  inquirer.prompt([
    {
      type: "input",
      message: "What band do you want to see?",
      name: "userband"
    }
  ]).then(function (responseBand) {
    if (responseBand.userband) {
      var queryURL = "https://rest.bandsintown.com/artists/" + responseBand.userband + "/events?app_id=codingbootcamp"
    }
    axios.get(queryURL)
      .then(function (response) {
        //console.log(responseResult);

        if (response.data.length === 0 || response.data.length === "") {
          console.log("\nPlease pick something else\n");

        } else {
          for (var i = 0; i <= 1; i++) {

            // console.log(responseResult.data[i].lineup)
            console.log(chalk.blue("\nVenue name: " + response.data[i].venue.name +
              "\nVenue location: " + response.data[i].venue.city + " , " + response.data[i].venue.country +
              "\nVenue date: "
              + (chalk.red(moment(response.data[i].datetime).format('L')))));
          }
        } selectMe();
      });
  })

}

//spotify 
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

var spotifyMe = function () {
  inquirer.prompt([
    {
      type: "input",
      message: "What song do you want to see?",
      name: "usersong"
    }
  ]).then(function (response) {
    if (response.usersong === "") {
      spotify.search({ type: 'track', query: "The Sign", query: "Ace of Base", limit: 3 }, function (err, data) {
        console.log(chalk.yellow("\n\nArtist Name: ") + data.tracks.items[0].artists[0].name +
          (chalk.yellow("\nSong Name: ")) + data.tracks.items[0].name +
          (chalk.yellow("\nSong Name: ")) + data.tracks.items[0].name +
          (chalk.yellow("\nPreview Link: ")) + data.tracks.items[0].preview_url +
          (chalk.yellow("\nAlbum: ")) + data.tracks.items[0].album.name + "\n\n")

        }  
      )}else{
    spotify.search({ type: 'track', query: "'" + response.usersong + "'", limit: 3 }, function (err, data) {
      console.log(chalk.yellow("\nArtist Name: ") + data.tracks.items[0].artists[0].name +
        (chalk.yellow("\nSong Name: ")) + data.tracks.items[0].name +
        (chalk.yellow("\nSong Name: ")) + data.tracks.items[0].name +
        (chalk.yellow("\nPreview Link: ")) + data.tracks.items[0].preview_url +
        (chalk.yellow("\nAlbum: ")) + data.tracks.items[0].album.name + "\n\n"
      )

    })
  }selectMe();
  })
  
}


var dowhatitSays = function () {

  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArray = data.split(",");
    for (var i = 0; i < dataArray.length; i++) {
      console.log(dataArray[i] + "\n");
    }
    // console.log(dataArray);

    selectMe();
  });
};