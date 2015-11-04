var Model = require('level-model')
var inherits = require('util').inherits
var extend = require('xtend')

module.exports = Drafts
inherits(Drafts, Model)

function Drafts (db, options) {
  if (!(this instanceof Drafts)) return new Drafts(db, options)
  options = extend({
    modelName: 'drafts',
    properties: {
      title: { type: 'string' },
      html: { type: 'string' },
      markdown: { type: 'string' },
      word_count: { type: 'number' },
      character_count: { type: 'number' },
      line_count: { type: 'number' }
    }
  }, options)
  Model.call(this, db, options)
}
