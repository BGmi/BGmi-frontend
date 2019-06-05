let fs = require('fs')
let path = require('path')
const pkg = require('./package.json')

// 作为配置文件，直接导出配置对象即可
process.env.VUE_APP_VERSION = pkg.version

module.exports = {
  devServer: {
    // 设置主机地址
    host: 'localhost',
    // 设置默认端口
    port: 8080,
    // 设置代理
    proxy: {
      '/api': {
        target: 'http://bgmi.acg.tools/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/bangumi/': {
        target: 'http://bgmi.acg.tools/',
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  }
}
