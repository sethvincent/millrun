var app = require('app')
var Menu = require('menu')
var BrowserWindow = require('browser-window')
require('electron-debug')()

var win

app.on('window-all-closed', function () {
  app.quit()
})

app.on('ready', function () {
  win = new BrowserWindow({
    title: 'millrun',
    'title-bar-style': 'hidden',
    width: 1200,
    height: 800
  })

  win.loadUrl('file://' + __dirname + '/index.html')

  win.on('closed', function () {
    win = null
  })

  var template = [
    {
      label: 'millrun',
      submenu: [
        { label: 'About millrun', selector: 'orderFrontStandardAboutPanel:' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Command+Q', click: function () { app.quit() } }
      ]
    },
    {
      label: 'File',
      submenu: [
        { label: 'Close', accelerator: 'CmdOrCtrl+W', click: function () { app.quit() } }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
      ]
    }
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
})
