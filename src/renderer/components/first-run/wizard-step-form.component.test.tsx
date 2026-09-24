import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { WizardStepForm } from './wizard-step-form.component';

vi.mock('platform-bible-react', () => ({
  Alert: ({ children, variant }: { children: ReactNode; variant?: string }) => (
    <div role="alert" data-variant={variant}>
      {children}
    </div>
  ),
  AlertTitle: ({ children }: { children: ReactNode }) => <strong>{children}</strong>,
  AlertDescription: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));

vi.mock('lucide-react', () => ({ AlertCircle: () => <span data-testid="alert-icon" /> }));

describe('WizardStepForm', () => {
  it('renders the heading as an h2', () => {
    render(
      <WizardStepForm
        heading="Enter your details"
        primaryButton={<button type="button">Next</button>}
      >
        body
      </WizardStepForm>,
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Enter your details');
  });

  it('renders children', () => {
    render(
      <WizardStepForm heading="h" primaryButton={<button type="button">Next</button>}>
        body content
      </WizardStepForm>,
    );
    expect(screen.getByText('body content')).toBeInTheDocument();
  });

  it('renders the primaryButton', () => {
    render(
      <WizardStepForm heading="h" primaryButton={<button type="button">Submit</button>}>
        body
      </WizardStepForm>,
    );
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('renders an alert with role="alert" when error prop is provided', () => {
    render(
      <WizardStepForm
        heading="h"
        primaryButton={<button type="button">OK</button>}
        error="Something failed"
      >
        body
      </WizardStepForm>,
    );
    const alertEl = screen.getByRole('alert');
    expect(alertEl).toBeInTheDocument();
    expect(alertEl).toHaveTextContent('Something failed');
  });

  it('does not render an alert when error prop is omitted', () => {
    render(
      <WizardStepForm heading="h" primaryButton={<button type="button">OK</button>}>
        body
      </WizardStepForm>,
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders errorDescription inside the alert when provided', () => {
    render(
      <WizardStepForm
        heading="h"
        primaryButton={<button type="button">OK</button>}
        error="Title"
        errorDescription="More details"
      >
        body
      </WizardStepForm>,
    );
    const alertEl = screen.getByRole('alert');
    expect(alertEl).toHaveTextContent('More details');
  });

  it('does not render errorDescription when the prop is omitted', () => {
    const { rerender } = render(
      <WizardStepForm
        heading="h"
        primaryButton={<button type="button">OK</button>}
        error="Title only"
      >
        body
      </WizardStepForm>,
    );
    expect(screen.queryByText('Extra details')).not.toBeInTheDocument();

    // Confirm the same string IS visible once the prop is supplied (makes the assertion falsifiable).
    rerender(
      <WizardStepForm
        heading="h"
        primaryButton={<button type="button">OK</button>}
        error="Title only"
        errorDescription="Extra details"
      >
        body
      </WizardStepForm>,
    );
    expect(screen.getByText('Extra details')).toBeInTheDocument();
  });

  it('renders heading before children before error before button in DOM order', () => {
    const { baseElement } = render(
      <WizardStepForm
        heading="My heading"
        primaryButton={<button type="button">Go</button>}
        error="Oops"
      >
        <span>body text</span>
      </WizardStepForm>,
    );
    // textContent concatenates text nodes in document order; indexOf positions reflect DOM order.
    const text = baseElement.textContent ?? '';
    const headingIdx = text.indexOf('My heading');
    const bodyIdx = text.indexOf('body text');
    const errorIdx = text.indexOf('Oops');
    const buttonIdx = text.indexOf('Go');
    expect(headingIdx).toBeGreaterThanOrEqual(0);
    expect(headingIdx).toBeLessThan(bodyIdx);
    expect(bodyIdx).toBeLessThan(errorIdx);
    expect(errorIdx).toBeLessThan(buttonIdx);
  });
});
