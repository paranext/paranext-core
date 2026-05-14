import * as React from 'react';
import { ArrowLeft, ArrowRight, Check, Download, Search, X } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Badge } from '@/components/shadcn-ui/badge';
import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { Input } from '@/components/shadcn-ui/input';
import { Separator } from '@/components/shadcn-ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shadcn-ui/dialog';
import { DblResourceData } from 'platform-bible-utils';
import {
  filterResourcesByUserLanguages,
  rankResourcesForPicker,
  searchResources,
  formatResourceSize,
  RESOURCES_STRINGS,
} from './scripture-resources-tab.utils';

export type PickerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  allResources: DblResourceData[];
  /** IDs already associated with the project — these appear first / marked. */
  selectedResourceIds: string[];
  /** Saroj's languages — drives suggestions section. */
  userLanguages: string[];
  /** Called when the user clicks Apply with the chosen ids. */
  onApply: (selectedIds: string[]) => void;
  /** Called when the user clicks Download next to a not-installed resource. */
  onDownload?: (resource: DblResourceData) => void;
};

/** Shared row used by the modal-checklist and inline variants. */
function ResourceChecklistRow({
  resource,
  checked,
  alreadyAssociated,
  onToggle,
  onDownload,
}: {
  resource: DblResourceData;
  checked: boolean;
  alreadyAssociated: boolean;
  onToggle: (next: boolean) => void;
  onDownload?: (resource: DblResourceData) => void;
}) {
  const id = `res-${resource.dblEntryUid}`;
  return (
    <li className="tw:flex tw:items-center tw:gap-2 tw:rounded tw:px-2 tw:py-1.5 hover:tw:bg-muted/60">
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onToggle(Boolean(v))} />
      <label htmlFor={id} className="tw:flex tw:min-w-0 tw:flex-1 tw:cursor-pointer tw:flex-col">
        <span className="tw:flex tw:items-center tw:gap-1.5">
          <span className="tw:truncate tw:text-sm tw:font-medium">{resource.displayName}</span>
          {alreadyAssociated && (
            <Badge variant="secondary" className="tw:h-4 tw:px-1 tw:text-[10px]">
              {RESOURCES_STRINGS.alreadyAdded}
            </Badge>
          )}
          {resource.installed && !alreadyAssociated && (
            <Badge variant="outline" className="tw:h-4 tw:px-1 tw:text-[10px]">
              {RESOURCES_STRINGS.installedBadge}
            </Badge>
          )}
        </span>
        <span className="tw:truncate tw:text-[11px] tw:text-muted-foreground">
          {resource.fullName} · {resource.bestLanguageName} · {formatResourceSize(resource.size)}
        </span>
      </label>
      {!resource.installed && (
        <Button
          size="sm"
          variant="ghost"
          className="tw:h-7 tw:px-2 tw:text-xs"
          onClick={(e) => {
            e.preventDefault();
            onDownload?.(resource);
          }}
        >
          <Download className="tw:mr-1 tw:h-3 tw:w-3" />
          {RESOURCES_STRINGS.downloadAction}
        </Button>
      )}
    </li>
  );
}

/** Filters a resources list to ScriptureResource type and applies search. */
function useFilteredScriptureResources(
  allResources: DblResourceData[],
  query: string,
): DblResourceData[] {
  return React.useMemo(() => {
    const scripture = allResources.filter((r) => r.type === 'ScriptureResource');
    return searchResources(scripture, query);
  }, [allResources, query]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant A — Modal checklist
// Mental model: "Form submit — see everything, tick what I want, hit Apply."
// One modal dialog. Search at the top, a flat checklist below (with already-added
// items pinned and marked), and an Apply button. Familiar, low cognitive overhead.
// Best when users want to add several resources in one batch.
// ─────────────────────────────────────────────────────────────────────────────
export function ScriptureResourcesPickerModalChecklist({
  open,
  onOpenChange,
  allResources,
  selectedResourceIds,
  userLanguages,
  onApply,
  onDownload,
}: PickerProps) {
  const [query, setQuery] = React.useState('');
  const [checkedIds, setCheckedIds] = React.useState<string[]>(selectedResourceIds);

  // Keep checkedIds in sync with selectedResourceIds when the dialog re-opens.
  React.useEffect(() => {
    if (open) setCheckedIds(selectedResourceIds);
  }, [open, selectedResourceIds]);

  const filtered = useFilteredScriptureResources(allResources, query);
  const ranked = React.useMemo(
    () => rankResourcesForPicker(filtered, selectedResourceIds),
    [filtered, selectedResourceIds],
  );
  const suggestedIds = React.useMemo(
    () =>
      new Set(filterResourcesByUserLanguages(filtered, userLanguages, 3).map((r) => r.dblEntryUid)),
    [filtered, userLanguages],
  );

  const associated = new Set(selectedResourceIds);
  const toggle = (id: string, next: boolean) =>
    setCheckedIds((prev) =>
      next ? Array.from(new Set([...prev, id])) : prev.filter((x) => x !== id),
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="tw:flex tw:h-[520px] tw:max-w-md tw:flex-col tw:p-0">
        <DialogHeader className="tw:border-b tw:px-4 tw:py-3">
          <DialogTitle className="tw:text-sm">{RESOURCES_STRINGS.pickerTitle}</DialogTitle>
        </DialogHeader>
        <div className="tw:px-4 tw:py-2">
          <div className="tw:relative">
            <Search className="tw:pointer-events-none tw:absolute tw:left-2 tw:top-1/2 tw:h-3.5 tw:w-3.5 -tw:translate-y-1/2 tw:text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={RESOURCES_STRINGS.searchPlaceholder}
              className="tw:h-8 tw:pl-7 tw:text-xs"
            />
          </div>
        </div>
        <ul className="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-0.5 tw:overflow-y-auto tw:px-3 tw:pb-2">
          {ranked.length === 0 && (
            <li className="tw:px-2 tw:py-4 tw:text-center tw:text-xs tw:text-muted-foreground">
              No matches
            </li>
          )}
          {ranked.map((r) => (
            <ResourceChecklistRow
              key={r.dblEntryUid}
              resource={r}
              checked={checkedIds.includes(r.dblEntryUid)}
              alreadyAssociated={associated.has(r.dblEntryUid)}
              onToggle={(next) => toggle(r.dblEntryUid, next)}
              onDownload={onDownload}
            />
          ))}
          {suggestedIds.size > 0 && (
            <li className="tw:px-2 tw:py-1 tw:text-[10px] tw:text-muted-foreground">
              ★ Suggested for your languages ({userLanguages.join(', ')})
            </li>
          )}
        </ul>
        <div className="tw:flex tw:items-center tw:justify-between tw:border-t tw:px-4 tw:py-2">
          <span className="tw:text-xs tw:text-muted-foreground">{checkedIds.length} selected</span>
          <div className="tw:flex tw:gap-2">
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              {RESOURCES_STRINGS.cancelSelection}
            </Button>
            <Button size="sm" onClick={() => onApply(checkedIds)}>
              <Check className="tw:mr-1 tw:h-3.5 tw:w-3.5" />
              {RESOURCES_STRINGS.applySelection}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant B — Two-panel browse + selected tray
// Mental model: "Shopping cart — left is the catalog, right is what I'm taking home."
// Two side-by-side panels. The left is a searchable catalog; clicking a resource
// moves it into the right "Selected" tray (or back out). Apply confirms the
// whole tray. Great for users who want explicit feedback on what they've chosen.
// ─────────────────────────────────────────────────────────────────────────────
export function ScriptureResourcesPickerTwoPanel({
  open,
  onOpenChange,
  allResources,
  selectedResourceIds,
  userLanguages,
  onApply,
  onDownload,
}: PickerProps) {
  const [query, setQuery] = React.useState('');
  const [checkedIds, setCheckedIds] = React.useState<string[]>(selectedResourceIds);

  React.useEffect(() => {
    if (open) setCheckedIds(selectedResourceIds);
  }, [open, selectedResourceIds]);

  const filtered = useFilteredScriptureResources(allResources, query);
  const ranked = React.useMemo(
    () => rankResourcesForPicker(filtered, checkedIds),
    [filtered, checkedIds],
  );
  const checkedSet = new Set(checkedIds);
  const available = ranked.filter((r) => !checkedSet.has(r.dblEntryUid));
  const selected = ranked.filter((r) => checkedSet.has(r.dblEntryUid));
  // Surface suggestions visually inline in the catalog
  const suggestedIds = React.useMemo(
    () =>
      new Set(filterResourcesByUserLanguages(filtered, userLanguages, 3).map((r) => r.dblEntryUid)),
    [filtered, userLanguages],
  );

  const add = (id: string) => setCheckedIds((prev) => Array.from(new Set([...prev, id])));
  const remove = (id: string) => setCheckedIds((prev) => prev.filter((x) => x !== id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="tw:flex tw:h-[540px] tw:max-w-2xl tw:flex-col tw:p-0">
        <DialogHeader className="tw:border-b tw:px-4 tw:py-3">
          <DialogTitle className="tw:text-sm">{RESOURCES_STRINGS.pickerTitle}</DialogTitle>
        </DialogHeader>
        <div className="tw:flex tw:min-h-0 tw:flex-1">
          {/* Catalog */}
          <div className="tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:border-r">
            <div className="tw:flex tw:items-center tw:justify-between tw:px-3 tw:py-2">
              <span className="tw:text-[11px] tw:font-medium tw:uppercase tw:tracking-wide tw:text-muted-foreground">
                Available
              </span>
              <span className="tw:text-[10px] tw:text-muted-foreground">
                {available.length} resources
              </span>
            </div>
            <div className="tw:px-3 tw:pb-2">
              <div className="tw:relative">
                <Search className="tw:pointer-events-none tw:absolute tw:left-2 tw:top-1/2 tw:h-3.5 tw:w-3.5 -tw:translate-y-1/2 tw:text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={RESOURCES_STRINGS.searchPlaceholder}
                  className="tw:h-8 tw:pl-7 tw:text-xs"
                />
              </div>
            </div>
            <ul className="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-0.5 tw:overflow-y-auto tw:px-2 tw:pb-2">
              {available.map((r) => (
                <li
                  key={r.dblEntryUid}
                  className="tw:flex tw:items-center tw:gap-2 tw:rounded tw:px-2 tw:py-1.5 hover:tw:bg-muted/60"
                >
                  <div className="tw:min-w-0 tw:flex-1">
                    <div className="tw:flex tw:items-center tw:gap-1.5">
                      <span className="tw:truncate tw:text-sm">{r.displayName}</span>
                      {suggestedIds.has(r.dblEntryUid) && (
                        <Badge variant="secondary" className="tw:h-4 tw:px-1 tw:text-[10px]">
                          ★ suggested
                        </Badge>
                      )}
                      {r.installed && (
                        <Badge variant="outline" className="tw:h-4 tw:px-1 tw:text-[10px]">
                          {RESOURCES_STRINGS.installedBadge}
                        </Badge>
                      )}
                    </div>
                    <div className="tw:truncate tw:text-[11px] tw:text-muted-foreground">
                      {r.bestLanguageName} · {formatResourceSize(r.size)}
                    </div>
                  </div>
                  {!r.installed && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="tw:h-7 tw:px-2 tw:text-xs"
                      onClick={() => onDownload?.(r)}
                    >
                      <Download className="tw:h-3 tw:w-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="tw:h-7 tw:px-2 tw:text-xs"
                    onClick={() => add(r.dblEntryUid)}
                  >
                    <ArrowRight className="tw:h-3 tw:w-3" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          {/* Selected tray */}
          <div className="tw:flex tw:w-64 tw:shrink-0 tw:flex-col tw:bg-muted/20">
            <div className="tw:flex tw:items-center tw:justify-between tw:px-3 tw:py-2">
              <span className="tw:text-[11px] tw:font-medium tw:uppercase tw:tracking-wide tw:text-muted-foreground">
                Selected
              </span>
              <span className="tw:text-[10px] tw:text-muted-foreground">{selected.length}</span>
            </div>
            <Separator />
            <ul className="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-0.5 tw:overflow-y-auto tw:p-2">
              {selected.length === 0 && (
                <li className="tw:px-2 tw:py-4 tw:text-center tw:text-xs tw:text-muted-foreground">
                  Nothing selected yet
                </li>
              )}
              {selected.map((r) => (
                <li
                  key={r.dblEntryUid}
                  className="tw:flex tw:items-center tw:gap-2 tw:rounded tw:bg-background tw:px-2 tw:py-1.5"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="tw:h-6 tw:w-6"
                    onClick={() => remove(r.dblEntryUid)}
                    aria-label={`Remove ${r.displayName}`}
                  >
                    <ArrowLeft className="tw:h-3 tw:w-3" />
                  </Button>
                  <div className="tw:min-w-0 tw:flex-1">
                    <div className="tw:truncate tw:text-sm">{r.displayName}</div>
                    <div className="tw:truncate tw:text-[10px] tw:text-muted-foreground">
                      {r.bestLanguageName}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="tw:flex tw:items-center tw:justify-between tw:border-t tw:px-4 tw:py-2">
          <span className="tw:text-xs tw:text-muted-foreground">{checkedIds.length} selected</span>
          <div className="tw:flex tw:gap-2">
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              {RESOURCES_STRINGS.cancelSelection}
            </Button>
            <Button size="sm" onClick={() => onApply(checkedIds)}>
              <Check className="tw:mr-1 tw:h-3.5 tw:w-3.5" />
              {RESOURCES_STRINGS.applySelection}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant C — Inline expansion in column
// Mental model: "Drawer in place — no modal, no context switch; the picker IS the column."
// Instead of opening a dialog, the Bible Texts panel collapses its reading area
// and reveals a scrollable, checkbox-driven list inline. Apply commits the
// selection and the column returns to its normal layout. Best for power users
// who don't want their context interrupted by a modal overlay.
// ─────────────────────────────────────────────────────────────────────────────
export function ScriptureResourcesPickerInline({
  open,
  onOpenChange,
  allResources,
  selectedResourceIds,
  userLanguages,
  onApply,
  onDownload,
}: PickerProps) {
  const [query, setQuery] = React.useState('');
  const [checkedIds, setCheckedIds] = React.useState<string[]>(selectedResourceIds);
  React.useEffect(() => {
    if (open) setCheckedIds(selectedResourceIds);
  }, [open, selectedResourceIds]);

  const filtered = useFilteredScriptureResources(allResources, query);
  const ranked = React.useMemo(
    () => rankResourcesForPicker(filtered, selectedResourceIds),
    [filtered, selectedResourceIds],
  );
  const suggestedIds = React.useMemo(
    () =>
      new Set(filterResourcesByUserLanguages(filtered, userLanguages, 3).map((r) => r.dblEntryUid)),
    [filtered, userLanguages],
  );

  const associated = new Set(selectedResourceIds);
  const toggle = (id: string, next: boolean) =>
    setCheckedIds((prev) =>
      next ? Array.from(new Set([...prev, id])) : prev.filter((x) => x !== id),
    );

  if (!open) return <div hidden />;

  return (
    <div className="tw:absolute tw:inset-0 tw:flex tw:flex-col tw:border-l-4 tw:border-primary tw:bg-background tw:shadow-inner">
      <div className="tw:flex tw:items-center tw:justify-between tw:border-b tw:bg-muted/30 tw:px-3 tw:py-2">
        <span className="tw:text-sm tw:font-semibold">{RESOURCES_STRINGS.pickerTitle}</span>
        <Button
          size="icon"
          variant="ghost"
          className="tw:h-6 tw:w-6"
          onClick={() => onOpenChange(false)}
          aria-label="Close picker"
        >
          <X className="tw:h-3.5 tw:w-3.5" />
        </Button>
      </div>
      <div className="tw:px-3 tw:py-2">
        <div className="tw:relative">
          <Search className="tw:pointer-events-none tw:absolute tw:left-2 tw:top-1/2 tw:h-3.5 tw:w-3.5 -tw:translate-y-1/2 tw:text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={RESOURCES_STRINGS.searchPlaceholder}
            className="tw:h-8 tw:pl-7 tw:text-xs"
          />
        </div>
      </div>
      {suggestedIds.size > 0 && (
        <div className="tw:px-3 tw:pb-1 tw:text-[10px] tw:text-muted-foreground">
          ★ Suggested for your languages: {userLanguages.join(', ')}
        </div>
      )}
      <ul className="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-0.5 tw:overflow-y-auto tw:px-2 tw:pb-2">
        {ranked.length === 0 && (
          <li className="tw:px-2 tw:py-4 tw:text-center tw:text-xs tw:text-muted-foreground">
            No matches
          </li>
        )}
        {ranked.map((r) => (
          <ResourceChecklistRow
            key={r.dblEntryUid}
            resource={r}
            checked={checkedIds.includes(r.dblEntryUid)}
            alreadyAssociated={associated.has(r.dblEntryUid)}
            onToggle={(next) => toggle(r.dblEntryUid, next)}
            onDownload={onDownload}
          />
        ))}
      </ul>
      <div className="tw:flex tw:items-center tw:justify-between tw:border-t tw:px-3 tw:py-2">
        <span className="tw:text-xs tw:text-muted-foreground">{checkedIds.length} selected</span>
        <div className="tw:flex tw:gap-2">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            {RESOURCES_STRINGS.cancelSelection}
          </Button>
          <Button size="sm" onClick={() => onApply(checkedIds)}>
            <Check className="tw:mr-1 tw:h-3.5 tw:w-3.5" />
            {RESOURCES_STRINGS.applySelection}
          </Button>
        </div>
      </div>
    </div>
  );
}
