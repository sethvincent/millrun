var h = require('virtual-dom/h')
var search = require('../search')

module.exports = function (state, actions) {
  return h('input.search-drafts', {
    value: state.filter,
    attributes: { autofocus: true },
    placeholder: 'search drafts',
    oninput: function (e) {
      actions.filter(e.target.value)
      actions.setFilteredDraftList(search.search(e.target.value))
    }
  })
}
