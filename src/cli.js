const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const extPackageJson = require("../package.json");
const open = require("open");
const chalk = require("chalk");

const log = console.log;

const {
  readEasyProxyConfig,
  DEFAULT_CONFIG,
  EASY_PROXY_CONFIG_NAME,
} = require("./utils");
const { startServer } = require("./server");

program.version(extPackageJson.version, "-v, --version");

program
  .command("init")
  .description(`create ${EASY_PROXY_CONFIG_NAME} file`)
  .action(() => {
    const file = path.resolve(process.cwd(), `./${EASY_PROXY_CONFIG_NAME}`);

    if (fs.existsSync(file)) {
      console.log(
        `You've already have a ${EASY_PROXY_CONFIG_NAME} file in the root directory.`
      );
    } else {
      fs.writeFileSync(file, JSON.stringify(DEFAULT_CONFIG, null, 2));
    }
  });

// 本地开发测试 node src/cli.js run
program
  .command("run")
  .description("Run mock server")
  .action(() => {
    const file = path.resolve(process.cwd(), `./${EASY_PROXY_CONFIG_NAME}`);

    console.log("file---", file);
    const config = readEasyProxyConfig(file);

    const link = `http://localhost:${config.port}`;
    startServer(config);

    open(link);
    // console.log(linkifyTerminal("proxy link: " + link, {pretty: true}));
    //  console.log(linkifyTerminal(`proxy link: ${link}  --Carlos`, {pretty: true}));
      console.log("proxy link:", chalk.blueBright.underline(link));
  });

program.description("Run mock server").action(() => {
  const config = readEasyProxyConfig(
    path.resolve(process.execPath, "../easy-proxy.config.json")
  );
  startServer(config);
  const link = `http://localhost:${config.port}`;
  open(link);
  console.log("proxy link:", chalk.blueBright.underline(link));
  // console.log(linkifyTerminal(`proxy link: ${link} --Carlos`, {pretty: true}));
});

program.parse(process.argv);
