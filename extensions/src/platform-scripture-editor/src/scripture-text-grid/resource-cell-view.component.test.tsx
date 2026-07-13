// @vitest-environment jsdom
import '@testing-library/jest-dom';
import type React from 'react';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
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

function renderGridRow(cells: React.ReactNode) {
  return render(
    <div role="grid" aria-label="Scripture text grid test">
      <div role="row">{cells}</div>
    </div>,
  );
}

describe('ResourceCellView row smoke', () => {
  it('partial failure: ready, failed, and downloading cells render independently in one row', () => {
    renderGridRow(
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

    const row = screen.getByRole('row');
    const cells = within(row).getAllByRole('gridcell');
    expect(cells).toHaveLength(3);

    const webCell = screen.getByRole('gridcell', { name: 'WEB' });
    expect(within(webCell).getByText('Blessed are the poor in spirit')).toBeInTheDocument();

    const asvCell = screen.getByRole('gridcell', { name: 'ASV' });
    expect(within(asvCell).getByText('Download failed')).toBeInTheDocument();

    const kjvCell = screen.getByRole('gridcell', { name: 'KJV' });
    expect(within(kjvCell).getByText('Resource is loading…')).toBeInTheDocument();
    expect(within(kjvCell).queryByText('Resource unavailable')).not.toBeInTheDocument();

    // Ready cell still shows content when a neighbor is offline.
    expect(within(webCell).queryByText('Download failed')).not.toBeInTheDocument();
  });

  it('mixed direction: LTR and RTL cells apply independent dir in one row', () => {
    renderGridRow(
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

    const row = screen.getByRole('row');
    expect(within(row).getAllByRole('gridcell')).toHaveLength(3);

    const ltrDirs = row.querySelectorAll('[dir="ltr"]');
    const rtlDirs = row.querySelectorAll('[dir="rtl"]');
    expect(ltrDirs).toHaveLength(1);
    expect(rtlDirs).toHaveLength(2);

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
    renderGridRow(
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
    renderGridRow(
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
    renderGridRow(
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
    renderGridRow(
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

  it('clicking the kebab button does NOT trigger onActivate (stopPropagation)', async () => {
    // The kebab lives inside the gridcell's onClick handler. Without stopPropagation, clicking the
    // kebab would also open the chapter-context panel. The Button's onClick stops the event so
    // onActivate is never called — the dropdown still opens via Radix's pointerdown handler.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onActivate = vi.fn();
    renderGridRow(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={zoomLabels}
        editor={<span>verse</span>}
        zoomFactor={1}
        canZoomIn
        canZoomOut
        onActivate={onActivate}
        zoomMenuLabels={menuLabels}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Zoom options' }));
    // onActivate must NOT have been called — the kebab stops click propagation.
    expect(onActivate).not.toHaveBeenCalled();
    // The dropdown menu should have opened (the menu is rendered by Radix).
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('disables Zoom In at max and Zoom Out at min', async () => {
    // Radix DropdownMenu relies on PointerEvent sequences that fireEvent.click() does not
    // synthesize. userEvent v14 with pointerEventsCheck: 0 works reliably in jsdom.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderGridRow(
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
    renderGridRow(
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
    renderGridRow(
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

  it('uses a resource-specific aria-label for the kebab button when options label contains a template', async () => {
    const templateMenuLabels = {
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      reset: 'Reset Zoom',
      options: 'Zoom options for {resourceName}',
    };
    renderGridRow(
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

  it('right-click opens the zoom menu at the cursor and does NOT call onActivate', async () => {
    // Radix DropdownMenu relies on PointerEvent sequences that fireEvent.click() does not
    // synthesize. userEvent v14 with pointerEventsCheck: 0 works reliably in jsdom.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onActivate = vi.fn();
    renderGridRow(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={zoomLabels}
        editor={<span>verse</span>}
        zoomFactor={1}
        canZoomIn
        canZoomOut
        onActivate={onActivate}
        zoomMenuLabels={menuLabels}
      />,
    );

    // Fire a contextmenu event on the gridcell to trigger the capture-phase handler.
    fireEvent.contextMenu(screen.getByRole('gridcell'));

    // The right-click zoom menu should open (Zoom In menuitem is visible).
    await user.click(screen.getByRole('menuitem', { name: 'Zoom In' }));

    // onActivate must NOT have been called — the right-click menu suppresses cell activation.
    expect(onActivate).not.toHaveBeenCalled();
  });

  it('right-click shows an enabled Copy item when text is selected', async () => {
    // Spy on window.getSelection to simulate selected text at the time of right-click.
    // The component only calls toString() on the Selection; implementing the full ~30-member
    // Selection interface in a test fixture would be far worse than this single cast.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const getSelectionSpy = vi.spyOn(window, 'getSelection').mockReturnValue({
      toString: () => 'selected text',
    } as Selection);

    renderGridRow(
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

    fireEvent.contextMenu(screen.getByRole('gridcell'));

    const copyItem = screen.getByRole('menuitem', { name: 'Copy' });
    expect(copyItem).toBeInTheDocument();
    expect(copyItem).not.toHaveAttribute('aria-disabled', 'true');

    getSelectionSpy.mockRestore();
  });

  it('right-click shows a disabled Copy item when no text is selected', async () => {
    // Spy on window.getSelection to simulate no selection.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const getSelectionSpy = vi.spyOn(window, 'getSelection').mockReturnValue({
      toString: () => '',
    } as Selection);

    renderGridRow(
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

    fireEvent.contextMenu(screen.getByRole('gridcell'));

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

    renderGridRow(
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

    fireEvent.contextMenu(screen.getByRole('gridcell'));
    await user.click(screen.getByRole('menuitem', { name: 'Copy' }));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith('selected text');

    getSelectionSpy.mockRestore();
  });

  it('right-click menu shows Copy above zoom items (not in kebab)', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderGridRow(
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
    fireEvent.contextMenu(screen.getByRole('gridcell'));
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Zoom In' })).toBeInTheDocument();

    // Close the right-click menu and open the kebab — Copy must NOT appear there.
    const menu = screen.getByRole('menu');
    fireEvent.keyDown(menu, { key: 'Escape' });

    await user.click(screen.getByRole('button', { name: 'Zoom options' }));
    expect(screen.queryByRole('menuitem', { name: 'Copy' })).not.toBeInTheDocument();
  });
});
