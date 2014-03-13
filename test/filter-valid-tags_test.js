/*global describe, it */
'use strict';

var filter_valid_tags = require('../lib/filter-valid-tags.js')
  , expect = require('chai').expect
  , fx = require('./test-util.js').fx
  , ex = require('./test-util.js').ex;

/*
 * http://chaijs.com/api/bdd/
 */

describe('filter-valid-tags', function() {

  it('should strip down to version number candidates', function(done) {
    var allTags = fx('bogus-tags').split(/\r?\n/)
      , validTags = ex('valid-tags').split(/\r?\n/);

    filter_valid_tags(allTags, function(err, tags) {
      expect(tags.length).to.equal(validTags.length);
      expect(tags).to.include.members(validTags);
      done();
    });
  });

});

