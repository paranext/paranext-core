import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OverlayPopover } from './overlay-popover.component';

// Radix Popover uses ResizeObserver internally; jsdom doesn't provide it, so we stub a no-op
// implementation. The methods intentionally don't use `this` since they're empty stubs.
beforeAll(() => {
  global.ResizeObserver = class {
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  };
});

describe('OverlayPopover', () => {
  const position = { x: 100, y: 200 };

  describe('text content', () => {
    it('should render title and body', () => {
      render(
        <OverlayPopover
          content={{ type: 'text', title: 'Info', body: 'Some details here' }}
          position={position}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('Info')).toBeInTheDocument();
      expect(screen.getByText('Some details here')).toBeInTheDocument();
    });
  });

  describe('card content with actions', () => {
    it('should call onAction with the correct action id when a button is clicked', () => {
      const onAction = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayPopover
          content={{
            type: 'card',
            title: 'Confirm',
            body: 'Do you want to proceed?',
            actions: [
              { id: 'cancel', label: 'Cancel', variant: 'secondary' },
              { id: 'confirm', label: 'Yes', variant: 'default' },
            ],
          }}
          position={position}
          onAction={onAction}
          onDismiss={onDismiss}
        />,
      );

      fireEvent.click(screen.getByRole('button', { name: 'Yes' }));

      expect(onAction).toHaveBeenCalledWith('confirm');
      expect(onDismiss).not.toHaveBeenCalled();
    });

    it('should call onAction with cancel id when cancel button is clicked', () => {
      const onAction = vi.fn();

      render(
        <OverlayPopover
          content={{
            type: 'card',
            title: 'Actions',
            body: 'Choose one',
            actions: [
              { id: 'dismiss', label: 'Dismiss' },
              { id: 'apply', label: 'Apply' },
            ],
          }}
          position={position}
          onAction={onAction}
          onDismiss={vi.fn()}
        />,
      );

      fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));

      expect(onAction).toHaveBeenCalledWith('dismiss');
    });
  });

  describe('list content', () => {
    it('should render all list items', () => {
      render(
        <OverlayPopover
          content={{
            type: 'list',
            title: 'Steps',
            items: ['Step one', 'Step two', 'Step three'],
          }}
          position={position}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('Steps')).toBeInTheDocument();
      expect(screen.getByText('Step one')).toBeInTheDocument();
      expect(screen.getByText('Step two')).toBeInTheDocument();
      expect(screen.getByText('Step three')).toBeInTheDocument();
    });
  });

  describe('description content', () => {
    it('should render term/detail pairs', () => {
      render(
        <OverlayPopover
          content={{
            type: 'description',
            title: 'Details',
            entries: [
              { term: 'Name', detail: 'John' },
              { term: 'Role', detail: 'Admin' },
            ],
          }}
          position={position}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
      expect(screen.getByText('Admin')).toBeInTheDocument();
    });
  });

  describe('richText content', () => {
    it('should render bold and italic runs', () => {
      render(
        <OverlayPopover
          content={{
            type: 'richText',
            body: [
              { text: 'Normal ' },
              { text: 'bold', bold: true },
              { text: ' and ' },
              { text: 'italic', italic: true },
            ],
          }}
          position={position}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('bold').tagName).toBe('STRONG');
      expect(screen.getByText('italic').tagName).toBe('EM');
    });
  });

  describe('keyboard dismissal', () => {
    it('should call onDismiss when Escape is pressed', () => {
      const onDismiss = vi.fn();

      render(
        <OverlayPopover
          content={{ type: 'text', body: 'Hello' }}
          position={position}
          onDismiss={onDismiss}
        />,
      );

      const popover = document.querySelector('[data-overlay-popover]');
      expect(popover).toBeInTheDocument();
      // querySelector returns Element | null; the expect above guards null, but TS can't narrow it
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      fireEvent.keyDown(popover as Element, { key: 'Escape' });

      expect(onDismiss).toHaveBeenCalled();
    });
  });
});
