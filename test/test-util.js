'use strict'

const read = require('fs').readFileSync
const join = require('path').join

exports.ex = (fileExpected) => {
  return read(join(__dirname, 'expected', fileExpected)).toString().trim()
}

exports.fx = (fileFixture) => {
  return read(join(__dirname, 'fixtures', fileFixture)).toString().trim()
}
