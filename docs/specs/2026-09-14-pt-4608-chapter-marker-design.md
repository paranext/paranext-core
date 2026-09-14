# PT-4608 — Chapter-marker edits must not kill saving

Design for PT-4608, "Standard view: editing a chapter marker silently stops all saving".

## Problem

Editing the number on an existing `\c` marker in Standard view silently stops **all** subsequent
saving for that chapter. Typing a `\c` mid-chapter does the same. Nothing reaches the UI; edits made
afterwards are lost.

### Root cause — two independent defects

**1. The editor produces a chapter document the backend must reject.**

The editor deliberately lets the user retype a chapter glyph: `$chapterNodeTransform` calls
`node.setNumber(match[1])` — "PT9 GetNextWord: whole word, valid or not"
(`markerEditTier1.utils.ts`). A typed mid-chapter `\c` likewise tokenizes into a second
`ChapterNode`. Both are intentional Paratext 9 parity.

Nothing then reconciles that chapter document against the chapter it actually *is*. The save runs

```
saveUsjToPdpRaw → setChapterUSJ → setChapterUSX → C# SetChapterUsx
  → ScrText.PutText → ReplaceChapter → ValidateChapterNumber
```

and `ValidateChapterNumber` (`Paratext/ParatextData/ScrText.cs`) throws `ChapterizationException`:

| gesture (chapter 3) | USFM sent | rejection |
| ------------------- | --------- | --------- |
| edit `\c 3` → `\c 5` | `\c 5 …` | `Wrong chapter number` |
| type `\c 5` mid-chapter | `\c 3 … \c 5 …` | `Multiple chapter markers present.` |
| delete `\c 3` | `…` | `No chapter marker present.` |

Because the poisoned `\c` stays in the editor document, **every** later debounced save of that
chapter is rejected identically. Saving is dead for that chapter until the user navigates away.

**2. The rejection is swallowed.**

`saveUsjToPdpInternal`'s catch in `platform-scripture-editor.web-view.tsx` logs
`Error saving USJ to PDP: …` and then notifies only for two recognized message shapes
(`SYNC_EDIT_BLOCKED_REGEX`, `PERMISSIONS_EXCEPTION_REGEX`). A `ChapterizationException` matches
neither, so it is log-only.

### What Paratext 9 does

`UsfmEditorTextLoader.FixChapterNumbers` (`ParatextBase/ScriptureEditor/UsfmEditorTextLoader.cs`),
called immediately before `PutText`, repairs the chapter USFM: strip every `\c` and re-insert the
correct one at the chapter start (for chapter 1, at the first position that is not inside the
introduction). When more than one `\c` was present it raises a `SaveError`
("You cannot put a \c marker in the middle of a chapter"). A repair sets `needReload`, so `Save`
calls `Revert()` and the editor redisplays what was actually saved.

`UsfmEditorTextLoaderTests.FixChapterNumbers` carries a 14-row `[TestCase]` table that is the
behavioural oracle for this work.

## Decisions

Settled with the epic lead before implementation:

- **Repair in both layers.** The renderer performs the user-visible repair; C# repairs as a
  backstop for non-editor writers.
- **Generic wording** for save rejections that are not the chapter case — the backend message stays
  in the log.
- **One notification message** covering every chapter-marker correction, rather than one per case.

### Why the renderer owns the user-visible repair

`useEditorPdpSync` **defers** an incoming PDP update for up to `EDITOR_OWNERSHIP_WINDOW_MS` (15s) or
`NON_CONVERGENCE_WARN_THRESHOLD` (25) updates while the editor is focused and recently edited, and
pushes the editor's own content back up instead. A backend-only silent correction would therefore be
re-overwritten by the editor's still-poisoned content — a ping-pong. Repairing before the write
removes the divergence at its source, so the echo the editor later receives already matches.

Because the renderer repairs first, the C# backstop never fires for editor traffic. It exists so
that an extension or other writer cannot poison a chapter file the same way.

## Design

### 1. `repairChapterMarkers` — the PT9 algorithm in USJ terms

New pure module: `extensions/src/platform-scripture-editor/src/chapter-marker-repair.util.ts`

```ts
export function repairChapterMarkers(
  usj: Usj,
  expectedChapterNum: number,
): { usj: Usj; didRepair: boolean };
```

Node-for-node translation of `FixChapterNumbers`:

| PT9 (USFM) | here (USJ) |
| ---------- | ---------- |
| `Regex.Matches(usfm, @"\\c\s+\d*(\r\n)?")` | every `type: 'chapter'` item |
| chapter 1, zero `\c` → no change | same; an intro-only chapter 1 is legal |
| chapter 1, pick the first `\c` *not* followed by `\i…` | the earliest top-level chapter node whose next sibling is not a `type: 'para'` with an `i`-prefixed marker; otherwise the last one |
| chapter > 1, `\c N` goes at position 0 | the anchor moves before the first non-`book` item |
| remove every other `\c` | delete every other chapter node, nested ones included (a nested chapter node is never legal) |
| `errorMessage` when count > 1 | `didRepair` — one message covers every case |

`didRepair` is true when the returned document differs from the input: the anchor was renumbered,
moved, inserted, or an extra chapter node was removed. The input is never mutated.

Two USJ-specific choices, both preserving parity rather than breaking it:

- **The anchor node is kept and renumbered**, not deleted and recreated, so `altnumber` and
  `pubnumber` survive. In PT9 those are separate `\ca`/`\cp` tokens that the `\\c\s+\d*` regex never
  matched, so keeping them is what parity requires.
- **`sid` is left untouched.** The editor carries the loaded chapter's sid through `$settledChapter`
  (`freshChapter.sid = chapter.getSid()`) while only `number` is retyped, so the sid already names
  the correct chapter. A newly inserted chapter node (the deleted-`\c` case) carries no sid, which
  matches what the USX→USFM import does with it anyway — `ConvertUsxToUsfm` drops sid/eid/vid.

### 2. Save-path wiring

In `platform-scripture-editor.web-view.tsx`, inside `saveUsjToPdpIfUpdatedInternal`, after
`correctEditorUsjVersion` and before `resolveUsjToSaveToPdp`. Placing it there covers every caller:
the debounced fire, the chapter-switch flush, blur, and unmount.

On `didRepair`:

1. Push the repaired USJ into the editor via `setEditorUsj` — the analogue of PT9's `Revert()` — and
   update `usjSentToPdp` bookkeeping.
2. Send the correction notification.
3. Continue the save with the repaired document.

Pushing back is not optional. Without it the editor keeps the bad `\c`, so every subsequent save
re-repairs and re-notifies, and the divergence detector in `useEditorPdpSync` fires forever.

The expected chapter number is `chapterUsjSelector.chapterNum`, the same value that identifies the
subscription delivering the document — so the repair can never be computed against a different
chapter than the one being written.

New localized string:

```
%webView_platformScriptureEditor_error_chapterMarkerCorrected_format%
  "Project {projectName}: The chapter marker was incorrect and was automatically corrected."
```

Severity `warning`, sent with a stable `notificationId` so repeats update one toast.

The message names no reference. The only localized-book-name helper
(`getLocalizedIdFromBookNumber`) is async, and the editor shows exactly one chapter, so the toast is
unambiguous without it.

### 3. Generic rejection surfacing

`notifyRecoverableSaveFailure` gains a fallback arm: a rejection matching neither known regex sends

```
%webView_platformScriptureEditor_error_saveFailed_format%
  "Project {projectName}: Your changes could not be saved."
```

Severity `error`, stable `notificationId`, backend text log-only.

To keep the 700 ms retry loop from spamming, the notification is sent on the **transition into**
the failing state rather than on every rejection, and is `notifications.dismiss`ed on the next
successful save. The zombie path (`outcome.released` with an `error`) reports through the same
helper.

### 4. C# backstop

New `c-sharp/Projects/ChapterMarkerCorrection.cs` — a direct USFM-level port of
`FixChapterNumbers`, called from `SetChapterUsx` and `SetChapterUsfm` only.

It must **never** run for `SetBookUsfm`/`SetBookUsx`, mirroring PT9's `Debug.Assert(chapterNum != 0)`
— book-level writes legitimately carry many `\c` markers.

It repairs silently and logs a warning; the renderer owns the user-facing message. It runs inside the
existing `EnterSyncWriteScope` and adds no new write site, so the Send/Receive write gate is
untouched.

It does not weaken PT9's deliberate `InvalidOperationException` tripwire ("Attempt to overwrite
chapter X with chapter Y"), which lives in a different branch of `ValidateChapterNumber` and stays
reachable: the repair normalizes the *incoming* chapter USFM, while that check compares the incoming
chapter number against the *existing* chapter on disk.

## Testing

Red→green throughout.

- `chapter-marker-repair.util.test.ts` — PT9's 14-row `[TestCase]` table transcribed into USJ, plus
  attribute preservation (`altnumber`/`pubnumber`/`sid`), a nested chapter node, and the deleted-`\c`
  restoration.
- Web-view save-loop regression — the pin the ticket asks for, at the save-loop level rather than the
  settle level: an edited chapter number reaches the PDP setter repaired, the notification is sent,
  the editor is updated, **and a second edit afterwards still saves**.
- Save-failure surfacing — notifies on the transition in, does not re-notify while still failing,
  dismisses and re-arms on success, and covers the zombie path.
- `ChapterMarkerCorrectionTests.cs` — PT9's table verbatim, USFM in / USFM out.

Both repairs are pinned to the same PT9 table so the two layers cannot drift silently.

## Scope

Core only. No `scripture-editors` change and therefore no `platform-yalc` move.

Out of scope: inserting a *new* chapter (PT-4614, deliberately sequenced behind this issue), the
`\id`-line backslash menu (PT-4613), and the paste path (PT-4201, which already strips `\c`/`\id`
from pasted lines on its own branch).

## Definition of done

- Editing a chapter number persists, and continues to persist for subsequent edits.
- A typed mid-chapter `\c` no longer silently kills saving.
- Any save rejection is surfaced to the user rather than logged only.
- Regression tests for both the edited and typed paths; suites green.
