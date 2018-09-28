// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  /*
  邱浩：http://196.131.7.90
  史文革：http://196.131.7.87
  高乐：http://196.131.6.58
  张红宝：http://196.131.6.52
  冀帅涛：.http://196.131.7.120
  周超：http://196.131.6.59
  196.123.134.45
*/
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/dwapp': {
        target: 'http://196.123.134.228:18002/dwapp',
        changeOrigin: true,
        pathRewrite: {
          '/dwapp': ''
        }
      },
      '/45': {
        target: 'http://196.123.134.45:18002/dw',
        changeOrigin: true,
        pathRewrite: {
          '/45': ''
        }
      },
      '/dw': {
        target: 'http://196.131.7.90:18002/dw',
        // target: 'http://196.123.134.228:18002/dw',
        changeOrigin: true,
        pathRewrite: {
          '/dw': ''
        }
      },
      '/swg'  : {
        target: 'http://196.131.7.87:18002/dw',
        changeOrigin: true,
        pathRewrite: {
          '/swg': ''
        }
      },
      '/jst': {
        target: 'http://196.131.7.120:18002/dw',
        changeOrigin: true,
        pathRewrite: {
          '/jst': ''
        }
      },
      '/base-service3': {
        target: 'http://196.123.134.228:18002/base-service',
        changeOrigin: true,
        pathRewrite: {
          '/base-service3': ''
        }
      },
      '/base-service': {
        target: 'http://196.123.134.228:18002/bdsp-query-service',
        changeOrigin: true,
        pathRewrite: {
          '/base-service': ''
        }
      },
      '/bdsp-query-service': {
        target: 'http://196.123.134.228:18002/bdsp-query-service',
        changeOrigin: true,
        pathRewrite: {
          '/bdsp-query-service': ''
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
