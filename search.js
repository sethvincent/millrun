var lunr = require('lunr')

module.exports = lunr(function () {
  this.field('title')
  this.field('markdown')
  this.ref('key')
})
