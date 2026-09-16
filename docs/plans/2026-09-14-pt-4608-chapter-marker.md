# PT-4608 Chapter-Marker Save Repair — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Editing or typing a `\c` marker in the editor must never silently stop saving; the
document is repaired Paratext-9-style before the write, the user is told, and any save rejection
that still happens is surfaced instead of only logged.

**Architecture:** A pure USJ-level port of Paratext 9's `UsfmEditorTextLoader.FixChapterNumbers`
runs in the renderer's save path before the PDP write, pushes the repaired document back into the
editor (PT9's `Revert()`), and notifies. A USFM-level port of the same algorithm sits in the C#
`SetChapterUsx`/`SetChapterUsfm` as a backstop for non-editor writers. Separately, the web view's
save-failure handler gains a generic fallback notification so no rejection is log-only.

**Tech Stack:** TypeScript / React / vitest (`extensions/` workspace, its own vitest config);
C# .NET 8 / NUnit (`c-sharp`, `c-sharp-tests`).

**Spec:** `docs/specs/2026-09-14-pt-4608-chapter-marker-design.md`

## Global Constraints

- **Workspace:** all work happens in `~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core`
  on branch `pt-4608-chapter-marker`. Never touch the canonical checkout at
  `~/source/repos/paranext-core`.
- **No `scripture-editors` change.** Core only. Do not edit anything under
  `~/source/repos/workspaces/pt-4608-chapter-marker/scripture-editors`, and do not run
  `npm run build:editor`.
- **Run TS tests from `extensions/`**, which has its own vitest config — the repo-root vitest does
  not include `extensions/src`:
  `cd extensions && npx vitest run src/platform-scripture-editor/src/<file>`
- **Lint from `extensions/`** too; the repo-root eslint ignores that directory entirely:
  `cd extensions && NODE_ENV=development npx eslint --ext .ts,.tsx <paths>`
- **C# tests:** `cd c-sharp-tests && dotnet test --filter <ClassName>`
- **Comments must be forward-facing.** Do not write `PT-4608`, "previously", "used to", "the review
  found", or any narration of this change into source comments. See
  `.claude/rules/code-quality/forward-facing-comments.md`. The ticket number belongs in the commit
  message only. A `TODO(PT-XXXX)` for _deferred_ work is the one legitimate ID.
- **Never suppress a lint/type error** you can fix by restructuring. See
  `.claude/rules/code-quality/eslint-disable-discipline.md`.
- **Send/Receive write gate:** Task 5 adds no new write site. Do not add
  `SendReceiveWriteLock.EnterWrite` anywhere — the methods you edit already hold a scope, and
  nesting one is unsafe.
- Commit after each task with the message given in that task's final step.

### The Paratext 9 oracle

Both repairs are ports of `FixChapterNumbers`
(`~/source/repos/Paratext/ParatextBase/ScriptureEditor/UsfmEditorTextLoader.cs`, line 355). Its
behaviour table is `UsfmEditorTextLoaderTests.FixChapterNumbers`
(`~/source/repos/Paratext/ParatextBase.Tests/ScriptureEditor/UsfmEditorTextLoaderTests.cs`, line
573). Transcribed here as `(expected, input, chapterNumber)`:

| #   | input USFM                                      | chapter | expected USFM                           | note                                                 |
| --- | ----------------------------------------------- | ------- | --------------------------------------- | ---------------------------------------------------- |
| 1   | `1\r\n2\r\n`                                    | -1      | unchanged                               | invalid chapter number → no change                   |
| 2   | `1\r\n2\r\n`                                    | 1       | unchanged                               | chapter 1 need not have a `\c`                       |
| 3   | `junk\r\n\c 2\n`                                | 1       | `junk\r\n\c 1\r\n`                      | if chapter 1 has a number it must be 1               |
| 4   | `\ip p1\r\n\c 1\r\n\ip p2\r\n\c 1\r\n\p p3\r\n` | 1       | `\ip p1\r\n\ip p2\r\n\c 1\r\n\p p3\r\n` | take the first `\c` _not_ in the introduction        |
| 5   | `\ip p1\r\n\c 1\r\n\p p2\r\n\c 1\n\p p3\n`      | 1       | `\ip p1\r\n\c 1\r\n\p p2\r\n\p p3\r\n`  | same rule; the first `\c` here is not intro-followed |
| 6   | `\c 2\r\n1\r\n2\r\n`                            | 2       | unchanged                               | already correct                                      |
| 7   | `1\r\n2\r\n`                                    | 2       | `\c 2\r\n1\r\n2\r\n`                    | missing marker is restored at the start              |
| 8   | `\c 3\r\n1\r\n2\r\n`                            | 2       | `\c 2\r\n1\r\n2\r\n`                    | wrong number is corrected                            |
| 9   | `\c 2\r\n1\r\n\c 2\r\n2\r\n`                    | 2       | `\c 2\r\n1\r\n2\r\n`                    | extra marker removed                                 |
| 10  | `\c \s Section Head`                            | 2       | `\c 2\r\n\s Section Head`               | numberless `\c` gets its number                      |

Rows 4 and 5 are the chapter-1 introduction rule: PT9 starts at the LAST `\c` and walks backwards,
moving its choice to each earlier `\c` that is **not** immediately followed by an `\i…` marker. The
result is the earliest `\c` that is not intro-followed; if every `\c` is intro-followed, the last
one wins.

---

## Task 1: `repairChapterMarkers` and the save-decision seam

Pure module. No React, no PAPI. This is the whole USJ half of the algorithm plus the seam that makes
the save loop testable without a component harness.

**Files:**

- Create: `extensions/src/platform-scripture-editor/src/chapter-marker-repair.util.ts`
- Test: `extensions/src/platform-scripture-editor/src/chapter-marker-repair.util.test.ts`

**Interfaces:**

- Consumes: `Usj`, `MarkerContent`, `MarkerObject` from `@eten-tech-foundation/scripture-utilities`;
  `resolveUsjToSaveToPdp` from `./debounced-pdp-save.util`.
- Produces, for Task 3:
  ```ts
  export interface ChapterMarkerRepairResult {
    usj: Usj;
    didRepair: boolean;
  }
  export function repairChapterMarkers(
    usj: Usj,
    expectedChapterNum: number,
  ): ChapterMarkerRepairResult;
  export interface ChapterSavePreparation {
    repairedUsj: Usj | undefined;
    usjToSave: Usj | undefined;
  }
  export function prepareUsjForChapterSave(
    usjFromEditor: Usj,
    usjFromPdp: Usj | undefined,
    expectedChapterNum: number,
  ): ChapterSavePreparation;
  ```

### Semantics to implement

`repairChapterMarkers(usj, expectedChapterNum)`:

1. `expected = String(expectedChapterNum)`.
2. If `expectedChapterNum < 1`, return `{ usj, didRepair: false }` (PT9 row 1).
3. Collect the indices of every top-level `content` item that is a `MarkerObject` with
   `type === 'chapter'`. Separately, recursively strip any chapter object found **nested** inside
   another object's `content` — a nested chapter node is never legal USJ and must be removed
   wherever it appears (this counts as a repair).
4. Pick the anchor:
   - `expectedChapterNum > 1`: the FIRST top-level chapter object. If there is none, synthesize
     `{ type: 'chapter', marker: 'c', number: expected }`.
   - `expectedChapterNum === 1`: if there are none, return unchanged (an intro-only chapter 1 is
     legal — PT9 row 2). Otherwise start with the LAST chapter object and walk backwards: for each
     earlier chapter object, if the item immediately following it is **not** an introduction
     paragraph, make that one the anchor. An introduction paragraph is a `MarkerObject` with
     `type === 'para'` and a `marker` that starts with `'i'`.
5. Build the new content array:
   - every non-chapter item, in order, with nested chapter objects stripped;
   - the anchor, with `number` set to `expected` (all its other fields — `sid`, `altnumber`,
     `pubnumber`, `marker` — carried through untouched), inserted at its target position:
     - `expectedChapterNum > 1`: immediately before the first item that is not a `type: 'book'`
       object (so a leading `\id`, if the document has one, stays first);
     - `expectedChapterNum === 1`: at the anchor's own original position among the surviving items.
   - every other chapter object dropped.
6. `didRepair` is true when the resulting content differs from the input content. Compare
   structurally (`JSON.stringify` of the two content arrays is acceptable and is what the tests
   assert against). The input `usj` is never mutated.

`prepareUsjForChapterSave(usjFromEditor, usjFromPdp, expectedChapterNum)`:

```
const { usj: repaired, didRepair } = repairChapterMarkers(usjFromEditor, expectedChapterNum);
return {
  repairedUsj: didRepair ? repaired : undefined,
  usjToSave: resolveUsjToSaveToPdp(repaired, usjFromPdp),
};
```

The repair runs **before** the equality compare, so a repair that lands the document back on what
the PDP already has yields `usjToSave: undefined` while still reporting `repairedUsj` — the editor
must still be corrected and the user still told. That case is a required test.

- [ ] **Step 1: Write the failing tests**

Create `extensions/src/platform-scripture-editor/src/chapter-marker-repair.util.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { Usj, MarkerContent } from '@eten-tech-foundation/scripture-utilities';
import { prepareUsjForChapterSave, repairChapterMarkers } from './chapter-marker-repair.util';

/** A USJ document from a flat list of content items. */
function usjOf(...content: MarkerContent[]): Usj {
  return { type: 'USJ', version: '3.1', content };
}

const ID_GEN: MarkerContent = { type: 'book', marker: 'id', code: 'GEN', content: ['GEN'] };
const chapter = (number: string, extras: Record<string, string> = {}): MarkerContent => ({
  type: 'chapter',
  marker: 'c',
  number,
  ...extras,
});
const para = (marker: string, text: string): MarkerContent => ({
  type: 'para',
  marker,
  content: [text],
});

describe('repairChapterMarkers — Paratext 9 FixChapterNumbers parity', () => {
  it('leaves a document alone when the chapter number is not valid (PT9 row 1)', () => {
    const input = usjOf(para('p', '1'), para('p', '2'));
    const { usj, didRepair } = repairChapterMarkers(input, -1);
    expect(didRepair).toBe(false);
    expect(usj.content).toEqual(input.content);
  });

  it('allows chapter 1 to carry no chapter marker at all (PT9 row 2)', () => {
    const input = usjOf(ID_GEN, para('ip', 'intro'));
    const { usj, didRepair } = repairChapterMarkers(input, 1);
    expect(didRepair).toBe(false);
    expect(usj.content).toEqual(input.content);
  });

  it('forces a chapter-1 marker to number 1 (PT9 row 3)', () => {
    const { usj, didRepair } = repairChapterMarkers(usjOf(para('p', 'junk'), chapter('2')), 1);
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([para('p', 'junk'), chapter('1')]);
  });

  it('keeps the first chapter-1 marker that is not followed by an introduction (PT9 row 4)', () => {
    const { usj, didRepair } = repairChapterMarkers(
      usjOf(para('ip', 'p1'), chapter('1'), para('ip', 'p2'), chapter('1'), para('p', 'p3')),
      1,
    );
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([
      para('ip', 'p1'),
      para('ip', 'p2'),
      chapter('1'),
      para('p', 'p3'),
    ]);
  });

  it('keeps an already-non-intro-followed first chapter-1 marker (PT9 row 5)', () => {
    const { usj, didRepair } = repairChapterMarkers(
      usjOf(para('ip', 'p1'), chapter('1'), para('p', 'p2'), chapter('1'), para('p', 'p3')),
      1,
    );
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([para('ip', 'p1'), chapter('1'), para('p', 'p2'), para('p', 'p3')]);
  });

  it('leaves a correct chapter 2 alone (PT9 row 6)', () => {
    const input = usjOf(chapter('2'), para('p', 'body'));
    const { usj, didRepair } = repairChapterMarkers(input, 2);
    expect(didRepair).toBe(false);
    expect(usj.content).toEqual(input.content);
  });

  it('restores a deleted chapter marker at the start (PT9 row 7)', () => {
    const { usj, didRepair } = repairChapterMarkers(usjOf(para('p', 'body')), 2);
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([chapter('2'), para('p', 'body')]);
  });

  it('corrects an edited chapter number (PT9 row 8)', () => {
    const { usj, didRepair } = repairChapterMarkers(usjOf(chapter('3'), para('p', 'body')), 2);
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([chapter('2'), para('p', 'body')]);
  });

  it('removes a chapter marker typed mid-chapter (PT9 row 9)', () => {
    const { usj, didRepair } = repairChapterMarkers(
      usjOf(chapter('2'), para('p', 'one'), chapter('2'), para('p', 'two')),
      2,
    );
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([chapter('2'), para('p', 'one'), para('p', 'two')]);
  });

  it('numbers a chapter marker that lost its number (PT9 row 10)', () => {
    const { usj, didRepair } = repairChapterMarkers(
      usjOf(chapter(''), para('s', 'Section Head')),
      2,
    );
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([chapter('2'), para('s', 'Section Head')]);
  });
});

describe('repairChapterMarkers — USJ specifics', () => {
  it('preserves altnumber, pubnumber and sid on the marker it renumbers', () => {
    const { usj } = repairChapterMarkers(
      usjOf(chapter('7', { altnumber: '6', pubnumber: 'C', sid: 'GEN 3' }), para('p', 'body')),
      3,
    );
    expect(usj.content[0]).toEqual({
      type: 'chapter',
      marker: 'c',
      number: '3',
      altnumber: '6',
      pubnumber: 'C',
      sid: 'GEN 3',
    });
  });

  it('keeps a leading id marker ahead of a restored chapter marker', () => {
    const { usj, didRepair } = repairChapterMarkers(usjOf(ID_GEN, para('p', 'body')), 2);
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([ID_GEN, chapter('2'), para('p', 'body')]);
  });

  it('removes a chapter marker nested inside a paragraph', () => {
    const { usj, didRepair } = repairChapterMarkers(
      usjOf(chapter('3'), {
        type: 'para',
        marker: 'p',
        content: ['before', chapter('9'), 'after'],
      }),
      3,
    );
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([
      chapter('3'),
      { type: 'para', marker: 'p', content: ['before', 'after'] },
    ]);
  });

  it('does not mutate its input', () => {
    const input = usjOf(chapter('9'), para('p', 'body'));
    const snapshot = JSON.stringify(input);
    repairChapterMarkers(input, 3);
    expect(JSON.stringify(input)).toBe(snapshot);
  });
});

describe('prepareUsjForChapterSave', () => {
  it('reports the repair and the repaired document to save', () => {
    const fromPdp = usjOf(chapter('3'), para('p', 'body'));
    const fromEditor = usjOf(chapter('5'), para('p', 'body edited'));
    const { repairedUsj, usjToSave } = prepareUsjForChapterSave(fromEditor, fromPdp, 3);
    expect(repairedUsj?.content).toEqual([chapter('3'), para('p', 'body edited')]);
    expect(usjToSave?.content).toEqual([chapter('3'), para('p', 'body edited')]);
  });

  it('still reports the repair when the repaired document matches the PDP (nothing to save)', () => {
    const fromPdp = usjOf(chapter('3'), para('p', 'body'));
    const fromEditor = usjOf(chapter('5'), para('p', 'body'));
    const { repairedUsj, usjToSave } = prepareUsjForChapterSave(fromEditor, fromPdp, 3);
    expect(repairedUsj?.content).toEqual([chapter('3'), para('p', 'body')]);
    expect(usjToSave).toBeUndefined();
  });

  it('reports no repair and saves normally for an ordinary edit', () => {
    const fromPdp = usjOf(chapter('3'), para('p', 'body'));
    const fromEditor = usjOf(chapter('3'), para('p', 'body edited'));
    const { repairedUsj, usjToSave } = prepareUsjForChapterSave(fromEditor, fromPdp, 3);
    expect(repairedUsj).toBeUndefined();
    expect(usjToSave?.content).toEqual([chapter('3'), para('p', 'body edited')]);
  });

  it('keeps saving a SECOND edit made after a repair — the dead-save-loop regression', () => {
    const fromPdp = usjOf(chapter('3'), para('p', 'body'));
    const firstPass = prepareUsjForChapterSave(
      usjOf(chapter('5'), para('p', 'body edited')),
      fromPdp,
      3,
    );
    const pdpAfterFirstSave = firstPass.usjToSave;
    const secondPass = prepareUsjForChapterSave(
      usjOf(chapter('3'), para('p', 'body edited twice')),
      pdpAfterFirstSave,
      3,
    );
    expect(secondPass.repairedUsj).toBeUndefined();
    expect(secondPass.usjToSave?.content).toEqual([chapter('3'), para('p', 'body edited twice')]);
  });
});
```

- [ ] **Step 2: Run the tests and verify they fail**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core/extensions
npx vitest run src/platform-scripture-editor/src/chapter-marker-repair.util.test.ts
```

Expected: FAIL — `Failed to resolve import "./chapter-marker-repair.util"`.

- [ ] **Step 3: Implement the module**

Create `extensions/src/platform-scripture-editor/src/chapter-marker-repair.util.ts` implementing the
semantics above. Write a file-level doc comment that explains **why** the repair exists (a chapter
document whose `\c` disagrees with the chapter it is cannot be written at all —
`ScrText.ValidateChapterNumber` rejects it, and the rejected document stays in the editor, so every
later save is rejected too) and that it is a USJ-level port of Paratext 9's
`UsfmEditorTextLoader.FixChapterNumbers`. Do not mention this ticket, this PR, or the bug's
discovery.

Guidance on shape, not a transcription to paste — write it as the codebase would:

- Keep the traversal in small named helpers (`isChapterObject`, `isIntroductionPara`,
  `withoutNestedChapters`, `chooseAnchorIndex`) so each piece is readable on its own.
- `withoutNestedChapters` recurses through `MarkerObject.content` and rebuilds objects only where
  something was removed, so an untouched subtree keeps its identity and the equality check stays
  cheap.
- The anchor's renumber is `{ ...anchor, number: expected }`.

- [ ] **Step 4: Run the tests and verify they pass**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core/extensions
npx vitest run src/platform-scripture-editor/src/chapter-marker-repair.util.test.ts
```

Expected: PASS, all 18 tests.

- [ ] **Step 5: Lint and typecheck**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core/extensions
NODE_ENV=development npx eslint --ext .ts src/platform-scripture-editor/src/chapter-marker-repair.util.ts src/platform-scripture-editor/src/chapter-marker-repair.util.test.ts
cd .. && npx tsc --noEmit -p extensions/tsconfig.json
```

If `extensions/tsconfig.json` does not exist, run `npm run typecheck:workspaces` from the repo root
instead. Fix any error by changing the code, not by suppressing it.

- [ ] **Step 6: Commit**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core
git add extensions/src/platform-scripture-editor/src/chapter-marker-repair.util.ts extensions/src/platform-scripture-editor/src/chapter-marker-repair.util.test.ts
git commit -m "PT-4608: Port PT9's FixChapterNumbers to USJ as a save-path repair"
```

---

## Task 2: Wire the repair into the renderer save path

**Files:**

- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx`
- Modify: `extensions/src/platform-scripture-editor/contributions/localizedStrings.json`

**Interfaces:**

- Consumes: `prepareUsjForChapterSave`, `ChapterSavePreparation` from Task 1;
  `getChapterKey(book, chapterNum, versificationStr)` already imported from
  `./platform-scripture-editor.web-view.utils`.
- Produces, for Task 3: nothing new — Task 3 edits a different function in the same file.

### What to change

**(a) Move the chapter-key ref above the save region.** `chapterKey`/`chapterKeyRef` are currently
declared around line 2921, _after_ `saveUsjToPdpIfUpdated` (line 2680). The save path needs to know
whether the chapter it is saving is the one on screen, so move this block — the comment and both
lines — to immediately **before** the `// #region PDP Save Write Path` marker:

```ts
// The chapter currently loaded, kept in a ref so the debounced save's fire (below) can compare
// the chapter active NOW against the chapter a pending save was scheduled for (see
// `performDebouncedPdpSave`'s chapter-safety guard). Assigned during render — NOT in an effect —
// so that at a chapter-switch flush (which runs in an effect cleanup, before effects) it already
// reflects the NEW chapter and the guard sees the mismatch.
const chapterKey = getChapterKey(scrRef.book, scrRef.chapterNum, scrRef.versificationStr);
const chapterKeyRef = useRef(chapterKey);
chapterKeyRef.current = chapterKey;
```

Leave the wording of that comment as it is — it is still accurate. Every existing reader of
`chapterKeyRef` keeps working: they all read it from a callback or an effect, never during render.

**(b) Repair inside `saveUsjToPdpIfUpdatedInternal`.** Replace the `usjToSave` line with the
preparation call and act on a repair:

```ts
function saveUsjToPdpIfUpdatedInternal(
  usjFromEditor = editorRef.current?.getUsj(),
): Promise<boolean> {
  if (!usjFromEditor) return Promise.resolve(false);

  // An open command surface's in-progress input is excluded by the editor itself
  // (`setTransientInput`), so what arrives here is already the document we mean to save.
  const { repairedUsj, usjToSave } = prepareUsjForChapterSave(
    correctEditorUsjVersion(usjFromEditor),
    usjFromPdp,
    savedChapterSelector.chapterNum,
  );

  if (repairedUsj) {
    // The repaired document has to reach the editor too, or the bad marker stays on screen and
    // every later save repairs and re-reports it forever. Only when this save targets the
    // chapter still on screen: a cross-chapter flush runs through the CAPTURED chapter's
    // closure, and the editor has already moved on to different content.
    if (savedChapterKey === chapterKeyRef.current) {
      usjSentToPdp.current = repairedUsj;
      setEditorUsj.current(repairedUsj);
    }
    notifyChapterMarkerCorrected();
  }

  if (usjToSave) return saveUsjToPdpInternal(usjToSave);
  return Promise.resolve(false);
}
```

`savedChapterSelector` is the `chapterUsjSelector` this closure captured, and `savedChapterKey` is
its chapter key. Add both just inside the `useMemo` callback, above
`saveUsjToPdpIfUpdatedInternal`:

```ts
  const saveUsjToPdpIfUpdated = useMemo(() => {
    // The chapter this closure writes through. Captured rather than read live: a pending trailing
    // save can fire after the user has navigated away, through the closure captured at schedule
    // time, and the repair must be computed against the chapter the content was typed in.
    const savedChapterSelector = chapterUsjSelector;
    const savedChapterKey = getChapterKey(
      savedChapterSelector.book,
      savedChapterSelector.chapterNum,
      savedChapterSelector.versificationStr,
    );
```

**(c) The notification.** Add alongside `notifyStructureProtected` (around line 1273):

```ts
/**
 * Tell the user the chapter marker in the document they are editing did not match the chapter it
 * belongs to and was put back. A stable id so the repeated saves of a long edit update one toast
 * rather than stacking.
 */
const notifyChapterMarkerCorrected = useCallback(
  () =>
    papi.notifications
      .send({
        notificationId: CHAPTER_MARKER_CORRECTED_NOTIFICATION_ID,
        message: formatReplacementString(
          localizedStrings['%webView_platformScriptureEditor_error_chapterMarkerCorrected_format%'],
          { projectName },
        ),
        severity: 'warning',
      })
      .catch((error) => {
        logger.warn(`Error notifying about a corrected chapter marker: ${getErrorMessage(error)}`);
      }),
  [localizedStrings, projectName],
);
```

Declare the id near the other module constants (around `PERMISSIONS_EXCEPTION_REGEX`, line 381):

```ts
/** Notification id for the chapter-marker correction, so repeats update one toast. */
const CHAPTER_MARKER_CORRECTED_NOTIFICATION_ID =
  'platform-scripture-editor-chapter-marker-corrected';
```

**(d) Dependency lists.** Add `chapterUsjSelector` and `notifyChapterMarkerCorrected` to the
`saveUsjToPdpIfUpdated` `useMemo` deps, which become
`[usjFromPdp, projectName, localizedStrings, projectId, notifySyncEditBlocked, chapterUsjSelector, notifyChapterMarkerCorrected]`.

**(e) Localized strings.** In `contributions/localizedStrings.json`, add to the `en` block, in the
alphabetical position its key sorts to among the other
`%webView_platformScriptureEditor_error_*%` entries:

```json
"%webView_platformScriptureEditor_error_chapterMarkerCorrected_format%": "Project {projectName}: The chapter marker in {book} {chapter} did not match the chapter, so it was corrected.",
```

Do **not** add an `es` translation — the Spanish entries that exist came from translators, and
inventing one here would ship an untranslated-but-marked-translated string.

Add the key to `EDITOR_LOCALIZED_STRINGS` (line 225) next to
`'%webView_platformScriptureEditor_error_permissions_format%'` if that key is listed there; if the
permissions key is not in the list, add the new key in the same alphabetical group as the other
literal `'%webView_platformScriptureEditor_error_*%'` entries.

> The design doc originally interpolated `{book}` and `{chapter}` into this message. Dropped: the
> only localized-book-name helper (`getLocalizedIdFromBookNumber`) is async, and the editor shows
> exactly one chapter, so the toast is unambiguous without it.

- [ ] **Step 1: Write the failing test**

Append to `extensions/src/platform-scripture-editor/src/chapter-marker-repair.util.test.ts` a pin on
the localized string's presence, which is where this task's user-visible contract is checkable
without a component harness:

```ts
describe('chapter-marker correction string', () => {
  it('is contributed in English', async () => {
    const strings = (
      await import('../contributions/localizedStrings.json', { with: { type: 'json' } })
    ).default as { localizedStrings: { en: Record<string, string> } };
    expect(
      strings.localizedStrings.en[
        '%webView_platformScriptureEditor_error_chapterMarkerCorrected_format%'
      ],
    ).toContain('{projectName}');
  });
});
```

If that import form is rejected by this repo's vitest config, look at how
`localized-strings.test.ts` in the same directory reads the contributions file and copy that
approach exactly.

- [ ] **Step 2: Run it and verify it fails**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core/extensions
npx vitest run src/platform-scripture-editor/src/chapter-marker-repair.util.test.ts
```

Expected: FAIL — the new key is undefined.

- [ ] **Step 3: Make the changes (a) through (e) above**

- [ ] **Step 4: Run the editor extension's whole suite**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core/extensions
npx vitest run src/platform-scripture-editor
```

Expected: PASS. `localized-strings.test.ts` also guards this contributions file — if it fails,
it is telling you the key list and the JSON disagree; fix the disagreement rather than the test.

- [ ] **Step 5: Lint and typecheck**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core/extensions
NODE_ENV=development npx eslint --ext .ts,.tsx src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx
cd .. && npm run typecheck:workspaces
```

- [ ] **Step 6: Commit**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core
git add extensions/src/platform-scripture-editor
git commit -m "PT-4608: Repair chapter markers before the PDP write and tell the user"
```

---

## Task 3: Surface every save rejection

Sequential after Task 2 — same file.

**Files:**

- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx`
- Modify: `extensions/src/platform-scripture-editor/contributions/localizedStrings.json`
- Create: `extensions/src/platform-scripture-editor/src/save-failure-report.util.ts`
- Test: `extensions/src/platform-scripture-editor/src/save-failure-report.util.test.ts`

**Interfaces:**

- Consumes: nothing from Tasks 1–2.
- Produces:
  ```ts
  export type SaveFailureKind = 'syncEditBlocked' | 'permissions' | 'unknown';
  export function classifySaveFailure(errorMessage: string): SaveFailureKind;
  export function shouldReportSaveFailure(
    kind: SaveFailureKind,
    lastReportedKind: SaveFailureKind | undefined,
  ): boolean;
  ```

### What to change

The failure-reporting decision is a small state machine, so it goes in its own pure module and the
web view keeps only the `useRef` that holds the state.

`classifySaveFailure` applies the two existing regexes (move
`SYNC_EDIT_BLOCKED_REGEX` and `PERMISSIONS_EXCEPTION_REGEX` into the new module and import them back
into the web view, so there is one definition) and falls back to `'unknown'`.

`shouldReportSaveFailure` returns `kind !== lastReportedKind` — so a save loop that keeps failing the
same way reports once, and a failure that CHANGES kind reports again.

In the web view:

- `notifyRecoverableSaveFailure` no longer returns early for an unrecognized message. Rename nothing;
  extend it: classify, consult `shouldReportSaveFailure` against a new
  `lastReportedSaveFailureKind` ref, and on `'unknown'` send

  ```ts
  papi.notifications.send({
    notificationId: SAVE_FAILED_NOTIFICATION_ID,
    message: formatReplacementString(
      localizedStrings['%webView_platformScriptureEditor_error_saveFailed_format%'],
      { projectName },
    ),
    severity: 'error',
  });
  ```

  Keep the existing sync-edit-blocked and permissions arms exactly as they are, just gated by
  `shouldReportSaveFailure` too. It still returns whether the rejection was one of the two
  _recoverable_ kinds, because `saveUsjToPdpInternal`'s catch uses that answer to decide whether to
  restore `usjFromPdp` — an unknown failure must NOT trigger that restore.

- On a save that succeeds (`saveUsjToPdpInternal` returning after a ran write with no throw), clear
  `lastReportedSaveFailureKind.current = undefined` and dismiss the toast:

  ```ts
  if (lastReportedSaveFailureKind.current !== undefined) {
    lastReportedSaveFailureKind.current = undefined;
    papi.notifications.dismiss(SAVE_FAILED_NOTIFICATION_ID).catch(() => {});
  }
  ```

- Module constant next to the other one:

  ```ts
  /** Notification id for a save the backend refused, so a repeating failure updates one toast. */
  const SAVE_FAILED_NOTIFICATION_ID = 'platform-scripture-editor-save-failed';
  ```

- New English string, no `es`:

  ```json
  "%webView_platformScriptureEditor_error_saveFailed_format%": "Project {projectName}: Your changes could not be saved.",
  ```

  and add the key to `EDITOR_LOCALIZED_STRINGS`.

The backend's own message stays in the existing `logger.error` call — it must not reach the toast.

- [ ] **Step 1: Write the failing tests**

Create `extensions/src/platform-scripture-editor/src/save-failure-report.util.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { classifySaveFailure, shouldReportSaveFailure } from './save-failure-report.util';

describe('classifySaveFailure', () => {
  it('recognizes a Send/Receive edit block', () => {
    expect(classifySaveFailure('write refused (SR_EDIT_BLOCKED) during sync')).toBe(
      'syncEditBlocked',
    );
  });

  it('recognizes a permissions failure', () => {
    expect(classifySaveFailure('Permissions exception for projectId abc123')).toBe('permissions');
  });

  it('classifies a chapterization rejection as unknown', () => {
    expect(
      classifySaveFailure('Text: MyProject Book: GEN\nMultiple chapter markers present.'),
    ).toBe('unknown');
  });

  it('classifies a wrong-chapter-number rejection as unknown', () => {
    expect(classifySaveFailure('Text: MyProject Book: GEN\nWrong chapter number')).toBe('unknown');
  });
});

describe('shouldReportSaveFailure', () => {
  it('reports the first failure', () => {
    expect(shouldReportSaveFailure('unknown', undefined)).toBe(true);
  });

  it('does not re-report the same failure while it keeps happening', () => {
    expect(shouldReportSaveFailure('unknown', 'unknown')).toBe(false);
  });

  it('reports again when the failure changes kind', () => {
    expect(shouldReportSaveFailure('permissions', 'unknown')).toBe(true);
  });

  it('reports again after a success cleared the memory', () => {
    expect(shouldReportSaveFailure('unknown', undefined)).toBe(true);
  });
});
```

- [ ] **Step 2: Run it and verify it fails**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core/extensions
npx vitest run src/platform-scripture-editor/src/save-failure-report.util.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Create the module and make the web-view changes described above**

- [ ] **Step 4: Run the suite**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core/extensions
npx vitest run src/platform-scripture-editor
```

Expected: PASS.

- [ ] **Step 5: Lint and typecheck**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core/extensions
NODE_ENV=development npx eslint --ext .ts,.tsx src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx src/platform-scripture-editor/src/save-failure-report.util.ts src/platform-scripture-editor/src/save-failure-report.util.test.ts
cd .. && npm run typecheck:workspaces
```

- [ ] **Step 6: Commit**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core
git add extensions/src/platform-scripture-editor
git commit -m "PT-4608: Tell the user when the backend refuses a save"
```

---

## Task 4: C# backstop

Runs in parallel with Tasks 2–3 — no overlapping files.

**Files:**

- Create: `c-sharp/Projects/ChapterMarkerCorrection.cs`
- Modify: `c-sharp/Projects/ParatextProjectDataProvider.cs` (`SetChapterUsfm` ~line 2545,
  `SetChapterUsx` ~line 2822)
- Test: `c-sharp-tests/Projects/ChapterMarkerCorrectionTests.cs`

**Interfaces:**

- Produces:
  ```csharp
  namespace Paranext.DataProvider.Projects;
  internal static class ChapterMarkerCorrection
  {
      /// Returns the corrected USFM, or the input unchanged. `wasCorrected` reports whether
      /// anything changed.
      public static string FixChapterMarkers(string usfm, int chapterNum, out bool wasCorrected);
  }
  ```

### What to implement

A direct port of `FixChapterNumbers` from
`~/source/repos/Paratext/ParatextBase/ScriptureEditor/UsfmEditorTextLoader.cs` line 355. Read that
method in full before writing anything — the chapter-1 introduction walk is easy to get subtly
wrong.

Differences from the PT9 original, both required:

- PT9 uses `ref string usfm` and returns `bool`. Here, return the string and report the change
  through `out bool wasCorrected`, so callers cannot forget to read the result.
- PT9 has `Debug.Assert(chapterNum != 0)`. Here, **return the input unchanged when
  `chapterNum <= 0`** — a book-level write legitimately carries many `\c` markers and must never be
  touched.
- PT9 produces an `errorMessage` for the multi-marker case. Drop it: the renderer owns the
  user-facing message.

`StringUtils.Unix2Dos` and `StringUtils.Crlf` are available — `PtxUtils` is already a `using` in
`ParatextProjectDataProvider.cs`; add it to the new file.

### Wiring

In **`SetChapterUsfm`**, inside the `RunWithinLock` delegate, before `scrText.PutText`:

```csharp
                    var correctedData = ChapterMarkerCorrection.FixChapterMarkers(
                        data,
                        verseRef.ChapterNum,
                        out var wasCorrected
                    );
                    if (wasCorrected)
                        Console.WriteLine(
                            $"Chapter markers in {verseRef.Book} {verseRef.ChapterNum} did not match the chapter being written; they were corrected before saving."
                        );
                    scrText.PutText(verseRef.BookNum, verseRef.ChapterNum, false, correctedData, writeLock);
```

In **`SetChapterUsx`**, apply the same correction to the result of `ConvertUsxToUsfm` — that is,
between `var usfm = ConvertUsxToUsfm(scrText, verseRef, data);` and the `currentUsfm` comparison, so
the unchanged-content short-circuit compares the corrected form (otherwise a document that is
identical apart from a bad marker would be written when it need not be, or skipped when it must be
repaired).

Do **not** touch `SetBookUsfm`, `SetBookUsfmInScope`, or `SetBookUsx`.

Add no `SendReceiveWriteLock.EnterWrite` — both methods already open a scope via
`EnterSyncWriteScope`, and nesting is unsafe.

- [ ] **Step 1: Write the failing tests**

Create `c-sharp-tests/Projects/ChapterMarkerCorrectionTests.cs`. Follow the file conventions of a
neighbouring test in `c-sharp-tests/Projects/` (namespace, `[TestFixture]`, usings). The cases are
PT9's own table:

```csharp
[TestCase("1\r\n2\r\n", "1\r\n2\r\n", -1, TestName = "No change when the chapter number is not valid")]
[TestCase("1\n2\n", "1\n2\n", -1, TestName = "No change when the chapter number is not valid, Unix line endings")]
[TestCase("1\r\n2\r\n", "1\r\n2\r\n", 1, TestName = "Chapter 1 need not have a chapter number")]
[TestCase("1\n2\n", "1\n2\n", 1, TestName = "Chapter 1 need not have a chapter number, Unix line endings")]
[TestCase("junk\r\n\\c 1\r\n", "junk\r\n\\c 2\r\n", 1, TestName = "A chapter 1 number must be 1")]
[TestCase("junk\r\n\\c 1\r\n", "junk\r\n\\c 2\n", 1, TestName = "A chapter 1 number must be 1, Unix line endings")]
[TestCase("\\ip p1\r\n\\ip p2\r\n\\c 1\r\n\\p p3\r\n", "\\ip p1\r\n\\c 1\r\n\\ip p2\r\n\\c 1\r\n\\p p3\r\n", 1, TestName = "Chapter 1 takes the first marker not in the introduction")]
[TestCase("\\ip p1\r\n\\c 1\r\n\\p p2\r\n\\p p3\r\n", "\\ip p1\r\n\\c 1\r\n\\p p2\r\n\\c 1\r\n\\p p3\r\n", 1, TestName = "Chapter 1 keeps an already non-introductory first marker")]
[TestCase("\\c 2\r\n1\r\n2\r\n", "\\c 2\r\n1\r\n2\r\n", 2, TestName = "A correct chapter is left alone")]
[TestCase("\\c 2\r\n1\r\n2\r\n", "1\r\n2\r\n", 2, TestName = "A missing chapter marker is restored")]
[TestCase("\\c 2\r\n1\r\n2\r\n", "\\c 3\r\n1\r\n2\r\n", 2, TestName = "A wrong chapter number is corrected")]
[TestCase("\\c 2\r\n1\r\n2\r\n", "\\c 2\r\n1\r\n\\c 2\r\n2\r\n", 2, TestName = "A marker typed mid-chapter is removed")]
[TestCase("\\c 2\r\n\\s Section Head", "\\c \\s Section Head", 2, TestName = "A numberless chapter marker gets its number")]
public void FixChapterMarkers_MatchesParatext9(string expected, string usfm, int chapterNum)
{
    var result = ChapterMarkerCorrection.FixChapterMarkers(usfm, chapterNum, out var wasCorrected);

    Assert.Multiple(() =>
    {
        Assert.That(result, Is.EqualTo(expected));
        Assert.That(wasCorrected, Is.EqualTo(result != usfm));
    });
}

[Test]
public void FixChapterMarkers_LeavesBookLevelUsfmAlone()
{
    const string bookUsfm = "\\id GEN\r\n\\c 1\r\n\\p one\r\n\\c 2\r\n\\p two\r\n";

    var result = ChapterMarkerCorrection.FixChapterMarkers(bookUsfm, 0, out var wasCorrected);

    Assert.Multiple(() =>
    {
        Assert.That(result, Is.EqualTo(bookUsfm));
        Assert.That(wasCorrected, Is.False);
    });
}
```

- [ ] **Step 2: Run them and verify they fail**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core/c-sharp-tests
dotnet test --filter ChapterMarkerCorrectionTests
```

Expected: compile failure — `ChapterMarkerCorrection` does not exist.

- [ ] **Step 3: Implement `ChapterMarkerCorrection` and wire it into the two setters**

- [ ] **Step 4: Run the tests**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core/c-sharp-tests
dotnet test --filter ChapterMarkerCorrectionTests
```

Expected: PASS, 14 cases.

- [ ] **Step 5: Run the write-gate coverage test and the PDP tests**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core/c-sharp-tests
dotnet test --filter SendReceiveWriteLockCoverageTests
dotnet test --filter ParatextProjectDataProvider
```

Expected: PASS. `SendReceiveWriteLockCoverageTests` scans the source for ungated writes — if it
fails, you added a write site or moved an existing one out from under its scope. Fix the code.

- [ ] **Step 6: Format and commit**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core/c-sharp
dotnet tool restore && dotnet csharpier .
cd ..
git add c-sharp/Projects/ChapterMarkerCorrection.cs c-sharp/Projects/ParatextProjectDataProvider.cs c-sharp-tests/Projects/ChapterMarkerCorrectionTests.cs
git commit -m "PT-4608: Correct chapter markers in the C# chapter-write backstop"
```

---

## Task 5: Record the architecture decision

**Files:**

- Modify: `.context/standards/Architecture-Decisions.md`

- [ ] **Step 1: Read the log's own "How to use it" section and the entry format**

Entries are inserted in **byte-order slug position** (`LC_ALL=C sort`), not appended.

- [ ] **Step 2: Write the entry**

Slug: `chapter-marker-repair-at-the-save-boundary`. Cover:

- **Context:** a chapter document whose `\c` disagrees with the chapter it is cannot be written at
  all (`ScrText.ValidateChapterNumber`), and because the rejected document stays in the editor,
  every later save of that chapter is rejected too. Paratext 9 solves this by repairing the USFM in
  the editor's save path (`UsfmEditorTextLoader.FixChapterNumbers`) rather than by preventing the
  edit.
- **Decision:** repair at the save boundary in both layers — the renderer repairs the USJ before the
  PDP write (and pushes the result back into the editor and notifies), and C# repairs the USFM in
  `SetChapterUsx`/`SetChapterUsfm` as a backstop for non-editor writers. Book-level writes are never
  touched.
- **Alternatives:** blocking the edit in the editor (rejected — Paratext 9 deliberately allows the
  typing and fixes on save, and the editor's chapter transform is written for that parity); C# only
  (rejected — `useEditorPdpSync` defers an incoming update for up to 15s while the editor is focused
  and recently edited, so a backend-only correction would be re-overwritten by the editor's own
  still-poisoned content).
- **Consequences:** the two ports must not drift, so both are pinned to the same Paratext 9 test
  table; the C# half never fires for editor traffic.

Insert it at its byte-order position. Do not append.

- [ ] **Step 3: Commit**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core
git add .context/standards/Architecture-Decisions.md
git commit -m "PT-4608: Record the chapter-marker save-boundary repair decision"
```

---

## Task 6: Full verification

Run by the coordinating session, not a subagent.

- [ ] **Step 1: Re-read every comment added or changed in the diff** and delete backward-facing ones
      per `.claude/rules/code-quality/forward-facing-comments.md`.

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core
git diff origin/main -- '*.ts' '*.tsx' '*.cs' | grep -nE '^\+.*(//|\*)' | less
```

- [ ] **Step 2: Full gate**

```bash
cd ~/source/repos/workspaces/pt-4608-chapter-marker/paranext-core
npm run typecheck && npm run lint && npm test
cd c-sharp-tests && dotnet test
```

- [ ] **Step 3: Push and open the PR** with the `pr-creator` skill.

---

## Self-review

**Spec coverage.** Spec §1 → Task 1. §2 → Task 2. §3 → Task 3. §4 → Task 4. §Testing → the test
steps of Tasks 1, 3, 4 plus the save-loop regression in Task 1's `prepareUsjForChapterSave` block.
§Decisions → Task 5. DoD items 1 and 2 are covered by Task 1's PT9 rows 8 and 9 plus the
second-edit-still-saves test; item 3 by Task 3; item 4 by all of them.

**Deviation from the spec, recorded here:** the correction message drops the spec's `{book}`
`{chapter}` interpolation (Task 2(e) explains why). The spec is amended to match.

**Type consistency.** `repairChapterMarkers` → `ChapterMarkerRepairResult { usj, didRepair }`;
`prepareUsjForChapterSave` → `ChapterSavePreparation { repairedUsj, usjToSave }`;
`classifySaveFailure` → `SaveFailureKind`; `FixChapterMarkers(string, int, out bool) : string`. Each
name is used identically everywhere it appears.
