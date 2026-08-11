// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { readDirection } from '@/utils/dir-helper.util';
import { Tour, TourStep } from './tour.component';

vi.mock('@/utils/dir-helper.util', () => ({
  readDirection: vi.fn(() => 'ltr'),
}));

// jsdom always returns {width:0, height:0} from getBoundingClientRect, which our measureTarget
// guard correctly rejects as a zero-area element. Restore a default non-zero rect so tests that
// place elements in the DOM (real tour targets) see them as visible. Tests that need specific
// geometry (the RTL positioning test) override the mock per-element inside that test.
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
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    // Advances straight to C (B was skipped), and it is the last step.
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
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

  it('renders nothing when no targets resolve', () => {
    const { container } = renderWithTargets(THREE_STEPS, []);
    expect(container.querySelector('[role="dialog"]')).toBeNull();
  });

  it('skips a step whose target is present but has zero size (e.g. an empty wrapper div)', () => {
    // #b is in the DOM but measures 0×0. The open-time filter must agree with measureTarget's
    // zero-area guard and skip it — otherwise the step is counted in the total but can never be
    // spotlighted, leaving the overlay stuck on the previous step's rect.
    const priorGetBoundingClientRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function getBoundingClientRect() {
      if (this.id === 'b')
        // Same jsdom mock-shape workaround as the RTL test below.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return { ...DEFAULT_TEST_RECT, width: 0, height: 0, right: 0, bottom: 0 } as DOMRect;
      return priorGetBoundingClientRect.call(this);
    };
    try {
      renderWithTargets(THREE_STEPS, ['a', 'b', 'c']);
      expect(screen.getByText('1 / 2')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      // Advances straight to C — the zero-size B was never a step.
      expect(screen.getByText('C')).toBeInTheDocument();
    } finally {
      Element.prototype.getBoundingClientRect = priorGetBoundingClientRect;
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

  it('flips the card to the opposite side when the requested side does not fit', () => {
    // Place the target near the bottom of the viewport so a 'bottom' card cannot fit below it.
    // Clamping alone would slide the card upward over its own target; the fix is to flip above.
    const targetTop = window.innerHeight - 50;
    const TARGET_RECT = { left: 100, top: targetTop, width: 80, height: 40 };
    const priorGetBoundingClientRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function getBoundingClientRect() {
      if (this.id === 'a')
        // Same jsdom mock-shape workaround as the RTL test below.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return {
          ...TARGET_RECT,
          right: TARGET_RECT.left + TARGET_RECT.width,
          bottom: TARGET_RECT.top + TARGET_RECT.height,
          x: TARGET_RECT.left,
          y: TARGET_RECT.top,
          toJSON: () => ({}),
        } as DOMRect;
      return priorGetBoundingClientRect.call(this);
    };
    try {
      renderWithTargets(
        [{ target: '#a', title: 'Flip Step', description: 'x', side: 'bottom' }],
        ['a'],
      );
      const titleEl = screen.getByText('Flip Step');
      const card = titleEl.closest<HTMLElement>('div[style]');
      expect(card).not.toBeNull();
      // The preceding expect confirms non-null; TypeScript cannot narrow through Vitest assertions.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const cardTop = parseInt(card!.style.top, 10);
      // Flipped placement: target top − gap (12) − card height (jsdom offsetHeight is 0, so the
      // approximation constant 176 stays in effect). A merely-clamped card would sit at
      // window.innerHeight − 176 − 8 instead.
      expect(cardTop).toBe(targetTop - 12 - 176);
    } finally {
      Element.prototype.getBoundingClientRect = priorGetBoundingClientRect;
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
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('calls stepCounter with the 1-based step index and total visible steps', () => {
    const stepCounter = vi.fn((current: number, total: number) => `${current} of ${total}`);
    render(
      <div>
        <div id="a">A</div>
        <div id="c">C</div>
        <Tour
          steps={THREE_STEPS}
          open
          onDone={vi.fn()}
          onSkip={vi.fn()}
          stepCounter={stepCounter}
        />
      </div>,
    );
    // #b absent → 2 visible steps; first step is current (1-based index 1).
    expect(stepCounter).toHaveBeenCalledWith(1, 2);
    expect(screen.getByText('1 of 2')).toBeInTheDocument();
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

    // Give the target element a real bounding rect so computeCardPosition has non-zero geometry.
    // jsdom always returns zeros from getBoundingClientRect, so we mock it on the element.
    const TARGET_RECT = { left: 100, top: 50, width: 80, height: 40, right: 180, bottom: 90 };
    // Capture the current prototype method (which is already the beforeEach mock) so we can
    // restore it in the finally block without re-shadowing the module-scope variable.
    const priorGetBoundingClientRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function getBoundingClientRect() {
      if (this.id === 'a')
        // The spread can't satisfy the full DOMRect interface (it has methods); this cast is the
        // standard jsdom test workaround for mocking getBoundingClientRect return shapes.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return {
          ...TARGET_RECT,
          x: TARGET_RECT.left,
          y: TARGET_RECT.top,
          toJSON: () => ({}),
        } as DOMRect;
      return priorGetBoundingClientRect.call(this);
    };

    try {
      renderWithTargets(
        [{ target: '#a', title: 'RTL Step', description: 'x', side: 'start' }],
        ['a'],
      );
      expect(screen.getByText('RTL Step')).toBeInTheDocument();

      // In RTL, side='start' → physical 'right', so the card is placed to the right of the target.
      // Expected card left = rect.left + rect.width + CARD_GAP_PX = 100 + 80 + 12 = 192.
      // That is greater than the target's right edge (rect.left + rect.width = 180).
      const titleEl = screen.getByText('RTL Step');
      const card = titleEl.closest<HTMLElement>('div[style]');
      expect(card).not.toBeNull();
      // The preceding expect(card).not.toBeNull() confirms non-null; TypeScript cannot narrow
      // through Vitest assertions, so the non-null assertion is unavoidable here.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const cardLeft = parseInt(card!.style.left, 10);
      expect(cardLeft).toBeGreaterThan(TARGET_RECT.left + TARGET_RECT.width);
    } finally {
      // Restore prototype mocks regardless of assertion failures so subsequent tests are not
      // contaminated by the overridden getBoundingClientRect.
      Element.prototype.getBoundingClientRect = priorGetBoundingClientRect;
      vi.mocked(readDirection).mockReturnValue('ltr');
    }
  });
});
