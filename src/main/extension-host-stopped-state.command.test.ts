import { describe, expect, it, vi } from 'vitest';
import { extensionHostService } from '@main/services/extension-host.service';
import { registerCommand } from '@shared/services/command.service';
import { registerExtensionHostStoppedStateCommand } from './extension-host-stopped-state.command';

vi.mock('@main/services/extension-host.service', () => ({
  extensionHostService: { getLastUnexpectedStop: vi.fn() },
}));
vi.mock('@shared/services/command.service', () => ({ registerCommand: vi.fn() }));

/** Register the command and hand back the handler main would run for it, plus its docs. */
async function registered() {
  await registerExtensionHostStoppedStateCommand();
  const [name, handler, docs] = vi.mocked(registerCommand).mock.calls[0];
  return { name, handler, docs };
}

describe('platform.getExtensionHostStoppedState', () => {
  it('registers under its name, marked experimental', async () => {
    const { name, docs } = await registered();
    expect(name).toBe('platform.getExtensionHostStoppedState');
    expect(docs?.method?.['x-experimental']).toBe(true);
  });

  it('answers undefined while the extension host is believed to be running', async () => {
    vi.mocked(extensionHostService.getLastUnexpectedStop).mockReturnValue(undefined);
    const { handler } = await registered();
    await expect(handler()).resolves.toBeUndefined();
  });

  it('answers the remembered stop', async () => {
    vi.mocked(extensionHostService.getLastUnexpectedStop).mockReturnValue({ reason: 'crashed' });
    const { handler } = await registered();
    await expect(handler()).resolves.toEqual({ reason: 'crashed' });
  });
});
