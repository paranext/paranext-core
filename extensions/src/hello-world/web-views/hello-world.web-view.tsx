import { ScrVers, VerseRef } from '@sillsdev/scripture';
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
  ScriptureReference,
} from 'papi-components';
import type { QuickVerseDataTypes } from 'quick-verse';
import type { PeopleDataProvider, PeopleDataTypes } from 'hello-someone';
import type { UsfmProviderDataTypes } from 'usfm-data-provider';
import { Key, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { HelloWorldEvent } from 'hello-world';
import type { DialogTypes } from 'renderer/components/dialogs/dialog-definition.model';
import type { WebViewProps } from 'shared/data/web-view.model';
import { ProjectDataTypes } from 'papi-shared-types';
import Clock from './components/clock.component';

type Row = {
  id: string;
  title: string;
  subtitle: string;
};

const {
  react: {
    context: { TestContext },
    hooks: {
      useData,
      useDataProvider,
      useProjectData,
      usePromise,
      useEvent,
      useSetting,
      useDialogCallback,
    },
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

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

// Test fetching
papi
  .fetch('https://www.example.com', { mode: 'no-cors' })
  .catch((e) => logger.error(`Could not get data from example.com! Reason: ${e}`));

globalThis.webViewComponent = function HelloWorld({
  useWebViewState,
  getWebViewDefinitionUpdatableProperties,
  updateWebViewDefinition,
}: WebViewProps) {
  const test = useContext(TestContext) || "Context didn't work!! :(";

  const [clicks, setClicks] = useWebViewState<number>('clicks', 0);
  const [rows, setRows] = useState(initializeRows());
  const [selectedRows, setSelectedRows] = useState(new Set<Key>());
  const [scrRef, setScrRef] = useSetting('platform.verseRef', defaultScrRef);
  const verseRef = useMemo(
    () => new VerseRef(scrRef.bookNum, scrRef.chapterNum, scrRef.verseNum),
    [scrRef],
  );

  // Update the clicks when we are informed helloWorld has been run
  useEvent(
    'helloWorld.onHelloWorld',
    useCallback(
      ({ times }: HelloWorldEvent) => {
        if (times > clicks) setClicks(times);
      },
      [clicks, setClicks],
    ),
  );

  useEffect(() => {
    logger.log(
      `Hello World WebView previous title: ${getWebViewDefinitionUpdatableProperties()?.title}`,
    );
    updateWebViewDefinition({ title: `Hello World ${clicks}` });
  }, [getWebViewDefinitionUpdatableProperties, updateWebViewDefinition, clicks]);

  const [echoResult] = usePromise(
    useCallback(async () => {
      // Not using the promise's resolved value
      // eslint-disable-next-line no-promise-executor-return
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
      return papi.commands.sendCommand('test.echoRenderer', `From ${NAME}`);
    }, []),
    'retrieving',
  );

  const [project, selectProject] = useDialogCallback(
    'platform.selectProject',
    useRef({
      prompt: 'Please select a project for Hello World WebView:',
      iconUrl: 'papi-extension://hello-world/assets/offline.svg',
      title: 'Select Hello World Project',
    }).current,
    // Assert as string type rather than string literal type.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    'None' as DialogTypes['platform.selectProject']['responseType'],
  );

  const [latestVerseText] = useData.Verse<QuickVerseDataTypes, 'Verse'>(
    'quickVerse.quickVerse',
    'latest',
    'Loading latest Scripture text...',
  );

  const [projects, selectProjects] = useDialogCallback(
    'platform.selectMultipleProjects',
    useRef({
      prompt: 'Please select one or more projects for Hello World WebView:',
      iconUrl: 'papi-extension://hello-world/assets/offline.svg',
      title: 'Select List of Hello World Projects',
    }).current,
    // Assert as string type rather than string literal type.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    ['None'] as DialogTypes['platform.selectMultipleProjects']['responseType'],
  );

  const [name, setName] = useState('Bill');

  const peopleDataProvider = useDataProvider<PeopleDataProvider>('helloSomeone.people');

  const [personGreeting] = useData.Greeting<PeopleDataTypes, 'Greeting'>(
    'helloSomeone.people',
    name,
    'Greeting loading',
  );

  const [personAge] = useData.Age<PeopleDataTypes, 'Age'>('helloSomeone.people', name, -1);

  const [psalm1] = useData.Chapter<UsfmProviderDataTypes, 'Chapter'>(
    'usfm',
    useMemo(() => new VerseRef('PSA', '1', '1', ScrVers.English), []),
    'Loading Psalm 1...',
  );

  const [john11] = useData.Verse<UsfmProviderDataTypes, 'Verse'>(
    'usfm',
    useMemo(() => new VerseRef('JHN 1:1'), []),
    'Loading John 1:1...',
  );

  const [webVerse] = useProjectData.VerseUSFM<ProjectDataTypes['ParatextStandard'], 'VerseUSFM'>(
    project,
    verseRef,
    'Loading WEB Verse',
  );

  return (
    <div>
      <div className="title">
        Hello World <span className="framework">React</span>
      </div>
      <div>
        <Button
          onClick={() => {
            papi.commands.sendCommand('helloWorld.helloWorld');
            setClicks(clicks + 1);
            papi
              .fetch('https://example.com', { mode: 'no-cors' })
              .catch((e) => logger.error(`Could not get data from example.com! Reason: ${e}`));
          }}
        >
          Hello World {clicks}
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
      <Clock />
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={() => peopleDataProvider?.deletePerson(name)}>Delete {name}</Button>
      </div>
      <div>{personGreeting}</div>
      <div>{personAge}</div>
      <div>Selected Project: {project}</div>
      <div>
        <Button onClick={selectProject}>Select Project</Button>
      </div>
      <h3>John 1:1</h3>
      <div>{john11}</div>
      <h3>Psalm 1</h3>
      <div>{psalm1}</div>
      <h3>{verseRef.toString()} WEB</h3>
      <div>{webVerse}</div>
      <h3>List of Selected Project Id(s):</h3>
      <div>{projects.join(', ')}</div>
      <div>
        <Button onClick={selectProjects}>Select Projects</Button>
      </div>
      <br />
      <div>
        <TextField label="Test Me" />
        <Checkbox labelText="Test Me" />
        <Switch /> {/* no label available */}
        <ComboBox title="Test Me" options={['option 1', 'option 2']} />
        <Slider /> {/* no label available */}
        <RefSelector scrRef={scrRef} handleSubmit={(newScrRef) => setScrRef(newScrRef)} />
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
