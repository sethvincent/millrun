var createApp = require('virtual-app')
var vdom = require('virtual-dom')
var h = require('virtual-dom/h')

var db = require('./db')
var drafts = require('./drafts')(db)
var editor = require('./editor')()
var modifier = require('./modifier')
var draftSettings = require('./elements/draft-settings')

var screens = {
  draft: require('./elements/draft'),
  draft_list: require('./elements/list'),
  dashboard: require('./elements/dashboard')
}

editor.on('change', function () {
  actions.updateDraft()
})

var app = createApp(document.getElementById('app'), vdom)
var actions = require('./actions')(app, editor)

var render = app.start(modifier, {
  screen: 'draft_list',
  draft: { word_count: 0, character_count: 0, line_count: 0 },
  drafts: [],
  filteredDrafts: [],
  filter: '',
  popup: ''
})

render(function (state) {
  var elements = [screens[state.screen](state, actions)]

  if (state.popup === 'draft-settings') {
    elements.push(draftSettings(state, actions))
  }

  return h('div', { style: { height: '100%' } }, elements)
})

app.on('*', function (action, state) {
  if (state.draft && state.draft.key) {
    drafts.save(state.draft, function (err, updated) {
      if (err) return actions.error(err)
    })
  }
})

actions.getDraftList()
