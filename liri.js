require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var fs = require("fs");
var request = require("request");


var action = process.argv[2];
var value = process.argv[3];

switch (action) {
    case "my-tweets":
      myTweets();
      break;
    
    case "spotify-this-song":
      spotifyThisSong();
      break;
    
    case "movie-this":
      movieThis();
      break;
    
    case "do-what-it-says":
      doWhatItSays();
      break;
    }

function myTweets() {
    var params = {screen_name: "cmoore_leo27"};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
    console.log(tweets);
    }
    });
};

function spotifyThisSong() {
    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify({
    id: f5fffa312e64592a63b2f20b5733ead,
    secret: dc3ada7a9f444e5e90113f801af82dd6
    });
 
    spotify.search({ type: 'track', query: value }, function(err, data) {
    if (err) {
    return console.log('Error occurred: ' + err);
    }
 
    console.log(data); 
    });
};

function movieThis() {

	request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=1f2afee3", function(error, response, body) {

        if (!error && response.statusCode === 200) {

        console.log("Title: " + JSON.parse(body).Title);
		console.log("Year: " + JSON.parse(body).Year);
		console.log("IMDB rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("RT rating: " + JSON.parse(body).Ratings[1].Value)
        console.log("Country: " + JSON.parse(body).Country)
        console.log("Language: " + JSON.parse(body).Language)
        console.log("Plot: " + JSON.parse(body).Plot)
        console.log("Actors: " + JSON.parse(body).Actors)
        }	
	});
};

function doWhatItSays() {

}