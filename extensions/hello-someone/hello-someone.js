'use strict';

// eslint-disable-next-line import/no-unresolved
const papi = require('papi');

const { logger } = papi;

logger.log('Hello Someone is importing!');

const unsubscribers = [];

class GreetingsDataProviderEngine {
  people = {
    bill: 'Hi, my name is Bill!',
    kathy: 'Hello. My name is Kathy.',
  };

  /**
   * @param {string} selector
   * @param {string} data
   */
  async set(selector, data) {
    // Don't change everyone's greeting, you heathen!
    if (selector === '*') return false;

    if (data !== this.people[selector.toLowerCase()]) {
      this.people[selector.toLowerCase()] = data;
      return true;
    }

    return false;
  }

  /**
   * @param {string} selector
   */
  async get(selector) {
    if (selector === '*') return this.people;
    return this.people[selector.toLowerCase()];
  }
}

exports.activate = async () => {
  logger.log('Hello Someone is activating!');

  const greetingsDataProviderInfo = papi.dataProvider.registerEngine(
    'hello-someone.greetings',
    new GreetingsDataProviderEngine(),
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
            greetingsButton.addEventListener("click", () => {
              const greetingsInput = document.getElementById('greetings-input');
              greetingsDataProvider.get(greetingsInput.value.toLowerCase()).then((message) => {
                const helloSomeoneOutput = document.getElementById("greetings-button-output");
                helloSomeoneOutput.innerHTML = message;
                print(message);
              })
            });
            greetingsButton.addEventListener("contextmenu", (e) => {
              e.preventDefault();
              const greetingsInput = document.getElementById('greetings-input');
              const name = greetingsInput.value.toLowerCase();
              const promises = new Array(10000);
              for (let i = 0; i < 10000; i += 1)
                promises[i] = greetingsDataProvider.get(name);
              Promise.all(promises).then(() => print('Done'))
            });

            // Attach handler for set-greetings-button
            const setGreetingsButton = document.getElementById("set-greetings-button");
            setGreetingsButton.addEventListener("click", () => {
              const greetingsInput = document.getElementById('greetings-input');
              const name = greetingsInput.value;
              const setGreetingsInput = document.getElementById('set-greetings-input');
              greetingsDataProvider.set(name.toLowerCase(), setGreetingsInput.value).then((success) => {
                const helloSomeoneOutput = document.getElementById("greetings-button-output");
                helloSomeoneOutput.innerHTML = \`\${success ? 'Successfully' : 'Unsuccessfully'} set \${name}'s greeting!\`;
              })
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
            }, { getDataImmediately: false });

            // Update the greetings count on greetings updates
            let billAnyGreetingsUpdateCount = 0;
            greetingsDataProvider.subscribe('BiLl', () => {
              billAnyGreetingsUpdateCount += 1;
              const billAnyGreetingsUpdateCountDiv = document.getElementById("bill-any-greetings-update-count");
              billAnyGreetingsUpdateCountDiv.innerHTML = \`Any Greetings Updates (via Bill): \${billAnyGreetingsUpdateCount}\`;
            }, { getDataImmediately: false, skipEqualUpdates: false });

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
        </script>
      </body>
    </html>`,
  });

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
      unsubPromises
        .map((unsubPromise) => unsubPromise.unsubscriber)
        .concat([greetingsDataProviderInfo.dispose]),
    );
  });
};

exports.deactivate = async () => {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
};
