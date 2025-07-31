import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import {
  useData,
  useDataProvider,
  useDialogCallback,
  useLocalizedStrings,
  useProjectData,
  useSetting,
  useWebViewController,
} from '@papi/frontend/react';
import type { HelloRock3Event } from 'hello-rock3';
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
import { debounce, getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Logo from '../../assets/offline.svg';
import { Clock } from './components/clock.component';
import { ProjectSettingsEditor } from './hello-rock3-project/project-settings-editor.component';
import { useHelloRock3ProjectSettings } from './hello-rock3-project/use-hello-rock3-project-settings.hook';

const NAME = 'Hello Rock3 React WebView';

const defaultExcludePdpFactoryIds: string[] = [];

// Test fetching
papi
  .fetch('https://www.example.com', { mode: 'no-cors' })
  .catch((e) => logger.error(`Could not get data from example.com! Reason: ${e}`));

globalThis.webViewComponent = function HelloRock3({
  title,
  projectId,
  useWebViewState,
  updateWebViewDefinition,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [clicks, setClicks] = useWebViewState<number>('clicks', 0);
  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();

  const deleteKey = '%helloRock3_delete%';
  const frenchLocalizationSubmit = '%helloRock3_frenchLocalizationSubmit%';
  const editorHeaderTextLabel = '%helloRock3_editor_header_text%';
  const editorBorderColorLabel = '%helloRock3_editor_border_color%';
  const greetingLoading = '%helloRock3_greetingLoading%';
  const helloRock3 = '%helloRock3_helloRock3%';
  const listOfSelectedIds = '%helloRock3_listOfSelectedIds%';
  const logoKey = '%helloRock3_logo%';
  const noneKey = '%helloRock3_none%';
  const openResourceViewer = '%helloRock3_openResourceViewer%';
  const openScriptureEditor = '%helloRock3_openScriptureEditor%';
  const option1 = '%helloRock3_option1%';
  const option2 = '%helloRock3_option2%';
  const quickVerseLoadingLatest = '%helloRock3_loadingLatest%';
  const reactKey = '%helloRock3_react%';
  const scriptureLoadingVerse = '%helloRock3_loadingVerse%';
  const selectedProjectKey = '%helloRock3_selected_project%';
  const selectProjectKey = '%helloRock3_select_project%';
  const selectProjectPrompt = '%helloRock3_selectProject_prompt%';
  const selectProjectsKey = '%helloRock3_select_projects%';
  const selectProjectsPrompt = '%helloRock3_selectProjects_prompt%';
  const selectProjectsTitle = '%helloRock3_selectProjects_title%';
  const selectProjectTitle = '%helloRock3_selectProject_title%';
  const submit = '%general_button_submit%';
  const testDeprecatedString = '%test_deprecated_string%';
  const testException = '%helloRock3_throw_test_exception%';
  const testMe = '%helloRock3_testMe%';

  const [localizedStrings] = useLocalizedStrings(
    useMemo(
      () => [
        deleteKey,
        frenchLocalizationSubmit,
        editorHeaderTextLabel,
        editorBorderColorLabel,
        greetingLoading,
        helloRock3,
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
        testDeprecatedString,
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
  const localizedHelloRock3 = localizedStrings[helloRock3];
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
  const localizedTestDeprecatedString = localizedStrings[testDeprecatedString];
  const localizedTestException = localizedStrings[testException];
  const localizedTestMe = localizedStrings[testMe];

  // Update the clicks when we are informed helloRock3 has been run
  useEvent(
    papi.network.getNetworkEvent('helloRock3.onHelloRock3'),
    useCallback(
      ({ times }: HelloRock3Event) => {
        if (times > clicks) setClicks(times);
      },
      [clicks, setClicks],
    ),
  );

  useEffect(() => {
    logger.debug(`Hello Rock3 WebView previous title: ${title}`);
    updateWebViewDefinition({ title: `${localizedHelloRock3} ${clicks}` });
  }, [title, updateWebViewDefinition, localizedHelloRock3, clicks]);

  const currentRender = useRef(-1);
  currentRender.current += 1;

  const [excludePdpFactoryIdsPossiblyError] = useSetting(
    'platformGetResources.excludePdpFactoryIdsInHome',
    defaultExcludePdpFactoryIds,
  );

  const excludePdpFactoryIds = useMemo(() => {
    if (isPlatformError(excludePdpFactoryIdsPossiblyError)) {
      logger.warn(
        'Failed to load setting: platformGetResources.excludePdpFactoryIdsInHome',
        excludePdpFactoryIdsPossiblyError,
      );
      return defaultExcludePdpFactoryIds;
    }
    return excludePdpFactoryIdsPossiblyError;
  }, [excludePdpFactoryIdsPossiblyError]);

  const showProjectDialog = useDialogCallback(
    'platform.selectProject',
    // This is intentionally not a stable reference like `useMemo` or something because we are
    // testing below to make sure `useDialogCallback` returns the same callback every time
    {
      prompt: `${localizedSelectProjectPrompt} ${currentRender.current})`,
      iconUrl: 'papi-extension://helloRock3/assets/offline.svg',
      title: localizedSelectProjectTitle,
      maximumOpenDialogs: 2,
      // Test ref parameter properly getting latest value
      currentRender: currentRender.current,
      optionsSource: 'hook',
      includeProjectInterfaces: ['platformScripture.USFM_Verse'],
      excludePdpFactoryIds,
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
        iconUrl: 'papi-extension://helloRock3/assets/offline.svg',
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

  const [namePossiblyError, setNameInternal] = useSetting('helloRock3.personName', 'Kathy');

  const name = useMemo(() => {
    if (isPlatformError(namePossiblyError)) {
      return '';
    }
    return namePossiblyError;
  }, [namePossiblyError]);

  const nameIsError = isPlatformError(name);

  // Name used for display and editing in the input field while debouncing the actual setting change.
  // Code should never try to use nameTemp for anything if nameIsError, but I'm setting the value to
  // "ERR" just so it'll be more obvious if we do use it.
  const [nameTemp, setNameTemp] = useState(!nameIsError ? name : 'ERR');

  useEffect(() => {
    if (!nameIsError) setNameTemp(name);
  }, [name, nameIsError]);

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

  const [personGreeting] = useData<'helloSomeone.people'>(
    nameIsError ? undefined : 'helloSomeone.people',
  ).Greeting(name, localizedGreetingLoading);
  const [personAge] = useData<'helloSomeone.people'>(
    nameIsError ? undefined : 'helloSomeone.people',
  ).Age(name, -1);

  const [currentProjectVersePossiblyError] = useProjectData(
    'platformScripture.USFM_Verse',
    projectId ?? undefined,
  ).VerseUSFM(scrRef, localizedScriptureLoadingVerse);

  const currentProjectVerse = useMemo(() => {
    if (isPlatformError(currentProjectVersePossiblyError)) {
      return getErrorMessage(currentProjectVersePossiblyError);
    }
    return currentProjectVersePossiblyError;
  }, [currentProjectVersePossiblyError]);

  const helloRock3ProjectSettings = useHelloRock3ProjectSettings(projectId);
  const { headerStyle } = helloRock3ProjectSettings;

  // #region testing Scripture editor decorations

  // WebViewId for editor web view we opened for editing decorations
  const [projectWebViewId, setProjectWebViewId] = useWebViewState<string | undefined>(
    'projectWebViewId',
    undefined,
  );

  const [editorHeaderText, setEditorHeaderText] = useWebViewState(
    'editorHeaderText',
    'Hello Third Rock!',
  );
  const [editorBorderColor, setEditorBorderColor] = useWebViewState('editorBorderColor', '#000000');

  const editorWebViewController = useWebViewController(
    'platformScriptureEditor.react',
    projectWebViewId,
  );

  const editorDecorations = useMemo(
    () => ({
      containers: {
        'hello-rock3-container': {
          style: {
            borderColor: editorBorderColor,
            borderWidth: 4,
          },
        },
      },
      headers: editorHeaderText
        ? {
            'hello-rock3-header': {
              descriptionMd: editorHeaderText,
            },
          }
        : undefined,
    }),
    [editorHeaderText, editorBorderColor],
  );

  useEffect(() => {
    const decorationsToRemove: string[] = [];
    if (!editorHeaderText) decorationsToRemove.push('hello-rock3-header');
    if (!editorBorderColor) decorationsToRemove.push('hello-rock3-container');
    editorWebViewController?.updateDecorations(
      editorDecorations,
      // Delete the header if there isn't any text
      decorationsToRemove,
    );
  }, [editorWebViewController, editorDecorations, editorHeaderText, editorBorderColor]);

  // #endregion

  const genericComboBoxOptions = useMemo(
    () => [localizedOption1, localizedOption2],
    [localizedOption1, localizedOption2],
  );

  // #region Get the localized Scripture Reference in various formats

  const scrRefBookIdLocalizeKey = `%LocalizedId.${scrRef.book}%` as const;
  const scrRefBookNameLocalizeKey = `%Book.${scrRef.book}%` as const;

  const [
    {
      [scrRefBookIdLocalizeKey]: scrRefBookIdLocalized,
      [scrRefBookNameLocalizeKey]: scrRefBookNameLocalized,
    },
  ] = useLocalizedStrings(
    useMemo(
      () => [scrRefBookIdLocalizeKey, scrRefBookNameLocalizeKey],
      [scrRefBookIdLocalizeKey, scrRefBookNameLocalizeKey],
    ),
  );

  const scrRefString = useMemo(
    () =>
      scrRef
        ? `${scrRef.book} ${scrRefBookIdLocalized} ${scrRefBookNameLocalized} ${scrRef.chapterNum}:${scrRef.verseNum}`
        : '',
    [scrRef, scrRefBookIdLocalized, scrRefBookNameLocalized],
  );

  // #endregion

  return (
    <div>
      <div className="title">
        {localizedHelloRock3} <span className="framework">{localizedReact}</span>
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
            papi.commands.sendCommand('helloRock3.helloRock3');
            setClicks(clicks + 1);
            papi
              .fetch('https://example.com', { mode: 'no-cors' })
              .catch((e) => logger.error(`Could not get data from example.com! Reason: ${e}`));
          }}
        >
          {localizedHelloRock3} {clicks}
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
      {nameIsError ? (
        <div>{name.message}</div>
      ) : (
        <div>
          <input value={nameTemp} onChange={(e) => setName(e.target.value)} />
          <Button onClick={() => peopleDataProvider?.deletePerson(name)}>
            {localizedDelete} {name}
          </Button>
        </div>
      )}
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
      <h3 style={headerStyle}>{scrRefString}</h3>
      <div>{currentProjectVerse}</div>
      <ProjectSettingsEditor {...helloRock3ProjectSettings} />
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
        <div>{localizedTestDeprecatedString}</div>
      </div>
      <Button onClick={() => updateWebViewDefinition({}, true)}>Make this WebView flash</Button>
    </div>
  );
};
