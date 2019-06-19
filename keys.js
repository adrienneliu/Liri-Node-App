var inquirer = require("inquirer");
var axios = require("axios")
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify); 

inquirer.prompt ({
    type: "input", 
    message: "What is your name", 
    name: "name"
}).then(function(inquirerResponse){
    console.log("Hello " + inquirerResponse.name + "")
})


// console.log('this is loaded');

// exports.spotify = {
//   id: process.env.SPOTIFY_ID,
//   secret: process.env.SPOTIFY_SECRET
// };
