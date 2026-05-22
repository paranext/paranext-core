import { Usj, USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';
import type { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import {
  useData,
  useDataProvider,
  useLocalizedStrings,
  useProjectDataProvider,
  useProjectSetting,
} from '@papi/frontend/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { usePromise } from 'platform-bible-react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useCallback, useMemo } from 'react';
// @ts-ignore: platform-scripture/src is not a published module entry-point; accessible via typeRoots symlink at dev time
import { useEffectiveResourceReferenceList } from 'platform-scripture/src/use-effective-resource-reference-list';
import type { ResourceReferenceList } from 'platform-scripture';
import { ModelTextPanel, MODEL_TEXT_PANEL_STRING_KEYS } from './model-text-panel.component';

const CURRENT_DATA_VERSION = '1.0.0';
const DEFAULT_LIST: ResourceReferenceList = { dataVersion: CURRENT_DATA_VERSION, items: [] };
const DEFAULT_TEXT_DIRECTION = 'ltr';

const defaultUsj: Usj = {
  type: USJ_TYPE,
  version: USJ_VERSION,
  content: [],
};

/**
 * Thin data-loader for the model-text panel. It wires PAPI to the props of `ModelTextPanel`, which
 * owns the orchestration. Raw data is passed as props; writes and resource-dependent reads (the
 * resolved resource's USJ + text direction) are passed as callbacks.
 */
globalThis.webViewComponent = function ModelTextPanelWebView({
  projectId,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => [...MODEL_TEXT_PANEL_STRING_KEYS], []),
  );

  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();

  // --- Raw data sources ---

  // useEffectiveResourceReferenceList is imported via @ts-ignore path; its return is treated as the
  // EffectiveResourceReferenceList the component expects.
  const [effectiveModelTexts, isEffectiveModelTextsLoading] = useEffectiveResourceReferenceList(
    projectId,
    'platformScripture.modelTexts',
  );

  const [adminModelTextsSetting, setAdminModelTextsSetting] = useProjectSetting(
    projectId,
    'platformScripture.modelTexts',
    DEFAULT_LIST,
  );
  const adminModelTexts = isPlatformError(adminModelTextsSetting)
    ? undefined
    : adminModelTextsSetting;

  const pdp = useProjectDataProvider('platformScripture.userTextConnectionSettings', projectId);

  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');
  const [resourcesPossiblyError] = useData(
    'platformGetResources.dblResourcesProvider',
  ).DblResources(undefined, []);
  const dblResources = isPlatformError(resourcesPossiblyError) ? [] : resourcesPossiblyError;

  const [canWriteProjectSettings] = usePromise(
    useCallback(async () => (await pdp?.canUserWriteProjectSettings()) ?? false, [pdp]),
    false,
  );

  // --- Operation callbacks ---

  const installResource = useCallback(
    (dblEntryUid: string) => {
      dblResourcesProvider
        ?.installDblResource(dblEntryUid)
        .catch((e: unknown) =>
          logger.error(`Model text auto-install failed: ${getErrorMessage(e)}`),
        );
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
      await pdp?.setUserModelTexts(list);
    },
    [pdp],
  );

  const showResourcePicker = useCallback(
    (selectedResourceIds: string[]) =>
      papi.dialogs.showDialog('platform.resourcePicker', {
        resourceType: 'ScriptureResource',
        selectedResourceIds,
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
      adminModelTexts={adminModelTexts}
      canWriteProjectSettings={canWriteProjectSettings}
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
