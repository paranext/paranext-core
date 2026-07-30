// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tour, TourStep } from './tour.component';

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
});
