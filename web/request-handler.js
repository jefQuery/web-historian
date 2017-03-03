var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var utils = require('./http-helpers');
var CRON = require('../workers/htmlfetcher');//run the cronjob, hopefully


actions = {
  GET: function (req, res) {
    if (req.url === '/') {
      utils.serveAssets(res, '/index.html');
      // utils.respond(res, index, 200);
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
              utils.redirect(res, '/' + URL);
              //display page
            } else {
              utils.redirect(res, '/loading.html');
            }
          });
        } else {
        //no
          //put into sites.txt
          archive.addUrlToList(URL, function () {
            //reroute to display loading
            utils.redirect(res, '/loading.html');
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
