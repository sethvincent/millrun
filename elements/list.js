var h = require('virtual-dom/h')

module.exports = function (state, options) {
  var list = []

  state.drafts.forEach(function (draft) {
    list.push(h('.draft-list-item', {
      onclick: function (e) {
        options.onclick('draft', draft)
      }
    }, [
      h('h2.draft-title', draft.title)
    ]))
  })

  return h('.draft-list', [
    h('.items', list),
    require('./toolbar')(state, options)
  ])
}
