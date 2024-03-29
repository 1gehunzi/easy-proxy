const fs = require("fs");
const path = require("path");
const yaml = require('js-yaml');

const EASY_PROXY_CONFIG_NAME = "easy-proxy.yml";
const ERROR_MESSAGES = {
  NOT_FOUND_CONFIG_FILE: `Cannot found config file ${EASY_PROXY_CONFIG_NAME}`,
};

const DEFAULT_CONFIG = {
  proxy: {
    "/api": {
      target: "<url>",
      changeOrigin: true,
    },
    "/foo": {
      target: "<other_url>",
      changeOrigin: true,
      pathRewrite: {
        "^/prod-api": "", // 在向服务端发起请求时，去掉标识xhr的前缀
      },
    },
  },
  cookie: "",
  port: 8888,
};

const readEasyProxyConfig = (configPath = EASY_PROXY_CONFIG_NAME) => {
  if (!fs.existsSync(path.resolve(configPath))) {
    throw new Error(ERROR_MESSAGES.NOT_FOUND_CONFIG_FILE);
  }
   const doc = yaml.load(fs.readFileSync(configPath, 'utf8'));
  return doc;
};

module.exports = {
  readEasyProxyConfig,
  DEFAULT_CONFIG,
  EASY_PROXY_CONFIG_NAME,
};
