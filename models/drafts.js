var assert = require('assert')
var extend = require('extend')
var format = require('millrun-editor/format')
var cuid = require('cuid')
var level = require('level-browserify')
var db = level('millrun', { valueEncoding: 'json '})

module.exports = {
  namespace: 'drafts',
  state: {
    list: {},
  },
  reducers: {
    put: function (data, state) {
      state.list[data.key] = data
      return extend(state, state)
    },
    putList: function (data, state) {
      return { list: data }
    },
    del: function (data, state) {
      delete state.list[data.key]
      return state
    }
  },
  effects: {
    create: function (data, state, send, done) {
      var draft = format('# Untitled')
      draft.key = cuid()
      send('location:navigate', '/edit/' + draft.key, function () {
        send('drafts:put', draft, done)
      })
    },
    change: function (data, state, send, done) {
      // mutating state in an effect like a jerk
      // this solves an infinite loop with the drafts view
      state.list[data.key] = data
      db.get('state', function (err, savedState) {
        savedState.drafts = state
        db.put('state', savedState, function (err) {
          done()
        })
      })
    },
    delete: function (data, state, send, done) {
      send('location:navigate', '/', function () {
        send('drafts:del', data, done)
      })
    },
    setList: function (data, state, send, done) {

    }
  },
  subscriptions: []
}
