const { createProxyMiddleware } = require('http-proxy-middleware');
// ,
//      "proxy": "http://localhost:5001"
//

module.exports = function(app) {
   app.use(
         '/api',
         createProxyMiddleware({
             target: 'https://localhost:5001/',
             changeOrigin: true,
             pathRewrite: {
                '/api': '/api'
             }
         })
      );
    app.use(
        '/ab',
        createProxyMiddleware({
           target: 'http://localhost:8080',
           changeOrigin: true,
           pathRewrite: {
             '/': ''
           }
        })
    );
};
