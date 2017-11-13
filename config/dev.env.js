let merge = require('webpack-merge')
let prodEnv = require('./prod.env')
let fs = require('fs')
let path = require('path')

let o = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')))

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VERSION: '"' + o.version + '"'

})
