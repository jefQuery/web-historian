var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var utils = require('./http-helpers');
var index;
var getData;
var postData;
fs.readFile('./web/public/index.html', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  index = data;
  
});

actions = {
  GET: function (req, res) {
    if (req.url === '/') {
      utils.respond(res, index, 200);
    } else if (fs.existsSync(archive.paths.archivedSites + req.url)) {
      fs.readFile(archive.paths.archivedSites + req.url, 'utf8', (err, data) => {
        getData = data;
        utils.respond(res, getData, 200);
      });
    } else {
      utils.respond(res, 'Not Found', 404);
    }
  },

  POST: function (req, res) { 
    utils.collectData(req, function(URL) {
      console.log('InPOSTHelperCallback', URL);
      //in sites.txt?
      archive.isUrlInList(URL, function (inList) {
        if (inList) {
        //yes
        //archived?
          archive.isUrlArchived(URL, function (isArchived) {
            if (isArchived) {
              
            //yes
              //display page
            } else {
            //no
              //display loading
            }
          });
        } else {
        //no
          //put into sites.txt
          archive.addUrlToList(URL, function () {
            //reroute to display loading
            res.writeHead(302);
            res.end();
          });   
        }
      });
    });
  }
};

exports.handleRequest = function (req, res) {
  action = actions[req.method];
  action ? action(req, res) : utils.respond(res, 'Not Found', 404);

};
