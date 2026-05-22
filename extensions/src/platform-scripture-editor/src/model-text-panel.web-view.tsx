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
import { usePromise } from 'platform-bible-react';
import {
  DblResourceData,
  formatReplacementString,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
} from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { DblResourceReference, EffectiveResourceReference } from 'platform-scripture';
import { useEffectiveResourceReferenceList } from './use-effective-resource-reference-list.hook';
import { isDblResourceReference } from './resource-reference.utils';
import { DEFAULT_RESOURCE_REFERENCE_LIST, selectTextConnection } from './select-dbl-resource';
import {
  ModelTextPanel,
  ModelTextPanelStatus,
  MODEL_TEXT_PANEL_STRING_KEYS,
} from './model-text-panel.component';

const DEFAULT_TEXT_DIRECTION = 'ltr';

const defaultUsj: Usj = {
  type: USJ_TYPE,
  version: USJ_VERSION,
  content: [],
};

// Webview-only localized strings — used for the dynamic title via updateWebViewDefinition. The
// presentational component doesn't know about the title.
const ALL_STRING_KEYS: LocalizeKey[] = [
  ...MODEL_TEXT_PANEL_STRING_KEYS,
  '%webView_modelTextPanel_title%',
  '%webView_modelTextPanel_title_withResource%',
];

globalThis.webViewComponent = function ModelTextPanelWebView({
  projectId,
  updateWebViewDefinition,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => ALL_STRING_KEYS, []));

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
  // EffectiveResourceReference is a discriminated union; isDblResourceReference narrows it
  let dblRef: (EffectiveResourceReference & DblResourceReference) | undefined;
  if (isDblResourceReference(effectiveModelText)) {
    dblRef = effectiveModelText;
  }
  const match = dblRef ? dblResources.find((r) => r.dblEntryUid === dblRef.id) : undefined;

  // Auto-install when the resource exists but isn't installed yet
  const isInstalling = dblRef !== undefined && match !== undefined && !match.installed;
  const matchDblEntryUid = match?.dblEntryUid;
  useEffect(() => {
    if (!fetchResources && isInstalling && dblResourcesProvider && matchDblEntryUid !== undefined) {
      setFetchResources(true);
      dblResourcesProvider
        .installDblResource(matchDblEntryUid)
        .catch((e: unknown) =>
          logger.error(`Model text auto-install failed: ${getErrorMessage(e)}`),
        );
    }
  }, [isInstalling, fetchResources, dblResourcesProvider, matchDblEntryUid]);

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
      ),
    [adminModelTexts, setAdminModelTexts, textConnectionsProvider],
  );

  const showResourcePicker = useDialogCallback(
    'platform.resourcePicker',
    useMemo(
      () => ({
        resourceType: 'ScriptureResource',
        selectedResourceIds: currentModelTextIds,
        isModal: true,
      }),
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

  // --- Resolve which mutually-exclusive state to render ---
  // Mirrors original priority order: no project → loading/empty → unknown → installing →
  // loading text → active.

  let status: ModelTextPanelStatus;
  if (!projectId) {
    // It's expected this isn't shown long; the `platform-scripture-editor` extension will show
    // the most recent project (or the picked project).
    status = 'noProject';
  } else if (!effectiveModelTexts || effectiveModelTexts.items.length === 0) {
    status = isEffectiveModelTextsLoading ? 'loadingModelTexts' : 'noModelText';
  } else if (isLoadingResources) {
    // PT-3991: a model text is configured but the DBL resource list is still loading — show a
    // spinner instead of falling through to 'unknownResource' (which would happen because the
    // empty dblResources array yields match === undefined).
    status = 'loadingModelTexts';
  } else if (dblRef && match === undefined) {
    status = 'unknownResource';
  } else if (isInstalling) {
    status = 'installing';
  } else if (!resourceProjectId || usjPossiblyError === undefined) {
    // usjPossiblyError is undefined while the subscription is initializing
    status = 'loadingText';
  } else {
    status = 'active';
  }

  return (
    <ModelTextPanel
      localizedStrings={localizedStrings}
      status={status}
      onPickModelText={() => showResourcePicker()}
      usj={usjFromPdp}
      textDirection={textDirection}
      scrRef={scrRef}
      onScrRefChange={setScrRef}
      logger={logger}
    />
  );
};
