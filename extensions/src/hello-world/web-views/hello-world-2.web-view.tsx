import papi from 'papi-frontend';
import { useState } from 'react';
import { Button } from 'papi-components';

globalThis.webViewComponent = function HelloWorld2() {
  const [clicks, setClicks] = useState(0);

  return (
    <>
      <div className="title">
        Hello World <span className="framework">React 2</span>
      </div>
      <div>
        <Button
          onClick={async () => {
            await papi.commands.sendCommand('helloWorld.helloWorld');
            setClicks(clicks + 1);
          }}
        >
          Hello World {clicks}
        </Button>
      </div>
    </>
  );
};
