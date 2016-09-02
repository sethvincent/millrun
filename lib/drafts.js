var level = require('level-browserify')

module.exports = function (options) {
  options = options || {}
  options.db = options.db || 'millrun'
  var db = level(options.db, { valueEncoding: 'json '})

  function get () {
    
  }

  function put () {
    
  }

  function list () {
    
  }

  return {
    get: get,
    put: put,
    list: list
  }
}
