require("dotenv").config();

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