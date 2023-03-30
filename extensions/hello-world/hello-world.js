'use strict';

// eslint-disable-next-line import/no-unresolved
const papi = require('papi');

const { logger } = papi;

logger.log('Hello world is importing!');

const unsubscribers = [];

/** Gets the code to make the Hello World React component. Provide a name to use to identify this component. Provide a string to modify the 'function HelloWorld()' line */
const getReactComponent = (name, functionModifier = '') =>
  `const { createElement, useCallback, useContext, useState } = React;
  const {
    react: {
      context: { TestContext },
      hooks: { usePromise },
      components: { PButton }
    },
    logger
  } = papi;

  // Test fetching
  papi
    .fetch('https://bible-api.com/matthew+24:14')
    .then((res) => res.json())
    .then((scr) => logger.log(scr.text.replace(/\\n/g, '')))
    .catch((e) =>
      logger.error(\`Could not get Scripture from bible-api! Reason: \${e}\`),
    );

  ${functionModifier} function HelloWorld() {
    const test = useContext(TestContext) || "Context didn't work!! :(";

    const [myState, setMyState] = useState(0);

    const [echoResult] = usePromise(
      useCallback(async () => {
        await new Promise((resolve) => setTimeout(() => resolve(), 3000));
        return papi.commands.sendCommand('echoRenderer', 'From ${name}');
      }, []),
      'retrieving',
    );

    return createElement('div', null,
      createElement('div', null,
        createElement(
          PButton,
          {
            onClick: () => {
              logger.log('${name} PButton clicked!');
              setMyState(myStateCurrent => myStateCurrent + 1);
              papi.fetch('https://bible-api.com/matthew+24:14')
    .then((res) => res.json())
    .then((scr) => logger.log('Got it! ' + scr.text.replace(/\\n/g, '')))
    .catch((e) =>
      logger.error(\`Could not get Scripture from bible-api! Reason: \${e}\`),
    );
            }
          },
          'Hello World PButton ',
          myState
        )
      ),
      createElement('div', null,
        test
      ),
      createElement('div', null,
        echoResult
      ),
      createElement('div', null,
          createElement(
            PButton,
            {
              onClick: () => {
                throw new Error('${name} test exception!');
              }
            },
            'Throw test exception'
          )
      )
    );
  }`;

exports.activate = async () => {
  logger.log('Hello world is activating!');

  const unsubPromises = [
    papi.commands.registerCommand('hello-world.hello-world', () => {
      return 'Hello world!';
    }),
    papi.commands.registerCommand('hello-world.hello-exception', (message) => {
      throw new Error(`Hello World Exception! ${message}`);
    }),
  ];

  papi
    .fetch('https://bible-api.com/matthew+24:14')
    .then((res) => res.json())
    .then((scr) => logger.log(scr.text.replace(/\n/g, '')))
    .catch((e) =>
      logger.error(`Could not get Scripture from bible-api! Reason: ${e}`),
    );

  papi.webViews.addWebView({
    contentType: 'html',
    contents: `<html>
      <head>
      </head>
      <body>
        <div>Hello World!!</div>
        <div><button id="echo-renderer" type="button">Echo Renderer</button></div>
        <div id="echo-renderer-output"></div>
        <div><button id="hello-someone" type="button">Hello Someone</button></div>
        <div id="hello-someone-output"></div>
        <div id="root"></div>
        <script>
          // React component to render in the root
          ${getReactComponent('Hello World React HTML Webview')}

          function print(input) {
            papi.logger.log(input);
          }
          document.addEventListener("DOMContentLoaded", function () {
            // Attach handler for echo-renderer
            const echoRendererButton = document.getElementById("echo-renderer");
            echoRendererButton.addEventListener("click", () =>
              papi.commands.sendCommand('echoRenderer', 'From Hello World WebView').then((message) => {
                const echoRendererOutput = document.getElementById("echo-renderer-output");
                echoRendererOutput.innerHTML = message;
                print(message);
              })
            );
            echoRendererButton.addEventListener("contextmenu", (e) => {
              e.preventDefault();
              const promises = new Array(10000);
              for (let i = 0; i < 10000; i += 1)
                promises[i] = papi.commands.sendCommand('echoRenderer', 'From Hello World WebView');
              Promise.all(promises).then(() => print('Done'))
            });

            // Attach handler for hello-someone
            const helloSomeoneButton = document.getElementById("hello-someone");
            helloSomeoneButton.addEventListener("click", () =>
              papi.commands.sendCommand('hello-someone.hello-someone', "'Hello World WebView'").then((message) => {
                const helloSomeoneOutput = document.getElementById("hello-someone-output");
                helloSomeoneOutput.innerHTML = message;
                print(message);
              })
            );
            helloSomeoneButton.addEventListener("contextmenu", (e) => {
              e.preventDefault();
              const promises = new Array(10000);
              for (let i = 0; i < 10000; i += 1)
                promises[i] = papi.commands.sendCommand('hello-someone.hello-someone', "'Hello World WebView'");
              Promise.all(promises).then(() => print('Done'))
            });

            // Initialize React
            const container = document.getElementById('root');
            const root = createRoot(container);
            root.render(React.createElement(HelloWorld, null));

            // Test fetching
            papi
              .fetch('https://bible-api.com/matthew+24:14')
              .then((res) => res.json())
              .then((scr) => logger.log(scr.text.replace(/\\n/g, '')))
              .catch((e) =>
                logger.error(\`Could not get Scripture from bible-api! Reason: \${e}\`),
              );
          });
        </script>
      </body>
    </html>`,
  });

  await papi.webViews.addWebView({
    componentName: 'HelloWorld',
    contents: getReactComponent('Hello World React Webview'),
  });

  const { dataProvider: greetingsDataProvider } = await papi.dataProvider.get(
    'hello-someone.greetings',
  );

  // Test subscribing to a data provider
  const unsubGreetings = await greetingsDataProvider.subscribe(
    'Bill',
    (billGreeting) => logger.log(`Bill's greeting: ${billGreeting}`),
  );

  unsubPromises.push(unsubGreetings);

  return Promise.all(
    unsubPromises.map((unsubPromise) => unsubPromise.promise),
  ).then(() => {
    logger.log('Hello World is finished activating!');
    return papi.util.aggregateUnsubscriberAsyncs(
      unsubPromises.map((unsubPromise) => unsubPromise.unsubscriber),
    );
  });
};

exports.deactivate = async () => {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
};
