import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { ProjectList, fetchProjects } from './project-list.component';

const PROJECTS = fetchProjects();

// PT-3924 invariant: a row must never be a nested interactive control - no <button> may be a
// descendant of another <button> (invalid DOM nesting). Asserted on every render path below.
function findNestedButtons(container: HTMLElement) {
  return Array.from(container.querySelectorAll('button')).filter((button) =>
    button.querySelector('button'),
  );
}

describe('ProjectList', () => {
  describe('when isCheckable', () => {
    function renderCheckable(selectedProjectIds: string[] = []) {
      const handleSelectProject = vi.fn();
      const { container } = render(
        <ProjectList
          projects={PROJECTS}
          handleSelectProject={handleSelectProject}
          selectedProjectIds={selectedProjectIds}
          isMultiselect
          isCheckable
        />,
      );
      return { handleSelectProject, container };
    }

    // Regression for PT-3924: a Radix Checkbox renders as <button role="checkbox">, which was
    // nested inside the row's shadcn <button>. <button> may not be a descendant of <button>
    // (invalid DOM nesting -> React validateDOMNesting warning, broken click propagation, a11y).
    it('does not nest a <button> inside another <button>', () => {
      const { container } = renderCheckable(['project-1']);

      expect(findNestedButtons(container)).toHaveLength(0);
    });

    it('still invokes handleSelectProject with the project id when a row is activated', () => {
      const { handleSelectProject } = renderCheckable();

      fireEvent.click(screen.getByRole('checkbox', { name: 'Project 1' }));

      expect(handleSelectProject).toHaveBeenCalledWith('project-1');
    });

    it('reflects the selected state accessibly via aria-checked on the row', () => {
      renderCheckable(['project-1']);

      expect(screen.getByRole('checkbox', { name: 'Project 1' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Project 2' })).not.toBeChecked();
    });
  });

  it('renders each row as a plain button when not checkable, with no nested buttons', () => {
    const handleSelectProject = vi.fn();
    const { container } = render(
      <ProjectList projects={PROJECTS} handleSelectProject={handleSelectProject} />,
    );

    expect(findNestedButtons(container)).toHaveLength(0);

    fireEvent.click(screen.getByRole('button', { name: 'Project 1' }));

    expect(handleSelectProject).toHaveBeenCalledWith('project-1');
  });
});
