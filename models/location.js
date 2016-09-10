var assert = require('assert')

module.exports = {
  namespace: 'location',
  state: {},
  effects: {
    navigate: function (data, state, send, done) {
      assert.ok(data || typeof data === 'string', 'pathname is required and must be a string')
      window.history.pushState({}, null, data)
      send('location:setLocation', { location: data }, done)
    }
  }
}
