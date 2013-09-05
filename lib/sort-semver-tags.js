'use strict';

var semver = require('semver');

module.exports = function(tags, cb) {
  var sortedTags = []
    , validTags = []
    , validTagMap = {};

  tags.forEach(function(t) {
    var cleaned = semver.clean(t)
      , validated = semver.valid(cleaned);

    if(validated) {
      validTags.push(validated);
      validTagMap[validated] = t;
    }
  });

  validTags.sort(semver.compare);

  sortedTags = validTags.map(function(t) {
    return validTagMap[t];
  });
 
  cb(null, sortedTags);
};
