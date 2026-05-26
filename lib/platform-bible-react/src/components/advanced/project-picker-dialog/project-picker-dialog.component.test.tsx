import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Dialog } from '@/components/shadcn-ui/dialog';
import ProjectPickerDialog, {
  type ProjectItem,
  type ProjectPickerDialogLocalizedStrings,
} from './project-picker-dialog.component';

const STRINGS: ProjectPickerDialogLocalizedStrings = {
  '%projectPicker_title%': 'Project Picker',
  '%projectPicker_section_recent%': 'Recent',
  '%projectPicker_section_all%': 'All projects',
  '%projectPicker_search_placeholder%': 'Search projects...',
  '%projectPicker_no_results%': 'No projects found',
};

const WEB: ProjectItem = {
  id: 'web',
  fullName: 'World English Bible',
  shortName: 'WEB',
  language: 'English',
};
const KJV: ProjectItem = {
  id: 'kjv',
  fullName: 'King James Version',
  shortName: 'KJV',
  language: 'English',
};
const RVR: ProjectItem = {
  id: 'rvr',
  fullName: 'Reina Valera',
  shortName: 'RVR',
  language: 'Spanish',
};

function renderDialog(overrides: Partial<Parameters<typeof ProjectPickerDialog>[0]> = {}) {
  const onSelect = vi.fn();
  render(
    <Dialog open>
      <ProjectPickerDialog
        currentProject={WEB}
        recentProjects={[WEB]}
        allProjects={[KJV, RVR]}
        onSelect={onSelect}
        localizedStrings={STRINGS}
        {...overrides}
      />
    </Dialog>,
  );
  return { onSelect };
}

describe('ProjectPickerDialog', () => {
  it('renders the dialog title', () => {
    renderDialog();
    expect(screen.getByText('Project Picker')).toBeInTheDocument();
  });

  it('shows Recent section heading when recentProjects is populated', () => {
    renderDialog();
    expect(screen.getByText('Recent')).toBeInTheDocument();
  });

  it('omits Recent section when recentProjects is empty', () => {
    renderDialog({ recentProjects: [] });
    expect(screen.queryByText('Recent')).not.toBeInTheDocument();
  });

  it('shows All projects section', () => {
    renderDialog();
    expect(screen.getByText('All projects')).toBeInTheDocument();
  });

  it('renders project as "Full Name (Short)"', () => {
    renderDialog();
    expect(screen.getByText('World English Bible')).toBeInTheDocument();
    expect(screen.getByText('WEB')).toBeInTheDocument();
  });

  it('pins current project to top of Recent section', () => {
    const OTHER: ProjectItem = {
      id: 'other',
      fullName: 'Other Bible',
      shortName: 'OTH',
    };
    renderDialog({ recentProjects: [OTHER, WEB], currentProject: WEB });
    const rows = screen.getAllByRole('row');
    const webIndex = rows.findIndex((r) => r.textContent?.includes('World English Bible'));
    const otherIndex = rows.findIndex((r) => r.textContent?.includes('Other Bible'));
    expect(webIndex).toBeLessThan(otherIndex);
  });

  it('calls onSelect with the project id when a row is clicked', () => {
    const { onSelect } = renderDialog();
    fireEvent.click(screen.getByText('King James Version'));
    expect(onSelect).toHaveBeenCalledWith('kjv');
  });

  it('filters both sections by search text (fullName match)', () => {
    renderDialog();
    fireEvent.change(screen.getByPlaceholderText('Search projects...'), {
      target: { value: 'Reina' },
    });
    expect(screen.getByText('Reina Valera')).toBeInTheDocument();
    expect(screen.queryByText('King James Version')).not.toBeInTheDocument();
    expect(screen.queryByText('World English Bible')).not.toBeInTheDocument();
  });

  it('filters by shortName match', () => {
    renderDialog();
    fireEvent.change(screen.getByPlaceholderText('Search projects...'), {
      target: { value: 'KJV' },
    });
    expect(screen.getByText('King James Version')).toBeInTheDocument();
    expect(screen.queryByText('World English Bible')).not.toBeInTheDocument();
  });

  it('filters by language match', () => {
    renderDialog();
    fireEvent.change(screen.getByPlaceholderText('Search projects...'), {
      target: { value: 'Spanish' },
    });
    expect(screen.getByText('Reina Valera')).toBeInTheDocument();
    expect(screen.queryByText('King James Version')).not.toBeInTheDocument();
  });

  it('shows "No projects found" when search matches nothing', () => {
    renderDialog();
    fireEvent.change(screen.getByPlaceholderText('Search projects...'), {
      target: { value: 'zzznomatch' },
    });
    expect(screen.getByText('No projects found')).toBeInTheDocument();
    expect(screen.queryByText('Recent')).not.toBeInTheDocument();
    expect(screen.queryByText('All projects')).not.toBeInTheDocument();
  });

  it('shows a spinner when isLoading is true', () => {
    renderDialog({ isLoading: true });
    expect(screen.queryByText('World English Bible')).not.toBeInTheDocument();
  });
});
