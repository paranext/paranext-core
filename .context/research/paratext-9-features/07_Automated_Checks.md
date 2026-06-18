# Paratext 9 - Automated Checks

**Category**: 07  
**Focus**: Automated validation checks that find errors based on rules  
**User Roles**: Translators, Reviewers, Consultants  
**Manual Chapters**: 5, 12, 19 (Basic Checks series)  
**Last Updated**: 2026-01-21

---

## Overview

Automated Checks run validation rules against project text to find errors. They use classifications from Inventories (Category 06) to know what's valid/invalid, then report issues in a results list. Checks can be run individually or together via "Run Basic Checks."

**Key Principle**: Configure inventories first, then run checks to find problems based on those decisions.

---

## Feature List

### 7.1 Capitalization Check

**Description**: Validate capitalization rules including sentence starts, after punctuation, and mixed case.

**Sub-Features**:
- Check sentence-initial capitalization
- Check capitalization after punctuation
- Mixed case detection
- Configure capitalization rules
- Uses three capitalization inventories (6.6, 6.8, 6.9)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Run basic checks`; Handler: `runBasicChecksToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `TextForm` → `RunBasicChecksForm` (line 2326) | `[FR]` |
| HelpData | Keyword: `ComponentRunBasicChecks`; Dialog: `RunBasicChecksForm` | `[H]` |
| Manual | `chapters/12_basic_checks_2.md`, line 158: "The capitalization check looks for several types of capitalization problems." | `[M]` |
| Requirements | Section: "Inventories and Checks" | `[R]` |

**Key Quote** (from Manual):
> "The capitalization check looks for several types of capitalization problems. There are three inventories for capitalization, but only one check."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `runBasicChecksToolStripMenuItem_Click` at line 2316 |
| 1 | `Paratext/Checking/RunBasicChecksForm.cs` | Opens dialog D0 | Line 2326: `using (RunBasicChecksForm frm = new RunBasicChecksForm(...)` |
| 1 | `Paratext/Checking/BasicChecks.cs` | Import in D1 | Line 69: `BasicChecks.GetAllChecks()` |
| 2 | `ParatextChecks/Checks/CapitalizationCheck.cs` | BasicChecks.GetCheck() | Line 46: `return new CapitalizationCheck()` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Field in D1 | Line 51: `ChecksDataSource checksDataSource = new ChecksDataSource(scrText)` |

**Dialog Navigation**:
- `TextForm` → `RunBasicChecksForm` (line 2326)

**UI Entry Points**:
- ≡ Tab > Tools > Run basic checks
  - Menu Structure: `TextForm`, handler `runBasicChecksToolStripMenuItem_Click`, line 2316
  - File: `Paratext/TextForm.cs`
  - Dialog: `RunBasicChecksForm` (select "Capitalization" check within dialog)
  - HelpData Keyword: `ComponentRunBasicChecks`

**Validation**: [MS] [FR] [H] [M] [R] [C] — Last verified: 2026-01-21

---

### 7.2 Quotation Check

**Description**: Validate proper quotation mark usage including opening/closing pairs and nesting.

**Sub-Features**:
- Define quotation rules per language
- Check nesting depth
- Check continuation across verses
- Validate mark pairing
- Navigate to issues

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Run basic checks`; Handler: `runBasicChecksToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `TextForm` → `RunBasicChecksForm` (line 2326) | `[FR]` |
| HelpData | Keyword: `ComponentQuotationRules`; Dialog: `QuotationRulesForm_tabQuoteMarks` | `[H]` |
| Manual | `chapters/19_basic_checks_3.md`, line 99: "The quotations check ensures you have been consistent in marking the direct speech correctly." | `[M]` |
| Requirements | Section: "Inventories and Checks" | `[R]` |

**Key Quote** (from Requirements):
> "Quotations that don't appear to have been closed or continued properly based on language rules"

**Key Quote** (from Manual):
> "The quotations check ensures you have been consistent in marking the direct speech correctly."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `runBasicChecksToolStripMenuItem_Click` at line 2316 |
| 1 | `Paratext/Checking/RunBasicChecksForm.cs` | Opens dialog D0 | Line 2326: `using (RunBasicChecksForm frm = new RunBasicChecksForm(...)` |
| 1 | `Paratext/Checking/BasicChecks.cs` | Import in D1 | Line 69: `BasicChecks.GetAllChecks()` |
| 2 | `ParatextChecks/Checks/QuotationCheck.cs` | BasicChecks.GetCheck() | Line 58: `return new QuotationCheck()` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Field in D1 | Line 51: `ChecksDataSource checksDataSource = new ChecksDataSource(scrText)` |

**Dialog Navigation**:
- `TextForm` → `RunBasicChecksForm` (line 2326)

**UI Entry Points**:
- ≡ Tab > Project > Project settings > Quotation rules
  - HelpData ID: `1929cca8-db2e-4828-a9df-f5a687abf89e`
  - Dialog: `QuotationRulesForm_tabQuoteMarks`
  - Question: "Guide: Project > Project settings > Quotation rules > Quote marks"
- ≡ Tab > Tools > Run basic checks
  - Menu Structure: `TextForm`, handler `runBasicChecksToolStripMenuItem_Click`, line 2316
  - File: `Paratext/TextForm.cs`
  - Dialog: `RunBasicChecksForm` (select "Quotations" check within dialog)
  - HelpData ID: `c80abc3d-52c2-4849-880f-9bdaaedf984e`
  - Question: "How do I check quote marks?"

**Validation**: [MS] [FR] [H] [M] [R] [C] — Last verified: 2026-01-21

---

### 7.3 Numbers Check

**Description**: Validate number formatting according to language conventions.

**Sub-Features**:
- Define number format rules
- Check thousand separators
- Check decimal separators
- Check ordinal formats
- Check reference number formats

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Run basic checks`; Handler: `runBasicChecksToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `TextForm` → `RunBasicChecksForm` (line 2326) | `[FR]` |
| HelpData | Keyword: `ComponentNumberSettings`; Dialog: `NumberSettingsForm` | `[H]` |
| Manual | `chapters/19_basic_checks_3.md`, line 77: "19.3 Numbers check" | `[M]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `runBasicChecksToolStripMenuItem_Click` at line 2316 |
| 1 | `Paratext/Checking/RunBasicChecksForm.cs` | Opens dialog D0 | Line 2326: `using (RunBasicChecksForm frm = new RunBasicChecksForm(...)` |
| 1 | `Paratext/Checking/BasicChecks.cs` | Import in D1 | Line 69: `BasicChecks.GetAllChecks()` |
| 2 | `ParatextChecks/Checks/NumberCheck.cs` | BasicChecks.GetCheck() | Line 66: `return new NumberCheck()` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Field in D1 | Line 51: `ChecksDataSource checksDataSource = new ChecksDataSource(scrText)` |

**Dialog Navigation**:
- `TextForm` → `RunBasicChecksForm` (line 2326)

**UI Entry Points**:
- ≡ Tab > Project > Project settings > Number settings
  - HelpData ID: `4c9662dd-1bcb-4582-bfd4-320cdcd0e26f`
  - Dialog: `NumberSettingsForm`
  - Question: "How do I specify punctuation used with numbers?"
- ≡ Tab > Tools > Run basic checks
  - Menu Structure: `TextForm`, handler `runBasicChecksToolStripMenuItem_Click`, line 2316
  - File: `Paratext/TextForm.cs`
  - Dialog: `RunBasicChecksForm` (select "Numbers" check within dialog)

**Validation**: [MS] [FR] [H] [M] [C] — Last verified: 2026-01-21

---

### 7.4 References Check

**Description**: Validate Scripture cross-references and ensure they point to existing verses.

**Sub-Features**:
- Check cross-reference format
- Verify reference targets exist
- Check reference range validity
- Validate reference markers
- Book name settings

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Run basic checks`; Handler: `runBasicChecksToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `TextForm` → `RunBasicChecksForm` (line 2326) | `[FR]` |
| HelpData | Keyword: `ComponentScriptureReferenceSettings`; Dialog: `ScriptureReferenceSettingsForm_tabOriginOptions` | `[H]` |
| Manual | `chapters/19_basic_checks_3.md`, line 44: "19.2 References" | `[M]` |
| Requirements | Section: "Inventories and Checks" | `[R]` |

**Key Quote** (from Requirements):
> "References (e.g., cross references) to locations that don't exist in the translation"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `runBasicChecksToolStripMenuItem_Click` at line 2316 |
| 1 | `Paratext/Checking/RunBasicChecksForm.cs` | Opens dialog D0 | Line 2326: `using (RunBasicChecksForm frm = new RunBasicChecksForm(...)` |
| 1 | `Paratext/Checking/BasicChecks.cs` | Import in D1 | Line 69: `BasicChecks.GetAllChecks()` |
| 2 | `ParatextChecks/Checks/CrossReferencesCheck.cs` | BasicChecks.GetCheck() | Line 60: `return new CrossReferencesCheck()` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Field in D1 | Line 51: `ChecksDataSource checksDataSource = new ChecksDataSource(scrText)` |

**Dialog Navigation**:
- `TextForm` → `RunBasicChecksForm` (line 2326)

**UI Entry Points**:
- ≡ Tab > Project > Project settings > Scripture reference settings
  - Dialog: `ScriptureReferenceSettingsForm_tabOriginOptions`
- ≡ Tab > Tools > Run basic checks
  - Menu Structure: `TextForm`, handler `runBasicChecksToolStripMenuItem_Click`, line 2316
  - File: `Paratext/TextForm.cs`
  - Dialog: `RunBasicChecksForm` (select "References" check within dialog)
  - HelpData ID: `333a9610-21c9-4d5d-a7c1-bc97fe66eecc`
  - Question: "How do I check references?"

**Validation**: [MS] [FR] [H] [M] [R] [C] — Last verified: 2026-01-21

---

### 7.5 Chapter/Verse Check

**Description**: Validate chapter and verse structure according to the project's versification scheme.

**Sub-Features**:
- Check chapter markers present
- Check verse markers present
- Check verse numbering sequence
- Check against versification
- Identify missing/extra verses

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Run basic checks`; Handler: `runBasicChecksToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `TextForm` → `RunBasicChecksForm` (line 2326) | `[FR]` |
| HelpData | Keyword: `ComponentRunBasicChecks`; Dialog: `RunBasicChecksForm` | `[H]` |
| Manual | `chapters/05_basic_checks_1.md`, line 17: "It is important to run the chapter/verse check first because all the other checks depend on it." | `[M]` |

**Key Quote** (from Manual):
> "It is important to run the chapter/verse check first because all the other checks depend on it."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `runBasicChecksToolStripMenuItem_Click` at line 2316 |
| 1 | `Paratext/Checking/RunBasicChecksForm.cs` | Opens dialog D0 | Line 2326: `using (RunBasicChecksForm frm = new RunBasicChecksForm(...)` |
| 1 | `Paratext/Checking/BasicChecks.cs` | Import in D1 | Line 69: `BasicChecks.GetAllChecks()` |
| 2 | `ParatextChecks/Checks/ChapterVerseCheck.cs` | BasicChecks.GetCheck() | Line 44: `return new ChapterVerseCheck()` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Field in D1 | Line 51: `ChecksDataSource checksDataSource = new ChecksDataSource(scrText)` |

**Dialog Navigation**:
- `TextForm` → `RunBasicChecksForm` (line 2326)

**UI Entry Points**:
- ≡ Tab > Tools > Run Basic Checks > Chapter/verse numbers
  - Menu Structure: `TextForm`, handler `runBasicChecksToolStripMenuItem_Click`, line 2316
  - File: `Paratext/TextForm.cs`
  - Dialog: `RunBasicChecksForm`

**Validation**: [MS] [FR] [H] [M] [C] — Last verified: 2026-01-21

---

### 7.6 Markers Check

**Description**: Validate USFM marker usage against the project stylesheet.

**Sub-Features**:
- Check for invalid markers
- Check marker nesting
- Check required markers
- Compare to stylesheet

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Run basic checks`; Handler: `runBasicChecksToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `TextForm` → `RunBasicChecksForm` (line 2326) | `[FR]` |
| HelpData | Keyword: `ComponentRunBasicChecks` | `[H]` |
| Manual | `chapters/05_basic_checks_1.md`, line 84: "Markers check" | `[M]` |

**Key Quote** (from Manual):
> "What to look for. Markers that only occur a few times. Similar markers \q and \q1. Markers that appear together but do not have the same count (e.g. \f and \f\*)"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `runBasicChecksToolStripMenuItem_Click` at line 2316 |
| 1 | `Paratext/Checking/RunBasicChecksForm.cs` | Opens dialog D0 | Line 2326: `using (RunBasicChecksForm frm = new RunBasicChecksForm(...)` |
| 1 | `Paratext/Checking/BasicChecks.cs` | Import in D1 | Line 69: `BasicChecks.GetAllChecks()` |
| 2 | `ParatextChecks/Checks/MarkerCheck.cs` | BasicChecks.GetCheck() | Line 48: `return new MarkerCheck()` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Field in D1 | Line 51: `ChecksDataSource checksDataSource = new ChecksDataSource(scrText)` |

**Dialog Navigation**:
- `TextForm` → `RunBasicChecksForm` (line 2326)

**UI Entry Points**:
- ≡ Tab > Tools > Run basic checks
  - Menu Structure: `TextForm`, handler `runBasicChecksToolStripMenuItem_Click`, line 2316
  - File: `Paratext/TextForm.cs`
  - Dialog: `RunBasicChecksForm` (select "Markers" check within dialog)

**HelpData Items**:
- ID: `92dcbedf-812a-4f16-bdbc-cc51744289c8` - "How do I fix errors resulting from the Markers check?"
- ID: `23e34791-5a70-4f37-990e-0f6446c2887d` - "How do I fix the 'Verse marker without a paragraph marker' error?"

**Validation**: [MS] [FR] [H] [M] [C] — Last verified: 2026-01-21

---

### 7.7 Run Basic Checks

**Description**: Run multiple checks at once and review all issues in a single list.

**Sub-Features**:
- Select which checks to run
- Run on book, chapter, or project
- Combined results list
- Navigate to issues
- Filter by check type
- Mark issues as resolved
- Rerun after fixes

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Run basic checks`; Handler: `runBasicChecksToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `TextForm` → `RunBasicChecksForm` (line 2326); `RunBasicChecksForm` → `BookChooserForm` (line 158) | `[FR]` |
| HelpData | Keyword: `ComponentRunBasicChecks`; Dialog: `RunBasicChecksForm`; 13 items | `[H]` |
| Manual | `chapters/05_basic_checks_1.md`, line 23: "It is easier to run the checks from the Assignments and Progress." | `[M]` |

**Key Quote** (from Manual):
> "It is easier to run the checks from the Assignments and Progress."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `runBasicChecksToolStripMenuItem_Click` at line 2316 |
| 1 | `Paratext/Checking/RunBasicChecksForm.cs` | Opens dialog D0 | Line 2326: `using (RunBasicChecksForm frm = new RunBasicChecksForm(...)` |
| 1 | `Paratext/Checking/BasicChecks.cs` | Called in D1 | Line 69: `ScriptureCheckBase[] availableChecks = BasicChecks.GetAllChecks()` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Field in D1 | Line 51: `ChecksDataSource checksDataSource = new ChecksDataSource(scrText)` |
| 2 | `ParatextBase/CommonForms/BookChooserForm.cs` | Opens dialog D1 | Line 158: `using (BookChooserForm frm = new BookChooserForm(...)` |

**Dialog Navigation**:
- `TextForm` → `RunBasicChecksForm` (line 2326)
- `RunBasicChecksForm` → `BookChooserForm` (line 158)

**UI Entry Points**:
- ≡ Tab > Tools > Run Basic Checks
  - Menu Structure: `TextForm`, handler `runBasicChecksToolStripMenuItem_Click`, line 2316
  - File: `Paratext/TextForm.cs`
  - HelpData ID: `ccb98e6f-287f-41f0-8ae5-16561e2c9c98`
  - Dialog: `RunBasicChecksForm`
  - Question: "Guide: Tools > Run basic checks"

**HelpData Items**:
- ID: `ccb98e6f-287f-41f0-8ae5-16561e2c9c98` - "Guide: Tools > Run basic checks"
- ID: `f3c99570-44c2-47ef-80b5-afc0bf42bb8d` - "How do I run basic checks on a text?"
- ID: `fdf0216c-b761-482c-93e2-e7829e7be541` - "Introduction to the Checking tools"
- ID: `e037981e-0295-4298-b405-5eb6ee853d9b` - "Introduction to basic checks"
- ID: `5578df35-a3a4-4fc1-98b5-383599263864` - "Best practice for pre-publication checking"

**Validation**: [MS] [FR] [H] [M] [C] — Last verified: 2026-01-21

---

### 7.8 Footnote Quotes Check

**Description**: Validate that quoted text in footnotes matches the verse text.

**Sub-Features**:
- Check footnote keywords (\fk) match verse text
- Check footnote quotes (\fq) match verse text
- Check cross-reference keywords (\xk) match verse text
- Check cross-reference quotes (\xq) match verse text

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Run basic checks`; Handler: `runBasicChecksToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `TextForm` → `RunBasicChecksForm` (line 2326) | `[FR]` |
| HelpData | Keyword: `ComponentRunBasicChecks` | `[H]` |
| Manual | `chapters/19_basic_checks_3.md`, line 129: "The Footnote quotes check (previously Quoted text) looks at text in a footnote..." | `[M]` |

**Key Quote** (from Manual):
> "The Footnote quotes check (previously Quoted text) looks at text in a footnote (after the \fk or the \fq marker) or in a cross-reference (after the \xk or the \xq marker) to make sure it matches text in the verse."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `runBasicChecksToolStripMenuItem_Click` at line 2316 |
| 1 | `Paratext/Checking/RunBasicChecksForm.cs` | Opens dialog D0 | Line 2326: `using (RunBasicChecksForm frm = new RunBasicChecksForm(...)` |
| 1 | `Paratext/Checking/BasicChecks.cs` | Import in D1 | Line 69: `BasicChecks.GetAllChecks()` |
| 2 | `ParatextChecks/Checks/QuotedTextCheck.cs` | BasicChecks.GetCheck() | Line 68: `return new QuotedTextCheck()` |
| 2 | `ParatextChecks/ChecksDataSource.cs` | Field in D1 | Line 51: `ChecksDataSource checksDataSource = new ChecksDataSource(scrText)` |

**Dialog Navigation**:
- `TextForm` → `RunBasicChecksForm` (line 2326)

**UI Entry Points**:
- ≡ Tab > Tools > Run basic checks
  - Menu Structure: `TextForm`, handler `runBasicChecksToolStripMenuItem_Click`, line 2316
  - File: `Paratext/TextForm.cs`
  - Dialog: `RunBasicChecksForm` (select "Footnote Quotes" check within dialog)

**Validation**: [MS] [FR] [H] [M] [C] — Last verified: 2026-01-21

---

## Implementation Architecture

The Basic Checks infrastructure is organized as:

| Layer | Location | Purpose |
|-------|----------|---------|
| UI Forms | `Paratext/Checking/` | RunBasicChecksForm.cs |
| Check Registry | `Paratext/Checking/BasicChecks.cs` | Lists all available check types |
| Check Classes | `ParatextChecks/Checks/` | Individual check implementations |
| Data Access | `ParatextChecks/ChecksDataSource.cs` | Project data access |

**Available Check Types** (from BasicChecks.cs):
1. ChapterVerse
2. Marker
3. Character
4. Punctuation
5. Reference
6. QuotedText
7. Capitalization
8. RepeatedWord
9. MatchedPairs
10. Quotation
11. QuotationTypes
12. Numbers
13. Schema (USX validation)

---

## Cross-References

**Related Categories**:
- **06 Checking Inventories**: Inventories configure what's valid/invalid for checks
- **08 Checklists**: Manual review lists (different purpose)
- **09 Advanced Checking Tools**: More sophisticated analysis beyond basic checks
- **10 Collaboration & Sync**: Check results can be discussed in notes
- **11 Project Planning**: Checks integrate with task completion workflow

**Dependencies**:
- Project text (content to check)
- Inventory classifications (from Category 06)
- Versification (for reference validation)

---

## Validation Summary

| Feature | MS | FR | H | M | R | C | Last Verified |
|---------|----|----|---|---|---|---|---------------|
| 7.1 Capitalization Check | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 7.2 Quotation Check | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 7.3 Numbers Check | ✓ | ✓ | ✓ | ✓ | - | ✓ | 2026-01-21 |
| 7.4 References Check | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 7.5 Chapter/Verse Check | ✓ | ✓ | ✓ | ✓ | - | ✓ | 2026-01-21 |
| 7.6 Markers Check | ✓ | ✓ | ✓ | ✓ | - | ✓ | 2026-01-21 |
| 7.7 Run Basic Checks | ✓ | ✓ | ✓ | ✓ | - | ✓ | 2026-01-21 |
| 7.8 Footnote Quotes Check | ✓ | ✓ | ✓ | ✓ | - | ✓ | 2026-01-21 |

---

## Verification Log

| Date | Action | By |
|------|--------|-----|
| 2026-01-16 | Original documentation in 06_Basic_Quality_Checks.md | Claude |
| 2026-01-20 | Split into 06B_Automated_Checks.md | Claude |
| 2026-01-21 | Reorganized: 06B promoted to 07; feature numbers updated | Claude |
| 2026-01-21 | Added [MS] sources, [FR] for all features; Evidence Chain tables for all 8 features; updated Validation Summary | Claude |

---

**Document Version**: 2.0  
**Template Version**: FEATURE_TEMPLATE_v2.md v6.1  
**Last Updated**: 2026-01-21
