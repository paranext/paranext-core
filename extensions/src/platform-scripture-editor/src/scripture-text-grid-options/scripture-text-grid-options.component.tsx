import { Button, Checkbox, Label, ToggleGroup, ToggleGroupItem } from 'platform-bible-react';
import { X } from 'lucide-react';
import { formatReplacementString } from 'platform-bible-utils';
import type {
  ScriptureTextGridOptionsLocalizedStrings,
  ScriptureTextGridOptionsProps,
  ScriptureTextGridOptionsStringKey,
  ViewOptionsTextEntry,
} from './scripture-text-grid-options.types';

export {
  SCRIPTURE_TEXT_GRID_OPTIONS_STRING_KEYS,
  type ScriptureTextGridOptionsStringKey,
  type ScriptureTextGridOptionsLocalizedStrings,
  type ScriptureTextGridOptionsProps,
  type ScriptureTextGridViewMode,
  type ViewOptionsTextEntry,
} from './scripture-text-grid-options.types';

const VIEW_HEADER_KEY = '%webView_scriptureTextGrid_viewOptions_viewHeader%';
const VERSE_KEY = '%webView_scriptureTextGrid_viewOptions_verse%';
const CHAPTER_KEY = '%webView_scriptureTextGrid_viewOptions_chapter%';
const COMING_SOON_KEY = '%webView_scriptureTextGrid_viewOptions_comingSoon%';
const TEXTS_HEADER_KEY = '%webView_scriptureTextGrid_viewOptions_textsHeader%';
const GET_RESOURCES_KEY = '%webView_scriptureTextGrid_viewOptions_getResources%';
const REMOVE_FROM_LIST_KEY = '%webView_scriptureTextGrid_viewOptions_removeFromList%';
const INSTALLING_KEY = '%webView_scriptureTextGrid_viewOptions_installing%';

const localize = (
  strings: ScriptureTextGridOptionsLocalizedStrings,
  key: ScriptureTextGridOptionsStringKey,
) => strings[key] ?? key;

/**
 * Reusable, presentational View Options inner component: a VIEW toggle (Verse / Chapter), a TEXTS
 * list (admin-shared top section + user bottom section), and a Get Resources button. It holds no
 * PAPI/popover/persistence state — callers pass the computed rows and callbacks — so it renders
 * both inside the Scripture Text Grid popover and inside a separate share-layout dialog.
 *
 * Chapter is disabled with a "coming soon" hint unless `isChapterEnabled` is set. The hover-✕
 * renders only on rows with `isUserRemovable === true`.
 */
export function ScriptureTextGridOptions({
  viewMode,
  onViewModeChange,
  isChapterEnabled = false,
  top,
  bottom,
  installingResourceNames = [],
  onCheckedChange,
  onRemoveFromList,
  onGetResources,
  localizedStrings = {},
}: ScriptureTextGridOptionsProps) {
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
            onCheckedChange={(checked) => onCheckedChange(id, checked === true)}
          />
          <span className="tw:flex-1 tw:truncate">{name}</span>
        </Label>
        {row.isUserRemovable && (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={formatReplacementString(localize(localizedStrings, REMOVE_FROM_LIST_KEY), {
              resourceName: name,
            })}
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
          {localize(localizedStrings, VIEW_HEADER_KEY)}
        </Label>
        <div className="tw:flex tw:items-center tw:gap-2">
          <ToggleGroup
            type="single"
            variant="outline"
            value={viewMode}
            onValueChange={handleViewModeChange}
          >
            <ToggleGroupItem value="verse">{localize(localizedStrings, VERSE_KEY)}</ToggleGroupItem>
            <ToggleGroupItem value="chapter" disabled={!isChapterEnabled}>
              {localize(localizedStrings, CHAPTER_KEY)}
            </ToggleGroupItem>
          </ToggleGroup>
          {!isChapterEnabled && (
            <span className="tw:text-xs tw:text-muted-foreground tw:italic">
              {localize(localizedStrings, COMING_SOON_KEY)}
            </span>
          )}
        </div>
      </section>

      <section className="tw:flex tw:flex-col tw:gap-1">
        <Label className="tw:text-xs tw:font-semibold tw:text-muted-foreground">
          {localize(localizedStrings, TEXTS_HEADER_KEY)}
        </Label>
        {top.map(renderRow)}
        {bottom.map(renderRow)}
        {installingResourceNames.map((name) => (
          <div
            key={`installing-${name}`}
            className="tw:flex tw:items-center tw:py-1 tw:text-sm tw:text-muted-foreground tw:italic"
          >
            {formatReplacementString(localize(localizedStrings, INSTALLING_KEY), {
              resourceName: name,
            })}
          </div>
        ))}
      </section>

      <Button variant="outline" onClick={onGetResources}>
        {localize(localizedStrings, GET_RESOURCES_KEY)}
      </Button>
    </div>
  );
}
