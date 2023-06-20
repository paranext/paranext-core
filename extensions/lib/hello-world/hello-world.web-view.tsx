import papi from 'papi';
import {
  Button,
  Checkbox,
  ComboBox,
  RefSelector,
  Slider,
  Switch,
  TextField,
} from 'papi-components';
import { useCallback, useContext, useState } from 'react';
import { QuickVerseDataTypes } from '@extensions/quick-verse/quick-verse';
import { PeopleDataProvider, PeopleDataTypes } from '@extensions/hello-someone/hello-someone';
import type { DataProviderDataType } from 'shared/models/data-provider.model';

const {
  react: {
    context: { TestContext },
    hooks: { useData, useDataProvider, usePromise },
  },
  logger,
} = papi;

const NAME = 'Hello World React WebView';

// Test fetching
papi
  .fetch('https://bible-api.com/matthew+24:14')
  .then((res) => res.json())
  .then((scr) => logger.info(scr.text.replace(/\\n/g, '')))
  .catch((e) => logger.error(`Could not get Scripture from bible-api! Reason: ${e}`));

globalThis.webViewComponent = function HelloWorld() {
  const test = useContext(TestContext) || "Context didn't work!! :(";

  const [myState, setMyState] = useState(0);

  const [echoResult] = usePromise(
    useCallback(async () => {
      // Not using the promise's resolved value
      // eslint-disable-next-line no-promise-executor-return
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
      return papi.commands.sendCommand<[string], string>('echoRenderer', `From ${NAME}`);
    }, []),
    'retrieving',
  );

  const [latestVerseText] = useData.Verse<QuickVerseDataTypes, 'Verse'>(
    'quick-verse.quick-verse',
    'latest',
    'Loading latest Scripture text...',
  );

  type TimeDataType = {
    TimeData: DataProviderDataType<string, string | undefined, string>;
  };

  const [currentTime] = useData.Time<TimeDataType, 'TimeData'>(
    'current-time',
    '*',
    'Loading current time',
  );

  const [name, setName] = useState('Bill');

  const peopleDataProvider = useDataProvider<PeopleDataProvider>('hello-someone.people');

  const [personGreeting] = useData.Greeting<PeopleDataTypes, 'Greeting'>(
    'hello-someone.people',
    name,
    'Greeting loading',
  );

  const [personAge] = useData.Age<PeopleDataTypes, 'Age'>('hello-someone.people', name, -1);

  const [psalm1] = useData.Chapter<QuickVerseDataTypes, 'Chapter'>(
    'quick-verse.quick-verse',
    ['Psalm', 1],
    'Loading Psalm 1...',
  );

  return (
    <div>
      <div className="title">
        Hello World <span className="framework">React</span>
      </div>
      <div>
        <Button
          onClick={() => {
            logger.info(`${NAME} Button clicked!`);
            setMyState((myStateCurrent) => myStateCurrent + 1);
            papi
              .fetch('https://bible-api.com/matthew+24:14')
              .then((res) => res.json())
              .then((scr) => logger.info(`Got it! ${scr.text.replace(/\\n/g, '')}`))
              .catch((e) => logger.error(`Could not get Scripture from bible-api! Reason: ${e}`));
          }}
        >
          Hello World Button {myState}
        </Button>
      </div>
      <div>{test}</div>
      <div>{echoResult}</div>
      <div>
        <Button
          onClick={() => {
            throw new Error(`${NAME} test exception!`);
          }}
        >
          Throw test exception
        </Button>
      </div>
      <div>{latestVerseText}</div>
      <div>{currentTime}</div>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={() => peopleDataProvider?.deletePerson(name)}>Delete {name}</Button>
      </div>
      <div>{personGreeting}</div>
      <div>{personAge}</div>
      <h3>Psalm 1</h3>
      <div>{psalm1}</div>
      <br />
      <div>
        <TextField label="Test Me" />
        <Checkbox labelText="Test Me" />
        <Switch /> {/* no label available */}
        <ComboBox title="Test Me" options={['option 1', 'option 2']} />
        <Slider /> {/* no label available */}
        <RefSelector scrRef={{ book: 1, chapter: 1, verse: 1 }} handleSubmit={(): void => {}} />
      </div>
    </div>
  );
};
