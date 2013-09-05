/*global describe, it */
'use strict';

var get_repo_type = require('../lib/get-repo-type.js')
  , expect = require('chai').expect;

/*
 * http://chaijs.com/api/bdd/
 */

describe('get-repo-type', function() {

  it('should recognize git repos', function(done) {
    get_repo_type(__dirname + '/fixtures/git-dir', function(err, type) {
      expect(type).to.equal('git');
      done();
    });
  });

  it('should recognized svn repos', function(done) {
    get_repo_type(__dirname + '/fixtures/svn-dir', function(err, type) {
      expect(type).to.equal('svn');
      done();
    });
  });

});


