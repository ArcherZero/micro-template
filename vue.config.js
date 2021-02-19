const packageName = require('./package.json').name
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

// 配置信息在这里
module.exports = {
  publicPath: './', // 静态资源引用路径
  outputDir: 'dist', // 打包文件放置位置
  lintOnSave: true, // eslint 错误处理，true表示对待eslint错误为warning，warning不会导致编译失败
  devServer: {
    // 监听端口
    port: 10001,
    overlay: {
      warnings: false,
      errors: false
    },
    // 关闭主机检查，使微应用可以被 fetch
    disableHostCheck: true,
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('store', resolve('src/store'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('api', resolve('src/api'))
      .set('utils', resolve('src/utils'))
      .set('model', resolve('src/model'))
      .set('config', resolve('src/config'))
      .set('plugins', resolve('src/plugins'))
      .set('mixins', resolve('src/mixins'))
    if (process.env.VUE_APP_SERVER_MODE !== 'production') {
      config.output.chunkFilename('[name].[chunkhash:8].js')
      config.output.filename('[name].[hash].js')
    }
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.exposeFilename = true
        return options
      })
    config.module
      .rule('fonts')
      .test(/.(ttf|otf|eot|woff|woff2)$/)
      .use('url-loader')
      .loader('url-loader')
      .options({})
      .end()
  },
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${packageName}`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`
    }
  }
}
