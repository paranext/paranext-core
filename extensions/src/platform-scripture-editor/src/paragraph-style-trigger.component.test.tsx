// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SHRINK_STEP, ShrinkStepOverride, type MarkerMenuItem } from 'platform-bible-react';
import { useState } from 'react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { ParagraphStyleTrigger } from './paragraph-style-trigger.component';

// jsdom doesn't ship ResizeObserver. Radix's Popper positioning, used by the popover and by the
// tooltip inside ToolbarCompoundLabel, instantiates one on mount. Same stub as
// paragraph-style-label.component.test.tsx.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  // cmdk scrolls the highlighted row into view when the menu opens; jsdom does not implement it.
  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = () => {};
});

function renderTrigger(shrinkStep?: number) {
  const trigger = (
    <ParagraphStyleTrigger
      blockMarker="toc1"
      styleName="Table of Contents 1"
      isStructureProtected={false}
      markerMenuItems={[]}
      localizedStrings={{}}
      isMenuOpen={false}
      onMenuOpenChange={() => {}}
      onReturnFocusToEditor={() => {}}
    />
  );
  return render(
    shrinkStep === undefined ? (
      trigger
    ) : (
      <ShrinkStepOverride value={shrinkStep}>{trigger}</ShrinkStepOverride>
    ),
  );
}

/** The zone's flex item is the wrapper `div` around the button, not the button itself. */
const wrapperOf = (button: HTMLElement) => button.parentElement;

describe('ParagraphStyleTrigger', () => {
  it('floors itself at the marker once the style name has been dropped', () => {
    renderTrigger(SHRINK_STEP.MINIMUM);

    const button = screen.getByRole('button', {
      name: '%webView_platformScriptureEditor_paragraphSelection_ariaLabel%',
    });

    // The marker is all that is left at this step and has no shorter form, so the trigger has to
    // stop narrowing here rather than let the toolbar zone squeeze into the marker itself.
    expect(button.className).toMatch(/(?:^|\s)tw:min-w-min(?:\s|$)/);
    expect(wrapperOf(button)?.className).toMatch(/(?:^|\s)tw:min-w-min(?:\s|$)/);
  });

  it('caps itself at its wrapper width at every step, so a long style name ellipsises', () => {
    // The headline fix, and the one rung of the ladder no other test in this file pins. The wrapper
    // around the button is a block box, so the button is not a flex item of it and the `shrink-0` in
    // shadcn's button base cannot be shrunk past: without a ceiling the button simply takes its
    // content width, up to the label's 30-character limit, and overruns the toolbar zone, whose
    // `overflow-clip` slices its trailing border and chevron. The cap is what puts the squeeze back
    // on the label, which has the `min-w-0` and `truncate` to absorb it.
    //
    // Every step, because the cap is not step-dependent the way the floor and the chevron are — and
    // the e2e spec that measures the real geometry runs in the `isolated` Playwright project, which
    // CI does not run.
    [undefined, SHRINK_STEP.TIGHTER, SHRINK_STEP.MINIMUM].forEach((shrinkStep) => {
      const { unmount } = renderTrigger(shrinkStep);

      const button = screen.getByRole('button', {
        name: '%webView_platformScriptureEditor_paragraphSelection_ariaLabel%',
      });
      expect(button.className).toMatch(/(?:^|\s)tw:max-w-full(?:\s|$)/);

      unmount();
    });
  });

  it('keeps shrinking freely while the style name is still rendered', () => {
    renderTrigger(SHRINK_STEP.TIGHTER);

    const button = screen.getByRole('button', {
      name: '%webView_platformScriptureEditor_paragraphSelection_ariaLabel%',
    });

    // A `min-content` floor is only right once the style name is gone. While the name is rendered
    // it contributes its longest word to `min-content`, which is far wider than the zone can spare
    // — the trigger would refuse to shrink and have its trailing border clipped by the zone
    // instead of ellipsising the name, which is the whole failure this floor exists to prevent.
    expect(button.className).toMatch(/(?:^|\s)tw:min-w-0(?:\s|$)/);
    expect(button.className).not.toMatch(/(?:^|\s)tw:min-w-min(?:\s|$)/);
    expect(wrapperOf(button)?.className).toMatch(/(?:^|\s)tw:min-w-0(?:\s|$)/);
    expect(wrapperOf(button)?.className).not.toMatch(/(?:^|\s)tw:min-w-min(?:\s|$)/);
  });

  it('shows a dropdown chevron at full width', () => {
    const { container } = renderTrigger();

    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('drops the chevron at the narrowest step, so the marker is never sliced against it', () => {
    // The chevron is decoration on a control already reduced to a bordered code, and dropping it is
    // what buys the room the marker needs at a column's minimum width. The popover semantics on the
    // button are untouched, so nothing changes for keyboard or screen-reader users.
    const { container } = renderTrigger(SHRINK_STEP.MINIMUM);

    expect(screen.getByText('toc1')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeNull();
  });

  it('renders nothing at all without a marker', () => {
    // No marker and no block are the same state to a user: without this the trigger would show an
    // empty box, a dangling separator, and the generic fallback description. Both spellings of
    // "no marker" reach this from the editor — undefined before any selection has resolved, and
    // the empty string for a selection in no block.
    [undefined, ''].forEach((blockMarker) => {
      const { container } = render(
        <ParagraphStyleTrigger
          blockMarker={blockMarker}
          styleName="Paragraph"
          isStructureProtected={false}
          markerMenuItems={[]}
          localizedStrings={{}}
          isMenuOpen={false}
          onMenuOpenChange={() => {}}
          onReturnFocusToEditor={() => {}}
        />,
      );

      expect(container).toBeEmptyDOMElement();
    });
  });
});

const PARAGRAPH_ITEM_ACTION = vi.fn();
const MENU_ITEMS: MarkerMenuItem[] = [
  { marker: 'p', title: 'Paragraph', action: () => PARAGRAPH_ITEM_ACTION() },
  { marker: 'q1', title: 'Poetic Line Level 1', action: () => {} },
];

/**
 * Plays the web view's part: holds whether the menu is open, and offers a stand-in for the editor's
 * `onParaMarkerMenuRequest` so a test can open the menu the way Enter on a selected marker does.
 */
function MenuHarness({
  onReturnFocusToEditor,
  isStructureProtected = false,
}: {
  onReturnFocusToEditor: () => void;
  isStructureProtected?: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsMenuOpen(true)}>
        Editor asks for the menu
      </button>
      <button type="button">Somewhere else</button>
      <ParagraphStyleTrigger
        blockMarker="p"
        styleName="Paragraph"
        isStructureProtected={isStructureProtected}
        markerMenuItems={MENU_ITEMS}
        localizedStrings={{}}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        onReturnFocusToEditor={onReturnFocusToEditor}
      />
    </>
  );
}

const TRIGGER_NAME = '%webView_platformScriptureEditor_paragraphSelection_ariaLabel%';
const queryMenu = () => screen.queryByRole('dialog');
const pressEscape = () =>
  fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' });
/** Radix arms its outside-pointer listener, and runs its unmount auto-focus, on zero-delay timers. */
const flushZeroDelayTimers = () =>
  act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  });

describe('ParagraphStyleTrigger menu', () => {
  it('opens when the editor asks for it', () => {
    render(<MenuHarness onReturnFocusToEditor={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'Editor asks for the menu' }));

    expect(queryMenu()).toBeInTheDocument();
  });

  it('stays closed when the editor asks while the structure is protected', () => {
    render(<MenuHarness onReturnFocusToEditor={vi.fn()} isStructureProtected />);

    fireEvent.click(screen.getByRole('button', { name: 'Editor asks for the menu' }));

    expect(queryMenu()).not.toBeInTheDocument();
  });

  it('closes and returns focus to the editor when an item is picked', async () => {
    const onReturnFocusToEditor = vi.fn();
    PARAGRAPH_ITEM_ACTION.mockClear();
    render(<MenuHarness onReturnFocusToEditor={onReturnFocusToEditor} />);
    fireEvent.click(screen.getByRole('button', { name: 'Editor asks for the menu' }));

    fireEvent.click(screen.getByRole('option', { name: /Paragraph/ }));

    expect(PARAGRAPH_ITEM_ACTION).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(queryMenu()).not.toBeInTheDocument());
    await waitFor(() => expect(onReturnFocusToEditor).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('button', { name: TRIGGER_NAME })).not.toHaveFocus();
  });

  it('closes on a pick from a menu the toolbar button opened, too', async () => {
    const onReturnFocusToEditor = vi.fn();
    render(<MenuHarness onReturnFocusToEditor={onReturnFocusToEditor} />);
    fireEvent.click(screen.getByRole('button', { name: TRIGGER_NAME }));
    expect(queryMenu()).toBeInTheDocument();

    fireEvent.click(screen.getByRole('option', { name: /Poetic Line Level 1/ }));

    await waitFor(() => expect(queryMenu()).not.toBeInTheDocument());
    await waitFor(() => expect(onReturnFocusToEditor).toHaveBeenCalledTimes(1));
  });

  it('returns focus to the editor, not the button, when Escape dismisses the menu', async () => {
    // Same as the character-marker control beside it: the toolbar control is a way to act on the
    // text, so dismissing it puts the user back in the text.
    const onReturnFocusToEditor = vi.fn();
    render(<MenuHarness onReturnFocusToEditor={onReturnFocusToEditor} />);
    const trigger = screen.getByRole('button', { name: TRIGGER_NAME });
    fireEvent.click(trigger);

    pressEscape();

    await waitFor(() => expect(onReturnFocusToEditor).toHaveBeenCalledTimes(1));
    expect(queryMenu()).not.toBeInTheDocument();
    expect(trigger).not.toHaveFocus();
  });

  it('leaves focus where the user put it when the menu closes because they interacted outside it', async () => {
    const onReturnFocusToEditor = vi.fn();
    render(<MenuHarness onReturnFocusToEditor={onReturnFocusToEditor} />);
    fireEvent.click(screen.getByRole('button', { name: 'Editor asks for the menu' }));
    expect(queryMenu()).toBeInTheDocument();
    await flushZeroDelayTimers();

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Somewhere else' }));

    await waitFor(() => expect(queryMenu()).not.toBeInTheDocument());
    await flushZeroDelayTimers();
    expect(onReturnFocusToEditor).not.toHaveBeenCalled();
  });

  it('refocuses the editor again on the next close after an outside interaction', async () => {
    // The outside-interaction flag belongs to one opening; a stale flag would strand focus on the
    // next Escape.
    const onReturnFocusToEditor = vi.fn();
    render(<MenuHarness onReturnFocusToEditor={onReturnFocusToEditor} />);
    const askButton = screen.getByRole('button', { name: 'Editor asks for the menu' });
    fireEvent.click(askButton);
    await flushZeroDelayTimers();
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Somewhere else' }));
    await waitFor(() => expect(queryMenu()).not.toBeInTheDocument());
    await flushZeroDelayTimers();

    fireEvent.click(askButton);
    expect(queryMenu()).toBeInTheDocument();
    pressEscape();

    await waitFor(() => expect(onReturnFocusToEditor).toHaveBeenCalledTimes(1));
  });
});
