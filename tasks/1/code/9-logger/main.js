'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');

const load = require('./load.js');
const db = require('./db.js');
const hash = require('./hash.js');
const logger = require('./logger.js');

const { main } = require("./config.js");

const staticServer = require(main.staticServerPath);
const server = require(main.serverPath);

const sandbox = {
  console: Object.freeze(logger),
  db: Object.freeze(db),
  common: { hash },
};
const apiPath = path.join(process.cwd(), main.APIPath);
const routing = {};

(async () => {
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith(main.executableFileExtension)) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, main.executableFileExtension);
    routing[serviceName] = await load(filePath, sandbox);
  }

  staticServer(main.staticFilesPath, main.staticServerPort);
  server(routing, main.serverPort);
})();
