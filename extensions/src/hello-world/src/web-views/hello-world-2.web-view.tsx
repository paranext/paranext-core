import papi from '@papi/frontend';
import { useEvent } from '@papi/frontend/react';
import { useCallback, useState } from 'react';
import { Button } from 'platform-bible-react';
import type { HelloWorldEvent } from 'hello-world';

globalThis.webViewComponent = function HelloWorld2() {
  const [clicks, setClicks] = useState(0);

  // Update the clicks when we are informed helloWorld has been run
  useEvent(
    'helloWorld.onHelloWorld',
    useCallback(({ times }: HelloWorldEvent) => setClicks(times), []),
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
    </>
  );
};
