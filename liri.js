"use strict";

//At the top of the liri.js file make it so you grab the data from keys.js and store it into a variable to use
// node.js: Using require to load my own files
var twitter = require('twitter');
//Make it so liri.js can take in my-Tweets
var keys = require('./keys.js');
var fs = require('fs');
var request = require("request");
var twitterKeys = keys.twitterKeys;
var spotify = require('spotify');

function myTweets() {
  var client = new twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key:  twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret  
  });
  }
  

var command = process.argv[2];
var commandvalue = process.argv[3];

processcommand(command);
function processcommand(command) {

    switch (command) {
        case "movie-this":
        case "movie":
            var movie = commandvalue || "Mr. Nobody";

            request({
                    url: 'http://www.omdbapi.com/',
                    qs: {
                        t: commandvalue,
                        plot: 'short',
                        r: 'json'
                    },
                    method: 'GET',
                    headers: {'User-Agent': 'RCB /1.0a'}
                },
                function (error, response, body) {
                    if (response.statusCode != 200)
                        console.log('Status error:' + response.statusCode);
                    if (error)
                        throw error;
                    else {
                        var json = JSON.parse(body);

                        var datakv = {
                            'Title': json.Title,
                            'Year': json.Year,
                            'IMDB Rating': json.imdbRating,
                            'Country': json.Country,
                            'Language': json.Language,
                            'Plot': json.Plot,
                            'Actors': json.Actors
                        };

                        for (var k in datakv)
                            console.log(k + " : " + datakv[k]);
                    }
                });
            break;

        case "spofify-this-song":
        case "spotify":
            var songTitle = commandvalue || "What's my age again";

            spotify.search({type: 'track', query: songTitle}, function (err, data) {
                if (err) throw err;

                var items = data.tracks.items;

                for (let item of items) {

                    var datakv = {
                        "Song name": item.name,
                        "Artist(s)": item.artists.map((k, v) = > k.name).join(', '),
                        "Album name":item.album.name,
                        "Spotify url":item.preview_url
                    };

                    console.log("");//new line before each new song

                    for (var k in datakv)
                        console.log(k + " : " + datakv[k]);
                }
            });
            break;

        case "my-tweets":
            var client = new Twitter(keys.twitterKeys);

            var params = {screen_name: 'K1Gene'};
            client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (error) throw error;

                for (let tweet of tweets) {
                    console.log(tweet.created_at + ":" + tweet.text);
                    console.log("-".repeat(30));
                }
            });
            break;

        case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) throw error;

                var dataparams = data.split(',');
                command = dataparams[0];
                commandvalue = dataparams.slice(1);
                processcommand(command);
            });

        default:
            console.log("Unknown command.");
            break;
    }
}