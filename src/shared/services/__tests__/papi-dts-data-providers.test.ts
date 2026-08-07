import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * A data provider tells extensions what it serves by augmenting `DataProviders` in
 * `papi-shared-types`, and that augmentation only reaches extensions if it survives into
 * `papi.d.ts`. It reaches `papi.d.ts` only when the module declaring it is in the import graph
 * rooted at the papi entry points — so an unrelated refactor that stops something importing the
 * module silently deletes a published contract.
 *
 * Nothing else catches that: `typecheck:papi-dts` passes with the key absent, `npm run build`
 * passes, no bundled extension names the provider, and the regeneration diff that says so is
 * hundreds of lines long. This is the guard.
 */

const REPO_ROOT = process.cwd();
const SOURCE_ROOT = path.join(REPO_ROOT, 'src');
const PAPI_DTS = path.join(REPO_ROOT, 'lib', 'papi-dts', 'papi.d.ts');

/** Every `.ts` file under `src`, ignoring generated and dependency directories */
function collectSourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const entryPath = path.join(directory, entry);
    if (statSync(entryPath).isDirectory()) {
      if (entry === 'node_modules' || entry === '__snapshots__') return [];
      return collectSourceFiles(entryPath);
    }
    return entryPath.endsWith('.ts') && !entryPath.endsWith('.d.ts') ? [entryPath] : [];
  });
}

/**
 * The `DataProviders` keys declared as `[someProviderNameConstant]` in the given TypeScript. Only
 * computed keys are collected: those are the platform's own registrations, each naming the constant
 * the provider is registered under. The example keys in the `papi-shared-types` declaration itself
 * are string literals and are deliberately not collected.
 */
function findComputedDataProviderKeys(contents: string): string[] {
  const blocks = contents.matchAll(/interface DataProviders \{([\s\S]*?)\n\s*\}/g);
  return [...blocks].flatMap(([, body]) =>
    [...body.matchAll(/\[([A-Za-z0-9_$]+)\]\s*:/g)].map(([, keyName]) => keyName),
  );
}

describe('the DataProviders augmentations extensions consume', () => {
  it('publishes every data provider the platform declares into papi.d.ts', () => {
    const declaredKeysBySourceFile = new Map<string, string[]>();
    collectSourceFiles(SOURCE_ROOT).forEach((filePath) => {
      const contents = readFileSync(filePath, 'utf8');
      if (!contents.includes("declare module 'papi-shared-types'")) return;
      const keys = findComputedDataProviderKeys(contents);
      if (keys.length > 0) declaredKeysBySourceFile.set(path.relative(REPO_ROOT, filePath), keys);
    });

    // A regex that stopped matching would make this test vacuous, so the corpus is asserted too
    expect(declaredKeysBySourceFile.size).toBeGreaterThan(1);

    const publishedKeys = new Set(findComputedDataProviderKeys(readFileSync(PAPI_DTS, 'utf8')));
    const missing = [...declaredKeysBySourceFile].flatMap(([sourceFile, keys]) =>
      keys.filter((key) => !publishedKeys.has(key)).map((key) => `${key} (${sourceFile})`),
    );

    expect(missing).toEqual([]);
  });
});
