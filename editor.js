var codemirror = require('codemirror')
require('codemirror/addon/mode/overlay')
require('codemirror/addon/edit/continuelist')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/markdown/markdown')
require('codemirror/mode/gfm/gfm')
require('codemirror/mode/xml/xml')
require('codemirror/mode/htmlmixed/htmlmixed')

module.exports = function createEditor (options) {
  var editorContainer = document.querySelector('.editor-wrapper')
  var el = document.createElement('textarea')
  el.className = 'editor'
  editorContainer.appendChild(el)

  var editor = codemirror.fromTextArea(el, {
    theme: 'millrun',
    mode: 'gfm',
    autofocus: true,
    lineNumbers: false,
    matchBrackets: true,
    lineWrapping: true,
    extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
  })

  editor.containerEl = editorContainer
  return editor
}
