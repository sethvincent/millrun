var html = require('yo-yo')
var css = require('sheetify')

module.exports = function createList() {
  return function renderList (state, prev, send) {
    var drafts = state.drafts.list
    var keys = Object.keys(drafts)

    var prefix = css`
      :host {
        width: 90%;
        max-width: 600px;
        margin: 50px auto 0px auto;
      }
    `

    function newDraft () {
      send('drafts:create')
    }

    return html`<div class="${prefix} list">
      <button onclick=${newDraft}>new draft</button>
      <div class="drafts-list">
        ${keys.map(function item (key) {
          var draft = drafts[key]
          return html`<div class="draft">
            <a href="/edit/${key}">${draft.title}</a>
          </div>`
        })}
      </div>
    </div>`
  }
}
