  var cuid = require('cuid')
  var db = require('./db')
  var drafts = require('./drafts')(db)
  var store = require('./store')
  var formatDraft = require('./format-draft')

  module.exports = function createActions (editor) {
    var actions = {}

    actions.unsetDraft = function () {
      store.dispatch({ type: 'unset_draft' })
      editor.setValue('')
    }

    actions.setDraft = function (draft) {
      actions.setScreen('draft')
      store.dispatch({ type: 'set_draft', draft: draft })
      editor.containerEl.className = 'editor-wrapper'
      editor.setValue(draft.markdown)
      setTimeout(function () {
        editor.refresh()
        editor.focus()
      }, 0)
    }

    actions.createDraft = function () {
      var data = { key: cuid(), word_count: 0, character_count: 0, line_count: 0 }
      drafts.create(data, function (err, draft) {
        if (err) return actions.error(err)
        store.dispatch({ type: 'create_draft', draft: draft })
        actions.setScreen('draft')
        editor.containerEl.className = 'editor-wrapper'
        editor.setValue('')
        setTimeout(function () {
          editor.refresh()
          editor.focus()
        }, 0)
      })
    }

    actions.updateDraft = function () {
      var draft = formatDraft(editor)
      store.dispatch({ type: 'set_draft', draft: draft })
    }

    actions.saveDraft = function (data) {
      drafts.save(data, function (err, saved) {
        if (err) return actions.error(err)
        actions.setDraft(saved.value)
      })
    }

    actions.getDraftList = function () {
      editor.containerEl.className = 'editor-wrapper hidden'
      actions.setScreen('draft_list')
      actions.unsetDraft()

      var list = []
      drafts.createReadStream({ keys: false })
        .on('data', function (data) {
          list.push(data)
        })
        .on('end', function () {
          store.dispatch({ type: 'get_draft_list', drafts: list })
        })
    }

    actions.setScreen = function (screen) {
      store.dispatch({ type: 'set_screen', screen: screen })
    }

    actions.error = function actions_error (error) {
      store.dispatch({ type: 'error', error: error })
    }

    return actions
  }
