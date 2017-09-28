// Grab data from key.js
var keys = require('./key.js');
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var fs = require('fs');

var client = new twitter(keys.twitterKeys);