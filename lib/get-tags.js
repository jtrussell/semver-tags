'use strict';

var cp = require('child_process')
  , os = require('os');

var getGitTags = function(cb) {
  cp.exec('git tag', function(err, stdout, stderr) {
    if(err) { cb(err); }
    var tagList = stdout.trim().split('\n').map(function(t) {
      return t.trim();
    });
    cb(null, tagList);
  });
};

var getSvnTags = function(cb) {
  cp.exec('svn ls "^/tags"', function(err, stdout, stderr) {
    if(err) { cb(err); }
    var tagList = stdout.trim().split('\n').map(function(t) {
      return t.trim().replace(/[\/\\]$/, '');
    });
    cb(null, tagList);
  });
};

module.exports = function(repoType, cb) {
  if(/git/i.test(repoType)) {
    getGitTags(cb);
  } else if(/svn/i.test(repoType)) {
    getSvnTags(cb);
  } else {
    cb('Unrecognized repo type: ' + repoType);
  }
};
