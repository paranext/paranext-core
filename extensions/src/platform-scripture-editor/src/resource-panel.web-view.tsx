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
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Spinner,
} from 'platform-bible-react';
import {
  DblResourceData,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
  ResourceType,
} from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef } from 'react';
// @ts-ignore: platform-scripture/src is not a published module entry-point; accessible via typeRoots symlink at dev time
import { useEffectiveResourceReferenceList } from 'platform-scripture/src/use-effective-resource-reference-list';
import type {
  DblResourceReference,
  EffectiveResourceReference,
  ProjectReference,
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

const RESOURCE_PANEL_STRING_KEYS: LocalizeKey[] = [
  '%webView_resourcePanel_noProject%',
  '%webView_resourcePanel_installing%',
  '%webView_resourcePanel_downloadResources%',
  '%webView_resourcePanel_bibleTexts_emptyState_prompt%',
  '%webView_resourcePanel_bibleTexts_pick%',
  '%webView_resourcePanel_commentaries_emptyState_prompt%',
  '%webView_resourcePanel_commentaries_pick%',
];

/** Returns the `id` field for reference types that have one, or `undefined` for others. */
function getRefId(ref: EffectiveResourceReference): string | undefined {
  if (ref.type === 'dblResource' || ref.type === 'project') {
    // Both DblResourceReference and ProjectReference have `id`; cast is safe after type check
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return (ref as DblResourceReference | ProjectReference).id;
  }
  return undefined;
}

/**
 * Returns the display label for a resource reference in the form `{fullName} ({displayName})` for
 * DBL resources, falling back to `ref.name` if the DblResourceData entry is not yet in the list.
 * Returns `ref.name` for project references.
 */
function getRefLabel(ref: EffectiveResourceReference, dblResourcesList: DblResourceData[]): string {
  if (ref.type === 'dblResource') {
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const dblRef = ref as EffectiveResourceReference & DblResourceReference;
    const dblData = dblResourcesList.find((r) => r.dblEntryUid === dblRef.id);
    if (dblData) return `${dblData.fullName} (${dblData.displayName})`;
    return dblRef.name;
  }
  if (ref.type === 'project') {
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return (ref as EffectiveResourceReference & ProjectReference).name;
  }
  return '';
}

globalThis.webViewComponent = function ResourcePanel({
  projectId,
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => RESOURCE_PANEL_STRING_KEYS, []));

  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();

  // --- Web view state ---

  // resourceType is injected by the web view provider at open time
  const [resourceType] = useWebViewState<ResourceType>('resourceType', 'ScriptureResource');
  const [selectedResourceId, setSelectedResourceId] = useWebViewState<string | undefined>(
    'selectedResourceId',
    undefined,
  );

  // --- Data sources ---

  // useEffectiveResourceReferenceList is imported via @ts-ignore path; cast needed for type safety
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const [effectiveResources, isEffectiveResourcesLoading] = useEffectiveResourceReferenceList(
    projectId,
    'platformScripture.referencedProjectsAndResources',
  ) as [{ items: EffectiveResourceReference[] } | undefined, boolean];

  const [adminResourcesSetting, setAdminResources] = useProjectSetting(
    projectId,
    'platformScripture.referencedProjectsAndResources',
    DEFAULT_LIST,
  );

  const pdp = useProjectDataProvider('platformScripture.userTextConnectionSettings', projectId);

  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');
  const [resourcesPossiblyError] = useData(
    'platformGetResources.dblResourcesProvider',
  ).DblResources(undefined, []);
  const dblResources = isPlatformError(resourcesPossiblyError) ? [] : resourcesPossiblyError;

  // --- Filter list based on resourceType ---

  const filteredResources = useMemo((): EffectiveResourceReference[] => {
    if (!effectiveResources) return [];
    return effectiveResources.items.filter((ref) => {
      if (ref.type === 'dblResource') {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const dblRef = ref as EffectiveResourceReference & DblResourceReference;
        return dblResources.find((r) => r.dblEntryUid === dblRef.id)?.type === resourceType;
      }
      if (ref.type === 'project') {
        // ProjectReferences only appear in the Bible Texts tab
        return resourceType === 'ScriptureResource';
      }
      return false;
    });
  }, [effectiveResources, dblResources, resourceType]);

  // --- Selection management ---

  // Auto-correct selectedResourceId when the selected item leaves the filtered list
  useEffect(() => {
    if (filteredResources.length === 0) return;
    const currentId = filteredResources.find((r) => getRefId(r) === selectedResourceId);
    if (!currentId) setSelectedResourceId(getRefId(filteredResources[0]));
  }, [filteredResources, selectedResourceId, setSelectedResourceId]);

  const selectedRef =
    filteredResources.find((r) => getRefId(r) === selectedResourceId) ?? filteredResources[0];

  // --- Resolve the selected resource to a project ID for USJ rendering ---

  let resourceProjectId: string | undefined;
  let isInstalling = false;
  let dblMatch: (typeof dblResources)[number] | undefined;

  if (selectedRef?.type === 'dblResource') {
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const dblRef = selectedRef as EffectiveResourceReference & DblResourceReference;
    dblMatch = dblResources.find((r) => r.dblEntryUid === dblRef.id);
    isInstalling = dblMatch !== undefined && !dblMatch.installed;
    resourceProjectId = dblMatch?.installed ? dblMatch.projectId : undefined;
  } else if (selectedRef?.type === 'project') {
    // ProjectReferences resolve directly; no installation check needed
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    resourceProjectId = (selectedRef as EffectiveResourceReference & ProjectReference).id;
  }

  // Auto-install when the selected DblResource exists but isn't installed
  const matchDblEntryUid = dblMatch?.dblEntryUid;
  useEffect(() => {
    if (isInstalling && dblResourcesProvider && matchDblEntryUid !== undefined) {
      dblResourcesProvider
        .installDblResource(matchDblEntryUid)
        .catch((e: unknown) =>
          logger.error(`Resource panel auto-install failed: ${getErrorMessage(e)}`),
        );
    }
  }, [isInstalling, dblResourcesProvider, matchDblEntryUid]);

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

  // --- Resource picker dialog ---

  // Only DblResourceReference IDs are passed to the Resource Picker as pre-selected
  const currentFilteredDblIds = useMemo(() => {
    return filteredResources
      .filter(
        (r): r is EffectiveResourceReference & DblResourceReference => r.type === 'dblResource',
      )
      .map((r) => r.id);
  }, [filteredResources]);

  const handleResourceSelect = useCallback(
    async (resource: DblResourceData) => {
      const newRef: DblResourceReference = {
        type: 'dblResource',
        name: resource.displayName,
        id: resource.dblEntryUid,
      };

      const canWrite = await pdp?.canUserWriteProjectSettings();

      if (canWrite && setAdminResources) {
        if (isPlatformError(adminResourcesSetting)) return;
        const existingItems = adminResourcesSetting.items.filter((item) => {
          if (item.type !== 'dblResource') return true;
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          return (item as DblResourceReference).id !== resource.dblEntryUid;
        });
        setAdminResources({
          dataVersion: adminResourcesSetting.dataVersion,
          items: [newRef, ...existingItems],
        });
      } else {
        // Read the raw user list directly — do NOT filter effectiveResources by source.
        // Filtering by source drops user items that also appear in the admin list (tagged 'admin'),
        // which would silently remove them if the admin later deletes their copy.
        const rawUserList = await pdp?.getUserReferencedProjectsAndResources();
        const rawUserItems = rawUserList?.items ?? [];
        await pdp?.setUserReferencedProjectsAndResources({
          dataVersion: rawUserList?.dataVersion ?? DEFAULT_LIST.dataVersion,
          items: [
            newRef,
            ...rawUserItems.filter((item) => {
              if (item.type !== 'dblResource') return true;
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              return (item as DblResourceReference).id !== resource.dblEntryUid;
            }),
          ],
        });
      }

      setSelectedResourceId(resource.dblEntryUid);
    },
    [adminResourcesSetting, setAdminResources, pdp, setSelectedResourceId],
  );

  const showResourcePicker = useDialogCallback(
    'platform.resourcePicker',
    useMemo(
      () => ({ resourceType, selectedResourceIds: currentFilteredDblIds }),
      [resourceType, currentFilteredDblIds],
    ),
    useCallback(
      (resource: DblResourceData | undefined) => {
        if (!resource) return;
        handleResourceSelect(resource).catch((e) =>
          logger.error(`Resource selection failed: ${getErrorMessage(e)}`),
        );
      },
      [handleResourceSelect],
    ),
  );

  // --- Editor ---

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

  useEffect(() => {
    if (usjFromPdp) editorRef.current?.setUsj(usjFromPdp);
  }, [usjFromPdp]);

  // --- Render helpers ---

  const emptyStatePromptKey =
    resourceType === 'ScriptureResource'
      ? '%webView_resourcePanel_bibleTexts_emptyState_prompt%'
      : '%webView_resourcePanel_commentaries_emptyState_prompt%';

  const pickButtonKey =
    resourceType === 'ScriptureResource'
      ? '%webView_resourcePanel_bibleTexts_pick%'
      : '%webView_resourcePanel_commentaries_pick%';

  // --- Render ---

  if (!projectId) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <p>{localizedStrings['%webView_resourcePanel_noProject%']}</p>
      </div>
    );
  }

  if (!effectiveResources || isEffectiveResourcesLoading) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <Spinner />
      </div>
    );
  }

  // Zero state: the filtered list is empty (nothing configured for this resourceType)
  if (filteredResources.length === 0) {
    return (
      <div className="tw:flex tw:h-screen tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:p-8 tw:text-center">
        <p>{localizedStrings[emptyStatePromptKey]}</p>
        <Button onClick={() => showResourcePicker()}>{localizedStrings[pickButtonKey]}</Button>
      </div>
    );
  }

  // Installing state: selected DblResource found but not yet installed
  if (isInstalling) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:gap-2 tw:p-8 tw:text-center">
        <Spinner />
        <span>{localizedStrings['%webView_resourcePanel_installing%']}</span>
      </div>
    );
  }

  // Loading state: USJ not yet available
  if (!resourceProjectId || usjPossiblyError === undefined) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <Spinner />
      </div>
    );
  }

  // Active state: resource is installed and USJ is available
  return (
    <div className="tw:flex tw:h-screen tw:flex-col">
      {/* Resource selector dropdown */}
      <div className="tw:px-2 tw:py-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="tw:h-8 tw:w-full tw:justify-between tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap"
            >
              <span className="tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap">
                {selectedRef ? getRefLabel(selectedRef, dblResources) : ''}
              </span>
              <span className="tw:ml-1 tw:shrink-0">▾</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="tw:w-72">
            {filteredResources.map((ref) => {
              const refId = getRefId(ref);
              return (
                <DropdownMenuCheckboxItem
                  key={refId}
                  checked={refId === (selectedRef ? getRefId(selectedRef) : undefined)}
                  onCheckedChange={() => {
                    if (refId) setSelectedResourceId(refId);
                  }}
                >
                  {getRefLabel(ref, dblResources)}
                </DropdownMenuCheckboxItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => showResourcePicker()}>
              {localizedStrings['%webView_resourcePanel_downloadResources%']}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Scripture content */}
      <div className="tw:flex-1 tw:overflow-auto" dir={options.textDirection}>
        <Editorial
          ref={editorRef}
          scrRef={scrRef}
          onScrRefChange={setScrRef}
          options={options}
          logger={logger}
        />
      </div>
    </div>
  );
};
