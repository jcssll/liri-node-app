//At the top of the liri.js file make it so you grab the data from keys.js and store it into a variable to use
// node.js: Using require to load my own files
var twitter = require('./keys.js');
//Make it so liri.js can take in my-Tweets


function myTweets() {
  var client = new twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key:  twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret  
  });
  