var path = require('path')
var home = require('home-dir').directory
var mkdirp = require('mkdirp')

var dir = path.join(home, '.millrun')
var dbDir = path.join(dir, 'db')
mkdirp.sync(dbDir)

module.exports = {
  dir: dir,
  db: dbDir
}
