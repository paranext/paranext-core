// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState, type ComponentType } from 'react';
import type { WebViewProps } from '@papi/core';
import { newPlatformError } from 'platform-bible-utils';
import { isProjectSelectorSharedKey, localizedValueFor } from './project-selector.test-utils';

// ---------------------------------------------------------------------------
// jsdom harness — cmdk (inside ProjectSelector's popover) and Radix need these
// ---------------------------------------------------------------------------

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
  // jsdom does no layout, so getBoundingClientRect reports a 0-width rect. ProjectSelector's
  // auto-narrow observer treats that as a narrow trigger; give the combobox a production-like
  // width so the default (wide) rendering is what these tests exercise.
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

// ---------------------------------------------------------------------------
// Hoisted mocks — must precede any import that touches the web view
// ---------------------------------------------------------------------------

type MockProject = { id: string; shortName: string; fullName: string };
type MockOpenTab = { projectId: string; scrollGroupId: number; webViewType: string };

const { mockRecentProjects, mockProjects, mockOpenTabs } = vi.hoisted(() => {
  const projects: { value: { id: string; shortName: string; fullName: string }[] } = { value: [] };
  const openTabs: {
    value: { projectId: string; scrollGroupId: number; webViewType: string }[];
  } = { value: [] };
  return {
    mockRecentProjects: { value: undefined as unknown },
    mockProjects: projects,
    mockOpenTabs: openTabs,
  };
});

vi.mock('@papi/frontend', () => {
  const makeProjectDataProvider = (projectId: string) => ({
    getSetting: vi.fn(async (key: string) => {
      const project = mockProjects.value.find((p) => p.id === projectId);
      if (key === 'platform.name') return project?.shortName ?? 'P1';
      if (key === 'platform.fullName') return project?.fullName ?? 'Project One';
      if (key === 'platform.language') return 'en';
      if (key === 'platformScripture.booksPresent') return '';
      return undefined;
    }),
  });
  return {
    default: {
      menuData: { dataProviderName: 'platform.menuData' },
      projectDataProviders: {
        get: vi.fn(async (_providerType: string, projectId: string) =>
          makeProjectDataProvider(projectId),
        ),
      },
      projectLookup: {
        getMetadataForAllProjects: vi.fn(async () => mockProjects.value.map(({ id }) => ({ id }))),
      },
      commands: { sendCommand: vi.fn(async () => undefined) },
      window: { setFocus: vi.fn(async () => undefined) },
    },
    logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    network: { getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())) },
  };
});

vi.mock('@papi/frontend/react', () => ({
  // Echo each requested key back as its own value, which is what useLocalizedStrings does before it
  // resolves. The shared `%projectSelector_*%` block is the exception — the picker treats a key
  // echoed as its own value as unresolved, so those get a resolved-looking value instead.
  useLocalizedStrings: (keys: string[]) => [
    Object.fromEntries(
      keys.map((key) => [key, isProjectSelectorSharedKey(key) ? localizedValueFor(key) : key]),
    ),
    false,
  ],
  useProjectDataProvider: vi.fn(() => undefined),
  useData: vi.fn(() => ({
    RecentProjects: () => [mockRecentProjects.value, vi.fn(), false],
    WebViewMenu: (_selector: unknown, defaultValue: unknown) => [defaultValue, vi.fn(), false],
  })),
}));

vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  // Imported inside the factory: a hoisted `vi.mock` factory must not close over the file's
  // top-level import bindings.
  const { useEffect, useState: useStateInMock } = await import('react');
  return {
    ...original,
    // The real hook subscribes to a PAPI network event; the web view's only use of it is opening
    // the settings dialog, which these tests do not exercise.
    useEvent: vi.fn(),
    // Minimal stand-in for the real hook: start at the caller's default, then re-render once the
    // async source resolves, so tests can drive the web view with a real project list.
    usePromise: (fn: () => Promise<unknown>, defaultValue: unknown) => {
      const [value, setValue] = useStateInMock(defaultValue);
      useEffect(() => {
        let isCurrent = true;
        fn()
          .then((result) => {
            if (isCurrent) setValue(result);
            return undefined;
          })
          .catch(() => {});
        return () => {
          isCurrent = false;
        };
      }, [fn, setValue]);
      return [value, false];
    },
  };
});

vi.mock('./hooks/use-checklist', () => ({
  useChecklistService: vi.fn(() => ({ service: undefined })),
}));

vi.mock('./hooks/use-open-project-tabs', () => ({
  useOpenProjectTabs: vi.fn((filter?: (webView: { webViewType: string }) => boolean) =>
    filter ? mockOpenTabs.value.filter((tab) => filter(tab)) : mockOpenTabs.value,
  ),
}));

// ---------------------------------------------------------------------------
// Import the web view AFTER the mocks. It assigns to global.webViewComponent.
// ---------------------------------------------------------------------------
// Must follow the vi.mock() calls so the side effect runs against the mock boundaries above.
// Vitest's hoisting keeps the execution order correct regardless of static position.
// eslint-disable-next-line import/first
import './checklist.web-view';

function getChecklistWebView(): ComponentType<WebViewProps> {
  // globalThis is a special interface; cast to a record to read the property the module added.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>).webViewComponent as ComponentType<WebViewProps>;
}

function makeProps(onStateChange?: (key: string, value: unknown) => void): WebViewProps {
  // The literal supplies only the props the web view reads; the double cast avoids restating
  // every optional field of WebViewProps.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    projectId: 'project-1',
    updateWebViewDefinition: vi.fn(),
    useWebViewState: vi.fn(
      // useWebViewState is generic (key → TState); a mock cannot express that genericity.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key: string, defaultValue: any): [any, (val: any) => void] => {
        // Stateful so a selection written by the web view feeds straight back in as the picker's
        // `selection` prop — that round trip is what the comparative-texts tests exercise.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState(defaultValue);
        const setStateAndReport = (next: unknown) => {
          onStateChange?.(key, next);
          setValue(next);
        };
        return [value, setStateAndReport];
      },
    ),
    useWebViewScrollGroupScrRef: vi.fn(() => [
      { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English' },
      vi.fn(),
      undefined,
    ]),
  } as unknown as WebViewProps;
}

afterEach(() => {
  vi.clearAllMocks();
});

describe('ChecklistWebView recently-opened-projects wiring', () => {
  it('renders when the recently-opened-projects subscription resolves to an id list', async () => {
    mockRecentProjects.value = ['project-2', 'project-1'];

    const ChecklistWebView = getChecklistWebView();
    render(<ChecklistWebView {...makeProps()} />);

    await waitFor(() => {
      expect(screen.getByTestId('checklist-primary-project-trigger')).toBeInTheDocument();
    });
  });

  it('renders when the recently-opened-projects subscription yields a PlatformError', async () => {
    // The data provider is optional to the checklist: recency only supplies the `lastUsed`
    // grouping's "recently used" presence flag. An unavailable or failing provider must degrade to
    // "no recency", never take the whole web view down.
    mockRecentProjects.value = newPlatformError('recently-opened-projects unavailable');

    const ChecklistWebView = getChecklistWebView();
    render(<ChecklistWebView {...makeProps()} />);

    await waitFor(() => {
      expect(screen.getByTestId('checklist-primary-project-trigger')).toBeInTheDocument();
    });
  });
});

describe('ChecklistWebView picker labels when its own strings are unresolved', () => {
  // Every suite here stubs `useLocalizedStrings` so a `%markersChecklist_*%` key comes back as its
  // own value, which is what the real hook hands over before strings load and on a platform error.
  // The picker treats such a value as unresolved and falls back to its own generic English, so the
  // web view has to supply its specific wording itself for these to render.
  const OTHER_PROJECTS: MockProject[] = [
    { id: 'project-9', shortName: 'P9', fullName: 'Project Nine' },
  ];

  it('labels the comparative-texts picker with its own wording, not the picker default', async () => {
    mockRecentProjects.value = [];
    mockProjects.value = OTHER_PROJECTS;

    const ChecklistWebView = getChecklistWebView();
    render(<ChecklistWebView {...makeProps()} />);

    const trigger = await screen.findByTestId('checklist-comparative-texts-trigger');
    expect(within(trigger).getByRole('combobox')).toHaveTextContent('Select comparative projects');
    expect(within(trigger).getByRole('combobox')).not.toHaveTextContent('Select a project');
  });

  // The primary-project picker's own fallback is the project's NAME, read from a setting rather
  // than localized — so it can never be an unresolved key, but it IS blank until the async read
  // lands. Each state resolves to a different label, and neither may reach the generic default.
  it('labels the primary-project picker with the project name when its own key is unresolved', async () => {
    mockRecentProjects.value = [];
    // No row matches the web view's projectId, so the trigger shows its placeholder rather than a
    // selected project's short name.
    mockProjects.value = OTHER_PROJECTS;

    const ChecklistWebView = getChecklistWebView();
    render(<ChecklistWebView {...makeProps()} />);

    const trigger = await screen.findByTestId('checklist-primary-project-trigger');
    await waitFor(() => {
      expect(within(trigger).getByRole('combobox')).toHaveTextContent('P1');
    });
    expect(within(trigger).getByRole('combobox')).not.toHaveTextContent('Select a project');
  });

  it('labels the primary-project picker with its own wording when the project name is blank too', async () => {
    mockRecentProjects.value = [];
    mockProjects.value = OTHER_PROJECTS;

    const ChecklistWebView = getChecklistWebView();
    // With no project id the name read is skipped, so the picker's second candidate stays blank.
    render(<ChecklistWebView {...makeProps()} projectId="" />);

    const trigger = await screen.findByTestId('checklist-primary-project-trigger');
    expect(within(trigger).getByRole('combobox')).toHaveTextContent(
      'Select primary Scripture text',
    );
    expect(within(trigger).getByRole('combobox')).not.toHaveTextContent('Select a project');
  });
});

describe('ChecklistWebView comparative-texts picker', () => {
  // Two scroll groups of the same project: the case the picker has to keep collapsed, because a
  // comparative-text ref names a project and carries no scroll group.
  const PROJECT_OPEN_TWICE: MockProject[] = [
    { id: 'project-1', shortName: 'P1', fullName: 'Project One' },
    { id: 'project-2', shortName: 'P2', fullName: 'Project Two' },
  ];
  const OPEN_TABS_IN_TWO_GROUPS: MockOpenTab[] = [
    { projectId: 'project-2', scrollGroupId: 0, webViewType: 'platformScriptureEditor.editor' },
    { projectId: 'project-2', scrollGroupId: 1, webViewType: 'platformScriptureEditor.editor' },
  ];

  async function openComparativePicker() {
    // cmdk rows are click targets that fireEvent.click() does not drive; pointerEventsCheck off
    // because jsdom does no layout.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const trigger = await screen.findByTestId('checklist-comparative-texts-trigger');
    const combobox = within(trigger).getByRole('combobox');
    await user.click(combobox);
    return { user, combobox };
  }

  it('offers open-tabs grouping and stores one ref for a project open in two scroll groups', async () => {
    mockRecentProjects.value = [];
    mockProjects.value = PROJECT_OPEN_TWICE;
    mockOpenTabs.value = OPEN_TABS_IN_TWO_GROUPS;
    const comparativeTextsWrites: unknown[] = [];

    const ChecklistWebView = getChecklistWebView();
    render(
      <ChecklistWebView
        {...makeProps((key, value) => {
          if (key === 'checklistComparativeTexts') comparativeTextsWrites.push(value);
        })}
      />,
    );

    const { user } = await openComparativePicker();

    // The grouping is available and active: the open project is bucketed under "Open tabs".
    const openTabsHeading = await screen.findByText(
      localizedValueFor('%projectSelector_openTabsSectionHeading%'),
    );
    expect(openTabsHeading).toBeInTheDocument();

    // One row per project, even though the project is open in two scroll groups.
    const rows = await screen.findAllByRole('option', { name: /P2/ });
    expect(rows).toHaveLength(1);

    await user.click(rows[0]);

    expect(comparativeTextsWrites).toHaveLength(1);
    expect(comparativeTextsWrites[0]).toEqual([{ id: 'project-2', name: 'P2' }]);
  });

  /**
   * The group-by menu trigger inside the open picker popover, found by its menu-popup semantics
   * rather than its accessible name — the name comes from the shared `%projectSelector_*%` block,
   * and the role a dropdown trigger must expose does not move when that string is renamed. The
   * length assertion keeps the query honest: it is the only menu-opening button in the picker.
   */
  function getGroupByTrigger(): HTMLElement {
    const menuTriggers = within(screen.getByRole('dialog'))
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-haspopup') === 'menu');
    expect(menuTriggers).toHaveLength(1);
    return menuTriggers[0];
  }

  it('buckets a project as recently used when the recents id differs only by case', async () => {
    // The recents service stores whatever id its caller handed it, while project metadata carries
    // the canonical (upper-cased) id. A lookup that normalizes only one side misses here and drops
    // every project into "Other" — and no fixture with consistent casing can detect that.
    mockRecentProjects.value = ['project-2'];
    mockProjects.value = [
      { id: 'project-1', shortName: 'P1', fullName: 'Project One' },
      { id: 'PROJECT-2', shortName: 'P2', fullName: 'Project Two' },
    ];
    mockOpenTabs.value = [];

    const ChecklistWebView = getChecklistWebView();
    render(<ChecklistWebView {...makeProps()} />);

    const { user } = await openComparativePicker();
    await user.click(getGroupByTrigger());
    await user.click(
      await screen.findByRole('menuitemradio', {
        name: localizedValueFor('%projectSelector_grouping_lastUsed_label%'),
      }),
    );

    // PROJECT-2 is the only comparative row (the primary project is filtered out), so exactly one
    // of these two headings can render: which one is the whole assertion.
    expect(
      await screen.findByText(
        localizedValueFor('%projectSelector_grouping_lastUsed_recentSectionHeading%'),
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        localizedValueFor('%projectSelector_grouping_lastUsed_otherSectionHeading%'),
      ),
    ).not.toBeInTheDocument();
  });

  it('round-trips the stored ref so the selected row toggles back off', async () => {
    mockRecentProjects.value = [];
    mockProjects.value = PROJECT_OPEN_TWICE;
    mockOpenTabs.value = OPEN_TABS_IN_TWO_GROUPS;
    const comparativeTextsWrites: unknown[] = [];

    const ChecklistWebView = getChecklistWebView();
    render(
      <ChecklistWebView
        {...makeProps((key, value) => {
          if (key === 'checklistComparativeTexts') comparativeTextsWrites.push(value);
        })}
      />,
    );

    const { user, combobox } = await openComparativePicker();

    await user.click((await screen.findAllByRole('option', { name: /P2/ }))[0]);
    // The stored ref feeds back in as the picker's selection, so the trigger names the project.
    await waitFor(() => expect(combobox).toHaveTextContent('P2'));

    // Clicking the same row again must clear it — a selection that cannot round-trip back onto
    // its row would re-add instead of toggling off.
    await user.click((await screen.findAllByRole('option', { name: /P2/ }))[0]);
    expect(comparativeTextsWrites).toHaveLength(2);
    expect(comparativeTextsWrites[1]).toEqual([]);
  });
});
