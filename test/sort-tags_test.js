/* global describe, it */
'use strict'

const sortSemverTags = require('../lib/sort-semver-tags.js')
const expect = require('chai').expect
const fx = require('./test-util.js').fx
const ex = require('./test-util.js').ex

/*
 * http://chaijs.com/api/bdd/
 */

describe('sort-semver-tags', () => {
  it('should sort tags ignoring prefix "v"', done => {
    const jumbledTags = fx('jumbled-tags').split(/\r?\n/)
    const sortedTags = ex('sorted-tags').split(/\r?\n/)

    sortSemverTags(jumbledTags, (err, tags) => {
      expect(err).to.be.a('null')
      for (let i = sortedTags.length; i--;) {
        expect(tags[i]).to.equal(sortedTags[i])
      }
      done()
    })
  })
})
