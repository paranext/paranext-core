# Paratext 9 - Spelling & Wordlist

**Category**: 05  
**Focus**: Spell checking, word analysis, and lexical tools  
**User Roles**: Translators, Reviewers  
**Manual Chapters**: 8 (Spell Checking)  
**Last Updated**: 2026-01-21

---

## Overview

Spelling and Wordlist features help translation teams maintain consistent spelling in languages that often don't have established dictionaries. The Wordlist tool generates a dictionary from the project text, which can then be used for spell checking and morphological analysis.

---

## Feature List

### 5.1 Wordlist Tool

**Description**: The primary tool for viewing and managing all words used in the project. Shows frequency, spelling status, and allows word management.

**Sub-Features**:
- List all unique words in project
- Show word frequency
- Filter by spelling status
- Navigate to word occurrences
- Search within wordlist
- Sort by various criteria
- Export wordlist

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Requirements | Section: "Lexical Analysis" | `[R]` |
| Manual | `chapters/08_spell_check.md`, line 30: "**≡ Tab**, under **Tools** > **Wordlist**" | `[M]` |
| Menu Structure | `ParatextWindowWithMenus`: Tools > Wordlist | `[MS]` |
| Form Relationships | `WordListForm` opens 7 dialogs | `[FR]` |
| HelpData | Keyword: `ComponentWordlist/Spelling`; Dialog: `WordListForm`; 45 items | `[H]` |

**Key Quote** (from Requirements):
> "The Wordlist tool produces a list of every word used in the translation project"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | Line 372: `wordListSpellCheckToolStripMenuItem_Click` |
| 0 | `Paratext/WordList/WordListForm.cs` | DependencyLookup in D0 | Line 375: `DisplayWordlistWindow(ScriptureText, Reference, ScrollingGroup)` |
| 1 | `Paratext/WordList/WordListSource.cs` | Same directory | Base class for word list data sources |
| 1 | `Paratext/WordList/Filters/OccurrencesFilters.cs` | Import in D0 | Line 15: `using Paratext.WordList.Filters;` |
| 1 | `Paratext/Checking/Spelling/SpellingEngine.cs` | Import in D0 | Line 17: `using Paratext.Checking.Spelling;` |
| 1 | `Paratext/Linguistics/` | Import in D0 | Line 18: `using Paratext.Linguistics;` |
| 1 | `ParatextData/Checking/Spelling/SpellingStatus.cs` | Import in D0 | Line 40: `using Paratext.Data.Checking.Spelling;` |
| 1 | `ParatextData/Words/WordOccurrences.cs` | Import in D0 | Line 51: `using Paratext.Data.Words;` |
| 2 | `ParatextData/ScrText.cs` | Parameter in D1 | WordListSource.cs line 27: `ScrText scrText` |

**Dialog Navigation** `[FR]`:
- `WordListForm` → `WordlistPrintForm` (line 659)
- `WordListForm` → `WordlistFindForm` (line 1438)
- `WordListForm` → `SimilarWordsSetupForm` (line 1477)
- `WordListForm` → `EditScrTextForm` (line 1516)
- `WordListForm` → `SimilarJoinedWordsSetupForm` (line 1668)
- `WordListForm` → `ProperNameHyphenationForm` (line 1689)
- `WordListForm` → `SpellingCorrectionForm` (line 2612)

**UI Entry Points**:
- ≡ Tab > Tools > Wordlist `[MS]`
  - Form: `ParatextWindowWithMenus`
  - Handler: `wordListSpellCheckToolStripMenuItem_Click` at line 372
  - Opens: `WordListForm` via `DependencyLookup.Get<IParatextAccess>().DisplayWordlistWindow()`
  - Manual: `chapters/08_spell_check.md`, line 30
  - Quote: "**≡ Tab**, under **Tools** > **Wordlist**"
  - HelpData ID: `6423df0e-0858-4b78-804a-3e16c09e811e`
  - Question: "How do I create a Wordlist?"

**HelpData Items**:
- ID: `1b1d4398-5092-43e9-aefa-619c9343c196` - "Introduction to the Wordlist tool"
- ID: `6423df0e-0858-4b78-804a-3e16c09e811e` - "How do I create a Wordlist?"
- ID: `6c46e747-9aec-4c01-aa3d-55e13f089e38` - "How do I find a specific word in the Wordlist?"
- Dialog: `WordListForm`

**Validation**: [R] [M] [MS] [FR] [H] [C] — Last verified: 2026-01-21

---

### 5.2 Spell Checking

**Description**: Check spelling throughout the project based on the wordlist dictionary. Words not marked as "correct" are flagged.

**Sub-Features**:
- In-editor spell check (red/grey underlines)
- Spelling suggestions
- Add to dictionary
- Ignore word
- Check entire project or selection

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Requirements | Section: "Lexical Analysis" | `[R]` |
| Manual | `chapters/08_spell_check.md`, line 93: "**≡ Tab**, under **View** > **Display spelling**" | `[M]` |
| Menu Structure | `TextForm`: View > Display spelling errors, Tools > Spell check current book | `[MS]` |
| HelpData | Keyword: `ComponentSpellChecking`; 2 items | `[H]` |

**Key Quote** (from Requirements):
> "Using this tool the team members can go through and mark as 'approved' all words that are spelled correctly based upon the agreed orthography for the target language"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | Line 2186: `displaySpellingMenuItem_Click`, Line 2172: `spellCheckCurrentBookToolStripMenuItem_Click` |
| 0 | `Paratext/Checking/Spelling/SpellingEngine.cs` | HelpData keyword | `ComponentSpellChecking` |
| 0 | `Paratext/Checking/Spelling/SpellingAnnotationSource.cs` | Same directory | In-editor annotation support |
| 0 | `Paratext/Checking/Spelling/SpellingCorrectionForm.cs` | Same directory | Correction dialog |
| 1 | `Paratext/Checking/Spelling/SpellingHeuristic.cs` | Same directory | Base class for suggestion algorithms |
| 1 | `Paratext/Checking/Spelling/EditDistanceHeuristic.cs` | Same directory | Suggests similar words by edit distance |
| 1 | `Paratext/Checking/Spelling/DiacriticHeuristic.cs` | Same directory | Suggests words with diacritic differences |
| 1 | `Paratext/Checking/Spelling/MorphologyHeuristic.cs` | Same directory | Morphology-based suggestions |
| 2 | `ParatextData/Checking/Spelling/SpellingStatus.cs` | Referenced from D1 | Spelling status enumeration |

**UI Entry Points**:
- ≡ Tab > View > Display spelling errors `[MS]`
  - Form: `TextForm`
  - Handler: `displaySpellingMenuItem_Click` at line 2186
  - Behavior: Line 2188: `ToggleSpellingErrors()`
  - Manual: `chapters/08_spell_check.md`, line 93
  - Quote: "**≡ Tab**, under **View** > **Display spelling**"
- ≡ Tab > Tools > Spell Check Current Book `[MS]`
  - Form: `TextForm`
  - Handler: `spellCheckCurrentBookToolStripMenuItem_Click` at line 2172
  - Behavior: Opens `WordListForm` filtered to current book with spelling issues
  - Manual: `chapters/08_spell_check.md`, line 125
  - Quote: "**≡ Tab**, under **Tools** > **Spell Check Current Book**"
- Right-click underlined word
  - Manual: `chapters/08_spell_check.md`, line 107
  - Quote: "Right-click a word which is underlined in either red or grey"
  - HelpData ID: `c5d7a608-a767-4404-a6a5-22d09c8f440f`
  - Question: "How do I do spell checking while editing text?"

**HelpData Items**:
- ID: `c5d7a608-a767-4404-a6a5-22d09c8f440f` - "How do I do spell checking while editing text?"
- ID: `81726874-cf99-4a4f-b496-d3f4ea44a480` - "How do I turn off the wavy red or wavy grey underline?"

**Validation**: [R] [M] [MS] [H] [C] — Last verified: 2026-01-21

---

### 5.3 Word Approval Status

**Description**: Mark words as correct, incorrect, or undecided. The project dictionary is built from words marked correct.

**Sub-Features**:
- Mark word as correct
- Mark word as incorrect
- Undecided status
- Bulk approval
- Import/export approved words

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Manual | `chapters/08_spell_check.md`, line 33: "**≡ Tab**, under **Tools** > **Approve spelling of common words**" | `[M]` |
| Menu Structure | `WordListForm`: Edit > Set spelling status (3 items), Tools > Approve spelling of common words | `[MS]` |
| HelpData | Keyword: `ComponentWordlist/Spelling` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/WordList/WordListForm.cs` | Menu Structure | Line 1199: `setStatusCorrectToolStripMenuItem_Click`, Line 1225: `setStatusIncorrectToolStripMenuItem_Click`, Line 1262: `setStatusUndecidedToolStripMenuItem_Click`, Line 1560: `uiToolsCommonWords_Click` |
| 1 | `ParatextData/Checking/Spelling/SpellingStatus.cs` | Import in D0 | Line 40: `using Paratext.Data.Checking.Spelling;` |
| 1 | `ParatextData/Words/WordOccurrences.cs` | Import in D0 | Line 51: `using Paratext.Data.Words;` |

**UI Entry Points**:
- WordListForm > Edit > Set spelling status - Correct `[MS]`
  - Form: `WordListForm`
  - Handler: `setStatusCorrectToolStripMenuItem_Click` at line 1199
- WordListForm > Edit > Set spelling status - Incorrect `[MS]`
  - Form: `WordListForm`
  - Handler: `setStatusIncorrectToolStripMenuItem_Click` at line 1225
- WordListForm > Edit > Set spelling status - Undecided `[MS]`
  - Form: `WordListForm`
  - Handler: `setStatusUndecidedToolStripMenuItem_Click` at line 1262
- WordListForm > Tools > Approve spelling of common words `[MS]`
  - Form: `WordListForm`
  - Handler: `uiToolsCommonWords_Click` at line 1560
  - Manual: `chapters/08_spell_check.md`, line 33
  - Quote: "**≡ Tab**, under **Tools** > **Approve spelling of common words**"
  - HelpData ID: `4f2747e0-0c89-48eb-8c65-ea47a8adc0dd`
  - Question: "How do I approve spelling of common or frequent words?"
- WordListForm > Project > Export to XML `[MS]`
  - Form: `WordListForm`
  - Handler: `exportWordlistToolStripMenuItem_Click` at line 1443
- WordListForm > Project > Import from XML `[MS]`
  - Form: `WordListForm`
  - Handler: `importFromXMLToolStripMenuItem_Click` at line 1626
  - HelpData ID: `c1ce89cc-8acb-4f4f-bcd3-802c0178d179`
  - Question: "How do I import a list of correctly spelled words into the Wordlist?"

**HelpData Items**:
- ID: `55fd2c9a-38d9-49ef-acff-9887c28fc3d7` - "How do I set the spelling status of a word to Incorrect?"
- ID: `4f2747e0-0c89-48eb-8c65-ea47a8adc0dd` - "How do I approve spelling of common or frequent words?"
- ID: `c1ce89cc-8acb-4f4f-bcd3-802c0178d179` - "How do I import a list of correctly spelled words into the Wordlist?"

**Validation**: - [M] [MS] [H] [C] — Last verified: 2026-01-21

---

### 5.4 Find Similar Words

**Description**: Find words with similar spelling patterns to detect spelling variants, typos, or inconsistent orthography.

**Sub-Features**:
- Search for similar spellings
- Configurable similarity threshold
- Review similar word pairs
- Merge variants

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Manual | `chapters/08_spell_check.md`, line 80: "**≡ Tab**, under **Tools** > **Find Similar Words**" | `[M]` |
| Menu Structure | `WordListForm`: Tools > Find similar words | `[MS]` |
| Form Relationships | `WordListForm` → `SimilarWordsSetupForm` | `[FR]` |
| HelpData | Keyword: `ComponentWordlist/Spelling`; Dialog: `SimilarWordsSetupForm` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/WordList/WordListForm.cs` | Menu Structure | Line 1475: `uiToolsSimilarWords_Click` |
| 0 | `Paratext/WordList/SimilarWordsSetupForm.cs` | Form Relationships | Line 1477: `new SimilarWordsSetupForm(scrText)` |
| 1 | `Paratext/WordList/WordListSource.cs` | Import in D0 | `SimilarWordListSource` class |
| 1 | `Paratext/Checking/Spelling/EditDistanceHeuristic.cs` | Related functionality | Similar word detection algorithm |
| 1 | `Paratext/Checking/Spelling/LetterNgramHeuristic.cs` | Same directory | N-gram based similarity |

**Dialog Navigation** `[FR]`:
- `WordListForm` → `SimilarWordsSetupForm` (line 1477)

**UI Entry Points**:
- WordListForm > Tools > Find similar words `[MS]`
  - Form: `WordListForm`
  - Handler: `uiToolsSimilarWords_Click` at line 1475
  - Opens: `SimilarWordsSetupForm` (line 1477)
  - Behavior: Line 1479-1480: If dialog OK, calls `Setup(frm.WordListSource, true)`
  - Manual: `chapters/08_spell_check.md`, line 80
  - Quote: "**≡ Tab**, under **Tools** > **Find Similar Words**"
  - HelpData ID: `a4276519-e642-4e2c-82ea-4124937e4abe`
  - Question: "How do I find words containing common typing mistakes?"

**HelpData Items**:
- ID: `a4276519-e642-4e2c-82ea-4124937e4abe` - "How do I find words containing common typing mistakes?"
- ID: `a9792b28-75b1-4071-8c63-10e944a4d151` - "How do I find words that Paratext thinks most likely to be misspelled?"
- Dialog: `SimilarWordsSetupForm`

**Validation**: - [M] [MS] [FR] [H] [C] — Last verified: 2026-01-21

---

### 5.5 Find Incorrectly Joined/Split Words

**Description**: Detect word boundary errors where words are accidentally joined together or split apart.

**Sub-Features**:
- Find joined words
- Find split words
- Review and correct
- Pattern detection

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Manual | `chapters/08_spell_check.md`, line 190: "**≡ Tab**, under **Tools**> **Find Incorrectly Joined or Split Words**" | `[M]` |
| Menu Structure | `WordListForm`: Tools > Find incorrectly joined or split words | `[MS]` |
| Form Relationships | `WordListForm` → `SimilarJoinedWordsSetupForm` | `[FR]` |
| HelpData | Keyword: `ComponentWordlist/Spelling`; Dialog: `SimilarJoinedWordsSetupForm` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/WordList/WordListForm.cs` | Menu Structure | Line 1666: `findSimilarJoinedWordsToolStripMenuItem_Click` |
| 0 | `Paratext/WordList/SimilarJoinedWordsSetupForm.cs` | Form Relationships | Line 1668: `new SimilarJoinedWordsSetupForm(scrText)` |
| 1 | `Paratext/WordList/SimilarJoinedWordsWordlistSource.cs` | Same directory | `SimilarJoinedWordsSetupForm` uses this source |
| 1 | `Paratext/WordList/WordListSource.cs` | Base class | `SimilarJoinedWordsWordlistSource` extends `WordListSource` |

**Dialog Navigation** `[FR]`:
- `WordListForm` → `SimilarJoinedWordsSetupForm` (line 1668)

**UI Entry Points**:
- WordListForm > Tools > Find incorrectly joined or split words `[MS]`
  - Form: `WordListForm`
  - Handler: `findSimilarJoinedWordsToolStripMenuItem_Click` at line 1666
  - Opens: `SimilarJoinedWordsSetupForm` (line 1668)
  - Behavior: Line 1670-1671: If dialog OK, sets up word list with joined/split results
  - Manual: `chapters/08_spell_check.md`, line 190
  - Quote: "**≡ Tab**, under **Tools**> **Find Incorrectly Joined or Split Words**"
  - HelpData ID: `ef51de0e-ec53-4de4-8598-b05941b25357`
  - Question: "Guide: Tools > Wordlist: Tools > Find incorrectly joined or split words"

**HelpData Items**:
- ID: `ef51de0e-ec53-4de4-8598-b05941b25357` - "Guide: Tools > Wordlist: Tools > Find incorrectly joined or split words"
- Dialog: `SimilarJoinedWordsSetupForm`

**Validation**: - [M] [MS] [FR] [H] [C] — Last verified: 2026-01-21

---

### 5.6 Hyphenation

**Description**: Define proper hyphenation points for words to control line breaking in printed output.

**Sub-Features**:
- Define hyphenation points
- Automatic hyphenation guessing
- Morpheme-based hyphenation
- Export hyphenation dictionary

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Requirements | Section: "Lexical Analysis" | `[R]` |
| Manual | `chapters/08_spell_check.md`: References hyphenation in wordlist context | `[M]` |
| Menu Structure | `WordListForm`: Edit > Approve/Edit hyphenation, View > Show hyphenation, Tools > Proper name hyphenation | `[MS]` |
| Form Relationships | `WordListForm` → `ProperNameHyphenationForm` | `[FR]` |
| HelpData | Keyword: `ComponentHyphenation`; Dialog: `EditHyphenationForm` | `[H]` |

**Key Quote** (from Requirements):
> "The Wordlist tool also allows team members to define proper hyphenation of each word"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/WordList/WordListForm.cs` | Menu Structure | Line 1310: `approveHyphenationToolStripMenuItem_Click`, Line 1371: `editHyphenationToolStripMenuItem_Click`, Line 1189: `uiViewShowHyphenation_Click`, Line 1687: `addOrRemoveProperNameHyphenationToolStripMenuItem_Click` |
| 0 | `Paratext/ToolsMenu/ProperNameHyphenationForm.cs` | Form Relationships | Line 1689: `new ProperNameHyphenationForm()` |
| 1 | `Paratext/Linguistics/HyphenationEngine.cs` | Import in D0 | Line 18: `using Paratext.Linguistics;` |
| 1 | `ParatextData/Linguistics/Hyphenation.cs` | Import in D0 | Line 43: `using Paratext.Data.Linguistics;` |

**Dialog Navigation** `[FR]`:
- `WordListForm` → `ProperNameHyphenationForm` (line 1689)

**UI Entry Points**:
- WordListForm > Edit > Approve word hyphenation `[MS]`
  - Form: `WordListForm`
  - Handler: `approveHyphenationToolStripMenuItem_Click` at line 1310
  - Behavior: Approves hyphenation for selected words
- WordListForm > Edit > Edit word hyphenation `[MS]`
  - Form: `WordListForm`
  - Handler: `editHyphenationToolStripMenuItem_Click` at line 1371
  - Behavior: Opens inline editing for word hyphenation
- WordListForm > View > Show hyphenation `[MS]`
  - Form: `WordListForm`
  - Handler: `uiViewShowHyphenation_Click` at line 1189
  - Behavior: Toggles hyphenation column visibility
- WordListForm > Tools > Add or remove proper name hyphenation `[MS]`
  - Form: `WordListForm`
  - Handler: `addOrRemoveProperNameHyphenationToolStripMenuItem_Click` at line 1687
  - Opens: `ProperNameHyphenationForm` (line 1689)
  - HelpData ID: `40b97431-4cdc-415a-bcef-1997816ef702`
  - Question: "How do I approve hyphenation of words?"
- WordListForm > Tools > Advanced > Compare hyphenation to standard `[MS]`
  - Form: `WordListForm`
  - Handler: `compareHyphenationToStandardToolStripMenuItem_Click` at line 1389
  - Behavior: Compares against HyphenationStandard.txt file
- WordListForm > Tools > Advanced > Apply standard hyphenation to random 10% `[MS]`
  - Form: `WordListForm`
  - Handler: `applyStandardHyphenationToRandom10ToolStripMenuItem_Click` at line 1405
  - Behavior: Applies standard hyphenation to sample of words

**HelpData Items**:
- ID: `40b97431-4cdc-415a-bcef-1997816ef702` - "How do I approve hyphenation of words?"
- ID: `7dca7c1c-09a8-4271-8c82-66c0549591e7` - "What are the options for hyphenation of words?"
- ID: `b9c515e7-6a0f-4b7e-b905-d951a35a903d` - "What is the difference between hyphenation and word break characters?"
- Dialog: `EditHyphenationForm`

**Not Found**:
- `EditHyphenationForm.cs` - HelpData references this dialog but it may be embedded or use different name

**Validation**: [R] [M] [MS] [FR] [H] [C] — Last verified: 2026-01-21

---

### 5.7 Spelling Discussion Notes

**Description**: Add discussion notes to specific words for team communication about spelling decisions.

**Sub-Features**:
- Add notes to words
- View notes in project
- Note status tracking

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Manual | `chapters/08_spell_check.md`, line 17: "Add a spelling discussion note to words that need further discussion" | `[M]` |
| Menu Structure | `WordListForm`: View > Show base text spelling discussion notes | `[MS]` |
| HelpData | Keyword: `ComponentNotesOther` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/WordList/WordListForm.cs` | Menu Structure | Line 1183: `uiViewShowBaseSpellingNotes_Click` |
| 1 | `ParatextBase/ProjectComments/` | Import in D0 | Line 34: `using Paratext.Base.ProjectComments;` |
| 1 | `ParatextData/ProjectComments/` | Import in D0 | Line 45: `using Paratext.Data.ProjectComments;` |

**UI Entry Points**:
- WordListForm > View > Show base text spelling discussion notes `[MS]`
  - Form: `WordListForm`
  - Handler: `uiViewShowBaseSpellingNotes_Click` at line 1183
  - Behavior: Line 1185: `RefreshItems()` - toggles visibility of spelling notes column
  - Manual: `chapters/08_spell_check.md`, line 17
  - Quote: "Add a spelling discussion note to words that need further discussion"
  - HelpData ID: `918205ea-bf04-4824-a8b2-d4468ba83af7`
  - Question: "How do I see spelling discussion notes in my project?"

**HelpData Items**:
- ID: `918205ea-bf04-4824-a8b2-d4468ba83af7` - "How do I see spelling discussion notes in my project?"

**Validation**: - [M] [MS] [H] [C] — Last verified: 2026-01-21

---

### 5.8 Wordlist Spell Check Tools

**Description**: Collection of specialized spell checking tools accessible from the Wordlist menu.

**Sub-Features**:
- All checks (combined)
- Missing capitals
- Single character typos
- Unusual letter combinations
- Diacritic errors
- Common typos
- Unknown morphology

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Manual | `chapters/08_spell_check.md`, line 134: "**≡ Tab**, under **Tools**> **Spell check >**" | `[M]` |
| Menu Structure | `WordListForm`: Tools > Spell check > (7 submenu items) | `[MS]` |
| HelpData | Keyword: `ComponentWordlist/Spelling` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/WordList/WordListForm.cs` | Menu Structure | Line 1709: `allChecksMenuItem_Click`, etc. |
| 0 | `Paratext/WordList/WordListSource.cs` | Import in D0 | Line 140: `class SpellingWordListSource` |
| 1 | `Paratext/Checking/Spelling/SpellingEngine.cs` | Import in D0 | Line 27: `enum EngineTypes { AllChecks, MissingCapitals, ...}` |
| 1 | `Paratext/Checking/Spelling/CaseConsistencyHeuristic.cs` | SpellingEngine | Handles MissingCapitals check |
| 1 | `Paratext/Checking/Spelling/EditDistanceHeuristic.cs` | SpellingEngine | Handles SingleCharacterTypos check |
| 1 | `Paratext/Checking/Spelling/LetterNgramHeuristic.cs` | SpellingEngine | Handles UnusualLetterCombinations check |
| 1 | `Paratext/Checking/Spelling/DiacriticHeuristic.cs` | SpellingEngine | Handles DiacriticErrors check |
| 1 | `Paratext/Checking/Spelling/CorrectionRuleHeuristic.cs` | SpellingEngine | Handles CommonTypos check |
| 1 | `Paratext/Checking/Spelling/MorphologyHeuristic.cs` | SpellingEngine | Handles UnknownMorphology check |

**UI Entry Points**:
- WordListForm > Tools > Spell check > All checks `[MS]`
  - Form: `WordListForm`
  - Handler: `allChecksMenuItem_Click` at line 1709
  - Behavior: Line 1711: `Setup(new SpellingWordListSource(), true)`
  - Manual: `chapters/08_spell_check.md`, line 134
  - Quote: "**≡ Tab**, under **Tools**> **Spell check >**"
  - HelpData ID: `100b2fb6-c4b8-4f36-bc35-5adc9d364da2`
  - Question: "How do I check text for specific spelling issues?"
- WordListForm > Tools > Spell check > Missing capitals `[MS]`
  - Form: `WordListForm`
  - Handler: `missingCapitalsMenuItem_Click` at line 1714
  - Behavior: Line 1716: `Setup(new SpellingWordListSource(SpellingEngine.EngineTypes.MissingCapitals), true)`
- WordListForm > Tools > Spell check > Single character typos `[MS]`
  - Form: `WordListForm`
  - Handler: `singleCharacterTyposMenuItem_Click` at line 1719
  - Behavior: Line 1721: `Setup(new SpellingWordListSource(SpellingEngine.EngineTypes.SingleCharacterTypos), true)`
- WordListForm > Tools > Spell check > Unusual letter combinations `[MS]`
  - Form: `WordListForm`
  - Handler: `unusualLetterCombinationsMenuItem_Click` at line 1724
  - Behavior: Line 1726: `Setup(new SpellingWordListSource(SpellingEngine.EngineTypes.UnusualLetterCombinations), true)`
- WordListForm > Tools > Spell check > Diacritic errors `[MS]`
  - Form: `WordListForm`
  - Handler: `diacriticErrorsMenuItem_Click` at line 1729
  - Behavior: Line 1731: `Setup(new SpellingWordListSource(SpellingEngine.EngineTypes.DiacriticErrors), true)`
- WordListForm > Tools > Spell check > Common typos `[MS]`
  - Form: `WordListForm`
  - Handler: `commonTyposMenuItem_Click` at line 1734
  - Behavior: Line 1736: `Setup(new SpellingWordListSource(SpellingEngine.EngineTypes.CommonTypos), true)`
- WordListForm > Tools > Spell check > Unknown morphology `[MS]`
  - Form: `WordListForm`
  - Handler: `unknownMorphologyMenuItem_Click` at line 1739
  - Behavior: Line 1741: `Setup(new SpellingWordListSource(SpellingEngine.EngineTypes.UnknownMorphology), true)`

**HelpData Items**:
- ID: `100b2fb6-c4b8-4f36-bc35-5adc9d364da2` - "How do I check text for specific spelling issues?"
- ID: `262e1e59-ab12-451a-852e-10bc0dcfe5bb` - "How do I correct the spelling of words with inconsistent capitalization?"

**Validation**: - [M] [MS] [H] [C] — Last verified: 2026-01-21

---
### 5.9 Word Morphology

**Description**: Analyze word morphology to support spell checking and word analysis for morphologically rich languages.

**Sub-Features**:
- Morpheme analysis
- Root word identification
- Morphological rules
- View morphology column
- Approve/edit morphology
- Spell check by morphology

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Manual | `chapters/08_spell_check.md`: References morphology in wordlist context | `[M]` |
| Menu Structure | `WordListForm`: View > Show morphology, Edit > Approve/Edit morphology, Tools > Spell check by morphology | `[MS]` |
| HelpData | Keyword: `Morphology` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/WordList/WordListForm.cs` | Menu Structure | Line 1168: `uiViewShowMorphology_Click`, Line 1334: `approveMorphologyToolStripMenuItem_Click`, Line 1352: `editMorphologyToolStripMenuItem_Click`, Line 1679: `spellCheckByMorphologyToolStripMenuItem_Click` |
| 1 | `Paratext/WordList/WordListSource.cs` | Same directory | Line 367: `class MorphologicalRootWordListSource` |
| 1 | `ParatextData/Linguistics/ParatextLexicalAnalyser.cs` | Import in D0 | Line 18: `using Paratext.Linguistics;` namespace maps here |
| 1 | `Paratext.LexicalContractsV2/LexiconV2.cs` | LexicalAnalyser reference | Lexicon for morphological data |

**UI Entry Points**:
- WordListForm > View > Show morphology `[MS]`
  - Form: `WordListForm`
  - Handler: `uiViewShowMorphology_Click` at line 1168
  - Behavior: Toggles visibility of morphology columns
- WordListForm > Edit > Approve word morphology `[MS]`
  - Form: `WordListForm`
  - Handler: `approveMorphologyToolStripMenuItem_Click` at line 1334
  - Behavior: Approves morphological analysis for selected words
- WordListForm > Edit > Edit word morphology `[MS]`
  - Form: `WordListForm`
  - Handler: `editMorphologyToolStripMenuItem_Click` at line 1352
  - Behavior: Opens inline editing for word morphology
- WordListForm > Tools > Spell check by morphology `[MS]`
  - Form: `WordListForm`
  - Handler: `spellCheckByMorphologyToolStripMenuItem_Click` at line 1679
  - Behavior: Filters wordlist to show morphology-based spell check results

**HelpData Items**:
- ID: `f0c0c93b-75e1-4efc-ac22-fdf73a476a2b` - "What is morphology?"
- ID: `d9eb9e5e-ba6e-4ec8-9c09-2e4c98b13ead` - "How do I approve morphology of words?"

**Validation**: - [M] [MS] [H] [C] — Last verified: 2026-01-21

---
#### Cross-Reference Note: Feature 5.10 Removed

**Note**: This feature was previously documented as "Word Prefixes and Suffixes" but has been **removed** from this category.

**Reason for Removal**:
1. The documented UI entry point (`showPrefixSuffixToolStripMenuItem_Click` in WordListForm) **does not exist**
2. The actual "Word prefixes and suffixes" feature is in `BiblicalTermsForm`, not `WordListForm`
3. The Settings.WordPrefixes/WordSuffixes data is used **exclusively** by Biblical Terms for term rendering matching

**Two Separate Systems**:

| System | Data Source | Used By | Purpose |
|--------|-------------|---------|---------|
| **Biblical Terms** | `Settings.WordPrefixesList/WordSuffixesList` | `MorphologicalMatcher.cs` | Term rendering matching |
| **WordList Morphology** | `LexiconV2` + `WordAnalyses` | `ParatextLexicalAnalyser` | Morphological parsing |

**Cross-Reference**:
- See **04_Biblical_Terms.md** for the actual Word Prefixes and Suffixes feature
- Tools > Word prefixes and suffixes (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `wordPrefixesAndSuffixesStripMenuItem_Click`, line 1044

**Evidence** (from `ProjectSettings.cs` line 406):
> "WordPrefixes are used when matching in BiblicalTerms"

---

## Cross-References

**Related Categories**:
- **06 Checking Inventories**: Character analysis complements spelling analysis
- **14 Integration**: FLEx Integration (14.2) provides advanced lexical analysis and dictionary building for wordlist-to-lexicon workflows

**Dependencies**:
- Project text (content to analyze)
- Project spelling settings

---
## Validation Summary

| Feature | R | M | MS | FR | H | C | Last Verified |
|---------|---|---|----|----|---|---|---------------|
| 5.1 Wordlist Tool | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 5.2 Spell Checking | ✓ | ✓ | ✓ | - | ✓ | ✓ | 2026-01-21 |
| 5.3 Word Approval Status | - | ✓ | ✓ | - | ✓ | ✓ | 2026-01-21 |
| 5.4 Find Similar Words | - | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 5.5 Find Joined/Split | - | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 5.6 Hyphenation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 5.7 Spelling Notes | - | ✓ | ✓ | - | ✓ | ✓ | 2026-01-21 |
| 5.8 Spell Check Tools | - | ✓ | ✓ | - | ✓ | ✓ | 2026-01-21 |
| 5.9 Word Morphology | - | ✓ | ✓ | - | ✓ | ✓ | 2026-01-21 |
| 5.10 [REMOVED] | - | - | - | - | - | - | 2026-01-21 |

**Legend**: R=Requirements, M=Manual, MS=Menu Structure, FR=Form Relationships, H=HelpData, C=Code

---
## Verification Log

| Date | Action | By |
|------|--------|-----|
| 2026-01-15 | HelpData queries for wordlist, spelling (45+ items) | Claude |
| 2026-01-15 | Evidence chain tracing for WordListForm | Claude |
| 2026-01-15 | Updated to FEATURE_TEMPLATE_v2.md v5.0 | Claude |
| 2026-01-16 | Updated to AGENTS.md v6.4 compliance | Claude |
| 2026-01-16 | Added proper Manual citations with line numbers | Claude |
| 2026-01-16 | Added proper HelpData citations with IDs and Dialogs | Claude |
| 2026-01-16 | Updated to FEATURE_TEMPLATE_v2.md v5.2 | Claude |
| 2026-01-16 | Code access verified - built Evidence Chain with line numbers | Claude |
| 2026-01-16 | Traced Depth 0-2 dependencies from WordListForm.cs | Claude |
| 2026-01-21 | Session 1: Updated 5.1 Wordlist Tool with [MS] and [FR] sources | Claude |
| 2026-01-21 | Session 1: Updated 5.2 Spell Checking with [MS] source (TextForm handlers) | Claude |
| 2026-01-21 | Updated Validation Summary with MS/FR columns | Claude |
| 2026-01-21 | Session 2: Updated 5.3 Word Approval Status with [MS] source (6 handlers) | Claude |
| 2026-01-21 | Session 2: Updated 5.4 Find Similar Words with [MS] and [FR] sources | Claude |
| 2026-01-21 | Session 3: Updated 5.5 Find Joined/Split with [MS] and [FR] sources | Claude |
| 2026-01-21 | Session 3: Updated 5.6 Hyphenation with [MS] (6 handlers) and [FR] sources | Claude |
| 2026-01-21 | Session 4: Updated 5.7 Spelling Notes - verified MS handler exists | Claude |
| 2026-01-21 | Session 4: Updated 5.8 Spell Check Tools with [MS] (7 handlers) and Evidence Chain | Claude |
| 2026-01-21 | Session 5: Updated 5.9 Word Morphology with [MS] (4 handlers) | Claude |
| 2026-01-21 | Session 5: Removed 5.10 - fabricated handler; feature belongs to 04_Biblical_Terms.md | Claude |
| 2026-01-21 | Updated Validation Summary to reflect completed review | Claude |

---
## Notes

- WordList has dedicated directory (`Paratext/WordList/`) with multiple source files
- Spell checking functionality split between `Paratext/Checking/Spelling/` (UI/heuristics) and `ParatextData/Checking/Spelling/` (data layer)
- Multiple heuristic algorithms for spell checking: EditDistance, Diacritic, CaseConsistency, LetterNgram, Morphology, CorrectionRule
- Languages without spaces between words (Chinese, Thai) require special handling
- 45+ HelpData items indicate this is a major feature area
- FLEx integration for professional lexicography covered in Category 14
- Evidence Chain tables now include verified line numbers from source code
- `EditHyphenationForm` not found in codebase - may be embedded or named differently (`ProperNameHyphenationForm` exists)
- **5.10 Word Prefixes/Suffixes REMOVED**: The documented handler was fabricated; the actual feature is in BiblicalTermsForm (04_Biblical_Terms.md)
- WordList morphology uses `LexiconV2` + `ParatextLexicalAnalyser`, NOT Settings.WordPrefixes/Suffixes (which is for Biblical Terms only)

---

**Document Version**: 5.2  
**Template Version**: FEATURE_TEMPLATE_v2.md v6.1  
**Compliance**: AGENTS.md v7.2