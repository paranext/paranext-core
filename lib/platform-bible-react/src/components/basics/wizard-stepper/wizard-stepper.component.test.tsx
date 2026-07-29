// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WizardStepper } from './wizard-stepper.component';

/** The circle element for a given numeral, identified by its stable `data-state` hook. */
function circleFor(numeral: string): HTMLElement | null {
  return screen.getByText(numeral).closest('[data-state]');
}

describe('WizardStepper', () => {
  it('renders all step numerals', () => {
    render(<WizardStepper currentStep={2} totalSteps={4} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('accepts a non-default locale and renders all step circles without throwing', () => {
    // Exact numeral glyph output (e.g. Arabic-Indic ١٢٣) depends on ICU data availability in
    // the test runtime — verify only that the component renders correctly without crashing.
    const { container } = render(<WizardStepper currentStep={1} totalSteps={3} locale="ar" />);
    expect(container.querySelectorAll('[data-state]')).toHaveLength(3);
  });

  it('marks the active step and leaves the others non-active', () => {
    render(<WizardStepper currentStep={2} totalSteps={4} />);
    expect(circleFor('2')).toHaveAttribute('data-state', 'active');
    expect(circleFor('1')).not.toHaveAttribute('data-state', 'active');
    expect(circleFor('3')).not.toHaveAttribute('data-state', 'active');
  });

  it('marks earlier steps complete and the active step active', () => {
    render(<WizardStepper currentStep={3} totalSteps={4} />);
    expect(circleFor('1')).toHaveAttribute('data-state', 'complete');
    expect(circleFor('2')).toHaveAttribute('data-state', 'complete');
    expect(circleFor('3')).toHaveAttribute('data-state', 'active');
    expect(circleFor('4')).toHaveAttribute('data-state', 'upcoming');
  });

  it('clamps underflow: currentStep=0 shows step 1 as active', () => {
    render(<WizardStepper currentStep={0} totalSteps={4} />);
    expect(circleFor('1')).toHaveAttribute('data-state', 'active');
    expect(circleFor('2')).toHaveAttribute('data-state', 'upcoming');
  });

  it('clamps overflow: currentStep > totalSteps shows last step as active', () => {
    render(<WizardStepper currentStep={99} totalSteps={4} />);
    expect(circleFor('4')).toHaveAttribute('data-state', 'active');
    expect(circleFor('1')).toHaveAttribute('data-state', 'complete');
  });

  it('falls back to English numerals when locale is empty string', () => {
    render(<WizardStepper currentStep={1} totalSteps={2} locale="" />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
