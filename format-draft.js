var removeMarkdown = require('remove-markdown')
var removeNewline = require('newline-remove')
var wordCount = require('wordcount')
var md = require('markdown-it')()

module.exports = function formatDraft (editor) {
  var title = removeNewline(removeMarkdown(editor.getLine(0)))
  var value = editor.getValue()
  var text = removeMarkdown(value)
  var html = md.render(value)
  var word_count = wordCount(text)
  var character_count = text.length
  var line_count = editor.lineCount()

  return {
    title: title,
    markdown: value,
    html: html,
    word_count: word_count,
    character_count: character_count,
    line_count: line_count
  }
}
