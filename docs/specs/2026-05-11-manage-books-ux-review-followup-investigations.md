# Manage Books UX Round 2 — Investigations log

**Purpose:** rolling investigation record for the [round-2 design](./2026-05-11-manage-books-ux-review-followup-design.md). Each stage appends its own section before implementation begins, per the per-stage investigation workflow established in §3a of the design doc.

**Process per stage:**

1. **Stage N.0 — Investigate.** Read relevant code; verify spec premises; surface findings + open questions in this file
2. **Checkpoint.** Pause, surface findings to user, wait for go-ahead or correction
3. **Stage N.1+ — Implement.** Per the (possibly revised) plan
4. Update this file's "Decision" subsection with the final call

**Template per stage:**

```markdown
## Stage N — Investigation (YYYY-MM-DD)

### What I looked at

- file:line references read
- behaviors observed (in app, in tests, in PT9 source)

### Findings vs the spec

- ✅ Spec is correct on X
- ⚠️ Spec assumed Y, actual is Z
- ❓ Open question that needs user input

### Proposed deviation from spec (if any)

- ...

### Decision (filled after user checkpoint)

- ...
```

For Stages 5, 6, 7, the investigation also produces a **characterization test** (a small test pinning current observable behavior) committed _before_ the code change. Reference its commit hash in the stage's section.

---

<!-- Stage investigations append below this line, oldest first -->

## Stage 1 — Investigation (2026-05-11)

### What I looked at

- `extensions/src/platform-scripture/src/manage-books-dialog/book-grid.component.tsx:615–624` — pill body with inner `<Checkbox>` (for #46)
- `extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.component.tsx:967–979` — `emitThrownError` (for #36)
- Read-only flow audit:
  - `manage-books-dialog.component.tsx:658–662` — effect that redirects user from a mutating action to `view` when target is read-only
  - `manage-books-dialog.component.tsx:955–959` — `canApply` predicate
  - `manage-books-sidebar.component.tsx:248,290–291` — sidebar disables four mutating sections + surfaces tooltip
- `manage-books-dialog.component.tsx:1660–2096` — overall dialog structure (for #38 placement)
- `manage-books-dialog.component.tsx:1790–1879` — the create-action panel currently inside the action row

### Findings vs the spec

#### #46 — button-in-button

✅ Spec is correct on cause: the `<Checkbox>` body at line 618 is rendered inside the outer `<button>` (line 688 of the same file) and Radix Checkbox renders as a `<button>`. Element is already `aria-hidden tabIndex={-1}`, so swapping to presentational SVG loses nothing semantically.

✅ Spec's fix is the right shape — replace with a presentational visual.

#### #36 — `[object Object]` toast

✅ Spec is correct on the root cause at `emitThrownError`. The fallback `String(e)` returns `"[object Object]"` for non-Error rejections (the C# data provider rejects with structured objects, not `Error` instances).

⚠️ Spec missed a defense-in-depth gap: `canApply` predicate at line 955–959 does NOT check `project.isEditable`. The redirect effect at line 658 switches action to `view` when target is read-only, but there's a brief window during state propagation where:

1. User clicks the action toggle to a mutating action
2. State updates set `action` to e.g. `'create'`
3. The redirect effect schedules but hasn't run yet
4. The Apply button is enabled (selection exists)
5. Click fires `runCreate` → backend rejects → `emitThrownError` → `[object Object]`

So #36's "make sure the toast never shows `[object Object]`" is the must-fix; the read-only sweep is a smaller belt-and-suspenders addition: add `project.isEditable !== false` to `canApply` so Apply is greyed out even mid-redirect-race.

#### #38 — create-mode reposition

✅ Spec is correct: the create-action panel (`Select` for method, info tooltip, reference `<ProjectSelector>`) currently lives inside the action row at line 1790–1879. Target location is between the `<BookGridSelector>` wrapper at line 2053 and the `<footer>` at line 2096.

⚠️ Notable: only the `create` action gets moved per CSV row #11. The parallel `view`/`copy`/`import` panels stay inside the action row. This may look asymmetric — flagging for visual check during smoke. If a reviewer prefers symmetry, we'd extend the move to all four action panels in a follow-up.

### Proposed deviation from spec (if any)

None. All three fixes proceed as designed; the only addition is the `canApply` `isEditable` check (which the spec already implied as "tighten UI-level disablement" but didn't pin to a specific line).

### Decision (filled after user checkpoint)

User has authorized autonomous advancement; proceeding with the implementations as proposed (#46 SVG swap, #36 emitThrownError extraction + `canApply.isEditable`, #38 panel move).
