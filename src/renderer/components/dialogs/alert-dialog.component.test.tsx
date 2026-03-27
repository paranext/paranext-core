import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dialog } from 'platform-bible-react';
import { ALERT_DIALOG } from './alert-dialog.component';

// Mock dialog-base.data to avoid dependency on dialog.service-host
vi.mock('./dialog-base.data', async () => {
  const actual = await vi.importActual('./dialog-base.data');
  return actual;
});

const { Component: AlertDialog } = ALERT_DIALOG;

function makeProps(overrides = {}) {
  return {
    isDialog: true as const,
    prompt: 'Something happened',
    submitDialog: vi.fn(),
    cancelDialog: vi.fn(),
    rejectDialog: vi.fn(),
    ...overrides,
  };
}

describe('AlertDialog', () => {
  describe('with Radix Dialog context (used by both modal overlay and dock tab paths)', () => {
    it('renders title, prompt, and OK button', () => {
      render(
        <Dialog open modal={false}>
          <AlertDialog {...makeProps({ title: 'Warning', okLabel: 'Got it' })} />
        </Dialog>,
      );

      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(screen.getByText('Something happened')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Got it' })).toBeInTheDocument();
    });

    it('calls submitDialog(true) when OK is clicked', () => {
      const props = makeProps();
      render(
        <Dialog open modal={false}>
          <AlertDialog {...props} />
        </Dialog>,
      );

      fireEvent.click(screen.getByRole('button', { name: 'OK' }));
      expect(props.submitDialog).toHaveBeenCalledWith(true);
    });

    it('calls submitDialog(true) on form submit', () => {
      const props = makeProps();
      render(
        <Dialog open modal={false}>
          <AlertDialog {...props} />
        </Dialog>,
      );

      const form = screen.getByRole('button', { name: 'OK' }).closest('form');
      expect(form).not.toBeNull();
      // expect guard above ensures form is non-null
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      fireEvent.submit(form!);
      expect(props.submitDialog).toHaveBeenCalledWith(true);
    });

    it('has no Cancel button (alert dialogs are acknowledge-only)', () => {
      render(
        <Dialog open modal={false}>
          <AlertDialog {...makeProps()} />
        </Dialog>,
      );

      expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
    });

    it('uses fallback labels when none provided', () => {
      render(
        <Dialog open modal={false}>
          <AlertDialog {...makeProps()} />
        </Dialog>,
      );

      expect(screen.getByText('Alert')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
    });
  });

  describe('inside dock tab (non-modal Dialog context)', () => {
    it('renders without errors inside a non-modal Dialog wrapper', () => {
      render(
        <Dialog open modal={false}>
          <AlertDialog {...makeProps({ title: 'Dock Alert', prompt: 'Works in dock' })} />
        </Dialog>,
      );

      expect(screen.getByText('Dock Alert')).toBeInTheDocument();
      expect(screen.getByText('Works in dock')).toBeInTheDocument();
    });
  });
});
