// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useFocusReplacedContent } from './use-focus-replaced-content.hook';

afterEach(() => {
  vi.restoreAllMocks();
});

/** The zero-state that replaced an editor. Mounted only when the panel swaps its content. */
function Region({ resetKey }: { resetKey?: unknown } = {}) {
  const regionRef = useFocusReplacedContent<HTMLDivElement>(resetKey);

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
function TestHarness({ showRegion, resetKey }: { showRegion: boolean; resetKey?: unknown }) {
  return (
    <div>
      <button type="button">selector</button>
      {showRegion ? <Region resetKey={resetKey} /> : <div>editor</div>}
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
    // `hasFocus()` is false while the user is in another window, application, or iframe. Pulling
    // focus into a region they are not looking at would take it from wherever they are working.
    vi.spyOn(document, 'hasFocus').mockReturnValue(false);

    render(<TestHarness showRegion />);

    expect(screen.getByRole('status')).not.toHaveFocus();
  });

  it('leaves focus alone when a sibling in this document still holds it', () => {
    // The regression this hook exists for, and the condition that carries the real work. Views keep
    // controls mounted beside the swapped content — the Bible texts panel its resource selector, the
    // main editor its reference control in its own toolbar — so reaching a missing book through one
    // of them leaves focus on that control with `hasFocus()` true. Stealing focus would take it off
    // the control the user is operating, so `hasFocus()` alone is not a sufficient guard.
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);

    const { rerender } = render(<TestHarness showRegion={false} />);
    const selector = screen.getByRole('button', { name: 'selector' });
    selector.focus();

    rerender(<TestHarness showRegion />);

    expect(selector).toHaveFocus();
    expect(screen.getByRole('status')).not.toHaveFocus();
  });

  it('repairs focus again when the message starts describing something else', () => {
    // A screen-reader user on a missing book uses the still-mounted selector to pick another text
    // that ALSO lacks it. The region stays mounted and its text is unchanged, so `aria-live` emits
    // nothing; if focus has also been orphaned again there is no signal the selection applied at all.
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);

    const { rerender } = render(<TestHarness showRegion resetKey="WEB:GEN" />);
    const region = screen.getByRole('status');
    expect(region).toHaveFocus();
    // Focus is orphaned again, as it is when the content the user was in gets torn out.
    region.blur();
    expect(region).not.toHaveFocus();

    rerender(<TestHarness showRegion resetKey="KJV:GEN" />);

    expect(region).toHaveFocus();
  });

  it('does not repair focus twice for the same message', () => {
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);

    const { rerender } = render(<TestHarness showRegion resetKey="WEB:GEN" />);
    const region = screen.getByRole('status');
    expect(region).toHaveFocus();
    // Something else legitimately takes focus while the same message stays on screen.
    const selector = screen.getByRole('button', { name: 'selector' });
    selector.focus();

    rerender(<TestHarness showRegion resetKey="WEB:GEN" />);

    expect(selector).toHaveFocus();
    expect(region).not.toHaveFocus();
  });
});
