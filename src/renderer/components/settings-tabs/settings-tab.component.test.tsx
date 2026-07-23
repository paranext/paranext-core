import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useIsProjectAutoSyncBlocked } from '@renderer/hooks/use-is-project-auto-sync-blocked.hook';
import { SettingsTab } from './settings-tab.component';

const SYNC_BLOCKED_NOTICE_KEY = '%settings_projectSyncBlocked_notice%';
const SYNC_BLOCKED_NOTICE_TEXT = 'Editing paused for Send/Receive';

// The hook under wiring test — controlled per test to simulate a blocked / unblocked project.
vi.mock('@renderer/hooks/use-is-project-auto-sync-blocked.hook', () => ({
  useIsProjectAutoSyncBlocked: vi.fn(),
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [{ [SYNC_BLOCKED_NOTICE_KEY]: SYNC_BLOCKED_NOTICE_TEXT }]),
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
    // Empty so the sidebar's project list stays empty and getProjectName (which needs a live
    // papi-frontend project data provider) is never reached.
    getMetadataForAllProjects: vi.fn(async () => []),
  },
}));

vi.mock('@renderer/services/papi-frontend.service', () => ({
  projectDataProviders: { get: vi.fn() },
}));

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
