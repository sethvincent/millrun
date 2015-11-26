var h = require('virtual-dom/h')

module.exports = function (state, actions) {
  var draft = state.draft
  var elements = []
  if (state.screen === 'draft') {
    elements.push(h('span.draft-settings.button.info', {
      onclick: function () { console.log('show draft settings page') }
    }, h('i.fa.fa-gear')))
    elements.push(h('span.word-count.info', 'words: ' + draft.word_count))
    elements.push(h('span.character-count.info', 'characters: ' + draft.character_count))
    elements.push(h('span.line-count.info', 'lines: ' + draft.line_count))
  }

  elements.push(h('span.new-draft.button.info', {
    onclick: function () { actions.createDraft() }
  }, [h('i.fa.fa-plus'), ' new draft']))

  elements.push(h('span.draft-list.button.info', {
    onclick: function () { actions.getDraftList() }
  }, [h('i.fa.fa-list'), ' draft list']))

  return h('.toolbar', elements)
}
