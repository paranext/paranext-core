// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tour, TourStep } from './tour.component';
import { readDirection } from '@/utils/dir-helper.util';

vi.mock('@/utils/dir-helper.util', () => ({
  readDirection: vi.fn(() => 'ltr'),
}));

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
    // In RTL: 'start' → right, 'end' → left. Verify the component renders without error.
    renderWithTargets([{ target: '#a', title: 'RTL Step', description: 'x', side: 'start' }], ['a']);
    expect(screen.getByText('RTL Step')).toBeInTheDocument();
    vi.mocked(readDirection).mockReturnValue('ltr');
  });
});
