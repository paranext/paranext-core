import {
  Editorial,
  EditorOptions,
  EditorRef,
  getDefaultViewOptions,
  UsjNodeOptions,
} from '@eten-tech-foundation/platform-editor';
import { Usj, USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';
import type { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import {
  useDataProvider,
  useDialogCallback,
  useLocalizedStrings,
  useProjectData,
  useProjectDataProvider,
  useProjectSetting,
} from '@papi/frontend/react';
import { Button, Spinner, usePromise } from 'platform-bible-react';
import {
  DblResourceData,
  formatReplacementString,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
} from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { DblResourceReference, EffectiveResourceReference } from 'platform-scripture';
import { useEffectiveResourceReferenceList } from './use-effective-resource-reference-list.hook';
import { isDblResourceReference } from './resource-reference.utils';
import { DEFAULT_RESOURCE_REFERENCE_LIST, selectTextConnection } from './select-dbl-resource';

const DEFAULT_TEXT_DIRECTION = 'ltr';

const defaultUsj: Usj = {
  type: USJ_TYPE,
  version: USJ_VERSION,
  content: [],
};

const MODEL_TEXT_PANEL_STRING_KEYS: LocalizeKey[] = [
  '%webView_modelTextPanel_installing%',
  '%webView_modelTextPanel_noProject%',
  '%webView_modelTextPanel_pickModelText%',
  '%webView_modelTextPanel_title%',
  '%webView_modelTextPanel_title_withResource%',
  '%webView_modelTextPanel_unknownResource%',
  '%webView_modelTextPanel_emptyState_prompt%',
];

globalThis.webViewComponent = function ModelTextPanel({
  projectId,
  updateWebViewDefinition,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => MODEL_TEXT_PANEL_STRING_KEYS, []));

  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();

  // --- Data sources ---

  const [effectiveModelTexts, isEffectiveModelTextsLoading] = useEffectiveResourceReferenceList(
    projectId,
    'platformScripture.modelTexts',
  );

  const [adminModelTexts, setAdminModelTexts] = useProjectSetting(
    projectId,
    'platformScripture.modelTexts',
    DEFAULT_RESOURCE_REFERENCE_LIST,
  );

  const textConnectionsProvider = useProjectDataProvider(
    'platformScripture.textConnectionSettings',
    projectId,
  );

  // --- DBL resource resolution ---

  const [fetchResources, setFetchResources] = useState(true);
  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');
  const [resourcesPossiblyUndefined, isLoadingResources] = usePromise(
    useCallback(async () => {
      if (fetchResources) {
        // Sets the `fetchResources` flag to false which will trigger the promise again next render
        // to fetch the resources
        setFetchResources(false);
        return Promise.resolve(undefined);
      }

      return papi.commands.sendCommand('platformGetResources.getCachedResources');
    }, [fetchResources]),
    undefined,
  );
  const dblResources = resourcesPossiblyUndefined ?? [];

  const effectiveModelText = effectiveModelTexts?.items[0];
  // EffectiveResourceReference is a discriminated union; checking `.type` narrows to DblResourceReference
  let dblRef: (EffectiveResourceReference & DblResourceReference) | undefined;
  if (isDblResourceReference(effectiveModelText)) {
    dblRef = effectiveModelText;
  }
  const match = dblRef ? dblResources.find((r) => r.dblEntryUid === dblRef.id) : undefined;

  // Installing state: resource found in DBL list but not yet installed
  const isInstalling = dblRef !== undefined && match !== undefined && !match.installed;

  const resourceProjectId = match?.installed ? match.projectId : undefined;

  // --- Dynamic title: "Model text: {displayName}" when a resource is loaded ---

  const modelTextSmallName = match?.installed ? match.displayName : undefined;
  useEffect(() => {
    const baseTitle = localizedStrings['%webView_modelTextPanel_title%'];
    if (!baseTitle) return;
    if (modelTextSmallName) {
      const fmt = localizedStrings['%webView_modelTextPanel_title_withResource%'];
      updateWebViewDefinition({
        title: formatReplacementString(fmt, { textName: modelTextSmallName }),
      });
    } else {
      updateWebViewDefinition({ title: baseTitle });
    }
  }, [modelTextSmallName, localizedStrings, updateWebViewDefinition]);

  // --- USJ from the resolved resource project ---

  const [usjPossiblyError] = useProjectData(
    'platformScripture.USJ_Chapter',
    resourceProjectId,
  ).ChapterUSJ(
    useMemo(
      () => ({
        book: scrRef.book,
        chapterNum: scrRef.chapterNum,
        verseNum: 1,
        versificationStr: scrRef.versificationStr,
      }),
      [scrRef.book, scrRef.chapterNum, scrRef.versificationStr],
    ),
    defaultUsj,
  );

  const usjFromPdp = !isPlatformError(usjPossiblyError) ? usjPossiblyError : undefined;

  // --- Text direction from the resource project ---

  const [textDirectionPossiblyError] = useProjectSetting(
    resourceProjectId,
    'platform.textDirection',
    DEFAULT_TEXT_DIRECTION,
  );
  const textDirection = useMemo(() => {
    if (isPlatformError(textDirectionPossiblyError)) return DEFAULT_TEXT_DIRECTION;
    return textDirectionPossiblyError || DEFAULT_TEXT_DIRECTION;
  }, [textDirectionPossiblyError]);

  // --- Resource picker ---

  const currentModelTextIds = useMemo(() => {
    const items = effectiveModelTexts?.items ?? [];
    const dblItems = items.filter((r) => isDblResourceReference(r));
    const adminDblItems = dblItems.filter((r) => r.source === 'admin');
    const relevantItems =
      adminDblItems.length > 0 ? adminDblItems : dblItems.filter((r) => r.source === 'user');
    return relevantItems.map((r) => r.id);
  }, [effectiveModelTexts]);

  const handleResourceSelect = useCallback(
    (resource: DblResourceData) =>
      selectTextConnection(
        resource,
        adminModelTexts,
        setAdminModelTexts,
        textConnectionsProvider
          ? () => textConnectionsProvider.canUserWriteProjectTextConnectionSettings()
          : undefined,
        textConnectionsProvider ? () => textConnectionsProvider.getUserModelTexts() : undefined,
        textConnectionsProvider
          ? (list) => textConnectionsProvider.setUserModelTexts(list)
          : undefined,
        dblResourcesProvider
          ? async (dblEntryUid) => {
              await dblResourcesProvider.installDblResource(dblEntryUid);
              setFetchResources(true);
            }
          : undefined,
      ),
    [adminModelTexts, setAdminModelTexts, textConnectionsProvider, dblResourcesProvider],
  );

  const showResourcePicker = useDialogCallback(
    'platform.resourcePicker',
    useMemo(
      () => ({ resourceType: 'ScriptureResource', selectedResourceIds: currentModelTextIds }),
      [currentModelTextIds],
    ),
    useCallback(
      (resource: DblResourceData | undefined) => {
        if (!resource) return;
        handleResourceSelect(resource).catch((e) =>
          logger.error(`Model text selection failed: ${getErrorMessage(e)}`),
        );
      },
      [handleResourceSelect],
    ),
  );

  // --- Editor options ---

  // EditorRef requires null initial value per React ref convention
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  const options: EditorOptions = useMemo(
    () => ({
      isReadonly: true,
      hasSpellCheck: false,
      // UsjNodeOptions is a complex type; empty-object initializer requires assertion
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      nodes: {} as UsjNodeOptions,
      textDirection,
      view: getDefaultViewOptions(),
    }),
    [textDirection],
  );

  // --- PDP sync (read-only: push incoming USJ directly into the editor) ---

  useEffect(() => {
    if (usjFromPdp) editorRef.current?.setUsj(usjFromPdp);
  }, [usjFromPdp]);

  // --- Render ---

  // No project state: panel was opened without a project ID
  // Note: It's expected that this isn't shown very long and that the `platform-scripture-editor`
  // extension will show the most recent project (or the picked project).
  if (!projectId) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <p>{localizedStrings['%webView_modelTextPanel_noProject%']}</p>
      </div>
    );
  }

  // Zero state: no model text configured (or still loading)
  if (isLoadingResources || !effectiveModelTexts || effectiveModelTexts.items.length === 0) {
    return (
      <div className="tw:flex tw:h-screen tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:p-8 tw:text-center">
        {/* Also shows spinner for if loading resources, except if there is no model text then */}
        {/* it should directly show the button to pick a model text bellow */}
        {isEffectiveModelTextsLoading ||
        (isLoadingResources && effectiveModelText && effectiveModelTexts.items.length !== 0) ? (
          <Spinner />
        ) : (
          <>
            <p>{localizedStrings['%webView_modelTextPanel_emptyState_prompt%']}</p>
            <Button onClick={() => showResourcePicker()}>
              {localizedStrings['%webView_modelTextPanel_pickModelText%']}
            </Button>
          </>
        )}
      </div>
    );
  }

  // Error state: UID not found in DBL list at all
  if (dblRef && match === undefined) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <p>{localizedStrings['%webView_modelTextPanel_unknownResource%']}</p>
      </div>
    );
  }

  // Installing state: resource found but not yet installed
  if (isInstalling) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:gap-2 tw:p-8 tw:text-center">
        <Spinner />
        <span>{localizedStrings['%webView_modelTextPanel_installing%']}</span>
      </div>
    );
  }

  // Loading state: USJ not yet fetched (usjPossiblyError is undefined while the subscription is initializing)
  if (!resourceProjectId || usjPossiblyError === undefined) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <Spinner />
      </div>
    );
  }

  // Active state
  return (
    <div className="tw:h-screen tw:overflow-auto" dir={options.textDirection}>
      <Editorial
        ref={editorRef}
        scrRef={scrRef}
        onScrRefChange={setScrRef}
        options={options}
        logger={logger}
      />
    </div>
  );
};
