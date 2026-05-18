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

/**
 * Datasets the playground stories can drive the picker with. Stable keys so Storybook control
 * arg state survives reloads.
 */
const DATASETS: Record<string, ScriptureTextItem[]> = {
  populated: SAMPLE_ITEMS_POPULATED,
  sparse: SAMPLE_ITEMS_SPARSE,
  mixed: SAMPLE_ITEMS,
};

const PREFERRED = ['English', 'Spanish', 'French'];

type Mode = 'single' | 'multi';

const meta: Meta = {
  title: 'Advanced/ScriptureTextPicker',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A control for deciding **which scripture texts this project uses** and **which of those is
shown on the calling surface right now**. The two jobs blur in practice — users often want to
add a text *and* immediately see it — so the picker keeps them together.

Three groups of texts:

- **Included** — already in the project. Click to show/hide on the calling surface.
- **On your computer** — local but not yet in the project. Click to include *and* display.
- **Available to download** — not local. Click to download, include, *and* display.

A footer button toggles between an "Included only" view and a "Browse all" view; the initial
view is chosen based on project state at open time.

The picker is presentational — the host owns \`items\`, \`displayedIds\`, and the surrounding
popover/dialog open state. The picker emits actions; the host applies its single- vs multi-
select policy.

See \`./DESIGN.md\` (co-located with this component) for the decision history and patterns
that came out of this exploration.
        `,
      },
    },
  },
};
export default meta;

// ─── Resizable shell ───────────────────────────────────────────────────────

/**
 * Resizable container used to demonstrate the picker's container-query responsive collapse and
 * its shrink-to-fit behavior. Drag the bottom-right grip to change width and height; the
 * picker reflows accordingly. A subtle "↘" hint sits in the corner with a tooltip via the
 * `title` attribute.
 */
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
      {/* Decorative resize hint — sits over the native CSS resize grip. pointer-events:none so
          the native grip below still receives the resize drag. */}
      <span
        aria-hidden
        className="tw:pointer-events-none tw:absolute tw:bottom-0.5 tw:right-0.5 tw:select-none tw:text-[0.65rem] tw:text-muted-foreground/60"
      >
        ↘
      </span>
    </div>
  );
}

// ─── Stateful host wrapper ─────────────────────────────────────────────────

/**
 * Realistic host that applies actions per the configured mode. Same wrapper drives both the
 * pure-component stories and the trigger-popover stories.
 */
function ControlledPicker({
  dataset,
  mode,
}: {
  dataset: keyof typeof DATASETS;
  mode: Mode;
}) {
  const initial = DATASETS[dataset];
  // useState's `dataset` key makes the playground reset when the user switches datasets.
  const [items, setItems] = useState<ScriptureTextItem[]>(initial);
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
          displayedIds.includes(id)
            ? displayedIds.filter((x) => x !== id)
            : [...displayedIds, id],
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
      // Spec: include always displays the newly-included item too (multi-select hosts add it
      // to the set; single-select hosts replace whatever's displayed). The user just acted to
      // bring this text into their workspace — they almost certainly want to see it.
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

  return (
    <ScriptureTextPickerProgressive
      items={items}
      displayedIds={displayedIds}
      preferredLanguages={PREFERRED}
      onAction={onAction}
    />
  );
}

// ─── Playground ────────────────────────────────────────────────────────────

interface PlaygroundArgs {
  dataset: keyof typeof DATASETS;
  mode: Mode;
  shellWidth: number;
  shellHeight: number;
}

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    dataset: 'populated',
    mode: 'single',
    shellWidth: 480,
    shellHeight: 520,
  },
  argTypes: {
    dataset: {
      control: { type: 'select' },
      options: ['populated', 'sparse', 'mixed'],
      description:
        'Initial state of the picker. *populated* opens in Included-only view; *sparse* opens in Browse-all (add-mode); *mixed* exercises both groups densely.',
    },
    mode: {
      control: { type: 'inline-radio' },
      options: ['single', 'multi'],
      description:
        'Host policy: single keeps `displayedIds.length ≤ 1`; multi toggles ids in a set. The picker doesn\'t care which — this control changes the demo host\'s behavior.',
    },
    shellWidth: {
      control: { type: 'range', min: 260, max: 900, step: 20 },
      description:
        'Width of the resizable shell. Drag the corner instead for live tweaking; this arg sets the initial value.',
    },
    shellHeight: {
      control: { type: 'range', min: 200, max: 800, step: 20 },
      description: 'Height of the resizable shell. Initial value only — drag to adjust live.',
    },
  },
  render: (args) => (
    <ResizableShell initialWidth={args.shellWidth} initialHeight={args.shellHeight}>
      <ControlledPicker dataset={args.dataset} mode={args.mode} />
    </ResizableShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Top-level interactive playground. Use the Controls panel to switch dataset, host mode, auto-display policy, and the shell\'s initial size. The picker itself shrinks to fit content; resize the shell to see container-query responsive collapse trigger at 480px and 360px.',
      },
    },
  },
};

// ─── Focused exemplars ─────────────────────────────────────────────────────

export const SinglePopulated: StoryObj = {
  name: 'Single · populated (display switcher)',
  render: () => (
    <ResizableShell>
      <ControlledPicker dataset="populated" mode="single" />
    </ResizableShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default story for the most common case: a project with multiple included texts where the user opens the picker to switch *which one* is displayed. Initial view = Included only.',
      },
    },
  },
};

export const SingleSparse: StoryObj = {
  name: 'Single · sparse (add-mode)',
  render: () => (
    <ResizableShell>
      <ControlledPicker dataset="sparse" mode="single" />
    </ResizableShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A nearly-empty project. Picker opens in Browse-all view so the user can immediately add a text. The view stays in Browse-all even after adding — the captured-at-open initial view is the contract.',
      },
    },
  },
};

export const MultiPopulated: StoryObj = {
  name: 'Multi · populated',
  render: () => (
    <ResizableShell>
      <ControlledPicker dataset="populated" mode="multi" />
    </ResizableShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multi-select host: clicking an Included row toggles it in/out of the displayed set rather than replacing. Multiple Check marks appear simultaneously. Same picker, different host policy.',
      },
    },
  },
};

export const NarrowWidth: StoryObj = {
  name: 'Narrow (340px) — responsive collapse',
  render: () => (
    <ResizableShell initialWidth={340}>
      <ControlledPicker dataset="mixed" mode="single" />
    </ResizableShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'At <360px container width, names collapse to abbreviations and language chips collapse to 3-letter BCP-47 codes. Hover tooltips carry the full information. Demonstrates the container-query responsive contract.',
      },
    },
  },
};

export const ShortHeight: StoryObj = {
  name: 'Short height (260px) — scroll',
  render: () => (
    <ResizableShell initialHeight={260}>
      <ControlledPicker dataset="mixed" mode="single" />
    </ResizableShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Verifies the list scrolls cleanly when the shell is shorter than the picker\'s content. The picker\'s own max-height cap also applies — see the picker shrink-to-fit + max-height behavior.',
      },
    },
  },
};

// ─── Trigger (in-context) stories ──────────────────────────────────────────

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
    if (action.type === 'toggleDisplay') {
      const id = action.item.data.dblEntryUid;
      if (mode === 'single') {
        setDisplayedIds(displayedIds.includes(id) ? [] : [id]);
      } else {
        setDisplayedIds(
          displayedIds.includes(id)
            ? displayedIds.filter((x) => x !== id)
            : [...displayedIds, id],
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
      // Include always displays the newly-included item too — single replaces, multi adds.
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
            <ScriptureTextPickerProgressive
              items={items}
              displayedIds={displayedIds}
              preferredLanguages={PREFERRED}
              onAction={onAction}
            />
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

export const TriggerSinglePopulated: StoryObj = {
  name: 'Trigger · Single · populated',
  render: () => <MockScriptureViewer initial={SAMPLE_ITEMS_POPULATED} mode="single" />,
  parameters: {
    docs: {
      description: {
        story:
          'Picker in its real context: a popover anchored to the calling surface\'s trigger button. The popover stays open across include/toggleDisplay/remove actions — only Esc or an outside click closes it. The picker shrinks to fit content within the popover.',
      },
    },
  },
};

export const TriggerSingleSparse: StoryObj = {
  name: 'Trigger · Single · sparse',
  render: () => <MockScriptureViewer initial={SAMPLE_ITEMS_SPARSE} mode="single" />,
  parameters: {
    docs: {
      description: {
        story:
          'Same trigger context, but with a sparse project. Picker opens in Browse-all view. Notice the picker is taller than in the populated case — there are more rows to show.',
      },
    },
  },
};

export const TriggerMultiPopulated: StoryObj = {
  name: 'Trigger · Multi · populated',
  render: () => <MockScriptureViewer initial={SAMPLE_ITEMS_POPULATED} mode="multi" />,
  parameters: {
    docs: {
      description: {
        story:
          'Multi-select host in context. The trigger button shows the first displayed text plus a "+N" overflow indicator. Clicking included rows toggles them in/out of the displayed set.',
      },
    },
  },
};
