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

/** Radix popovers and cmdk need pointer-event sequences jsdom does not synthesize on its own. */
const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 });

/** The sidebar with the minimum wiring it needs; it must live inside a SidebarProvider. */
function sidebar() {
  return (
    <SidebarProvider>
      <SettingsSidebar
        extensionLabels={{ 'platform.settings': 'Platform' }}
        projectInfo={PROJECTS}
        handleSelectSidebarItem={() => {}}
        selectedSidebarItem={{ label: 'platform.settings' }}
        extensionsSidebarGroupLabel="Extensions"
        projectsSidebarGroupLabel={PROJECTS_GROUP_LABEL}
        buttonPlaceholderText="Select a project"
      />
    </SidebarProvider>
  );
}

describe('SettingsSidebar project picker', () => {
  it('offers no view-options control in the project picker', async () => {
    const user = setupUser();
    render(sidebar());

    await user.click(screen.getByRole('combobox', { name: PROJECTS_GROUP_LABEL }));

    // The sidebar has no open-tab data, so every grouping the menu could offer yields the same flat
    // list. Asserting that the picker's rows render would pass just as happily with the restriction
    // deleted, so the absence of the view-options affordance is the load-bearing assertion: it is
    // the only control that opens the grouping menu.
    expect(await screen.findByText('World English Bible')).toBeInTheDocument();
    expect(screen.queryByLabelText('View options')).not.toBeInTheDocument();
    expect(screen.queryByRole('menuitemradio')).not.toBeInTheDocument();
  });
});
