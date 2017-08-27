'use strict'

// try "git status" and "svn info" and check exit codes? ... slow
// look up for .git or .svn dirs?

// [todo] Make async [/todo]

const findup = require('findup-sync')

const getPathDistance = function (path) {
  if (typeof path !== 'string') {
    return -1
  }

  const sep = require('path').sep
  return path.split(sep).length
}

const getPkgRepoType = function (pkgjson) {
  if (typeof pkgjson !== 'string') { return null }
  const pkg = require(pkgjson)
  return pkg.repository && pkg.repository.type
    ? pkg.repository.type
    : null
}

module.exports = function (cb) {
  const gitfldr = findup('.git')
  const svnfldr = findup('.svn')
  const pkgjson = findup('package.json')
  const distanceGit = getPathDistance(gitfldr)
  const distanceSvn = getPathDistance(svnfldr)
  const distancePkg = getPathDistance(pkgjson)
  const pkgjsonType = getPkgRepoType(pkgjson)

  // Check if there is a version control folder next to the package.json...
  if (distancePkg > -1) {
    if (distancePkg === distanceGit && distancePkg === distanceSvn) {
      if (pkgjsonType === 'git' || pkgjsonType === 'svn') {
        return cb(null, pkgjsonType)
      } else {
        return cb(null, 'git')
      }
    }

    if (distancePkg === distanceGit) {
      return cb(null, 'git')
    }

    if (distancePkg === distanceSvn) {
      return cb(null, 'svn')
    }
  }

  // Otherwise use the closest option we've got
  if (distanceGit >= distanceSvn) {
    return cb(null, 'git')
  }

  if (distanceSvn > -1) {
    return cb(null, 'svn')
  }

  cb(new Error('Could not determine repo type, try --repo-type'))
}
