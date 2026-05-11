# 10Simple Workspace — Jira Tickets

**Epic:** 10Simple Workspace (Saroj studies a chapter)
**Appetite:** 6 dev-weeks | **Demo deadline:** June 19, 2026
**Design spec:** [2026-05-07-10simple-workspace-design.md](./2026-05-07-10simple-workspace-design.md)

Delivery order: T1 lands first and unblocks parallel work. T2, T3, and T4 are parallel-safe. T3 must land before T6 and T7. T4 must land before T5, T6, and T7. T8 is independent of everything else.

---

## Must-Have Requirements

The following requirements are drawn from the PRD. Each ticket below references which items it addresses.

1. Workspace displays as a 3-column layout below the main title bar/toolbar.
2. Column 1: A panel exists for the model text.
3. Column 2: A panel exists for the project/editor.
4. Column 3: A panel exists for resources and tools, with two tabs — "Bible texts" and "Commentaries".
5. All content scrolls in sync with the BCV control in the main app toolbar.
6. BCV controls are absent from all panels/columns; only the main app toolbar has one.
7. Column 1 zero state: Donna sees a prompt to select a model text; Saroj can also do so. Donna's selection is written to the main project setting; Saroj's is written to `Studio/UserSettings-{userId}.xml`. Both are shown in Column 1.
8. Column 1 selection UI: preferentially shows resources already associated with the project; projects require an extra deliberate step to reveal; user only sees projects they are a named member of.
9. Column 3 Bible texts zero state: Donna sees a prompt to select preferred Bible texts; Saroj can do the same. Donna's selections go to the main project setting; Saroj's go to her personal file. Both sets are shown in the tab.
10. Column 3 Bible texts daily use: selector UI to choose which downloaded text to display; "Download resources" action available.
11. Downloadable Bible texts from DBL are filtered by the user's DBL licensing permissions.
12. Column 3 Commentaries zero state: same as Bible texts zero state; Donna's selections go to the main project setting and Saroj's go to her personal file. Both sets are shown in the tab.
13. Column 3 Commentaries daily use: selector UI to choose which downloaded commentary to display; "Download commentaries" action available.
14. Only specific commentaries available for download: UBS Handbook and SIL TNN/TND in English.

**Nice-to-haves:**

- Removing resources: both Donna and Saroj can remove items they added; Saroj cannot remove items Donna added (UI disabled with explanation). (T10)
- Prevent columns from being moved or closed in the 10Simple layout. (T9)

---

## T1 — Configure `platform-dock-layout` with 3-column 10Simple layout

**Addresses requirements:**

- #1: 3-column workspace layout below the main title bar/toolbar
- #2: Column 1 model text panel
- #3: Column 2 project/editor panel
- #4: Column 3 resources & tools panel with Bible texts and Commentaries tabs

### Description

The entire Platform.Bible app should default to a fixed 3-column layout when `platform.interfaceMode` is `'simple'`. The three columns are: model text (start), scripture editor (middle), resources & tools (end). No new layout component should be created — this is achieved by configuring the existing `platform-dock-layout` with the right default layout state.

### Implementation Ideas

Read the `platform.interfaceMode` setting (already exists, defaults to `'simple'`) in the layout initialization path. When the value is `'simple'`, load a hardcoded 3-column dock layout configuration rather than whatever was last saved. The three panels (model text, editor, resources) should be registered contributions that the layout can reference by ID. The existing flexible layout behavior is preserved and will be used when `interfaceMode` is `'power'` in a future iteration.

### Definition of Done

- Launching Platform.Bible shows a 3-column layout with model text, editor, and resources panels side by side.
- The layout is driven by the `platform.interfaceMode` setting — changing the setting value to `'power'` does not load the 3-column default.
- No new layout component or abstraction is introduced; only `platform-dock-layout` configuration is changed.
- The existing flexible docking layout code is untouched.

---

## T2 — Remove BCV controls from the scripture editor toolbar

**Addresses requirements:**

- #5: All content syncs to main toolbar BCV
- #6: No BCV controls in panels — only the main app toolbar

### Description

The scripture editor currently has its own BCV (Book-Chapter-Verse) navigation control in its panel toolbar. In 10Simple, BCV navigation lives exclusively in the main app toolbar. The per-panel BCV control in the scripture editor should be removed to avoid duplication and confusion.

### Implementation Ideas

Locate the BCV control rendered inside the scripture editor's panel toolbar and remove it. This should be a small, targeted change with no effect on the main app toolbar BCV or the underlying BCV sync behavior (which already works correctly across all panels).

### Definition of Done

- The scripture editor panel toolbar no longer shows a BCV control.
- The main app toolbar BCV still controls all panels and scrolls them in sync.
- No other panel toolbars are affected.

---

## T3 — Route non-admin writes to `Studio/UserSettings-{userId}.xml`

**Addresses requirements:** (prerequisite data routing for all role-based UI behavior)

- #7: Column 1 zero state — admin writes to main setting; user writes to personal file
- #9: Column 3 Bible texts zero state — same routing behavior
- #12: Column 3 Commentaries zero state — same routing behavior

### Description

The project settings data provider must be updated to route writes and reads for `platformScripture.modelTexts` and `platformScripture.referencedProjectsAndResources` based on user role:

- **Writes:** admin users write to the main project settings file as before. Non-admin users write to `Studio/UserSettings-{userId}.xml` in the project folder (created on first write if it doesn't exist).
- **Reads:** the data provider merges entries from both sources and returns a single list. Each entry in the merged list carries a runtime `source: 'admin' | 'user'` tag derived from which file it came from. This tag is not stored on disk — it is computed at read time.

No changes to the `ResourceReferenceList` or `ResourceReference` types are required. The `Studio/UserSettings-{userId}.xml` file is local-only for now; S/R support will be a follow-on ticket.

### Implementation Ideas

In the project settings data provider, intercept write calls for `modelTexts` and `referencedProjectsAndResources`. Check whether the current user is a project admin. If not, redirect the write to `Studio/UserSettings-{userId}.xml`. For reads, load both files, tag each entry with `source: 'admin'` or `source: 'user'` based on origin, and return the merged list to callers.

### Definition of Done

- Non-admin writes to `modelTexts` and `referencedProjectsAndResources` go to `Studio/UserSettings-{userId}.xml`.
- Admin writes continue to go to the main project settings file.
- Reads return a merged list where each entry has a `source: 'admin' | 'user'` tag.
- `Studio/UserSettings-{userId}.xml` is created automatically on first non-admin write.
- No changes to `ResourceReferenceList` or `ResourceReference` types.
- TypeScript compilation passes with no errors.

---

## T4 — Shared `ResourcePickerDialog` component

**Addresses requirements:**

- #7: Column 1 zero state — resource selection UI (shared component)
- #9: Column 3 Bible texts zero state — resource selection UI (shared component)
- #12: Column 3 Commentaries zero state — resource selection UI (shared component)

### Description

A shared `ResourcePickerDialog` React component used by the Model Text Panel (T5), the Bible texts tab (T6), and the Commentaries tab (T7). It provides a consistent resource-selection UI across all three panels, modeled on the `platform-get-resources` visual design.

The dialog shows only already-downloaded resources. It accepts a `resourceType` prop to pre-select and lock the type filter, and an `excludedResources` prop to hide resources already selected in the calling panel. When the user clicks "Use", the `onSelect` callback fires and the caller writes the selection via the data provider.

### Implementation Ideas

Build a modal dialog component with search, type filter (locked to the caller-provided `resourceType`), language filter, and a resource list. Base the visual design on `platform-get-resources`. Replace the Install/Installed button with a "Use" button. Filter out entries in `excludedResources` before rendering the list.

```ts
interface ResourcePickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resourceType?: 'modelText' | 'bibleText' | 'commentary';
  excludedResources?: ResourceReference[];
  onSelect: (resource: ResourceReference) => void;
}
```

### Definition of Done

- `ResourcePickerDialog` renders a modal with search, type filter (locked to `resourceType` prop), language filter, and resource list.
- Only already-downloaded resources are shown.
- Resources in `excludedResources` are not shown in the list.
- Each resource entry has a "Use" button; clicking it calls `onSelect` and closes the dialog.
- The component is consumed by T5 (Model Text Panel), T6 (Bible texts tab), and T7 (Commentaries tab).
- TypeScript compilation passes with no errors.

---

## T5 — Model text panel (Column 1)

**Addresses requirements:**

- #2: Column 1 model text panel
- #5: All content syncs to main toolbar BCV
- #7: Column 1 zero state — admin/user can both select; admin overrides on sync
- #8: Column 1 resource picker — shows associated resources first; projects hidden by default

### Description

Column 1 displays a model text (reference translation) in read-only mode, synchronized to the main app toolbar BCV. The panel reads `platformScripture.modelTexts` via the data provider, which returns a merged list of entries from the main project setting (admin) and the current user's personal `Studio/UserSettings-{userId}.xml`. Each entry carries a `source: 'admin' | 'user'` tag. The panel displays all entries in this merged list; entries from other users are never included.

### Implementation Ideas

Reuse the existing scripture editor/reader component in read-only mode inside the Column 1 panel. Add a selector UI above (or integrated into) the panel that:

- Displays all entries returned by the data provider's merged read (both `source === 'admin'` and `source === 'user'` entries).
- Allows the user to switch between multiple available model texts.
- Shows a zero-state prompt ("Select a model text") when the merged list is empty, which opens the shared `ResourcePickerDialog` (T4) with `resourceType='modelText'` and current selections as `excludedResources`.

When a user makes a selection, write the entry to `modelTexts` — the data provider handles routing it to the correct file based on the user's role.

### Definition of Done

- Column 1 displays the selected model text in read-only mode, scrolling in sync with the main app toolbar BCV.
- A selector shows all entries from the merged list (admin + current user).
- Zero state shows a prompt that opens the `ResourcePickerDialog` (T4) with `resourceType='modelText'`.
- Writing a selection routes correctly: admin writes go to the main setting, non-admin writes go to the personal file (verified via T3).
- Depends on T4 (ResourcePickerDialog).

---

## T6 — Bible texts tab (Column 3)

**Addresses requirements:**

- #4: Column 3 resources & tools panel with Bible texts tab
- #5: All content syncs to main toolbar BCV
- #9: Column 3 Bible texts zero state — admin adds to user entries on sync
- #10: Column 3 Bible texts daily use — selector UI and "Download resources" action
- #11: Downloadable Bible texts filtered by DBL licensing permissions

### Description

The first tab in Column 3 ("Bible texts") lets Saroj select and read a downloaded Bible text resource alongside his project. The tab reads `platformScripture.referencedProjectsAndResources` via the data provider, which returns a merged list filtered to Bible text resources. Each entry has a `source: 'admin' | 'user'` tag. The tab displays all entries in the merged list; entries from other users are never included. Remove behavior is a nice-to-have handled in T10.

### Implementation Ideas

Add a "Bible texts" tab to the Column 3 panel using the existing docking tab system. Inside the tab:

- Display all entries from the data provider's merged read filtered to Bible text types (both `source === 'admin'` and `source === 'user'` entries).
- Show the selected resource text content synchronized to the main app toolbar BCV, reusing the existing scripture reader.
- Provide a selector to switch between available Bible texts.
- Zero state: prompt to select a preferred Bible text, opening the shared `ResourcePickerDialog` (T4) with `resourceType='bibleText'` and current selections as `excludedResources`.
- "Download resources" button opens `platform-get-resources`.

When a user adds a Bible text, write the entry to `referencedProjectsAndResources` — the data provider routes it to the correct file based on the user's role.

### Definition of Done

- "Bible texts" tab exists in Column 3 and displays the selected resource synchronized to the BCV.
- Selector shows all entries from the merged list (admin + current user).
- Zero state shows a prompt that opens the `ResourcePickerDialog` (T4) with `resourceType='bibleText'`.
- "Download resources" opens `platform-get-resources`.
- Writing a new selection routes correctly via the data provider (verified via T3).
- Depends on T3 (data routing) and T4 (ResourcePickerDialog).

---

## T7 — Commentaries tab (Column 3)

**Addresses requirements:**

- #4: Column 3 resources & tools panel with Commentaries tab
- #5: All content syncs to main toolbar BCV
- #12: Column 3 Commentaries zero state — admin adds to user entries on sync
- #13: Column 3 Commentaries daily use — selector UI and "Download commentaries" action
- #14: Only UBS Handbook and SIL TNN/TND available for download

### Description

The second tab in Column 3 ("Commentaries") lets Saroj read a commentary alongside his project. It follows the same structure as the Bible texts tab but is filtered to commentary resources — the data provider returns the same merged list with `source` tags, just filtered to commentary types. Only specific commentaries are available for download: UBS Handbook and SIL TNN/TND in English. The "Download commentaries" action opens `platform-get-resources` filtered directly to the commentaries resource type. Remove behavior is a nice-to-have handled in T10.

### Implementation Ideas

Add a "Commentaries" tab to the Column 3 panel alongside the Bible texts tab. The implementation mirrors T6 exactly, with two differences:

- Filter `referencedProjectsAndResources` to commentary resource types instead of Bible text types.
- The "Download commentaries" button opens `platform-get-resources` passing a `resourceType=commentaries` filter parameter (implemented in T8) so the view opens directly on the commentaries list.

### Definition of Done

- "Commentaries" tab exists in Column 3 and displays the selected commentary synchronized to the BCV.
- Selector, zero state, and filtering behavior all match T6 (with commentary-type filtering); zero state opens the `ResourcePickerDialog` (T4) with `resourceType='commentary'`.
- "Download commentaries" opens `platform-get-resources` landing directly on the commentaries view.
- Admin-added entries are locked from removal with a tooltip (nice-to-have, T10).
- Depends on T3 (data routing) and T4 (ResourcePickerDialog).

---

## T8 — Add commentaries resource type to `platform-get-resources`

**Addresses requirements:**

- #10: Column 3 Bible texts daily use — "Download resources" action
- #11: Downloadable Bible texts filtered by DBL licensing permissions
- #13: Column 3 Commentaries daily use — "Download commentaries" action
- #14: Only UBS Handbook and SIL TNN/TND available for download

### Description

The `platform-get-resources` extension needs a new commentaries resource type so users can browse and download commentaries from within Platform.Bible. The available list is curated and limited: UBS Handbook and SIL TNN/TND in English. The extension also needs to support an optional resource-type filter parameter so it can be opened directly on the commentaries view when launched from Column 3.

### Implementation Ideas

In the `platform-get-resources` extension:

1. Define a new `commentaries` resource type with a hardcoded list of available titles (UBS Handbook, SIL TNN/TND in English).
2. Add a filtered view for this type in the existing resource browsing UI, consistent with how other resource types are presented.
3. Add support for an optional `resourceType` parameter when the extension's WebView or command is invoked, which pre-selects the given resource type tab/filter on open.

The download flow itself reuses existing infrastructure — no new download mechanics needed.

### Definition of Done

- `platform-get-resources` shows a commentaries section listing UBS Handbook and SIL TNN/TND in English.
- Commentaries can be downloaded through the existing download flow.
- The extension accepts a `resourceType` filter parameter and opens directly on the specified type when provided.
- Opening from the Commentaries tab in Column 3 (T7) lands directly on the commentaries view.

---

## T9 (Nice-to-have) — Prevent columns from being moved or closed

**Addresses requirements:** none — this is a nice-to-have, cut first if time is tight

### Description

In the 10Simple layout, columns should not be movable or closable by the user. This ticket implements the UI constraints that enforce the fixed 3-column arrangement. Cut this ticket first if time is tight.

### Implementation Ideas

When `platform.interfaceMode` is `'simple'`, disable the drag handles and close buttons on the three 10Simple columns within `platform-dock-layout`. This may involve conditionally hiding or disabling the relevant controls based on the interface mode setting.

### Definition of Done

- In 10Simple mode, columns cannot be dragged to a new position.
- In 10Simple mode, columns cannot be closed.
- These constraints do not apply when `interfaceMode` is `'power'`.

---

## T10 (Nice-to-have) — Resource removal with admin-lock enforcement

**Addresses requirements:** nice-to-have — resource removal UI for Bible texts and Commentaries tabs

### Description

Both Donna and Saroj should be able to remove resources they have added from the Bible texts and Commentaries tabs in Column 3. However, Saroj cannot remove resources that Donna (the project admin) added — the remove button for those entries is disabled and displays an explanation tooltip. This ticket depends on T3 (data provider routing and `source` tag), T6 (Bible texts tab), and T7 (Commentaries tab) being complete.

### Implementation Ideas

In the Bible texts and Commentaries tab UIs (T6 and T7), add a remove button alongside each resource entry. Use the `source` tag on each entry (provided by the data provider's merged read) to determine behavior:

- `source === 'user'`: remove button is enabled; clicking removes the entry from the user's personal `Studio/UserSettings-{userId}.xml`.
- `source === 'admin'`: remove button is disabled with a tooltip such as "This resource was added by your project admin and cannot be removed."

Removing an entry writes the updated list back via the data provider, which routes the write to the appropriate file.

### Definition of Done

- Each resource entry in the Bible texts and Commentaries tabs has a remove button.
- Entries with `source === 'user'` have an enabled remove button; clicking removes the entry from the user's personal file.
- Entries with `source === 'admin'` have a disabled remove button with an explanatory tooltip.
- Removing an entry correctly updates the personal settings file via the data provider.
- Depends on T3 (data routing), T6 (Bible texts tab), and T7 (Commentaries tab).
