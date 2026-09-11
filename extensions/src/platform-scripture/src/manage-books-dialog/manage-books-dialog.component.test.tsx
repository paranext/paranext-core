// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  ManageBooksDialog,
  type ManageBooksDialogBookInfo,
  type ManageBooksDialogProject,
  type ManageBooksDialogProps,
  type MutationResult,
} from './manage-books-dialog.component';
import { installManageBooksJsdomShims, scrolledElements } from './manage-books-dialog.test-utils';
import { groupingChoices, setupUser, UNSUPPORTED_GROUPINGS } from '../project-selector.test-utils';

let uninstallShims: () => void;

beforeAll(() => {
  uninstallShims = installManageBooksJsdomShims();
});

afterAll(() => {
  uninstallShims();
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

/**
 * Projects carrying a versification, for the Create "Based on" picker — the only picker that groups
 * by versification, so the only one whose fixtures need the field. `'4'` is English and `'3'` is
 * Vulgate, so the list spans two buckets.
 */
const VERSIFIED_PROJECTS: ManageBooksDialogProject[] = [
  { id: 'WEB', shortName: 'WEB', name: 'World English Bible', versificationId: '4' },
  { id: 'KJV', shortName: 'KJV', name: 'King James Version', versificationId: '4' },
  { id: 'VUL', shortName: 'VUL', name: 'Latin Vulgate', versificationId: '3' },
];

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

/** The picker popover a trigger has opened, which Radix portals out of the trigger's subtree. */
const openedPopover = (trigger: HTMLElement) =>
  waitFor(() => {
    const id = trigger.getAttribute('aria-controls');
    const content = id ? document.getElementById(id) : undefined;
    // `waitFor` needs a throw to keep retrying, and returns whatever the callback resolves to.
    if (!content) throw new Error('the picker popover has not opened');
    return content;
  });

describe('ManageBooksDialog launch parameters', () => {
  it('opens on the launched section with the launched books selected', async () => {
    const { container } = render(
      dialog({ initialSection: 'create', initialSelectedBooks: ['MRK'] }),
    );

    await waitFor(() => expect(isSectionActive('create')).toBe(true));
    expect(isBookSelected(container, 'MRK')).toBe(true);
  });

  it('scrolls the launched book into view', async () => {
    const { container } = render(
      dialog({ initialSection: 'create', initialSelectedBooks: ['MRK'] }),
    );

    await waitFor(() => expect(isSectionActive('create')).toBe(true));
    // Assert WHICH element scrolled, not merely that something did — see `scrolledElements`.
    await waitFor(() =>
      expect(scrolledElements()).toContain(container.querySelector('[data-book="MRK"]')),
    );
  });

  it('leaves Apply usable on a create-missing-book launch', async () => {
    render(dialog({ initialSection: 'create', initialSelectedBooks: ['MRK'] }));

    await waitFor(() => expect(isSectionActive('create')).toBe(true));

    // The launch pre-ticks a book, so the user's next click should be the footer action. The default
    // create method ("create based on" a reference project) has no reference selected yet and is
    // excluded from `canApply`, which would hand them a greyed-out button with nothing saying what is
    // missing. The footer label itself is the tell: it counts the books only while `canApply` holds,
    // and degrades to a bare "Create" otherwise.
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /create 1 book in WEB/i })).toBeEnabled(),
    );
  });

  it('applies a new launch on the remount that a relaunch actually causes', async () => {
    const first = render(dialog({ initialSection: 'create', initialSelectedBooks: ['MRK'] }));
    await waitFor(() => expect(isSectionActive('create')).toBe(true));

    // A relaunch onto an already-open dialog reaches this component as a REMOUNT, not a re-render:
    // `reloadWebView` re-runs the provider's `getWebView`, whose regenerated per-call nonce changes the
    // generated web view `content`, so the iframe's `srcDoc` changes and the React root is destroyed
    // and recreated. Unmount-then-mount is therefore the faithful simulation; a `rerender` would
    // certify a path production never takes.
    first.unmount();

    const { container } = render(
      dialog({ initialSection: 'delete', initialSelectedBooks: ['GEN'] }),
    );

    await waitFor(() => expect(isSectionActive('delete')).toBe(true));
    expect(isBookSelected(container, 'GEN')).toBe(true);
  });

  it('ignores a launch parameter change that arrives without a remount', async () => {
    const { container, rerender } = render(
      dialog({ initialSection: 'create', initialSelectedBooks: ['MRK'] }),
    );

    await waitFor(() => expect(isSectionActive('create')).toBe(true));

    // The user adds a second book to the launched selection.
    await userEvent.click(screen.getByRole('button', { name: 'Select Exodus' }));
    expect(isBookSelected(container, 'EXO')).toBe(true);

    // Launch parameters are mount-only ON PURPOSE. A plain prop change is not a relaunch, so honoring
    // it here would let a stale launch value yank the user out of the section they navigated to and
    // discard the selection they just made.
    await act(async () => {
      rerender(dialog({ initialSection: 'delete', initialSelectedBooks: ['GEN'] }));
    });

    expect(isSectionActive('create')).toBe(true);
    expect(isBookSelected(container, 'EXO')).toBe(true);
  });
});

describe('ManageBooksDialog project pickers', () => {
  // The dialog's project data carries no language, type or last-used fields, so those groupings
  // would file every row under one "Unknown …" heading — a menu whose every option makes the list
  // worse. Asserting only the two offered options would still pass with the restriction deleted,
  // so the absence of the unsupported axes is the load-bearing half of these tests.

  /** Opens a picker and its view-options menu, whose trigger lives inside the picker's popover. */
  async function openGroupingMenu(user: ReturnType<typeof setupUser>, trigger: HTMLElement) {
    await user.click(trigger);
    const popover = await openedPopover(trigger);
    // Scope to the popover so the dialog's other controls can never satisfy the lookup.
    await user.click(within(popover).getByLabelText('View options'));
  }

  it('offers only open-tabs grouping in the sidebar project picker', async () => {
    const user = setupUser();
    render(dialog());

    const rail = await screen.findByTestId('manage-books-sidebar-project-trigger');
    // The rail trigger is disabled until the project list has loaded, which would swallow a click.
    await waitFor(() => expect(within(rail).getByRole('combobox')).toBeEnabled());
    await openGroupingMenu(user, within(rail).getByRole('combobox'));

    await waitFor(() => expect(groupingChoices()).toEqual(['None', 'Open tabs']));
    UNSUPPORTED_GROUPINGS.forEach((label) => {
      expect(screen.queryByRole('menuitemradio', { name: label })).not.toBeInTheDocument();
    });
  });

  it('offers only open-tabs grouping in the copy source picker', async () => {
    const user = setupUser();
    render(dialog({ initialSection: 'copy' }));

    await waitFor(() => expect(isSectionActive('copy')).toBe(true));
    await openGroupingMenu(user, screen.getByRole('combobox', { name: 'Select project' }));

    await waitFor(() => expect(groupingChoices()).toEqual(['None', 'Open tabs']));
    UNSUPPORTED_GROUPINGS.forEach((label) => {
      expect(screen.queryByRole('menuitemradio', { name: label })).not.toBeInTheDocument();
    });
  });

  it('groups the create reference picker by versification with no way to regroup it', async () => {
    const user = setupUser();
    render(dialog({ initialSection: 'create', loadProjects: () => VERSIFIED_PROJECTS }));

    await waitFor(() => expect(isSectionActive('create')).toBe(true));
    const reference = await screen.findByTestId('manage-books-create-reference-trigger');
    const trigger = within(reference).getByRole('combobox');
    await user.click(trigger);
    const popover = await openedPopover(trigger);

    // Versification is the only axis worth switching to here, so the picker locks the list to it
    // and drops the view-options affordance rather than exposing an inert one-item toggle.
    await waitFor(() =>
      expect(within(popover).getByText('English versification')).toBeInTheDocument(),
    );
    expect(within(popover).getByText('Vulgate versification')).toBeInTheDocument();
    expect(within(popover).queryByLabelText('View options')).not.toBeInTheDocument();
  });
});
