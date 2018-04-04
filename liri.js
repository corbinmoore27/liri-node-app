require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var fs = require("fs");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
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
    var params = {screen_name: "cmoore_leo27", count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (let i = 0; i < tweets.length; i++) {
            var tweet = tweets[i];
            console.log(tweet.created_at, tweet.text);
        
        }
    }
    });
};

function spotifyThisSong() {
    if(!value){
        value = "The Sign, Ace of Base";
    }
    spotify.search({ type: 'track', query: value, limit: 1 }, function(err, data) {
    if (err) {
    return console.log('Error occurred: ' + err);
    }
    var track = data.tracks.items[0]; 
    console.log("Artist: " + track.artists[0].name);
    console.log("Track: " + track.name);
    console.log("Preview Link: " + track.external_urls.spotify);
    console.log("Album: " + track.album.name);
    });
};

function movieThis() {
    if(!value){
        value = "Mr. Nobody"
    }

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
        } else {
            console.log(error);  
        }	
	});
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        } else {
            result = data.split(",");
            value = result[1];
            spotifyThisSong(value);
        }
        
    });
}