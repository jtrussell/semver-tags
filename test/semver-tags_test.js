/*global describe, beforeEach, it */
'use strict';

var semver_tags = require('../lib/semver-tags.js')
  , expect = require('chai').expect;

/*
 * http://chaijs.com/api/bdd/
 */

describe('awesome', function() {
  
  beforeEach(function() {
    // setup here
  });

  describe('no args', function() {
    it('should be awesome', function() {
      expect(semver_tags()).to.equal('awesome');
    });
  });

});
