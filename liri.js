// prevent the keys and API secrets from being tracked on GitHub but make them available to the app (store in an .env file, add .env to .gitignore, use require to pass to liri.js):

require("dotenv").config();

var keys = require("./keys.js");

let Spotify = require("node-spotify-api");

let spotify = new Spotify(keys.Spotify);

let omdbKey = keys.omdb.key;

let bitId = keys.bit.id;

var request = require("request");

var datefns = require("date-fns");

// to log the results of all queries:

const log = require('simple-node-logger').createSimpleLogger();

log.setLevel('all');

// no need to install a separate npm package, fs is included in Node.js (needed to run do-what-it-says):

var fs = require("fs");

// ------------------------------------

// commands for liri:

//     concert-this:
//         search format: node liri.js concert-this <artist/band name here>
//         source: Bands in Town Artist Events API 

//     spotify-this-song:
//         search format: node liri.js spotify-this-song <song name here>
//         source: Spotify API

//     movie-this:
//         search format: node liri.js movie-this <movie name here>
//         source: OMDB API

//     do-what-it-says
//         search format: node liri.js do-what-it-says
//         take the text inside of random.txt and then use it to call one of liri's commands

// ------------------------------------

// separating command and search terms from node and file name:

command = process.argv[2];

var queryTerm = process.argv.slice(3).join(" ");

// to make console display and reading log.text easier:

var divider = "\n------------------------------------------------------------\n";
var divBold = "\n============================================================\n";

// controller function that determines what action is taken, and what data is needed to complete the action:

searchThis(command, queryTerm);

// ------------------------------------

// nested functions to run within the controller function:

function concertThis(bandName) {
    if (!bandName) {
        logOutput("\n Ah, the sweet sound of silence... \n");
    }
    var bitUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=" + bitId;

    request(bitUrl, function (err, res, body) {
        if (err) {
            logOutput('Error occurred: ' + err);
            return;
        } else {
            if (!err && res.statusCode === 200) {
                var jsonData = JSON.parse(body);
                // clause to prevent "undefined" when no concerts scheduled:
                if (!jsonData[0]) {
                    console.log("\n Sorry, not playing anywhere. \n");
                    return;
                } else {
                    // kudos to DRogalsky (https://github.com/DRogalsky) for this one, because my solution was five lines long:
                    var eventDate = datefns.format(jsonData[0].datetime, format = 'MM/DD/YYYY')

                    var queryTermCaps = queryTerm.toUpperCase();

                    var concertInfo = [
                        "At: " + jsonData[0].venue.name,
                        "In: " + jsonData[0].venue.city,
                        "On: " + eventDate
                    ].join("\n\n");
                    console.log(divBold);
                    console.log(queryTermCaps + " is playing next: \n\n");
                    console.log(concertInfo);
                    console.log(divider);
                    console.log("ROCK ON!");
                    console.log(divBold);
                    fs.appendFileSync("log.txt", queryTermCaps + " is playing next: \n\n" + concertInfo + divider + "\n\n", function (err) {
                        if (err) throw err;
                        logOutput('Error occurred: ' + err);
                    });
                    // // var eventDate =
                }
            }
        }
    })
};

function spotifyThis(songName) {
    // if there is no song name, go to default:
    if (!songName) {
        songName = "The Sign";
    }
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            logOutput('Error occurred: ' + err);
            return;
        } else {
            var songInfo = [
                "This is by: " + data.tracks.items[0].album.artists[0].name,
                "The song's name is: " + songName.toUpperCase(),
                "You can preview it on Spotify here: " + data.tracks.items[0].album.external_urls.spotify,
                "It's from the album: " + data.tracks.items[0].album.name
            ].join("\n\n");
            console.log(divBold);
            console.log("YEAH!!! YOU HAVE A GREAT TASTE IN MUSIC!");
            console.log(divider);
            console.log(songInfo);
            console.log(divBold);
            fs.appendFileSync("log.txt", songInfo + divider + "\n\n", function (err) {
                if (err) throw err;
                logOutput('Error occurred: ' + err);

            });
        }
    })
};

function omdbThis(movieName) {
    if (!movieName) {
        movieName = "Mr Nobody";
    }
    //for the function to work, you will need to apply for your own OMDB API key
    // t = movietitle, y = year, plot is short, then the API key

    var omdbUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + omdbKey;

    request(omdbUrl, function (err, res, body) {
        if (err) {
            logOutput('Error occurred: ' + err);
            return;
        } else {
            if (!err && res.statusCode === 200) {
            var jsonData = JSON.parse(body);
            var movieInfo = [
                "Title: " + jsonData.Title + "\n",
                "Year: " + jsonData.Year,
                "Rated: " + jsonData.Rated,
                "IMDB Rating: " + jsonData.imdbRating,
                // RT rating won't work without the index:
                "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
                "Country: " + jsonData.Country,
                "Language: " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Actors: " + jsonData.Actors
            ].join("\n\n");
            console.log(divBold);
            console.log("AWESOME MOVIE!");
            console.log(divider);
            console.log(movieInfo);
            console.log(divBold);
            fs.appendFileSync("log.txt", movieInfo + divider + "\n\n", function (err) {
                if (err) throw err;
                logOutput('Error occurred: ' + err);
            });
        }};
    });
};

function doRandom() {
    fs.readFile("random.txt", "utf8", function (err, data) {
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
            console.log("\n Not a valid search term. Use 'concert-this', 'spotify-this-song', 'movie-this' or 'do-what-it-says' instead.");
            break;
    }
};


// log data to the terminal and output to a text file:
function logOutput(logText) {
    log.info(logText);
};