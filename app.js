var loop = require('virtual-raf')

var db = require('./db')
var drafts = require('./drafts')(db)
var store = require('./store')
var editor = require('./editor')()

var screens = {
  draft: require('./elements/draft'),
  draft_list: require('./elements/list')
}

editor.on('change', function () {
  actions.updateDraft()
})

var actions = require('./actions')(editor)
var tree = loop(store.getState(), render, require('virtual-dom'))
document.getElementById('app').appendChild(tree())

store.subscribe(function () {
  var state = store.getState()
  tree.update(state)
  if (state.draft && state.draft.key) {
    drafts.save(state.draft, function (err, updated) {
      if (err) return actions.error(err)
    })
  }
})

function render (state) {
  var options = {}
  options.onclick = router
  var screen = screens[state.screen]
  return screen(state, options)
}

function router (screen, draft) {
  if (screen === 'new_draft') {
    actions.createDraft()
  } else if (screen === 'draft_list') {
    actions.getDraftList()
  } else if (screen === 'draft') {
    actions.setDraft(draft)
  }
}

router('draft_list')
