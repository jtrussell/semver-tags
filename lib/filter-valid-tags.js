'use strict'

const semver = require('semver')

module.exports = (tags, cb) => {
  const validTags = []

  tags.forEach(t => {
    const cleaned = semver.clean(t)
    const validated = semver.valid(cleaned)
    if (validated) {
      validTags.push(t)
    }
  })

  cb(null, validTags)
}
