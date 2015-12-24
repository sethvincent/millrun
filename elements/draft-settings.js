var fs = require('fs')
var remote = require('electron').remote
var dialog = remote.dialog
var createPopup = require('popup-element')
var h = require('virtual-dom/h')
var Zip = require('jszip')

module.exports = function (state, actions) {
  var popup = createPopup(h)

  popup.on('close', function () {
    actions.closePopup()
  })

  if (state.popup === 'draft-settings') {
    function saveZipFile () {
      var draft = state.draft
      var title = draft.title.replace(/ /g, '-')
      var zip = new Zip()
      zip.file(title + '.json', new Buffer(JSON.stringify(draft)))
      zip.file(title + '.md', new Buffer(draft.markdown))
      zip.file(title + '.html', new Buffer(draft.html))
      var content = zip.generate({ type: 'nodebuffer' })
      var filename = dialog.showSaveDialog({
        title: title,
        filters: [{ name: 'Zip', extensions: ['zip'] }]
      })
      fs.writeFile(filename, content, function (err) {
        if (err) console.error(err)
        else console.log('saved', filename)
      })
    }

    function deleteDraft (e) {
      actions.unsetDraft()
      actions.destroyDraft(state.draft.key)
      actions.closePopup()
      actions.getDraftList()
    }

    return popup.open([
      h('h1', 'Draft Settings'),
      h('ul.settings-list', [
        h('li.settings-list-item', [
          h('h2', 'Save as HTML, JSON, and Markdown'),
          h('button.big', {
            onclick: saveZipFile
          }, 'Save this draft')
        ]),
        h('li.settings-list-item', [
          h('h2', 'Completely destroy this draft'),
          h('button.big', {
            onclick: deleteDraft
          }, 'Delete this draft forever no take-backs')
        ])
      ])
    ])
  } else {
    return popup.close()
  }
}
