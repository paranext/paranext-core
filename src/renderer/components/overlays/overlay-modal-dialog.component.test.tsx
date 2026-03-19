import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OverlayModalDialogPresentational } from './overlay-modal-dialog.component';

describe('OverlayModalDialogPresentational', () => {
  describe('confirm dialog', () => {
    it('should call onResolve(false) when Cancel is clicked', () => {
      const onResolve = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayModalDialogPresentational
          dialogType="confirm"
          options={{ message: 'Are you sure?', cancelLabel: 'Cancel', okLabel: 'OK' }}
          onResolve={onResolve}
          onDismiss={onDismiss}
        />,
      );

      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      fireEvent.click(cancelButton);

      expect(onResolve).toHaveBeenCalledWith(false);
      expect(onDismiss).not.toHaveBeenCalled();
    });

    it('should call onResolve(true) when OK is clicked', () => {
      const onResolve = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayModalDialogPresentational
          dialogType="confirm"
          options={{ message: 'Are you sure?', cancelLabel: 'Cancel', okLabel: 'OK' }}
          onResolve={onResolve}
          onDismiss={onDismiss}
        />,
      );

      const okButton = screen.getByRole('button', { name: 'OK' });
      fireEvent.click(okButton);

      expect(onResolve).toHaveBeenCalledWith(true);
      expect(onDismiss).not.toHaveBeenCalled();
    });

    it('should call onDismiss when Escape is pressed (not onResolve)', () => {
      const onResolve = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayModalDialogPresentational
          dialogType="confirm"
          options={{ message: 'Are you sure?', cancelLabel: 'Cancel', okLabel: 'OK' }}
          onResolve={onResolve}
          onDismiss={onDismiss}
        />,
      );

      // Radix Dialog fires onOpenChange(false) on Escape, which should call onDismiss
      fireEvent.keyDown(screen.getByRole('alertdialog'), { key: 'Escape' });

      expect(onDismiss).toHaveBeenCalled();
      expect(onResolve).not.toHaveBeenCalled();
    });
  });

  describe('destructive confirm dialog', () => {
    it('should render the OK button with destructive variant', () => {
      render(
        <OverlayModalDialogPresentational
          dialogType="confirm"
          options={{
            message: 'Delete everything?',
            cancelLabel: 'Cancel',
            okLabel: 'Delete',
            destructive: true,
          }}
          onResolve={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      const deleteButton = screen.getByRole('button', { name: 'Delete' });
      // The destructive variant adds a specific class; verify it is present
      expect(deleteButton.className).toMatch(/destructive/);
    });
  });

  describe('alert dialog', () => {
    it('should call onResolve(true) when OK is clicked', () => {
      const onResolve = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayModalDialogPresentational
          dialogType="alert"
          options={{ message: 'Something happened' }}
          onResolve={onResolve}
          onDismiss={onDismiss}
        />,
      );

      const okButton = screen.getByRole('button', { name: 'OK' });
      fireEvent.click(okButton);

      expect(onResolve).toHaveBeenCalledWith(true);
      expect(onDismiss).not.toHaveBeenCalled();
    });

    it('should call onResolve(true) when Enter is pressed', () => {
      const onResolve = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayModalDialogPresentational
          dialogType="alert"
          options={{ message: 'Something happened' }}
          onResolve={onResolve}
          onDismiss={onDismiss}
        />,
      );

      fireEvent.keyDown(screen.getByRole('alertdialog'), { key: 'Enter' });

      expect(onResolve).toHaveBeenCalledWith(true);
      expect(onDismiss).not.toHaveBeenCalled();
    });

    it('should call onDismiss when Escape is pressed', () => {
      const onResolve = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayModalDialogPresentational
          dialogType="alert"
          options={{ message: 'Something happened' }}
          onResolve={onResolve}
          onDismiss={onDismiss}
        />,
      );

      fireEvent.keyDown(screen.getByRole('alertdialog'), { key: 'Escape' });

      expect(onDismiss).toHaveBeenCalled();
      expect(onResolve).not.toHaveBeenCalled();
    });
  });
});
