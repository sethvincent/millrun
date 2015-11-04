var codemirror = require('codemirror')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/markdown/markdown')
require('codemirror/mode/gfm/gfm')
require('codemirror/mode/xml/xml')

module.exports = function createEditor (options) {
  var editorContainer = document.querySelector('.editor-wrapper')
  var el = document.createElement('textarea')
  el.className = 'editor'
  editorContainer.appendChild(el)

  var editor = codemirror.fromTextArea(el, {
    mode: 'gfm',
    theme: 'yeti',
    lineNumbers: false,
    lineWrapping: true,
    autofocus: true
  })

  editor.containerEl = editorContainer
  return editor
}
