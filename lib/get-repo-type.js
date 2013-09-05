'use strict';

// try "git status" and "svn info" and check exit codes? ... slow
// look up for .git or .svn dirs?

module.exports = function(cwd, cb) {
  cb(null, 'git');
};
