// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState, type ComponentType } from 'react';
import type { WebViewProps } from '@papi/core';
import { newPlatformError } from 'platform-bible-utils';
import { installManageBooksJsdomShims } from './manage-books-dialog/manage-books-dialog.test-utils';
import { isProjectSelectorSharedKey, localizedValueFor } from './project-selector.test-utils';

let uninstallShims: () => void;

beforeAll(() => {
  uninstallShims = installManageBooksJsdomShims();
  if (typeof Element.prototype.scrollTo !== 'function') {
    Element.prototype.scrollTo = () => {};
  }
});

afterAll(() => {
  uninstallShims();
});

// ---------------------------------------------------------------------------
// Hoisted mocks — must precede any import that touches the web view
// ---------------------------------------------------------------------------

/** One entry of the `filterProjects` wire result, as the C# `ProjectListResult` carries it. */
type MockWireProject = {
  projectId: string;
  name: string;
  projectType: string;
  isEditable: boolean;
  isResource: boolean;
  fullName: string;
  versification: string;
};

const { mockRecentProjects, mockWireProjects } = vi.hoisted(() => {
  // Annotated rather than asserted: `undefined`/`[]` would otherwise narrow to types no test can
  // assign a real fixture to.
  const recentProjects: { value: unknown } = { value: undefined };
  const wireProjects: { value: MockWireProject[] } = { value: [] };
  return { mockRecentProjects: recentProjects, mockWireProjects: wireProjects };
});

vi.mock('@papi/frontend', () => ({
  default: {
    networkObjects: {
      get: vi.fn(async () => ({
        filterProjects: vi.fn(async () => ({ projects: mockWireProjects.value })),
        isProjectShared: vi.fn(async () => false),
        getBookComparison: vi.fn(async () => ({ entries: [] })),
        getProjectBookDates: vi.fn(async () => ({ entries: [] })),
      })),
    },
    projectDataProviders: {
      get: vi.fn(async () => ({ getSetting: vi.fn(async () => undefined) })),
    },
    commands: { sendCommand: vi.fn(async () => undefined) },
    notifications: { send: vi.fn(async () => undefined) },
  },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

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
  useProjectSetting: (_projectId: unknown, _key: unknown, defaultValue: unknown) => [
    defaultValue,
    vi.fn(),
    false,
  ],
  useData: vi.fn(() => ({
    RecentProjects: () => [mockRecentProjects.value, vi.fn(), false],
  })),
}));

vi.mock('./hooks/use-open-project-tabs', () => ({
  useOpenProjectTabs: vi.fn(() => []),
}));

// ---------------------------------------------------------------------------
// Import the web view AFTER the mocks. It assigns to global.webViewComponent.
// ---------------------------------------------------------------------------
// Must follow the vi.mock() calls so the side effect runs against the mock boundaries above.
// Vitest's hoisting keeps the execution order correct regardless of static position.
// eslint-disable-next-line import/first
import './manage-books.web-view';

function getManageBooksWebView(): ComponentType<WebViewProps> {
  // globalThis is a special interface; cast to a record to read the property the module added.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>).webViewComponent as ComponentType<WebViewProps>;
}

function makeProps(): WebViewProps {
  // The literal supplies only the props the web view reads; the double cast avoids restating
  // every optional field of WebViewProps.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    projectId: 'PROJECT-A',
    updateWebViewDefinition: vi.fn(() => true),
    useWebViewState: vi.fn(
      // useWebViewState is generic (key → TState); a mock cannot express that genericity.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (_key: string, defaultValue: any): [any, (val: any) => void] => {
        // Stateful so the web view's own writes (projectId persistence) feed straight back in,
        // matching how the platform's real useWebViewState behaves. A hook inside a mock callback
        // is the only way to get that, and the callback is only ever called during render.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState(defaultValue);
        return [value, setValue];
      },
    ),
  } as unknown as WebViewProps;
}

const wireProject = (overrides: Partial<MockWireProject>): MockWireProject => ({
  projectId: 'PROJECT-A',
  name: 'A',
  projectType: 'Standard',
  isEditable: true,
  isResource: false,
  fullName: 'Project A',
  versification: '4',
  ...overrides,
});

/**
 * Open the sidebar's primary project picker. Returns the user-event driver and the picker's own
 * popover, resolved through the combobox's `aria-controls` — the dialog renders other menus of its
 * own, so a document-wide query cannot tell the picker's controls from theirs.
 */
async function openSidebarPicker() {
  // cmdk rows are click targets that fireEvent.click() does not drive; pointerEventsCheck off
  // because jsdom does no layout.
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const trigger = await screen.findByTestId('manage-books-sidebar-project-trigger');
  const combobox = within(trigger).getByRole('combobox');
  await user.click(combobox);
  const popover = document.getElementById(combobox.getAttribute('aria-controls') ?? '');
  expect(popover).not.toBeNull();
  return { user, popover: popover ?? document.body };
}

/**
 * The group-by menu trigger inside the open picker popover, found by its menu-popup semantics
 * rather than its accessible name — the name comes from the shared `%projectSelector_*%` block, and
 * the role a dropdown trigger must expose does not move when that string is renamed. The length
 * assertion keeps the query honest: it is the only menu-opening button in the picker.
 */
function getGroupByTrigger(popover: HTMLElement): HTMLElement {
  const menuTriggers = within(popover)
    .getAllByRole('button')
    .filter((button) => button.getAttribute('aria-haspopup') === 'menu');
  expect(menuTriggers).toHaveLength(1);
  return menuTriggers[0];
}

afterEach(() => {
  vi.clearAllMocks();
});

describe('ManageBooksWebView sidebar project grouping', () => {
  it('buckets sidebar projects by project type from the wire', async () => {
    mockRecentProjects.value = [];
    mockWireProjects.value = [
      wireProject({ projectId: 'PROJECT-A', name: 'A', fullName: 'Project A' }),
      wireProject({
        projectId: 'PROJECT-B',
        name: 'B',
        fullName: 'Project B',
        projectType: 'BackTranslation',
      }),
    ];

    const ManageBooksWebView = getManageBooksWebView();
    render(<ManageBooksWebView {...makeProps()} />);

    const { user, popover } = await openSidebarPicker();
    await user.click(getGroupByTrigger(popover));
    await user.click(
      await screen.findByRole('menuitemradio', {
        name: localizedValueFor('%projectSelector_grouping_type_label%'),
      }),
    );

    // Headings are the localized type names, not the raw PT9 `ProjectType` enum values the wire
    // carries (the mock echoes each requested localize key back as its own value).
    expect(await screen.findByText('%manageBooks_projectType_Standard%')).toBeInTheDocument();
    expect(screen.getByText('%manageBooks_projectType_BackTranslation%')).toBeInTheDocument();
    expect(screen.queryByText('BackTranslation')).not.toBeInTheDocument();
  });

  it('buckets a project as recently used when the recents id differs only by case', async () => {
    // The recents service stores whatever id its caller handed it, while the wire carries the
    // canonical (upper-cased) id. A lookup that normalizes only one side misses here and drops
    // every project into "Other" — and no fixture with consistent casing can detect that.
    mockRecentProjects.value = ['project-a'];
    mockWireProjects.value = [wireProject({})];

    const ManageBooksWebView = getManageBooksWebView();
    render(<ManageBooksWebView {...makeProps()} />);

    const { user, popover } = await openSidebarPicker();
    await user.click(getGroupByTrigger(popover));
    await user.click(
      await screen.findByRole('menuitemradio', {
        name: localizedValueFor('%projectSelector_grouping_lastUsed_label%'),
      }),
    );

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

  it('renders when the recently-opened-projects subscription yields a PlatformError', async () => {
    // Recency is optional here: it only supplies the built-in `lastUsed` grouping's "recently
    // used" presence flag. An unavailable provider must degrade to "no recency", never take the
    // whole web view down.
    mockRecentProjects.value = newPlatformError('recently-opened-projects unavailable');
    mockWireProjects.value = [wireProject({})];

    const ManageBooksWebView = getManageBooksWebView();
    render(<ManageBooksWebView {...makeProps()} />);

    expect(await screen.findByTestId('manage-books-sidebar-project-trigger')).toBeInTheDocument();
  });

  it('does not offer the language grouping, which has no source on the manage-books wire', async () => {
    mockRecentProjects.value = [];
    mockWireProjects.value = [wireProject({})];

    const ManageBooksWebView = getManageBooksWebView();
    render(<ManageBooksWebView {...makeProps()} />);

    const { user, popover } = await openSidebarPicker();
    await user.click(getGroupByTrigger(popover));

    expect(
      await screen.findByRole('menuitemradio', {
        name: localizedValueFor('%projectSelector_grouping_type_label%'),
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('menuitemradio', {
        name: localizedValueFor('%projectSelector_grouping_language_label%'),
      }),
    ).not.toBeInTheDocument();
  });
});
