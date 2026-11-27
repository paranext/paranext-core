// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Wizard, WizardProps, WizardStep } from './wizard.component';

const STEPS: WizardStep[] = [
  { id: 'one', title: 'First step', content: <p>Short</p> },
  {
    id: 'two',
    title: 'Second step',
    content: (
      <ul>
        <li>Much</li>
        <li>taller</li>
        <li>content</li>
      </ul>
    ),
  },
  { id: 'three', title: 'Third step', content: <input aria-label="Name" /> },
];

function renderWizard(overrides: Partial<WizardProps> = {}) {
  const onFinish = vi.fn();
  const result = render(<Wizard steps={STEPS} onFinish={onFinish} {...overrides} />);
  return { ...result, onFinish };
}

function panels(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('[data-step-id]'));
}

describe('Wizard', () => {
  describe('constant height across steps', () => {
    it('renders every step at once, all stacked in the same grid cell', () => {
      const { container } = renderWizard();
      const allPanels = panels(container);
      expect(allPanels).toHaveLength(STEPS.length);
      // A single shared parent grid, and every panel pinned to cell 1/1: the grid sizes to the
      // largest step, so moving between steps cannot change the wizard's height.
      const grid = allPanels[0].parentElement;
      expect(grid).toHaveClass('tw:grid');
      allPanels.forEach((panel) => {
        expect(panel.parentElement).toBe(grid);
        expect(panel).toHaveClass('tw:col-start-1', 'tw:row-start-1');
      });
    });

    it('keeps the inactive steps in the layout but hidden, inert and out of the accessibility tree', () => {
      const { container } = renderWizard();
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      const [first, second, third] = panels(container);
      expect(second).toHaveAttribute('data-state', 'active');
      expect(second).not.toHaveClass('tw:invisible');
      expect(second).not.toHaveAttribute('inert');
      expect(second).toHaveAttribute('aria-hidden', 'false');
      [first, third].forEach((panel) => {
        // `invisible` (visibility: hidden) keeps the panel's size, unlike `hidden` (display: none).
        expect(panel).toHaveClass('tw:invisible');
        expect(panel).not.toHaveClass('tw:hidden');
        expect(panel).toHaveAttribute('inert');
        expect(panel).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('keeps the panel set unchanged while navigating', () => {
      const { container } = renderWizard();
      const before = panels(container);
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      expect(panels(container)).toEqual(before);
    });

    it('keeps Back in the layout, hidden, on the first step', () => {
      renderWizard();
      const back = screen.getByText('Back').closest('button');
      expect(back).toHaveClass('tw:invisible');
      expect(back).toBeDisabled();
    });
  });

  describe('navigation', () => {
    it('shows only the current step heading to assistive technology', () => {
      renderWizard();
      expect(screen.getByRole('heading', { name: 'First step' })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Second step' })).not.toBeInTheDocument();
      expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    });

    it('moves forward with Next and back with Back, reporting each change', () => {
      const onStepChange = vi.fn();
      renderWizard({ onStepChange });
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      expect(screen.getByRole('heading', { name: 'Second step' })).toBeInTheDocument();
      expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Back' }));
      expect(screen.getByRole('heading', { name: 'First step' })).toBeInTheDocument();
      expect(onStepChange.mock.calls).toEqual([[1], [0]]);
    });

    it('moves focus to Next when Back reaches the first step', () => {
      renderWizard({ initialStepIndex: 1 });
      const back = screen.getByRole('button', { name: 'Back' });
      back.focus();
      fireEvent.click(back);
      expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus();
    });

    it('shows Finish on the last step and calls onFinish', () => {
      const { onFinish } = renderWizard({ initialStepIndex: 2 });
      expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Finish' }));
      expect(onFinish).toHaveBeenCalledTimes(1);
    });

    it('blocks Next while the current step cannot advance', () => {
      const steps = STEPS.map((step, index) =>
        index === 0 ? { ...step, canAdvance: false } : step,
      );
      renderWizard({ steps });
      const next = screen.getByRole('button', { name: 'Next' });
      expect(next).toBeDisabled();
      fireEvent.click(next);
      expect(screen.getByRole('heading', { name: 'First step' })).toBeInTheDocument();
    });

    it('disables every button while busy', () => {
      const onCancel = vi.fn();
      const { onFinish } = renderWizard({ initialStepIndex: 2, isBusy: true, onCancel });
      expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
      const finish = screen.getByRole('button', { name: 'Finish' });
      expect(finish).toBeDisabled();
      fireEvent.click(finish);
      expect(onFinish).not.toHaveBeenCalled();
    });

    it('shows Cancel only when onCancel is provided', () => {
      const { unmount } = renderWizard();
      expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
      unmount();
      const onCancel = vi.fn();
      renderWizard({ onCancel });
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('keeps check marks on steps already passed after stepping back', () => {
      const { container } = renderWizard();
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      fireEvent.click(screen.getByRole('button', { name: 'Back' }));
      fireEvent.click(screen.getByRole('button', { name: 'Back' }));
      const circles = Array.from(
        container.querySelectorAll('[aria-hidden="true"] > [data-state]'),
      ).map((circle) => circle.getAttribute('data-state'));
      expect(circles).toEqual(['active', 'complete', 'upcoming']);
    });

    it('clamps an out-of-range initial step to the last step', () => {
      renderWizard({ initialStepIndex: 99 });
      expect(screen.getByRole('heading', { name: 'Third step' })).toBeInTheDocument();
    });
  });

  describe('localization', () => {
    it('uses localized strings and falls back to English for unresolved keys', () => {
      renderWizard({
        localizedStrings: {
          '%wizard_button_next%': 'Siguiente',
          '%wizard_stepIndicator%': 'Paso {stepNumber} de {stepCount}',
          // An unresolved lookup arrives as the key itself.
          '%wizard_button_back%': '%wizard_button_back%',
        },
      });
      expect(screen.getByRole('button', { name: 'Siguiente' })).toBeInTheDocument();
      expect(screen.getByText('Paso 1 de 3')).toBeInTheDocument();
      expect(screen.getByText('Back')).toBeInTheDocument();
    });
  });
});
