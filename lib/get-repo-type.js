'use strict';

// try "git status" and "svn info" and check exit codes? ... slow
// look up for .git or .svn dirs?

// [todo] Make async [/todo]

var findup = require('findup-sync');

module.exports = function(cb) {

  var gitfldr = findup('.git');
  var svnfldr = findup('.svn');

  if(svnfldr && gitfldr) {
    var sep = require('path').sep;
    return svnfldr.split(sep).length > gitfldr.split(sep).length ?
      cb(null, 'svn') : cb(null, 'git');
  }

  if(gitfldr) {
    return cb(null, 'git');
  }

  if(svnfldr) {
    return cb(null, 'svn');
  }

  cb('Could not determine repo type, try --repo-type');
};
