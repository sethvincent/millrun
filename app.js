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

store.on('*', function (action, state) {
  tree.update(state)
  if (state.draft && state.draft.key) {
    drafts.save(state.draft, function (err, updated) {
      if (err) return actions.error(err)
    })
  }
})

var actions = require('./actions')(editor)
var tree = loop(store.initialState(), render, require('virtual-dom'))
document.getElementById('app').appendChild(tree())

function render (state) {
  var screen = screens[state.screen]
  return screen(state, actions)
}

actions.getDraftList()
