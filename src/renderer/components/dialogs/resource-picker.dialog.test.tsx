import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, beforeAll, afterAll } from 'vitest';
import { Dialog } from 'platform-bible-react';
import { DblResourceData } from 'platform-bible-utils';
import {
  ResourcePickerDialog,
  ResourcePickerDialogLocalizedStrings,
} from './resource-picker.dialog';

const SAMPLE_RESOURCES: DblResourceData[] = [
  {
    dblEntryUid: 'selected-1',
    displayName: 'NIV',
    fullName: 'New International Version',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 12000000,
    installed: true,
    updateAvailable: false,
    projectId: 'prj-niv',
  },
  {
    dblEntryUid: 'selected-2',
    displayName: 'RVR60',
    fullName: 'Reina Valera 1960',
    bestLanguageName: 'Spanish',
    type: 'ScriptureResource',
    size: 9800000,
    installed: true,
    updateAvailable: false,
    projectId: 'prj-rvr',
  },
  {
    dblEntryUid: 'installed-1',
    displayName: 'ESV',
    fullName: 'English Standard Version',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 11500000,
    installed: true,
    updateAvailable: false,
    projectId: 'prj-esv',
  },
  {
    dblEntryUid: 'installed-2',
    displayName: 'KJV',
    fullName: 'King James Version',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 8200000,
    installed: true,
    updateAvailable: true,
    projectId: 'prj-kjv',
  },
  {
    dblEntryUid: 'installed-3',
    displayName: 'UBS-SLR',
    fullName: 'UBS Source Language Resource',
    bestLanguageName: 'Greek',
    type: 'SourceLanguageResource',
    size: 25000000,
    installed: true,
    updateAvailable: false,
    projectId: 'prj-ubsslr',
  },
  {
    dblEntryUid: 'download-1',
    displayName: 'NLT',
    fullName: 'New Living Translation',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 10200000,
    installed: false,
    updateAvailable: false,
    projectId: 'prj-nlt',
  },
  {
    dblEntryUid: 'download-2',
    displayName: 'UBS HB',
    fullName: 'UBS Handbook',
    bestLanguageName: 'English',
    type: 'XmlResource',
    size: 5400000,
    installed: false,
    updateAvailable: false,
    projectId: 'prj-ubshb',
  },
  {
    dblEntryUid: 'download-3',
    displayName: 'BHS',
    fullName: 'Biblia Hebraica Stuttgartensia',
    bestLanguageName: 'Hebrew',
    type: 'SourceLanguageResource',
    size: 18700000,
    installed: false,
    updateAvailable: false,
    projectId: 'prj-bhs',
  },
];

const SAMPLE_SELECTED_IDS: string[] = ['selected-1', 'selected-2'];

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
  '%resourcePicker_section_already_selected%': 'Included',
  '%resourcePicker_section_installed%': 'Installed',
  '%resourcePicker_section_available_to_download%': 'Available to download',
  '%resourcePicker_no_results%': 'No results found',
  '%resourcePicker_search_placeholder%': 'Search resources…',
  '%resourcePicker_language_filter_any%': 'Any language',
  '%resourcePicker_language_filter_multipleSelected%': '{selectCount} languages',
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
  it('shows "Included" section heading with already-selected resource display names', () => {
    renderDialog();
    expect(screen.getByText('Included')).toBeInTheDocument();
    expect(screen.getByText('NIV')).toBeInTheDocument();
    expect(screen.getByText('RVR60')).toBeInTheDocument();
  });

  it('shows full names alongside display names in a second column', () => {
    renderDialog();
    expect(screen.getByText('New International Version')).toBeInTheDocument();
    expect(screen.getByText('Reina Valera 1960')).toBeInTheDocument();
  });

  it('does not call onSelect when an included resource row is clicked', () => {
    const { onSelect } = renderDialog();
    const cell = screen.getByText('NIV');
    const row = cell.closest('tr');
    if (!row) throw new Error('Row not found');
    fireEvent.click(row);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('shows "Installed" section with installed non-selected resources', () => {
    renderDialog();
    expect(screen.getByText('Installed')).toBeInTheDocument();
    expect(screen.getByText('ESV')).toBeInTheDocument();
    expect(screen.getByText('KJV')).toBeInTheDocument();
  });

  it('shows "Available to download" section with uninstalled resources', () => {
    renderDialog();
    expect(screen.getByText('Available to download')).toBeInTheDocument();
    expect(screen.getByText('NLT')).toBeInTheDocument();
  });

  it('calls onSelect with an installed resource when its row is clicked', () => {
    const { onSelect } = renderDialog();
    const cell = screen.getByText('ESV');
    const row = cell.closest('tr');
    if (!row) throw new Error('ESV row not found');
    fireEvent.click(row);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ dblEntryUid: 'installed-1' }));
  });

  it('calls onSelect with an uninstalled resource when its row is clicked', () => {
    const { onSelect } = renderDialog();
    const cell = screen.getByText('NLT');
    const row = cell.closest('tr');
    if (!row) throw new Error('NLT row not found');
    fireEvent.click(row);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ dblEntryUid: 'download-1' }));
  });

  it('shows "No results found" when search matches nothing', () => {
    renderDialog();
    const searchInput = screen.getByPlaceholderText('Search resources…');
    fireEvent.change(searchInput, { target: { value: 'zzznomatch' } });
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.queryByText('Included')).not.toBeInTheDocument();
    expect(screen.queryByText('Installed')).not.toBeInTheDocument();
    expect(screen.queryByText('Available to download')).not.toBeInTheDocument();
  });

  it('filters all sections by search text', () => {
    renderDialog();
    const searchInput = screen.getByPlaceholderText('Search resources…');
    fireEvent.change(searchInput, { target: { value: 'ESV' } });
    expect(screen.getByText('ESV')).toBeInTheDocument();
    expect(screen.queryByText('KJV')).not.toBeInTheDocument();
    expect(screen.queryByText('NIV')).not.toBeInTheDocument();
  });

  it('filters by resourceType when provided', () => {
    renderDialog({ resourceType: 'XmlResource' });
    expect(screen.getByText('UBS HB')).toBeInTheDocument();
    expect(screen.queryByText('NIV')).not.toBeInTheDocument();
    expect(screen.queryByText('ESV')).not.toBeInTheDocument();
  });

  it('shows all resources when resourceType is not provided', () => {
    renderDialog({ resourceType: undefined });
    expect(screen.getByText('NIV')).toBeInTheDocument();
    expect(screen.getByText('ESV')).toBeInTheDocument();
    expect(screen.getByText('UBS HB')).toBeInTheDocument();
  });

  it('shows no Included section when selectedResourceIds is empty', () => {
    renderDialog({ selectedResourceIds: [] });
    expect(screen.queryByText('Included')).not.toBeInTheDocument();
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
