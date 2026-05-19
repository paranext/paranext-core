import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Dialog } from '@/components/shadcn-ui/dialog';
import ResourcePickerDialog, {
  RESOURCE_PICKER_DIALOG_STRING_KEYS,
  ResourcePickerDialogLocalizedStrings,
} from './resource-picker-dialog.component';
import { SAMPLE_RESOURCES, SAMPLE_SELECTED_IDS } from './resource-picker-dialog.data';

// Build a complete localized-strings map from the key set so any new key gets exercised. Each
// key starts out mapped to itself; the overrides below replace the strings we assert on by
// visible text.
const STRINGS: ResourcePickerDialogLocalizedStrings = {};
RESOURCE_PICKER_DIALOG_STRING_KEYS.forEach((k) => {
  STRINGS[k] = k;
});
STRINGS['%resourcePicker_title%'] = 'Resource picker';
STRINGS['%resourcePicker_group_included%'] = 'Included';
STRINGS['%resourcePicker_group_installed%'] = 'On your computer';
STRINGS['%resourcePicker_group_available%'] = 'Available to download';
STRINGS['%resourcePicker_search_placeholder%'] = 'Search resources…';
STRINGS['%resourcePicker_empty_noMatches%'] = 'No results found';

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
  it('shows the dialog title', () => {
    renderDialog();
    expect(screen.getByText('Resource picker')).toBeInTheDocument();
  });

  it('shows the Included group with the already-selected resources', () => {
    renderDialog();
    expect(screen.getByText('Included')).toBeInTheDocument();
    // NIV and RVR60 are the two selected resources in SAMPLE_SELECTED_IDS.
    expect(screen.getByText('New International Version')).toBeInTheDocument();
    expect(screen.getByText('Reina Valera 1960')).toBeInTheDocument();
  });

  it('shows On-your-computer and Available-to-download groups', () => {
    renderDialog();
    expect(screen.getByText('On your computer')).toBeInTheDocument();
    expect(screen.getByText('Available to download')).toBeInTheDocument();
    // ESV is installed and not selected → shows in "On your computer"
    expect(screen.getByText('English Standard Version')).toBeInTheDocument();
    // NLT is uninstalled → shows in "Available to download"
    expect(screen.getByText('New Living Translation')).toBeInTheDocument();
  });

  it('calls onSelect with the resource when an installed (non-selected) row is clicked', () => {
    const { onSelect } = renderDialog();
    fireEvent.click(screen.getByText('English Standard Version'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ dblEntryUid: 'installed-1' }));
  });

  it('calls onSelect with the resource when an available (uninstalled) row is clicked', () => {
    const { onSelect } = renderDialog();
    fireEvent.click(screen.getByText('New Living Translation'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ dblEntryUid: 'download-1' }));
  });

  it('does not call onSelect when a row in the Included group is clicked', () => {
    const { onSelect } = renderDialog();
    // Clicking an already-included row emits toggleDisplay, which the dialog ignores.
    fireEvent.click(screen.getByText('New International Version'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('does not expose a remove (X) button on included rows', () => {
    renderDialog();
    // allowRemove={false} → no X button anywhere.
    expect(screen.queryByRole('button', { name: /remove from project/i })).not.toBeInTheDocument();
  });

  it('shows the no-matches empty state when search matches nothing', () => {
    renderDialog();
    fireEvent.change(screen.getByPlaceholderText('Search resources…'), {
      target: { value: 'zzznomatch' },
    });
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.queryByText('Included')).not.toBeInTheDocument();
    expect(screen.queryByText('On your computer')).not.toBeInTheDocument();
    expect(screen.queryByText('Available to download')).not.toBeInTheDocument();
  });

  it('filters resources by search text', () => {
    renderDialog();
    fireEvent.change(screen.getByPlaceholderText('Search resources…'), {
      target: { value: 'ESV' },
    });
    expect(screen.getByText('English Standard Version')).toBeInTheDocument();
    expect(screen.queryByText('King James Version')).not.toBeInTheDocument();
    expect(screen.queryByText('New International Version')).not.toBeInTheDocument();
  });

  it('filters by resourceType when provided', () => {
    renderDialog({ resourceType: 'XmlResource' });
    expect(screen.getByText('UBS Handbook')).toBeInTheDocument();
    expect(screen.getByText('SIL Translation Notes and Drafts')).toBeInTheDocument();
    expect(screen.queryByText('New International Version')).not.toBeInTheDocument();
    expect(screen.queryByText('English Standard Version')).not.toBeInTheDocument();
  });

  it('shows resources of all types when resourceType is not provided', () => {
    renderDialog({ resourceType: undefined });
    expect(screen.getByText('New International Version')).toBeInTheDocument();
    expect(screen.getByText('English Standard Version')).toBeInTheDocument();
    expect(screen.getByText('UBS Handbook')).toBeInTheDocument();
  });

  it('omits the Included group when selectedResourceIds is empty', () => {
    renderDialog({ selectedResourceIds: [] });
    expect(screen.queryByText('Included')).not.toBeInTheDocument();
    expect(screen.getByText('On your computer')).toBeInTheDocument();
  });

  it('hides the listbox and group labels when isResourcesLoading is true', () => {
    renderDialog({ isResourcesLoading: true });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    // The loading branch swaps the picker for a spinner — none of the group labels should
    // render. The spinner itself may have no explicit role, so we assert on the picker's
    // absence rather than the spinner's presence.
    expect(screen.queryByText('Included')).not.toBeInTheDocument();
    expect(screen.queryByText('On your computer')).not.toBeInTheDocument();
    expect(screen.queryByText('Available to download')).not.toBeInTheDocument();
  });

  it('renders rows inside a listbox region', () => {
    renderDialog();
    const listbox = screen.getByRole('listbox');
    expect(within(listbox).getByText('English Standard Version')).toBeInTheDocument();
  });
});
