'use strict';

var findup = require('findup-sync')
  , defaultPath = '^';

module.exports = function() {
  var pkgjson = findup('package.json');
  if(!pkgjson) {
    return defaultPath;
  }

  var pkg = require(pkgjson);
  return pkg.repository && pkg.repository.url ?
    pkg.repository.url : defaultPath;
};
