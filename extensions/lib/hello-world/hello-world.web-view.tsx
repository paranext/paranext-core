import papi from 'papi-frontend';
import {
  Button,
  Checkbox,
  ComboBox,
  RefSelector,
  Slider,
  Switch,
  TextField,
  Table,
} from 'papi-components';
import { QuickVerseDataTypes } from '@extensions/quick-verse/quick-verse';
import { PeopleDataProvider, PeopleDataTypes } from '@extensions/hello-someone/hello-someone';
import type { UsfmProviderDataTypes } from '@extensions/external-usfm-data-provider';
import type { DataProviderDataType } from 'shared/models/data-provider.model';
import { Key, useCallback, useContext, useMemo, useState } from 'react';

type Row = {
  id: string;
  title: string;
  subtitle: string;
};

const {
  react: {
    context: { TestContext },
    hooks: { useData, useDataProvider, usePromise },
  },
  logger,
} = papi;

const NAME = 'Hello World React WebView';

const initializeRows = (): Row[] => {
  return [
    { id: '0', title: 'Norem ipsum dolor sit amet', subtitle: 'Subtitle1' },
    { id: '1', title: 'Consectetur adipiscing elit', subtitle: 'Subtitle2' },
    { id: '2', title: 'Pellentesque suscipit tortor est', subtitle: 'Subtitle3' },
    { id: '3', title: 'Ut egestas massa aliquam a', subtitle: 'Subtitle4' },
    { id: '4', title: 'Nulla egestas vestibulum felis a venenatis', subtitle: 'Subtitle5' },
    { id: '5', title: 'Sed aliquet pulvinar neque', subtitle: 'Subtitle6' },
  ];
};

// Test fetching
papi
  .fetch('https://bible-api.com/matthew+24:14')
  .then((res) => res.json())
  .then((scr) => logger.info(scr.text.replace(/\\n/g, '')))
  .catch((e) => logger.error(`Could not get Scripture from bible-api! Reason: ${e}`));

globalThis.webViewComponent = function HelloWorld() {
  const test = useContext(TestContext) || "Context didn't work!! :(";

  const [myState, setMyState] = useState(0);
  const [rows, setRows] = useState(initializeRows());
  const [selectedRows, setSelectedRows] = useState(new Set<Key>());

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

  const [psalm1] = useData.Chapter<UsfmProviderDataTypes, 'Chapter'>(
    'usfm',
    useMemo(() => ({ book: 'PSA', chapter: '1', verse: '1', versification: 'English' }), []),
    'Loading Psalm 1...',
  );

  const [john11] = useData.Verse<UsfmProviderDataTypes, 'Verse'>(
    'usfm',
    useMemo(() => ({ verseString: 'JHN 1:1' }), []),
    'Loading John 1:1...',
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
      <h3>John 1:1</h3>
      <div>{john11}</div>
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
        <Table<Row>
          columns={[
            {
              key: 'id',
              name: 'ID',
            },
            {
              key: 'title',
              name: 'Title',
              editable: true,
            },
            {
              key: 'subtitle',
              name: 'Subtitle',
              editable: true,
            },
          ]}
          rows={rows}
          rowKeyGetter={(row: Row) => {
            return row.id;
          }}
          selectedRows={selectedRows}
          onSelectedRowsChange={(currentlySelectedRows: Set<Key>) =>
            setSelectedRows(currentlySelectedRows)
          }
          onRowsChange={(changedRows: Row[]) => setRows(changedRows)}
          enableSelectColumn
          selectColumnWidth={60}
          rowHeight={60}
          headerRowHeight={50}
        />
      </div>
    </div>
  );
};
