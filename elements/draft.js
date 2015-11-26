var h = require('virtual-dom/h')

module.exports = function (state, actions) {
  return h('div.draft', [
    require('./toolbar')(state, actions)
  ])
}
