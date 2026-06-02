import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { Dialog } from 'platform-bible-react';
import {
  ResourcePickerDialog,
  ResourcePickerDialogLocalizedStrings,
  useProgressiveList,
} from './resource-picker.dialog';
import { SAMPLE_RESOURCES, SAMPLE_SELECTED_IDS } from './resource-picker.dialog.stories';

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

type IOCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;
let ioCallback: IOCallback;
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

describe('useProgressiveList', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn((cb: IOCallback) => {
        ioCallback = cb;
        return { observe: mockObserve, disconnect: mockDisconnect };
      }),
    );
  });

  afterEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn(() => ({ observe: vi.fn(), disconnect: vi.fn() })),
    );
    vi.clearAllMocks();
  });

  const makeItems = (count: number) => Array.from({ length: count }, (_, i) => i);

  it('returns the first pageSize items initially and reports hasMore', () => {
    const items = makeItems(120);
    const { result } = renderHook(() => useProgressiveList(items, 50));

    expect(result.current.visibleItems).toHaveLength(50);
    expect(result.current.visibleItems[0]).toBe(0);
    expect(result.current.visibleItems[49]).toBe(49);
    expect(result.current.hasMore).toBe(true);
  });

  it('appends the next page when the sentinel intersects', () => {
    const items = makeItems(120);
    const { result } = renderHook(() => useProgressiveList(items, 50));

    act(() => {
      ioCallback([{ isIntersecting: true }]);
    });

    expect(result.current.visibleItems).toHaveLength(100);
    expect(result.current.hasMore).toBe(true);
  });

  it('resets to the first page when the items array reference changes', () => {
    const first = makeItems(120);
    const { result, rerender } = renderHook(({ items }) => useProgressiveList(items, 50), {
      initialProps: { items: first },
    });

    act(() => {
      ioCallback([{ isIntersecting: true }]);
    });
    expect(result.current.visibleItems).toHaveLength(100);

    const second = makeItems(80);
    rerender({ items: second });

    expect(result.current.visibleItems).toHaveLength(50);
  });

  it('sets hasMore to false and caps visibleItems at items.length when list is small', () => {
    const items = makeItems(20);
    const { result } = renderHook(() => useProgressiveList(items, 50));

    expect(result.current.visibleItems).toHaveLength(20);
    expect(result.current.hasMore).toBe(false);
  });

  it('does not advance the page when the sentinel fires with isIntersecting false', () => {
    const items = makeItems(120);
    const { result } = renderHook(() => useProgressiveList(items, 50));

    act(() => {
      ioCallback([{ isIntersecting: false }]);
    });

    expect(result.current.visibleItems).toHaveLength(50);
  });
});
