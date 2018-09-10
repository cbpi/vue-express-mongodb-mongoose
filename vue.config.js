// vue.config.js
module.exports = {
  // 修改的配置
  // 将baseUrl: '/api',改为baseUrl: '/',
  baseUrl: '/ss/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8088/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
