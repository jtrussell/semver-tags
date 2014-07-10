'use strict';

var cp = require('child_process')
  , os = require('os');

var getGitTags = function(cb) {

  var cpOut = ''
    , p = cp.spawn('git', ['tag']);

  p.on('error', cb);

  p.stdout.on('data', function(chunk) {
    cpOut += chunk.toString();
  });

  p.on('exit', function() {
    var tagList = cpOut.trim().split('\n').map(function(t) {
      return t.trim();
    });
    cb(null, tagList);
  });
};

var getGitTagsRemote = function(path, cb) {
 cp.exec('git ls-remote --tags "' + path + '"', function(err, stdout, stderr) {
   if(err) { cb(err); }
   var tagList = stdout.trim().split('\n').map(function(l) {
     if(/^\w+\s+refs\/tags\/(.*)$/.exec(l.trim())) {
       return RegExp.$1;
     }
     return null;
   }).filter(function(t) {
     return t !== null;
   });
   cb(null, tagList);
 });
};

var getSvnTags = function(path, cb) {
  if(typeof path === 'function') {
    cb = path;
    path = null;
  }

  var getProjectRoot = require('svn-project-root');

  var _getTags = function(path, cb) {
    path = getProjectRoot.normalize(path) + '/tags';

    var cpOut = ''
      , p = cp.spawn('svn', ['ls', path]);

    p.on('error', cb);

    p.stdout.on('data', function(chunk) {
      cpOut += chunk.toString();
    });

    p.on('exit', function() {
      var tagsList = cpOut.trim().split('\n').map(function(t) {
        return t.trim().replace(/[\/\\]$/, '');
      });
      cb(null, tagsList);
    });
  };

  return path ?
    _getTags(path, cb) :
    getProjectRoot(function(err, path) {
      if(err) { return cb(err); }
      _getTags(path, cb);
    });
};

/**
 * Get a list of tags for a given repo
 *
 * @param {String} repoType The repo type, i.e. 'git' or 'svn'
 * @param {String|undefined} path The path to the repo (optional)
 * @param {Function} cb The callback function, passed an error if there is one
 * and an array of the repo tags
 */
module.exports = function(repoType, path, cb) {
  var useRemote = true;
  if(typeof path === 'function') {
    cb = path;
    useRemote = false;
  }
  if(/git/i.test(repoType)) {
    return useRemote ? getGitTagsRemote(path, cb) : getGitTags(cb);
  } else if(/svn/i.test(repoType)) {
    return useRemote ? getSvnTags(path, cb) : getSvnTags(cb);
  } else {
    cb('Unrecognized repo type: ' + repoType);
  }
};
