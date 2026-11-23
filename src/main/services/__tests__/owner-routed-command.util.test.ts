import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the util resolves against the stubs below
import { assertCommandRoutingMatchesDocs } from '@main/services/owner-routed-command.util';
import type { SingleMethodDocumentation } from '@shared/models/openrpc.model';

const mocks = vi.hoisted(() => ({ loggerError: vi.fn() }));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: mocks.loggerError },
}));

/** Documentation for a command taking the given parameter names, in the given order */
function docsWithParams(...paramNames: string[]): SingleMethodDocumentation {
  return {
    method: {
      summary: 'a command',
      params: paramNames.map((name) => ({ name, schema: { type: 'string' } })),
      result: { name: 'return value', schema: { type: 'null' } },
    },
  };
}

describe('checking a router’s command routing against its OpenRPC parameters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.isPackaged = false;
  });

  test('accepts a command that names a web view first and is routed by ownership', () => {
    expect(() =>
      assertCommandRoutingMatchesDocs('test router', [
        { commandName: 'test.open', docs: docsWithParams('webViewId'), routing: 'owner' },
      ]),
    ).not.toThrow();
  });

  test('accepts a command that names nothing and follows focus', () => {
    expect(() =>
      assertCommandRoutingMatchesDocs('test router', [
        { commandName: 'test.open', docs: docsWithParams(), routing: 'focus' },
      ]),
    ).not.toThrow();
  });

  test('reports a command that names a web view but follows focus', () => {
    // The gap the check exists for: a command that looks routable by ownership, is documented as
    // such, and quietly runs in whatever window the user is looking at
    expect(() =>
      assertCommandRoutingMatchesDocs('test router', [
        { commandName: 'test.open', docs: docsWithParams('webViewId'), routing: 'focus' },
      ]),
    ).toThrow('test.open');
  });

  test('reports a command routed by ownership that names no web view', () => {
    expect(() =>
      assertCommandRoutingMatchesDocs('test router', [
        { commandName: 'test.open', docs: docsWithParams('projectId'), routing: 'owner' },
      ]),
    ).toThrow('nothing to find an owner by');
  });

  test('reports a web view id documented anywhere but first, which cannot be routed on', () => {
    expect(() =>
      assertCommandRoutingMatchesDocs('test router', [
        {
          commandName: 'test.open',
          docs: docsWithParams('projectId', 'webViewId'),
          routing: 'owner',
        },
      ]),
    ).toThrow('not its first');
  });

  test('names every command that disagrees, not just the first', () => {
    expect(() =>
      assertCommandRoutingMatchesDocs('test router', [
        { commandName: 'test.first', docs: docsWithParams('webViewId'), routing: 'focus' },
        { commandName: 'test.second', docs: docsWithParams(), routing: 'owner' },
      ]),
    ).toThrow(/test\.first.*test\.second/);
  });

  test('logs rather than throwing in a packaged app, so one command cannot unclaim the rest', () => {
    globalThis.isPackaged = true;

    expect(() =>
      assertCommandRoutingMatchesDocs('test router', [
        { commandName: 'test.open', docs: docsWithParams('webViewId'), routing: 'focus' },
      ]),
    ).not.toThrow();
    expect(mocks.loggerError).toHaveBeenCalledWith(expect.stringContaining('test.open'));
  });
});
