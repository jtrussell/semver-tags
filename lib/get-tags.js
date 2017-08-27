'use strict'

const cp = require('child_process')

const getGitTags = (cb) => {
  const p = cp.exec('git tag')
  let cpOut = ''

  p.on('error', cb)

  p.stdout.on('data', (chunk) => {
    cpOut += chunk.toString()
  })

  p.on('close', function () {
    const tagList = cpOut.trim().split('\n').map(t => t.trim())
    cb(null, tagList)
  })
}

const getGitTagsRemote = (path, cb) => {
  cp.exec('git ls-remote --tags "' + path + '"', (err, stdout, stderr) => {
    if (err) { cb(err) }
    const tagList = stdout.trim()
      .split('\n')
      .map(l => {
        if (/^\w+\s+refs\/tags\/(.*)$/.exec(l.trim())) {
          return RegExp.$1
        }
        return null
      })
      .filter(t => t !== null)
    cb(null, tagList)
  })
}

const getSvnTags = (path, cb) => {
  if (typeof path === 'function') {
    cb = path
    path = null
  }

  const getProjectRoot = require('svn-project-root')

  const _getTags = (path, cb) => {
    path = getProjectRoot.normalize(path) + '/tags'

    const p = cp.spawn('svn', ['ls', path])
    let cpOut = ''

    p.on('error', cb)

    p.stdout.on('data', (chunk) => {
      cpOut += chunk.toString()
    })

    p.on('exit', () => {
      const tagsList = cpOut.trim()
        .split('\n')
        .map(t => t.trim().replace(/[/\\]$/, ''))
      cb(null, tagsList)
    })
  }

  return path
    ? _getTags(path, cb)
    : getProjectRoot((err, path) => {
      if (err) { return cb(err) }
      _getTags(path, cb)
    })
}

/**
 * Get a list of tags for a given repo
 *
 * @param {String} repoType The repo type, i.e. 'git' or 'svn'
 * @param {String|undefined} path The path to the repo (optional)
 * @param {Function} cb The callback function, passed an error if there is one
 * and an array of the repo tags
 */
module.exports = (repoType, path, cb) => {
  let useRemote = true
  if (typeof path === 'function') {
    cb = path
    useRemote = false
  }
  if (/git/i.test(repoType)) {
    return useRemote ? getGitTagsRemote(path, cb) : getGitTags(cb)
  } else if (/svn/i.test(repoType)) {
    return useRemote ? getSvnTags(path, cb) : getSvnTags(cb)
  } else {
    cb(new Error('Unrecognized repo type: ' + repoType))
  }
}
