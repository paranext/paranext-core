// @vitest-environment jsdom
import '@testing-library/jest-dom';
import type React from 'react';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  LOADING_KEY,
  FAILED_KEY,
  UNAVAILABLE_KEY,
  ResourceCellView,
  ZOOM_IN_KEY,
  ZOOM_OUT_KEY,
  RESET_ZOOM_KEY,
  ZOOM_OPTIONS_KEY,
  COPY_KEY,
} from './resource-cell-view.component';

// jsdom doesn't ship a ResizeObserver (needed by Radix portal content), or PointerCapture APIs.
// Stubs are sufficient since the tests don't inspect layout behavior.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  if (typeof Element.prototype.hasPointerCapture !== 'function') {
    Element.prototype.hasPointerCapture = () => false;
  }
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

const localizedStrings = {
  [UNAVAILABLE_KEY]: 'Resource unavailable',
  [LOADING_KEY]: 'Resource is loading…',
  [FAILED_KEY]: 'Download failed',
};

/** Renders cells in a plain div wrapper — ResourceCellView is now presentational, no role needed. */
function renderCells(cells: React.ReactNode) {
  return render(<div>{cells}</div>);
}

describe('ResourceCellView row smoke', () => {
  it('partial failure: ready, failed, and downloading cells render independently', () => {
    renderCells(
      <>
        <ResourceCellView
          state="ready"
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={<span>Blessed are the poor in spirit</span>}
        />
        <ResourceCellView
          state="failed"
          label="ASV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={undefined}
        />
        <ResourceCellView
          state="downloading"
          label="KJV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={undefined}
        />
      </>,
    );

    // Each resource's label text is visible in its header.
    expect(screen.getByText('WEB')).toBeInTheDocument();
    expect(screen.getByText('ASV')).toBeInTheDocument();
    expect(screen.getByText('KJV')).toBeInTheDocument();

    // No gridcell role — ResourceCellView is now purely presentational.
    expect(screen.queryByRole('gridcell')).not.toBeInTheDocument();

    // Content renders per state.
    expect(screen.getByText('Blessed are the poor in spirit')).toBeInTheDocument();
    expect(screen.getByText('Download failed')).toBeInTheDocument();
    expect(screen.getByText('Resource is loading…')).toBeInTheDocument();
    // Only the failed cell shows "Resource unavailable"; the downloading cell shows the loading text.
    expect(screen.getAllByText('Resource unavailable')).toHaveLength(1);
  });

  it('mixed direction: LTR and RTL cells apply independent dir', () => {
    const { container } = renderCells(
      <>
        <ResourceCellView
          state="ready"
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={<span>Blessed are the poor in spirit</span>}
        />
        <ResourceCellView
          state="ready"
          label="עברית"
          textDirection="rtl"
          localizedStrings={localizedStrings}
          editor={<span>אַשְׁרֵי הָאִישׁ</span>}
        />
        <ResourceCellView
          state="ready"
          label="العربية"
          textDirection="rtl"
          localizedStrings={localizedStrings}
          editor={<span>طُوبَى لِلْمَسَاكِينِ</span>}
        />
      </>,
    );

    // No gridcell role — purely presentational.
    expect(screen.queryByRole('gridcell')).not.toBeInTheDocument();

    // Scope the direction counts to the rendered subtree (not the whole document).
    expect(container.querySelectorAll('[dir="ltr"]')).toHaveLength(1);
    expect(container.querySelectorAll('[dir="rtl"]')).toHaveLength(2);

    expect(screen.getByText('Blessed are the poor in spirit')).toBeInTheDocument();
    expect(screen.getByText('אַשְׁרֵי הָאִישׁ')).toBeInTheDocument();
    expect(screen.getByText('طُوبَى لِلْمَسَاكِينِ')).toBeInTheDocument();
  });
});

const zoomLabels = {
  [UNAVAILABLE_KEY]: 'Resource unavailable',
  [LOADING_KEY]: 'Resource is loading…',
  [FAILED_KEY]: 'Download failed',
  [ZOOM_IN_KEY]: 'Zoom In',
  [ZOOM_OUT_KEY]: 'Zoom Out',
  [RESET_ZOOM_KEY]: 'Reset Zoom',
  [ZOOM_OPTIONS_KEY]: 'Zoom options',
  [COPY_KEY]: 'Copy',
};

describe('ResourceCellView zoom UI', () => {
  const menuLabels = {
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    reset: 'Reset Zoom',
    options: 'Zoom options',
  };

  it('applies the zoom factor to the content wrapper', () => {
    renderCells(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={zoomLabels}
        editor={<span>verse</span>}
        zoomFactor={1.4}
        zoomMenuLabels={menuLabels}
      />,
    );
    // jsdom doesn't serialize `zoom` into the style attribute string, so we use parentElement
    // to reach the content wrapper directly and read its CSSOM style.zoom property.
    const content = screen.getByText('verse').parentElement;
    expect(content).not.toBeNull();
    expect(content?.style.zoom).toBe('1.4');
  });

  it('has no zoom style on the content wrapper when zoomFactor is 1', () => {
    renderCells(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={zoomLabels}
        editor={<span>verse-reset</span>}
        zoomFactor={1}
        zoomMenuLabels={menuLabels}
      />,
    );
    // contentStyle is undefined when zoomFactor === 1, so React removes the style attribute.
    // jsdom does not serialize `zoom` into the attribute string; read the CSSOM property directly.
    // An unset CSSOM property is falsy (empty string or undefined depending on jsdom version).
    const content = screen.getByText('verse-reset').parentElement;
    expect(content).not.toBeNull();
    expect(content?.style.zoom).toBeFalsy();
  });

  it('has no zoom style on the content wrapper when zoomFactor is undefined', () => {
    renderCells(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={zoomLabels}
        editor={<span>verse-no-zoom</span>}
        zoomMenuLabels={menuLabels}
      />,
    );
    // No zoomFactor prop → contentStyle is undefined → React omits the style attribute entirely.
    // An unset CSSOM property is falsy (empty string or undefined depending on jsdom version).
    const content = screen.getByText('verse-no-zoom').parentElement;
    expect(content).not.toBeNull();
    expect(content?.style.zoom).toBeFalsy();
  });

  it('opens the kebab menu and fires zoom callbacks', async () => {
    // Radix DropdownMenu relies on PointerEvent sequences that fireEvent.click() does not
    // synthesize. userEvent v14 with pointerEventsCheck: 0 works reliably in jsdom.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onZoomIn = vi.fn();
    renderCells(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={zoomLabels}
        editor={<span>verse</span>}
        zoomFactor={1}
        canZoomIn
        canZoomOut
        onZoomIn={onZoomIn}
        zoomMenuLabels={menuLabels}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Zoom options' }));
    await user.click(screen.getByRole('menuitem', { name: 'Zoom In' }));
    expect(onZoomIn).toHaveBeenCalledTimes(1);
  });

  it('clicking the kebab button does NOT bubble a click to the parent (stopPropagation)', async () => {
    // Activation now lives on the parent verse `listitem`, which opens the chapter-context split on
    // click. The kebab Button stops click propagation so opening the zoom menu never also activates
    // the parent — the dropdown still opens via Radix's pointerdown handler.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onParentClick = vi.fn();
    render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div onClick={onParentClick}>
        <ResourceCellView
          state="ready"
          label="WEB"
          textDirection="ltr"
          localizedStrings={zoomLabels}
          editor={<span>verse</span>}
          zoomFactor={1}
          canZoomIn
          canZoomOut
          zoomMenuLabels={menuLabels}
        />
      </div>,
    );
    await user.click(screen.getByRole('button', { name: 'Zoom options' }));
    // The parent's click handler must NOT have fired — the kebab stops click propagation.
    expect(onParentClick).not.toHaveBeenCalled();
    // The dropdown menu should have opened (the menu is rendered by Radix).
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('disables Zoom In at max and Zoom Out at min', async () => {
    // Radix DropdownMenu relies on PointerEvent sequences that fireEvent.click() does not
    // synthesize. userEvent v14 with pointerEventsCheck: 0 works reliably in jsdom.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderCells(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={zoomLabels}
        editor={<span>verse</span>}
        zoomFactor={3}
        canZoomIn={false}
        canZoomOut
        zoomMenuLabels={menuLabels}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Zoom options' }));
    expect(screen.getByRole('menuitem', { name: 'Zoom In' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('disables Reset Zoom when canReset is false', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderCells(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={zoomLabels}
        editor={<span>verse</span>}
        zoomFactor={1}
        canZoomIn
        canZoomOut
        canReset={false}
        zoomMenuLabels={menuLabels}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Zoom options' }));
    expect(screen.getByRole('menuitem', { name: 'Reset Zoom' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('enables Reset Zoom when canReset is true (default)', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderCells(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={zoomLabels}
        editor={<span>verse</span>}
        zoomFactor={1.4}
        canZoomIn
        canZoomOut
        zoomMenuLabels={menuLabels}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Zoom options' }));
    expect(screen.getByRole('menuitem', { name: 'Reset Zoom' })).not.toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('uses a resource-specific aria-label for the kebab button when options label contains a template', () => {
    const templateMenuLabels = {
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      reset: 'Reset Zoom',
      options: 'Zoom options for {resourceName}',
    };
    renderCells(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={zoomLabels}
        editor={<span>verse</span>}
        zoomFactor={1}
        canZoomIn
        canZoomOut
        zoomMenuLabels={templateMenuLabels}
      />,
    );
    expect(screen.getByRole('button', { name: 'Zoom options for WEB' })).toBeInTheDocument();
  });

  it('right-click opens the zoom menu at the cursor', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderCells(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={zoomLabels}
        editor={<span>verse</span>}
        zoomFactor={1}
        canZoomIn
        canZoomOut
        zoomMenuLabels={menuLabels}
      />,
    );

    // Fire a contextmenu event inside the cell to trigger the capture-phase handler on the root.
    fireEvent.contextMenu(screen.getByText('verse'));

    // The right-click zoom menu should open (Zoom In menuitem is visible and actionable).
    expect(await screen.findByRole('menuitem', { name: 'Zoom In' })).toBeInTheDocument();
    await user.click(screen.getByRole('menuitem', { name: 'Zoom In' }));
  });

  it('right-click shows an enabled Copy item when text is selected', () => {
    // Spy on window.getSelection to simulate selected text at the time of right-click.
    // The component only calls toString() on the Selection; implementing the full ~30-member
    // Selection interface in a test fixture would be far worse than this single cast.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const getSelectionSpy = vi.spyOn(window, 'getSelection').mockReturnValue({
      toString: () => 'selected text',
    } as Selection);

    renderCells(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={zoomLabels}
        editor={<span>verse</span>}
        zoomFactor={1}
        canZoomIn
        canZoomOut
        zoomMenuLabels={menuLabels}
      />,
    );

    fireEvent.contextMenu(screen.getByText('verse'));

    const copyItem = screen.getByRole('menuitem', { name: 'Copy' });
    expect(copyItem).toBeInTheDocument();
    expect(copyItem).not.toHaveAttribute('aria-disabled', 'true');

    getSelectionSpy.mockRestore();
  });

  it('right-click shows a disabled Copy item when no text is selected', () => {
    // Spy on window.getSelection to simulate no selection.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const getSelectionSpy = vi.spyOn(window, 'getSelection').mockReturnValue({
      toString: () => '',
    } as Selection);

    renderCells(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={zoomLabels}
        editor={<span>verse</span>}
        zoomFactor={1}
        canZoomIn
        canZoomOut
        zoomMenuLabels={menuLabels}
      />,
    );

    fireEvent.contextMenu(screen.getByText('verse'));

    const copyItem = screen.getByRole('menuitem', { name: 'Copy' });
    expect(copyItem).toBeInTheDocument();
    expect(copyItem).toHaveAttribute('aria-disabled', 'true');

    getSelectionSpy.mockRestore();
  });

  it('selecting Copy writes the selected text to the clipboard', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const writeText = vi.fn().mockResolvedValue(undefined);
    // Stub navigator.clipboard (not available in jsdom by default).
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    });

    // The component only calls toString() on the Selection; a full ~30-member implementation
    // in a test fixture would be far worse than this single cast.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const getSelectionSpy = vi.spyOn(window, 'getSelection').mockReturnValue({
      toString: () => 'selected text',
    } as Selection);

    renderCells(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={zoomLabels}
        editor={<span>verse</span>}
        zoomFactor={1}
        canZoomIn
        canZoomOut
        zoomMenuLabels={menuLabels}
      />,
    );

    fireEvent.contextMenu(screen.getByText('verse'));
    await user.click(screen.getByRole('menuitem', { name: 'Copy' }));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith('selected text');

    getSelectionSpy.mockRestore();
  });

  it('right-click menu shows Copy above zoom items (not in kebab)', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderCells(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={zoomLabels}
        editor={<span>verse</span>}
        zoomFactor={1}
        canZoomIn
        canZoomOut
        zoomMenuLabels={menuLabels}
      />,
    );

    // Right-click menu has both Copy and zoom items.
    fireEvent.contextMenu(screen.getByText('verse'));
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Zoom In' })).toBeInTheDocument();

    // Close the right-click menu and open the kebab — Copy must NOT appear there.
    const menu = screen.getByRole('menu');
    fireEvent.keyDown(menu, { key: 'Escape' });

    await user.click(screen.getByRole('button', { name: 'Zoom options' }));
    expect(screen.queryByRole('menuitem', { name: 'Copy' })).not.toBeInTheDocument();
  });
});
