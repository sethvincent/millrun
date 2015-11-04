var level = require('level')
var config = require('./config')

module.exports = level(config.db)
