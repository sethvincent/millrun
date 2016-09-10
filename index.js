var choo = require('choo')
var css = require('sheetify')
var level = require('level-browserify')
var db = level('millrun', { valueEncoding: 'json '})

css('tachyons')
css('./style.css', { global: true })

var app = choo({
  onAction: function (data, state, name, caller, createSend) {
    //console.log('action', caller)
  },
  onStateChange: function (data, state, prev, caller, createSend) {
    db.put('state', state, function (err) {
      if (err) console.log(err)
    })    
  }
})

app.model(require('./models/app'))
app.model(require('./models/location'))
app.model(require('./models/drafts'))

app.router(function (route) {
  return [
    route('/', require('./pages/list')()),
    route('/edit/:draftkey', require('./pages/draft'))
  ]
})

var tree = app.start()
document.body.appendChild(tree)
