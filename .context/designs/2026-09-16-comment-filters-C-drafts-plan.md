# Comment Filters C — Durable Drafts and the "Unsaved notes" Preset Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Frozen record** — written 2026-09-16 against `0f93dc3c34e`. File:line citations reflect the tree
> at that commit. Follow the current files and the named symbols, not these line numbers.

**Goal:** Keep a comment draft the user has typed but not committed, across filter changes, panel closes and app restarts — and make the "Unsaved notes" preset show exactly those threads.

**Architecture:** `CommentThread` and `CommentItem` become *controlled* for their draft state instead of owning it, so a draft outlives the component that rendered it. The web view owns the map and persists it to `localStorage` keyed by project. "Unsaved notes" sends a scope-only query and filters the result client-side, because the data provider has never heard of a draft.

**Tech Stack:** TypeScript, React 19, Lexical, Vitest, `localStorage`.

**Design:** [`2026-09-16-comment-filters-revamp-design.md`](./2026-09-16-comment-filters-revamp-design.md)

**Depends on:** plan A (the `unsaved` preset exists but renders disabled). Independent of plan B.

---

## What a draft is

Verified against Paratext 9, not assumed: a thread carrying content the user typed but did not
commit — an unsent reply in the compose box, or an unsaved edit to an existing comment. **Not**
"saved locally but not yet sent/received."

PT9 stores it as `Dictionary<string, ThreadEditState>` on the comment-list form — draft html plus a
pending assignee — cleared on save and on cancel (`Paratext/ProjectComments/CommentListForm.cs`).

**PT9's rule that drafts stay visible under every filter is deliberately not taken.** In PT9 a
drafted thread survives any filter; here, a filter that excludes it excludes it, and only "Unsaved
notes" shows drafts. PT9 can do it because it filters in memory; PT10 filters in the query, and
`LegacyCommentThreadSelector.threadId` is a single string with no set form, so a thread the query
excluded cannot be added back. Pin this with a test so it is not "improved" back later.

---

## Conventions for every task

```bash
cd lib/platform-bible-react && npx vitest run --project=unit
cd extensions/src/legacy-comment-manager && npx vitest run
```

- **`platform-bible-react` ships through its committed `dist/`.** Neither the root build nor any
  test suite rebuilds it. This plan changes pbr source, so it **must** end with `npm run build:pbr`
  and a committed `dist/` — otherwise every test passes against `src/` while the app keeps running
  the old bundle. Task 5 does this; do not skip it.
- pbr must not know about `localStorage`, projects, or storage of any kind. It is a design-system
  package; it receives a draft and reports changes. Storage belongs to the extension.
- **Forward-facing comments**; no change narration.
- Pre-commit hook runs gitleaks and prettier. Never bypass it.
- Do not push.

---

## File Structure

| File | Responsibility | Tasks |
| --- | --- | --- |
| `lib/platform-bible-react/src/components/advanced/comment-list/comment-list.types.ts` | `CommentDraft` type, new props | 1 |
| `.../comment-list/comment-thread.component.tsx` | Controlled compose draft | 1 |
| `.../comment-list/comment-item.component.tsx` | Controlled edit draft | 1 |
| `.../comment-list/comment-list.component.tsx` | Thread the props through | 1 |
| `extensions/src/legacy-comment-manager/src/comment-draft-store.ts` | **New** — load/save/prune, localStorage-wrapped | 2 |
| `.../src/comment-draft-store.test.ts` | **New** — store tests | 2 |
| `.../src/comment-list.web-view.tsx` | Own the map, persist it, apply the unsaved filter | 3, 4 |
| `.../src/comment-list.component.tsx` | Enable the `unsaved` option | 4 |

---

## Task 1: Make draft state controlled in `platform-bible-react`

Today `CommentThread` owns `pendingCommentEditorState` and `pendingCommentAssignedUser` as
`useState`, and `CommentItem` owns its edit-mode `editorState`. All three die on unmount, which a
filter change causes routinely.

**Files:**
- Modify: `lib/platform-bible-react/src/components/advanced/comment-list/comment-list.types.ts`
- Modify: `.../comment-thread.component.tsx`, `.../comment-item.component.tsx`, `.../comment-list.component.tsx`
- Modify: `.../comment-thread.component.test.tsx`

- [ ] **Step 1: Write the failing test**

Add to `comment-thread.component.test.tsx`:

```tsx
it('renders the draft it is given rather than its own state', () => {
  // The draft outlives this component, so the component must not be its owner: a thread unmounted
  // by a filter change and remounted must come back showing the same draft.
  const draft = { editorState: undefined, assignedUser: 'Ana' };
  renderThread({ isSelected: true, draft });

  expect(screen.getByText(/Ana/)).toBeInTheDocument();
});

it('reports draft changes upward instead of storing them', async () => {
  const onDraftChange = vi.fn();
  renderThread({ isSelected: true, onDraftChange });

  await userEvent.click(screen.getByRole('button', { name: 'Assign user' }));
  await userEvent.click(await screen.findByText('Ana'));

  expect(onDraftChange).toHaveBeenCalledWith(
    defaultProps.threadId,
    expect.objectContaining({ assignedUser: 'Ana' }),
  );
});
```

Adapt the assignee names to the file's existing `assignableUsers` fixture rather than inventing one.

- [ ] **Step 2: Run and watch it fail**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit src/components/advanced/comment-list/comment-thread.component.test.tsx
```

- [ ] **Step 3: Add the draft type and props**

In `comment-list.types.ts`:

```ts
/**
 * A comment the user has typed but not committed — an unsent reply, or an unsaved edit to an
 * existing comment. Held by the consumer rather than by the thread component, so it survives the
 * component unmounting (a filter change does that routinely).
 */
export type CommentDraft = {
  /** Serialized editor contents, or `undefined` when only an assignee has been chosen. */
  editorState?: SerializedEditorState;
  /** Pending assignee, or `undefined` when none has been chosen. */
  assignedUser?: string;
};
```

Add to `CommentListProps`, and thread them to `CommentThread`:

```ts
  /** Uncommitted drafts by thread id. A thread with no entry has no draft. */
  drafts?: Readonly<Record<string, CommentDraft>>;
  /**
   * Called when a thread's draft changes. `draft` is `undefined` when the draft becomes empty, so
   * a consumer can drop the entry rather than keep an empty one that would read as a draft.
   */
  onDraftChange?: (threadId: string, draft: CommentDraft | undefined) => void;
```

- [ ] **Step 4: Make the components controlled**

In `comment-thread.component.tsx`, replace the two `useState` declarations with values derived from
the `draft` prop, and route every setter through `onDraftChange`. Submitting clears the draft by
calling `onDraftChange(threadId, undefined)`.

Keep the existing behaviour that a thread with draft content shows its editor while deselected — it
is what makes a draft discoverable, and it now reads from the prop.

Do the same for `CommentItem`'s edit-mode `editorState`. Cancelling an edit clears that draft.

**If a consumer passes no `drafts`/`onDraftChange`** — as Storybook and several tests do — the
components must keep working. Fall back to internal state in that case, so the props are additive
rather than required, and say so in the TSDoc.

- [ ] **Step 5: Run, prove it bites, commit**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit src/components/advanced/comment-list
```

Then make `onDraftChange` never fire for the assignee and confirm the second test FAILS; revert.
Report the actual failing output.

```bash
git add lib/platform-bible-react/src/components/advanced/comment-list/
git commit -m "feat(comments): let a consumer own comment draft state

A draft typed into a thread died with the component, which a filter change
unmounts routinely. CommentThread and CommentItem now render the draft
they are given and report changes upward, falling back to internal state
when no consumer owns it.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: The draft store

**Files:**
- Create: `extensions/src/legacy-comment-manager/src/comment-draft-store.ts`
- Create: `extensions/src/legacy-comment-manager/src/comment-draft-store.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadDrafts, pruneDrafts, saveDrafts } from './comment-draft-store';

const PROJECT = 'proj-1';

beforeEach(() => localStorage.clear());

describe('comment draft store', () => {
  it('round-trips drafts for a project', () => {
    saveDrafts(PROJECT, { 't1': { assignedUser: 'Ana' } });
    expect(loadDrafts(PROJECT)).toEqual({ 't1': { assignedUser: 'Ana' } });
  });

  it('keeps projects independent', () => {
    saveDrafts(PROJECT, { 't1': { assignedUser: 'Ana' } });
    saveDrafts('proj-2', { 't9': { assignedUser: 'Ian' } });
    expect(loadDrafts(PROJECT)).toEqual({ 't1': { assignedUser: 'Ana' } });
  });

  it('returns no drafts rather than throwing when storage is unavailable', () => {
    // localStorage throws outright in a sandboxed context; the panel must still render.
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });
    expect(loadDrafts(PROJECT)).toEqual({});
  });

  it('returns no drafts rather than throwing on malformed stored data', () => {
    localStorage.setItem(`legacyCommentManager.drafts.${PROJECT}`, 'not json');
    expect(loadDrafts(PROJECT)).toEqual({});
  });

  it('drops drafts whose thread no longer exists', () => {
    // Otherwise a deleted thread leaves an entry that makes "Unsaved notes" claim a draft the user
    // can never reach.
    const pruned = pruneDrafts({ 't1': { assignedUser: 'Ana' }, 'gone': {} }, ['t1']);
    expect(pruned).toEqual({ 't1': { assignedUser: 'Ana' } });
  });
});
```

- [ ] **Step 2: Run and watch it fail, then implement**

Create `comment-draft-store.ts` with `loadDrafts(projectId)`, `saveDrafts(projectId, drafts)` and
`pruneDrafts(drafts, existingThreadIds)`. Every `localStorage` access wrapped in try/catch — it
throws outright in sandboxed contexts, which is why `src/renderer/services/local-storage-flag.util.ts`
wraps all of its. Key: `legacyCommentManager.drafts.<projectId>`.

Document at the top of the file why this is `localStorage` rather than a project setting: drafts are
half-written comments and must never leave the machine, and `Extensions/` — where per-user project
settings live — is not in PT9's `.hgignore` and therefore travels in Send/Receive.

- [ ] **Step 3: Run and commit**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run src/comment-draft-store.test.ts
```

```bash
git add extensions/src/legacy-comment-manager/src/comment-draft-store.ts \
        extensions/src/legacy-comment-manager/src/comment-draft-store.test.ts
git commit -m "feat(comments): persist comment drafts per project in local storage

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: The web view owns the drafts

**Files:**
- Modify: `extensions/src/legacy-comment-manager/src/comment-list.web-view.tsx`

- [ ] **Step 1: Write the failing test**

Add to `comment-list.web-view.burst.test.tsx`:

```tsx
it('keeps a draft when a filter change unmounts its thread', async () => {
  // The whole point of hoisting the state: switching filters must not discard typed work.
  renderWebView({ threads: [threadA, threadB] });

  await typeDraftInto(threadA.id, 'half a thought');
  await selectPreset('Resolved');           // threadA no longer matches; it unmounts
  await selectPreset('All notes');          // and comes back

  expect(await draftTextIn(threadA.id)).toBe('half a thought');
});
```

Write `typeDraftInto`, `selectPreset` and `draftTextIn` as local helpers over the file's existing
render harness rather than new infrastructure.

- [ ] **Step 2: Wire it up**

- `useState<Record<string, CommentDraft>>` seeded from `loadDrafts(projectId)` on mount.
- `onDraftChange` updates the map and calls `saveDrafts`; an `undefined` draft deletes the entry.
- Prune against the current thread ids whenever threads load, so a deleted thread's draft goes.
- Pass `drafts` and `onDraftChange` down through `CommentListPanel` to `CommentList`.

- [ ] **Step 3: Run and commit**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run && npx tsc -p ./tsconfig.json --noEmit
```

```bash
git add extensions/src/legacy-comment-manager/src/comment-list.web-view.tsx \
        extensions/src/legacy-comment-manager/src/comment-list.web-view.burst.test.tsx
git commit -m "feat(comments): keep comment drafts across filter changes and restarts

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Enable the "Unsaved notes" preset

**Files:**
- Modify: `extensions/src/legacy-comment-manager/src/comment-list.web-view.tsx`
- Modify: `extensions/src/legacy-comment-manager/src/comment-list.component.tsx`

- [ ] **Step 1: Write the failing tests**

```tsx
it('shows only drafted threads under the unsaved preset', async () => {
  renderWebView({ threads: [threadA, threadB] });
  await typeDraftInto(threadA.id, 'draft');
  await selectPreset('Unsaved notes');

  expect(screen.getByText(threadA.verseRef)).toBeInTheDocument();
  expect(screen.queryByText(threadB.verseRef)).not.toBeInTheDocument();
});

it('counts an unsaved edit to an existing comment, not just an unsent reply', async () => {
  // Both are "written but not committed" under the definition this preset implements. Testing only
  // the compose box would leave the edit path free to regress unnoticed, since it runs through a
  // different component.
  renderWebView({ threads: [threadA] });
  await startEditingFirstCommentOf(threadA.id);
  await typeIntoOpenEditor('changed my mind');
  await selectPreset('Unsaved notes');

  expect(screen.getByText(threadA.verseRef)).toBeInTheDocument();
});

it('still excludes a drafted thread the scope excludes', async () => {
  // Deliberately unlike PT9, where a drafted thread survives every filter. PT10 filters in the
  // query, so a thread the scope excluded never arrives and cannot be added back. Pinned so the
  // PT9 behaviour is not reintroduced by accident.
  renderWebView({ threads: [threadInGenesis] });
  await typeDraftInto(threadInGenesis.id, 'draft');
  await selectScope('Current verse');       // resolves somewhere threadInGenesis is not

  expect(screen.queryByText(threadInGenesis.verseRef)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Implement**

In the web view, when `filters.preset === 'unsaved'`, filter the returned threads to those present in
the draft map. The selector already contributes no preset clause for `unsaved` (plan A), so the query
is scope-only and no change is needed there.

In `comment-list.component.tsx`, remove `unsaved` from `DISABLED_PRESETS` — and if that leaves the
array empty, delete it and the `disabledValues` prop rather than leaving dead machinery.

- [ ] **Step 3: Run and commit**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run
```

```bash
git add extensions/src/legacy-comment-manager/src/
git commit -m "feat(comments): filter to drafted threads under the unsaved preset

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Rebuild the dist and verify

**This task is not optional.** `platform-bible-react` ships through its committed bundles; task 1's
changes do not reach the app without it.

- [ ] **Step 1: Rebuild**

```bash
cd /home/mgetgen/repos/paranext/paranext-core && npm run build:pbr
```

If `npm install` dirties the sibling `scripture-editors` repo's `pnpm-lock.yaml`, revert it there —
it is a known quirk of this repo and must not be committed.

- [ ] **Step 2: Full verification**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit
cd ../../extensions/src/legacy-comment-manager && npx vitest run
cd /home/mgetgen/repos/paranext/paranext-core && npm run typecheck
```

`typecheck:erb` fails on a missing `spdx-license-list` package; that is pre-existing and unrelated.
Note that root `npm test` short-circuits before the workspace suites when that package is absent, so
run the two workspace suites directly as above rather than trusting a root run.

- [ ] **Step 3: Verify in the running app**

```bash
./.erb/scripts/refresh.sh
```

Open a project with comments, then confirm by driving the UI:

1. Type a reply without submitting; switch the preset so the thread is excluded; switch back — the
   draft is still there.
2. Select "Unsaved notes" — only drafted threads show.
3. Close the panel, reopen it — the draft is still there.
4. Restart the app — the draft is still there.

Check the computed state, not just the screenshot: a stale `dist` looks identical to working code in
a screenshot but differs in the DOM.

- [ ] **Step 4: Commit the dist**

```bash
git add lib/platform-bible-react/dist
git commit -m "build(pbr): rebuild the dist for the controlled draft props

platform-bible-react ships through its committed dist, and neither the
root build nor the test suites rebuild it, so source-only changes pass
every test while the app keeps loading the previous bundle.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Deliberately not in this plan

- **Drafts visible under every filter** — PT9's behaviour, explicitly rejected; a test pins the
  difference.
- **Syncing drafts between machines** — `localStorage` is machine-local by design.
- **A size cap on stored drafts** — two prune rules instead (thread gone, draft emptied). A user
  cannot realistically accumulate megabytes of hand-typed comments, and silently discarding typed
  work is worse than the space it saves.
