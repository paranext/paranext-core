import {
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { Separator } from '@/components/shadcn-ui/separator';
import { Library } from 'lucide-react';
import { ResourcePickerItem, primaryActionFor } from './resource-picker-item';
import {
  CompactPickerAction,
  PickerAction,
  ResourceItem,
  ResourceType,
} from './resource-picker.types';
import {
  ResourcePickerLocalizedStrings,
  localizeResourcePicker as L,
} from './resource-picker.strings';

/** Props for {@link ResourcePickerCompact}. */
export interface ResourcePickerCompactProps {
  /** Full set of resources. Only `included` items render in the compact list. */
  items: ResourceItem[];
  /**
   * IDs of items currently displayed on the calling surface. The picker emphasizes these rows and
   * emits `toggleDisplay` on click — the host applies its own single/multi semantics.
   */
  displayedIds?: string[];
  /**
   * If provided, restricts the list to items whose `data.type` matches one of these. Useful for
   * scoping the picker to a specific kind of resource (e.g. scripture texts only).
   */
  allowedResourceTypes?: ResourceType[];
  /**
   * Label for the footer button that opens the broader library surface. Pass a pre-localized string
   * — e.g. `"Browse all scripture texts"` for a scripture-only picker. Falls back to
   * `%resourcePicker_compact_browseLibrary%` ("Browse library") when omitted.
   */
  browseLabel?: string;
  /**
   * Fires when the user clicks the footer button. Host opens the full library surface (typically a
   * dialog rendering {@link ResourcePicker}). The compact popover closes automatically before this
   * is called.
   */
  onBrowse: () => void;
  /**
   * Receives clicks on included rows and the X (remove) button. The compact picker only emits
   * `toggleDisplay` and `remove` — `include` is not possible because installed/available items
   * aren't shown.
   */
  onAction: (action: CompactPickerAction) => void;
  /** The element that opens the popover. Slotted into `PopoverTrigger asChild`. */
  trigger: ReactNode;
  /**
   * Controlled open state. Omit to let the popover manage its own state; provide both `open` and
   * `onOpenChange` to control it from the host (e.g. to bridge into a modal).
   */
  open?: boolean;
  /** Fires when the controlled open state changes. Pair with `open`. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Where the popover anchors relative to the trigger. Defaults to `end` to match the common
   * "trigger on the right side of a toolbar" pattern.
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Width of the popover content area. Defaults to `'18rem'`. Pass a number for pixels or a full
   * CSS length string.
   */
  width?: number | string;
  localizedStrings?: ResourcePickerLocalizedStrings;
}

/**
 * # Resource picker (compact)
 *
 * A single-select-style dropdown for switching **which included resource is currently shown** on
 * the calling surface, with a footer "Browse library" affordance that hands off to the full library
 * surface for project-membership management.
 *
 * The compact picker is the everyday surface — opens from a toolbar button, lets the user pick one
 * of the resources already in the project, closes on selection. The full {@link ResourcePicker}
 * (rendered inside a dialog) is the deeper surface for adding, removing, and discovering resources
 * across the whole catalog.
 *
 * ## What it shows
 *
 * Only the `included` items from `items` — filtered further by `allowedResourceTypes` if provided.
 * Each row uses the same internal `ResourcePickerItem` as the full picker, so visuals (status icon,
 * name, language chip, remove affordance) stay consistent across surfaces.
 *
 * A footer button labeled `Browse library` (or the consumer-provided `browseLabel`) opens the
 * broader library — the host handles what that means (typically a dialog).
 *
 * ## Action model
 *
 * - Click an included row → `onAction({ type: 'toggleDisplay', item })`. The popover closes.
 * - Click the X on a non-locked included row → `onAction({ type: 'remove', item })`. The popover
 *   stays open so the user can pick another.
 * - Press `Delete` / `Backspace` while a non-locked included row is focused → same `remove`.
 * - Click the footer button → popover closes, then `onBrowse` fires.
 *
 * The picker always emits actions uniformly; if the host doesn't want re-click of the currently
 * displayed item to do anything, it can no-op on `toggleDisplay` of an already-displayed id.
 *
 * ## Open state
 *
 * Uncontrolled by default. Pass both `open` and `onOpenChange` to control it (e.g. to keep the
 * popover open while a dialog is mounted, or to gate it behind some other host policy).
 */
export function ResourcePickerCompact({
  items,
  displayedIds,
  allowedResourceTypes,
  browseLabel,
  onBrowse,
  onAction,
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  align = 'end',
  width = '18rem',
  localizedStrings,
}: ResourcePickerCompactProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next);
    controlledOnOpenChange?.(next);
  };

  const includedItems = useMemo(() => {
    const inScope =
      allowedResourceTypes && allowedResourceTypes.length > 0
        ? items.filter((i) => allowedResourceTypes.includes(i.data.type))
        : items;
    return inScope.filter((i) => i.status.kind === 'included');
  }, [items, allowedResourceTypes]);

  // Roving tabindex over the small included list
  const [activeId, setActiveId] = useState<string | undefined>();
  const rowRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const pendingFocusIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (includedItems.length === 0) {
      setActiveId(undefined);
      return;
    }
    if (!activeId || !includedItems.some((r) => r.data.dblEntryUid === activeId)) {
      setActiveId(includedItems[0].data.dblEntryUid);
    }
  }, [includedItems, activeId]);

  useLayoutEffect(() => {
    const id = pendingFocusIdRef.current;
    if (!id) return;
    pendingFocusIdRef.current = undefined;
    const el = rowRefs.current.get(id);
    if (el) {
      setActiveId(id);
      el.focus();
    }
  }, [items, displayedIds]);

  const focusRow = (id: string) => {
    setActiveId(id);
    requestAnimationFrame(() => rowRefs.current.get(id)?.focus());
  };

  const handleAction = (action: PickerAction) => {
    if (action.type === 'toggleDisplay') {
      onAction(action);
      // Single-select dropdown UX: close after picking. The host can ignore the action (re-click
      // of the currently-displayed item) and the user still sees the expected close.
      setOpen(false);
    } else if (action.type === 'remove') {
      onAction(action);
      // Stay open after a remove so the user can pick another.
    }
    // `include` is not emitted by the compact picker (no installed/available rows rendered).
  };

  const onListKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (includedItems.length === 0) return;
    const idx = includedItems.findIndex((r) => r.data.dblEntryUid === activeId);
    const target = includedItems[idx];

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = includedItems[Math.min(idx + 1, includedItems.length - 1)];
      if (next) focusRow(next.data.dblEntryUid);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = includedItems[Math.max(idx - 1, 0)];
      if (prev) focusRow(prev.data.dblEntryUid);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusRow(includedItems[0].data.dblEntryUid);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusRow(includedItems[includedItems.length - 1].data.dblEntryUid);
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (!target) return;
      e.preventDefault();
      handleAction(primaryActionFor(target));
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      if (target && target.status.kind === 'included' && !target.status.lockedIncluded) {
        e.preventDefault();
        const next = includedItems[idx + 1] ?? includedItems[idx - 1];
        pendingFocusIdRef.current = next?.data.dblEntryUid;
        handleAction({ type: 'remove', item: target });
      }
    }
  };

  const handleBrowseClick = () => {
    setOpen(false);
    onBrowse();
  };

  const browseText = browseLabel ?? L(localizedStrings, '%resourcePicker_compact_browseLibrary%');
  const emptyText = L(localizedStrings, '%resourcePicker_compact_empty%');
  const widthStyle = typeof width === 'number' ? `${width}px` : width;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align={align} sideOffset={6} className="tw:p-0" style={{ width: widthStyle }}>
        <div className="tw:flex tw:w-full tw:flex-col tw:overflow-hidden">
          <div
            role="listbox"
            tabIndex={-1}
            aria-label={L(localizedStrings, '%resourcePicker_listbox_label%')}
            onKeyDown={onListKeyDown}
            className="tw:@container tw:max-h-[18rem] tw:overflow-y-auto tw:p-1 tw:focus:outline-none"
          >
            {includedItems.length === 0 ? (
              <p className="tw:py-6 tw:text-center tw:text-sm tw:text-muted-foreground">
                {emptyText}
              </p>
            ) : (
              includedItems.map((it) => (
                <ResourcePickerItem
                  key={it.data.dblEntryUid}
                  ref={(el) => {
                    if (el) rowRefs.current.set(it.data.dblEntryUid, el);
                    else rowRefs.current.delete(it.data.dblEntryUid);
                  }}
                  item={it}
                  isDisplayed={displayedIds?.includes(it.data.dblEntryUid) ?? false}
                  isActive={activeId === it.data.dblEntryUid}
                  onAction={handleAction}
                  localizedStrings={localizedStrings}
                />
              ))
            )}
          </div>
          <Separator />
          <button
            type="button"
            onClick={handleBrowseClick}
            className="tw:flex tw:w-full tw:items-center tw:gap-2 tw:px-3 tw:py-2 tw:text-xs tw:font-medium tw:text-muted-foreground tw:hover:bg-accent tw:hover:text-foreground"
          >
            <Library className="tw:size-3.5" />
            <span>{browseText}</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
