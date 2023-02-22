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
        <script>
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
              for (let i = 0; i < 10000; i += 1)
                papi.commands.sendCommand('echoRenderer', 'From Hello World WebView').then(print);
            });
          });
        </script>
      </body>
    </html>`,
  });

  papi.webViews.addWebView({
    hasReact: true,
    contents: `
    export default function HelloWorld() {
      const test = React.useContext(papi.react.context.TestContext);
      const [echoResult] = papi.react.hooks.usePromise(
        React.useCallback(async () => {
          await new Promise((resolve) => setTimeout(() => resolve(), 5000));
          return papi.commands.sendCommand('echoRenderer', 'From Hello World React WebView');
        }, []),
        'retrieving',
      );
      return React.createElement('div', null,
        React.createElement('div', null,
          React.createElement(papi.react.components.PButton, { onClick: () => {console.log('Hello World PButton clicked!')}}, 'Hello World PButton ')
        ),
        React.createElement('div', null,
          test
        ),
        React.createElement('div', null,
          echoResult
        )
      );
    }
  `,
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
