import papi from '@papi/frontend';
import { useEvent, Button } from 'platform-bible-react';
import { useCallback, useState } from 'react';
import type { HelloRock3Event } from 'hello-rock3';
import { WebViewProps } from '@papi/core';

const randomInt = () => {
  return Math.floor(Math.random() * 100);
};

globalThis.webViewComponent = function HelloThirdRock2({
  useWebViewState,
  updateWebViewDefinition,
  state,
}: WebViewProps) {
  const [clicks, setClicks] = useState(0);
  const [defaultClicks, setDefaultClicks] = useState(randomInt());
  const [webViewStateClicks, setWebViewStateClicks, resetWebViewStateClicks] = useWebViewState(
    'webViewStateClicks',
    defaultClicks,
  );

  /** Bump webViewStateClicks using updateWebViewDefinition */
  const increaseWebViewStateClicksAlternative = useCallback(() => {
    // We know this is this type; TS just doesn't know WebView state types yet
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const currentClicks = (state?.webViewStateClicks as number | undefined) ?? webViewStateClicks;
    updateWebViewDefinition({ state: { ...state, webViewStateClicks: currentClicks + 1 } });
  }, [state, updateWebViewDefinition, webViewStateClicks]);

  /** Reset webViewStateClicks using updateWebViewDefinition */
  const resetWebViewStateClicksAlternative = useCallback(() => {
    const updatedState = { ...state };
    delete updatedState.webViewStateClicks;
    updateWebViewDefinition({ state: updatedState });
  }, [state, updateWebViewDefinition]);

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
      <hr />
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
      <div>use-Web-View-State Clicks: {webViewStateClicks}</div>
      <div>
        <Button
          onClick={() => {
            setWebViewStateClicks(webViewStateClicks + 1);
          }}
        >
          Increase with useWebViewState
        </Button>
        <Button
          onClick={() => {
            increaseWebViewStateClicksAlternative();
          }}
        >
          Increase with updateWebViewDefinition
        </Button>
      </div>
      <div>
        <Button onClick={() => resetWebViewStateClicks()}>
          Reset clicks counter with useWebViewState
        </Button>
        <Button onClick={() => resetWebViewStateClicksAlternative()}>
          Reset clicks counter with updateWebViewDefinition
        </Button>
      </div>
      <div>
        <Button onClick={() => setDefaultClicks(randomInt())}>
          Randomize default value: {defaultClicks}
        </Button>
      </div>
    </>
  );
};
