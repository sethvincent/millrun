var createStore = require('store-emitter')
var extend = require('xtend')

module.exports = createStore(modifier, {
  screen: 'draft_list',
  draft: { word_count: 0, character_count: 0, line_count: 0 },
  drafts: []
})

function modifier (action, state) {
  console.log('%c action: ', 'background-color:#000; color:#fff;', action.type, action)
  return modifiers[action.type](action, state)
}

var modifiers = {}

modifiers['draft:create'] = function modifiers_draft_create (action, state) {
  var draft = extend(state.draft, action.draft)
  return extend(state, { draft: draft })
}

modifiers['draft:set'] = function modifiers_draft_set (action, state) {
  var draft = extend(state.draft, action.draft)
  if (state.screen === 'draft') {
    return extend(state, { draft: draft })
  } else {
    return state
  }
}

modifiers['draft:unset'] = function modifiers_draft_unset (action, state) {
  state.draft = {}
  return extend(state, {
    draft: {
      word_count: 0,
      character_count: 0,
      line_count: 0
    }
  })
}

modifiers['draft:list'] = function modifiers_draft_list (action, state) {
  return extend(state, { drafts: action.drafts })
}

modifiers['screen:set'] = function modifiers_screen_set (action, state) {
  return extend(state, { screen: action.screen })
}

modifiers['error'] = function modifiers_error (action, state) {
  return extend(state, { error: action.error })
}
