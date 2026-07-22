# Paratext 9 - Advanced Checking Tools

**Category**: 09  
**Focus**: Alignment, comparison, and consultant-level tools  
**User Roles**: Consultants, Advanced Reviewers  
**Manual Chapters**: 17 (Interlinearize), 18 (Compare Text), 23 (Parallel Passages)  
**Last Updated**: 2026-01-21

---

## Overview

Advanced Checking Tools are sophisticated analysis features typically used by consultants and experienced reviewers. They enable detailed comparison of texts, word-level alignment analysis, and verification that parallel Scripture passages are harmonized.

---

## Feature List

### 9.1 Interlinear Tool

**Description**: Word-by-word alignment between a translation and source text or back translation. Shows how each word translates.

> **Note**: This same tool is used for generating interlinear back translations. See **12.2 Interlinear Back Translation** for that workflow.

**Sub-Features**:
- Align words between texts
- Gloss individual words
- Multiple alignment per word
- Parse word morphology
- Copy glosses to back translation
- Export interlinear data
- Approve alignments

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Interlinearizer`; Handler: `uiFileOpenInterlinear_Click`; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Form Relationships | `InterlinearForm` opens `InterlinearSetupForm`, `CopyGlossesForm` | `[FR]` |
| HelpData | Keyword: `ComponentInterlinearizer`; Dialog: `InterlinearSetupForm` | `[H]` |
| Manual | `chapters/17_back_translation_2.md`: "you can use Paratext's project Interlinearizer function" | `[M]` |
| Requirements | Section: "Quality Checking/Validation > Interlinear View" | `[R]` |

**Key Quote** (from Requirements):
> "An interlinear view is a view that runs the words of two different translations above and below one another, aligning the words with the same meaning"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `uiFileOpenInterlinear_Click` at line 408 |
| 1 | `Paratext/Interlinear/InterlinearForm.cs` | Opens from D0 | Form Relationships: `InterlinearForm` |
| 1 | `Paratext/Interlinear/InterlinearSetupForm.cs` | Opens from D1 | Form Relationships line 783: `new InterlinearSetupForm()` |
| 2 | `Paratext/ToolsMenu/CopyGlossesForm.cs` | Opens from D1 | Form Relationships: InterlinearForm opens CopyGlossesForm |

**Not Found**:
- `InterlinearSetups.cs` as standalone file (search: "InterlinearSetups" - class defined in `InterlinearSetup.cs`)

**Dialog Navigation**:
- `InterlinearForm` → `InterlinearSetupForm` (line 783)
- `InterlinearForm` → `CopyGlossesForm` (via menu)

**UI Entry Points**:
- Tools > Interlinearizer
  - Menu Structure: `ParatextWindowWithMenus`, handler `uiFileOpenInterlinear_Click`, line 408
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- View > Interlinear display settings (within InterlinearForm)
  - Menu Structure: `InterlinearForm`, handler `displaySettingsToolStripMenuItem_Click`, line 800
  - File: `Paratext/Interlinear/InterlinearForm.cs`
- Also documented in:
  - Manual: `chapters/17_back_translation_2.md`, line 35
  - Quote: "**≡ Tab**, under **Tools** > **Interlinearizer**"
  - HelpData ID: `b1107d4d-2bed-4d4b-a1c5-664edc3e0b5b`

**HelpData Items**:
- ID: `6aa250fe-c02d-450c-b49e-b9aff98fc833` - "How do I create a back translation project with the Interlinearizer?"
- ID: `cf150fe0-89eb-4155-a868-296695e33a44` - "What is the Interlinearizer?"
- ID: `b1107d4d-2bed-4d4b-a1c5-664edc3e0b5b` - "How do I open the Interlinearizer?"
- Dialogs: `InterlinearSetupForm`, `InterlinearSetupForm_uiBasicTab`, `InterlinearSetupForm_uiAdvancedTab`, `CopyGlossesForm`
- Total items: 31 related help items

**Validation**: [MS] [FR] [H] [M] [R] [C] — Last verified: 2026-01-21

---

### 9.2 Parallel Passages Tool

**Description**: Compare passages that quote or echo each other throughout Scripture to ensure they are translated consistently.

**Sub-Features**:
- Pre-defined parallel passage list
- Show parallel texts side-by-side
- Highlight differences
- Navigate between parallels
- Mark as reviewed
- Custom parallel definitions
- Color-coded similarity indicators

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Parallel Passages`; Handler: `parallelPassagesToolStripMenuItem_Click`; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Form Relationships | `ParallelPassagesTool` opens `ScrTextListSelectionForm`, `BookChooserForm` | `[FR]` |
| HelpData | Keyword: `ComponentParallelPassages`; Dialog: `ParallelPassagesTool` | `[H]` |
| Manual | `chapters/23_parallel_passages.md`: "thousands of passages in the NT where either the same event is being described" | `[M]` |
| Requirements | Section: "Quality Checking/Validation > Parallel Passages" | `[R]` |

**Key Quote** (from Requirements):
> "The parallel passage tool is a convenient way to work through a curated list of parallelisms and see quickly if those passages in your project are identical, similar, or different"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `parallelPassagesToolStripMenuItem_Click` at line 400 |
| 1 | `Paratext/ParallelPassages/ParallelPassagesTool.cs` | Opens from D0 | Form Relationships: tool form |
| 2 | `Paratext/ParallelPassages/Filter/PassageFilterSelectionAdapter.cs` | Import in D1 | Line 17: `using Paratext.ParallelPassages.Filter` |
| 2 | `ParatextData/ParallelPassages/ParallelPassageStatus.cs` | Import in D1 | Line 30: `using Paratext.Data.ParallelPassages` |

**Not Found**:
- None - all expected files located

**Dialog Navigation**:
- `ParallelPassagesTool` → `ScrTextListSelectionForm` (line 616: Select comparative texts)
- `ParallelPassagesTool` → `BookChooserForm` (line 893: Select books to check)

**UI Entry Points**:
- Tools > Parallel Passages
  - Menu Structure: `ParatextWindowWithMenus`, handler `parallelPassagesToolStripMenuItem_Click`, line 400
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Parallel passages > Select books to check (within tool)
  - Menu Structure: `ParallelPassagesTool`, handler `setBooksInScopeToolStripMenuItem_Click`, line 888
  - File: `Paratext/ParallelPassages/ParallelPassagesTool.cs`
- Parallel passages > Select comparative texts (within tool)
  - Menu Structure: `ParallelPassagesTool`, handler `uiComparativeTexts_Click`, line 616
  - File: `Paratext/ParallelPassages/ParallelPassagesTool.cs`
- View > Approve sets of parallels (within tool)
  - Menu Structure: `ParallelPassagesTool`, handler `approveByRowToolStripMenuItem_Click`, line 867
  - File: `Paratext/ParallelPassages/ParallelPassagesTool.cs`
- Also documented in:
  - Manual: `chapters/23_parallel_passages.md`, line 36
  - Quote: "**≡ Tab**, under **Tools** > **Parallel passages**"
  - HelpData ID: `94b5036c-42df-413c-ad2a-e0cadc790cfd`

**HelpData Items**:
- ID: `94b5036c-42df-413c-ad2a-e0cadc790cfd` - "How do I open the Parallel Passages tool?"
- ID: `8324c325-f60d-49da-92c7-3dad0bcb399e` - "How do I use the Parallel Passages tool?"
- ID: `601ce4e4-aef4-46e5-acba-375e33039e11` - "What do the colors in the upper pane of the Parallel Passages tool mean?"
- ID: `68162945-1af7-44b6-8d46-bfb27abd06e6` - "Introduction to the Parallel Passages tool"
- Dialog: `ParallelPassagesTool`
- Total items: 15 related help items

**Validation**: [MS] [FR] [H] [M] [R] [C] — Last verified: 2026-01-21

---

### 9.3 Compare Text Tool

**Description**: Save snapshots of text at various points and compare them to see changes over time.

**Sub-Features**:
- Mark point in project history
- Compare saved versions
- Highlight differences (deleted text crossed out, added text red/underlined)
- View change history
- Restore previous versions
- Export/print comparisons

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Compare versions`; Handler: `uiToolsCompareTexts_Click`; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Form Relationships | `DifferencesToolForm` opens `CommitChangesForm` | `[FR]` |
| HelpData | Keyword: `ComponentCompareVersions`; Dialog: `CommitChangesForm` | `[H]` |
| Manual | `chapters/18_compare_text.md`: "you will learn how to save your text at various points and review them later" | `[M]` |
| Requirements | *Not explicitly mentioned* | `-` |

**Key Quote** (from Manual):
> "As you work on your translation, you will be continually making changes. It is good to have a copy of your text as it was at a particular point, for example as it was before you went to a consultant check."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `uiToolsCompareTexts_Click` at line 531 |
| 1 | `Paratext/ToolsMenu/DifferencesToolForm.cs` | Opens from D0 | Form Relationships: DifferencesToolForm |
| 2 | `Paratext/ToolsMenu/DifferencesToolVersionHelper.cs` | Field in D1 | Line 43: `private readonly DifferencesToolVersionHelper diffHelper1` |
| 2 | `ParatextBase/UsfmDiff/DiffViewSource.cs` | Import in D1 | Line 14: `using Paratext.Base.UsfmDiff` |

**Not Found**:
- `DifferencesToolForm` dialog in HelpData (search: "DifferencesToolForm" - no matches; feature uses `ComponentCompareVersions` keyword)

**Dialog Navigation**:
- `DifferencesToolForm` → `CommitChangesForm` (line 1390: view commit history)

**UI Entry Points**:
- Project > Compare versions
  - Menu Structure: `ParatextWindowWithMenus`, handler `uiToolsCompareTexts_Click`, line 531
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Also documented in:
  - Manual: `chapters/18_compare_text.md`, line 24
  - Quote: "**≡ Tab** under **Project** > **Mark a point in project history**"
  - Manual: `chapters/18_compare_text.md`, line 32
  - Quote: "**≡ Tab** expand the menus then under **Project** > **Compare Versions**"
  - HelpData ID: `dbbd1298-e40d-44ea-b55a-9a9068ed4bfe`

**HelpData Items**:
- ID: `dbbd1298-e40d-44ea-b55a-9a9068ed4bfe` - "How do I compare two versions of a project?"
- ID: `045473e7-d12c-4566-aea7-989f04184c55` - "How do I compare two different projects?"
- ID: `4c0d2e79-260b-4a98-a6d0-08f03f40c421` - "How do I review changes made to a text?"
- ID: `1081e0eb-8771-47c7-9765-e89425ba4db7` - "How do I revert text from an earlier version of a project?"
- Keyword: `ComponentCompareVersions`
- Total items: 12 related help items

**PT10 porting note — `DifferencesToolForm` is a broadly shared verse-diff surface**: `DifferencesToolForm` is not specific to Compare Versions. In PT9 it is the common verse-level USFM diff dialog reached through `DiffToolConfigurationInfo` by many callers — Restore (`RestoreForm.CompareFiles`), Copy Books (`CopyBooksForm.CompareFiles`), Import Books (`ImportBooksForm`), Parallel Passages (`ParallelPassagesTool`), View History for Verses, the repository change-list / history-summary forms, and the editor itself (`TextForm`) — well over five distinct call sites. As of the latest checks **no PT10 port of `DifferencesToolForm` exists** in paranext-core (`c-sharp/` or `extensions/src/`); PT10 Manage Books explicitly opted out of the right-click compare context menu. Any feature that needs verse-level diff (Compare Versions, Restore "compare against current", Copy/Import Books) should treat the diff renderer as a **shared standalone primitive** to build once and reuse, not a per-feature component. This is the verse-level diff surface — distinct from the file-level comparison grid (`BookGridSelector`), which is a separate reusable.

**Validation**: [MS] [FR] [H] [M] [C] — Last verified: 2026-01-21

---

### 9.4 Compare Word/Phrase

**Description**: Search for a word or phrase in one project and compare how it's translated in another project.

**Sub-Features**:
- Search word/phrase in project
- Show corresponding text in another project
- Navigate to occurrences
- Bulk comparison view
- Hide matches option (show only differences)
- Access from Biblical Terms tool

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checklists > Word or phrase`; Handler: `wordsOrPhrasesToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| Form Relationships | `ChecklistsTool` opens multiple dialogs | `[FR]` |
| HelpData | Keyword: `ComponentInventories/Checklists` *(general checklist component)* | `[H]` |
| Manual | `chapters/11_compare_word.md`: "search for a word or phrase in a project and compare it with the translation" | `[M]` |
| Requirements | *Not explicitly mentioned* | `-` |

**Key Quote** (from Manual):
> "In Paratext 9 (and above), you can see where a word or phrase is found in one project and compare it with the equivalent word or phrase in one or more other projects."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `wordsOrPhrasesToolStripMenuItem_Click` at line 2413 |
| 1 | `Paratext/Checklists/ChecklistsTool.cs` | Opens from D0 | Form Relationships: ChecklistsTool |
| 2 | `Paratext/Checklists/CLData.cs` | Field in D1 | Line 55: `private CLData checklistData` |
| 2 | `SubsystemInterfaces/IChecklistsTool.cs` | Interface in D1 | Line 42: `ChecklistsTool : ParatextSnappingForm, IChecklistsTool` |

**Not Found**:
- Specific HelpData entry for "Word or Phrase" checklist (search: "WordOrPhrase", "CompareWord", "phrase" - no matches; uses general `ComponentInventories/Checklists` keyword)
- `ChecklistsTool` dialog in HelpData (search: "ChecklistsTool" - no matches)

**Dialog Navigation**:
- `ChecklistsTool` → multiple dialogs for configuration

**UI Entry Points**:
- Tools > Checklists > Word or phrase
  - Menu Structure: `TextForm`, handler `wordsOrPhrasesToolStripMenuItem_Click`, line 2413
  - File: `Paratext/TextForm.cs`
- Also documented in:
  - Manual: `chapters/11_compare_word.md`, line 22
  - Quote: "From the **≡ Tab**, under **Tools**, point to **Checklists**, and select **Word or Phrase**"
- Biblical Terms tool > tool icon (for term comparison)
  - Manual: `chapters/11_compare_word.md`, line 52
  - Quote: "Choose a term which has a rendering... Click on the tool icon"

**HelpData Items**:
- *No specific HelpData items found for Compare Word/Phrase*
- Related keyword: `ComponentInventories/Checklists` (26 general checklist items)
- Dialog: *Not registered in HelpData*

**Validation**: [MS] [FR] [H] [M] [C] — Last verified: 2026-01-21

---

### 9.5 Guess Translations

**Description**: Statistical glossing tool for spot-checking word translations across a project. Uses statistical analysis to guess how words in a source text might be translated.

> **Note**: This feature is distinct from **4.3 Guessed Renderings** which operates within the Biblical Terms tool. Guess Translations works on word-by-word analysis, while Guessed Renderings works on Biblical terms.

**Sub-Features**:
- Statistical word translation guessing
- Consistency checking across project
- Review translations in context
- Compare with Interlinearizer results
- Batch translation review

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Advanced > Guess translations`; Handler: `guessTranslationsToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| Form Relationships | `GuessTranslationsForm` in `Paratext/Interlinear/` | `[FR]` |
| HelpData | Keyword: `ComponentGuessRenderings/Translations`; Dialog: `GuessTranslationsForm` | `[H]` |
| Manual | *No dedicated chapter found* | `-` |
| Requirements | *Not explicitly mentioned* | `-` |

**Key Quote** (from HelpData ID `bd354a03-db0e-45ce-93fa-7d4377635122`):
> "Why should I use the Guess Translations tool?" - for consistency checking and review

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `guessTranslationsToolStripMenuItem_Click` at line 1539 |
| 1 | `Paratext/Interlinear/GuessTranslationsForm.cs` | Opens from D0 | Form Relationships: GuessTranslationsForm |
| 2 | `Paratext/Interlinear/` namespace | Same namespace as D1 | Related interlinear functionality |

**Not Found**:
- Dedicated manual chapter for Guess Translations

**UI Entry Points**:
- Project > Advanced > Guess translations
  - Menu Structure: `TextForm`, handler `guessTranslationsToolStripMenuItem_Click`, line 1539
  - File: `Paratext/TextForm.cs`
- View > Highlight guessed renderings (related)
  - Menu Structure: `TextForm`, handler `highlightGuessedRenderingsToolStripMenuItem_Click`, line 2104
  - File: `Paratext/TextForm.cs`

**HelpData Items**:
- ID: `d1a34ce7-f4db-44a8-9378-001a6b253431` - "Guide: Project > Advanced > Guess translations"
- ID: `bd354a03-db0e-45ce-93fa-7d4377635122` - "Why should I use the Guess Translations tool?"
- ID: `0f83386a-3a46-4a37-8855-9ced491896b9` - "How do I use the Guess Translations tool?"
- ID: `96820c86-9cdd-46d4-8f8d-fd2f10419d0b` - "Why does the Interlinearizer give different results from Guess Translations?"
- Dialog: `GuessTranslationsForm`
- Keyword: `ComponentGuessRenderings/Translations`

**Validation**: [MS] [FR] [H] [C] — Last verified: 2026-01-21

---

### 9.6 Concordance/Names Index Builder

**Description**: Build concordance and names index for publication or analysis. This is a separate tool that creates searchable indexes of words and names in Scripture.

> **Note**: The Concordance Builder is a separate tool (`ConcordanceTool.exe`) that can be launched from within Paratext.

**Sub-Features**:
- Create new concordance from project
- Configure concordance settings
- Create empty concordance
- Merge with another concordance
- Subset concordance
- Remove duplicate entries
- Export heading lists
- Names index creation

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `File > New Concordance`; Handler: `uiFileNewFromModel_Click`; Form: `ConcordanceTool/MainForm` | `[MS]` |
| Form Relationships | `ConcordanceTool/MainForm` (separate application) | `[FR]` |
| HelpData | Keyword: `ComponentConcordanceBuilder`; ID: `5831d3f1-022a-4b27-8c83-4eeb6df5c10c` | `[H]` |
| Manual | *No dedicated chapter found* | `-` |
| Requirements | *Not explicitly mentioned* | `-` |

**Key Quote** (from HelpData ID `5831d3f1-022a-4b27-8c83-4eeb6df5c10c`):
> "How do I make a concordance or make an index of names?"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ConcordanceTool/MainForm.cs` | Menu Structure | handler `uiFileNewFromModel_Click` at line 781 |
| 1 | `ConcordanceTool/AddEntriesForm.cs` | Form Relationships | opens from MainForm |
| 2 | *Separate ConcordanceTool namespace* | Same project | Directory listing: `ConcordanceTool/` |

**Not Found**:
- Launch entry point from main Paratext (concordance is accessed as separate tool)

**UI Entry Points** (within ConcordanceTool):
- File > New Concordance
  - Menu Structure: `MainForm`, handler `uiFileNewFromModel_Click`, line 781
  - File: `ConcordanceTool/MainForm.cs`
- Tools > Concordance Settings
  - Menu Structure: `MainForm`, handler `uiToolsConcordanceSettings_Click`, line 1238
  - File: `ConcordanceTool/MainForm.cs`
- Tools > Advanced Options > Create an Empty Concordance
  - Menu Structure: `MainForm`, handler `uiFileNewBlank_Click`, line 737
  - File: `ConcordanceTool/MainForm.cs`
- Tools > Advanced Options > Merge with Another Concordance
  - Menu Structure: `MainForm`, handler `mergeWithAnotherConcordanceToolStripMenuItem_Click`, line 2254
  - File: `ConcordanceTool/MainForm.cs`
- Tools > Advanced Options > Subset Concordance
  - Menu Structure: `MainForm`, handler `uiSubsetConcordance_Click`, line 2346
  - File: `ConcordanceTool/MainForm.cs`

**HelpData Items**:
- ID: `5831d3f1-022a-4b27-8c83-4eeb6df5c10c` - "How do I make a concordance or make an index of names?"
- Keywords: `ComponentConcordanceBuilder`, `ComponentNamesIndex`
- Total items: 1 related help item

**Validation**: [MS] [FR] [H] [C] — Last verified: 2026-01-21

---

> **Note**: For Python-based custom checks and scripting, see **14.7 Python Scripting** in the Integration category.

## Cross-References

**Related Categories**:
- **06 Checking Inventories**: Configure what's valid/invalid
- **07 Automated Checks**: Simpler automated checks
- **08 Checklists**: Manual review lists
- **11 Project Planning**: Advanced checks integrate with task workflow
- **12 Back Translation**: Interlinear creates back translations
- **04 Biblical Terms**: Term consistency complements parallel passages
- **15 Publishing & Output**: Concordance Builder prepares indexes for publishing

**Dependencies**:
- Multiple projects (for comparison)
- Source language texts (for interlinear)
- Python scripting (see Category 16.7)

---

## Validation Summary

| Feature | MS | FR | H | M | R | C | Last Verified |
|---------|----|----|---|---|---|---|---------------|
| 9.1 Interlinear Tool | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 9.2 Parallel Passages | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 9.3 Compare Text | ✓ | ✓ | ✓ | ✓ | - | ✓ | 2026-01-21 |
| 9.4 Compare Word/Phrase | ✓ | ✓ | ✓ | ✓ | - | ✓ | 2026-01-21 |
| 9.5 Guess Translations | ✓ | ✓ | ✓ | - | - | ✓ | 2026-01-21 |
| 9.6 Concordance Builder | ✓ | ✓ | ✓ | - | - | ✓ | 2026-01-21 |

---

## Verification Log

| Date | Action | By |
|------|--------|-----|
| 2026-01-21 | Added Menu Structure [MS] sources for all 6 features; added Form Relationships [FR] sources; updated Evidence Chain tables with verified entry points from Menu Structure; updated Validation Summary table format | Claude |
| 2026-01-21 | Fully documented 9.5 Guess Translations and 9.6 Concordance Builder (previously stubs) | Claude |
| 2026-01-21 | Reorganized: Category 07 renumbered to 09; feature numbers updated | Claude |
| 2026-01-16 | Updated 9.4 Compare Word/Phrase: Added Evidence Chain table, corrected UI entry points, documented missing HelpData | Claude |
| 2026-01-16 | Updated 9.3 Compare Text: Added Evidence Chain table, corrected HelpData keyword, Manual citations with line numbers | Claude |
| 2026-01-16 | Updated 9.2 Parallel Passages: Added Evidence Chain table, HelpData citations with IDs, Manual citations with line numbers | Claude |
| 2026-01-16 | Updated 9.1 Interlinear Tool: Added Evidence Chain table, HelpData citations with IDs, Manual citations with line numbers | Claude |
| 2026-01-14 | Initial document creation | Claude |

---

## Notes

- Interlinear has 31 HelpData items, indicating major complexity
- Parallel Passages has 15 items, also substantial
- These tools are typically used in later translation stages
- Python checks allow extensibility for unique project needs

---

**Document Version**: 4.0
**Template Version**: FEATURE_TEMPLATE_v2.md v6.1
**Last Updated**: 2026-01-21
