# Comment Filters A — Filter Model and Two Dropdowns Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Frozen record** — written 2026-09-16 against `0f93dc3c34e`. File:line citations reflect the tree
> at that commit. Follow the current files and the named symbols, not these line numbers.

**Goal:** Replace the collapsed filter toolbar and its four orthogonal axes with two explicit inline dropdowns — nine named presets and four Scripture scopes.

**Architecture:** `CommentFilters` becomes a single closed `CommentPreset` union instead of four axes that AND together; `ScopeFilter` grows from two values to four over the selector's existing `granularity` support. Both render as plain always-visible `Select`s in the toolbar, replacing the `Filters` trigger, popover and chips. Everything in this plan is in `extensions/src/legacy-comment-manager/` — **no `platform-bible-react` source changes, so no `dist` rebuild.**

**Tech Stack:** TypeScript, React 19, Tailwind 4 (`tw:` prefix), shadcn/ui `Select`, Vitest, Playwright.

**Design:** [`2026-09-16-comment-filters-revamp-design.md`](./2026-09-16-comment-filters-revamp-design.md)

**Scope boundary:** this is plan **A** of three. Filter persistence is plan B; drafts and a working "Unsaved notes" are plan C. Here, `unsaved` exists in the union and renders as a **disabled** option so the list does not change shape twice.

---

## Conventions for every task

```bash
cd extensions/src/legacy-comment-manager && npx vitest run            # all tests
cd extensions/src/legacy-comment-manager && npx tsc -p ./tsconfig.json --noEmit
```

Component tests need `// @vitest-environment jsdom` on the first line; the extension has no vitest config.

- **Localization:** `en` and `es` are kept at exact parity. Every key added or removed must be done in **both**, and parity verified programmatically in both directions. Nothing enforces this automatically for new keys.
- **Forward-facing comments** (`.claude/rules/code-quality/forward-facing-comments.md`): describe durable behaviour, never narrate the change. No "previously", "used to", "now".
- **No lint/type suppressions** without a justification comment.
- The pre-commit hook runs gitleaks and prettier; never bypass it.
- Do not push.

---

## File Structure

| File | Responsibility | Tasks |
| --- | --- | --- |
| `src/types/legacy-comment-manager.d.ts` | `CommentFilters`, `ScopeFilter` shapes | 1 |
| `src/comment-list-filters.model.ts` | Preset + scope unions, label maps, guards, selector mapping | 1 |
| `src/comment-list-filters.model.test.ts` | Model tests | 1 |
| `contributions/localizedStrings.json` | Option labels, both locales | 2 |
| `src/localized-strings.test.ts` | Key presence + parity | 2 |
| `src/comment-list.component.tsx` | Two inline dropdowns replacing the popover | 3 |
| `src/comment-list.component.test.tsx` | Panel tests | 3 |
| `src/comment-list.web-view.tsx` | Filter state, selector inputs, coercion removal | 4 |
| `src/main.ts` | `openCommentList` scope fallback removal | 4 |
| `src/comment-list-messages.model.ts` | `setFilters` contract | 5 |
| `src/comment-list-web-view-message.util.ts` + test | Message resolution | 5 |
| `src/comment-list.stories.tsx` | Storybook fixture | 6 |
| `e2e-tests/tests/isolated/comments-tab.spec.ts` | E2E locators | 6 |

---

## Task 1: Replace the filter model

The four orthogonal axes (`ResolvedFilter`, `ReadFilter`, `TypeFilter`, `AssignmentFilter`), the `date` and `author` axes, and `resolveEffectiveScopeFilter` all go. One `CommentPreset` union replaces them; `ScopeFilter` grows to four values.

**Files:**
- Modify: `src/types/legacy-comment-manager.d.ts` (the filter-axis region)
- Modify: `src/comment-list-filters.model.ts`
- Modify: `src/comment-list-filters.model.test.ts`

- [ ] **Step 1: Replace the type declarations**

In `src/types/legacy-comment-manager.d.ts`, replace the whole `#region Comment filter axis types` block (the five axis unions plus `CommentFilters` plus `ScopeFilter`) with:

```ts
  /**
   * The named filter presets the comment toolbar offers. A single closed set rather than orthogonal
   * axes: these are the combinations users actually work in, and the axes are not offered
   * separately, so composing them would be unreachable flexibility.
   *
   * `unsaved` is the one preset with no selector clause — a draft is client-side state the data
   * provider has never heard of, so it is applied after the query rather than within it.
   */
  export type CommentPreset =
    | 'all'
    | 'unresolved-assigned-to-me'
    | 'unresolved'
    | 'unread-assigned-to-me'
    | 'unread'
    | 'unread-and-unresolved'
    | 'resolved'
    | 'unsaved'
    | 'conflict';

  /** The comment-filter selection. */
  export type CommentFilters = {
    preset: CommentPreset;
  };

  /**
   * Scripture scope. The three `current-*` values follow the window's scroll-group reference live,
   * and resolve against it whether or not this list follows an editor.
   */
  export type ScopeFilter = 'all-books' | 'current-book' | 'current-chapter' | 'current-verse';
```

- [ ] **Step 2: Write the failing model tests**

Replace the whole body of `src/comment-list-filters.model.test.ts` with:

```ts
import { describe, expect, it } from 'vitest';
import type { CommentPreset, ScopeFilter } from './comment-list-filters.model';
import {
  buildCommentThreadSelector,
  DEFAULT_COMMENT_FILTERS,
  DEFAULT_SCOPE_FILTER,
  isCommentPreset,
  isScopeFilter,
  presetToLabelKey,
  scopeFilterToLabelKey,
} from './comment-list-filters.model';

const scrRef = { book: 'GEN', chapterNum: 3, verseNum: 5 };

function build(preset: CommentPreset, scopeFilter: ScopeFilter = DEFAULT_SCOPE_FILTER) {
  return buildCommentThreadSelector({
    filters: { preset },
    scopeFilter,
    scrRef,
    currentUserName: 'Donna',
  });
}

describe('presets', () => {
  it('contributes nothing at its default', () => {
    expect(DEFAULT_COMMENT_FILTERS).toEqual({ preset: 'all' });
    expect(build('all')).toEqual({});
  });

  it('maps each preset to its selector clauses', () => {
    expect(build('unresolved')).toEqual({ isResolved: false });
    expect(build('resolved')).toEqual({ isResolved: true });
    expect(build('unread')).toEqual({ isRead: false });
    expect(build('unread-and-unresolved')).toEqual({ isRead: false, isResolved: false });
    expect(build('conflict')).toEqual({ type: 'Conflict' });
    expect(build('unresolved-assigned-to-me')).toEqual({
      isResolved: false,
      assignedTo: 'Donna',
    });
    expect(build('unread-assigned-to-me')).toEqual({ isRead: false, assignedTo: 'Donna' });
  });

  it('contributes no selector clause for the unsaved preset', () => {
    // A draft is client-side state; the provider cannot filter on it. The query must therefore be
    // unnarrowed by the preset, leaving the caller to apply the draft rule itself.
    expect(build('unsaved')).toEqual({});
  });

  it('omits assignedTo until the current user name has loaded', () => {
    // An empty assignedTo means "unassigned" to the provider, so filtering on a blank name would
    // silently show the wrong threads rather than none.
    const selector = buildCommentThreadSelector({
      filters: { preset: 'unresolved-assigned-to-me' },
      scopeFilter: DEFAULT_SCOPE_FILTER,
      scrRef,
      currentUserName: '',
    });
    expect(selector).toEqual({ isResolved: false });
  });

  it('has a label key for every preset and rejects anything else', () => {
    expect(Object.keys(presetToLabelKey).every(isCommentPreset)).toBe(true);
    expect(isCommentPreset('unread')).toBe(true);
    expect(isCommentPreset('assigned-to-team')).toBe(false);
  });
});

describe('scope', () => {
  it('contributes nothing at its default', () => {
    expect(DEFAULT_SCOPE_FILTER).toBe('all-books');
    expect(build('all', 'all-books')).toEqual({});
  });

  it('maps each scope to a range at the matching granularity', () => {
    const at = (scope: ScopeFilter) => build('all', scope).scriptureRanges?.[0];
    expect(at('current-book')).toEqual({
      granularity: 'book',
      start: scrRef,
      end: scrRef,
    });
    expect(at('current-chapter')?.granularity).toBe('chapter');
    expect(at('current-verse')?.granularity).toBe('verse');
  });

  it('combines independently with a preset', () => {
    expect(build('unresolved', 'current-verse')).toEqual({
      isResolved: false,
      scriptureRanges: [{ granularity: 'verse', start: scrRef, end: scrRef }],
    });
  });

  it('has a label key for every scope and rejects anything else', () => {
    expect(Object.keys(scopeFilterToLabelKey).every(isScopeFilter)).toBe(true);
    expect(isScopeFilter('current-verse')).toBe(true);
    expect(isScopeFilter('unfiltered')).toBe(false);
  });
});
```

- [ ] **Step 3: Run and watch it fail**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run src/comment-list-filters.model.test.ts
```

Expected: FAIL — the new exports do not exist. Report the actual output.

- [ ] **Step 4: Rewrite the model**

Replace everything in `src/comment-list-filters.model.ts` from the `// --- Scope axis` comment to the end of `applyFilterOverrides` with the following, keeping the file's existing imports (adjusting the imported type names) and keeping `TEAM_ASSIGNED_USER` / `UNASSIGNED_USER` only if something still references them — if nothing does, delete them too:

```ts
// --- Preset axis (the named filter combinations the toolbar offers) ---

export const presetToLabelKey = {
  all: '%comment_filter_preset_all%',
  'unresolved-assigned-to-me': '%comment_filter_preset_unresolved_assigned_to_me%',
  unresolved: '%comment_filter_preset_unresolved%',
  'unread-assigned-to-me': '%comment_filter_preset_unread_assigned_to_me%',
  unread: '%comment_filter_preset_unread%',
  'unread-and-unresolved': '%comment_filter_preset_unread_and_unresolved%',
  resolved: '%comment_filter_preset_resolved%',
  unsaved: '%comment_filter_preset_unsaved%',
  conflict: '%comment_filter_preset_conflict%',
} as const satisfies Record<CommentPreset, LocalizeKey>;

export function isCommentPreset(value: string): value is CommentPreset {
  return Object.hasOwn(presetToLabelKey, value);
}

export const DEFAULT_COMMENT_FILTERS: CommentFilters = { preset: 'all' };

// --- Scope axis (how much Scripture the list covers) ---

export const DEFAULT_SCOPE_FILTER: ScopeFilter = 'all-books';

export const scopeFilterToLabelKey = {
  'all-books': '%comment_filter_scope_all_books%',
  'current-book': '%comment_filter_scope_current_book%',
  'current-chapter': '%comment_filter_scope_current_chapter%',
  'current-verse': '%comment_filter_scope_current_verse%',
} as const satisfies Record<ScopeFilter, LocalizeKey>;

export function isScopeFilter(value: string): value is ScopeFilter {
  return Object.hasOwn(scopeFilterToLabelKey, value);
}

/** The Scripture-range granularity each scope queries at; `all-books` queries no range at all. */
const scopeToGranularity = {
  'current-book': 'book',
  'current-chapter': 'chapter',
  'current-verse': 'verse',
} as const satisfies Record<Exclude<ScopeFilter, 'all-books'>, 'book' | 'chapter' | 'verse'>;

/** True when the preset is at its default, i.e. no preset filtering is applied. */
export function areCommentFiltersAtDefault(filters: CommentFilters): boolean {
  return filters.preset === DEFAULT_COMMENT_FILTERS.preset;
}

/**
 * Applies a partial filter override onto {@link DEFAULT_COMMENT_FILTERS}. An axis absent from
 * `overrides` is reset to its default rather than merged with a prior selection, so a programmatic
 * open shows exactly the requested view.
 */
export function applyFilterOverrides(overrides?: Partial<CommentFilters>): CommentFilters {
  // Built from the known axes rather than spread, so a present-but-nullish axis surviving the JSON
  // bus resets to its default instead of leaking a null. A new axis is a compile error here, which
  // is the intended safety net.
  return { preset: overrides?.preset ?? DEFAULT_COMMENT_FILTERS.preset };
}

/**
 * Builds the comment-thread query from the current selections. The preset and the scope contribute
 * independently and AND together.
 */
export function buildCommentThreadSelector({
  filters,
  scopeFilter,
  scrRef,
  currentUserName,
}: {
  filters: CommentFilters;
  scopeFilter: ScopeFilter;
  scrRef: { book: string; chapterNum: number; verseNum: number };
  currentUserName: string;
}): LegacyCommentThreadSelector {
  const selector: LegacyCommentThreadSelector = {};

  // Scope
  if (scopeFilter !== 'all-books') {
    selector.scriptureRanges = [
      { granularity: scopeToGranularity[scopeFilter], start: scrRef, end: scrRef },
    ];
  }

  // Preset. `unsaved` deliberately contributes nothing: a draft is client-side state, so the caller
  // applies that rule to the result rather than the provider applying it to the query.
  switch (filters.preset) {
    case 'unresolved':
      selector.isResolved = false;
      break;
    case 'resolved':
      selector.isResolved = true;
      break;
    case 'unread':
      selector.isRead = false;
      break;
    case 'unread-and-unresolved':
      selector.isRead = false;
      selector.isResolved = false;
      break;
    case 'conflict':
      selector.type = 'Conflict';
      break;
    case 'unresolved-assigned-to-me':
      selector.isResolved = false;
      // Only filter once the name has loaded: an empty assignedTo means "unassigned" to the
      // provider, which would silently show the wrong threads rather than none.
      if (currentUserName) selector.assignedTo = currentUserName;
      break;
    case 'unread-assigned-to-me':
      selector.isRead = false;
      if (currentUserName) selector.assignedTo = currentUserName;
      break;
    case 'all':
    case 'unsaved':
    default:
      break;
  }

  return selector;
}
```

Update the file's `import type { … } from 'legacy-comment-manager'` and its `export type { … }` block to carry `CommentPreset`, `CommentFilters` and `ScopeFilter`, dropping the four removed axis types. Delete `UNFILTERED`, `SCOPE_FILTER_CURRENT_CHAPTER`, `resolveEffectiveScopeFilter`, `DatePresetFilter`, `datePresetFilterToLabelKey`, `isDatePresetFilter`, `DATE_PRESET_DAYS_BACK`, `resolveDatePresetFilter`, `AUTHOR_FILTER_ALL` and `toAuthorOptions`.

- [ ] **Step 5: Run and watch it pass**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run src/comment-list-filters.model.test.ts
```

Expected: PASS. Other suites will now fail to compile — that is expected and is fixed in tasks 3-6. Do not fix them here.

- [ ] **Step 6: Prove the tests bite**

Change `case 'unread-and-unresolved'` to set only `isRead`. Confirm the per-preset test FAILS naming that preset, then revert. Report the actual failing output.

- [ ] **Step 7: Commit**

```bash
git add extensions/src/legacy-comment-manager/src/comment-list-filters.model.ts \
        extensions/src/legacy-comment-manager/src/comment-list-filters.model.test.ts \
        extensions/src/legacy-comment-manager/src/types/legacy-comment-manager.d.ts
git commit -m "feat(comments): replace the filter axes with named presets

Four orthogonal axes that AND together made the presets users work in
reachable only by composition. One closed preset union offers them
directly, and scope grows from two values to four over the granularity the
selector already accepts.

The unsaved preset contributes no selector clause: a draft is client-side
state the data provider has never heard of.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Localization

Thirty-eight `%comment_filter_*%` keys exist today. Most describe axes that no longer exist.

**Files:**
- Modify: `contributions/localizedStrings.json`
- Modify: `src/localized-strings.test.ts`

- [ ] **Step 1: Replace the filter keys in both locales**

Remove every `%comment_filter_*%` key **except** `%comment_filter_scope_all_books%` and `%comment_filter_scope_current_chapter%`, which are reused. Add, in both `en` and `es`, inserted beside the surviving scope keys rather than reordering the file:

| Key | en | es |
| --- | --- | --- |
| `%comment_filter_aria_preset%` | Filter comments | Filtrar comentarios |
| `%comment_filter_aria_scope%` | Filter by scope | Filtrar por alcance |
| `%comment_filter_preset_all%` | All notes | Todas las notas |
| `%comment_filter_preset_unresolved_assigned_to_me%` | Unresolved notes assigned to me | Notas sin resolver asignadas a mí |
| `%comment_filter_preset_unresolved%` | Unresolved | Sin resolver |
| `%comment_filter_preset_unread_assigned_to_me%` | Unread notes assigned to me | Notas sin leer asignadas a mí |
| `%comment_filter_preset_unread%` | Unread | Sin leer |
| `%comment_filter_preset_unread_and_unresolved%` | Unread and unresolved | Sin leer y sin resolver |
| `%comment_filter_preset_resolved%` | Resolved | Resueltas |
| `%comment_filter_preset_unsaved%` | Unsaved notes | Notas sin guardar |
| `%comment_filter_preset_conflict%` | Conflict | Conflicto |
| `%comment_filter_scope_current_book%` | Current book | Libro actual |
| `%comment_filter_scope_current_verse%` | Current verse | Versículo actual |

`%comment_filter_aria_scope%` already exists with these values — keep it rather than re-adding.

- [ ] **Step 2: Verify parity programmatically**

```bash
cd extensions/src/legacy-comment-manager && python3 -c "
import json
d = json.load(open('contributions/localizedStrings.json'))['localizedStrings']
print('en=%d es=%d' % (len(d['en']), len(d['es'])))
print('en-only:', sorted(set(d['en']) - set(d['es'])) or 'none')
print('es-only:', sorted(set(d['es']) - set(d['en'])) or 'none')
"
```

Expected: equal counts, `none` both directions. Report the actual numbers.

- [ ] **Step 3: Point the string test at the real key list**

In `src/localized-strings.test.ts`, replace the hand-copied `COMMENT_FILTER_KEYS` array with a derivation from the panel's own list, so the test cannot drift from what the component requests:

```ts
import { COMMENT_LIST_PANEL_EXTRA_STRING_KEYS } from './comment-list.component';

const COMMENT_FILTER_KEYS = COMMENT_LIST_PANEL_EXTRA_STRING_KEYS.filter((key) =>
  key.startsWith('%comment_filter_'),
);
```

Keep the existing non-empty-in-both-languages assertion. Delete the separate parity assertion it subsumes — a key non-empty in both languages is necessarily present in both.

- [ ] **Step 4: Run and commit**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run src/localized-strings.test.ts
```

```bash
git add extensions/src/legacy-comment-manager/contributions/localizedStrings.json \
        extensions/src/legacy-comment-manager/src/localized-strings.test.ts
git commit -m "feat(comments): replace the filter strings for the preset model

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Two explicit dropdowns

The `Filters` trigger, its popover, the chips and the whole axis-table apparatus are replaced by two `Select`s rendered directly in the toolbar.

**Files:**
- Modify: `src/comment-list.component.tsx`
- Modify: `src/comment-list.component.test.tsx`

- [ ] **Step 1: Write the failing panel tests**

Replace the filter-related tests in `src/comment-list.component.test.tsx` with:

```tsx
it('renders the preset and scope dropdowns directly in the toolbar', () => {
  renderPanel();
  expect(screen.getByRole('combobox', { name: PRESET_ARIA })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: SCOPE_ARIA })).toBeInTheDocument();
  // No collapsed trigger: the options are visible without opening anything.
  expect(screen.queryByRole('button', { name: /filters/i })).not.toBeInTheDocument();
});

it('shows the current selection as each dropdown’s value', () => {
  renderPanel({ filters: { preset: 'unread' }, scopeFilter: 'current-verse' });
  expect(screen.getByRole('combobox', { name: PRESET_ARIA })).toHaveTextContent('Unread');
  expect(screen.getByRole('combobox', { name: SCOPE_ARIA })).toHaveTextContent('Current verse');
});

it('reports a preset change through onFiltersChange', async () => {
  const onFiltersChange = vi.fn();
  renderPanel({ onFiltersChange });

  await userEvent.click(screen.getByRole('combobox', { name: PRESET_ARIA }));
  await userEvent.click(screen.getByRole('option', { name: 'Resolved' }));

  expect(onFiltersChange).toHaveBeenCalledWith({ preset: 'resolved' });
});

it('offers every scope unconditionally, with no editor-dependent hiding', () => {
  renderPanel();
  // All four are always offered; a list that follows no editor resolves the current-* options
  // against the window's scroll group rather than hiding them.
  expect(screen.getByRole('combobox', { name: SCOPE_ARIA })).toBeInTheDocument();
});

it('disables the unsaved preset until draft tracking exists', async () => {
  renderPanel();
  await userEvent.click(screen.getByRole('combobox', { name: PRESET_ARIA }));
  expect(screen.getByRole('option', { name: 'Unsaved notes' })).toHaveAttribute(
    'aria-disabled',
    'true',
  );
});
```

Extend the file's `STRINGS` fixture with real values for every key these assertions read, and define `PRESET_ARIA = 'Filter comments'` / `SCOPE_ARIA = 'Filter by scope'`. The file already stubs `ResizeObserver` and the pointer-capture methods jsdom lacks — keep those; Radix `Select` needs them to open.

- [ ] **Step 2: Run and watch it fail**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run src/comment-list.component.test.tsx
```

- [ ] **Step 3: Rewrite the toolbar**

In `src/comment-list.component.tsx`, delete `FilterAxisRow`, `AuthorFilterDropdown`, `closedAxis`, `ClosedAxisDefinition`, `CLOSED_AXES_BY_KEY`, `CLOSED_AXES`, `FilterChip`, `buildFilterChips`, the `filtersPopoverContentEl` state and the `PopoverPortalContainerProvider` wrapper, and the `canScopeToCurrentChapter` prop. Keep `FilterDropdown`, restoring its trigger to `tw:w-auto tw:min-w-32` (it is back in a flex row, so it needs the floor that stops it collapsing), and drop its now-unused `hiddenValues` prop.

Replace the toolbar block with:

```tsx
        <div className="tw:border-b tw:bg-background tw:flex tw:flex-row tw:flex-wrap tw:gap-1 tw:items-center tw:pb-2 tw:px-4 tw:pt-4">
          <FilterDropdown
            value={filters.preset}
            labelKeys={presetToLabelKey}
            isValue={isCommentPreset}
            onChange={(preset) => onFiltersChange({ preset })}
            localizedStrings={localizedStrings}
            ariaLabel={localizedStrings['%comment_filter_aria_preset%']}
            disabledValues={DISABLED_PRESETS}
            testId="comment-preset-filter"
          />
          <FilterDropdown
            value={scopeFilter}
            labelKeys={scopeFilterToLabelKey}
            isValue={isScopeFilter}
            onChange={onScopeFilterChange}
            localizedStrings={localizedStrings}
            ariaLabel={localizedStrings['%comment_filter_aria_scope%']}
            testId="comment-scope-filter"
          />
        </div>
```

Add a `disabledValues?: readonly T[]` prop to `FilterDropdown` that sets `disabled` on the matching `SelectItem`, and above the component:

```tsx
/**
 * Presets the toolbar offers but cannot yet honour. `unsaved` needs draft tracking that does not
 * exist; it is shown disabled rather than omitted so the option list does not change shape when it
 * starts working.
 */
const DISABLED_PRESETS = ['unsaved'] as const satisfies readonly CommentPreset[];
```

Update `COMMENT_LIST_PANEL_EXTRA_STRING_KEYS` to exactly the keys the panel now reads, and keep `testId="comment-scope-filter"` — an E2E test depends on it.

- [ ] **Step 4: Run and watch it pass, then prove a test bites**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run src/comment-list.component.test.tsx
```

Then remove `disabledValues={DISABLED_PRESETS}` and confirm the disabled-preset test FAILS; revert. Report the actual failing output.

- [ ] **Step 5: Commit**

```bash
git add extensions/src/legacy-comment-manager/src/comment-list.component.tsx \
        extensions/src/legacy-comment-manager/src/comment-list.component.test.tsx
git commit -m "feat(comments): show the preset and scope filters as inline dropdowns

Replaces the collapsed Filters trigger, its popover and the active-filter
chips with two always-visible Selects. With two axes instead of five the
toolbar fits on one row, so the indirection the collapse existed to avoid
is no longer needed.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Web view wiring and coercion removal

**Files:**
- Modify: `src/comment-list.web-view.tsx`
- Modify: `src/main.ts`

- [ ] **Step 1: Update the web view**

- Replace the `filters`/`scopeFilter` state types with the new shapes, defaulting to `DEFAULT_COMMENT_FILTERS` and `DEFAULT_SCOPE_FILTER`.
- Delete `canScopeToCurrentChapter`, `effectiveScopeFilter` and the `resolveEffectiveScopeFilter` import; pass `scopeFilter` straight through.
- Replace `isAwaitingCurrentUserName`'s axis check with the two presets that need a name:

```tsx
  // These presets filter on the current user, and an empty assignedTo means "unassigned" to the
  // provider — so hold the loading state rather than querying with a blank name.
  const isAwaitingCurrentUserName =
    (filters.preset === 'unresolved-assigned-to-me' ||
      filters.preset === 'unread-assigned-to-me') &&
    !currentUserName;
```

- The selector memo currently freezes `scrRef` inputs to constants unless the chapter scope is active, to avoid re-subscribing on every verse move. Widen that to all three `current-*` scopes, passing the full `scrRef` (book, chapter **and verse**) when any of them is active and frozen constants otherwise. Verse scope needs `verseNum`, which the current code hardcodes to `0`.
- Stop passing `canScopeToCurrentChapter` to `CommentListPanel`.

- [ ] **Step 2: Remove the second coercion in `main.ts`**

`openCommentList` separately drops a `current-chapter` scope for cross-project targets. Delete that fallback, its `logger.warn` and the `editorContextApplies` check that exists only to drive it, so the open command and the panel agree that all four scopes are always valid.

- [ ] **Step 3: Verify**

```bash
cd extensions/src/legacy-comment-manager && npx tsc -p ./tsconfig.json --noEmit && npx vitest run
```

Report actual output. Failures in the message-util and stories files are expected here and are fixed in tasks 5 and 6.

- [ ] **Step 4: Commit**

```bash
git add extensions/src/legacy-comment-manager/src/comment-list.web-view.tsx \
        extensions/src/legacy-comment-manager/src/main.ts
git commit -m "feat(comments): drop the scope coercion and wire the preset filter

All four scopes are always offered. The current-* options resolve against
the window's scroll group, which always holds a position, so a list that
follows no editor scopes to the window's location rather than having the
option withheld.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: The `setFilters` message contract

`setFilters` is a public-ish surface: `openCommentList` sends one on every open, and the Send/Receive conflict link uses it.

**Files:**
- Modify: `src/comment-list-messages.model.ts`
- Modify: `src/comment-list-web-view-message.util.ts` and its test

- [ ] **Step 1: Update the contract**

`CommentListMessageSetFilters` keeps its shape — `filters?: Partial<CommentFilters>` and `scopeFilter?: ScopeFilter` — and now carries the new types automatically. Update its doc comment to describe presets rather than axes.

- [ ] **Step 2: Update the resolution util and its tests**

`comment-list-web-view-message.util.ts` decides whether a `setFilters` message is a real change. Update its comparisons for the single `preset` field and the renamed scope default (`'all-books'`, not `UNFILTERED`). In its test, replace axis-shaped fixtures with preset-shaped ones, keeping the existing behaviour that an omitted axis resets to its default rather than merging.

- [ ] **Step 3: Run and commit**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run src/comment-list-web-view-message.util.test.ts
```

```bash
git add extensions/src/legacy-comment-manager/src/comment-list-messages.model.ts \
        extensions/src/legacy-comment-manager/src/comment-list-web-view-message.util.ts \
        extensions/src/legacy-comment-manager/src/comment-list-web-view-message.util.test.ts
git commit -m "feat(comments): carry presets through the setFilters message

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Stories, E2E, and full verification

**Files:**
- Modify: `src/comment-list.stories.tsx`
- Modify: `e2e-tests/tests/isolated/comments-tab.spec.ts`

- [ ] **Step 1: Update the story fixture**

`comment-list.stories.tsx` holds `useState<CommentFilters>` with an axis-shaped initial value. Replace it with `DEFAULT_COMMENT_FILTERS` and the scope with `DEFAULT_SCOPE_FILTER`.

- [ ] **Step 2: Update the E2E spec**

Three specs currently open a Filters popover before reaching an axis control. The controls are inline again, so delete every `comment-filters-trigger` click and the comments explaining the popover, and locate the dropdowns directly:

- the "toolbar stays visible" spec goes back to `[data-testid="comment-preset-filter"]` as its visibility proxy;
- the keyboard spec drives `[data-testid="comment-preset-filter"]` directly with no popover step;
- the scope spec finds `[data-testid="comment-scope-filter"]` without opening anything, and asserts the option list now contains **Current book**, **Current chapter**, **Current verse** and **All books**.

Keep the `waitForOverlayGone` calls around every pointer action and the false-green guard in the scroll spec.

- [ ] **Step 3: Run everything**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run && npx tsc -p ./tsconfig.json --noEmit
cd /home/mgetgen/repos/paranext/paranext-core && npm run typecheck:e2e
```

Expected: all green. Report actual numbers.

- [ ] **Step 4: Run the E2E spec under a bare Xvfb**

The isolated suite launches its own Electron and inherits `DISPLAY`. On a windowed desktop a window manager resizes the window and the fixture correctly refuses to run layout-sensitive assertions. Stop any running app first — the suite's globalSetup refuses to start while port 8876 is bound.

```bash
cd /home/mgetgen/repos/paranext/paranext-core && npm stop
xvfb-run -n 105 -s "-screen 0 1920x1080x24" npx playwright test \
  --config e2e-tests/playwright.config.ts --project=isolated \
  tests/isolated/comments-tab.spec.ts --reporter=list --retries=0
```

Report the actual result. If a test fails, read the FIRST failure — a worker death cascades and the later "did not run" entries are downstream of it.

- [ ] **Step 5: Commit**

```bash
git add extensions/src/legacy-comment-manager/src/comment-list.stories.tsx \
        e2e-tests/tests/isolated/comments-tab.spec.ts
git commit -m "test(comments): locate the inline filter dropdowns directly

The axis controls are no longer behind a popover, so the specs find them
in the toolbar and the scope spec asserts all four scopes are offered.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Deliberately not in this plan

- **Filter persistence** — plan B. Filters stay in `useState`/`useWebViewState` as today.
- **Drafts and a working "Unsaved notes"** — plan C. The preset renders disabled here.
- **Date and author filters** — deleted from the UI and the model. The backend keeps supporting
  `dateFilter` and `author`; nothing surfaces them.
- **`platform-bible-react` changes** — none, so no `dist` rebuild. If a task appears to need one,
  stop and report: it means the work has strayed outside this plan.

## Verification that this plan is complete

The design's testing section lists eight behaviours. This plan covers 1 (preset→selector), 2 (scope→
granularity, and the live scroll-group wiring in task 4) and 7 (no coercion). Items 3, 4, 5, 6 and 8
concern drafts and persistence and belong to plans B and C.
