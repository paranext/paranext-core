import { vi, describe, it, expect, beforeEach } from 'vitest';

/**
 * Pins the exact float layout a non-modal dialog opens with. `dialog.service-shard.test.ts`
 * ("routes dialog without modal flag to rc-dock tab") already checks that `addTab` gets called at
 * all; it does not check what it was called WITH, so a regression that changed the layout's type,
 * dropped `position`, or added something like a `targetWindowId` would still pass that test. This
 * file re-asserts the call's arguments instead of just its occurrence.
 *
 * Same file-level mock set as `dialog.service-shard.test.ts` — this file imports the same module,
 * which needs its whole dependency graph stubbed to import cleanly.
 */

const mockShowModalDialogOverlay = vi.fn();
vi.mock('@renderer/services/overlays/overlay.service-host', () => ({
  showModalDialogOverlay: mockShowModalDialogOverlay,
}));

vi.mock('@renderer/services/overlays/overlay-store', () => ({
  resolveAndRemoveOverlay: vi.fn(),
  rejectAndRemoveOverlay: vi.fn(),
}));

const mockCloseTab = vi.fn();
const mockAddTab = vi.fn();
vi.mock('@renderer/services/web-view.service-shard', () => ({
  initialize: vi.fn().mockResolvedValue(undefined),
  addTab: mockAddTab,
  closeTab: mockCloseTab,
  // Standing in for a window with no layout load in flight and no close decided — this file is
  // about the float layout, not either of those. See `dialog.service-shard.layout-load.test.ts`.
  throwIfWindowIsClosing: vi.fn(),
  waitForLayoutLoadToSettle: vi.fn(async () => {}),
}));

vi.mock('@shared/services/localization.service', () => ({
  localizationService: {
    getLocalizedStrings: vi.fn().mockResolvedValue({}),
  },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

const mockDialogs = {
  'platform.aboutDialog': { tabType: 'platform.aboutDialog', Component: vi.fn() },
  'platform.selectProject': { tabType: 'platform.selectProject', Component: vi.fn() },
  'platform.alert': {
    tabType: 'platform.alert',
    dialogRole: 'alertdialog',
    // vi.fn mock must satisfy React component return type; `any` cast is the standard test
    // pattern, matching `dialog.service-shard.test.ts`'s `MockAlertComponent`
    // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    Component: vi.fn(() => undefined as any),
  },
};
vi.mock('@renderer/components/dialogs/index', () => ({
  DIALOGS: mockDialogs,
  default: mockDialogs,
}));

vi.mock('@shared/services/network.service', () => ({
  registerRequestHandler: vi.fn().mockResolvedValue(vi.fn()),
  getNetworkEvent: vi.fn(() => vi.fn()),
  onDidDisconnectClient: vi.fn(() => vi.fn()),
}));

let capturedShowDialog: (...args: unknown[]) => Promise<unknown>;
const mockNetworkObjectSet = vi
  .fn()
  .mockImplementation(async (_id: string, objectToShare: Record<string, unknown>) => {
    // networkObjectService.set takes the shared object untyped here, so reading one method back
    // off it needs the assertion; the shard's own type is checked where it is declared
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    capturedShowDialog = objectToShare.showDialog as (...args: unknown[]) => Promise<unknown>;
    return { dispose: vi.fn().mockResolvedValue(true) };
  });
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: mockNetworkObjectSet, get: vi.fn() },
  onDidCreateNetworkObject: vi.fn(() => vi.fn()),
  onDidDisposeNetworkObject: vi.fn(() => vi.fn()),
}));

vi.mock('@shared/services/command.service', () => ({
  registerCommand: vi.fn().mockResolvedValue(vi.fn()),
}));

vi.mock('@renderer/components/dialogs/dialog-base.data', () => ({
  hookUpDialogService: vi.fn(),
}));

vi.mock('@renderer/components/dialogs/about-dialog.component', () => ({
  ABOUT_DIALOG: { tabType: 'platform.about' },
}));

vi.mock('@renderer/components/dialogs/select-project.dialog', () => ({
  SELECT_PROJECT_DIALOG: { tabType: 'platform.selectProject' },
}));

vi.mock('@renderer/components/dialogs/dialog-definition.model', async () => {
  const actual = await vi.importActual('@renderer/components/dialogs/dialog-definition.model');
  return actual;
});

vi.mock('platform-bible-utils', async () => {
  const actual = await vi.importActual('platform-bible-utils');
  return {
    ...actual,
    newGuid: vi.fn(() => 'mock-guid'),
  };
});

describe('dialog.service-shard float layout', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    globalThis.windowId = '1';

    mockNetworkObjectSet.mockImplementation(
      async (_id: string, objectToShare: Record<string, unknown>) => {
        // Same untyped read-back as the hoisted mock above
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        capturedShowDialog = objectToShare.showDialog as (...args: unknown[]) => Promise<unknown>;
        return { dispose: vi.fn().mockResolvedValue(true) };
      },
    );

    const { initialize } = await import('@renderer/services/web-view.service-shard');
    vi.mocked(initialize).mockResolvedValue(undefined);

    const { registerCommand } = await import('@shared/services/command.service');
    vi.mocked(registerCommand).mockResolvedValue(vi.fn());

    const { newGuid } = await import('platform-bible-utils');
    vi.mocked(newGuid).mockReturnValue('mock-guid');

    mockCloseTab.mockResolvedValue(true);
    vi.spyOn(window, 'addEventListener').mockImplementation(() => {});

    const mod = await import('./dialog.service-shard');
    await mod.startDialogServiceShard();
  });

  it('opens a non-modal dialog as a centered float, unchanged, with no window targeting added', async () => {
    mockAddTab.mockResolvedValue(undefined);
    const { resolveDialogRequest } = await import('./dialog.service-shard');

    // Don't await - it won't resolve until manually resolved
    const dialogPromise = capturedShowDialog('platform.alert', { prompt: 'Alert message' });

    await vi.waitFor(() => expect(mockAddTab).toHaveBeenCalled());

    // Not just "addTab was called" (already pinned elsewhere) — the exact layout it was called
    // with, so a regression that swapped in a 'tab'/'window' layout or added a targetWindowId here
    // fails this
    expect(mockAddTab).toHaveBeenCalledWith(
      expect.objectContaining({ tabType: 'platform.alert' }),
      { type: 'float', position: 'center' },
    );

    resolveDialogRequest('mock-guid', undefined);
    await dialogPromise;
  });
});
