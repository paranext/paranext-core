import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  Button,
  MARKER_MENU_STRING_KEYS,
  SHRINK_STEP,
  ShrinkStepOverride,
  type MarkerMenuItem,
} from 'platform-bible-react';
import { useRef, useState, type ComponentProps, type ReactNode } from 'react';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import {
  ParagraphStyleTrigger,
  PARAGRAPH_STYLE_TRIGGER_STRING_KEYS,
} from './paragraph-style-trigger.component';
import { useParagraphMenuOpenState } from './use-paragraph-menu-open-state.hook';

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
 * the paragraph style cannot be changed. The editor-request story opens the menu the way Enter or
 * Alt+Down on a selected paragraph marker does, without a click on the trigger.
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

/**
 * Renders the trigger with the story's args, the shared menu items, and the shared strings. There
 * is no editor here, so the focus the app would return to the editor goes back to the trigger
 * instead of being dropped on the page.
 */
function Trigger({ blockMarker, isStructureProtected = false, styleName }: Partial<TriggerArgs>) {
  // The web view owns this state in the app, through the same hook; each story instance keeps its
  // own so clicking opens it.
  const { isMenuOpen, setIsMenuOpen } = useParagraphMenuOpenState({
    isReadOnly: false,
    isStructureProtected,
    hasBlockMarker: !!blockMarker,
    notifyStructureProtected: () => {},
  });
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const wrapperRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={wrapperRef} className="tw:contents">
      <ParagraphStyleTrigger
        blockMarker={blockMarker}
        isStructureProtected={isStructureProtected}
        localizedStrings={localizedStrings}
        markerMenuItems={markerMenuItems}
        styleName={styleName}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        onReturnFocusToEditor={() => wrapperRef.current?.querySelector('button')?.focus()}
      />
    </div>
  );
}

/**
 * Renders the trigger beside a stand-in for the editor: a button that asks for the menu the way the
 * editor's `onParaMarkerMenuRequest` does, through the same hook the web view uses, and a text box
 * that takes focus back when the menu returns focus to the editor.
 */
function EditorRequestTrigger({
  blockMarker,
  isStructureProtected = false,
  styleName,
}: Partial<TriggerArgs>) {
  const [lockNotificationCount, setLockNotificationCount] = useState(0);
  const { isMenuOpen, setIsMenuOpen, requestMenuFromEditor } = useParagraphMenuOpenState({
    isReadOnly: false,
    isStructureProtected,
    hasBlockMarker: !!blockMarker,
    notifyStructureProtected: () => setLockNotificationCount((count) => count + 1),
  });
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="tw:flex tw:flex-col tw:items-start tw:gap-2">
      <ParagraphStyleTrigger
        blockMarker={blockMarker}
        isStructureProtected={isStructureProtected}
        localizedStrings={localizedStrings}
        markerMenuItems={markerMenuItems}
        styleName={styleName}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        onReturnFocusToEditor={() => editorRef.current?.focus()}
      />
      <textarea
        ref={editorRef}
        aria-label="Stand-in editor"
        className="tw:w-56 tw:rounded-sm tw:border tw:p-1 tw:text-sm"
        defaultValue="Focus returns here when the menu closes."
      />
      <Button size="sm" variant="secondary" onClick={requestMenuFromEditor}>
        Open from the editor
      </Button>
      {lockNotificationCount > 0 && (
        <p role="status" className="tw:text-xs tw:text-muted-foreground">
          Lock notification shown ({lockNotificationCount})
        </p>
      )}
    </div>
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
 * The menu opened by the editor rather than by a click on the trigger, as happens on Enter or
 * Alt+Down with a paragraph marker selected. The menu opens on the paragraph's own marker. Picking
 * an item or pressing Escape returns focus to the stand-in editor; a menu opened by clicking the
 * trigger returns focus to the trigger on Escape instead. With structure protected, the request
 * shows the lock notification and the menu stays closed, and it does not open on its own when
 * protection is turned off again.
 */
export const OpenedFromTheEditor: Story = {
  render: (args) => <EditorRequestTrigger {...args} />,
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
