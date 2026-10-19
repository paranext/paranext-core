import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  sendCommand: vi.fn<(command: string, ...args: unknown[]) => Promise<unknown>>(
    async () => undefined,
  ),
  getSetting: vi.fn(async (): Promise<unknown> => 'power'),
  recordProjectOpened: vi.fn(async () => undefined),
  notify: vi.fn(async () => 'notification-1'),
}));

vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: mocks.sendCommand },
    settings: { get: mocks.getSetting },
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
import { openHomeItem, openResourceFrom } from './open-home-item';

const commandsSent = () => mocks.sendCommand.mock.calls.map((call: unknown[]) => call[0]);

/*
 * Simple mode's middle column only ever shows the project, so a resource opened from Home goes to
 * its reference tab, added to the user's own list. Power mode keeps opening resources in their own
 * viewer.
 */
describe('openHomeItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.sendCommand.mockImplementation(async (command) =>
      command === 'platformScriptureEditor.showResourceInReferencePanel'
        ? { status: 'openElsewhere' }
        : undefined,
    );
    mocks.getSetting.mockImplementation(async () => 'power');
  });

  it('shows a resource in its reference tab in Simple mode', async () => {
    mocks.getSetting.mockImplementation(async () => 'simple');
    mocks.sendCommand.mockImplementation(async () => ({
      status: 'shown',
      webViewId: 'bible-texts-tab',
    }));

    await openHomeItem('resource-1', true);

    expect(mocks.sendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.showResourceInReferencePanel',
      'resource-1',
    );
    expect(commandsSent()).not.toContain('platformScriptureEditor.openResourceViewer');
  });

  it('opens the resource viewer when no project is open to add the resource to', async () => {
    mocks.getSetting.mockImplementation(async () => 'simple');

    await openHomeItem('resource-1', true);

    expect(commandsSent()).toEqual([
      'platformScriptureEditor.showResourceInReferencePanel',
      'platformScriptureEditor.openResourceViewer',
    ]);
  });

  it('opens nothing else, and adds no warning, when the reference tab could not be shown', async () => {
    // The command has told the user; replacing their project would be the one thing worse.
    mocks.getSetting.mockImplementation(async () => 'simple');
    mocks.sendCommand.mockImplementationOnce(async () => ({ status: 'notShown' }));

    await openHomeItem('resource-1', true);

    expect(commandsSent()).toEqual(['platformScriptureEditor.showResourceInReferencePanel']);
    expect(mocks.notify).not.toHaveBeenCalled();
  });

  it('warns the user when the reference tab command cannot be reached', async () => {
    // The editor extension not loaded yet, say: the command never told the user.
    mocks.getSetting.mockImplementation(async () => 'simple');
    mocks.sendCommand.mockImplementationOnce(async () => {
      throw new Error('No handler for platformScriptureEditor.showResourceInReferencePanel');
    });

    await openHomeItem('resource-1', true);

    expect(mocks.notify).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'warning', message: '%resources_couldNotOpen%' }),
    );
    // The resource viewer is the same extension's, so it could not be reached either.
    expect(commandsSent()).toEqual(['platformScriptureEditor.showResourceInReferencePanel']);
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

  it('opens a resource in its viewer in Power mode', async () => {
    await openHomeItem('resource-1', true);

    expect(commandsSent()).toEqual(['platformScriptureEditor.openResourceViewer']);
  });

  it('opens a resource in its viewer when the interface mode cannot be read', async () => {
    mocks.getSetting.mockImplementation(async () => {
      throw new Error('settings unavailable');
    });

    await openHomeItem('resource-1', true);

    expect(commandsSent()).toEqual(['platformScriptureEditor.openResourceViewer']);
  });

  it('opens a project in the Scripture editor in Simple mode and remembers it', async () => {
    mocks.getSetting.mockImplementation(async () => 'simple');

    await openHomeItem('project-1', false);

    expect(commandsSent()).toEqual(['platformScriptureEditor.openScriptureEditor']);
    expect(mocks.recordProjectOpened).toHaveBeenCalledWith('project-1');
  });

  it('does not add a resource to the recently opened projects', async () => {
    await openHomeItem('resource-1', true);

    expect(mocks.recordProjectOpened).not.toHaveBeenCalled();
  });
});

/*
 * Get Resources lists resources too, and its Open must not replace the project in Simple mode's
 * middle column any more than Home's does.
 */
describe('openResourceFrom', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.sendCommand.mockImplementation(async () => ({
      status: 'shown',
      webViewId: 'bible-texts-tab',
    }));
  });

  it('shows a resource in its reference tab in Simple mode, as Home does', async () => {
    mocks.getSetting.mockImplementation(async () => 'simple');

    await openResourceFrom('Get Resources', 'resource-1');

    expect(commandsSent()).toEqual(['platformScriptureEditor.showResourceInReferencePanel']);
  });

  it('opens a resource in its viewer in Power mode', async () => {
    mocks.getSetting.mockImplementation(async () => 'power');
    mocks.sendCommand.mockImplementation(async () => undefined);

    await openResourceFrom('Get Resources', 'resource-1');

    expect(commandsSent()).toEqual(['platformScriptureEditor.openResourceViewer']);
  });

  it('warns the user, and never rejects, when the resource cannot be opened', async () => {
    mocks.getSetting.mockImplementation(async () => 'power');
    mocks.sendCommand.mockImplementation(async () => {
      throw new Error('viewer unavailable');
    });

    await expect(openResourceFrom('Get Resources', 'resource-1')).resolves.toBeUndefined();

    expect(mocks.notify).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'warning', message: '%resources_couldNotOpen%' }),
    );
  });
});
