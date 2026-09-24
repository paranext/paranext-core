// @vitest-environment jsdom
import '@testing-library/jest-dom';
import type React from 'react';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { act, createEvent, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  BOOK_NOT_AVAILABLE_KEY,
  EMPTY_KEY,
  LOADING_KEY,
  FAILED_KEY,
  NOT_INSTALLED_KEY,
  UNAVAILABLE_KEY,
  ResourceCellView,
  COPY_KEY,
} from './resource-cell-view.component';

// jsdom doesn't ship a ResizeObserver (needed by Radix portal content). A stub is sufficient since
// the tests don't inspect layout behavior. The hasPointerCapture / scrollIntoView shims Radix also
// needs are installed repo-wide by vitest.setup.ts.
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
});

const localizedStrings = {
  [UNAVAILABLE_KEY]: 'Resource unavailable',
  [NOT_INSTALLED_KEY]: 'Resource not installed',
  [LOADING_KEY]: 'Resource is loading…',
  [FAILED_KEY]: 'Download failed',
  [EMPTY_KEY]: 'No text for this verse',
  [BOOK_NOT_AVAILABLE_KEY]: 'Book not in this text',
};

/** The zoom area the cells under test mark their text with. */
const ZOOM_AREA = 'resource-web';

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
          zoomArea={ZOOM_AREA}
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={<span>Blessed are the poor in spirit</span>}
        />
        <ResourceCellView
          state="failed"
          zoomArea={ZOOM_AREA}
          label="ASV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={undefined}
        />
        <ResourceCellView
          state="downloading"
          zoomArea={ZOOM_AREA}
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
    // Neither "not installed" nor the editor appear for the failed/downloading cells.
    expect(screen.queryByText('Resource not installed')).not.toBeInTheDocument();
  });

  it('unavailable: shows "Resource not installed" — no spinner, no "Download failed", no editor', () => {
    renderCells(
      <ResourceCellView
        state="unavailable"
        zoomArea={ZOOM_AREA}
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={undefined}
      />,
    );
    expect(screen.getByText('Resource not installed')).toBeInTheDocument();
    expect(screen.queryByText('Resource is loading…')).not.toBeInTheDocument();
    expect(screen.queryByText('Download failed')).not.toBeInTheDocument();
    expect(screen.queryByText('Resource unavailable')).not.toBeInTheDocument();
  });

  it('bookNotAvailable: names the missing book without claiming a fault or a remedy', () => {
    renderCells(
      <ResourceCellView
        state="bookNotAvailable"
        zoomArea={ZOOM_AREA}
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={undefined}
      />,
    );
    expect(screen.getByText('Book not in this text')).toBeInTheDocument();
    // The resource is installed and working, so none of the fault wording may appear — each of
    // these would send the user after a download that cannot supply a book the text never had.
    expect(screen.queryByText('Download failed')).not.toBeInTheDocument();
    expect(screen.queryByText('Resource unavailable')).not.toBeInTheDocument();
    expect(screen.queryByText('Resource not installed')).not.toBeInTheDocument();
    expect(screen.queryByText('Resource is loading\u2026')).not.toBeInTheDocument();
  });

  it('mixed direction: LTR and RTL cells apply independent dir', () => {
    const { container } = renderCells(
      <>
        <ResourceCellView
          state="ready"
          zoomArea={ZOOM_AREA}
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={<span>Blessed are the poor in spirit</span>}
        />
        <ResourceCellView
          state="ready"
          zoomArea={ZOOM_AREA}
          label="עברית"
          textDirection="rtl"
          localizedStrings={localizedStrings}
          editor={<span>אַשְׁרֵי הָאִישׁ</span>}
        />
        <ResourceCellView
          state="ready"
          zoomArea={ZOOM_AREA}
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

describe('ResourceCellView name display', () => {
  it('inline mode hangs the name before the verse text in reading order', () => {
    const { container } = renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>In the beginning</span>}
      />,
    );
    // Name precedes the verse text in DOM (reading) order — assert via text order in the subtree.
    const text = container.textContent ?? '';
    expect(text.indexOf('NIV')).toBeGreaterThanOrEqual(0);
    expect(text.indexOf('NIV')).toBeLessThan(text.indexOf('In the beginning'));
  });

  it('inline mode puts the name and verse text in one row (name beside text, not a header band)', () => {
    renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>In the beginning</span>}
      />,
    );
    const name = screen.getByText('NIV');
    const verse = screen.getByText('In the beginning');
    // Inline: an intermediate flex row wraps the name + content beside each other.
    const row = name.parentElement;
    expect(row).toContainElement(verse);
  });

  it('inline mode scopes the row to the resource dir and puts the name first in DOM order', () => {
    renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>אַשְׁרֵי</span>}
      />,
    );
    const name = screen.getByText('עברית');
    const row = name.parentElement;
    expect(row).toHaveAttribute('dir', 'rtl');
    // Name is first in DOM order; combined with `dir="rtl"` + flex (which jsdom does not lay out)
    // this renders on the inline-start. Visual placement is verified in Storybook, not here.
    expect(row?.firstElementChild).toBe(name);
  });

  it('inline mode still shows the name while downloading', () => {
    renderCells(
      <ResourceCellView
        state="downloading"
        zoomArea={ZOOM_AREA}
        label="KJV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={undefined}
      />,
    );
    expect(screen.getByText('KJV')).toBeInTheDocument();
    expect(screen.getByText('Resource is loading…')).toBeInTheDocument();
  });

  it('inline mode still shows the name when the download failed', () => {
    renderCells(
      <ResourceCellView
        state="failed"
        zoomArea={ZOOM_AREA}
        label="ASV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={undefined}
      />,
    );
    expect(screen.getByText('ASV')).toBeInTheDocument();
    expect(screen.getByText('Download failed')).toBeInTheDocument();
  });

  it('inline mode still shows the name for an empty verse', () => {
    renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        isVerseEmpty
        editor={undefined}
      />,
    );
    expect(screen.getByText('WEB')).toBeInTheDocument();
    expect(screen.getByText('No text for this verse')).toBeInTheDocument();
  });

  it('the visible name is aria-hidden so the parent listitem name is not announced twice', () => {
    renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>In the beginning</span>}
      />,
    );
    // ResourceCellView is presentational (no role/aria-label of its own); the parent verse
    // `listitem` owns the accessible name, so the visible copy must be hidden from the a11y tree.
    expect(screen.getByText('NIV')).toHaveAttribute('aria-hidden', 'true');
  });

  it('defaults to header display: the name band tops the cell and does not wrap the content', () => {
    const { container } = renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<span>Blessed</span>}
      />,
    );
    // The cell root is the presentational div ResourceCellView renders (our wrapper's only child).
    const cell = container.firstElementChild?.firstElementChild;
    const name = screen.getByText('WEB');
    const verse = screen.getByText('Blessed');
    // Header mode: the name sits in a header band (which also hosts the reorder grip) that is a
    // direct child of the cell root; unlike inline mode, the band does not wrap the content — the content
    // is a sibling.
    const band = name.parentElement;
    expect(band?.parentElement).toBe(cell);
    expect(band).not.toContainElement(verse);
    // Header mode routes through the same helper, so it inherits the aria-hidden non-duplication.
    expect(name).toHaveAttribute('aria-hidden', 'true');
  });
});

const menuStrings = {
  [UNAVAILABLE_KEY]: 'Resource unavailable',
  [LOADING_KEY]: 'Resource is loading…',
  [FAILED_KEY]: 'Download failed',
  [COPY_KEY]: 'Copy',
};

const zoomMenuLabels = {
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  reset: 'Reset zoom',
  options: 'Zoom options for {resourceName}',
};

/** The open menu's items and separators in document order, a separator shown as `—`. */
function menuEntries(menu: HTMLElement): string[] {
  return Array.from(menu.querySelectorAll('[role="menuitem"], [role="separator"]')).map((entry) =>
    entry.getAttribute('role') === 'separator' ? '—' : (entry.textContent ?? ''),
  );
}

/** Every element from `element` up to and including `root`, innermost first. */
function ancestorsUpTo(element: HTMLElement, root: Element): HTMLElement[] {
  const chain: HTMLElement[] = [];
  for (let current = element.parentElement; current; current = current.parentElement) {
    chain.push(current);
    if (current === root) break;
  }
  return chain;
}

describe('ResourceCellView right-click menu', () => {
  it.each(['inline', 'header'] as const)(
    '%s layout: offers Copy alone without zoom menu labels',
    (nameDisplay) => {
      renderCells(
        <ResourceCellView
          state="ready"
          zoomArea={ZOOM_AREA}
          label="WEB"
          textDirection="ltr"
          localizedStrings={menuStrings}
          editor={<span>verse</span>}
          nameDisplay={nameDisplay}
        />,
      );

      fireEvent.contextMenu(screen.getByText('verse'));

      expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument();
      expect(screen.getAllByRole('menuitem')).toHaveLength(1);
      expect(screen.queryByRole('menuitem', { name: /zoom/i })).not.toBeInTheDocument();
    },
  );

  it('offers no zoom options button in the header without zoom menu labels', () => {
    renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={menuStrings}
        editor={<span>verse</span>}
        nameDisplay="header"
        showDragHandle
        reorderHandleLabel="Reorder WEB"
      />,
    );
    // Positive control: the header renders its one button, the reorder grip.
    expect(screen.getByRole('button', { name: 'Reorder WEB' })).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('leaves the browser menu alone on a cell whose resource is not installed', () => {
    renderCells(
      <ResourceCellView
        state="unavailable"
        zoomArea={ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={{ ...menuStrings, [NOT_INSTALLED_KEY]: 'Resource not installed' }}
        editor={undefined}
      />,
    );
    const event = createEvent.contextMenu(screen.getByText('Resource not installed'));
    fireEvent(screen.getByText('Resource not installed'), event);
    expect(event.defaultPrevented).toBe(false);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('shows an enabled Copy item when text is selected', () => {
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
        zoomArea={ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={menuStrings}
        editor={<span>verse</span>}
      />,
    );

    fireEvent.contextMenu(screen.getByText('verse'));

    const copyItem = screen.getByRole('menuitem', { name: 'Copy' });
    expect(copyItem).toBeInTheDocument();
    expect(copyItem).not.toHaveAttribute('aria-disabled', 'true');

    getSelectionSpy.mockRestore();
  });

  it('shows a disabled Copy item when no text is selected', () => {
    // Spy on window.getSelection to simulate no selection.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const getSelectionSpy = vi.spyOn(window, 'getSelection').mockReturnValue({
      toString: () => '',
    } as Selection);

    renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={menuStrings}
        editor={<span>verse</span>}
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
        zoomArea={ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={menuStrings}
        editor={<span>verse</span>}
      />,
    );

    fireEvent.contextMenu(screen.getByText('verse'));
    await user.click(screen.getByRole('menuitem', { name: 'Copy' }));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith('selected text');

    getSelectionSpy.mockRestore();
  });
});

describe('ResourceCellView zoom menus', () => {
  it.each(['inline', 'header'] as const)(
    '%s layout: the right-click menu offers Copy, a separator, Zoom in, Zoom out and Reset zoom, in that order',
    (nameDisplay) => {
      renderCells(
        <ResourceCellView
          state="ready"
          zoomArea={ZOOM_AREA}
          label="WEB"
          textDirection="ltr"
          localizedStrings={menuStrings}
          editor={<span>verse</span>}
          nameDisplay={nameDisplay}
          zoomMenuLabels={zoomMenuLabels}
        />,
      );
      fireEvent.contextMenu(screen.getByText('verse'));
      expect(menuEntries(screen.getByRole('menu'))).toEqual([
        'Copy',
        '—',
        'Zoom in',
        'Zoom out',
        'Reset zoom',
      ]);
    },
  );

  it('disables each zoom item at its bound: Zoom in at 300 %, Zoom out at 50 %, Reset without an own level', () => {
    const { rerender } = renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={menuStrings}
        editor={<span>verse</span>}
        zoomMenuLabels={zoomMenuLabels}
        canZoomIn={false}
        canZoomOut
        canReset={false}
      />,
    );
    fireEvent.contextMenu(screen.getByText('verse'));
    let menu = screen.getByRole('menu');
    expect(within(menu).getByRole('menuitem', { name: 'Zoom in' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(within(menu).getByRole('menuitem', { name: 'Zoom out' })).not.toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(within(menu).getByRole('menuitem', { name: 'Reset zoom' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    fireEvent.keyDown(menu, { key: 'Escape' });

    rerender(
      <div>
        <ResourceCellView
          state="ready"
          zoomArea={ZOOM_AREA}
          label="WEB"
          textDirection="ltr"
          localizedStrings={menuStrings}
          editor={<span>verse</span>}
          zoomMenuLabels={zoomMenuLabels}
          canZoomIn
          canZoomOut={false}
          canReset
        />
      </div>,
    );
    fireEvent.contextMenu(screen.getByText('verse'));
    menu = screen.getByRole('menu');
    expect(within(menu).getByRole('menuitem', { name: 'Zoom in' })).not.toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(within(menu).getByRole('menuitem', { name: 'Zoom out' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(within(menu).getByRole('menuitem', { name: 'Reset zoom' })).not.toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('choosing each zoom item calls its callback', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onZoomIn = vi.fn();
    const onZoomOut = vi.fn();
    const onResetZoom = vi.fn();
    renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={menuStrings}
        editor={<span>verse</span>}
        zoomMenuLabels={zoomMenuLabels}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onResetZoom={onResetZoom}
      />,
    );
    fireEvent.contextMenu(screen.getByText('verse'));
    await user.click(screen.getByRole('menuitem', { name: 'Zoom in' }));
    fireEvent.contextMenu(screen.getByText('verse'));
    await user.click(screen.getByRole('menuitem', { name: 'Zoom out' }));
    fireEvent.contextMenu(screen.getByText('verse'));
    await user.click(screen.getByRole('menuitem', { name: 'Reset zoom' }));
    expect(onZoomIn).toHaveBeenCalledTimes(1);
    expect(onZoomOut).toHaveBeenCalledTimes(1);
    expect(onResetZoom).toHaveBeenCalledTimes(1);
  });

  it('choosing a zoom item in the right-click menu does not bubble a click to the verse row around the cell', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onRowClick = vi.fn();
    const onZoomIn = vi.fn();
    render(
      // Test-only click sink standing in for the verse `listitem`, whose click opens the chapter
      // panel; it is not a real interactive control, so the a11y interactivity rules do not apply.
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div onClick={onRowClick}>
        <ResourceCellView
          state="ready"
          zoomArea={ZOOM_AREA}
          label="WEB"
          textDirection="ltr"
          localizedStrings={menuStrings}
          editor={<span>verse</span>}
          nameDisplay="inline"
          zoomMenuLabels={zoomMenuLabels}
          onZoomIn={onZoomIn}
        />
      </div>,
    );
    fireEvent.contextMenu(screen.getByText('verse'));
    await user.click(screen.getByRole('menuitem', { name: 'Zoom in' }));
    // Positive control: the item was really chosen, so the silence below is about the bubbling.
    expect(onZoomIn).toHaveBeenCalledTimes(1);
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('pressing Enter or Space on a zoom item in the right-click menu does not bubble the key to the verse row around the cell', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onRowKeyDown = vi.fn();
    const onZoomIn = vi.fn();
    const onZoomOut = vi.fn();
    render(
      // Test-only key sink standing in for the verse `listitem`, whose Enter/Space opens the chapter
      // panel; it is not a real interactive control, so the a11y interactivity rules do not apply.
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onKeyDown={onRowKeyDown}>
        <ResourceCellView
          state="ready"
          zoomArea={ZOOM_AREA}
          label="WEB"
          textDirection="ltr"
          localizedStrings={menuStrings}
          editor={<span>verse</span>}
          nameDisplay="inline"
          zoomMenuLabels={zoomMenuLabels}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
        />
      </div>,
    );
    fireEvent.contextMenu(screen.getByText('verse'));
    screen.getByRole('menuitem', { name: 'Zoom in' }).focus();
    await user.keyboard('{Enter}');
    fireEvent.contextMenu(screen.getByText('verse'));
    screen.getByRole('menuitem', { name: 'Zoom out' }).focus();
    await user.keyboard(' ');
    // Positive controls: both items were really chosen by key, so the silence below is about the
    // bubbling.
    expect(onZoomIn).toHaveBeenCalledTimes(1);
    expect(onZoomOut).toHaveBeenCalledTimes(1);
    const keysSeenByRow = onRowKeyDown.mock.calls.map(([event]) => event.key);
    expect(keysSeenByRow).not.toContain('Enter');
    expect(keysSeenByRow).not.toContain(' ');
  });

  it('header layout: the "⋮" button, named for the resource, opens the three zoom items without Copy', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onZoomIn = vi.fn();
    renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={menuStrings}
        editor={<span>verse</span>}
        nameDisplay="header"
        zoomMenuLabels={zoomMenuLabels}
        canZoomIn={false}
        onZoomIn={onZoomIn}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Zoom options for WEB' }));
    const menu = screen.getByRole('menu');
    expect(menuEntries(menu)).toEqual(['Zoom in', 'Zoom out', 'Reset zoom']);
    expect(within(menu).getByRole('menuitem', { name: 'Zoom in' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('header layout: the "⋮" button sits after the name and shows only on hover or focus, except on touch screens', () => {
    const { container } = renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={menuStrings}
        editor={<span>verse</span>}
        nameDisplay="header"
        zoomMenuLabels={zoomMenuLabels}
      />,
    );
    const button = screen.getByRole('button', { name: 'Zoom options for WEB' });
    expect(button.parentElement).toContainElement(screen.getByText('WEB'));
    expect(screen.getByText('WEB').compareDocumentPosition(button)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    [
      'tw:opacity-0',
      'tw:group-hover:opacity-100',
      'tw:group-focus-within:opacity-100',
      'tw:[@media(hover:none)]:opacity-100',
    ].forEach((className) => expect(button.classList.contains(className)).toBe(true));
    // The reveal keys off the cell root, which carries the `group` the classes above refer to.
    expect(container.firstElementChild?.firstElementChild?.classList.contains('tw:group')).toBe(
      true,
    );
  });

  it('inline layout: no "⋮" button, since a verse row shows its name inline', () => {
    renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={menuStrings}
        editor={<span>verse</span>}
        nameDisplay="inline"
        zoomMenuLabels={zoomMenuLabels}
      />,
    );
    // Positive control: the zoom labels are live, so the right-click menu carries zoom items.
    fireEvent.contextMenu(screen.getByText('verse'));
    expect(screen.getByRole('menuitem', { name: 'Zoom in' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /zoom options/i })).not.toBeInTheDocument();
  });

  it('clicking the "⋮" button does not bubble a click to the parent', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onParentClick = vi.fn();
    render(
      // Test-only click sink used to assert propagation; not a real interactive control.
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div onClick={onParentClick}>
        <ResourceCellView
          state="ready"
          zoomArea={ZOOM_AREA}
          label="WEB"
          textDirection="ltr"
          localizedStrings={menuStrings}
          editor={<span>verse</span>}
          nameDisplay="header"
          zoomMenuLabels={zoomMenuLabels}
        />
      </div>,
    );
    await user.click(screen.getByRole('button', { name: 'Zoom options for WEB' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(onParentClick).not.toHaveBeenCalled();
  });
});

describe('ResourceCellView reorder grip', () => {
  it('renders the grip as a focusable, labeled control and fires onReorderKeyDown on keydown', () => {
    const onReorderKeyDown = vi.fn();
    renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="Genesis"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<span>In the beginning</span>}
        showDragHandle
        reorderHandleId="gen"
        reorderHandleLabel="Reorder Genesis"
        reorderHint="Drag or press arrow keys to reorder"
        onReorderKeyDown={onReorderKeyDown}
      />,
    );

    const grip = screen.getByRole('button', { name: 'Reorder Genesis' });
    expect(grip).toHaveAttribute('data-reorder-handle-id', 'gen');
    // A real focusable control (button), not an aria-hidden decoration.
    expect(grip).not.toHaveAttribute('aria-hidden');
    act(() => grip.focus());
    expect(grip).toHaveFocus();

    fireEvent.keyDown(grip, { key: 'ArrowRight' });
    expect(onReorderKeyDown).toHaveBeenCalledTimes(1);
  });

  it('shows the reorder hint tooltip on grip focus', async () => {
    renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="Genesis"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<span>In the beginning</span>}
        showDragHandle
        reorderHandleId="gen"
        reorderHandleLabel="Reorder Genesis"
        reorderHint="Drag or press arrow keys to reorder"
        onReorderKeyDown={vi.fn()}
      />,
    );

    fireEvent.focus(screen.getByRole('button', { name: 'Reorder Genesis' }));
    // Radix renders the tooltip content into a live region on focus.
    expect(await screen.findAllByText('Drag or press arrow keys to reorder')).not.toHaveLength(0);
  });

  it('does not crash when showDragHandle is set without reorder wiring', () => {
    renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="Genesis"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<span>In the beginning</span>}
        showDragHandle
      />,
    );
    // The grip still renders (no aria-label supplied); the label text is still shown in the header.
    expect(screen.getByText('Genesis')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('ResourceCellView content zoom marker', () => {
  function renderMarkedCell(nameDisplay: 'inline' | 'header') {
    return renderCells(
      <ResourceCellView
        state="ready"
        zoomArea={ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={menuStrings}
        editor={<span>marked verse</span>}
        nameDisplay={nameDisplay}
        showDragHandle
        reorderHandleLabel="Reorder WEB"
      />,
    );
  }

  it.each(['inline', 'header'] as const)(
    '%s layout: marks one element, with the resource’s own area and name, around the cell text, and nothing zooms that text but the marker',
    (nameDisplay) => {
      const { container } = renderMarkedCell(nameDisplay);
      const markers = container.querySelectorAll('[data-platform-content-zoom-root]');
      expect(markers).toHaveLength(1);
      const marker = markers[0];
      expect(marker.getAttribute('data-platform-content-zoom-root')).toBe(ZOOM_AREA);
      expect(marker.getAttribute('data-platform-content-zoom-label')).toBe('WEB');

      const verse = screen.getByText('marked verse');
      const chain = ancestorsUpTo(verse, marker);
      // Positive control: the walk reached the marker, so it covered every element in between.
      expect(chain.at(-1)).toBe(marker);
      // CSS `zoom` on any of these would multiply with the area's level (or, on the marker itself,
      // replace it), so the cell text would no longer be sized by the content zoom alone.
      [verse, ...chain].forEach((element) => {
        expect(element.style.zoom).toBeFalsy();
        expect(element.getAttribute('style') ?? '').not.toMatch(/zoom/i);
      });
    },
  );

  it.each(['inline', 'header'] as const)(
    '%s layout: keeps the scroll box and its padding outside the marker',
    (nameDisplay) => {
      const { container } = renderMarkedCell(nameDisplay);
      const marker = container.querySelector('[data-platform-content-zoom-root]');
      if (!marker) throw new Error('marker missing');
      // The scrollbar and the padding keep interface size; only the text inside them scales.
      expect(marker.getAttribute('class') ?? '').not.toMatch(/overflow|tw:p-2/);
      const scrollBox = marker.parentElement?.closest('[class~="tw:overflow-auto"]');
      expect(scrollBox).not.toBeNull();
      expect(scrollBox?.contains(marker)).toBe(true);
    },
  );

  it.each(['inline', 'header'] as const)(
    '%s layout: leaves the resource name outside the marker',
    (nameDisplay) => {
      const { container } = renderMarkedCell(nameDisplay);
      const marker = container.querySelector('[data-platform-content-zoom-root]');
      expect(marker?.contains(screen.getByText('WEB'))).toBe(false);
    },
  );

  it('header layout: leaves the reorder grip outside the marker', () => {
    const { container } = renderMarkedCell('header');
    const marker = container.querySelector('[data-platform-content-zoom-root]');
    expect(marker?.contains(screen.getByRole('button', { name: 'Reorder WEB' }))).toBe(false);
  });
});
