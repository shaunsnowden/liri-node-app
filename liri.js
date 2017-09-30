// Grab data from key.js
var twitterKey = require('./key.js');

var Spotify = require('node-spotify-api');
var spotify = new Spotify ({
    id: '6593f33dcdb9403d8a513df47d1416d7',
    secret:'cb2112f9c40b46358e5eea60da47ba85' 
});

var omdbKey = "40e9cece";

var request = require('request');
var twitter = require('twitter');
var fs = require('fs');

var client = new twitter(twitterKey.twitterKeys);

var command = process.argv[2];

// To string together multiple words to pass into url search
var nodeArg = process.argv;
var searchString = "";

for (var i = 3; i < nodeArg.length; i++){
    if(i > 3 && i < nodeArg.length ){
        searchString = searchString + "+" + nodeArg[i];
    } else {
        searchString = searchString + nodeArg[i];
    }
}

switch(command){
    case "my-tweets":
        getTweets();
    break;

    case "spotify-this-song":
        getSpotify(searchString);
    break;

    case "movie-this":
        getOMBD(searchString);
    break;

    case "do-what-it-says":
        doThat();
    break;
}

// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
function getTweets(){

}

// node liri.js spotify-this-song '<song name here>'
function getSpotify(song){
    spotify.search({type: 'track', query: song},function(error, data){
        if(error){
            console.log("Error: " + error);
        } else {
            // console.log(JSON.stringify(data,null,2));
            for(var i = 0; i<5; i++){
                var songData = data.tracks.items[i];
                console.log("");
                console.log("----------Result "+[i+1]+" ---------");
                console.log("Artist: " + songData.artists[0].name);
                console.log("Song: " + songData.name);
                console.log("Link: " + songData.external_urls.spotify);
                console.log("Album: " + songData.album.name);


                // Append to data log text file
                fs.appendFile('log.txt', "\n");
                fs.appendFile('log.txt', "\n----------Result "+[i+1]+" ---------");
                fs.appendFile('log.txt', "\nArtist: " + songData.artists[0].name);
                fs.appendFile('log.txt', "\nSong: " + songData.name);
                fs.appendFile('log.txt', "\nLink: " + songData.external_urls.spotify);
                fs.appendFile('log.txt', "\nAlbum: " + songData.album.name);

            }
        }
    });
}

function getOMBD (movie) {
    
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&apikey='+omdbKey;

    request(omdbURL, function (error, response, body){
        if(error && response.statusCode !=200){
            console.log("Error: " + response.statusCode);
        } else {
            var body = JSON.parse(body);
            console.log("");
            console.log("-------RESULT-------");
            console.log("");
            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
    
            //adds text to log.txt
            fs.appendFile('log.txt', "\n");
            fs.appendFile('log.txt', "\nTitle: " + body.Title, "utf8");
            fs.appendFile('log.txt', "\nRelease Year: " + body.Year, "utf8");
            fs.appendFile('log.txt', "\nIMdB Rating: " + body.imdbRating, "utf8");
            fs.appendFile('log.txt', "\nCountry: " + body.Country, "utf8");
            fs.appendFile('log.txt', "\nLanguage: " + body.Language, "utf8");
            fs.appendFile('log.txt', "\nPlot: " + body.Plot, "utf8");
            fs.appendFile('log.txt', "\nActors: " + body.Actors, "utf8");
            fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.Ratings[1].Value, "utf8");
        }
    })
}

function getTweets(){

}