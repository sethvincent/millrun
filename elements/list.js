var h = require('virtual-dom/h')

module.exports = function (state, actions) {
  var list = []

  state.drafts.forEach(function (draft) {
    list.push(h('.draft-list-item', [
      h('h2.draft-title', {
        onclick: function (e) {
          actions.setDraft(draft)
        }
      }, draft.title),
      h('.draft-list-actions', [
        h('button.delete-draft', {
          onclick: function (e) {
            actions.destroyDraft(draft)
          }
        }, [
          h('i.fa.fa-trash'),
          ' delete draft'
        ])
      ])
    ]))
  })

  return h('.draft-list', [
    h('.items', list),
    require('./toolbar')(state, actions)
  ])
}
