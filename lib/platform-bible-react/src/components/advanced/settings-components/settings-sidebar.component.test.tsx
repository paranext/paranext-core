// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it } from 'vitest';
import { SidebarProvider } from '@/components/shadcn-ui/sidebar';
import {
  SettingsSidebar,
  type ProjectInfo,
} from '@/components/advanced/settings-components/settings-sidebar.component';

// jsdom ships neither ResizeObserver nor these Element methods. cmdk (inside the picker's popover)
// constructs a ResizeObserver on mount, Radix's PopoverContent calls scrollTo when it focuses
// children, and the picker scrolls the selected row into view when it opens. No-op stubs suffice —
// these tests assert nothing about layout.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  if (typeof Element.prototype.scrollTo !== 'function') {
    Element.prototype.scrollTo = () => {};
  }
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

const PROJECTS: ProjectInfo[] = [
  { projectId: 'web', projectName: 'World English Bible' },
  { projectId: 'kjv', projectName: 'King James Version' },
];

const PROJECTS_GROUP_LABEL = 'Projects';

// Distinct from the picker's own English `buttonPlaceholder` default ('Select a project'), so a
// trigger assertion goes red if the sidebar ever stops supplying its own copy.
const TRIGGER_PLACEHOLDER = 'Choose a project';

/** Radix popovers and cmdk need pointer-event sequences jsdom does not synthesize on its own. */
const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 });

/** The sidebar with the minimum wiring it needs; it must live inside a SidebarProvider. */
function sidebar(popoverStrings?: { searchPlaceholderText?: string; noResultsText?: string }) {
  return (
    <SidebarProvider>
      <SettingsSidebar
        extensionLabels={{ 'platform.settings': 'Platform' }}
        projectInfo={PROJECTS}
        handleSelectSidebarItem={() => {}}
        selectedSidebarItem={{ label: 'platform.settings' }}
        extensionsSidebarGroupLabel="Extensions"
        projectsSidebarGroupLabel={PROJECTS_GROUP_LABEL}
        buttonPlaceholderText={TRIGGER_PLACEHOLDER}
        searchPlaceholderText={popoverStrings?.searchPlaceholderText}
        noResultsText={popoverStrings?.noResultsText}
      />
    </SidebarProvider>
  );
}

describe('SettingsSidebar project picker', () => {
  it('offers no group-by control in the project picker', async () => {
    const user = setupUser();
    render(sidebar());

    await user.click(screen.getByRole('combobox', { name: PROJECTS_GROUP_LABEL }));

    // The sidebar supplies no `availableGroupings` and no open tabs, which leaves the picker too
    // few groupings to be worth a menu. The absence of the "Group by" button is the load-bearing
    // assertion: it is the only control that opens the grouping menu.
    expect(await screen.findByText('World English Bible')).toBeInTheDocument();
    expect(screen.queryByLabelText('Group by')).not.toBeInTheDocument();
  });

  it('leaves the popover on its English defaults when no strings are supplied', async () => {
    const user = setupUser();
    render(sidebar());

    await user.click(screen.getByRole('combobox', { name: PROJECTS_GROUP_LABEL }));

    const search = await screen.findByPlaceholderText('Search projects & resources');
    await user.type(search, 'zzzz');

    expect(await screen.findByText('No projects found')).toBeInTheDocument();
  });

  it('localizes the popover from the supplied strings', async () => {
    const user = setupUser();
    render(
      sidebar({
        searchPlaceholderText: 'Buscar proyectos y recursos',
        noResultsText: 'No se encontraron proyectos',
      }),
    );

    await user.click(screen.getByRole('combobox', { name: PROJECTS_GROUP_LABEL }));

    const search = await screen.findByPlaceholderText('Buscar proyectos y recursos');
    expect(screen.queryByPlaceholderText('Search projects & resources')).not.toBeInTheDocument();

    await user.type(search, 'zzzz');
    expect(await screen.findByText('No se encontraron proyectos')).toBeInTheDocument();
  });

  it("keeps the trigger on the sidebar's own placeholder and accessible name", async () => {
    render(
      sidebar({
        searchPlaceholderText: 'Buscar proyectos y recursos',
        noResultsText: 'No se encontraron proyectos',
      }),
    );

    // The popover strings and the trigger's copy are separate channels; supplying the former must
    // not displace the latter.
    expect(screen.getByRole('combobox', { name: PROJECTS_GROUP_LABEL })).toHaveTextContent(
      TRIGGER_PLACEHOLDER,
    );
  });
});
