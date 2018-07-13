require("dotenv").config();

var request = require("request");
var keys = require("./keys.js"); 
var Spotify = require("node-spotify-api");
var Twitter = require("twitter")
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var title =process.argv.slice(3).join(" ");


switch (command) {
    case "my-tweets": 
    // show 20 tweets and when they were created
    // client.search({})  
    var params = {screen_name: 'j_r_m9'};  
    client.get( 'statuses/user_timeline', params , function (err,data,response) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
      console.log("My tweets");
      console.log(data);
  });
      break
    case "spotify-this-song":
    spotify.search({ type: 'track', query: title, limit:1 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      // var responseSong = JSON.parse(data);
      // console.log(responseSong);
    // console.log(data); 
    var responseSong = JSON.stringify(data, null, 2)
    console.log(responseSong);
    // console.log(JSON.parse(data).artists)
    // var jsonData = JSON.parse(data)[0].tracks;
    // var artists = jsonData.artists
    // console.log(JSON.stringify(data, null, 2));
    // console.log(JSON.parse(data));
    });
      // this will show artistm songs name, preview link, and album no song ace of base the sign
      
      break
    case "movie-this": 
    request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy",
     function(error, response, body) {
  // If the request is successful (i.e. if the response status code is 200)
     if (!error && response.statusCode === 200) {    
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).

    console.log("Title of the movie: " + JSON.parse(body).Title);
    console.log("Year the movie came out: " + JSON.parse(body).Year);
    console.log("IMD rating of the movie " + JSON.parse(body).imdbRating);
    // console.log("Rotten Tomatoes rating of the movie " + JSON.parse(body).data.Rating[1].Value);
    console.log("Country where the movie was produced " + JSON.parse(body).Country);
    console.log("Language of the movie " + JSON.parse(body).Language);
    console.log("Plot of the movie " + JSON.parse(body).Plot);
    console.log("Actors in the movie " + JSON.parse(body).Actors);
    console.log(body);

  }
});
      break
    case "do-what-it-says":
    fs.readFile("random.txt", "utf8",function(error, data) {
      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }    
      // We will then print the contents of data
      console.log(data);    
      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");    
      // We will then re-display the content as an array for later use.
      console.log(dataArr[1]);});
      
      // ss.spotifythis("I want it that way");
            // fs read random.txt
      break  
    default: 
    //  console.log("you entered and invalid command");
    //    break  
    };
    
    
    var ss = function spotifythis (song) {
      spotify.search({ type: 'track', query: song, limit:1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        // var responseSong = JSON.parse(data);
        // console.log(responseSong);
      // console.log(data); 
      var responseSong = JSON.stringify(data, null, 2)
      console.log(JSON.stringify(data, null, 2));
      // console.log(JSON.parse(data));
      });
    }
    
  

