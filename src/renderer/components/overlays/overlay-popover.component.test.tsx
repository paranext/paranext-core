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

  describe('content zoom', () => {
    it('renders exactly as before when the requesting pane is not zoomed', () => {
      render(
        <OverlayPopoverPresentational
          content={{ type: 'text', body: 'Just a body' }}
          position={position}
          contentScale={1}
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
      // the empty string a real browser reports for an unset CSS property, so a scale of 1 (which
      // never assigns `zoom` at all) is checked against both.
      expect(style.zoom || '').toBe('');
      // The popover's own default cap, unrelated to content zoom, unchanged.
      expect(style.maxHeight).toBe('400px');
      // The inner div is what actually sizes the popover now that PopoverContent's own width is
      // 'auto' — it must carry the width and flex layout classes the shared PopoverContent class
      // used to provide.
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

    it('draws at the pane’s scale and caps its size by the space Radix reports, divided', () => {
      render(
        <OverlayPopoverPresentational
          content={{ type: 'text', body: 'Just a body' }}
          position={position}
          contentScale={1.5}
          onDismiss={vi.fn()}
        />,
      );

      const inner = document.querySelector('[data-overlay-popover-zoom]');
      expect(inner).toBeInTheDocument();
      // querySelector returns Element | null; the assertion above guards null, but TS can't narrow it
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const innerEl = inner as HTMLElement;
      const { style } = innerEl;
      expect(style.zoom).toBe('1.5');
      // The default (no caller maxWidth/maxHeight) still combines with the Radix cap — this is the
      // cap the component falls back to, not a bare, uncombined Radix value.
      expect(style.maxWidth).toBe(
        'min(320px, calc(var(--radix-popover-content-available-width) / 1.5))',
      );
      expect(style.maxHeight).toBe(
        'min(400px, calc(var(--radix-popover-content-available-height) / 1.5))',
      );
      // The width and layout classes must still be on the inner (zoomed) div at a zoom, not just at
      // scale 1 — they are what sizes the popover at every scale.
      expect(innerEl.className).toContain('tw:w-72');
      expect(innerEl.className).toContain('tw:flex');
      expect(innerEl.className).toContain('tw:flex-col');
      expect(innerEl.className).toContain('tw:gap-2.5');
    });

    it("combines the caller's own maxWidth with the Radix cap so a zoomed popover still stays inside the window", () => {
      // 280 is deliberately distinct from this component's own 320 default, so the assertion below
      // can only pass if the CALLER's value made it into the combined cap, not the default.
      render(
        <OverlayPopoverPresentational
          content={{ type: 'text', body: 'Just a body' }}
          position={position}
          contentScale={1.5}
          maxWidth={280}
          onDismiss={vi.fn()}
        />,
      );

      const inner = document.querySelector('[data-overlay-popover-zoom]');
      expect(inner).toBeInTheDocument();
      // querySelector returns Element | null; the assertion above guards null, but TS can't narrow it
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const { style } = inner as HTMLElement;
      expect(style.maxWidth).toBe(
        'min(280px, calc(var(--radix-popover-content-available-width) / 1.5))',
      );
    });

    it("combines the caller's own maxHeight with the Radix cap so a zoomed popover still stays inside the window", () => {
      // 360 is deliberately distinct from this component's own 400 default, so the assertion below
      // can only pass if the CALLER's value made it into the combined cap, not the default. Height
      // has its own branch from width, so it needs its own case.
      render(
        <OverlayPopoverPresentational
          content={{ type: 'text', body: 'Just a body' }}
          position={position}
          contentScale={1.5}
          maxHeight={360}
          onDismiss={vi.fn()}
        />,
      );

      const inner = document.querySelector('[data-overlay-popover-zoom]');
      expect(inner).toBeInTheDocument();
      // querySelector returns Element | null; the assertion above guards null, but TS can't narrow it
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const { style } = inner as HTMLElement;
      expect(style.maxHeight).toBe(
        'min(360px, calc(var(--radix-popover-content-available-height) / 1.5))',
      );
    });

    it("leaves the caller's own maxWidth exactly as given at interface scale", () => {
      render(
        <OverlayPopoverPresentational
          content={{ type: 'text', body: 'Just a body' }}
          position={position}
          contentScale={1}
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

    it('renders the arrow as a sibling of the zoomed inner div, not inside it', () => {
      render(
        <OverlayPopoverPresentational
          content={{ type: 'text', body: 'Just a body' }}
          position={position}
          contentScale={1.5}
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
      // PopoverContent has exactly two direct children: the zoomed div and the arrow. Radix requires
      // the arrow to be a child of PopoverContent, and it must be the OTHER child — a descendant of
      // the zoomed div would have Radix's own pixel offset re-scaled by that div's `zoom`.
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
          contentScale={1.5}
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
  // The connector forwards `contentScale`/`frameScale` straight through to the presentational
  // component without reading any service of its own, so this test needs no service mocks: it
  // supplies both as explicit props and drives the real connector end to end.
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

  it('forwards contentScale and frameScale to the presentational component it renders', () => {
    // Distinct values (1.5 vs 1.25) so a mix-up (forwarding one prop as the other, or dropping one
    // pass-through) shows up as a wrong number rather than an accidental pass.
    const entry = createPopoverEntry();
    render(<OverlayPopover overlay={entry} contentScale={1.5} frameScale={1.25} />);

    const inner = document.querySelector('[data-overlay-popover-zoom]');
    expect(inner).toBeInTheDocument();
    // querySelector returns Element | null; the assertion above guards null, but TS can't narrow it
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const { style } = inner as HTMLElement;
    expect(style.zoom).toBe('1.5');

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
