// @vitest-environment node
// Node, not the repo-default jsdom, on purpose: the extension host is plain Node, and the
// missing-DOM case this polyfill exists for only reproduces without jsdom's DOM globals.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { usjToUsxString, usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

// These tests read and write the DOM globals through `Reflect` because TypeScript declares both as
// always-present, which rules out `delete` and rejects assigning a stand-in.
const DOM_GLOBAL_NAMES = ['DOMParser', 'XMLSerializer'] as const;

let savedGlobals: Record<string, unknown> = {};

/** Re-runs the polyfill's module body, which is where it installs the globals */
async function importPolyfillFresh(): Promise<void> {
  vi.resetModules();
  await import('./dom-globals.polyfill');
}

/**
 * Whether an `import`/`export` clause is erased by the compiler, so it loads nothing at runtime.
 * True for `import type { … }` and for a clause whose every named binding is individually
 * `type`-prefixed.
 *
 * `extensions/src/platform-scripture-editor/src/extension-host-import-boundary.test.ts` needs the
 * same parsing for the same reason; the two cannot share a helper across the workspace boundary, so
 * this function and the specifier patterns below are a deliberate copy of that file's. Fix a
 * parsing bug in one and fix it in the other.
 */
function isTypeOnlyClause(clause: string): boolean {
  const trimmed = clause.trim();
  if (/^type\b/.test(trimmed)) return true;
  const namedBindings = /^\{([^}]*)\}$/.exec(trimmed);
  if (!namedBindings) return false;
  const bindings = namedBindings[1]
    .split(',')
    .map((binding) => binding.trim())
    .filter((binding) => binding.length > 0);
  return bindings.length > 0 && bindings.every((binding) => /^type\b/.test(binding));
}

/**
 * The specifier of the first module `source` evaluates at load time — a side-effect import, a value
 * `import`/`export … from`, or a dynamic `import()`/`require()`. Type-only clauses are skipped
 * because the compiler erases them, so they cannot run anything.
 */
function firstEvaluatedSpecifier(source: string): string | undefined {
  const evaluated: { index: number; specifier: string }[] = [];

  const sideEffectImport = /(?:^|\n)[ \t]*import[ \t]*['"]([^'"]+)['"]/g;
  const fromImport = /(?:^|\n)[ \t]*(?:import|export)\b([^;'"]*?)from[ \t]*['"]([^'"]+)['"]/g;
  const runtimeImport = /\b(?:import|require)\([ \t]*['"]([^'"]+)['"]/g;

  for (let match = sideEffectImport.exec(source); match; match = sideEffectImport.exec(source))
    evaluated.push({ index: match.index, specifier: match[1] });
  for (let match = fromImport.exec(source); match; match = fromImport.exec(source))
    if (!isTypeOnlyClause(match[1])) evaluated.push({ index: match.index, specifier: match[2] });
  for (let match = runtimeImport.exec(source); match; match = runtimeImport.exec(source))
    evaluated.push({ index: match.index, specifier: match[1] });

  return evaluated.sort((a, b) => a.index - b.index)[0]?.specifier;
}

/**
 * Whether the installed `@eten-tech-foundation/scripture-utilities` delegates its XML work to the
 * platform's DOM globals — true from the release that drops the package's own bundled
 * `@xmldom/xmldom` (scripture-editors PR #541) onward, false before it, where the converters run
 * fine in bare Node and nothing this polyfill installs is reachable.
 *
 * Probing beats reading the version because the behavior, not the range, is what the polyfill
 * exists for.
 */
function convertersNeedDomGlobals(): boolean {
  const saved = DOM_GLOBAL_NAMES.map((name) => [name, Reflect.get(globalThis, name)] as const);
  DOM_GLOBAL_NAMES.forEach((name) => Reflect.deleteProperty(globalThis, name));
  try {
    usxStringToUsj('<usx version="3.0"><book code="GEN" style="id">Genesis</book></usx>');
    return false;
  } catch {
    return true;
  } finally {
    saved.forEach(([name, value]) => {
      if (value !== undefined) Reflect.set(globalThis, name, value);
    });
  }
}

const CONVERTERS_NEED_DOM_GLOBALS = convertersNeedDomGlobals();

beforeEach(() => {
  savedGlobals = Object.fromEntries(
    DOM_GLOBAL_NAMES.map((name) => [name, Reflect.get(globalThis, name)]),
  );
  DOM_GLOBAL_NAMES.forEach((name) => Reflect.deleteProperty(globalThis, name));
});

afterEach(() => {
  DOM_GLOBAL_NAMES.forEach((name) => {
    if (savedGlobals[name] === undefined) Reflect.deleteProperty(globalThis, name);
    else Reflect.set(globalThis, name, savedGlobals[name]);
  });
});

describe('dom-globals.polyfill', () => {
  test('installs DOMParser and XMLSerializer when Node provides neither', async () => {
    expect(Reflect.get(globalThis, 'DOMParser')).toBeUndefined();
    expect(Reflect.get(globalThis, 'XMLSerializer')).toBeUndefined();

    await importPolyfillFresh();

    expect(Reflect.get(globalThis, 'DOMParser')).toBeDefined();
    expect(Reflect.get(globalThis, 'XMLSerializer')).toBeDefined();
  });

  test('installed globals round-trip USX', async () => {
    await importPolyfillFresh();

    const usx = '<usx version="3.0"><book code="GEN" style="id">Genesis</book></usx>';
    const doc = new globalThis.DOMParser().parseFromString(usx, 'text/xml');
    const serialized = new globalThis.XMLSerializer().serializeToString(doc);

    expect(serialized).toContain('code="GEN"');
    expect(serialized).toContain('Genesis');
  });

  // Asserting the globals exist is not the same as asserting the package accepts them: once it
  // gates on its own `assertDomEnvironment` it could need more of the environment than we install.
  // This drives the exact two functions the extension host calls on every scripture read and write.
  //
  // While `scripture-utilities` still bundles its own `@xmldom/xmldom` this passes with or without
  // the polyfill — see the skipped test below, which is what makes the difference detectable.
  test('the real USX⇔USJ converters round-trip under the installed globals', async () => {
    await importPolyfillFresh();
    const usx =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<usx version="3.0"><book code="GEN" style="id">Genesis</book>' +
      '<chapter number="1" style="c" sid="GEN 1" />' +
      '<para style="p"><verse number="1" style="v" sid="GEN 1:1" />In the beginning' +
      '<note caller="+" style="f"><char style="ft">a footnote</char></note></para></usx>';

    const usj = usxStringToUsj(usx);
    const reserialized = usjToUsxString(usj);

    expect(reserialized).toContain('code="GEN"');
    expect(reserialized).toContain('In the beginning');
    // Re-parsing what we serialized must land on the same USJ, or a read-modify-write of a book
    // would drift a little further on every save.
    expect(usxStringToUsj(reserialized)).toEqual(usj);
  });

  // The falsifying half of the round-trip test above: without it, deleting the polyfill outright
  // still leaves this file green. It reports as skipped — not passed — for as long as the installed
  // `scripture-utilities` bundles its own XML implementation, so nobody reads green CI as proof the
  // polyfill is load-bearing. It starts failing the moment the polyfill stops working.
  test.skipIf(!CONVERTERS_NEED_DOM_GLOBALS)(
    'the converters fail without the globals, so the polyfill is what makes them work',
    () => {
      expect(() =>
        usxStringToUsj('<usx version="3.0"><book code="GEN" style="id">Genesis</book></usx>'),
      ).toThrow(/DOM environment/);
    },
  );

  test('does not override a real DOM (renderer, jsdom tests)', async () => {
    // Stand-ins for a real DOM's constructors — identity is all this test cares about
    const realDomParser = function RealDomParser() {};
    const realXmlSerializer = function RealXmlSerializer() {};
    Reflect.set(globalThis, 'DOMParser', realDomParser);
    Reflect.set(globalThis, 'XMLSerializer', realXmlSerializer);

    await importPolyfillFresh();

    expect(Reflect.get(globalThis, 'DOMParser')).toBe(realDomParser);
    expect(Reflect.get(globalThis, 'XMLSerializer')).toBe(realXmlSerializer);
  });

  // The globals only help if they land before anything that converts at load time, and no tooling
  // enforces that: there is no import-sorting lint rule or Prettier plugin, so an editor's
  // "Organize Imports" or a hand edit could reorder it silently. This is the guard.
  test('is the first module the extension host entry point evaluates', () => {
    const entryPoint = readFileSync(
      resolve(__dirname, '../../extension-host/extension-host.ts'),
      'utf8',
    );

    expect(firstEvaluatedSpecifier(entryPoint)).toBe('@node/polyfills/dom-globals.polyfill');
  });
});
