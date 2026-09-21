// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  makeBuiltInGroupings,
  type ProjectSelectorGrouping,
} from 'platform-bible-react/experimental';
import { MANAGE_BOOKS_PROJECT_SELECTOR_GROUPING_IDS } from '../manage-books.web-view';
import {
  ManageBooksDialog,
  type ManageBooksDialogBookInfo,
  type ManageBooksDialogProject,
  type ManageBooksDialogProps,
  type MutationResult,
} from './manage-books-dialog.component';
import {
  MANAGE_BOOKS_DIALOG_STRING_KEYS,
  type ManageBooksDialogLocalizedStrings,
} from './manage-books-dialog.types';
import { installManageBooksJsdomShims, scrolledElements } from './manage-books-dialog.test-utils';

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
  // Built the way the web view builds it, so the order these tests pin is the order users see.
  // Hand-listing the descriptors would pin an order the wiring layer never produces.
  const WIRING_GROUPINGS: ProjectSelectorGrouping[] = makeBuiltInGroupings().filter((grouping) =>
    MANAGE_BOOKS_PROJECT_SELECTOR_GROUPING_IDS.includes(grouping.id),
  );

  // `projectId` ('WEB') is the dialog's own project and is excluded from the "other projects" the
  // Based-on picker lists, so two MORE projects are needed to produce two versification buckets.
  const VERSIFIED_PROJECTS: ManageBooksDialogProject[] = [
    { id: 'WEB', shortName: 'WEB', name: 'World English Bible', versificationId: '4' },
    { id: 'VUL', shortName: 'VUL', name: 'Vulgate', versificationId: '3' },
    { id: 'KJV', shortName: 'KJV', name: 'King James Version', versificationId: '4' },
  ];

  const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 });

  /** Grouping options the open group-by menu offers, in order, by visible label. */
  const groupingChoices = () =>
    screen.getAllByRole('menuitemradio').map((item) => item.textContent?.trim());

  /**
   * Opens a picker, then the group-by menu inside that picker's own popover.
   *
   * The dialog has a second "Group by" control — the book grid's toggle group — so the trigger is
   * found within the popover rather than anywhere in the document.
   */
  async function openGroupingMenu(user: ReturnType<typeof setupUser>, trigger: HTMLElement) {
    await user.click(trigger);
    const popover = await screen.findByRole('dialog');
    await user.click(await within(popover).findByRole('button', { name: 'Group by' }));
  }

  it('offers the sidebar picker every grouping the wiring layer supplies', async () => {
    const user = setupUser();
    render(dialog({ projectSelectorGroupings: WIRING_GROUPINGS }));

    const rail = await screen.findByTestId('manage-books-sidebar-project-trigger');
    // The rail trigger stays disabled until the project list loads, which would swallow a click.
    await waitFor(() => expect(within(rail).getByRole('combobox')).toBeEnabled());
    await openGroupingMenu(user, within(rail).getByRole('combobox'));

    await waitFor(() =>
      expect(groupingChoices()).toEqual(['None', 'Open tabs', 'Last used', 'Type']),
    );
  });

  it('narrows the copy source picker to the groupings its rows carry data for', async () => {
    const user = setupUser();
    render(dialog({ initialSection: 'copy', projectSelectorGroupings: WIRING_GROUPINGS }));

    // The picker renders only after projects load, which is later than the section becoming
    // active — waiting on the section flag alone would race the query below.
    await openGroupingMenu(user, await screen.findByRole('combobox', { name: 'Select project' }));

    // MANAGE_BOOKS_COPY_FROM_GROUPING_IDS is an allow-list narrower than the list the wiring layer
    // hands the dialog: the Copy "From" rows drop `lastUsedAt`, so offering "Last used" would
    // bucket every row under one heading. The absence of 'Last used' is the load-bearing half.
    await waitFor(() => expect(groupingChoices()).toEqual(['None', 'Open tabs', 'Type']));
  });

  it('locks the create reference picker to versification with no way to regroup it', async () => {
    const user = setupUser();
    render(
      dialog({
        initialSection: 'create',
        loadProjects: () => VERSIFIED_PROJECTS,
        projectSelectorGroupings: WIRING_GROUPINGS,
      }),
    );

    await waitFor(() => expect(isSectionActive('create')).toBe(true));
    const reference = await screen.findByTestId('manage-books-create-reference-trigger');
    await user.click(within(reference).getByRole('combobox'));

    // Versification is the only axis worth switching to here, so the picker passes it as the sole
    // grouping — which locks the list to it and drops the group-by affordance rather than
    // exposing an inert one-item toggle.
    await waitFor(() => expect(screen.getByText('English versification')).toBeInTheDocument());
    expect(screen.getByText('Vulgate versification')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Group by' })).not.toBeInTheDocument();
  });
});

describe('ManageBooksDialog project pickers — dialog strings unresolved', () => {
  // What `useLocalizedStrings` actually hands a web view before strings load, and permanently if
  // the localization provider errors: every key seeded as its own value. Those are defined
  // strings, so the dialog's `t()` helper has to judge them rather than rely on `??`.
  const UNRESOLVED_STRINGS: ManageBooksDialogLocalizedStrings = Object.fromEntries(
    MANAGE_BOOKS_DIALOG_STRING_KEYS.map((key) => [key, key]),
  );

  const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 });

  it("keeps each picker's own English rather than the picker's generic default", async () => {
    render(dialog({ initialSection: 'copy', localizedStrings: UNRESOLVED_STRINGS }));

    // Distinct names matter as much as correct ones: without the dialog's own fallbacks both
    // comboboxes resolve to ProjectSelector's identical 'Projects & resources'.
    const rail = await screen.findByTestId('manage-books-sidebar-project-trigger');
    await waitFor(() => expect(within(rail).getByRole('combobox')).toBeEnabled());
    expect(within(rail).getByRole('combobox')).toHaveAccessibleName('Project');
    // The rail shows its placeholder until the active project lands in the loaded list. That
    // placeholder is a dialog-owned fallback too, so it must be English rather than a raw key.
    expect(within(rail).getByRole('combobox')).toHaveTextContent('Select project');

    expect(await screen.findByRole('combobox', { name: 'Select project' })).toBeInTheDocument();
  });

  it('renders no raw localization key in the copy source picker, trigger or popover', async () => {
    const user = setupUser();
    render(dialog({ initialSection: 'copy', localizedStrings: UNRESOLVED_STRINGS }));

    // Any `%…%` key, whatever its prefix — a sweep narrowed to `%manageBooks_` would miss the
    // shared `%projectSelector_*%` block the popover also renders.
    const RAW_KEY = /%[^%\s]+%/;
    await user.click(await screen.findByRole('combobox', { name: 'Select project' }));
    const popover = await screen.findByRole('dialog');

    expect(within(popover).queryAllByText(RAW_KEY)).toHaveLength(0);
    expect(within(popover).queryAllByPlaceholderText(RAW_KEY)).toHaveLength(0);
  });
});
