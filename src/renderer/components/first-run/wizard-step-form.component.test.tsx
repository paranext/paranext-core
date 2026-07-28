import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { WizardStepForm } from './wizard-step-form.component';

describe('WizardStepForm', () => {
  it('renders the heading as an h2', () => {
    render(
      <WizardStepForm heading="Enter your details" primaryButton={<button>Next</button>}>
        body
      </WizardStepForm>,
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Enter your details');
  });

  it('renders children', () => {
    render(
      <WizardStepForm heading="h" primaryButton={<button>Next</button>}>
        body content
      </WizardStepForm>,
    );
    expect(screen.getByText('body content')).toBeInTheDocument();
  });

  it('renders the primaryButton', () => {
    render(
      <WizardStepForm heading="h" primaryButton={<button>Submit</button>}>
        body
      </WizardStepForm>,
    );
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('renders error text when error prop is provided', () => {
    render(
      <WizardStepForm heading="h" primaryButton={<button>OK</button>} error="Something failed">
        body
      </WizardStepForm>,
    );
    expect(screen.getByText('Something failed')).toBeInTheDocument();
  });

  it('does not render error text when error prop is omitted', () => {
    render(
      <WizardStepForm heading="h" primaryButton={<button>OK</button>}>
        body
      </WizardStepForm>,
    );
    expect(screen.queryByText('Something failed')).not.toBeInTheDocument();
  });

  it('renders backButton when provided', () => {
    render(
      <WizardStepForm
        heading="h"
        primaryButton={<button>Next</button>}
        backButton={<button>Back</button>}
      >
        body
      </WizardStepForm>,
    );
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  it('does not render backButton when omitted', () => {
    render(
      <WizardStepForm heading="h" primaryButton={<button>Next</button>}>
        body
      </WizardStepForm>,
    );
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
  });

  it('renders secondaryButton when provided', () => {
    render(
      <WizardStepForm
        heading="h"
        primaryButton={<button>Next</button>}
        secondaryButton={<button>Skip</button>}
      >
        body
      </WizardStepForm>,
    );
    expect(screen.getByRole('button', { name: /skip/i })).toBeInTheDocument();
  });

  it('does not render secondaryButton when omitted', () => {
    render(
      <WizardStepForm heading="h" primaryButton={<button>Next</button>}>
        body
      </WizardStepForm>,
    );
    expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();
  });
});
