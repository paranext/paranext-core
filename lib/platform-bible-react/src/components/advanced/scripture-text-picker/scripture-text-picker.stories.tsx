import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { Button } from '@/components/shadcn-ui/button';
import { ChevronDown } from 'lucide-react';
import { ScriptureTextPickerProgressive } from './scripture-text-picker-progressive';
import {
  SAMPLE_ITEMS,
  SAMPLE_ITEMS_SPARSE,
  SAMPLE_ITEMS_POPULATED,
} from './scripture-text-picker.data';
import { ScriptureTextItem, PickerAction } from './scripture-text-picker.types';

const meta: Meta = {
  title: 'Advanced/ScriptureTextPicker',
  parameters: { layout: 'centered' },
};
export default meta;

/** Both-dimension resizable shell. Drag the bottom-right corner ↘ to test responsive collapse. */
function ResizableShell({
  children,
  initialWidth = 480,
  initialHeight = 520,
}: {
  children: React.ReactNode;
  initialWidth?: number;
  initialHeight?: number;
}) {
  return (
    <div
      style={{
        width: initialWidth,
        height: initialHeight,
        resize: 'both',
        overflow: 'hidden',
        minWidth: 260,
        minHeight: 220,
        maxWidth: 900,
        maxHeight: 800,
      }}
      className="tw:flex tw:flex-col tw:rounded-lg tw:border tw:bg-background tw:shadow-md"
    >
      <div className="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col">{children}</div>
      <div className="tw:border-t tw:px-3 tw:py-1 tw:text-[0.7rem] tw:text-muted-foreground">
        Drag the bottom-right corner ↘ to resize both dimensions
      </div>
    </div>
  );
}

type Mode = 'single' | 'multi';

/**
 * Reducer applying picker actions against a host that owns items + displayedIds. Mode determines
 * single (toggleDisplay replaces) vs multi (toggleDisplay toggles in set).
 */
function applyAction(
  state: { items: ScriptureTextItem[]; displayedIds: string[] },
  action: PickerAction,
  mode: Mode,
  setItems: React.Dispatch<React.SetStateAction<ScriptureTextItem[]>>,
): { items: ScriptureTextItem[]; displayedIds: string[] } {
  const { items, displayedIds } = state;
  const id = action.item.data.dblEntryUid;

  if (action.type === 'toggleDisplay') {
    if (mode === 'single') {
      const next = displayedIds.includes(id) ? [] : [id];
      return { items, displayedIds: next };
    }
    const next = displayedIds.includes(id)
      ? displayedIds.filter((x) => x !== id)
      : [...displayedIds, id];
    return { items, displayedIds: next };
  }

  if (action.type === 'include') {
    const isAvailable = action.item.status.kind === 'available';
    const nextItems = items.map((it) =>
      it.data.dblEntryUid === id
        ? {
            ...it,
            status: { kind: 'included' as const, ...(isAvailable ? { downloading: true } : {}) },
          }
        : it,
    );
    // Available items finish downloading after a beat.
    if (isAvailable) {
      setTimeout(() => {
        setItems((cur) =>
          cur.map((it) =>
            it.data.dblEntryUid === id && it.status.kind === 'included'
              ? { ...it, status: { ...it.status, downloading: false } }
              : it,
          ),
        );
      }, 2000);
    }
    // Auto-display if nothing is currently displayed (host policy — typical for sparse case).
    const nextDisplayedIds = displayedIds.length === 0 ? [id] : displayedIds;
    return { items: nextItems, displayedIds: nextDisplayedIds };
  }

  if (action.type === 'remove') {
    const item = items.find((i) => i.data.dblEntryUid === id);
    if (!item) return state;
    const nextItems = items.map((it) =>
      it.data.dblEntryUid === id
        ? {
            ...it,
            status: it.data.installed
              ? ({ kind: 'installed' } as const)
              : ({ kind: 'available' } as const),
          }
        : it,
    );
    const nextDisplayedIds = displayedIds.filter((x) => x !== id);
    return { items: nextItems, displayedIds: nextDisplayedIds };
  }

  return state;
}

function ControlledPicker({ initial, mode }: { initial: ScriptureTextItem[]; mode: Mode }) {
  const [items, setItems] = useState(initial);
  const [displayedIds, setDisplayedIds] = useState<string[]>(() => {
    const first = initial.find((i) => i.status.kind === 'included')?.data.dblEntryUid;
    return first ? [first] : [];
  });

  const onAction = (action: PickerAction) => {
    const next = applyAction({ items, displayedIds }, action, mode, setItems);
    setItems(next.items);
    setDisplayedIds(next.displayedIds);
  };

  return (
    <ScriptureTextPickerProgressive
      items={items}
      displayedIds={displayedIds}
      onAction={onAction}
    />
  );
}

export const Single_Populated: StoryObj = {
  name: 'Single · populated (display switcher)',
  render: () => (
    <ResizableShell>
      <ControlledPicker initial={SAMPLE_ITEMS_POPULATED} mode="single" />
    </ResizableShell>
  ),
};

export const Single_Sparse: StoryObj = {
  name: 'Single · sparse (add-mode)',
  render: () => (
    <ResizableShell>
      <ControlledPicker initial={SAMPLE_ITEMS_SPARSE} mode="single" />
    </ResizableShell>
  ),
};

export const Multi_Populated: StoryObj = {
  name: 'Multi · populated',
  render: () => (
    <ResizableShell>
      <ControlledPicker initial={SAMPLE_ITEMS_POPULATED} mode="multi" />
    </ResizableShell>
  ),
};

export const NarrowWidth: StoryObj = {
  name: 'Narrow (340px)',
  render: () => (
    <ResizableShell initialWidth={340}>
      <ControlledPicker initial={SAMPLE_ITEMS} mode="single" />
    </ResizableShell>
  ),
};

export const ShortHeight: StoryObj = {
  name: 'Short height (260px)',
  render: () => (
    <ResizableShell initialHeight={260}>
      <ControlledPicker initial={SAMPLE_ITEMS} mode="single" />
    </ResizableShell>
  ),
};

// ─── Trigger stories — popover stays open across actions ─────────────────

function MockScriptureViewer({
  initial,
  mode,
  panelWidth = 440,
}: {
  initial: ScriptureTextItem[];
  mode: Mode;
  panelWidth?: number;
}) {
  const [items, setItems] = useState(initial);
  const [displayedIds, setDisplayedIds] = useState<string[]>(() => {
    const first = initial.find((i) => i.status.kind === 'included')?.data.dblEntryUid;
    return first ? [first] : [];
  });
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const onAction = (action: PickerAction) => {
    const next = applyAction({ items, displayedIds }, action, mode, setItems);
    setItems(next.items);
    setDisplayedIds(next.displayedIds);
    // Popover stays open — host does not close on any action. User closes via outside-click or Esc.
  };

  const displayed = items.filter((i) => displayedIds.includes(i.data.dblEntryUid));
  const triggerLabel =
    displayed.length === 0
      ? 'Pick a scripture text'
      : displayed.length === 1
        ? displayed[0].data.displayName
        : `${displayed[0].data.displayName} +${displayed.length - 1}`;

  return (
    <div style={{ width: panelWidth }} className="tw:rounded-lg tw:border tw:bg-background tw:p-4">
      <div className="tw:mb-3 tw:flex tw:items-center tw:justify-between">
        <h3 className="tw:text-sm tw:font-medium">
          Scripture viewer
          <span className="tw:ms-2 tw:text-xs tw:text-muted-foreground">({mode})</span>
        </h3>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button ref={triggerRef} variant="outline" className="tw:gap-2">
              <span>{triggerLabel}</span>
              <ChevronDown className="tw:size-4 tw:opacity-60" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={6} className="tw:w-[440px] tw:p-0">
            <div className="tw:flex tw:h-[520px] tw:flex-col">
              <ScriptureTextPickerProgressive
                items={items}
                displayedIds={displayedIds}
                onAction={onAction}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="tw:rounded tw:border tw:border-dashed tw:p-6 tw:text-sm tw:text-muted-foreground">
        {displayed.length === 0 ? (
          <div className="tw:text-center">(nothing shown — pick one above)</div>
        ) : (
          displayed.map((d) => (
            <div key={d.data.dblEntryUid} className="tw:mb-2 tw:last:mb-0">
              <div className="tw:font-medium tw:text-foreground">
                {d.data.fullName}
                {d.status.kind === 'included' && d.status.downloading && (
                  <span className="tw:ms-2 tw:text-xs tw:text-muted-foreground">
                    (downloading…)
                  </span>
                )}
              </div>
              <div className="tw:text-xs">(mock content for {d.data.displayName})</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export const Trigger_Single_Populated: StoryObj = {
  name: 'Trigger · Single · populated',
  render: () => <MockScriptureViewer initial={SAMPLE_ITEMS_POPULATED} mode="single" />,
};

export const Trigger_Single_Sparse: StoryObj = {
  name: 'Trigger · Single · sparse',
  render: () => <MockScriptureViewer initial={SAMPLE_ITEMS_SPARSE} mode="single" />,
};

export const Trigger_Multi_Populated: StoryObj = {
  name: 'Trigger · Multi · populated',
  render: () => <MockScriptureViewer initial={SAMPLE_ITEMS_POPULATED} mode="multi" />,
};
