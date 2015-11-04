var createStore = require('redux').createStore

module.exports = createStore(require('./reducers'), {
  screen: 'draft_list',
  draft: { word_count: 0, character_count: 0, line_count: 0 },
  drafts: []
})
