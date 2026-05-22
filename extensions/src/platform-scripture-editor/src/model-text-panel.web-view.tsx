import { Usj, USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';
import type { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import {
  useData,
  useDataProvider,
  useDialogCallback,
  useLocalizedStrings,
  useProjectData,
  useProjectDataProvider,
  useProjectSetting,
} from '@papi/frontend/react';
import { DblResourceData, getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo } from 'react';
// @ts-ignore: platform-scripture/src is not a published module entry-point; accessible via typeRoots symlink at dev time
import { useEffectiveResourceReferenceList } from 'platform-scripture/src/use-effective-resource-reference-list';
import type {
  DblResourceReference,
  EffectiveResourceReference,
  ResourceReferenceList,
} from 'platform-scripture';
import {
  ModelTextPanel,
  ModelTextPanelStatus,
  MODEL_TEXT_PANEL_STRING_KEYS,
} from './model-text-panel.component';

const CURRENT_DATA_VERSION = '1.0.0';
const DEFAULT_LIST: ResourceReferenceList = { dataVersion: CURRENT_DATA_VERSION, items: [] };
const DEFAULT_TEXT_DIRECTION = 'ltr';

const defaultUsj: Usj = {
  type: USJ_TYPE,
  version: USJ_VERSION,
  content: [],
};

globalThis.webViewComponent = function ModelTextPanelWebView({
  projectId,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => [...MODEL_TEXT_PANEL_STRING_KEYS], []),
  );

  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();

  // --- Data sources ---

  // useEffectiveResourceReferenceList is imported via @ts-ignore path; cast needed for type safety
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const [effectiveModelTexts, isEffectiveModelTextsLoading] = useEffectiveResourceReferenceList(
    projectId,
    'platformScripture.modelTexts',
  );

  const [adminModelTextsSetting, setAdminModelTexts] = useProjectSetting(
    projectId,
    'platformScripture.modelTexts',
    DEFAULT_LIST,
  );

  const pdp = useProjectDataProvider('platformScripture.userTextConnectionSettings', projectId);

  // --- DBL resource resolution ---

  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');
  const [resourcesPossiblyError] = useData(
    'platformGetResources.dblResourcesProvider',
  ).DblResources(undefined, []);
  const dblResources = isPlatformError(resourcesPossiblyError) ? [] : resourcesPossiblyError;

  const effectiveModelText = effectiveModelTexts?.items[0];
  // EffectiveResourceReference is a discriminated union; checking `.type` narrows to DblResourceReference
  let dblRef: (EffectiveResourceReference & DblResourceReference) | undefined;
  if (effectiveModelText?.type === 'dblResource') {
    // EffectiveResourceReference union check doesn't satisfy TS discriminated union refinement
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    dblRef = effectiveModelText as EffectiveResourceReference & DblResourceReference;
  }
  const match = dblRef ? dblResources.find((r) => r.dblEntryUid === dblRef.id) : undefined;

  // Auto-install when the resource exists but isn't installed yet
  const isInstalling = dblRef !== undefined && match !== undefined && !match.installed;
  const matchDblEntryUid = match?.dblEntryUid;
  useEffect(() => {
    if (isInstalling && dblResourcesProvider && matchDblEntryUid !== undefined) {
      dblResourcesProvider
        .installDblResource(matchDblEntryUid)
        .catch((e: unknown) =>
          logger.error(`Model text auto-install failed: ${getErrorMessage(e)}`),
        );
    }
  }, [isInstalling, dblResourcesProvider, matchDblEntryUid]);

  const resourceProjectId = match?.installed ? match.projectId : undefined;

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
    const dblItems = items.filter(
      (r): r is EffectiveResourceReference & DblResourceReference => r.type === 'dblResource',
    );
    const adminDblItems = dblItems.filter((r) => r.source === 'admin');
    const relevantItems =
      adminDblItems.length > 0 ? adminDblItems : dblItems.filter((r) => r.source === 'user');
    return relevantItems.map((r) => r.id);
  }, [effectiveModelTexts]);

  const handleResourceSelect = useCallback(
    async (resource: DblResourceData) => {
      const newRef: DblResourceReference = {
        type: 'dblResource',
        name: resource.displayName,
        id: resource.dblEntryUid,
      };

      const canUserWriteProjectSettings = await pdp?.canUserWriteProjectSettings();

      if (canUserWriteProjectSettings && setAdminModelTexts) {
        if (isPlatformError(adminModelTextsSetting)) return;
        // ResourceReference union: .id is not on all members; cast is safe after checking .type
        const existingItems = adminModelTextsSetting.items.filter(
          (item): item is DblResourceReference => {
            if (item.type !== 'dblResource') return false;
            // DblResourceReference.id exists after .type check; ResourceReference union requires cast
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            return (item as DblResourceReference).id !== resource.dblEntryUid;
          },
        );
        setAdminModelTexts({
          dataVersion: adminModelTextsSetting.dataVersion,
          items: [newRef, ...existingItems],
        });
      } else {
        const currentUserDblItems = (effectiveModelTexts?.items ?? [])
          .filter((r) => r.source === 'user')
          .filter(
            (r): r is EffectiveResourceReference & DblResourceReference =>
              r.type === 'dblResource' && r.id !== resource.dblEntryUid,
          );
        await pdp?.setUserModelTexts({
          dataVersion: DEFAULT_LIST.dataVersion,
          items: [newRef, ...currentUserDblItems],
        });
      }
    },
    [adminModelTextsSetting, effectiveModelTexts, setAdminModelTexts, pdp],
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

  // --- Resolve which mutually-exclusive state to render ---
  // Mirrors the original priority order: no project → loading/empty → unknown → installing →
  // loading text → active.

  let status: ModelTextPanelStatus;
  if (!projectId) {
    // Note: It's expected that this isn't shown very long and that the `platform-scripture-editor`
    // extension will show the most recent project (or the picked project).
    status = 'noProject';
  } else if (!effectiveModelTexts || effectiveModelTexts.items.length === 0) {
    status = isEffectiveModelTextsLoading ? 'loadingModelTexts' : 'noModelText';
  } else if (dblRef && match === undefined) {
    status = 'unknownResource';
  } else if (isInstalling) {
    status = 'installing';
    // usjPossiblyError is undefined while the subscription is initializing
  } else if (!resourceProjectId || usjPossiblyError === undefined) {
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
