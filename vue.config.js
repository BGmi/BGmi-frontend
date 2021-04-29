const pkg = require('./package.json');

// TODO: add a mock server here
function setup(app) {
  // app.get('/api/cal', function(req, res) {
  //   res.send('response');
  // });
}

// 作为配置文件，直接导出配置对象即可
process.env.VUE_APP_VERSION = pkg.version;

module.exports = {
  publicPath: './',
  configureWebpack: {
    performance: { hints: false },
  },
  devServer: {
    // 设置主机地址
    host: 'localhost',
    // 设置默认端口
    port: 8080,
    setup,
    // 设置代理
    proxy: {
      '/api': {
        target: process.env.BGMI_DEV_HOST || 'http://localhost:8888/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
      '/bangumi/': {
        target: process.env.BGMI_DEV_HOST || 'http://localhost:8888/',
        changeOrigin: true,
        pathRewrite: {
          '^/': '/',
        },
      },
    },
  },
};
