import papi from '@papi/frontend';
import { useEvent, Button } from 'platform-bible-react';
import { useCallback, useState } from 'react';
import type { HelloWorldEvent } from 'hello-world';
import { WebViewProps } from '@papi/core';

globalThis.webViewComponent = function HelloWorld2({ useWebViewState }: WebViewProps) {
  const [clicks, setClicks] = useState(0);
  const [clicks2, setClicks2, resetClicks2] = useWebViewState('newClicks', 0);

  // Update the clicks when we are informed helloWorld has been run
  useEvent(
    papi.network.getNetworkEvent('helloWorld.onHelloWorld'),
    useCallback(({ times }: HelloWorldEvent) => setClicks(times), [setClicks]),
  );

  return (
    <>
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
          Hello World {clicks}
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            setClicks2(clicks2 + 1);
          }}
        >
          Hello World {clicks2}
        </Button>
        <Button onClick={() => resetClicks2()}>Reset counter</Button>
      </div>
    </>
  );
};
