import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { formatReplacementString } from 'platform-bible-utils';
import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReference } from 'platform-scripture';
import {
  Alert,
  AlertDescription,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EmptyState,
  Label,
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
  Z_INDEX_NESTED_MODAL,
  Z_INDEX_NESTED_MODAL_BACKDROP,
} from 'platform-bible-react';
import { focusResourcePickerOnOpen, ResourcePickerDialog } from 'platform-bible-react/experimental';
import type { ResourcePickerDialogLocalizedStrings } from 'platform-bible-react/experimental';
import { ChevronDown, X } from 'lucide-react';
// Provides `overlay-modal-backdrop`, the 40%-black backdrop `OverlayModalDialog` gives this
// dialog. The nested pickers below reuse it so both layers dim by the same amount; see
// `RESOURCE_PICKER_OVERLAY_CLASS`.
import '@renderer/components/overlays/overlay-modal-dialog.component.scss';

/**
 * Shape of an embedded picker modal, layered over this dialog.
 *
 * The height cap restates the one `OverlayModalDialog` computes from `TEAM_LAYOUT_DIALOG`'s
 * `initialSize.height` in `team-layout.dialog.tsx` — a hand-kept copy, since a class name cannot
 * read it. Change one and change the other. It exists so a full catalog scrolls inside
 * `ResourcePickerDialog`'s own `flex-1 overflow-y-auto` list rather than growing the picker taller
 * than the dialog it covers. A bare `85vh` is not a cap relative to the host: on a 1080p display it
 * is ~918px against the host's 720px, so the picker overhangs at both ends.
 *
 * The width is `sm:max-w-xl` (36rem) against `DialogContent`'s `sm:max-w-sm` default (24rem) — 50%
 * wider — so four columns fit; expressed as a scale token rather than a pixel count.
 */
const RESOURCE_PICKER_DIALOG_CLASS =
  'tw:flex tw:max-h-[min(720px,85vh)] tw:min-h-0 tw:flex-col tw:gap-0 tw:overflow-hidden tw:p-0 tw:sm:max-w-xl';

/**
 * Backdrop for an embedded picker.
 *
 * `DialogOverlay`'s default is `bg-black/10`, a quarter of the 40% black `OverlayModalDialog` gives
 * the dialog these pickers open over. At 10% the picker's own backdrop lands on top of this dialog
 * without visibly dimming it, so the dialog still reads as live while Radix holds it inert — the
 * exact effect the nested tier exists to prevent. Reusing the host's own class rather than
 * restating the value keeps the two from drifting apart.
 */
const RESOURCE_PICKER_OVERLAY_CLASS = 'overlay-modal-backdrop';

/**
 * The `SelectItem` value standing for "no default tab".
 *
 * Radix forbids `value=""` on a `SelectItem`, and the persisted representation of this state IS the
 * empty string, so the two cannot be the same token. Mapped back to `undefined` on the way out.
 */
const NO_ACTIVE_TAB_VALUE = 'none';

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
  '%shareLayoutDialog_teamLock_description%',
  '%shareLayoutDialog_teamLock_label%',
  '%shareLayoutDialog_teamLock_loadError%',
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
  '%shareLayoutDialog_saveFailed%',
  '%shareLayoutDialog_saveForTeam_label%',
  '%shareLayoutDialog_saving_label%',
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
   * Whether the team structure lock could not be read. When true the lock switch is disabled and
   * explains itself, and {@link TeamLayoutDialogContentProps.onConfirm} reports the value it was
   * mounted with, so a failed read is never written back over the real setting.
   */
  isTeamLockUnknown: boolean;
  /**
   * Whether the last save attempt was refused — most often by the Send/Receive write gate during an
   * automatic sync. The dialog stays open and says so rather than closing as though it had saved.
   */
  hasSaveError: boolean;
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
  /**
   * How many of those undisplayable references are flagged into the text collection. They are
   * round-tripped by Confirm rather than dropped, so they count toward what the team will actually
   * see and must be included in the hint's total.
   */
  hiddenInTextCollectionCount: number;
  resourcePickerLocalizedStrings: ResourcePickerDialogLocalizedStrings;
  localizedStrings: TeamLayoutDialogLocalizedStrings;
  /**
   * Reports whether the admin has changed anything since mount. The host uses it to decide whether
   * a late-arriving resource catalog may re-seed this body — a remount discards the `useState`
   * snapshots every control here edits, so it is only safe while nothing has been edited.
   */
  onDirtyChange?: (isDirty: boolean) => void;
  onConfirm: (result: TeamLayoutResult) => Promise<void> | void;
  onCancel: () => void;
};

function localizeString(
  strings: TeamLayoutDialogLocalizedStrings,
  key: keyof TeamLayoutDialogLocalizedStrings,
) {
  return strings[key] ?? key;
}

function referenceKey(reference: ResourceReference): string {
  if (hasStringId(reference)) return `${reference.type}:${reference.id}`;
  return `${reference.type}:${referenceName(reference)}`;
}

/**
 * Extracts a display name from a `ResourceReference`. All known reference variants carry a `name:
 * string`; the catch-all `UnknownResourceReference` variant types its properties via an index
 * signature (`[key: string]: unknown`), so `ref.name` on the union widens to `unknown` — narrow it
 * back to `string` here, falling back to the type discriminant for the unknown-variant case.
 */
function referenceName(reference: ResourceReference): string {
  const { name } = reference;
  return typeof name === 'string' ? name : reference.type;
}

/** Narrows a `ResourceReference` to the variants that carry a string `id`, without a type assertion. */
function hasStringId(
  reference: ResourceReference,
): reference is Extract<ResourceReference, { id: string }> {
  return 'id' in reference && typeof reference.id === 'string';
}

/**
 * Formats a resource for display as `FULL NAME (SHORT_NAME)`, looking the full name up from the
 * cached DBL catalog by id. Falls back to just the short name when the reference has no id, or the
 * id isn't found in the currently-loaded catalog (e.g. an uncached resource, or a non-dbl reference
 * type).
 *
 * Takes a `Map` rather than the catalog array because the catalog runs to a couple of thousand rows
 * and this is called twice per resource row (the label and the checkbox's accessible name), for
 * BOTH tabs on every render — a linear scan there is tens of thousands of comparisons per
 * keystroke.
 */
function formatResourceDisplayName(
  reference: ResourceReference,
  resourcesByUid: Map<string, DblResourceData>,
): string {
  const shortName = referenceName(reference);
  if (!hasStringId(reference)) return shortName;
  const match = resourcesByUid.get(reference.id);
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
 * Close button for an embedded picker modal, replacing the one `DialogContent` builds in. Every
 * picker here opts out of the built-in (`showCloseButton={false}`) because its screen-reader label
 * is a hardcoded English "Close" that no consumer can translate, and these dialogs already ship a
 * localized string for it.
 *
 * Rendered after the picker in DOM order so it comes last in the tab order rather than first. Where
 * focus actually lands on open is stated by `focusResourcePickerOnOpen`, not inferred from this
 * ordering — the picker disables its search box whenever there is nothing to filter, and DOM order
 * alone would put a keyboard user on "leave" in exactly that state.
 *
 * It carries a hover tooltip, which the picker could not when it was a popover: a popover opens
 * anchored under the pointer that opened it, so this button rendered already hovered and showed a
 * tooltip nobody pointed at. A modal is centered instead, well away from the trigger, so the
 * tooltip only appears when someone actually points at the button.
 *
 * This is a local workaround, not the fix: the untranslated label lives in `DialogContent` itself,
 * so every dialog in the app carries it. Giving `DialogContent` a `closeButtonLabel` prop would
 * retire this component. TODO(PT-4675): drop `PickerCloseButton` once `DialogContent` takes a
 * `closeButtonLabel`.
 */
function PickerCloseButton({ label, onClose }: { label: string; onClose: () => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="tw:absolute tw:end-2 tw:top-2 tw:z-10"
            onClick={onClose}
            aria-label={label}
          >
            <X className="tw:size-4" aria-hidden />
          </Button>
        </TooltipTrigger>
        {/* The same string as the button's `aria-label`, so a screen reader hears it as the name
            and again as the description. That duplication is Radix's own wiring for a tooltip on an
            icon button — Tooltip renders a visually-hidden copy of its content as the trigger's
            description, which `aria-hidden` here cannot reach — and an icon button needs both the
            name and the sighted-user hover label. Left as-is rather than fought. */}
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * One resource in a tab's list: a text-collection checkbox and the resource's display name.
 *
 * Its own component rather than JSX inside the `.map()` because {@link useTruncationTooltip} is a
 * per-instance hook and the list's length varies between renders, so calling it in the loop would
 * break the Rules of Hooks.
 */
function ResourceRow({
  displayName,
  checkboxLabel,
  isInTextCollection,
  onToggleInTextCollection,
}: {
  displayName: string;
  checkboxLabel: string;
  isInTextCollection: boolean;
  onToggleInTextCollection: (checked: boolean) => void;
}) {
  const { ref, open, onPointerEnter, onPointerLeave } = useTruncationTooltip<HTMLSpanElement>();
  return (
    <div className="tw:flex tw:items-center tw:gap-2">
      <Checkbox
        checked={isInTextCollection}
        onCheckedChange={onToggleInTextCollection}
        aria-label={checkboxLabel}
      />
      {/* Resource names run 30-50 characters and this column is a third of the dialog, so the name
          is routinely clipped. No `delayDuration`: `open` is fully controlled, so the tooltip
          appears only when the name is actually cut off. */}
      <TooltipProvider>
        <Tooltip open={open}>
          <TooltipTrigger asChild>
            <span
              ref={ref}
              className="tw:min-w-0 tw:flex-1 tw:truncate tw:text-sm"
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
            >
              {displayName}
            </span>
          </TooltipTrigger>
          <TooltipContent>{displayName}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

/**
 * The dialog's Cancel/Save row, shared by {@link TeamLayoutDialogSkeleton} and
 * {@link TeamLayoutDialogContent} so the two states cannot drift in height or in wiring. Handlers
 * are optional: the skeleton renders the same buttons disabled, which is what stops the footer
 * appearing from nowhere and shifting the dialog when the content lands.
 */
function TeamLayoutDialogFooter({
  localizedStrings: strings,
  areStringsLoading = false,
  isSaving = false,
  onCancel,
  onConfirm,
}: {
  localizedStrings: TeamLayoutDialogLocalizedStrings;
  /** See {@link TeamLayoutDialogSkeleton}'s prop of the same name. */
  areStringsLoading?: boolean;
  /**
   * While `true` both buttons are inert and Save says so. The writes are neither atomic nor instant
   * — they can block behind a Send/Receive — so without this the dialog looks identical to before
   * the click: a second click would fire a second concurrent batch that races the first on the save
   * outcome, and a Cancel mid-flight would leave the writes with no dialog to report to.
   */
  isSaving?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}) {
  const text = (key: keyof TeamLayoutDialogLocalizedStrings) =>
    areStringsLoading ? '' : localizeString(strings, key);
  return (
    <div className="tw:flex tw:justify-end tw:gap-2 tw:p-4">
      <Button variant="outline" onClick={onCancel} disabled={!onCancel || isSaving}>
        {text('%shareLayoutDialog_cancel_label%')}
      </Button>
      <Button onClick={onConfirm} disabled={!onConfirm || isSaving}>
        {text(
          isSaving ? '%shareLayoutDialog_saving_label%' : '%shareLayoutDialog_saveForTeam_label%',
        )}
      </Button>
    </div>
  );
}

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
  areStringsLoading,
}: {
  localizedStrings: TeamLayoutDialogLocalizedStrings;
  /**
   * Whether the localization subscription has yet to deliver. `useLocalizedStrings` seeds its state
   * key-to-key, so every `localizeString` call returns the raw `%key%` until then — which this
   * skeleton would otherwise paint as the dialog's title, description and button labels during
   * exactly the window it exists to cover.
   */
  areStringsLoading: boolean;
}) {
  // A `role="status"` region is announced from its text content changing, not from its `aria-label`
  // — and a region mounted together with its text is not reliably announced at all. So the region
  // mounts empty and an effect fills it in once there is a real string to announce, following the
  // same shape as `sync-status-button.component.tsx`. Gated on the strings having landed, or it
  // would announce the raw key.
  const [announcement, setAnnouncement] = useState('');
  useEffect(() => {
    if (areStringsLoading) return;
    setAnnouncement(localizeString(strings, '%shareLayoutDialog_loading_label%'));
  }, [strings, areStringsLoading]);

  // Blank rather than a raw key. The header and footer keep their boxes so the dialog does not
  // resize when the text arrives; only the glyphs wait.
  const text = (key: keyof TeamLayoutDialogLocalizedStrings) =>
    areStringsLoading ? '' : localizeString(strings, key);

  return (
    <>
      <DialogHeader className="tw:p-4 tw:pb-0">
        <DialogTitle>{text('%shareLayoutDialog_teamLayout_title%')}</DialogTitle>
        <DialogDescription>{text('%shareLayoutDialog_reviewAndSyncNotice%')}</DialogDescription>
      </DialogHeader>

      <div className="tw:flex tw:min-h-0 tw:flex-col tw:gap-4 tw:overflow-hidden tw:p-4">
        <div
          className="tw:shrink-0 tw:overflow-hidden tw:rounded-xl tw:border tw:bg-muted/30"
          style={{ minHeight: RESOURCE_CARD_MIN_HEIGHT }}
          // One busy region for the whole card, so a screen reader announces the dialog as loading
          // once instead of once per placeholder bar.
          role="status"
          aria-busy="true"
        >
          <span className="tw:sr-only">{announcement}</span>
          <div className="tw:grid tw:items-stretch tw:divide-y tw:divide-border tw:xl:grid-cols-3 tw:xl:divide-x tw:xl:divide-y-0">
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

      <TeamLayoutDialogFooter localizedStrings={strings} areStringsLoading={areStringsLoading} />
    </>
  );
}

export function TeamLayoutDialogContent({
  initialModelText,
  initialActiveTab,
  initialScriptureResources,
  initialCommentaryResources,
  initialIsStructureProtectedForTeam,
  isTeamLockUnknown,
  hasSaveError,
  projectName,
  allResources,
  isResourcesLoading,
  hasResourcesError,
  onRetryResources,
  areDownloadsUnavailable,
  hiddenResourceCount,
  hiddenInTextCollectionCount,
  resourcePickerLocalizedStrings,
  localizedStrings: strings,
  onDirtyChange,
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
  // Reference equality against the props this body mounted with, which is the same test Confirm
  // applies: the controls here replace these values rather than mutating them, so an untouched
  // field is still the identical object. Reported so the host knows when a remount would cost the
  // admin work — see `onDirtyChange`.
  const isDirty =
    modelText !== initialModelText ||
    activeTab !== initialActiveTab ||
    scriptureResources !== initialScriptureResources ||
    commentaryResources !== initialCommentaryResources ||
    isStructureProtectedForTeam !== initialIsStructureProtectedForTeam;
  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  const [isModelTextPickerOpen, setIsModelTextPickerOpen] = useState(false);
  const [openAddPickerTab, setOpenAddPickerTab] = useState<TabKey | undefined>(undefined);

  // One pair of refs shared by all three `DialogContent`s here — the manage picker renders once per
  // TabKey, plus the model-text picker. Safe because no two can be open at once: opening one
  // requires clicking a trigger that the already-open picker covers, and this dialog is modal. Not
  // because Radix unmounts closed content — `Presence` keeps it mounted through its exit
  // animation, so briefly there really are two.
  // React writes `null` into a detached DOM ref itself, so there is no `undefined` equivalent here.
  /* eslint-disable no-null/no-null */
  const pickerSearchInputRef = useRef<HTMLInputElement | null>(null);
  const pickerContentRef = useRef<HTMLDivElement | null>(null);
  /* eslint-enable no-null/no-null */
  // Which resource tab the admin is looking at right now. Deliberately NOT the same thing as
  // `activeTab`, which is the tab the TEAM will land on and is a saved setting.
  const [visibleResourceTab, setVisibleResourceTab] = useState<TabKey>('ScriptureResource');
  // The default-tab Select has no <label>, so name and describe it from the two spans beside it.
  const activeTabLabelId = useId();
  const activeTabSublabelId = useId();
  const activeTabTriggerId = useId();
  // Ties the team-lock switch to its label and to the explanation under it.
  const teamLockLabelId = useId();
  const teamLockDescriptionId = useId();
  // The project-name heading truncates, so hovering a clipped one reveals the whole name.
  const {
    ref: projectNameRef,
    open: isProjectNameTooltipOpen,
    onPointerEnter: onProjectNamePointerEnter,
    onPointerLeave: onProjectNamePointerLeave,
  } = useTruncationTooltip<HTMLSpanElement>();
  // Same for the model-text trigger, whose label is a full resource display name in a third of the
  // dialog's width. A single instance, so the hook can be called here rather than in a subcomponent.
  const {
    ref: modelTextLabelRef,
    open: isModelTextLabelTooltipOpen,
    onPointerEnter: onModelTextLabelPointerEnter,
    onPointerLeave: onModelTextLabelPointerLeave,
  } = useTruncationTooltip<HTMLSpanElement>();

  // Any open picker dims and blurs the dialog behind it, so the picker reads as the surface in
  // focus rather than as a panel floating over equally-live content.
  const isAnyPickerOpen = isModelTextPickerOpen || openAddPickerTab !== undefined;

  const resourcesByUid = useMemo(
    () => new Map(allResources.map((resource) => [resource.dblEntryUid, resource])),
    [allResources],
  );

  const modelTextLabel = modelText
    ? formatResourceDisplayName(modelText, resourcesByUid)
    : localizeString(strings, '%shareLayoutDialog_modelText_none%');

  // Toggles, like the tab pickers do. "No model text" is a first-class persisted state — the
  // wrapper writes an empty list for it and the trigger names it — so the picker has to be able to
  // reach it. With `allowDeselect`, clicking the already-selected row calls back here with that
  // same resource, which is the deselect.
  const handleSelectModelText = useCallback((resource: DblResourceData) => {
    const newRef = toResourceReference(resource);
    setModelText((existing) =>
      existing && referenceKey(existing) === referenceKey(newRef) ? undefined : newRef,
    );
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
    (tab: TabKey, reference: ResourceReference, checked: boolean) => {
      const setResources =
        tab === 'ScriptureResource' ? setScriptureResources : setCommentaryResources;
      setResources((existing) =>
        existing.map((item) =>
          referenceKey(item) === referenceKey(reference)
            ? { ...item, isInTextCollection: checked }
            : item,
        ),
      );
    },
    [],
  );

  // Mirrors the write in flight. `onConfirm` resolves whether the writes succeeded or failed — the
  // wrapper reports failure through `hasSaveError` — so this is cleared in a `finally`.
  const [isSaving, setIsSaving] = useState(false);
  const handleConfirm = useCallback(async () => {
    setIsSaving(true);
    try {
      await onConfirm({
        modelText,
        activeTab,
        scriptureResources,
        commentaryResources,
        isStructureProtectedForTeam,
      });
    } finally {
      setIsSaving(false);
    }
  }, [
    modelText,
    activeTab,
    scriptureResources,
    commentaryResources,
    isStructureProtectedForTeam,
    onConfirm,
  ]);

  // What the hint under the tabs reports. Counted across BOTH tabs, since the text collection is one
  // list drawn from two — which is exactly the fact a per-tab count would hide.
  //
  // `hiddenInTextCollectionCount` is added because `otherResources` is round-tripped unchanged by
  // Confirm, `isInTextCollection` flags and all: those resources ARE in the team's collection even
  // though this dialog cannot show them. Counting only the two editable lists would report "(0)"
  // over a collection that is about to be saved non-empty.
  const textCollectionCount =
    [...scriptureResources, ...commentaryResources].filter(
      (reference) => reference.isInTextCollection,
    ).length + hiddenInTextCollectionCount;

  const manageLabelKey: Record<TabKey, keyof TeamLayoutDialogLocalizedStrings> = {
    ScriptureResource: '%shareLayoutDialog_manageScriptureResources_label%',
    CommentaryResource: '%shareLayoutDialog_manageCommentaryResources_label%',
  };

  // Dedicated keys rather than the `activeTab_*` ones the Default-tab select uses: the two controls
  // happen to read alike today, but they are different sentences in different places, and sharing a
  // key means rewording one silently rewords the other.
  // TODO(PT-4216): re-check against PT-4550 — these restate
  // %webView_resourcePanel_bibleTexts_title% / %webView_resourcePanel_commentaries_title% from
  // platform-scripture-editor's localizedStrings.json. `team-layout-localization.test.ts` pins them
  // equal; a wording change on either side must be made on both.
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
      {/* A nested Dialog.Root, not a popover: the picker is a separate task that should take the
          screen over this dialog. Modal, so the dialog behind it is genuinely inert — focus is
          trapped in the picker and the content under the backdrop is hidden from assistive
          technology, matching what the backdrop says. It also gives ResourcePickerDialog — which
          renders a DialogTitle but deliberately ships no Dialog.Root of its own — a title context
          distinct from this dialog's, instead of two titles colliding on one id. */}
      <Dialog
        open={openAddPickerTab === tab}
        onOpenChange={(open) => setOpenAddPickerTab(open ? tab : undefined)}
      >
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="tw:w-full">
            {localizeString(strings, manageLabelKey[tab])}
          </Button>
        </DialogTrigger>
        {/* A modal opened from a modal needs a tier of its own: at the flat modal z-index the
            picker's backdrop paints BELOW this dialog's content, so this dialog stays bright while
            Radix's dismissable layer makes it inert — live-looking and unclickable. */}
        <DialogContent
          ref={pickerContentRef}
          className={RESOURCE_PICKER_DIALOG_CLASS}
          style={{ zIndex: Z_INDEX_NESTED_MODAL }}
          overlayStyle={{ zIndex: Z_INDEX_NESTED_MODAL_BACKDROP }}
          overlayClassName={RESOURCE_PICKER_OVERLAY_CLASS}
          showCloseButton={false}
          onOpenAutoFocus={(event) =>
            focusResourcePickerOnOpen(event, pickerSearchInputRef.current, pickerContentRef.current)
          }
        >
          <ResourcePickerDialog
            searchInputRef={pickerSearchInputRef}
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
          <PickerCloseButton
            label={localizeString(strings, '%shareLayoutDialog_closePicker_label%')}
            onClose={() => setOpenAddPickerTab(undefined)}
          />
        </DialogContent>
      </Dialog>

      {/* The text-collection checkboxes live beside the resources they apply to, rather than in a
          combined list further down, so a row's checkbox is read in the tab it will affect. The
          panel lists every resource on the tab, not only the checked ones — what the checkbox means
          is stated once, under the tabs, where it reads as one rule covering both of them. */}
      {resources.length > 0 ? (
        <div className="tw:flex tw:min-w-0 tw:flex-col tw:gap-2">
          {resources.map((reference) => {
            const displayName = formatResourceDisplayName(reference, resourcesByUid);
            return (
              <ResourceRow
                key={referenceKey(reference)}
                displayName={displayName}
                checkboxLabel={formatReplacementString(
                  localizeString(strings, '%shareLayoutDialog_shownByDefault_label%'),
                  { resourceName: displayName },
                )}
                isInTextCollection={!!reference.isInTextCollection}
                onToggleInTextCollection={(checked: boolean) =>
                  handleToggleShownByDefault(tab, reference, checked)
                }
              />
            );
          })}
        </div>
      ) : (
        /* Says the tab is empty and what would fill it, so an empty set waiting on a choice the
           admin has not made does not read as a failed load. */
        <EmptyState
          className="tw:text-xs"
          message={localizeString(strings, '%shareLayoutDialog_resources_empty%')}
        />
      )}
    </TabsContent>
  );

  return (
    /* `relative` is what the picker scrim below positions against, and the flex classes are the
       ones the modal host puts on the wrapper it renders this into — carried forward here because
       this element now sits between them, and without them the scroll region loses its bounded
       height and `overflow-y-auto` stops working. */
    <div className="tw:relative tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:overflow-hidden">
      <DialogHeader className="tw:p-4 tw:pb-0">
        <DialogTitle>{localizeString(strings, '%shareLayoutDialog_teamLayout_title%')}</DialogTitle>
        <DialogDescription>
          {localizeString(strings, '%shareLayoutDialog_reviewAndSyncNotice%')}
        </DialogDescription>
      </DialogHeader>

      <div className="tw:flex tw:min-h-0 tw:flex-col tw:gap-4 tw:overflow-y-auto tw:p-4">
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
          <div className="tw:grid tw:items-stretch tw:divide-y tw:divide-border tw:xl:grid-cols-3 tw:xl:divide-x tw:xl:divide-y-0">
            <div className="tw:flex tw:min-w-0 tw:flex-col tw:gap-3 tw:px-4 tw:py-3">
              <span className="tw:font-medium">
                {localizeString(strings, '%shareLayoutDialog_modelText_label%')}
              </span>
              {/* Same nested-modal treatment as the Manage pickers above, for the same reasons. */}
              <Dialog open={isModelTextPickerOpen} onOpenChange={setIsModelTextPickerOpen}>
                <TooltipProvider>
                  <Tooltip open={isModelTextLabelTooltipOpen}>
                    <TooltipContent>{modelTextLabel}</TooltipContent>
                    <TooltipTrigger asChild>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="tw:w-full tw:justify-between tw:gap-2 tw:font-normal"
                        >
                          <span
                            ref={modelTextLabelRef}
                            className="tw:truncate"
                            onPointerEnter={onModelTextLabelPointerEnter}
                            onPointerLeave={onModelTextLabelPointerLeave}
                          >
                            {modelTextLabel}
                          </span>
                          <ChevronDown
                            className="tw:size-4 tw:shrink-0 tw:text-muted-foreground"
                            aria-hidden
                          />
                        </Button>
                      </DialogTrigger>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
                <DialogContent
                  ref={pickerContentRef}
                  className={RESOURCE_PICKER_DIALOG_CLASS}
                  style={{ zIndex: Z_INDEX_NESTED_MODAL }}
                  overlayStyle={{ zIndex: Z_INDEX_NESTED_MODAL_BACKDROP }}
                  overlayClassName={RESOURCE_PICKER_OVERLAY_CLASS}
                  showCloseButton={false}
                  onOpenAutoFocus={(event) =>
                    focusResourcePickerOnOpen(
                      event,
                      pickerSearchInputRef.current,
                      pickerContentRef.current,
                    )
                  }
                >
                  <ResourcePickerDialog
                    searchInputRef={pickerSearchInputRef}
                    allResources={allResources}
                    isResourcesLoading={isResourcesLoading}
                    hasResourcesError={hasResourcesError}
                    onRetryResources={onRetryResources}
                    areDownloadsUnavailable={areDownloadsUnavailable}
                    resourceType="ScriptureResource"
                    selectedResourceIds={modelText && hasStringId(modelText) ? [modelText.id] : []}
                    allowDeselect
                    localizedStrings={resourcePickerLocalizedStrings}
                    onSelect={handleSelectModelText}
                  />
                  {/* Picking a model text closes this dialog, so unlike the multi-select Manage
                      pickers this button is the cancel path rather than the way out. It is still
                      the same control, and carries the same localized label. */}
                  <PickerCloseButton
                    label={localizeString(strings, '%shareLayoutDialog_closePicker_label%')}
                    onClose={() => setIsModelTextPickerOpen(false)}
                  />
                </DialogContent>
              </Dialog>
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
                  happens to be pressed. The label is a `Label htmlFor` rather than a bare span with
                  `aria-labelledby`: Radix renders the switch as a native `<button>`, so `htmlFor`
                  makes the words themselves activate it, as they do at every other Switch in the
                  app. */}
              <div className="tw:flex tw:min-w-0 tw:flex-col tw:gap-1">
                <div className="tw:flex tw:min-w-0 tw:items-center tw:gap-2">
                  <Switch
                    id={teamLockLabelId}
                    checked={isStructureProtectedForTeam}
                    onCheckedChange={setIsStructureProtectedForTeam}
                    disabled={isTeamLockUnknown}
                    aria-describedby={teamLockDescriptionId}
                  />
                  <Label
                    htmlFor={teamLockLabelId}
                    className="tw:cursor-pointer tw:text-sm tw:font-medium"
                  >
                    {localizeString(strings, '%shareLayoutDialog_teamLock_label%')}
                  </Label>
                </div>
                {/* What the lock actually prevents, and when it is the right choice. The switch's
                    own on/off position reports the state, so this stays a fixed explanation rather
                    than restating the boolean. */}
                <span className="tw:text-xs tw:text-muted-foreground" id={teamLockDescriptionId}>
                  {localizeString(
                    strings,
                    isTeamLockUnknown
                      ? '%shareLayoutDialog_teamLock_loadError%'
                      : '%shareLayoutDialog_teamLock_description%',
                  )}
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
                  {/* `NO_ACTIVE_TAB_VALUE` is a sentinel, not a persisted value: Radix forbids
                      `value=""` on a `SelectItem`, but "no default tab" is a real persisted state
                      (the wrapper writes `''` for it) and this dialog is about reviewing before
                      publishing — so picking a tab by accident has to be undoable without
                      cancelling and losing every other staged edit. */}
                  <Select
                    value={activeTab ?? NO_ACTIVE_TAB_VALUE}
                    onValueChange={(value) => {
                      if (value === NO_ACTIVE_TAB_VALUE) setActiveTab(undefined);
                      else if (isTeamLayoutActiveTab(value)) setActiveTab(value);
                    }}
                  >
                    {/* `SelectTrigger` spreads consumer props last, so a bare `aria-labelledby`
                        REPLACES the name Radix derives from the trigger's own content — and the
                        selected value stops being announced at all. Naming the trigger itself as
                        the second id puts the value back. */}
                    <SelectTrigger
                      id={activeTabTriggerId}
                      className="tw:h-8 tw:w-full tw:bg-background"
                      aria-labelledby={`${activeTabLabelId} ${activeTabTriggerId}`}
                      aria-describedby={activeTabSublabelId}
                    >
                      <SelectValue
                        placeholder={localizeString(strings, '%shareLayoutDialog_activeTab_none%')}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {/* TODO(PT-4216): re-check against PT-4550 — these two options restate
                          %webView_resourcePanel_bibleTexts_title% /
                          %webView_resourcePanel_commentaries_title%. The Comments and
                          TextCollection options below have no resource-panel counterpart. */}
                      <SelectItem value={NO_ACTIVE_TAB_VALUE}>
                        {localizeString(strings, '%shareLayoutDialog_activeTab_none%')}
                      </SelectItem>
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
      </div>

      {/* Dims and blurs the dialog while a picker is open. Local to the dialog's own stacking
          context — the picker portals to `document.body` at `Z_INDEX_NESTED_MODAL`, above its own
          backdrop, and never competes with this — so a plain low z-index is correct here and a
          scale tier is not. It sits UNDER that backdrop, so the two dims compound: this one adds
          the blur, the picker's own backdrop does the dimming the nested tier is there for.
          Purely visual: the pickers are modal, so what makes the content behind them inert is
          Radix's own focus trap and outside-pointer handling, not this element. Deliberately left
          hit-testable so a click on it still reads as an outside click and closes the picker.

          A SIBLING of the header, the scroll region and the footer, not a child of the scroll
          region: an `inset-0` element inside a scrolling box is positioned against that box's
          padding edges at scroll offset 0 and then scrolls away with the content, and it could
          never have covered the header or the footer at all — leaving a disabled Save button
          looking live. */}
      {isAnyPickerOpen && (
        <div
          className="tw:absolute tw:inset-0 tw:z-10 tw:bg-background/50 tw:backdrop-blur-sm"
          aria-hidden
          data-testid="resource-picker-scrim"
        />
      )}

      {hasSaveError && (
        <Alert variant="destructive" className="tw:mx-4 tw:shrink-0">
          <AlertDescription>
            {localizeString(strings, '%shareLayoutDialog_saveFailed%')}
          </AlertDescription>
        </Alert>
      )}

      <TeamLayoutDialogFooter
        localizedStrings={strings}
        isSaving={isSaving}
        onCancel={onCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default TeamLayoutDialogContent;
