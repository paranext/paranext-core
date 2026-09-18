import { useCallback, useId, useState } from 'react';
import { formatReplacementString } from 'platform-bible-utils';
import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReference } from 'platform-scripture';
import {
  Alert,
  AlertDescription,
  Button,
  Checkbox,
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  EmptyState,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useTruncationTooltip,
} from 'platform-bible-react';
import { ResourcePickerDialog } from 'platform-bible-react/experimental';
import type { ResourcePickerDialogLocalizedStrings } from 'platform-bible-react/experimental';
import { ChevronDown, X } from 'lucide-react';

// Tailwind arbitrary-value width overrides on PopoverContent (`tw:w-[32rem]`, with or without the
// `!` important modifier) do not take effect in the running app — the class shows up in the DOM but
// no matching CSS rule is generated, even though the same syntax works in Storybook's build. An
// inline style sidesteps the class-generation/tailwind-merge dependency entirely and is guaranteed
// to apply. Sized to match ResourcePickerDialog's own Storybook decorator (560x600) so the resource
// list has room to show many entries and scroll within a bounded area instead of growing unbounded.
const RESOURCE_PICKER_POPOVER_STYLE = { width: 560, maxHeight: 400 };

/**
 * Floor for the three-column card, shared by the loaded dialog and the skeleton it replaces.
 *
 * The modal host sizes the dialog from its content, so without a floor a loading state — which has
 * no rows yet — collapses the whole dialog to a ~30px sliver showing only the close button, plays
 * the open animation at that height, then snaps to full size once the settings arrive. Pinning both
 * states to one height makes the wait a fill-in rather than a resize.
 *
 * The number is the measured height of the settled card — the tallest column (tabs, a resource row,
 * the default-tab label pair and select, and the text-collection hint) plus the card's own padding
 * — rather than a sum this file can compute, since most of those rows are sized by the design
 * system. Re-measure it if the card's row structure changes; otherwise the skeleton and the loaded
 * card stop agreeing and the resize this constant exists to prevent comes back.
 */
const RESOURCE_CARD_MIN_HEIGHT = 257;

export type TeamLayoutActiveTab =
  | 'ScriptureResource'
  | 'CommentaryResource'
  | 'Comments'
  | 'TextCollection';

export type TeamLayoutResult = {
  modelText: ResourceReference | undefined;
  activeTab: TeamLayoutActiveTab | undefined;
  scriptureResources: ResourceReference[];
  commentaryResources: ResourceReference[];
  isStructureProtectedForTeam: boolean;
};

export const TEAM_LAYOUT_DIALOG_STRING_KEYS = Object.freeze([
  '%shareLayoutDialog_teamLayout_title%',
  '%shareLayoutDialog_reviewAndSyncNotice%',
  '%shareLayoutDialog_modelText_label%',
  '%shareLayoutDialog_modelText_none%',
  '%shareLayoutDialog_teamLock_label%',
  '%shareLayoutDialog_activeTab_label%',
  '%shareLayoutDialog_activeTab_sublabel%',
  '%shareLayoutDialog_activeTab_none%',
  '%shareLayoutDialog_activeTab_scriptureResource%',
  '%shareLayoutDialog_activeTab_commentaryResource%',
  '%shareLayoutDialog_activeTab_comments%',
  '%shareLayoutDialog_activeTab_textCollection%',
  '%shareLayoutDialog_tab_scriptureResources%',
  '%shareLayoutDialog_tab_commentaryResources%',
  '%shareLayoutDialog_manageScriptureResources_label%',
  '%shareLayoutDialog_manageCommentaryResources_label%',
  '%shareLayoutDialog_textCollection_hint%',
  '%shareLayoutDialog_resources_empty%',
  '%shareLayoutDialog_shownByDefault_label%',
  '%shareLayoutDialog_cancel_label%',
  '%shareLayoutDialog_loading_label%',
  '%shareLayoutDialog_closePicker_label%',
  '%shareLayoutDialog_saveForTeam_label%',
  '%shareLayoutDialog_hiddenResources_loadError%',
  '%shareLayoutDialog_hiddenResources_unavailable%',
  '%shareLayoutDialog_retry%',
] as const);

export type TeamLayoutDialogLocalizedStrings = {
  [key in (typeof TEAM_LAYOUT_DIALOG_STRING_KEYS)[number]]?: string;
};

export type TeamLayoutDialogContentProps = {
  initialModelText: ResourceReference | undefined;
  initialActiveTab: TeamLayoutActiveTab | undefined;
  initialScriptureResources: ResourceReference[];
  initialCommentaryResources: ResourceReference[];
  /**
   * Whether the project's USFM structure is currently locked for the whole team. Snapshotted at
   * mount like every other list here; {@link TeamLayoutDialogContentProps.onConfirm} reports the
   * edited value, and cancelling discards it.
   */
  initialIsStructureProtectedForTeam: boolean;
  /**
   * Display name of the project this layout is being set for, shown as the middle column's heading.
   * `undefined` while the name is unavailable, in which case the heading is omitted rather than
   * showing a placeholder that could be mistaken for a project called "Unknown".
   */
  projectName: string | undefined;
  allResources: DblResourceData[];
  isResourcesLoading: boolean;
  /** Whether loading `allResources` failed; forwarded to every embedded resource picker. */
  hasResourcesError: boolean;
  /** Re-runs the resource fetch; forwarded to every embedded resource picker. */
  onRetryResources: () => void;
  /** Whether this installation cannot download resources at all; forwarded to every picker. */
  areDownloadsUnavailable: boolean;
  /**
   * How many saved resource references this dialog cannot display, because classifying them needs a
   * DBL catalog it does not have. They are preserved on confirm; the count is what turns an
   * unexplained short list into a stated one.
   */
  hiddenResourceCount: number;
  resourcePickerLocalizedStrings: ResourcePickerDialogLocalizedStrings;
  localizedStrings: TeamLayoutDialogLocalizedStrings;
  onConfirm: (result: TeamLayoutResult) => void;
  onCancel: () => void;
};

function localizeString(
  strings: TeamLayoutDialogLocalizedStrings,
  key: keyof TeamLayoutDialogLocalizedStrings,
) {
  return strings[key] ?? key;
}

function referenceKey(ref: ResourceReference): string {
  if ('id' in ref && typeof ref.id === 'string') return `${ref.type}:${ref.id}`;
  return `${ref.type}:${referenceName(ref)}`;
}

/**
 * Extracts a display name from a `ResourceReference`. All known reference variants carry a `name:
 * string`; the catch-all `UnknownResourceReference` variant types its properties via an index
 * signature (`[key: string]: unknown`), so `ref.name` on the union widens to `unknown` — narrow it
 * back to `string` here, falling back to the type discriminant for the unknown-variant case.
 */
function referenceName(ref: ResourceReference): string {
  const { name } = ref;
  return typeof name === 'string' ? name : ref.type;
}

/** Narrows a `ResourceReference` to the variants that carry a string `id`, without a type assertion. */
function hasStringId(ref: ResourceReference): ref is Extract<ResourceReference, { id: string }> {
  return 'id' in ref && typeof ref.id === 'string';
}

/**
 * Formats a resource for display as `FULL NAME (SHORT_NAME)`, looking the full name up from the
 * cached DBL catalog by id. Falls back to just the short name when the reference has no id, or the
 * id isn't found in the currently-loaded catalog (e.g. an uncached resource, or a non-dbl reference
 * type).
 */
function formatResourceDisplayName(
  ref: ResourceReference,
  allResources: DblResourceData[],
): string {
  const shortName = referenceName(ref);
  if (!hasStringId(ref)) return shortName;
  const match = allResources.find((r) => r.dblEntryUid === ref.id);
  if (!match) return shortName;
  return `${match.fullName} (${match.displayName})`;
}

function toResourceReference(resource: DblResourceData): ResourceReference {
  return { type: 'dblResource', name: resource.displayName, id: resource.dblEntryUid };
}

export function isTeamLayoutActiveTab(value: string): value is TeamLayoutActiveTab {
  return (
    value === 'ScriptureResource' ||
    value === 'CommentaryResource' ||
    value === 'Comments' ||
    value === 'TextCollection'
  );
}

type TabKey = 'ScriptureResource' | 'CommentaryResource';

/**
 * The dialog at its real size with its content not yet arrived. Rendered while the project settings
 * and the resource catalog are still in flight — see the mount gate in `team-layout.dialog.tsx` for
 * why the real content cannot mount before then.
 *
 * Shows the actual title and description rather than placeholders for them: both are available
 * immediately, and they are what tells the reader which dialog they just opened.
 */
export function TeamLayoutDialogSkeleton({
  localizedStrings: strings,
}: {
  localizedStrings: TeamLayoutDialogLocalizedStrings;
}) {
  return (
    <>
      <DialogHeader className="tw:p-4 tw:pb-0">
        <DialogTitle>{localizeString(strings, '%shareLayoutDialog_teamLayout_title%')}</DialogTitle>
        <DialogDescription>
          {localizeString(strings, '%shareLayoutDialog_reviewAndSyncNotice%')}
        </DialogDescription>
      </DialogHeader>

      <div className="tw:flex tw:min-h-0 tw:flex-col tw:gap-4 tw:overflow-hidden tw:p-4">
        <div
          className="tw:shrink-0 tw:overflow-hidden tw:rounded-xl tw:border tw:bg-muted/30"
          style={{ minHeight: RESOURCE_CARD_MIN_HEIGHT }}
          // One busy region for the whole card, so a screen reader announces the dialog as loading
          // once instead of once per placeholder bar. `role` is required for the label to be
          // announced at all; `aria-busy` alone conveys nothing without one.
          role="status"
          aria-busy="true"
          aria-label={localizeString(strings, '%shareLayoutDialog_loading_label%')}
        >
          <div className="tw:grid tw:items-stretch tw:divide-y tw:divide-border tw:md:grid-cols-3 tw:md:divide-x tw:md:divide-y-0">
            {['modelText', 'editor', 'resources'].map((column) => (
              <div key={column} className="tw:flex tw:min-w-0 tw:flex-col tw:gap-3 tw:px-4 tw:py-3">
                <div
                  className="tw:h-4 tw:w-28 tw:animate-pulse tw:rounded tw:bg-muted"
                  aria-hidden
                />
                <div
                  className="tw:h-8 tw:w-full tw:animate-pulse tw:rounded tw:bg-muted"
                  aria-hidden
                />
                <div
                  className="tw:h-4 tw:w-2/3 tw:animate-pulse tw:rounded tw:bg-muted"
                  aria-hidden
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The real actions, disabled. Keeping them in place is what stops the footer appearing from
          nowhere and shifting the dialog when the content lands. */}
      <div className="tw:flex tw:justify-end tw:gap-2 tw:p-4">
        <Button variant="outline" disabled>
          {localizeString(strings, '%shareLayoutDialog_cancel_label%')}
        </Button>
        <Button disabled>{localizeString(strings, '%shareLayoutDialog_saveForTeam_label%')}</Button>
      </div>
    </>
  );
}

export function TeamLayoutDialogContent({
  initialModelText,
  initialActiveTab,
  initialScriptureResources,
  initialCommentaryResources,
  initialIsStructureProtectedForTeam,
  projectName,
  allResources,
  isResourcesLoading,
  hasResourcesError,
  onRetryResources,
  areDownloadsUnavailable,
  hiddenResourceCount,
  resourcePickerLocalizedStrings,
  localizedStrings: strings,
  onConfirm,
  onCancel,
}: TeamLayoutDialogContentProps) {
  const [modelText, setModelText] = useState(initialModelText);
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [scriptureResources, setScriptureResources] = useState(initialScriptureResources);
  const [commentaryResources, setCommentaryResources] = useState(initialCommentaryResources);
  const [isStructureProtectedForTeam, setIsStructureProtectedForTeam] = useState(
    initialIsStructureProtectedForTeam,
  );
  const [isModelTextPickerOpen, setIsModelTextPickerOpen] = useState(false);
  const [openAddPickerTab, setOpenAddPickerTab] = useState<TabKey | undefined>(undefined);
  // Which resource tab the admin is looking at right now. Deliberately NOT the same thing as
  // `activeTab`, which is the tab the TEAM will land on and is a saved setting.
  const [visibleResourceTab, setVisibleResourceTab] = useState<TabKey>('ScriptureResource');
  // The default-tab Select has no <label>, so name and describe it from the two spans beside it.
  const activeTabLabelId = useId();
  const activeTabSublabelId = useId();
  // Same for the team-lock switch, which is named by the text beside it.
  const teamLockLabelId = useId();
  // The project-name heading truncates, so hovering a clipped one reveals the whole name.
  const {
    ref: projectNameRef,
    open: isProjectNameTooltipOpen,
    onPointerEnter: onProjectNamePointerEnter,
    onPointerLeave: onProjectNamePointerLeave,
  } = useTruncationTooltip<HTMLSpanElement>();

  // Any open picker dims and blurs the dialog behind it, so the picker reads as the surface in
  // focus rather than as a panel floating over equally-live content.
  const isAnyPickerOpen = isModelTextPickerOpen || openAddPickerTab !== undefined;

  const handleSelectModelText = useCallback((resource: DblResourceData) => {
    setModelText(toResourceReference(resource));
    setIsModelTextPickerOpen(false);
  }, []);

  const handleTogglePickedResource = useCallback((tab: TabKey, resource: DblResourceData) => {
    const newRef = toResourceReference(resource);
    const setResources =
      tab === 'ScriptureResource' ? setScriptureResources : setCommentaryResources;
    setResources((existing) => {
      const isAlreadyIncluded = existing.some(
        (item) => referenceKey(item) === referenceKey(newRef),
      );
      if (isAlreadyIncluded) {
        return existing.filter((item) => referenceKey(item) !== referenceKey(newRef));
      }
      return [...existing, newRef];
    });
  }, []);

  // Both scripture resources and commentaries are selectable to be in the text collection.
  const handleToggleShownByDefault = useCallback(
    (tab: TabKey, ref: ResourceReference, checked: boolean) => {
      const setResources =
        tab === 'ScriptureResource' ? setScriptureResources : setCommentaryResources;
      setResources((existing) =>
        existing.map((item) =>
          referenceKey(item) === referenceKey(ref)
            ? { ...item, isInTextCollection: checked }
            : item,
        ),
      );
    },
    [],
  );

  const handleConfirm = useCallback(() => {
    onConfirm({
      modelText,
      activeTab,
      scriptureResources,
      commentaryResources,
      isStructureProtectedForTeam,
    });
  }, [
    modelText,
    activeTab,
    scriptureResources,
    commentaryResources,
    isStructureProtectedForTeam,
    onConfirm,
  ]);

  // What the hint under the tabs reports. Counted across BOTH tabs, since the text collection is
  // one list drawn from two — which is exactly the fact a per-tab count would hide.
  const textCollectionCount = [...scriptureResources, ...commentaryResources].filter(
    (ref) => ref.isInTextCollection,
  ).length;

  const manageLabelKey: Record<TabKey, keyof TeamLayoutDialogLocalizedStrings> = {
    ScriptureResource: '%shareLayoutDialog_manageScriptureResources_label%',
    CommentaryResource: '%shareLayoutDialog_manageCommentaryResources_label%',
  };

  // Dedicated keys rather than the `activeTab_*` ones the Default-tab select uses: the two controls
  // happen to read alike today, but they are different sentences in different places, and sharing a
  // key means rewording one silently rewords the other.
  const tabLabelKey: Record<TabKey, keyof TeamLayoutDialogLocalizedStrings> = {
    ScriptureResource: '%shareLayoutDialog_tab_scriptureResources%',
    CommentaryResource: '%shareLayoutDialog_tab_commentaryResources%',
  };

  const renderResourceTabContent = (tab: TabKey, resources: ResourceReference[]) => (
    <TabsContent
      key={tab}
      value={tab}
      className="tw:flex tw:min-w-0 tw:flex-col tw:gap-3 tw:outline-none"
    >
      <Popover
        // Modal so the dimmed dialog behind the picker is genuinely inert: focus is trapped in the
        // picker and the content under the scrim is hidden from assistive technology, matching what
        // the scrim says. A non-modal picker leaves every control behind it Tab-reachable.
        modal
        open={openAddPickerTab === tab}
        onOpenChange={(open) => setOpenAddPickerTab(open ? tab : undefined)}
      >
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="tw:w-full">
            {localizeString(strings, manageLabelKey[tab])}
          </Button>
        </PopoverTrigger>
        {/* Opened from the LAST column, so the picker body sits to the trigger's start side and
            opens inward across the dialog rather than off its trailing edge. The picker is far
            wider than its trigger, so `align` decides which way it overhangs: `end` pins its
            trailing edge to the trigger's and lets it grow inward. Direction-aware, so this stays
            inward in RTL too. */}
        <PopoverContent className="tw:p-0" align="end" style={RESOURCE_PICKER_POPOVER_STYLE}>
          {/* flex/h-full/min-h-0 so this fills the fixed-height PopoverContent above, giving
            ResourcePickerDialog's internal `flex-1 overflow-y-auto` list a bounded height to scroll
            within instead of growing to fit every resource. */}
          <div className="tw:relative tw:flex tw:h-full tw:min-h-0 tw:flex-col">
            {/* No tooltip on this one. The popover opens underneath a stationary cursor, so the
                button renders already hovered and Radix would show a tooltip without the reader
                ever pointing at anything — and with the pointer never moving, no pointerleave
                follows, so it would sit over the dialog indefinitely. An X carries its own meaning;
                the accessible name is on the button where screen readers want it anyway. */}
            <Button
              variant="ghost"
              size="icon"
              className="tw:absolute tw:end-2 tw:top-2 tw:z-10"
              onClick={() => setOpenAddPickerTab(undefined)}
              aria-label={localizeString(strings, '%shareLayoutDialog_closePicker_label%')}
            >
              <X className="tw:size-4" aria-hidden />
            </Button>
            {/*
                ResourcePickerDialog renders its own DialogTitle internally but has no Dialog.Root
                of its own by design (it's meant to be embedded in a host-provided Dialog context).
                Since this popover is rendered inside the outer TeamLayoutDialogContent's
                Dialog.Root, wrap it in its own isolated Dialog.Root here so its DialogTitle gets a
                distinct id from the outer dialog's title instead of colliding with it.
              */}
            <Dialog open modal={false}>
              <ResourcePickerDialog
                allResources={allResources}
                isResourcesLoading={isResourcesLoading}
                hasResourcesError={hasResourcesError}
                onRetryResources={onRetryResources}
                areDownloadsUnavailable={areDownloadsUnavailable}
                resourceType={tab}
                selectedResourceIds={resources.filter(hasStringId).map((r) => r.id)}
                localizedStrings={resourcePickerLocalizedStrings}
                allowDeselect
                onSelect={(resource) => handleTogglePickedResource(tab, resource)}
              />
            </Dialog>
          </div>
        </PopoverContent>
      </Popover>

      {/* The text-collection checkboxes live beside the resources they apply to, rather than in a
          combined list further down, so a row's checkbox is read in the tab it will affect. The
          panel lists every resource on the tab, not only the checked ones — what the checkbox means
          is stated once, under the tabs, where it reads as one rule covering both of them. */}
      {resources.length > 0 ? (
        <div className="tw:flex tw:min-w-0 tw:flex-col tw:gap-2">
          {resources.map((ref) => (
            <div key={referenceKey(ref)} className="tw:flex tw:items-center tw:gap-2">
              <Checkbox
                checked={!!ref.isInTextCollection}
                onCheckedChange={(checked: boolean) =>
                  handleToggleShownByDefault(tab, ref, checked)
                }
                aria-label={formatReplacementString(
                  localizeString(strings, '%shareLayoutDialog_shownByDefault_label%'),
                  { resourceName: formatResourceDisplayName(ref, allResources) },
                )}
              />
              <span className="tw:min-w-0 tw:flex-1 tw:truncate tw:text-sm">
                {formatResourceDisplayName(ref, allResources)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        /* An empty tab with nothing in it reads as a failed load rather than as an empty set
           waiting on a choice the admin has not made yet. */
        <EmptyState
          className="tw:text-xs"
          message={localizeString(strings, '%shareLayoutDialog_resources_empty%')}
        />
      )}
    </TabsContent>
  );

  return (
    <>
      <DialogHeader className="tw:p-4 tw:pb-0">
        <DialogTitle>{localizeString(strings, '%shareLayoutDialog_teamLayout_title%')}</DialogTitle>
        <DialogDescription>
          {localizeString(strings, '%shareLayoutDialog_reviewAndSyncNotice%')}
        </DialogDescription>
      </DialogHeader>

      {/* `relative` so the picker scrim below can cover exactly this scrolling region. */}
      <div className="tw:relative tw:flex tw:min-h-0 tw:flex-col tw:gap-4 tw:overflow-y-auto tw:p-4">
        {/* Named here rather than left to the embedded pickers. A picker explains why ITS list is
            empty only once the admin opens it; the rows on this screen are what the dialog promises
            a review of, and a saved resource missing from them is invisible until someone notices it
            is gone. */}
        {hiddenResourceCount > 0 && (
          <Alert className="tw:shrink-0">
            <AlertDescription className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
              <span>
                {formatReplacementString(
                  localizeString(
                    strings,
                    areDownloadsUnavailable
                      ? '%shareLayoutDialog_hiddenResources_unavailable%'
                      : '%shareLayoutDialog_hiddenResources_loadError%',
                  ),
                  { count: hiddenResourceCount },
                )}
              </span>
              {hasResourcesError && (
                <Button variant="outline" size="sm" onClick={onRetryResources}>
                  {localizeString(strings, '%shareLayoutDialog_retry%')}
                </Button>
              )}
            </AlertDescription>
          </Alert>
        )}
        {/* One panel per column the team will see, in the order they appear in the app, so the
            dialog reads as a map of the layout rather than a list of unrelated settings. The middle
            panel stands in for the editor: it is headed by the project being edited, and carries
            the one setting that governs that editor for everyone. Below `md` the three panels would
            be too narrow to hold a resource name, so they stack. */}
        <div
          className="tw:shrink-0 tw:divide-y tw:divide-border tw:overflow-hidden tw:rounded-xl tw:border tw:bg-muted/30"
          style={{ minHeight: RESOURCE_CARD_MIN_HEIGHT }}
        >
          <div className="tw:grid tw:items-stretch tw:divide-y tw:divide-border tw:md:grid-cols-3 tw:md:divide-x tw:md:divide-y-0">
            <div className="tw:flex tw:min-w-0 tw:flex-col tw:gap-3 tw:px-4 tw:py-3">
              <span className="tw:font-medium">
                {localizeString(strings, '%shareLayoutDialog_modelText_label%')}
              </span>
              {/* Modal for the same reason as the tab picker above. */}
              <Popover modal open={isModelTextPickerOpen} onOpenChange={setIsModelTextPickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="tw:w-full tw:justify-between tw:gap-2 tw:font-normal"
                  >
                    <span className="tw:truncate">
                      {modelText
                        ? formatResourceDisplayName(modelText, allResources)
                        : localizeString(strings, '%shareLayoutDialog_modelText_none%')}
                    </span>
                    <ChevronDown
                      className="tw:size-4 tw:shrink-0 tw:text-muted-foreground"
                      aria-hidden
                    />
                  </Button>
                </PopoverTrigger>
                {/*
                  Opened from the FIRST column, so the picker body sits to the trigger's end side
                  and opens inward across the dialog rather than off its leading edge. See the tab
                  picker for the mirrored case.

                  Wrapped in its own Dialog.Root so its internal DialogTitle gets a distinct id from
                  the outer dialog's title — see the comment on the tab picker.
                */}
                <PopoverContent
                  className="tw:p-0"
                  align="start"
                  style={RESOURCE_PICKER_POPOVER_STYLE}
                >
                  <Dialog open modal={false}>
                    <ResourcePickerDialog
                      allResources={allResources}
                      isResourcesLoading={isResourcesLoading}
                      hasResourcesError={hasResourcesError}
                      onRetryResources={onRetryResources}
                      areDownloadsUnavailable={areDownloadsUnavailable}
                      resourceType="ScriptureResource"
                      selectedResourceIds={
                        modelText && hasStringId(modelText) ? [modelText.id] : []
                      }
                      localizedStrings={resourcePickerLocalizedStrings}
                      onSelect={handleSelectModelText}
                    />
                  </Dialog>
                </PopoverContent>
              </Popover>
            </div>

            {/* The editor, stood in for by the project it edits. Headed by the project name in the
                same slot the other columns put their heading, so the three read as one row of
                column headings rather than as two labels and a stray field. */}
            <div className="tw:flex tw:min-w-0 tw:flex-col tw:gap-3 tw:px-4 tw:py-3">
              {projectName && (
                /* No `delayDuration`: `open` is fully controlled by `useTruncationTooltip`, so the
                   tooltip appears only when the heading is actually clipped. */
                <TooltipProvider>
                  <Tooltip open={isProjectNameTooltipOpen}>
                    <TooltipTrigger asChild>
                      <span
                        ref={projectNameRef}
                        className="tw:truncate tw:font-medium"
                        onPointerEnter={onProjectNamePointerEnter}
                        onPointerLeave={onProjectNamePointerLeave}
                      >
                        {projectName}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{projectName}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {/* A switch rather than a pair of Yes/No pills: the lock is one boolean, and a switch
                  carries its state in the control itself instead of in which of two identical pills
                  happens to be pressed. */}
              <div className="tw:flex tw:min-w-0 tw:items-center tw:gap-2">
                <Switch
                  checked={isStructureProtectedForTeam}
                  onCheckedChange={setIsStructureProtectedForTeam}
                  aria-labelledby={teamLockLabelId}
                />
                <span className="tw:text-sm" id={teamLockLabelId}>
                  {localizeString(strings, '%shareLayoutDialog_teamLock_label%')}
                </span>
              </div>
            </div>

            {/* Column three carries two resource types the team sees as tabs, so it shows them as
                tabs here too. The default-tab choice and the text-collection rule sit at the foot
                of this column because both are statements about the column as a whole, not about
                whichever tab happens to be open. */}
            <div className="tw:flex tw:min-w-0 tw:flex-col tw:gap-3 tw:px-4 tw:py-3">
              <Tabs
                value={visibleResourceTab}
                onValueChange={(value) => {
                  if (value === 'ScriptureResource' || value === 'CommentaryResource')
                    setVisibleResourceTab(value);
                }}
              >
                <TabsList>
                  <TabsTrigger value="ScriptureResource">
                    {localizeString(strings, tabLabelKey.ScriptureResource)}
                  </TabsTrigger>
                  <TabsTrigger value="CommentaryResource">
                    {localizeString(strings, tabLabelKey.CommentaryResource)}
                  </TabsTrigger>
                </TabsList>
                {renderResourceTabContent('ScriptureResource', scriptureResources)}
                {renderResourceTabContent('CommentaryResource', commentaryResources)}
              </Tabs>

              {/* `mt-auto` pins these to the foot of the column however tall the open tab is, so
                  they do not walk up and down the card as tabs with different row counts are
                  selected. The rule above them separates two statements about the whole column
                  from the one tab's rows, which otherwise read as more rows in the same list. */}
              <div className="tw:mt-auto tw:flex tw:min-w-0 tw:flex-col tw:gap-3 tw:border-t tw:border-border tw:pt-4">
                {/* Stacked rather than label-beside-control: this column is a third of the dialog
                    and also the busiest, so a side-by-side row squeezed the select down to a width
                    that truncated every option. */}
                <div className="tw:flex tw:min-w-0 tw:flex-col tw:gap-1.5">
                  <div className="tw:flex tw:min-w-0 tw:flex-col">
                    <span className="tw:font-medium" id={activeTabLabelId}>
                      {localizeString(strings, '%shareLayoutDialog_activeTab_label%')}
                    </span>
                    <span className="tw:text-xs tw:text-muted-foreground" id={activeTabSublabelId}>
                      {localizeString(strings, '%shareLayoutDialog_activeTab_sublabel%')}
                    </span>
                  </div>
                  <Select
                    value={activeTab}
                    onValueChange={(value) => {
                      if (isTeamLayoutActiveTab(value)) setActiveTab(value);
                    }}
                  >
                    <SelectTrigger
                      className="tw:h-8 tw:w-full tw:bg-background"
                      aria-labelledby={activeTabLabelId}
                      aria-describedby={activeTabSublabelId}
                    >
                      <SelectValue
                        placeholder={localizeString(strings, '%shareLayoutDialog_activeTab_none%')}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ScriptureResource">
                        {localizeString(strings, '%shareLayoutDialog_activeTab_scriptureResource%')}
                      </SelectItem>
                      <SelectItem value="CommentaryResource">
                        {localizeString(
                          strings,
                          '%shareLayoutDialog_activeTab_commentaryResource%',
                        )}
                      </SelectItem>
                      <SelectItem value="Comments">
                        {localizeString(strings, '%shareLayoutDialog_activeTab_comments%')}
                      </SelectItem>
                      <SelectItem value="TextCollection">
                        {localizeString(strings, '%shareLayoutDialog_activeTab_textCollection%')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Always shown, including at zero: the count is the only place the dialog says
                    the text collection draws from both tabs at once, and a rule that disappears
                    when it is not yet satisfied never teaches anyone what the checkboxes do. */}
                <span className="tw:text-xs tw:text-muted-foreground">
                  {formatReplacementString(
                    localizeString(strings, '%shareLayoutDialog_textCollection_hint%'),
                    { count: textCollectionCount },
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dims and blurs the dialog while a picker is open. Local to the dialog's own stacking
            context — the picker portals to `document.body` at `Z_INDEX_ABOVE_DOCK` and never
            competes with this — so a plain low z-index is correct here and a scale tier is not.
            Purely visual: the pickers are modal, so what makes the content behind them inert is
            Radix's own focus trap and outside-pointer handling, not this element. Deliberately left
            hit-testable so a click on it still reads as an outside click and closes the picker. */}
        {isAnyPickerOpen && (
          <div
            className="tw:absolute tw:inset-0 tw:z-10 tw:bg-background/50 tw:backdrop-blur-sm"
            aria-hidden
            data-testid="resource-picker-scrim"
          />
        )}
      </div>

      <div className="tw:flex tw:justify-end tw:gap-2 tw:p-4">
        <Button variant="outline" onClick={onCancel}>
          {localizeString(strings, '%shareLayoutDialog_cancel_label%')}
        </Button>
        <Button onClick={handleConfirm}>
          {localizeString(strings, '%shareLayoutDialog_saveForTeam_label%')}
        </Button>
      </div>
    </>
  );
}

export default TeamLayoutDialogContent;
