var Model = require('level-model')
var inherits = require('util').inherits
var extend = require('xtend')

module.exports = Categories
inherits(Categories, Model)

function Categories (db, options) {
  if (!(this instanceof Categories)) return new Categories(db, options)
  options = extend({
    modelName: 'Categories',
    properties: {
      title: { type: 'string' }
    }
  }, options)
  Model.call(this, db, options)
}
