// index.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require('cors')

const app = express(); // app 就是一个应用
app.use(cors())

const startServer = (config) => {
  const { proxy, port, headers } = config;
  Object.keys(proxy).forEach((key) => {
    const proxyItem = proxy[key];
    console.log(proxyItem);
    app.use(
      key,
      createProxyMiddleware({
        ...proxyItem,
        onProxyReq: (proxyReq, req, res) => {
          Object.keys(headers).forEach(key => {
            proxyReq.setHeader("key", headers[key]);
          })
        }
      })
    );
  });

  app.listen(port);
};

// app.listen(3000) // 当app监听一个端口时，它就可以被访问了
module.exports = {
  startServer,
};
