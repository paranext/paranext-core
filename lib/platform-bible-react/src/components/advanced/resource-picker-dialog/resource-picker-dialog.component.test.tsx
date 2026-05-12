import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Dialog } from '@/components/shadcn-ui/dialog';
import ResourcePickerDialog, {
  ResourcePickerDialogLocalizedStrings,
} from './resource-picker-dialog.component';
import { SAMPLE_RESOURCES, SAMPLE_SELECTED_IDS } from './resource-picker-dialog.data';

const STRINGS: ResourcePickerDialogLocalizedStrings = {
  '%resourcePicker_title%': 'Resource Picker',
  '%resourcePicker_section_already_selected%': 'Already Selected',
  '%resourcePicker_section_installed%': 'Installed',
  '%resourcePicker_section_available_to_download%': 'Available to Download',
  '%resourcePicker_button_use%': 'Use',
  '%resourcePicker_no_results%': 'No results found',
  '%resourcePicker_search_placeholder%': 'Search resources...',
  '%resourcePicker_language_filter_any%': 'Any language',
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
    expect(screen.getByText('Already Selected')).toBeInTheDocument();
    expect(screen.getByText('NIV')).toBeInTheDocument();
    expect(screen.getByText('RVR60')).toBeInTheDocument();
  });

  it('does not show Use or Download buttons for already-selected resources', () => {
    renderDialog();
    // NIV and RVR60 are already selected — their rows must not have action buttons
    const rows = screen.getAllByText(/NIV|RVR60/);
    rows.forEach((row) => {
      const rowContainer = row.closest('div');
      expect(rowContainer?.querySelector('button')).toBeNull();
    });
  });

  it('shows "Installed" section with Use buttons for installed, non-selected resources', () => {
    renderDialog();
    expect(screen.getByText('Installed')).toBeInTheDocument();
    expect(screen.getByText('ESV')).toBeInTheDocument();
    expect(screen.getByText('KJV')).toBeInTheDocument();
    const useButtons = screen.getAllByRole('button', { name: 'Use' });
    expect(useButtons.length).toBeGreaterThan(0);
  });

  it('shows "Available to Download" section with Use buttons for uninstalled resources', () => {
    renderDialog();
    expect(screen.getByText('Available to Download')).toBeInTheDocument();
    expect(screen.getByText('NLT')).toBeInTheDocument();
    // All action buttons (installed + to-download) use the same "Use" label
    const useButtons = screen.getAllByRole('button', { name: 'Use' });
    expect(useButtons.length).toBeGreaterThan(0);
  });

  it('calls onSelect with an installed resource when its Use button is clicked', () => {
    const { onSelect } = renderDialog();
    // Find the Use button next to ESV (installed, not selected)
    const esvText = screen.getByText('ESV');
    const esvRow = esvText.closest('div[class*="resource-row"], div')!;
    const useBtn = esvRow.querySelector('button');
    fireEvent.click(useBtn!);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ dblEntryUid: 'installed-1' }));
  });

  it('calls onSelect with an uninstalled resource when its Use button is clicked', () => {
    const { onSelect } = renderDialog();
    // Find the Use button next to NLT (uninstalled)
    const nltText = screen.getByText('NLT');
    const nltRow = nltText.closest('div[class*="resource-row"], div')!;
    const useBtn = nltRow.querySelector('button');
    fireEvent.click(useBtn!);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ dblEntryUid: 'download-1' }));
  });

  it('shows "No results found" when search matches nothing', () => {
    renderDialog();
    const searchInput = screen.getByPlaceholderText('Search resources...');
    fireEvent.change(searchInput, { target: { value: 'zzznomatch' } });
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.queryByText('Already Selected')).not.toBeInTheDocument();
    expect(screen.queryByText('Installed')).not.toBeInTheDocument();
    expect(screen.queryByText('Available to Download')).not.toBeInTheDocument();
  });

  it('filters all sections by search text', () => {
    renderDialog();
    const searchInput = screen.getByPlaceholderText('Search resources...');
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
    expect(screen.queryByText('Already Selected')).not.toBeInTheDocument();
  });
});
