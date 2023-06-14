import papi from 'papi';
import {
  Button,
  Checkbox,
  ComboBox,
  RefSelector,
  Slider,
  Switch,
  TextField,
  Table,
  TableTextEditor,
} from 'papi-components';
import { QuickVerseDataTypes } from '@extensions/quick-verse/quick-verse';
import { PeopleDataProvider, PeopleDataTypes } from '@extensions/hello-someone/hello-someone';
import { Key, useCallback, useContext, useState } from 'react';

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

  const initializeRows = () => {
    return [
      { id: '0', title: 'Norem ipsum dolor sit amet', subtitle: 'Subtitle1' },
      { id: '1', title: 'Consectetur adipiscing elit', subtitle: 'Subtitle2' },
      { id: '2', title: 'Pellentesque suscipit tortor est', subtitle: 'Subtitle3' },
      { id: '3', title: 'Ut egestas massa aliquam a', subtitle: 'Subtitle4' },
      { id: '4', title: 'Nulla egestas vestibulum felis a venenatis', subtitle: 'Subtitle5' },
      { id: '5', title: 'Sed aliquet pulvinar neque', subtitle: 'Subtitle6' },
    ];
  };

  const [myState, setMyState] = useState(0);
  const [rows, setRows] = useState(initializeRows());
  const [selRows, setSelRows] = useState(new Set<Key>());

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

  type Row = {
    id: string;
    title: string;
    subtitle: string;
  };

  const rowsChangeHandler = (changedRows: Row[]): void => {
    setRows(changedRows);
  };

  const selRowsChangeHandler = (selectedRows: Set<Key>): void => {
    setSelRows(selectedRows);
  };

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
        <Table<Row>
          columns={[
            {
              key: 'id',
              name: 'ID',
            },
            {
              key: 'title',
              name: 'Title',
              renderEditCell: TableTextEditor<Row>,
            },
            {
              key: 'subtitle',
              name: 'Subtitle',
              renderEditCell: TableTextEditor<Row>,
            },
          ]}
          rows={rows}
          rowKeyGetter={(row: Row) => {
            return row.id;
          }}
          selectedRows={selRows}
          onSelectedRowsChange={selRowsChangeHandler}
          onRowsChange={rowsChangeHandler}
          enableSelectColumn
        />
      </div>
    </div>
  );
};
