import { describe, expect, it } from 'vitest';

/**
 * This package ships as a committed `dist`, so the app's minifier only ever sees what Vite already
 * produced. `esbuild: { keepNames: true }` in `vite.config.ts` is what makes React able to name a
 * `platform-bible-react` component in a crash report, but the option does nothing until someone
 * rebuilds - so a `dist` regenerated from a stale checkout, or committed from a branch that
 * predates the option, silently reverts every stack frame in this package to an unlookup-able
 * identifier with no other symptom.
 *
 * Esbuild does not stop mangling the identifiers; it pins the readable name in a `.name` property
 * instead, via a helper of the shape `(target, value) => defineProperty(target, "name", { value,
 * configurable: true })`. That helper is absent entirely when `keepNames` is off, which is what
 * makes it a usable marker.
 *
 * What this pins: that the committed bundles came out of a build that asked esbuild to keep names.
 * What it cannot pin: that every component in them got a name - a partial or interrupted rebuild
 * would still satisfy this. The config side is
 * `src/renderer/components/component-stack-name-retention.test.ts` at the repo root.
 */

const NAME_PINNING_HELPER = /"name",\s*\{\s*value/;

async function readDistFile(fileName: string): Promise<string> {
  const { readFile } = await import('node:fs/promises');
  const { fileURLToPath } = await import('node:url');
  const { dirname, resolve } = await import('node:path');
  // Anchored to this file rather than to cwd, which differs between a workspace-scoped run and a
  // repo-root one.
  const here = dirname(fileURLToPath(import.meta.url));
  return readFile(resolve(here, '../dist', fileName), 'utf8');
}

describe('the committed dist', () => {
  it('pins component names in the ES bundle', async () => {
    expect(await readDistFile('index.js')).toMatch(NAME_PINNING_HELPER);
  });

  it('pins component names in the CommonJS bundle', async () => {
    expect(await readDistFile('index.cjs')).toMatch(NAME_PINNING_HELPER);
  });

  it('pins component names in the experimental entry point', async () => {
    expect(await readDistFile('experimental.js')).toMatch(NAME_PINNING_HELPER);
  });
});
