let fs = require('fs')
let path = require('path')

let o = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')))

module.exports = {
  NODE_ENV: '"production"',
  VERSION: '"' + o.version + '"'

}
