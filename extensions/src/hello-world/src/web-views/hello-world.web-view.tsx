import { VerseRef } from '@sillsdev/scripture';
import papi, { logger } from '@papi/frontend';
import {
  useData,
  useProjectData,
  useSetting,
  useDialogCallback,
  useDataProvider,
  useLocalizedStrings,
  useWebViewController,
} from '@papi/frontend/react';
import {
  BookChapterControl,
  Button,
  Checkbox,
  ComboBox,
  Input,
  Slider,
  Switch,
  TextField,
  useEvent,
} from 'platform-bible-react';
import type { WebViewProps } from '@papi/core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { HelloWorldEvent } from 'hello-world';
import { debounce, isPlatformError } from 'platform-bible-utils';
import Clock from './components/clock.component';
import Logo from '../../assets/offline.svg';
import ProjectSettingsEditor from './hello-world-project/project-settings-editor.component';
import useHelloWorldProjectSettings from './hello-world-project/use-hello-world-project-settings.hook';

const NAME = 'Hello World React WebView';

// Test fetching
papi
  .fetch('https://www.example.com', { mode: 'no-cors' })
  .catch((e) => logger.error(`Could not get data from example.com! Reason: ${e}`));

globalThis.webViewComponent = function HelloWorld({
  title,
  projectId,
  useWebViewState,
  updateWebViewDefinition,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [clicks, setClicks] = useWebViewState<number>('clicks', 0);
  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();
  const verseRef = useMemo(
    () => new VerseRef(scrRef.bookNum, scrRef.chapterNum, scrRef.verseNum),
    [scrRef],
  );

  const deleteKey = '%helloWorld_delete%';
  const frenchLocalizationSubmit = '%helloWorld_frenchLocalizationSubmit%';
  const editorHeaderTextLabel = '%helloWorld_editor_header_text%';
  const editorBorderColorLabel = '%helloWorld_editor_border_color%';
  const greetingLoading = '%helloWorld_greetingLoading%';
  const helloWorld = '%helloWorld_helloWorld%';
  const listOfSelectedIds = '%helloWorld_listOfSelectedIds%';
  const logoKey = '%helloWorld_logo%';
  const noneKey = '%helloWorld_none%';
  const openResourceViewer = '%helloWorld_openResourceViewer%';
  const openScriptureEditor = '%helloWorld_openScriptureEditor%';
  const option1 = '%helloWorld_option1%';
  const option2 = '%helloWorld_option2%';
  const quickVerseLoadingLatest = '%helloWorld_loadingLatest%';
  const reactKey = '%helloWorld_react%';
  const scriptureLoadingVerse = '%helloWorld_loadingVerse%';
  const selectedProjectKey = '%helloWorld_selected_project%';
  const selectProjectKey = '%helloWorld_select_project%';
  const selectProjectPrompt = '%helloWorld_selectProject_prompt%';
  const selectProjectsKey = '%helloWorld_select_projects%';
  const selectProjectsPrompt = '%helloWorld_selectProjects_prompt%';
  const selectProjectsTitle = '%helloWorld_selectProjects_title%';
  const selectProjectTitle = '%helloWorld_selectProject_title%';
  const submit = '%general_button_submit%';
  const testException = '%helloWorld_throw_test_exception%';
  const testMe = '%helloWorld_testMe%';

  const [localizedStrings] = useLocalizedStrings(
    useMemo(
      () => [
        deleteKey,
        frenchLocalizationSubmit,
        editorHeaderTextLabel,
        editorBorderColorLabel,
        greetingLoading,
        helloWorld,
        listOfSelectedIds,
        logoKey,
        noneKey,
        openResourceViewer,
        openScriptureEditor,
        option1,
        option2,
        quickVerseLoadingLatest,
        reactKey,
        scriptureLoadingVerse,
        selectedProjectKey,
        selectProjectKey,
        selectProjectPrompt,
        selectProjectsKey,
        selectProjectsPrompt,
        selectProjectsTitle,
        selectProjectTitle,
        submit,
        testException,
        testMe,
      ],
      [],
    ),
    useMemo(() => ['fr', 'en'], []),
  );

  const localizedDelete = localizedStrings[deleteKey];
  const localizedFrenchLocalizationSubmit = localizedStrings[frenchLocalizationSubmit];
  const localizedEditorHeaderTextLabel = localizedStrings[editorHeaderTextLabel];
  const localizedEditorBorderColorLabel = localizedStrings[editorBorderColorLabel];
  const localizedGreetingLoading = localizedStrings[greetingLoading];
  const localizedHelloWorld = localizedStrings[helloWorld];
  const localizedListOfSelectedIds = localizedStrings[listOfSelectedIds];
  const localizedLogo = localizedStrings[logoKey];
  const localizedNone = localizedStrings[noneKey];
  const localizedOpenResourceViewer = localizedStrings[openResourceViewer];
  const localizedOpenScriptureEditor = localizedStrings[openScriptureEditor];
  const localizedOption1 = localizedStrings[option1];
  const localizedOption2 = localizedStrings[option2];
  const localizedQuickVerseLoadingLatest = localizedStrings[quickVerseLoadingLatest];
  const localizedReact = localizedStrings[reactKey];
  const localizedScriptureLoadingVerse = localizedStrings[scriptureLoadingVerse];
  const localizedSelectedProject = localizedStrings[selectedProjectKey];
  const localizedSelectProject = localizedStrings[selectProjectKey];
  const localizedSelectProjectPrompt = localizedStrings[selectProjectPrompt];
  const localizedSelectProjects = localizedStrings[selectProjectsKey];
  const localizedSelectProjectsPrompt = localizedStrings[selectProjectsPrompt];
  const localizedSelectProjectsTitle = localizedStrings[selectProjectsTitle];
  const localizedSelectProjectTitle = localizedStrings[selectProjectTitle];
  const localizedSubmit = localizedStrings[submit];
  const localizedTestException = localizedStrings[testException];
  const localizedTestMe = localizedStrings[testMe];

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
    updateWebViewDefinition({ title: `${localizedHelloWorld} ${clicks}` });
  }, [title, updateWebViewDefinition, localizedHelloWorld, clicks]);

  const currentRender = useRef(-1);
  currentRender.current += 1;

  const [excludePdpFactoryIdsInHome] = useSetting(
    'platformGetResources.excludePdpFactoryIdsInHome',
    useMemo(() => [], []),
  );

  const showProjectDialog = useDialogCallback(
    'platform.selectProject',
    // This is intentionally not a stable reference like `useMemo` or something because we are
    // testing below to make sure `useDialogCallback` returns the same callback every time
    {
      prompt: `${localizedSelectProjectPrompt} ${currentRender.current})`,
      iconUrl: 'papi-extension://helloWorld/assets/offline.svg',
      title: localizedSelectProjectTitle,
      maximumOpenDialogs: 2,
      // Test ref parameter properly getting latest value
      currentRender: currentRender.current,
      optionsSource: 'hook',
      includeProjectInterfaces: ['platformScripture.USFM_Verse'],
      excludePdpFactoryIds: excludePdpFactoryIdsInHome,
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
    localizedQuickVerseLoadingLatest,
  );

  const [projects, setProjects] = useWebViewState<string[]>('projects', []);

  const selectProjects = useDialogCallback(
    'platform.selectMultipleProjects',
    useMemo(
      () => ({
        prompt: localizedSelectProjectsPrompt,
        iconUrl: 'papi-extension://helloWorld/assets/offline.svg',
        title: localizedSelectProjectsTitle,
        selectedProjectIds: projects,
        includeProjectInterfaces: ['platformScripture.USFM_Verse'],
      }),
      [localizedSelectProjectsPrompt, localizedSelectProjectsTitle, projects],
    ),
    useCallback(
      (selectedProjects) => {
        if (selectedProjects) setProjects(selectedProjects);
      },
      [setProjects],
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

  const [personGreeting] = useData('helloSomeone.people').Greeting(name, localizedGreetingLoading);

  const [personAge] = useData('helloSomeone.people').Age(name, -1);

  const [currentProjectVerse] = useProjectData(
    'platformScripture.USFM_Verse',
    projectId ?? undefined,
  ).VerseUSFM(verseRef, localizedScriptureLoadingVerse);

  const helloWorldProjectSettings = useHelloWorldProjectSettings(projectId);
  const { headerStyle } = helloWorldProjectSettings;

  // #region testing Scripture editor decorations

  // WebViewId for editor web view we opened for editing decorations
  const [projectWebViewId, setProjectWebViewId] = useWebViewState<string | undefined>(
    'projectWebViewId',
    undefined,
  );

  const [editorHeaderText, setEditorHeaderText] = useWebViewState(
    'editorHeaderText',
    'Hello World!',
  );
  const [editorBorderColor, setEditorBorderColor] = useWebViewState('editorBorderColor', '#000000');

  const editorWebViewController = useWebViewController(
    'platformScriptureEditor.react',
    projectWebViewId,
  );

  const editorDecorations = useMemo(
    () => ({
      containers: {
        'hello-world-container': {
          style: {
            borderColor: editorBorderColor,
            borderWidth: 4,
          },
        },
      },
      headers: editorHeaderText
        ? {
            'hello-world-header': {
              descriptionMd: editorHeaderText,
            },
          }
        : undefined,
    }),
    [editorHeaderText, editorBorderColor],
  );

  useEffect(() => {
    editorWebViewController?.updateDecorations(
      editorDecorations,
      // Delete the header if there isn't any text
      editorHeaderText ? undefined : ['hello-world-header'],
    );
  }, [editorWebViewController, editorDecorations, editorHeaderText]);

  // #endregion

  const genericComboBoxOptions = useMemo(
    () => [localizedOption1, localizedOption2],
    [localizedOption1, localizedOption2],
  );

  return (
    <div>
      <div className="title">
        {localizedHelloWorld} <span className="framework">{localizedReact}</span>
        {/**
         * Note: `Logo` here is inlined into this code as a `data:` url. This is here simply for
         * demonstration purposes. Inlining as a `data:` url is generally not recommended. Rather, it is
         * generally better to use `papi-extension:` to avoid unnecessary bloat
         */}
        <img width={16} height={16} src={`${Logo}`} alt={localizedLogo} />
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
          {localizedHelloWorld} {clicks}
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            throw new Error(`${NAME} test exception!`);
          }}
        >
          {localizedTestException}
        </Button>
      </div>
      <div>{isPlatformError(latestVerseText) ? latestVerseText.message : latestVerseText}</div>
      <Clock />
      <div>
        <input value={nameTemp} onChange={(e) => setName(e.target.value)} />
        <Button onClick={() => peopleDataProvider?.deletePerson(name)}>
          {localizedDelete} {name}
        </Button>
      </div>
      <div>{isPlatformError(personGreeting) ? personGreeting.message : personGreeting}</div>
      <div>{isPlatformError(personAge) ? personAge.message : personAge}</div>
      <br />
      <div>
        {localizedSelectedProject}: {projectId ?? localizedNone}
      </div>
      <div>
        <Button onClick={selectProject}>{localizedSelectProject}</Button>
      </div>
      <div>
        <Button
          onClick={async () => {
            setProjectWebViewId(
              await papi.commands.sendCommand(
                'platformScriptureEditor.openScriptureEditor',
                projectId,
                {
                  decorations: editorDecorations,
                },
              ),
            );
          }}
        >
          {localizedOpenScriptureEditor}
        </Button>
        <Button
          onClick={async () => {
            setProjectWebViewId(
              await papi.commands.sendCommand(
                'platformScriptureEditor.openResourceViewer',
                projectId,
                {
                  decorations: editorDecorations,
                },
              ),
            );
          }}
        >
          {localizedOpenResourceViewer}
        </Button>
      </div>
      <div>
        <div className="tw-flex tw-align-middle tw-gap-2">
          <span>{localizedEditorHeaderTextLabel}</span>
          <Input
            disabled={!editorWebViewController}
            value={editorHeaderText}
            onChange={(event) => setEditorHeaderText(event.target.value)}
          />
        </div>
        <div className="tw-flex tw-align-middle tw-gap-2">
          <span>{localizedEditorBorderColorLabel}</span>
          <Input
            disabled={!editorWebViewController}
            type="color"
            value={editorBorderColor}
            onChange={(event) => setEditorBorderColor(event.target.value)}
          />
        </div>
      </div>
      <h3 style={headerStyle}>{verseRef.toString()}</h3>
      <div>{currentProjectVerse}</div>
      <ProjectSettingsEditor {...helloWorldProjectSettings} />
      <h3>{localizedListOfSelectedIds}:</h3>
      <div>{(projects.length > 0 ? projects : [{ localizedNone }]).join(', ')}</div>
      <div>
        <Button onClick={() => selectProjects()}>{localizedSelectProjects}</Button>
      </div>
      <br />
      <div>
        <TextField label={localizedTestMe} />
        <Checkbox /> {/* no label available */}
        <Switch /> {/* no label available */}
        <ComboBox buttonPlaceholder={localizedTestMe} options={genericComboBoxOptions} />
        <Slider /> {/* no label available */}
        <BookChapterControl scrRef={scrRef} handleSubmit={(newScrRef) => setScrRef(newScrRef)} />
      </div>
      <div>
        <h3>{localizedFrenchLocalizationSubmit}:</h3>
        <div>{localizedSubmit}</div>
      </div>
    </div>
  );
};
