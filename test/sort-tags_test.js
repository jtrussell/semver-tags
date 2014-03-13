/*global describe, it */
'use strict';

var sort_semver_tags = require('../lib/sort-semver-tags.js')
  , expect = require('chai').expect
  , fx = require('./test-util.js').fx
  , ex = require('./test-util.js').ex;

/*
 * http://chaijs.com/api/bdd/
 */

describe('sort-semver-tags', function() {

  it('should sort tags ignoring prefix "v"', function(done) {
    var jumbledTags = fx('jumbled-tags').split(/\r?\n/)
      , sortedTags = ex('sorted-tags').split(/\r?\n/);

    sort_semver_tags(jumbledTags, function(err, tags) {
      var i;
      for(i = sortedTags.length; i--;) {
        expect(tags[i]).to.equal(sortedTags[i]);
      }
      done();
    });
  });

});


