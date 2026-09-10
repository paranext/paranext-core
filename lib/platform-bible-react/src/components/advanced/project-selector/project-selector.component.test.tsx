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
  type ProjectSelectorSection,
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
});

const SAMPLE_PROJECTS: ProjectSelectorProject[] = [
  {
    id: 'esvus16',
    shortName: 'ESVUS16',
    fullName: 'English Standard Version (US) 2016',
    language: 'English',
    languageCode: 'en-US',
  },
  {
    id: 'esv16uk',
    shortName: 'ESV16UK',
    fullName: 'English Standard Version (UK) 2016',
    language: 'English',
    languageCode: 'en-GB',
  },
  {
    id: 'web',
    shortName: 'WEB',
    fullName: 'World English Bible',
    language: 'English',
    languageCode: 'en',
  },
];

const SAMPLE_OPEN_TABS: ProjectSelectorOpenTab[] = [];

function ProjectSelectorHarness({ initialSelected }: { initialSelected: string | undefined }) {
  const [projectId, setProjectId] = useState<string | undefined>(initialSelected);
  return (
    <ProjectSelector
      mode="project"
      projects={SAMPLE_PROJECTS}
      openTabs={SAMPLE_OPEN_TABS}
      selection={{ projectId }}
      onChangeSelection={({ projectId: next }) => setProjectId(next)}
      buttonPlaceholder="Select a project"
      ariaLabel="Project"
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
  it('renders a chevron icon in the trigger by default', () => {
    render(<ProjectSelectorHarness initialSelected="esvus16" />);
    const trigger = screen.getByRole('combobox', { name: 'Project' });
    expect(trigger.querySelector('svg')).not.toBeNull();
  });

  it('hides the chevron icon when hideTriggerChevron is set', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: 'esvus16' }}
        onChangeSelection={() => {}}
        buttonPlaceholder="Select a project"
        ariaLabel="Project"
        hideTriggerChevron
      />,
    );
    const trigger = screen.getByRole('combobox', { name: 'Project' });
    expect(trigger.querySelector('svg')).toBeNull();
    // The label still renders so a narrow trigger shows the project name.
    expect(trigger).toHaveTextContent('ESVUS16');
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
        buttonPlaceholder="Select a project"
        ariaLabel="Project"
        isLoading
      />,
    );
    const trigger = screen.getByRole('combobox', { name: 'Project' });
    expect(trigger).toBeDisabled();
    const icon = trigger.querySelector('svg');
    expect(icon).not.toBeNull();
    expect(icon?.getAttribute('class') ?? '').toContain('animate-spin');
  });

  it('shows the loading spinner even when hideTriggerChevron is set (narrow rail)', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: undefined }}
        onChangeSelection={() => {}}
        buttonPlaceholder="Select a project"
        ariaLabel="Project"
        hideTriggerChevron
        isLoading
      />,
    );
    const trigger = screen.getByRole('combobox', { name: 'Project' });
    const icon = trigger.querySelector('svg');
    expect(icon).not.toBeNull();
    expect(icon?.getAttribute('class') ?? '').toContain('animate-spin');
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
        buttonPlaceholder="Select a project"
        ariaLabel="Project"
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
        buttonPlaceholder="Select a project"
        ariaLabel="Project"
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
        buttonPlaceholder="Select a project"
        ariaLabel="Project"
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

describe('hideFilterMenu', () => {
  const projects: ProjectSelectorProject[] = [
    { id: 'a', shortName: 'A', fullName: 'Project A' },
    { id: 'b', shortName: 'B', fullName: 'Project B' },
    { id: 'c', shortName: 'C', fullName: 'Project C' },
  ];

  it('renders no grouping control when hideFilterMenu is set', async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={projects}
        openTabs={[]}
        selection={{ projectId: 'a' }}
        onChangeSelection={() => {}}
        ariaLabel="Project"
        hideFilterMenu
      />,
    );
    await user.click(screen.getByRole('combobox', { name: 'Project' }));
    // The view-options button is the only affordance that opens the grouping menu.
    expect(screen.queryByLabelText('View options')).not.toBeInTheDocument();
  });

  it('renders the grouping control when hideFilterMenu is absent', async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={projects}
        openTabs={[]}
        selection={{ projectId: 'a' }}
        onChangeSelection={() => {}}
        ariaLabel="Project"
      />,
    );
    await user.click(screen.getByRole('combobox', { name: 'Project' }));
    expect(screen.getByLabelText('View options')).toBeInTheDocument();
  });
});

describe('locked grouping', () => {
  it('groups by versification with no user-facing way to change it', async () => {
    const user = setupUser();
    const versified: ProjectSelectorProject[] = [
      {
        id: 'a',
        shortName: 'A',
        fullName: 'Project A',
        versificationId: '4',
        versificationName: 'English',
      },
      {
        id: 'b',
        shortName: 'B',
        fullName: 'Project B',
        versificationId: '3',
        versificationName: 'Vulgate',
      },
    ];
    render(
      <ProjectSelector
        mode="project"
        projects={versified}
        openTabs={[]}
        selection={{ projectId: 'a' }}
        onChangeSelection={() => {}}
        ariaLabel="Project"
        availableGroupings={['versification']}
        defaultGrouping="versification"
        hideFilterMenu
      />,
    );
    await user.click(screen.getByRole('combobox', { name: 'Project' }));
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Vulgate')).toBeInTheDocument();
    expect(screen.queryByLabelText('View options')).not.toBeInTheDocument();
  });
});

describe('customSections', () => {
  const projects: ProjectSelectorProject[] = [
    { id: 'a', shortName: 'A', fullName: 'Project A' },
    { id: 'b', shortName: 'B', fullName: 'Project B' },
    { id: 'c', shortName: 'C', fullName: 'Project C' },
  ];

  const sections: ProjectSelectorSection[] = [
    { id: 'recent', label: 'Recent', match: (p) => p.id === 'c' },
    { id: 'yours', label: 'Your projects', match: () => true },
  ];

  const openCustom = async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={projects}
        openTabs={[]}
        selection={{ projectId: 'a' }}
        onChangeSelection={() => {}}
        ariaLabel="Project"
        availableGroupings={['custom']}
        defaultGrouping="custom"
        hideFilterMenu
        customSections={sections}
      />,
    );
    await user.click(screen.getByRole('combobox', { name: 'Project' }));
    return user;
  };

  it('renders caller-supplied headings in the supplied order', async () => {
    await openCustom();
    const headings = screen.getAllByText(/^(Recent|Your projects)$/).map((n) => n.textContent);
    expect(headings).toEqual(['Recent', 'Your projects']);
  });

  it('places each project under the first section that matches it', async () => {
    await openCustom();
    const recent = screen.getByText('Recent').closest('[cmdk-group=""]');
    expect(recent).not.toBeNull();
    expect(recent).toHaveTextContent('C');
    expect(recent).not.toHaveTextContent('A');
  });

  it('still filters within sections when the user searches', async () => {
    const user = await openCustom();
    // "Project C" (not just "C") disambiguates from "Project A"/"Project B", whose full names
    // both contain the letter C as part of the word "Project".
    await user.type(screen.getByPlaceholderText(/search/i), 'Project C');
    expect(screen.getByText('Recent')).toBeInTheDocument();
    expect(screen.queryByText('Your projects')).not.toBeInTheDocument();
  });

  it('heads the unmatched bucket with a default heading', async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={projects}
        openTabs={[]}
        selection={{ projectId: 'a' }}
        onChangeSelection={() => {}}
        ariaLabel="Project"
        availableGroupings={['custom']}
        defaultGrouping="custom"
        hideFilterMenu
        customSections={[{ id: 'recent', label: 'Recent', match: (p) => p.id === 'c' }]}
      />,
    );
    await user.click(screen.getByRole('combobox', { name: 'Project' }));
    const unmatched = screen.getByText('Other').closest('[cmdk-group=""]');
    expect(unmatched).not.toBeNull();
    expect(unmatched).toHaveTextContent('A');
    expect(unmatched).toHaveTextContent('B');
    expect(unmatched).not.toHaveTextContent('C');
  });

  it('lets the caller retitle the unmatched bucket through localizedStrings', async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={projects}
        openTabs={[]}
        selection={{ projectId: 'a' }}
        onChangeSelection={() => {}}
        ariaLabel="Project"
        availableGroupings={['custom']}
        defaultGrouping="custom"
        hideFilterMenu
        customSections={[{ id: 'recent', label: 'Recent', match: (p) => p.id === 'c' }]}
        localizedStrings={{
          '%webView_project_selector_custom_unmatched_section_heading%': 'Everything else',
        }}
      />,
    );
    await user.click(screen.getByRole('combobox', { name: 'Project' }));
    expect(screen.getByText('Everything else')).toBeInTheDocument();
    expect(screen.queryByText('Other')).not.toBeInTheDocument();
  });

  it('ignores customSections when the active grouping is not custom', async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={projects}
        openTabs={[]}
        selection={{ projectId: 'a' }}
        onChangeSelection={() => {}}
        ariaLabel="Project"
        availableGroupings={['custom', 'language']}
        defaultGrouping="language"
        customSections={sections}
      />,
    );
    await user.click(screen.getByRole('combobox', { name: 'Project' }));
    expect(screen.queryByText('Recent')).not.toBeInTheDocument();
  });

  it('switches to custom sections through the view-options menu', async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={projects}
        openTabs={[]}
        selection={{ projectId: 'a' }}
        onChangeSelection={() => {}}
        ariaLabel="Project"
        availableGroupings={['custom', 'language']}
        defaultGrouping="language"
        customSections={sections}
      />,
    );
    await user.click(screen.getByRole('combobox', { name: 'Project' }));
    expect(screen.queryByText('Recent')).not.toBeInTheDocument();

    await user.click(screen.getByLabelText('View options'));
    await user.click(await screen.findByText('Custom'));

    expect(await screen.findByText('Recent')).toBeInTheDocument();
    expect(screen.getByText('Your projects')).toBeInTheDocument();
  });
});

describe('row tooltip', () => {
  it("surfaces the row's typeName on hover so the type is not carried by an icon alone", async () => {
    const user = setupUser();
    const mixed: ProjectSelectorProject[] = [
      { id: 'p1', shortName: 'P1', fullName: 'A project', type: 'Standard', typeName: 'Standard' },
      {
        id: 'r1',
        shortName: 'R1',
        fullName: 'A resource',
        type: 'ScriptureResource',
        typeName: 'Scripture resource',
      },
    ];
    render(
      <ProjectSelector
        mode="project"
        projects={mixed}
        openTabs={[]}
        selection={{ projectId: 'p1' }}
        onChangeSelection={() => {}}
        ariaLabel="Project"
      />,
    );
    await user.click(screen.getByRole('combobox', { name: 'Project' }));
    // jsdom reports no overflow, so the row text is never "truncated" here — the tooltip opens
    // only because the type counts as extra content the row itself does not show.
    await user.hover(screen.getByText('A resource'));
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toHaveTextContent('Scripture resource');
  });

  it('opens no tooltip on hover for a row with nothing beyond its visible text', async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={[{ id: 'p1', shortName: 'P1', fullName: 'A project' }]}
        openTabs={[]}
        selection={{ projectId: 'p1' }}
        onChangeSelection={() => {}}
        ariaLabel="Project"
      />,
    );
    await user.click(screen.getByRole('combobox', { name: 'Project' }));
    await user.hover(screen.getByText('A project'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

describe('renderProjectIndicator', () => {
  it('renders projects and resources distinguishably from data alone', async () => {
    const user = setupUser();
    const mixed: ProjectSelectorProject[] = [
      { id: 'p1', shortName: 'P1', fullName: 'A project', type: 'Standard' },
      { id: 'r1', shortName: 'R1', fullName: 'A resource', type: 'ScriptureResource' },
    ];
    render(
      <ProjectSelector
        mode="project"
        projects={mixed}
        openTabs={[]}
        selection={{ projectId: 'p1' }}
        onChangeSelection={() => {}}
        ariaLabel="Project"
        renderProjectIndicator={(project) => (
          <span data-testid={`indicator-${project.type}`} aria-hidden />
        )}
      />,
    );
    await user.click(screen.getByRole('combobox', { name: 'Project' }));
    expect(screen.getByTestId('indicator-Standard')).toBeInTheDocument();
    expect(screen.getByTestId('indicator-ScriptureResource')).toBeInTheDocument();
  });

  it('renders no indicator element when the prop is absent', async () => {
    const user = setupUser();
    const projects: ProjectSelectorProject[] = [
      { id: 'p1', shortName: 'P1', fullName: 'A project', type: 'Standard' },
      { id: 'r1', shortName: 'R1', fullName: 'A resource', type: 'ScriptureResource' },
    ];
    render(
      <ProjectSelector
        mode="project"
        projects={projects}
        openTabs={[]}
        selection={{ projectId: 'p1' }}
        onChangeSelection={() => {}}
        ariaLabel="Project"
      />,
    );
    await user.click(screen.getByRole('combobox', { name: 'Project' }));
    expect(screen.queryByTestId(/^indicator-/)).not.toBeInTheDocument();
  });
});
