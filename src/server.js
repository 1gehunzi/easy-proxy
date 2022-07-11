// index.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express(); // app 就是一个应用

const startServer = (config) => {
  const { proxy, port, cookie } = config;
  Object.keys(proxy).forEach((key) => {
    const proxyItem = proxy[key];
    console.log(proxyItem);
    app.use(
      key,
      createProxyMiddleware({
        ...proxyItem,
        onProxyReq: (proxyReq, req, res) => {
          // add custom header to request
          proxyReq.setHeader("cookie", cookie);
        },

        onProxyRes: (proxyRes, req, res) => {
          proxyRes.headers["Access-Control-Allow-Origin"] = "*";
        },
      })
    );
  });

  app.listen(port);
};

// app.listen(3000) // 当app监听一个端口时，它就可以被访问了
module.exports = {
  startServer,
};
