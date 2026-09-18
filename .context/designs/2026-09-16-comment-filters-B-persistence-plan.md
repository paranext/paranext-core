# Comment Filters B — Per-Project Filter Persistence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Revised 2026-09-18.** The first implementation of this plan stored the selection in
> `UserProjectSettings` (`{projectDirectory}/Extensions/UserSettings-{userId}.xml`) behind a new C#
> project-data type. That shipped and worked, but the store was wrong: `Extensions/` is not in PT9's
> `.hgignore`, so it travels in Send/Receive, and it deliberately follows a user between machines —
> neither of which a view preference should do. This revision moves the selection to `localStorage`
> and removes the C# path. **The tasks below describe the work from the state that first
> implementation left behind, not from scratch.**

**Goal:** Remember each user's comment-filter selection per project on the machine they chose it on, so reopening a project restores the filters they left it on.

**Architecture:** A small `localStorage`-backed module in the extension, mirroring `comment-draft-store.ts`. The web view reads it synchronously on mount and writes on every change. No backend involvement at all.

**Tech Stack:** TypeScript, React 19, Vitest.

**Design:** [`2026-09-16-comment-filters-revamp-design.md`](./2026-09-16-comment-filters-revamp-design.md)

**Depends on:** plan A. The stored shape is `{ preset, scopeFilter }`, which only exists after A.

**Sequencing:** run this after plan C. Plan C's `comment-draft-store.ts` is the module this one mirrors, and plan C's task 5 rebuilds `platform-bible-react`'s `dist/` — doing this work first would mean rebuilding twice.

---

## Why `localStorage`, and why not the store this plan originally used

A filter selection is a per-machine view preference. It is not project data, not shared, and not
something another computer should inherit.

`UserProjectSettings` — the original choice — is per-user *and* per-project, which made it look
right. It is wrong for two reasons:

- **It travels in Send/Receive.** `Extensions/` is not in the ignore list PT9 writes
  (`ParatextData/Repository/VersionedText.cs`), which covers only `local/**`, `PA7/**` and
  `InDesign/**`. The file transmits. It is per-user, so nobody else *reads* it — but it still
  crosses the wire, and a view preference has no reason to.
- **It reaches other machines.** That is the property `UserProjectSettings` exists to provide, and
  it is not wanted here: a filter chosen on a desktop should not follow the user to a laptop.

`localStorage` is per-machine and never syncs. It is the same store `comment-draft-store.ts` uses,
for a related reason — see that module's own doc, which explains why drafts must never reach
`Extensions/`.

**Versioning is deliberately dropped.** The C# implementation carried a `dataVersion` and validated
downgrades, because a project-data type shared across builds needs that. A `localStorage` value does
not: an unrecognized `preset` or `scopeFilter` already resolves to its default through
`isCommentPreset`/`isScopeFilter` (plan A's guards), which covers every forward- and
backward-compatibility case a version field would have. Adding one back would be ceremony with no
reader.

---

## What the first implementation left behind

These landed and must be removed. Verify they have no other consumer before deleting rather than
assuming it.

| Commit | What it added |
| --- | --- |
| `2bd5b39eb3f`, `91aadfa8a22`, `2b3294e0e13` | `c-sharp/Projects/CommentFilterSelection.cs`, its tests, `ProjectDataType.USER_COMMENT_FILTERS` |
| `b9e9a23659b`, `4e8e623b075`, `cfe23b3cdc1`, `778a1d74b4e` | `GetUserCommentFilters`/`SetUserCommentFilters`/`ResetUserCommentFilters`, `DeserializeCommentFilterSelection`, dispatch entries, `c-sharp-tests/Projects/UserCommentFiltersSettingTests.cs` |
| `b08c3368f83` | The `UserCommentFilters` data type and its four methods in `legacy-comment-manager.d.ts`, plus the `CommentFilterSelection` TS type |

**Two commits in that range are NOT part of this and must survive:**

- `0cd52bcd6c3` — a plan A fix making the component test read the shipped English strings.
- `b362464be3e` — corrects a comment in `UserTextConnectionSettingTests.cs` that named the wrong
  validator. Independent of where filters are stored, and still true.

The web view work (`50fd859dee5`, `f841f81b3f1`, `93ca87b7d52`, `55c55450754`) is **rewired, not
reverted.** Its behaviour is correct and hard-won; only the read/write mechanism changes. See task 2.

---

## Conventions for every task

```bash
cd extensions/src/legacy-comment-manager && npx vitest run
cd extensions/src/legacy-comment-manager && npx tsc -p ./tsconfig.json --noEmit
cd c-sharp-tests && dotnet test
cd c-sharp && dotnet csharpier --check .
```

- The extension's tsconfig **excludes** `**/*.test.ts(x)`, so its `tsc` never checks test files. Do
  not report a clean run as though it covered them.
- A test needing `localStorage` must declare `// @vitest-environment jsdom` on its first line — the
  extension has no vitest config.
- `dotnet csharpier --check .` — `--check`, not a bare `check` subcommand, which CSharpier 0.29.2
  reads as a path.
- **Forward-facing comments**; no change narration. Nothing in the new code should mention the store
  it replaced.
- Pre-commit hook runs gitleaks and prettier. Never bypass it.
- Do not push.

---

## File Structure

| File | Responsibility | Tasks |
| --- | --- | --- |
| `extensions/src/legacy-comment-manager/src/comment-filter-store.ts` | **New** — load/save, localStorage-wrapped | 1 |
| `.../src/comment-filter-store.test.ts` | **New** — store tests | 1 |
| `.../src/comment-list.web-view.tsx` | Read on mount, write on change | 2 |
| `.../src/comment-list.web-view.burst.test.tsx` | Rewire the persistence tests | 2 |
| `.../src/types/legacy-comment-manager.d.ts` | Remove the data type and its methods | 3 |
| `c-sharp/Projects/CommentFilterSelection.cs` | **Delete** | 3 |
| `c-sharp/Projects/ProjectDataType.cs` | Remove `USER_COMMENT_FILTERS` | 3 |
| `c-sharp/Projects/ParatextProjectDataProvider.cs` | Remove the three methods, the deserializer, the dispatch entries, the schema block | 3 |
| `c-sharp-tests/Projects/UserCommentFiltersSettingTests.cs` | **Delete** | 3 |
| `c-sharp-tests/Projects/CommentFilterSelectionTests.cs` | **Delete** | 3 |

---

## Task 1: The filter store

Mirror `comment-draft-store.ts` — same module shape, same try/catch discipline, same key prefix
convention. Read it first.

**Files:**
- Create: `extensions/src/legacy-comment-manager/src/comment-filter-store.ts`
- Create: `extensions/src/legacy-comment-manager/src/comment-filter-store.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadFilterSelection, saveFilterSelection } from './comment-filter-store';
import { DEFAULT_COMMENT_FILTERS, DEFAULT_SCOPE_FILTER } from './comment-list-filters.model';

const PROJECT = 'proj-1';
const DEFAULTS = { preset: DEFAULT_COMMENT_FILTERS.preset, scopeFilter: DEFAULT_SCOPE_FILTER };

beforeEach(() => localStorage.clear());

describe('comment filter store', () => {
  it('round-trips a selection for a project', () => {
    saveFilterSelection(PROJECT, { preset: 'unread', scopeFilter: 'current-book' });
    expect(loadFilterSelection(PROJECT)).toEqual({ preset: 'unread', scopeFilter: 'current-book' });
  });

  it('keeps projects independent', () => {
    saveFilterSelection(PROJECT, { preset: 'unread', scopeFilter: 'current-book' });
    saveFilterSelection('proj-2', { preset: 'resolved', scopeFilter: 'current-verse' });
    expect(loadFilterSelection(PROJECT)).toEqual({ preset: 'unread', scopeFilter: 'current-book' });
  });

  it('returns the default view when nothing has been saved', () => {
    expect(loadFilterSelection(PROJECT)).toEqual(DEFAULTS);
  });

  it('returns the default view rather than throwing when storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });
    expect(loadFilterSelection(PROJECT)).toEqual(DEFAULTS);
  });

  it('returns the default view rather than throwing on malformed stored data', () => {
    localStorage.setItem(`legacyCommentManager.filters.${PROJECT}`, 'not json');
    expect(loadFilterSelection(PROJECT)).toEqual(DEFAULTS);
  });

  it('resolves a stored value this build does not recognize to the default view', () => {
    // A selection written by a newer build, or hand-edited. The panel must open on something
    // valid rather than carrying an unknown preset into the query.
    localStorage.setItem(
      `legacyCommentManager.filters.${PROJECT}`,
      JSON.stringify({ preset: 'from-a-newer-build', scopeFilter: 'also-unknown' }),
    );
    expect(loadFilterSelection(PROJECT)).toEqual(DEFAULTS);
  });

  it('keeps a recognized half of a partly-unrecognized selection', () => {
    localStorage.setItem(
      `legacyCommentManager.filters.${PROJECT}`,
      JSON.stringify({ preset: 'unread', scopeFilter: 'nonsense' }),
    );
    expect(loadFilterSelection(PROJECT)).toEqual({
      preset: 'unread',
      scopeFilter: DEFAULT_SCOPE_FILTER,
    });
  });
});
```

- [ ] **Step 2: Run, watch it fail, implement**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run src/comment-filter-store.test.ts
```

`comment-filter-store.ts` exports `loadFilterSelection(projectId)` and
`saveFilterSelection(projectId, selection)` over a `{ preset: CommentPreset; scopeFilter: ScopeFilter }`
declared locally in the extension.

Key: `legacyCommentManager.filters.<projectId>`.

**`loadFilterSelection` narrows at the boundary** with `isCommentPreset`/`isScopeFilter` from
`comment-list-filters.model`, falling back per field to `DEFAULT_COMMENT_FILTERS.preset` /
`DEFAULT_SCOPE_FILTER`. This is not optional: `buildCommentThreadSelector` ends in a
`const unhandled: never` guard that **throws** on an unrecognized preset, and
`scopeFieldsUsed[scopeFilter]` throws on an unrecognized scope. Narrowing here means the web view
never has to.

Unlike the draft store, this one always returns a usable value — there is no "no selection" state,
only the default view.

- [ ] **Step 3: Prove each test bites**

Break the behaviour each targets, confirm the failure, report it, revert. Two matter most: the
unrecognized-value test (remove a guard — the partly-unrecognized case proves the two guards are
independent rather than all-or-nothing), and the storage-unavailable test (remove the try/catch — it
must throw rather than being caught incidentally).

- [ ] **Step 4: Commit**

```bash
git add extensions/src/legacy-comment-manager/src/comment-filter-store.ts \
        extensions/src/legacy-comment-manager/src/comment-filter-store.test.ts
git commit -m "feat(comments): persist the filter selection per project on this machine

A selection is a view preference for one person at one computer, so it
stays there. A stored value the build does not recognize opens on the
default view.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Rewire the web view

The web view's persistence behaviour is already correct and tested. **Only the mechanism changes.**
Preserve every behaviour below; the tests asserting them should survive with their setup adapted,
not be rewritten.

**Files:**
- Modify: `extensions/src/legacy-comment-manager/src/comment-list.web-view.tsx`
- Modify: `extensions/src/legacy-comment-manager/src/comment-list.web-view.burst.test.tsx`

### What must keep working

- The stored selection is restored on mount and written on every change, **both axes together**.
- Two projects hold independent selections.
- A `setFilters` message overrides for this open and is **not** written back — a one-shot link must
  not become the user's new default.
- A mount-time `initialFilters`/`initialScopeFilter` override behaves the same way.
- An unrecognized stored value opens on the default view rather than throwing.

### What gets simpler — and this is the point

The PDP read was asynchronous, and a large amount of machinery exists only because of that:

- `isViewSettled` as a render gate, so the panel never mounted showing defaults;
- the fix making the toolbar wait rather than flash default-then-stored;
- the fix keeping a `setFilters` message from being clobbered by a late-arriving read;
- `LOADING_USER_COMMENT_FILTERS` and the `PlatformError` fallback.

**`localStorage` reads are synchronous.** The selection is available at first render, so there is no
pending state, no flash, and no race for a message to lose. Remove that machinery rather than
porting it — but deliberately: check each piece against the behaviours above before deleting it, and
say in your report what you removed and why each was safe.

`isViewSettled` may still be needed to express "a deliberate view was established, don't overwrite
it" — or it may collapse entirely now that nothing arrives late. Work out which, and justify it.

- [ ] **Step 1: Rewire**

Seed `useState` from `loadFilterSelection(projectId)` and call `saveFilterSelection` on change. Drop
the `useProjectData(...).UserCommentFilters` read, its setter and its loading flag.

Narrowing now lives in the store, so the web view does not repeat it — confirm by grep that no
narrowing remains there, and that nothing reaches `buildCommentThreadSelector` unnarrowed.

- [ ] **Step 2: Adapt the tests**

The existing persistence tests should survive. Replace the `useProjectData` mock plumbing with
`localStorage` seeding. Keep the positive-control shape on every "did not persist" assertion.

Add one test the old store could not express: a selection written for one project does not leak into
another's key, asserted against `localStorage` directly rather than through the component.

- [ ] **Step 3: Verify and commit**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run && npx tsc -p ./tsconfig.json --noEmit
```

```bash
git add extensions/src/legacy-comment-manager/src/comment-list.web-view.tsx \
        extensions/src/legacy-comment-manager/src/comment-list.web-view.burst.test.tsx
git commit -m "feat(comments): read the filter selection from this machine's storage

The selection is available at first render, so the panel opens on it
directly rather than settling onto it.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Remove the backend path

Only after task 2 lands, so nothing references it.

**Files:** as listed in File Structure.

- [ ] **Step 1: Confirm nothing else consumes it**

Before deleting anything, grep the whole repo — both languages — for `UserCommentFilters`,
`CommentFilterSelection`, `getUserCommentFilters`, `setUserCommentFilters`,
`resetUserCommentFilters`, `USER_COMMENT_FILTERS` and the `"CommentFilters"` settings key. Per
`.claude/rules/grep-safety-net.md`, use patterns broader than the exact spellings and state one case
yours would miss. Account for every hit as either "being deleted" or "unrelated".

Note the C# `CommentFilterSelection` record and the extension's new local type share a name. They are
different things; do not let the sweep conflate them.

- [ ] **Step 2: Delete**

Remove the two C# files, the `ProjectDataType` constant, the three provider methods, the
deserializer, the dispatch entries, and the `OpenCommentListWebViewOptions` schema properties that
described them. Remove the data type and its four methods from `legacy-comment-manager.d.ts`.

**Leave `b362464be3e`'s comment fix in `UserTextConnectionSettingTests.cs` alone** — it is about a
different setting's version validation and is still correct.

- [ ] **Step 3: Verify**

```bash
cd c-sharp-tests && dotnet test
cd c-sharp && dotnet csharpier --check .
cd extensions/src/legacy-comment-manager && npx vitest run && npx tsc -p ./tsconfig.json --noEmit
```

The C# suite should drop by exactly the tests you deleted — state the expected count and confirm it.
Nothing else may change.

- [ ] **Step 4: Commit**

```bash
git commit -m "refactor(comments): drop the project-data path for filter selections

The selection lives on the machine that chose it, so no project data type
carries it.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Deliberately not in this plan

- **Migrating existing stored selections.** The project-data path shipped only on this branch and has
  never been released, so no user has a value to migrate.
- **Drafts** — plan C, already on `localStorage` for a related but distinct reason.
- **Sharing a selection between users or machines.** Explicitly not wanted; that is what moving off
  `UserProjectSettings` buys.
