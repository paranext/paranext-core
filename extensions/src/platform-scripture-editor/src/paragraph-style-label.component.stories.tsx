import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { SHRINK_STEP, ShrinkStepOverride } from 'platform-bible-react';
import { ParagraphStyleLabel } from './paragraph-style-label.component';

/**
 * The label inside the toolbar's paragraph-style trigger: the USFM marker for the block the cursor
 * is in, then that marker's style name.
 *
 * Two behaviours are worth reviewing here. The marker slot is sized to the marker it holds, so a
 * one-character `p` takes a `p`'s worth of width and a `toc1` takes a `toc1`'s — no marker is
 * padded out to the width of the longest one. And at the narrowest shrink step the style name is
 * dropped entirely, leaving the marker alone; the full text stays reachable through the label's
 * tooltip.
 *
 * **Try it**: hover a label whose style name is dropped or clipped — the tooltip shows the whole
 * `marker - style name` reading.
 */
const meta: Meta<typeof ParagraphStyleLabel> = {
  title: 'Bundled Extensions/platform-scripture-editor/ParagraphStyleLabel',
  component: ParagraphStyleLabel,
  tags: ['autodocs'],
  args: {
    blockMarker: 'p',
    styleName: 'Paragraph',
  },
  argTypes: {
    blockMarker: { control: 'text' },
    styleName: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof ParagraphStyleLabel>;

/** Names each shrink step so a step's rendering can be read off the row it sits in. */
const SHRINK_STEPS: { name: string; value: number }[] = [
  { name: 'Wide', value: SHRINK_STEP.WIDE },
  { name: 'Tight', value: SHRINK_STEP.TIGHT },
  { name: 'Tighter', value: SHRINK_STEP.TIGHTER },
  { name: 'Minimum', value: SHRINK_STEP.MINIMUM },
];

/** Markers spanning the length range in ordinary use, shortest first. */
const MARKERS: { blockMarker: string; styleName: string }[] = [
  { blockMarker: 'p', styleName: 'Paragraph' },
  { blockMarker: 'q2', styleName: 'Poetic Line Level 2' },
  { blockMarker: 'toc1', styleName: 'Table of Contents 1' },
];

/** One row per shrink step, each pinned by `ShrinkStepOverride` so no layout engine is needed. */
function ShrinkLadder({ blockMarker, styleName }: { blockMarker: string; styleName?: string }) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-2">
      {SHRINK_STEPS.map((step) => (
        <div className="tw:flex tw:items-center tw:gap-3" key={step.name}>
          <span className="tw:w-20 tw:text-xs tw:text-muted-foreground">{step.name}</span>
          <ShrinkStepOverride value={step.value}>
            <ParagraphStyleLabel blockMarker={blockMarker} styleName={styleName} />
          </ShrinkStepOverride>
        </div>
      ))}
    </div>
  );
}

/** Marker and style name together, the form the label takes whenever there is room for it. */
export const Default: Story = {};

/** A long style name, which the label caps at 30 characters rather than growing without bound. */
export const LongStyleName: Story = {
  args: { blockMarker: 'toc1', styleName: 'Table of Contents 1' },
};

/**
 * A marker with no description resolved — the label is the marker alone, and its tooltip promises
 * nothing more than that.
 */
export const MarkerWithoutStyleName: Story = {
  args: { blockMarker: 'q2', styleName: undefined },
};

/**
 * The same label at every shrink step. The style name survives until the narrowest step, where it
 * is dropped and the marker stands alone.
 */
export const AcrossShrinkSteps: Story = {
  render: (args) => <ShrinkLadder blockMarker={args.blockMarker} styleName={args.styleName} />,
  args: { blockMarker: 'toc1', styleName: 'Table of Contents 1' },
};

/**
 * Markers of different lengths at the same shrink step. Each marker occupies its own width, so the
 * one-character `p` is not trailed by blank space padding it out to the longest marker's width.
 */
export const MarkerWidths: Story = {
  render: () => (
    <div className="tw:flex tw:flex-col tw:gap-2">
      {MARKERS.map((marker) => (
        <ParagraphStyleLabel
          blockMarker={marker.blockMarker}
          key={marker.blockMarker}
          styleName={marker.styleName}
        />
      ))}
    </div>
  ),
};

/**
 * The same markers at the narrowest step, where the marker is the whole label. This is the step
 * whose width tracks the marker, so it is where the content-sized slot is most visible.
 */
export const MarkerWidthsAtMinimum: Story = {
  render: () => (
    <ShrinkStepOverride value={SHRINK_STEP.MINIMUM}>
      <div className="tw:flex tw:flex-col tw:gap-2">
        {MARKERS.map((marker) => (
          <ParagraphStyleLabel
            blockMarker={marker.blockMarker}
            key={marker.blockMarker}
            styleName={marker.styleName}
          />
        ))}
      </div>
    </ShrinkStepOverride>
  ),
};
