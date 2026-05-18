# Porting PT9 Settings UIs into the PT10 Settings Dialog — Plan

> **Status:** Draft for review. Author: agent-generated based on user direction.
> **Scope:** Refactor the existing `SettingsTab` so it (a) is presentational + storybookable, (b) matches the new sidebar design that mirrors PT9's settings layout, and (c) cleanly separates dynamic-from-PAPI content from hard-coded "coming soon" entries.

---

## 1. Background

### 1.1 Current state

- The settings UI lives in [src/renderer/components/settings-tabs/settings-tab.component.tsx](settings-tab.component.tsx).
- It is a single component that:
  - Pulls localized strings via `useLocalizedStrings`.
  - Loads two contribution sources from PAPI:
    - `settingsService.getLocalizedSettingsContributionInfo()` — keyed by extension, contributes "General" / "Extension" setting groups.
    - `projectSettingsService.getLocalizedContributionInfo()` — keyed by extension, contributes project-scoped setting groups, then filtered by the selected project's `projectInterfaces`.
  - Loads project metadata via `projectLookupService.getMetadataForAllProjects()` and resolves each project's display name through the `platform.base` PDP.
  - Renders the `SettingsSidebarContentSearch` shell from `platform-bible-react` with two groups: **Extension Settings** (one entry per extension) and **Project Settings** (a single combo box that selects one project).
- `SettingsSidebarContentSearch` / `SettingsSidebar` live in [lib/platform-bible-react/src/components/advanced/settings-components/](../../../../lib/platform-bible-react/src/components/advanced/settings-components/) and already have storybook stories.
- When `projectIdToLimitSettings` is passed in (e.g., dialog opened from the project context menu), the sidebar is suppressed entirely and only the project's settings render.

### 1.2 Target state (from user)

A redesigned settings dialog with three sidebar sections:

1. **Project** section

   - **Project picker** (combo box) shown at the top — relocated from the current "Project Settings" group header. When opened with `projectIdToLimitSettings`, the picker still renders but is preselected.
   - **Project properties** — a single sidebar item whose right-panel content is **dynamic** (renders all project-setting-contribution groups for the selected project; this is today's behavior collapsed into one item).
   - The PT9 project screens, **all hard-coded** with a "Coming soon" placeholder right-panel for now:
     - Language settings
     - Books
     - Inventories
     - Scripture reference settings
     - Biblical Terms
     - Quotation rules
     - Project plan
     - User permissions
     - Priorities
     - Project canons
   - Order matches the design mock-up the user attached.

2. **General** section

   - **Dynamic**: one sidebar item per **in-repo** extension that contributes general settings (existing behavior, filtered by extension origin — see §3).

3. **Extensions** section
   - **Dynamic**: one sidebar item per **third-party (out-of-repo)** extension that contributes general settings.

All three sections are visible regardless of whether the dialog was opened scoped to a single project.

### 1.3 User's three steps

1. Turn the current settings UI into a (pure presentational) component with a storybook story.
2. Reorganize the sidebar to match the new design.
3. Make only "Project properties" and the in-repo General entries dynamic; the other Project-section entries are hard-coded; Extensions section lists settings from out-of-repo extensions only.

### 1.4 User decisions captured (do not re-litigate without asking)

| Decision                         | Choice                                                                                                                                                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unimplemented hard-coded entries | Empty placeholder with "Coming soon" message.                                                                                                                                                                                |
| In-repo vs third-party detection | Derived from extension manifest path.                                                                                                                                                                                        |
| Project picker when scoped       | Keep existing combo box, just relocate it to top of Project section.                                                                                                                                                         |
| Component location               | Stay in `src/renderer/components/settings-tabs/`; extract a sub-component locally.                                                                                                                                           |
| Dyn/hardcoded split              | General section is one dynamic entry per in-repo extension (existing behavior). PT9 entries below the project selector are hard-coded; "Project properties" is the first one and holds the current dynamic project settings. |
| Scoped dialog sections           | All three sections (Project / General / Extensions) visible.                                                                                                                                                                 |

---

## 2. Component decomposition

```
src/renderer/components/settings-tabs/
├── settings-tab.component.tsx           # thin wrapper: PAPI plumbing + localization
├── settings-tab.component.scss          # (existing styles, extended as needed)
├── settings-layout/
│   ├── settings-layout.component.tsx    # NEW: pure presentational shell (storybookable)
│   ├── settings-layout.stories.tsx      # NEW: storybook with sample data
│   ├── settings-layout.types.ts         # NEW: prop types incl. SidebarEntry union
│   └── hardcoded-project-entries.ts     # NEW: the static PT9 entries list (i18n keys)
└── settings-components/
    ├── project-or-other-settings-list.component.tsx   # existing, may stay
    ├── coming-soon-panel.component.tsx                # NEW: shared "Coming soon" right-panel
    └── …
```

### 2.1 `SettingsLayout` (presentational)

Receives **everything** via props — no PAPI imports, no hooks beyond local UI state. This makes it storybookable and reuses for testing.

Proposed prop shape (TypeScript-sketch, may iterate during impl):

```ts
type DynamicSidebarItem = {
  /** Stable id, e.g., the extension key */
  id: string;
  /** Display label (already localized) */
  label: string;
};

type HardcodedSidebarItem = {
  id: string; // e.g., 'language-settings'
  label: string; // already localized
  isComingSoon: true; // disambiguator
};

type SettingsLayoutProps = {
  // header / sidebar
  projectOptions: ProjectInfo[];
  selectedProjectId: string | undefined;
  onSelectProject: (projectId: string) => void;
  /** Disables the combo box when scoped */
  isProjectLocked?: boolean;

  // sidebar entries
  projectSectionEntries: ReadonlyArray<DynamicSidebarItem | HardcodedSidebarItem>;
  generalEntries: DynamicSidebarItem[];
  extensionEntries: DynamicSidebarItem[];

  // selection
  selectedEntry: { section: 'project' | 'general' | 'extensions'; id: string };
  onSelectEntry: (next: SettingsLayoutProps['selectedEntry']) => void;

  // search
  searchValue: string;
  onSearch: (q: string) => void;

  // right-panel content: caller renders the content; layout just slots it in.
  // When the selected entry is hard-coded, the layout draws the ComingSoon panel itself.
  renderContent: () => React.ReactNode;

  // localized labels (small bag)
  labels: {
    projectSection: string; // "Project"
    generalSection: string; // "General"
    extensionsSection: string; // "Extensions"
    comingSoonTitle: string; // "Coming soon"
    comingSoonBody: string; // helper text
    searchPlaceholder: string;
    noResultsTitle: string;
    noResultsBodyTemplate: string; // contains {query}
  };
};
```

This isolates the pure UI from PAPI orchestration. `SettingsTab` becomes the wrapper that:

- Fetches all PAPI data (contributions, project metadata, installed-extension origin info).
- Computes the three entry lists.
- Manages selected entry state.
- Renders right-panel content based on the selected entry (calling `ProjectOrOtherSettingsList` for dynamic items; passing through for hardcoded handled inside layout).

### 2.2 `SettingsSidebar` changes (`platform-bible-react`)

The existing `SettingsSidebar` only knows about two groups (extensions + projects-combobox). We have two options:

- **A. Generalize `SettingsSidebar`.** Add a "sections" prop where each section can be `{ label, items, header? }` so callers can declare arbitrary sections in order. Project combo box becomes a `header` slot on the Project section.
- **B. Keep `SettingsSidebar` shape, add a parallel `ProjectSettingsSidebar` in the renderer.** Avoids touching the shared lib.

**Recommendation:** Option A. It's a small, well-bounded change to a generic primitive and is the natural shape for this design. Existing stories continue to work after the API extension as long as we provide backward-compatible defaults. The current `extensionLabels` / `projectInfo` props become derivable from `sections` instead.

If A turns out to be too invasive for one PR, we fall back to B (renderer-local sidebar) and revisit later.

### 2.3 `ComingSoonPanel`

Trivial presentational component used by `SettingsLayout` when a hard-coded entry is selected. Inputs: a localized title and body. Lives in `settings-components/`.

---

## 3. In-repo vs third-party extension detection

User chose "Derived from extension manifest path." Today, the renderer has **no direct API** for extension provenance:

- The authoritative source is `getInstalledExtensions()` in `src/extension-host/services/extension.service.ts`. It returns `enabled` / `disabled` / `packaged`. **"Packaged" extensions are those bundled with the app** (i.e., shipped from `paranext-core/extensions/src/*`), which corresponds exactly to "in-repo."
- That API is exposed via the **elevatedPrivilege `manageExtensions`** — not callable from arbitrary renderer code; only granted to specifically allowlisted extensions.

### 3.1 Options

| #   | Approach                                                                                                                              | Pros                                                    | Cons                                                                                             |
| --- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1   | Expose a small **PAPI command** like `platform.getBundledExtensionIds` that wraps `getInstalledExtensions().packaged` (or equivalent) | Clean separation; renderer doesn't need elevated privs. | Adds a new platform command; needs careful permissions audit.                                    |
| 2   | Hard-code an allow-list of in-repo extension IDs in the renderer                                                                      | Zero new APIs.                                          | Has to be kept in sync manually whenever a new in-repo extension lands. Drifts silently.         |
| 3   | Add an explicit `section` hint to `projectSettings.json` / settings contributions                                                     | Extensions self-declare.                                | Doesn't match user's stated preference; requires every in-repo extension to update its manifest. |
| 4   | Surface `dirUri` or origin in the existing settings contribution info                                                                 | Information is "right there" on the extension info.     | Needs new metadata plumbing through `SettingsContributionInfo`.                                  |

### 3.2 Recommendation

Option **1** + a thin renderer service wrapper. Concretely:

- Add a renderer-exposed selector (e.g., `extensionService.getBundledExtensionIds(): Promise<string[]>`) that internally proxies `getInstalledExtensions().packaged`. No new privilege required because the result is read-only and contains only names already implicit in the manifest contributions.
- `SettingsTab` uses this set to partition the dynamic settings contributions into General (member ∈ set) vs Extensions (member ∉ set).
- If creating a new platform API in this PR is out of scope, fall back to Option 2 with a `TODO` and a unit test snapshot to flag drift.

**Open question for human review:** Is adding a new platform-level "list bundled extension names" API acceptable in the same PR as the UI work? If not, we ship Option 2 as a stopgap and file a follow-up ticket.

---

## 4. Hard-coded entry list

Defined once in [hardcoded-project-entries.ts](settings-layout/hardcoded-project-entries.ts) and consumed in order:

```ts
export const HARDCODED_PROJECT_ENTRIES = [
  { id: 'language-settings', labelKey: '%settings_project_languageSettings%' },
  { id: 'books', labelKey: '%settings_project_books%' },
  { id: 'inventories', labelKey: '%settings_project_inventories%' },
  { id: 'scripture-reference', labelKey: '%settings_project_scriptureReferenceSettings%' },
  { id: 'biblical-terms', labelKey: '%settings_project_biblicalTerms%' },
  { id: 'quotation-rules', labelKey: '%settings_project_quotationRules%' },
  { id: 'project-plan', labelKey: '%settings_project_projectPlan%' },
  { id: 'user-permissions', labelKey: '%settings_project_userPermissions%' },
  { id: 'priorities', labelKey: '%settings_project_priorities%' },
  { id: 'project-canons', labelKey: '%settings_project_projectCanons%' },
] as const;
```

`Project properties` is **prepended** dynamically (always present, always first, always dynamic).

---

## 5. Localization additions

To be added to [assets/localization/en.json](../../../../assets/localization/en.json) (and registered in the `metadata.json` schema):

| Key                                             | English value                                                  |
| ----------------------------------------------- | -------------------------------------------------------------- |
| `%settings_sidebar_projectSectionLabel%`        | "Project"                                                      |
| `%settings_sidebar_generalSectionLabel%`        | "General"                                                      |
| `%settings_sidebar_extensionsSectionLabel%`     | "Extensions"                                                   |
| `%settings_project_properties%`                 | "Project properties"                                           |
| `%settings_project_languageSettings%`           | "Language settings"                                            |
| `%settings_project_books%`                      | "Books"                                                        |
| `%settings_project_inventories%`                | "Inventories"                                                  |
| `%settings_project_scriptureReferenceSettings%` | "Scripture reference settings"                                 |
| `%settings_project_biblicalTerms%`              | "Biblical Terms"                                               |
| `%settings_project_quotationRules%`             | "Quotation rules"                                              |
| `%settings_project_projectPlan%`                | "Project plan"                                                 |
| `%settings_project_userPermissions%`            | "User permissions"                                             |
| `%settings_project_priorities%`                 | "Priorities"                                                   |
| `%settings_project_projectCanons%`              | "Project canons"                                               |
| `%settings_comingSoon_title%`                   | "Coming soon"                                                  |
| `%settings_comingSoon_body%`                    | "This settings page hasn't been ported to Platform.Bible yet." |

The two existing keys for the General/Project group labels are **retained** for the storybook stories of `SettingsSidebar` that already use them; new section labels are added alongside.

---

## 6. Storybook story

`settings-layout.stories.tsx` in the renderer-local folder. Because storybook lives in `lib/platform-bible-react`, and the user explicitly asked the new component to stay in `src/renderer`, we have two options:

- **A.** Keep the story under `lib/platform-bible-react/src/stories/...` and import the renderer component (this is what `Settings-Tab` currently isn't — but `SettingsSidebar` already lives there). Cross-import direction wrong; rejected.
- **B.** Add storybook support to `src/renderer` (new Vite config). Heavy.
- **C.** Make `SettingsLayout` purely props-driven so it can be moved **temporarily** for the story, OR add it to platform-bible-react after all.

**Recommendation:** Re-confirm with the user. Their step 1 says "make the current settings UI a component and create a storybook story for it" — implying a story is required. But step "Where should the new pure presentational component live" was answered as "keep in `src/renderer/components/settings-tabs`, extract sub-component". These two pull in opposite directions.

> **Open question:** Should we (a) move only the pure layout into `lib/platform-bible-react` so storybook can host it, while the renderer keeps the wrapper, or (b) wire storybook to also scan `src/renderer`? Default plan, if no further input: do (a) — split `SettingsLayout` into `lib/platform-bible-react/src/components/advanced/settings-components/settings-layout.component.tsx` and add the story alongside the existing settings stories. `SettingsTab` in renderer continues to orchestrate PAPI. This minimally violates the "keep in renderer" guidance, but is the only way to satisfy "create a storybook story" without a major harness change.

Story coverage:

- Default (multi-project, populated contributions, no project locked).
- Scoped (project locked).
- Empty project (no projects).
- Empty extensions (no third-party extensions installed).
- Hard-coded entry selected (shows the Coming Soon panel).
- Search with no results.
- Long lists (scrollable sidebar).

---

## 7. Implementation step-list (proposed PR breakdown)

A single PR is reasonable for this scope; if it gets unwieldy, split at the `---` boundaries below.

1. **Localization plumbing** — add the new keys to `en.json` + the metadata schema if applicable.

---

2. **`ComingSoonPanel`** — small dumb component, snapshot test.

---

3. **`SettingsLayout` + sidebar refactor** — extract the presentational shell. Generalize `SettingsSidebar` to take section configurations (Option A from §2.2). Update existing `SettingsSidebar` stories to use the new prop shape (or keep a backward-compatible adapter).

---

4. **Hard-coded project entries** — add `hardcoded-project-entries.ts` and wire into `SettingsLayout`.

---

5. **In-repo extension detection** — implement Option 1 from §3 (subject to confirmation): add platform method + renderer service wrapper. Partition dynamic contributions in `SettingsTab`.

---

6. **`SettingsTab` rewrite** — make it a thin wrapper that fetches PAPI data and feeds `SettingsLayout`. Preserve `projectIdToLimitSettings` semantics with the picker locked.

---

7. **Storybook story** — see §6 once location is finalized.

---

8. **Verification** — `npm run lint` repo-root (per lint-sweep-verification rule), unit tests, manual smoke test of the dialog in the live app (using `./.erb/scripts/refresh.sh` to refresh; see app-refresh rule).

---

## 8. Risks & decisions still open

- **R1.** Whether `SettingsLayout` lives in `lib/platform-bible-react` or stays in `src/renderer` (see §6). Needs user confirmation.
- **R2.** Whether the in-repo detection mechanism in §3 (new platform API) is acceptable scope, or whether to fall back to an allow-list.
- **R3.** Whether `SettingsSidebar` should be generalized (§2.2 Option A) — minor breaking change to its existing prop API even if backward-compatible adapter is added.
- **R4.** Behavior when the user clicks a hard-coded entry while the dialog is **scoped to a project**: probably the same Coming Soon panel; no special-casing planned unless requested.
- **R5.** Search behavior for hard-coded entries: should they be filtered out of the sidebar by the search box (since there is no real content to search)? **Default plan:** filter by label match against `searchValue` — so `Books` shows if `Books` matches the query — but selecting it still shows the Coming Soon panel. Easy to change.

---

## 9. Out of scope (explicitly **not** in this PR)

- Implementing any of the PT9 settings screens (Books, Inventories, etc.).
- Restructuring contribution JSON formats for project settings.
- Permission/role logic for which sidebar entries appear.
- Persisting the user's last-selected sidebar entry.

---

## 10. Verification checklist

- [ ] `npm run lint` exits 0 from repo root.
- [ ] `dotnet test` / `npm test` (unit) pass.
- [ ] Manual smoke: open settings from menu — three sections render; project picker selects a project; Project properties shows dynamic contributions; clicking a hard-coded entry shows Coming Soon; Extensions section is empty in a fresh dev checkout (no third-party extensions installed).
- [ ] Manual smoke: open settings scoped to a project (right-click → Project settings) — same three sections, picker locked.
- [ ] Storybook story renders in all defined variants.
- [ ] No new TypeScript suppressions; no new `eslint-disable` without justification.
