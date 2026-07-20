# 10Simple Layout — Styling Adjustments Design Spec

**Source:** `docs/superpowers/10-simple-layout-styling-adjustments` (author's raw numbered notes, refined through brainstorming below)

---

## Problem

The Simple ("10Simple") 3-column layout works functionally but its visual chrome hasn't been
polished: columns have visible padding/border-radius/gaps that don't match the intended design,
the column divider takes up visible space, columns can be resized to nothing, a browser default
focus ring appears around a column's WebView, the Scripture Editor's toolbar misaligns its
children vertically, and the Model Text column has no header identifying which resource is
loaded. A Storybook prototype (`src/stories/platform/ten-layout-shared.tsx` /
`ten-simple-layout.stories.tsx`, explicitly marked "⚠️ Prototype only — not a production layout")
already demonstrates several of the intended effects (padding/radius removal, the divider
hit-area trick) and is the reference this spec ports into production.

**Critical constraint:** every change in this spec — **except Section 4** (the toolbar
vertical-centering fix) — must be scoped so that Power mode renders **exactly as it does today,
pixel for pixel**. Power mode must not be touched.

---

## Out of Scope

- **Item #5** (restyle the 3rd column's tab headers to match the icon-only mockup) — explicitly
  dropped by the author; being implemented separately in another branch. No icon/title changes to
  the Bible Texts / Commentaries / Comment List tabs are part of this spec.

---

## Section 1 — Simple-mode scoping mechanism

Today there is no single ancestor marker distinguishing Simple from Power mode at the CSS level.
Some rc-dock group-derived classes (`.dock-style-headless`, `.dock-style-resources`) happen to
only appear in Simple mode already (Power mode's `TAB_GROUP` never produces them — see
`platform-dock-layout-positioning.util.ts`), but general layout selectors used below
(`.dock-panel`, `.dock-divider`, `.dock-layout`, `.web-view`) currently match panels in both
modes, because the shared `'platform-bible'` group token is present in every group in both modes.

**Change:** in `src/renderer/components/docking/dock-layout-wrapper.component.tsx`, wrap
`<DockLayout>` in a new `<div>` carrying a `dock-layout-simple` class only when `!isPowerMode`
(this component already calls `useIsPowerMode()`):

```tsx
const isPowerMode = useIsPowerMode();
return (
  <div className={isPowerMode ? undefined : 'dock-layout-simple'} style={style}>
    <DockLayout
      ref={ref}
      groups={getGroups(isPowerMode)}
      defaultLayout={...}
      style={FILL_STYLE} // { position: 'absolute', inset: 0 } — fills the new wrapper exactly
      ...
    />
  </div>
);
```

The inline inset style currently passed as `style` (from `platform-dock-layout.component.tsx`,
see Section 7) moves from `<DockLayout>` onto this new wrapper `<div>`; `<DockLayout>` itself gets
a static fill style (`position: absolute; inset: 0`) so its rendered box is pixel-identical to
today in both modes — only one extra non-visual wrapper `<div>` is introduced. Verify this doesn't
change Power mode's rendered layout (visual check) and doesn't break
`dock-layout-wrapper.component.test.tsx` (which mocks rc-dock's default export and only asserts on
props — unaffected by the extra wrapper).

Every Simple-only rule in Sections 2, 3, 6, and 7 is scoped under `.dock-layout-simple` in
`dock-layout-wrapper.component.scss`.

---

## Section 2 — Column chrome: padding, gap, radius, divider, min-width (items #1, #2, #3, #9, #10)

Port the prototype's `NO_PADDING_STYLE` (`src/stories/platform/ten-layout-shared.tsx`) into
`dock-layout-wrapper.component.scss`, scoped under `.dock-layout-simple`, extended per the
decisions below:

```scss
.dock-layout-simple {
  .dock-layout {
    gap: 0;
  }

  .dock-divider {
    flex: 0 0 1px;
    background: transparent;
  }
  .dock-hbox > .dock-divider {
    transform: scaleX(8);
    cursor: ew-resize;
  }
  .dock-vbox > .dock-divider {
    transform: scaleY(8);
    cursor: ns-resize;
  }

  .dock-panel,
  .dock-tabpane,
  .platform-panel,
  .web-view {
    padding: 0;
    border-radius: 0;
  }

  // Border radius removal is comprehensive (per author decision): also flatten the tab-header
  // fillets and the active-tab's own corner rounding, not just the outer containers.
  .dock-tab,
  .dock-tab.dock-tab-active {
    border-radius: 0;
  }
  .dock-tab::before,
  .dock-tab::after {
    // FILLETS region (dock-layout-wrapper.component.scss) — the decorative curved corners that
    // visually connect an active tab to its content pane. Zeroing width/height collapses them.
    width: 0;
    height: 0;
  }
}
```

(Exact selector list to be finalized against the current FILLETS/TAB HEADER regions during
implementation — the fillets are pseudo-elements sized by `$tab-bottom-rounding`, so zeroing their
`width`/`height` under this scope removes the curve without touching the Power-mode rule, which
stays keyed off the unscoped `.dock-tab.dock-tab-active` selector elsewhere in the file.)

**Min column width (item #2):** add `minWidth: 300` to each of the three column `BoxData` entries
in `src/renderer/components/docking/simple-layout.data.ts` (rc-dock's `BoxData` extends
`DockDataBase`, which already supports `minWidth`/`minHeight` — confirmed in
`node_modules/rc-dock/lib/DockData.d.ts`). This is naturally Power-mode-safe: Power mode uses
entirely different layout data with no `minWidth` set, so it is untouched.

---

## Section 3 — Height alignment (item #6)

Three things must render at the same height, **in Simple mode only**:

1. Column 3's dock tab-header row (currently `--dock-tab-height: 30px` + `--tab-header-to-content-gap: 6px` ≈ 36px total, set in `dock-layout-wrapper.component.scss`'s TAB-BAR/TAB-HEADER regions).
2. The Scripture Editor's `TabToolbar` (Column 2) — currently a fixed `tw:h-14` (56px) via `TabToolbarContainer` (`lib/platform-bible-react/src/components/advanced/tab-toolbar/tab-toolbar-container.component.tsx:59`).
3. The new Model Text header (Section 5), Column 1.

Target: **36px** (the dock tab-header's current height), applied as a `.dock-layout-simple`-scoped
override so `TabToolbarContainer`'s shared 56px default is untouched everywhere else (Checks
panel, Enhanced Resources toolbar, and Power-mode Scripture Editor all keep 56px). Concretely:
add a Simple-mode-scoped rule that overrides `tw:h-14` to `36px` (e.g. targeting
`.scripture-editor-tab-nav` — the `className` already passed to `TabToolbar` in
`platform-scripture-editor.web-view.tsx:1859` — under a `.dock-layout-simple` (or equivalent
Simple-mode) ancestor), and give the new Model Text header (Section 5) the same fixed height.

---

## Section 4 — Toolbar vertical-centering fix (item #7) — global, NOT Simple-only

`TabToolbarContainer` already centers children (`tw:items-center` on the container,
`tab-toolbar-container.component.tsx:59`), but `TabToolbar`'s three inner wrapper `<div>`s
(start/center/end areas, `tab-toolbar.component.tsx:81,86,90`) each force `tw:h-full`, which makes
every wrapper stretch to fill the container's full height regardless of the outer
`items-center` — so their contents (e.g. `tw:h-8` buttons) sit at the top (`items-start`) of that
stretched box instead of being centered in the row.

**Change:** remove `tw:h-full` from all three wrapper `<div>`s in `tab-toolbar.component.tsx`
(lines 81, 86, 90) — leave `tw:items-start` and every other class as-is. With the wrapper no
longer artificially stretched, `TabToolbarContainer`'s `items-center` centers each wrapper (and
therefore its children) within the row.

This is a real alignment bug in a shared component, not a Simple-mode-specific style choice — per
explicit author instruction, this is the one change in this spec that also affects Power mode
(Checks panel, Enhanced Resources toolbar, and the Scripture Editor toolbar in both modes).

---

## Section 5 — Model Text header (item #8)

Add a header above the read-only editor in the Model Text panel (Column 1) reading
`${fullName} (${displayName})`, shown **only once a model text is selected** (not in the zero
state).

**Reuse, don't duplicate:** `resource-text-panel.web-view.tsx` already has a private
`getRefLabel(ref: EffectiveResourceReference, dblResourcesList: DblResourceData[]): string`
helper (lines 74-84) producing exactly this `{fullName} ({displayName})` format (falling back to
`ref.name` for non-DBL or unresolved references). Extract it (and keep `isDblResourceReference`/
`isProjectReference`'s existing home) into the extension's shared
`resource-reference.utils.ts` as an exported function, and have both
`resource-text-panel.web-view.tsx` and `model-text-panel.web-view.tsx` import it from there —
avoids two divergent implementations of the same label format.

**Wiring:** `model-text-panel.web-view.tsx` already computes `effectiveModelText` (an
`EffectiveResourceReference`, line ~86) and already has `dblResources` in scope (line ~76) — both
are already passed to `<ModelTextPanel>` today. Add one new prop, computed in the web-view:

```typescript
const modelTextLabel = effectiveModelText
  ? getRefLabel(effectiveModelText, dblResources)
  : undefined;
```

Pass `modelTextLabel` to `<ModelTextPanel>` (`model-text-panel.web-view.tsx:201`). In
`model-text-panel.component.tsx`, render the header (height per Section 3) above the existing
`tw:h-screen tw:overflow-auto` content root only when `modelTextLabel` is defined; render nothing
(today's layout, full-height content with no header) when it is `undefined` (zero state / no
resource selected yet).

---

## Section 6 — Black selection ring (item #4) — Simple-only

Clicking inside a WebView's content triggers the browser's default focus outline on the iframe.
Add, under the `.dock-layout-simple` scope from Section 1:

```scss
.dock-layout-simple .web-view:focus {
  outline: none;
}
```

This follows the same pattern already used elsewhere in `dock-layout-wrapper.component.scss` for
resetting other rc-dock/browser default outlines (e.g. `.dock-tab .dock-tab-btn`'s
`outline-color: unset` reset). Scoped to Simple mode per author instruction, even though the same
default-outline behavior likely also occurs in Power mode.

---

## Section 7 — Outer inset (item #11)

`platform-dock-layout.component.tsx` (~lines 163-176) currently passes a single inline inset style
to `DockLayoutWrapper` for both modes:

```tsx
style={{ position: 'absolute', top: 48, bottom: 8, left: 8, right: 8 }}
```

**Change:** branch this on `isPowerMode` (already available or easily obtained in this component):
Power mode keeps `{ top: 48, bottom: 8, left: 8, right: 8 }` exactly as today; Simple mode becomes
`{ top: 48, bottom: 0, left: 0, right: 0 }` (only `top: 48` — clearance for the main toolbar — is
preserved; the surrounding gap is removed). This style is what Section 1 moves onto the new
`.dock-layout-simple`-or-not wrapper `<div>`.

---

## Definition of Done

- Power mode is visually and behaviorally unchanged in every respect except Section 4 (verify via
  manual visual comparison — no automated visual-regression suite exists for this layout).
- Columns in Simple mode have zero padding, zero border-radius (including tab fillets and
  active-tab corner rounding), and a near-invisible divider that remains grabbable via the
  `scaleX(8)`/`scaleY(8)` hit-area trick.
- Each Simple-mode column has a `minWidth` of 300px and cannot be resized smaller.
- Column 3's dock tab-header, the Scripture Editor's `TabToolbar`, and the new Model Text header
  are all 36px tall, in Simple mode only.
- `TabToolbar`'s inner wrapper `<div>`s no longer force `tw:h-full`; their children are vertically
  centered in every consumer (Scripture Editor, Checks, Enhanced Resources), in both modes.
- Model Text panel shows a `FULL_NAME (SHORT_NAME)` header once a resource is selected, and no
  header in the zero state; the label format is produced by one shared, exported helper used by
  both the Model Text and Bible Texts/Commentaries panels (no duplicated formatting logic).
- Clicking inside a WebView in Simple mode no longer shows a default focus ring.
- The outer gap around the 3-column layout is zero on left/right/bottom in Simple mode (`top: 48`
  unchanged); Power mode's outer gap (`top: 48, bottom: 8, left: 8, right: 8`) is unchanged.
- Item #5 (icon-only tab header restyle) is explicitly NOT implemented as part of this work.
