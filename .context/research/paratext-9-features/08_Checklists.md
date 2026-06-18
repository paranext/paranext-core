# Paratext 9 - Checklists

**Category**: 08
**Focus**: Manual review lists for systematic text examination
**User Roles**: Translators, Reviewers, Consultants
**Manual Chapters**: 11 (Compare Word), 13 (Formatting Checks)
**Last Updated**: 2026-01-21

---

## Overview

Checklists display formatted text for systematic manual review of specific elements. Unlike Automated Checks (Category 07) which find errors automatically, Checklists present all occurrences of a type for human review and decision-making.

**Key Distinction**:
- **Checks** = Find errors automatically
- **Checklists** = Display all items for manual review

**Key Quote** (from HelpData ID `1ba0f687-fb3e-4c07-aba1-32420859bdf0`):
> "Paratext contains 'Text Display' and 'Text Length' Checklists. To select any of these, click in your project to make it active, click the tab menu icon in your project, then from the Tools menu, point to Checklists, and select one of the checklists to run."

**Common Implementation Pattern**:
All checklists follow this evidence chain:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler at line NN (varies per feature) |
| 1 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Base class | Line 1209: `internal void ShowChecklists(ChecklistType ctype)` |
| 1 | `Paratext/Checklists/ChecklistsTool.cs` | Called from D0 via DI | Line 41: `public partial class ChecklistsTool : ParatextSnappingForm, IChecklistsTool` |
| 2 | `Paratext/Checklists/CLData.cs` | Field in D1 | ChecklistsTool.cs line 53: `private CLData checklistData;` |
| 2 | `SubsystemInterfaces/IChecklistsTool.cs` | Interface in D1 | Line 7: `public enum ChecklistType` |

Individual features below list only their Depth 0 handler line.

**PT10 reuse note**: The Markers checklist (8.7) has been ported to paranext-core and established a shared checklist framework. Porting another checklist (e.g. Punctuation) consumes most of it rather than building parallel infrastructure — see the checklist reuse map in `.context/research/Architecture-Decisions.md` for the consume / re-extract / pattern-copy breakdown. In short: consume the shared C# `ChecklistService` / `ChecklistNetworkObject`, the shared data model (`ChecklistResult` / `ChecklistRow` / `ChecklistCell` / polymorphic content items) and TS mirrors, and the `checklist.component.tsx` structural pattern; re-extract small per-tool pieces (the comparison loop, the row cap) into the new tool's own service; and make one small upstream addition (`ChecklistRowBuilder.BuildRowsNonMergingCells` by parameterizing `MaxCellsToGrab`, leaving Markers on the merging-cells path).

**Verse-range scope divergence (PT9 vs PT10)**: In PT9 the comparative-texts **verse range is GLOBAL** — it is shared across all checklist tools, so changing it in one tool changes it everywhere. The PT10 Markers checklist instead stores the verse range (and scope / range-start / range-end) **per-instance** via `useWebViewState` (`extensions/src/platform-scripture/src/checklist.web-view.tsx`), so each open checklist web view holds its own range. This is a known divergence from PT9, tracked at [paranext/ai-prompts#271](https://github.com/paranext/ai-prompts/issues/271); when a global-range fix lands it will apply to all checklist siblings. A newly ported checklist should match the current per-instance behavior so the eventual fix can be applied uniformly.

---

## Feature List

### 8.1 Verse Text Checklist

**Description**: Display all verse text for systematic review.

**Sub-Features**:
- List all verses in sequence
- Navigate to specific verses
- Edit verses directly from checklist
- Mark verses as reviewed
- Compare with other translations

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checklists > Verse text`; Handler: `checklistsVerseTextToolStripMenuItem_Click`; Line 2408 | `[MS]` |
| Manual | `chapters/13_formatting_checks.md`, line 32: "**≡ Tab**, under **Tools** > **Checklists** > choose the desired list" | `[M]` |
| HelpData | ID: `1ba0f687-fb3e-4c07-aba1-32420859bdf0` - "Introduction to Checklists"; Keyword: `ComponentInventories/Checklists` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `checklistsVerseTextToolStripMenuItem_Click` at line 2408 |

**UI Entry Points**:
- ≡ Tab > Tools > Checklists > Verse text
  - Menu Structure: `TextForm`, handler `checklistsVerseTextToolStripMenuItem_Click`, line 2408
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] [M] [H] [C] — Last verified: 2026-01-21

---

### 8.2 Word or Phrase Checklist

**Description**: Search for and review specific words or phrases throughout the translation.

**Sub-Features**:
- Search for specific words
- Search for specific phrases
- Case-sensitive search option
- Whole word matching option
- Navigate to occurrences
- Count occurrences
- Compare across multiple projects

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checklists > Word or phrase`; Handler: `wordsOrPhrasesToolStripMenuItem_Click`; Line 2413 | `[MS]` |
| Manual | `chapters/11_compare_word.md`, line 28: "From the **≡ Tab**, under **Tools**, point to **Checklists**, and select **Word or Phrase**." | `[M]` |
| HelpData | ID: `6d859b66-7171-4ae8-8f69-0d0b9cafc167` - "How do I compare a word or phrase in different projects?"; Keyword: `ComponentInventories/Checklists` | `[H]` |

**Key Quote** (from Manual):
> "use the checklist 'Word or Phrase' from both the text and also from the Biblical Terms Tool."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `wordsOrPhrasesToolStripMenuItem_Click` at line 2413 |

**UI Entry Points**:
- ≡ Tab > Tools > Checklists > Word or phrase
  - Menu Structure: `TextForm`, handler `wordsOrPhrasesToolStripMenuItem_Click`, line 2413
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] [M] [H] [C] — Last verified: 2026-01-21

---

### 8.3 Section Headings Checklist

**Description**: Review all section headings throughout the translation for consistency.

**Sub-Features**:
- List all section headings (\s, \s1, \s2, etc.)
- Review heading consistency
- Check heading length
- Ensure accurate descriptions
- Navigate to verses with headings
- Compare with reference text

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checklists > Section headings`; Handler: `checklistsSectionHeadingsToolStripMenuItem_Click`; Line 2418 | `[MS]` |
| Manual | `chapters/13_formatting_checks.md`, line 47: "**≡ Tab**, under > **Tools** > **Checklists** > **Section Headings**" | `[M]` |
| HelpData | Keyword: `ComponentInventories/Checklists` | `[H]` |

**Key Quote** (from Manual, lines 49-54):
> "Check that: the headings are consistent with your reference text (length, grammar, style), all headings start with a capital, there is no punctuation at the end, they are not too long"

**Use Case**:
Review all section headings (\s, \s1, \s2, etc.) to ensure:
- Consistent style and tone
- Appropriate length
- Accuracy to content

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `checklistsSectionHeadingsToolStripMenuItem_Click` at line 2418 |

**UI Entry Points**:
- ≡ Tab > Tools > Checklists > Section headings
  - Menu Structure: `TextForm`, handler `checklistsSectionHeadingsToolStripMenuItem_Click`, line 2418
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] [M] [H] [C] — Last verified: 2026-01-21

---

### 8.4 Book Titles Checklist

**Description**: Review all book titles for consistency and accuracy.

**Sub-Features**:
- List all book titles
- Compare titles across traditions
- Check capitalization
- Ensure consistency within project
- Navigate to book title locations

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checklists > Book titles`; Handler: `checklistsBookTitlesToolStripMenuItem_Click`; Line 2423 | `[MS]` |
| Manual | `chapters/24_finalizing.md`, line 176: "**≡ Tab**, under **Tools** > **Checklists** > **Book titles**" | `[M]` |
| HelpData | Keyword: `ComponentInventories/Checklists` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `checklistsBookTitlesToolStripMenuItem_Click` at line 2423 |

**UI Entry Points**:
- ≡ Tab > Tools > Checklists > Book titles
  - Menu Structure: `TextForm`, handler `checklistsBookTitlesToolStripMenuItem_Click`, line 2423
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] [M] [H] [C] — Last verified: 2026-01-21

---

### 8.5 References Checklist

**Description**: Review all cross-references for format consistency and accuracy.

**Sub-Features**:
- List all cross-references
- Check format consistency
- Verify target references exist
- Ensure completeness
- Navigate to reference locations
- Edit references

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checklists > References`; Handler: `checklistsCrossReferencesToolStripMenuItem_Click`; Line 2428 | `[MS]` |
| Manual | `chapters/24_finalizing.md`, line 177: "**≡ Tab**, under **Tools** > **Checklists** > **References**" | `[M]` |
| HelpData | ID: `7890fe77-bfb7-4f4c-9e60-c226a24eb8c7` - "How do the References check and the References checklist differ?"; Keyword: `ComponentInventories/Checklists` | `[H]` |

**Key Distinction** (from HelpData ID `7890fe77-bfb7-4f4c-9e60-c226a24eb8c7`):
> "The References check and the References checklist have different purposes. The References check checks for errors and consistency in cross references, parallel references and footnote references."

**Use Case**:
Review all cross-references to ensure:
- Format consistency
- Target accuracy
- Completeness

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `checklistsCrossReferencesToolStripMenuItem_Click` at line 2428 |

**UI Entry Points**:
- ≡ Tab > Tools > Checklists > References
  - Menu Structure: `TextForm`, handler `checklistsCrossReferencesToolStripMenuItem_Click`, line 2428
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] [M] [H] [C] — Last verified: 2026-01-21

---

### 8.6 Footnotes Checklist

**Description**: Review all footnotes for clarity, formatting, and appropriateness.

**Sub-Features**:
- List all footnotes
- Check clarity and helpfulness
- Ensure proper formatting
- Verify appropriate content
- Navigate to footnote locations
- Edit footnotes

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checklists > Footnotes`; Handler: `checklistsFootnotesToolStripMenuItem_Click`; Line 2438 | `[MS]` |
| Manual | `chapters/24_finalizing.md`, line 178: "**≡ Tab**, under **Tools** > **Checklists > Footnotes**" | `[M]` |
| HelpData | Keyword: `ComponentInventories/Checklists` | `[H]` |

**Use Case**:
Review all footnotes to ensure:
- Clarity and helpfulness
- Proper formatting
- Appropriate content

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `checklistsFootnotesToolStripMenuItem_Click` at line 2438 |

**UI Entry Points**:
- ≡ Tab > Tools > Checklists > Footnotes
  - Menu Structure: `TextForm`, handler `checklistsFootnotesToolStripMenuItem_Click`, line 2438
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] [M] [H] [C] — Last verified: 2026-01-21

---

### 8.7 Markers Checklist

**Description**: Review usage of specific USFM markers throughout the translation.

**Sub-Features**:
- List specific marker occurrences
- Filter by marker type
- Check marker usage consistency
- Verify proper formatting
- Navigate to marker locations
- Compare with reference text

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checklists > Markers`; Handler: `checklistsMarkersToolStripMenuItem_Click`; Line 2433 | `[MS]` |
| Manual | `chapters/13_formatting_checks.md`, line 58: "**≡ Tab**, under > **Tools** > **Checklists** > **Markers**" | `[M]` |
| HelpData | ID: `85361367-ead8-4c8c-b99f-3cfb2882ef30` - "Guide: Tools > Checklists > Markers: Settings"; Keyword: `ComponentInventories/Checklists` | `[H]` |

**Key Quote** (from Manual, lines 59-63):
> "Choose your reference text as the comparative text. Click Settings. Type the paragraph makers to be displayed (e.g. p m). Click OK."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `checklistsMarkersToolStripMenuItem_Click` at line 2433 |

**UI Entry Points**:
- ≡ Tab > Tools > Checklists > Markers
  - Menu Structure: `TextForm`, handler `checklistsMarkersToolStripMenuItem_Click`, line 2433
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] [M] [H] [C] — Last verified: 2026-01-21

---

### 8.8 Quotation Marks Checklist

**Description**: Review all quotation mark usage for consistency and proper pairing.

**Sub-Features**:
- List all quotations
- Check opening/closing marks
- Verify nesting consistency
- Check continuation across verses
- Navigate to quotation locations
- Compare differences between projects

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checklists > Quotation marks`; Handler: `quotationMarksToolStripMenuItem_Click`; Line 2262 | `[MS]` |
| Manual | `chapters/13_formatting_checks.md`, line 32: "**≡ Tab**, under **Tools** > **Checklists** > choose the desired list" | `[M]` |
| HelpData | ID: `11cd7b0b-a7b6-4860-893b-48e94510344e` - "How do I find where quote marks differ in two projects?"; Keyword: `ComponentInventories/Checklists` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `quotationMarksToolStripMenuItem_Click` at line 2262 |

**UI Entry Points**:
- ≡ Tab > Tools > Checklists > Quotation marks
  - Menu Structure: `TextForm`, handler `quotationMarksToolStripMenuItem_Click`, line 2262
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] [M] [H] [C] — Last verified: 2026-01-21

---

### 8.9 Punctuation Checklist

**Description**: Review punctuation usage patterns throughout the translation.

**Sub-Features**:
- List punctuation occurrences
- Review usage context (word-initial, word-medial, word-final, isolated)
- Check consistency
- Navigate to punctuation locations
- Compare differences between projects

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checklists > Punctuation`; Handler: `punctuationToolStripMenuItem_Click`; Line 2463 | `[MS]` |
| Manual | `chapters/13_formatting_checks.md`, line 32: "**≡ Tab**, under **Tools** > **Checklists** > choose the desired list" | `[M]` |
| HelpData | ID: `733bda25-6b26-4f4c-a661-a9bc1de871cd` - "How do I find where punctuation marks differ in two projects?"; Keyword: `ComponentInventories/Checklists` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `punctuationToolStripMenuItem_Click` at line 2463 |

**UI Entry Points**:
- ≡ Tab > Tools > Checklists > Punctuation
  - Menu Structure: `TextForm`, handler `punctuationToolStripMenuItem_Click`, line 2463
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] [M] [H] [C] — Last verified: 2026-01-21

---

### 8.10 Relatively Long Verses Checklist

**Description**: Find verses that are unusually long compared to the project average.

**Sub-Features**:
- Identify long verses
- Compare to project average
- Detect potential versification issues
- Identify possible missing breaks
- Navigate to long verses

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checklists > Relatively long verses`; Handler: `checklistsRelativelyLongVersesToolStripMenuItem_Click`; Line 2443 | `[MS]` |
| Manual | `chapters/24_finalizing.md`, line 173: "**≡ Tab**, under **Tools** > **Checklists** > **Long/short verses**" | `[M]` |
| HelpData | ID: `1ba0f687-fb3e-4c07-aba1-32420859bdf0` - "Introduction to Checklists"; Keyword: `ComponentInventories/Checklists` | `[H]` |

**Key Quote** (from HelpData):
> "Text Length checklists are: Relatively long verses, Relatively short verses, Long sentences, and Long paragraphs."

**Use Case**:
Find verses that are unusually long compared to the project average, which may indicate:
- Missing or extra content
- Translation issues
- Versification problems

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `checklistsRelativelyLongVersesToolStripMenuItem_Click` at line 2443 |

**UI Entry Points**:
- ≡ Tab > Tools > Checklists > Relatively long verses
  - Menu Structure: `TextForm`, handler `checklistsRelativelyLongVersesToolStripMenuItem_Click`, line 2443
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] [M] [H] [C] — Last verified: 2026-01-21

---

### 8.11 Relatively Short Verses Checklist

**Description**: Find verses that are unusually short compared to the project average.

**Sub-Features**:
- Identify short verses
- Compare to project average
- Detect potential versification issues
- Identify possible merged verses
- Navigate to short verses

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checklists > Relatively short verses`; Handler: `checklistsRelativelyShortVersesToolStripMenuItem_Click`; Line 2448 | `[MS]` |
| Manual | `chapters/24_finalizing.md`, line 173: "**≡ Tab**, under **Tools** > **Checklists** > **Long/short verses**" | `[M]` |
| HelpData | ID: `1ba0f687-fb3e-4c07-aba1-32420859bdf0` - "Introduction to Checklists"; Keyword: `ComponentInventories/Checklists` | `[H]` |

**Use Case**:
Find verses that are unusually short compared to the project average, which may indicate:
- Missing content
- Abbreviated translations
- Versification problems

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `checklistsRelativelyShortVersesToolStripMenuItem_Click` at line 2448 |

**UI Entry Points**:
- ≡ Tab > Tools > Checklists > Relatively short verses
  - Menu Structure: `TextForm`, handler `checklistsRelativelyShortVersesToolStripMenuItem_Click`, line 2448
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] [M] [H] [C] — Last verified: 2026-01-21

---

### 8.12 Long Sentences Checklist

**Description**: Find sentences that are unusually long, which may indicate readability issues.

**Sub-Features**:
- Identify long sentences
- Configurable length threshold
- Navigate to long sentences
- Flag for readability review

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checklists > Long sentences`; Handler: `checklistsLongSentencesToolStripMenuItem_Click`; Line 2453 | `[MS]` |
| Manual | `chapters/13_formatting_checks.md`, line 32: "**≡ Tab**, under **Tools** > **Checklists** > choose the desired list" | `[M]` |
| HelpData | ID: `1ba0f687-fb3e-4c07-aba1-32420859bdf0` - "Introduction to Checklists"; Keyword: `ComponentInventories/Checklists` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `checklistsLongSentencesToolStripMenuItem_Click` at line 2453 |

**UI Entry Points**:
- ≡ Tab > Tools > Checklists > Long sentences
  - Menu Structure: `TextForm`, handler `checklistsLongSentencesToolStripMenuItem_Click`, line 2453
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] [M] [H] [C] — Last verified: 2026-01-21

---

### 8.13 Long Paragraphs Checklist

**Description**: Find paragraphs that are unusually long, which may indicate readability issues.

**Sub-Features**:
- Identify long paragraphs
- Configurable length threshold
- Navigate to long paragraphs
- Flag for readability review

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checklists > Long paragraphs`; Handler: `checklistsLongParagraphsToolStripMenuItem_Click`; Line 2458 | `[MS]` |
| Manual | `chapters/13_formatting_checks.md`, line 32: "**≡ Tab**, under **Tools** > **Checklists** > choose the desired list" | `[M]` |
| HelpData | ID: `1ba0f687-fb3e-4c07-aba1-32420859bdf0` - "Introduction to Checklists"; Keyword: `ComponentInventories/Checklists` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `checklistsLongParagraphsToolStripMenuItem_Click` at line 2458 |

**UI Entry Points**:
- ≡ Tab > Tools > Checklists > Long paragraphs
  - Menu Structure: `TextForm`, handler `checklistsLongParagraphsToolStripMenuItem_Click`, line 2458
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] [M] [H] [C] — Last verified: 2026-01-21

---

## Cross-References

**Related Categories**:
- **06 Checking Inventories**: Analyze text elements (configure what's valid)
- **07 Automated Checks**: Find errors automatically (unlike checklists which present for review)
- **09 Advanced Checking Tools**: More sophisticated analysis
- **10 Collaboration & Sync**: Checklist findings can be discussed in notes
- **14 Integration**: Custom Tools extend checklist capabilities
- **16 Infrastructure**: Help system provides checklist guidance

**Key Distinction from Automated Checks** (from HelpData ID `7890fe77-bfb7-4f4c-9e60-c226a24eb8c7`):
> "The References check and the References checklist have different purposes."

---

## Common Implementation Architecture

All 13 checklists share the following implementation pattern:

**Evidence Chain** (Depth 0-2):

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | Menu handlers call `ShowChecklists(ChecklistType.XXX)` |
| 1 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Base class of TextForm | Line 1209: `internal void ShowChecklists(ChecklistType ctype)` |
| 1 | `Paratext/Checklists/ChecklistsTool.cs` | Created via DI in D1 | Line 41: implements `IChecklistsTool` interface |
| 2 | `Paratext/Checklists/CLData.cs` | Field in D1 | Line 48: `public class CLData` - data model for checklist display |
| 2 | `Paratext/Checklists/CLDataSource.cs` | Used in D1 | Generates checklist data from project text |
| 2 | `SubsystemInterfaces/IChecklistsTool.cs` | Interface in D1 | Line 7: `public enum ChecklistType` defines all checklist types |

**Key Files in Checklists Folder**:
- `ChecklistsTool.cs` - Main form for displaying checklists (line 41)
- `CLData.cs` - Data model for checklist rows and cells (line 48)
- `CLDataSource.cs` - Base class for data generation
- `WordOrPhraseSettingsForm.cs` - Settings for Word/Phrase checklist
- `MarkerSettingsForm.cs` - Settings for Markers checklist
- `PunctuationSettingsForm.cs` - Settings for Punctuation checklist
- `VerseSettingsForm.cs` - Settings for Verse text checklist

**ChecklistType Enum Values** (from `SubsystemInterfaces/IChecklistsTool.cs`, lines 7-12):
```csharp
public enum ChecklistType
{
    Verses, SectionHeadings, BookTitles, Footnotes, CrossReferences, Markers,
    RelativelyLongVerses, RelativelyShortVerses, LongSentences, LongParagraphs,
    QuotationDifferences, Punctuation, WordsPhrases
}
```

---

## Validation Summary

| Feature | MS | FR | H | M | C | Last Verified |
|---------|----|----|---|---|---|---------------|
| 8.1 Verse Text Checklist | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 8.2 Word or Phrase Checklist | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 8.3 Section Headings Checklist | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 8.4 Book Titles Checklist | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 8.5 References Checklist | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 8.6 Footnotes Checklist | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 8.7 Markers Checklist | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 8.8 Quotation Marks Checklist | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 8.9 Punctuation Checklist | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 8.10 Relatively Long Verses Checklist | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 8.11 Relatively Short Verses Checklist | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 8.12 Long Sentences Checklist | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 8.13 Long Paragraphs Checklist | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |

---

## HelpData Items

| ID | Question | Type |
|----|----------|------|
| `1ba0f687-fb3e-4c07-aba1-32420859bdf0` | Introduction to Checklists | help |
| `7890fe77-bfb7-4f4c-9e60-c226a24eb8c7` | How do the References check and the References checklist differ? | help |
| `11cd7b0b-a7b6-4860-893b-48e94510344e` | How do I find where quote marks differ in two projects? | help |
| `6d859b66-7171-4ae8-8f69-0d0b9cafc167` | How do I compare a word or phrase in different projects? | help |
| `733bda25-6b26-4f4c-a661-a9bc1de871cd` | How do I find where punctuation marks differ in two projects? | help |
| `85361367-ead8-4c8c-b99f-3cfb2882ef30` | Guide: Tools > Checklists > Markers: Settings | guide |

---

## Verification Log

| Date | Action | By |
|------|--------|-----|
| 2026-01-16 | Original stub documentation in 06_Basic_Quality_Checks.md | Claude |
| 2026-01-20 | Split into 06C_Checklists.md with expanded sub-features | Claude |
| 2026-01-20 | Added all 13 checklist types from menu structure analysis | Claude |
| 2026-01-21 | Reorganized: 06C promoted to 08; feature numbers updated | Claude |
| 2026-01-21 | Session 6: Expanded to one feature per checklist (8.1-8.13) | Claude |
| 2026-01-21 | Added handler line numbers from TextForm.cs; Extended evidence chain to Depth 2 | Claude |
| 2026-01-21 | Added HelpData IDs and Manual line numbers with exact quotes | Claude |
| 2026-01-21 | Documented common implementation architecture | Claude |
| 2026-01-21 | Added Legacy Paratext 6 Checklists note | Claude |

---

## Legacy Paratext 6 Checklists

Several checklists from Paratext 6 have been improved and built into Paratext's standard checking features (Categories 06-08). The original Paratext 6 checklists remain available for backward compatibility via:

**Menu Path**: Tools > Custom tools (in project tab menu)

From HelpData:
> "The old Paratext 6 Checklists are still available via this menu if needed."

For most use cases, the modern equivalents in Categories 06 (Checking Inventories), 07 (Automated Checks), and 08 (Checklists) are recommended.

**See also**: 14.9 Advanced Menu & Custom Tools

---

**Document Version**: 4.1
**Template Version**: FEATURE_TEMPLATE_v2.md v6.1
**Last Updated**: 2026-01-21
