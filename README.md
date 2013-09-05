# semver-tags [![Build Status](https://secure.travis-ci.org/justin/semver-tags.png?branch=master)](http://travis-ci.org/justin/semver-tags)

List semver tags for your repo.

## Getting Started
Install the module with: `npm install -g semver-tags`

Now `cd` into your repo and run `semver-tags --help` to see available options.

## API
```javascript
var semver_tags = require('semver-tags');

semver_tags({
  repoType: 'git', // 'git' or 'svn' --- defaults to 'git' auto detect coming
  first: 3, // Get only the fist 3 semver tags
  last: 1 // Get only the last 1 semver tag
}, function(err, tags) {
  if(err) { /* ... */ }

  // Do something with tags array...
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Justin Russell  
Licensed under the MIT license.
