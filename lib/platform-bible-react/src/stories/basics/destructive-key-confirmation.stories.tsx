import { useLayoutEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DestructiveKeyConfirmation,
  type DestructiveKeyConfirmationProps,
} from '@/components/basics/destructive-key-confirmation.component';
import { cn } from '@/utils/shadcn-ui/utils';

type AnchorRect = DestructiveKeyConfirmationProps['anchorRect'];

const SAMPLE_PARAGRAPH =
  'In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep.';

/** Spanish translations for the messages, keyed by the English text used in this file's story args. */
const MESSAGE_TRANSLATIONS: Record<string, string> = {
  'Press {key} again to remove verse marker':
    'Presione {key} de nuevo para borrar este número de versículo',
  'Press {key} again to delete this selection': 'Presione {key} de nuevo para eliminar este texto',
};

/** Spanish names for the physical keys this hint can name. */
const KEY_LABEL_TRANSLATIONS: Record<string, string> = {
  Backspace: 'Retroceso',
  Delete: 'Supr',
};

type StoryArgs = DestructiveKeyConfirmationProps & {
  locale: 'en' | 'es';
  /**
   * Which illustration to render behind the invisible anchor: a single verse-number chip (the
   * `removeVerseMarker` case) or a paragraph with a highlighted range (the `deleteSelection` case),
   * so the demo actually resembles what's armed in each case.
   */
  anchorPreview: 'marker' | 'selection';
  /**
   * Character offset into `SAMPLE_PARAGRAPH` where the illustrated selection starts (`selection`
   * anchorPreview only).
   */
  selectionStart: number;
  /**
   * Character offset into `SAMPLE_PARAGRAPH` where the illustrated selection ends (`selection`
   * anchorPreview only).
   */
  selectionEnd: number;
};

/**
 * Renders the demo anchor (a verse-number chip or a highlighted text range) and measures its real
 * position via `getBoundingClientRect`, relative to the `position: relative` container — the same
 * technique `computeAnchorRect` in `two-step-delete-tooltip.utils.ts` uses in production — instead
 * of hand-tuning pixel offsets. That keeps the tooltip correctly anchored as `selectionStart`/
 * `selectionEnd` move the highlighted range around.
 */
function DestructiveKeyConfirmationDemo({
  locale,
  message,
  confirmingKeyLabel,
  anchorPreview,
  selectionStart,
  selectionEnd,
  anchorRect,
  open,
  ...args
}: StoryArgs) {
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const markerRef = useRef<HTMLSpanElement>(null);
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const selectionRef = useRef<HTMLElement>(null);
  const [measuredRect, setMeasuredRect] = useState<AnchorRect>();

  useLayoutEffect(() => {
    const container = containerRef.current;
    const target = selectionRef.current;
    if (!container || !target) return;
    const containerBox = container.getBoundingClientRect();
    const targetBox = target.getBoundingClientRect();
    setMeasuredRect({
      top: targetBox.top - containerBox.top,
      left: targetBox.left - containerBox.left,
      width: targetBox.width,
      height: targetBox.height,
    });
  }, [selectionStart, selectionEnd]);

  const effectiveAnchorRect =
    anchorPreview === 'selection' ? (measuredRect ?? anchorRect) : anchorRect;
  // Radix computes its initial placement/arrow position once, when the tooltip first opens, and
  // doesn't recompute just because the (invisible) trigger's position later changes via inline
  // style — there's no resize/scroll event to tell it to. So while anchorPreview is 'selection' and
  // the real position hasn't been measured yet, keep the tooltip closed rather than opening it
  // against the not-yet-measured fallback anchorRect, which would lock in a wrong placement.
  const isAnchorReady = anchorPreview !== 'selection' || measuredRect !== undefined;

  return (
    <div
      ref={containerRef}
      className={cn(
        'tw:relative tw:w-72 tw:rounded tw:border tw:border-dashed tw:border-muted-foreground/40 tw:p-4',
        // The selection preview wraps a full paragraph (up to 4 lines) plus room below it for the
        // tooltip, so it needs more height than the marker preview's small fixed-position chip.
        anchorPreview === 'selection' ? 'tw:h-64' : 'tw:h-40',
      )}
    >
      {anchorPreview === 'selection' ? (
        // Illustrates the deleteSelection case: a paragraph of real text with a highlighted range
        // (standing in for the user's selection) whose position is measured, not hand-placed.
        <p className="tw:text-sm tw:leading-6 tw:text-foreground">
          {SAMPLE_PARAGRAPH.slice(0, selectionStart)}
          <mark
            ref={selectionRef}
            className="tw:rounded-xs tw:bg-primary/30 tw:px-0.5 tw:text-foreground"
          >
            {SAMPLE_PARAGRAPH.slice(selectionStart, selectionEnd)}
          </mark>
          {SAMPLE_PARAGRAPH.slice(selectionEnd)}
        </p>
      ) : (
        // Placeholder standing in for the real anchor (a verse-number marker in the editor) so the
        // hint's position/arrow are visible in context.
        <span
          ref={markerRef}
          className="tw:absolute tw:inline-flex tw:items-center tw:justify-center tw:rounded tw:bg-muted tw:font-mono tw:text-xs tw:text-muted-foreground"
          style={{
            top: anchorRect.top,
            left: anchorRect.left,
            width: anchorRect.width,
            height: anchorRect.height,
          }}
        >
          \v 5
        </span>
      )}
      <DestructiveKeyConfirmation
        {...args}
        open={open && isAnchorReady}
        anchorRect={effectiveAnchorRect}
        message={locale === 'es' ? (MESSAGE_TRANSLATIONS[message] ?? message) : message}
        confirmingKeyLabel={
          locale === 'es'
            ? (KEY_LABEL_TRANSLATIONS[confirmingKeyLabel] ?? confirmingKeyLabel)
            : confirmingKeyLabel
        }
      />
    </div>
  );
}

const meta: Meta<StoryArgs> = {
  title: 'Basics/DestructiveKeyConfirmation',
  component: DestructiveKeyConfirmation,
  tags: ['autodocs', 'test'],
  parameters: {
    docs: {
      description: {
        component: `
A destructive-styled "press again to confirm" hint for two-step destructive actions (e.g. deleting a
verse marker on a second Backspace/Delete). Renders as a Tooltip anchored to \`anchorRect\` rather than
a real hovered trigger — the caller owns detecting the "armed" state and computing where to point.

Include a \`{key}\` placeholder in \`message\`; it's replaced with a \`Kbd\` showing \`confirmingKeyLabel\`.

Use the **locale** control to preview the real Spanish translation of \`message\`/\`confirmingKeyLabel\`
in place of whatever English text the other controls are set to (there's no Storybook-wide locale
switcher yet, so this is simulated per-story).
        `,
      },
    },
  },
  argTypes: {
    open: { control: 'boolean' },
    message: { control: 'text' },
    confirmingKeyLabel: { control: 'text' },
    side: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'inline-radio' },
    },
    align: {
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' },
    },
    showArrow: { control: 'boolean' },
    anchorRect: { control: 'object' },
    locale: {
      options: ['en', 'es'],
      control: { type: 'inline-radio' },
    },
    anchorPreview: {
      options: ['marker', 'selection'],
      control: { type: 'inline-radio' },
    },
    selectionStart: {
      control: { type: 'number', min: 0, max: SAMPLE_PARAGRAPH.length },
      if: { arg: 'anchorPreview', eq: 'selection' },
    },
    selectionEnd: {
      control: { type: 'number', min: 0, max: SAMPLE_PARAGRAPH.length },
      if: { arg: 'anchorPreview', eq: 'selection' },
    },
  },
  args: {
    locale: 'en',
    anchorPreview: 'marker',
    selectionStart: 73,
    selectionEnd: 95,
  },
  render: (args) => <DestructiveKeyConfirmationDemo {...args} />,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    anchorRect: { top: 40, left: 40, width: 32, height: 20 },
    message: 'Press {key} again to remove verse marker',
    confirmingKeyLabel: 'Backspace',
    side: 'bottom',
    align: 'start',
    showArrow: true,
  },
};

export const SelectionDeletion: Story = {
  args: {
    ...Default.args,
    anchorRect: { top: 24, left: 8, width: 175, height: 20 },
    anchorPreview: 'selection',
    message: 'Press {key} again to delete this selection',
    confirmingKeyLabel: 'Delete',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The other real-world message this hint is used for — confirming deletion of a selection, rather than a single marker. Adjust `selectionStart`/`selectionEnd` to move the highlighted range; the hint follows it automatically.',
      },
    },
  },
};

export const NoArrow: Story = {
  args: {
    ...Default.args,
    showArrow: false,
  },
};

export const Closed: Story = {
  args: {
    ...Default.args,
    open: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'The disarmed state — `open={false}` hides the hint entirely.',
      },
    },
  },
};
