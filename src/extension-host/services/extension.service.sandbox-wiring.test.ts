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
  return source
    .slice(match.index, end + 2)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
}

/** A call to `name`, allowing whitespace before the parenthesis */
function callOf(name: string): RegExp {
  return new RegExp(`\\b${name}\\s*\\(`);
}

describe('extension host sandbox wiring', () => {
  it('activateExtensions applies both lockdowns before activating extensions', () => {
    const code = readFunctionCode(readServiceSource(), 'activateExtensions');

    expect(code).toMatch(callOf('blockProcessModuleAccess'));
    expect(code).toMatch(callOf('blockCodeGenerationFromStrings'));
  });

  it('activateExtension loads the extension entry file through the sandbox loader', () => {
    const code = readFunctionCode(readServiceSource(), 'activateExtension');

    expect(code).toMatch(callOf('loadExtensionModule'));
  });

  it.each(['systemRequire', '__non_webpack_require__', 'webpackIgnore'])(
    'does not mention %s, which would load extension code with Node’s own loader',
    (forbiddenToken) => {
      expect(readServiceSource()).not.toContain(forbiddenToken);
    },
  );
});
