import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock overlay service host before import
const mockShowModalDialogOverlay = vi.fn();
vi.mock('@renderer/services/overlays/overlay.service-host', () => ({
  showModalDialogOverlay: mockShowModalDialogOverlay,
}));

// Mock overlay store (resolveAndRemoveOverlay/rejectAndRemoveOverlay imported by dialog.service-shard)
vi.mock('@renderer/services/overlays/overlay-store', () => ({
  resolveAndRemoveOverlay: vi.fn(),
  rejectAndRemoveOverlay: vi.fn(),
}));

// Mock web-view service (needed by dialog service initialize)
const mockCloseTab = vi.fn();
vi.mock('@renderer/services/web-view.service-shard', () => ({
  initialize: vi.fn().mockResolvedValue(undefined),
  addTab: vi.fn(),
  closeTab: mockCloseTab,
  // Standing in for a window with no layout load in flight and no close decided — the conditions
  // every test here is about something other than. What these two do when either is true is
  // covered against the real module in `dialog.service-shard.layout-load.test.ts`.
  throwIfWindowIsClosing: vi.fn(),
  waitForLayoutLoadToSettle: vi.fn(async () => {}),
}));

// Mock localization service
vi.mock('@shared/services/localization.service', () => ({
  localizationService: {
    getLocalizedStrings: vi.fn().mockResolvedValue({}),
  },
}));

// Mock logger service
vi.mock('@shared/services/logger.service', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock dialog index with Component mocks for routing tests
// eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
const MockAlertComponent = vi.fn(() => undefined as any);
// vi.fn mock must satisfy React component return type; `any` cast is the standard test pattern
// eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
const MockConfirmComponent = vi.fn(() => undefined as any);
const mockDialogs = {
  'platform.aboutDialog': { tabType: 'platform.aboutDialog', Component: vi.fn() },
  'platform.selectProject': { tabType: 'platform.selectProject', Component: vi.fn() },
  'platform.selectMultipleProjects': {
    tabType: 'platform.selectMultipleProjects',
    Component: vi.fn(),
  },
  'platform.selectBooks': { tabType: 'platform.selectBooks', Component: vi.fn() },
  'platform.alert': {
    tabType: 'platform.alert',
    dialogRole: 'alertdialog',
    Component: MockAlertComponent,
  },
  'platform.confirm': {
    tabType: 'platform.confirm',
    dialogRole: 'alertdialog',
    Component: MockConfirmComponent,
  },
};
vi.mock('@renderer/components/dialogs/index', () => ({
  DIALOGS: mockDialogs,
  default: mockDialogs,
}));

vi.mock('@shared/services/network.service', () => ({
  registerRequestHandler: vi.fn().mockResolvedValue(vi.fn()),
  // network-object.service calls getNetworkEvent at load time, and this test reaches that module on
  // its import path, even though it never exercises the event directly.
  getNetworkEvent: vi.fn(() => vi.fn()),
  // network-object.service subscribes to this at module load so a process that leaves during
  // startup is still announced, and this test reaches that module on its import path.
  onDidDisconnectClient: vi.fn(() => vi.fn()),
}));

// Capture the shard object the window registers, which is what the main process's dialog service
// router calls into
let capturedShowDialog: (...args: unknown[]) => Promise<unknown>;
const mockNetworkObjectSet = vi
  .fn()
  .mockImplementation(async (_id: string, objectToShare: Record<string, unknown>) => {
    // networkObjectService.set takes the shared object untyped here, so reading one method back off
    // it needs the assertion; the shard's own type is checked where it is declared
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    capturedShowDialog = objectToShare.showDialog as (...args: unknown[]) => Promise<unknown>;
    return { dispose: vi.fn().mockResolvedValue(true) };
  });
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: mockNetworkObjectSet, get: vi.fn() },
  onDidCreateNetworkObject: vi.fn(() => vi.fn()),
  onDidDisposeNetworkObject: vi.fn(() => vi.fn()),
}));

// Mock command service
vi.mock('@shared/services/command.service', () => ({
  registerCommand: vi.fn().mockResolvedValue(vi.fn()),
}));

// Mock dialog base data
vi.mock('@renderer/components/dialogs/dialog-base.data', () => ({
  hookUpDialogService: vi.fn(),
}));

// Mock about-dialog component
vi.mock('@renderer/components/dialogs/about-dialog.component', () => ({
  ABOUT_DIALOG: { tabType: 'platform.about' },
}));

// Mock select-project dialog
vi.mock('@renderer/components/dialogs/select-project.dialog', () => ({
  SELECT_PROJECT_DIALOG: { tabType: 'platform.selectProject' },
}));

// Mock dialog-definition model
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

describe('dialog.service-shard', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    // A renderer receives its window id as a string query parameter
    globalThis.windowId = '1';

    // Re-mock after clearAllMocks to restore return values
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

    // Reset window.addEventListener mock
    vi.spyOn(window, 'addEventListener').mockImplementation(() => {});

    const mod = await import('./dialog.service-shard');
    await mod.startDialogServiceShard();
  });

  describe('modal dialog routing', () => {
    it('routes dialog with isModal:true to showModalDialogOverlay', async () => {
      mockShowModalDialogOverlay.mockResolvedValue(true);

      await capturedShowDialog('platform.alert', {
        prompt: 'Alert message',
        isModal: true,
      });

      expect(mockShowModalDialogOverlay).toHaveBeenCalledWith(
        MockAlertComponent,
        expect.objectContaining({
          prompt: 'Alert message',
          isModal: true,
          isDialog: true,
          role: 'alertdialog',
        }),
        expect.any(Function),
        'dialog-service',
      );
    });

    it('routes dialog without modal flag to rc-dock tab', async () => {
      const { addTab } = await import('@renderer/services/web-view.service-shard');
      vi.mocked(addTab).mockResolvedValue(undefined);

      const { resolveDialogRequest } = await import('./dialog.service-shard');

      // Don't await - it won't resolve until manually resolved
      const dialogPromise = capturedShowDialog('platform.alert', {
        prompt: 'Alert message',
      });

      // Allow microtasks to settle
      await new Promise((resolve) => {
        setTimeout(resolve, 10);
      });

      expect(mockShowModalDialogOverlay).not.toHaveBeenCalled();
      expect(addTab).toHaveBeenCalled();

      // Clean up: resolve the dialog request so it doesn't leak into subsequent tests
      resolveDialogRequest('mock-guid', undefined);
      await dialogPromise;
    });
  });

  describe('hasDialogRequest', () => {
    it('returns false when no dialog request exists for the given id', async () => {
      const { hasDialogRequest } = await import('./dialog.service-shard');
      expect(hasDialogRequest('nonexistent-id')).toBe(false);
    });
  });

  describe('resolveDialogRequest', () => {
    it('throws when resolving a non-existent dialog request', async () => {
      const { resolveDialogRequest } = await import('./dialog.service-shard');
      expect(() => resolveDialogRequest('nonexistent-id', 'some-data')).toThrow(
        'request nonexistent-id not found to resolve',
      );
    });

    it('resolves dialog promise and closes the tab', async () => {
      const { resolveDialogRequest, hasDialogRequest } = await import('./dialog.service-shard');

      const { addTab } = await import('@renderer/services/web-view.service-shard');
      // addTab must resolve for the dialog setup to complete without rejecting
      vi.mocked(addTab).mockResolvedValue(undefined);

      // Start a non-overlay dialog (selectProject goes through tab-based path).
      // Don't await - it won't resolve until we call resolveDialogRequest.
      const dialogPromise = capturedShowDialog('platform.selectProject', {});

      // Allow microtasks (initialize + addTab) to settle so the request is registered
      await vi.waitFor(() => {
        expect(hasDialogRequest('mock-guid')).toBe(true);
      });

      // Resolve it
      resolveDialogRequest('mock-guid', 'selected-project-id');

      // Request should be removed
      expect(hasDialogRequest('mock-guid')).toBe(false);

      // The dialog promise should resolve with the data
      await expect(dialogPromise).resolves.toBe('selected-project-id');

      // Should have attempted to close the tab
      await vi.waitFor(() => {
        expect(mockCloseTab).toHaveBeenCalledWith('mock-guid');
      });
    });
  });

  describe('rejectDialogRequest', () => {
    it('throws when rejecting a non-existent dialog request', async () => {
      const { rejectDialogRequest } = await import('./dialog.service-shard');
      expect(() => rejectDialogRequest('nonexistent-id', 'error message')).toThrow(
        'request nonexistent-id not found to reject',
      );
    });

    it('rejects the dialog promise with the error message', async () => {
      const { rejectDialogRequest, hasDialogRequest } = await import('./dialog.service-shard');

      const { addTab } = await import('@renderer/services/web-view.service-shard');
      vi.mocked(addTab).mockResolvedValue(undefined);

      const dialogPromise = capturedShowDialog('platform.selectProject', {});

      // Wait for the request to be registered
      await vi.waitFor(() => {
        expect(hasDialogRequest('mock-guid')).toBe(true);
      });

      rejectDialogRequest('mock-guid', 'something went wrong');

      await expect(dialogPromise).rejects.toBe('something went wrong');
    });
  });
});
