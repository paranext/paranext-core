import { useCallback, useRef, useState } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Z_INDEX_NESTED_MODAL,
  Z_INDEX_NESTED_MODAL_BACKDROP,
} from 'platform-bible-react';
import { ResourcePickerDialog } from 'platform-bible-react/experimental';
import type { ResourcePickerDialogLocalizedStrings } from 'platform-bible-react/experimental';
import { ChevronDown, X } from 'lucide-react';

/**
 * Shape of an embedded picker modal, layered over this dialog.
 *
 * The height cap restates the one `OverlayModalDialog` computes from `SHARE_LAYOUT_DIALOG`'s
 * `initialSize.height` in `share-layout.dialog.tsx` — a hand-kept copy, since a class name cannot
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
 * Where focus goes when an embedded picker opens.
 *
 * Rendering the close button after the picker gets this right only while the search box is enabled
 * — the picker disables it whenever there is nothing to filter (an empty commentary catalog, a
 * failed fetch), and the mount auto-focus then falls through to the Retry button or to the close
 * button itself, starting a keyboard user on "leave". Stating the target directly also survives
 * anyone reordering the JSX or adding a focusable control above the search box.
 */
function focusPickerSearchOnOpen(
  event: Event,
  searchInput: HTMLInputElement | null | undefined,
  content: HTMLDivElement | null,
) {
  if (searchInput && !searchInput.disabled) {
    event.preventDefault();
    searchInput.focus();
    return;
  }
  // Nothing to type into: hold focus on the dialog itself rather than on whatever happens to be
  // tabbable. Escape and the screen-reader announcement both still work from there.
  if (content) {
    event.preventDefault();
    content.focus();
  }
}

export type ShareLayoutActiveTab =
  | 'ScriptureResource'
  | 'CommentaryResource'
  | 'Comments'
  | 'TextCollection';

export type ShareLayoutResult = {
  modelText: ResourceReference | undefined;
  activeTab: ShareLayoutActiveTab | undefined;
  scriptureResources: ResourceReference[];
  commentaryResources: ResourceReference[];
};

export const SHARE_LAYOUT_DIALOG_STRING_KEYS = Object.freeze([
  '%shareLayoutDialog_title%',
  '%shareLayoutDialog_description%',
  '%shareLayoutDialog_modelText_label%',
  '%shareLayoutDialog_modelText_none%',
  '%shareLayoutDialog_activeTab_label%',
  '%shareLayoutDialog_activeTab_sublabel%',
  '%shareLayoutDialog_activeTab_none%',
  '%shareLayoutDialog_activeTab_scriptureResource%',
  '%shareLayoutDialog_activeTab_commentaryResource%',
  '%shareLayoutDialog_activeTab_comments%',
  '%shareLayoutDialog_activeTab_textCollection%',
  '%shareLayoutDialog_scriptureResources_label%',
  '%shareLayoutDialog_commentaryResources_label%',
  '%shareLayoutDialog_manageScriptureResources_label%',
  '%shareLayoutDialog_manageCommentaryResources_label%',
  '%shareLayoutDialog_textCollectionResources_label%',
  '%shareLayoutDialog_shownByDefault_label%',
  '%shareLayoutDialog_cancel_label%',
  '%shareLayoutDialog_closePicker_label%',
  '%shareLayoutDialog_confirm_label%',
  '%shareLayoutDialog_hiddenResources_loadError%',
  '%shareLayoutDialog_hiddenResources_unavailable%',
  '%shareLayoutDialog_retry%',
] as const);

export type ShareLayoutDialogLocalizedStrings = {
  [key in (typeof SHARE_LAYOUT_DIALOG_STRING_KEYS)[number]]?: string;
};

export type ShareLayoutDialogContentProps = {
  initialModelText: ResourceReference | undefined;
  initialActiveTab: ShareLayoutActiveTab | undefined;
  initialScriptureResources: ResourceReference[];
  initialCommentaryResources: ResourceReference[];
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
  localizedStrings: ShareLayoutDialogLocalizedStrings;
  onConfirm: (result: ShareLayoutResult) => void;
  onCancel: () => void;
};

function localizeString(
  strings: ShareLayoutDialogLocalizedStrings,
  key: keyof ShareLayoutDialogLocalizedStrings,
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

export function isShareLayoutActiveTab(value: string): value is ShareLayoutActiveTab {
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
 * focus actually lands on open is stated by `focusPickerSearchOnOpen`, not inferred from this
 * ordering — the picker disables its search box whenever there is nothing to filter, and DOM order
 * alone would put a keyboard user on "leave" in exactly that state.
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

export function ShareLayoutDialogContent({
  initialModelText,
  initialActiveTab,
  initialScriptureResources,
  initialCommentaryResources,
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
}: ShareLayoutDialogContentProps) {
  const [modelText, setModelText] = useState(initialModelText);
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [scriptureResources, setScriptureResources] = useState(initialScriptureResources);
  const [commentaryResources, setCommentaryResources] = useState(initialCommentaryResources);
  const [isModelTextPickerOpen, setIsModelTextPickerOpen] = useState(false);
  const [openAddPickerTab, setOpenAddPickerTab] = useState<TabKey | undefined>(undefined);

  // One pair of refs shared by all three `DialogContent`s here — the manage picker renders once per
  // TabKey, plus the model-text picker. Opening any of them requires clicking a trigger in this
  // dialog, and Radix unmounts closed content, so only one is ever mounted at a time.
  // React writes `null` into a detached DOM ref itself, so there is no `undefined` equivalent here.
  /* eslint-disable no-null/no-null */
  const pickerSearchInputRef = useRef<HTMLInputElement | null>(null);
  const pickerContentRef = useRef<HTMLDivElement | null>(null);
  /* eslint-enable no-null/no-null */

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
    onConfirm({ modelText, activeTab, scriptureResources, commentaryResources });
  }, [modelText, activeTab, scriptureResources, commentaryResources, onConfirm]);

  const modelTextLabel = modelText
    ? formatResourceDisplayName(modelText, allResources)
    : localizeString(strings, '%shareLayoutDialog_modelText_none%');

  const manageLabelKey: Record<TabKey, keyof ShareLayoutDialogLocalizedStrings> = {
    ScriptureResource: '%shareLayoutDialog_manageScriptureResources_label%',
    CommentaryResource: '%shareLayoutDialog_manageCommentaryResources_label%',
  };

  const renderResourceHeaderRow = (
    tab: TabKey,
    resources: ResourceReference[],
    sectionLabelKey: keyof ShareLayoutDialogLocalizedStrings,
  ) => (
    <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:px-4 tw:py-3">
      <span className="tw:font-medium">{localizeString(strings, sectionLabelKey)}</span>
      {/* A nested Dialog.Root, not a popover: the picker is a separate task that should take the
          screen over this dialog. It also gives ResourcePickerDialog — which renders a DialogTitle
          but deliberately ships no Dialog.Root of its own — a title context distinct from this
          dialog's, instead of two titles colliding on one id. */}
      <Dialog
        open={openAddPickerTab === tab}
        onOpenChange={(open) => setOpenAddPickerTab(open ? tab : undefined)}
      >
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="tw:w-fit">
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
          showCloseButton={false}
          onOpenAutoFocus={(event) =>
            focusPickerSearchOnOpen(event, pickerSearchInputRef.current, pickerContentRef.current)
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
    </div>
  );

  return (
    <>
      <DialogHeader className="tw:p-4 tw:pb-0">
        <DialogTitle>{localizeString(strings, '%shareLayoutDialog_title%')}</DialogTitle>
        <DialogDescription>
          {localizeString(strings, '%shareLayoutDialog_description%')}
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
        <div className="tw:shrink-0 tw:divide-y tw:divide-border tw:overflow-hidden tw:rounded-xl tw:border tw:bg-muted/30">
          <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:px-4 tw:py-3">
            <span className="tw:font-medium">
              {localizeString(strings, '%shareLayoutDialog_modelText_label%')}
            </span>
            {/* Same nested-modal treatment as the Manage pickers above, for the same reasons. */}
            <Dialog open={isModelTextPickerOpen} onOpenChange={setIsModelTextPickerOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="tw:w-fit tw:justify-between tw:gap-2 tw:font-normal"
                >
                  {/* Native `title`, not a shadcn tooltip: this button is not itself a tooltip
                      trigger, so there is no second tooltip to collide with, and
                      "FULL NAME (SHORT)" is the longest string on this screen. */}
                  <span className="tw:truncate" title={modelTextLabel}>
                    {modelTextLabel}
                  </span>
                  <ChevronDown
                    className="tw:size-4 tw:shrink-0 tw:text-muted-foreground"
                    aria-hidden
                  />
                </Button>
              </DialogTrigger>
              <DialogContent
                ref={pickerContentRef}
                className={RESOURCE_PICKER_DIALOG_CLASS}
                style={{ zIndex: Z_INDEX_NESTED_MODAL }}
                overlayStyle={{ zIndex: Z_INDEX_NESTED_MODAL_BACKDROP }}
                showCloseButton={false}
                onOpenAutoFocus={(event) =>
                  focusPickerSearchOnOpen(
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

          <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:px-4 tw:py-3">
            <div className="tw:flex tw:flex-col">
              <span className="tw:font-medium">
                {localizeString(strings, '%shareLayoutDialog_activeTab_label%')}
              </span>
              <span className="tw:text-xs tw:text-muted-foreground">
                {localizeString(strings, '%shareLayoutDialog_activeTab_sublabel%')}
              </span>
            </div>
            <Select
              value={activeTab}
              onValueChange={(value) => {
                if (isShareLayoutActiveTab(value)) setActiveTab(value);
              }}
            >
              <SelectTrigger className="tw:h-8 tw:bg-background">
                <SelectValue
                  placeholder={localizeString(strings, '%shareLayoutDialog_activeTab_none%')}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ScriptureResource">
                  {localizeString(strings, '%shareLayoutDialog_activeTab_scriptureResource%')}
                </SelectItem>
                <SelectItem value="CommentaryResource">
                  {localizeString(strings, '%shareLayoutDialog_activeTab_commentaryResource%')}
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
        </div>

        <div className="tw:shrink-0 tw:overflow-hidden tw:rounded-xl tw:border tw:bg-muted/30">
          <div className="tw:divide-y tw:divide-border">
            {renderResourceHeaderRow(
              'ScriptureResource',
              scriptureResources,
              '%shareLayoutDialog_scriptureResources_label%',
            )}

            {renderResourceHeaderRow(
              'CommentaryResource',
              commentaryResources,
              '%shareLayoutDialog_commentaryResources_label%',
            )}
          </div>

          <div className="tw:border-t tw:border-border tw:px-4 tw:py-3">
            <span className="tw:font-medium">
              {localizeString(strings, '%shareLayoutDialog_textCollectionResources_label%')}
            </span>
          </div>
          <div>
            {[
              ...scriptureResources.map((ref) => ({ tab: 'ScriptureResource' as const, ref })),
              ...commentaryResources.map((ref) => ({ tab: 'CommentaryResource' as const, ref })),
            ].map(({ tab, ref }) => {
              const displayName = formatResourceDisplayName(ref, allResources);
              return (
                <div
                  key={referenceKey(ref)}
                  className="tw:flex tw:items-center tw:gap-2 tw:px-4 tw:py-2"
                >
                  {/* See the model-text trigger above on why this is a native `title`. */}
                  <span className="tw:flex-1 tw:truncate tw:text-sm" title={displayName}>
                    {displayName}
                  </span>
                  <Checkbox
                    checked={!!ref.isInTextCollection}
                    onCheckedChange={(checked: boolean) =>
                      handleToggleShownByDefault(tab, ref, checked)
                    }
                    aria-label={formatReplacementString(
                      localizeString(strings, '%shareLayoutDialog_shownByDefault_label%'),
                      { resourceName: displayName },
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="tw:flex tw:justify-end tw:gap-2 tw:p-4">
        <Button variant="outline" onClick={onCancel}>
          {localizeString(strings, '%shareLayoutDialog_cancel_label%')}
        </Button>
        <Button onClick={handleConfirm}>
          {localizeString(strings, '%shareLayoutDialog_confirm_label%')}
        </Button>
      </div>
    </>
  );
}

export default ShareLayoutDialogContent;
