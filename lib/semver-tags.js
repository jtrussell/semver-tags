/*
 * semver-tags
 * https://github.com/justin/semver-tags
 *
 * Copyright (c) 2013 Justin Russell
 * Licensed under the MIT license.
 */

'use strict';

var async = require('async');

module.exports = function(opts, finalCb) {
  if(typeof finalCb === 'undefined') {
    finalCb = opts;
    opts = {};
  }

  async.waterfall([
    function(cb) {
      if(opts.repoType) {
        cb(null, opts.repoType);
      } else {
        require('./get-repo-type')(process.cwd, cb);
      }
    },
    require('./get-tags'),
    require('./filter-valid-tags'),
    require('./sort-semver-tags'),
    function(tags, cb) {
      if(opts.last && opts.last < tags.length) {
        tags = tags.slice(tags.length - opts.last);
      }
      cb(null, tags);
    },
    function(tags, cb) {
      if(opts.first && opts.first < tags.length) {
        tags = tags.slice(0, opts.first);
      }
      cb(null, tags);
    }
  ], finalCb);

};
