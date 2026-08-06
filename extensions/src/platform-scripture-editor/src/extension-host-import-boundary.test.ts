import { existsSync, readFileSync, statSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

/*
 * Guards the extension host's import boundary, which is otherwise enforced only at runtime — and
 * enforced there by crashing.
 *
 * `main.ts` is this extension's entry point (`manifest.json` → `"main"`), so everything it reaches
 * is loaded in the extension host. The host replaces `Module.prototype.require` with a shim that
 * allows a short list of modules and throws "Requiring other than papi is not allowed in
 * extensions!" for anything else (`src/extension-host/services/extension.service.ts`). Webpack
 * bundles most dependencies, so most bare imports never reach the shim — but the modules in
 * `extensions/webpack/webpack.config.base.ts` → `externals` stay as `require` calls, and `react`,
 * `react-dom` and `@papi/frontend` are externals the shim does NOT allow.
 *
 * That is the whole failure mode: value-importing a UI module (a `lucide-react` icon, a
 * `platform-bible-react` component) into a host-reachable file bundles a module that calls
 * `forwardRef`/`createContext` at module-eval time, which emits `require('react')`, which throws.
 * Activation fails and no scripture editor opens — with no build error and no lint error to warn
 * you. This test is that missing check.
 *
 * Web-view bundles are deliberately excluded: `?inline` imports pull them in as *strings*, not as
 * modules, and they run in the renderer. UI belongs there.
 */

const SRC_DIR = __dirname;
const ENTRY_POINT = path.join(SRC_DIR, 'main.ts');

/**
 * Bare module specifiers a host-reachable file may value-import.
 *
 * Deliberately an allowlist rather than a denylist of UI packages: a denylist silently misses the
 * next UI package someone adds. Keep this in sync with the shim's allowed modules in
 * `src/extension-host/services/extension.service.ts`.
 */
const ALLOWED_MODULES = new Set([
  // Supplied by the extension host's `require` shim
  '@papi/backend',
  '@papi/core',
  '@sillsdev/scripture',
  'platform-bible-utils',
  'crypto',
  // This extension's own ambient module declaration (`src/types/platform-scripture-editor.d.ts`).
  // It declares types only, so TypeScript erases these imports and no `require` is emitted.
  'platform-scripture-editor',
]);

/** Extensions tried when resolving a relative import to a file on disk */
const RESOLVE_EXTENSIONS = ['', '.ts', '.tsx', '.d.ts'];

/**
 * Matches an `import`/`export` statement's specifier along with the clause before `from`, so a
 * type-only statement can be told apart from a value one. Excluding `;` and quotes from the clause
 * keeps the lazy match from running past the end of one statement into the next.
 */
const FROM_IMPORT_REGEX = /(?:^|\n)[ \t]*(?:import|export)\b([^;'"]*?)from[ \t]*['"]([^'"]+)['"]/g;
/** Matches a side-effect import (`import './thing'`), which has no clause and is never type-only */
const SIDE_EFFECT_IMPORT_REGEX = /(?:^|\n)[ \t]*import[ \t]*['"]([^'"]+)['"]/g;
/** Matches a dynamic `import('…')` or `require('…')` with a literal specifier */
const RUNTIME_IMPORT_REGEX = /\b(?:import|require)\([ \t]*['"]([^'"]+)['"]/g;

/**
 * Whether an `import`/`export` clause is erased by the compiler, so it emits no `require`. True for
 * `import type { … }` and for a clause whose every named binding is individually `type`-prefixed.
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

/** Resolve a relative import specifier to a file in this extension, or `undefined` if it isn't one */
function resolveRelativeImport(specifier: string, importingFile: string): string | undefined {
  const base = path.resolve(path.dirname(importingFile), specifier);
  const candidates = [
    ...RESOLVE_EXTENSIONS.map((extension) => `${base}${extension}`),
    ...RESOLVE_EXTENSIONS.filter((extension) => extension !== '').map((extension) =>
      path.join(base, `index${extension}`),
    ),
  ];
  return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile());
}

type Violation = { file: string; specifier: string };

/**
 * Walk `main.ts`'s transitive value-import graph, collecting every bare specifier that isn't
 * host-safe. Type-only imports are skipped because the compiler erases them, and `?inline`/`?raw`
 * imports are skipped because they load their target as a string rather than as a module.
 */
function findImportBoundaryViolations(): { violations: Violation[]; filesInGraph: string[] } {
  const visited = new Set<string>();
  const violations: Violation[] = [];

  function record(specifier: string, importingFile: string) {
    // `?inline` / `?raw` imports are transformed into strings by webpack, so the target is data, not
    // a module the host loads. This is how the web views (and their UI code) stay out of the host.
    if (specifier.includes('?')) return;
    if (specifier.startsWith('.')) {
      const resolved = resolveRelativeImport(specifier, importingFile);
      // An unresolvable relative import would fail the build long before it reached the host, so
      // there is nothing for this test to say about it
      if (resolved) walk(resolved);
      return;
    }
    if (!ALLOWED_MODULES.has(specifier))
      violations.push({ file: path.relative(SRC_DIR, importingFile), specifier });
  }

  function walk(file: string) {
    if (visited.has(file)) return;
    visited.add(file);
    const source = readFileSync(file, 'utf-8');

    FROM_IMPORT_REGEX.lastIndex = 0;
    let match = FROM_IMPORT_REGEX.exec(source);
    while (match) {
      if (!isTypeOnlyClause(match[1])) record(match[2], file);
      match = FROM_IMPORT_REGEX.exec(source);
    }

    [SIDE_EFFECT_IMPORT_REGEX, RUNTIME_IMPORT_REGEX].forEach((regex) => {
      regex.lastIndex = 0;
      let runtimeMatch = regex.exec(source);
      while (runtimeMatch) {
        record(runtimeMatch[1], file);
        runtimeMatch = regex.exec(source);
      }
    });
  }

  walk(ENTRY_POINT);
  return { violations, filesInGraph: [...visited].map((file) => path.relative(SRC_DIR, file)) };
}

const { violations, filesInGraph } = findImportBoundaryViolations();

describe('extension host import boundary', () => {
  it('reaches main.ts and the modules it imports', () => {
    // Sanity check that the walk actually traversed something. Without it, a resolver regression
    // would empty the graph and every assertion below would pass vacuously.
    expect(filesInGraph).toContain('main.ts');
    expect(filesInGraph).toContain('platform-scripture-editor.utils.ts');
  });

  it('value-imports only modules the extension host supplies', () => {
    // If this fails, do NOT add the module to `ALLOWED_MODULES` to make it pass unless it is one the
    // host's `require` shim actually supplies. The fix is normally one of:
    //   1. make the import type-only (`import type { … }`) if you only need its types;
    //   2. move the code that needs the runtime value into a module the host never reaches — see
    //      `character-marker-menu.utils.ts`, which exists for exactly this reason;
    //   3. confirm the package is bundled and pulls in none of webpack's `externals` (notably
    //      `react`), then allowlist it here with a comment saying so.
    expect(violations).toEqual([]);
  });

  it('pulls in no .tsx file, which would emit a react/jsx-runtime require', () => {
    // A `.tsx` file compiles JSX to `react/jsx-runtime` calls, and `react/jsx-runtime` is a webpack
    // external the shim rejects — so a host-reachable `.tsx` file fails activation even when none of
    // its own imports are UI modules.
    expect(filesInGraph.filter((file) => file.endsWith('.tsx'))).toEqual([]);
  });
});
