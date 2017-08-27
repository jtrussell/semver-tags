/* global describe, it */
'use strict'

const filterValidTags = require('../lib/filter-valid-tags.js')
const expect = require('chai').expect
const fx = require('./test-util.js').fx
const ex = require('./test-util.js').ex

/*
 * http://chaijs.com/api/bdd/
 */

describe('filter-valid-tags', () => {
  it('should strip down to version number candidates', (done) => {
    const allTags = fx('bogus-tags').split(/\r?\n/)
    const validTags = ex('valid-tags').split(/\r?\n/)

    filterValidTags(allTags, (err, tags) => {
      expect(err).to.be.a('null')
      expect(tags.length).to.equal(validTags.length)
      expect(tags).to.include.members(validTags)
      done()
    })
  })
})
