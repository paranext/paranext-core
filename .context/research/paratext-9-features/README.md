# Paratext 9 Feature Inventory (bundled)

A catalogue of Paratext 9 features — for each: entry points (menus/handlers/shortcuts),
forms/dialogs, implementing C# classes (with `file:line` evidence), manual and HelpData
references, and which sources corroborate each finding. Used by the `feature-mapper` agent
(and `/investigate-prd`) to map a PRD's PT9 references to "where to look in PT9."

## How it's organized

- `00_Master_Feature_Index.md` — the lookup hub: a **Category Overview** (per-category file +
  feature table) and an **Alphabetical Index** (`- **Feature name** → C.F`). Start here.
- `NN_<Category>.md` — 16 category files. A "category" is the 2-digit prefix; a feature ID is
  `C.F` (category.feature), e.g. `10.1` = Send/Receive in `10_Collaboration_Sync.md`.

## Source codes

| Code | Source | PT9 artifact |
|:----:|--------|--------------|
| MS | Menu Structure | menu paths + Click-handler names/lines |
| FR | Form Relationships | WinForms forms / which form opens which dialog |
| R  | Requirements | requirements spec |
| M  | Manual | Paratext User Manual chapters |
| H  | HelpData | `HelpData.xml` context-help items (GUID + question + dialog) |
| C  | Code | Paratext C# source files |

## Provenance & maintenance

- Brought over **once** on 2026-06-18 from `ai-prompts/lyonsm/Paratext_Feature_Inventory/v2/`
  (source last verified 2026-01-21). **This bundled copy is now the source of truth.**
- The `lyonsm/` copy is obsolete — do not sync from it. Going forward, edit these files
  directly (here, and once this profile lands in paranext-core, there).
