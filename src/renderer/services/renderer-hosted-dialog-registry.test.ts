import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { RENDERER_HOSTED_DIALOG_REQUEST_NAMES } from '@shared/services/dialog.service-model';

const mocks = vi.hoisted(() => ({
  registerRequestHandler: vi.fn(async () => vi.fn()),
}));

vi.mock('@shared/services/network.service', () => ({
  registerRequestHandler: mocks.registerRequestHandler,
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

const originalIsPackaged = globalThis.isPackaged;

describe('renderer-hosted dialog registry', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mocks.registerRequestHandler.mockResolvedValue(vi.fn());
    globalThis.windowId = '1';
    globalThis.isPackaged = false;
    const { resetForTesting } = await import('@renderer/services/renderer-hosted-dialog-registry');
    resetForTesting();
  });

  afterEach(() => {
    globalThis.isPackaged = originalIsPackaged;
  });

  test('registers each handler under this window’s scoped request name', async () => {
    const { registerScopedDialogRequest } = await import(
      '@renderer/services/renderer-hosted-dialog-registry'
    );
    const handler = vi.fn();

    await registerScopedDialogRequest('showDialog', handler);

    expect(mocks.registerRequestHandler).toHaveBeenCalledWith(
      'dialog:showDialog-1',
      handler,
      undefined,
      undefined,
    );
  });

  test('does not throw once every renderer-hosted dialog request has been registered', async () => {
    const { registerScopedDialogRequest, assertAllRendererHostedDialogRequestsRegistered } =
      await import('@renderer/services/renderer-hosted-dialog-registry');

    await Promise.all(
      RENDERER_HOSTED_DIALOG_REQUEST_NAMES.map((requestName) =>
        registerScopedDialogRequest(requestName, vi.fn()),
      ),
    );

    expect(() => assertAllRendererHostedDialogRequestsRegistered()).not.toThrow();
  });

  test('throws listing exactly the dialog requests nothing registered, in dev/test mode', async () => {
    const { registerScopedDialogRequest, assertAllRendererHostedDialogRequestsRegistered } =
      await import('@renderer/services/renderer-hosted-dialog-registry');
    // Register everything except one, so the failure message can be checked precisely
    const [omittedRequestName, ...restRequestNames] = RENDERER_HOSTED_DIALOG_REQUEST_NAMES;
    await Promise.all(
      restRequestNames.map((requestName) => registerScopedDialogRequest(requestName, vi.fn())),
    );

    expect(() => assertAllRendererHostedDialogRequestsRegistered()).toThrow(omittedRequestName);
  });

  test('does not count a dialog request whose registration rejected', async () => {
    // The check exists to prove there is a handler for the main process's routing proxy to forward
    // to. Counting a name on the attempt would report exactly the failure most likely to happen — a
    // name collision after a reload, a network failure during startup — as covered.
    const { registerScopedDialogRequest, assertAllRendererHostedDialogRequestsRegistered } =
      await import('@renderer/services/renderer-hosted-dialog-registry');
    const [failingRequestName, ...restRequestNames] = RENDERER_HOSTED_DIALOG_REQUEST_NAMES;
    await Promise.all(
      restRequestNames.map((requestName) => registerScopedDialogRequest(requestName, vi.fn())),
    );

    mocks.registerRequestHandler.mockRejectedValueOnce(new Error('Request is already registered'));
    await expect(registerScopedDialogRequest(failingRequestName, vi.fn())).rejects.toThrow(
      'already registered',
    );

    expect(() => assertAllRendererHostedDialogRequestsRegistered()).toThrow(failingRequestName);
  });

  test('logs rather than throws in packaged builds, so one unroutable dialog does not block startup', async () => {
    const { logger } = await import('@shared/services/logger.service');
    const { assertAllRendererHostedDialogRequestsRegistered } = await import(
      '@renderer/services/renderer-hosted-dialog-registry'
    );
    globalThis.isPackaged = true;

    expect(() => assertAllRendererHostedDialogRequestsRegistered()).not.toThrow();
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(RENDERER_HOSTED_DIALOG_REQUEST_NAMES[0]),
    );
  });
});

/**
 * The module whose registration calls are expected to cover `RENDERER_HOSTED_DIALOG_REQUEST_NAMES`.
 * Scanned as source text rather than imported, for the same reason its command-side counterpart is:
 * importing it for real pulls in a large slice of renderer startup machinery to read off a set of
 * string keys.
 */
const REGISTERING_SOURCE_FILE = resolve(__dirname, 'dialog.service-host.ts');

describe('renderer-hosted dialog registration coverage (static)', () => {
  test('every name in RENDERER_HOSTED_DIALOG_REQUEST_NAMES is registered by the dialog service host', () => {
    const source = readFileSync(REGISTERING_SOURCE_FILE, 'utf-8');
    // Tolerates the line break the formatter puts between the call and its first argument
    const registeredNames = new Set(
      [...source.matchAll(/registerScopedDialogRequest\(\s*'([A-Za-z]+)'/g)].map(
        ([, requestName]) => requestName,
      ),
    );

    const missingRequestNames = RENDERER_HOSTED_DIALOG_REQUEST_NAMES.filter(
      (requestName) => !registeredNames.has(requestName),
    );

    expect(missingRequestNames).toEqual([]);
  });
});
