# Paratext 9 - Checking Inventories

**Category**: 06  
**Focus**: Inventory tools that analyze and categorize text elements  
**User Roles**: Translators, Reviewers, Consultants  
**Manual Chapters**: 12 (Basic Checks 2)  
**Last Updated**: 2026-01-21

---

## Overview

Checking Inventories analyze the text to build a comprehensive list of all occurrences of specific element types (characters, punctuation, markers, etc.). Users then classify items as valid, invalid, or unknown. This classification drives the automated checks that flag unexpected items.

**Key Principle**: Inventories are configured once, then ongoing checks use those decisions to find problems.

**Common Architecture**: All inventory features share a common pattern:
- Menu handler in `TextForm.cs` calls `MainForm.Current.Windows.FindOrCreateInventoryForm()`
- `WindowCollection.cs` creates `InventoryForm` with the appropriate `ScriptureInventoryBase` subclass
- `InventoryForm` displays results using data from `ChecksDataSource`

**PT10 reuse note**: The sibling inventories already run on shared, generic infrastructure in paranext-core, so porting another inventory feature requires **zero net-new C#**. `c-sharp/Checks/InventoryFactory.cs` registers each `ScriptureInventoryBase` subclass by its check internal-value (Characters, Marker, MatchedPairs, MixedCapitalization, Punctuation, RepeatedWord, the capitalization inventories, etc.), and one generic `c-sharp/Checks/InventoryDataProvider.cs` serves all of them through a single set of endpoints (`getAvailableInventories`, `get/setInventoryItemStatus`, `get/setInventoryOptionValues`, plus the itemized-job and summarized-inventory endpoints). Adding a per-feature inventory service or data provider duplicates working generic infrastructure — register the check in the factory instead. The net-new surface for a new inventory is a TypeScript `open*Inventory` command (conforming to the sibling bare `(webViewId?) => Promise<string | undefined>` shape) plus a small set of UI pieces in `platform-scripture`.

---

## Feature List

### 6.1 Character Inventory

**Description**: Inventory all distinct characters used in the project. Flag unexpected or problematic characters.

**Sub-Features**:
- List all unique characters
- Show character frequency
- Classify characters (valid, invalid, unknown)
- Unicode character details
- Navigate to character occurrences
- Separate verse/non-verse status (9.5+)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checking inventories > Characters inventory`; Handler: `characterInventoryToolStripMenuItem1_Click`; Line: 2191 | `[MS]` |
| Requirements | Section: "Inventories and Checks" | `[R]` |
| Manual | `chapters/12_basic_checks_2.md`: "12.4 Characters" | `[M]` |
| HelpData | Keyword: `ComponentInventories/Checklists`; Dialog: `InventoryForm.Character` | `[H]` |

**Key Quote** (from Requirements):
> "What are all the distinct characters, including whitespace and invisible characters, in the text?"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `characterInventoryToolStripMenuItem1_Click` at line 2191 |
| 1 | `Paratext/WindowCollection.cs` | Method call in D0 | Line 2196: `MainForm.Current.Windows.FindOrCreateInventoryForm(ScriptureText, new CharactersCheck())` |
| 1 | `ParatextChecks/Checks/CharactersCheck.cs` | Instantiated in D0 | Line 20: `public class CharactersCheck : ScriptureInventoryBase` |
| 1 | `Paratext/Checking/InventoryForm.cs` | Created in D1 | Line 1128 (WindowCollection): `new InventoryForm(scrText, checksDataSource, inventory)` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Parameter in D1 | Line 19: `public class ChecksDataSource` |
| 2 | `ParatextChecks/ScriptureInventoryBase.cs` | Base class in D1 | Line 15: `public abstract class ScriptureInventoryBase : ScriptureCheckBase` |

**UI Entry Points**:
- Tools > Checking inventories > Characters inventory
  - Menu Structure: `TextForm`, handler `characterInventoryToolStripMenuItem1_Click`, line 2191
  - File: `Paratext/TextForm.cs`
- Also documented in:
  - HelpData ID: `251a5ee7-26a8-42bf-8d1c-5ca17f7ddd05`
  - Dialog: `InventoryForm.Character`

**InventoryForm Menus** (owned by InventoryForm):
- Project > Edit inventory options (`cmdOptions_Click`, line 374)
- Project > Refresh (`cmdRefresh_Click`, line 861)

**Validation**: [MS] [R] [M] [H] [C] — Last verified: 2026-01-21

---

### 6.2 Punctuation Inventory

**Description**: Inventory all punctuation usage patterns. Validate punctuation appears in expected contexts.

**Sub-Features**:
- List all punctuation marks
- Show usage contexts (word-initial, word-medial, word-final, isolated)
- Mark valid/invalid patterns
- Navigate to occurrences
- Separate verse/non-verse status (9.5+)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checking inventories > Punctuation inventory`; Handler: `punctuationInventoryToolStripMenuItem_Click`; Line: 2199 | `[MS]` |
| Requirements | Section: "Inventories and Checks" | `[R]` |
| Manual | `chapters/12_basic_checks_2.md`: "12.5 Punctuation" | `[M]` |
| HelpData | Keyword: `ContentPunctuationInventory`; Dialog: `InventoryForm.Punctuation` | `[H]` |

**Key Quote** (from Requirements):
> "What are all the uses of punctuation within different contexts in the text?"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `punctuationInventoryToolStripMenuItem_Click` at line 2199 |
| 1 | `Paratext/WindowCollection.cs` | Method call in D0 | Line 2203: `MainForm.Current.Windows.FindOrCreateInventoryForm(ScriptureText, new PunctuationCheck())` |
| 1 | `ParatextChecks/Checks/PunctuationCheck.cs` | Instantiated in D0 | Line 25: `public class PunctuationCheck : ScriptureInventoryBase` |
| 1 | `Paratext/Checking/InventoryForm.cs` | Created in D1 | Line 1128 (WindowCollection): `new InventoryForm(scrText, checksDataSource, inventory)` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Parameter in D1 | Line 19: `public class ChecksDataSource` |
| 2 | `ParatextChecks/ScriptureInventoryBase.cs` | Base class in D1 | Line 15: `public abstract class ScriptureInventoryBase : ScriptureCheckBase` |

**UI Entry Points**:
- Tools > Checking inventories > Punctuation inventory
  - Menu Structure: `TextForm`, handler `punctuationInventoryToolStripMenuItem_Click`, line 2199
  - File: `Paratext/TextForm.cs`
- Also documented in:
  - HelpData ID: `22835d9f-2118-499e-a7db-69f9c2df53e8`
  - Dialog: `InventoryForm.Punctuation`

**InventoryForm Menus** (owned by InventoryForm):
- Project > Edit inventory options (`cmdOptions_Click`, line 374)
- Project > Refresh (`cmdRefresh_Click`, line 861)

**Validation**: [MS] [R] [M] [H] [C] — Last verified: 2026-01-21

---

### 6.3 Marker Inventory

**Description**: Inventory all USFM markers used in the project. Identify unexpected or misused markers.

**Sub-Features**:
- List all markers used
- Show marker frequency
- Compare to expected markers
- Navigate to marker occurrences
- Marker validation against stylesheet

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checking inventories > Markers inventory`; Handler: `markerInventoryToolStripMenuItem_Click`; Line: 2206 | `[MS]` |
| Requirements | Section: "Inventories and Checks" | `[R]` |
| Manual | `chapters/05_basic_checks_1.md`: "Markers check" | `[M]` |
| HelpData | Keyword: `ContentMarkersinventory`; Dialog: `InventoryForm.Marker` | `[H]` |

**Key Quote** (from Requirements):
> "What are all of the distinct USFM markers used in the text?"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `markerInventoryToolStripMenuItem_Click` at line 2206 |
| 1 | `Paratext/WindowCollection.cs` | Method call in D0 | Line 2210: `MainForm.Current.Windows.FindOrCreateInventoryForm(ScriptureText, new MarkerCheck())` |
| 1 | `ParatextChecks/Checks/MarkerCheck.cs` | Instantiated in D0 | Line 22: `public class MarkerCheck : ScriptureInventoryBase` |
| 1 | `Paratext/Checking/InventoryForm.cs` | Created in D1 | Line 1128 (WindowCollection): `new InventoryForm(scrText, checksDataSource, inventory)` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Parameter in D1 | Line 19: `public class ChecksDataSource` |
| 2 | `ParatextChecks/ScriptureInventoryBase.cs` | Base class in D1 | Line 15: `public abstract class ScriptureInventoryBase : ScriptureCheckBase` |

**UI Entry Points**:
- Tools > Checking inventories > Markers inventory
  - Menu Structure: `TextForm`, handler `markerInventoryToolStripMenuItem_Click`, line 2206
  - File: `Paratext/TextForm.cs`
- Also documented in:
  - HelpData ID: `09da90ce-b3c6-450a-a026-ffd53ab7af4a`
  - Dialog: `InventoryForm.Marker`

**InventoryForm Menus** (owned by InventoryForm):
- Project > Report deprecated markers in Markers check (`reportDeprecatedMarkersAsErrors_Clicked`, line 2138)
- Project > Edit inventory options (`cmdOptions_Click`, line 374)
- Project > Refresh (`cmdRefresh_Click`, line 861)

**Validation**: [MS] [R] [M] [H] [C] — Last verified: 2026-01-21

---

### 6.4 Matched Pairs Inventory

**Description**: Inventory punctuation marks that come in pairs (parentheses, brackets, quotes) and find unmatched occurrences.

**Sub-Features**:
- Find unmatched opening marks
- Find unmatched closing marks
- Configurable pair definitions
- Navigate to issues

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checking inventories > Unmatched pairs of punctuation`; Handler: `matchedPairsInventoryToolStripMenuItem_Click`; Line: 2214 | `[MS]` |
| Requirements | Section: "Inventories and Checks" | `[R]` |
| Manual | `chapters/12_basic_checks_2.md`: "12.6 Matched Pairs" | `[M]` |
| HelpData | Keyword: `ContentUnmatchedPunctuation`; Dialog: `InventoryForm.Matched_Pair_Punctuation_Errors` | `[H]` |

**Key Quote** (from Requirements):
> "What are all of the cases where punctuation marks that normally come in pairs (e.g., parentheses) are left unmatched?"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `matchedPairsInventoryToolStripMenuItem_Click` at line 2214 |
| 1 | `Paratext/WindowCollection.cs` | Method call in D0 | Line 2218: `MainForm.Current.Windows.FindOrCreateInventoryForm(ScriptureText, new MatchedPairsCheck())` |
| 1 | `ParatextChecks/Checks/MatchedPairsCheck.cs` | Instantiated in D0 | Line 24: `public class MatchedPairsCheck : ScriptureInventoryBase` |
| 1 | `Paratext/Checking/InventoryForm.cs` | Created in D1 | Line 1128 (WindowCollection): `new InventoryForm(scrText, checksDataSource, inventory)` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Parameter in D1 | Line 19: `public class ChecksDataSource` |
| 2 | `ParatextChecks/ScriptureInventoryBase.cs` | Base class in D1 | Line 15: `public abstract class ScriptureInventoryBase : ScriptureCheckBase` |

**UI Entry Points**:
- Tools > Checking inventories > Unmatched pairs of punctuation
  - Menu Structure: `TextForm`, handler `matchedPairsInventoryToolStripMenuItem_Click`, line 2214
  - File: `Paratext/TextForm.cs`
- Also documented in:
  - HelpData ID: `fad08af2-41bf-48bb-98d6-aa440092f2ed`
  - Dialog: `InventoryForm.Matched_Pair_Punctuation_Errors`

**InventoryForm Menus** (owned by InventoryForm):
- Project > Edit inventory options (`cmdOptions_Click`, line 374)
- Project > Refresh (`cmdRefresh_Click`, line 861)

**Validation**: [MS] [R] [M] [H] [C] — Last verified: 2026-01-21

---

### 6.5 Repeated Words Inventory

**Description**: Find accidentally repeated words (e.g., "the the").

**Sub-Features**:
- Detect repeated words
- Configurable exceptions
- Navigate to issues
- Mark as intentional (for stylistic repetition)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checking inventories > Repeated words`; Handler: `repeatedWordsInventoryToolStripMenuItem_Click`; Line: 2222 | `[MS]` |
| Manual | `chapters/12_basic_checks_2.md`: "12.7 Repeated words" | `[M]` |
| HelpData | Keyword: `ContentRepeatedWords`; Dialog: `InventoryForm.Repeated_Words` | `[H]` |

**Key Quote** (from Manual):
> "This check is to identify words that have been repeated in the text. This may indicate an error, but not necessarily."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `repeatedWordsInventoryToolStripMenuItem_Click` at line 2222 |
| 1 | `Paratext/WindowCollection.cs` | Method call in D0 | Line 2226: `MainForm.Current.Windows.FindOrCreateInventoryForm(ScriptureText, new RepeatedWordsCheck())` |
| 1 | `ParatextChecks/Checks/RepeatedWordsCheck.cs` | Instantiated in D0 | Line 11: `public class RepeatedWordsCheck : ScriptureInventoryBase` |
| 1 | `Paratext/Checking/InventoryForm.cs` | Created in D1 | Line 1128 (WindowCollection): `new InventoryForm(scrText, checksDataSource, inventory)` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Parameter in D1 | Line 19: `public class ChecksDataSource` |
| 2 | `ParatextChecks/ScriptureInventoryBase.cs` | Base class in D1 | Line 15: `public abstract class ScriptureInventoryBase : ScriptureCheckBase` |

**UI Entry Points**:
- Tools > Checking inventories > Repeated words
  - Menu Structure: `TextForm`, handler `repeatedWordsInventoryToolStripMenuItem_Click`, line 2222
  - File: `Paratext/TextForm.cs`
- Also documented in:
  - HelpData ID: `72308466-5e47-429d-a126-a836598e33c2`
  - Dialog: `InventoryForm.Repeated_Words`

**InventoryForm Menus** (owned by InventoryForm):
- Project > Edit inventory options (`cmdOptions_Click`, line 374)
- Project > Refresh (`cmdRefresh_Click`, line 861)

**Validation**: [MS] - [M] [H] [C] — Last verified: 2026-01-21

---

### 6.6 Markers Followed by Lowercase Inventory

**Description**: Inventory markers that are followed by lowercase letters when capitalization may be expected.

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checking inventories > Markers followed by lowercase`; Handler: `uncapitalizedStylesInventoryToolStripMenuItem_Click`; Line: 2230 | `[MS]` |
| Manual | `chapters/12_basic_checks_2.md`: "12.8 Capitalization" | `[M]` |
| HelpData | Dialog: `InventoryForm.No_Capital_after_Style` | `[H]` |

**Key Quote** (from Manual):
> "There are three inventories for capitalization, but only one check."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `uncapitalizedStylesInventoryToolStripMenuItem_Click` at line 2230 |
| 1 | `Paratext/WindowCollection.cs` | Method call in D0 | Line 2234: `MainForm.Current.Windows.FindOrCreateInventoryForm(ScriptureText, new UncapitalizedStylesCheck())` |
| 1 | `ParatextChecks/Checks/UncapitalizedStylesCheck.cs` | Instantiated in D0 | Line 14: `public class UncapitalizedStylesCheck : ScriptureInventoryBase` |
| 1 | `Paratext/Checking/InventoryForm.cs` | Created in D1 | Line 1128 (WindowCollection): `new InventoryForm(scrText, checksDataSource, inventory)` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Parameter in D1 | Line 19: `public class ChecksDataSource` |
| 2 | `ParatextChecks/ScriptureInventoryBase.cs` | Base class in D1 | Line 15: `public abstract class ScriptureInventoryBase : ScriptureCheckBase` |

**UI Entry Points**:
- Tools > Checking inventories > Markers followed by lowercase
  - Menu Structure: `TextForm`, handler `uncapitalizedStylesInventoryToolStripMenuItem_Click`, line 2230
  - File: `Paratext/TextForm.cs`
- Also documented in:
  - HelpData ID: `c1b6a966-0922-441a-a56b-925b25c5d5e0`
  - Dialog: `InventoryForm.No_Capital_after_Style`

**InventoryForm Menus** (owned by InventoryForm):
- Project > Edit inventory options (`cmdOptions_Click`, line 374)
- Project > Refresh (`cmdRefresh_Click`, line 861)

**Validation**: [MS] - [M] [H] [C] — Last verified: 2026-01-21

---

### 6.7 Markers Missing Final Punctuation Inventory

**Description**: Inventory markers (like section headings) that are missing expected final punctuation.

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checking inventories > Markers missing final punctuation`; Handler: `markersMissingFinalPunctuationToolStripMenuItem_Click`; Line: 2238 | `[MS]` |
| HelpData | Dialog: `InventoryForm.Markers_Missing_Final_Sentence_Punctuation` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `markersMissingFinalPunctuationToolStripMenuItem_Click` at line 2238 |
| 1 | `Paratext/WindowCollection.cs` | Method call in D0 | Line 2242: `MainForm.Current.Windows.FindOrCreateInventoryForm(ScriptureText, new ParagraphFinalPunctuationCheck())` |
| 1 | `ParatextChecks/Checks/ParagraphFinalPunctuationCheck.cs` | Instantiated in D0 | Line 27: `public class ParagraphFinalPunctuationCheck : ScriptureInventoryBase` |
| 1 | `Paratext/Checking/InventoryForm.cs` | Created in D1 | Line 1128 (WindowCollection): `new InventoryForm(scrText, checksDataSource, inventory)` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Parameter in D1 | Line 19: `public class ChecksDataSource` |
| 2 | `ParatextChecks/ScriptureInventoryBase.cs` | Base class in D1 | Line 15: `public abstract class ScriptureInventoryBase : ScriptureCheckBase` |

**UI Entry Points**:
- Tools > Checking inventories > Markers missing final punctuation
  - Menu Structure: `TextForm`, handler `markersMissingFinalPunctuationToolStripMenuItem_Click`, line 2238
  - File: `Paratext/TextForm.cs`
- Also documented in:
  - HelpData ID: `9978a4f0-fa33-4fd1-b803-32b4f48e6a37`
  - Dialog: `InventoryForm.Markers_Missing_Final_Sentence_Punctuation`

**InventoryForm Menus** (owned by InventoryForm):
- Project > Edit inventory options (`cmdOptions_Click`, line 374)
- Project > Refresh (`cmdRefresh_Click`, line 861)

**Validation**: [MS] - - [H] [C] — Last verified: 2026-01-21

---

### 6.8 Punctuation Followed by Lowercase Inventory

**Description**: Inventory sentence-final punctuation followed by lowercase letters when capitalization may be expected.

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checking inventories > Punctuation followed by lowercase`; Handler: `sentenceFinalPunctCapitalizationInventoryToolStripMenuItem_Click`; Line: 2246 | `[MS]` |
| Manual | `chapters/12_basic_checks_2.md`: "12.8 Capitalization" | `[M]` |
| HelpData | Dialog: `InventoryForm.No_Capital_after_Punctuation` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `sentenceFinalPunctCapitalizationInventoryToolStripMenuItem_Click` at line 2246 |
| 1 | `Paratext/WindowCollection.cs` | Method call in D0 | Line 2250: `MainForm.Current.Windows.FindOrCreateInventoryForm(ScriptureText, new SentenceFinalPunctCapitalizationCheck())` |
| 1 | `ParatextChecks/Checks/SentenceFinalPunctCapitalizationCheck.cs` | Instantiated in D0 | Line 19: `public class SentenceFinalPunctCapitalizationCheck : ScriptureInventoryBase` |
| 1 | `Paratext/Checking/InventoryForm.cs` | Created in D1 | Line 1128 (WindowCollection): `new InventoryForm(scrText, checksDataSource, inventory)` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Parameter in D1 | Line 19: `public class ChecksDataSource` |
| 2 | `ParatextChecks/ScriptureInventoryBase.cs` | Base class in D1 | Line 15: `public abstract class ScriptureInventoryBase : ScriptureCheckBase` |

**UI Entry Points**:
- Tools > Checking inventories > Punctuation followed by lowercase
  - Menu Structure: `TextForm`, handler `sentenceFinalPunctCapitalizationInventoryToolStripMenuItem_Click`, line 2246
  - File: `Paratext/TextForm.cs`
- Also documented in:
  - Dialog: `InventoryForm.No_Capital_after_Punctuation`

**InventoryForm Menus** (owned by InventoryForm):
- Project > Edit inventory options (`cmdOptions_Click`, line 374)
- Project > Refresh (`cmdRefresh_Click`, line 861)

**Validation**: [MS] - [M] [H] [C] — Last verified: 2026-01-21

---

### 6.9 Mixed Capitalization Inventory

**Description**: Inventory words with mixed capitalization (e.g., "tHe") that may indicate errors.

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Checking inventories > Mixed capitalization`; Handler: `mixedCapitalizationInventoryToolStripMenuItem_Click`; Line: 2254 | `[MS]` |
| Requirements | Section: "Inventories and Checks" | `[R]` |
| Manual | `chapters/12_basic_checks_2.md`: "12.8 Capitalization" | `[M]` |
| HelpData | Keyword: `ContentMixedCapitalization`; Dialog: `InventoryForm.Mixed_Capitalization` | `[H]` |

**Key Quote** (from Requirements):
> "What are all of the cases where capitalization of letters within a word is mixed?"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `mixedCapitalizationInventoryToolStripMenuItem_Click` at line 2254 |
| 1 | `Paratext/WindowCollection.cs` | Method call in D0 | Line 2259: `MainForm.Current.Windows.FindOrCreateInventoryForm(ScriptureText, new MixedCapitalizationCheck())` |
| 1 | `ParatextChecks/Checks/MixedCapitalizationCheck.cs` | Instantiated in D0 | Line 17: `public class MixedCapitalizationCheck : ScriptureInventoryBase` |
| 1 | `Paratext/Checking/InventoryForm.cs` | Created in D1 | Line 1128 (WindowCollection): `new InventoryForm(scrText, checksDataSource, inventory)` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Parameter in D1 | Line 19: `public class ChecksDataSource` |
| 2 | `ParatextChecks/ScriptureInventoryBase.cs` | Base class in D1 | Line 15: `public abstract class ScriptureInventoryBase : ScriptureCheckBase` |

**UI Entry Points**:
- Tools > Checking inventories > Mixed capitalization
  - Menu Structure: `TextForm`, handler `mixedCapitalizationInventoryToolStripMenuItem_Click`, line 2254
  - File: `Paratext/TextForm.cs`
- Also documented in:
  - HelpData ID: `97bfddd5-8255-494a-a931-e425eaf919b6`
  - Dialog: `InventoryForm.Mixed_Capitalization`

**InventoryForm Menus** (owned by InventoryForm):
- Project > Edit inventory options (`cmdOptions_Click`, line 374)
- Project > Refresh (`cmdRefresh_Click`, line 861)

**Validation**: [MS] [R] [M] [H] [C] — Last verified: 2026-01-21

---

## Cross-References

**Related Categories**:
- **07 Automated Checks**: Checks that use inventory classifications to find errors
- **08 Checklists**: Manual review lists (different purpose than inventories)
- **05 Spelling & Wordlist**: Character/word-related analysis
- **09 Advanced Checking Tools**: Advanced analysis builds on inventory data
- **10 Collaboration & Sync**: Inventory results can be discussed in notes
- **11 Project Planning**: Inventory completion tied to task workflow

**Dependencies**:
- Project text (content to analyze)
- Project settings (rules and exceptions)

---

## Validation Summary

| Feature | MS | R | M | H | C | Last Verified |
|---------|----|----|---|---|---|---------------|
| 6.1 Character Inventory | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 6.2 Punctuation Inventory | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 6.3 Marker Inventory | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 6.4 Matched Pairs Inventory | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 6.5 Repeated Words Inventory | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 6.6 Markers Followed by Lowercase | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 6.7 Markers Missing Final Punct. | ✓ | - | - | ✓ | ✓ | 2026-01-21 |
| 6.8 Punctuation Followed by Lowercase | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 6.9 Mixed Capitalization Inventory | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |

---

## Verification Log

| Date | Action | By |
|------|--------|-----|
| 2026-01-16 | Original documentation in 06_Basic_Quality_Checks.md | Claude |
| 2026-01-20 | Split into 06A_Checking_Inventories.md | Claude |
| 2026-01-20 | Added 6.6, 6.7, 6.8 from menu structure analysis | Claude |
| 2026-01-21 | Reorganized: 06A promoted to 06; feature numbers updated | Claude |
| 2026-01-21 | Session 1: Added [MS] sources and Evidence Chains for 6.1, 6.2 | Claude |
| 2026-01-21 | Session 2: Added [MS] sources and Evidence Chains for 6.3, 6.4 | Claude |
| 2026-01-21 | Session 3: Added [MS] sources and Evidence Chains for 6.5, 6.6 | Claude |
| 2026-01-21 | Session 4: Added [MS] sources and Evidence Chains for 6.7, 6.8 | Claude |
| 2026-01-21 | Session 5: Added [MS] sources and Evidence Chains for 6.9 | Claude |

---

**Document Version**: 2.5  
**Template Version**: FEATURE_TEMPLATE_v2.md v6.1  
**Last Updated**: 2026-01-21
