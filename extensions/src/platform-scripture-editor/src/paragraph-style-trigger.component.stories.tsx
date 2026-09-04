import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  MARKER_MENU_STRING_KEYS,
  SHRINK_STEP,
  ShrinkStepOverride,
  type MarkerMenuItem,
} from 'platform-bible-react';
import type { ComponentProps, ReactNode } from 'react';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import {
  ParagraphStyleTrigger,
  PARAGRAPH_STYLE_TRIGGER_STRING_KEYS,
} from './paragraph-style-trigger.component';

/**
 * The editor toolbar's paragraph-style control: a button showing the marker and style name of the
 * block the cursor is in, which opens the paragraph marker menu.
 *
 * The control narrows in steps as the toolbar does. At the narrowest step it keeps only the marker
 * and drops the chevron — the marker is a code with no shorter form, so the button also stops
 * narrowing there rather than let the toolbar squeeze into the marker itself. Its width tracks the
 * marker at that step, because the marker slot is sized to its content.
 *
 * In the app the shrink step comes from the toolbar measuring itself; these stories pin it with
 * `ShrinkStepOverride` so every step is reachable at any browser width.
 *
 * **Try it**: click the trigger to open the marker menu, and hover the disabled story to see why
 * the paragraph style cannot be changed.
 */
const meta: Meta<typeof ParagraphStyleTrigger> = {
  title: 'Bundled Extensions/platform-scripture-editor/ParagraphStyleTrigger',
  component: ParagraphStyleTrigger,
  tags: ['autodocs'],
  args: {
    blockMarker: 'p',
    styleName: 'Paragraph',
    isStructureProtected: false,
  },
  argTypes: {
    blockMarker: { control: 'text' },
    styleName: { control: 'text' },
    isStructureProtected: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof ParagraphStyleTrigger>;

const localizedStrings = getLocalizedStrings([
  ...PARAGRAPH_STYLE_TRIGGER_STRING_KEYS,
  ...MARKER_MENU_STRING_KEYS,
]);

const markerMenuItems: MarkerMenuItem[] = [
  {
    marker: 'p',
    title: 'Paragraph',
    subtitle: 'normal (with indent first line)',
    action: () => {},
  },
  { marker: 'm', title: 'Margin Paragraph', subtitle: 'no first line indent', action: () => {} },
  { marker: 'q1', title: 'Poetic Line Level 1', action: () => {} },
  { marker: 'q2', title: 'Poetic Line Level 2', action: () => {} },
  { marker: 'toc1', title: 'Table of Contents 1', action: () => {} },
];

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

type TriggerArgs = ComponentProps<typeof ParagraphStyleTrigger>;

/** Renders the trigger with the story's args, the shared menu items, and the shared strings. */
function Trigger({ blockMarker, isStructureProtected = false, styleName }: Partial<TriggerArgs>) {
  return (
    <ParagraphStyleTrigger
      blockMarker={blockMarker}
      isStructureProtected={isStructureProtected}
      localizedStrings={localizedStrings}
      markerMenuItems={markerMenuItems}
      styleName={styleName}
    />
  );
}

/**
 * Stands in for the toolbar's start zone: a bounded box that clips its overflow, which is what the
 * trigger's width floor and the label's ellipsis are negotiating against.
 */
function ToolbarZone({ children }: { children: ReactNode }) {
  return (
    <div className="tw:flex tw:w-56 tw:overflow-clip tw:rounded-sm tw:border tw:border-dashed tw:p-1">
      {children}
    </div>
  );
}

/** Full marker, style name, and chevron — the form the control takes when the toolbar has room. */
export const Default: Story = {
  render: (args) => <Trigger {...args} />,
};

/**
 * One row per shrink step, each in a toolbar-sized box. The chevron is present at every step until
 * the narrowest one, where the style name is gone and the space it took goes to the marker.
 */
export const AcrossShrinkSteps: Story = {
  render: (args) => (
    <div className="tw:flex tw:flex-col tw:gap-2">
      {SHRINK_STEPS.map((step) => (
        <div className="tw:flex tw:items-center tw:gap-3" key={step.name}>
          <span className="tw:w-20 tw:text-xs tw:text-muted-foreground">{step.name}</span>
          <ShrinkStepOverride value={step.value}>
            <ToolbarZone>
              <Trigger {...args} />
            </ToolbarZone>
          </ShrinkStepOverride>
        </div>
      ))}
    </div>
  ),
  args: { blockMarker: 'toc1', styleName: 'Table of Contents 1' },
};

/**
 * Markers of different lengths at the widest step, where the style name beside the marker varies by
 * far more than the marker does.
 */
export const MarkerWidths: Story = {
  render: (args) => (
    <div className="tw:flex tw:flex-col tw:gap-2">
      {MARKERS.map((marker) => (
        <Trigger {...args} {...marker} key={marker.blockMarker} />
      ))}
    </div>
  ),
};

/**
 * The same markers at the narrowest step. Each trigger is as wide as its own marker needs, so a
 * one-character `p` is not padded out to the width of a `toc1`.
 */
export const MarkerWidthsAtMinimum: Story = {
  render: (args) => (
    <ShrinkStepOverride value={SHRINK_STEP.MINIMUM}>
      <div className="tw:flex tw:flex-col tw:gap-2">
        {MARKERS.map((marker) => (
          <Trigger {...args} {...marker} key={marker.blockMarker} />
        ))}
      </div>
    </ShrinkStepOverride>
  ),
};

/**
 * Structure is protected, so the paragraph style cannot be changed: the button is disabled and
 * hovering it explains why.
 */
export const StructureProtected: Story = {
  render: (args) => <Trigger {...args} />,
  args: { isStructureProtected: true },
};

/**
 * The cursor is in no block at all, so the control renders nothing rather than an empty bordered
 * box. An empty marker reads the same way, since neither has anything to label.
 */
export const NoBlockMarker: Story = {
  render: (args) => <Trigger {...args} />,
  args: { blockMarker: undefined, styleName: undefined },
};
