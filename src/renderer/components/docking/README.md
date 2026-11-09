# Docking System Customizations and Behaviors

This document describes the customizations to rc-dock, expected behaviors, and known issues for the docking system used in this project. It covers the structure of tab groups, the states tabs can be in, intentional UI/UX improvements, and areas for future work.

---

## Objects

- **Tab group**
- **Tab**
  - Tab header
  - Tab content

---

## States

- **"front"**  
  The tab that's selected in a tab group.  
  In rc-dock, this is `dock-tab-active` (i.e., "active" means the tab that is selected in a tab group).

- **"back"**  
  Any tab that's not "front" in a tab group.  
  In rc-dock, this is "inactive" (i.e., any tab that is not "active" in a tab group).

- **"focus-within"**  
  The tab that has CSS `:focus-within` (i.e., the tab with a cursor or keyboard focus within it).  
  A tab with focus-within is always a "front" tab.  
  _Note: Avoid depending on `:focus-within` unless you specifically want this behavior._  
  In rc-dock, this is `platform-dock-tab-window-focus` (the tab that is not "floating" and has a window focus, including focus on the tab header).

- **"blur"**  
  The tab that does not have focus (i.e., not "focus-within").

- **"highlight"**  
  A tab that was recently made or has had a significant change.  
  This is a temporary state that lasts a few seconds after the tab is activated or its content changes.
  - `platform-dock-tab-active-highlight`
  - `platform-dock-tabpane-active-highlight`

---

## Spacing & Visual Customizations

- Intentional spacing around the whole tab group (and ideally the whole layout).
- Content pane uses a border radius for a softer appearance.
- Tab separators and gaps prevent tabs from visually running into each other.
- Grab and right-click areas of tabs match the visual tab for improved usability.
- Tab close button contrast is improved for accessibility.
- "More Tabs" icon redesigned for clarity.
- Tab header row uses consistent spacing and alignment.
- Overflow shadows removed for a cleaner look.
- Overflow (more) menu items have improved styling.
- Tab headers have spacing to prevent focus ring clipping.
- Tab header dividers become transparent when focused to avoid visual clashes.
- The empty remainder of each Power-mode tab bar accepts dropped tabs (`TabBarDropZone`). During a
  drag, "+" slides to the bar's end and the drop target covers the last tab's trailing half, the
  gap, "+", and the bar's trailing padding.
- rc-tabs' idle overflow box is removed from layout in both modes (the Simple-mode Resources column
  included).
- In Power mode, rc-dock's edge-split drop layer (`.dock-drop-edge`) starts below the tab bar
  instead of overlapping its bottom strip, so a drop there joins the bar instead of splitting the
  layout.

---

## Simple mode: dragging never changes what is docked

A floating panel can be moved by its tab bar, but no drag docks it, merges it into another tab
group, or undocks anything. Each rc-dock drop path has its own guard:

- **Drop squares over a panel** (rc-dock's `DockDropLayer`): every Simple-mode group sets
  `disableDock` (`getGroups` in `platform-dock-layout-positioning.util.ts`). `tabLocked` alone does
  not cover this: rc-dock honors it only when a single tab is dragged, and dragging a float by its
  tab bar drags the whole tab group.
- **A tab in another tab bar** (rc-dock's `TabCache.onDragOver`, which accepts a whole tab group of
  the same group): `dock-layout-wrapper.simple-mode.scss` sets `pointer-events: none` on every tab
  bar while `<body>` carries `dock-dragging`, so rc-dock's hit test never lands on one.
- **Undocking**: every group sets `floatable: false`, so no float drop square is ever offered.

The docked Resources column cannot be dragged at all. Pressing its tab title starts no drag (the
title is marked `drag-ignore`), and the stylesheet takes the rest of its tab bar out of hit-testing,
apart from each tab's `.dock-tab-btn` and the overflow button, so a press there lands on the panel
beneath, which starts no drag. A drag that starts on a tab's padding still begins, but it can drop
nowhere.

`disableDock` only gates drag-and-drop; code that places tabs with `dockMove` is unaffected. Covered
by `simple-mode-no-dock.test.tsx` and the `docking` e2e subset (`simple-mode-no-dock.spec.ts`).

---

## Overflow

- Overflow (more) menu is styled to match the rest of the UI.

---

## Cleanup

- Unused styles in `_vars.scss` should be removed (**pending**).
- Regions should only include appropriate rules (**pending**).
- Overlapping opacity artifacts in concave corners have been fixed.
- Clipping on tab header focus rings has been fixed.
- Divider between tab headers becomes transparent when focused, improving focus visibility.

---

## rc-dock version and patches

rc-dock is pinned to exactly `3.3.2` (`package.json`). `patches/rc-dock+3.3.2.patch` only applies to
that version, and the code below relies on rc-dock internals, so any upgrade must re-check the list
in "rc-dock internals we depend on".

The patch edits only rc-dock's `es/` build (the one webpack bundles). Vitest loads `lib/`, so unit
tests don't see the patch unless they import `rc-dock/es/...` directly
(`rc-dock-tab-cache-patch.test.ts` and `rc-dock-dock-move-patch.test.tsx` do).

- `DockLayout.dockMove`: looks the source and target up by id in the current layout before moving,
  and treats a drop onto itself, or a whole tab group dropped next to one of its own tabs, as a
  no-op (a float still floats). A drag holds the objects it found at drag start, and
  `updateTab` replaces a tab's object, so a tab updated mid-drag could otherwise be lost or
  duplicated on drop (`rc-dock-dock-move-patch.test.tsx`).
- `DockLayout.updateTab`: updating a tab without activating it no longer focuses that tab's panel.
- `DockLayout.setDropRect`: guards a `null` `oldStates.dropRect` on a doubled `'remove'`.
- `DockTabs` `isPopupDiv`: tells the overflow dropdown's hidden tab copies apart from the real strip
  by walking to the nearest `<li>` (stopping at `.dock-nav-list`) instead of counting two levels, so
  the dropdown's zero-size hit area can't overwrite the real one (ticlo/rc-dock#161).

Policy: patch rc-dock to fix its bugs, not to add features; build features app-side (see
`adr-tab-bar-drop-zone-app-side-target` in `.context/standards/Architecture-Decisions.md`).

---

## rc-dock internals we depend on

Check each of these when upgrading rc-dock or rc-tabs, then run the docking unit tests and
`npm run test:e2e:isolated docking`.

- **DOM classes:** `.dock-panel` (and its `data-dockid`), `.dock-bar`, `.dock-nav`, `.dock-nav-wrap`,
  `.dock-nav-list`, `.dock-tab`, `.dock-tab-btn` (rc-tabs' tab button, which the tab's drag element
  fills exactly), `.dock-tab-hit-area`, `.dock-extra-content` (where `TabGroup.panelExtra` renders),
  `.dock-nav-operations` / `.dock-nav-operations-hidden` (rc-tabs keeps the idle overflow box in the
  DOM), `.dock-style-<token>` group classes (`groupClassNames`),
  `body > .dragging-layer`, `.dock-layout > .dock-drop-indicator`, `.dock-drop-edge`,
  `.dock-drop-square`, and `body.dock-dragging` (set for the length of every drag).
- **APIs:** `DragDropDiv` (`getRef`, `onDragOverT`/`onDragLeaveT`/`onDropT`; `reject()` lets the
  hit-test walk keep going up, `accept('')` stops it); `DragState.getData('tab' | 'panel', dockId)`;
  `addDragStateListener`/`removeDragStateListener` (called with the drag's scope at start and `null`
  at end, including drop and Escape); `DockContext.setDropRect(element, 'middle', source)` (sizes the
  indicator from `element.getBoundingClientRect()`; `'remove'` clears only a matching `source`);
  `DockContext.dockMove(source, panel, 'middle')` (appends);
  `TabGroup.panelExtra(panelData, context)`; `TabGroup.disableDock` (read only by `DockDropLayer`
  and `DockDropEdge`, keyed on the dragged item's group, and never by `dockMove`).
- **Ordering and behavior:** `createDraggingElement` appends `.dragging-layer` (carrying the dragged
  group's classes) to `<body>` _before_ it calls drag-state listeners, and `setData` runs before
  `startDrag`; `DragManager._onMove` hit-tests with `elementFromPoint` (which skips
  `pointer-events: none` elements) and walks up parents, first acceptor wins; `TabCache.onDragOver`
  picks `after-tab` past a tab's midpoint and draws a fixed 30px indicator; `DockPanel` mounts its
  drop layer (`.dock-drop-edge` in edge mode, positioned `top: 30px` by rc-dock — overridden by
  this app, see `dock-layout-wrapper.component.scss`) only after its own `onDragOver` runs; rc-tabs
  11.16.1 never measures the operations box and keeps the active tab scrolled into view.

---

## Known Issues

- Overflow of tabs cannot be fully fixed without JavaScript; this is tracked as a separate work item.  
  Adding padding to tab headers list does not fix this; likely a JavaScript issue with the transform-x amount on `.dock-nav-list`.
- Focus classes are slow to apply due to JavaScript; CSS `:focus-within` may help in the future.
- There is a transition mismatch when keyboard focusing a front tab; this has been improved but is not fully resolved.
