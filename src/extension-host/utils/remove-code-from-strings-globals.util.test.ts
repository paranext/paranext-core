import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Each case runs in a fresh Node.js process. Node.js loads its `fetch` implementation (undici) on
 * first use, and this test runner's own process has already loaded it, so a check made here would
 * pass whether or not the helper loads undici before deleting `Function`.
 */

const HELPER_URL = pathToFileURL(
  path.join(__dirname, 'remove-code-from-strings-globals.util.ts'),
).href;

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
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', script], {
    encoding: 'utf8',
  });
  if (result.status !== 0) throw new Error(`child process failed: ${result.stderr}`);
  const lastLine = result.stdout.trim().split('\n').pop() ?? '';
  return JSON.parse(lastLine);
}

describe('removeCodeFromStringsGlobals', () => {
  it('removes eval and Function, and fetch and the other undici globals still work afterwards', () => {
    const result = runInFreshProcess(`
      const { removeCodeFromStringsGlobals } = await import(${JSON.stringify(HELPER_URL)});
      removeCodeFromStringsGlobals();
      const removed = { eval: typeof globalThis.eval, Function: typeof globalThis.Function };
      ${USE_UNDICI_GLOBALS}
      console.log(JSON.stringify({ removed, failures }));
    `);

    expect(result).toEqual({
      removed: { eval: 'undefined', Function: 'undefined' },
      failures: [],
    });
  });

  // Pins why the helper loads undici first. If a Node.js release stops failing here, undici no
  // longer reads `Function` as it loads, and the `Headers` construction in the helper can go.
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
