'use strict';

var read = require('fs').readFileSync
  , join = require('path').join;

exports.ex = function(fileExpected) {
  return read(join(__dirname, 'expected', fileExpected)).toString().trim();
};

exports.fx = function(fileFixture) {
  return read(join(__dirname, 'fixtures', fileFixture)).toString().trim();
};
