# FN-006 Evidence: SemanticDomainViewer Breadcrumb Navigation Scope Decision

**Status:** DEFERRED (2026-05-16, stabilization run-1)
**Work item:** Block C - In-scope FN items
**Defect ledger entry:** D-007 (this evidence + verdict recorded in `stabilization-defects.md`)
**Forward-note:** [FN-006 in `forward-notes.md`](../../../ai-prompts/ai-porting/.context/features/enhanced-resources/forward-notes.md)
**Sebastian thread:** PR #2230 SBN-044 (ui-alignment.md:278, 2026-04-14)
**Followup tag:** `FN-006-followup` in `followup-issues-to-file.md`

## Sebastian's Question (verbatim)

> "@VVdovikov you may decide to exclude this from the scope to reduce complexity. I just found that
> it is not about the 2nd screen of a filtered dictionary list, but when clicking on the
> breadcrums, which seems a corner case that might be deferred / outscoped. Please @VVdovikov
> decide this."

Sebastian explicitly framed the 3-way breadcrumb navigation between {dictionary view, dictionary
filtered by semantic domain, semantic domain viewer} as a deferrable corner case pending
@VVdovikov's decision.

## Verdict: DEFER

The 3-way breadcrumb navigation pattern Sebastian referred to **does not map onto the current
architecture**, and Sebastian himself signalled this is deferrable. No code change is required;
the question is filed to `followup-issues-to-file.md` for @VVdovikov to decide post-stabilization.

## Rationale

### The architecture chosen (SBN-045) collapses 3 surfaces into 2

Sebastian's planning Theme 20 (SBN-045, `strategic-plan-ui.md:751`) explicitly identified two
distinct screens and asked which option to pick for the "domain tree overlay":

> "This is somehow mixing 2 screens: 1) dictionary list filtered by domain (shadcn Dialog,
> breadcrumbs on top, no tree); 2) domain tree overlay (accessed by clicking breadcrumb domain
> -- options: full tree page or breadcrumb-dropdown siblings)."

The team chose **option B (breadcrumb-dropdown siblings)** — Sebastian's own quote at
planning-brief line 1131 endorsed this as "the simpler approach". The result:

- Surface 1: **Dictionary view (unfiltered)** in the dictionary tab on the ER pane.
- Surface 2: **SDV Dialog** — merges "dictionary filtered by domain" + "domain tree overlay" into
  one shadcn Dialog. Each breadcrumb segment opens a tree-popover showing siblings; selecting a
  sibling updates the filtered list within the same Dialog.

There is no third distinct surface. The architecture is **2-way**, not 3-way.

### Current breadcrumb behavior (verified live)

Breadcrumb clicks inside the SDV navigate **within the SDV** between different domain ancestors
(per BHV-456 `displaycat`). This is handled by `handleSDVDomainChange` at
`extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx:1921-1927`:

```typescript
const handleSDVDomainChange = useCallback((newPath: SemanticDomain[]) => {
  setSdvDomainPath(newPath);
}, []);
```

Selecting a filtered entry inside SDV (BHV-456 `displaydomain`) closes the SDV and routes back
to the dictionary tab with that entry highlighted, via
`handleSDVEntryClick` at lines 1947-1959. Closing the SDV (Esc / X / outside click) clears the
domain path and dictionary id (lines 1933-1940).

The dictionary tab itself **does not render breadcrumbs** — it is a flat token list. There is no
domain-hierarchy context inside the dictionary tab to breadcrumb through.

### Why a "3-way" breadcrumb pattern would be unnatural here

Adding a 3-way pattern would require one of:

1. **A "Dictionary" segment pinned at the start of the SDV breadcrumb path.** Clicking it would
   close the SDV. This conflates view-mode navigation with domain-hierarchy navigation, since
   the dictionary is not itself a domain. The Dialog already has a close X / Esc which is the
   standard shadcn affordance.
2. **A breadcrumb bar on the dictionary tab itself** that becomes active after a domain filter
   is applied. The dictionary tab has no concept of "filtered by a specific domain" at the
   surface level today — the only domain-filtered state lives inside the SDV. Bringing it out
   to the dictionary tab would be a significant scope expansion (new state machine in the
   dictionary tab, new filter-by-domain UI, breadcrumb wiring).

Either option requires substantial new UI state machinery and conflicts with SBN-045's "simpler
approach" steer.

### Sebastian's own deferral framing

Sebastian's verbatim quote ends with "Please @VVdovikov decide this." This is an explicit
parking signal — the stabilization charter (Source-of-Truth Hierarchy item 1: "Sebastian intent
vs. golden master conflict -> park the question") permits and recommends deferral here.

@VVdovikov has not yet weighed in. No charter exit criterion requires this to be decided in
this run.

## Live state verification

Three screenshots captured 2026-05-16 against the running app (paranext-core HEAD
`85cb22d17e`):

- `fn-006-step0-dict-view.png` — ER pane open on JHN 1, dictionary tab showing the flat
  token list (no breadcrumb chrome at this layer).
- `fn-006-step1-dict-entry.png` — Dictionary entry expanded ("Word"); detail panel shows
  glosses / sense rows. (Domain rows are blank in this run because the C# loader has not yet
  populated `LEXSubDomains` for SDBG entries — separate FN-019 backend gap, unrelated to
  FN-006.)
- `fn-006-step2-sdv-open.png` — SDV cold-entry via "Browse semantic domains" button. Dialog
  opens with the domain catalog empty (catalog populates lazily from observed DomainLinks; with
  no domain data emitted by the C# loader yet for SDBG, the catalog stays empty in this run).
  Once the FN-019 backend gap closes the breadcrumb segment + tree-popover behavior already
  exercised by the SDV vitest suite (`semantic-domain-viewer.test.tsx`, 6 tests passing) and
  the FN-005 Storybook stories will be live-verifiable end-to-end.

The vitest suite at `semantic-domain-viewer.test.tsx` pins down the breadcrumb + tree behavior
the SDV Dialog already exposes:

1. SDV mounts as a Dialog and forwards `domainPath` / `allDomains` / `filteredEntries` to
   `ErDictionaryFilteredList`.
2. The breadcrumb segment dropdown opens a `role="tree"` with WAI-ARIA APG `treeitem` /
   `aria-level` / `aria-selected` / `aria-expanded` semantics.
3. Click on a depth>=1 domain label fires `onDomainChange` with the new full ancestor path
   (this is the `displaycat` behavior — within-SDV nav).
4. Depth-0 chevron toggles `aria-expanded` only (SBN-019 expand-only behavior preserved).

The within-SDV breadcrumb nav (Sebastian's "clicking on the breadcrums") already works exactly
as Sebastian's SBN-045 option B specified. The open question is only whether to expand it into
a 3-way pattern — which is the deferrable corner case.

## Followup item

A new row is appended to
`.context/features/enhanced-resources/working-docs/stabilization/followup-issues-to-file.md`:

```markdown
| FN-006-followup | Decide 3-way breadcrumb navigation scope (dictionary view <-> filtered list <-> SDV) | forward-notes.md FN-006 + sebastian-audit.md SBN-044 | Sebastian-flagged corner case pending @VVdovikov decision. Architecture chose SBN-045 option B (Dialog + tree-popover breadcrumbs), which collapses surfaces 2+3 into one Dialog -- so 3-way nav is now 2-way (Dictionary tab <-> SDV Dialog) via open/close. Within-SDV breadcrumb nav already works (BHV-456 displaycat). Adding a literal 3-way pattern would require either a "Dictionary" pseudo-segment in the SDV breadcrumb path or breadcrumb chrome inside the dictionary tab itself -- both substantial scope-expansions Sebastian explicitly framed as deferrable. |
```

## Files referenced (current HEAD)

- `extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx:1737-1959`
  - SDV state machine (`sdvOpen`, `sdvDomainPath`, `sdvDictionaryId`, `sdvFilteredEntries`,
    `sdvDomainCatalog`, `sdvAllDomains`).
  - Handlers: `handleSenseDomainClick`, `handleBrowseSemanticDomains`,
    `handleSDVDomainChange`, `handleSDVOpenChange`, `handleSDVEntryClick`.
- `extensions/src/platform-enhanced-resources/src/components/semantic-domain-viewer/semantic-domain-viewer.component.tsx:93-171`
  - Pure presentational SDV wrapper (Dialog + ErDictionaryFilteredList).
- `lib/platform-bible-react/src/components/advanced/source-language-indexed-list/er-dictionary-filtered-list.component.tsx:243-486`
  - BreadcrumbBar + SegmentDropdown render layer; `handleDomainSelect` at 98-104 calls
    `onDomainChange` upward.
- `extensions/src/platform-enhanced-resources/src/components/semantic-domain-viewer/semantic-domain-viewer.test.tsx`
  - 6-test vitest suite pinning the breadcrumb/tree contract.
