// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WizardStepper } from './wizard-stepper.component';

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
    const circles = container.querySelectorAll('.tw\\:rounded-full');
    expect(circles).toHaveLength(3);
  });

  it('marks the active step circle with primary background', () => {
    render(<WizardStepper currentStep={2} totalSteps={4} />);
    const step2 = screen.getByText('2').closest('.tw\\:rounded-full');
    expect(step2).toHaveClass('tw:bg-primary');
    expect(screen.getByText('1').closest('.tw\\:rounded-full')).not.toHaveClass('tw:bg-primary');
    expect(screen.getByText('3').closest('.tw\\:rounded-full')).not.toHaveClass('tw:bg-primary');
  });

  it('marks past step circles with muted background', () => {
    render(<WizardStepper currentStep={3} totalSteps={4} />);
    expect(screen.getByText('1').closest('.tw\\:rounded-full')).toHaveClass('tw:bg-muted');
    expect(screen.getByText('2').closest('.tw\\:rounded-full')).toHaveClass('tw:bg-muted');
    expect(screen.getByText('3').closest('.tw\\:rounded-full')).toHaveClass('tw:bg-primary');
    expect(screen.getByText('4').closest('.tw\\:rounded-full')).not.toHaveClass('tw:bg-muted');
    expect(screen.getByText('4').closest('.tw\\:rounded-full')).not.toHaveClass('tw:bg-primary');
  });

  it('clamps underflow: currentStep=0 shows step 1 as active', () => {
    render(<WizardStepper currentStep={0} totalSteps={4} />);
    expect(screen.getByText('1').closest('.tw\\:rounded-full')).toHaveClass('tw:bg-primary');
    expect(screen.getByText('2').closest('.tw\\:rounded-full')).not.toHaveClass('tw:bg-primary');
  });

  it('clamps overflow: currentStep > totalSteps shows last step as active', () => {
    render(<WizardStepper currentStep={99} totalSteps={4} />);
    expect(screen.getByText('4').closest('.tw\\:rounded-full')).toHaveClass('tw:bg-primary');
    expect(screen.getByText('1').closest('.tw\\:rounded-full')).toHaveClass('tw:bg-muted');
  });

  it('falls back to English numerals when locale is empty string', () => {
    render(<WizardStepper currentStep={1} totalSteps={2} locale="" />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
