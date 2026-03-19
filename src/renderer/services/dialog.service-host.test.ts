import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock overlay service host before import
const mockShowModalDialogOverlay = vi.fn();
vi.mock('@renderer/services/overlays/overlay.service-host', () => ({
  showModalDialogOverlay: mockShowModalDialogOverlay,
}));

// Mock web-view service (needed by dialog service initialize)
vi.mock('@renderer/services/web-view.service-host', () => ({
  initialize: vi.fn().mockResolvedValue(undefined),
  addTab: vi.fn(),
  closeTab: vi.fn(),
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

// Capture the showDialog handler from registerRequestHandler
let capturedShowDialog: (...args: unknown[]) => Promise<unknown>;
const mockRegisterRequestHandler = vi
  .fn()
  .mockImplementation((requestType: string, handler: (...args: unknown[]) => Promise<unknown>) => {
    if (requestType.includes('showDialog')) {
      capturedShowDialog = handler;
    }
    return Promise.resolve(vi.fn());
  });
vi.mock('@shared/services/network.service', () => ({
  registerRequestHandler: mockRegisterRequestHandler,
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

// Mock platform-bible-utils aggregateUnsubscriberAsyncs
vi.mock('platform-bible-utils', async () => {
  const actual = await vi.importActual('platform-bible-utils');
  return {
    ...actual,
    newGuid: vi.fn(() => 'mock-guid'),
    aggregateUnsubscriberAsyncs: vi.fn().mockReturnValue(vi.fn()),
  };
});

describe('dialog.service-host modal dialog routing', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    // Re-mock after clearAllMocks to restore return values
    mockRegisterRequestHandler.mockImplementation(
      (requestType: string, handler: (...args: unknown[]) => Promise<unknown>) => {
        if (requestType.includes('showDialog')) {
          capturedShowDialog = handler;
        }
        return Promise.resolve(vi.fn());
      },
    );

    const { initialize } = await import('@renderer/services/web-view.service-host');
    vi.mocked(initialize).mockResolvedValue(undefined);

    const { registerCommand } = await import('@shared/services/command.service');
    vi.mocked(registerCommand).mockResolvedValue(vi.fn());

    const { aggregateUnsubscriberAsyncs } = await import('platform-bible-utils');
    vi.mocked(aggregateUnsubscriberAsyncs).mockReturnValue(vi.fn());

    // Reset window.addEventListener mock
    vi.spyOn(window, 'addEventListener').mockImplementation(() => {});

    const mod = await import('./dialog.service-host');
    await mod.startDialogService();
  });

  it('routes alert dialog to showModalDialogOverlay', async () => {
    mockShowModalDialogOverlay.mockResolvedValue(true);

    const result = await capturedShowDialog('platform.alert', {
      title: 'Test Alert',
      prompt: 'Alert message',
    });

    expect(mockShowModalDialogOverlay).toHaveBeenCalledWith('alert', {
      message: 'Alert message',
      title: 'Test Alert',
      prompt: 'Alert message',
    });
    expect(result).toBe(true);
  });

  it('routes confirm dialog to showModalDialogOverlay', async () => {
    mockShowModalDialogOverlay.mockResolvedValue(true);

    await capturedShowDialog('platform.confirm', {
      prompt: 'Are you sure?',
      okLabel: 'Delete',
      cancelLabel: 'Keep',
      destructive: true,
    });

    expect(mockShowModalDialogOverlay).toHaveBeenCalledWith('confirm', {
      message: 'Are you sure?',
      prompt: 'Are you sure?',
      okLabel: 'Delete',
      cancelLabel: 'Keep',
      destructive: true,
    });
  });

  it('returns undefined when alert dialog is dismissed', async () => {
    mockShowModalDialogOverlay.mockResolvedValue(undefined);

    const result = await capturedShowDialog('platform.alert', {
      prompt: 'Dismissed alert',
    });

    expect(result).toBeUndefined();
  });

  it('returns false when confirm dialog cancel is clicked', async () => {
    mockShowModalDialogOverlay.mockResolvedValue(false);

    const result = await capturedShowDialog('platform.confirm', {
      prompt: 'Cancelled confirm',
    });

    expect(result).toBe(false);
  });
});
