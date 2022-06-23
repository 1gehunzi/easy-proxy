const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const extPackageJson = require('../package.json')

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

program
  .command("run")
  .description("Run mock server")
  .action(() => {
    const config = readEasyProxyConfig();
    startServer(config);
  });

program.description("Run mock server")
.action(() => {
    const config = readEasyProxyConfig();
    startServer(config);
  });


program.parse(process.argv);

// const config = readEasyProxyConfig();
// startServer(config);