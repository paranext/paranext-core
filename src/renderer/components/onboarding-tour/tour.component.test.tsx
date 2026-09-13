// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { readDirection } from 'platform-bible-react/experimental';
import { Tour, TourStep } from './tour.component';

vi.mock('platform-bible-react/experimental', () => ({
  readDirection: vi.fn(() => 'ltr'),
}));

// jsdom always returns {width:0, height:0} from getBoundingClientRect, which our measureTarget
// guard correctly rejects as a zero-area element. Restore a default non-zero rect so tests that
// place elements in the DOM (real tour targets) see them as visible. Tests that need specific
// geometry (the RTL positioning tests) override the mock per-element inside that test.
const DEFAULT_TEST_RECT: DOMRect = {
  width: 100,
  height: 50,
  top: 0,
  left: 0,
  right: 100,
  bottom: 50,
  x: 0,
  y: 0,
  toJSON: () => ({}),
};
const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
beforeEach(() => {
  // The type cast is needed because the object literal satisfies DOMRect's shape but TypeScript
  // cannot verify that without a full class instance; this is the standard jsdom test pattern.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  Element.prototype.getBoundingClientRect = () => DEFAULT_TEST_RECT;
});
afterEach(() => {
  Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
});

afterEach(cleanup);

/**
 * Replaces `getBoundingClientRect` for one element id with the given box, restoring the previous
 * implementation when `restore()` is called. jsdom performs no layout, so every test that asserts
 * on card placement has to supply the geometry itself.
 */
function stubRectFor(
  id: string,
  box: { left: number; top: number; width: number; height: number },
) {
  const prior = Element.prototype.getBoundingClientRect;
  Element.prototype.getBoundingClientRect = function getBoundingClientRect() {
    if (this.id === id)
      // The spread can't satisfy the full DOMRect interface (it has methods); this cast is the
      // standard jsdom test workaround for mocking getBoundingClientRect return shapes.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return {
        ...box,
        right: box.left + box.width,
        bottom: box.top + box.height,
        x: box.left,
        y: box.top,
        toJSON: () => ({}),
      } as DOMRect;
    return prior.call(this);
  };
  return {
    restore: () => {
      Element.prototype.getBoundingClientRect = prior;
    },
  };
}

/** Reads the absolute `left` the component positioned the step card at. */
function getCardLeft(stepTitle: string): number {
  const card = screen.getByText(stepTitle).closest<HTMLElement>('div[style]');
  expect(card).not.toBeNull();
  // The preceding expect confirms non-null; TypeScript cannot narrow through Vitest assertions.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return parseInt(card!.style.left, 10);
}

function renderWithTargets(steps: TourStep[], present: string[]) {
  return render(
    <div>
      {present.map((id) => (
        <div key={id} id={id} data-testid={id}>
          {id}
        </div>
      ))}
      <Tour steps={steps} open onDone={vi.fn()} onSkip={vi.fn()} />
    </div>,
  );
}

const THREE_STEPS: TourStep[] = [
  { target: '#a', title: 'A', description: 'first' },
  { target: '#b', title: 'B', description: 'second (missing)' },
  { target: '#c', title: 'C', description: 'third' },
];

describe('Tour', () => {
  it('skips a step whose target is not in the DOM', () => {
    // #b is absent, so only 2 of 3 steps are visible.
    renderWithTargets(THREE_STEPS, ['a', 'c']);
    expect(screen.getByText('1 of 2')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    // Advances straight to C (B was skipped), and it is the last step.
    expect(screen.getByText('2 of 2')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument();
  });

  it('calls onSkip when Escape is pressed', () => {
    const onSkip = vi.fn();
    render(
      <div>
        <div id="a">A</div>
        <Tour
          steps={[{ target: '#a', title: 'A', description: 'x' }]}
          open
          onDone={vi.fn()}
          onSkip={onSkip}
        />
      </div>,
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onSkip).toHaveBeenCalledOnce();
  });

  it('renders nothing and calls onSkip when no targets resolve', () => {
    // Without the onSkip call the caller would be left with `open` stuck true behind an overlay
    // that renders nothing and never reports back, so the tour would be retried forever.
    const onSkip = vi.fn();
    const { container } = render(
      <div>
        <Tour steps={THREE_STEPS} open onDone={vi.fn()} onSkip={onSkip} />
      </div>,
    );
    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(onSkip).toHaveBeenCalledOnce();
  });

  it('does not swallow Escape while the tour is open but renders nothing', () => {
    // The overlay intercepts Escape in the capture phase so the tour always wins it — but only
    // while it is actually on screen. An open-but-invisible tour must let Escape through to a
    // popover or dialog underneath.
    const onEscapeBelow = vi.fn();
    const { container } = render(
      <div>
        <button type="button">Below</button>
        <Tour steps={THREE_STEPS} open onDone={vi.fn()} onSkip={vi.fn()} />
      </div>,
    );
    container.addEventListener('keydown', onEscapeBelow);
    fireEvent.keyDown(screen.getByRole('button', { name: 'Below' }), { key: 'Escape' });
    expect(onEscapeBelow).toHaveBeenCalledOnce();
  });

  it('drops a step whose target disappears after the tour opens', () => {
    // The open-time filter is a snapshot; a target can vanish afterwards (e.g. a conditional
    // toolbar item whose availability probe resolves late). Without dropping the step, its card
    // would render the vanished step's copy over the previous step's still-current rect.
    renderWithTargets(THREE_STEPS, ['a', 'b', 'c']);
    expect(screen.getByText('1 of 3')).toBeInTheDocument();

    document.getElementById('b')?.remove();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    // B is gone, so the tour lands on C — not on B's copy over A's spotlight.
    expect(screen.queryByText('B')).not.toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('2 of 2')).toBeInTheDocument();
  });

  it('skips a step whose target is present but has zero size (e.g. an empty wrapper div)', () => {
    // #b is in the DOM but measures 0×0. The open-time filter must agree with measureTarget's
    // zero-area guard and skip it — otherwise the step is counted in the total but can never be
    // spotlighted, leaving the overlay stuck on the previous step's rect.
    const stub = stubRectFor('b', { left: 0, top: 0, width: 0, height: 0 });
    try {
      renderWithTargets(THREE_STEPS, ['a', 'b', 'c']);
      expect(screen.getByText('1 of 2')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      // Advances straight to C — the zero-size B was never a step.
      expect(screen.getByText('C')).toBeInTheDocument();
    } finally {
      stub.restore();
    }
  });

  it('focuses the primary action button when the tour first opens', () => {
    render(
      <div>
        <div id="a">A</div>
        <Tour
          steps={[{ target: '#a', title: 'A', description: 'x' }]}
          open
          onDone={vi.fn()}
          onSkip={vi.fn()}
        />
      </div>,
    );
    // The card mounts one commit after open (the target must be measured first); focus must land
    // on the primary button once the card exists, not silently stay on the page behind the overlay.
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Done' }));
  });

  it('pulls Tab back into the card when focus has escaped to the document body', () => {
    // Clicking the dimmed backdrop blurs the card button and leaves activeElement on <body>, which
    // is neither trap boundary. Without the outside-the-card branch, Tab from there walks into the
    // toolbar and dock behind an aria-modal overlay.
    render(
      <div>
        <button type="button">Behind</button>
        <div id="a">A</div>
        <Tour
          steps={[{ target: '#a', title: 'A', description: 'x' }]}
          open
          onDone={vi.fn()}
          onSkip={vi.fn()}
        />
      </div>,
    );
    const skipButton = screen.getByRole('button', { name: 'Skip tour' });
    // Reproduces the backdrop click: blurring whatever the card focused leaves activeElement on
    // <body>.
    const blurActiveElement = () => {
      // `document.activeElement` is typed `Element | null`, which has no `blur()`. There is no
      // narrowing predicate to use instead: the test has just asserted a real button is focused,
      // so the cast states what the assertion above already established.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      (document.activeElement as HTMLElement).blur();
    };

    blurActiveElement();
    expect(document.activeElement).toBe(document.body);

    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(skipButton);

    // Shift+Tab from outside lands on the other end of the card rather than escaping backwards.
    blurActiveElement();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Done' }));
  });

  it('re-measures when the target resizes in place', async () => {
    // Neither a window resize nor a scroll fires when a target's own box changes — an rc-dock panel
    // reflowing as its web view loads, or the toolbar config area reflowing as its async children
    // resolve. Without the ResizeObserver the cutout and card keep the stale geometry.
    const observed: Element[] = [];
    let disconnectCount = 0;
    let triggerResize = () => {};
    // A constructor returning an object literal rather than a class: the stub's members close over
    // the test's `observed` array rather than instance state, and `new` yields the returned object.
    const priorResizeObserver = globalThis.ResizeObserver;
    // The stub implements only the surface Tour uses, so it cannot satisfy the full DOM interface;
    // there is no partial-mock helper for a global constructor to use instead.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.ResizeObserver = vi.fn((callback: () => void) => {
      triggerResize = callback;
      return {
        observe: (element: Element) => {
          observed.push(element);
        },
        disconnect: () => {
          disconnectCount += 1;
        },
        unobserve: () => {},
      };
    }) as unknown as typeof ResizeObserver;
    let stub = stubRectFor('a', { left: 100, top: 50, width: 80, height: 40 });
    try {
      const { unmount } = renderWithTargets(
        [{ target: '#a', title: 'Resize Step', description: 'x' }],
        ['a'],
      );
      expect(getCardLeft('Resize Step')).toBe(100);
      // Both are observed for different reasons: the target catches its own box changing, the root
      // catches a reflow that moves the target without resizing it (font or theme swap, zoom).
      // Asserting only the target would let either half be dropped silently.
      expect(observed).toContain(document.getElementById('a'));
      expect(observed).toContain(document.documentElement);

      stub.restore();
      stub = stubRectFor('a', { left: 400, top: 50, width: 80, height: 40 });
      await act(async () => {
        triggerResize();
        // The re-measure is scheduled on the next animation frame.
        await new Promise((resolve) => {
          requestAnimationFrame(resolve);
        });
      });

      expect(getCardLeft('Resize Step')).toBe(400);

      // Cleanup must disconnect, or every step change leaks an observer that keeps firing against
      // a stale closure for the rest of the session.
      expect(disconnectCount).toBe(0);
      unmount();
      expect(disconnectCount).toBeGreaterThan(0);
    } finally {
      stub.restore();
      globalThis.ResizeObserver = priorResizeObserver;
    }
  });

  it('flips the card to the opposite side when the requested side does not fit', () => {
    // Place the target near the bottom of the viewport so a 'bottom' card cannot fit below it.
    // Clamping alone would slide the card upward over its own target; the fix is to flip above.
    const targetTop = window.innerHeight - 50;
    const stub = stubRectFor('a', { left: 100, top: targetTop, width: 80, height: 40 });
    try {
      renderWithTargets(
        [{ target: '#a', title: 'Flip Step', description: 'x', side: 'bottom' }],
        ['a'],
      );
      const card = screen.getByText('Flip Step').closest<HTMLElement>('div[style]');
      expect(card).not.toBeNull();
      // The preceding expect confirms non-null; TypeScript cannot narrow through Vitest assertions.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const cardTop = parseInt(card!.style.top, 10);
      // Flipped placement: target top − gap (12) − card height (jsdom offsetHeight is 0, so the
      // approximation constant 176 stays in effect). A merely-clamped card would sit at
      // window.innerHeight − 176 − 8 instead.
      expect(cardTop).toBe(targetTop - 12 - 176);
    } finally {
      stub.restore();
    }
  });

  it('calls onDone when Done is clicked on the last step', () => {
    const onDone = vi.fn();
    render(
      <div>
        <div id="a">A</div>
        <Tour
          steps={[{ target: '#a', title: 'Step A', description: 'only step' }]}
          open
          onDone={onDone}
          onSkip={vi.fn()}
        />
      </div>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(onDone).toHaveBeenCalledOnce();
  });

  it('navigates back to the previous step when Back is clicked', () => {
    // THREE_STEPS has #b absent → two visible steps: A and C.
    renderWithTargets(THREE_STEPS, ['a', 'c']);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('2 of 2')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByText('1 of 2')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders the supplied localized chrome, falling back to English per key', () => {
    render(
      <div>
        <div id="a">A</div>
        <div id="c">C</div>
        <Tour
          steps={THREE_STEPS}
          open
          onDone={vi.fn()}
          onSkip={vi.fn()}
          localizedStrings={{
            '%general_countOfTotal%': 'Paso {count} de {total}',
            '%onboardingTour_button_skip%': 'Omitir recorrido',
          }}
        />
      </div>,
    );
    // #b absent → 2 visible steps; the counter template is filled with the 1-based index.
    expect(screen.getByText('Paso 1 de 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Omitir recorrido' })).toBeInTheDocument();
    // Keys not supplied keep their English fallback rather than rendering the raw key.
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('restores focus to the previously active element when the tour closes', () => {
    const { rerender } = render(
      <div>
        <button type="button">Prior</button>
        <div id="a">A</div>
        <Tour
          steps={[{ target: '#a', title: 'A', description: 'x' }]}
          open={false}
          onDone={vi.fn()}
          onSkip={vi.fn()}
        />
      </div>,
    );
    const priorButton = screen.getByRole('button', { name: 'Prior' });
    priorButton.focus();
    expect(document.activeElement).toBe(priorButton);

    rerender(
      <div>
        <button type="button">Prior</button>
        <div id="a">A</div>
        <Tour
          steps={[{ target: '#a', title: 'A', description: 'x' }]}
          open
          onDone={vi.fn()}
          onSkip={vi.fn()}
        />
      </div>,
    );

    rerender(
      <div>
        <button type="button">Prior</button>
        <div id="a">A</div>
        <Tour
          steps={[{ target: '#a', title: 'A', description: 'x' }]}
          open={false}
          onDone={vi.fn()}
          onSkip={vi.fn()}
        />
      </div>,
    );

    expect(document.activeElement).toBe(priorButton);
  });

  it('resolves logical sides correctly in RTL layout', () => {
    vi.mocked(readDirection).mockReturnValue('rtl');
    const stub = stubRectFor('a', { left: 100, top: 50, width: 80, height: 40 });
    try {
      renderWithTargets(
        [{ target: '#a', title: 'RTL Step', description: 'x', side: 'start' }],
        ['a'],
      );
      // In RTL, side='start' → physical 'right', so the card is placed to the right of the target:
      // rect.left + rect.width + CARD_GAP_PX = 100 + 80 + 12 = 192, past the target's right edge.
      expect(getCardLeft('RTL Step')).toBeGreaterThan(100 + 80);
    } finally {
      stub.restore();
      vi.mocked(readDirection).mockReturnValue('ltr');
    }
  });

  it('hangs a top/bottom card from the target’s inline-start edge in each direction', () => {
    // A card above or below its target runs along the inline axis. Anchoring it to the physical
    // left edge in both directions would push it away from the reading direction in RTL, and into
    // the opposite viewport clamp for targets near the inline-start edge.
    const box = { left: 500, top: 50, width: 80, height: 40 };
    const ltrStub = stubRectFor('a', box);
    try {
      renderWithTargets(
        [{ target: '#a', title: 'Below Step', description: 'x', side: 'bottom' }],
        ['a'],
      );
      expect(getCardLeft('Below Step')).toBe(box.left);
    } finally {
      ltrStub.restore();
    }

    cleanup();
    vi.mocked(readDirection).mockReturnValue('rtl');
    const rtlStub = stubRectFor('a', box);
    try {
      renderWithTargets(
        [{ target: '#a', title: 'Below Step', description: 'x', side: 'bottom' }],
        ['a'],
      );
      // Right-aligned to the target: rect.left + rect.width − CARD_WIDTH_PX = 500 + 80 − 288.
      expect(getCardLeft('Below Step')).toBe(box.left + box.width - 288);
    } finally {
      rtlStub.restore();
      vi.mocked(readDirection).mockReturnValue('ltr');
    }
  });
});
