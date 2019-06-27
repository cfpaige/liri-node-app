// prevent the keys and API secrets from being tracked on GitHub but make them available to the app (store in an .env file, add .env to .gitignore, use require to pass to liri.js):

require("dotenv").config();

var keys = require("./keys.js");

let Spotify = require("node-spotify-api");

let spotify = new Spotify(keys.Spotify);

var moment = require("moment");

var request = require("request");

// to log the results of all queries:

const log = require('simple-node-logger').createSimpleLogger();

log.setLevel('all');

// no need to install a separate npm package, fs is included in Node.js (needed to run do-what-it-says):

var fs = require("fs");

// ------------------------------------

// commands for liri:

//     concert-this
//         search format: node liri.js concert-this <artist/band name here>
//         search the Bands in Town Artist Events API and return:
//             Name of the venue
//             Venue location
//             Date of the Event (use moment to format this as "MM/DD/YYYY")

//     spotify-this-song:
//         search format: node liri.js spotify-this-song <song name here>
//         search Spotify API and return:
//             Artist(s)
//             The song's name
//             A preview link of the song from Spotify
//             The album that the song is from
//         if no song is provided, default to "The Sign" by Ace of Base

//     movie-this:
//         search format: node liri.js movie-this <movie name here>
//         search OMDB API and return:
//             Title of the movie
//             Year the movie came out
//             IMDB Rating of the movie
//             Rotten Tomatoes Rating of the movie
//             Country where the movie was produced
//             Language of the movie
//             Plot of the movie
//             Actors in the movie
//         if no movie provided, default to "Mr Nobody"

//     do-what-it-says
//         search format: node liri.js do-what-it-says
//         take the text inside of random.txt and then use it to call one of liri's commands

// ------------------------------------

// separating command and search terms from node and file name:

command = process.argv[2];

var queryTerm = process.argv.slice(3).join(" ");

// controller function that determines what action is taken, and what data is needed to complete the action:

searchThis(command, queryTerm);

// ------------------------------------

// nested functions to run within the controller function:

function concertThis(bandName) {
    if (!bandName) {
        logOutput("Nope. Nothing here.");
    }
var bitUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

request(bitUrl, function(err, res, body) {
    if (err) {
        logOutput('Error occurred: ' + err);
        return;
    } else {
        if (!err && res.statusCode === 200) {
            var jsonData = JSON.parse(body);
            // var eventDate =
            console.log("=====================================================================")
            logOutput("Venue: " + jsonData.venue.name)
            logOutput("Location: " + jsonData.venue.city)
            // logOutput("Date: " + eventDate + )
            console.log("=====================================================================")
        }
    }}
)};

function spotifyThis(songName) {
    // if there is no song name, go to default:
    if (!songName) {
        songName = "The Sign";
    }
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            logOutput('Error occurred: ' + err);
            return;
        } else {
            console.log("=====================================================================")
            console.log("YEAH!!! YOU HAVE A GREAT TASTE IN MUSIC!")
            logOutput("This is by: " + data.tracks.items[0].album.artists[0].name)
            logOutput("The song's name is: " + songName.toUpperCase())
            logOutput("You can preview it on Spotify here: " + data.tracks.items[0].album.external_urls.spotify)
            logOutput("It's from the album: " + data.tracks.items[0].album.name)
            console.log("=====================================================================")
        }
    })
};

function omdbThis(movieName) {
    if (!movieName) {
        movieName = "Mr Nobody";
    }
    //for the function to work, you will need to apply for your own OMDB API key
    // t = movietitle, y = year, plot is short, then the API key
    var omdbUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + process.env.OMDB_KEY;

    request(omdbUrl, function(err, res, body) {
        if (err) {
            logOutput('Error occurred: ' + err);
            return;
        } else {
            var jsonData = JSON.parse(body);
            console.log("=====================================================================")
            console.log("AWESOME MOVIE!")
            logOutput("Title: " + jsonData.Title)
            logOutput("Year: " + jsonData.Year)
            logOutput("Rated: " + jsonData.Rated)
            logOutput("IMDB Rating: " + jsonData.imdbRating)
            logOutput("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value)
            logOutput("Country: " + jsonData.Country)
            logOutput("Language: " + jsonData.Language)
            logOutput("Plot: " + jsonData.Plot)
            logOutput("Actors: " + jsonData.Actors)
            console.log("=====================================================================")
        }
    });
};

function doRandom() {
    fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
            logOutput('Error occurred: ' + err);
		} else {

			// creates array with data:
			var randomArray = data.split(",");

			// sets command to first item in array:
			command = randomArray[0];

			// sets queryTerm to second item in the array:
			queryTerm = randomArray[1];

			// calls main controller function to render the result:
            searchThis(command, queryTerm);
        }
	});
};

// main search logic:

function searchThis(command, queryTerm) {

    switch (command) {
  
        case "concert-this":
        concertThis(queryTerm);
        break;                          
  
        case "spotify-this-song":
        spotifyThis(queryTerm);
        break;
  
        case "movie-this":
        omdbThis(queryTerm);
        break;
  
        case "do-what-it-says":
        doRandom();
        break;
  
        default:                            
        display("Not a valid search term.");
        break;
    }
};  


// log data to the terminal and output to a text file:
function logOutput(logText) {
	log.info(logText);
	// console.log(logText);
};