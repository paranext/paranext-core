import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { sendCommand } from '@shared/services/command.service';
import { PlatformBibleToolbar } from './platform-bible-toolbar';

// The toolbar's unit tests replace `platform-bible-react/experimental` with a stub selector so they
// can assert on the props the toolbar hands it. This file deliberately mocks neither
// `platform-bible-react` nor `platform-bible-react/experimental`, so the real `ProjectSelector`
// renders inside the real toolbar and a prop combination the component rejects at runtime fails
// here instead of passing green against a double. It is a seam test: `ProjectSelector`'s own list,
// section and footer behavior is covered in
// `lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.test.tsx`.
//
// Scope limit, because it is easy to over-trust these assertions: `platform-bible-react`'s
// `exports` map sends `./experimental` to `dist/experimental.js`, so the component under test here
// is the BUILT bundle, not `project-selector.component.tsx`. These tests therefore guard the
// toolbar's side of the seam — the props it passes, and whether the real component accepts that
// combination as shipped. A regression in the component's own source is caught by its source-level
// test above, and only reaches this file once `dist/` is rebuilt.

// Mock asset
vi.mock('@assets/icon.png', () => ({ default: 'icon.png' }));

vi.mock('@renderer/components/user-profile-popover/user-profile-popover.component', () => ({
  UserProfilePopover: () => <div data-testid="user-profile-popover-stub" />,
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%toolbar_sync%': 'Sync',
      '%toolbar_sync_open_status%': 'Test Sync status',
      '%toolbar_sync_status_synced%': 'Test Synced',
      '%toolbar_sync_status_syncing%': 'Test Syncing',
      '%toolbar_sync_status_unknown%': 'Test Sync status unavailable',
      '%mainMenu_openHome%': 'Home',
      '%projectPicker_no_results%': 'Test no projects found',
      '%projectPicker_readOnly_label%': 'Test read-only',
      '%projectPicker_search_placeholder%': 'Test search projects',
      '%projectPicker_section_projects_localOnly%': 'Test your projects on this computer',
      '%projectPicker_section_recent%': 'Test recent',
      '%projectPicker_toolbar_more_projects%': 'Test more projects',
      '%projectPicker_toolbar_no_projects%': 'Test no projects',
      '%projectPicker_toolbar_select_project%': 'Test select a project',
    },
  ]),
  useScrollGroupScrRef: vi.fn(() => [
    { book: 'GEN', chapterNum: 1, verseNum: 1 },
    vi.fn(),
    0,
    vi.fn(),
    undefined,
  ]),
  useRecentScriptureRefs: vi.fn(() => ({
    recentScriptureRefs: [],
    addRecentScriptureRef: vi.fn(),
  })),
  useData: vi.fn(() => ({
    CurrentTheme: vi.fn(() => [
      { type: 'light', id: 'light', themeFamilyId: 'light', label: 'Light', cssVariables: {} },
      vi.fn(),
    ]),
    MainMenu: vi.fn(() => [{ columns: {}, groups: {}, items: [] }, vi.fn(), false]),
  })),
  useDataProvider: vi.fn(() => undefined),
  useDialogCallback: vi.fn(() => vi.fn()),
  useSetting: vi.fn(() => ['simple', vi.fn(), vi.fn(), false]),
  useProjectSetting: vi.fn(() => ['', vi.fn(), vi.fn(), false]),
}));

vi.mock('@renderer/hooks/use-navigation-target-web-view.hook', () => ({
  useNavigationTargetWebView: vi.fn(() => undefined),
}));

vi.mock('@renderer/hooks/use-send-receive-availability.hook', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@renderer/hooks/use-send-receive-availability.hook')>();
  return { ...actual, useSendReceiveAvailability: vi.fn((): boolean | undefined => true) };
});

vi.mock('@renderer/hooks/use-open-project-book-ids.hook', () => ({
  useOpenProjectBookIds: vi.fn(() => ['REV']),
}));

vi.mock('@renderer/hooks/use-window-controls-overlay.hook', () => ({
  useWindowControlsOverlay: vi.fn((): DOMRect | undefined => undefined),
}));

vi.mock('@renderer/services/web-view.service-shard', () => ({
  updateWebViewDefinitionSync: vi.fn(() => true),
}));

vi.mock('@renderer/services/book-chapter-control.registry', () => ({
  registerBookChapterControlHandle: vi.fn(() => vi.fn()),
  TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID: 'top-toolbar',
}));

vi.mock('@renderer/services/papi-frontend.service', () => ({
  app: {
    getMarketingInfo: vi.fn(async () => ({
      marketingVersion: '1.0.0',
      marketingVersionMoniker: undefined,
    })),
  },
  dataProviders: {
    get: vi.fn(async () => undefined),
  },
}));

vi.mock('@renderer/services/theme.service', () => ({
  localThemeService: {
    getCurrentThemeSync: vi.fn(() => ({
      type: 'light',
      id: 'light',
      themeFamilyId: 'light',
      label: 'Light',
      cssVariables: {},
    })),
  },
}));

vi.mock('@renderer/services/scroll-group.service', () => ({
  availableScrollGroupIds: [1, 2, 3, 4, 5],
  getReferenceHistorySync: vi.fn(() => ({ current: undefined, back: [], forward: [] })),
  navigateReferenceHistorySync: vi.fn(() => false),
  onDidChangeReferenceHistory: vi.fn(() => vi.fn()),
}));

vi.mock('@shared/data/platform-bible-menu.commands', () => ({
  handleMenuCommand: vi.fn(),
}));

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(),
}));

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())),
  // network-object.service subscribes to this at module load so a process that leaves during
  // startup is still announced, and this test reaches that module on its import path.
  onDidDisconnectClient: vi.fn(() => vi.fn()),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

vi.mock('@shared/services/notification.service', () => ({
  notificationService: { send: vi.fn(async () => 'notification-id') },
}));

const PROJECTS = [
  { id: 'p1', shortName: 'P1', fullName: 'Project One', isEditable: true },
  { id: 'p2', shortName: 'P2', fullName: 'Project Two', isEditable: false },
];

vi.mock('@renderer/hooks/use-project-picker-data.hook', () => ({
  useProjectPickerData: vi.fn(() => ({
    currentSimpleProject: undefined,
    recentProjects: [],
    allProjects: [],
    currentSimpleProjectError: undefined,
    isLoading: false,
  })),
}));

/** Shared no-op body for the jsdom stubs below, none of which do anything. */
const doNothing = () => {};

// Radix and cmdk (the popover and command primitives the real `ProjectSelector` is built from) call
// browser APIs jsdom does not implement. No-op stubs suffice; nothing here asserts layout.
beforeAll(() => {
  global.ResizeObserver = class {
    observe = doNothing;

    unobserve = doNothing;

    disconnect = doNothing;
  };
  Element.prototype.scrollTo = doNothing;
  Element.prototype.scrollIntoView = doNothing;
});

beforeEach(() => {
  vi.clearAllMocks();
  globalThis.isMainWindow = true;
  // The real `useInterfaceMode` runs in these tests and caches the resolved mode, so without this a
  // previously resolved mode would leak between tests.
  localStorage.clear();
  // sendCommand has a complex generic signature; cast is required for the mock implementation
  // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
  vi.mocked(sendCommand).mockImplementation((async (commandName: string) => {
    if (commandName === 'platformGetResources.isSendReceiveAvailable') return true;
    if (commandName === 'platform.getOSPlatform') return 'win32';
    if (commandName === 'platform.isFullScreen') return false;
    return undefined;
    // sendCommand has a complex generic signature; cast is required for the mock implementation
    // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
  }) as any);
});

/**
 * Renders the toolbar with the given picker data and returns a `userEvent` session. Radix Popover
 * and cmdk rely on PointerEvent sequences `fireEvent.click()` does not synthesize, so
 * `pointerEventsCheck: 0` is the standard jsdom workaround.
 */
async function renderSimpleToolbarWith(data: {
  currentSimpleProject?: (typeof PROJECTS)[number];
  recentProjects?: typeof PROJECTS;
  allProjects?: typeof PROJECTS;
}) {
  const { useProjectPickerData } = await import('@renderer/hooks/use-project-picker-data.hook');
  vi.mocked(useProjectPickerData).mockReturnValue({
    currentSimpleProject: undefined,
    recentProjects: [],
    allProjects: [],
    currentSimpleProjectError: undefined,
    isLoading: false,
    ...data,
  });
  render(<PlatformBibleToolbar />);
  return userEvent.setup({ pointerEventsCheck: 0 });
}

describe('PlatformBibleToolbar — real ProjectSelector integration', () => {
  it('renders the real selector trigger in the toolbar in simple mode', async () => {
    await renderSimpleToolbarWith({
      currentSimpleProject: PROJECTS[0],
      recentProjects: [PROJECTS[0]],
      allProjects: [PROJECTS[1]],
    });

    // `combobox` is the real trigger's role, and the aria label is the one the toolbar localizes —
    // a stub selector satisfies neither.
    const trigger = await screen.findByRole('combobox', { name: /^Test select a project/ });
    expect(trigger).toBeInTheDocument();
    // Nothing measures the toolbar in jsdom, so the shrink step sits at its narrowest and the
    // compound label shows the short name alone.
    expect(trigger).toHaveTextContent('P1');
  });

  it('names the open project in the accessible name, not just the control', async () => {
    await renderSimpleToolbarWith({
      currentSimpleProject: PROJECTS[0],
      recentProjects: [PROJECTS[0]],
      allProjects: [PROJECTS[1]],
    });

    // `aria-label` replaces the trigger's content in the accessible-name computation rather than
    // adding to it, so naming only the control would leave the project visible to sighted users
    // and inaudible to a screen reader. Queried by role rather than by reading the attribute, so
    // the assertion fails if any future change reintroduces a content-suppressing name.
    expect(
      await screen.findByRole('combobox', { name: 'Test select a project: P1 - Project One' }),
    ).toBeInTheDocument();
  });

  it('falls back to the placeholder in the accessible name when no project is open', async () => {
    await renderSimpleToolbarWith({ currentSimpleProject: undefined });

    expect(await screen.findByRole('combobox', { name: 'Test no projects' })).toBeInTheDocument();
  });

  it('shows the toolbar-supplied sections and the more-projects footer when opened', async () => {
    const user = await renderSimpleToolbarWith({
      currentSimpleProject: PROJECTS[0],
      recentProjects: [PROJECTS[0]],
      allProjects: [PROJECTS[1]],
    });

    await user.click(await screen.findByRole('combobox', { name: /^Test select a project/ }));

    // The real component accepts the toolbar's custom grouping — `availableGroupings: ['custom']`
    // with `hideFilterMenu` — and renders the toolbar's own section headings over its projects.
    const recent = (await screen.findByText('Test recent')).closest('[cmdk-group=""]');
    expect(recent).toHaveTextContent('P1');
    const yours = screen
      .getByText('Test your projects on this computer')
      .closest('[cmdk-group=""]');
    expect(yours).toHaveTextContent('P2');

    expect(screen.getByTestId('project-selector-footer-action')).toHaveTextContent(
      'Test more projects',
    );
  });

  it('shows no untranslated selector default anywhere in the open popover', async () => {
    const user = await renderSimpleToolbarWith({
      currentSimpleProject: PROJECTS[0],
      recentProjects: [PROJECTS[0]],
      allProjects: [PROJECTS[1]],
    });

    await user.click(await screen.findByRole('combobox', { name: /^Test select a project/ }));
    await screen.findByTestId('project-selector-footer-action');

    // The toolbar localizes only `searchPlaceholder` of `ProjectSelectorLocalizedStrings`; the rest
    // keep the component's English defaults and stay unreachable only because of how this call site
    // is configured (`hideFilterMenu`, empty `openTabs`, and a catch-all last section that leaves
    // the unmatched bucket empty). Change any of those and a default starts rendering untranslated,
    // which no other assertion here would notice.
    // Taken verbatim from the component's own DEFAULT_STRINGS, so a rename there surfaces here
    // rather than leaving this asserting the absence of text that no longer exists.
    const defaults = [
      'Search projects & resources',
      'Group by',
      'View options',
      'Opened project & resource tabs',
      'Your projects & resources',
      'Open',
      'Other',
    ];
    defaults.forEach((text) => {
      expect(screen.queryByText(text)).toBeNull();
    });
  });

  it('offers more-projects AND the empty message with zero local projects', async () => {
    const user = await renderSimpleToolbarWith({
      currentSimpleProject: undefined,
      recentProjects: [],
      allProjects: [],
    });

    // The trigger stays enabled with nothing to list — the escape hatch matters most here, and the
    // picker this replaced disabled itself in exactly this state.
    const trigger = await screen.findByRole('combobox', { name: 'Test no projects' });
    expect(trigger).toBeEnabled();
    await user.click(trigger);

    // Both, against the REAL component under the toolbar's own prop combination: `forceMount` keeps
    // the footer out of cmdk's registered-item set, so `filtered.count` stays 0 and CommandEmpty
    // still renders. An ordinarily-registered footer row would satisfy the first assertion and
    // silently break the second, which the prop-level test against the stub cannot see.
    expect(await screen.findByTestId('project-selector-footer-action')).toHaveTextContent(
      'Test more projects',
    );
    expect(screen.getByText('Test no projects found')).toBeInTheDocument();
  });
});
