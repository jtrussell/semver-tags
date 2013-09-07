# semver-tags [![Build Status](https://secure.travis-ci.org/jtrussell/semver-tags.png?branch=master)](http://travis-ci.org/jtrussell/semver-tags)

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

Nested repos of different flavors fouling things up?

`semver-tags --repo-type svn --first`

## API
```javascript
var semver_tags = require('semver-tags');

semver_tags({
  repoType: 'git', // 'git' or 'svn' --- Will attempto to auto detect if omitted
  first: 3, // Get only the fist 3 semver tags
  last: 1 // Get only the last 1 semver tag
}, function(err, tags) {
  if(err) { /* ... */ }
  // Do something with tags array...
});
```

Note: All options are... well... optional. As is the entire options object. If
you only care about getting all the semver tags for your repo just pass a
callback.

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Justin Russell  
Licensed under the MIT license.
