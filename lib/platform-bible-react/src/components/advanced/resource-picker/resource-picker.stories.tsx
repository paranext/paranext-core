import { ReactNode, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/shadcn-ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shadcn-ui/dialog';
import { ChevronDown } from 'lucide-react';
import { ResourcePicker } from './resource-picker';
import { ResourcePickerCompact } from './resource-picker-compact';
import {
  SAMPLE_ITEMS,
  SAMPLE_ITEMS_SPARSE,
  SAMPLE_ITEMS_POPULATED,
  PREFERRED_LANGUAGES,
} from './resource-picker.data';
import { PickerAction, ResourceItem, ResourceType } from './resource-picker.types';

type Mode = 'single' | 'multi';

const DATASETS: Record<string, ResourceItem[]> = {
  populated: SAMPLE_ITEMS_POPULATED,
  sparse: SAMPLE_ITEMS_SPARSE,
  mixed: SAMPLE_ITEMS,
};

const meta: Meta = {
  title: 'Advanced/ResourcePicker',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
\`ResourcePicker\` is the **full library** view — typically rendered inside a dialog — for
managing a project's resource membership. \`ResourcePickerCompact\` is the **in-context
dropdown** for switching which already-included resource is shown on the calling surface.

The two surfaces share visuals (rows, status icons, language chips, remove affordance) and a
single \`PickerAction\` contract; only the layout and what's exposed differ.

\`ResourcePickerDialog\` (a separate component in this lib) wraps \`ResourcePicker\` with
dialog chrome and is the recommended modal surface for the compact picker's "Browse library"
button to open.

See \`./DESIGN.md\` for the decision history behind the compact/full split.
        `,
      },
    },
  },
};
export default meta;

// ─── Stateful host wrapper ─────────────────────────────────────────────────

function useResourceHost(initial: ResourceItem[], mode: Mode) {
  const [items, setItems] = useState<ResourceItem[]>(initial);
  const [displayedIds, setDisplayedIds] = useState<string[]>(() => {
    const first = initial.find((i) => i.status.kind === 'included')?.data.dblEntryUid;
    return first ? [first] : [];
  });

  const onAction = (action: PickerAction) => {
    if (action.type === 'toggleDisplay') {
      const id = action.item.data.dblEntryUid;
      if (mode === 'single') {
        setDisplayedIds(displayedIds.includes(id) ? [] : [id]);
      } else {
        setDisplayedIds(
          displayedIds.includes(id) ? displayedIds.filter((x) => x !== id) : [...displayedIds, id],
        );
      }
    } else if (action.type === 'include') {
      const id = action.item.data.dblEntryUid;
      const isAvailable = action.item.status.kind === 'available';
      setItems((prev) =>
        prev.map((it) =>
          it.data.dblEntryUid === id
            ? {
                ...it,
                status: {
                  kind: 'included' as const,
                  ...(isAvailable ? { downloading: true } : {}),
                },
              }
            : it,
        ),
      );
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
      if (mode === 'single') {
        setDisplayedIds([id]);
      } else {
        setDisplayedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
      }
    } else if (action.type === 'remove') {
      const id = action.item.data.dblEntryUid;
      setItems((prev) =>
        prev.map((it) =>
          it.data.dblEntryUid === id
            ? {
                ...it,
                status: it.data.installed
                  ? ({ kind: 'installed' } as const)
                  : ({ kind: 'available' } as const),
              }
            : it,
        ),
      );
      setDisplayedIds((prev) => prev.filter((x) => x !== id));
    }
  };

  return { items, displayedIds, onAction };
}

function ResizableShell({
  children,
  initialWidth = 480,
  initialHeight = 520,
}: {
  children: ReactNode;
  initialWidth?: number;
  initialHeight?: number;
}) {
  return (
    <div
      title="Drag ↘ to resize"
      style={{
        width: initialWidth,
        height: initialHeight,
        resize: 'both',
        overflow: 'hidden',
        minWidth: 260,
        minHeight: 200,
        maxWidth: 900,
        maxHeight: 800,
      }}
      className="tw:relative tw:flex tw:flex-col tw:rounded-lg tw:border tw:bg-background tw:shadow-md"
    >
      {children}
      <span
        aria-hidden
        className="tw:pointer-events-none tw:absolute tw:bottom-0.5 tw:right-0.5 tw:select-none tw:text-[0.65rem] tw:text-muted-foreground/60"
      >
        ↘
      </span>
    </div>
  );
}

function ControlledFullPicker({
  dataset,
  mode,
  allowedResourceTypes,
}: {
  dataset: keyof typeof DATASETS;
  mode: Mode;
  allowedResourceTypes?: ResourceType[];
}) {
  const { items, displayedIds, onAction } = useResourceHost(DATASETS[dataset], mode);
  return (
    <ResourcePicker
      items={items}
      displayedIds={displayedIds}
      preferredLanguages={PREFERRED_LANGUAGES}
      allowedResourceTypes={allowedResourceTypes}
      onAction={onAction}
    />
  );
}

// ─── ResourcePicker (full) stories ─────────────────────────────────────────

interface FullPlaygroundArgs {
  dataset: keyof typeof DATASETS;
  mode: Mode;
  filter: 'all' | 'scripture' | 'commentary';
  shellWidth: number;
  shellHeight: number;
}

const FILTER_MAP: Record<FullPlaygroundArgs['filter'], ResourceType[] | undefined> = {
  all: undefined,
  scripture: ['ScriptureResource'],
  commentary: ['CommentaryResource'],
};

export const FullPlayground: StoryObj<FullPlaygroundArgs> = {
  name: 'Full · Playground',
  args: {
    dataset: 'populated',
    mode: 'single',
    filter: 'all',
    shellWidth: 480,
    shellHeight: 520,
  },
  argTypes: {
    dataset: { control: { type: 'select' }, options: ['populated', 'sparse', 'mixed'] },
    mode: { control: { type: 'inline-radio' }, options: ['single', 'multi'] },
    filter: {
      control: { type: 'inline-radio' },
      options: ['all', 'scripture', 'commentary'],
      description: 'Scopes the picker via `allowedResourceTypes`.',
    },
    shellWidth: { control: { type: 'range', min: 260, max: 900, step: 20 } },
    shellHeight: { control: { type: 'range', min: 200, max: 800, step: 20 } },
  },
  render: (args) => (
    <ResizableShell initialWidth={args.shellWidth} initialHeight={args.shellHeight}>
      <ControlledFullPicker
        dataset={args.dataset}
        mode={args.mode}
        allowedResourceTypes={FILTER_MAP[args.filter]}
      />
    </ResizableShell>
  ),
};

export const FullStandalone: StoryObj = {
  name: 'Full · Standalone',
  render: () => (
    <ResizableShell>
      <ControlledFullPicker dataset="populated" mode="single" />
    </ResizableShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The full picker in isolation. This is the body that `ResourcePickerDialog` mounts inside a modal — shown here without the dialog chrome so the picker contract is the focus.',
      },
    },
  },
};

export const FullScriptureOnly: StoryObj = {
  name: 'Full · Scripture only',
  render: () => (
    <ResizableShell>
      <ControlledFullPicker
        dataset="populated"
        mode="single"
        allowedResourceTypes={['ScriptureResource']}
      />
    </ResizableShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`allowedResourceTypes={["ScriptureResource"]}` scopes the picker to scripture texts. Commentaries in the same dataset are filtered out.',
      },
    },
  },
};

export const FullCommentariesOnly: StoryObj = {
  name: 'Full · Commentaries only',
  render: () => (
    <ResizableShell>
      <ControlledFullPicker
        dataset="populated"
        mode="single"
        allowedResourceTypes={['CommentaryResource']}
      />
    </ResizableShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`allowedResourceTypes={["CommentaryResource"]}` scopes the picker to commentaries. Same dataset, different filter.',
      },
    },
  },
};

// ─── ResourcePickerCompact stories ─────────────────────────────────────────

/**
 * Compact picker mounted in a realistic host with a "browse library" bridge to a dialog rendering
 * the full picker. The dialog uses the same items/displayedIds state so removes done in either
 * surface are reflected in the other.
 */
function CompactWithLibraryBridge({
  initial,
  mode,
  allowedResourceTypes,
  browseLabel,
}: {
  initial: ResourceItem[];
  mode: Mode;
  allowedResourceTypes?: ResourceType[];
  browseLabel?: string;
}) {
  const { items, displayedIds, onAction } = useResourceHost(initial, mode);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const displayedItem = items.find((i) => displayedIds.includes(i.data.dblEntryUid));
  const triggerLabel =
    displayedItem?.data.displayName ?? (mode === 'multi' ? 'Pick resources' : 'Pick a resource');

  return (
    <div className="tw:flex tw:flex-col tw:items-start tw:gap-3">
      <ResourcePickerCompact
        items={items}
        displayedIds={displayedIds}
        allowedResourceTypes={allowedResourceTypes}
        browseLabel={browseLabel}
        onAction={onAction}
        onBrowse={() => setLibraryOpen(true)}
        trigger={
          <Button variant="outline" className="tw:gap-2">
            <span>{triggerLabel}</span>
            <ChevronDown className="tw:size-4 tw:opacity-60" />
          </Button>
        }
      />
      <div className="tw:w-[360px] tw:rounded tw:border tw:border-dashed tw:p-4 tw:text-sm tw:text-muted-foreground">
        {displayedItem ? (
          <>
            <div className="tw:font-medium tw:text-foreground">{displayedItem.data.fullName}</div>
            <div className="tw:text-xs">(mock content for {displayedItem.data.displayName})</div>
          </>
        ) : (
          <div className="tw:text-center">(nothing shown — pick one above)</div>
        )}
      </div>

      <Dialog open={libraryOpen} onOpenChange={setLibraryOpen}>
        <DialogContent className="tw:max-w-2xl tw:p-0">
          <DialogHeader className="tw:px-4 tw:pt-4">
            <DialogTitle>Resource library</DialogTitle>
          </DialogHeader>
          <div className="tw:px-4 tw:pb-4">
            <ResourcePicker
              items={items}
              displayedIds={displayedIds}
              preferredLanguages={PREFERRED_LANGUAGES}
              allowedResourceTypes={allowedResourceTypes}
              onAction={onAction}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const CompactDefault: StoryObj = {
  name: 'Compact · Default',
  render: () => <CompactWithLibraryBridge initial={SAMPLE_ITEMS_POPULATED} mode="single" />,
  parameters: {
    docs: {
      description: {
        story:
          'Compact picker with the everyday flow: click the trigger to open a small popover of included resources, pick one to switch what\'s shown, or click "Browse library" to open the full picker in a dialog.',
      },
    },
  },
};

export const CompactNothingIncluded: StoryObj = {
  name: 'Compact · Nothing included',
  render: () => <CompactWithLibraryBridge initial={SAMPLE_ITEMS_SPARSE} mode="single" />,
  parameters: {
    docs: {
      description: {
        story:
          'When the project has no resources yet, the compact picker shows a quiet empty state with the Browse library button below as the obvious next step.',
      },
    },
  },
};

export const CompactScriptureOnly: StoryObj = {
  name: 'Compact · Scripture only with custom label',
  render: () => (
    <CompactWithLibraryBridge
      initial={SAMPLE_ITEMS_POPULATED}
      mode="single"
      allowedResourceTypes={['ScriptureResource']}
      browseLabel="Browse all scripture texts"
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Resource-type filter + a consumer-supplied `browseLabel`. The compact picker only shows included scripture texts; the footer button reads "Browse all scripture texts"; the dialog it opens applies the same filter.',
      },
    },
  },
};

export const CompactCommentariesOnly: StoryObj = {
  name: 'Compact · Commentaries only',
  render: () => (
    <CompactWithLibraryBridge
      initial={SAMPLE_ITEMS_POPULATED}
      mode="single"
      allowedResourceTypes={['CommentaryResource']}
      browseLabel="Browse all commentaries"
    />
  ),
};

export const CompactMulti: StoryObj = {
  name: 'Compact · Multi-select host',
  render: () => <CompactWithLibraryBridge initial={SAMPLE_ITEMS_POPULATED} mode="multi" />,
  parameters: {
    docs: {
      description: {
        story:
          "Multi-select host policy. The compact picker emits `toggleDisplay` uniformly; the host adds/removes the id from a set instead of replacing. Multiple included rows can show Check marks. The popover still closes after each pick — same compact UX, host's state model differs.",
      },
    },
  },
};
