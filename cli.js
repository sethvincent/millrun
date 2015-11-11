#! /usr/bin/env node

var electron = require('electron-prebuilt')
var proc = require('child_process')
process.argv.splice(0, 2)
var args = [__dirname].concat(process.argv)
proc.spawn(electron, args, { stdio: 'inherit' })
