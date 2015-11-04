var extend = require('xtend')

var reducers = {
  create_draft: function (state, action) {
    var draft = extend(state.draft, action.draft)
    return extend(state, { draft: draft })
  },
  set_draft: function (state, action) {
    var draft = extend(state.draft, action.draft)
    if (state.screen === 'draft') {
      return extend(state, { draft: draft })
    } else {
      return state
    }
  },
  unset_draft: function (state, action) {
    state.draft = {}
    return extend(state, { draft: { word_count: 0, character_count: 0, line_count: 0 } })
  },
  get_draft_list: function (state, action) {
    return extend(state, { drafts: action.drafts })
  },
  set_screen: function (state, action) {
    return extend(state, { screen: action.screen })
  },
  error: function (state, action) {
    return extend(state, { error: action.error })
  }
}

module.exports = function (state, action) {
  if (action.type.indexOf('@@redux') > -1) return state
  var newState = reducers[action.type](state, action)
  return newState
}
