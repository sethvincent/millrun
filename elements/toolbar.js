var h = require('virtual-dom/h')

module.exports = function (state, options) {
  var draft = state.draft
  var elements = [
    h('span.new-draft.button.info', {
      onclick: function () { options.onclick('new_draft') }
    }, [h('i.fa.fa-plus'), ' new draft']),
    h('span.draft-list.button.info', {
      onclick: function () { options.onclick('draft_list') }
    }, [h('i.fa.fa-list'), ' draft list'])
  ]

  if (state.screen === 'draft') {
    elements.push(h('span.word-count.info', 'words: ' + draft.word_count))
    elements.push(h('span.character-count.info', 'characters: ' + draft.character_count))
    elements.push(h('span.line-count.info', 'lines: ' + draft.line_count))
  }

  return h('.toolbar', elements)
}
