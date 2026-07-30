// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WizardStepper } from './wizard-stepper.component';

/** The circle elements in render order, identified by their stable `data-state` hook. */
function circles(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('[data-state]'));
}

describe('WizardStepper', () => {
  it('renders numerals for the active and not-yet-reached steps', () => {
    // currentStep=1 → no completed steps, so every circle shows its numeral.
    render(<WizardStepper currentStep={1} totalSteps={4} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('accepts a non-default locale and renders all step circles without throwing', () => {
    // Exact numeral glyph output (e.g. Arabic-Indic ١٢٣) depends on ICU data availability in
    // the test runtime — verify only that the component renders correctly without crashing.
    const { container } = render(<WizardStepper currentStep={1} totalSteps={3} locale="ar" />);
    expect(circles(container)).toHaveLength(3);
  });

  it('marks the active step and leaves the others non-active', () => {
    const { container } = render(<WizardStepper currentStep={2} totalSteps={4} />);
    const [first, second, third] = circles(container);
    expect(second).toHaveAttribute('data-state', 'active');
    expect(first).not.toHaveAttribute('data-state', 'active');
    expect(third).not.toHaveAttribute('data-state', 'active');
  });

  it('marks earlier steps complete (with a check mark) and the active step active', () => {
    const { container } = render(<WizardStepper currentStep={3} totalSteps={4} />);
    const [first, second, third, fourth] = circles(container);
    expect(first).toHaveAttribute('data-state', 'complete');
    expect(second).toHaveAttribute('data-state', 'complete');
    expect(third).toHaveAttribute('data-state', 'active');
    expect(fourth).toHaveAttribute('data-state', 'upcoming');
    // Completed steps show a check mark, not their numeral; the active/upcoming steps show numerals.
    expect(first.querySelector('svg')).toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('clamps underflow: currentStep=0 shows step 1 as active', () => {
    const { container } = render(<WizardStepper currentStep={0} totalSteps={4} />);
    const [first, second] = circles(container);
    expect(first).toHaveAttribute('data-state', 'active');
    expect(second).toHaveAttribute('data-state', 'upcoming');
  });

  it('clamps overflow: currentStep > totalSteps shows last step as active', () => {
    const { container } = render(<WizardStepper currentStep={99} totalSteps={4} />);
    const all = circles(container);
    expect(all[3]).toHaveAttribute('data-state', 'active');
    expect(all[0]).toHaveAttribute('data-state', 'complete');
  });

  it('falls back to English numerals when locale is empty string', () => {
    render(<WizardStepper currentStep={1} totalSteps={2} locale="" />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
