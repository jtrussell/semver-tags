/* global describe, afterEach, it */
'use strict'

const getRepoType = require('../lib/get-repo-type.js')
const expect = require('chai').expect
const join = require('path').join

/*
 * http://chaijs.com/api/bdd/
 */

describe('get-repo-type', () => {
  const origDir = process.cwd()

  afterEach(() => {
    process.chdir(origDir)
  })

  it('should recognize git repos', (done) => {
    const gitDir = join(__dirname, 'fixtures/git-dir')
    process.chdir(gitDir)
    getRepoType((err, type) => {
      expect(err).to.be.a('null')
      expect(type).to.equal('git')
      done()
    })
  })

  it('should recognized svn repos', (done) => {
    const svnDir = join(__dirname, '/fixtures/svn-dir')
    process.chdir(svnDir)
    getRepoType((err, type) => {
      expect(err).to.be.a('null')
      expect(type).to.equal('svn')
      done()
    })
  })
})
