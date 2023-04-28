/* eslint-disable global-require */

'use strict';

// eslint-disable-next-line import/no-unresolved
const papi = require('papi');

const { logger } = papi;

logger.info('Evil is importing! Mwahahaha');

try {
  // This will be blocked
  const fs = require('fs');
  logger.info(`Successfully imported fs! fs.readFileSync = ${fs.readFileSync}`);
} catch (e) {
  logger.info(e.message);
}

try {
  // This will be blocked and will suggest the papi.fetch api
  const https = require('https');
  logger.info(`Successfully imported https! ${https}`);
} catch (e) {
  logger.info(e.message);
}

try {
  // This is just for testing and will throw an exception
  fetch('test');
} catch (e) {
  logger.info(`Evil: Error on fetch! ${e}`);
}

try {
  // This is just for testing and will throw an exception
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const xhr = new XMLHttpRequest();
} catch (e) {
  logger.info(`Evil: Error on XMLHttpRequest! ${e}`);
}

try {
  // This is just for testing and will throw an exception
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const webSocket = new WebSocket();
} catch (e) {
  logger.info(`Evil: Error on WebSocket! ${e}`);
}
