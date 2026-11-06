import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, afterEach, beforeAll, beforeEach } from 'vitest';
import { useIsProjectAutoSyncBlocked } from '@renderer/hooks/use-is-project-auto-sync-blocked.hook';
import { useProjectSettingLocks } from '@renderer/hooks/use-project-setting-locks.hook';
import userEvent from '@testing-library/user-event';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { projectDataProviders } from '@renderer/services/papi-frontend.service';
import type { ProjectMetadata } from '@shared/models/project-metadata.model';
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
const NO_SETTINGS_FOUND = 'No settings found';
const PUBLISHED_NOTICE_TEXT = 'This project is published';

// The hook under wiring test — controlled per test to simulate a blocked / unblocked project.
vi.mock('@renderer/hooks/use-is-project-auto-sync-blocked.hook', () => ({
  useIsProjectAutoSyncBlocked: vi.fn(),
}));

// A published project, so a group that received the tab's locks is recognisable in the DOM.
const PROJECT_SETTING_LOCKS = vi.hoisted(() => ({
  isPublished: true,
  isRegistered: false,
  isCurrentUserAdministrator: true,
}));
vi.mock('@renderer/hooks/use-project-setting-locks.hook', () => ({
  useProjectSettingLocks: vi.fn((projectId?: string) =>
    projectId ? PROJECT_SETTING_LOCKS : undefined,
  ),
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      [SYNC_BLOCKED_NOTICE_KEY]: SYNC_BLOCKED_NOTICE_TEXT,
      '%settings_sidebar_projectSettingsLabel%': PROJECTS_GROUP_LABEL,
      [PROJECT_SELECTOR_SEARCH_PLACEHOLDER_KEY]: PICKER_SEARCH_PLACEHOLDER,
      [PROJECT_SELECTOR_NO_RESULTS_KEY]: PICKER_NO_RESULTS,
      '%settings_defaultMessage_noSettingsFound%': NO_SETTINGS_FOUND,
      '%settings_defaultMessage_noSettingsFoundDetails%': 'Nothing matches {query}',
      '%settings_lockReason_projectPublished%': PUBLISHED_NOTICE_TEXT,
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
    projectSettingLocks,
  }: {
    groupLabel: string;
    projectId?: string;
    projectSettingLocks?: { isPublished: boolean };
  }) => (
    <div
      data-testid="settings-group"
      data-project-id={projectId}
      data-published={String(projectSettingLocks?.isPublished)}
    >
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

const PROJECT_SETTINGS_GROUPS_WITH_HIDDEN = {
  ...PROJECT_SETTINGS_GROUPS,
  ext3: [
    {
      label: 'Hidden Project Group',
      properties: { 'ext3.hidden': { label: 'Hidden', default: 'x', isHidden: true } },
    },
  ],
};

let projectSettingsGroups: Record<string, unknown> = PROJECT_SETTINGS_GROUPS;

vi.mock('@shared/services/project-settings.service', () => ({
  projectSettingsService: {
    getLocalizedContributionInfo: vi.fn(async () => ({ contributions: projectSettingsGroups })),
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

// Hidden contributors come FIRST so that, if they were not dropped, the sidebar would select one by
// default and render its group.
const GENERAL_SETTINGS_GROUPS_WITH_HIDDEN = {
  hiddenExt: [
    {
      label: 'Hidden Extension Group',
      properties: { 'hiddenExt.setting': { label: 'Hidden', default: 'y', isHidden: true } },
    },
  ],
  generalExt: [
    {
      label: 'All Hidden Group',
      properties: { 'generalExt.hidden': { label: 'Hidden', default: 'y', isHidden: true } },
    },
    ...GENERAL_SETTINGS_GROUPS.generalExt,
  ],
};

let generalSettingsGroups: Record<string, unknown> = GENERAL_SETTINGS_GROUPS;

vi.mock('@shared/services/settings.service', () => ({
  settingsService: {
    getLocalizedSettingsContributionInfo: vi.fn(async () => ({
      contributions: generalSettingsGroups,
    })),
  },
}));

vi.mock('@shared/services/project-lookup.service', () => ({
  projectLookupService: {
    getMetadataForProject: vi.fn(async () => ({ projectInterfaces: [] })),
    // Empty by default so the sidebar's project list stays empty.
    getMetadataForAllProjects: vi.fn(async (): Promise<ProjectMetadata[]> => []),
  },
}));

// Mocked so a test can assert the sidebar never reaches for one: project names come off metadata,
// which is the only source that distinguishes "no full name" from "never set one".
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

describe('SettingsTab project setting locks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useIsProjectAutoSyncBlocked).mockReturnValue(false);
  });

  afterEach(() => {
    vi.mocked(useProjectSettingLocks).mockImplementation((projectId) =>
      projectId ? PROJECT_SETTING_LOCKS : undefined,
    );
  });

  it("reads the project's locks once for the tab and hands them to every group", async () => {
    render(<SettingsTab projectIdToLimitSettings="projA" />);

    await waitFor(() => expect(screen.getAllByTestId('settings-group')).toHaveLength(3));

    expect(useProjectSettingLocks).toHaveBeenCalledWith('projA');
    screen
      .getAllByTestId('settings-group')
      .forEach((group) => expect(group).toHaveAttribute('data-published', 'true'));
  });

  it("says once, above all of a published project's groups, why none of its settings can change", async () => {
    render(<SettingsTab projectIdToLimitSettings="projA" />);

    await waitFor(() => expect(screen.getAllByTestId('settings-group')).toHaveLength(3));
    expect(screen.getAllByText(PUBLISHED_NOTICE_TEXT)).toHaveLength(1);
  });

  it('shows no published notice for a project that is not published', async () => {
    vi.mocked(useProjectSettingLocks).mockReturnValue({
      ...PROJECT_SETTING_LOCKS,
      isPublished: false,
    });
    render(<SettingsTab projectIdToLimitSettings="projA" />);

    await waitFor(() => expect(screen.getAllByTestId('settings-group')).toHaveLength(3));
    expect(screen.queryByText(PUBLISHED_NOTICE_TEXT)).not.toBeInTheDocument();
  });
});

describe('SettingsTab hidden settings', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useIsProjectAutoSyncBlocked).mockReturnValue(false);
    generalSettingsGroups = GENERAL_SETTINGS_GROUPS_WITH_HIDDEN;
  });

  afterEach(() => {
    generalSettingsGroups = GENERAL_SETTINGS_GROUPS;
    projectSettingsGroups = PROJECT_SETTINGS_GROUPS;
  });

  it("omits a project's settings group whose settings are all hidden", async () => {
    projectSettingsGroups = PROJECT_SETTINGS_GROUPS_WITH_HIDDEN;
    render(<SettingsTab projectIdToLimitSettings="projA" />);

    await waitFor(() => expect(screen.getAllByTestId('settings-group')).toHaveLength(3));
    expect(screen.queryByText('Hidden Project Group')).not.toBeInTheDocument();
  });

  it('omits the groups and sidebar entries whose settings are all hidden', async () => {
    render(<SettingsTab />);

    await waitFor(() => expect(screen.getAllByTestId('settings-group')).toHaveLength(1));
    expect(screen.getByTestId('settings-group')).toHaveTextContent('General Group');
    expect(screen.queryByText('Hidden Extension Group')).not.toBeInTheDocument();
    expect(screen.queryByText('All Hidden Group')).not.toBeInTheDocument();
  });

  it('finds nothing when the search matches only hidden settings', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<SettingsTab />);
    await waitFor(() => expect(screen.getAllByTestId('settings-group')).toHaveLength(1));

    await user.type(screen.getByPlaceholderText(/Search app settings/), 'Hidden');

    expect(await screen.findByText(NO_SETTINGS_FOUND)).toBeInTheDocument();
  });
});

describe('SettingsTab project picker localization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useIsProjectAutoSyncBlocked).mockReturnValue(false);
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([
      { id: 'projA', projectInterfaces: [], pdpFactoryInfo: {} },
    ]);
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

describe('SettingsTab project names', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useIsProjectAutoSyncBlocked).mockReturnValue(false);
  });

  it('names projects from metadata rather than opening a data provider per project', async () => {
    // `pdp.getSetting('platform.fullName')` falls through to the setting's contribution default, a
    // localized `*Name Missing*` placeholder, so a project that never set a full name reads back as
    // one and the sidebar renders "WEB - *Name Missing*". Metadata omits the field instead, which
    // is the only source that can tell the two states apart.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([
      { id: 'projA', name: 'WEB', projectInterfaces: [], pdpFactoryInfo: {} },
      {
        id: 'projB',
        name: 'ESV',
        fullName: 'English Standard Version',
        projectInterfaces: [],
        pdpFactoryInfo: {},
      },
    ]);
    render(<SettingsTab />);

    const trigger = await screen.findByRole('combobox', { name: PROJECTS_GROUP_LABEL });
    await user.click(trigger);

    // The project with a full name shows both; the one without shows its short name and no
    // placeholder standing in for the name it does not have.
    expect(await screen.findByText('English Standard Version')).toBeInTheDocument();
    expect(await screen.findByText('WEB')).toBeInTheDocument();
    expect(screen.queryByText(/Name Missing/)).not.toBeInTheDocument();
    expect(projectDataProviders.get).not.toHaveBeenCalled();
  });
});

describe('SettingsTab unsupported projects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useIsProjectAutoSyncBlocked).mockReturnValue(false);
  });

  it('excludes a project that cannot be opened from the project list', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([
      { id: 'projA', name: 'WEB', projectInterfaces: [], pdpFactoryInfo: {} },
      {
        id: 'projB',
        name: 'SBA',
        projectInterfaces: [],
        pdpFactoryInfo: {},
        unsupportedReason: '%project_unsupported_studyBibleAdditions%',
      },
    ]);
    render(<SettingsTab />);

    const trigger = await screen.findByRole('combobox', { name: PROJECTS_GROUP_LABEL });
    await user.click(trigger);

    expect(await screen.findByText('WEB')).toBeInTheDocument();
    expect(screen.queryByText('SBA')).not.toBeInTheDocument();
  });
});
