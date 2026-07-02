import { Usj, USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';
import type { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import {
  useDataProvider,
  useLocalizedStrings,
  useProjectDataProvider,
  useProjectSetting,
} from '@papi/frontend/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { usePromise } from 'platform-bible-react';
import {
  formatReplacementString,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
} from 'platform-bible-utils';
import type {
  DblResourceReference,
  EffectiveResourceReference,
  ResourceReferenceList,
} from 'platform-scripture';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useEffectiveResourceReferenceList } from 'platform-bible-react/experimental';
import { isDblResourceReference } from './resource-reference.utils';
import { DEFAULT_RESOURCE_REFERENCE_LIST } from './select-dbl-resource';
import { ModelTextPanel, MODEL_TEXT_PANEL_STRING_KEYS } from './model-text-panel.component';

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

/**
 * Thin data-loader for the model-text panel. It wires PAPI to the props of `ModelTextPanel`, which
 * owns the orchestration. Raw data is passed as props; writes and resource-dependent reads (the
 * resolved resource's USJ + text direction) are passed as callbacks.
 */
globalThis.webViewComponent = function ModelTextPanelWebView({
  projectId,
  updateWebViewDefinition,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => ALL_STRING_KEYS, []));

  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();

  // --- Raw data sources ---

  const [effectiveModelTexts, isEffectiveModelTextsLoading] = useEffectiveResourceReferenceList(
    projectId,
    'platformScripture.modelTexts',
  );

  const [adminModelTextsSetting, setAdminModelTextsSetting] = useProjectSetting(
    projectId,
    'platformScripture.modelTexts',
    DEFAULT_RESOURCE_REFERENCE_LIST,
  );
  const adminModelTexts = isPlatformError(adminModelTextsSetting)
    ? undefined
    : adminModelTextsSetting;

  const textConnectionsProvider = useProjectDataProvider(
    'platformScripture.textConnectionSettings',
    projectId,
  );

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
  const dblResources = useMemo(
    () => resourcesPossiblyUndefined ?? [],
    [resourcesPossiblyUndefined],
  );

  // --- Dynamic title: "Model text: {displayName}" when a resource is loaded ---
  // Computed inline (rather than in the presentational component) because updateWebViewDefinition
  // is a webview-only API.

  const effectiveModelText = effectiveModelTexts?.items[0];
  let dblRef: (EffectiveResourceReference & DblResourceReference) | undefined;
  if (isDblResourceReference(effectiveModelText)) {
    dblRef = effectiveModelText;
  }
  const matchedInstalledResource = dblRef
    ? dblResources.find((r) => r.dblEntryUid === dblRef.id && r.installed)
    : undefined;
  const modelTextSmallName = matchedInstalledResource?.displayName;
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

  // --- Operation callbacks ---

  const installResource = useCallback(
    async (dblEntryUid: string) => {
      try {
        await dblResourcesProvider?.installDblResource(dblEntryUid);
        setFetchResources(true);
      } catch (e: unknown) {
        papi.notifications.send({
          message: '%webView_selectDblResource_installFailed%',
          severity: 'error',
        });
        logger.warn(`Error installing dbl resource for model text panel: ${getErrorMessage(e)}`);
        throw e;
      }
    },
    [dblResourcesProvider],
  );

  const setAdminModelTexts = useCallback(
    (list: ResourceReferenceList) => {
      setAdminModelTextsSetting?.(list);
    },
    [setAdminModelTextsSetting],
  );

  const setUserModelTexts = useCallback(
    async (list: ResourceReferenceList) => {
      await textConnectionsProvider?.setUserModelTexts(list);
    },
    [textConnectionsProvider],
  );

  const getUserModelTexts = useCallback(
    async () => textConnectionsProvider?.getUserModelTexts(),
    [textConnectionsProvider],
  );

  const getCanWriteProjectSettings = useCallback(
    async () => textConnectionsProvider?.canUserWriteProjectTextConnectionSettings(),
    [textConnectionsProvider],
  );

  const showResourcePicker = useCallback(
    (selectedResourceIds: string[]) =>
      papi.dialogs.showDialog('platform.resourcePicker', {
        resourceType: 'ScriptureResource',
        selectedResourceIds,
        isModal: true,
      }),
    [],
  );

  const getResourceChapter = useCallback(
    async (resourceProjectId: string, ref: SerializedVerseRef) => {
      const usjPdp = await papi.projectDataProviders.get(
        'platformScripture.USJ_Chapter',
        resourceProjectId,
      );
      const usj =
        (await usjPdp.getChapterUSJ({
          book: ref.book,
          chapterNum: ref.chapterNum,
          verseNum: 1,
          versificationStr: ref.versificationStr,
        })) ?? defaultUsj;

      let textDirection: string = DEFAULT_TEXT_DIRECTION;
      try {
        const basePdp = await papi.projectDataProviders.get('platform.base', resourceProjectId);
        const td = await basePdp.getSetting('platform.textDirection');
        if (typeof td === 'string' && td) textDirection = td;
      } catch (e) {
        logger.warn(`Failed to read model text direction: ${getErrorMessage(e)}`);
      }

      return { usj, textDirection };
    },
    [],
  );

  return (
    <ModelTextPanel
      localizedStrings={localizedStrings}
      hasProject={projectId !== undefined}
      effectiveModelTexts={effectiveModelTexts}
      isEffectiveModelTextsLoading={isEffectiveModelTextsLoading}
      dblResources={dblResources}
      isLoadingResources={isLoadingResources}
      adminModelTexts={adminModelTexts}
      getUserModelTexts={getUserModelTexts}
      getCanWriteProjectSettings={getCanWriteProjectSettings}
      scrRef={scrRef}
      onScrRefChange={setScrRef}
      installResource={installResource}
      setAdminModelTexts={setAdminModelTexts}
      setUserModelTexts={setUserModelTexts}
      showResourcePicker={showResourcePicker}
      getResourceChapter={getResourceChapter}
      logger={logger}
    />
  );
};
