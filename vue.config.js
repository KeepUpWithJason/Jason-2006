const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  // 2.配置跨域代理(代理服务器)
  devServer: {
    port: 8080,//设置项目端口号
    host: "0.0.0.0", //允许所有的主机访问当前项目
    proxy: {
      '/api': { //正则匹配到以这个开头的时候 就用代理
        target: "http://www.chst.vip", //指向的是目标服务器
        // target:url,
        pathRewrite: {
          '^/api': ""
        }
      }
    }
  }
};