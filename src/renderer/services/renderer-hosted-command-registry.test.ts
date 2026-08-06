import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { RENDERER_HOSTED_COMMAND_NAMES } from '@shared/services/web-view.service-model';

const mocks = vi.hoisted(() => ({
  registerCommand: vi.fn(async () => vi.fn()),
}));

vi.mock('@shared/services/command.service', () => ({
  registerCommand: mocks.registerCommand,
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

const originalIsPackaged = globalThis.isPackaged;

describe('renderer-hosted command registry', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mocks.registerCommand.mockResolvedValue(vi.fn());
    globalThis.windowId = '1';
    globalThis.isPackaged = false;
    const { resetForTesting } = await import('@renderer/services/renderer-hosted-command-registry');
    resetForTesting();
  });

  afterEach(() => {
    globalThis.isPackaged = originalIsPackaged;
  });

  test('registers each handler under this window-scoped name', async () => {
    const { registerScopedCommands } = await import(
      '@renderer/services/renderer-hosted-command-registry'
    );
    const handler = vi.fn();

    registerScopedCommands({ 'platform.about': handler });

    expect(mocks.registerCommand).toHaveBeenCalledWith('platform.about-1', handler);
  });

  test('does not throw once every renderer-hosted command has been registered', async () => {
    const { registerScopedCommands, assertAllRendererHostedCommandsRegistered } = await import(
      '@renderer/services/renderer-hosted-command-registry'
    );

    await Promise.all(
      RENDERER_HOSTED_COMMAND_NAMES.flatMap((commandName) =>
        registerScopedCommands({ [commandName]: vi.fn() }),
      ),
    );

    expect(() => assertAllRendererHostedCommandsRegistered()).not.toThrow();
  });

  test('throws listing exactly the commands nothing registered, in dev/test mode', async () => {
    const { registerScopedCommands, assertAllRendererHostedCommandsRegistered } = await import(
      '@renderer/services/renderer-hosted-command-registry'
    );
    // Register everything except one, so the failure message can be checked precisely.
    const [omittedCommandName, ...restCommandNames] = RENDERER_HOSTED_COMMAND_NAMES;
    await Promise.all(
      restCommandNames.flatMap((commandName) => registerScopedCommands({ [commandName]: vi.fn() })),
    );

    expect(() => assertAllRendererHostedCommandsRegistered()).toThrow(omittedCommandName);
  });

  test('does not count a command whose registration rejected', async () => {
    // The check exists to prove there is a handler for the service router to forward to. Counting a
    // name on the attempt would report exactly the failure most likely to happen — a name collision
    // after a reload, a network failure during startup — as covered, leaving the dead command to
    // surface later as nothing but a proxy timeout.
    const { registerScopedCommands, assertAllRendererHostedCommandsRegistered } = await import(
      '@renderer/services/renderer-hosted-command-registry'
    );
    const [failingCommandName, ...restCommandNames] = RENDERER_HOSTED_COMMAND_NAMES;
    await Promise.all(
      restCommandNames.flatMap((commandName) => registerScopedCommands({ [commandName]: vi.fn() })),
    );

    mocks.registerCommand.mockRejectedValueOnce(new Error('Command is already registered'));
    const [failedRegistration] = registerScopedCommands({ [failingCommandName]: vi.fn() });
    await expect(failedRegistration).rejects.toThrow('already registered');

    expect(() => assertAllRendererHostedCommandsRegistered()).toThrow(failingCommandName);
  });

  test('logs rather than throws in packaged builds, so one unroutable command does not block startup', async () => {
    const { logger } = await import('@shared/services/logger.service');
    const { assertAllRendererHostedCommandsRegistered } = await import(
      '@renderer/services/renderer-hosted-command-registry'
    );
    globalThis.isPackaged = true;

    expect(() => assertAllRendererHostedCommandsRegistered()).not.toThrow();
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(RENDERER_HOSTED_COMMAND_NAMES[0]),
    );
  });
});

/**
 * Files whose registration calls are expected to cover `RENDERER_HOSTED_COMMAND_NAMES` between
 * them. Scanned as source text rather than imported: each of these modules pulls in a large slice
 * of renderer startup machinery to import for real, and mocking all of it just to read off a set of
 * string keys would make this test as heavy (and as fragile to unrelated changes) as the thing it's
 * trying to catch cheaply. A command name that is on the canonical list but never appears as a
 * registered key in any of these files is exactly the omission this check exists to catch.
 */
const REGISTERING_SOURCE_FILES = [
  'dialog.service-shard.ts',
  'web-view.service-shard.ts',
  'scroll-group-navigation.commands.ts',
].map((fileName) => resolve(__dirname, fileName));

function findRegisteredCommandNames(source: string): Set<string> {
  const registeredNames = new Set<string>();
  const commandNamePattern = /'(platform\.[A-Za-z]+)'/g;
  let match = commandNamePattern.exec(source);
  while (match) {
    registeredNames.add(match[1]);
    match = commandNamePattern.exec(source);
  }
  return registeredNames;
}

describe('renderer-hosted command registration coverage (static)', () => {
  test('every name in RENDERER_HOSTED_COMMAND_NAMES appears as a registered key in one of the modules that register renderer-hosted commands', () => {
    const registeredNames = new Set<string>();
    REGISTERING_SOURCE_FILES.forEach((filePath) => {
      findRegisteredCommandNames(readFileSync(filePath, 'utf-8')).forEach((name) =>
        registeredNames.add(name),
      );
    });

    const missingCommandNames = RENDERER_HOSTED_COMMAND_NAMES.filter(
      (commandName) => !registeredNames.has(commandName),
    );

    expect(missingCommandNames).toEqual([]);
  });
});
