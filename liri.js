require("dotenv").config();

var keys = require("./keys.js");
//spotify api in node
var Spotify = require('node-spotify-api');
//our own keys we've defined
var spotify = new Spotify(keys.spotify); 

var inquirer = require("inquirer");
var axios = require("axios");

inquirer.prompt ([
{
    type: "list", 
    message: "What do you want to do first?", 
    choices: ["concert-this","spotify-this-song", "movie-this", "do-what-it-says"],
    name: "category" } 
]).then(function(response){
    if (response.category === "concert-this") {
        console.log("hey!");
    }
    if (response.category === "spotify-this-song") {
        console.log("Why!"); 
    } 
    if (response.category === "movie-this") {
        console.log("No movies for you..."); 
    }
    if (response.category === "do-what-it-says") {
        console.log("I REFUSE!");
    }
})