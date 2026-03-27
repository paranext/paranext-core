import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dialog } from 'platform-bible-react';
import { CONFIRM_DIALOG } from './confirm-dialog.component';

// Mock dialog-base.data to avoid dependency on dialog.service-host
vi.mock('./dialog-base.data', async () => {
  const actual = await vi.importActual('./dialog-base.data');
  return actual;
});

const { Component: ConfirmDialog } = CONFIRM_DIALOG;

function makeProps(overrides = {}) {
  return {
    isDialog: true as const,
    prompt: 'Are you sure?',
    submitDialog: vi.fn(),
    cancelDialog: vi.fn(),
    rejectDialog: vi.fn(),
    ...overrides,
  };
}

describe('ConfirmDialog', () => {
  describe('with Radix Dialog context (used by both modal overlay and dock tab paths)', () => {
    it('renders title, prompt, and buttons', () => {
      render(
        <Dialog open modal={false}>
          <ConfirmDialog {...makeProps({ title: 'Delete Item', okLabel: 'Delete' })} />
        </Dialog>,
      );

      expect(screen.getByText('Delete Item')).toBeInTheDocument();
      expect(screen.getByText('Are you sure?')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    it('calls submitDialog(true) when OK is clicked', () => {
      const props = makeProps({ okLabel: 'Confirm' });
      render(
        <Dialog open modal={false}>
          <ConfirmDialog {...props} />
        </Dialog>,
      );

      fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
      expect(props.submitDialog).toHaveBeenCalledWith(true);
      expect(props.cancelDialog).not.toHaveBeenCalled();
    });

    it('calls cancelDialog when Cancel is clicked', () => {
      const props = makeProps();
      render(
        <Dialog open modal={false}>
          <ConfirmDialog {...props} />
        </Dialog>,
      );

      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(props.cancelDialog).toHaveBeenCalled();
      expect(props.submitDialog).not.toHaveBeenCalled();
    });

    it('applies destructive variant to OK button when destructive is true', () => {
      render(
        <Dialog open modal={false}>
          <ConfirmDialog {...makeProps({ destructive: true })} />
        </Dialog>,
      );

      const okButton = screen.getByRole('button', { name: 'OK' });
      expect(okButton.className).toMatch(/destructive/);
    });

    it('uses fallback labels when none provided', () => {
      render(
        <Dialog open modal={false}>
          <ConfirmDialog {...makeProps()} />
        </Dialog>,
      );

      expect(screen.getByText('Confirm')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });
  });

  describe('inside dock tab (non-modal Dialog context)', () => {
    // This mirrors how DIALOG_BASE.loadDialog wraps the component
    it('renders without errors inside a non-modal Dialog wrapper', () => {
      render(
        <Dialog open modal={false}>
          <ConfirmDialog {...makeProps({ title: 'Dock Dialog', prompt: 'Works in dock' })} />
        </Dialog>,
      );

      expect(screen.getByText('Dock Dialog')).toBeInTheDocument();
      expect(screen.getByText('Works in dock')).toBeInTheDocument();
    });
  });
});
