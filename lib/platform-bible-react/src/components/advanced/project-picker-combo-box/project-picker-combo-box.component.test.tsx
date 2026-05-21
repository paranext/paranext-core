import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import {
  ProjectPickerComboBox,
  type ProjectOption,
} from './project-picker-combo-box.component';

// Radix Popover uses ResizeObserver; jsdom doesn't provide it
beforeAll(() => {
  global.ResizeObserver = class {
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  };
  // cmdk calls scrollIntoView which jsdom doesn't implement
  Element.prototype.scrollIntoView = vi.fn();
});

const alpha: ProjectOption = { id: 'proj-1', name: 'Project Alpha' };
const beta: ProjectOption = { id: 'proj-2', name: 'Project Beta' };
const gamma: ProjectOption = { id: 'proj-3', name: 'Project Gamma' };

describe('ProjectPickerComboBox', () => {
  it('shows the current project name on the trigger button', () => {
    render(
      <ProjectPickerComboBox
        currentProject={alpha}
        recentProjects={[]}
        allProjects={[alpha, beta]}
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByRole('combobox')).toHaveTextContent('Project Alpha');
  });

  it('shows placeholder and is disabled when isLoading is true', () => {
    render(
      <ProjectPickerComboBox
        currentProject={undefined}
        recentProjects={[]}
        allProjects={[]}
        onSelect={vi.fn()}
        isLoading
      />,
    );
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('renders both section headings when recentProjects is populated', () => {
    render(
      <ProjectPickerComboBox
        currentProject={alpha}
        recentProjects={[alpha]}
        allProjects={[beta]}
        onSelect={vi.fn()}
        localizedStrings={{ recentProjectsHeading: 'Recent', allProjectsHeading: 'All projects' }}
      />,
    );
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('Recent')).toBeInTheDocument();
    expect(screen.getByText('All projects')).toBeInTheDocument();
  });

  it('omits the Recent section when recentProjects is empty', () => {
    render(
      <ProjectPickerComboBox
        currentProject={alpha}
        recentProjects={[]}
        allProjects={[alpha, beta]}
        onSelect={vi.fn()}
        localizedStrings={{ recentProjectsHeading: 'Recent', allProjectsHeading: 'All projects' }}
      />,
    );
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByText('Recent')).not.toBeInTheDocument();
    expect(screen.getByText('All projects')).toBeInTheDocument();
  });

  it('calls onSelect with the correct project id when an item is clicked', () => {
    const onSelect = vi.fn();
    render(
      <ProjectPickerComboBox
        currentProject={alpha}
        recentProjects={[]}
        allProjects={[alpha, beta, gamma]}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('Project Beta'));
    expect(onSelect).toHaveBeenCalledWith('proj-2');
  });
});
