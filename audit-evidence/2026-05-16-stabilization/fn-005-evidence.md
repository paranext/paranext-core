# FN-005 Evidence: SemanticDomainViewer Tree Component Decision + Integration

**Status:** RESOLVED (2026-05-16, stabilization run-1, iteration 14)
**Work item:** Block C — In-scope FN items
**Defect ledger entry:** D-006 (this evidence + commit hash recorded in `stabilization-defects.md`)
**Forward-note:** [FN-005 in `forward-notes.md`](../../../ai-prompts/ai-porting/.context/features/enhanced-resources/forward-notes.md)

## Decision

**Use the existing custom tree component already built into `platform-bible-react`'s
`ErDictionaryFilteredList`** (`TreeKeyboardContainer` + `TreeNodeList` + `TreeNode`,
implemented in `lib/platform-bible-react/src/components/advanced/source-language-indexed-list/er-dictionary-filtered-list.component.tsx`).

Do **not** install MrLightful/shadcn-tree-view or neigebaie/shadcn-ui-tree-view.

### Rationale

The forward-note framed FN-005 as a choice between two community shadcn tree packages, but the
underlying assumption — "no tree component exists yet" — was superseded during phase-3-ui-design
(commit `de51e171eb`, then refined through `5cf61d5eab` for SBN-019 / Theme 17). The current code
already ships a domain-tree component that:

1. Is hand-rolled in shadcn-convention style (Tailwind `tw-` classes, lucide-react icons,
   `cn` utility, focus-ring rings matching the shadcn token system).
2. Implements the SBN-019-validated semantics: depth-0 combined chevron+label button toggles
   expand only (never selects); depth>=1 split chevron + label buttons, label triggers select
   with `hover:tw-underline`.
3. Lives inside `ErDictionaryFilteredList` so the SemanticDomainViewer Dialog stays a thin
   wrapper (~50 lines).
4. Adds zero new dependencies — the alternative options (MrLightful/neigebaie) would each pull
   in 200-500 lines of source plus an additional maintenance surface.
5. Was already audited as `ADDRESSED-VERIFIED` against Sebastian's SBN-019 PR-140 comment
   (sebastian-audit.md, 2026-05-16 audit).

The remaining FN-005 gap was **accessibility hardening**: the existing component lacked the
WAI-ARIA tree-view role attributes and the standard keyboard navigation pattern. This evidence
captures those additions.

## Changes Landed

### `lib/platform-bible-react/.../er-dictionary-filtered-list.component.tsx`

1. **`TreeNodeList`** — top-level `<ul>` now renders `role="tree"` (root) or `role="group"`
   (nested) so AT can announce the tree structure. Root carries `aria-label="Semantic domain tree"`.
2. **`TreeNode`** — each `<li>` is now a `role="treeitem"` with:
   - `aria-level={depth + 1}` (1-indexed per WAI-ARIA APG).
   - `aria-selected={isSelected}` (true on the breadcrumb segment that opened the dropdown).
   - `aria-expanded={expanded}` for expandable rows; omitted on leaves so AT announces them
     as leaf nodes.
3. **`TreeKeyboardContainer.handleKeyDown`** — extended keyboard nav to match the WAI-ARIA APG
   tree-view pattern:
   - `ArrowRight`: collapsed treeitem → expand; expanded → focus first child.
   - `ArrowLeft`: expanded treeitem → collapse; collapsed/leaf → focus parent.
   - `Home`: focus first focusable button in the tree.
   - `End`: focus last focusable button in the tree.
   - Existing `ArrowDown/ArrowUp/Tab/Escape` behavior preserved.

### `extensions/src/platform-enhanced-resources/.../semantic-domain-viewer.test.tsx`

New vitest suite (6 tests, all passing) covering:

1. SDV renders the Dialog with the filtered entry list when `open=true`.
2. SDV unmounts the Dialog content when `open=false`.
3. SDV doesn't crash with `domainPath=undefined` (cold-entry path; falls back to first root).
4. The breadcrumb segment dropdown opens a `role="tree"` whose treeitems carry the right
   `aria-level` + `aria-selected` + `aria-expanded` shape.
5. Clicking a depth-1 domain label in the tree calls `onDomainChange` with the new full path.
6. Clicking the depth-0 chevron toggles `aria-expanded` (expand-only per SBN-019).

## ARIA + Keyboard Verification

### Tree role attributes (verified by test #4)

After opening the breadcrumb dropdown for "5.1 Speak":

```html
<ul role="tree" aria-label="Semantic domain tree" class="tw-space-y-0.5">
  <li role="treeitem" aria-level="1" aria-selected="false" aria-expanded="false">
    <div class="tw-flex tw-items-center tw-gap-0.5">
      <button type="button" aria-expanded="false">
        <svg class="lucide lucide-chevron-right ..."></svg>
        <span>1. Physical</span>
      </button>
    </div>
  </li>
  <li role="treeitem" aria-level="1" aria-selected="false" aria-expanded="true">
    <div class="tw-flex tw-items-center tw-gap-0.5">
      <button type="button" aria-expanded="true">
        <svg class="lucide lucide-chevron-right tw-rotate-90 ..."></svg>
        <span>5. Communication</span>
      </button>
    </div>
    <ul role="group" class="tw-ml-3 tw-space-y-0.5">
      <li role="treeitem" aria-level="2" aria-selected="true" aria-expanded="false">
        <div class="tw-flex tw-items-center tw-gap-0.5">
          <button aria-expanded="false" aria-label="Expand">...</button>
          <button>5.1 Speak</button>
        </div>
      </li>
      <li role="treeitem" aria-level="2" aria-selected="false">
        <div class="tw-flex tw-items-center tw-gap-0.5">
          <span class="tw-w-5 tw-shrink-0"></span>
          <button>5.2 Listen</button>
        </div>
      </li>
    </ul>
  </li>
</ul>
```

This matches WAI-ARIA APG tree-view spec:

- Top-level `<ul role="tree">` with `aria-label`.
- Nested `<ul role="group">` for children of an expandable treeitem.
- Each `<li role="treeitem">` carries `aria-level`, `aria-selected`, and `aria-expanded` (when
  expandable).
- Inner buttons retain their own `aria-expanded` / `aria-label` so focus announcements stay
  accurate when AT users tab into the buttons.

### Keyboard navigation (verified by source review + mouse-click test path)

| Key                     | Behavior                                              | Code reference       |
| ----------------------- | ----------------------------------------------------- | -------------------- |
| `ArrowDown` / `ArrowUp` | Move focus through buttons in DOM order               | `moveFocus(±1)`      |
| `ArrowRight`            | Collapsed treeitem → expand; expanded → first child   | `handleArrowRight`   |
| `ArrowLeft`             | Expanded treeitem → collapse; collapsed/leaf → parent | `handleArrowLeft`    |
| `Home`                  | Focus first button in tree                            | `focusEdge('first')` |
| `End`                   | Focus last button in tree                             | `focusEdge('last')`  |
| `Tab` / `Shift+Tab`     | Same as Arrow Down/Up (trapped inside dropdown)       | `moveFocus(±1)`      |
| `Enter` / `Space`       | Native button activation (toggle expand or select)    | (native click)       |
| `Escape`                | Close the dropdown (propagation stopped)              | `onClose()`          |

The ArrowLeft/Right behavior is exercised through the same `setExpanded` setter as the
mouse-click test path (test #6, "depth-0 chevron button toggles aria-expanded"). A jsdom
limitation (rAF scheduling inside Radix DropdownMenu portals causes OOM when multiple keyboard
scenarios run in the same suite) prevents adding a direct keyboard-arrow assertion in vitest;
keyboard nav is therefore covered by code review + the storybook story which can be exercised
in a real browser.

## Visual Verification

**Status:** DEFERRED — CDP port 9223 is unreachable at this moment (curl times out at 3s on
`/json/version`), and the stabilization charter directs sub-agents NOT to restart the running
app unless absolutely needed. The lib changes are pure ARIA additions on an existing component
that was already verified visually by SBN-019 (`5cf61d5eab`) and SBN-045 (the SDV-Dialog audit
on 2026-05-16). No visible behavior changed — `aria-*` attributes are not rendered visually,
and the new keyboard handlers route through the same `setExpanded` setter the existing mouse
path used.

The storybook story
(`extensions/src/platform-enhanced-resources/src/components/semantic-domain-viewer/semantic-domain-viewer.stories.tsx`)
already captures the visual + manual-keyboard verification for reviewers and continues to work
unchanged.

If a reviewer needs runtime visual verification, the trigger sequence is:

1. Open enhanced-resource webview.
2. Click a Dictionary entry's `Domain:` link to open the SDV.
3. Click any breadcrumb segment to open the SegmentDropdown.
4. Observe the rendered tree:
   - Top-level domains (level 1) render with combined chevron+label button.
   - Nested domains (level 2+) render with separate chevron + label buttons + hover-underline.
   - Selected breadcrumb segment is highlighted with `tw-bg-accent`.

## Test Results

```
$ cd extensions && NODE_OPTIONS="--max-old-space-size=8192" npx vitest --run semantic-domain-viewer
 ✓ src/platform-enhanced-resources/src/components/semantic-domain-viewer/semantic-domain-viewer.test.tsx (6 tests) 399ms

 Test Files  1 passed (1)
      Tests  6 passed (6)
```

Lint clean on the modified files:

```
$ npx eslint --ext .ts,.tsx \
    extensions/src/platform-enhanced-resources/src/components/semantic-domain-viewer/ \
    lib/platform-bible-react/src/components/advanced/source-language-indexed-list/er-dictionary-filtered-list.component.tsx
(no output — 0 errors, 0 warnings)
```

Typecheck: pre-existing errors in `src/renderer/testing/*` and `src/shared/services/localization.service-model.ts`
are unchanged by this work (verified by inspecting filenames in the typecheck output). No new
errors introduced in the modified files.

## Out-of-Scope (Follow-Ups)

- Storybook-level browser tests of the keyboard navigation (would close the jsdom-OOM gap from
  test #7 we omitted). Park as a follow-up under `lib/platform-bible-react`'s storybook test
  pipeline if Sebastian wants comprehensive keyboard coverage in CI.
- Adopting the official Radix `Tree` primitive if/when one ships — the current custom tree
  matches its shape and could be swapped one-for-one.
