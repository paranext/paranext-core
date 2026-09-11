// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {
  ProjectSelector,
  type ProjectSelectorOpenTab,
  type ProjectSelectorProject,
} from '@/components/advanced/project-selector/project-selector.component';

// jsdom doesn't ship ResizeObserver or `Element.prototype.scrollTo`. cmdk (the
// Command primitive used inside the popover) instantiates a ResizeObserver on
// mount, and Radix's PopoverContent calls scrollTo when it focuses children.
// No-op stubs are sufficient; the tests don't assert layout behavior.
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
  // The ProjectSelector's "scroll selected row into view on open" useEffect
  // calls scrollIntoView, which jsdom does not implement.
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
  // jsdom returns a 0-width rect from getBoundingClientRect since it does no layout, which would
  // trip ProjectSelector's auto-narrow observer (threshold 100px) and drop the chevron on every
  // trigger. Stub the trigger button's rect so the default behavior matches production layout;
  // individual narrow-mode tests override this per-instance below.
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
  // Prototype assignment needs an anonymous function expression to preserve `this`.
  // eslint-disable-next-line func-names
  Element.prototype.getBoundingClientRect = function () {
    const rect = originalGetBoundingClientRect.call(this);
    if (this instanceof HTMLElement && this.getAttribute('role') === 'combobox') {
      return { ...rect, width: 200, height: 32 };
    }
    return rect;
  };
});

const SAMPLE_PROJECTS: ProjectSelectorProject[] = [
  { id: 'esvus16', shortName: 'ESVUS16', fullName: 'English Standard Version (US) 2016' },
  { id: 'esv16uk', shortName: 'ESV16UK', fullName: 'English Standard Version (UK) 2016' },
  { id: 'web', shortName: 'WEB', fullName: 'World English Bible' },
];

const SAMPLE_OPEN_TABS: ProjectSelectorOpenTab[] = [];

const HARNESS_STRINGS = { buttonPlaceholder: 'Select a project', ariaLabel: 'Project' };

function ProjectSelectorHarness({ initialSelected }: { initialSelected: string | undefined }) {
  const [projectId, setProjectId] = useState<string | undefined>(initialSelected);
  return (
    <ProjectSelector
      mode="project"
      projects={SAMPLE_PROJECTS}
      openTabs={SAMPLE_OPEN_TABS}
      selection={{ projectId }}
      onChangeSelection={({ projectId: next }) => setProjectId(next)}
      localizedStrings={HARNESS_STRINGS}
    />
  );
}

function setupUser() {
  // Radix Popover and cmdk rely on PointerEvent sequences that
  // fireEvent.click() does not synthesize. userEvent v14 with
  // `pointerEventsCheck: 0` is the standard workaround for jsdom.
  return userEvent.setup({ pointerEventsCheck: 0 });
}

describe('ProjectSelector — trigger chevron', () => {
  it('renders a chevron icon in the trigger at normal widths', async () => {
    render(<ProjectSelectorHarness initialSelected="esvus16" />);
    const trigger = screen.getByRole('combobox', { name: 'Project' });
    // The auto-narrow observer runs on mount via a useEffect; wait one microtask.
    await waitFor(() => {
      expect(trigger.querySelector('svg')).not.toBeNull();
    });
  });

  it('auto-hides the chevron when the rendered trigger is below the narrow threshold', async () => {
    // Override the default 200px stub for this test — the trigger renders at 56px, which sits
    // below the component's internal narrow-mode threshold and should drop the chevron.
    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
    // Prototype assignment needs an anonymous function expression to preserve `this`.
    // eslint-disable-next-line func-names
    Element.prototype.getBoundingClientRect = function () {
      const rect = originalGetBoundingClientRect.call(this);
      if (this instanceof HTMLElement && this.getAttribute('role') === 'combobox') {
        return { ...rect, width: 56, height: 32 };
      }
      return rect;
    };
    try {
      render(<ProjectSelectorHarness initialSelected="esvus16" />);
      const trigger = screen.getByRole('combobox', { name: 'Project' });
      await waitFor(() => {
        expect(trigger.querySelector('svg')).toBeNull();
      });
      // The label still renders so a narrow trigger shows the project name.
      expect(trigger).toHaveTextContent('ESVUS16');
    } finally {
      Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    }
  });
});

describe('ProjectSelector — loading state (I1)', () => {
  it('disables the trigger and shows a spinner when isLoading', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: undefined }}
        onChangeSelection={() => {}}
        localizedStrings={HARNESS_STRINGS}
        isLoading
      />,
    );
    const trigger = screen.getByRole('combobox', { name: 'Project' });
    expect(trigger).toBeDisabled();
    const icon = trigger.querySelector('svg');
    expect(icon).not.toBeNull();
    expect(icon?.getAttribute('class') ?? '').toContain('animate-spin');
  });

  it('shows the loading spinner even in the auto-narrow trigger case (icon-rail sidebar)', () => {
    // Simulate a narrow trigger — auto-narrow would normally drop the chevron, but the spinner
    // takes precedence so the user sees the loading state.
    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
    // Prototype assignment needs an anonymous function expression to preserve `this`.
    // eslint-disable-next-line func-names
    Element.prototype.getBoundingClientRect = function () {
      const rect = originalGetBoundingClientRect.call(this);
      if (this instanceof HTMLElement && this.getAttribute('role') === 'combobox') {
        return { ...rect, width: 56, height: 32 };
      }
      return rect;
    };
    try {
      render(
        <ProjectSelector
          mode="project"
          projects={SAMPLE_PROJECTS}
          openTabs={SAMPLE_OPEN_TABS}
          selection={{ projectId: undefined }}
          onChangeSelection={() => {}}
          localizedStrings={HARNESS_STRINGS}
          isLoading
        />,
      );
      const trigger = screen.getByRole('combobox', { name: 'Project' });
      const icon = trigger.querySelector('svg');
      expect(icon).not.toBeNull();
      expect(icon?.getAttribute('class') ?? '').toContain('animate-spin');
    } finally {
      Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    }
  });
});

describe('ProjectSelector — trigger label format', () => {
  it('renders only the shortName by default', () => {
    render(<ProjectSelectorHarness initialSelected="esvus16" />);
    const trigger = screen.getByRole('combobox', { name: 'Project' });
    expect(trigger).toHaveTextContent('ESVUS16');
    expect(trigger).not.toHaveTextContent('English Standard Version (US) 2016');
    // No native title in any format — hover full-text reveal is the trigger's own
    // Radix tooltip.
    expect(trigger).not.toHaveAttribute('title');
  });

  it("renders 'shortName - fullName' when triggerLabelFormat is shortNameAndFullName", () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: 'esvus16' }}
        onChangeSelection={() => {}}
        localizedStrings={HARNESS_STRINGS}
        triggerLabelFormat="shortNameAndFullName"
      />,
    );
    const trigger = screen.getByRole('combobox', { name: 'Project' });
    expect(trigger).toHaveTextContent('ESVUS16 - English Standard Version (US) 2016');
    // The untruncated text surfaces via the trigger's own Radix tooltip, not a
    // native title attribute.
    expect(trigger).not.toHaveAttribute('title');
  });

  it('skips the fullName suffix when fullName equals shortName', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={[{ id: 'p1', shortName: 'ABC', fullName: 'ABC' }]}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: 'p1' }}
        onChangeSelection={() => {}}
        localizedStrings={HARNESS_STRINGS}
        triggerLabelFormat="shortNameAndFullName"
      />,
    );
    const trigger = screen.getByRole('combobox', { name: 'Project' });
    expect(trigger).toHaveTextContent('ABC');
    expect(trigger).not.toHaveTextContent('ABC - ABC');
  });

  it('renders the placeholder when nothing is selected regardless of format', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: undefined }}
        onChangeSelection={() => {}}
        localizedStrings={HARNESS_STRINGS}
        triggerLabelFormat="shortNameAndFullName"
      />,
    );
    const trigger = screen.getByRole('combobox', { name: 'Project' });
    expect(trigger).toHaveTextContent('Select a project');
  });
});

describe('ProjectSelector — search-clear-on-close', () => {
  it('resets the search query when the popover is closed and reopened', async () => {
    const user = setupUser();
    render(<ProjectSelectorHarness initialSelected="esvus16" />);

    // Open the popover (trigger button uses role="combobox").
    const trigger = screen.getByRole('combobox', { name: 'Project' });
    await user.click(trigger);

    // Type into the filter input. CommandInput renders an <input> with the
    // configured placeholder; that's the most stable selector since cmdk
    // doesn't expose a dedicated role.
    const searchInput = await screen.findByPlaceholderText('Search projects & resources');
    await user.type(searchInput, 'ESV');
    expect(searchInput).toHaveValue('ESV');

    // Close the popover. Escape inside the PopoverContent collapses it
    // without any other side-effects.
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Search projects & resources')).toBeNull();
    });

    // Reopen the popover — the search input must come back empty.
    await user.click(trigger);
    const reopened = await screen.findByPlaceholderText('Search projects & resources');
    expect(reopened).toHaveValue('');
  });
});

describe('ProjectSelector — scroll-to-selected on open', () => {
  // ProjectSelector's open-popover useEffect calls scrollIntoView with the
  // distinguishing argument shape `{ block: 'nearest', behavior: 'auto' }`.
  // cmdk also calls scrollIntoView (for keyboard focus management) but only
  // passes `{ block: 'nearest' }`. Filtering by the presence of
  // `behavior: 'auto'` isolates the component-under-test's calls from the
  // library's, so the assertion stays meaningful even if cmdk's internal
  // focus behavior changes.
  function selectorScrollCallCount(spy: ReturnType<typeof vi.spyOn>): number {
    return spy.mock.calls.filter((call) => {
      const arg = call[0];
      // Narrow to an object: undefined / boolean / null all fall through to
      // false. `typeof null === 'object'` is the classic gotcha — using a
      // truthiness check first avoids that without naming the `null` literal
      // (project lint rule `no-null/no-null`).
      if (!arg || typeof arg !== 'object') return false;
      if (!('behavior' in arg)) return false;
      return arg.behavior === 'auto';
    }).length;
  }

  it('calls scrollIntoView on the selected row when the popover opens', async () => {
    const user = setupUser();
    const scrollSpy = vi.spyOn(Element.prototype, 'scrollIntoView');
    try {
      render(<ProjectSelectorHarness initialSelected="esv16uk" />);

      const trigger = screen.getByRole('combobox', { name: 'Project' });
      await user.click(trigger);

      // The scroll runs inside a requestAnimationFrame callback, so wait for
      // the next paint.
      await waitFor(() => {
        expect(selectorScrollCallCount(scrollSpy)).toBeGreaterThan(0);
      });
    } finally {
      scrollSpy.mockRestore();
    }
  });

  it('does NOT call scrollIntoView when no row is selected', async () => {
    const user = setupUser();
    const scrollSpy = vi.spyOn(Element.prototype, 'scrollIntoView');
    try {
      render(<ProjectSelectorHarness initialSelected={undefined} />);

      const trigger = screen.getByRole('combobox', { name: 'Project' });
      await user.click(trigger);

      // Anchor in time: wait for the popover to render, then flush a rAF
      // tick so the open-popover useEffect has a chance to run.
      await screen.findByPlaceholderText('Search projects & resources');
      await new Promise((resolve) => {
        window.requestAnimationFrame(() => resolve(undefined));
      });

      expect(selectorScrollCallCount(scrollSpy)).toBe(0);
    } finally {
      scrollSpy.mockRestore();
    }
  });
});
