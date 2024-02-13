import papi from '@papi/frontend';
import { useEvent, Button } from 'platform-bible-react';
import { indexOf } from 'platform-bible-utils';
import { useCallback, useState } from 'react';
import type { HelloWorldEvent } from 'hello-world';
import { WebViewProps } from '@papi/core';

const randomInt = () => {
  return Math.floor(Math.random() * 100);
};

globalThis.webViewComponent = function HelloWorld2({ useWebViewState }: WebViewProps) {
  const [clicks, setClicks] = useState(0);
  const [defaultClicks, setDefaultClicks] = useState(randomInt());
  const [webViewStateClicks, setWebViewStateClicks, resetWebViewStateClicks] = useWebViewState(
    'webViewStateClicks',
    defaultClicks,
  );

  // Update the clicks when we are informed helloWorld has been run
  useEvent(
    papi.network.getNetworkEvent('helloWorld.onHelloWorld'),
    useCallback(({ times }: HelloWorldEvent) => setClicks(times), []),
  );

  const someIndex = indexOf('SomeStringWithABunchOfWords', 'i', 15);

  return (
    <>
      <div>
        Index: {someIndex}
      </div>
      <div className="title">
        Hello World <span className="framework">React 2</span>
      </div>
      <div>
        <Button
          onClick={() => {
            papi.commands.sendCommand('helloWorld.helloWorld');
            setClicks(clicks + 1);
          }}
        >
          use-Event Clicks: {clicks}
        </Button>
      </div>
      <hr />
      <div>
        <Button
          onClick={() => {
            setWebViewStateClicks(webViewStateClicks + 1);
          }}
        >
          use-Web-View-State Clicks: {webViewStateClicks}
        </Button>
        <Button onClick={() => resetWebViewStateClicks()}>Reset clicks counter</Button>
        <Button onClick={() => setDefaultClicks(randomInt())}>
          Randomize default value: {defaultClicks}
        </Button>
      </div>
    </>
  );
};
