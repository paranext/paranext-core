import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, beforeAll, afterAll } from 'vitest';
import { Dialog } from '@/components/shadcn-ui/dialog';
import ResourcePickerDialog, {
  ResourcePickerDialogLocalizedStrings,
} from './resource-picker-dialog.component';
import { SAMPLE_RESOURCES, SAMPLE_SELECTED_IDS } from './resource-picker-dialog.data';

// jsdom does not implement IntersectionObserver — stub it so the hook can mount
beforeAll(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn(() => ({ observe: vi.fn(), disconnect: vi.fn() })),
  );
});
afterAll(() => {
  vi.unstubAllGlobals();
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
  '%resourcePicker_no_results_filtered%': 'No resources match your search.',
  '%resourcePicker_clear_filters%': 'Clear filters',
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
    expect(screen.getByText('No resources match your search.')).toBeInTheDocument();
    expect(screen.queryByText('No results found')).not.toBeInTheDocument();
    expect(screen.queryByText('Already selected')).not.toBeInTheDocument();
    expect(screen.queryByText('Installed')).not.toBeInTheDocument();
    expect(screen.queryByText('Available to download')).not.toBeInTheDocument();
  });

  it('restores the full list when the filters are cleared', () => {
    renderDialog();
    fireEvent.change(screen.getByPlaceholderText('Search resources…'), {
      target: { value: 'zzznomatch' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));

    expect(screen.queryByText('No resources match your search.')).not.toBeInTheDocument();
    expect(screen.getByText('NIV')).toBeInTheDocument();
  });

  it('keeps the plain no-results text when the catalog is empty with no filter applied', () => {
    renderDialog({ allResources: [], selectedResourceIds: [] });

    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear filters' })).not.toBeInTheDocument();
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
});
