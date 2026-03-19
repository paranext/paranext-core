import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OverlayPopoverPresentational } from './overlay-popover.component';

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

describe('OverlayPopoverPresentational', () => {
  const position = { x: 100, y: 200 };

  describe('text content', () => {
    it('should render title and body', () => {
      render(
        <OverlayPopoverPresentational
          content={{ type: 'text', title: 'Info', body: 'Some details here' }}
          position={position}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('Info')).toBeInTheDocument();
      expect(screen.getByText('Some details here')).toBeInTheDocument();
    });
  });

  describe('text content without title', () => {
    it('should render body text without a title element', () => {
      render(
        <OverlayPopoverPresentational
          content={{ type: 'text', body: 'Just a body' }}
          position={position}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('Just a body')).toBeInTheDocument();
      // No title should be rendered - the PopoverTitle component returns undefined when no title
      expect(screen.queryByText('Info')).not.toBeInTheDocument();
    });
  });

  describe('card content rendering', () => {
    it('should render card title and body text', () => {
      render(
        <OverlayPopoverPresentational
          content={{
            type: 'card',
            title: 'Card Title',
            body: 'Card body text',
            actions: [{ id: 'ok', label: 'OK' }],
          }}
          position={position}
          onAction={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card body text')).toBeInTheDocument();
    });
  });

  describe('card content with actions', () => {
    it('should call onAction with the correct action id when a button is clicked', () => {
      const onAction = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayPopoverPresentational
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

    it('should call onAction with dismiss id when Dismiss button is clicked', () => {
      const onAction = vi.fn();

      render(
        <OverlayPopoverPresentational
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

  describe('markdown content', () => {
    it('should render markdown with bold and italic', () => {
      render(
        <OverlayPopoverPresentational
          content={{
            type: 'markdown',
            markdown: 'Some **bold** and *italic* text',
          }}
          position={position}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('bold').tagName).toBe('STRONG');
      expect(screen.getByText('italic').tagName).toBe('EM');
    });

    it('should render markdown list items', () => {
      render(
        <OverlayPopoverPresentational
          content={{
            type: 'markdown',
            markdown: '# Steps\n\n- Step one\n- Step two\n- Step three',
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

  describe('keyboard dismissal', () => {
    it('should call onDismiss when Escape is pressed', () => {
      const onDismiss = vi.fn();

      render(
        <OverlayPopoverPresentational
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
