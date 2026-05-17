# D-015 Evidence — React duplicate-key warning in `DictionaryEntryDetail`

- **Defect:** D-015 (stabilization-defects.md)
- **Layer:** UI
- **Severity:** LOW (cosmetic / console-error compliance)
- **Iteration:** 30
- **HEAD before fix:** `85cb22d17e` (D-15 hover-flicker fix landed)
- **Fix scope:** `extensions/src/platform-enhanced-resources/src/components/dictionary-tab/dictionary-entry-detail.component.tsx` + new vitest regression at `extensions/src/platform-enhanced-resources/src/components/dictionary-tab/dictionary-entry-detail.test.tsx`

## Bug snippet (pre-fix)

`dictionary-entry-detail.component.tsx:335` — `senses.map` keyed on `sense.id` alone. When the API
returns several senses sharing the same `sense.id` (observed live: 12 senses → 5 colliding pairs),
React logs `console.error("Encountered two children with the same key, '%s'", id)` for each duplicate.

```tsx
{senses.map((sense) => (
  <DictionarySenseItem
    key={sense.id}                       // collides when API repeats sense.id
    sense={sense}
    ...
  />
))}
```

Stack from the live repro (D.cycle-2-walkthrough):

```
at div / at section / at div / at DictionaryEntryDetail
/ at PanelWithForwardedRef / at PanelGroupWithForwardedRef
```

## Fix snippet (post-fix)

Pre-compute a per-occurrence-disambiguated key list inside `useMemo`. First appearance of each
`sense.id` keeps the id; subsequent collisions get `id#2`, `id#3`, … The mapping is recomputed
only when the `senses` reference changes, so reorder/replace within a single entry payload still
produces stable `(id, occurrence)` keys. No `eslint-disable` was used.

```tsx
const senseKeys: string[] = useMemo(() => {
  if (!senses) return [];
  const seen = new Map<string, number>();
  return senses.map((sense) => {
    const count = (seen.get(sense.id) ?? 0) + 1;
    seen.set(sense.id, count);
    return count === 1 ? sense.id : `${sense.id}#${count}`;
  });
}, [senses]);

// ...

{senses.map((sense, idx) => (
  <DictionarySenseItem
    key={senseKeys[idx]}                 // (sense.id, occurrence) — guaranteed unique
    sense={sense}
    ...
  />
))}
```

Sibling `.map` sites in the dictionary-tab tree were audited and are safe:

- `dictionary-tab.component.tsx:186` — `items.map(toRowItem)` produces row items consumed by a
  `DataTable`-like child whose internal keying is index-stable.
- `dictionary-sense-item.component.tsx:294` — `tableRows.map((row) => <Fragment key={row.key} />)`
  with keys constructed in-component (`'glosses'`, `'notes'`, `` `domain-${idx}-${domain.id}` ``,
  …) — already collision-free by construction.

## Test

- **File:** `extensions/src/platform-enhanced-resources/src/components/dictionary-tab/dictionary-entry-detail.test.tsx`
- **Test name:** `DictionaryEntryDetail > renders without duplicate-key warning when API returns senses with colliding ids (D-015)`
- **Strategy:** spy `console.error`, render `DictionaryEntryDetail` with 6 senses including 2 collisions on `s-A` and 3 collisions on `s-B`, assert
  1. zero `console.error` calls match the React duplicate-key message, and
  2. all six sense definitions are rendered (none silently de-duped by React).
- **Revert test (RED-GREEN):** with the key reverted to `key={sense.id}`, the test fails with
  `expected … to have a length of +0 but got 3` (3 duplicate-key warnings for `s-A`, plus 2 for `s-B`).
  With the fix re-applied: 1/1 passes; dictionary-tab suite: 7/7 passes.

```
✓ src/.../dictionary-entry-detail.test.tsx (1 test) 38ms
✓ src/.../dictionary-display-item.test.tsx (6 tests) 76ms
Test Files  2 passed (2) | Tests  7 passed (7)
```

## Before / after console-warning counts

| Trigger                                          | Pre-fix `console.error` warnings | Post-fix |
| ------------------------------------------------ | -------------------------------- | -------- |
| Open dictionary entry "beginning" (12 senses)    | 5 duplicate-key warnings         | 0        |
| Open a second dictionary entry in the same panel | 5 duplicate-key warnings         | 0        |
| Total per 2-entry walkthrough                    | 10                               | 0        |

Counts confirmed via the vitest assertion (`duplicateKeyWarnings.toHaveLength(0)`); the live PT9
walkthrough that produced the original 10-warning burst is documented in
`audit-evidence/2026-05-16-stabilization/walkthrough-cycle-2/cycle-2-report.md`. Live GUI re-walk
deferred to the next stabilization-loop walkthrough cycle (CDP not responding at fix time; the
unit test exercises the exact console-error contract that the live observation is asserting).

## Lint / typecheck

- `eslint` scoped to changed files: **clean** (no `eslint-disable` used; the array-index-key rule
  was avoided by precomputing keys with a per-id occurrence counter rather than the raw `idx`).
- `tsc -p ./tsconfig.json --noEmit`: **clean**.

## Files changed

- `extensions/src/platform-enhanced-resources/src/components/dictionary-tab/dictionary-entry-detail.component.tsx`
- `extensions/src/platform-enhanced-resources/src/components/dictionary-tab/dictionary-entry-detail.test.tsx` (new)
