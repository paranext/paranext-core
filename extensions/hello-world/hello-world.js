console.log('Hello World is importing!');

// eslint-disable-next-line import/no-unresolved
const papi = require('papi');

// This will be blocked
const fs = require('fs');

console.log(
  fs.message
    ? fs.message
    : `Successfully imported fs! fs.readFileSync = ${fs.readFileSync}`,
);

const unsubscribers = [];

/** Gets the code to make the Hello World React component. Provide a name to use to identify this component. Provide a string to modify the 'function HelloWorld()' line */
const getReactComponent = (name, functionModifier = '') =>
  `const { createElement, useCallback, useContext, useState } = React;
  const {
    react: {
      context: { TestContext },
      hooks: { usePromise },
      components: { PButton }
    }
  } = papi;

  ${functionModifier} function HelloWorld() {
    const test = useContext(TestContext) || 'Context didnt work!! :(';

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
              console.log('${name} PButton clicked!');
              setMyState(myStateCurrent => myStateCurrent + 1);
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
  console.log('Hello world is activating!');

  const unsubPromises = [
    papi.commands.registerCommand('hello-world.hello-world', () => {
      return 'Hello world!';
    }),
    papi.commands.registerCommand('hello-world.hello-exception', (message) => {
      throw new Error(`Hello World Exception! ${message}`);
    }),
  ];

  papi.webViews.addWebView({
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
            console.log(input);
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
          });
        </script>
      </body>
    </html>`,
  });

  papi.webViews.addWebView({
    hasReact: true,
    contents: getReactComponent('Hello World React Webview', 'export default'),
  });

  return Promise.all(
    unsubPromises.map((unsubPromise) => unsubPromise.promise),
  ).then(() => {
    console.log('Hello World is finished activating!');
    return papi.util.aggregateUnsubscriberAsyncs(
      unsubPromises.map((unsubPromise) => unsubPromise.unsubscriber),
    );
  });
};

exports.deactivate = async () => {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
};
