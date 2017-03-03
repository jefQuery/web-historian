var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var sitesArr = [];
var sites = null;

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  // grab sites.txt
  fs.readFile(exports.paths.list, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
    callback(data.split('\n'));
  });

  // iterate over the list (or split on \n characters, remove empty strings (if string === "", don't push))
  // return an array of string URLs
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function (urls) {
    callback(_.contains(urls, url));
  });
  //search through array of string URLs
  //if there, 
    //return true or run callback
  //else
    //return false
};

exports.addUrlToList = function(url, callback) { //should append submitted sites to \'sites.txt\
  
  //if (not isUrlInList)
  console.log('url in the addURLToList', url);
    //add to list
  fs.appendFile(exports.paths.list, url + '\n', 'utf-8', (err, data) => {
    console.log(data);
    //write to sites.txt file
    if (err) {
      throw err;
    }
    callback(data);
  });
  // sitesArr = sites.split('\n');
    //reformat to a string list
};

exports.isUrlArchived = function(url, callback) {
  // if url is archived exports.paths.archivedSites
    //return the cached webpage
  //else, assuming this only runs after addURLToList
    //return /serve the loading.html page 

  fs.access(exports.paths.archivedSites + '/' + url, (err) => {
    console.log(err ? 'no access!' : 'can read/write');
    callback(!err);
  });  

};

exports.downloadUrls = function(urls) {
  //CRON JOB THING

  //call HTML fetcher
  //pass addurltolist as callback
  //work complete

};
