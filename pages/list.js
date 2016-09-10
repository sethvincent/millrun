var html = require('yo-yo')
var css = require('sheetify')

module.exports = function createList() {
  return function renderList (state, prev, send) {
    var drafts = state.drafts.list
    var keys = Object.keys(drafts)

    var prefix = css`
      :host {
        width: 100%;
        max-width: 600px;
        margin: 0px auto;
        padding: 20px 0px;
      }

      .link {
        background-color: #fff;
        width: 100%;
        color: #333;
      }

      .link:hover {
        color: #000;
        background-color: rgba(23, 200, 255, 0.05);
        cursor: pointer;
      }
    `

    function newDraft () {
      send('drafts:create')
    }

    return html`<div class="${prefix}">
      <button onclick=${newDraft}>new draft</button>
      <ul class="list pl0 drafts-list bb b--light-gray">
        ${keys.map(function item (key) {
          var draft = drafts[key]
          return html`<li class="draft db">
            <a class="link pa3 bt br bl db b--light-gray" href="/edit/${key}">${draft.title}</a>
          </li>`
        })}
      </ul>
    </div>`
  }
}
