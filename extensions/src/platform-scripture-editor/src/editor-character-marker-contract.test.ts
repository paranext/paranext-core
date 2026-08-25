import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Guards the character-marker slice of `EditorRef` against the INSTALLED
 * `@eten-tech-foundation/platform-editor`. Nothing else in this extension does.
 *
 * Every character-marker suite supplies its own `EditorRef` stub (`vi.mock`, plus partial refs cast
 * through `as unknown as MutableRefObject<EditorRef | null>`), so those tests pass no matter what
 * the package actually ships. `tsc` covers the members this extension calls on a typed `EditorRef`
 * — but not `changeCharacterMarker`, which is hand-declared as an adapter in
 * `character-marker-menu.utils.ts` and `use-character-marker-state.hook.ts` and never tied to the
 * package, so no compiler check connects the two. That is the hole this fills: a 0.8.15-only
 * operation sat referenced-but-unreachable behind a 0.8.14 pin without any test noticing.
 *
 * Reads the resolved package's type declarations rather than importing it: `EditorRef` is a type,
 * so there is no runtime object to reflect over without mounting a Lexical editor in jsdom. Reading
 * whatever is RESOLVED is the point — a fresh clone gets the published tarball and a linked
 * developer gets the yalc build, and either one drifting from these signatures is a real break.
 */

const require = createRequire(import.meta.url);
const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));

/** Members this extension relies on, with the exact signature it relies on them having. */
const REQUIRED_EDITOR_REF_MEMBERS = [
  // Called directly by `use-remove-character-marker.hook.ts`. The `boolean` matters: it is the
  // outcome signal that tells a declined removal from a real one.
  'removeCharacterMarker(marker?: string): boolean;',
  // The operation `changeCharacterMarker` adapts. NOTE THE ARGUMENT ORDER — see below.
  'replaceCharacterMarker(toMarker: string, fromMarker?: string): boolean;',
  // Nothing supplies this yet (TODO(PT-4394)); pinned so the partial-coverage row can be wired
  // against a known shape rather than a guess.
  'extendCharacterMarker(marker: string, conflictingMarkers?: readonly string[]): boolean;',
];

/** Source files that hand-declare the `changeCharacterMarker` adapter, and the shape they declare. */
const ADAPTER_DECLARATION_FILES = [
  'character-marker-menu.utils.ts',
  'use-character-marker-state.hook.ts',
];
const CHANGE_ADAPTER_DECLARATION =
  'changeCharacterMarker?: (fromMarker: string, toMarker: string) => void;';

/** Whitespace-insensitive haystack, so d.ts reformatting alone can't fail this. */
function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ');
}

function readInstalledEditorTypes(): string {
  const packageJsonPath = require.resolve('@eten-tech-foundation/platform-editor/package.json');
  const packageJson: { types?: string } = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  if (!packageJson.types)
    throw new Error('@eten-tech-foundation/platform-editor declares no `types` entry');
  return readFileSync(path.join(path.dirname(packageJsonPath), packageJson.types), 'utf-8');
}

describe('EditorRef character-marker contract (installed platform-editor)', () => {
  it('declares every character-marker operation this extension depends on', () => {
    const types = collapseWhitespace(readInstalledEditorTypes());

    // Asserted as a list of what's missing rather than one expectation per member, so a failure
    // names every absent signature at once instead of stopping at the first.
    const missing = REQUIRED_EDITOR_REF_MEMBERS.filter(
      (member) => !types.includes(collapseWhitespace(member)),
    );

    expect(missing).toEqual([]);
  });

  it('keeps the hand-declared change adapter paired with the editor operation it adapts', () => {
    // `changeCharacterMarker(fromMarker, toMarker)` takes its arguments in the OPPOSITE order from
    // `replaceCharacterMarker(toMarker, fromMarker)`, and both are `string`, so a wiring that
    // forwards positionally would compile and silently swap the two markers. Whoever wires this up
    // under PT-4394 must adapt, not forward — and if either side's parameter names change, this
    // fails so the pairing is re-checked rather than assumed.
    const filesMissingAdapter = ADAPTER_DECLARATION_FILES.filter(
      (file) =>
        !collapseWhitespace(readFileSync(path.join(SRC_DIR, file), 'utf-8')).includes(
          CHANGE_ADAPTER_DECLARATION,
        ),
    );

    expect(filesMissingAdapter).toEqual([]);
  });
});
