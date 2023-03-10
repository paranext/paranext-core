'use strict';

// eslint-disable-next-line import/no-unresolved
const papi = require('papi');

const { logger } = papi;

logger.log('Hello Someone is importing!');

// This will be blocked
const fs = require('fs');

logger.log(
  fs.message
    ? fs.message
    : `Successfully imported fs! fs.readFileSync = ${fs.readFileSync}`,
);

const unsubscribers = [];

exports.activate = async () => {
  logger.log('Hello Someone is activating!');

  const unsubPromises = [
    papi.commands.registerCommand('hello-someone.hello-someone', (someone) => {
      return `Hello ${someone}!`;
    }),
    papi.commands.registerCommand(
      'hello-someone.echo-someone-renderer',
      async (message) => {
        return `echo-someone-renderer: ${await papi.commands.sendCommand(
          'addThree',
          2,
          4,
          6,
        )}! ${message}`;
      },
    ),
  ];

  return Promise.all(
    unsubPromises.map((unsubPromise) => unsubPromise.promise),
  ).then(() => {
    logger.log('Hello Someone is finished activating!');
    return papi.util.aggregateUnsubscriberAsyncs(
      unsubPromises.map((unsubPromise) => unsubPromise.unsubscriber),
    );
  });
};

exports.deactivate = async () => {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
};
