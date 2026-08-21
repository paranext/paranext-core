// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useFocusReplacedContent } from './use-focus-replaced-content.hook';

afterEach(() => {
  vi.restoreAllMocks();
});

/** The zero-state that replaced an editor. Mounted only when the panel swaps its content. */
function Region() {
  const regionRef = useFocusReplacedContent<HTMLDivElement>();

  return (
    <div ref={regionRef} role="status" tabIndex={-1}>
      message
    </div>
  );
}

/**
 * Stands in for a resource panel: a header the panel keeps mounted either way, plus a content area
 * that swaps the editor out for the message.
 */
function TestHarness({ showRegion }: { showRegion: boolean }) {
  return (
    <div>
      <button type="button">selector</button>
      {showRegion ? <Region /> : <div>editor</div>}
    </div>
  );
}

describe('useFocusReplacedContent', () => {
  it('takes focus when the replaced content had it', () => {
    // jsdom reports `document.hasFocus()` as false, which is the "focus is elsewhere" branch — so
    // the focused case has to say so explicitly rather than relying on the default. With nothing
    // else focused, `activeElement` is `body`: exactly the orphaned-focus case this repairs.
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);

    render(<TestHarness showRegion />);

    expect(screen.getByRole('status')).toHaveFocus();
  });

  it('leaves focus alone when it is outside this document', () => {
    // Navigating here from the app title bar's book/chapter control must not yank focus out of the
    // control the user is still using — that control lives outside this iframe, so this document
    // does not have focus.
    vi.spyOn(document, 'hasFocus').mockReturnValue(false);

    render(<TestHarness showRegion />);

    expect(screen.getByRole('status')).not.toHaveFocus();
  });

  it('leaves focus alone when a sibling in this document still holds it', () => {
    // The regression this hook exists for. The Bible texts panel keeps its resource selector mounted
    // beside the swapped content, so picking a text that lacks the current book leaves focus on the
    // selector trigger with `hasFocus()` true. Stealing focus would take it off the one control that
    // can remedy the missing book, so `hasFocus()` alone is not a sufficient guard.
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);

    const { rerender } = render(<TestHarness showRegion={false} />);
    const selector = screen.getByRole('button', { name: 'selector' });
    selector.focus();

    rerender(<TestHarness showRegion />);

    expect(selector).toHaveFocus();
    expect(screen.getByRole('status')).not.toHaveFocus();
  });
});
