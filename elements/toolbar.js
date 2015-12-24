var h = require('virtual-dom/h')

module.exports = function (state, actions) {
  var draft = state.draft
  var buttons = [
    h('li.button.info', {
      onclick: function () { actions.createDraft() }
    }, [h('i.fa.fa-plus'), ' new']),
    h('li.button.info', {
      onclick: function () { actions.getDraftList() }
    }, [h('i.fa.fa-list'), ' list']),
    h('li.button.info', {
      onclick: function () { actions.showDashboard() }
    }, [h('i.fa.fa-dashboard'), ' dashboard'])
  ]

  if (state.screen === 'draft_list') {
    buttons.push(h('li.info.search', require('./search')(state, actions)))
  }

  var elements = [h('ul.app-buttons.button-list', buttons)]

  var draftButtons = h('ul.draft-buttons.button-list', [
    h('li.word-count.info', 'words: ' + draft.word_count),
    h('li.character-count.info', 'characters: ' + draft.character_count),
    h('li.line-count.info', 'lines: ' + draft.line_count),
    h('li.draft-settings.button.info', {
      onclick: function () {
        actions.openPopup('draft-settings')
      }
    }, h('i.fa.fa-gear'))
  ])

  if (state.screen === 'draft') {
    elements.push(draftButtons)
  }

  return h('.toolbar', elements)
}
