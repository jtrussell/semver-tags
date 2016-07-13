# semver-tags [![Build Status](https://secure.travis-ci.org/jtrussell/semver-tags.png?branch=master)](http://travis-ci.org/jtrussell/semver-tags) [![Dependency Status](https://david-dm.org/jtrussell/semver-tags.png)](https://david-dm.org/jtrussell/semver-tags)

List the semver tags for your repo.

## Getting Started
Install the module with: `npm install -g semver-tags`

`cd` into your repo and run `semver-tags --help` to see available options.

## CLI
Get the latest semver tag:

`semver-tags --last`

Get the last three:

`semver-tags --last 3`

Get the first:

`semver-tags --first`

Set a lower bound:

`semver-tags --greater-than 1.2.3`

Set an upper bound:

`semver-tags --less-than 1.2.3`

Filter with a version mask:

`semver-tags --satisfies ~1.2`

Nested repos of different flavors fouling things up?

`semver-tags --repo-type svn --first`

Reposity located elsewhere?

`semver-tags --repo-path https://github.com/jtrussell/semver-tags.git`

## API
```javascript
var semver_tags = require('semver-tags');

semver_tags({
  repoType: 'git', // 'git' or 'svn', Will attemp to to auto detect if omitted
  repoPath: 'https://github.com/jtrussell/semver-tags.git', // Defaults to cwd
  first: 3, // Get only the fist 3 semver tags
  last: 1, // Get only the last 1 semver tag
  greaterThan: '1.2.3', // Lower bound
  lessThan: '1.2.3', // Upper bound
  satisfies: '~1.2' // Version mask
}, function(err, tags) {
  if(err) { /* ... */ }
  // Do something with tags array...
});
```

Note: All options are... well... optional. As is the entire options object. If
you only care about getting all the semver tags for your repo just pass a
callback.

Note: `semver-tags` will attempt to auto detect your repo type (git or svn) by
inspecting its surroundings. Currently this uses `findup-sync`. While this is
usually fine for simple command line usage if you're concerned about blocking
calls to the filesystem I'd suggest making use of the `repoType` option to
bypass the auto detect.

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test your
code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Licensed under the MIT license.
