var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelper = require('./http-helpers');
var index;
fs.readFile('./web/public/index.html', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  index = data;
  
});

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log(archive.paths.archivedSites + req.url);
  // console.log(fs.existsSync(archive.paths.archivedSites + req.url));
  //add html to response to serve/send to client
  // wrap in GET, POST, and OPTIONS requests (consider abstracting out)
  if (req.method === 'GET') {
    if (req.url === '/') {
      // console.log(index);
      res.writeHead(200);
      res.end(index);
    } else if (fs.existsSync(archive.paths.archivedSites + req.url)) {
      console.log('doing the right thing here, req:', req.url);
      //respond with the site or loading.html
      fs.readFile(archive.paths.archivedSites + req.url, 'utf8', (err, data) => {
        console.log('oh shyt it"s the data', data);
        if (err) {
          throw err;
        }
        index = data;
      });
      res.writeHead(200);
      res.end(index);
    } else {
      console.log('404ing here, req:', req.url);
      res.writeHead(404);
      res.end();
    }
  } else if (req.method === 'POST') {
    httpHelper.collectData(req, function(data) {
      console.log('InPOSTHelperCallback', data);
      archive.addUrlToList(data);   
    });
    console.log('InPOST', req.url);
    // console.log('InPOST', req);
    archive.addUrlToList(index);
    res.writeHead(302);
    res.end();
  }

};
