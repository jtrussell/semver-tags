'use strict';

var semver = require('semver');

module.exports = function(tags, cb) {
  var validTags = [];

  tags.forEach(function(t) {
    var cleaned = semver.clean(t)
      , validated = semver.valid(cleaned);
    if(validated) {
      validTags.push(t);
    }
  });

  cb(null, validTags);
};
