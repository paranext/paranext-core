# Paratext 9 - Integration

**Category**: 14
**Focus**: External tools, plugins, and extensibility
**User Roles**: All users, Developers
**Manual Chapters**: Various (tool-specific)
**Last Updated**: January 21, 2026

---

## Overview

Integration features connect Paratext to external tools and services. This includes the plugin system for extending functionality, integration with language tools like FLEx, connection to Bible software like Logos, and support for scripting and custom tools.

---

## Feature List

### 14.1 Plugin System

**Description**: Extensibility framework allowing third-party developers to add functionality to Paratext using the .NET Add-In Framework.

**Sub-Features**:
- Load/unload plugins via Plugin Manager
- Plugin API access for project data
- Menu/toolbar integration for plugins
- Window hosting for plugin UIs
- Plugin settings storage
- Legacy plugin support

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Paratext > Advanced > Plugins`; Handler: `pluginManagerToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | Opens: `PluginManagerForm` from `MainForm` | `[FR]` |
| HelpData | ID: `3ca93bef-8a3c-4253-ae49-0559546c1c8d`; Keyword: `ComponentPlugins` | `[H]` |
| Requirements | Section: "Integration With Other Tools > Extensibility" | `[R]` |

**Key Quote** (from Requirements):
> "Paratext should allow developers from anywhere to create customized additions that a user could run in their copy of Paratext"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `pluginManagerToolStripMenuItem_Click` at line 1120 |
| 1 | `Paratext/Plugins/PluginManagerForm.cs` | Instantiated in D0 | Line 1122: `new PluginManagerForm()` |
| 1 | `ParatextBase/Plugins/PluginManager.cs` | Import in D1 | Line 18: `PluginManager.Default?.InstalledPlugins` |
| 2 | `ParatextData/Plugins/PluginDataMergeKeysFile.cs` | Plugin data storage | Part of plugin data management |
| 2 | `PluginFramework/HostSideAdapters/` | Framework adapters | .NET Add-In adapters |

**Dialog Navigation**:
- `MainForm` → `PluginManagerForm` (line 1122)

**UI Entry Points**:
- Paratext > Advanced > Plugins
  - Menu Structure: `MainForm`, handler `pluginManagerToolStripMenuItem_Click`, line 1120
  - File: `Paratext/MainForm.cs`

**HelpData Items**:
- ID: `3ca93bef-8a3c-4253-ae49-0559546c1c8d` - "Can I install plugins in Paratext?"
- Keywords: `Full-Menus`, `ComponentPlugins`

**Validation**: [MS] [FR] [H] - [R] [C] — Last verified: 2026-01-21

---

### 14.2 FieldWorks (FLEx) Integration

**Description**: Integration with SIL's FieldWorks Language Explorer for advanced lexical analysis, dictionary building, and linguistic data exchange.

> **Cross-reference**: Referenced from **05 Spelling & Wordlist** for wordlist-to-lexicon workflows.

**Sub-Features**:
- Find word in dictionary (FLEx)
- Find related words (FLEx)
- Create lexeme entries
- View lexeme summaries
- Associate lexical project with Paratext project
- Morphological data exchange
- Import SLT TDB file (legacy Source Language Tools support)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Find in dictionary (FLEx)`; Handler: `findInDictionaryToolStripMenuItem_Click` | `[MS]` |
| Menu Structure | Menu: `Tools > Find related words (FLEx)`; Handler: `findRelatedWordsToolStripMenuItem_Click` | `[MS]` |
| Menu Structure | Menu: `Project > Advanced > Import SLT TDB file`; Handler: `importSLTTDBFileToolStripMenuItem_Click`; Line: 1545; Owner: `TextForm` | `[MS]` |
| Form Relationships | Opens: `FindLexemeForm`, `RelatedLexemesForm`, `ChooseLexicalProviderForm` | `[FR]` |
| HelpData | ID: `a979afec-ac2c-42a6-b134-e9d9d32690be`; Keyword: `ComponentFLExIntegration` | `[H]` |
| Requirements | Section: "Lexical Analysis" | `[R]` |

**Key Quote** (from Requirements):
> "Tools like Fieldworks Language Explorer (FLEx) are perfectly suited for capturing the richness and complex nuances of the world's languages"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `findInDictionaryToolStripMenuItem_Click` at line 1641 |
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `findRelatedWordsToolStripMenuItem_Click` at line 1646 |
| 0 | `Paratext/WordList/WordListForm.cs` | Menu Structure | handler at line 1751 (Find in dictionary) |
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `importSLTTDBFileToolStripMenuItem_Click` at line 1545 |
| 1 | `Paratext/Linguistics/FindLexemeForm.cs` | Invoked by D0 | Line 1643: `FindInDictionary.Run()` |
| 1 | `Paratext/Linguistics/RelatedLexemesForm.cs` | Invoked by D0 | Line 1648: `FindRelatedWords.Run()` |
| 2 | `Paratext/Linguistics/ChooseLexicalProviderForm.cs` | Form Relationships | Lexical provider selection |
| 2 | `Paratext.LexicalContracts/Lexeme.cs` | Import in D1 | Line 27: `Lexeme[] lexemes` |

**Dialog Navigation**:
- `TextForm` → `FindLexemeForm` (via FindInDictionary.Run)
- `TextForm` → `RelatedLexemesForm` (via FindRelatedWords.Run)
- `ProjectPropertiesForm` → `ChooseLexicalProviderForm` (line 5125)

**UI Entry Points**:
- Tools > Find in dictionary (FLEx)
  - Menu Structure: `TextForm`, handler `findInDictionaryToolStripMenuItem_Click`, line 1641
  - File: `Paratext/TextForm.cs`
- Tools > Find related words (FLEx)
  - Menu Structure: `TextForm`, handler `findRelatedWordsToolStripMenuItem_Click`, line 1646
  - File: `Paratext/TextForm.cs`
- Tools > Find in dictionary (FLEx) [WordListForm]
  - Menu Structure: `WordListForm`, handler `findInDictionaryToolStripMenuItem_Click`, line 1751
  - File: `Paratext/WordList/WordListForm.cs`
- Tools > Find related words (FLEx) [WordListForm]
  - Menu Structure: `WordListForm`, handler `findRelatedWordsToolStripMenuItem_Click`, line 1759
  - File: `Paratext/WordList/WordListForm.cs`
- ≡ Tab > Project > Advanced > Import SLT TDB file
  - Menu Structure: `TextForm`, handler `importSLTTDBFileToolStripMenuItem_Click`, line 1545
  - File: `Paratext/TextForm.cs`
  - Note: SLT (Source Language Tools) is a predecessor to FLEx; TDB files contain lexical/term data

**HelpData Items**:
- ID: `a979afec-ac2c-42a6-b134-e9d9d32690be` - "How do I find a word in the dictionary for a project?"
- ID: `8a359f50-f98c-4677-91c3-320762d7ccb6` - "What is FieldWorks Language Explorer?"
- ID: `665e21a9-5e87-495b-81e4-82cd4c7df5c2` - "How do I associate a lexical project with a Paratext project?"
- Dialogs: `FindLexemeForm`, `RelatedLexemesForm`, `ProjectPropertiesForm_tabAssoc`

**External Dependencies**:
- FieldWorks Language Explorer (FLEx)
- Source Language Tools (SLT) - legacy, TDB file format for lexical data import

**Validation**: [MS] [FR] [H] - [R] [C] — Last verified: 2026-01-21

---

### 14.3 Logos Bible Software

**Description**: Integration with Logos Bible Software for shared reference navigation, resource access, and synchronized scrolling.

**Sub-Features**:
- Access Logos resources from Paratext
- Synchronized scrolling with Logos
- Open resources in Logos
- Share reference position
- Support for Logos versions 3 and 4+

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Paratext > Access Logos resources`; Handler: `accessLogosResourcesToolStripMenuItem_Click` | `[MS]` |
| HelpData | ID: `3a61386e-643b-4176-b0a2-126a1c7bee1d`; Keyword: `ComponentLinksToLogos` | `[H]` |
| HelpData | ID: `a274371d-7b39-4b63-a768-c945c4525ff2`; Dialog: `SelectResources` | `[H]` |
| Requirements | Section: "Drafting Support > Navigation" | `[R]` |

**Key Quote** (from Requirements):
> "Paratext, plus these two tools [Logos and Translator's Workplace], are capable of sharing Scripture references and scrolling together"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `accessLogosResourcesToolStripMenuItem_Click` at line 1083 |
| 1 | `ParatextBase/LogosResources/LogosAccess.cs` | Import in D0 | Line 1085: `LogosAccess.SingleInstance` |
| 1 | `Paratext/SourceLanguageTools/LibronixForm.cs` | Instantiated in D0 | Line 1093: `new LibronixForm()` (for Logos 3) |
| 2 | `LogosSynch/Src/LibronixLinker/Logos4PositionHandler.cs` | Logos v4 integration | Position synchronization |

**UI Entry Points**:
- Paratext > Access Logos resources
  - Menu Structure: `MainForm`, handler `accessLogosResourcesToolStripMenuItem_Click`, line 1083
  - File: `Paratext/MainForm.cs`

**HelpData Items**:
- ID: `3a61386e-643b-4176-b0a2-126a1c7bee1d` - "How do I create a link to Logos resources?"
- ID: `a274371d-7b39-4b63-a768-c945c4525ff2` - "How do I add Logos resources so that I can access them from a Source text?"
- ID: `1334c7ef-0fc0-4f0b-8f5c-dd82e95e9fb2` - "Guide: Paratext > Access Logos resources"
- Keywords: `ComponentLinksToLogos`, `ComponentResources`, `ComponentSourceLanguageTexts`

**External Dependency**: Logos Bible Software

**Validation**: [MS] - [H] - [R] [C] — Last verified: 2026-01-21

---

### 14.4 Translator's Workplace

**Description**: Integration with Translator's Workplace for shared reference navigation and synchronized scrolling.

**Sub-Features**:
- Synchronized scrolling with TW
- Shared reference position
- Cross-tool navigation

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| HelpData | ID: `0806beed-401e-4e25-a6ca-ebbabf277a51`; Keyword: `ComponentSynchronizedScrolling` | `[H]` |
| Requirements | Section: "Drafting Support > Navigation" | `[R]` |

**Key Quote** (from Requirements):
> "Paratext, plus these two tools [Logos and Translator's Workplace], are capable of sharing Scripture references"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | [Synchronized scrolling infrastructure] | HelpData | Part of scrolling synchronization system |

**Not Found**:
- No dedicated menu item for Translator's Workplace in Menu Structure (search: "Translator's Workplace", "TW" - no matches)
- Integration may be through general synchronized scrolling options

**UI Entry Points**:
- Options > Synchronized Scrolling settings [Inferred]
  - HelpData ID: `0806beed-401e-4e25-a6ca-ebbabf277a51`

**HelpData Items**:
- ID: `0806beed-401e-4e25-a6ca-ebbabf277a51` - "How do I ensure that my project scrolls together with other programs?"
- Keywords: `ContentOptions`, `ContentScrolling`, `ComponentSynchronizedScrolling`

**External Dependency**: Translator's Workplace

**Validation**: - - [H] - [R] - — Last verified: 2026-01-21

---

### 14.5 AI Services (Slingshot, AQuA)

**Description**: Integration with AI-powered translation assistance and quality checking services. [External/Evolving]

**Sub-Features**:
- Project Slingshot connection [External]
- AQuA quality assessment [External]
- AI draft suggestions [External]
- Translation memory integration
- API connectivity

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Requirements | Section: "Integration With Other Tools > External Services" | `[R]` |

**Key Quote** (from Requirements):
> "Some of the most innovative services today for translation teams are AI tools like Project Slingshot and AQuA"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| - | [No code paths found] | - | AI services are external; no in-app handlers identified |

**Not Found**:
- No menu items found for AI Services, Slingshot, or AQuA in Menu Structure
- No HelpData entries found for Slingshot or AQuA (search: "Slingshot", "AQuA" - no matches)

**Notes**:
- AI services are evolving rapidly and may be implemented as external plugins or web services
- Integration may be through Scripture Forge or other external platforms
- Mark as [External] - requires external service configuration

**External Dependencies**: Project Slingshot, AQuA services

**Validation**: - - - - [R] - — Last verified: 2026-01-21

---

### 14.6 Web Browser (Embedded)

**Description**: Embedded web browser for displaying web content, help, and external service interfaces within Paratext.

**Sub-Features**:
- Display web content
- Navigate web pages
- Show help documentation
- External service UIs
- OAuth/authentication flows

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Code | CefSharp/Gecko embedded browser framework | `[C]` |

**Not Found**:
- No dedicated menu items for embedded browser in Menu Structure (search: "browser" - no matches)
- Web browser is an embedded component, not a standalone feature

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | [Embedded browser infrastructure] | Code inspection | CefSharp integration |

**Notes**:
- The embedded web browser is used internally by various features (Help, OAuth, web-based dialogs)
- Not exposed as a standalone user-facing feature
- Gecko debugging can be enabled via: `Paratext > Advanced > Diagnostics > Enable remote Gecko debugging`

**Validation**: - - - - - [C] — Last verified: 2026-01-21

---

### 14.7 Command Line Interface

**Description**: Command-line utilities for automation, batch operations, and scripting Paratext operations.

**Sub-Features**:
- Batch operations
- Scripted workflows
- CI/CD integration
- Automated exports
- PTLive dedicated server mode

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| HelpData | ID: `c5a959c1-c621-486e-a530-2e3abb6be714`; Keyword: `ComponentPTLive` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/PTLive/PTLiveDedicatedServerForm.cs` | HelpData reference | PTLive dedicated server mode |

**Not Found**:
- No general command-line interface documented in Menu Structure
- CLI functionality appears limited to PTLive server mode

**UI Entry Points**:
- Command prompt / terminal (external)
- PTLive dedicated server mode
  - HelpData ID: `c5a959c1-c621-486e-a530-2e3abb6be714`

**HelpData Items**:
- ID: `c5a959c1-c621-486e-a530-2e3abb6be714` - "How do I start a local dedicated Paratext Live server?"
- Keywords: `ContentParatextLive`, `PTLive`, `ComponentPTLive`

**Notes**:
- Command-line functionality is primarily for PTLive server operations
- General CLI operations for project manipulation are not documented in HelpData

**Validation**: - - [H] - - [C] — Last verified: 2026-01-21

---

### 14.8 Custom Tools & Python Scripting

**Description**: The Custom tools system (formerly "Paratext 6 Checks") uses CMS (Custom Management System) files to define Python-based tools that can be invoked from the Tools > Custom tools menu. This provides a framework for running custom automation, validation checks, and data processing scripts against project data.

> **Cross-reference**: Referenced from **09 Advanced Checking Tools** for custom validation checks.

**Sub-Features**:

*Custom Tools Submenu (Tools > Custom tools):*
- Dynamically populated from .cms files in the `My Paratext Projects/cms` directory
- Organized into submenus: Admin, Publishing, Unsupported, Chinese, ICAP
- Tools can read project data, run validation, or modify text
- Tools marked "[CAN CHANGE TEXT]" can write to projects

*Python Scripting API:*
- Execute Python scripts against project data
- Access project data via ScriptureObjects module (ScriptureText, Reference classes)
- Custom check development with configurable parameters
- Results integrated into check results list or displayed as HTML/text output

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Custom tools` (TextForm, no handler - dynamically populated) | `[MS]` |
| Form Relationships | Opens: `PythonChecksForm` from `TextForm` | `[FR]` |
| Code | `Paratext/ToolsMenu/CMSManager.cs` - builds menu from .cms files | `[C]` |
| Code | `My Paratext Projects/cms/*.cms` - tool definition files | `[C]` |
| HelpData | ID: `ebb55991-710a-49a5-82a6-9516b55a1555`; Keyword: `ComponentPythonScripts` | `[H]` |

**Key Quote** (from HelpData):
> "How can I write a Python script to access Paratext data?"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/ToolsMenu/CMSManager.cs` | Code | `BuildMenu()` at line 46 - populates Custom tools menu |
| 0 | `Paratext/ToolsMenu/PythonChecksForm.cs` | Form Relationships | Executes Python scripts via IronPython |
| 1 | `Paratext/ToolsMenu/CMSItem.cs` | Used by CMSManager | Tool definition class parsed from .cms files |
| 1 | `Paratext/TextForm.cs` | Opens PythonChecksForm | Via Custom tools menu selection |
| 2 | `ParatextData/ScrText.cs` | Field in D1 | Project data access for scripts |

---

#### Custom Tools System (CMS) Architecture

The **Custom tools** menu is populated dynamically by `CMSManager.cs` from `.cms` files located in the `My Paratext Projects/cms` directory. Each `.cms` file defines a tool that runs a Python script against project data.

**Menu Building Logic** (CMSManager.cs lines 46-76):

```
1. Scan cms directory for *.cms files
2. Exclude files starting with "\check DELETED"
3. For each tool, apply filters:
   - Exclude if \wordlist is present (integrated into Biblical Terms)
   - Exclude if \programToRun is not "python" (or empty)
   - Exclude if \outputProject and user lacks modify permissions
4. Group tools by \submenu value
5. Sort by \rank within each submenu
```

---

#### CMS File Format

CMS files use a backslash-prefixed marker format. Required and optional parameters:

| Parameter | Required | Description |
|-----------|----------|-------------|
| `\check` | Yes | Tool name displayed in menu. Append "[CAN CHANGE TEXT]" for text-modifying tools. |
| `\submenu` | Yes | Submenu category (e.g., Publishing, Unsupported, Admin) |
| `\script` | Yes | Python script filename to execute |
| `\description` | No | Tooltip description shown in yellow box |
| `\books` | No | Prompt user to select which books to process |
| `\outputProject` | No | Prompt user for output project (enables text modification) |
| `\toList` | No | Display results in List window (format: "GEN 3:11\t\tMessage") |
| `\toHtml` | No | Display results in default web browser |
| `\toText` | No | Display results in default text editor |
| `\parameter1` | No | First user input parameter (passed as `Parameter1`) |
| `\parameter2` | No | Second user input parameter (passed as `Parameter2`) |
| `\helpFile` | No | RTF help file name (must be in cms directory) |
| `\rank` | No | Sort order within submenu (default: 99, lower = earlier) |
| `\wordlist` | No | Hides tool from menu (used for Biblical Terms integration) |
| `\programToRun` | No | Execution engine (only "python" tools appear in menu) |
| `\encoding` | No | File encoding: 65001 (UTF-8) or 1252 (Windows-1252) |

**Example CMS File** (Replace.cms):
```
\check Replace  [CAN CHANGE TEXT]
\submenu Unsupported
\script Replace.py
\description Replace all occurrences of the specified regular expression(s).
\books
\outputProject
\utf8
```

**Variables Passed to Python Scripts**:

| Variable | Description |
|----------|-------------|
| `Project` | Input project name selected by user |
| `OutputProject` | Output project name (only if `\outputProject` present) |
| `Books` | String of 1's and 0's indicating selected books (first char = GEN) |
| `Parameter1` | Value from first parameter field |
| `Parameter2` | Value from second parameter field |
| `Language` | Language identifier of input project |
| `SettingsDirectory` | Full path to My Paratext Projects folder |

---

#### Visible Custom Tools (32 tools across 5 submenus)

**Unsupported (19 tools)** - Legacy tools maintained for backward compatibility:

| Tool Name | Script | CAN CHANGE TEXT |
|-----------|--------|-----------------|
| Compare punctuation | comparePunctuation.py | No |
| Paragraph ending punctuation | paragraphEndingPunctuation.py | No |
| Find long section headings | FindLongSectionHeadings.py | No |
| Reformat Word Scripture Template output to USFM | ReformatWST.py | **Yes** |
| Extract expression | ExtractExpression.py | No |
| Replace expression | ReplaceExpression.py | **Yes** |
| Replace | Replace.py | **Yes** |
| Find expression | FindExpression.py | No |
| Count expression | CountExpression.py | No |
| Sample check | SampleCheck.py | No |
| Show style tree | StyleTree.py | No |
| Convert SFM Africa region markup to USFM | ConvertAFR.py | **Yes** |
| Sample script | SampleScript.py | **Yes** |
| Count control characters | CountControlCharacters.py | No |
| Create custom stylesheet | createCustomStylesheet.py | No |
| Update P5 stylesheet | UpdateStylesheet.py | No |
| Validate figure location | validateFigureLocation.py | No |
| Validate figure syntax | validateFigureSyntax.py | No |
| Extract expression verse | extractExpressionVerse.py | No |

**Publishing (10 tools)** - Publishing and export utilities:

| Tool Name | Script | CAN CHANGE TEXT |
|-----------|--------|-----------------|
| Cleanup | cleanup.py | **Yes** |
| Mark Dravidian hyphenatedWords.txt | MarkDravidianHyphenatedWords.py | No |
| Insert footnote references | insertFootnoteReferences.py | **Yes** |
| Convert USFM to OSIS (Best Practice) | OsisBPConverter.py | No |
| Renumber notes | RenumberNotes.py | **Yes** |
| Export to Ventura 8/10 markup | ExportVenturaTagged.py | No |
| Compare Thai projects | compareThaiProjects.py | No |
| Convert to TheWord format | TheWordConv.py | No |
| Convert straight quotes | ConvertStraightQuotes.py | **Yes** |
| Validate figure files | ValidateFigs.py | No |

**Admin (1 tool)** - Project administration:

| Tool Name | Script | CAN CHANGE TEXT |
|-----------|--------|-----------------|
| Show Project Plan Html | ProjectPlanHtml.py | No |

> **Cross-reference**: See **11.5 Progress Reports** for project plan functionality.

**Chinese (1 tool)** - Chinese language-specific:

| Tool Name | Script | CAN CHANGE TEXT |
|-----------|--------|-----------------|
| Check for extra spaces | ChineseExtraSpacesCheck.py | No |

**ICAP (1 tool)** - Institute for Computer Assisted Publishing:

| Tool Name | Script | CAN CHANGE TEXT |
|-----------|--------|-----------------|
| Move titles (before|after) \c | ICAPfixsc.py | **Yes** |

---

#### Hidden/Excluded Tools

**Tools marked DELETED (16)** - First line contains `\check DELETED`:
- capitalization, BasicPunctuation, CheckReferences, compareMarkers, compareProjects
- InsertCrossReferencesOrNotes, matchedPairs, RepeatedWords, markers, NumberCheck
- quotes, countSFMs, CV, unusualPunctuation, ValidateCharacters, wordBoundaries

**Tools with \wordlist (7)** - Integrated into Biblical Terms tool:
- wordlistAlmostAlwaysCapitalized, wordlistIgnoreDiacritics, wordlistMissingSpaces
- wordlistSoundAlike, wordlistSpellingTool, wordlistTranspositions, wordlistUnusualLetterCombinations

**Tools with non-Python programToRun (5)** - Use CC or Checklists engine:
- CC_Repeated_Words (cc), CC_Valid_Verse_Marker (cc), CC_Verse_Space_Digit (cc)
- CharacterInventory (Checklists), DiacriticsInventory (Checklists)

---

#### Dialog Navigation
- `TextForm` → `PythonChecksForm` (via Custom tools menu selection)

**UI Entry Points**:
- Tools > Custom tools > [Submenu] > [Tool]
  - Menu Structure: `TextForm`, dynamically built by `CMSManager.BuildMenu()`
  - Files: `Paratext/ToolsMenu/CMSManager.cs`, `My Paratext Projects/cms/*.cms`
- Click down arrow at bottom of main menu to show advanced commands

**HelpData Items**:
- ID: `ebb55991-710a-49a5-82a6-9516b55a1555` - "How can I write a Python script to access Paratext data?"
- Keywords: `ComponentPythonScripts`

**Related Features**:
- **08 Checklists**: Legacy Paratext 6 checklists available via Tools > Custom tools > Unsupported
- **09 Advanced Checking Tools**: Custom validation checks can be created as Python scripts
- **11.5 Progress Reports**: Admin > Show Project Plan Html provides HTML view of project plan
- **14.9 RegEx Pal**: Regex testing tool for pattern development

**Validation**: [MS] [FR] [H] - - [C] — Last verified: 2026-01-21

---

### 14.9 RegEx Pal

**Description**: Interactive regular expression testing tool for developing and debugging regex patterns against project text. Provides a sandbox environment for testing search and replace patterns before applying them to actual project data.

**Sub-Features**:
- Interactive regex pattern testing
- Real-time match highlighting
- Pattern insertion helpers (character classes, repetition, USFM markers)
- Test against active project text
- Support for .NET regex syntax
- Case sensitivity and multiline options

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Paratext > Advanced > RegEx Pal`; Handler: `regexPalToolStripMenuItem_Click`; Line: 1132; Owner: `MainForm` | `[MS]` |
| Menu Structure | Menu: `Project > Advanced > RegEx Pal`; Handler: `regExPalToolStripMenuItem_Click`; Line: 1139; Owner: `ParatextWindowWithMenus` | `[MS]` |
| HelpData | ID: `9dc36a68-fcc6-4705-9b76-89865c08592f`; Keyword: `ComponentRegExPal` | `[H]` |
| HelpData | ID: `a5481fdb-8e6f-4d98-908b-25f006ad90e9`; Keyword: `ComponentRegularExpressions` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `regexPalToolStripMenuItem_Click` at line 1132 |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `regExPalToolStripMenuItem_Click` at line 1139 |
| 1 | `Paratext/RegExPal/RegExPalForm.cs` | Invoked by D0 | Line 1134: `RegexPalForm.Display(ActiveScriptureText)` |
| 1 | `Paratext/RegExPal/RegExMatchingEngine.cs` | Field in D1 | Line 77: `RegExMatchingEngine _engine` |
| 2 | `Paratext/RegExPal/Match.cs` | Used by D1 | Match result class |
| 2 | `Paratext/RegExPal/Options.cs` | Form in D1 | RegEx options form |

**Dialog Navigation**:
- `MainForm` → `RegExPalForm` (line 1134)
- `ParatextWindowWithMenus` → `RegExPalForm` (line 1141)

**UI Entry Points**:
- Paratext > Advanced > RegEx Pal
  - Menu Structure: `MainForm`, handler `regexPalToolStripMenuItem_Click`, line 1132
  - File: `Paratext/MainForm.cs`
- ≡ Tab > Project > Advanced > RegEx Pal
  - Menu Structure: `ParatextWindowWithMenus`, handler `regExPalToolStripMenuItem_Click`, line 1139
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`

**RegExPalForm Menus** (ownerForm: RegExPalForm):
- Insert > Any Character, Backslash, End of Line, Range of Characters, Alternatives
- Insert > Repetition > Optional, Zero or More, One or More (with greedy/non-greedy variants)
- Insert > Character Classes > Word Forming, Digit, Whitespace, Word Boundary (with negations)
- Insert > Environments > Followed By, Preceded By (with negations)
- Insert > USFM > Standard Format Marker, Footnote, Cross Reference, Section Heading
- Insert > Options > Case Insensitive, Dot Matches Newline

**HelpData Items**:
- ID: `9dc36a68-fcc6-4705-9b76-89865c08592f` - "Useful Regular Expressions"
- ID: `40de251d-91a2-422a-942a-244cf9411f1c` - "Can I make changes in bulk to my project text once I have entered it?"
- ID: `a5481fdb-8e6f-4d98-908b-25f006ad90e9` - "Can regular expressions be used in Paratext?"
- Dialogs: `FindReplaceForm_tabBasic`
- Keywords: `ComponentRegExPal`, `ComponentRegularExpressions`, `ContentFindMenu`

**Related Features**:
- **01.7 Find and Replace**: Uses regex patterns developed in RegEx Pal
- **09 Advanced Checking Tools**: Custom checks may use regex patterns

**Validation**: [MS] - [H] - - [C] — Last verified: 2026-01-21

---

## Cross-References

**Related Categories**:
- **05 Spelling & Wordlist**: FLEx integration for lexicon
- **09 Advanced Checking Tools**: Python checks
- **08 Checklists**: Custom Tools extend checklist capabilities
- **16 Infrastructure**: Python scripting infrastructure

**Dependencies**:
- External applications (Logos, FLEx, etc.)
- Network connectivity (for cloud services)
- Python runtime (for scripting)

---

## Validation Summary

| Feature | MS | FR | H | M | R | C | Last Verified |
|---------|----|----|---|---|---|---|---------------|
| 14.1 Plugin System | + | + | + | - | + | + | 2026-01-21 |
| 14.2 FLEx Integration | + | + | + | - | + | + | 2026-01-21 |
| 14.3 Logos Integration | + | - | + | - | + | + | 2026-01-21 |
| 14.4 Translator's Workplace | - | - | + | - | + | - | 2026-01-21 |
| 14.5 AI Services | - | - | - | - | + | - | 2026-01-21 |
| 14.6 Web Browser | - | - | - | - | - | + | 2026-01-21 |
| 14.7 Command Line | - | - | + | - | - | + | 2026-01-21 |
| 14.8 Custom Tools & Python Scripting | + | + | + | - | - | + | 2026-01-21 |
| 14.9 RegEx Pal | + | - | + | - | - | + | 2026-01-21 |

---

## Verification Log

| Date | Action | By |
|------|--------|-----|
| 2026-01-21 | Menu Structure verification complete | Claude |
| 2026-01-21 | HelpData verification complete | Claude |
| 2026-01-21 | Evidence chain tracing complete | Claude |
| 2026-01-21 | Form Relationships verification complete | Claude |
| 2026-01-21 | CMS system analysis: 60 .cms files analyzed, 32 visible tools documented | Claude |
| 2026-01-21 | Merged 14.7 Python Scripting into 14.8 Custom Tools; renumbered 14.8→14.7, 14.9→14.8, 14.10→14.9 | Claude |

---

## Notes

- Plugin system uses .NET Add-In Framework
- AI services are evolving rapidly and may not have stable UI entry points
- External tool integration depends on installed software
- FLEx integration covers lexical workflows also relevant to Category 05 (Spelling & Wordlist)
- Custom Tools & Python Scripting covers custom checks also relevant to Category 09 (Advanced Checking Tools)
- Translator's Workplace integration is via synchronized scrolling, not dedicated menu
- RegEx Pal is accessible from both MainForm and ParatextWindowWithMenus (different handlers)
- CMS (Custom Management System) files define Python-based tools in `My Paratext Projects/cms/`
- CMSManager.cs dynamically builds the Tools > Custom tools menu from .cms files
- Tools marked `\check DELETED` on line 1 are excluded from the menu
- Tools with `\wordlist` are hidden (integrated into Biblical Terms tool)
- Only Python-based tools (`\programToRun python` or no programToRun) appear in menu
- Tools with `\outputProject` can modify project text and show "[CAN CHANGE TEXT]" in menu

---

**Document Version**: 2.4
**Based on v1**: 07_Integration_Features.md
**Methodology**: AGENTS.md v7.2

**Change Log**:
- v2.4: Merged 14.7 Python Scripting into 14.8 Custom Tools & Python Scripting; renumbered features (14.8→14.7 Command Line, 14.9→14.8 Custom Tools, 14.10→14.9 RegEx Pal); total features now 9
- v2.3: Separated RegEx Pal as new feature 14.10; updated 14.9 to focus on Custom Tools
- v2.2: Expanded 14.9 with comprehensive CMS (Custom Management System) documentation including file format, all 32 visible tools, filtering logic, and hidden tool categories
- v2.1: Added SLT TDB import to 14.2 FLEx Integration
