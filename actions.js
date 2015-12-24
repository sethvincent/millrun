var cuid = require('cuid')
var db = require('./db')
var drafts = require('./drafts')(db)
var formatDraft = require('./format-draft')
var search = require('./search')

module.exports = function createActions (app, editor) {
  editor = editor || {}
  var actions = {}

  actions.unsetDraft = function () {
    app.store({ type: 'draft:unset' })
    editor.setValue('')
    if (editor.containerEl) {
      editor.containerEl.className = 'editor-wrapper hidden'
    }
  }

  actions.setDraft = function (draft) {
    actions.setScreen('draft')
    app.store({ type: 'draft:set', draft: draft })
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
      app.store({ type: 'draft:create', draft: draft })
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
    app.store({ type: 'draft:set', draft: draft })
  }

  actions.saveDraft = function (data) {
    drafts.save(data, function (err, saved) {
      if (err) return actions.error(err)
      actions.setDraft(saved.value)
    })
  }

  actions.destroyDraft = function (key) {
    console.log('welkfwleknflwkenflwkneflwknef', key)
    if (typeof key === 'object') {
      key = key.key
    }

    drafts.del(key, function (err) {
      console.log('wtf', 'elkflwenf', key)
      if (err) return actions.error(err)
      actions.getDraftList()
    })
  }

  actions.getDraftList = function () {
    actions.setScreen('draft_list')
    actions.unsetDraft()
    actions.setFilteredDraftList([])
    actions.filter('')

    var list = []
    drafts.createReadStream({ keys: false })
      .on('data', function (data) {
        list.push(data)
        search.add(data)
      })
      .on('end', function () {
        app.store({ type: 'draft:list', drafts: list })
      })
  }

  actions.filter = function (str) {
    app.store({ type: 'filter', filter: str })
  }

  actions.setFilteredDraftList = function (drafts) {
    app.store({ type: 'draft:filtered_list', filteredDrafts: drafts })
  }

  actions.showDashboard = function () {
    actions.unsetDraft()
    actions.setScreen('dashboard')
  }

  actions.setScreen = function (screen) {
    app.store({ type: 'screen:set', screen: screen })
  }

  actions.openPopup = function (popup) {
    app.store({ type: 'popup:open', popup: popup })
  }

  actions.closePopup = function (popup) {
    app.store({ type: 'popup:close' })
  }

  actions.error = function actions_error (error) {
    app.store({ type: 'error', error: error })
  }

  return actions
}
