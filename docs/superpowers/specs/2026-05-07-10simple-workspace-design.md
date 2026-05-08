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

**Data:** The panel merges entries from two sources:

- **Admin entries:** read from the project's main `ModelTexts` project setting. Only admins (Donna) write to this setting.
- **User entries:** read from `ParatextStudio/UserSettings-{userId}.xml` in the project folder. Regular users (Saroj) write their selections here instead of the main setting. This file is local-only for now; future work will S/R it to the registry so selections follow the user across machines.

**Zero state:**

- Both admin and user see a prompt with a "Select model text" action.
- Selection UI follows the same pattern as the project-open picker: search, recently opened items, full list.
- Resources already associated with the project are shown first.
- Projects are hidden by default; an extra deliberate step reveals them (only projects where the user is a named team member are shown).
- When an admin selects, the entry is written to the main `ModelTexts` setting. When a regular user selects, the entry is written to their personal `UserSettings-{userId}.xml`.

**Display:** The data provider returns a merged list where each entry has a `source: 'admin' | 'user'` tag. The panel shows all entries (`source === 'admin'` entries come from Donna's selection; `source === 'user'` entries come from the current user's personal file). Entries from other users' personal files are never included in the merged list.

**Multiple entries:** Both sources support multiple entries. The selector UI allows the user to choose which of the available model texts to display in Column 1 at any given time.

**Daily use:** The panel displays the currently selected model text, scrolling in sync with the main toolbar BCV. A selector allows switching between available model texts.

---

## Section 3 — Column 2: Scripture Editor

The existing scripture editor is used as-is. The only change is removing the per-panel BCV control from its toolbar (see Section 1).

---

## Section 4 — Column 3: Resources & Tools Panel

Two tabs using the existing docking tab system: **Bible texts** and **Commentaries**.

### Data routing prerequisite (T3)

The project settings data provider must be updated before either tab's UI is built. The new behavior:

- **Writes:** when a non-admin user writes to `ModelTexts` or `ReferencedProjectsAndResources`, the data provider routes the write to `ParatextStudio/UserSettings-{userId}.xml` in the project folder. Admin writes continue to go to the main project settings file.
- **Reads:** the data provider merges entries from both sources and returns a single list. Each entry in the merged list carries a runtime `source: 'admin' | 'user'` tag computed from which file the entry came from. This tag is not stored on disk — it is derived at read time from file provenance.

No changes to the `ResourceReferenceList` or `ResourceReference` types are required. The UI uses the `source` tag for display filtering and remove-button behavior (T9).

### Bible texts tab

- Reads `ReferencedProjectsAndResources` filtered to Bible text resources, merging entries from the main project setting (admin) and the current user's personal `UserSettings-{userId}.xml`.
- Admin writes go to the main project setting; regular user writes go to their personal file. The display shows all admin entries plus the current user's own entries — no entries from other users are shown.
- **Zero state:** prompt to select preferred Bible texts, opens the same resource picker pattern.
- **Daily use:** selector UI to choose which downloaded text to display; "Download resources" action opens `platform-get-resources`.
- **DBL licensing:** downloadable Bible texts from DBL are filtered by the user's DBL licensing permissions.
- **Remove behavior (nice-to-have, see T9):** entries with `source === 'admin'` show a disabled remove button with a tooltip; entries with `source === 'user'` can be removed by the user.

### Commentaries tab

- Same structure as Bible texts tab, filtered to commentaries. The data provider returns the same merged list with `source` tags; entries from other users are never included. Remove behavior is a nice-to-have (see T9).
- Only specific titles are downloadable: UBS Handbook and SIL TNN/TND in English.
- "Download commentaries" opens `platform-get-resources` with a commentaries-type filter so it lands directly on that resource type.
- Language variants of UBS Handbook and SIL TNN/TND are a **nice-to-have**.

---

## Section 5 — `platform-get-resources` Extension Changes

**New commentaries resource type:** A curated commentaries type is added to the `platform-get-resources` UI. The available list is limited: UBS Handbook and SIL TNN/TND in English initially. The download flow reuses existing infrastructure; only the resource type definition and its filtered list view are new.

**DBL licensing:** Bible texts from DBL displayed in `platform-get-resources` are filtered by the user's DBL licensing permissions.

**Filter parameter:** `platform-get-resources` gains support for an optional resource-type filter parameter so it can be opened directly on the commentaries view from Column 3.

---

## Open Questions

**1. Read API shape — Resolved** _(impacts T3, T4, T5, T6)_

~~What is the exact read API shape?~~ The data provider returns a single merged list. Each entry carries a runtime `source: 'admin' | 'user'` tag computed from which file it came from — not stored on disk. The UI uses this tag for display filtering and remove-button behavior.

**2. S/R for personal settings file** _(impacts future cross-machine sync)_

When will `ParatextStudio/UserSettings-{userId}.xml` be added to S/R? Needs a follow-on ticket outside this appetite.

---

## Ticket Structure

Work is organized as a **foundation-first, then parallel** delivery:

```
[T1: Configure platform-dock-layout with 3-column layout driven by platform.interfaceMode]  ← lands first, unblocks parallel work
[T2: Remove BCV from editor toolbar]  ← parallel-safe, small
         │
    ┌────┴─────────────────────────────────┐
    ▼                                      ▼
[T3: Route non-admin writes to ParatextStudio/UserSettings-{userId}.xml]   [T4: Model text panel]
         │
    ┌────┴───────────────────────┐
    ▼                            ▼
[T5: Bible texts tab]     [T6: Commentaries tab]
                          [T7: Commentaries type in platform-get-resources]

[T8: Nice-to-have — prevent column move/close]
[T9: Nice-to-have — resource removal with admin-lock enforcement (depends on T3, T5, T6)]
```

---

## Nice-to-haves (cut list, in priority order)

1. Prevent columns from being moved or closed (T8)
2. Resource removal with admin-lock enforcement — Bible texts and Commentaries tabs (T9)
3. Language variants of UBS Handbook and SIL TNN/TND in Commentaries
4. Tab headers use icons instead of text in Column 3
5. Tab headers styled so they don't look like draggable 10Power tabs
