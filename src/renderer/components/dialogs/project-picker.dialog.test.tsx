import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Dialog } from 'platform-bible-react';
import type { ProjectItem } from '@renderer/components/projects/project-picker.component';
import { PROJECT_PICKER_DIALOG } from '@renderer/components/dialogs/project-picker.dialog';
import { useProjectPickerData } from '@renderer/hooks/use-project-picker-data.hook';

// The hook is shared with the Simple toolbar picker, which keeps unsupported projects as disabled
// rows (see platform-bible-toolbar.test.tsx). Stubbing it here pins that the dialog wrapper, not the
// hook, is what leaves them out.
vi.mock('@renderer/hooks/use-project-picker-data.hook', () => ({
  useProjectPickerData: vi.fn(),
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn((keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, key])),
    false,
  ]),
}));

// jsdom implements no ResizeObserver (the row tooltip's popper wires one) and no `scrollIntoView`
// (the listbox's keyboard navigation calls it whenever a row takes focus).
const originalScrollIntoView = Element.prototype.scrollIntoView;
beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
  Element.prototype.scrollIntoView = vi.fn();
});
afterAll(() => {
  vi.unstubAllGlobals();
  Element.prototype.scrollIntoView = originalScrollIntoView;
});

const UNSUPPORTED_REASON = '%project_unsupported_studyBibleAdditions%';

const RECENT_OPENABLE: ProjectItem = { id: 'recent-ok', shortName: 'ROK', fullName: 'Recent Ok' };
const RECENT_SBA: ProjectItem = {
  id: 'recent-sba',
  shortName: 'RSBA',
  fullName: 'Recent Study Bible Additions',
  unsupportedReason: UNSUPPORTED_REASON,
};
const ALL_OPENABLE: ProjectItem = { id: 'all-ok', shortName: 'AOK', fullName: 'All Ok' };
const ALL_SBA: ProjectItem = {
  id: 'all-sba',
  shortName: 'ASBA',
  fullName: 'All Study Bible Additions',
  unsupportedReason: UNSUPPORTED_REASON,
};

const { Component: ProjectPickerDialog } = PROJECT_PICKER_DIALOG;

describe('ProjectPickerDialog', () => {
  it('leaves out projects that cannot be opened from both sections', () => {
    vi.mocked(useProjectPickerData).mockReturnValue({
      currentSimpleProject: undefined,
      recentProjects: [RECENT_OPENABLE, RECENT_SBA],
      allProjects: [ALL_OPENABLE, ALL_SBA],
      currentSimpleProjectError: undefined,
      isLoading: false,
    });

    render(
      <Dialog open>
        <ProjectPickerDialog
          isDialog
          submitDialog={vi.fn()}
          cancelDialog={vi.fn()}
          rejectDialog={vi.fn()}
        />
      </Dialog>,
    );

    const rows = screen.getAllByRole('option');
    expect(rows).toHaveLength(2);
    expect(screen.getByText('Recent Ok')).toBeInTheDocument();
    expect(screen.getByText('All Ok')).toBeInTheDocument();
    expect(screen.queryByText('Recent Study Bible Additions')).not.toBeInTheDocument();
    expect(screen.queryByText('All Study Bible Additions')).not.toBeInTheDocument();
  });
});
