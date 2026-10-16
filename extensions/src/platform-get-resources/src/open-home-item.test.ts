import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  sendCommand: vi.fn<(command: string, ...args: unknown[]) => Promise<unknown>>(
    async () => undefined,
  ),
  recordProjectOpened: vi.fn(async () => undefined),
  notify: vi.fn(async () => 'notification-1'),
}));

vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: mocks.sendCommand },
    notifications: { send: mocks.notify },
    dataProviders: {
      get: vi.fn(async () => ({ recordProjectOpened: mocks.recordProjectOpened })),
    },
  },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// vi.mock must appear before the imports it mocks so Vitest can hoist it; eslint's import/first
// rule cannot model this Vitest-specific hoisting requirement.
// eslint-disable-next-line import/first
import { openHomeItem } from './open-home-item';

const commandsSent = () => mocks.sendCommand.mock.calls.map((call: unknown[]) => call[0]);

/*
 * Home opens a resource in its viewer and a project in the Scripture editor, and tells the user
 * itself when either fails — no command it calls does.
 */
describe('openHomeItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.sendCommand.mockImplementation(async () => undefined);
  });

  it('warns the user when a project cannot be opened', async () => {
    mocks.sendCommand.mockImplementation(async () => {
      throw new Error('editor unavailable');
    });

    await openHomeItem('project-1', false);

    expect(mocks.notify).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'warning', message: '%resources_couldNotOpen%' }),
    );
  });

  it('warns the user when the resource viewer cannot be opened', async () => {
    mocks.sendCommand.mockImplementation(async () => {
      throw new Error('viewer unavailable');
    });

    await openHomeItem('resource-1', true);

    expect(mocks.notify).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'warning', message: '%resources_couldNotOpen%' }),
    );
  });

  it('never rejects: it reports its own failures', async () => {
    mocks.sendCommand.mockImplementation(async () => {
      throw new Error('editor unavailable');
    });

    await expect(openHomeItem('project-1', false)).resolves.toBeUndefined();
  });

  it('opens a resource in its viewer', async () => {
    await openHomeItem('resource-1', true);

    expect(commandsSent()).toEqual(['platformScriptureEditor.openResourceViewer']);
  });

  it('opens a project in the Scripture editor and remembers it', async () => {
    await openHomeItem('project-1', false);

    expect(commandsSent()).toEqual(['platformScriptureEditor.openScriptureEditor']);
    expect(mocks.recordProjectOpened).toHaveBeenCalledWith('project-1');
  });

  it('does not add a resource to the recently opened projects', async () => {
    await openHomeItem('resource-1', true);

    expect(mocks.recordProjectOpened).not.toHaveBeenCalled();
  });
});
