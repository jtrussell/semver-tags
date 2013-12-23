/**
 * Returns a filter function
 *
 * Factory for creating functions to filter a list of tags by
 *
 * @param {Function} f The comparison function
 * @param {String} arg The tag or range to base comparisons
 * @return {Function}
 */
module.exports = function(f, arg) {
  return function(tags, cb) {
    if(!arg) {
      return cb(null, tags);
    }
    tags = tags.filter(function(t) {
      return f(t, arg);
    });
    cb(null, tags);
  };
};
