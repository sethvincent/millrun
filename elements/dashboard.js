var h = require('virtual-dom/h')
var shell = require('electron').shell

module.exports = function (state, actions) {
  var dashboard = h('.dashboard-inner', [
    h('h1', 'dashboard (coming soon)'),
    h('p', 'Soon this will be a dashboard that will show total word count, time spent on drafts, etc.'),
    h('p', 'What other usage information would be fun to see?'),
    h('p', 'What about the writing process would be fun to analyze?'),
    h('a.button', {
      href: 'https://github.com/civicmakerlab/millrun/issues/2',
      onclick: function (e) {
        e.preventDefault()
        shell.openExternal('https://github.com/civicmakerlab/millrun/issues/2')
      }
    }, 'Leave a comment on this GitHub issue')
  ])

  return h('.dashboard', [
    dashboard,
    require('./toolbar')(state, actions)
  ])
}
