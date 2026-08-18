// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  ManageBooksDialog,
  type ManageBooksDialogBookInfo,
  type ManageBooksDialogProject,
  type ManageBooksDialogProps,
  type MutationResult,
} from './manage-books-dialog.component';

const originalScrollIntoView = Element.prototype.scrollIntoView;
const originalQuerySelectorAll = Element.prototype.querySelectorAll;

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    const stubResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    // ResizeObserver constructor as a vi.fn factory satisfies the runtime contract but not
    // structural typing; we cast through unknown to adapt it to the required type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.ResizeObserver = stubResizeObserver as unknown as typeof ResizeObserver;
  }
  // jsdom does not implement `window.matchMedia`; Sonner's Toaster (rendered inside the dialog)
  // calls it directly to pick its light/dark default. Precedent: notification-display.test.tsx.
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: undefined,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  // jsdom has no layout, so scrollIntoView is not implemented. Stub it so the grid's
  // scroll-to-book layout effect doesn't throw.
  Element.prototype.scrollIntoView = vi.fn();

  // BookGridSelector's column-measurement effect queries `:scope > li` on its `tw:grid` <ul>.
  // jsdom's nwsapi implements `:scope` by anchoring on the context element's class list, which
  // chokes on Tailwind v4 colon classes (e.g. `tw:grid`) — parsing `:grid` as an unknown
  // pseudo-class. Patch the one selector here rather than touching production code (same
  // workaround as book-grid.component.test.tsx).
  Element.prototype.querySelectorAll = function scopedQuerySelectorAll<E extends Element>(
    selectors: string,
  ) {
    if (selectors === ':scope > li') {
      const lis = Array.from(this.children).filter((child) => child.tagName === 'LI');
      // Test-only shim: NodeList is not constructible directly, and every caller of this
      // selector only iterates or indexes the result, so an array stands in faithfully.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return lis as unknown as NodeListOf<E>;
    }
    // `Element.prototype.querySelectorAll` is a generic overload; `.call` widens the return to
    // NodeListOf<Element>, so it needs re-narrowing to the caller's element type.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return originalQuerySelectorAll.call(this, selectors) as NodeListOf<E>;
  };
});

afterAll(() => {
  Element.prototype.scrollIntoView = originalScrollIntoView;
  Element.prototype.querySelectorAll = originalQuerySelectorAll;
});

const PROJECTS: ManageBooksDialogProject[] = [
  { id: 'WEB', shortName: 'WEB', name: 'World English Bible' },
  { id: 'KJV', shortName: 'KJV', name: 'King James Version' },
];

const BOOKS: Record<string, ManageBooksDialogBookInfo[]> = {
  WEB: [{ id: 'GEN' }],
  KJV: [{ id: 'GEN' }, { id: 'MRK' }],
};

const BOOK_IDS = ['GEN', 'EXO', 'MRK', 'LUK'];

const noopMutation = async (): Promise<MutationResult> => ({
  success: true,
  warnings: [],
  errors: [],
});

/** The dialog with the minimum wiring it needs, plus whatever the test overrides. */
function dialog(props: Partial<ManageBooksDialogProps> = {}) {
  const allProps: ManageBooksDialogProps = {
    open: true,
    projectId: 'WEB',
    bookIds: BOOK_IDS,
    loadProjects: () => PROJECTS,
    loadBooks: (pid: string) => BOOKS[pid] ?? [],
    loadVersification: async () => '4',
    onCreateBooks: noopMutation,
    onDeleteBooks: noopMutation,
    onCopyBooks: noopMutation,
    onImportBooks: noopMutation,
    ...props,
  };
  return <ManageBooksDialog {...allProps} />;
}

/** The sidebar row for a section is marked `data-active="true"` when that section is open. */
const isSectionActive = (sectionId: string) =>
  screen.getByTestId(`manage-books-sidebar-section-${sectionId}`).getAttribute('data-active') ===
  'true';

/** Book pills are `<li data-book="XXX" aria-selected>` inside the grid. */
const isBookSelected = (container: HTMLElement, book: string) =>
  container.querySelector(`[data-book="${book}"]`)?.getAttribute('aria-selected') === 'true';

describe('ManageBooksDialog launch parameters', () => {
  it('opens on the launched section with the launched books selected', async () => {
    const { container } = render(
      dialog({ initialSection: 'create', initialSelectedBooks: ['MRK'] }),
    );

    await waitFor(() => expect(isSectionActive('create')).toBe(true));
    expect(isBookSelected(container, 'MRK')).toBe(true);
  });

  it('re-applies the launch parameters when the launch token changes', async () => {
    const { container, rerender } = render(
      dialog({ launchToken: 1, initialSection: 'create', initialSelectedBooks: ['MRK'] }),
    );

    await waitFor(() => expect(isSectionActive('create')).toBe(true));

    // A relaunch re-renders the SAME mounted dialog with new launch parameters and a new token.
    await act(async () => {
      rerender(dialog({ launchToken: 2, initialSection: 'delete', initialSelectedBooks: ['GEN'] }));
    });

    await waitFor(() => expect(isSectionActive('delete')).toBe(true));
    expect(isBookSelected(container, 'GEN')).toBe(true);
  });

  it('leaves the user selections alone when a re-render does not change the launch token', async () => {
    const { container, rerender } = render(
      dialog({ launchToken: 1, initialSection: 'create', initialSelectedBooks: ['MRK'] }),
    );

    await waitFor(() => expect(isSectionActive('create')).toBe(true));

    // The user adds a second book to the launched selection.
    await userEvent.click(screen.getByRole('button', { name: 'Select Exodus' }));
    expect(isBookSelected(container, 'EXO')).toBe(true);

    await act(async () => {
      rerender(dialog({ launchToken: 1, initialSection: 'create', initialSelectedBooks: ['MRK'] }));
    });

    expect(isSectionActive('create')).toBe(true);
    expect(isBookSelected(container, 'EXO')).toBe(true);
  });
});
