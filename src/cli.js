const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const extPackageJson = require("../package.json");
const open = require("open");
const chalk = require("chalk");

const log = console.log;

const {
  readEasyProxyConfig,
  EASY_PROXY_CONFIG_NAME,
} = require("./utils");
const { startServer } = require("./server");

// 本地开发测试 node src/cli.js run
program
  .command("run")
  .description("Run mock server")
  .action(() => {
    const file = path.resolve(process.cwd(), `./${EASY_PROXY_CONFIG_NAME}`);
    const config = readEasyProxyConfig(file);
    const link = `http://localhost:${config.port}`;
    startServer(config);

    open(link);
    console.log("proxy link:", chalk.blueBright.underline(link));
  });

program.description("Run proxy server").action(() => {
  const config = readEasyProxyConfig(
    path.resolve(process.execPath, "../easy-proxy.yml")
  );
  startServer(config);
  const link = `http://localhost:${config.port}`;
  open(link);
  console.log("proxy link:", chalk.blueBright.underline(link));
});

program.parse(process.argv);
