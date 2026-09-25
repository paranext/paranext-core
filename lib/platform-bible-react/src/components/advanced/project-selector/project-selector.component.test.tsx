// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {
  ProjectSelector,
  buildProjectSelectorLocalizedStrings,
  type ProjectSelectorOpenTab,
  type ProjectSelectorProject,
} from '@/components/advanced/project-selector/project-selector.component';
import { PROJECT_SELECTOR_STRING_KEYS } from '@/components/advanced/project-selector/project-selector.groupings';

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
    const trigger = screen.getByRole('combobox', { name: /^Project/ });
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
      const trigger = screen.getByRole('combobox', { name: /^Project/ });
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

describe('ProjectSelector — loading state', () => {
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
    const trigger = screen.getByRole('combobox', { name: /^Project/ });
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
      const trigger = screen.getByRole('combobox', { name: /^Project/ });
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
    const trigger = screen.getByRole('combobox', { name: /^Project/ });
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
    const trigger = screen.getByRole('combobox', { name: /^Project/ });
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
    const trigger = screen.getByRole('combobox', { name: /^Project/ });
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
    const trigger = screen.getByRole('combobox', { name: /^Project/ });
    expect(trigger).toHaveTextContent('Select a project');
  });
});

describe('ProjectSelector — buttonClassName', () => {
  it('merges a passed buttonClassName onto the trigger button', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: 'esvus16' }}
        onChangeSelection={() => {}}
        localizedStrings={HARNESS_STRINGS}
        buttonClassName="tw:h-8 tw:w-full tw:flex-1 tw:justify-start tw:font-normal"
      />,
    );
    const trigger = screen.getByRole('combobox', { name: /^Project/ });
    expect(trigger).toHaveClass(
      'tw:h-8',
      'tw:w-full',
      'tw:flex-1',
      'tw:justify-start',
      'tw:font-normal',
    );
  });
});

describe('ProjectSelector — search-clear-on-close', () => {
  it('resets the search query when the popover is closed and reopened', async () => {
    const user = setupUser();
    render(<ProjectSelectorHarness initialSelected="esvus16" />);

    // Open the popover (trigger button uses role="combobox").
    const trigger = screen.getByRole('combobox', { name: /^Project/ });
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

      const trigger = screen.getByRole('combobox', { name: /^Project/ });
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

      const trigger = screen.getByRole('combobox', { name: /^Project/ });
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

describe('group-by menu naming', () => {
  it('labels the menu trigger with groupByAriaLabel, not a filter label', async () => {
    const user = userEvent.setup();
    render(
      <ProjectSelector
        mode="project"
        projects={[{ id: 'a', shortName: 'A', fullName: 'Project A' }]}
        openTabs={[]}
        selection={{ projectId: 'a' }}
        onChangeSelection={() => {}}
        localizedStrings={{ groupByAriaLabel: 'Group by', groupByNone: 'None' }}
        availableGroupings={[
          { id: 'openTabs', label: 'Open tabs' },
          { id: 'language', label: 'Language', getGroupKey: () => 'x' },
        ]}
      />,
    );
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('button', { name: 'Group by' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /filter/i })).not.toBeInTheDocument();
  });
});

describe('ProjectSelector — default grouping with async inputs', () => {
  it('applies the auto-derived openTabs grouping when openTabs arrive after mount', async () => {
    const user = setupUser();
    // `openTabs` over the wire is empty on first render, so the auto-derived grouping list is
    // empty and the picker opens flat. It has to pick the grouping up once the tabs land.
    const { rerender } = render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={[]}
        selection={{ projectId: 'esvus16' }}
        onChangeSelection={() => {}}
        localizedStrings={HARNESS_STRINGS}
      />,
    );

    rerender(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={[{ projectId: 'esvus16', scrollGroupId: 0 }]}
        selection={{ projectId: 'esvus16' }}
        onChangeSelection={() => {}}
        localizedStrings={HARNESS_STRINGS}
      />,
    );

    await user.click(screen.getByRole('combobox', { name: /^Project/ }));
    expect(await screen.findByText('Opened project & resource tabs')).toBeInTheDocument();
  });

  it('keeps the grouping the user picked when props change afterwards', async () => {
    const user = setupUser();
    // Two entries so the group-by menu actually renders — a single-entry list locks the picker
    // into that grouping and hides the menu, leaving nothing for the user to choose.
    const groupings = [
      { id: 'openTabs', label: 'Open tabs' },
      { id: 'language', label: 'Language', getGroupKey: () => 'en' },
    ];
    const props = {
      mode: 'project',
      projects: SAMPLE_PROJECTS,
      selection: { projectId: 'esvus16' },
      onChangeSelection: () => {},
      localizedStrings: HARNESS_STRINGS,
      availableGroupings: groupings,
    } as const;

    const { rerender } = render(
      <ProjectSelector {...props} openTabs={[{ projectId: 'esvus16', scrollGroupId: 0 }]} />,
    );

    await user.click(screen.getByRole('combobox', { name: /^Project/ }));
    expect(await screen.findByText('Opened project & resource tabs')).toBeInTheDocument();

    // Explicitly go flat, then change the props the default resolves from. The user's choice has
    // to survive — re-resolving on every prop change is exactly what this must not do.
    await user.click(screen.getByRole('button', { name: 'Group by' }));
    await user.click(await screen.findByRole('menuitemradio', { name: 'None' }));
    await waitFor(() => {
      expect(screen.queryByText('Opened project & resource tabs')).not.toBeInTheDocument();
    });

    rerender(
      <ProjectSelector
        {...props}
        openTabs={[
          { projectId: 'esvus16', scrollGroupId: 0 },
          { projectId: 'web', scrollGroupId: 1 },
        ]}
      />,
    );

    expect(screen.queryByText('Opened project & resource tabs')).not.toBeInTheDocument();
  });
});

describe('ProjectSelector — project-multi trigger shape at 1 vs 2+ selected', () => {
  it('renders the same count-badge shape at one selected as at two selected', () => {
    const { unmount } = render(
      <ProjectSelector
        mode="project-multi"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ pairs: [{ projectId: 'esvus16' }] }}
        onChangeSelection={() => {}}
        localizedStrings={{ buttonPlaceholder: 'Select projects', ariaLabel: 'Projects' }}
      />,
    );
    const oneSelectedTrigger = screen.getByRole('combobox', { name: /^Projects/ });
    expect(oneSelectedTrigger).toHaveTextContent('1');
    expect(oneSelectedTrigger).toHaveTextContent('ESVUS16');
    unmount();

    render(
      <ProjectSelector
        mode="project-multi"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ pairs: [{ projectId: 'esvus16' }, { projectId: 'esv16uk' }] }}
        onChangeSelection={() => {}}
        localizedStrings={{ buttonPlaceholder: 'Select projects', ariaLabel: 'Projects' }}
      />,
    );
    const twoSelectedTrigger = screen.getByRole('combobox', { name: /^Projects/ });
    expect(twoSelectedTrigger).toHaveTextContent('2');
    expect(twoSelectedTrigger).toHaveTextContent('ESVUS16, ESV16UK');

    // Both triggers render the count as a distinct Badge element rather than folding it into the
    // plain-text label — the shape that would otherwise diverge between 1 and 2+.
    expect(oneSelectedTrigger.querySelector('[data-slot="badge"]')).toHaveTextContent('1');
    expect(twoSelectedTrigger.querySelector('[data-slot="badge"]')).toHaveTextContent('2');
  });
});

describe('first paint', () => {
  it('renders a non-empty trigger label when no localized strings are supplied', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={[]}
        openTabs={[]}
        selection={{ projectId: '' }}
        onChangeSelection={() => {}}
      />,
    );
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAccessibleName(expect.stringMatching(/\S/));
    expect(trigger.textContent?.trim()).not.toBe('');
  });
});

describe('unresolved localized strings', () => {
  // `useLocalizedStrings` seeds its state with `defaultState[key] = key` and returns that same state
  // on a platform error, so every value can arrive as its own key — before strings load, and
  // permanently if localization fails. Those are strings, so a naive lookup accepts them and the
  // picker renders raw `%projectSelector_*%` keys at the user.
  const UNRESOLVED_STRINGS = Object.fromEntries(
    PROJECT_SELECTOR_STRING_KEYS.map((key) => [key, key]),
  );

  // Any `%…%` key, whatever its prefix and whether or not it contains an underscore — a sweep
  // narrowed to `%projectSelector_` would miss exactly the consumer-supplied keys this guards.
  const RAW_KEY = /%[^%\s]+%/;

  // `buildProjectSelectorLocalizedStrings` rejects a key-as-value itself, so this bag reaches the
  // merge as all-`undefined`: it pins the `undefined` arm. The consumer-override test below is what
  // reaches the localize-key arm.
  it('falls back to English when the shared block resolved nothing', async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={[]}
        selection={{ projectId: 'esvus16' }}
        onChangeSelection={() => {}}
        localizedStrings={{
          ...buildProjectSelectorLocalizedStrings(UNRESOLVED_STRINGS),
          ariaLabel: 'Project',
        }}
        availableGroupings={[
          { id: 'openTabs', label: 'Open tabs' },
          { id: 'language', label: 'Language', getGroupKey: () => 'English' },
        ]}
      />,
    );
    await user.click(screen.getByRole('combobox', { name: /^Project/ }));
    // Open the group-by menu too, so the sweeps below cover the menu's own strings rather than
    // only the popover's.
    await user.click(screen.getByRole('button', { name: 'Group by' }));

    expect(screen.getByPlaceholderText('Search projects & resources')).toBeInTheDocument();
    expect(screen.getByRole('menuitemradio', { name: 'None' })).toBeInTheDocument();
    // The load-bearing half: asserting the English string alone would still pass if the fallback
    // were reached some other way. Nothing may render a raw key.
    expect(screen.queryAllByPlaceholderText(RAW_KEY)).toHaveLength(0);
    expect(screen.queryAllByText(RAW_KEY)).toHaveLength(0);
  });

  it('falls back to English when a consumer overrides with its own unresolved keys', async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={[]}
        selection={{ projectId: '' }}
        onChangeSelection={() => {}}
        localizedStrings={{
          ...buildProjectSelectorLocalizedStrings(UNRESOLVED_STRINGS),
          // Consumers merge their OWN `%webView_…%` lookups over the shared block, and those
          // arrive as raw keys under the same `useLocalizedStrings` seeding behavior.
          ariaLabel: '%webView_find_projectSelector_label%',
          buttonPlaceholder: '%webView_find_projectFilter_noOpenProjectsOrResources%',
          commandEmptyMessage: '%webView_find_projectFilter_noProjectsFound%',
        }}
      />,
    );

    const trigger = screen.getByRole('combobox', { name: 'Projects & resources' });
    expect(trigger).toHaveTextContent('Select a project');

    await user.click(trigger);
    const searchInput = await screen.findByPlaceholderText('Search projects & resources');
    await user.type(searchInput, 'zzzzz');
    expect(await screen.findByText('No projects found')).toBeInTheDocument();

    // The load-bearing half: asserting the English strings alone would still pass if the fallback
    // were reached some other way. Nothing may render a raw key, whatever its prefix.
    expect(screen.queryAllByPlaceholderText(RAW_KEY)).toHaveLength(0);
    expect(screen.queryAllByText(RAW_KEY)).toHaveLength(0);
  });

  // A blank translation reaches the merge as a defined, non-key string, so neither the `undefined`
  // arm nor the localize-key arm catches it. Left alone it renders a trigger with no visible text.
  it('falls back to English for a blank localized value', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={[]}
        selection={{ projectId: '' }}
        onChangeSelection={() => {}}
        localizedStrings={{ buttonPlaceholder: '   ' }}
      />,
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('Select a project');
  });

  // `ariaLabel` is the documented exception to the blank rule: an empty string means "this control
  // is named by its visible text or a labelling ancestor", so it must survive the merge rather than
  // being replaced with English. Whitespace-only is NOT that opt-out — only a truly empty string is.
  it('keeps an empty ariaLabel as a deliberate opt-out', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={[]}
        selection={{ projectId: '' }}
        onChangeSelection={() => {}}
        localizedStrings={{ ariaLabel: '' }}
      />,
    );

    expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-label');
  });

  it('falls back to English for a whitespace-only ariaLabel', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={[]}
        selection={{ projectId: '' }}
        onChangeSelection={() => {}}
        localizedStrings={{ ariaLabel: '   ' }}
      />,
    );

    expect(screen.getByRole('combobox', { name: 'Projects & resources' })).toBeInTheDocument();
  });

  it('keeps a resolved value whose visible text is merely padded with whitespace', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={[]}
        selection={{ projectId: '' }}
        onChangeSelection={() => {}}
        localizedStrings={{ ariaLabel: '  Padded label  ' }}
      />,
    );

    // Asserted on the raw attribute, not the accessible name: name computation normalizes
    // whitespace, so a `name: 'Padded label'` query passes whether or not the value was trimmed.
    expect(screen.getByRole('combobox', { name: 'Padded label' })).toHaveAttribute(
      'aria-label',
      '  Padded label  ',
    );
  });

  // A partially-translated locale is the realistic case: one bag carries resolved strings, raw
  // keys and `undefined` side by side, and each field has to be decided on its own value rather
  // than the bag being all-or-nothing.
  it('resolves each field independently in a partially translated bag', async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={[]}
        selection={{ projectId: '' }}
        onChangeSelection={() => {}}
        localizedStrings={{
          ariaLabel: 'Projekte & Ressourcen',
          buttonPlaceholder: '%webView_find_projectFilter_noOpenProjectsOrResources%',
          commandEmptyMessage: undefined,
          searchPlaceholder: 'Projekte durchsuchen',
        }}
      />,
    );

    // Resolved fields win over the English default...
    const trigger = screen.getByRole('combobox', { name: 'Projekte & Ressourcen' });
    // ...while the unresolved key and the `undefined` fall back to it.
    expect(trigger).toHaveTextContent('Select a project');

    await user.click(trigger);
    expect(screen.getByPlaceholderText('Projekte durchsuchen')).toBeInTheDocument();
    await user.type(screen.getByPlaceholderText('Projekte durchsuchen'), 'zzzzz');
    expect(await screen.findByText('No projects found')).toBeInTheDocument();
  });
});

describe('renderProjectIndicator', () => {
  const mixed: ProjectSelectorProject[] = [
    { id: 'p1', shortName: 'P1', fullName: 'A project', customData: { type: 'Standard' } },
    {
      id: 'r1',
      shortName: 'R1',
      fullName: 'A resource',
      customData: { type: 'ScriptureResource' },
    },
  ];

  /**
   * The row element for a project, by its short name. Rows have no test id in production markup, so
   * these tests reach them through the visible label and assert on the row's own child order.
   */
  const rowFor = (shortName: string): HTMLElement => {
    // The trigger renders the selected project's short name too, so match only inside a row.
    const rows = screen
      .getAllByText(shortName)
      .map((label) => label.closest('[cmdk-item]'))
      .filter((row): row is HTMLElement => Boolean(row));
    expect(rows).toHaveLength(1);
    return rows[0];
  };

  /**
   * Index of the child holding the row's label, counting from the leading fixed-width check column.
   * 1 means the label sits directly after the check column (no indicator column); 2 means an
   * indicator column is laid out between them.
   */
  const labelChildIndex = (row: HTMLElement, shortName: string): number =>
    [...row.children].findIndex((child) => child.textContent?.includes(shortName));

  it('renders projects and resources distinguishably from data alone', async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={mixed}
        openTabs={[]}
        selection={{ projectId: 'p1' }}
        onChangeSelection={() => {}}
        localizedStrings={{ ariaLabel: 'Project' }}
        renderProjectIndicator={(project) => ({
          node: <span data-testid={`indicator-${project.customData?.type}`} aria-hidden />,
        })}
      />,
    );
    await user.click(screen.getByRole('combobox', { name: /^Project/ }));
    expect(screen.getByTestId('indicator-Standard')).toBeInTheDocument();
    expect(screen.getByTestId('indicator-ScriptureResource')).toBeInTheDocument();
  });

  it('reserves the indicator column on every row, even where the renderer returns nothing', async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={mixed}
        openTabs={[]}
        selection={{ projectId: 'p1' }}
        onChangeSelection={() => {}}
        localizedStrings={{ ariaLabel: 'Project' }}
        // The natural shape of a "mark only the resources" renderer. Keying the column on what it
        // returned per row would indent R1's label one glyph further than P1's.
        renderProjectIndicator={(project) =>
          project.customData?.type === 'ScriptureResource'
            ? { node: <span data-testid="indicator-resource" />, label: 'Resource' }
            : undefined
        }
      />,
    );
    await user.click(screen.getByRole('combobox', { name: /^Project/ }));

    expect(screen.getByTestId('indicator-resource')).toBeInTheDocument();
    expect(labelChildIndex(rowFor('P1'), 'P1')).toBe(2);
    expect(labelChildIndex(rowFor('R1'), 'R1')).toBe(2);
  });

  it('lays out no indicator column when the prop is absent', async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={mixed}
        openTabs={[]}
        selection={{ projectId: 'p1' }}
        onChangeSelection={() => {}}
        localizedStrings={{ ariaLabel: 'Project' }}
      />,
    );
    await user.click(screen.getByRole('combobox', { name: /^Project/ }));

    // An empty reserved column has no text and no test id, so its presence is only observable as
    // the label being pushed one child to the right.
    expect(labelChildIndex(rowFor('P1'), 'P1')).toBe(1);
    expect(labelChildIndex(rowFor('R1'), 'R1')).toBe(1);
  });
});

describe('case-insensitive selection', () => {
  // Canonical project ids are uppercase, but a selection can arrive lowercased from a persisted
  // layout or a web view opened with a tab-derived id. The trigger label has to resolve the same
  // project the rows do, or it shows its placeholder while a row renders as selected.
  const upperProjects: ProjectSelectorProject[] = [
    { id: 'ABC123', shortName: 'ABC', fullName: 'Project ABC' },
  ];

  it('labels the trigger from a differently-cased single selection', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={upperProjects}
        openTabs={[]}
        selection={{ projectId: 'abc123' }}
        onChangeSelection={() => {}}
        localizedStrings={{ ariaLabel: 'Project', buttonPlaceholder: 'Select a project' }}
      />,
    );
    const trigger = screen.getByRole('combobox', { name: /^Project/ });
    expect(trigger).toHaveTextContent('ABC');
    expect(trigger).not.toHaveTextContent('Select a project');
  });

  it('labels the trigger from a differently-cased pair selection', () => {
    render(
      <ProjectSelector
        mode="project-multi"
        projects={upperProjects}
        openTabs={[]}
        selection={{ pairs: [{ projectId: 'abc123', scrollGroupId: undefined }] }}
        onChangeSelection={() => {}}
        localizedStrings={{ ariaLabel: 'Project', buttonPlaceholder: 'Select a project' }}
      />,
    );
    const trigger = screen.getByRole('combobox', { name: /^Project/ });
    expect(trigger).toHaveTextContent('ABC');
    expect(trigger).not.toHaveTextContent('Select a project');
  });

  it('toggles a differently-cased pair off instead of appending a duplicate', async () => {
    const user = setupUser();
    const onChangeSelection = vi.fn();
    render(
      <ProjectSelector
        mode="project-multi"
        projects={upperProjects}
        openTabs={[]}
        selection={{ pairs: [{ projectId: 'abc123', scrollGroupId: undefined }] }}
        onChangeSelection={onChangeSelection}
        localizedStrings={{ ariaLabel: 'Project' }}
      />,
    );
    await user.click(screen.getByRole('combobox', { name: /^Project/ }));
    const row = await screen.findByRole('option', { name: /ABC/ });
    await user.click(row);

    expect(onChangeSelection).toHaveBeenCalledWith({ pairs: [] });
  });
});

describe('renderTriggerLabel', () => {
  it('renders the caller node as the trigger label instead of the derived string', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: 'web' }}
        onChangeSelection={() => {}}
        localizedStrings={{ ariaLabel: 'Project' }}
        renderTriggerLabel={(selected) => (
          <span data-testid="custom-trigger-label">custom:{selected?.shortName ?? 'none'}</span>
        )}
      />,
    );

    expect(screen.getByTestId('custom-trigger-label')).toHaveTextContent('custom:WEB');
  });

  it('passes undefined to the callback when nothing is selected', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: undefined }}
        onChangeSelection={() => {}}
        localizedStrings={{ ariaLabel: 'Project' }}
        renderTriggerLabel={(selected) => (
          <span data-testid="custom-trigger-label">custom:{selected?.shortName ?? 'none'}</span>
        )}
      />,
    );

    expect(screen.getByTestId('custom-trigger-label')).toHaveTextContent('custom:none');
  });

  it('renders no tooltip of its own, so a caller label carrying one cannot double up', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: 'web' }}
        onChangeSelection={() => {}}
        localizedStrings={{ ariaLabel: 'Project' }}
        // Load-bearing: it is what makes the suppressed tooltip's text the full name. Under the
        // default `'shortName'` format the derived title is just `'WEB'`, so the assertion below
        // would pass whether or not the tooltip were suppressed.
        triggerLabelFormat="shortNameAndFullName"
        renderTriggerLabel={() => <span data-testid="custom-trigger-label">WEB</span>}
      />,
    );

    // Asserted on the rendered structure rather than by hovering: Radix opens its tooltip from a
    // pointer sequence jsdom does not produce, so a hover-then-expect-nothing test passes whether
    // the tooltip is suppressed or not. The selector wraps its trigger in a `TooltipTrigger` only
    // when it has a title to show, so the wrapper's absence IS the suppression.
    expect(screen.getByRole('combobox', { name: /^Project/ })).not.toHaveAttribute(
      'data-slot',
      'tooltip-trigger',
    );
  });

  it('does wrap the trigger in its own tooltip when the caller supplies no label', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: 'web' }}
        onChangeSelection={() => {}}
        localizedStrings={{ ariaLabel: 'Project' }}
        triggerLabelFormat="shortNameAndFullName"
      />,
    );

    // The control case for the assertion above: without `renderTriggerLabel` the wrapper is
    // present, so its absence there is a real difference and not just how this trigger renders.
    expect(screen.getByRole('combobox', { name: /^Project/ })).toHaveAttribute(
      'data-slot',
      'tooltip-trigger',
    );
  });

  it('still uses the derived string when the prop is absent', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: 'web' }}
        onChangeSelection={() => {}}
        localizedStrings={{ ariaLabel: 'Project' }}
      />,
    );

    expect(screen.getByRole('combobox', { name: /^Project/ })).toHaveTextContent('WEB');
  });

  it('lets buttonClassName override the trigger button width', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: 'web' }}
        onChangeSelection={() => {}}
        localizedStrings={{ ariaLabel: 'Project' }}
        buttonClassName="tw:w-auto tw:max-w-64"
      />,
    );

    const trigger = screen.getByRole('combobox', { name: /^Project/ });
    expect(trigger).toHaveClass('tw:w-auto');
    expect(trigger).not.toHaveClass('tw:w-[180px]');
  });
});

describe('footerAction', () => {
  function renderWithFooter({
    projects = SAMPLE_PROJECTS,
    onSelect = () => {},
  }: {
    projects?: ProjectSelectorProject[];
    onSelect?: () => void;
  }) {
    return render(
      <ProjectSelector
        mode="project"
        projects={projects}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: undefined }}
        onChangeSelection={() => {}}
        localizedStrings={{
          ariaLabel: 'Project',
          buttonPlaceholder: 'Select a project',
          commandEmptyMessage: 'No projects found',
        }}
        footerAction={{ label: 'More projects…', onSelect }}
      />,
    );
  }

  it('is reachable and activatable by keyboard, not only by pointer', async () => {
    const user = setupUser();
    const onSelect = vi.fn();
    renderWithFooter({ onSelect });

    await user.click(screen.getByRole('combobox', { name: /^Project/ }));
    await screen.findByTestId('project-selector-footer-action');

    // Walk down past every project row to the footer, then activate with Enter. cmdk drives
    // navigation from `getValidItems()`, which only sees nodes inside CommandList — an item
    // rendered outside it would be skipped here and this test would time out.
    for (let i = 0; i < SAMPLE_PROJECTS.length + 1; i++) {
      // Each keypress must land before the next is sent, so the highlight advances one row at a
      // time; parallelizing would fire every ArrowDown before cmdk processes any of them.
      // eslint-disable-next-line no-await-in-loop
      await user.keyboard('{ArrowDown}');
    }
    await waitFor(() =>
      expect(screen.getByTestId('project-selector-footer-action')).toHaveAttribute(
        'data-selected',
        'true',
      ),
    );
    await user.keyboard('{Enter}');

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('is activatable by Space, which clicks the highlighted row directly', async () => {
    const user = setupUser();
    const onSelect = vi.fn();
    renderWithFooter({ onSelect });

    await user.click(screen.getByRole('combobox', { name: /^Project/ }));
    await screen.findByTestId('project-selector-footer-action');

    for (let i = 0; i < SAMPLE_PROJECTS.length + 1; i++) {
      // Each keypress must land before the next is sent, so the highlight advances one row at a
      // time; parallelizing would fire every ArrowDown before cmdk processes any of them.
      // eslint-disable-next-line no-await-in-loop
      await user.keyboard('{ArrowDown}');
    }
    await waitFor(() =>
      expect(screen.getByTestId('project-selector-footer-action')).toHaveAttribute(
        'data-selected',
        'true',
      ),
    );

    // Space takes a different path from Enter: `spaceSelectsHighlightedItem` finds the
    // `data-selected` node and calls `.click()` on it. The footer row is `forceMount`ed and so is
    // absent from cmdk's registered-item set, which is exactly the state that path has to survive.
    await user.keyboard(' ');

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('is present AND the empty message still renders when there are no projects', async () => {
    const user = setupUser();
    renderWithFooter({ projects: [] });

    await user.click(screen.getByRole('combobox', { name: /^Project/ }));

    // Both, in one test: `forceMount` skips cmdk registration so `filtered.count` stays 0 and
    // CommandEmpty renders. An ordinarily-registered footer item would satisfy the first
    // assertion and silently break the second.
    expect(await screen.findByTestId('project-selector-footer-action')).toBeInTheDocument();
    expect(screen.getByText('No projects found')).toBeInTheDocument();
  });

  it('activates on Enter with no projects, without arrowing to it first', async () => {
    const user = setupUser();
    const onSelect = vi.fn();
    renderWithFooter({ projects: [], onSelect });

    await user.click(screen.getByRole('combobox', { name: /^Project/ }));
    await screen.findByTestId('project-selector-footer-action');

    // With an empty list the footer is the ONLY thing a user can act on, so Enter straight off the
    // search box has to reach it. cmdk picks its Enter target from the highlighted item, and a
    // `forceMount`ed row never enters the registered-item set that cmdk highlights from — so
    // nothing highlights it unless the component seeds the highlight itself. Arrowing first (as
    // the keyboard test above does) walks the DOM instead and hides this.
    await user.keyboard('{Enter}');

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('omits the separator when there are no projects, so no rule floats under the empty message', async () => {
    const user = setupUser();
    renderWithFooter({ projects: [] });

    await user.click(screen.getByRole('combobox', { name: /^Project/ }));
    await screen.findByTestId('project-selector-footer-action');

    // `queryByTestId` returns `null` (Testing Library's own DOM query contract) when nothing
    // matches, so the assertion must compare against `null` itself.
    // eslint-disable-next-line no-null/no-null
    expect(screen.queryByTestId('project-selector-footer-separator')).toBe(null);
  });

  it('keeps its separator visible while a search query is active', async () => {
    const user = setupUser();
    renderWithFooter({});

    await user.click(screen.getByRole('combobox', { name: /^Project/ }));
    await user.type(screen.getByPlaceholderText(/search/i), 'ESV');

    // The popover content renders through a portal, so the separator lives outside the render
    // root — query the full document rather than the render container.
    // `queryByTestId` returns `null` (Testing Library's own DOM query contract) when nothing
    // matches, so the assertion must compare against `null` itself.
    // eslint-disable-next-line no-null/no-null
    expect(screen.queryByTestId('project-selector-footer-separator')).not.toBe(null);
  });

  it('does not collide with a project whose name matches the footer label', async () => {
    const user = setupUser();
    const onSelect = vi.fn();
    const onChangeSelection = vi.fn();
    render(
      <ProjectSelector
        mode="project"
        projects={[{ id: 'more', shortName: 'More projects…', fullName: 'A real project' }]}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: undefined }}
        onChangeSelection={onChangeSelection}
        localizedStrings={{ ariaLabel: 'Project', buttonPlaceholder: 'Select a project' }}
        footerAction={{ label: 'More projects…', onSelect }}
      />,
    );

    await user.click(screen.getByRole('combobox', { name: /^Project/ }));
    await user.click(await screen.findByTestId('project-selector-footer-action'));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onChangeSelection).not.toHaveBeenCalled();
  });

  it('closes the popover after the action runs', async () => {
    const user = setupUser();
    renderWithFooter({});

    await user.click(screen.getByRole('combobox', { name: /^Project/ }));
    await user.click(await screen.findByTestId('project-selector-footer-action'));

    await waitFor(() => expect(screen.queryByTestId('project-selector-footer-action')).toBeNull());
  });
});

describe('ProjectSelector — trigger label id casing', () => {
  // The rows fold case when deciding what is selected (canonical ids are uppercase GUIDs from the
  // .NET data provider, while the open-tabs hook lowercases them). The trigger has to fold it the
  // same way, or a mixed-case caller gets a row marked selected above a trigger still showing its
  // placeholder.
  const UPPER_PROJECTS = [
    { id: 'ABC123', shortName: 'ABC', fullName: 'Project ABC' },
    { id: 'DEF456', shortName: 'DEF', fullName: 'Project DEF' },
  ];

  it('names the project when the selection id differs in case from the list', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={UPPER_PROJECTS}
        openTabs={[]}
        selection={{ projectId: 'abc123' }}
        onChangeSelection={() => {}}
        localizedStrings={HARNESS_STRINGS}
      />,
    );
    const trigger = screen.getByRole('combobox', { name: 'Project: ABC' });
    expect(trigger).toHaveTextContent('ABC');
    expect(trigger).not.toHaveTextContent('Select a project');
  });

  it('names the project in projectScrollGroup mode too', () => {
    render(
      <ProjectSelector
        mode="projectScrollGroup"
        projects={UPPER_PROJECTS}
        openTabs={[]}
        selection={{ projectId: 'abc123', scrollGroupId: undefined }}
        onChangeSelection={() => {}}
        onOpenProjectInGroup={() => {}}
        localizedStrings={HARNESS_STRINGS}
      />,
    );
    const trigger = screen.getByRole('combobox', { name: 'Project: ABC' });
    expect(trigger).toHaveTextContent('ABC');
    expect(trigger).not.toHaveTextContent('Select a project');
  });

  it('names every selected project in project-multi mode', () => {
    render(
      <ProjectSelector
        mode="project-multi"
        projects={UPPER_PROJECTS}
        openTabs={[]}
        selection={{ pairs: [{ projectId: 'abc123' }, { projectId: 'def456' }] }}
        onChangeSelection={() => {}}
        localizedStrings={HARNESS_STRINGS}
      />,
    );
    const trigger = screen.getByRole('combobox', { name: 'Project: 2 ABC, DEF' });
    expect(trigger).toHaveTextContent('ABC, DEF');
    expect(trigger).not.toHaveTextContent('Select a project');
  });
});

describe('ProjectSelector — indicator meaning', () => {
  const INDICATOR_PROJECTS: ProjectSelectorProject[] = [
    { id: 'p1', shortName: 'P1', fullName: 'An editable project' },
    { id: 'p2', shortName: 'P2', fullName: 'A read-only project' },
  ];

  const renderWithIndicator = () =>
    render(
      <ProjectSelector
        mode="project"
        projects={INDICATOR_PROJECTS}
        openTabs={[]}
        selection={{ projectId: 'p1' }}
        onChangeSelection={() => {}}
        localizedStrings={HARNESS_STRINGS}
        renderProjectIndicator={(project) =>
          project.id === 'p2' ? { node: <span>🔒</span>, label: 'Read-only' } : undefined
        }
      />,
    );

  it("surfaces the indicator's meaning on hover, since the glyph itself is decorative", async () => {
    const user = setupUser();
    renderWithIndicator();
    await user.click(screen.getByRole('combobox', { name: 'Project: P1' }));

    await user.hover(screen.getByText('A read-only project'));
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Read-only');
  });

  it('opens no tooltip for a row the indicator label skips', async () => {
    const user = setupUser();
    renderWithIndicator();
    await user.click(screen.getByRole('combobox', { name: 'Project: P1' }));

    await user.hover(screen.getByText('An editable project'));
    expect(screen.queryByRole('tooltip')).toBeNull();
  });
});

describe('ProjectSelector — project name display', () => {
  it('heads the tooltip with the short name, not the full name alone', async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={[
          {
            id: 'r1',
            shortName: 'R1',
            fullName: 'A resource',
            // A disabled row carries a reason the row text does not show, which is what opens the
            // tooltip on hover — jsdom reports no overflow, so the truncation path never fires.
            isDisabled: true,
            disabledReason: 'Read-only',
          },
        ]}
        openTabs={[]}
        selection={{ projectId: undefined }}
        onChangeSelection={() => {}}
        localizedStrings={HARNESS_STRINGS}
      />,
    );
    await user.click(screen.getByRole('combobox', { name: /^Project/ }));
    await user.hover(screen.getByText('A resource'));

    // This tooltip doubles as the row's truncation disclosure, so a row whose short-name line is
    // clipped in a narrow web view must still be able to read that short name here.
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toHaveTextContent('R1 - A resource');
  });

  it('renders and searches a project that has no full name at all', async () => {
    const user = setupUser();
    render(
      <ProjectSelector
        mode="project"
        projects={[{ id: 'p1', shortName: 'NOFULL' }]}
        openTabs={[]}
        selection={{ projectId: 'p1' }}
        onChangeSelection={() => {}}
        localizedStrings={HARNESS_STRINGS}
      />,
    );

    await user.click(screen.getByRole('combobox', { name: /^Project/ }));
    // Typing drives the search filter, which reads `fullName` — it must not throw on a missing one.
    const searchInput = await screen.findByPlaceholderText('Search projects & resources');
    await user.type(searchInput, 'NOFULL');

    expect(screen.getByRole('option', { name: 'NOFULL' })).toBeInTheDocument();
    expect(screen.queryByText('undefined')).not.toBeInTheDocument();
  });
});

describe('ProjectSelector — trigger accessible name', () => {
  it('names the selected project alongside the group label', () => {
    render(<ProjectSelectorHarness initialSelected="web" />);

    // `aria-label` REPLACES the button's text for assistive tech, so a bare group label would leave
    // a screen-reader user unable to tell which project is selected — the trigger's whole job.
    expect(screen.getByRole('combobox', { name: 'Project: WEB' })).toBeInTheDocument();
  });

  it('carries the full name when the trigger shows it', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: 'web' }}
        onChangeSelection={() => {}}
        localizedStrings={HARNESS_STRINGS}
        triggerLabelFormat="shortNameAndFullName"
      />,
    );

    expect(
      screen.getByRole('combobox', { name: 'Project: WEB - World English Bible' }),
    ).toBeInTheDocument();
  });

  it('falls back to the group label alone when nothing is selected', () => {
    render(<ProjectSelectorHarness initialSelected={undefined} />);

    // The placeholder is the trigger text here, and naming the button "Project: Select a project"
    // would read as a selection that does not exist. Matched exactly: a prefix match would accept
    // the very name this asserts against.
    expect(screen.getByRole('combobox', { name: 'Project' })).toBeInTheDocument();
  });

  it('leaves the accessible name to the consumer when it supplies renderTriggerLabel', () => {
    render(
      <ProjectSelector
        mode="project"
        projects={SAMPLE_PROJECTS}
        openTabs={SAMPLE_OPEN_TABS}
        selection={{ projectId: 'web' }}
        onChangeSelection={() => {}}
        localizedStrings={HARNESS_STRINGS}
        renderTriggerLabel={() => <span>custom</span>}
      />,
    );

    // The label node is arbitrary, so the component has no trigger text to derive a name from; the
    // Simple-mode toolbar composes its own `ariaLabel` for exactly this reason. Matched exactly: a
    // prefix match would accept an appended selection this asserts is absent.
    expect(screen.getByRole('combobox', { name: 'Project' })).toBeInTheDocument();
  });
});
