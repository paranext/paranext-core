import { ScrVers, VerseRef } from '@sillsdev/scripture';
import papi, { logger } from '@papi/frontend';
import {
  useData,
  useProjectData,
  useSetting,
  useDialogCallback,
  useDataProvider,
} from '@papi/frontend/react';
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
  usePromise,
  useEvent,
} from 'platform-bible-react';
import type { WebViewProps } from '@papi/core';
import { Key, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { HelloWorldEvent } from 'hello-world';
import { debounce } from 'platform-bible-utils';
import Clock from './components/clock.component';
import Logo from '../../assets/offline.svg';

type Row = {
  id: string;
  title: string;
  subtitle: string;
};

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
  title,
  projectId,
  projectIds,
  useWebViewState,
  updateWebViewDefinition,
}: WebViewProps) {
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
    papi.network.getNetworkEvent('helloWorld.onHelloWorld'),
    useCallback(
      ({ times }: HelloWorldEvent) => {
        if (times > clicks) setClicks(times);
      },
      [clicks, setClicks],
    ),
  );

  useEffect(() => {
    logger.debug(`Hello World WebView previous title: ${title}`);
    updateWebViewDefinition({ title: `Hello World ${clicks}` });
  }, [title, updateWebViewDefinition, clicks]);

  const currentRender = useRef(-1);
  currentRender.current += 1;

  const showProjectDialog = useDialogCallback(
    'platform.selectProject',
    // This is intentionally not a stable reference like `useMemo` or something because we are
    // testing below to make sure `useDialogCallback` returns the same callback every time
    {
      prompt: `Please select a Scripture project for Hello World WebView: (Render ${currentRender.current})`,
      iconUrl: 'papi-extension://helloWorld/assets/offline.svg',
      title: 'Select Hello World Project',
      maximumOpenDialogs: 2,
      // Test ref parameter properly getting latest value
      currentRender: currentRender.current,
      optionsSource: 'hook',
      includeProjectTypes: '^ParatextStandard$',
    },
    useCallback(
      (selectedProject, _dialogType, { currentRender: dialogRender, optionsSource }) => {
        if (selectedProject) updateWebViewDefinition({ projectId: selectedProject });

        logger.info(
          `Show project dialog resolved to ${selectedProject}. Dialog was shown at render ${dialogRender} with options from ${optionsSource}`,
        );
      },
      [updateWebViewDefinition],
    ),
  );

  const selectProject = useCallback(() => {
    showProjectDialog({
      // Testing having options provided in show dialog function overwrite options in hook
      optionsSource: 'showDialogCallback',
    });
  }, [showProjectDialog]);

  // Test to make sure useDialogCallback is properly returning the same callback every time even
  // though `options` parameter is not a stable reference
  useEffect(() => {
    if (currentRender.current > 0)
      logger.error(
        "showProjectDialog updated! This should not have happened. Maybe useDialogCallback's parameters are improperly being listed in dependency arrays",
      );
  }, [showProjectDialog]);

  const [latestVerseText] = useData('quickVerse.quickVerse').Verse(
    'latest',
    'Loading latest Scripture text...',
  );

  const selectProjects = useDialogCallback(
    'platform.selectMultipleProjects',
    useMemo(
      () => ({
        prompt: 'Please select one or more Scripture projects for Hello World WebView:',
        iconUrl: 'papi-extension://helloWorld/assets/offline.svg',
        title: 'Select List of Hello World Projects',
        selectedProjectIds: projectIds,
        includeProjectTypes: '^ParatextStandard$',
      }),
      [projectIds],
    ),
    useCallback(
      (selectedProjects) => {
        if (selectedProjects) updateWebViewDefinition({ projectIds: selectedProjects });
      },
      [updateWebViewDefinition],
    ),
  );

  const [name, setNameInternal] = useSetting('helloWorld.personName', 'Kathy');

  // Name used for display and editing in the input field while debouncing the actual setting change
  const [nameTemp, setNameTemp] = useState(name);

  useEffect(() => {
    setNameTemp(name);
  }, [name]);

  const debouncedSetName = useMemo(
    () =>
      debounce((newName) => {
        setNameInternal(newName);
      }, 300),
    [setNameInternal],
  );

  const setName = useCallback(
    (newName: string) => {
      setNameTemp(newName);
      debouncedSetName(newName);
    },
    [debouncedSetName],
  );

  const peopleDataProvider = useDataProvider('helloSomeone.people');

  const [personGreeting] = useData('helloSomeone.people').Greeting(name, 'Greeting loading');

  const [personAge] = useData('helloSomeone.people').Age(name, -1);

  const [psalm1] = useData('usfm').Chapter(
    useMemo(() => new VerseRef('PSA', '1', '1', ScrVers.English), []),
    'Loading Psalm 1...',
  );

  const [john11] = useData('usfm').Verse(
    useMemo(() => new VerseRef('JHN 1:1'), []),
    'Loading John 1:1...',
  );

  const [currentProjectVerse] = useProjectData(
    'ParatextStandard',
    projectId ?? undefined,
  ).VerseUSFM(verseRef, 'Loading Verse');

  const [localizedString] = usePromise(
    useCallback(() => {
      return papi.localization.getLocalizedString({
        localizeKey: '%submitButton%',
        locales: ['fr', 'en'],
      });
    }, []),
    'defaultValue',
  );

  return (
    <div>
      <div className="title">
        Hello World <span className="framework">React</span>
        {/**
         * Note: `Logo` here is inlined into this code as a `data:` url. This is here simply for
         * demonstration purposes. Inlining as a `data:` url is generally not recommended. Rather, it is
         * generally better to use `papi-extension:` to avoid unnecessary bloat
         */}
        <img width={16} height={16} src={`${Logo}`} alt="Hello World Logo" />
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
        <input value={nameTemp} onChange={(e) => setName(e.target.value)} />
        <Button onClick={() => peopleDataProvider?.deletePerson(name)}>Delete {name}</Button>
      </div>
      <div>{personGreeting}</div>
      <div>{personAge}</div>
      <h3>John 1:1</h3>
      <div>{john11}</div>
      <h3>Psalm 1</h3>
      <div>{psalm1}</div>
      <br />
      <div>Selected Project: {projectId ?? 'None'}</div>
      <div>
        <Button onClick={selectProject}>Select Project</Button>
      </div>
      <h3>{verseRef.toString()}</h3>
      <div>{currentProjectVerse}</div>
      <h3>List of Selected Project Id(s):</h3>
      <div>{(projectIds && projectIds.length > 0 ? projectIds : ['None']).join(', ')}</div>
      <div>
        <Button onClick={() => selectProjects()}>Select Projects</Button>
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
      <div>
        <h3>French localization of Submit Button:</h3>
        <div>{localizedString}</div>
      </div>
    </div>
  );
};
