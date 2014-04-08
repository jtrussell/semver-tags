'use strict';

// try "git status" and "svn info" and check exit codes? ... slow
// look up for .git or .svn dirs?

// [todo] Make async [/todo]

var findup = require('findup-sync');

var getPathDistance = function(path) {
  if(typeof path !== 'string') {
    return -1;
  }

  var sep = require('path').sep;
  return path.split(sep).length;
};

var getPkgRepoType = function(pkgjson) {
  if(typeof pkgjson !== 'string') { return null; }
  var pkg = require(pkgjson);
  return pkg.repository && pkg.repository.type ?
    pkg.repository.type :
    null;
};

module.exports = function(cb) {
  var gitfldr = findup('.git')
    , svnfldr = findup('.svn')
    , pkgjson = findup('package.json');

  var distanceGit = getPathDistance(gitfldr)
    , distanceSvn = getPathDistance(svnfldr)
    , distancePkg = getPathDistance(pkgjson);

  var pkgjsonType = getPkgRepoType(pkgjson);

  // Check if there is a version control folder next to the package.json...
  if(distancePkg > -1) {
    if(distancePkg === distanceGit && distancePkg === distanceSvn) {
      if(pkgjsonType === 'git' || pkgjsonType === 'svn') {
        return cb(null, pkgjsonType);
      } else {
        return cb(null, 'git');
      }
    }

    if(distancePkg === distanceGit) {
      return cb(null, 'git');
    }

    if(distancePkg === distanceSvn) {
      return cb(null, 'svn');
    }
  }

  // Otherwise use the closest option we've got
  if(distanceGit >= distanceSvn) {
    return cb(null, 'git');
  }

  if(distanceSvn > -1) {
    return cb(null, 'svn');
  }

  cb(new Error('Could not determine repo type, try --repo-type'));
};
