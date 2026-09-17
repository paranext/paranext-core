import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { useIsProjectAutoSyncBlocked } from '@renderer/hooks/use-is-project-auto-sync-blocked.hook';
import userEvent from '@testing-library/user-event';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { SettingsTab } from './settings-tab.component';
import {
  PROJECT_SELECTOR_NO_RESULTS_KEY,
  PROJECT_SELECTOR_SEARCH_PLACEHOLDER_KEY,
} from './settings-tab.localization';

const SYNC_BLOCKED_NOTICE_KEY = '%settings_projectSyncBlocked_notice%';
const SYNC_BLOCKED_NOTICE_TEXT = 'Editing paused for Send/Receive';
const PROJECTS_GROUP_LABEL = 'Ajustes del proyecto';
const PICKER_SEARCH_PLACEHOLDER = 'Buscar proyectos y recursos';
const PICKER_NO_RESULTS = 'No se encontraron proyectos';
const PROJECT_NAME = 'World English Bible';

// The hook under wiring test — controlled per test to simulate a blocked / unblocked project.
vi.mock('@renderer/hooks/use-is-project-auto-sync-blocked.hook', () => ({
  useIsProjectAutoSyncBlocked: vi.fn(),
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      [SYNC_BLOCKED_NOTICE_KEY]: SYNC_BLOCKED_NOTICE_TEXT,
      '%settings_sidebar_projectSettingsLabel%': PROJECTS_GROUP_LABEL,
      [PROJECT_SELECTOR_SEARCH_PLACEHOLDER_KEY]: PICKER_SEARCH_PLACEHOLDER,
      [PROJECT_SELECTOR_NO_RESULTS_KEY]: PICKER_NO_RESULTS,
    },
  ]),
}));

// This test only exercises SettingsTab's own render structure (one notice above N groups) — the
// leaf list rendering (properties, disabled wiring) is covered by
// project-or-other-settings-list.component.test.tsx and setting.component.test.tsx. Stub it to a
// simple marker so a fake project-settings shape can drive multiple groups without wiring up real
// setting values.
vi.mock('./settings-components/project-or-other-settings-list.component', () => ({
  ProjectOrOtherSettingsList: ({
    groupLabel,
    projectId,
  }: {
    groupLabel: string;
    projectId?: string;
  }) => (
    <div data-testid="settings-group" data-project-id={projectId}>
      {groupLabel}
    </div>
  ),
}));

// projectId-scoped project settings (used by the projectIdToLimitSettings tab mode): two
// extensions contributing three groups total, so the "one notice, not one per group" fix has
// something to actually dedupe against.
const PROJECT_SETTINGS_GROUPS = {
  ext1: [
    { label: 'Group A', properties: { 'ext1.settingA': { label: 'Setting A', default: 'x' } } },
    { label: 'Group B', properties: { 'ext1.settingB': { label: 'Setting B', default: 'x' } } },
  ],
  ext2: [
    { label: 'Group C', properties: { 'ext2.settingC': { label: 'Setting C', default: 'x' } } },
  ],
};

vi.mock('@shared/services/project-settings.service', () => ({
  projectSettingsService: {
    getLocalizedContributionInfo: vi.fn(async () => ({ contributions: PROJECT_SETTINGS_GROUPS })),
  },
  // Interface filtering is exercised elsewhere; pass every group through unchanged here.
  filterProjectSettingsContributionsByProjectInterfaces: vi.fn((contributions) => contributions),
}));

// General/user settings (used by the sidebar's default "no project selected" mode).
const GENERAL_SETTINGS_GROUPS = {
  generalExt: [
    {
      label: 'General Group',
      properties: { 'generalExt.settingA': { label: 'General Setting', default: 'y' } },
    },
  ],
};

vi.mock('@shared/services/settings.service', () => ({
  settingsService: {
    getLocalizedSettingsContributionInfo: vi.fn(async () => ({
      contributions: GENERAL_SETTINGS_GROUPS,
    })),
  },
}));

vi.mock('@shared/services/project-lookup.service', () => ({
  projectLookupService: {
    getMetadataForProject: vi.fn(async () => ({ projectInterfaces: [] })),
    // Empty by default so the sidebar's project list stays empty. The return type is declared
    // rather than inferred so a test can hand it a project without a type assertion.
    getMetadataForAllProjects: vi.fn(async (): Promise<{ id: string }[]> => []),
  },
}));

// Only `getSetting('platform.name')` is reached, and only once a project is in the metadata list.
vi.mock('@renderer/services/papi-frontend.service', () => ({
  projectDataProviders: {
    get: vi.fn(
      async (): Promise<{ getSetting: (key: string) => Promise<string> }> => ({
        getSetting: async () => PROJECT_NAME,
      }),
    ),
  },
}));

// jsdom ships neither ResizeObserver nor these Element methods; cmdk and Radix inside the picker's
// popover need all three. No-op stubs suffice — nothing here asserts layout.
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
  if (typeof globalThis.ResizeObserver === 'undefined')
    globalThis.ResizeObserver = NoopResizeObserver;
  if (typeof Element.prototype.scrollTo !== 'function') Element.prototype.scrollTo = () => {};
  if (typeof Element.prototype.scrollIntoView !== 'function')
    Element.prototype.scrollIntoView = () => {};
});

describe('SettingsTab sync-blocked notice dedup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useIsProjectAutoSyncBlocked).mockReturnValue(false);
  });

  it('renders exactly one notice above all of a blocked project’s settings groups, not one per group', async () => {
    vi.mocked(useIsProjectAutoSyncBlocked).mockReturnValue(true);
    render(<SettingsTab projectIdToLimitSettings="projA" />);

    await waitFor(() => expect(screen.getAllByTestId('settings-group')).toHaveLength(3));

    expect(useIsProjectAutoSyncBlocked).toHaveBeenCalledWith('projA');
    const notices = screen.getAllByRole('status');
    expect(notices).toHaveLength(1);
    expect(notices[0]).toHaveTextContent(SYNC_BLOCKED_NOTICE_TEXT);
  });

  it('renders no notice when the project is not sync-blocked, while still rendering all groups', async () => {
    vi.mocked(useIsProjectAutoSyncBlocked).mockReturnValue(false);
    render(<SettingsTab projectIdToLimitSettings="projA" />);

    await waitFor(() => expect(screen.getAllByTestId('settings-group')).toHaveLength(3));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('never renders a notice for the general/user settings view (no project)', async () => {
    // Even mocked to report "blocked", the notice must not appear: the general-settings branch
    // never reaches the notice-rendering code at all — it is structurally inside the
    // selectedSidebarItem.projectId branch, so a "blocked" hook result can't leak a notice into the
    // no-project view.
    vi.mocked(useIsProjectAutoSyncBlocked).mockReturnValue(true);
    render(<SettingsTab />);

    await waitFor(() => expect(screen.getAllByTestId('settings-group')).toHaveLength(1));
    expect(useIsProjectAutoSyncBlocked).toHaveBeenCalledWith(undefined);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});

describe('SettingsTab project picker localization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useIsProjectAutoSyncBlocked).mockReturnValue(false);
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([{ id: 'projA' }]);
  });

  it('shows the picker popover in the UI language, not English', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<SettingsTab />);

    const trigger = await screen.findByRole('combobox', { name: PROJECTS_GROUP_LABEL });
    await user.click(trigger);

    const search = await screen.findByPlaceholderText(PICKER_SEARCH_PLACEHOLDER);
    expect(screen.queryByPlaceholderText('Search projects & resources')).not.toBeInTheDocument();

    await user.type(search, 'zzzz');
    expect(await screen.findByText(PICKER_NO_RESULTS)).toBeInTheDocument();
  });
});
