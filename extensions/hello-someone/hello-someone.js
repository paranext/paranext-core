'use strict';

// eslint-disable-next-line import/no-unresolved
const papi = require('papi');

const { logger } = papi;

logger.info('Hello Someone is importing!');

const unsubscribers = [];

exports.activate = async () => {
  logger.info('Hello Someone is activating!');

  const unsubPromises = [
    papi.commands.registerCommand('hello-someone.hello-someone', (someone) => {
      return `Hello ${someone}!`;
    }),
    papi.commands.registerCommand('hello-someone.echo-someone-renderer', async (message) => {
      return `echo-someone-renderer: ${await papi.commands.sendCommand(
        'addThree',
        2,
        4,
        6,
      )}! ${message}`;
    }),
  ];

  return Promise.all(unsubPromises.map((unsubPromise) => unsubPromise.promise)).then(() => {
    logger.info('Hello Someone is finished activating!');
    return papi.util.aggregateUnsubscriberAsyncs(
      unsubPromises.map((unsubPromise) => unsubPromise.unsubscriber),
    );
  });
};

exports.deactivate = async () => {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
};
