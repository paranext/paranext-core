import { ChevronDown, MoreHorizontal, Plus, X } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Badge } from '@/components/shadcn-ui/badge';
import { Separator } from '@/components/shadcn-ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { DblResourceData } from 'platform-bible-utils';
import { RESOURCES_STRINGS } from './scripture-resources-tab.utils';

export type PopulatedTabProps = {
  /** All resources currently associated with the project (admin + user merged). */
  resources: DblResourceData[];
  /** Which resource is currently being read. */
  activeResourceId: string;
  onActiveResourceChange: (id: string) => void;
  /** Resources Donna (admin) added — Saroj cannot remove. */
  adminAssociatedIds: string[];
  /** Resources Saroj added — Saroj can remove. */
  userAssociatedIds: string[];
  /** Opens the multi-select picker (Area 3). */
  onOpenPicker: () => void;
  /** Remove handler — only invoked for user-associated resources. */
  onRemoveResource?: (id: string) => void;
  /** Force the disabled-remove tooltip visible (stories). */
  forceRemoveTooltipOpenForId?: string;
};

/** Stub body shown for the active resource — a few lines of Genesis 1 stand-in. */
function ResourceReader({ resource }: { resource: DblResourceData }) {
  return (
    <div className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-overflow-y-auto tw-p-3">
      <div className="tw-mb-2 tw-flex tw-items-baseline tw-gap-2">
        <span className="tw-text-sm tw-font-semibold">{resource.displayName}</span>
        <span className="tw-text-xs tw-text-muted-foreground">· Genesis 1</span>
      </div>
      <p className="tw-text-sm tw-leading-relaxed tw-text-foreground/90">
        <sup className="tw-mr-1 tw-text-[10px] tw-text-muted-foreground">1</sup>
        In the beginning God created the heavens and the earth.
        <sup className="tw-mx-1 tw-text-[10px] tw-text-muted-foreground">2</sup>
        Now the earth was formless and empty, darkness was over the surface of the deep, and the
        Spirit of God was hovering over the waters.
        <sup className="tw-mx-1 tw-text-[10px] tw-text-muted-foreground">3</sup>
        And God said, “Let there be light,” and there was light.
      </p>
    </div>
  );
}

/**
 * Renders the remove button for a single resource. Admin-added resources get a disabled button with
 * a tooltip explaining why. User-added resources get a live remove handler.
 */
function RemoveResourceButton({
  resource,
  isAdminAdded,
  onRemove,
  forceTooltipOpen,
}: {
  resource: DblResourceData;
  isAdminAdded: boolean;
  onRemove?: (id: string) => void;
  forceTooltipOpen?: boolean;
}) {
  // We always render a TooltipProvider so the tooltip works for both the disabled
  // (admin-added) state and the regular hover-to-remove affordance.
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip open={forceTooltipOpen || undefined}>
        <TooltipTrigger asChild>
          {/* span wrapper so the tooltip still fires when the button is disabled */}
          <span className="tw-inline-flex">
            <Button
              size="icon"
              variant="ghost"
              className="tw-h-6 tw-w-6"
              disabled={isAdminAdded}
              onClick={() => !isAdminAdded && onRemove?.(resource.dblEntryUid)}
              aria-label={`${RESOURCES_STRINGS.remove} ${resource.displayName}`}
            >
              <X className="tw-h-3.5 tw-w-3.5" />
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="tw-max-w-xs tw-text-xs">
          {isAdminAdded
            ? RESOURCES_STRINGS.adminAddedTooltip
            : `${RESOURCES_STRINGS.remove} ${resource.displayName}`}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function getActive(resources: DblResourceData[], activeId: string): DblResourceData | undefined {
  return resources.find((r) => r.dblEntryUid === activeId) ?? resources[0];
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant A — Icon-tab strip with overflow dropdown
// Mental model: "Browser tabs — I see all my resources at a glance and click to switch."
// Each resource gets a compact icon-tab pill at the top of the column. The active
// tab is highlighted. Overflow tabs collapse into a "More" dropdown. A trailing
// "+" affordance opens the picker. CRITICAL: tab pills are explicitly NOT draggable —
// they are buttons, not the 10Power tab chrome. No grippers, no drop indicators.
// ─────────────────────────────────────────────────────────────────────────────
export function ScriptureResourcesTabIconStrip({
  resources,
  activeResourceId,
  onActiveResourceChange,
  adminAssociatedIds,
  onOpenPicker,
  onRemoveResource,
  forceRemoveTooltipOpenForId,
}: PopulatedTabProps) {
  const VISIBLE = 3;
  const visible = resources.slice(0, VISIBLE);
  const overflow = resources.slice(VISIBLE);
  const active = getActive(resources, activeResourceId);
  const adminSet = new Set(adminAssociatedIds);

  return (
    <div className="tw-flex tw-h-full tw-w-full tw-flex-col">
      <div className="tw-flex tw-items-center tw-gap-1 tw-border-b tw-bg-muted/30 tw-px-2 tw-py-1.5">
        {visible.map((r) => {
          const isActive = r.dblEntryUid === active?.dblEntryUid;
          const isAdmin = adminSet.has(r.dblEntryUid);
          return (
            <div
              key={r.dblEntryUid}
              className={[
                'tw-flex tw-items-center tw-gap-1 tw-rounded tw-border tw-px-2 tw-py-1 tw-text-xs',
                isActive
                  ? 'tw-border-primary tw-bg-background tw-font-semibold'
                  : 'tw-border-transparent tw-bg-transparent hover:tw-bg-background',
              ].join(' ')}
            >
              <button
                type="button"
                draggable={false}
                onClick={() => onActiveResourceChange(r.dblEntryUid)}
                className="tw-flex tw-items-center tw-gap-1"
                title={r.fullName}
              >
                <span>{r.displayName}</span>
                {isAdmin && (
                  <Badge variant="outline" className="tw-h-3.5 tw-px-1 tw-text-[9px]">
                    admin
                  </Badge>
                )}
              </button>
              <RemoveResourceButton
                resource={r}
                isAdminAdded={isAdmin}
                onRemove={onRemoveResource}
                forceTooltipOpen={forceRemoveTooltipOpenForId === r.dblEntryUid}
              />
            </div>
          );
        })}
        {overflow.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost" className="tw-h-7 tw-px-2 tw-text-xs">
                <MoreHorizontal className="tw-mr-1 tw-h-3.5 tw-w-3.5" />
                {overflow.length} more
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Other resources</DropdownMenuLabel>
              {overflow.map((r) => (
                <DropdownMenuItem
                  key={r.dblEntryUid}
                  onClick={() => onActiveResourceChange(r.dblEntryUid)}
                >
                  {r.displayName}{' '}
                  <span className="tw-ml-2 tw-text-xs tw-text-muted-foreground">
                    {r.bestLanguageName}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <div className="tw-flex-1" />
        <Button size="sm" variant="ghost" className="tw-h-7 tw-px-2" onClick={onOpenPicker}>
          <Plus className="tw-mr-1 tw-h-3.5 tw-w-3.5" />
          {RESOURCES_STRINGS.addMoreShort}
        </Button>
      </div>
      {active ? (
        <ResourceReader resource={active} />
      ) : (
        <div className="tw-flex tw-flex-1 tw-items-center tw-justify-center tw-text-xs tw-text-muted-foreground">
          Select a resource
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant B — Sidebar list within column
// Mental model: "Inbox + reading pane — left rail is my shelf, right pane is the book."
// Vertical resource list on the left of Column 3; the active resource fills the rest.
// Higher discoverability for long lists; uses more horizontal space.
// ─────────────────────────────────────────────────────────────────────────────
export function ScriptureResourcesTabSidebarList({
  resources,
  activeResourceId,
  onActiveResourceChange,
  adminAssociatedIds,
  onOpenPicker,
  onRemoveResource,
  forceRemoveTooltipOpenForId,
}: PopulatedTabProps) {
  const active = getActive(resources, activeResourceId);
  const adminSet = new Set(adminAssociatedIds);
  return (
    <div className="tw-flex tw-h-full tw-w-full">
      <aside className="tw-flex tw-w-40 tw-shrink-0 tw-flex-col tw-border-r tw-bg-muted/20">
        <div className="tw-flex tw-items-center tw-justify-between tw-px-2 tw-py-1.5">
          <span className="tw-text-[10px] tw-font-medium tw-uppercase tw-tracking-wide tw-text-muted-foreground">
            Bible texts
          </span>
          <Button
            size="icon"
            variant="ghost"
            className="tw-h-6 tw-w-6"
            onClick={onOpenPicker}
            aria-label={RESOURCES_STRINGS.addMore}
          >
            <Plus className="tw-h-3.5 tw-w-3.5" />
          </Button>
        </div>
        <Separator />
        <ul className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-overflow-y-auto">
          {resources.map((r) => {
            const isActive = r.dblEntryUid === active?.dblEntryUid;
            const isAdmin = adminSet.has(r.dblEntryUid);
            return (
              <li key={r.dblEntryUid} className="tw-group">
                <button
                  type="button"
                  draggable={false}
                  onClick={() => onActiveResourceChange(r.dblEntryUid)}
                  className={[
                    'tw-flex tw-w-full tw-items-center tw-justify-between tw-px-2 tw-py-1.5 tw-text-left tw-text-xs',
                    isActive ? 'tw-bg-background tw-font-semibold' : 'hover:tw-bg-background/60',
                  ].join(' ')}
                >
                  <div className="tw-min-w-0 tw-flex-1">
                    <div className="tw-flex tw-items-center tw-gap-1.5">
                      <span className="tw-truncate">{r.displayName}</span>
                      {isAdmin && (
                        <Badge variant="outline" className="tw-h-3.5 tw-px-1 tw-text-[9px]">
                          admin
                        </Badge>
                      )}
                    </div>
                    <div className="tw-truncate tw-text-[10px] tw-text-muted-foreground">
                      {r.bestLanguageName}
                    </div>
                  </div>
                  <span className="tw-opacity-0 group-hover:tw-opacity-100">
                    <RemoveResourceButton
                      resource={r}
                      isAdminAdded={isAdmin}
                      onRemove={onRemoveResource}
                      forceTooltipOpen={forceRemoveTooltipOpenForId === r.dblEntryUid}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
      <div className="tw-flex tw-min-w-0 tw-flex-1 tw-flex-col">
        {active ? (
          <ResourceReader resource={active} />
        ) : (
          <div className="tw-flex tw-flex-1 tw-items-center tw-justify-center tw-text-xs tw-text-muted-foreground">
            Select a resource
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant C — Dropdown selector
// Mental model: "Radio — one selection at a time, minimal chrome, maximum reading space."
// A single compact dropdown at the top of the column lists all associated resources.
// Switching is one click. Maximizes vertical reading space; the cost is that the
// user can't see their other resources without opening the menu.
// ─────────────────────────────────────────────────────────────────────────────
export function ScriptureResourcesTabDropdown({
  resources,
  activeResourceId,
  onActiveResourceChange,
  adminAssociatedIds,
  userAssociatedIds,
  onOpenPicker,
  onRemoveResource,
  forceRemoveTooltipOpenForId,
}: PopulatedTabProps) {
  const active = getActive(resources, activeResourceId);
  const adminSet = new Set(adminAssociatedIds);
  const userSet = new Set(userAssociatedIds);
  const activeIsAdmin = active ? adminSet.has(active.dblEntryUid) : false;

  return (
    <div className="tw-flex tw-h-full tw-w-full tw-flex-col">
      <div className="tw-flex tw-items-center tw-gap-2 tw-border-b tw-bg-muted/20 tw-px-3 tw-py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="tw-h-7 tw-justify-between tw-gap-2 tw-text-xs"
            >
              <span className="tw-flex tw-items-baseline tw-gap-1.5">
                <span className="tw-font-semibold">{active?.displayName ?? '—'}</span>
                {active && (
                  <span className="tw-text-[10px] tw-text-muted-foreground">
                    {active.bestLanguageName}
                  </span>
                )}
              </span>
              <ChevronDown className="tw-h-3.5 tw-w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="tw-min-w-[220px]">
            <DropdownMenuLabel>Switch Bible text</DropdownMenuLabel>
            {resources.map((r) => {
              const isAdmin = adminSet.has(r.dblEntryUid);
              const isUser = userSet.has(r.dblEntryUid);
              return (
                <DropdownMenuItem
                  key={r.dblEntryUid}
                  onClick={() => onActiveResourceChange(r.dblEntryUid)}
                  className="tw-flex tw-items-center tw-justify-between tw-gap-2"
                >
                  <span className="tw-flex tw-items-center tw-gap-2">
                    <span>{r.displayName}</span>
                    {isAdmin && (
                      <Badge variant="outline" className="tw-h-3.5 tw-px-1 tw-text-[9px]">
                        admin
                      </Badge>
                    )}
                    {isUser && !isAdmin && (
                      <Badge variant="secondary" className="tw-h-3.5 tw-px-1 tw-text-[9px]">
                        yours
                      </Badge>
                    )}
                  </span>
                  <span className="tw-text-[10px] tw-text-muted-foreground">
                    {r.bestLanguageName}
                  </span>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onOpenPicker}>
              <Plus className="tw-mr-2 tw-h-3.5 tw-w-3.5" />
              {RESOURCES_STRINGS.addMore}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="tw-flex-1" />
        {active && (
          <RemoveResourceButton
            resource={active}
            isAdminAdded={activeIsAdmin}
            onRemove={onRemoveResource}
            forceTooltipOpen={forceRemoveTooltipOpenForId === active.dblEntryUid}
          />
        )}
      </div>
      {active ? (
        <ResourceReader resource={active} />
      ) : (
        <div className="tw-flex tw-flex-1 tw-items-center tw-justify-center tw-text-xs tw-text-muted-foreground">
          Select a resource
        </div>
      )}
    </div>
  );
}
