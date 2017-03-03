var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var queryString = require('querystring');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.respond = function(response, obj, status) {
  status = status || 200;
  response.writeHead(status, exports.headers);
  response.end(obj);
};

exports.collectData = function(request, callback) {
  var body = '';
  // request.on('error', function(err) {
  //   console.error(err);
  // });
  request.on('data', function(chunk) {
    body += chunk;
  });
  request.on('end', function() {
    console.log('in the collectData', queryString.parse(body));
    callback(queryString.parse(body).url);

  });
};

exports.serveAssets = function(res, asset, callback) {

  //assesst is the static file 
  //basePath 
  //var file = fs.read(basePath + url.pathname)//?? 

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)


};



// As you progress, keep thinking about what helper functions you can put here!
