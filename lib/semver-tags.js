/*
 * semver-tags
 * https://github.com/justin/semver-tags
 *
 * Copyright (c) 2013 Justin Russell
 * Licensed under the MIT license.
 */

'use strict';

exports = function(opts) {
  opts = opts || {};

  return 'awesome';
};

var fillRepoType = function(args, cb) {
  if(args.repoType) {
    cb(null, args);
  }

  // ...
};

var checkForExecutable = function(args, cb) {
  // which git || svn
};

var fillTagsList = function(args, cb) {
  /*code*/
};

var sortTagsList = function(args, cb) {
  /*code*/
};
