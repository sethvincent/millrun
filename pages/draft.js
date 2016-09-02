var html = require('yo-yo')
var css = require('sheetify')
var createEditor = require('millrun-editor')
var debounce = require('lodash.debounce')

module.exports = function renderDraft (state, prev, send) {
  var editor = createEditor()

  var prefix = css`
    :host {
      width: 100%;
      height: 100%;
      padding: 20px;
    }

    .editor-wrapper {
      max-width: 600px;
      margin: 0px auto;
    }
  `

  var key = state.params.draftkey
  var draft = state.drafts.list[key]
  var prevDraft = prev.drafts && prev.drafts.list && prev.drafts.list[key] ? prev.drafts.list[key] : {}
  if (!draft) return html`<p></p>`

  var editorParams = {
    key: key,
    content: draft.markdown,
    onChange: function onChange (changedDraft) {
      send('drafts:change', changedDraft)
    }
  }

  var editorEl = editor(editorParams, send)

  function onclick (e) {
    send('drafts:delete', draft)
  }

  return html`<div class="${prefix} draft">
    <a href="/">list</a>
    <button onclick=${onclick}>delete</button>
    ${editorEl}
  </div>`
}
