import { useCallback, useState } from 'react';
import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReference } from 'platform-scripture';
import {
  Button,
  Checkbox,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ResourcePickerDialog,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import type { ResourcePickerDialogLocalizedStrings } from 'platform-bible-react';
import { Trash2 } from 'lucide-react';

export type ShareLayoutActiveTab = 'ScriptureResource' | 'CommentaryResource' | 'Comments';

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
  '%shareLayoutDialog_modelText_change%',
  '%shareLayoutDialog_activeTab_label%',
  '%shareLayoutDialog_activeTab_scriptureResource%',
  '%shareLayoutDialog_activeTab_commentaryResource%',
  '%shareLayoutDialog_activeTab_comments%',
  '%shareLayoutDialog_scriptureResources_label%',
  '%shareLayoutDialog_commentaryResources_label%',
  '%shareLayoutDialog_shownByDefault_label%',
  '%shareLayoutDialog_addResource_label%',
  '%shareLayoutDialog_removeResource_label%',
  '%shareLayoutDialog_cancel_label%',
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

function toResourceReference(resource: DblResourceData): ResourceReference {
  return { type: 'dblResource', name: resource.displayName, id: resource.dblEntryUid };
}

/** Narrows a `ResourceReference` to the variants that carry a string `id`, without a type assertion. */
function hasStringId(ref: ResourceReference): ref is Extract<ResourceReference, { id: string }> {
  return 'id' in ref && typeof ref.id === 'string';
}

function isShareLayoutActiveTab(value: string): value is ShareLayoutActiveTab {
  return value === 'ScriptureResource' || value === 'CommentaryResource' || value === 'Comments';
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

  const handleAddResource = useCallback((tab: TabKey, resource: DblResourceData) => {
    const newRef = toResourceReference(resource);
    const setResources =
      tab === 'ScriptureResource' ? setScriptureResources : setCommentaryResources;
    setResources((existing) => [
      ...existing.filter((item) => referenceKey(item) !== referenceKey(newRef)),
      newRef,
    ]);
    setOpenAddPickerTab(undefined);
  }, []);

  const handleRemoveResource = useCallback((tab: TabKey, ref: ResourceReference) => {
    const setResources =
      tab === 'ScriptureResource' ? setScriptureResources : setCommentaryResources;
    setResources((existing) => existing.filter((item) => referenceKey(item) !== referenceKey(ref)));
  }, []);

  const handleToggleShownByDefault = useCallback(
    (tab: TabKey, ref: ResourceReference, checked: boolean) => {
      const setResources =
        tab === 'ScriptureResource' ? setScriptureResources : setCommentaryResources;
      setResources((existing) =>
        existing.map((item) =>
          referenceKey(item) === referenceKey(ref)
            ? { ...item, isResourceShownByDefault: checked }
            : item,
        ),
      );
    },
    [],
  );

  const handleConfirm = useCallback(() => {
    onConfirm({ modelText, activeTab, scriptureResources, commentaryResources });
  }, [modelText, activeTab, scriptureResources, commentaryResources, onConfirm]);

  const renderResourceList = (tab: TabKey, resources: ResourceReference[]) => {
    const sorted = [...resources].sort(
      (a, b) => Number(!!b.isResourceShownByDefault) - Number(!!a.isResourceShownByDefault),
    );
    return (
      <div className="tw:flex tw:flex-col tw:gap-1">
        {sorted.map((ref) => (
          <div key={referenceKey(ref)} className="tw:flex tw:items-center tw:gap-2">
            <Checkbox
              checked={!!ref.isResourceShownByDefault}
              onCheckedChange={(checked: boolean) => handleToggleShownByDefault(tab, ref, checked)}
              aria-label={localizeString(strings, '%shareLayoutDialog_shownByDefault_label%')}
            />
            <span className="tw:flex-1">{referenceName(ref)}</span>
            <Button
              variant="ghost"
              size="icon"
              aria-label={localizeString(strings, '%shareLayoutDialog_removeResource_label%')}
              onClick={() => handleRemoveResource(tab, ref)}
            >
              <Trash2 className="tw:h-4 tw:w-4" aria-hidden />
            </Button>
          </div>
        ))}
        <Popover
          open={openAddPickerTab === tab}
          onOpenChange={(open) => setOpenAddPickerTab(open ? tab : undefined)}
        >
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              {localizeString(strings, '%shareLayoutDialog_addResource_label%')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="tw:w-[32rem] tw:p-0">
            <ResourcePickerDialog
              allResources={allResources}
              isResourcesLoading={isResourcesLoading}
              resourceType={tab}
              selectedResourceIds={resources.filter(hasStringId).map((r) => r.id)}
              localizedStrings={resourcePickerLocalizedStrings}
              onSelect={(resource) => handleAddResource(tab, resource)}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{localizeString(strings, '%shareLayoutDialog_title%')}</DialogTitle>
        <DialogDescription>
          {localizeString(strings, '%shareLayoutDialog_description%')}
        </DialogDescription>
      </DialogHeader>

      <div className="tw:flex tw:flex-col tw:gap-4 tw:overflow-y-auto tw:p-4">
        <div className="tw:flex tw:items-center tw:justify-between">
          <span>
            {localizeString(strings, '%shareLayoutDialog_modelText_label%')}:{' '}
            {modelText
              ? referenceName(modelText)
              : localizeString(strings, '%shareLayoutDialog_modelText_none%')}
          </span>
          <Popover open={isModelTextPickerOpen} onOpenChange={setIsModelTextPickerOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                {localizeString(strings, '%shareLayoutDialog_modelText_change%')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="tw:w-[32rem] tw:p-0">
              <ResourcePickerDialog
                allResources={allResources}
                isResourcesLoading={isResourcesLoading}
                resourceType="ScriptureResource"
                selectedResourceIds={modelText && hasStringId(modelText) ? [modelText.id] : []}
                localizedStrings={resourcePickerLocalizedStrings}
                onSelect={handleSelectModelText}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="tw:flex tw:items-center tw:gap-2">
          <span>{localizeString(strings, '%shareLayoutDialog_activeTab_label%')}:</span>
          <Select
            value={activeTab}
            onValueChange={(value) => {
              if (isShareLayoutActiveTab(value)) setActiveTab(value);
            }}
          >
            <SelectTrigger className="tw:h-8 tw:min-w-0 tw:flex-1">
              <SelectValue />
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
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="tw:mb-1 tw:font-medium">
            {localizeString(strings, '%shareLayoutDialog_scriptureResources_label%')}
          </div>
          {renderResourceList('ScriptureResource', scriptureResources)}
        </div>

        <div>
          <div className="tw:mb-1 tw:font-medium">
            {localizeString(strings, '%shareLayoutDialog_commentaryResources_label%')}
          </div>
          {renderResourceList('CommentaryResource', commentaryResources)}
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          {localizeString(strings, '%shareLayoutDialog_cancel_label%')}
        </Button>
        <Button onClick={handleConfirm}>
          {localizeString(strings, '%shareLayoutDialog_confirm_label%')}
        </Button>
      </DialogFooter>
    </>
  );
}

export default ShareLayoutDialogContent;
