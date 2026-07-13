import { useCallback, useState } from 'react';
import { formatReplacementString } from 'platform-bible-utils';
import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReference } from 'platform-scripture';
import {
  Button,
  Checkbox,
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
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

export function ShareLayoutDialogContent({
  initialModelText,
  initialActiveTab,
  initialScriptureResources,
  initialCommentaryResources,
  allResources,
  isResourcesLoading,
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

  // Only scripture resources have a "shown by default" toggle in the Text Collection Resources
  // section — commentary no longer has a per-resource checkbox list.
  const handleToggleShownByDefault = useCallback((ref: ResourceReference, checked: boolean) => {
    setScriptureResources((existing) =>
      existing.map((item) =>
        referenceKey(item) === referenceKey(ref)
          ? { ...item, isResourceShownByDefault: checked }
          : item,
      ),
    );
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm({ modelText, activeTab, scriptureResources, commentaryResources });
  }, [modelText, activeTab, scriptureResources, commentaryResources, onConfirm]);

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
      <Popover
        open={openAddPickerTab === tab}
        onOpenChange={(open) => setOpenAddPickerTab(open ? tab : undefined)}
      >
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="tw:w-fit">
            {localizeString(strings, manageLabelKey[tab])}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="tw:p-0" style={RESOURCE_PICKER_POPOVER_STYLE}>
          {/* flex/h-full/min-h-0 so this fills the fixed-height PopoverContent above, giving
            ResourcePickerDialog's internal `flex-1 overflow-y-auto` list a bounded height to scroll
            within instead of growing to fit every resource. */}
          <div className="tw:relative tw:flex tw:h-full tw:min-h-0 tw:flex-col">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="tw:absolute tw:end-2 tw:top-2 tw:z-10"
                    onClick={() => setOpenAddPickerTab(undefined)}
                    aria-label={localizeString(strings, '%shareLayoutDialog_closePicker_label%')}
                  >
                    <X className="tw:size-4" aria-hidden />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {localizeString(strings, '%shareLayoutDialog_closePicker_label%')}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/*
                ResourcePickerDialog renders its own DialogTitle internally but has no Dialog.Root
                of its own by design (it's meant to be embedded in a host-provided Dialog context).
                Since this popover is rendered inside the outer ShareLayoutDialogContent's
                Dialog.Root, wrap it in its own isolated Dialog.Root here so its DialogTitle gets a
                distinct id from the outer dialog's title instead of colliding with it.
              */}
            <Dialog open modal={false}>
              <ResourcePickerDialog
                allResources={allResources}
                isResourcesLoading={isResourcesLoading}
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
        <div className="tw:shrink-0 tw:divide-y tw:divide-border tw:overflow-hidden tw:rounded-xl tw:border tw:bg-muted/30">
          <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:px-4 tw:py-3">
            <span>{localizeString(strings, '%shareLayoutDialog_modelText_label%')}</span>
            <Popover open={isModelTextPickerOpen} onOpenChange={setIsModelTextPickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="tw:w-fit tw:justify-between tw:gap-2 tw:font-normal"
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
              <PopoverContent className="tw:p-0" style={RESOURCE_PICKER_POPOVER_STYLE}>
                {/*
                  See the comment on the resource-card popovers below: wrap in its own Dialog.Root
                  so its internal DialogTitle gets a distinct id from the outer dialog's title.
                */}
                <Dialog open modal={false}>
                  <ResourcePickerDialog
                    allResources={allResources}
                    isResourcesLoading={isResourcesLoading}
                    resourceType="ScriptureResource"
                    selectedResourceIds={modelText && hasStringId(modelText) ? [modelText.id] : []}
                    localizedStrings={resourcePickerLocalizedStrings}
                    onSelect={handleSelectModelText}
                  />
                </Dialog>
              </PopoverContent>
            </Popover>
          </div>

          <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:px-4 tw:py-3">
            <div className="tw:flex tw:flex-col">
              <span>{localizeString(strings, '%shareLayoutDialog_activeTab_label%')}</span>
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
              <SelectTrigger className="tw:h-8">
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

        <div className="tw:shrink-0 tw:divide-y tw:divide-border tw:overflow-hidden tw:rounded-xl tw:border tw:bg-muted/30">
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

        <div className="tw:shrink-0 tw:overflow-hidden tw:rounded-xl tw:border tw:bg-muted/30">
          <div className="tw:border-b tw:border-border tw:px-4 tw:py-3">
            <span className="tw:font-medium">
              {localizeString(strings, '%shareLayoutDialog_textCollectionResources_label%')}
            </span>
          </div>
          <div className="tw:divide-y tw:divide-border">
            {scriptureResources.map((ref) => (
              <div
                key={referenceKey(ref)}
                className="tw:flex tw:items-center tw:gap-2 tw:px-4 tw:py-2"
              >
                <span className="tw:flex-1 tw:truncate">
                  {formatResourceDisplayName(ref, allResources)}
                </span>
                <Checkbox
                  checked={!!ref.isResourceShownByDefault}
                  onCheckedChange={(checked: boolean) => handleToggleShownByDefault(ref, checked)}
                  aria-label={formatReplacementString(
                    localizeString(strings, '%shareLayoutDialog_shownByDefault_label%'),
                    { resourceName: formatResourceDisplayName(ref, allResources) },
                  )}
                />
              </div>
            ))}
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
