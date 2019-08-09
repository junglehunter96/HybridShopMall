const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  baseUrl: '/', // 默认'/'，部署应用包时的基本 URL
  outputDir: 'dist',
  lintOnSave: true,
  runtimeCompiler: true, //运行时编译
  devServer: {
    host: '192.168.3.76',
    port: 8080,
    https: false,
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
    proxy: null // string | Object
  },

  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@styles', resolve('src/assets/styles'))
      .set('@components', resolve('src/components'))
      .set('@plugins', resolve('src/plugins'))
      .set('@views', resolve('src/views'))
      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))
      .set('@static', resolve('src/static'))
  },
  chainWebpack: config => {
    //添加全局sass变量和混入函数
    config => {
      const oneOfsMap = config.module.rule('scss').oneOfs.store
      oneOfsMap.forEach(item => {
        item
          .use('sass-resources-loader')
          .loader('sass-resources-loader')
          .options({
            // Or array of paths
            resources: [
              './src/assets/styles/var.scss',
              './src/assets/styles/mixins.scss'
            ]
          })
          .end()
      })
    }
  }
}
