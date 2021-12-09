/**
 * @author Yuanhao Pei
 * @date 2021/12/8
 */

let proxyObj = {}
proxyObj['/'] = {
  ws: false,
  target: 'http://100.73.131.113:8081',
  changeOrigin: true,
  pathRewrite: {
    '^/':''
  }
}
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
}
