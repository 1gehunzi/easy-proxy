// index.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express(); // app 就是一个应用

const startServer = (config) => {
    const { proxy, port } = config
    // console.log(proxy)
    // const proxyKeys = Object.keys(proxy)
    // for (key of proxyKeys) {
    //   app.use(key, createProxyMiddleware(proxy[key]))

    // }
  Object.keys(proxy).forEach(key => {
      const proxyItem = proxy[key]
      console.log(proxyItem)
      app.use(key, createProxyMiddleware(proxyItem))
  })

  app.listen(port);
};

// app.listen(3000) // 当app监听一个端口时，它就可以被访问了
module.exports = {
  startServer,
};
