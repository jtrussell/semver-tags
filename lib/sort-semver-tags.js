'use strict'

var semver = require('semver')

module.exports = (tags, cb) => {
  const validTags = []
  const validTagMap = {}

  tags.forEach(t => {
    const cleaned = semver.clean(t)
    const validated = semver.valid(cleaned)

    if (validated) {
      validTags.push(validated)
      validTagMap[validated] = t
    }
  })

  validTags.sort(semver.compare)

  const sortedTags = validTags.map(t => validTagMap[t])

  cb(null, sortedTags)
}
