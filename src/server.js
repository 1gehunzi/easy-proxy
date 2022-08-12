// index.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express(); // app 就是一个应用
app.use(cors());

const startServer = (config) => {
  const { proxy, port, headers } = config;
  Object.keys(proxy).forEach((key) => {
    const proxyItem = proxy[key];
    app.use(
      key,
      createProxyMiddleware({
        ...proxyItem,
        onProxyReq: (proxyReq, req, res) => {
          if (headers) {
            Object.keys(headers).forEach((key) => {
              proxyReq.setHeader("key", headers[key]);
            });
          }
        },
      })
    );
  });

  app.listen(port);
};

module.exports = {
  startServer,
};
