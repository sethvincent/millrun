  var cuid = require('cuid')
  var db = require('./db')
  var drafts = require('./drafts')(db)
  var store = require('./store')
  var formatDraft = require('./format-draft')

  module.exports = function createActions (editor) {
    editor = editor || {}
    var actions = {}

    actions.unsetDraft = function () {
      store({ type: 'draft:unset' })
      editor.setValue('')
    }

    actions.setDraft = function (draft) {
      actions.setScreen('draft')
      store({ type: 'draft:set', draft: draft })
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
        store({ type: 'draft:create', draft: draft })
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
      store({ type: 'draft:set', draft: draft })
    }

    actions.saveDraft = function (data) {
      drafts.save(data, function (err, saved) {
        if (err) return actions.error(err)
        actions.setDraft(saved.value)
      })
    }

    actions.destroyDraft = function (key) {
      if (typeof key === 'object') {
        key = key.key
      }

      drafts.del(key, function (err) {
        if (err) return actions.error(err)
        actions.getDraftList()
      })
    }

    actions.getDraftList = function () {
      if (editor.containerEl) editor.containerEl.className = 'editor-wrapper hidden'
      actions.setScreen('draft_list')
      actions.unsetDraft()

      var list = []
      drafts.createReadStream({ keys: false })
        .on('data', function (data) {
          list.push(data)
        })
        .on('end', function () {
          store({ type: 'draft:list', drafts: list })
        })
    }

    actions.setScreen = function (screen) {
      store({ type: 'screen:set', screen: screen })
    }

    actions.error = function actions_error (error) {
      store({ type: 'error', error: error })
    }

    return actions
  }
