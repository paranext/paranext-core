import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OverlayEntry } from '@renderer/services/overlays/overlay.service-model';
import { OverlayPopover, OverlayPopoverPresentational } from './overlay-popover.component';

// The store-connected component resolves LocalizeKeys via useLocalizedStrings; an empty map makes
// every value fall back to its raw text, so tests assert against the literal item labels.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [{}, false]),
}));

// Radix Popover uses ResizeObserver internally; jsdom doesn't provide it, so we stub a no-op
// implementation. The methods intentionally don't use `this` since they're empty stubs.
beforeAll(() => {
  global.ResizeObserver = class {
    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}
    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}
    // jsdom stub: empty no-op intentionally has no `this` usage
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

  describe('sizing and anchoring', () => {
    it('sizes the inner wrapper with the default caps and leaves PopoverContent unsized', () => {
      render(
        <OverlayPopoverPresentational
          content={{ type: 'text', body: 'Just a body' }}
          position={position}
          onDismiss={vi.fn()}
        />,
      );

      const inner = document.querySelector('[data-overlay-popover-zoom]');
      expect(inner).toBeInTheDocument();
      // querySelector returns Element | null; the assertion above guards null, but TS can't narrow it
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const innerEl = inner as HTMLElement;
      const { style } = innerEl;
      // jsdom leaves an inline style property that was never assigned as `undefined` rather than
      // the empty string a real browser reports for an unset CSS property, so the absent `zoom` is
      // checked against both.
      expect(style.zoom || '').toBe('');
      // The popover's own default cap.
      expect(style.maxHeight).toBe('400px');
      // PopoverContent's own width is 'auto', so the inner div is what actually sizes the popover
      // — it must carry the width and flex layout classes for the popover to size and space its
      // content correctly.
      expect(innerEl.className).toContain('tw:w-72');
      expect(innerEl.className).toContain('tw:flex');
      expect(innerEl.className).toContain('tw:flex-col');
      expect(innerEl.className).toContain('tw:gap-2.5');

      const content = document.querySelector('[data-overlay-popover]');
      expect(content).toBeInTheDocument();
      // querySelector returns Element | null; the assertion above guards null, but TS can't narrow it
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      expect((content as HTMLElement).style.width).toBe('auto');
    });

    it("leaves the caller's own maxWidth exactly as given at interface scale", () => {
      render(
        <OverlayPopoverPresentational
          content={{ type: 'text', body: 'Just a body' }}
          position={position}
          maxWidth={280}
          onDismiss={vi.fn()}
        />,
      );

      const inner = document.querySelector('[data-overlay-popover-zoom]');
      expect(inner).toBeInTheDocument();
      // querySelector returns Element | null; the assertion above guards null, but TS can't narrow it
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const { style } = inner as HTMLElement;
      expect(style.maxWidth).toBe('280px');
    });

    it('renders the arrow as a sibling of the inner wrapper, not inside it', () => {
      render(
        <OverlayPopoverPresentational
          content={{ type: 'text', body: 'Just a body' }}
          position={position}
          onDismiss={vi.fn()}
        />,
      );

      const content = document.querySelector('[data-overlay-popover]');
      const inner = document.querySelector('[data-overlay-popover-zoom]');
      expect(content).toBeInTheDocument();
      expect(inner).toBeInTheDocument();
      // querySelector returns Element | null; the assertions above guard null, but TS can't narrow it
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const contentEl = content as HTMLElement;
      // PopoverContent has exactly two direct children: the inner wrapper and the arrow. Radix
      // requires the arrow to be a child of PopoverContent, and it must be the OTHER child — inside
      // the wrapper it would sit in the scrolled box.
      const otherChildren = Array.from(contentEl.children).filter((child) => child !== inner);
      expect(otherChildren).toHaveLength(1);
      expect(inner?.contains(otherChildren[0])).toBe(false);
    });

    it('scales the anchor the pane measured in its own pixels by the frame zoom', () => {
      render(
        <OverlayPopoverPresentational
          content={{ type: 'text', body: 'Just a body' }}
          position={position}
          anchor={{ width: 40, height: 20 }}
          frameScale={1.5}
          onDismiss={vi.fn()}
        />,
      );

      const anchor = document.querySelector('[data-overlay-popover-anchor]');
      expect(anchor).toBeInTheDocument();
      // querySelector returns Element | null; the assertion above guards null, but TS can't narrow it
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const { style } = anchor as HTMLElement;
      expect(style.width).toBe('60px');
      expect(style.height).toBe('30px');
    });
  });
});

describe('OverlayPopover (store-connected)', () => {
  // The connector forwards `frameScale` straight through to the presentational component without
  // reading any service of its own, so this test needs no service mocks.
  type PopoverEntry = Extract<OverlayEntry, { type: 'popover' }>;

  function createPopoverEntry(overrides?: Partial<PopoverEntry>): PopoverEntry {
    return {
      type: 'popover',
      id: 'popover-1',
      webViewId: 'webview-1',
      request: {
        anchor: { x: 100, y: 200, width: 40, height: 20 },
        content: { type: 'text', body: 'Hello' },
      },
      content: { type: 'text', body: 'Hello' },
      position: { x: 100, y: 200 },
      resolve: vi.fn(),
      reject: vi.fn(),
      ...overrides,
    };
  }

  it('forwards frameScale to the presentational component it renders', () => {
    const entry = createPopoverEntry();
    render(<OverlayPopover overlay={entry} frameScale={1.25} />);

    const anchor = document.querySelector('[data-overlay-popover-anchor]');
    expect(anchor).toBeInTheDocument();
    // querySelector returns Element | null; the assertion above guards null, but TS can't narrow it
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const { style: anchorStyle } = anchor as HTMLElement;
    // request.anchor is 40x20; frameScale 1.25 multiplies it to 50x25.
    expect(anchorStyle.width).toBe('50px');
    expect(anchorStyle.height).toBe('25px');
  });
});
