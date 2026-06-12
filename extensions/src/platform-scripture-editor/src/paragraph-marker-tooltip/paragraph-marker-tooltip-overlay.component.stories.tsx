import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ParagraphMarkerTooltipOverlay } from './paragraph-marker-tooltip-overlay.component';

/**
 * Wraps scripture content and shows a tooltip with the paragraph marker description when the cursor
 * enters a USFM paragraph element. The mock editor below uses plain HTML elements styled with `para
 * usfm_X` class names — the same shape the Lexical editor produces at runtime.
 *
 * **Try it**: hover over any scripture line to see the tooltip. The last line uses an unknown
 * marker (`sp`) to demonstrate the raw-USFM fallback.
 */
const meta: Meta<typeof ParagraphMarkerTooltipOverlay> = {
  title: 'Bundled Extensions/platform-scripture-editor/ParagraphMarkerTooltipOverlay',
  component: ParagraphMarkerTooltipOverlay,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ParagraphMarkerTooltipOverlay>;

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

const PARA_STYLE: React.CSSProperties = { margin: '2px 0' };
const INDENT1_STYLE: React.CSSProperties = { margin: '2px 0 2px 2em' };
const INDENT2_STYLE: React.CSSProperties = { margin: '2px 0 2px 4em' };

/**
 * Hover over any line to see the tooltip. Scroll the box — the tooltip anchor follows the paragraph
 * within the visible area as you scroll.
 */
export const Default: Story = {
  render: () => (
    <div style={MOCK_EDITOR_STYLE}>
      <ParagraphMarkerTooltipOverlay>
        <p className="para usfm_ms" style={{ ...PARA_STYLE, fontWeight: 700, fontSize: '1.1em' }}>
          THE PSALMS
        </p>
        <p className="para usfm_s" style={{ ...PARA_STYLE, fontWeight: 600 }}>
          Psalm 23 &mdash; A Psalm of David
        </p>
        <p className="para usfm_r" style={{ ...PARA_STYLE, fontStyle: 'italic' }}>
          (see also Psalm 100)
        </p>
        <p className="para usfm_p" style={PARA_STYLE}>
          The LORD is my shepherd; I shall not want.
        </p>
        <p className="para usfm_p" style={PARA_STYLE}>
          He makes me lie down in green pastures. He leads me beside still waters.
        </p>
        <p className="para usfm_q1" style={INDENT1_STYLE}>
          He restores my soul.
        </p>
        <p className="para usfm_q2" style={INDENT2_STYLE}>
          He leads me in paths of righteousness for his name&rsquo;s sake.
        </p>
        <p className="para usfm_q1" style={INDENT1_STYLE}>
          Even though I walk through the valley of the shadow of death,
        </p>
        <p className="para usfm_q2" style={INDENT2_STYLE}>
          I will fear no evil, for you are with me.
        </p>
        <p className="para usfm_nb" style={PARA_STYLE}>
          Surely goodness and mercy shall follow me all the days of my life.
        </p>
        <p className="para usfm_sp" style={{ ...PARA_STYLE, color: 'gray', fontSize: '0.875em' }}>
          (Unknown marker &mdash; hover to see raw USFM fallback: \sp)
        </p>
        {/* contentEditable lets keydown events reach the overlay's capture listener,
            so the tooltip dismisses on typing — the same as Lexical provides at runtime. */}
        <div
          contentEditable
          suppressContentEditableWarning
          style={{
            marginTop: '8px',
            padding: '4px 6px',
            borderTop: '1px dashed hsl(var(--border))',
            color: 'gray',
            fontSize: '0.8em',
            outline: 'none',
          }}
        >
          Click here and type to dismiss the tooltip (simulates typing in the real editor)
        </div>
      </ParagraphMarkerTooltipOverlay>
    </div>
  ),
};
