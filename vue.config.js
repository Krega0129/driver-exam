module.exports = {
  publicPath: './',
  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '驾照帮'
      return args
    })
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
      config.mode = 'production';
      config["performance"] = {//打包文件大小配置
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
      
    }
  }
}
