/* eslint-disable global-require */

'use strict';

// eslint-disable-next-line import/no-unresolved
const papi = require('papi-backend');

const { logger } = papi;

async function tryImports() {
  logger.info('Evil is importing! Mwahahaha');

  try {
    // This will be blocked and will suggest the papi.storage api.
    const fs = require('fs');
    logger.error(`Successfully imported fs! fs.readFileSync = ${fs.readFileSync}`);
  } catch (e) {
    logger.info(e.message);
  }

  try {
    // This will be blocked and will suggest the papi.fetch api.
    const https = require('https');
    logger.error(`Successfully imported https! ${https}`);
  } catch (e) {
    logger.info(e.message);
  }

  try {
    // This should always work because `fetch` is replaced with `papi.fetch`.
    await fetch('https://www.example.com');
    logger.info('Evil: fetch is working.');
  } catch (e) {
    logger.error(`Evil: Error on fetch! ${e}`);
  }

  try {
    // This is just for testing and will throw an exception.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const xhr = new XMLHttpRequest();
  } catch (e) {
    logger.info(`Evil: Error on XMLHttpRequest! ${e}`);
  }

  try {
    // This is just for testing and will throw an exception.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const webSocket = new WebSocket();
  } catch (e) {
    logger.info(`Evil: Error on WebSocket! ${e}`);
  }

  try {
    // This will be blocked and will suggest the papi.storage api.
    const fs = await import('fs');
    logger.error(`Successfully dynamically imported fs! fs.readFileSync = ${fs.readFileSync}`);
  } catch (e) {
    logger.info(`Evil: Error on dynamic import! ${e.message}`);
  }

  try {
    // This should always work.
    const genericFetch = await (await papi.fetch('https://www.example.com')).text();
    logger.info(`Evil: could papi.fetch example.com "${genericFetch.substring(0, 100)}"`);
  } catch (e) {
    logger.error(`Evil: Error on papi.fetch! ${e}`);
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
