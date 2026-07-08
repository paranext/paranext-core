import { vi } from 'vitest';
import { registerCommand } from '@shared/services/command.service';
import { readDirection } from 'platform-bible-react/experimental';
import { startInterfaceDirectionCommand } from './interface-direction.command';

vi.mock('@shared/services/command.service', () => ({
  registerCommand: vi.fn(),
}));

vi.mock('platform-bible-react/experimental', () => ({
  readDirection: vi.fn(),
}));

const mockRegisterCommand = vi.mocked(registerCommand);
const mockReadDirection = vi.mocked(readDirection);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('startInterfaceDirectionCommand', () => {
  it('registers a handler that reports the current UI direction', async () => {
    mockReadDirection.mockReturnValue('rtl');

    await startInterfaceDirectionCommand();

    expect(mockRegisterCommand).toHaveBeenCalledTimes(1);
    const [commandName, handler] = mockRegisterCommand.mock.calls[0];
    expect(commandName).toBe('platform.getInterfaceDirection');
    await expect(handler()).resolves.toBe('rtl');

    mockReadDirection.mockReturnValue('ltr');
    await expect(handler()).resolves.toBe('ltr');
  });
});
