// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';
import type { WebViewProps } from '@papi/core';
import type { IChecklistService } from 'platform-scripture';
import { newPlatformError } from 'platform-bible-utils';
import { useChecklistService } from './hooks/use-checklist';
import { localizedValueFor } from './project-selector.test-utils';

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

type MockProject = { id: string; shortName: string; fullName?: string };
type MockOpenTab = { projectId: string; scrollGroupId: number; webViewType: string };

const { mockChecklistService, mockRecentProjects, mockProjects, mockOpenTabs } = vi.hoisted(() => {
  const projects: { value: { id: string; shortName: string; fullName?: string }[] } = {
    value: [],
  };
  const openTabs: {
    value: { projectId: string; scrollGroupId: number; webViewType: string }[];
  } = { value: [] };
  return {
    mockChecklistService: { value: undefined as unknown },
    mockRecentProjects: { value: undefined as unknown },
    mockProjects: projects,
    mockOpenTabs: openTabs,
  };
});

vi.mock('@papi/frontend', () => {
  const makeProjectDataProvider = () => ({
    getSetting: vi.fn(async (key: string) => {
      if (key === 'platformScripture.booksPresent') return '';
      return undefined;
    }),
  });
  return {
    default: {
      menuData: { dataProviderName: 'platform.menuData' },
      projectDataProviders: {
        get: vi.fn(async () => makeProjectDataProvider()),
      },
      projectLookup: {
        // The web view reads names and language off metadata, not off `pdp.getSetting` — the
        // `platform.fullName` setting carries a localized `*Name Missing*` default that would
        // render as a real full name. Mirror that contract: `name`/`fullName` are optional, and a
        // fixture without a full name simply omits the field.
        getMetadataForAllProjects: vi.fn(async () =>
          mockProjects.value.map(({ id, shortName, fullName }) => ({
            id,
            name: shortName,
            ...(fullName ? { fullName } : {}),
            language: 'en',
          })),
        ),
        getMetadataForProject: vi.fn(async (id: string) => {
          const project = mockProjects.value.find((p) => p.id === id);
          if (!project) throw new Error(`No metadata for ${id}`);
          const { shortName, fullName } = project;
          return { id, name: shortName, ...(fullName ? { fullName } : {}), language: 'en' };
        }),
      },
      commands: { sendCommand: vi.fn(async () => undefined) },
      window: { setFocus: vi.fn(async () => undefined) },
    },
    logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    network: { getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())) },
  };
});

vi.mock('@papi/frontend/react', async () => {
  // Imported inside the factory: `vi.mock` factories are hoisted above the file's imports, so a
  // top-level binding may still be in its temporal dead zone when the factory runs. One rule, no
  // exceptions — whether the helper happens to be initialized first depends on module load order,
  // which is not a property a test should rest on. Aliased because the same names are bound at the
  // top level.
  const { isProjectSelectorSharedKey: isSharedKey, localizedValueFor: valueFor } = await import(
    './project-selector.test-utils'
  );
  return {
    // Echo each requested key back as its own value, which is what useLocalizedStrings does before
    // it resolves. Two exceptions: the picker treats a key echoed as its own value as unresolved,
    // so the shared `%projectSelector_*%` block gets a resolved-looking value instead; and the
    // column header's aria template is echoed back resolved because dropping its `{name}`
    // placeholder would remove the only place the composed project name is observable.
    useLocalizedStrings: (keys: string[]) => [
      Object.fromEntries(
        keys.map((key) => {
          if (key === '%markersChecklist_columnHeader_aria%') return [key, 'Project: {name}'];
          return [key, isSharedKey(key) ? valueFor(key) : key];
        }),
      ),
      false,
    ],
    useProjectDataProvider: vi.fn(() => undefined),
    useData: vi.fn(() => ({
      RecentProjects: () => [mockRecentProjects.value, vi.fn(), false],
      WebViewMenu: (_selector: unknown, defaultValue: unknown) => [defaultValue, vi.fn(), false],
    })),
  };
});

vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  // Imported inside the factory, for the same reason as above. Aliased where the name is also
  // bound at the top level.
  const { useEffect: useEffectInMock, useState: useStateInMock } = await import('react');
  return {
    ...original,
    // The real hook subscribes to a PAPI network event; the web view's only use of it is opening
    // the settings dialog, which these tests do not exercise.
    useEvent: vi.fn(),
    // Minimal stand-in for the real hook: start at the caller's default, then re-render once the
    // async source resolves, so tests can drive the web view with a real project list.
    usePromise: (fn: () => Promise<unknown>, defaultValue: unknown) => {
      const [value, setValue] = useStateInMock(defaultValue);
      useEffectInMock(() => {
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
  useChecklistService: vi.fn(() => ({ service: mockChecklistService.value })),
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
  // Every hoisted fixture, not just the service: a test that leaves `mockProjects` or
  // `mockRecentProjects` populated makes the next one pass on state it never set up, so the suite's
  // result depends on file order.
  mockChecklistService.value = undefined;
  mockRecentProjects.value = undefined;
  mockProjects.value = [];
  mockOpenTabs.value = [];
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

// The module-level stub leaves `%markersChecklist_*%` keys echoed as their own values, which is
// the unresolved path (see `./project-selector.test-utils`). The picker would fall back to its own
// generic English there, so the web view has to supply its specific wording itself.
describe('ChecklistWebView picker labels when its own strings are unresolved', () => {
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

  it('labels the primary-project picker with its own wording, not the picker default', async () => {
    mockRecentProjects.value = [];
    // No row matches the web view's projectId, so the trigger shows its placeholder rather than a
    // selected project's short name.
    mockProjects.value = OTHER_PROJECTS;

    const ChecklistWebView = getChecklistWebView();
    render(<ChecklistWebView {...makeProps()} />);

    const trigger = await screen.findByTestId('checklist-primary-project-trigger');
    expect(within(trigger).getByRole('combobox')).toHaveTextContent(
      'Select primary Scripture text',
    );
    expect(within(trigger).getByRole('combobox')).not.toHaveTextContent('Select a project');
  });

  // Visible text and accessible name come from one value per picker, so a screen reader user can
  // tell the two toolbar comboboxes apart on the unresolved path — where both would otherwise be
  // announced as the picker's generic "Projects & resources".
  it('gives each picker a distinct accessible name', async () => {
    mockRecentProjects.value = [];
    mockProjects.value = OTHER_PROJECTS;

    const ChecklistWebView = getChecklistWebView();
    render(<ChecklistWebView {...makeProps()} />);

    await screen.findByTestId('checklist-primary-project-trigger');
    expect(
      screen.getByRole('combobox', { name: 'Select primary Scripture text' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: 'Select comparative projects' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('combobox', { name: 'Projects & resources' }),
    ).not.toBeInTheDocument();
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

describe('ChecklistWebView column full names', () => {
  /** A minimal success response: the column identity fields the header reads, and nothing else. */
  function serviceWithColumns(columnProjectIds: string[], columnHeaders: string[]) {
    return {
      buildChecklistData: vi.fn(async () => ({
        success: true,
        rows: [],
        columnHeaders,
        columnProjectIds,
        excludedCount: 0,
        helpText: undefined,
        truncated: false,
        emptyResultMessage: undefined,
      })),
    };
  }

  it('heads a column with its short name and announces the full name behind it', async () => {
    mockRecentProjects.value = [];
    mockProjects.value = [
      { id: 'project-1', shortName: 'P1', fullName: 'Project One' },
      // No full name of its own — the header has only the short name to announce.
      { id: 'project-2', shortName: 'P2' },
    ];
    mockOpenTabs.value = [];
    mockChecklistService.value = serviceWithColumns(['project-1', 'project-2'], ['P1', 'P2']);

    const ChecklistWebView = getChecklistWebView();
    render(<ChecklistWebView {...makeProps()} />);

    // The full name is resolved from metadata, so it arrives a tick after the columns render —
    // re-query each time rather than holding the first render's nodes.
    await waitFor(() => {
      const [first] = screen.getAllByTestId('checklist-column-header');
      expect(first.getAttribute('aria-label')).toContain('P1 - Project One');
    });
    const headers = screen.getAllByTestId('checklist-column-header');
    // Visible text stays the short name in both cases; only the announced name differs.
    expect(headers[0]).toHaveTextContent('P1');
    expect(headers[1]).toHaveTextContent('P2');
    expect(headers[1].getAttribute('aria-label')).toContain('P2');
    expect(headers[1].getAttribute('aria-label')).not.toContain(' - ');
  });
});

describe('ChecklistWebView data loading across web view definition updates', () => {
  /**
   * Props whose `useWebViewState` follows the platform hook's update semantics: every write to the
   * web view's state is broadcast to every slot, and a slot whose key is absent from the broadcast
   * state resets to the default the caller passed on its latest render. Content zoom writes its
   * levels into the same state on every step, so a slot left at its default sees that reset on
   * every zoom step.
   */
  function makePropsWithSharedState() {
    let webViewState: Record<string, unknown> = {};
    const scrRef = { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English' };
    const setScrRef = vi.fn();
    const listeners = new Set<(state: Record<string, unknown>) => void>();
    const writeState = (next: Record<string, unknown>) => {
      webViewState = next;
      listeners.forEach((listener) => listener(next));
    };
    function useSharedWebViewState(key: string, defaultValue: unknown) {
      const defaultRef = useRef(defaultValue);
      defaultRef.current = defaultValue;
      const [value, setValue] = useState(() =>
        key in webViewState ? webViewState[key] : defaultValue,
      );
      useEffect(() => {
        const listener = (state: Record<string, unknown>) =>
          setValue(key in state ? state[key] : defaultRef.current);
        listeners.add(listener);
        return () => {
          listeners.delete(listener);
        };
      }, [key]);
      // Stable per key, like the platform hook's setter.
      const setState = useCallback(
        (next: unknown) => writeState({ ...webViewState, [key]: next }),
        [key],
      );
      return [value, setState];
    }
    // The literal supplies only the props the web view reads; the double cast avoids restating
    // every optional field of WebViewProps.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const props = {
      projectId: 'project-1',
      updateWebViewDefinition: vi.fn(),
      useWebViewState: useSharedWebViewState,
      // The platform hook keeps the reference's identity until the reference changes.
      useWebViewScrollGroupScrRef: () => [scrRef, setScrRef, undefined],
    } as unknown as WebViewProps;
    const writeContentZoomLevel = (level: number) =>
      writeState({ ...webViewState, 'platform.contentZoomLevels': { main: level } });
    return { props, writeContentZoomLevel };
  }

  const buildChecklistData = vi.fn(async () => ({
    rows: [],
    columnHeaders: [],
    columnProjectIds: [],
    excludedCount: 0,
    truncated: false,
  }));
  const service = { buildChecklistData, validateMarkerSettings: vi.fn() };

  async function waitForQuiet() {
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 400);
      });
    });
  }

  beforeEach(() => {
    mockRecentProjects.value = [];
    mockProjects.value = [];
    mockOpenTabs.value = [];
    vi.mocked(useChecklistService).mockImplementation(() => ({
      // The mock supplies only the methods the web view calls.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      service: service as unknown as IChecklistService,
      isEditable: false,
    }));
  });

  afterEach(() => {
    vi.mocked(useChecklistService).mockImplementation(() => ({
      service: undefined,
      isEditable: false,
    }));
  });

  it('does not reload the checklist when a content zoom step writes the web view state', async () => {
    const { props, writeContentZoomLevel } = makePropsWithSharedState();
    const ChecklistWebView = getChecklistWebView();
    render(<ChecklistWebView {...props} />);

    // Settle the mount-time loads: the first request, then the one for the verse range the
    // auto-follow effect derives from the current reference.
    await waitFor(() => expect(buildChecklistData.mock.calls.length).toBeGreaterThanOrEqual(2), {
      timeout: 2000,
    });
    await waitForQuiet();
    const callsBeforeZoom = buildChecklistData.mock.calls.length;

    await act(async () => {
      writeContentZoomLevel(1.1);
    });
    await act(async () => {
      writeContentZoomLevel(1.2);
    });
    await waitForQuiet();

    expect(buildChecklistData).toHaveBeenCalledTimes(callsBeforeZoom);
  });
});
