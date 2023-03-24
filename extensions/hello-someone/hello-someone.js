'use strict';

// eslint-disable-next-line import/no-unresolved
const papi = require('papi');

const { logger } = papi;

logger.log('Hello Someone is importing!');

const unsubscribers = [];

class GreetingsDataProvider {
  people = {
    bill: 'Hi, my name is Bill!',
    kathy: 'Hello. My name is Kathy.',
  };

  async set(selector, data) {
    // Don't change someone's greeting, you heathen!
    if (this.people[selector]) return false;

    this.people[selector] = data;
    return true;
  }

  async get(selector) {
    return this.people[selector];
  }

  // Placeholder - will implement and fix these warnings soon
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  async subscribe(selector, callback) {
    throw new Error(
      'Greetings Data Provider has not yet implemented subscribe!',
    );
  }
}

exports.activate = async () => {
  logger.log('Hello Someone is activating!');

  const greetingsDataProviderInfo = papi.dataProvider.register(
    'greetings',
    new GreetingsDataProvider(),
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
        <script>
          function print(input) {
            papi.logger.log(input);
          }

          const dataProviderInfoPromise = papi.dataProvider.get('greetings');

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
    greetingsDataProviderInfo.dispose,
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
