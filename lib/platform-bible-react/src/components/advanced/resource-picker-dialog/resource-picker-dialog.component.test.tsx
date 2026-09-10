import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, beforeAll, afterAll } from 'vitest';
import { Dialog } from '@/components/shadcn-ui/dialog';
import ResourcePickerDialog, {
  ResourcePickerDialogLocalizedStrings,
} from './resource-picker-dialog.component';
import { SAMPLE_RESOURCES, SAMPLE_SELECTED_IDS } from './resource-picker-dialog.data';

// jsdom implements neither IntersectionObserver (used by the progressive list) nor ResizeObserver
// (wired by the language filter's popover) — stub both so the dialog can mount and be interacted
// with.
const originalScrollIntoView = Element.prototype.scrollIntoView;
beforeAll(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn(() => ({ observe: vi.fn(), disconnect: vi.fn() })),
  );
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
  // cmdk scrolls its highlighted item into view; jsdom has no layout and so no such method.
  Element.prototype.scrollIntoView = vi.fn();
});
afterAll(() => {
  vi.unstubAllGlobals();
  // `vi.unstubAllGlobals` does not reach a prototype assignment, so restore it by hand rather than
  // leaving a stub on `Element` for every test file that runs after this one in the same worker.
  // jsdom ships no `scrollIntoView`, so the captured value is usually `undefined` — putting that
  // back is what restores the original absence.
  Element.prototype.scrollIntoView = originalScrollIntoView;
});

const STRINGS: ResourcePickerDialogLocalizedStrings = {
  '%resourcePicker_title%': 'Resource picker',
  '%resourcePicker_section_already_selected%': 'Already selected',
  '%resourcePicker_section_installed%': 'Installed',
  '%resourcePicker_section_available_to_download%': 'Available to download',
  '%resourcePicker_no_results%': 'No results found',
  '%resourcePicker_search_placeholder%': 'Search resources…',
  '%resourcePicker_language_filter_any%': 'Any language',
  '%resourcePicker_showing_count%': 'Showing {filtered} of {total} resources',
  '%resourcePicker_load_error%': "Couldn't load the list of available resources.",
  '%resourcePicker_retry%': 'Try again',
  '%resourcePicker_no_results_filtered%': 'No resources match the current filters.',
  '%resourcePicker_clear_filters%': 'Clear filters',
  '%resourcePicker_downloads_unavailable%':
    "Resource downloads aren't available on this installation.",
};

function renderDialog(overrides: Partial<Parameters<typeof ResourcePickerDialog>[0]> = {}) {
  const onSelect = vi.fn();
  render(
    <Dialog open>
      <ResourcePickerDialog
        allResources={SAMPLE_RESOURCES}
        selectedResourceIds={SAMPLE_SELECTED_IDS}
        localizedStrings={STRINGS}
        onSelect={onSelect}
        {...overrides}
      />
    </Dialog>,
  );
  return { onSelect };
}

/** Same as {@link renderDialog}, but keeps the handle needed to re-render with changed props. */
function renderDialogForRerender(
  overrides: Partial<Parameters<typeof ResourcePickerDialog>[0]> = {},
) {
  const props = {
    allResources: SAMPLE_RESOURCES,
    selectedResourceIds: SAMPLE_SELECTED_IDS,
    localizedStrings: STRINGS,
    onSelect: vi.fn(),
    ...overrides,
  };
  const view = render(
    <Dialog open>
      <ResourcePickerDialog {...props} />
    </Dialog>,
  );
  return {
    rerender: (next: Partial<Parameters<typeof ResourcePickerDialog>[0]>) =>
      view.rerender(
        <Dialog open>
          <ResourcePickerDialog {...props} {...next} />
        </Dialog>,
      ),
  };
}

describe('ResourcePickerDialog', () => {
  it('shows "Already Selected" section heading with selected resource names', () => {
    renderDialog();
    // The section heading and sr-only row labels both contain this text, so use getAllByText
    expect(screen.getAllByText('Already selected').length).toBeGreaterThan(0);
    expect(screen.getByText('NIV')).toBeInTheDocument();
    expect(screen.getByText('RVR60')).toBeInTheDocument();
  });

  it('does not allow selecting already-selected resources', () => {
    const { onSelect } = renderDialog();
    // NIV is already selected — clicking its row must not trigger onSelect
    const nivText = screen.getByText('NIV');
    const nivRow = nivText.closest('tr');
    if (!nivRow) throw new Error('NIV row not found');
    fireEvent.click(nivRow);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('allows selecting an already-selected resource when allowDeselect is true', () => {
    const { onSelect } = renderDialog({ allowDeselect: true });
    const nivText = screen.getByText('NIV');
    const nivRow = nivText.closest('tr');
    if (!nivRow) throw new Error('NIV row not found');
    fireEvent.click(nivRow);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ dblEntryUid: 'selected-1' }));
  });

  it('keeps the already-selected row clickable (not pointer-events-none) when allowDeselect is true', () => {
    renderDialog({ allowDeselect: true });
    const nivText = screen.getByText('NIV');
    const nivRow = nivText.closest('tr');
    if (!nivRow) throw new Error('NIV row not found');
    // fireEvent.click (used in the test above) dispatches directly on the node and ignores
    // pointer-events, so it can't catch a regression that leaves pointer-events-none on this row.
    // This jsdom unit-test project doesn't load Tailwind, so there's no computed style to assert on
    // either — checking the class list directly is the only way to guard this CSS-driven state.
    expect(nivRow.className).not.toContain('pointer-events-none');
    expect(nivRow.className).toContain('cursor-pointer');
  });

  it('shows "Installed" section with selectable rows for installed, non-selected resources', () => {
    renderDialog();
    expect(screen.getByText('Installed')).toBeInTheDocument();
    expect(screen.getByText('ESV')).toBeInTheDocument();
    expect(screen.getByText('KJV')).toBeInTheDocument();
  });

  it('shows "Available to Download" section with selectable rows for uninstalled resources', () => {
    renderDialog();
    expect(screen.getByText('Available to download')).toBeInTheDocument();
    expect(screen.getByText('NLT')).toBeInTheDocument();
  });

  it('calls onSelect with an installed resource when its row is clicked', () => {
    const { onSelect } = renderDialog();
    // Click the ESV row directly (installed, not selected)
    const esvText = screen.getByText('ESV');
    const esvRow = esvText.closest('tr');
    if (!esvRow) throw new Error('ESV row not found');
    fireEvent.click(esvRow);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ dblEntryUid: 'installed-1' }));
  });

  it('calls onSelect with an uninstalled resource when its row is clicked', () => {
    const { onSelect } = renderDialog();
    // Click the NLT row directly (uninstalled)
    const nltText = screen.getByText('NLT');
    const nltRow = nltText.closest('tr');
    if (!nltRow) throw new Error('NLT row not found');
    fireEvent.click(nltRow);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ dblEntryUid: 'download-1' }));
  });

  it('blames the search, not the catalog, when the search matches nothing', () => {
    renderDialog();
    const searchInput = screen.getByPlaceholderText('Search resources…');
    fireEvent.change(searchInput, { target: { value: 'zzznomatch' } });
    expect(screen.getByText('No resources match the current filters.')).toBeInTheDocument();
    expect(screen.queryByText('No results found')).not.toBeInTheDocument();
    expect(screen.queryByText('Already selected')).not.toBeInTheDocument();
    expect(screen.queryByText('Installed')).not.toBeInTheDocument();
    expect(screen.queryByText('Available to download')).not.toBeInTheDocument();
  });

  // Clears BOTH filters, so the language selection has to be part of the setup: with only a search
  // term applied, dropping the `setSelectedLanguages([])` reset leaves this green while the button
  // silently stops doing half its job.
  it('restores the full list when the filters are cleared, including the language filter', () => {
    renderDialog();

    fireEvent.click(screen.getByRole('combobox'));
    // Scoped to the option: "Spanish" also appears as the language cell of the RVR60 row behind the
    // popover.
    fireEvent.click(screen.getByRole('option', { name: 'Spanish' }));
    // Narrowed to Spanish: the English entries are gone, the Spanish one remains.
    expect(screen.queryByText('NIV')).not.toBeInTheDocument();
    expect(screen.getByText('RVR60')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search resources…'), {
      target: { value: 'zzznomatch' },
    });
    expect(screen.getByText('No resources match the current filters.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));

    expect(screen.queryByText('No resources match the current filters.')).not.toBeInTheDocument();
    // NIV is English, so it only returns if the LANGUAGE filter was cleared too.
    expect(screen.getByText('NIV')).toBeInTheDocument();
  });

  // The type narrowing is not one of the filters `clearFilters` can reset, so offering the button
  // here would route the user through a control that provably cannot change the result.
  it('does not offer to clear filters when the resource type is what emptied the list', () => {
    renderDialog({ resourceType: 'CommentaryResource' });

    fireEvent.change(screen.getByPlaceholderText('Search resources…'), {
      target: { value: 'zzznomatch' },
    });

    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear filters' })).not.toBeInTheDocument();
  });

  it('keeps the plain no-results text when the catalog is empty with no filter applied', () => {
    renderDialog({ allResources: [], selectedResourceIds: [] });

    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear filters' })).not.toBeInTheDocument();
  });

  // An installation with no DBL credentials has an empty list for a reason the user cannot act on.
  // "No results found" hides that; a retry would be an inert control attached to a false failure.
  it('explains an installation that cannot download resources, and offers no retry', () => {
    renderDialog({ allResources: [], selectedResourceIds: [], areDownloadsUnavailable: true });

    expect(
      screen.getByText("Resource downloads aren't available on this installation."),
    ).toBeInTheDocument();
    expect(screen.queryByText('No results found')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument();
  });

  // Selecting every language excludes nothing, which is why the trigger keeps reading "Any
  // language". Counting it as a filter would claim a narrowing that is not happening.
  it('does not treat selecting every language as a filter', () => {
    renderDialog();

    fireEvent.click(screen.getByRole('combobox'));
    ['English', 'Spanish', 'Greek', 'Hebrew'].forEach((language) => {
      const option = screen.queryByRole('option', { name: language });
      if (option) fireEvent.click(option);
    });

    expect(screen.queryByText(/^Showing/)).not.toBeInTheDocument();
  });

  // The count describes what this picker is allowed to show. Reporting the whole catalog implies
  // candidates the user could reach by clearing something, when the type narrowing is not clearable.
  it('counts against the type-scoped set, not the whole catalog', () => {
    renderDialog({ resourceType: 'XmlResource' });

    fireEvent.change(screen.getByPlaceholderText('Search resources…'), {
      target: { value: 'UBS' },
    });

    // Two XmlResource entries exist in the sample catalog; only one matches "UBS".
    expect(screen.getByText('Showing 1 of 2 resources')).toBeInTheDocument();
  });

  it('suppresses the count while the catalog is still loading or failed', () => {
    const { rerender } = renderDialogForRerender({ isResourcesLoading: true });
    expect(screen.queryByText(/^Showing/)).not.toBeInTheDocument();

    rerender({ allResources: [], hasResourcesError: true });
    expect(screen.queryByText(/^Showing/)).not.toBeInTheDocument();
  });

  // A count of zero above a message saying downloads are unavailable contradicts it: it reads as a
  // search that came up empty, which is the reading the message exists to prevent.
  it('suppresses the count over the downloads-unavailable message, filter or no filter', () => {
    const { rerender } = renderDialogForRerender();

    fireEvent.change(screen.getByPlaceholderText('Search resources…'), {
      target: { value: 'NIV' },
    });
    expect(screen.getByText(/^Showing/)).toBeInTheDocument();

    rerender({ allResources: [], areDownloadsUnavailable: true });

    expect(
      screen.getByText("Resource downloads aren't available on this installation."),
    ).toBeInTheDocument();
    expect(screen.queryByText(/^Showing/)).not.toBeInTheDocument();
  });

  it('suppresses the count over a genuinely empty catalog, filter or no filter', () => {
    const { rerender } = renderDialogForRerender();

    fireEvent.change(screen.getByPlaceholderText('Search resources…'), {
      target: { value: 'NIV' },
    });
    expect(screen.getByText(/^Showing/)).toBeInTheDocument();

    rerender({ allResources: [] });

    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.queryByText(/^Showing/)).not.toBeInTheDocument();
  });

  // The language predicate runs over the type-scoped set, so the "is this narrowing anything?"
  // question has to be asked of that same set. Asked of the whole catalog it answers about
  // languages this picker never shows.
  it('does not call a language selection a filter when it excludes nothing of this type', () => {
    // Every XmlResource in the sample catalog is English; Spanish, Greek and Hebrew exist only on
    // resources this picker filters out anyway.
    renderDialog({ resourceType: 'XmlResource' });

    fireEvent.click(screen.getByRole('combobox'));
    const english = screen.getByRole('option', { name: 'English' });
    fireEvent.click(english);

    expect(screen.queryByText(/^Showing/)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear filters' })).not.toBeInTheDocument();
  });

  // The costlier direction: a selection that hides every row while reporting itself as no filter
  // withdraws the one control that could reveal them again.
  it('keeps Clear filters when the catalog changes out from under a selected language', () => {
    const { rerender } = renderDialogForRerender();

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: 'Spanish' }));

    // A retry, or a host that persists the language filter, can deliver a catalog whose languages
    // no longer include the selected one.
    rerender({
      allResources: SAMPLE_RESOURCES.filter((r) => r.bestLanguageName === 'English'),
      selectedResourceIds: [],
    });

    expect(screen.getByText('No resources match the current filters.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear filters' })).toBeInTheDocument();
  });

  // The button lives inside the region it removes, so without a deliberate move focus falls to
  // `<body>` and a keyboard user restarts from the top of the dialog.
  it('moves focus to the search box when Clear filters removes itself', () => {
    renderDialog();
    const searchInput = screen.getByPlaceholderText('Search resources…');
    fireEvent.change(searchInput, { target: { value: 'zzznomatch' } });

    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));

    expect(document.activeElement).toBe(searchInput);
  });

  it('reports a failed catalog fetch instead of claiming there are no results', () => {
    renderDialog({ allResources: [], hasResourcesError: true });

    expect(screen.getByText("Couldn't load the list of available resources.")).toBeInTheDocument();
    expect(screen.queryByText('No results found')).not.toBeInTheDocument();
  });

  it('offers a retry that re-drives the fetch when the catalog fetch failed', () => {
    const onRetryResources = vi.fn();
    renderDialog({ allResources: [], hasResourcesError: true, onRetryResources });

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(onRetryResources).toHaveBeenCalledTimes(1);
  });

  it('shows the loading spinner rather than the error while the fetch is still running', () => {
    renderDialog({ allResources: [], isResourcesLoading: true, hasResourcesError: true });

    expect(
      screen.queryByText("Couldn't load the list of available resources."),
    ).not.toBeInTheDocument();
  });

  it('filters all sections by search text', () => {
    renderDialog();
    const searchInput = screen.getByPlaceholderText('Search resources…');
    // "ESV" should only match the ESV resource
    fireEvent.change(searchInput, { target: { value: 'ESV' } });
    expect(screen.getByText('ESV')).toBeInTheDocument();
    expect(screen.queryByText('KJV')).not.toBeInTheDocument();
    expect(screen.queryByText('NIV')).not.toBeInTheDocument();
  });

  it('filters by resourceType when provided', () => {
    renderDialog({ resourceType: 'XmlResource' });
    // Only UBS HB and SIL TNN are XmlResource
    expect(screen.getByText('UBS HB')).toBeInTheDocument();
    expect(screen.getByText('SIL TNN')).toBeInTheDocument();
    expect(screen.queryByText('NIV')).not.toBeInTheDocument();
    expect(screen.queryByText('ESV')).not.toBeInTheDocument();
  });

  it('shows all resources when resourceType is not provided', () => {
    renderDialog({ resourceType: undefined });
    expect(screen.getByText('NIV')).toBeInTheDocument();
    expect(screen.getByText('ESV')).toBeInTheDocument();
    expect(screen.getByText('UBS HB')).toBeInTheDocument();
  });

  it('shows no Already Selected section when selectedResourceIds is empty', () => {
    renderDialog({ selectedResourceIds: [] });
    expect(screen.queryByText('Already selected')).not.toBeInTheDocument();
  });

  it('renders only the first 50 "Available to Download" resources when there are more than 50', () => {
    const manyResources = Array.from({ length: 60 }, (_, i) => ({
      dblEntryUid: `dl-${i}`,
      displayName: `RES-${i}`,
      fullName: `Resource ${i}`,
      bestLanguageName: 'English',
      type: 'ScriptureResource' as const,
      size: 1_000_000,
      installed: false,
      updateAvailable: false,
      projectId: `prj-${i}`,
    }));
    renderDialog({ allResources: manyResources, selectedResourceIds: [] });
    expect(screen.getByText('RES-49')).toBeInTheDocument();
    expect(screen.queryByText('RES-50')).not.toBeInTheDocument();
  });
  it('selects an installed resource by default', () => {
    const { onSelect } = renderDialog();
    const esvRow = screen.getByText('ESV').closest('tr');
    if (!esvRow) throw new Error('ESV row not found');
    fireEvent.click(esvRow);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ dblEntryUid: 'installed-1' }));
  });

  it('does not select an installed resource when allowSelectingInstalled is false', () => {
    const { onSelect } = renderDialog({ allowSelectingInstalled: false });
    const esvRow = screen.getByText('ESV').closest('tr');
    if (!esvRow) throw new Error('ESV row not found');
    fireEvent.click(esvRow);
    expect(onSelect).not.toHaveBeenCalled();
    expect(esvRow.className).toContain('pointer-events-none');
  });

  // Only the Installed section is affected — a caller that cannot use an on-disk resource can
  // still install a new one, which is the whole point of leaving the picker open.
  it('still selects a downloadable resource when allowSelectingInstalled is false', () => {
    const { onSelect } = renderDialog({ allowSelectingInstalled: false });
    const nltRow = screen.getByText('NLT').closest('tr');
    if (!nltRow) throw new Error('NLT row not found');
    fireEvent.click(nltRow);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ installed: false }));
  });

  it('renders a notice above the resource list when one is provided', () => {
    renderDialog({ notice: 'Only resources already on this computer are shown.' });
    expect(
      screen.getByText('Only resources already on this computer are shown.'),
    ).toBeInTheDocument();
  });

  // Assistive tech announces mutations to a live region already in the accessibility tree, so the
  // region has to outlive the notice it carries rather than appear along with it.
  it('keeps the notice live region mounted and empty when there is no notice', () => {
    renderDialog();
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('puts the notice inside that same live region', () => {
    renderDialog({ notice: 'Only resources already on this computer are shown.' });
    expect(screen.getByRole('status')).toHaveTextContent(
      'Only resources already on this computer are shown.',
    );
    // `Alert` carries an assertive role of its own, which would nest a second live region inside
    // the polite one and announce the notice twice.
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  // The notice explains an INCOMPLETE list; the error state is for having nothing to show. A
  // failure that still left rows on screen must not replace them.
  it('keeps the list and shows a notice when a fetch failed but rows still loaded', () => {
    renderDialog({
      hasResourcesError: true,
      notice: 'Only resources already on this computer are shown.',
    });

    expect(screen.getByText('NIV')).toBeInTheDocument();
    expect(
      screen.queryByText("Couldn't load the list of available resources."),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(
      'Only resources already on this computer are shown.',
    );
  });
});
