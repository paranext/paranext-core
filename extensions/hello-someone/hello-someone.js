'use strict';

// eslint-disable-next-line import/no-unresolved
const papi = require('papi');

const { logger } = papi;

logger.info('Hello Someone is importing!');

const unsubscribers = [];

const greetingsDataProviderEngine = {
  people: {
    bill: 'Hi, my name is Bill!',
    kathy: 'Hello. My name is Kathy.',
  },
  /**
   * @param {string} selector
   * @param {string} data
   */
  set: async (selector, data) => {
    // Don't change everyone's greeting, you heathen!
    if (selector === '*') return false;

    // If there is no change in the greeting, don't update
    if (data === greetingsDataProviderEngine.people[selector.toLowerCase()]) return false;

    // Update the greeting and send an update
    greetingsDataProviderEngine.people[selector.toLowerCase()] = data;
    return true;
  },

  /**
   * @param {string} selector
   */
  async get(selector) {
    if (selector === '*') return this.people;
    return this.people[selector.toLowerCase()];
  },

  /** Test method to make sure people can use data providers' custom methods */
  // eslint-disable-next-line class-methods-use-this
  testRandomMethod: async (things) => {
    const result = `Greetings data provider got testRandomMethod! ${things}`;
    logger.info(result);
    return result;
  },
};

exports.activate = async () => {
  logger.info('Hello Someone is activating!');

  const greetingsDataProviderInfoPromise = papi.dataProvider.registerEngine(
    'hello-someone.greetings',
    greetingsDataProviderEngine,
  );

  papi.webViews.addWebView({
    contentType: 'html',
    contents: `<html>
      <head>
      </head>
      <body>
        <div>Hello Someone!!</div>
        <div><input id="greetings-input" value="Bill" /><button id="greetings-button" type="button">Greet</button></div>
        <div id="greetings-button-output"></div>
        <div><input id="set-greetings-input" value="Hey, my name is Bill. I got set by the webview!" /><button id="set-greetings-button" type="button">Set Greeting</button></div>
        <div id="all-greetings"></div>
        <div id="any-greetings-update-count">Any Greetings Updates: 0</div>
        <div id="bill-any-greetings-update-count">Any Greetings Updates (via Bill): 0</div>
        <div id="bill-greetings-update-count">Bill Greetings Updates: 0</div>
        <script>
          // Enable webview debugging
          console.debug('Debug Hello Someone WebView');

          function print(input) {
            papi.logger.log(input);
          }

          const dataProviderInfoPromise = papi.dataProvider.get('hello-someone.greetings');

          async function setupWebView() {
            const { dataProvider: greetingsDataProvider } = await dataProviderInfoPromise;

            // Attach handler for greetings-button
            const greetingsButton = document.getElementById("greetings-button");
            greetingsButton.addEventListener("click", async () => {
              const greetingsInput = document.getElementById('greetings-input');
              const greeting = await greetingsDataProvider.get(greetingsInput.value.toLowerCase());
              const helloSomeoneOutput = document.getElementById("greetings-button-output");
              helloSomeoneOutput.innerHTML = greeting;
              print(greeting);
            });
            greetingsButton.addEventListener("contextmenu", async (e) => {
              e.preventDefault();
              const greetingsInput = document.getElementById('greetings-input');
              const name = greetingsInput.value.toLowerCase();
              const promises = new Array(10000);
              for (let i = 0; i < 10000; i += 1)
                promises[i] = greetingsDataProvider.get(name);
              await Promise.all(promises);
              print('Done');
            });

            // Attach handler for set-greetings-button
            const setGreetingsButton = document.getElementById("set-greetings-button");
            setGreetingsButton.addEventListener("click", async () => {
              const greetingsInput = document.getElementById('greetings-input');
              const name = greetingsInput.value;
              const setGreetingsInput = document.getElementById('set-greetings-input');
              const success = await greetingsDataProvider.set(name.toLowerCase(), setGreetingsInput.value);
              const helloSomeoneOutput = document.getElementById("greetings-button-output");
              helloSomeoneOutput.innerHTML = \`\${success ? 'Successfully' : 'Unsuccessfully'} set \${name}'s greeting!\`;
            });

            // Update the 'all greetings' display on load and on greetings updates
            greetingsDataProvider.subscribe('*', (greetings) => {
              const allGreetings = document.getElementById("all-greetings");
              const greetingsString = JSON.stringify(greetings, null, 2);
              allGreetings.innerHTML = greetingsString;
              print(greetingsString);
            });

            // Update the greetings count on any greeting update
            let anyGreetingsUpdateCount = 0;
            greetingsDataProvider.subscribe('*', () => {
              anyGreetingsUpdateCount += 1;
              const anyGreetingsUpdateCountDiv = document.getElementById("any-greetings-update-count");
              anyGreetingsUpdateCountDiv.innerHTML = \`Any Greetings Updates: \${anyGreetingsUpdateCount}\`;
            }, { retrieveDataImmediately: false });

            // Update the greetings count on greetings updates
            let billAnyGreetingsUpdateCount = 0;
            greetingsDataProvider.subscribe('BiLl', () => {
              billAnyGreetingsUpdateCount += 1;
              const billAnyGreetingsUpdateCountDiv = document.getElementById("bill-any-greetings-update-count");
              billAnyGreetingsUpdateCountDiv.innerHTML = \`Any Greetings Updates (via Bill): \${billAnyGreetingsUpdateCount}\`;
            }, { retrieveDataImmediately: false, whichUpdates: 'all' });

            // Update the greetings count on greetings updates
            let billGreetingsUpdateCount = -1;
            greetingsDataProvider.subscribe('bIlL', () => {
              billGreetingsUpdateCount += 1;
              const billGreetingsUpdateCountDiv = document.getElementById("bill-greetings-update-count");
              billGreetingsUpdateCountDiv.innerHTML = \`Bill Greetings Updates: \${billGreetingsUpdateCount}\`;
            });
          }

          if (document.readyState === 'loading')
            document.addEventListener("DOMContentLoaded", setupWebView);
          else setupWebView();

          //# sourceURL=hello-someone-webview.js
        </script>
      </body>
    </html>`,
  });

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

  // For now, let's just make things easy and await the data provider promise at the end so we don't hold everything else up
  const greetingsDataProviderInfo = await greetingsDataProviderInfoPromise;

  return Promise.all(unsubPromises.map((unsubPromise) => unsubPromise.promise)).then(() => {
    logger.log('Hello Someone is finished activating!');
    return papi.util.aggregateUnsubscriberAsyncs(
      unsubPromises
        .map((unsubPromise) => unsubPromise.unsubscriber)
        .concat([greetingsDataProviderInfo.dispose]),
    );
  });
};

exports.deactivate = async () => {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
};
