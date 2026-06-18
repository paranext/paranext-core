# Paratext 9 - Exegetical Resources

**Category**: 03  
**Focus**: Source texts, commentaries, and reference resources  
**User Roles**: Translators, Consultants  
**Manual Chapters**: Various (resources referenced throughout)  
**Last Updated**: 2026-01-20

---

## Overview

Exegetical resources are the reference materials translators use to understand the meaning of the source text. Paratext provides access to thousands of Bible translations, source language texts, commentaries, and specialized resources like Enhanced Resources (Marble) with embedded links to dictionaries and encyclopedias.

---

## Feature List

### 3.1 Source Language Texts (Greek/Hebrew)

**Description**: Access to authoritative Greek New Testament and Hebrew Old Testament texts including UBS GNT, BHS, Byzantine text, and Septuagint.

**Sub-Features**:
- UBS Greek NT 5th/4th Edition
- Byzantine New Testament
- Biblia Hebraica Stuttgartensia (BHS)
- Open Scriptures Hebrew Bible
- Septuagint (LXX)
- Morphological tagging
- Source language search

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | N/A - accessed via generic `Paratext > Open` menu | - |
| Form Relationships | N/A - data resource, no dedicated form | - |
| Requirements | Section: "Exegetical Research" | `[R]` |
| HelpData | Keyword: `ComponentSourceLanguageTexts`; 40+ items | `[H]` |

**Key Quote** (from Requirements):
> "High quality source language texts available in Paratext include the UBS Greek New Testament 5th edition, Biblia Hebraica Stuttgartensia, the Septuagint, the Byzantine New Testament"

**Implementation**:

Source language texts are data resources, not code features. UI access is via standard resource opening through `SelectScrTextsForm`.

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | `openToolStripMenuItem_Click` handler, line 895 |
| 1 | `ParatextBase/CommonForms/SelectScrTextsForm.cs` | Instantiated in D0 | Line 906: `new SelectScrTextsForm(null, availableProjects...)` |

**UI Entry Points**:
- ≡ Paratext > Open (generic open dialog includes SLTs)
  - Menu Structure: `MainForm`, handler `openToolStripMenuItem_Click`, line 895
  - File: `Paratext/MainForm.cs`
- ≡ Paratext > Open Source Language
  - HelpData ID: `b38ec262-631e-4410-a4e1-4a8f5eee5491`
  - Question: "How do I open a Source Language Text?"

**HelpData Items**:
- ID: `5e988d85-6811-46b7-bbb0-595488654bbd` - "What is a Source Language Text?"
- ID: `b38ec262-631e-4410-a4e1-4a8f5eee5491` - "How do I open a Source Language Text?"
- ID: `e4566b94-4029-451d-a909-da657fe712c0` - "How do I get Hebrew or Greek text in Paratext?"

**Validation**: [MS] - [FR] - [R] [H] [C] — Last verified: 2026-01-20

---

### 3.2 Translated Bibles (DBL)

**Description**: Access to thousands of Bible translations in hundreds of languages from the Digital Bible Library.

**Sub-Features**:
- Browse available translations by language
- Download translations for offline use
- View read-only text alongside project
- Automatic updates when new versions available
- DBL licensing and permissions

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | `Paratext > Download/Install resources` → `installResourcesToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `MainForm` → `InstallResourcesForm` (line 785) | `[FR]` |
| Requirements | Section: "Exegetical Research" | `[R]` |
| HelpData | Keyword: `ComponentResources`; Dialog: `InstallResourcesForm` | `[H]` |

**Key Quote** (from Requirements):
> "The Digital Bible Library provides 3,927 text Bibles in 2,336 languages. These texts have been generously made available to registered Paratext users."

**Dialog Navigation**:
- `MainForm.cs` → `installResourcesToolStripMenuItem_Click` (line 997) → `InstallResources()` (line 785)
- Opens: `InstallResourcesForm` via `new InstallResourcesForm().ShowDialog()`

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | `installResourcesToolStripMenuItem_Click`, line 997 |
| 0 | `Paratext/FileMenu/InstallResourcesForm.cs` | Form Relationships | `InstallResourcesForm`, line 39 |
| 1 | `Paratext/MainForm.cs` | Handler code | Line 785: `using (InstallResourcesForm frm = new InstallResourcesForm())` |
| 1 | `ParatextData/Archiving` | Import in D0 | Line 25: `using Paratext.Data.Archiving` |

**UI Entry Points**:
- ≡ Paratext > Download/Install Resources
  - Menu Structure: `MainForm`, handler `installResourcesToolStripMenuItem_Click`, line 997
  - Form Relationships: Opens `InstallResourcesForm`, line 785
  - HelpData ID: `e01095ac-e488-4c4b-86f7-cf80e942e9b2`
  - Question: "How do I download and install a resource text?"

**HelpData Items**:
- ID: `e01095ac-e488-4c4b-86f7-cf80e942e9b2` - "How do I download and install a resource text?"
- ID: `112c9218-3602-43cb-97b9-d5e75a9778a4` - "What is a Resource?"
- ID: `b7a11d0a-a653-44b6-8dc9-491e5186c3d2` - "Where do I find copyright information for a Paratext resource?"
- Dialog: `InstallResourcesForm`

**Validation**: [MS] [FR] [R] [H] [C] — Last verified: 2026-01-20

---

### 3.3 Enhanced Resources (Marble)

**Description**: Interactive Bible translations with embedded links to dictionaries, images, maps, videos, and other reference materials.

**Sub-Features**:
- Linked dictionary entries
- Embedded images and maps
- Video links
- Encyclopedia articles
- Greek/Hebrew lexicon access
- Semantic domain exploration
- Link to Biblical Terms tool
- Show missing vs. found terms

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | N/A - accessed via generic `Paratext > Open` menu | - |
| Form Relationships | `MarbleForm` → `InstallResourcesForm` (lines 1392, 1450) | `[FR]` |
| Requirements | Section: "Exegetical Research" | `[R]` |
| HelpData | Keyword: `ComponentEnhancedResources`; 19 items | `[H]` |

**Key Quote** (from Requirements):
> "An Enhanced Resource is a Bible translation in a language of wider communication that has words or phrases linked to exegetical research materials of various types"

**Dialog Navigation**:
- Enhanced Resources are opened via `Paratext > Open` dialog (line 895) as part of available resources
- `MarbleForm` is used to display Enhanced Resources; inherits from `ParatextWindowWithMenus`
- `MarbleForm` can open `InstallResourcesForm` to download required resources (lines 1392, 1450)

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/Marble/MarbleForm.cs` | Form Relationships | `MarbleForm`, line 51, inherits `ParatextWindowWithMenus` |
| 1 | `Paratext/Marble/MarbleForm.cs` | FR: opensDialogs | Line 1392: `using (var form = new InstallResourcesForm())` |
| 1 | `Paratext/Marble/MarbleForm.cs` | FR: opensDialogs | Line 1450: `using (var form = new InstallResourcesForm())` |
| 1 | `Paratext/Marble/MarbleDataAccess.cs` | Same directory | Data access layer |
| 1 | `Paratext/Marble/MarbleDataParser.cs` | Same directory | Parsing logic |
| 1 | `Paratext/Marble/MarbleLexiconEntry.cs` | Same directory | Lexicon entry model |
| 1 | `Paratext/Marble/MarbleEncyclopediaEntry.cs` | Same directory | Encyclopedia model |
| 2 | `SubsystemInterfaces/IMarbleWindow.cs` | Interface | Window abstraction |
| 2 | `SubsystemInterfaces/IMarbleDataAccess.cs` | Interface | Data access abstraction |

**UI Entry Points**:
- ≡ Paratext > Open (generic open dialog includes Enhanced Resources)
  - Menu Structure: `MainForm`, handler `openToolStripMenuItem_Click`, line 895
  - Enhanced Resources appear in selection when `MarbleDataAccess.Default.HaveMarbleData` is true
- ≡ Paratext > Open > Enhanced Resource
  - HelpData ID: `a899ad8a-21f5-4d1d-a5c1-5e987071d56a`
  - Question: "How do I open an Enhanced Resource?"
- Click linked words to see definitions
  - HelpData ID: `c69fbdab-caed-4bf1-a4cd-250a83a3e4e4`
  - Question: "How do I use an Enhanced Resource?"

**HelpData Items**:
- ID: `f55dd23a-cf69-4461-9f6b-3eee0b48b83c` - "What is an Enhanced Resource?"
- ID: `c69fbdab-caed-4bf1-a4cd-250a83a3e4e4` - "How do I use an Enhanced Resource?"
- ID: `a899ad8a-21f5-4d1d-a5c1-5e987071d56a` - "How do I open an Enhanced Resource?"
- ID: `ced87a5d-b528-4ea7-a393-12b94ec042af` - "How do I research words in the original language?"

**Validation**: [MS] - [FR] [R] [H] [C] — Last verified: 2026-01-20

---

### 3.4 Source Language Dictionary

**Description**: Access Greek and Hebrew lexicons with definitions, glosses, and grammatical information.

**Sub-Features**:
- Word definitions and glosses
- Grammatical analysis
- Semantic domains
- Usage examples
- Filter by morphology

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | `Dictionary > Open Dictionary` → `menuFileNew_Click` | `[MS]` |
| Form Relationships | `SLTDictionaryForm` - no child dialogs | - |
| HelpData | Keyword: `ComponentSourceLanguageDictionary`; 6 items | `[H]` |

**Dialog Navigation**:
- `SLTDictionaryForm.cs` → `menuFileNew_Click` (line 1708) opens dictionary selection
- `SLTDictionaryForm` inherits from `ParatextWindowWithMenus` (line 30)
- Dictionary functionality also integrated with Enhanced Resources (Marble)

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/SourceLanguageTools/SLTDictionaryForm.cs` | Menu Structure | `menuFileNew_Click`, line 1708 |
| 0 | `Paratext/SourceLanguageTools/SLTDictionaryForm.cs` | Form Relationships | Line 30: `public partial class SLTDictionaryForm : ParatextWindowWithMenus` |
| 1 | `Paratext/Marble/MarbleLexiconEntry.cs` | Same namespace | Lexicon entry model |

**UI Entry Points**:
- ≡ Dictionary > Open Dictionary
  - Menu Structure: `SLTDictionaryForm`, handler `menuFileNew_Click`, line 1708
  - HelpData ID: `f8d4c4a9-9edd-4d2f-b97d-a143a7610833`
  - Question: "How do I open a Source Language Dictionary?"
- Click word in Enhanced Resource
  - HelpData Keyword: `ComponentSourceLanguageDictionary`
  - Integrated with Enhanced Resources

**HelpData Items**:
- ID: `da66048b-6297-43e5-895b-0926d26cbcfb` - "What is a Source Language Dictionary?"
- ID: `f8d4c4a9-9edd-4d2f-b97d-a143a7610833` - "How do I open a Source Language Dictionary?"
- ID: `9cdbcc2e-6f45-48b5-83b6-84c6558bb25f` - "How do I use the filter tab in a Source Language Dictionary?"

**Validation**: [MS] [FR] - [H] [C] — Last verified: 2026-01-20

---

### 3.5 Commentaries & Handbooks

**Description**: Access to Bible commentaries and translator's handbooks with verse-by-verse explanations and translation guidance.

**Sub-Features**:
- Verse-by-verse commentary display
- Translator's handbooks (UBS)
- Consultant notes
- Synchronize with current verse
- Search within commentaries

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | N/A - accessed via generic `Paratext > Open` menu | - |
| Form Relationships | N/A - data resources, no dedicated form | - |
| Requirements | Section: "Exegetical Research" | `[R]` |
| HelpData | Keyword: `ComponentResources` | `[H]` |

**Key Quote** (from Requirements):
> "Commentaries, Handbooks, and Consultant Notes are additional resources available to Paratext users...Handbooks are similar to a commentary in structure, but focused on issues that relate to the process of translating the passage"

**Dialog Navigation**:
- Commentaries and handbooks are data resources opened via `Paratext > Open` dialog (line 895)
- Displayed in standard `ParatextWindowWithMenus`-based windows
- No dedicated UI form; uses generic resource viewing infrastructure

**Implementation**:

Commentaries are data resources opened as standard Paratext windows. No dedicated UI code.

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | `openToolStripMenuItem_Click` handler, line 895 |
| 1 | `ParatextBase/CommonForms/SelectScrTextsForm.cs` | Instantiated in D0 | Shows available resources including commentaries |

**UI Entry Points**:
- ≡ Paratext > Open (generic open dialog includes commentaries/handbooks)
  - Menu Structure: `MainForm`, handler `openToolStripMenuItem_Click`, line 895
  - HelpData Keyword: `ComponentResources`
  - Commentaries and handbooks opened as standard resources

**Validation**: [MS] - [FR] - [R] [H] - — Last verified: 2026-01-20

---

### 3.6 Text Collection

**Description**: View multiple Bible translations side-by-side for easy comparison of how different translations handle the same passage.

**Sub-Features**:
- Multiple translations in one view
- Synchronized to same verse
- Add/remove translations
- Compact display mode
- Save collection configurations

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | `Paratext > Open text collection` → `openTCMenuItem_Click` | `[MS]` |
| Form Relationships | `TextCollectionForm` → `TextRangePrintForm` (line 410) | `[FR]` |
| HelpData | Keyword: `ComponentTextCollections`; 9 items | `[H]` |

**Dialog Navigation**:
- `MainForm.cs` → `openTCMenuItem_Click` (line 914) opens Text Collection
- `TextCollectionForm` inherits from `ParatextWindowWithMenus` (line 32)
- `Edit > Modify text collection` handler at `TextCollectionForm.cs`, line 499
- Opens `TextRangePrintForm` for printing (line 410)

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | `openTCMenuItem_Click`, line 914 |
| 0 | `Paratext/TextCollectionForm.cs` | Form Relationships | `TextCollectionForm`, line 32, inherits `ParatextWindowWithMenus` |
| 1 | `Paratext/TextCollectionForm.cs` | FR: opensDialogs | Line 410: `using (TextRangePrintForm frm = new TextRangePrintForm(...))` |
| 1 | `ParatextBase/TextCollection/TextCollectionControl.cs` | Control in D0 | Main text collection control |
| 2 | `ParatextBase/TextCollection/TextCollectionCss.css` | Same directory | Styling |
| 2 | `ParatextBase/TextCollection/TextCollectionForward.xslt` | Same directory | XSLT transform |

**UI Entry Points**:
- ≡ Paratext > Open text collection
  - Menu Structure: `MainForm`, handler `openTCMenuItem_Click`, line 914
  - HelpData ID: `2f8e8251-7e5c-40fe-ad8c-a8e9b3c88a07`
  - Question: "How do I open a Text Collection?"
- ≡ Edit > Modify text collection (within TextCollectionForm)
  - Menu Structure: `TextCollectionForm`, handler `modifyTextCollectionToolStripMenuItem_Click`, line 499
  - HelpData ID: `e532fe20-b4d6-4858-b1ef-3e38dcc61e2b`
  - Question: "How do I modify a Text Collection?"

**HelpData Items**:
- ID: `45d8ca1c-25ce-4e2c-a1c1-f5103fb341e9` - "What is a Text Collection?"
- ID: `2f8e8251-7e5c-40fe-ad8c-a8e9b3c88a07` - "How do I open a Text Collection?"
- ID: `76dcf362-e1a4-452a-a900-0768a85e8f61` - "How do I view other texts?"
- ID: `e532fe20-b4d6-4858-b1ef-3e38dcc61e2b` - "How do I modify a Text Collection?"

**Validation**: [MS] [FR] [H] [C] — Last verified: 2026-01-20

---

### 3.7 Resource Browser & Download

**Description**: Browse, search, and download available resources from the Digital Bible Library and other sources.

**Sub-Features**:
- Browse resources by language
- Search for specific resources
- Download selected resources
- View resource metadata
- Check for updates
- License acceptance workflow

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | `Paratext > Download/Install resources` → `installResourcesToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `MainForm` → `InstallResourcesForm` (line 785) | `[FR]` |
| Requirements | Section: "Exegetical Research" | `[R]` |
| HelpData | Keyword: `ComponentResources`; Dialog: `InstallResourcesForm` | `[H]` |

**Key Quote** (from Requirements):
> "The Paratext user interface makes it simple to browse resources in a given language, click and download to view those resources"

**Dialog Navigation**:
- `MainForm.cs` → `installResourcesToolStripMenuItem_Click` (line 997) → `InstallResources()` (line 785)
- Opens: `InstallResourcesForm` via `new InstallResourcesForm().ShowDialog()`
- Note: Same form as Feature 3.2 (Translated Bibles); this feature focuses on browse/download UX

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | `installResourcesToolStripMenuItem_Click`, line 997 |
| 0 | `Paratext/FileMenu/InstallResourcesForm.cs` | Form Relationships | `InstallResourcesForm`, line 39 |
| 1 | `Paratext/MainForm.cs` | Handler code | Line 785: `using (InstallResourcesForm frm = new InstallResourcesForm())` |
| 1 | `Paratext/FileMenu/InstallResourcesScheduleManager.cs` | Same directory | Download scheduling |
| 1 | `ParatextData/ProjectFileAccess` | Import in D0 | Project file access layer |

**UI Entry Points**:
- ≡ Paratext > Download/Install Resources
  - Menu Structure: `MainForm`, handler `installResourcesToolStripMenuItem_Click`, line 997
  - Form Relationships: Opens `InstallResourcesForm`, line 785
  - HelpData ID: `e01095ac-e488-4c4b-86f7-cf80e942e9b2`
  - Question: "How do I download and install a resource text?"
- ≡ Paratext > Check for updates
  - HelpData ID: `8574e4e0-e6ba-4149-92a8-368989f8ef82`
  - Question: "How do I update my existing Resource texts?"

**HelpData Items**:
- ID: `e01095ac-e488-4c4b-86f7-cf80e942e9b2` - "How do I download and install a resource text?"
- ID: `61a89719-3229-40f9-af48-76a6a3d36117` - "Why can't I find the resource I'm looking for?"
- ID: `8574e4e0-e6ba-4149-92a8-368989f8ef82` - "How do I update my existing Resource texts?"
- Dialog: `InstallResourcesForm`

**Validation**: [MS] [FR] [R] [H] [C] — Last verified: 2026-01-20

---

### 3.8 Logos Integration

**Description**: Connect to Logos Bible Software resources for additional reference materials.

**Sub-Features**:
- Access Logos resources from Paratext
- Synchronized scrolling with Logos
- Open Logos dictionaries and commentaries

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | `Paratext > Access Logos resources` → `accessLogosResourcesToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | N/A - external integration, no child forms | - |
| Requirements | Section: "Drafting Support > Navigation" | `[R]` |
| HelpData | Keyword: `ComponentLinksToLogos`; Dialog: `SelectResources` | `[H]` |

**Key Quote** (from Requirements):
> "This concept of synchronized scrolling goes beyond Paratext, and also includes Logos and Translator's Workplace"

**Dialog Navigation**:
- `MainForm.cs` → `accessLogosResourcesToolStripMenuItem_Click` (line 1083)
- Logos integration is via external communication (LOGOS-PARATEXT protocol)
- No dedicated Paratext form; opens external Logos application resources

**Implementation**:

Logos integration is via external communication, not dedicated code files.

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | `accessLogosResourcesToolStripMenuItem_Click`, line 1083 |

**UI Entry Points**:
- ≡ Paratext > Access Logos resources
  - Menu Structure: `MainForm`, handler `accessLogosResourcesToolStripMenuItem_Click`, line 1083
  - HelpData ID: `a274371d-7b39-4b63-a768-c945c4525ff2`
  - Question: "How do I add Logos resources?"

**HelpData Items**:
- ID: `a274371d-7b39-4b63-a768-c945c4525ff2` - "How do I add Logos resources so that I can access them from a Source text?"
- Dialog: `SelectResources`

**Validation**: [MS] [FR] - [R] [H] - — Last verified: 2026-01-20

---

## Cross-References

**Related Categories**:
- **13 Data Formats**: Resources use USFM/USX formats
- **15 Publishing & Output**: DBL is both source and destination for resources
- **16 Infrastructure**: Registration required for DBL access

**Dependencies**:
- Internet connection (for resource download)
- User registration (for DBL access)
- Sufficient disk space (for resource storage)

---

## Validation Summary

| Feature | MS | FR | R | H | C | Last Verified |
|---------|----|----|---|---|---|---------------|
| 3.1 Source Language Texts | - | - | ✓ | ✓ | - | 2026-01-20 |
| 3.2 Translated Bibles (DBL) | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 3.3 Enhanced Resources | - | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 3.4 Source Language Dictionary | ✓ | - | - | ✓ | ✓ | 2026-01-20 |
| 3.5 Commentaries & Handbooks | - | - | ✓ | ✓ | - | 2026-01-20 |
| 3.6 Text Collection | ✓ | ✓ | - | ✓ | ✓ | 2026-01-20 |
| 3.7 Resource Browser | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 3.8 Logos Integration | ✓ | - | ✓ | ✓ | - | 2026-01-20 |

---

## Verification Log

| Date | Action | By |
|------|--------|-----|
| 2026-01-15 | HelpData queries for resources, enhanced, text collection | Claude |
| 2026-01-15 | Evidence chain tracing for Marble, TextCollection, InstallResources | Claude |
| 2026-01-15 | Updated to FEATURE_TEMPLATE_v2.md v5.0 | Claude |
| 2026-01-16 | Updated all UI Entry Points to comply with AGENTS.md v6.4 Rule 18 | Claude |
| 2026-01-16 | Updated to FEATURE_TEMPLATE_v2.md v5.2 | Claude |
| 2026-01-20 | Queried Menu Structure and Form Relationships for all features | Claude |
| 2026-01-20 | Added MS/FR sources and Dialog Navigation to all features | Claude |
| 2026-01-20 | Updated Validation Summary with MS/FR columns | Claude |
| 2026-01-20 | Updated to FEATURE_TEMPLATE_v2.md v6.1, AGENTS.md v7.2 | Claude |

---

## Notes

- Enhanced Resources (Marble) has rich codebase under `Paratext/Marble/` directory
- Source language texts and commentaries are data resources, not code features
- Text Collection provides multi-resource comparison in a single view
- DBL integration handles both downloading resources and uploading completed projects

---

**Document Version**: 4.0  
**Template Version**: FEATURE_TEMPLATE_v2.md v6.1
