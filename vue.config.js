const path = require('path')

module.exports = {
  devServer: {
    host: '192.168.3.76',
    port: 8000,
    https: false,
    hotOnly: false
    // proxy: {
    // }
  },
  configureWebpack: config => {
    //添加别名
    if (process.env.NODE_ENV === 'production') {
      // 这里可以为生产环境单独修改配置...
    } else {
      // 为开发环境修改配置...
      // 只修改开发环境配置，打包会出现找不到定义的别名的错误
      return {
        resolve: {
          alias: {
            '@c': path.resolve(__dirname, './src/components/'),
            '@css': path.resolve(__dirname, './src/assets/css'),
            '@img': path.resolve(__dirname, './src/assets/img'),
            '@js': path.resolve(__dirname, './src/assets/js'),
            '@utils': path.resolve(__dirname, './src/utils')
          }
        }
      }
    }
    return {
      resolve: {
        alias: {
          '@c': path.resolve(__dirname, './src/components/'),
          '@css': path.resolve(__dirname, './src/assets/styles'),
          '@img': path.resolve(__dirname, './src/assets/img'),
          '@js': path.resolve(__dirname, './src/assets/js'),
          '@utils': path.resolve(__dirname, './src/utils')
        }
      }
    }
  },
  chainWebpack: config => {
    //添加全局sass变量
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          resources: './src/assets/styles/resources.scss'
        })
        .end()
    })
  }
}
