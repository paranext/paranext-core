/* eslint-disable global-require */

'use strict';

const papi = require('papi-backend');

const { logger } = papi;

async function tryImports() {
  logger.info('Evil is importing! Mwahahaha');

  try {
    // This will be blocked and will suggest the papi.storage api.
    const fs = require('fs');
    logger.error(`Evil: <<BAD>> Successfully imported fs! fs.readFileSync = ${fs.readFileSync}`);
  } catch (e) {
    logger.info(`Evil: Good error on require fs: ${e.message}`);
  }

  try {
    // This will be blocked and will suggest the papi.fetch api.
    const https = require('https');
    logger.error(`Evil: <<BAD>> Successfully imported https! ${JSON.stringify(https)}`);
  } catch (e) {
    logger.info(`Evil: Good error on require https: ${e.message}`);
  }

  try {
    // This should always work because `fetch` is replaced with `papi.fetch`.
    await fetch('https://www.example.com');
    logger.info('Evil: Good - fetch is working.');
  } catch (e) {
    logger.error(`Evil: <<BAD>> error on fetch! ${e}`);
  }

  try {
    // This is just for testing and will throw an exception.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const xhr = new XMLHttpRequest();
    logger.error(`Evil: <<BAD>> Successfully created an XMLHttpRequest!`);
  } catch (e) {
    logger.info(`Evil: Good error on XMLHttpRequest! ${e}`);
  }

  try {
    // This is just for testing and will throw an exception.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const webSocket = new WebSocket();
    logger.error(`Evil: <<BAD>> Successfully created a WebSocket!`);
  } catch (e) {
    logger.info(`Evil: Good error on WebSocket! ${e}`);
  }

  try {
    // This will be blocked and will suggest the papi.storage api.
    const fs = await import('fs');
    logger.error(
      `Evil: <<BAD>> Successfully dynamically imported fs! fs.readFileSync = ${fs.readFileSync}`,
    );
  } catch (e) {
    logger.info(`Evil: Good error on dynamic import! ${e.message}`);
  }

  try {
    // This should always work.
    const genericFetch = await (await papi.fetch('https://www.example.com')).text();
    logger.info(
      `Evil: Good success - could papi.fetch example.com "${genericFetch.substring(0, 100)}"`,
    );
  } catch (e) {
    logger.error(`Evil: <<BAD>> error on papi.fetch! ${e}`);
  }
}

tryImports();

function activate() {
  logger.info('Evil is activating...');
  tryImports();
  // 3 secs is timed to be after the extension service has finished initializing.
  setTimeout(tryImports, 3000);
  logger.info('Evil is finished activating!');
}

function deactivate() {
  logger.info('Evil is deactivated.');
}

exports.activate = activate;
exports.deactivate = deactivate;
