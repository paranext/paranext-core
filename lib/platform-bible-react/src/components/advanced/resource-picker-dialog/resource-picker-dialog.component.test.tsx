import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, beforeAll, afterAll } from 'vitest';
import { Dialog } from '@/components/shadcn-ui/dialog';
import ResourcePickerDialog, {
  ResourcePickerDialogLocalizedStrings,
} from './resource-picker-dialog.component';
import {
  MANY_LANGUAGE_RESOURCES,
  SAMPLE_RESOURCES,
  SAMPLE_SELECTED_IDS,
} from './resource-picker-dialog.data';

// jsdom implements none of what opening the language list needs: IntersectionObserver for the
// progressive-list hook, ResizeObserver for cmdk's command list, and scrollIntoView for the option
// cmdk highlights. Stubbed per file rather than globally — components that feature-detect
// ResizeObserver take a different path when one exists, so defining it for every suite would
// change what unrelated tests measure.
beforeAll(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn(() => ({ observe: vi.fn(), disconnect: vi.fn() })),
  );
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
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
  '%resourcePicker_language_filter_search_placeholder%': 'Search languages…',
  '%resourcePicker_language_filter_no_results%': 'No languages found',
  '%resourcePicker_showing_count%': 'Showing {filtered} of {total} resources',
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

  it('shows "No results found" when search matches nothing', () => {
    renderDialog();
    const searchInput = screen.getByPlaceholderText('Search resources…');
    fireEvent.change(searchInput, { target: { value: 'zzznomatch' } });
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.queryByText('Already selected')).not.toBeInTheDocument();
    expect(screen.queryByText('Installed')).not.toBeInTheDocument();
    expect(screen.queryByText('Available to download')).not.toBeInTheDocument();
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

  it('still renders the resource list when a notice is shown', () => {
    renderDialog({ notice: 'Only resources already on this computer are shown.' });
    expect(screen.getByText('ESV')).toBeInTheDocument();
    expect(screen.getByText('Available to download')).toBeInTheDocument();
  });

  it('still renders the no-results message when a notice is shown', () => {
    renderDialog({ notice: 'Only resources already on this computer are shown.' });
    const searchInput = screen.getByPlaceholderText('Search resources…');
    fireEvent.change(searchInput, { target: { value: 'zzznomatch' } });
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(
      screen.getByText('Only resources already on this computer are shown.'),
    ).toBeInTheDocument();
  });

  describe('language filter', () => {
    // Once the popover is open the cmdk search input carries the combobox role too, so the
    // trigger is identified by being the button.
    const languageTrigger = () => {
      const trigger = screen
        .getAllByRole('combobox')
        .find((element) => element.tagName === 'BUTTON');
      if (!trigger) throw new Error('Language filter trigger not found');
      return trigger;
    };

    const toggleLanguageFilter = () => {
      fireEvent.click(languageTrigger());
      return screen.queryAllByRole('option').map((option) => option.textContent ?? '');
    };

    it('holds the option order steady while the list is open', () => {
      renderDialog({ allResources: MANY_LANGUAGE_RESOURCES, selectedResourceIds: [] });
      const optionsBefore = toggleLanguageFilter();

      // A language far enough down that re-sorting would visibly move it, and unstarred so that
      // selecting it is what would float it up.
      const target = screen.getAllByRole('option')[optionsBefore.length - 1];
      const targetLabel = target.textContent ?? '';
      fireEvent.click(target);

      const optionsAfter = screen.getAllByRole('option').map((option) => option.textContent ?? '');
      expect(optionsAfter).toEqual(optionsBefore);
      expect(optionsAfter[optionsAfter.length - 1]).toBe(targetLabel);
    });

    it('re-sorts the selection to the top the next time the list is opened', () => {
      renderDialog({ allResources: MANY_LANGUAGE_RESOURCES, selectedResourceIds: [] });
      const optionsBefore = toggleLanguageFilter();
      const target = screen.getAllByRole('option')[optionsBefore.length - 1];
      const targetLabel = target.textContent ?? '';
      fireEvent.click(target);

      // Close and reopen: the snapshot refreshes, so the choice is now grouped with the starred
      // languages instead of sitting at the far end of a 130-row list.
      fireEvent.click(languageTrigger());
      const reopened = toggleLanguageFilter();

      expect(reopened.indexOf(targetLabel)).toBeLessThan(optionsBefore.length - 1);
    });
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
