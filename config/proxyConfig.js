module.exports = {
  proxy: {
    '/apis': {    //将test.ejianmedia.com印射为/apis
      target: 'http://test.ejianmedia.com',  // 接口域名http://test.ejianmedia.com
      // target: 'http://xfh.ejianmedia.com:8081',  // 接口域名http://xfh.ejianmedia.com:8081
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/apis': ''   //需要rewrite的
      }
    }
  }
};
