# Design: 10Simple Workspace — Saroj Studies a Chapter

**Date:** 2026-05-07
**PRD:** PRD - Simple - Saroj studies the meaning of a chapter using model text - commentary - resource texts.md
**Appetite:** 6 dev-weeks | **Demo deadline:** June 19, 2026

---

## Overview

Deliver a fixed 3-column workspace within Platform.Bible that gives Saroj an immediately usable study environment without any setup. Donna (project admin) can pre-configure the model text and resources; if she hasn't, Saroj can make local selections that are superseded when Donna's settings sync.

```
[ Model Text (Col 1) | Scripture Editor (Col 2) | Resources & Tools (Col 3) ]
```

The `platform.interfaceMode` setting (already implemented, defaults to `'simple'`) controls which layout is active. For this iteration the app defaults to 10Simple and no user-facing mode switcher is exposed — but the layout reads this setting so the infrastructure for future switching is already in place.

---

## Section 1 — Layout Foundation

The 10Simple workspace is delivered by configuring the existing `platform-dock-layout` with a 3-column arrangement — no new layout component is created. The three columns are:

- **Column 1 (start):** Model text panel
- **Column 2 (middle):** Scripture editor
- **Column 3 (end):** Resources & Tools panel

The layout reads the `platform.interfaceMode` setting (`'simple'` | `'power'`) and loads the 3-column configuration when the value is `'simple'`. This setting already exists and defaults to `'simple'`. No user-facing mode switcher is exposed in this iteration, but the infrastructure for future switching is already in place. No new layout abstraction is introduced; the existing docking infrastructure handles rendering.

BCV sync across all panels already works via the main app toolbar — no new work needed. One targeted change is required: the per-panel BCV control is removed from the scripture editor toolbar so there is only one BCV control in the UI.

**Nice-to-have (cut first if time is tight):** Preventing columns from being moved or closed.

---

## Section 2 — Column 1: Model Text Panel

Reuses the existing scripture editor/reader component in read-only mode.

**Data:** Reads the `ModelTexts` project setting. Both admin and regular users can write to this setting. Precedence at sync time: the admin's value overrides whatever the user has set. Each entry in `ModelTexts` must include two metadata fields:

- `addedByRole: "admin" | "user"` — identifies whether an admin or regular user made the selection
- `addedByUser: string` — the ID of the user who made the selection

**Zero state:**

- Both admin and user see a prompt with a "Select model text" action.
- Selection UI follows the same pattern as the project-open picker: search, recently opened items, full list.
- Resources already associated with the project are shown first.
- Projects are hidden by default; an extra deliberate step reveals them (only projects where the user is a named team member are shown).

**Display filtering:** When rendering the model text selector, the panel shows only entries where `addedByRole === "admin"` or `addedByUser === currentUserId`. Entries added by other regular users are not shown.

**Multiple entries:** `ModelTexts` supports multiple entries. The selector UI allows the user to choose which of the available model texts to display in Column 1 at any given time.

**Daily use:** The panel displays the currently selected model text, scrolling in sync with the main toolbar BCV. A selector allows switching between available model texts.

---

## Section 3 — Column 2: Scripture Editor

The existing scripture editor is used as-is. The only change is removing the per-panel BCV control from its toolbar (see Section 1).

---

## Section 4 — Column 3: Resources & Tools Panel

Two tabs using the existing docking tab system: **Bible texts** and **Commentaries**.

### Data structure change (prerequisite)

Both `platformScripture.modelTexts` and `platformScripture.referencedProjectsAndResources` use the `ResourceReferenceList` type defined in `platform-scripture.d.ts`. Its `items` array currently holds `ResourceReference` entries (a discriminated union of `DblResourceReference`, `EnhancedResourceReference`, etc.).

Two metadata fields must be added to each item by intersecting a new `AnnotatedResourceReference` wrapper type:

```typescript
export type AnnotatedResourceReference = ResourceReference & {
  addedByRole: 'admin' | 'user';
  addedByUser: string;
};
```

`ResourceReferenceList.items` becomes `AnnotatedResourceReference[]`. This is a backward-compatible additive change — bump `dataVersion` minor digit (e.g. `1.0.0` → `1.1.0`).

These fields must be added before either tab's UI is built.

### Bible texts tab

- Reads `ReferencedProjectsAndResources` (filtered to Bible text resources).
- Both admin and user can write entries. On sync, admin entries **add to** user entries (do not replace). `addedByRole` metadata drives the remove-lock behavior.
- **Display filtering:** only entries where `addedByRole === "admin"` or `addedByUser === currentUserId` are shown. Entries added by other regular users are not visible.
- **Zero state:** prompt to select preferred Bible texts, opens the same resource picker pattern.
- **Daily use:** selector UI to choose which downloaded text to display; "Download resources" action opens `platform-get-resources`.
- **Remove behavior:** entries with `addedByRole: "admin"` show a disabled remove button with a tooltip explaining the item was selected by the project admin.

### Commentaries tab

- Same structure as Bible texts tab, filtered to commentaries. Display filtering applies identically: only entries where `addedByRole === "admin"` or `addedByUser === currentUserId` are shown.
- Only specific titles are downloadable: UBS Handbook and SIL TNN/TND in English.
- "Download commentaries" opens `platform-get-resources` with a commentaries-type filter so it lands directly on that resource type.
- Language variants of UBS Handbook and SIL TNN/TND are a **nice-to-have**.

---

## Section 5 — `platform-get-resources` Extension Changes

**New commentaries resource type:** A curated commentaries type is added to the `platform-get-resources` UI. The available list is limited: UBS Handbook and SIL TNN/TND in English initially. The download flow reuses existing infrastructure; only the resource type definition and its filtered list view are new.

**Filter parameter:** `platform-get-resources` gains support for an optional resource-type filter parameter so it can be opened directly on the commentaries view from Column 3.

---

## Open Questions

| #   | Question                                                                                                                                              | Impact                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| 1   | How does the sync override work for `ModelTexts`? Is this handled automatically by the S/R merge strategy, or does the app need explicit merge logic? | Column 1 sync behavior |

---

## Ticket Structure

Work is organized as a **foundation-first, then parallel** delivery:

```
[T1: Configure platform-dock-layout with 3-column layout driven by platform.interfaceMode]  ← lands first, unblocks parallel work
[T2: Remove BCV from editor toolbar]  ← parallel-safe, small
         │
    ┌────┴─────────────────────────────────┐
    ▼                                      ▼
[T3: Add addedByRole/addedByUser metadata]   [T4: Model text panel]
         │
    ┌────┴───────────────────────┐
    ▼                            ▼
[T5: Bible texts tab]     [T6: Commentaries tab]
                          [T7: Commentaries type in platform-get-resources]

[T8: Nice-to-have — prevent column move/close]
```

---

## Nice-to-haves (cut list, in priority order)

1. Prevent columns from being moved or closed
2. Language variants of UBS Handbook and SIL TNN/TND in Commentaries
3. Tab headers use icons instead of text in Column 3
4. Tab headers styled so they don't look like draggable 10Power tabs
