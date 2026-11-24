import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Each case runs in a fresh Node.js process. Node.js loads its `fetch` implementation (undici) on
 * first use, and this test runner's own process has already loaded it, so a check made here would
 * pass whether or not the lockdown loads undici before deleting `Function`.
 *
 * That process is Electron's binary run as Node.js, because the extension host is forked from
 * Electron and runs Electron's bundled Node.js, which need not match the Node.js running the tests.
 */

/** In Node.js, the `electron` package exports the path to Electron's binary */
const electronBinary: unknown = createRequire(__filename)('electron');

const SANDBOX_UTIL_URL = pathToFileURL(path.join(__dirname, 'extension-sandbox.util.ts')).href;

/** Globals undici provides. Each is used once, after the deletion, the way an extension would. */
const USE_UNDICI_GLOBALS = `
  const failures = [];
  const uses = {
    fetch: async () => (await fetch('data:,x')).text(),
    Headers: () => new Headers({ a: 'b' }),
    Request: () => new Request('https://example.com/', { method: 'POST', body: 'x' }),
    Response: () => new Response('x').text(),
    FormData: () => new FormData().append('a', 'b'),
    WebSocket: () => WebSocket.CONNECTING,
    MessageEvent: () => new MessageEvent('message', { data: 1 }),
    CloseEvent: () => new CloseEvent('close'),
  };
  for (const [name, use] of Object.entries(uses)) {
    try {
      await use();
    } catch (error) {
      failures.push(name + ': ' + error.message);
    }
  }
`;

function runInFreshProcess(script: string): unknown {
  if (typeof electronBinary !== 'string') throw new Error('electron did not export a binary path');
  // tsx compiles the TypeScript module as CommonJS, so its exports arrive under `default`.
  const result = spawnSync(
    electronBinary,
    ['--import', 'tsx', '--input-type=module', '-e', script],
    {
      encoding: 'utf8',
      env: { ...process.env, ELECTRON_RUN_AS_NODE: '1' },
    },
  );
  if (result.status !== 0) throw new Error(`child process failed: ${result.stderr}`);
  const lastLine = result.stdout.trim().split('\n').pop() ?? '';
  return JSON.parse(lastLine);
}

describe('blockCodeGenerationFromStrings in a fresh extension host process', () => {
  it('removes eval and Function, locks the constructors, and the undici globals still work', () => {
    const result = runInFreshProcess(`
      const { blockCodeGenerationFromStrings } = (await import(${JSON.stringify(SANDBOX_UTIL_URL)})).default;
      blockCodeGenerationFromStrings();
      const removed = { eval: typeof globalThis.eval, Function: typeof globalThis.Function };
      let constructorLocked;
      try {
        (() => {}).constructor('return 1');
        constructorLocked = false;
      } catch {
        constructorLocked = true;
      }
      ${USE_UNDICI_GLOBALS}
      console.log(JSON.stringify({ removed, constructorLocked, failures }));
    `);

    expect(result).toEqual({
      removed: { eval: 'undefined', Function: 'undefined' },
      constructorLocked: true,
      failures: [],
    });
  });

  // Pins why the lockdown loads undici first. If an Electron release's Node.js stops failing here,
  // undici no longer reads `Function` as it loads, and the `Headers` construction in
  // blockCodeGenerationFromStrings can go.
  it('control: deleting Function without loading undici first breaks the undici globals', () => {
    const result = runInFreshProcess(`
      delete globalThis.Function;
      ${USE_UNDICI_GLOBALS}
      console.log(JSON.stringify({ failures }));
    `);

    expect(result).toEqual({
      failures: expect.arrayContaining([
        'fetch: Function is not defined',
        'Headers: Function is not defined',
      ]),
    });
  });
});
