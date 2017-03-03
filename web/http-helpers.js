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

exports.redirect = function(response, location, status) {
  status = status || 302;
  response.writeHead(status, {location: location});
  response.end();
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

exports.serveAssets = function(res, URL, callback) {

  //basePath === archive.paths...

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  //assesst is the static file ?
  fs.readFile( archive.paths.siteAssets + URL, {encoding: 'utf8'}, function(err, data) {
  //var file = fs.read(basePath + url.pathname)// 
    if (err) {
      // file isn't in main web repository
      fs.readFile( archive.paths.archivedSites + URL, {encoding: 'utf8'}, function(err, data) {
        if (err) {
          // file isn't in archives folder
          callback ? callback() : exports.respond(res, 'Not found', 404);
        } else {
          exports.respond(res, data);
        }
      });
    } else {
      exports.respond(res, data);
    }
  }); 
};



// As you progress, keep thinking about what helper functions you can put here!
