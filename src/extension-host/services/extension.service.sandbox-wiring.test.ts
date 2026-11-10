import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/*
 * Pins how `extension.service.ts` wires in the extension sandbox from `extension-sandbox.util.ts`.
 *
 * The sandbox pieces are tested on their own (`extension-sandbox.util.test.ts`,
 * `extension-sandbox.probes.test.ts`), but nothing there proves the extension host still uses them.
 * `extension.service.ts` cannot be imported in a test, because it creates directories at module
 * scope, so this reads its source as text. That makes it a tripwire for the obvious regressions,
 * not proof of behaviour. What it still misses: a call that stays in the function but becomes
 * unreachable (behind an `if`, after a `return`), and a function body that does not end at the
 * first line holding only `}`.
 */

const SERVICE_PATH = path.join(__dirname, 'extension.service.ts');

function readServiceSource(): string {
  return readFileSync(SERVICE_PATH, 'utf8');
}

/**
 * `source` with block and line comments removed, so a commented-out or mentioned name does not
 * count
 */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
}

/**
 * Returns the code of one top-level function in `source`, from its declaration to the first line
 * that holds only `}` (how Prettier closes a top-level function), with comments removed so a
 * commented-out call does not count.
 */
function readFunctionCode(source: string, functionName: string): string {
  const declaration = new RegExp(`^(?:export )?(?:async )?function ${functionName}\\(`, 'm');
  const match = declaration.exec(source);
  if (!match)
    throw new Error(
      `Could not find the declaration of ${functionName} in ${SERVICE_PATH}. If it was renamed or ` +
        'moved, update this test to read the function that now does its job.',
    );
  const end = source.indexOf('\n}\n', match.index);
  if (end < 0) throw new Error(`Could not find the end of ${functionName} in ${SERVICE_PATH}`);
  return stripComments(source.slice(match.index, end + 2));
}

/** A call to `name`, allowing whitespace before the parenthesis */
function callOf(name: string): RegExp {
  return new RegExp(`\\b${name}\\s*\\(`);
}

/** Index of the first match of `pattern` in `code`, failing the test if there is none */
function indexOfMatch(code: string, pattern: RegExp): number {
  const index = code.search(pattern);
  if (index < 0) throw new Error(`Expected a match for ${pattern} in the function's code`);
  return index;
}

describe('extension host sandbox wiring', () => {
  it('activateExtensions applies both lockdowns before activating extensions', () => {
    const code = readFunctionCode(readServiceSource(), 'activateExtensions');

    const firstActivation = indexOfMatch(code, /\bfor\s*\(const extensionToActivate\b/);
    expect(indexOfMatch(code, callOf('blockProcessModuleAccess'))).toBeLessThan(firstActivation);
    expect(indexOfMatch(code, callOf('blockCodeGenerationFromStrings'))).toBeLessThan(
      firstActivation,
    );
  });

  it('activateExtension loads the extension entry file through the sandbox loader', () => {
    const code = readFunctionCode(readServiceSource(), 'activateExtension');

    expect(code).toMatch(callOf('loadExtensionModule'));
  });

  /*
   * Ways to load a file with Node's own loader instead of `loadExtensionModule`. Names are matched
   * in code only; `webpackIgnore` is itself a comment, so it is matched in its `import(` form.
   */
  const NODE_LOADER_USES: { description: string; pattern: RegExp; inCodeOnly: boolean }[] = [
    { description: 'systemRequire', pattern: /\bsystemRequire\b/, inCodeOnly: true },
    {
      description: '__non_webpack_require__',
      pattern: /\b__non_webpack_require__\b/,
      inCodeOnly: true,
    },
    {
      description: 'import(/* webpackIgnore */)',
      pattern: /\bimport\s*\(\s*\/\*\s*webpackIgnore\b/,
      inCodeOnly: false,
    },
  ];

  it.each(NODE_LOADER_USES)(
    'does not use $description, which would load extension code with Node’s own loader',
    ({ description, pattern, inCodeOnly }) => {
      const source = readServiceSource();
      const searched = inCodeOnly ? stripComments(source) : source;

      // Compared as text so a failure says what to do
      const problem = pattern.test(searched)
        ? `extension.service.ts uses ${description}. This test guards that extension files load ` +
          'only through loadExtensionModule. If this use loads host-only code, move it to another file.'
        : '';
      expect(problem).toBe('');
    },
  );

  it.each(NODE_LOADER_USES)(
    'detects $description in code but not in a comment that mentions it',
    ({ pattern, inCodeOnly }) => {
      const uses = [
        'const m = systemRequire(file);',
        'const m = __non_webpack_require__(file);',
        'const m = await import(/* webpackIgnore: true */ file);',
      ];
      const mention =
        '// Do not use systemRequire, __non_webpack_require__ or webpackIgnore here\nconst x = 1;';

      expect(uses.some((use) => pattern.test(use))).toBe(true);
      expect(pattern.test(inCodeOnly ? stripComments(mention) : mention)).toBe(false);
    },
  );
});
