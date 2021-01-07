'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/api/':{
      //   target: "http://api.zhanqun.com/",  // 配置到服务器后端的API头部
      //   pathRewrite: {
      //     '^/api': '/'  // 路径重写，第一个与上面相同，第二个/queue-admin 为server.context-path（服务器的上下文）
      //   }
      // },
      // '/api': {
      //   target: 'http://api.zhanqun.com', // 接口的域名
      //   // secure: false,  // 如果是https接口，需要配置这个参数
      //   changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      //   pathRewrite: {
      //     '^/api': '/v1'
      //   }
      // },
      // '/api/':'http://localhost:3000/',
      // '/queue-admin': {  // 使用"/queue-admin"来代替 API头部，可随意命名
      //   //target: 'http://192.168.11.12:8080',  // 源地址 本地开发的API头部
      //   target: "https://xxx.com",  // 配置到服务器后端的API头部
      //   pathRewrite: {
      //     '^/queue-admin': '/queue-admin'  // 路径重写，第一个与上面相同，第二个/queue-admin 为server.context-path（服务器的上下文）
      //   },
      //   // 以下解决https 访问问题。上面的可以访问http
      //   changeOrigin: true,
      //   secure: false,
      //   headers: {
      //     Referer: 'https://xxx.com'
      //   }
      // }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    // host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // 添加test pre prod 三处环境的配制
    prodEnv: require('./prod.env'),
    preEnv: require('./pre.env'),
    testEnv: require('./test.env'),
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css', 'svg'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
