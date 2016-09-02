var level = require('level-browserify')
var db = level('millrun', { valueEncoding: 'json '})

module.exports = {
  state: {},
  reducers: {
    setState: function (data, state, prev) {
      if (data) {
        data.location.pathname = window.location.pathname
        return data
      } else {
        return state
      }
    }
  },
  effects: {},
  subscriptions: [
    function (send, done) {
      db.get('state', function (err, data) {
        if (err) console.log(err)
        send('setState', data, done)
      })
    }
  ]
}
