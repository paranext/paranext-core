import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from 'platform-bible-react';
import { TwoStepDeleteTooltipOverlay } from './two-step-delete-tooltip-overlay.component';

/**
 * Renders the destructive "press again to delete" hint while a verse marker (or a selection
 * containing verse markers) is armed. The real editor (shared-react's `StructureKeyboardPlugin`)
 * arms/disarms this purely by toggling DOM signals — `data-verse-delete-intent`/
 * `data-verse-delete-kind` on its root, and a `verse-selected` class on the armed marker — which
 * this overlay picks up via a `MutationObserver`. The buttons below simulate the editor by toggling
 * those same DOM signals directly (bypassing React), the same way the real editor does, so this
 * story exercises the overlay's actual observe/arm/disarm/re-anchor machinery rather than a fake
 * standing in for it.
 *
 * **Try it**: click an "Arm" button to show the hint anchored to the verse-5 marker below, then
 * scroll the box — the hint follows the marker (the scroll-triggered re-anchor path). "Arm:
 * Backspace on selection" also highlights a range of text spanning the marker, standing in for a
 * real editor selection that happens to contain a verse marker. Click Disarm to hide it again
 * (simulates either confirming or cancelling the delete in the real editor).
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
  height: '160px',
  overflowY: 'auto',
  padding: '12px 16px',
  fontFamily: 'serif',
  lineHeight: 1.8,
  maxWidth: '520px',
};

const PARA_STYLE: React.CSSProperties = { margin: '2px 0' };

const MARKER_STYLE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '1.5em',
  padding: '0 0.25em',
  marginInlineEnd: '0.35em',
  borderRadius: '3px',
  fontFamily: 'monospace',
  fontSize: '0.8em',
  color: 'gray',
  border: '1px solid transparent',
};

// Transparent by default (overriding <mark>'s default yellow background) so the highlight only
// appears while "Arm: Backspace on selection" is armed — see the `arm` function below.
const SELECTION_STYLE: React.CSSProperties = { backgroundColor: 'transparent', color: 'inherit' };
const SELECTION_HIGHLIGHT_COLOR = 'rgba(250, 204, 21, 0.4)';

/**
 * Mock editor content plus the buttons that simulate the real `StructureKeyboardPlugin`: they set
 * `data-verse-delete-intent`/`data-verse-delete-kind` on `rootRef` and toggle `verse-selected` on
 * `markerRef` by calling DOM methods directly (not via React state), the same non-React mutation
 * the overlay's `MutationObserver` is built to observe.
 */
function TwoStepDeleteDemo() {
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const rootRef = useRef<HTMLDivElement>(null);
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const markerRef = useRef<HTMLSpanElement>(null);
  // Highlights a range of text around the marker while kind === 'selection', so the demo shows
  // *something* selected rather than reusing the exact same single-marker anchor as the "verse"
  // buttons with no visual distinction between the two cases.
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const selectionRef = useRef<HTMLElement>(null);

  const arm = (intent: 'deleteBackward' | 'deleteForward', kind: 'verse' | 'selection') => {
    rootRef.current?.setAttribute('data-verse-delete-intent', intent);
    rootRef.current?.setAttribute('data-verse-delete-kind', kind);
    markerRef.current?.classList.add('verse-selected');
    // 'transparent', not '', so clearing this doesn't wipe out the base SELECTION_STYLE background
    // entirely and fall through to <mark>'s default yellow UA background.
    if (selectionRef.current) {
      selectionRef.current.style.backgroundColor =
        kind === 'selection' ? SELECTION_HIGHLIGHT_COLOR : 'transparent';
    }
  };

  const disarm = () => {
    rootRef.current?.removeAttribute('data-verse-delete-intent');
    rootRef.current?.removeAttribute('data-verse-delete-kind');
    markerRef.current?.classList.remove('verse-selected');
    if (selectionRef.current) selectionRef.current.style.backgroundColor = 'transparent';
  };

  return (
    <div>
      <div style={{ marginBottom: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button variant="outline" onClick={() => arm('deleteBackward', 'verse')}>
          Arm: Backspace on marker
        </Button>
        <Button variant="outline" onClick={() => arm('deleteForward', 'verse')}>
          Arm: Delete on marker
        </Button>
        <Button variant="outline" onClick={() => arm('deleteBackward', 'selection')}>
          Arm: Backspace on selection
        </Button>
        <Button variant="outline" onClick={disarm}>
          Disarm
        </Button>
      </div>
      <div style={MOCK_EDITOR_STYLE}>
        <TwoStepDeleteTooltipOverlay>
          <div ref={rootRef}>
            <p style={PARA_STYLE}>
              <span style={MARKER_STYLE}>1</span>
              The LORD is my shepherd; I shall not want.
            </p>
            <p style={PARA_STYLE}>
              <span style={MARKER_STYLE}>2</span>
              He makes me lie down in green pastures. He leads me beside still waters.
            </p>
            <p style={PARA_STYLE}>
              <span style={MARKER_STYLE}>3</span>
              He restores my soul. He leads me in paths of righteousness for his name&rsquo;s sake.
            </p>
            <p style={PARA_STYLE}>
              <span style={MARKER_STYLE}>4</span>
              Even though I walk through the valley of the shadow of death, I will fear no evil, for
              you are with me; your rod and your staff, they comfort me.
            </p>
            <p style={PARA_STYLE}>
              <mark ref={selectionRef} style={SELECTION_STYLE}>
                <span ref={markerRef} style={MARKER_STYLE}>
                  5
                </span>
                Thou preparest a table before me in the presence of mine enemies
              </mark>
              : thou anointest my head with oil; my cup runneth over.
            </p>
            <p style={PARA_STYLE}>
              <span style={MARKER_STYLE}>6</span>
              Surely goodness and mercy shall follow me all the days of my life: and I will dwell in
              the house of the LORD for ever.
            </p>
          </div>
        </TwoStepDeleteTooltipOverlay>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <TwoStepDeleteDemo />,
};
