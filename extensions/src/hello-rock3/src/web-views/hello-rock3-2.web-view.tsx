import papi from '@papi/frontend';
import { useEvent, Button } from 'platform-bible-react';
import { useCallback, useState } from 'react';
import type { HelloRock3Event } from 'hello-rock3';
import { WebViewProps } from '@papi/core';

const randomInt = () => {
  return Math.floor(Math.random() * 100);
};

globalThis.webViewComponent = function HelloThirdRock2({ useWebViewState }: WebViewProps) {
  const [clicks, setClicks] = useState(0);
  const [defaultClicks, setDefaultClicks] = useState(randomInt());
  const [webViewStateClicks, setWebViewStateClicks, resetWebViewStateClicks] = useWebViewState(
    'webViewStateClicks',
    defaultClicks,
  );

  // Update the clicks when we are informed helloRock3 has been run
  useEvent(
    papi.network.getNetworkEvent('helloRock3.onHelloRock3'),
    useCallback(({ times }: HelloRock3Event) => setClicks(times), []),
  );

  return (
    <>
      <div className="title">
        Hello Third Rock <span className="framework">React 2</span>
      </div>
      <div>
        <Button
          onClick={() => {
            papi.commands.sendCommand('helloRock3.helloRock3');
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
