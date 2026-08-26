import { beforeEach, describe, expect, test, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  networkObjectSet: vi.fn(),
  openUsersnapForm: vi.fn(async () => undefined),
  closeOpenUsersnapForm: vi.fn(async () => undefined),
  isUsersnapFormCurrentlyOpen: vi.fn(() => false),
}));

vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: mocks.networkObjectSet, get: vi.fn() },
  onDidCreateNetworkObject: vi.fn(() => vi.fn()),
  onDidDisposeNetworkObject: vi.fn(() => vi.fn()),
}));
vi.mock('@renderer/services/usersnap.service', () => ({
  USERSNAP_PROJECT_SUBMIT_IDEA_API_KEY: 'submit-idea-key',
  USERSNAP_PROJECT_REPORT_ISSUE_API_KEY: 'report-issue-key',
  openUsersnapForm: mocks.openUsersnapForm,
  closeOpenUsersnapForm: mocks.closeOpenUsersnapForm,
  isUsersnapFormCurrentlyOpen: mocks.isUsersnapFormCurrentlyOpen,
}));

/** The shard object the window registered, which is what the main process's router calls into */
function registeredShard() {
  return mocks.networkObjectSet.mock.calls[0][1];
}

describe('Usersnap service shard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.networkObjectSet.mockResolvedValue({ dispose: vi.fn() });
    // A renderer receives its window id as a string query parameter
    globalThis.windowId = 1;
  });

  test('registers even when the Usersnap API never initialized', async () => {
    // The forms degrade internally to a warning the user can see. A shard that registered only on a
    // successful init would leave the router with nothing to route to, and the menu items would
    // fail with a routing error instead.
    const { startUsersnapServiceShard } = await import('@renderer/services/usersnap.service-shard');

    await startUsersnapServiceShard();

    expect(mocks.networkObjectSet).toHaveBeenCalled();
  });

  test('registers under this window’s scoped name so several windows can coexist', async () => {
    const { startUsersnapServiceShard } = await import('@renderer/services/usersnap.service-shard');

    await startUsersnapServiceShard();

    expect(mocks.networkObjectSet.mock.calls[0][0]).toBe('UsersnapService-1');
  });

  test('opens each form with its own project key', async () => {
    const { startUsersnapServiceShard } = await import('@renderer/services/usersnap.service-shard');
    await startUsersnapServiceShard();

    await registeredShard().submitIdea();
    await registeredShard().reportIssue();

    expect(mocks.openUsersnapForm).toHaveBeenNthCalledWith(1, 'submit-idea-key');
    expect(mocks.openUsersnapForm).toHaveBeenNthCalledWith(2, 'report-issue-key');
  });

  test('reports the open-form flag as a boolean', async () => {
    mocks.isUsersnapFormCurrentlyOpen.mockReturnValue(true);
    const { startUsersnapServiceShard } = await import('@renderer/services/usersnap.service-shard');
    await startUsersnapServiceShard();

    await expect(registeredShard().isFormCurrentlyOpen()).resolves.toBe(true);
  });
});
