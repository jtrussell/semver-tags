/*
 * semver-tags
 * https://github.com/justin/semver-tags
 *
 * Copyright (c) 2013 Justin Russell
 * Licensed under the MIT license.
 */

'use strict'

const async = require('async')
const semver = require('semver')

module.exports = (opts, finalCb) => {
  if (typeof finalCb === 'undefined') {
    finalCb = opts
    opts = {}
  }

  async.waterfall([
    (cb) => {
      if (opts.repoType) {
        cb(null, opts.repoType)
      } else {
        require('./get-repo-type')(cb)
      }
    },

    // Get the list of tags for the repo
    (repoType, cb) => {
      return opts.repoPath
        ? require('./get-tags')(repoType, opts.repoPath, cb)
        : require('./get-tags')(repoType, cb)
    },

    require('./filter-valid-tags'),
    require('./sort-semver-tags'),
    require('./filter-tags-by')(semver.gt, opts.greaterThan),
    require('./filter-tags-by')(semver.lt, opts.lessThan),
    require('./filter-tags-by')(semver.satisfies, opts.satisfies),

    // Get last N tags
    (tags, cb) => {
      if (opts.last && opts.last < tags.length) {
        tags = tags.slice(tags.length - opts.last)
      }
      cb(null, tags)
    },

    // Then first M of the rest
    (tags, cb) => {
      if (opts.first && opts.first < tags.length) {
        tags = tags.slice(0, opts.first)
      }
      cb(null, tags)
    }
  ], finalCb)
}
