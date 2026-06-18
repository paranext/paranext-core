# Paratext 9 - Master Feature Index (v2)

**Version**: 3.8
**Date**: January 22, 2026
**Total Features**: 152 features across 16 categories
**Methodology**: Six-source validation (MS, FR, R, M, H, C)

---

## Source Key

| Code | Source | Description |
|:----:|--------|-------------|
| **MS** | Menu Structure | Verified in `menu_structure_20260120_134726.json` - feature accessible via application menus |
| **FR** | Form Relationships | Verified in `form_relationships_20260120_134725.json` - UI forms and dialog relationships |
| **R** | Requirements | Documented in `BT Drafting Tool Requirements v2.docx` - original requirements specification |
| **M** | Manual | Documented in Paratext User Manual (markdown) - user-facing documentation |
| **H** | HelpData | Verified in `HelpData.xml` (6,565 help items) - context-sensitive help system |
| **C** | Code | Verified in Paratext source code - implementation confirmed |

**Validation Levels**:
- 6 sources = Fully validated (MS FR R M H C)
- 5 sources = Highly validated
- 4 sources = Well validated
- 3 sources = Adequately validated
- 1-2 sources = Partially validated (may need additional verification)

---

## Quick Navigation

- [Category Overview](#category-overview)
- [Alphabetical Index](#alphabetical-index)

---

## Category Overview

### 01. Translation Workspace
**Focus**: Core text editing, navigation, and window management
**File**: `01_Translation_Workspace.md`

| # | Feature | Sources |
|---|---------|---------|
| 1.1 | Text Editor | MS FR R M H C |
| 1.2 | Editor Views | MS M H C |
| 1.3 | BCV Navigation | M H C |
| 1.4 | Synchronized Scrolling | M H C |
| 1.5 | Scroll Groups | M H C |
| 1.6 | Window Docking & Layouts | MS FR R M H C |
| 1.7 | Find and Replace | MS FR R M H C |
| 1.8 | Quick Reference Window | MS H C |
| 1.9 | Insert Figure/Illustration | MS M H C |
| 1.10 | Insert Table | MS C |
| 1.11 | Insert Footnotes & Endnotes | MS M H C |
| 1.12 | Cross-Reference Tools | MS M H C |
| 1.13 | Insert Verse Numbers | MS C |
| 1.14 | Insert Project Notes | MS C |
| 1.15 | Autocorrect | MS C |
| 1.16 | Text Normalization Utilities | MS |
| 1.17 | Editor Real-time Validation | MS M H C |

---

### 02. Language & Writing System
**Focus**: Keyboards, fonts, locale data, Unicode
**File**: `02_Language_Writing_System.md`

| # | Feature | Sources |
|---|---------|---------|
| 2.1 | Keyboard Switching | MS FR R M H C |
| 2.2 | Keyman Integration | M H C |
| 2.3 | Font Management (OpenType/Graphite) | MS FR R M H C |
| 2.4 | Locale Data (LDML) | MS C |
| 2.5 | Unicode Normalization (NFD/NFC) | C |
| 2.6 | Valid Characters Configuration | MS H C |
| 2.7 | Right-to-Left Support | M H |
| 2.8 | Ruby Glossing (Furigana) | H |
| 2.9 | Encoding Converter | FR H |
| 2.10 | Vertical Script Support | C |

---

### 03. Exegetical Resources
**Focus**: Source texts, commentaries, resource management
**File**: `03_Exegetical_Resources.md`

| # | Feature | Sources |
|---|---------|---------|
| 3.1 | Source Language Texts (Greek/Hebrew) | MS H C |
| 3.2 | Translated Bibles (DBL) | MS FR R H C |
| 3.3 | Enhanced Resources (Marble) | MS R H C |
| 3.4 | Source Language Dictionary | MS FR C |
| 3.5 | Commentaries & Handbooks | MS H |
| 3.6 | Text Collection | MS FR H C |
| 3.7 | Resource Browser & Download | MS FR R H C |
| 3.8 | Logos Integration | MS FR H |

---

### 04. Biblical Terms
**Focus**: Key term consistency and rendering
**File**: `04_Biblical_Terms.md`

| # | Feature | Sources |
|---|---------|---------|
| 4.1 | Biblical Terms Tool | MS FR R M H C |
| 4.2 | Term Renderings | MS FR R M H C |
| 4.3 | Guessed Renderings | MS FR R M H C |
| 4.4 | Biblical Terms Lists | MS FR M H C |
| 4.5 | Term Categories & Filters | MS FR M H C |
| 4.6 | Glossary Integration | MS M H C |
| 4.7 | Biblical Terms Notes | MS FR M H C |
| 4.8 | Adapt Names | MS H |
| 4.9 | Word Prefixes and Suffixes | MS H C |

---

### 05. Spelling & Wordlist
**Focus**: Spell checking and word analysis
**File**: `05_Spelling_Wordlist.md`

| # | Feature | Sources |
|---|---------|---------|
| 5.1 | Wordlist Tool | MS FR R M H C |
| 5.2 | Spell Checking | MS R M H C |
| 5.3 | Word Approval Status | MS H C |
| 5.4 | Find Similar Words | MS FR H C |
| 5.5 | Find Incorrectly Joined/Split Words | MS FR H C |
| 5.6 | Hyphenation | MS FR R M H C |
| 5.7 | Spelling Discussion Notes | MS H C |
| 5.8 | Wordlist Spell Check Tools | MS H C |
| 5.9 | Word Morphology | MS H C |

---

### 06. Checking Inventories
**Focus**: Inventory tools that analyze and categorize text elements
**File**: `06_Checking_Inventories.md`

| # | Feature | Sources |
|---|---------|---------|
| 6.1 | Character Inventory | MS R M H C |
| 6.2 | Punctuation Inventory | MS R M H C |
| 6.3 | Marker Inventory | MS R M H C |
| 6.4 | Matched Pairs Inventory | MS R M H C |
| 6.5 | Repeated Words Inventory | MS H C |
| 6.6 | Markers Followed by Lowercase Inventory | MS H C |
| 6.7 | Markers Missing Final Punctuation Inventory | MS C |
| 6.8 | Punctuation Followed by Lowercase Inventory | MS H C |
| 6.9 | Mixed Capitalization Inventory | MS R M H C |

---

### 07. Automated Checks
**Focus**: Automated validation checks that find errors based on rules
**File**: `07_Automated_Checks.md`

| # | Feature | Sources |
|---|---------|---------|
| 7.1 | Capitalization Check | MS FR R M H C |
| 7.2 | Quotation Check | MS FR R M H C |
| 7.3 | Numbers Check | MS FR M H C |
| 7.4 | References Check | MS FR R M H C |
| 7.5 | Chapter/Verse Check | MS FR M H C |
| 7.6 | Markers Check | MS FR M H C |
| 7.7 | Run Basic Checks | MS FR M H C |
| 7.8 | Footnote Quotes Check | MS FR M H C |

---

### 08. Checklists
**Focus**: Manual review lists for systematic text examination
**File**: `08_Checklists.md`

| # | Feature | Sources |
|---|---------|---------|
| 8.1 | Verse Text Checklist | MS M H C |
| 8.2 | Word or Phrase Checklist | MS M H C |
| 8.3 | Section Headings Checklist | MS M H C |
| 8.4 | Book Titles Checklist | MS M H C |
| 8.5 | References Checklist | MS M H C |
| 8.6 | Footnotes Checklist | MS M H C |
| 8.7 | Markers Checklist | MS M H C |
| 8.8 | Quotation Marks Checklist | MS M H C |
| 8.9 | Punctuation Checklist | MS M H C |
| 8.10 | Relatively Long Verses Checklist | MS M H C |
| 8.11 | Relatively Short Verses Checklist | MS M H C |
| 8.12 | Long Sentences Checklist | MS M H C |
| 8.13 | Long Paragraphs Checklist | MS M H C |

---

### 09. Advanced Checking Tools
**Focus**: Alignment, comparison, and consultant tools
**File**: `09_Advanced_Checking_Tools.md`

| # | Feature | Sources |
|---|---------|---------|
| 9.1 | Interlinear Tool | MS FR R M H C |
| 9.2 | Parallel Passages Tool | MS FR R M H C |
| 9.3 | Compare Text Tool | MS FR M H C |
| 9.4 | Compare Word/Phrase | MS FR M H C |
| 9.5 | Guess Translations | MS FR H C |
| 9.6 | Concordance/Names Index Builder | MS FR H C |

---

### 10. Collaboration & Synchronization
**Focus**: Team collaboration and data sharing
**File**: `10_Collaboration_Sync.md`

| # | Feature | Sources |
|---|---------|---------|
| 10.1 | Send/Receive | MS FR R M H C |
| 10.2 | Automatic Send/Receive | FR M H C |
| 10.3 | Paratext Live (Real-time Collaboration) | MS FR R M H C |
| 10.4 | Project Notes | MS FR R M H C |
| 10.5 | Consultant Notes | MS R H C |
| 10.6 | Project History (Version Control) | MS FR R M H C |
| 10.7 | Merge Conflict Resolution | MS FR R M H C |

---

### 11. Project Planning
**Focus**: Assignments, progress tracking, and plans
**File**: `11_Project_Planning.md`

| # | Feature | Sources |
|---|---------|---------|
| 11.1 | Assignments and Progress | MS R M H C |
| 11.2 | Project Plans | MS FR R M H C |
| 11.3 | Task Assignment | MS R M H C |
| 11.4 | Progress Tracking | MS R M H C |
| 11.5 | Progress Reports | MS R M H |
| 11.6 | User Permissions | MS FR R M H C |
| 11.7 | Bulk Progress Mode | MS |
| 11.8 | Copy Assignments | MS FR H |
| 11.9 | Translation Priorities | MS H |

---

### 12. Back Translation & Adaptation
**Focus**: Derived translations and back translations
**File**: `12_Back_Translation.md`

| # | Feature | Sources |
|---|---------|---------|
| 12.1 | Free Back Translation | FR R M H C |
| 12.2 | Interlinear Back Translation | MS FR R M H C |
| 12.3 | Adaptation Projects | MS FR R H C |
| 12.4 | Daughter Translations | FR R H C |
| 12.5 | Study Bible Authoring | MS FR M H C |

---

### 13. Data Formats
**Focus**: File formats and data structures
**File**: `13_Data_Formats.md`

| # | Feature | Sources |
|---|---------|---------|
| 13.1 | USFM Support | MS R M H C |
| 13.2 | USX (XML) Export/Import | MS FR R H C |
| 13.3 | Scripture Burrito | MS R C |
| 13.4 | Project Structure | MS R H C |
| 13.5 | Versification | MS R H C |
| 13.6 | Import from Other Formats | MS FR M H C |
| 13.7 | Stylesheet System | MS R H |
| 13.8 | Manage Books | MS C |
| 13.9 | Project Backup and Restore | MS M H C |
| 13.10 | Project Conversion | MS FR H C |

---

### 14. Integration
**Focus**: External tools and extensibility
**File**: `14_Integration.md`

| # | Feature | Sources |
|---|---------|---------|
| 14.1 | Plugin System | MS FR H C |
| 14.2 | FieldWorks (FLEx) Integration | MS FR H C |
| 14.3 | Logos Bible Software | MS C |
| 14.4 | Translator's Workplace | H |
| 14.5 | AI Services (Slingshot, AQuA) | H |
| 14.6 | Web Browser (Embedded) | H |
| 14.7 | Command Line Interface | H |
| 14.8 | Custom Tools & Python Scripting | MS FR H |
| 14.9 | RegEx Pal | MS |

---

### 15. Publishing & Output
**Focus**: PDF generation, mobile apps, archiving
**File**: `15_Publishing_Output.md`

| # | Feature | Sources |
|---|---------|---------|
| 15.1 | PTXPrint Integration | MS R M |
| 15.2 | PublishingAssistant (Legacy) | R |
| 15.3 | Scripture App Builder | H |
| 15.4 | DBL Upload (Create DBL Bundle) | MS FR H C |
| 15.5 | Project Archive (Backup/Restore) | MS FR H C |
| 15.6 | Print (Basic Print) | MS M |
| 15.7 | Create Merged Publication Project | MS |
| 15.8 | Export to RTF | MS |
| 15.9 | Export to USX | MS |
| 15.10 | Scripture Burrito Export | MS |
| 15.11 | Export to HTML | MS |
| 15.12 | Bible Module Export | MS FR |

---

### 16. Infrastructure
**Focus**: Settings, localization, help system
**File**: `16_Infrastructure.md`

| # | Feature | Sources |
|---|---------|---------|
| 16.1 | User Settings | MS FR H |
| 16.2 | Project Settings | MS FR H |
| 16.3 | UI Localization (33+ languages) | R H |
| 16.4 | Help System | MS R H |
| 16.5 | Application Updates | MS |
| 16.6 | User Registration | MS FR H |
| 16.7 | Offline Support | R |
| 16.8 | Proxy/VPN Support | R H |
| 16.9 | Diagnostic Tools | MS H |
| 16.10 | Give Feedback | MS FR H |
| 16.11 | Keyboard Shortcuts Reference | MS M H |

---

## Alphabetical Index


### A
- **Adapt Names** → 4.8
- **Adaptation Projects** → 12.3
- **AI Services (Slingshot, AQuA)** → 14.5
- **Application Updates** → 16.5
- **Assignments and Progress** → 11.1
- **Autocorrect** → 1.15
- **Automatic Send/Receive** → 10.2

### B
- **BCV Navigation** → 1.3
- **Bible Module Export** → 15.12
- **Biblical Terms Lists** → 4.4
- **Biblical Terms Notes** → 4.7
- **Biblical Terms Tool** → 4.1
- **Book Titles Checklist** → 8.4
- **Bulk Progress Mode** → 11.7

### C
- **Capitalization Check** → 7.1
- **Chapter/Verse Check** → 7.5
- **Character Inventory** → 6.1
- **Command Line Interface** → 14.7
- **Commentaries & Handbooks** → 3.5
- **Compare Text Tool** → 9.3
- **Compare Word/Phrase** → 9.4
- **Concordance/Names Index Builder** → 9.6
- **Consultant Notes** → 10.5
- **Copy Assignments** → 11.8
- **Create Merged Publication Project** → 15.7
- **Cross-Reference Tools** → 1.12
- **Custom Tools & Python Scripting** → 14.8

### D
- **Daughter Translations** → 12.4
- **DBL Upload (Create DBL Bundle)** → 15.4
- **Diagnostic Tools** → 16.9

### E
- **Editor Real-time Validation** → 1.17
- **Editor Views** → 1.2
- **Encoding Converter** → 2.9
- **Enhanced Resources (Marble)** → 3.3
- **Export to HTML** → 15.11
- **Export to RTF** → 15.8
- **Export to USX** → 15.9

### F
- **FieldWorks (FLEx) Integration** → 14.2
- **Find and Replace** → 1.7
- **Find Incorrectly Joined/Split Words** → 5.5
- **Find Similar Words** → 5.4
- **Font Management (OpenType/Graphite)** → 2.3
- **Footnote Quotes Check** → 7.8
- **Footnotes Checklist** → 8.6
- **Free Back Translation** → 12.1

### G
- **Give Feedback** → 16.10
- **Glossary Integration** → 4.6
- **Guess Translations** → 9.5
- **Guessed Renderings** → 4.3

### H
- **Help System** → 16.4
- **Hyphenation** → 5.6

### I
- **Import from Other Formats** → 13.6
- **Insert Figure/Illustration** → 1.9
- **Insert Footnotes & Endnotes** → 1.11
- **Insert Project Notes** → 1.14
- **Insert Table** → 1.10
- **Insert Verse Numbers** → 1.13
- **Interlinear Back Translation** → 12.2
- **Interlinear Tool** → 9.1

### K
- **Keyboard Shortcuts Reference** → 16.11
- **Keyboard Switching** → 2.1
- **Keyman Integration** → 2.2

### L
- **Locale Data (LDML)** → 2.4
- **Logos Bible Software** → 14.3
- **Logos Integration** → 3.8
- **Long Paragraphs Checklist** → 8.13
- **Long Sentences Checklist** → 8.12

### M
- **Manage Books** → 13.8
- **Marker Inventory** → 6.3
- **Markers Check** → 7.6
- **Markers Checklist** → 8.7
- **Markers Followed by Lowercase Inventory** → 6.6
- **Markers Missing Final Punctuation Inventory** → 6.7
- **Matched Pairs Inventory** → 6.4
- **Merge Conflict Resolution** → 10.7
- **Mixed Capitalization Inventory** → 6.9

### N
- **Numbers Check** → 7.3

### O
- **Offline Support** → 16.7

### P
- **Parallel Passages Tool** → 9.2
- **Paratext Live (Real-time Collaboration)** → 10.3
- **Plugin System** → 14.1
- **Print (Basic Print)** → 15.6
- **Progress Reports** → 11.5
- **Progress Tracking** → 11.4
- **Project Archive (Backup/Restore)** → 15.5
- **Project Backup and Restore** → 13.9
- **Project Conversion** → 13.10
- **Project History (Version Control)** → 10.6
- **Project Notes** → 10.4
- **Project Plans** → 11.2
- **Project Settings** → 16.2
- **Project Structure** → 13.4
- **Proxy/VPN Support** → 16.8
- **PTXPrint Integration** → 15.1
- **PublishingAssistant (Legacy)** → 15.2
- **Punctuation Checklist** → 8.9
- **Punctuation Followed by Lowercase Inventory** → 6.8
- **Punctuation Inventory** → 6.2

### Q
- **Quick Reference Window** → 1.8
- **Quotation Check** → 7.2
- **Quotation Marks Checklist** → 8.8

### R
- **References Check** → 7.4
- **References Checklist** → 8.5
- **RegEx Pal** → 14.9
- **Relatively Long Verses Checklist** → 8.10
- **Relatively Short Verses Checklist** → 8.11
- **Repeated Words Inventory** → 6.5
- **Resource Browser & Download** → 3.7
- **Right-to-Left Support** → 2.7
- **Ruby Glossing (Furigana)** → 2.8
- **Run Basic Checks** → 7.7

### S
- **Scripture App Builder** → 15.3
- **Scripture Burrito** → 13.3
- **Scripture Burrito Export** → 15.10
- **Scroll Groups** → 1.5
- **Section Headings Checklist** → 8.3
- **Send/Receive** → 10.1
- **Source Language Dictionary** → 3.4
- **Source Language Texts (Greek/Hebrew)** → 3.1
- **Spell Checking** → 5.2
- **Spelling Discussion Notes** → 5.7
- **Study Bible Authoring** → 12.5
- **Stylesheet System** → 13.7
- **Synchronized Scrolling** → 1.4

### T
- **Task Assignment** → 11.3
- **Term Categories & Filters** → 4.5
- **Term Renderings** → 4.2
- **Text Collection** → 3.6
- **Text Editor** → 1.1
- **Text Normalization Utilities** → 1.16
- **Translated Bibles (DBL)** → 3.2
- **Translation Priorities** → 11.9
- **Translator's Workplace** → 14.4

### U
- **UI Localization (33+ languages)** → 16.3
- **Unicode Normalization (NFD/NFC)** → 2.5
- **User Permissions** → 11.6
- **User Registration** → 16.6
- **User Settings** → 16.1
- **USFM Support** → 13.1
- **USX (XML) Export/Import** → 13.2

### V
- **Valid Characters Configuration** → 2.6
- **Verse Text Checklist** → 8.1
- **Versification** → 13.5
- **Vertical Script Support** → 2.10

### W
- **Web Browser (Embedded)** → 14.6
- **Window Docking & Layouts** → 1.6
- **Word Approval Status** → 5.3
- **Word Morphology** → 5.9
- **Word or Phrase Checklist** → 8.2
- **Word Prefixes and Suffixes** → 4.9
- **Wordlist Spell Check Tools** → 5.8
- **Wordlist Tool** → 5.1

---

## Statistics

- **Total Categories**: 16
- **Total Features**: 152

**Features by validation level:**
- 6 sources: 23 features
- 5 sources: 27 features
- 4 sources: 36 features
- 3 sources: 28 features
- 2 sources: 18 features
- 1 source: 20 features

---

## Change Log

| Ver | Date | Changes |
|-----|------|---------|
| v3.8 | 2026-01-22 | Validation pass: fixed 13.10 sources (added C); updated statistics |
| v3.7 | 2026-01-22 | Added 2.10 Vertical Script Support based on source code analysis (supports traditional Mongolian and other vertical scripts); total now 152 features |
| v3.6 | 2026-01-22 | Added 3 features from HelpData coverage audit: 2.9 Encoding Converter, 11.9 Translation Priorities; expanded 13.10 Project Conversion (MS→MS FR H); total now 151 features |
| v3.4 | 2026-01-21 | **REBUILT**: Regenerated master index from category files with verified source data; all sources now match per-feature **Validation** lines in category documentation |
| v3.3 | 2026-01-21 | Added Source Key at top; attempted source synchronization (had errors) |
| v3.2 | 2026-01-21 | Expanded Category 08 to 13 features; updated alphabetical index |
| v3.0 | 2026-01-21 | Major reorganization: split Category 06 into 06/07/08 |

---

**Document Version**: 3.7
**Last Updated**: January 22, 2026
