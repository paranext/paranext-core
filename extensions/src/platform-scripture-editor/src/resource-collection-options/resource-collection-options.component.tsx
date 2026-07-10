import { Button, Checkbox, Label, ToggleGroup, ToggleGroupItem } from 'platform-bible-react';
import { X } from 'lucide-react';
import { formatReplacementString } from 'platform-bible-utils';
import {
  RESOURCE_COLLECTION_OPTIONS_KEYS,
  type ResourceCollectionOptionsLocalizedStrings,
  type ResourceCollectionOptionsProps,
  type ResourceCollectionOptionsStringKey,
  type ViewOptionsTextEntry,
} from './resource-collection-options.types';

export {
  RESOURCE_COLLECTION_OPTIONS_KEYS,
  RESOURCE_COLLECTION_OPTIONS_STRING_KEYS,
  type ResourceCollectionOptionsStringKey,
  type ResourceCollectionOptionsLocalizedStrings,
  type ResourceCollectionOptionsProps,
  type ResourceCollectionViewMode,
  type ViewOptionsTextEntry,
} from './resource-collection-options.types';

const localize = (
  strings: ResourceCollectionOptionsLocalizedStrings,
  key: ResourceCollectionOptionsStringKey,
) => strings[key] ?? key;

/**
 * Reusable, presentational View Options inner component: a VIEW toggle (Verse / Chapter), a TEXTS
 * list (admin-shared top section + user bottom section), and a Get Resources button. It holds no
 * PAPI/popover/persistence state — callers pass the computed rows and callbacks — so the same
 * component renders inside the Scripture Text Grid popover and inside a resource-sharing dialog.
 *
 * Chapter is disabled with a "coming soon" hint unless `isChapterEnabled` is set. The hover-✕
 * renders only on rows with `isUserRemovable === true`.
 */
export function ResourceCollectionOptions({
  viewMode,
  onViewModeChange,
  isChapterEnabled = false,
  top,
  bottom,
  installingResourceNames = [],
  onCheckedChange,
  onRemoveFromList,
  onGetResources,
  disabled = false,
  disabledMessage,
  localizedStrings = {},
}: ResourceCollectionOptionsProps) {
  const handleViewModeChange = (value: string) => {
    // Radix single-toggle emits '' when the active item is clicked again; ignore that (a view mode
    // is always selected) and any unexpected value.
    if (value === 'verse' || value === 'chapter') onViewModeChange(value);
  };

  const renderRow = (row: ViewOptionsTextEntry) => {
    const { id, name } = row.reference;
    return (
      <div key={id} className="tw:group tw:flex tw:items-center tw:gap-2 tw:py-1">
        <Label className="tw:flex tw:flex-1 tw:items-center tw:gap-2 tw:font-normal">
          <Checkbox
            checked={row.checked}
            disabled={disabled}
            onCheckedChange={(checked) => onCheckedChange(id, checked === true)}
          />
          {/* `title` carries the untruncated name so long DBL names stay readable in the narrow panel
              (native tooltip on overflow — same read path as project-selector). */}
          <span className="tw:flex-1 tw:truncate" title={name}>
            {name}
          </span>
        </Label>
        {row.isUserRemovable && (
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={disabled}
            aria-label={formatReplacementString(
              localize(localizedStrings, RESOURCE_COLLECTION_OPTIONS_KEYS.removeFromList),
              { resourceName: name },
            )}
            className="tw:opacity-0 tw:transition-opacity tw:group-hover:opacity-100 tw:focus-visible:opacity-100"
            onClick={() => onRemoveFromList(id)}
          >
            <X className="tw:h-4 tw:w-4" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="tw:flex tw:w-64 tw:flex-col tw:gap-4">
      <section className="tw:flex tw:flex-col tw:gap-2">
        <Label className="tw:text-xs tw:font-semibold tw:text-muted-foreground">
          {localize(localizedStrings, RESOURCE_COLLECTION_OPTIONS_KEYS.viewHeader)}
        </Label>
        <div className="tw:flex tw:items-center tw:gap-2">
          <ToggleGroup
            type="single"
            variant="outline"
            value={viewMode}
            onValueChange={handleViewModeChange}
          >
            <ToggleGroupItem value="verse">
              {localize(localizedStrings, RESOURCE_COLLECTION_OPTIONS_KEYS.verse)}
            </ToggleGroupItem>
            <ToggleGroupItem value="chapter" disabled={!isChapterEnabled}>
              {localize(localizedStrings, RESOURCE_COLLECTION_OPTIONS_KEYS.chapter)}
            </ToggleGroupItem>
          </ToggleGroup>
          {!isChapterEnabled && (
            <span className="tw:text-xs tw:text-muted-foreground tw:italic">
              {localize(localizedStrings, RESOURCE_COLLECTION_OPTIONS_KEYS.comingSoon)}
            </span>
          )}
        </div>
      </section>

      <section className="tw:flex tw:flex-col tw:gap-1">
        <Label className="tw:text-xs tw:font-semibold tw:text-muted-foreground">
          {localize(localizedStrings, RESOURCE_COLLECTION_OPTIONS_KEYS.textsHeader)}
        </Label>
        {disabled && disabledMessage && (
          <p className="tw:py-1 tw:text-sm tw:text-muted-foreground tw:italic">{disabledMessage}</p>
        )}
        {top.map(renderRow)}
        {bottom.map(renderRow)}
        {installingResourceNames.map((name) => (
          <div
            key={`installing-${name}`}
            className="tw:flex tw:items-center tw:py-1 tw:text-sm tw:text-muted-foreground tw:italic"
          >
            {formatReplacementString(
              localize(localizedStrings, RESOURCE_COLLECTION_OPTIONS_KEYS.installing),
              { resourceName: name },
            )}
          </div>
        ))}
      </section>

      <Button variant="outline" disabled={disabled} onClick={onGetResources}>
        {localize(localizedStrings, RESOURCE_COLLECTION_OPTIONS_KEYS.getResources)}
      </Button>
    </div>
  );
}
