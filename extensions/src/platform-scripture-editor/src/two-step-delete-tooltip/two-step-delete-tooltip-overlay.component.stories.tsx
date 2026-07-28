import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { TwoStepDeleteTooltipOverlay } from './two-step-delete-tooltip-overlay.component';

/**
 * Wraps scripture content and shows the two-step delete confirmation tooltip when a verse marker
 * (or a selection containing verse markers) is armed for deletion. The mock editor below uses plain
 * HTML elements with `data-verse-delete-intent` / `data-verse-delete-kind` data attributes on the
 * root and a `verse-selected` class on the armed element — the same DOM signals the real
 * StructureKeyboardPlugin publishes at runtime.
 */
const meta: Meta<typeof TwoStepDeleteTooltipOverlay> = {
  title: 'Bundled Extensions/platform-scripture-editor/TwoStepDeleteTooltipOverlay',
  component: TwoStepDeleteTooltipOverlay,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TwoStepDeleteTooltipOverlay>;

const MOCK_EDITOR_STYLE: React.CSSProperties = {
  border: '1px solid hsl(var(--border))',
  borderRadius: '4px',
  height: '220px',
  overflowY: 'auto',
  padding: '12px 16px',
  fontFamily: 'serif',
  lineHeight: 1.8,
  maxWidth: '520px',
};

const VERSE_MARKER_STYLE: React.CSSProperties = {
  fontWeight: 700,
  fontSize: '0.75em',
  verticalAlign: 'super',
  marginRight: '2px',
};

/** Disarmed — no data attributes set, tooltip is hidden. */
export const Default: Story = {
  render: () => (
    <div style={MOCK_EDITOR_STYLE}>
      <TwoStepDeleteTooltipOverlay>
        <p>
          <span style={VERSE_MARKER_STYLE}>v 16</span>
          For God so loved the world, that he gave his only Son, that whoever believes in him should
          not perish but have eternal life.
        </p>
        <p>
          <span style={VERSE_MARKER_STYLE}>v 17</span>
          For God did not send his Son into the world to condemn the world, but in order that the
          world might be saved through him.
        </p>
      </TwoStepDeleteTooltipOverlay>
    </div>
  ),
};

/**
 * Armed for verse marker deletion via Backspace — `data-verse-delete-intent="deleteBackward"` and
 * `data-verse-delete-kind="verse"` on the root; `verse-selected` on the marker. The tooltip appears
 * anchored to the verse marker with an arrow and prompts the user to press Backspace again.
 */
export const ArmedVerseBackspace: Story = {
  render: () => (
    <div style={MOCK_EDITOR_STYLE}>
      <TwoStepDeleteTooltipOverlay>
        <div data-verse-delete-intent="deleteBackward" data-verse-delete-kind="verse">
          <p>
            <span style={VERSE_MARKER_STYLE}>v 15</span>
            Whoever confesses that Jesus is the Son of God, God abides in him, and he in God.
          </p>
          <p>
            <span
              className="verse-selected"
              style={{ ...VERSE_MARKER_STYLE, outline: '2px solid hsl(var(--primary))' }}
            >
              v 16
            </span>
            For God so loved the world, that he gave his only Son, that whoever believes in him
            should not perish but have eternal life.
          </p>
        </div>
      </TwoStepDeleteTooltipOverlay>
    </div>
  ),
};

/**
 * Armed for verse marker deletion via Delete — `data-verse-delete-intent="deleteForward"`. Shows
 * the Delete-key label instead of Backspace in the tooltip.
 */
export const ArmedVerseDelete: Story = {
  render: () => (
    <div style={MOCK_EDITOR_STYLE}>
      <TwoStepDeleteTooltipOverlay>
        <div data-verse-delete-intent="deleteForward" data-verse-delete-kind="verse">
          <p>
            <span style={VERSE_MARKER_STYLE}>v 15</span>
            Whoever confesses that Jesus is the Son of God, God abides in him, and he in God.
          </p>
          <p>
            <span
              className="verse-selected"
              style={{ ...VERSE_MARKER_STYLE, outline: '2px solid hsl(var(--primary))' }}
            >
              v 16
            </span>
            For God so loved the world, that he gave his only Son, that whoever believes in him
            should not perish but have eternal life.
          </p>
        </div>
      </TwoStepDeleteTooltipOverlay>
    </div>
  ),
};

/**
 * Armed for selection deletion — `data-verse-delete-kind="selection"`. The tooltip shows a "delete
 * selection" message and no directional arrow (since the selection spans multiple elements and has
 * no single anchor point).
 */
export const ArmedSelection: Story = {
  render: () => (
    <div style={MOCK_EDITOR_STYLE}>
      <TwoStepDeleteTooltipOverlay>
        <div data-verse-delete-intent="deleteBackward" data-verse-delete-kind="selection">
          <p>
            <span style={VERSE_MARKER_STYLE}>v 15</span>
            Whoever confesses that Jesus is the Son of God, God abides in him, and he in God.
          </p>
          <span
            className="verse-selected"
            style={{ background: 'hsl(var(--primary) / 0.15)', display: 'block', padding: '2px 0' }}
          >
            <p>
              <span style={VERSE_MARKER_STYLE}>v 16</span>
              For God so loved the world, that he gave his only Son,
            </p>
            <p>
              <span style={VERSE_MARKER_STYLE}>v 17</span>
              that whoever believes in him should not perish but have eternal life.
            </p>
          </span>
        </div>
      </TwoStepDeleteTooltipOverlay>
    </div>
  ),
};
