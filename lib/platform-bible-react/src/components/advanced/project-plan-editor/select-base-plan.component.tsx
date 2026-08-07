import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import { Label } from '@/components/shadcn-ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { cn } from '@/utils/shadcn-ui/utils';
import { useMemo, useState } from 'react';
import type { BasePlanCatalog, BasePlanVersionedOption, SelectedBasePlan } from './types';

export interface SelectBasePlanProps {
  open: boolean;
  catalog: BasePlanCatalog;
  /** Initial selection — used for "edit base plan" entry. */
  initialSelection?: SelectedBasePlan;
  onOpenChange: (open: boolean) => void;
  onConfirm: (selection: SelectedBasePlan) => void;
}

export function SelectBasePlan({
  open,
  catalog,
  initialSelection,
  onOpenChange,
  onConfirm,
}: SelectBasePlanProps) {
  const flatOptions = useMemo<BasePlanVersionedOption[]>(
    () => [...catalog.factory, ...catalog.custom, ...catalog.fromOtherProjects],
    [catalog],
  );

  const [selectedId, setSelectedId] = useState<string | undefined>(initialSelection?.basePlanId);
  const [selectedVersion, setSelectedVersion] = useState<string | undefined>(
    initialSelection?.version,
  );

  const selected = flatOptions.find((option) => option.compositeId === selectedId);

  const handlePickOption = (option: BasePlanVersionedOption) => {
    setSelectedId(option.compositeId);
    // Auto-pick the newest (first listed) version on selection.
    setSelectedVersion(option.versions[0]?.version);
  };

  const canConfirm = !!(selectedId && selectedVersion);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="tw:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select base plan</DialogTitle>
          <DialogDescription>
            Pick the base plan and version you want to start from. The plan content from that
            version will be loaded into the editor — you can customise it before saving.
          </DialogDescription>
        </DialogHeader>

        <div className="tw:grid tw:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] tw:gap-4">
          <div className="tw:flex tw:flex-col tw:gap-3 tw:max-h-[420px] tw:overflow-auto">
            <CatalogSection
              heading="Factory plans"
              options={catalog.factory}
              selectedId={selectedId}
              onPick={handlePickOption}
            />
            <CatalogSection
              heading="Custom plans on this computer"
              options={catalog.custom}
              selectedId={selectedId}
              onPick={handlePickOption}
            />
            <CatalogSection
              heading="Plans from other projects"
              options={catalog.fromOtherProjects}
              selectedId={selectedId}
              onPick={handlePickOption}
            />
          </div>

          <div className="tw:rounded-lg tw:border tw:border-border tw:bg-card tw:p-3">
            {selected ? (
              <div className="tw:flex tw:flex-col tw:gap-3">
                <div>
                  <div className="tw:text-sm tw:text-muted-foreground">
                    {labelForKind(selected.kind)}
                  </div>
                  <div className="tw:text-base tw:font-semibold">{selected.displayName}</div>
                </div>
                {selected.description && (
                  <p className="tw:text-sm tw:text-muted-foreground">{selected.description}</p>
                )}
                <div className="tw:flex tw:flex-col tw:gap-1">
                  <Label htmlFor="base-plan-version">Version</Label>
                  <Select
                    value={selectedVersion}
                    onValueChange={setSelectedVersion}
                    disabled={selected.versions.length === 0}
                  >
                    <SelectTrigger id="base-plan-version">
                      <SelectValue placeholder="Choose a version" />
                    </SelectTrigger>
                    <SelectContent>
                      {selected.versions.map((version, index) => (
                        <SelectItem key={version.version} value={version.version}>
                          <span className="tw:font-medium">v{version.version}</span>
                          {version.releaseDate && (
                            <span className="tw:ms-2 tw:text-xs tw:text-muted-foreground">
                              ({version.releaseDate}
                              {index === 0 ? ' — latest' : ''})
                            </span>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="tw:flex tw:h-full tw:items-center tw:justify-center tw:text-sm tw:text-muted-foreground">
                Pick a base plan on the left to see its details and choose a version.
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={!canConfirm}
            onClick={() => {
              if (selectedId && selectedVersion) {
                onConfirm({ basePlanId: selectedId, version: selectedVersion });
              }
            }}
          >
            Use this base plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CatalogSection({
  heading,
  options,
  selectedId,
  onPick,
}: {
  heading: string;
  options: BasePlanVersionedOption[];
  selectedId: string | undefined;
  onPick: (option: BasePlanVersionedOption) => void;
}) {
  if (options.length === 0) return undefined;
  return (
    <div className="tw:flex tw:flex-col tw:gap-1">
      <div className="tw:text-xs tw:font-medium tw:uppercase tw:tracking-wide tw:text-muted-foreground">
        {heading}
      </div>
      <ul className="tw:flex tw:flex-col tw:gap-1">
        {options.map((option) => (
          <li key={option.compositeId}>
            <button
              type="button"
              onClick={() => onPick(option)}
              className={cn(
                'tw:w-full tw:rounded-md tw:border tw:border-border tw:bg-card tw:px-2 tw:py-1.5 tw:text-start tw:text-sm',
                'tw:hover:bg-muted tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring',
                option.compositeId === selectedId && 'tw:border-primary tw:bg-muted',
              )}
            >
              <div className="tw:font-medium">{option.displayName}</div>
              <div className="tw:text-xs tw:text-muted-foreground">
                Latest v{option.versions[0]?.version ?? '—'}
                {option.versions.length > 1 && ` (${option.versions.length} versions)`}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function labelForKind(kind: BasePlanVersionedOption['kind']): string {
  switch (kind) {
    case 'factory':
      return 'Factory plan';
    case 'custom':
      return 'Custom plan';
    case 'project':
      return "Another project's plan";
    default:
      return 'Plan';
  }
}
