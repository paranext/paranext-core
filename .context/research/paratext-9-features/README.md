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
| M  | Manual | Paratext User Manual chapters, bundled at [`../paratext-manual/`](../paratext-manual/README.md) |
| H  | HelpData | `HelpData.xml` context-help items (GUID + question + dialog). **Not included in this repo** — `[H]` rows are retained as provenance markers from the original survey, not resolvable references. |
| C  | Code | Paratext C# source files |

## Related analyses

- [`../Paratext-Feature-Porting-Analysis.md`](../Paratext-Feature-Porting-Analysis.md) — per-feature porting complexity assessment derived from this inventory.
- [`../ParatextData-PT10-Readiness-Assessment.md`](../ParatextData-PT10-Readiness-Assessment.md) — which `ParatextData.dll` surfaces the PT10 backend can already reach.

## Licensing

**PT9-derived excerpts are not covered by this repo's MIT license.** The `file:line`
citations, class/method names, and short C# excerpts throughout this inventory describe the
closed-source Paratext 9 codebase and are included for reference only.

## Provenance & maintenance

- Brought over **once** on 2026-06-18 from `ai-prompts/lyonsm/Paratext_Feature_Inventory/v2/`
  (source last verified 2026-01-21). **This bundled copy is now the source of truth.**
- The `lyonsm/` copy is obsolete — do not sync from it. Going forward, edit these files
  directly (here, and once this profile lands in paranext-core, there).
- **PT9 provenance**: the inventory describes PT9 as observed during the original survey
  (~2026-01, the "Last verified" dates on each entry), with spot-verification against the team's
  reference checkout at commit `5538787d12adf9fa78ca67f7c598df4411d7442e` (2026-06-12) when it
  landed in paranext-core. Citations are **file + symbol** anchors (line numbers were removed
  2026-08-03 — symbols survive PT9's evolution, line numbers don't); verify current behavior by
  grepping the symbol in your live PT9 checkout.
- The original survey's generated evidence sources (`menu_structure_*.json`,
  `form_relationships_*.json`, `HelpData.xml`) are **not** committed here, so the inventory is
  a curated snapshot — it can be hand-maintained but not regenerated or mechanically diffed
  against a newer PT9.
