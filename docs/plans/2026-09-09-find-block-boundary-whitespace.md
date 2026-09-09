# Find block-boundary whitespace tolerance — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Find match a phrase copied out of the Scripture editor when that phrase spans a marker that renders as a line break.

**Architecture:** `UsjReaderWriter.search` concatenates USJ text nodes with no separator, so at a paragraph boundary the searched text has nothing where the editor shows a break and the clipboard supplies a space. `buildSearchRegex` compiles each interior whitespace run in the query as a uniquely-named capture group that may match zero characters; `search()` records which concatenation offsets are block boundaries and rejects any match whose whitespace group matched zero characters away from one. The searched text and its index map are untouched, so offsets, previews, highlighting, and Replace are unaffected.

**Tech Stack:** TypeScript, Vitest, Playwright (CDP), npm workspaces monorepo.

**Spec:** `docs/specs/2026-09-09-find-block-boundary-whitespace-design.md`

## Global Constraints

- **Ticket:** PT-3609, under PT-4336 non-negotiable 1F. Branch `pt-3609-unexpected-find-results`.
- **Block-level node types** (exact list, no others): `para`, `table`, `row`, `cell`, `sidebar`. `note`, `char`, and `chapter` are deliberately excluded — see the spec's "What counts as a break boundary".
- **Regex mode is never touched.** The new option is passed only when `!useRegex`; no groups and no `d` flag are emitted for a user-supplied pattern.
- **`lib/platform-bible-utils/dist/` and `lib/papi-dts/papi.d.ts` are generated.** Never hand-edit; run `npm run build:types`.
- **Every shadcn/ui edit needs a `// CUSTOM:` comment.** No shadcn files are touched by this plan.
- **Comments must be forward-facing.** Do not write comments that narrate this PR ("previously", "the review found", "PT-3609 changed"). Explain the constraint, not the history. Ticket references are allowed only for _open_ follow-up work.
- **No keyboard handlers change,** so `src/stories/keyboard-shortcuts.data.ts` is not touched.
- **Verification before each commit:** the task's own tests, then `npm run lint` on the touched workspace. Full `npm run typecheck && npm run lint && npm test` before the final commit.

## File Structure

| File                                                                                                  | Responsibility                            | Change                                                                                                |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `lib/platform-bible-utils/src/scripture/usj-reader-writer.model.ts`                                   | Public types for the reader/writer        | Add `flexibleWhitespaceAtBlockBoundaries` to `UsjSearchOptions`; add `SEARCH_WHITESPACE_GROUP_PREFIX` |
| `lib/platform-bible-utils/src/scripture/usj-reader-writer.ts`                                         | USJ read/write/search                     | Block-boundary detection during the walk; zero-length-match guard; boundary filter in the exec loop   |
| `lib/platform-bible-utils/src/index.ts`                                                               | Package public surface                    | Re-export the new constant                                                                            |
| `extensions/src/platform-scripture/src/find/find.utils.ts`                                            | Builds the search regex from Find options | Emit named whitespace groups for interior runs; emit `d`                                              |
| `extensions/src/platform-scripture/src/project-data-provider/platform-scripture-finder-pdpe.model.ts` | Find PDP                                  | Pass the option, gated on `!useRegex`                                                                 |
| `.context/standards/Architecture-Decisions.md`                                                        | Decision log                              | New entry                                                                                             |

Tests: `usj-reader-writer.test.ts`, `find.utils.test.ts`, `platform-scripture-finder-pdpe.test.ts`, `e2e-tests/tests/isolated/find/find.spec.ts`.

---

### Task 1: Block-boundary detection and the match filter in `search()`

Self-contained: tested with hand-written regexes carrying `ws`-prefixed groups, so it does not depend on Task 2.

**Files:**

- Modify: `lib/platform-bible-utils/src/scripture/usj-reader-writer.model.ts:536-552`
- Modify: `lib/platform-bible-utils/src/scripture/usj-reader-writer.ts:1648-1805`
- Modify: `lib/platform-bible-utils/src/index.ts`
- Test: `lib/platform-bible-utils/src/scripture/usj-reader-writer.test.ts` (inside `describe('Find USJ details for text searches')`, line 1209)

**Interfaces:**

- Produces: `SEARCH_WHITESPACE_GROUP_PREFIX = 'ws'` (exported from `platform-bible-utils`); `UsjSearchOptions.flexibleWhitespaceAtBlockBoundaries?: boolean`.
- Consumes: nothing.

**Background the implementer needs.** `search()` walks the USJ tree, pushing every text node into `textChunks` and recording each chunk's start offset in `fullTextIndexMap`. `textChunks.join('')` is the string the regex runs against. The walk's callback receives a `workingStack` of `{ parent, index }` items; the walk mutates `index` and pushes/pops the array but **never reassigns `parent`**, so reading `parent` inside the callback is safe. Two chunks are in the same block when their nearest block-level ancestor is the _same object_.

- [ ] **Step 1: Write the failing tests**

Add to `describe('Find USJ details for text searches')` in `usj-reader-writer.test.ts`:

```ts
test('search bridges a whitespace gap only at a block boundary 3.0', () => {
  const usjDoc = new UsjReaderWriter(matthew1And2Usj);

  // MAT 1:1 ends one paragraph and 1:2 begins the next, so the concatenated text reads
  // "...the son of Abraham.Abraham became..." with nothing between the two words.
  const acrossBoundary = /(of Abraham\.(?<ws0>(?: )?)Abraham became)/dg;
  const bridged = usjDoc.search(acrossBoundary, {
    flexibleWhitespaceAtBlockBoundaries: true,
  });
  expect(bridged.length).toBe(1);
  expect(bridged[0].text).toBe('of Abraham.Abraham became');

  // The gate is what the filter REJECTS, not what it accepts: this hand-written pattern already
  // permits a zero-length group, so with the option off the engine matches it wherever the group
  // can be empty. There is no whitespace between "Abraha" and "m" and that offset is not a block
  // boundary, so only the filtered search discards it.
  const insideAWord = /(Abraha(?<ws0>(?: )?)m became)/dg;
  expect(usjDoc.search(insideAWord).length).toBeGreaterThan(0);
  insideAWord.lastIndex = 0;
  expect(usjDoc.search(insideAWord, { flexibleWhitespaceAtBlockBoundaries: true }).length).toBe(0);
});

test('search treats a group that matched real whitespace as always allowed 3.0', () => {
  const usjDoc = new UsjReaderWriter(matthew1And2Usj);

  // Mid-paragraph, the text really does contain the space, so the group is non-empty and
  // the boundary filter must not consider it at all.
  const midParagraph = /(of David,(?<ws0>(?: )?)the son)/dg;
  expect(usjDoc.search(midParagraph, { flexibleWhitespaceAtBlockBoundaries: true }).length).toBe(1);
});

test('search does not treat a char-marker or note boundary as a block boundary 3.0', () => {
  const usjDoc = new UsjReaderWriter(webMatthew5Usj);

  // "...inherit the earth." is followed by footnote content in the concatenated text. A note
  // is nested inside its paragraph, so entering and leaving it is not a block boundary, and
  // the gap there is note text rather than zero characters either way.
  const acrossANote = /(inherit the earth\.(?<ws0>(?: )?)5:5 or)/dg;
  const matches = usjDoc.search(acrossANote, {
    flexibleWhitespaceAtBlockBoundaries: true,
  });
  expect(matches.length).toBe(0);
});

test('search terminates on a pattern that can match the empty string 3.0', () => {
  const usjDoc = new UsjReaderWriter(matthew1And2Usj);

  // A zero-length match does not advance lastIndex, so the exec loop must step past it.
  const canMatchEmpty = /(?<ws0>(?: )?)/dg;
  expect(usjDoc.search(canMatchEmpty, { flexibleWhitespaceAtBlockBoundaries: true })).toEqual([]);
});

test('search with the boundary option off is unchanged and does not require the d flag 3.0', () => {
  const usjDoc = new UsjReaderWriter(matthew1And2Usj);

  const fatherRegex = /father/g;
  expect(usjDoc.search(fatherRegex).length).toBe(40);
  fatherRegex.lastIndex = 0;
  expect(usjDoc.search(fatherRegex, { markerStylesToInclude: undefined }).length).toBe(40);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

```bash
npx vitest run lib/platform-bible-utils/src/scripture/usj-reader-writer.test.ts -t "block boundary"
```

Expected: FAIL. `flexibleWhitespaceAtBlockBoundaries` is not a known property of `UsjSearchOptions` (TypeScript error), and the empty-pattern test hangs or times out.

- [ ] **Step 3: Add the option and the shared prefix to the model**

In `usj-reader-writer.model.ts`, append to `UsjSearchOptions` (after `normalizationForm`, line 551):

```ts
  /**
   * When `true`, a capture group whose name starts with {@link SEARCH_WHITESPACE_GROUP_PREFIX} may
   * match zero characters, but only at a block boundary — an offset in the concatenated text where
   * the adjacent text nodes belong to different block-level markers, which is where the editor
   * renders a line break. A match whose whitespace group matched zero characters anywhere else is
   * discarded.
   *
   * This lets a phrase copied out of an editor match across a rendered line break: the clipboard
   * supplies a space where the concatenated text has nothing between the two words.
   */
  flexibleWhitespaceAtBlockBoundaries?: boolean;
```

Above `UsjSearchOptions` (before line 535), add:

```ts
/**
 * Prefix identifying the capture groups that
 * {@link UsjSearchOptions.flexibleWhitespaceAtBlockBoundaries} applies to. A regex built for such a
 * search names each whitespace run `${SEARCH_WHITESPACE_GROUP_PREFIX}${n}` — names must be unique,
 * because a duplicate capture group name is a `SyntaxError`.
 */
export const SEARCH_WHITESPACE_GROUP_PREFIX = 'ws';
```

Re-export it from `lib/platform-bible-utils/src/index.ts` alongside the other `usj-reader-writer.model` exports.

- [ ] **Step 4: Add block-boundary detection to the walk**

In `usj-reader-writer.ts`, near `NODE_TYPES_NOT_CONTAINING_VERSE_TEXT` (line 51), add:

```ts
/**
 * USJ node types that render as their own block. A change of block ancestor between two adjacent
 * text nodes is where the editor renders a line break. `note` is absent on purpose: USJ nests a
 * note inside its paragraph, so entering and leaving one would report two boundaries at positions
 * the editor renders as continuous text. `chapter` is absent because chapter nodes carry no content
 * and can never be a text node's ancestor.
 */
const BLOCK_LEVEL_NODE_TYPES = ['para', 'table', 'row', 'cell', 'sidebar'];
Object.freeze(BLOCK_LEVEL_NODE_TYPES);
```

Add a private static helper to the class:

```ts
/**
 * Returns the innermost block-level ancestor for the node a working stack points at, or
 * `undefined` when the node has none. Reads `parent` only: the walk mutates each stack item's
 * `index` and pushes/pops the array, but never reassigns `parent`, so the returned object is
 * stable for as long as the caller needs it.
 */
private static findNearestBlockAncestor(
  workingStack: WorkingStack,
): MarkerObject | Usj | undefined {
  for (let i = workingStack.length - 1; i >= 0; i--) {
    const { parent } = workingStack[i];
    if (parent && 'type' in parent && BLOCK_LEVEL_NODE_TYPES.includes(parent.type)) return parent;
  }
  return undefined;
}
```

In `search()`, beside the existing `textChunks`/`fullTextIndexMap` declarations (after line 1678), add:

```ts
// Offsets in the concatenated text where the adjacent text nodes belong to different blocks.
const blockBoundaryOffsets = new Set<number>();
let previousBlockAncestor: MarkerObject | Usj | undefined;
let hasPushedAChunk = false;
```

Inside the walk callback, immediately before `textChunks.push(node);` (line 1721):

```ts
const blockAncestor = UsjReaderWriter.findNearestBlockAncestor(workingStack);
if (hasPushedAChunk && blockAncestor !== previousBlockAncestor)
  blockBoundaryOffsets.add(currentIndex);
previousBlockAncestor = blockAncestor;
hasPushedAChunk = true;
```

Boundaries are recorded inside the push path, after the `markerStylesToInclude` filter, so they line up with the chunks that were actually concatenated rather than with the raw tree.

- [ ] **Step 5: Add the filter helper**

Add another private static to the class:

```ts
/**
 * True when a match must be discarded because one of its whitespace groups matched zero
 * characters somewhere other than a block boundary. A group that matched real whitespace is
 * always acceptable, and so is a group that did not participate in the match.
 *
 * @param match Match to inspect. Must come from a regex with the `d` flag so group offsets exist.
 * @param blockBoundaryOffsets Offsets into the original concatenated text that are block boundaries
 * @param nfdToOriginalMap Position map when the search text was NFD-normalized, else `undefined`
 */
private static hasWhitespaceGapAwayFromBoundary(
  match: RegExpExecArray,
  blockBoundaryOffsets: Set<number>,
  nfdToOriginalMap: number[] | undefined,
): boolean {
  const groupOffsets = match.indices?.groups;
  if (!groupOffsets) return false;
  return Object.entries(groupOffsets).some(([groupName, offsets]) => {
    if (!groupName.startsWith(SEARCH_WHITESPACE_GROUP_PREFIX) || !offsets) return false;
    const [groupStart, groupEnd] = offsets;
    // The group matched actual whitespace, so there is no gap to justify.
    if (groupEnd > groupStart) return false;
    const originalStart = nfdToOriginalMap ? nfdToOriginalMap[groupStart] : groupStart;
    return !blockBoundaryOffsets.has(originalStart);
  });
}
```

Import `SEARCH_WHITESPACE_GROUP_PREFIX` from `./usj-reader-writer.model`.

- [ ] **Step 6: Apply the filter and the zero-length guard in the exec loop**

Replace the exec loop's setup and body (lines 1750-1803). Before the loop:

```ts
const isBoundaryFilterOn =
  markerStylesOrSearchOptions instanceof Set
    ? false
    : !!markerStylesOrSearchOptions?.flexibleWhitespaceAtBlockBoundaries;
// Group offsets require the `d` flag. Rebuilding resets `lastIndex`, so only do it for a search
// that asked for the filter — a caller's own regex must be left exactly as they compiled it.
const searchRegex =
  isBoundaryFilterOn && !regex.flags.includes('d')
    ? new RegExp(regex.source, `${regex.flags}d`)
    : regex;
```

Then use `searchRegex` everywhere the loop used `regex`, and insert two `continue` branches. The loop becomes:

```ts
let match: RegExpExecArray | null = searchRegex.exec(searchText);
while (match) {
  // A zero-length match leaves `lastIndex` where it is, so stepping past it is the only way out
  // of this loop.
  if (match[0].length === 0) {
    if (!searchRegex.global || searchRegex.lastIndex >= searchText.length) break;
    searchRegex.lastIndex += 1;
    match = searchRegex.exec(searchText);
    continue;
  }

  if (
    isBoundaryFilterOn &&
    UsjReaderWriter.hasWhitespaceGapAwayFromBoundary(match, blockBoundaryOffsets, nfdToOriginalMap)
  ) {
    // Resume one character on rather than at `lastIndex`, so a legitimate match that overlaps
    // this rejected one is still reachable. Only rejected matches rewind: doing this for accepted
    // matches would return overlapping duplicates, which Replace All refuses outright.
    if (!searchRegex.global) break;
    searchRegex.lastIndex = match.index + 1;
    match = searchRegex.exec(searchText);
    continue;
  }

  // ...existing body that builds `start`, `end`, and pushes onto `retVal`, unchanged...

  if (!searchRegex.global) break;
  match = searchRegex.exec(searchText);
}
```

Keep the existing `if (match[0].length > 0) { ... }` guard's contents but drop the now-redundant wrapper, since the zero-length case `continue`s above it.

- [ ] **Step 7: Run the tests to verify they pass**

```bash
npx vitest run lib/platform-bible-utils/src/scripture/usj-reader-writer.test.ts
```

Expected: PASS, including every pre-existing test in the file (the `search` suite around line 1388 is the regression check that the option-off path is untouched).

- [ ] **Step 8: Lint and commit**

```bash
npm run lint --workspace=platform-bible-utils
git add lib/platform-bible-utils/src/scripture/usj-reader-writer.ts \
        lib/platform-bible-utils/src/scripture/usj-reader-writer.model.ts \
        lib/platform-bible-utils/src/index.ts \
        lib/platform-bible-utils/src/scripture/usj-reader-writer.test.ts
git commit -m "PT-3609: Allow a whitespace gap at block boundaries in USJ search"
```

---

### Task 2: Emit named whitespace groups from `buildSearchRegex`

**Files:**

- Modify: `extensions/src/platform-scripture/src/find/find.utils.ts:740-810`
- Test: `extensions/src/platform-scripture/src/find/find.utils.test.ts`

**Interfaces:**

- Consumes: `SEARCH_WHITESPACE_GROUP_PREFIX` from `platform-bible-utils` (Task 1).
- Produces: `buildSearchRegex(options, characterCategorizer)` — unchanged signature; non-regex searches now carry `(?<ws0>…)`, `(?<ws1>…)`, … and the `d` flag.

**Two rules the implementer must get right.**

1. **Names must be unique.** `new RegExp('(?<w>a)(?<w>b)')` throws `SyntaxError: Duplicate capture group name`, and a query like `of Abraham. Abraham became` has three whitespace runs.
2. **Only _interior_ runs become zero-or-more** — a run with at least one query character before it and after it. A leading, trailing, or whitespace-only run has no gap to bridge, and making it optional would regress a whitespace-only query: today `" "` compiles to `([ws]+?)` and matches whitespace, whereas a lazy `*?` prefers zero, produces an empty overall match, and returns nothing.

- [ ] **Step 1: Write the failing tests**

Add to `find.utils.test.ts`:

```ts
describe('buildSearchRegex – block-boundary whitespace groups', () => {
  const categorizer: CharacterCategorizer = {
    baseCharacterClassRegex: '\\p{L}',
    diacriticCharacterClassRegex: '\\p{Mn}',
    wordMedialCharacterRegex: '',
    wordBreakRegex: '\\s+',
    allowInvisibleCharacters: false,
  };
  const baseOptions: FindOptions = {
    scope: [{ bookId: 'MAT' }],
    searchString: '',
    caseInsensitive: true,
    useRegex: false,
    verseTextOnly: false,
    wordRestriction: 'none',
    ignoreWhitespaceDifferences: false,
    ignoreDiacritics: false,
  };

  it('names each interior whitespace run uniquely so a multi-run query compiles', () => {
    const regex = buildSearchRegex(
      { ...baseOptions, searchString: 'of Abraham. Abraham became' },
      categorizer,
    );
    expect(regex.source).toContain(`(?<${SEARCH_WHITESPACE_GROUP_PREFIX}0>`);
    expect(regex.source).toContain(`(?<${SEARCH_WHITESPACE_GROUP_PREFIX}1>`);
    expect(regex.source).toContain(`(?<${SEARCH_WHITESPACE_GROUP_PREFIX}2>`);
    expect(regex.flags).toContain('d');
  });

  it('lets an interior run match zero characters', () => {
    const regex = buildSearchRegex({ ...baseOptions, searchString: 'a b' }, categorizer);
    expect(regex.test('ab')).toBe(true);
    regex.lastIndex = 0;
    expect(regex.test('a b')).toBe(true);
  });

  it('keeps a whitespace-only query matching whitespace', () => {
    const regex = buildSearchRegex({ ...baseOptions, searchString: ' ' }, categorizer);
    expect(regex.source).not.toContain(`(?<${SEARCH_WHITESPACE_GROUP_PREFIX}`);
    expect('a b'.match(regex)?.length).toBe(1);
  });

  it('collapses an interior run when ignoring whitespace differences', () => {
    const regex = buildSearchRegex(
      { ...baseOptions, searchString: 'a b', ignoreWhitespaceDifferences: true },
      categorizer,
    );
    expect(regex.test('a   b')).toBe(true);
    regex.lastIndex = 0;
    expect(regex.test('ab')).toBe(true);
  });

  it('treats ~ as whitespace inside the group when invisible characters are not allowed', () => {
    const regex = buildSearchRegex(
      { ...baseOptions, searchString: 'a b', ignoreWhitespaceDifferences: true },
      categorizer,
    );
    expect(regex.test('a~b')).toBe(true);
  });

  it('emits no groups and no d flag in regex mode', () => {
    const regex = buildSearchRegex(
      { ...baseOptions, searchString: 'a\\s+b', useRegex: true },
      categorizer,
    );
    expect(regex.source).not.toContain(`(?<${SEARCH_WHITESPACE_GROUP_PREFIX}`);
    expect(regex.flags).not.toContain('d');
  });
});
```

Import `SEARCH_WHITESPACE_GROUP_PREFIX` from `platform-bible-utils` in the test file.

- [ ] **Step 2: Run the tests to verify they fail**

```bash
npx vitest run extensions/src/platform-scripture/src/find/find.utils.test.ts -t "block-boundary whitespace"
```

Expected: FAIL — `regex.source` contains no `(?<ws0>` and `regex.flags` has no `d`.

- [ ] **Step 3: Restructure the non-regex character loop**

In `buildSearchRegex`, replace the `for` loop over `chars` (lines 748-785) with a `while` loop that consumes whole whitespace runs:

```ts
const chars = [...normSearch];
const isWhiteSpaceChar = (candidate: string) =>
  isSelectableInvisibleCharOrWhiteSpace(candidate) ||
  // With AllowInvisibleChars false (the Paratext default) NBSP is stored as ~ in USFM, so ~
  // stands for a non-breaking space. With it true, ~ is just a tilde.
  (!allowInvisibleCharacters && candidate === '~');
const isSkippedDiacritic = (candidate: string) => ignoreDiacritics && isDiacritic.test(candidate);

let whitespaceGroupCount = 0;
let index = 0;
while (index < chars.length) {
  const char = chars[index];

  if (isSkippedDiacritic(char)) {
    index += 1;
    continue;
  }

  if (isWhiteSpaceChar(char)) {
    const runStart = index;
    const run: string[] = [];
    while (index < chars.length) {
      const runChar = chars[index];
      if (isSkippedDiacritic(runChar)) {
        index += 1;
        continue;
      }
      if (!isWhiteSpaceChar(runChar)) break;
      run.push(runChar);
      index += 1;
    }

    // Only a run with query characters on both sides can sit at a block boundary. A leading,
    // trailing, or whitespace-only run has no gap to bridge, and making it optional would stop
    // a whitespace-only query from matching whitespace at all.
    const isInteriorRun = runStart > 0 && index < chars.length;
    const whitespaceClass = allowInvisibleCharacters
      ? `[${SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS}]`
      : `(?:[${SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS}]|~)`;

    if (ignoreWhitespace) {
      regexStr += isInteriorRun
        ? `(?<${SEARCH_WHITESPACE_GROUP_PREFIX}${whitespaceGroupCount}>${whitespaceClass}*?)`
        : `${whitespaceClass}+?`;
    } else {
      const literalRun = run.map((runChar) => escapeStringRegexp(runChar)).join('');
      regexStr += isInteriorRun
        ? `(?<${SEARCH_WHITESPACE_GROUP_PREFIX}${whitespaceGroupCount}>(?:${literalRun})?)`
        : literalRun;
    }
    if (isInteriorRun) whitespaceGroupCount += 1;

    // C# assumes DiacriticsFollowBaseCharacters=true, so only a trailing class is emitted.
    if (ignoreDiacritics) regexStr += `[${diacriticClass}]*`;
    continue;
  }

  regexStr += escapeStringRegexp(char);
  if (ignoreDiacritics) regexStr += `[${diacriticClass}]*`;
  index += 1;
}
```

Declare `let whitespaceGroupCount = 0;` where the function can still see it at flag-building time — hoist it above the `if (useRegex)` branch and leave it at `0` for the regex path.

Note the diacritic class is now emitted once after a whole whitespace run rather than after each whitespace character. Both forms match the same real text; combining marks between two spaces are not a case Paratext produces.

- [ ] **Step 4: Emit the `d` flag when groups exist**

Replace the flags line (line 806):

```ts
// `d` exposes capture group offsets, which UsjReaderWriter.search needs to tell a whitespace
// group that matched real whitespace from one that matched nothing. Emitted only when there is
// such a group, so a regex-mode pattern is compiled exactly as the user wrote it.
const flags = `${caseInsensitive ? 'i' : ''}g${needsUnicodeFlag ? 'u' : ''}${
  whitespaceGroupCount > 0 ? 'd' : ''
}`;
```

- [ ] **Step 5: Run the tests to verify they pass**

```bash
npx vitest run extensions/src/platform-scripture/src/find/find.utils.test.ts
```

Expected: PASS, including the pre-existing `buildSearchRegex` suites (line 97 onward) — they are the check that whitespace handling for non-interior runs is unchanged.

- [ ] **Step 6: Lint and commit**

```bash
npm run lint --workspace=paranext-extensions
git add extensions/src/platform-scripture/src/find/find.utils.ts \
        extensions/src/platform-scripture/src/find/find.utils.test.ts
git commit -m "PT-3609: Compile interior whitespace runs as named optional groups"
```

---

### Task 3: Wire the option into the Find PDP and prove it end to end

**Files:**

- Modify: `extensions/src/platform-scripture/src/project-data-provider/platform-scripture-finder-pdpe.model.ts:953-956`
- Test: `extensions/src/platform-scripture/src/project-data-provider/platform-scripture-finder-pdpe.test.ts`
- Test: `e2e-tests/tests/isolated/find/find.spec.ts`

**Interfaces:**

- Consumes: `UsjSearchOptions.flexibleWhitespaceAtBlockBoundaries` (Task 1); the groups emitted by `buildSearchRegex` (Task 2).
- Produces: no new API.

- [ ] **Step 1: Write the failing PDP test**

In `platform-scripture-finder-pdpe.test.ts`, following the file's existing setup conventions:

```ts
it('passes block-boundary whitespace tolerance for a plain search but not a regex search', async () => {
  const searchSpy = vi.spyOn(UsjReaderWriter.prototype, 'search');

  await runFindJob({ searchString: 'of Abraham. Abraham', useRegex: false });
  expect(searchSpy).toHaveBeenLastCalledWith(
    expect.any(RegExp),
    expect.objectContaining({ flexibleWhitespaceAtBlockBoundaries: true }),
  );

  await runFindJob({ searchString: 'of Abraham\\.\\s?Abraham', useRegex: true });
  expect(searchSpy).toHaveBeenLastCalledWith(
    expect.any(RegExp),
    expect.objectContaining({ flexibleWhitespaceAtBlockBoundaries: false }),
  );
});
```

Use whatever job-running helper the file already provides in place of `runFindJob`; do not add a new harness.

- [ ] **Step 2: Run it to verify it fails**

```bash
npx vitest run extensions/src/platform-scripture/src/project-data-provider/platform-scripture-finder-pdpe.test.ts -t "block-boundary"
```

Expected: FAIL — the options object has no such property.

- [ ] **Step 3: Pass the option, gated on `!useRegex`**

```ts
const matches = usj.search(buildSearchRegex(job.options, characterCategorizer), {
  markerStylesToInclude: job.options.verseTextOnly ? USFM_VERSE_TEXT_MARKERS_SET : undefined,
  normalizationForm: job.options.ignoreDiacritics && !job.options.useRegex ? 'NFD' : undefined,
  // A regex-mode pattern means exactly what the user wrote: no whitespace groups are emitted
  // for it, and its regex must not be rebuilt to add the `d` flag.
  flexibleWhitespaceAtBlockBoundaries: !job.options.useRegex,
});
```

- [ ] **Step 4: Run it to verify it passes**

```bash
npx vitest run extensions/src/platform-scripture/src/project-data-provider/platform-scripture-finder-pdpe.test.ts
```

Expected: PASS.

- [ ] **Step 5: Add the E2E tests**

The bundled WEB text reproduces this as shipped — no fixture patching. In `find.spec.ts`, following the file's existing helpers for typing a term and waiting on the results counter:

```ts
test('finds a phrase copied across a paragraph boundary', async ({ findPage }) => {
  // MAT 1:1 and 1:2 are separate paragraphs, so the searched text runs
  // "...the son of Abraham.Abraham became..." with no space. The editor renders a line break
  // there, so a copy-paste of this phrase carries one.
  await searchFor(findPage, 'of Abraham. Abraham became');
  await expect(resultsCounter(findPage)).not.toHaveText(NO_RESULTS_PATTERN);
});

test('does not match a missing space away from a paragraph boundary', async ({ findPage }) => {
  await searchFor(findPage, 'of David,the son');
  await expect(resultsCounter(findPage)).toHaveText(NO_RESULTS_PATTERN);
});
```

- [ ] **Step 6: Run the whole isolated find directory**

```bash
npx playwright test e2e-tests/tests/isolated/find --config e2e-tests/playwright-cdp.config.ts
```

Expected: PASS. `replace.spec.ts` shares the fixture, so it must run too.

- [ ] **Step 7: Lint and commit**

```bash
npm run lint --workspace=paranext-extensions
git add extensions/src/platform-scripture/src/project-data-provider/ e2e-tests/tests/isolated/find/find.spec.ts
git commit -m "PT-3609: Enable block-boundary whitespace tolerance for plain Find searches"
```

---

### Task 4: Replace guard, decision log, and spec amendment

**Files:**

- Test: `extensions/src/platform-scripture/src/project-data-provider/platform-scripture-finder-pdpe.test.ts`
- Modify: `.context/standards/Architecture-Decisions.md`
- Modify: `docs/specs/2026-09-09-find-block-boundary-whitespace-design.md`

**Interfaces:**

- Consumes: everything from Tasks 1-3.
- Produces: nothing.

- [ ] **Step 1: Write the Replace-guard test**

Assert only what the guard actually does. Structure protection keys off `isBlockMarker`, which is `true` for `p`/`q1`/`v` and `false` for `f`/`fe`/`x`/`fr`/`ft` — so a paragraph-spanning replace is refused and a footnote-spanning one is not. Do not assert the note case here; it is a separate, pre-existing bug.

```ts
it('refuses to replace a match that spans a paragraph boundary while structure is protected', async () => {
  const jobId = await beginFindJob({
    searchString: 'of Abraham. Abraham became',
    useRegex: false,
  });
  await expect(replaceAll(jobId, 'replaced')).rejects.toThrow(STRUCTURE_PROTECTED_ERROR);
});
```

- [ ] **Step 2: Run it**

```bash
npx vitest run extensions/src/platform-scripture/src/project-data-provider/platform-scripture-finder-pdpe.test.ts -t "paragraph boundary"
```

Expected: PASS with no production change — the guard already covers this. If it FAILS, stop and report: that means structure protection does not cover paragraph markers either, which is a larger problem than this ticket.

- [ ] **Step 3: Add the Architecture-Decisions entry**

Insert at its byte-order slug position (`LC_ALL=C sort` on the slug), not at the end of the file. Follow the file's existing entry format (date · status · context · decision · alternatives · consequences). Content: Find tolerates a whitespace gap only at block boundaries; the block-level set and why `note`, `char`, and `chapter` are excluded; the sentinel-in-the-search-text alternative and why it was declined; the consequence that boundary-spanning matches become common, and that Replace's structure protection covers paragraph markers but not notes.

- [ ] **Step 4: Amend the spec's one stale detail**

The spec says every whitespace run becomes zero-or-more. Implementation restricts that to _interior_ runs, because making a leading, trailing, or whitespace-only run optional stops a whitespace-only query from matching whitespace. Update the "Matching semantics" and "Approach" sections to say "interior whitespace run", and add the reason.

- [ ] **Step 5: Full verification**

```bash
npm run typecheck && npm run lint && npm test
npm run build:types
git status --porcelain lib/platform-bible-utils/dist lib/papi-dts
```

Expected: all green; the generated declarations show the new option and constant.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "PT-3609: Record the boundary-whitespace decision and cover the Replace guard"
```

---

## Self-Review

**Spec coverage.** Matching semantics → Task 2 (compilation) + Task 1 (filter). Break-boundary definition and its three exclusions → Task 1 Steps 4-5, tested in Step 1. Group uniqueness → Task 2. `lastIndex` / hang guard → Task 1 Step 6. `!useRegex` gating of both the option and the `d` rebuild → Task 3 Step 3 and Task 2 Step 4. NFD remap → Task 1 Step 5. Narrow rewind → Task 1 Step 6. Reproducibility phrases → Task 1 and Task 3. Layers 1-4 of the test plan → Tasks 1, 2, 3, 4. Decision log → Task 4.

**Deliberate deviations from the spec**, both recorded in Task 4 Step 4:

1. Only _interior_ whitespace runs become optional (the spec says all runs).
2. No whitespace-only-query rejection is added to `beginFindJob`. It is unnecessary: with interior-only groups the pattern can no longer match the empty string, and the `lastIndex` guard covers any other route. Rejecting it would also surface an error toast while a user is mid-typing, since Find auto-searches on a debounce.

**Not covered, by design** (both in the spec's Known limitations, both filed in `~/Desktop/PT-3609-follow-ups.md`): note-terminated boundaries, and whole-word Find at these boundaries.
