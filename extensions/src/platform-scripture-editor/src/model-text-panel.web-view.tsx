import {
  Editorial,
  EditorOptions,
  EditorRef,
  getDefaultViewOptions,
  UsjNodeOptions,
} from '@eten-tech-foundation/platform-editor';
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
import { Button, Spinner } from 'platform-bible-react';
import {
  DblResourceData,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
} from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef } from 'react';
// @ts-ignore: platform-scripture/src is not a published module entry-point; accessible via typeRoots symlink at dev time
import { useEffectiveResourceReferenceList } from 'platform-scripture/src/use-effective-resource-reference-list';
import type {
  DblResourceReference,
  EffectiveResourceReference,
  ResourceReferenceList,
} from 'platform-scripture';

const CURRENT_DATA_VERSION = '1.0.0';
const DEFAULT_LIST: ResourceReferenceList = { dataVersion: CURRENT_DATA_VERSION, items: [] };
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
  '%webView_modelTextPanel_unknownResource%',
  '%webView_modelTextPanel_emptyState_prompt%',
];

globalThis.webViewComponent = function ModelTextPanel({
  projectId,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => MODEL_TEXT_PANEL_STRING_KEYS, []));

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
  if (!effectiveModelTexts || effectiveModelTexts.items.length === 0) {
    return (
      <div className="tw:flex tw:h-screen tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:p-8 tw:text-center">
        {isEffectiveModelTextsLoading ? (
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
