# Reference History (Back/Forward Navigation) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Per-scroll-group scripture reference history (back/forward stacks) with PAPI commands, toolbar split buttons, and keyboard shortcuts, matching Paratext 9 behavior.

**Architecture:** History lives as in-memory state inside the renderer-hosted scroll group service (`scroll-group.service-host.ts`), recorded at the single mutation point `setScrRefSync`. Pure stack logic is extracted to a testable util. Three `platform.*` history commands + one `platform.getInterfaceDirection` command are registered from the renderer. Main-process `before-input-event` binds Alt+Left/Right (Win/Linux) and Cmd+[ / Cmd+] (macOS), both RTL-swapped. A presentational `NavigationHistoryButtons` component ships in `platform-bible-react/experimental`; a renderer container wires it into the toolbar.

**Tech Stack:** TypeScript, React, Vitest, Storybook, Playwright (cdp.fixture), Electron.

**Spec:** `docs/specs/2026-07-06-reference-history-design.md` — read it first. JIRA: PT-4034, PT-4035, PT-4033 (history subset). Branch: `pt-4034-reference-history`.

**Conventions that apply to every task:**

- Run `npm run typecheck` and `npm run lint` before every commit (repo rule).
- NEVER hand-edit `lib/papi-dts/papi.d.ts` — run `npm run build:types` after changing `src/declarations/papi-shared-types.ts` and commit the regenerated file.
- Commit messages end with `Co-authored-by: Claude Fable 5 <noreply@anthropic.com>`.
- Do not use `--no-verify`; pre-commit hooks must run.

---

### Task 1: History types, event name, and NetworkEvents declaration

**Files:**

- Modify: `src/shared/services/scroll-group.service-model.ts`
- Modify: `src/declarations/papi-shared-types.ts` (NetworkEvents interface at ~line 823)

- [ ] **Step 1: Add types and event name to `scroll-group.service-model.ts`**

After the `EVENT_NAME_ON_DID_CHANGE_VERSIFICATION` constant (line 31), add:

```ts
/**
 * Name to use when creating a network event that is fired when a scroll group's reference history
 * changes
 */
// serializeRequestType returns SerializedRequestType (an opaque branded string), but we know the
// actual value matches this NetworkEvents key. Cast to the literal so consumers can use this
// constant directly without re-casting at every usage site.
// eslint-disable-next-line no-type-assertion/no-type-assertion
export const EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY = serializeRequestType(
  CATEGORY_SCROLL_GROUP,
  'onDidChangeReferenceHistory',
) as 'scrollGroup:onDidChangeReferenceHistory';
```

After the `ScrollGroupUpdateInfo` type (line 54), add:

```ts
/** One visited location in a scroll group's reference history */
export type ReferenceHistoryEntry = {
  /** The visited Scripture reference */
  scrRef: SerializedVerseRef;
  /**
   * Project whose versification `scrRef` is expressed in. `undefined` = unknown. Preserved so
   * navigating back restores the reference in its original versification context
   */
  sourceProjectId?: string;
};

/**
 * Back/forward reference history for one scroll group. Session-only (in-memory; resets on app
 * restart)
 */
export type ReferenceHistory = {
  /** Back stack. Index 0 is the CURRENT location; index 1 is one step back */
  back: ReferenceHistoryEntry[];
  /** Forward stack. Index 0 is one step forward */
  forward: ReferenceHistoryEntry[];
};

/** Information about a change to a scroll group's reference history */
export type ReferenceHistoryUpdateInfo = {
  /** The scroll group whose history changed */
  scrollGroupId: ScrollGroupId;
  /** The new history state (a copy, safe to keep) */
  history: ReferenceHistory;
};
```

Then add these methods to `IScrollGroupRemoteService` (after `getScrRefForProject`):

```ts
  /**
   * Get a copy of the reference history for the provided scroll group
   *
   * @param scrollGroupId Scroll group whose history to get
   * @returns Copy of the scroll group's reference history
   */
  getReferenceHistory(scrollGroupId: ScrollGroupId): Promise<ReferenceHistory>;
  /**
   * Navigate within the reference history of the provided scroll group, browser-`history.go`
   * style: negative offset = back that many steps, positive = forward that many steps.
   *
   * @param scrollGroupId Scroll group whose history to navigate
   * @param offset Signed number of steps. -1 = back one, +1 = forward one
   * @returns `true` if navigation happened; `false` if the offset was 0 or out of range
   */
  navigateReferenceHistory(scrollGroupId: ScrollGroupId, offset: number): Promise<boolean>;
```

And add to `IScrollGroupService` (after `onDidUpdateScrRef`):

```ts
/** Event that emits when a scroll group's reference history changes */
onDidChangeReferenceHistory: PlatformEvent<ReferenceHistoryUpdateInfo>;
```

- [ ] **Step 2: Declare the event in `NetworkEvents`**

In `src/declarations/papi-shared-types.ts`, find `export interface NetworkEvents` (~line 823) which contains `'scrollGroup:onDidUpdateScrRef': ScrollGroupUpdateInfo;`. Add below it:

```ts
    'scrollGroup:onDidChangeReferenceHistory': ReferenceHistoryUpdateInfo;
```

Add `ReferenceHistoryUpdateInfo` to the existing import from `@shared/services/scroll-group.service-model` at the top of the file (the import that already brings in `ScrollGroupUpdateInfo`).

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: PASS (types are additive; nothing implements the new interface methods yet — `IScrollGroupRemoteService` is implemented by the `scrollGroupService` object literal in `scroll-group.service-host.ts:558`, so typecheck WILL fail there with "missing properties getReferenceHistory, navigateReferenceHistory". If it does, add temporary stubs to that object literal — they are replaced in Task 3:

```ts
  // Implemented properly in the reference-history integration (see plan Task 3)
  getReferenceHistory: async () => ({ back: [], forward: [] }),
  navigateReferenceHistory: async () => false,
```

Then re-run `npm run typecheck` → PASS.

- [ ] **Step 4: Commit**

```bash
git add src/shared/services/scroll-group.service-model.ts src/declarations/papi-shared-types.ts src/renderer/services/scroll-group.service-host.ts
git commit -m "feat(PT-4034): add reference history types and event to scroll group service model"
```

---

### Task 2: Pure reference-history stack logic (TDD)

**Files:**

- Create: `src/renderer/services/reference-history.util.ts`
- Create: `src/renderer/services/reference-history.util.test.ts`

The PT9 parity rules (from the spec — implement EXACTLY):

1. `recordNavigation(history, entry)`: if `back` is empty → push entry (seed). Else if entry has same book AND chapter as `back[0]` → replace `back[0]` in place (forward stack PRESERVED). Else → clear `forward`; if `back.length >= 4` AND `back[0..3]` are all the same book as the incoming entry → remove `back[3]`; insert entry at index 0; trim `back` to max 20.
2. `navigateHistory(history, offset)`: offset 0 / non-integer → `undefined`. Back (`offset < 0`, `steps = -offset`): requires `back.length > steps`; move `back[0..steps)` onto the front of `forward` REVERSED (so `forward[0]` is the nearest forward step); destination = new `back[0]`. Forward (`offset > 0`, `steps = offset`): requires `forward.length >= steps`; destination = `forward[steps - 1]`; move `forward[0..steps)` onto the front of `back` reversed (so `back[0]` = destination). Returns the destination entry or `undefined` if out of range (history unchanged when out of range).

- [ ] **Step 1: Write the failing tests**

Create `src/renderer/services/reference-history.util.test.ts`:

```ts
import { describe, expect, test } from 'vitest';
import {
  ReferenceHistory,
  ReferenceHistoryEntry,
} from '@shared/services/scroll-group.service-model';
import {
  createEmptyReferenceHistory,
  navigateHistory,
  recordNavigation,
  REFERENCE_HISTORY_MAX_DEPTH,
} from '@renderer/services/reference-history.util';

function entry(book: string, chapterNum: number, verseNum = 1): ReferenceHistoryEntry {
  return { scrRef: { book, chapterNum, verseNum } };
}

/** Build a history by recording a sequence of navigations in order */
function historyOf(...entries: ReferenceHistoryEntry[]): ReferenceHistory {
  const history = createEmptyReferenceHistory();
  entries.forEach((e) => recordNavigation(history, e));
  return history;
}

describe('recordNavigation', () => {
  test('first record seeds the back stack', () => {
    const history = createEmptyReferenceHistory();
    recordNavigation(history, entry('GEN', 1));
    expect(history.back).toEqual([entry('GEN', 1)]);
    expect(history.forward).toEqual([]);
  });

  test('new chapter pushes a new entry with previous location retained', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2));
    expect(history.back).toEqual([entry('GEN', 2), entry('GEN', 1)]);
  });

  test('same book and chapter replaces the top entry in place (verse-only move)', () => {
    const history = historyOf(entry('GEN', 1, 1), entry('GEN', 2, 1), entry('GEN', 2, 15));
    expect(history.back).toEqual([entry('GEN', 2, 15), entry('GEN', 1, 1)]);
  });

  test('same-chapter replace preserves the forward stack', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2));
    navigateHistory(history, -1); // back to GEN 1; forward now has GEN 2
    recordNavigation(history, entry('GEN', 1, 20)); // verse move within GEN 1
    expect(history.forward).toEqual([entry('GEN', 2)]);
    expect(history.back[0]).toEqual(entry('GEN', 1, 20));
  });

  test('a genuinely new entry clears the forward stack', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2));
    navigateHistory(history, -1); // forward = [GEN 2]
    recordNavigation(history, entry('EXO', 5));
    expect(history.forward).toEqual([]);
    expect(history.back).toEqual([entry('EXO', 5), entry('GEN', 1)]);
  });

  test('caps runs of the same book: with 4 same-book entries on top, index 3 is removed', () => {
    const history = historyOf(
      entry('MAT', 1),
      entry('MRK', 1),
      entry('MRK', 2),
      entry('MRK', 3),
      entry('MRK', 4),
    );
    // back = [MRK 4, MRK 3, MRK 2, MRK 1, MAT 1] — top 4 all MRK, incoming MRK
    recordNavigation(history, entry('MRK', 5));
    // MRK 1 (index 3 before insert) removed, then MRK 5 inserted
    expect(history.back).toEqual([
      entry('MRK', 5),
      entry('MRK', 4),
      entry('MRK', 3),
      entry('MRK', 2),
      entry('MAT', 1),
    ]);
  });

  test('back stack is trimmed to max depth', () => {
    const history = createEmptyReferenceHistory();
    // Alternate books so neither same-chapter replace nor same-book-run trim kicks in
    for (let i = 1; i <= REFERENCE_HISTORY_MAX_DEPTH + 5; i += 1) {
      recordNavigation(history, entry(i % 2 === 0 ? 'GEN' : 'EXO', i));
    }
    expect(history.back.length).toBe(REFERENCE_HISTORY_MAX_DEPTH);
  });
});

describe('navigateHistory', () => {
  test('back one step moves current to forward and returns the previous entry', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2), entry('EXO', 3));
    const destination = navigateHistory(history, -1);
    expect(destination).toEqual(entry('GEN', 2));
    expect(history.back).toEqual([entry('GEN', 2), entry('GEN', 1)]);
    expect(history.forward).toEqual([entry('EXO', 3)]);
  });

  test('multi-step back transfers intervening entries reversed so forward order is nearest-first', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2), entry('EXO', 3), entry('LEV', 4));
    const destination = navigateHistory(history, -3);
    expect(destination).toEqual(entry('GEN', 1));
    expect(history.back).toEqual([entry('GEN', 1)]);
    expect(history.forward).toEqual([entry('GEN', 2), entry('EXO', 3), entry('LEV', 4)]);
  });

  test('forward one step is symmetric', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2));
    navigateHistory(history, -1);
    const destination = navigateHistory(history, 1);
    expect(destination).toEqual(entry('GEN', 2));
    expect(history.back).toEqual([entry('GEN', 2), entry('GEN', 1)]);
    expect(history.forward).toEqual([]);
  });

  test('multi-step forward lands on the target and re-stacks intervening entries', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2), entry('EXO', 3), entry('LEV', 4));
    navigateHistory(history, -3); // back = [GEN 1], forward = [GEN 2, EXO 3, LEV 4]
    const destination = navigateHistory(history, 2);
    expect(destination).toEqual(entry('EXO', 3));
    expect(history.back).toEqual([entry('EXO', 3), entry('GEN', 2), entry('GEN', 1)]);
    expect(history.forward).toEqual([entry('LEV', 4)]);
  });

  test('returns undefined and leaves history unchanged when out of range', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2));
    expect(navigateHistory(history, -2)).toBeUndefined(); // only 1 step of back available
    expect(navigateHistory(history, 1)).toBeUndefined(); // no forward
    expect(navigateHistory(history, 0)).toBeUndefined();
    expect(navigateHistory(history, 1.5)).toBeUndefined();
    expect(history.back).toEqual([entry('GEN', 2), entry('GEN', 1)]);
    expect(history.forward).toEqual([]);
  });

  test('back requires at least 2 back entries (top is the current location)', () => {
    const history = historyOf(entry('GEN', 1));
    expect(navigateHistory(history, -1)).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/renderer/services/reference-history.util.test.ts`
Expected: FAIL — cannot resolve `@renderer/services/reference-history.util`.

- [ ] **Step 3: Implement the util**

Create `src/renderer/services/reference-history.util.ts`:

```ts
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  ReferenceHistory,
  ReferenceHistoryEntry,
} from '@shared/services/scroll-group.service-model';

/** Maximum number of entries kept on a scroll group's back stack (matches Paratext 9) */
export const REFERENCE_HISTORY_MAX_DEPTH = 20;
/**
 * When this many consecutive entries at the top of the back stack are all in the same book as an
 * incoming entry, the oldest of them is dropped before inserting (matches Paratext 9's cap on runs
 * of one book)
 */
const MAX_SAME_BOOK_RUN = 4;

/** Create a new, empty reference history */
export function createEmptyReferenceHistory(): ReferenceHistory {
  return { back: [], forward: [] };
}

function isSameBookAndChapter(a: SerializedVerseRef, b: SerializedVerseRef): boolean {
  return a.book === b.book && a.chapterNum === b.chapterNum;
}

/**
 * Record a navigation to `entry` in `history` (mutates `history`). Matches Paratext 9
 * `WindowCollectionBase.AddVerseRefToHistory`: a move within the current book+chapter replaces the
 * top entry in place (preserving the forward stack); a genuinely new chapter clears the forward
 * stack, caps same-book runs, inserts at the top, and trims to {@link REFERENCE_HISTORY_MAX_DEPTH}.
 */
export function recordNavigation(history: ReferenceHistory, entry: ReferenceHistoryEntry): void {
  const { back, forward } = history;

  if (back.length > 0 && isSameBookAndChapter(back[0].scrRef, entry.scrRef)) {
    back[0] = entry;
    return;
  }

  if (back.length > 0) forward.length = 0;

  if (
    back.length >= MAX_SAME_BOOK_RUN &&
    back.slice(0, MAX_SAME_BOOK_RUN).every((e) => e.scrRef.book === entry.scrRef.book)
  )
    back.splice(MAX_SAME_BOOK_RUN - 1, 1);

  back.unshift(entry);
  if (back.length > REFERENCE_HISTORY_MAX_DEPTH) back.length = REFERENCE_HISTORY_MAX_DEPTH;
}

/**
 * Navigate within `history` by a signed `offset` (mutates `history`), browser-`history.go` style:
 * negative = back that many steps, positive = forward that many steps. The invariant `back[0]` =
 * current location is preserved; intervening entries transfer to the opposite stack (matches
 * Paratext 9's dropdown jump).
 *
 * @returns The destination entry, or `undefined` (history unchanged) when `offset` is 0,
 *   non-integer, or out of range
 */
export function navigateHistory(
  history: ReferenceHistory,
  offset: number,
): ReferenceHistoryEntry | undefined {
  if (!Number.isInteger(offset) || offset === 0) return undefined;
  const { back, forward } = history;

  if (offset < 0) {
    const steps = -offset;
    // back[0] is the current location, so going back `steps` requires back[steps] to exist
    if (back.length <= steps) return undefined;
    const moved = back.splice(0, steps);
    forward.unshift(...moved.reverse());
    return back[0];
  }

  const steps = offset;
  if (forward.length < steps) return undefined;
  const moved = forward.splice(0, steps);
  back.unshift(...moved.reverse());
  return back[0];
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/renderer/services/reference-history.util.test.ts`
Expected: PASS (all tests).

- [ ] **Step 5: Commit**

```bash
git add src/renderer/services/reference-history.util.ts src/renderer/services/reference-history.util.test.ts
git commit -m "feat(PT-4034): add pure reference-history stack logic with PT9 parity tests"
```

---

### Task 3: Wire history into the scroll group service host (TDD)

**Files:**

- Modify: `src/renderer/services/scroll-group.service-host.ts`
- Create: `src/renderer/services/scroll-group.service-host.test.ts`

- [ ] **Step 1: Write the failing host integration test**

Create `src/renderer/services/scroll-group.service-host.test.ts`. Mock every cross-process dependency the host imports (mirror the style of `src/renderer/services/dialog.service-host.test.ts`). The `// @vitest-environment jsdom` directive guarantees `localStorage` exists for the host's module-load reads.

```ts
// @vitest-environment jsdom
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@shared/services/network.service', () => ({
  createBufferedNetworkEventEmitter: vi.fn(() => ({
    emit: vi.fn(),
    registeredEmitter: Promise.resolve({ dispose: vi.fn() }),
    dispose: vi.fn(),
  })),
  getNetworkEvent: vi.fn(() => vi.fn()),
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { set: vi.fn(), subscribe: vi.fn().mockResolvedValue(vi.fn()) },
}));
vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(),
  registerCommand: vi.fn().mockResolvedValue(vi.fn()),
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: vi.fn() },
}));
vi.mock('@shared/services/project-data-provider.service', () => ({
  papiFrontendProjectDataProviderService: { get: vi.fn() },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

/** Import a fresh copy of the host so each test starts with clean module state */
async function importHost() {
  vi.resetModules();
  return import('@renderer/services/scroll-group.service-host');
}

beforeEach(() => {
  localStorage.clear();
});

describe('reference history integration', () => {
  test('setScrRefSync records history seeded with the starting reference', async () => {
    const host = await importHost();
    host.setScrRefSync(1, { book: 'MRK', chapterNum: 4, verseNum: 1 });
    const history = host.getReferenceHistorySync(1);
    // Seeded with the group's starting ref (default GEN 1:1), then MRK 4 pushed on top
    expect(history.back).toEqual([
      { scrRef: { book: 'MRK', chapterNum: 4, verseNum: 1 }, sourceProjectId: undefined },
      { scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 }, sourceProjectId: undefined },
    ]);
    expect(history.forward).toEqual([]);
  });

  test('navigateReferenceHistorySync(-1) restores the previous ref without re-recording', async () => {
    const host = await importHost();
    host.setScrRefSync(1, { book: 'MRK', chapterNum: 4, verseNum: 1 });
    const didNavigate = host.navigateReferenceHistorySync(1, -1);
    expect(didNavigate).toBe(true);
    expect(host.getScrRefSync(1)).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 1 });
    const history = host.getReferenceHistorySync(1);
    expect(history.back).toEqual([
      { scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 }, sourceProjectId: undefined },
    ]);
    expect(history.forward).toEqual([
      { scrRef: { book: 'MRK', chapterNum: 4, verseNum: 1 }, sourceProjectId: undefined },
    ]);
  });

  test('navigateReferenceHistorySync returns false when there is nothing to navigate to', async () => {
    const host = await importHost();
    expect(host.navigateReferenceHistorySync(1, -1)).toBe(false);
    expect(host.navigateReferenceHistorySync(1, 1)).toBe(false);
  });

  test('histories are per scroll group', async () => {
    const host = await importHost();
    host.setScrRefSync(1, { book: 'MRK', chapterNum: 4, verseNum: 1 });
    host.setScrRefSync(2, { book: 'LUK', chapterNum: 2, verseNum: 1 });
    expect(host.getReferenceHistorySync(1).back[0].scrRef.book).toBe('MRK');
    expect(host.getReferenceHistorySync(2).back[0].scrRef.book).toBe('LUK');
    expect(host.getReferenceHistorySync(1).back).toHaveLength(2);
  });

  test('getReferenceHistorySync returns copies, not live state', async () => {
    const host = await importHost();
    host.setScrRefSync(1, { book: 'MRK', chapterNum: 4, verseNum: 1 });
    const history = host.getReferenceHistorySync(1);
    history.back.length = 0;
    expect(host.getReferenceHistorySync(1).back).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/renderer/services/scroll-group.service-host.test.ts`
Expected: FAIL — `getReferenceHistorySync` / `navigateReferenceHistorySync` are not exported.

- [ ] **Step 3: Implement history in the host**

In `src/renderer/services/scroll-group.service-host.ts`:

3a. Add imports:

```ts
import {
  createEmptyReferenceHistory,
  navigateHistory,
  recordNavigation,
} from '@renderer/services/reference-history.util';
```

and extend the existing `@shared/services/scroll-group.service-model` import with `EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY`, `ReferenceHistory`, and `ReferenceHistoryUpdateInfo`.

3b. After the `onDidUpdateScrRefBufferedEmitter` declaration (~line 57), add:

```ts
/**
 * Buffered emitter for changes to a scroll group's reference history. Buffered latest-per-group
 * like {@link onDidUpdateScrRefBufferedEmitter}; consumers only need the latest state.
 */
const onDidChangeReferenceHistoryBufferedEmitter = createBufferedNetworkEventEmitter(
  EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY,
  {
    notification: {
      summary: "Emitted when a scroll group's reference history changes.",
      params: [
        {
          name: 'update',
          required: true,
          summary: 'The scroll group and its new reference history.',
          schema: { type: 'object' },
        },
      ],
    },
  },
  { bufferStrategy: { latestByKey: (update) => String(update.scrollGroupId) } },
);
```

3c. After the `onDidChangeVersification` export (~line 177), add:

```ts
/** Event that emits when a scroll group's reference history changes */
export const onDidChangeReferenceHistory: PlatformEvent<ReferenceHistoryUpdateInfo> =
  getNetworkEvent(EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY);

/**
 * Reference history per scroll group. Session-only BY DESIGN (in-memory; resets on app restart —
 * matches Paratext 9): do NOT persist to localStorage or settings.
 */
const referenceHistories = new Map<ScrollGroupId, ReferenceHistory>();

/**
 * Get (lazily creating and seeding) the LIVE history object for a scroll group. The lazy seed with
 * the group's current ref makes the first navigation immediately back-able (mirrors Paratext 9
 * seeding history on layout restore). Internal only — external callers get copies via
 * {@link getReferenceHistorySync}.
 */
function getOrCreateReferenceHistory(scrollGroupId: ScrollGroupId): ReferenceHistory {
  let history = referenceHistories.get(scrollGroupId);
  if (!history) {
    history = createEmptyReferenceHistory();
    recordNavigation(history, {
      scrRef: getScrRefSync(scrollGroupId),
      sourceProjectId: getScrRefSourceProjectIdSync(scrollGroupId),
    });
    referenceHistories.set(scrollGroupId, history);
  }
  return history;
}

function emitReferenceHistoryChange(scrollGroupId: ScrollGroupId, history: ReferenceHistory) {
  onDidChangeReferenceHistoryBufferedEmitter.emit({ scrollGroupId, history: deepClone(history) });
}

/** See {@link IScrollGroupRemoteService.getReferenceHistory} */
export function getReferenceHistorySync(scrollGroupId: ScrollGroupId): ReferenceHistory {
  return deepClone(getOrCreateReferenceHistory(scrollGroupId));
}

/** See {@link IScrollGroupRemoteService.navigateReferenceHistory} */
export function navigateReferenceHistorySync(
  scrollGroupId: ScrollGroupId,
  offset: number,
): boolean {
  const history = getOrCreateReferenceHistory(scrollGroupId);
  const destination = navigateHistory(history, offset);
  if (!destination) return false;
  // The stacks already reflect the navigation; skip recording so it is not double-pushed
  setScrRefSync(scrollGroupId, destination.scrRef, destination.sourceProjectId, true, false);
  emitReferenceHistoryChange(scrollGroupId, history);
  return true;
}
```

3d. Change `setScrRefSync`'s signature (line 483) to add a fifth parameter, documenting it in the JSDoc:

```ts
 * @param shouldRecordHistory If `true`, record this change in the scroll group's reference
 *   history. Defaults to `true`. Only set to `false` when navigating within the history itself,
 *   where the stacks already reflect the move.
```

```ts
export function setScrRefSync(
  scrollGroupId: ScrollGroupId | undefined,
  scrRef: SerializedVerseRef,
  sourceProjectId?: string,
  shouldSetVerseRefSetting = true,
  shouldRecordHistory = true,
): boolean {
```

Inside, AFTER the no-op guard (`return false`, ~line 512) and BEFORE `scrRefs[scrollGroupIdDefaulted] = scrRefClone;` (line 517), capture the history so a lazy seed uses the PRE-navigation ref:

```ts
// Capture (lazily seeding) the history BEFORE mutating the stored ref so a first-touch seed
// records the location being navigated AWAY from, not the destination
const referenceHistory = shouldRecordHistory
  ? getOrCreateReferenceHistory(scrollGroupIdDefaulted)
  : undefined;
```

Then after the `onDidUpdateScrRefBufferedEmitter.emit(...)` call (~line 529), add:

```ts
if (referenceHistory) {
  recordNavigation(referenceHistory, { scrRef: scrRefClone, sourceProjectId });
  emitReferenceHistoryChange(scrollGroupIdDefaulted, referenceHistory);
}
```

3e. Replace the Task 1 stubs on the `scrollGroupService` object literal (~line 558) with real wrappers:

```ts
async function getReferenceHistory(scrollGroupId: ScrollGroupId): Promise<ReferenceHistory> {
  return getReferenceHistorySync(scrollGroupId);
}

async function navigateReferenceHistory(
  scrollGroupId: ScrollGroupId,
  offset: number,
): Promise<boolean> {
  return navigateReferenceHistorySync(scrollGroupId, offset);
}

const scrollGroupService: IScrollGroupRemoteService = {
  getScrRef,
  setScrRef,
  getScrRefForProject,
  getReferenceHistory,
  navigateReferenceHistory,
};
```

- [ ] **Step 4: Run the tests**

Run: `npm test -- src/renderer/services/scroll-group.service-host.test.ts src/renderer/services/reference-history.util.test.ts`
Expected: PASS.

- [ ] **Step 5: Update the client proxy**

In `src/shared/services/scroll-group.service.ts`, add to the imports `EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY` and add the event to the proxy:

```ts
const onDidUpdateScrRef = getNetworkEvent(EVENT_NAME_ON_DID_UPDATE_SCR_REF);
const onDidChangeReferenceHistory = getNetworkEvent(EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY);
```

and in the `createSyncProxyForAsyncObject` second argument:

```ts
  {
    onDidUpdateScrRef,
    onDidChangeReferenceHistory,
  },
```

- [ ] **Step 6: Typecheck, lint, full unit tests**

Run: `npm run typecheck && npm run lint && npm test`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/renderer/services/scroll-group.service-host.ts src/renderer/services/scroll-group.service-host.test.ts src/shared/services/scroll-group.service.ts
git commit -m "feat(PT-4034): record and navigate per-scroll-group reference history in scroll group service"
```

---

### Task 4: History PAPI commands

**Files:**

- Modify: `src/declarations/papi-shared-types.ts` (CommandHandlers, ~line 117)
- Modify: `src/renderer/services/scroll-group.service-host.ts` (`startScrollGroupService`)
- Modify: `lib/papi-dts/papi.d.ts` (regenerated only)

- [ ] **Step 1: Declare the commands**

In `CommandHandlers` in `src/declarations/papi-shared-types.ts`, after the `web-view.service-host.ts` block (after `'platform.closeOpenUsersnapForm'`, ~line 117), add. `ScrollGroupId` comes from `platform-bible-utils` — add it to that existing import if not present:

```ts
    // These commands are provided in `src/renderer/services/scroll-group.service-host.ts`
    /**
     * Navigate one step back in the reference history of the given scroll group.
     *
     * @param scrollGroupId Scroll group whose history to navigate
     * @returns `true` if navigation happened; `false` when there is no history to go back to
     */
    'platform.navigateBackInReferenceHistory': (scrollGroupId: ScrollGroupId) => Promise<boolean>;
    /**
     * Navigate one step forward in the reference history of the given scroll group.
     *
     * @param scrollGroupId Scroll group whose history to navigate
     * @returns `true` if navigation happened; `false` when there is no history to go forward to
     */
    'platform.navigateForwardInReferenceHistory': (
      scrollGroupId: ScrollGroupId,
    ) => Promise<boolean>;
    /**
     * Navigate multiple steps within the reference history of the given scroll group,
     * browser-`history.go` style.
     *
     * @param scrollGroupId Scroll group whose history to navigate
     * @param offset Signed number of steps: negative = back, positive = forward
     * @returns `true` if navigation happened; `false` if the offset was 0 or out of range
     */
    'platform.navigateReferenceHistoryByOffset': (
      scrollGroupId: ScrollGroupId,
      offset: number,
    ) => Promise<boolean>;
```

- [ ] **Step 2: Register the commands in the host**

In `scroll-group.service-host.ts`, import `registerCommand` from `@shared/services/command.service` (the file already imports `sendCommand` from there — extend that import). In `startScrollGroupService` (line 565), after `networkObjectService.set(...)`, add:

```ts
await Promise.all([
  registerCommand(
    'platform.navigateBackInReferenceHistory',
    async (scrollGroupId) => navigateReferenceHistorySync(scrollGroupId, -1),
    {
      method: {
        summary: 'Navigate one step back in the reference history of the given scroll group',
        params: [
          {
            name: 'scrollGroupId',
            required: true,
            summary: 'Scroll group whose history to navigate',
            schema: { type: 'number' },
          },
        ],
        result: { name: 'didNavigate', schema: { type: 'boolean' } },
      },
    },
  ),
  registerCommand(
    'platform.navigateForwardInReferenceHistory',
    async (scrollGroupId) => navigateReferenceHistorySync(scrollGroupId, 1),
    {
      method: {
        summary: 'Navigate one step forward in the reference history of the given scroll group',
        params: [
          {
            name: 'scrollGroupId',
            required: true,
            summary: 'Scroll group whose history to navigate',
            schema: { type: 'number' },
          },
        ],
        result: { name: 'didNavigate', schema: { type: 'boolean' } },
      },
    },
  ),
  registerCommand(
    'platform.navigateReferenceHistoryByOffset',
    async (scrollGroupId, offset) => navigateReferenceHistorySync(scrollGroupId, offset),
    {
      method: {
        summary:
          'Navigate multiple steps in the reference history of the given scroll group ' +
          '(negative offset = back, positive = forward)',
        params: [
          {
            name: 'scrollGroupId',
            required: true,
            summary: 'Scroll group whose history to navigate',
            schema: { type: 'number' },
          },
          {
            name: 'offset',
            required: true,
            summary: 'Signed number of steps: negative = back, positive = forward',
            schema: { type: 'number' },
          },
        ],
        result: { name: 'didNavigate', schema: { type: 'boolean' } },
      },
    },
  ),
]);
```

- [ ] **Step 3: Regenerate PAPI types**

Run: `npm run build:types`
Expected: completes without error; `lib/papi-dts/papi.d.ts` shows the three new commands.

- [ ] **Step 4: Typecheck + tests**

Run: `npm run typecheck && npm test -- src/renderer/services/scroll-group.service-host.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/declarations/papi-shared-types.ts src/renderer/services/scroll-group.service-host.ts lib/papi-dts/papi.d.ts
git commit -m "feat(PT-4034): add platform reference-history navigation commands"
```

---

### Task 5: `platform.getInterfaceDirection` command

**Files:**

- Modify: `lib/platform-bible-react/src/experimental.ts`
- Create: `src/renderer/services/interface-direction.command.ts`
- Modify: `src/renderer/index.tsx`
- Modify: `src/declarations/papi-shared-types.ts`
- Modify: `lib/papi-dts/papi.d.ts` (regenerated only)

- [ ] **Step 1: Export `readDirection` from `platform-bible-react/experimental`**

In `lib/platform-bible-react/src/experimental.ts`, add:

```ts
export { readDirection, persistDirection, type Direction } from './utils/dir-helper.util';
```

Then rebuild the library so the export is available to `src/`:
Run: `npm run build --workspace=platform-bible-react` (if that script name fails, check `lib/platform-bible-react/package.json` scripts and use its build script from the repo root).

Note: `src/` has not imported from `platform-bible-react/experimental` before, but extension code does (e.g. `extensions/src/platform-scripture/src/checklist.web-view.tsx`), so the subpath export resolves in this monorepo. If the renderer webpack build cannot resolve it, check `.erb/configs` resolve settings against how the root `platform-bible-react` import resolves and mirror that.

- [ ] **Step 2: Declare the command**

In `CommandHandlers` in `src/declarations/papi-shared-types.ts`, after the Task 4 block:

```ts
    // This command is provided in `src/renderer/services/interface-direction.command.ts`
    /**
     * Get the current UI layout direction ('ltr' or 'rtl'). This is the user's global UI direction
     * preference (the same source RTL-aware components use), NOT any project's text direction.
     */
    'platform.getInterfaceDirection': () => Promise<'ltr' | 'rtl'>;
```

- [ ] **Step 3: Create the command module**

Create `src/renderer/services/interface-direction.command.ts`:

```ts
import { registerCommand } from '@shared/services/command.service';
import { readDirection } from 'platform-bible-react/experimental';

/**
 * Register the `platform.getInterfaceDirection` command. Lives in the renderer because the UI
 * layout direction is renderer-local state (`readDirection()` reads the same source all RTL-aware
 * components use). Used by the main process to apply the RTL swap to the reference-history keyboard
 * shortcuts.
 */
export async function startInterfaceDirectionCommand(): Promise<void> {
  await registerCommand('platform.getInterfaceDirection', async () => readDirection(), {
    method: {
      summary: "Get the current UI layout direction ('ltr' or 'rtl')",
      params: [],
      result: { name: 'direction', schema: { type: 'string', enum: ['ltr', 'rtl'] } },
    },
  });
}
```

- [ ] **Step 4: Register at renderer startup**

In `src/renderer/index.tsx`, find where `startScrollGroupService()` is called (~line 102) and add alongside it (same pattern — check how its promise is handled and mirror it):

```ts
import { startInterfaceDirectionCommand } from '@renderer/services/interface-direction.command';
// ... in the same startup sequence as startScrollGroupService():
startInterfaceDirectionCommand(),
```

- [ ] **Step 5: Regenerate types, typecheck, commit**

Run: `npm run build:types && npm run typecheck && npm run lint`
Expected: PASS.

```bash
git add lib/platform-bible-react/src/experimental.ts src/renderer/services/interface-direction.command.ts src/renderer/index.tsx src/declarations/papi-shared-types.ts lib/papi-dts/papi.d.ts
git commit -m "feat(PT-4033): add platform.getInterfaceDirection command"
```

---

### Task 6: Main-process keyboard shortcuts + catalog entries

**Files:**

- Modify: `src/main/main.ts` (`before-input-event` handler at ~line 619)
- Modify: `src/stories/keyboard-shortcuts.data.ts`

- [ ] **Step 1: Add the interim scroll group constant**

Near the top of `src/main/main.ts` (after the imports, near other module constants):

```ts
/**
 * Scroll group the reference-history keyboard shortcuts operate on. INTERIM: hardcoded to 0 (the
 * top toolbar's default group, and effectively the only group Simple-mode users are on) until the
 * toolbar tracks the active web view's scroll group, at which point this dispatch should resolve
 * the active group instead.
 */
const INTERIM_KEYBOARD_HISTORY_SCROLL_GROUP_ID = 0;
```

- [ ] **Step 2: Add the key handling**

In the `before-input-event` handler, AFTER the Ctrl+Tab block (ends line 640) and BEFORE the `if (process.platform !== 'darwin')` split (line 642), add:

```ts
// Reference history navigation (PT-4033). Windows/Linux: Alt+Left / Alt+Right (Paratext 9
// parity). macOS: Cmd+[ / Cmd+] — the platform's history convention; Option+arrows is the
// system-wide move-by-word shortcut and must not be intercepted. In RTL the pairs swap
// meaning (physical-direction-preserving, like Paratext 9 and Chromium — see
// docs/specs/2026-07-06-reference-history-design.md). The `!input.shift` guard keeps
// Cmd+Shift+[/] free for the tab-focus handler below.
const isHistoryNavigationKey =
  process.platform === 'darwin'
    ? input.meta &&
      !input.shift &&
      !input.alt &&
      !input.control &&
      (input.key === '[' || input.key === ']')
    : input.alt &&
      !input.control &&
      !input.shift &&
      !input.meta &&
      (input.key === 'ArrowLeft' || input.key === 'ArrowRight');
if (isHistoryNavigationKey) {
  event.preventDefault();
  const isPhysicallyBackKey = input.key === 'ArrowLeft' || input.key === '[';
  (async () => {
    try {
      const direction = await commandService.sendCommand('platform.getInterfaceDirection');
      const isBack = direction === 'rtl' ? !isPhysicallyBackKey : isPhysicallyBackKey;
      await commandService.sendCommand(
        isBack
          ? 'platform.navigateBackInReferenceHistory'
          : 'platform.navigateForwardInReferenceHistory',
        INTERIM_KEYBOARD_HISTORY_SCROLL_GROUP_ID,
      );
    } catch (e) {
      logger.warn(`Reference history keyboard navigation failed. ${getErrorMessage(e)}`);
    }
  })();
  return;
}
```

- [ ] **Step 3: Add keyboard shortcuts catalog entries**

In `src/stories/keyboard-shortcuts.data.ts`, after the `previous-tab-group` entry (line 52), add:

```ts
  {
    id: 'reference-history-back',
    purpose: 'Go back one Scripture reference in the active scroll group’s history',
    category: 'Navigation',
    context: 'Main process (global)',
    // In RTL the back/forward pairs swap meaning (physical-direction-preserving, like Paratext 9)
    keys: { macOS: '⌘[', windows: 'Alt+Left', linux: 'Alt+Left' },
    locations: ['src/main/main.ts'],
  },
  {
    id: 'reference-history-forward',
    purpose: 'Go forward one Scripture reference in the active scroll group’s history',
    category: 'Navigation',
    context: 'Main process (global)',
    // In RTL the back/forward pairs swap meaning (physical-direction-preserving, like Paratext 9)
    keys: { macOS: '⌘]', windows: 'Alt+Right', linux: 'Alt+Right' },
    locations: ['src/main/main.ts'],
  },
```

- [ ] **Step 4: Typecheck, lint, commit**

Run: `npm run typecheck && npm run lint`
Expected: PASS.

```bash
git add src/main/main.ts src/stories/keyboard-shortcuts.data.ts
git commit -m "feat(PT-4033): bind reference-history keyboard shortcuts with RTL swap"
```

---

### Task 7: `NavigationHistoryButtons` component in platform-bible-react/experimental (TDD)

**Files:**

- Create: `lib/platform-bible-react/src/components/advanced/navigation-history-buttons/navigation-history-buttons.component.tsx`
- Create: `lib/platform-bible-react/src/components/advanced/navigation-history-buttons/navigation-history-buttons.component.test.tsx`
- Create: `lib/platform-bible-react/src/components/advanced/navigation-history-buttons/navigation-history-buttons.stories.tsx`
- Modify: `lib/platform-bible-react/src/experimental.ts`

Model closely on `lib/platform-bible-react/src/components/basics/undo-redo-buttons.component.tsx` (ButtonGroup + Tooltip + Kbd + userAgent Mac detection) and use `DropdownMenu` from `@/components/shadcn-ui/dropdown-menu`. Model the test file on `lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.test.tsx` (testing-library setup).

- [ ] **Step 1: Write the failing component test**

Create `navigation-history-buttons.component.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { persistDirection } from '@/utils/dir-helper.util';
import {
  NavigationHistoryButtons,
  NavigationHistoryButtonsProps,
} from './navigation-history-buttons.component';

const defaultProps: NavigationHistoryButtonsProps = {
  canGoBack: true,
  canGoForward: true,
  backItems: [
    { label: 'Genesis 1:1', offset: -1 },
    { label: 'Exodus 5:1', offset: -2 },
  ],
  forwardItems: [{ label: 'Mark 4:1', offset: 1 }],
  onNavigate: vi.fn(),
};

beforeEach(() => {
  persistDirection('ltr');
  vi.clearAllMocks();
});

describe('NavigationHistoryButtons', () => {
  test('clicking back/forward calls onNavigate with ±1', async () => {
    const user = userEvent.setup();
    render(<NavigationHistoryButtons {...defaultProps} />);
    await user.click(screen.getByTestId('navigation-history-back-button'));
    expect(defaultProps.onNavigate).toHaveBeenCalledWith(-1);
    await user.click(screen.getByTestId('navigation-history-forward-button'));
    expect(defaultProps.onNavigate).toHaveBeenCalledWith(1);
  });

  test('buttons are disabled when canGoBack/canGoForward are false', () => {
    render(
      <NavigationHistoryButtons
        {...defaultProps}
        canGoBack={false}
        canGoForward={false}
        backItems={[]}
        forwardItems={[]}
      />,
    );
    expect(screen.getByTestId('navigation-history-back-button')).toBeDisabled();
    expect(screen.getByTestId('navigation-history-forward-button')).toBeDisabled();
    expect(screen.getByTestId('navigation-history-back-menu-trigger')).toBeDisabled();
    expect(screen.getByTestId('navigation-history-forward-menu-trigger')).toBeDisabled();
  });

  test('back dropdown lists history items and clicking one navigates by its offset', async () => {
    const user = userEvent.setup();
    render(<NavigationHistoryButtons {...defaultProps} />);
    await user.click(screen.getByTestId('navigation-history-back-menu-trigger'));
    const item = await screen.findByRole('menuitem', { name: 'Exodus 5:1' });
    await user.click(item);
    expect(defaultProps.onNavigate).toHaveBeenCalledWith(-2);
  });

  test('RTL mirrors the pair order', () => {
    persistDirection('rtl');
    render(<NavigationHistoryButtons {...defaultProps} />);
    const group = screen.getByTestId('navigation-history-buttons');
    const buttons = Array.from(group.querySelectorAll('[data-testid$="-button"]')).map((el) =>
      el.getAttribute('data-testid'),
    );
    // In RTL the forward split button renders first (back sits on the right, like Paratext 9)
    expect(buttons[0]).toBe('navigation-history-forward-button');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run (from repo root): `npm test -- lib/platform-bible-react/src/components/advanced/navigation-history-buttons/navigation-history-buttons.component.test.tsx`
(If lib tests run in the workspace instead, use `npm test --workspace=platform-bible-react` with the same filter.)
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the component**

Create `navigation-history-buttons.component.tsx`:

```tsx
import { Button, type ButtonProps } from '@/components/shadcn-ui/button';
import { ButtonGroup } from '@/components/shadcn-ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Kbd } from '@/components/shadcn-ui/kbd';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { readDirection } from '@/utils/dir-helper.util';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { useMemo } from 'react';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component.
 */
export const NAVIGATION_HISTORY_BUTTONS_STRING_KEYS = Object.freeze([
  '%navigationHistory_back_tooltip%',
  '%navigationHistory_forward_tooltip%',
  '%navigationHistory_backList_ariaLabel%',
  '%navigationHistory_forwardList_ariaLabel%',
] as const);

export type NavigationHistoryButtonsLocalizedStrings = {
  [key in (typeof NAVIGATION_HISTORY_BUTTONS_STRING_KEYS)[number]]?: string;
};

const localizeString = (
  strings: NavigationHistoryButtonsLocalizedStrings,
  key: keyof NavigationHistoryButtonsLocalizedStrings,
) => strings[key] ?? key;

/** One entry in a navigation-history dropdown */
export type NavigationHistoryItem = {
  /** Display label for the history entry, e.g. 'Mark 4:1' */
  label: string;
  /** Signed navigation offset for this entry: negative = back, positive = forward */
  offset: number;
};

export type NavigationHistoryButtonsProps = {
  /** Whether the back button is enabled */
  canGoBack?: boolean;
  /** Whether the forward button is enabled */
  canGoForward?: boolean;
  /** History entries behind the current location, nearest first (offsets -1, -2, ...) */
  backItems?: NavigationHistoryItem[];
  /** History entries ahead of the current location, nearest first (offsets +1, +2, ...) */
  forwardItems?: NavigationHistoryItem[];
  /** Called with the signed offset to navigate by (from a button click or a dropdown item) */
  onNavigate: (offset: number) => void;
  /** Localized strings for tooltips and aria-labels. Falls back to the key itself */
  localizedStrings?: NavigationHistoryButtonsLocalizedStrings;
  /**
   * Whether to show OS-specific keyboard shortcut hints in the tooltips. Defaults to `true`. The
   * hints follow the UI direction: in RTL the back/forward keys swap (physical-direction
   * preserving, matching the main-process handler)
   */
  showKeyboardShortcuts?: boolean;
  /** CSS class name for the buttons */
  className?: string;
  /** Variant for the buttons. Defaults to "ghost" */
  variant?: ButtonProps['variant'];
};

/**
 * Back/forward reference-history split buttons: each half is an action button plus a dropdown
 * listing the history entries in that direction. In RTL the pair mirrors (order, arrow icons, and
 * tooltip shortcut hints), matching Paratext 9.
 */
export function NavigationHistoryButtons({
  canGoBack = false,
  canGoForward = false,
  backItems = [],
  forwardItems = [],
  onNavigate,
  localizedStrings = {},
  showKeyboardShortcuts = true,
  className,
  variant = 'ghost',
}: NavigationHistoryButtonsProps) {
  const isMac = useMemo(() => /Macintosh/i.test(navigator.userAgent), []);
  const isRtl = readDirection() === 'rtl';

  const backLocalized = localizeString(localizedStrings, '%navigationHistory_back_tooltip%');
  const forwardLocalized = localizeString(localizedStrings, '%navigationHistory_forward_tooltip%');
  const backListLocalized = localizeString(
    localizedStrings,
    '%navigationHistory_backList_ariaLabel%',
  );
  const forwardListLocalized = localizeString(
    localizedStrings,
    '%navigationHistory_forwardList_ariaLabel%',
  );

  // Physical keys swap meaning in RTL (matching the main-process handler), so the hint shown for
  // "back" in RTL is the physically-right key
  const backShortcut = isMac ? (isRtl ? '⌘]' : '⌘[') : isRtl ? 'Alt+Right' : 'Alt+Left';
  const forwardShortcut = isMac ? (isRtl ? '⌘[' : '⌘]') : isRtl ? 'Alt+Left' : 'Alt+Right';

  const renderSplitButton = (direction: 'back' | 'forward') => {
    const isBack = direction === 'back';
    const enabled = isBack ? canGoBack : canGoForward;
    const items = isBack ? backItems : forwardItems;
    const tooltip = isBack ? backLocalized : forwardLocalized;
    const listAriaLabel = isBack ? backListLocalized : forwardListLocalized;
    const shortcut = isBack ? backShortcut : forwardShortcut;
    // Arrow glyphs mirror in RTL (like Paratext 9's RightToLeftAutoMirrorImage)
    const showLeftArrow = isBack !== isRtl;

    return (
      <ButtonGroup>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label={tooltip}
                data-testid={`navigation-history-${direction}-button`}
                className={className}
                size="icon"
                variant={variant}
                disabled={!enabled}
                onClick={() => onNavigate(isBack ? -1 : 1)}
              >
                {showLeftArrow ? <ArrowLeft /> : <ArrowRight />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {tooltip}
                {showKeyboardShortcuts && (
                  <>
                    {' '}
                    <Kbd>{shortcut}</Kbd>
                  </>
                )}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label={listAriaLabel}
              data-testid={`navigation-history-${direction}-menu-trigger`}
              className={className}
              size="icon"
              variant={variant}
              disabled={items.length === 0}
            >
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {items.map((item) => (
              <DropdownMenuItem key={item.offset} onSelect={() => onNavigate(item.offset)}>
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    );
  };

  // In RTL the pair mirrors position: forward renders first so back sits on the right
  const first = isRtl ? 'forward' : 'back';
  const second = isRtl ? 'back' : 'forward';

  return (
    <div className="tw:flex tw:items-center tw:gap-1" data-testid="navigation-history-buttons">
      {renderSplitButton(first)}
      {renderSplitButton(second)}
    </div>
  );
}

export default NavigationHistoryButtons;
```

Note for the implementer: check how `ButtonGroup` renders adjacent buttons in this codebase (`button-group.tsx`); if the icon-size classes need adjusting to match toolbar height (the toolbar Home button uses `tw:h-8`), tune `className` defaults — the container passes sizing in Task 8.

- [ ] **Step 4: Run test to verify it passes**

Run the same test command as Step 2.
Expected: PASS. If the RTL-order test fails on the `querySelectorAll` order, verify the DOM order actually flips (that is the required behavior — fix the component, not the test).

- [ ] **Step 5: Add the Storybook story**

Create `navigation-history-buttons.stories.tsx` (model on a neighboring advanced component story for the meta shape):

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavigationHistoryButtons,
  NavigationHistoryButtonsProps,
} from './navigation-history-buttons.component';

const meta: Meta<typeof NavigationHistoryButtons> = {
  title: 'Advanced/NavigationHistoryButtons',
  component: NavigationHistoryButtons,
  tags: ['autodocs', 'test'],
};

export default meta;
type Story = StoryObj<typeof NavigationHistoryButtons>;

const baseProps: NavigationHistoryButtonsProps = {
  canGoBack: true,
  canGoForward: true,
  backItems: [
    { label: 'Genesis 1:1', offset: -1 },
    { label: 'Exodus 5:1', offset: -2 },
    { label: 'Mark 4:1', offset: -3 },
  ],
  forwardItems: [{ label: 'Luke 2:1', offset: 1 }],
  onNavigate: (offset) => console.log(`navigate ${offset}`),
  localizedStrings: {
    '%navigationHistory_back_tooltip%': 'Go back one reference',
    '%navigationHistory_forward_tooltip%': 'Go forward one reference',
    '%navigationHistory_backList_ariaLabel%': 'Back history',
    '%navigationHistory_forwardList_ariaLabel%': 'Forward history',
  },
};

export const Default: Story = { args: baseProps };

export const Empty: Story = {
  args: { ...baseProps, canGoBack: false, canGoForward: false, backItems: [], forwardItems: [] },
};
```

(Check the import path other stories in `lib/platform-bible-react` use for `Meta`/`StoryObj` — if they import from `@storybook/react`, match them.)

- [ ] **Step 6: Export from experimental**

In `lib/platform-bible-react/src/experimental.ts`, add:

```ts
export {
  default as NavigationHistoryButtons,
  NAVIGATION_HISTORY_BUTTONS_STRING_KEYS,
  type NavigationHistoryButtonsProps,
  type NavigationHistoryButtonsLocalizedStrings,
  type NavigationHistoryItem,
} from './components/advanced/navigation-history-buttons/navigation-history-buttons.component';
```

- [ ] **Step 7: Lint, typecheck, rebuild lib, commit**

Run: `npm run typecheck && npm run lint && npm test -- navigation-history-buttons`
Expected: PASS.

```bash
git add lib/platform-bible-react/src/components/advanced/navigation-history-buttons/ lib/platform-bible-react/src/experimental.ts
git commit -m "feat(PT-4035): add NavigationHistoryButtons experimental component"
```

---

### Task 8: Renderer container + toolbar wiring + localized strings

**Files:**

- Create: `src/renderer/components/reference-history-buttons.component.tsx`
- Modify: `src/renderer/components/platform-bible-toolbar.tsx`
- Modify: `assets/localization/en.json`

- [ ] **Step 1: Add the localized strings**

In `assets/localization/en.json` (keys are sorted alphabetically — insert in order):

```json
  "%navigationHistory_backList_ariaLabel%": "Back history",
  "%navigationHistory_back_tooltip%": "Go back one reference",
  "%navigationHistory_forwardList_ariaLabel%": "Forward history",
  "%navigationHistory_forward_tooltip%": "Go forward one reference",
```

- [ ] **Step 2: Create the container**

Create `src/renderer/components/reference-history-buttons.component.tsx`:

```tsx
import {
  getReferenceHistorySync,
  navigateReferenceHistorySync,
  onDidChangeReferenceHistory,
} from '@renderer/services/scroll-group.service-host';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { ReferenceHistory } from '@shared/services/scroll-group.service-model';
import { formatScrRef, ScrollGroupId } from 'platform-bible-utils';
import {
  NAVIGATION_HISTORY_BUTTONS_STRING_KEYS,
  NavigationHistoryButtons,
  NavigationHistoryItem,
} from 'platform-bible-react/experimental';
import { useCallback, useEffect, useMemo, useState } from 'react';

const LOCALIZED_STRING_KEYS = [...NAVIGATION_HISTORY_BUTTONS_STRING_KEYS];

/**
 * Toolbar back/forward reference-history buttons wired to the scroll group service. Labels use
 * `formatScrRef(_, 'English')` to match the adjacent BookChapterControl's recent-searches
 * rendering.
 */
export function ReferenceHistoryButtons({ scrollGroupId }: { scrollGroupId: ScrollGroupId }) {
  const [history, setHistory] = useState<ReferenceHistory>(() =>
    getReferenceHistorySync(scrollGroupId),
  );
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // Refresh on group change and on history updates for this group
  useEffect(() => {
    setHistory(getReferenceHistorySync(scrollGroupId));
    return onDidChangeReferenceHistory((update) => {
      if (update.scrollGroupId === scrollGroupId) setHistory(update.history);
    });
  }, [scrollGroupId]);

  const backItems: NavigationHistoryItem[] = useMemo(
    () =>
      history.back.slice(1).map((entry, i) => ({
        label: formatScrRef(entry.scrRef, 'English'),
        offset: -(i + 1),
      })),
    [history],
  );
  const forwardItems: NavigationHistoryItem[] = useMemo(
    () =>
      history.forward.map((entry, i) => ({
        label: formatScrRef(entry.scrRef, 'English'),
        offset: i + 1,
      })),
    [history],
  );

  const handleNavigate = useCallback(
    (offset: number) => {
      navigateReferenceHistorySync(scrollGroupId, offset);
    },
    [scrollGroupId],
  );

  return (
    <NavigationHistoryButtons
      canGoBack={history.back.length > 1}
      canGoForward={history.forward.length > 0}
      backItems={backItems}
      forwardItems={forwardItems}
      onNavigate={handleNavigate}
      localizedStrings={localizedStrings}
      className="tw:h-8"
    />
  );
}

export default ReferenceHistoryButtons;
```

Check that `formatScrRef` and `ScrollGroupId` are exported from `platform-bible-utils` root (they are — `lib/platform-bible-utils/src/index.ts`), and that `useLocalizedStrings` import path matches how `platform-bible-toolbar.tsx` imports it (line 6).

- [ ] **Step 3: Wire into the toolbar**

In `src/renderer/components/platform-bible-toolbar.tsx`, import the container and render it immediately BEFORE `<BookChapterControl ...>` (line 395), in both modes (no `isPowerMode` gate):

```tsx
      {typeof scrollGroupId === 'number' && (
        <ReferenceHistoryButtons scrollGroupId={scrollGroupId} />
      )}
      <BookChapterControl
```

(`scrollGroupId` comes from the existing `useScrollGroupScrRef` destructuring at line 97.)

- [ ] **Step 4: Verify existing toolbar tests still pass**

Run: `npm test -- src/renderer/components/platform-bible-toolbar.test.tsx`
Expected: PASS. If the test file's mocks don't cover the scroll-group host's new exports, add to its existing mock of `@renderer/services/scroll-group.service-host` (it already mocks `availableScrollGroupIds`):

```ts
  getReferenceHistorySync: vi.fn(() => ({ back: [], forward: [] })),
  navigateReferenceHistorySync: vi.fn(() => false),
  onDidChangeReferenceHistory: vi.fn(() => vi.fn()),
```

- [ ] **Step 5: Typecheck, lint, full tests, commit**

Run: `npm run typecheck && npm run lint && npm test`
Expected: PASS.

```bash
git add src/renderer/components/reference-history-buttons.component.tsx src/renderer/components/platform-bible-toolbar.tsx assets/localization/en.json
git commit -m "feat(PT-4035): add reference history back/forward buttons to the toolbar"
```

---

### Task 9: Playwright E2E tests

**Files:**

- Create: `e2e-tests/tests/isolated/navigation-history/navigation-history.spec.ts`

Use `cdp.fixture` (per-feature rule — see `e2e-tests/tests/_example/example-feature-render.spec.ts`); drive ONLY via visible UI. Read `e2e-tests/README.md` (if present) and `e2e-tests/tests/isolated/overlay/overlay-helpers.ts` for local run instructions and helper patterns before writing.

- [ ] **Step 1: Write the spec**

```ts
import { test, expect, Page } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

const isMac = process.platform === 'darwin';
const BACK_KEY = isMac ? 'Meta+BracketLeft' : 'Alt+ArrowLeft';
const FORWARD_KEY = isMac ? 'Meta+BracketRight' : 'Alt+ArrowRight';

/** Navigate the top toolbar BCV control to a typed reference (e.g. 'MRK 4') */
async function navigateToRef(mainPage: Page, refText: string) {
  const trigger = mainPage.locator('[aria-label="book-chapter-trigger"]');
  await expect(trigger).toBeVisible({ timeout: 10_000 });
  await trigger.click();
  const commandInput = mainPage.locator('[data-radix-popper-content-wrapper] input');
  await expect(commandInput).toBeVisible({ timeout: 5_000 });
  await commandInput.fill(refText);
  await commandInput.press('Enter');
  await expect(commandInput).not.toBeVisible({ timeout: 5_000 });
}

test.describe('Reference history', () => {
  test('back/forward buttons navigate the visited references', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    const backButton = mainPage.getByTestId('navigation-history-back-button');
    const forwardButton = mainPage.getByTestId('navigation-history-forward-button');
    const bcvTrigger = mainPage.locator('[aria-label="book-chapter-trigger"]');

    await expect(backButton).toBeVisible({ timeout: 10_000 });

    await navigateToRef(mainPage, 'MRK 4');
    await expect(bcvTrigger).toContainText(/Mark 4/i, { timeout: 10_000 });
    await navigateToRef(mainPage, 'LUK 2');
    await expect(bcvTrigger).toContainText(/Luke 2/i, { timeout: 10_000 });

    await expect(backButton).toBeEnabled();
    await backButton.click();
    await expect(bcvTrigger).toContainText(/Mark 4/i, { timeout: 10_000 });

    await expect(forwardButton).toBeEnabled();
    await forwardButton.click();
    await expect(bcvTrigger).toContainText(/Luke 2/i, { timeout: 10_000 });
    await expect(forwardButton).toBeDisabled();
  });

  test('back dropdown jumps multiple steps', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    const bcvTrigger = mainPage.locator('[aria-label="book-chapter-trigger"]');

    await navigateToRef(mainPage, 'GEN 1');
    await navigateToRef(mainPage, 'EXO 5');
    await navigateToRef(mainPage, 'MRK 4');

    await mainPage.getByTestId('navigation-history-back-menu-trigger').click();
    const twoBack = mainPage.getByRole('menuitem', { name: /Genesis 1/i });
    await expect(twoBack).toBeVisible({ timeout: 5_000 });
    await twoBack.click();
    await expect(bcvTrigger).toContainText(/Genesis 1/i, { timeout: 10_000 });

    // The skipped entries are now on the forward stack
    await mainPage.getByTestId('navigation-history-forward-menu-trigger').click();
    await expect(mainPage.getByRole('menuitem', { name: /Exodus 5/i })).toBeVisible({
      timeout: 5_000,
    });
    await mainPage.keyboard.press('Escape');
  });

  test('keyboard shortcuts navigate back and forward', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    const bcvTrigger = mainPage.locator('[aria-label="book-chapter-trigger"]');

    await navigateToRef(mainPage, 'MRK 4');
    await navigateToRef(mainPage, 'LUK 2');

    await mainPage.keyboard.press(BACK_KEY);
    await expect(bcvTrigger).toContainText(/Mark 4/i, { timeout: 10_000 });
    await mainPage.keyboard.press(FORWARD_KEY);
    await expect(bcvTrigger).toContainText(/Luke 2/i, { timeout: 10_000 });
  });
});
```

Implementation notes for this task (adjust to reality, keeping the behavior assertions):

- If `Page` is not re-exported from `cdp.fixture`, import it from `@playwright/test`.
- Verify the BCV trigger accepts typed `MRK 4` + Enter submission by running the app (`./.erb/scripts/refresh.sh`) and testing manually / with the visual-verification skill first; if typed-ref submit needs different interaction (e.g. clicking a chapter cell), update `navigateToRef` accordingly.
- The toolbar's displayed trigger text uses `formatScrRef(scrRef, 'English')` → "Mark 4:1" style; adjust matchers if the actual text differs.
- Because history is per scroll group and tests share one app session, each test navigates fresh references — ordering within a test matters, across tests it doesn't (assertions only check relative behavior).

- [ ] **Step 2: Run the E2E tests locally**

Start the app with CDP: `./.erb/scripts/refresh.sh` (leave running), then:
Run: `npm run test:e2e:isolated -- --grep "Reference history"`
Expected: PASS (3 tests). Iterate on selectors if needed — the behavior assertions are the contract.

- [ ] **Step 3: Commit**

```bash
git add e2e-tests/tests/isolated/navigation-history/
git commit -m "test(PT-4034/PT-4035): add reference history E2E tests"
```

---

### Task 10: Full verification sweep

- [ ] **Step 1: Full quality gate**

Run: `npm run typecheck && npm run lint && npm test`
Expected: all PASS, zero errors.

- [ ] **Step 2: C# tests unaffected (sanity)**

Run: `dotnet test c-sharp-tests/`
Expected: PASS (no C# was touched; this is the repo's pre-commit expectation).

- [ ] **Step 3: Manual verification in the running app**

Use the app-runner and visual-verification skills:

1. Start the app; verify the back/forward buttons render left of the BCV control, back disabled initially.
2. Navigate GEN 1 → EXO 5 → MRK 4 via BCV; back button enables after the first navigation.
3. Click back twice → GEN 1; forward dropdown lists "Exodus 5:1", "Mark 4:1".
4. Press Alt+Left / Alt+Right (or ⌘[ / ⌘] on macOS) → history navigates; verify keys pressed while an editor web view has focus still work (main-process handler sees iframe input).
5. Verse-only navigation within a chapter does NOT add history entries.
6. Toggle `platform.interfaceMode` between `simple` and `power` (Settings) — buttons present and functional in BOTH.
7. RTL spot-check: in DevTools run `localStorage.setItem('layoutDirection', 'rtl')` and reload — button pair mirrors, arrow icons flip, tooltips show swapped shortcut hints, Alt+Left now goes FORWARD.
8. Verify scroll-group isolation in power mode: switch the toolbar scroll group selector to group B, navigate, switch back to A — A's history unchanged.

- [ ] **Step 4: Fix anything found, re-run Step 1, commit fixes**

```bash
git add -A
git commit -m "fix(PT-4034): address issues found in manual verification"
```

(Only if fixes were needed.)
