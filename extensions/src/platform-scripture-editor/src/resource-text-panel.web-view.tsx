import { Editorial, EditorOptions, EditorRef } from '@eten-tech-foundation/platform-editor';
import { EMPTY_USJ } from '@eten-tech-foundation/scripture-utilities';
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
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Spinner,
  usePromise,
} from 'platform-bible-react';
import {
  DblResourceData,
  formatReplacementString,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
  ResourceType,
} from 'platform-bible-utils';
import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  DblResourceReference,
  EffectiveResourceReference,
  ResourceReferenceList,
} from 'platform-scripture';
import { useEffectiveResourceReferenceList } from 'platform-bible-react/experimental';
import { useCommentaryMarkerStyles } from './use-commentary-marker-styles.hook';
import { isDblResourceReference, isProjectReference } from './resource-reference.utils';
import { DEFAULT_RESOURCE_REFERENCE_LIST, selectTextConnection } from './select-dbl-resource';

const DEFAULT_TEXT_DIRECTION = 'ltr';

const RESOURCE_PANEL_STRING_KEYS: LocalizeKey[] = [
  '%webView_resourcePanel_noProject%',
  '%webView_resourcePanel_selecting%',
  '%webView_resourcePanel_downloadResources%',
  '%webView_resourcePanel_bibleTexts_emptyState_prompt%',
  '%webView_resourcePanel_bibleTexts_pick%',
  '%webView_resourcePanel_bibleTexts_title%',
  '%webView_resourcePanel_bibleTexts_title_withResource%',
  '%webView_resourcePanel_commentaries_emptyState_prompt%',
  '%webView_resourcePanel_commentaries_pick%',
  '%webView_resourcePanel_commentaries_title%',
  '%webView_resourcePanel_commentaries_title_withResource%',
];

/** Returns the `id` field for reference types that have one, or `undefined` for others. */
function getRefId(ref: EffectiveResourceReference): string | undefined {
  if (isDblResourceReference(ref) || isProjectReference(ref)) {
    return ref.id;
  }
  return undefined;
}

/**
 * Returns the display label for a resource reference in the form `{fullName} ({displayName})` for
 * DBL resources, falling back to `ref.name` if the DblResourceData entry is not yet in the list.
 * Returns `ref.name` for project references.
 */
function getRefLabel(ref: EffectiveResourceReference, dblResourcesList: DblResourceData[]): string {
  if (isDblResourceReference(ref)) {
    const dblData = dblResourcesList.find((r) => r.dblEntryUid === ref.id);
    if (dblData) return `${dblData.fullName} (${dblData.displayName})`;
    return ref.name;
  }
  if (isProjectReference(ref)) {
    return ref.name;
  }
  return '';
}

type ResourceSelectorDropdownProps = {
  filteredResources: EffectiveResourceReference[];
  selectedRef: EffectiveResourceReference | undefined;
  dblResources: DblResourceData[];
  onSelectResource: (id: string) => void;
  onShowResourcePicker: () => void;
  downloadResourcesLabel: string;
};

function ResourceSelectorDropdown({
  filteredResources,
  selectedRef,
  dblResources,
  onSelectResource,
  onShowResourcePicker,
  downloadResourcesLabel,
}: ResourceSelectorDropdownProps) {
  return (
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
            <ChevronDown className="tw:ml-1 tw:h-4 tw:w-4 tw:shrink-0" />
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
                  if (refId) onSelectResource(refId);
                }}
              >
                {getRefLabel(ref, dblResources)}
              </DropdownMenuCheckboxItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => onShowResourcePicker()}>
            {downloadResourcesLabel}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

globalThis.webViewComponent = function ResourceTextPanel({
  projectId,
  updateWebViewDefinition,
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(RESOURCE_PANEL_STRING_KEYS);

  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();

  // #region Web view state

  // resourceType is injected by the web view provider at open time
  const [resourceType] = useWebViewState<ResourceType>('resourceType', 'ScriptureResource');
  const [selectedResourceId, setSelectedResourceId] = useWebViewState<string | undefined>(
    'selectedResourceId',
    undefined,
  );

  // #endregion

  // #region Data sources

  const [effectiveResources] = useEffectiveResourceReferenceList(
    projectId,
    'platformScripture.referencedProjectsAndResources',
  );

  const [adminResourceListSetting, setAdminResourceTextsRaw] = useProjectSetting(
    projectId,
    'platformScripture.referencedProjectsAndResources',
    DEFAULT_RESOURCE_REFERENCE_LIST,
  );
  const adminResourceList = isPlatformError(adminResourceListSetting)
    ? undefined
    : adminResourceListSetting;

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
  const getCanWriteProjectSettings = useCallback(
    async () => textConnectionsProvider?.canUserWriteProjectTextConnectionSettings(),
    [textConnectionsProvider],
  );
  const setAdminResourceTexts = useCallback(
    (resources: ResourceReferenceList) => {
      setAdminResourceTextsRaw?.(resources);
    },
    [setAdminResourceTextsRaw],
  );
  const getUserResourceTexts = useCallback(
    async () => textConnectionsProvider?.getUserReferencedProjectsAndResources(),
    [textConnectionsProvider],
  );
  const setUserResourceTexts = useCallback(
    async (resources: ResourceReferenceList) =>
      textConnectionsProvider?.setUserReferencedProjectsAndResources(resources),
    [textConnectionsProvider],
  );

  // #endregion

  // #region Filter list based on resourceType

  const filteredResources = useMemo((): EffectiveResourceReference[] => {
    if (!effectiveResources) return [];
    return effectiveResources.items.filter((ref) => {
      if (isDblResourceReference(ref)) {
        return dblResources.find((r) => r.dblEntryUid === ref.id)?.type === resourceType;
      }
      if (isProjectReference(ref)) {
        // ProjectReferences only appear in the Bible Texts tab
        return resourceType === 'ScriptureResource';
      }
      return false;
    });
  }, [effectiveResources, dblResources, resourceType]);

  // #endregion

  // #region Selection management

  // Holds the ID of a resource just selected from the picker while it propagates through the
  // reactive settings chain and into filteredResources. Prevents the auto-correct below from
  // resetting the selection before the new resource has arrived in the list.
  const [pendingResourceId, setPendingResourceId] = useState<string | undefined>(undefined);

  // Once the pending resource appears in filteredResources, commit it as the active selection.
  useEffect(() => {
    if (!pendingResourceId) return;
    const found = filteredResources.find((r) => getRefId(r) === pendingResourceId);
    if (found) {
      setSelectedResourceId(pendingResourceId);
      setPendingResourceId(undefined);
    }
  }, [filteredResources, pendingResourceId, setSelectedResourceId]);

  // Auto-correct selectedResourceId when the selected item leaves the filtered list.
  // Skipped while a pending selection is in-flight to avoid overriding it prematurely.
  useEffect(() => {
    if (filteredResources.length === 0) return;
    if (pendingResourceId) return;
    const currentId = filteredResources.find((r) => getRefId(r) === selectedResourceId);
    if (!currentId) setSelectedResourceId(getRefId(filteredResources[0]));
  }, [filteredResources, selectedResourceId, setSelectedResourceId, pendingResourceId]);

  const selectedRef =
    filteredResources.find((r) => getRefId(r) === selectedResourceId) ?? filteredResources[0];

  let resourceProjectId: string | undefined;
  let dblMatch: (typeof dblResources)[number] | undefined;
  const [isSelecting, setIsSelecting] = useState(false);

  if (isDblResourceReference(selectedRef)) {
    dblMatch = dblResources.find((r) => r.dblEntryUid === selectedRef.id);
    resourceProjectId = dblMatch?.installed ? dblMatch.projectId : undefined;
  } else if (isProjectReference(selectedRef)) {
    resourceProjectId = selectedRef.id;
  }

  // Load PT9-derived marker styles when the displayed resource is a supported commentary.
  // Keyed on the resource's project id (not the user's projectId prop) since the resource is what
  // gets rendered in this iframe.
  useCommentaryMarkerStyles(resourceProjectId);

  // #endregion

  // #region Dynamic title

  let resourceShortName: string | undefined;
  if (isDblResourceReference(selectedRef) && dblMatch?.installed) {
    resourceShortName = dblMatch.displayName;
  } else if (isProjectReference(selectedRef)) {
    resourceShortName = selectedRef?.name;
  }

  const titleKey =
    resourceType === 'ScriptureResource'
      ? '%webView_resourcePanel_bibleTexts_title%'
      : '%webView_resourcePanel_commentaries_title%';
  const titleWithResourceKey =
    resourceType === 'ScriptureResource'
      ? '%webView_resourcePanel_bibleTexts_title_withResource%'
      : '%webView_resourcePanel_commentaries_title_withResource%';

  useEffect(() => {
    const baseTitle = localizedStrings[titleKey];
    if (!baseTitle) return;
    if (resourceShortName) {
      updateWebViewDefinition({
        title: formatReplacementString(localizedStrings[titleWithResourceKey], {
          textName: resourceShortName,
        }),
      });
    } else {
      updateWebViewDefinition({ title: baseTitle });
    }
  }, [
    resourceShortName,
    localizedStrings,
    titleKey,
    titleWithResourceKey,
    updateWebViewDefinition,
  ]);

  // #endregion

  // #region USJ Fetch

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
    EMPTY_USJ,
  );

  const usjFromPdp = !isPlatformError(usjPossiblyError) ? usjPossiblyError : undefined;

  // #endregion

  // #region Text direction

  const [textDirectionPossiblyError] = useProjectSetting(
    resourceProjectId,
    'platform.textDirection',
    DEFAULT_TEXT_DIRECTION,
  );
  const textDirection = useMemo(() => {
    if (isPlatformError(textDirectionPossiblyError)) {
      logger.warn(
        `Error getting text direction setting: ${getErrorMessage(textDirectionPossiblyError)}`,
      );
      return DEFAULT_TEXT_DIRECTION;
    }
    return textDirectionPossiblyError || DEFAULT_TEXT_DIRECTION;
  }, [textDirectionPossiblyError]);

  // #endregion

  // #region Resource picker dialog

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
      setIsSelecting(true);
      try {
        await selectTextConnection(
          resource,
          adminResourceList,
          setAdminResourceTexts,
          getCanWriteProjectSettings,
          getUserResourceTexts,
          setUserResourceTexts,
          dblResourcesProvider
            ? async (dblEntryUid) => {
                try {
                  await dblResourcesProvider.installDblResource(dblEntryUid);
                  setFetchResources(true);
                } catch (e: unknown) {
                  papi.notifications.send({
                    message: '%webView_selectDblResource_installFailed%',
                    severity: 'error',
                  });
                  logger.warn(
                    `Error installing dbl resource for resource text panel: ${getErrorMessage(e)}`,
                  );
                  throw e;
                }
              }
            : undefined,
          (dblEntryUid: string) => setPendingResourceId(dblEntryUid),
        );
      } finally {
        setIsSelecting(false);
      }
    },
    [
      adminResourceList,
      dblResourcesProvider,
      setAdminResourceTexts,
      getCanWriteProjectSettings,
      getUserResourceTexts,
      setUserResourceTexts,
    ],
  );

  const showResourcePicker = useDialogCallback(
    'platform.resourcePicker',
    useMemo(
      () => ({ resourceType, selectedResourceIds: currentFilteredDblIds, isModal: true }),
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

  // #endregion

  // #region Editor

  // EditorRef requires null initial value per React ref convention
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  const options: EditorOptions = useMemo(
    () => ({
      isReadonly: true,
      hasSpellCheck: false,
      textDirection,
    }),
    [textDirection],
  );

  useEffect(() => {
    if (usjFromPdp) editorRef.current?.setUsj(usjFromPdp);
  }, [usjFromPdp]);

  // #endregion

  // #region Render

  const emptyStatePromptKey =
    resourceType === 'ScriptureResource'
      ? '%webView_resourcePanel_bibleTexts_emptyState_prompt%'
      : '%webView_resourcePanel_commentaries_emptyState_prompt%';

  const pickButtonKey =
    resourceType === 'ScriptureResource'
      ? '%webView_resourcePanel_bibleTexts_pick%'
      : '%webView_resourcePanel_commentaries_pick%';

  if (!projectId) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <p>{localizedStrings['%webView_resourcePanel_noProject%']}</p>
      </div>
    );
  }

  // Also shows spinner for if loading resources, except if there is no resources then it should
  // directly show the button to pick a resource bellow
  if (!effectiveResources || (isLoadingResources && filteredResources.length !== 0)) {
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
  if (isSelecting) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:gap-2 tw:p-8 tw:text-center">
        <Spinner />
        <span>{localizedStrings['%webView_resourcePanel_selecting%']}</span>
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
      <ResourceSelectorDropdown
        filteredResources={filteredResources}
        selectedRef={selectedRef}
        dblResources={dblResources}
        onSelectResource={setSelectedResourceId}
        onShowResourcePicker={showResourcePicker}
        downloadResourcesLabel={localizedStrings['%webView_resourcePanel_downloadResources%']}
      />

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

  // #endregion
};
