var h = require('virtual-dom/h')

module.exports = function (state, options) {
  return h('div.draft', [
    require('./toolbar')(state, options)
  ])
}
