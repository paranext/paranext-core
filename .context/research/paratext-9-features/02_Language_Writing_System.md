# Paratext 9 - Language & Writing System

**Category**: 02  
**Focus**: Keyboards, fonts, locale data, Unicode handling  
**User Roles**: All users (configuration by administrators)  
**Manual Chapters**: 4 (Keyboarding)  
**Last Updated**: 2026-01-22

---

## Overview

Language and writing system features enable Paratext to support the world's languages, from common Latin-script languages to complex scripts like Arabic, Thai, and minority languages with custom orthographies. These foundational features determine what can be typed and how it displays.

---

## Feature List

### 2.1 Keyboard Switching

**Description**: Switch between different keyboard layouts for typing in the target language vs. language of wider communication or other languages in resources.

**Sub-Features**:
- Per-project keyboard assignment
- Quick switching between keyboards
- Automatic switching based on panel focus
- System keyboard integration
- Multiple keyboard support per project

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Project settings > Keyboard`; Handler: `keyboardToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | Opens: `KeyboardSelectionForm` via `IParatextAccess.CreateKeyboardSelectionWindow` | `[FR]` |
| Requirements | Section: "Drafting Support > Language Support" | `[R]` |
| Manual | `chapters/04_keyboarding.md`: "Setting up the keyboard" | `[M]` |
| HelpData | Keyword: `ContentKeyboard`; Dialog: `KeyboardSelectionForm` | `[H]` |

**Key Quote** (from Requirements):
> "Paratext provides a keyboard switching mechanism to allow a user to quickly switch from typing the target language in the main editing panel, to typing the language of wider communication in a project notes editor"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `keyboardToolStripMenuItem_Click` at line 893 |
| 0 | `Paratext/ProjectMenu/KeyboardSelectionForm.cs` | Opens from D0 | Line 896: `CreateKeyboardSelectionWindow()` |
| 1 | `ParatextBase/Keyboarding/KeyboardHelper.cs` | Import in D0 | Line 9: `using Paratext.Base.Keyboarding` |
| 1 | `SIL.Keyboarding` | Import in D0 | Line 25: `using SIL.Keyboarding` |
| 2 | `SIL.Windows.Forms.Keyboarding` | Import in D1 | KeyboardHelper.cs line 13: `using SIL.Windows.Forms.Keyboarding` |

**Dialog Navigation**:
- `ParatextWindowWithMenus` → `KeyboardSelectionForm` (line 896)

**UI Entry Points**:
- Project > Project settings > Keyboard
  - Menu Structure: `ParatextWindowWithMenus`, handler `keyboardToolStripMenuItem_Click`, line 893
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Alt+Shift (system shortcut to switch keyboards)
  - Manual: `chapters/04_keyboarding.md`, line 60
  - Quote: "Change your keyboard system as needed on your computer."

**HelpData Items**:
- ID: `d3e239f1-39ed-4a63-9a3d-abc096b4e862` - "How do I select a keyboard for a project?"
- ID: `0ceff1da-c3a3-4a02-81e8-c0fc613c62db` - "How do I select a keyboard for a resource?"
- ID: `158bf6c0-5879-4797-9f20-817376ef3790` - "What keyboard shortcuts are available in Paratext?"

**Validation**: [MS] [FR] [R] [M] [H] [C] — Last verified: 2026-01-20

---

### 2.2 Keyman Integration

**Description**: Integration with SIL's Keyman virtual keyboard system for languages without physical keyboard support.

**Sub-Features**:
- Load Keyman keyboards
- Configure keyboard per project/language
- Keyman keyboard switching
- Access to Keyman keyboard library

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | (Accessed via 2.1 Keyboard settings) | `-` |
| Form Relationships | (External application) | `-` |
| Requirements | Section: "Drafting Support > Language Support" | `[R]` |
| Manual | `chapters/04_keyboarding.md`: "If you are using Keyman" | `[M]` |
| HelpData | Keyword: `Keyman`; 2 items | `[H]` |

**Key Quote** (from Requirements):
> "A virtual keyboard system, such as Keyman, maps physical keys on a keyboard to virtual keys and allows a user to type any supported language using the virtual keyboard"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/Keyboarding/KeyboardHelper.cs` | HelpData keyword search | Line 12: `using SIL.Keyboarding` |
| 1 | `SIL.Windows.Forms.Keyboarding` | Import in D0 | Line 13: `using SIL.Windows.Forms.Keyboarding` |

**Not Found**:
- `KeymanController.cs` (search: "KeymanController" - no matches; Keyman integration via SIL libraries)

**UI Entry Points**:
- Keyman tray icon (system)
  - External: Keyman application
- Choose keyboard in project settings
  - Manual: `chapters/04_keyboarding.md`, line 61
  - Quote: "If you are using Keyman then choose your keyboard (e.g. Tchad Unicode)"
  - Related: See 2.1 Keyboard Switching for menu entry

**HelpData Items**:
- ID: `06d326d5-ab42-4428-9402-79416108ee55` - "How do I set up the autocorrect.txt file?" (mentions Keyman)
- ID: `6a0a3227-ebd6-4b92-bd1e-fdcfdb70e2bc` - "What is the autocorrect feature?" (mentions Keyman)

**External Dependency**: Keyman keyboard engine (keyman.com)

**Validation**: - - [R] [M] [H] [C] — Last verified: 2026-01-20

---

### 2.3 Font Management (OpenType/Graphite)

**Description**: Advanced font rendering supporting OpenType and Graphite fonts for complex script rendering including contextual shaping, ligatures, and right-to-left scripts.

**Sub-Features**:
- OpenType font support
- Graphite font rendering (SIL Graphite)
- Per-project font assignment
- Font feature configuration
- Font size and zoom controls

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Project settings > Language settings`; Handler: `languageSettingsToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `LanguageSettingsForm` opens `ConfigFontFeaturesForm` (line 391) | `[FR]` |
| Requirements | Section: "Drafting Support > Language Support" | `[R]` |
| Manual | `chapters/04_keyboarding.md`: "Font settings" | `[M]` |
| HelpData | Keyword: `ComponentLanguageSettings`; Dialogs: `LanguageSettingsForm_tabFont`, `LanguageSettingsForm_tabGraphite` | `[H]` |

**Key Quote** (from Requirements):
> "By virtue of its support for Graphite, Paratext is able to meet the needs of language communities that otherwise could not be served by a tool that does not support Graphite"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `languageSettingsToolStripMenuItem_Click` at line 877 |
| 0 | `Paratext/ToolsMenu/LanguageSettingsForm.cs` | Opens from D0 | Line 877 calls `MainWindow.DisplayLanguageSettingsTool()` |
| 1 | `Paratext/ToolsMenu/ConfigFontFeaturesForm.cs` | Form Relationships | Line 391: `new ConfigFontFeaturesForm()` |
| 1 | `NGraphite` | Import in D0 | LanguageSettingsForm.cs line 8: `using NGraphite` |
| 1 | `PtxUtils.Fonts` | Import in D0 | LanguageSettingsForm.cs line 20: `using PtxUtils.Fonts` |
| 2 | `ParatextData/Languages/ScrLanguage.cs` | Field in D1 | LanguageSettingsForm.cs line 54: `ScrLanguage scrLanguage` |

**Dialog Navigation**:
- `ParatextWindowWithMenus` → `LanguageSettingsForm` (via menu handler)
- `LanguageSettingsForm` → `ConfigFontFeaturesForm` (line 391)
- `LanguageSettingsForm` → `LanguageSelectionForm` (lines 231, 246)

**Not Found**:
- `FontManager.cs` (search: "FontManager" - no matches)
- `GraphiteFont.cs` (search: "GraphiteFont" - no matches; Graphite via NGraphite library)

**UI Entry Points**:
- Project > Project settings > Language settings
  - Menu Structure: `ParatextWindowWithMenus`, handler `languageSettingsToolStripMenuItem_Click`, line 877
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Font tab (within Language Settings dialog)
  - HelpData ID: `1af5d594-c397-4cc4-be27-5e88759c6d27`
  - Dialog: `LanguageSettingsForm_tabFont`
  - Question: "How do I change the font used for my project?"
- Font Features tab (within Language Settings dialog)
  - HelpData ID: `0b4bf85c-5cc8-428c-960c-f610f1796ad6`
  - Dialog: `LanguageSettingsForm_tabGraphite`
  - Question: "How do I choose font features for Graphite fonts?"

**HelpData Items**:
- ID: `1af5d594-c397-4cc4-be27-5e88759c6d27` - "How do I change the font used for my project?"
- ID: `0b4bf85c-5cc8-428c-960c-f610f1796ad6` - "How do I choose font features for Graphite fonts?"
- ID: `7e6a26d9-899a-4a6f-b3b8-aca642044750` - "How do I change the size at which a text is displayed?"
- ID: `63426c4c-a463-4718-b80e-fc875c0e8507` - "Guide: Project > Project settings > Language settings: Font"
- Dialogs: `LanguageSettingsForm_tabFont`, `LanguageSettingsForm_tabGraphite`

**Validation**: [MS] [FR] [R] [M] [H] [C] — Last verified: 2026-01-20

---

### 2.4 Locale Data (LDML)

**Description**: Locale Data Markup Language support for defining language-specific settings including alphabetical order, character classifications, punctuation patterns, and number formatting.

**Sub-Features**:
- Alphabetical sort order definition
- Character classifications (letters, punctuation, etc.)
- Punctuation patterns and rules
- Quote mark definitions
- Diacritic handling rules
- CLDR integration

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Project settings > Language settings`; Handler: `languageSettingsToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | (Tabs within LanguageSettingsForm, no sub-dialogs) | `-` |
| Requirements | Section: "Drafting Support > Language Support" | `[R]` |
| HelpData | Keyword: `ComponentLanguageSettings`; Dialogs: `LanguageSettingsForm_tabAlphabetic`, `LanguageSettingsForm_tabOther` | `[H]` |

**Key Quote** (from Requirements):
> "Data that provides information such as this is called locale data and it is defined in a Locale Data Markup Language (LDML) file. LDML is a standard way of describing locale data"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `languageSettingsToolStripMenuItem_Click` at line 877 |
| 0 | `Paratext/ToolsMenu/LanguageSettingsForm.cs` | Opens from D0 | Contains tabs for Alphabetic/Other Characters |
| 1 | `ParatextData/LdmlAdapter.cs` | Import in D0 | LDML file reading |
| 1 | `ParatextData/ILdmlAdapter.cs` | Interface in D1 | Line 3: interface definition |
| 1 | `ParatextData/Languages/ScrLanguage.cs` | Import in D0 | Line 16: `using Paratext.Data.Languages` |
| 2 | `SIL.WritingSystems` | Import in D1 | LdmlAdapter.cs line 4: `using SIL.WritingSystems` |

**UI Entry Points**:
- Project > Project settings > Language settings
  - Menu Structure: `ParatextWindowWithMenus`, handler `languageSettingsToolStripMenuItem_Click`, line 877
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Alphabetic Characters tab (within Language Settings dialog)
  - HelpData ID: `1fcd5e77-2561-43d2-affc-2e13d6c67a24`
  - Dialog: `LanguageSettingsForm_tabAlphabetic`
  - Question: "How do I set up my language in Paratext?"
- Other Characters tab (within Language Settings dialog)
  - HelpData ID: `3daa33db-ad2a-4aba-aa36-2828a114916b`
  - Dialog: `LanguageSettingsForm_tabOther`
  - Question: "What is the recommended character for a glottal stop?"

**HelpData Items**:
- ID: `1fcd5e77-2561-43d2-affc-2e13d6c67a24` - "How do I set up my language in Paratext?"
- ID: `3daa33db-ad2a-4aba-aa36-2828a114916b` - "What is the recommended character for a glottal stop?"
- ID: `31cf8008-834d-41c0-aaf7-25bb0e625a5f` - "Guide: Project > Project settings > Language settings: Alphabetic Characters"
- ID: `029afc0a-e878-42cc-8585-b3bcf1eea5bc` - "Guide: Project > Project settings > Language settings: Other Characters"
- Dialogs: `LanguageSettingsForm_tabAlphabetic`, `LanguageSettingsForm_tabOther`

**External Standards**:
- Unicode LDML (unicode.org/reports/tr35/)
- CLDR (cldr.unicode.org)

**Validation**: [MS] - [R] - [H] [C] — Last verified: 2026-01-20

---

### 2.5 Unicode Normalization (NFD/NFC)

**Description**: Consistent handling of Unicode normalization for composed vs. decomposed character representation. Critical for searching, sorting, and consistent text representation.

**Sub-Features**:
- Project-level normalization choice (NFD or NFC)
- Automatic normalization on input
- Consistent storage
- Search across normalization forms

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | (Automatic behavior configured via Language Settings; see 2.3) | `-` |
| Form Relationships | (Internal processing, no UI dialogs) | `-` |
| Requirements | Section: "Drafting Support > Language Support" | `[R]` |
| HelpData | Keyword: `ComponentLanguageSettings` | `[H]` |

**Key Quote** (from Requirements):
> "Using Unicode, a vowel with an accent mark can be encoded using two characters (NFD), or a single combined character (NFC). A Scripture drafting editor must be able to consistently normalize and store data in either normal form"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextData/Languages/ScrLanguage.cs` | HelpData keyword search | Line 41: `private readonly ProjectNormalization normalization` |
| 1 | `UnicodeHelper` | Import in D0 | ScrLanguage.cs line 15: `using UnicodeHelper` |

**Not Found**:
- `UnicodeNormalizer.cs` (search: "UnicodeNormaliz" - no matches; normalization via UnicodeHelper library)

**UI Entry Points**:
- Automatic based on project language settings
  - Configured via: Project > Project settings > Language settings (see 2.3)
  - HelpData ID: `1fcd5e77-2561-43d2-affc-2e13d6c67a24`
  - Question: "How do I set up my language in Paratext?"

**HelpData Items**:
- ID: `1fcd5e77-2561-43d2-affc-2e13d6c67a24` - "How do I set up my language in Paratext?"

**Technical Notes**:
- NFD = Normal Form Decomposed (base character + combining marks)
- NFC = Normal Form Composed (single combined character)
- Choice must be consistent throughout project lifetime

**Validation**: - - [R] - [H] [C] — Last verified: 2026-01-20

---

### 2.6 Valid Characters Configuration

**Description**: Define and manage the valid characters for a language including letters, punctuation, and special characters. This is a configuration feature (distinct from 6.1 Character Inventory Check which analyzes text).

**Sub-Features**:
- Character set definition (main, punctuation, diacritics)
- Character classification (upper/lower/no-case)
- Multigraph support (multiple characters as single unit)
- Word-forming punctuation definition

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Project settings > Language settings`; Handler: `languageSettingsToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | (Tabs within LanguageSettingsForm, no sub-dialogs) | `-` |
| Manual | `chapters/04_keyboarding.md`: "Highlight Invalid Characters" | `[M]` |
| HelpData | Keyword: `ComponentLanguageSettings`; Dialog: `InventoryForm.Character` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `languageSettingsToolStripMenuItem_Click` at line 877 |
| 0 | `ParatextData/Languages/LanguageCharacters.cs` | HelpData keyword search | Character handling class |
| 1 | `UnicodeHelper` | Import in D0 | Line 6: `using UnicodeHelper` |
| 1 | `PtxUtils` | Import in D0 | Line 5: `using PtxUtils` |

**UI Entry Points**:
- Project > Project settings > Language settings
  - Menu Structure: `ParatextWindowWithMenus`, handler `languageSettingsToolStripMenuItem_Click`, line 877
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Alphabetic Characters tab (within Language Settings dialog)
  - HelpData ID: `1fcd5e77-2561-43d2-affc-2e13d6c67a24`
  - Dialog: `LanguageSettingsForm_tabAlphabetic`
  - Question: "How do I set up my language in Paratext?"
- View > Highlight Invalid Characters (in text window)
  - Manual: `chapters/04_keyboarding.md`, line 65
  - Quote: "You can use **≡ Tab** under **View** > **Highlight Invalid Characters**"

**HelpData Items**:
- ID: `1fcd5e77-2561-43d2-affc-2e13d6c67a24` - "How do I set up my language in Paratext?"
- ID: `758f6ada-ee9e-40a8-9c03-d3c4ec163c26` - "How do I find out the Unicode value of a character?"
- Dialog: `InventoryForm.Character`

**Validation**: [MS] - [M] [H] [C] — Last verified: 2026-01-20

---

### 2.7 Right-to-Left Support

**Description**: Full support for right-to-left scripts (Arabic, Hebrew, etc.) in both the user interface and Scripture content.

**Sub-Features**:
- RTL text rendering in editor
- RTL interface layout (mirrored UI)
- Bidirectional text handling (mixed RTL/LTR)
- Paragraph direction control

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | (Automatic behavior based on project language; no dedicated menu) | `-` |
| Form Relationships | (Framework-level, no dedicated dialogs) | `-` |
| Requirements | Section: "Internationalization/Localization" | `[R]` |
| Manual | `chapters/04_keyboarding.md`: "Right-to-left languages" | `[M]` |
| HelpData | Keyword: `ComponentHebrew/Greek` | `[H]` |

**Key Quote** (from Requirements):
> "some languages, like English, run from left to right (LTR) while others, like Arabic, run right to left (RTL). The direction of text will have profound impacts on how a user interface is rendered"

**Implementation**:

RTL support is integrated throughout the editor and UI framework rather than in dedicated files.

**Not Found**:
- `RTL*.cs` (search: "RTL" - no dedicated RTL files; handled by framework)

**UI Entry Points**:
- Automatic based on project language settings
  - Configured via: Project > Project settings > Language settings (see 2.3)
  - HelpData ID: `b6cdab62-5dd5-4cf5-a6fa-82d60163d3d2`
  - Question: "How do I type Greek or Hebrew letters?"
- Font configuration for RTL scripts
  - HelpData ID: `bdae1b0a-06d5-4544-8312-ac37fc81357f`
  - Question: "How do I change the font for the Hebrew or Greek displayed in a Source-language text?"

**HelpData Items**:
- ID: `b6cdab62-5dd5-4cf5-a6fa-82d60163d3d2` - "How do I type Greek or Hebrew letters?"
- ID: `bdae1b0a-06d5-4544-8312-ac37fc81357f` - "How do I change the font for the Hebrew or Greek displayed in a Source-language text?"
- ID: `effa8bec-884e-4242-a0de-be0cf4cb90cf` - "How do I type Hebrew text?"
- ID: `00126b43-e197-40d6-90c3-2f056e9ed8b4` - "How do I type Greek text?"

**Validation**: - - [R] [M] [H] - — Last verified: 2026-01-20

---


---

### 2.8 Ruby Glossing (Furigana)

**Description**: Display pronunciation guides (furigana) above Han characters for Japanese and Chinese text, allowing readers unfamiliar with certain characters to know their pronunciation.

**Sub-Features**:
- Ruby gloss editor for Han characters
- Color-coded status display for glosses
- Import/export of RubyGlosses.xml files
- Edit and delete existing glosses
- Project-level enablement via USFM 3

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | (Dynamic View menu item; not in static menu structure) | `-` |
| Form Relationships | (No dedicated dialog forms identified) | `-` |
| HelpData | Keyword: `ComponentRubyGlossing`; 5 items | `[H]` |

**Implementation**:

Ruby glossing is accessed via a dynamic View menu item in text windows when enabled for the project.

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | (View menu handler) | HelpData | View > Ruby Glossing toggles gloss editor |

**Not Found**:
- `RubyGlossing*.cs` (search: "RubyGloss" - implementation details not traced; likely in text rendering)

**UI Entry Points**:
- Tab menu > View > Ruby Glossing
  - HelpData ID: `b56838b8-0723-407b-b358-a4957b594e96`
  - Keyword: `ComponentRubyGlossing`
  - Question: "How do I use the ruby gloss editor?"
- Project setup for Ruby Glossing
  - HelpData ID: `9c3adf8b-1dc4-4cb7-833e-79e897c8b5cf`
  - Question: "How do I enable ruby glossing for my project?"
  - Note: Requires USFM 3 format

**HelpData Items**:
- ID: `ab8b9468-73bc-4a52-9657-aab52579bdf6` - "How do I add ruby glosses to my text?"
- ID: `b56838b8-0723-407b-b358-a4957b594e96` - "How do I use the ruby gloss editor?"
- ID: `b4b8c237-ead5-4229-85a1-42d33fdcb14c` - "What do the colors in ruby glossing view mean?"
- ID: `9c3adf8b-1dc4-4cb7-833e-79e897c8b5cf` - "How do I enable ruby glossing for my project?"
- ID: `2ce3377a-f62a-486d-806d-a176b039d943` - "How do I edit or delete a ruby gloss that is already in my text?"
- Keywords: `Furigana Kanji ContentRuby ComponentRubyGlossing`

**Technical Notes**:
- Requires USFM 3 project format
- Han characters in OccursUnder locations (book titles, section headings, Scripture text)
- RubyGlosses.xml stores project-specific gloss data

**Validation**: - - - - [H] - — Last verified: 2026-01-20

---

### 2.9 Encoding Converter

**Description**: Configure TECkit-based encoding converters to transform text between different character encodings or writing systems, enabling transliteration projects and legacy data conversion.

**Sub-Features**:
- Add encoding converter to project
- Download and install SIL encoding converters
- Set up transliteration projects (display text in different writing system)
- Convert between Unicode representations
- Share projects that use encoding converters

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | (Accessed via Project Properties > General tab > Encoding Converter dropdown) | `-` |
| Form Relationships | `ChooseEncodingForm` opens from `ProjectPropertiesForm` | `[FR]` |
| HelpData | Keyword: `ComponentEncodingConverter`; Dialog: `ChooseEncodingForm`; 5 items | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/ToolsMenu/ChooseEncodingForm.cs` | HelpData dialog | `ChooseEncodingForm` |
| 1 | `Paratext/ProjectMenu/ProjectPropertiesForm.cs` | Opens D0 | Encoding converter selection in General tab |

**UI Entry Points**:
- ≡ Tab > Project > Project settings > Project properties > General tab > Encoding Converter
  - HelpData ID: `4eebfcd3-6ad9-4cf5-aba9-f89b73fb53e6`
  - Keyword: `ComponentEncodingConverter`
  - Question: "How do I add an encoding converter?"
- Project creation > Transliteration (using Encoding Converter) project type
  - HelpData ID: `8603307c-c8ec-40de-bb40-aa20b1e94c49`
  - Question: "How do I set up a project to automatically display the text of another project in a different writing system?"

**HelpData Items**:
- ID: `4eebfcd3-6ad9-4cf5-aba9-f89b73fb53e6` - "How do I add an encoding converter?"
  - Keywords: `ContentProjectPropertiesSettings SIL encoding converters Full-Menus ComponentEncodingConverter dropdown`
- ID: `1e8157b7-9b67-42d9-83b7-a84afef603b8` - "How do I download and install SIL encoding converters?"
  - Keywords: `ContentProjectPropertiesSettings ComponentEncodingConverter`
- ID: `8603307c-c8ec-40de-bb40-aa20b1e94c49` - "How do I set up a project to automatically display the text of another project in a different writing system?"
  - Keywords: `ContentProjectPropertiesSettings ContentNewProject Full-Menus ComponentEncodingConverter ComponentTransliteration dropdown`
- ID: `f329f5d9-4bbf-4662-b0ee-ba6c7023e874` - "How do I convert project text from one Unicode representation to another?"
  - Keywords: `ContentManageBooks ContentProjectPropertiesSettings ContentUnicodeInformation Full-Menus ComponentEncodingConverter dropdown`
- ID: `73415f69-e26e-4ce0-880a-c24ded31748c` - "How do I share a project that uses an encoding converter?"
  - Keywords: `Full-Menus ComponentProjectSharing ComponentEncodingConverter dropdown`

**Use Cases**:
- Create transliteration projects that display Scripture in a different script
- Convert legacy (non-Unicode) data using TECkit mapping files
- Transform between different Unicode representations (e.g., script variants)
- Support minority languages with custom orthography mappings

**External Dependencies**:
- SIL Encoding Converters (TECkit) - https://software.sil.org/silconverters/
- TECkit map files (.map) for specific conversions

**Related Features**:
- 2.5 Unicode Normalization - related to character representation
- 13.10 Project Conversion - includes encoding change option

**Validation**: [FR] [H] — Last verified: 2026-01-22

---

### 2.10 Vertical Script Support

**Description**: Support for vertical writing systems such as traditional Mongolian script, where text flows top-to-bottom in columns that progress left-to-right or right-to-left.

**Sub-Features**:
- Vertical text rendering in editor (top-to-bottom)
- Support for vertical-rl (right-to-left columns, e.g., traditional Mongolian)
- Support for vertical-lr (left-to-right columns)
- Combined with RTL for bidirectional vertical text
- Default font mappings for Mongolian script

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | (No dedicated menu; configured via Settings.xml) | `-` |
| Form Relationships | (No dedicated UI dialog) | `-` |
| Code | `CSSCreator.cs`: generates `writing-mode: vertical-rl/lr` | `[C]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextData/ProjectSettingsAccess/ProjectSettings.cs` | Code search | Line 1682: `public bool Vertical` property; Line 1684: `GetSetting(Setting.Vertical) == "T"` |
| 0 | `ParatextData/ProjectSettingsAccess/Setting.cs` | Code search | Line 187: `Vertical` enum value |
| 1 | `ParatextInternalShared/ScriptureEditor/CSSCreator.cs` | Uses D0 | Line 33: `scrText.Settings.Vertical`; Lines 51, 54: `writing-mode: vertical-rl/lr` |
| 1 | `Paratext/Archiving/Projects/XmlStylesheetCreator.cs` | Uses D0 | Line 18: `scrText.Settings.Vertical`; Line 37: `writing-mode: tb-rl/tb-lr` |
| 1 | `ParatextInternalShared/ScriptureEditor/ViewUsfmXhtmlConverter.cs` | Uses D0 | Line 75: passes `scrText.Settings.Vertical` to converter |
| 2 | `PtxUtils/CSS/ldml_handMod.css` | Font defaults | Lines 2713-2717: `:lang(mn-Mong)` with "Noto Sans Mongolian" font |
| 2 | `PtxUtils/CSS/DefaultLanguageFont.cs` | Font defaults | Line 95: `"Mong"` script mapped to "Mongolian Baiti" font |

**Configuration**:

The `Vertical` setting is stored in the project's `Settings.xml` file:
```xml
<Vertical>T</Vertical>
```

This setting is read-only in the Paratext API and must be configured by manually editing the Settings.xml file or set during project creation/registration. There is no user-facing UI dialog to toggle this setting.

**CSS Output** (from `CSSCreator.cs`):
```css
/* For vertical + RTL (e.g., traditional Mongolian) */
body {
    direction: rtl;
    writing-mode: vertical-rl;
}

/* For vertical + LTR */
body {
    writing-mode: vertical-lr;
}
```

**UI Entry Points**:
- No direct UI entry point
  - Configured via: Manual edit of `Settings.xml` in project folder
  - Setting name: `<Vertical>T</Vertical>`

**Not Found**:
- No HelpData items for vertical script support
- No menu or dialog for configuring vertical scripts
- No Manual documentation for this feature

**Font Support**:
- Traditional Mongolian (`mn-Mong`): "Noto Sans Mongolian" (default), "Mongolian Baiti"
- Cyrillic Mongolian (`mn-Cyrl`): "Noto Sans Mongolian" with LTR direction (horizontal)

**Technical Notes**:
- Vertical scripts use CSS `writing-mode` property for rendering
- Traditional Mongolian is vertical-rl (top-to-bottom, columns right-to-left)
- The `Vertical` property works in combination with `RightToLeft` for proper layout
- Requires browser/renderer support for CSS vertical writing modes

**Related Features**:
- 2.3 Font Management - provides font support for Mongolian scripts
- 2.7 RTL Support - combined with vertical for proper Mongolian layout

**Validation**: [C] — Last verified: 2026-01-22

---

## Cross-References

**Related Categories**:
- **16 Infrastructure**: UI localization relates to language support settings

**Dependencies**:
- Operating system keyboard support
- Font files (OpenType/Graphite)
- Unicode support

---

## Validation Summary

| Feature | MS | FR | R | M | H | C | Last Verified |
|---------|----|----|---|---|---|---|---------------|
| 2.1 Keyboard Switching | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 2.2 Keyman Integration | - | - | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 2.3 Font Management | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 2.4 Locale Data (LDML) | ✓ | - | ✓ | - | ✓ | ✓ | 2026-01-20 |
| 2.5 Unicode Normalization | - | - | ✓ | - | ✓ | ✓ | 2026-01-20 |
| 2.6 Valid Characters Config | ✓ | - | - | ✓ | ✓ | ✓ | 2026-01-20 |
| 2.7 RTL Support | - | - | ✓ | ✓ | ✓ | - | 2026-01-20 |
| 2.8 Ruby Glossing | - | - | - | - | ✓ | - | 2026-01-20 |
| 2.9 Encoding Converter | - | ✓ | - | - | ✓ | - | 2026-01-22 |
| 2.10 Vertical Script Support | - | - | - | - | - | ✓ | 2026-01-22 |

---

## Verification Log

| Date | Action | By |
|------|--------|-----|
| 2026-01-15 | HelpData queries for keyboard, font, language | Claude |
| 2026-01-15 | Evidence chain tracing for all features | Claude |
| 2026-01-15 | Updated to FEATURE_TEMPLATE_v2.md v5.0 | Claude |
| 2026-01-16 | Updated UI Entry Points with proper citations per AGENTS.md v6.4 | Claude |
| 2026-01-16 | Added HelpData IDs, Dialogs, and Questions per FEATURE_TEMPLATE_v2.md v5.2 | Claude |
| 2026-01-20 | Deep review per AGENTS.md v7.2 / TEMPLATE v6.1 | Claude |
| 2026-01-20 | Added Menu Structure [MS] and Form Relationships [FR] sources | Claude |
| 2026-01-20 | Completed Ruby Glossing (2.8) from STUB | Claude |
| 2026-01-22 | Added 2.9 Encoding Converter: new feature based on HelpData coverage audit identifying 5 unreferenced ComponentEncodingConverter items; added Form Relationships [FR], HelpData [H], Use Cases, External Dependencies | Claude |
| 2026-01-22 | Added 2.10 Vertical Script Support: new feature based on source code analysis; found ProjectSettings.Vertical property, CSSCreator.cs writing-mode support, font mappings for Mongolian script; no HelpData or UI documentation exists | Claude |

---

## Notes

- LanguageSettingsForm.cs is the central UI for most language configuration (font, characters, etc.)
- Keyman integration is via SIL.Keyboarding and SIL.Windows.Forms.Keyboarding libraries, not dedicated Paratext classes
- Graphite support is via NGraphite library
- Unicode normalization is handled by UnicodeHelper library
- RTL support is distributed throughout the codebase rather than centralized
- Encoding Converter (2.9) uses TECkit from SIL for character mapping and transliteration
- Vertical Script Support (2.10) is configured via Settings.xml `<Vertical>T</Vertical>`; no UI exists for this setting
- All UI Entry Points now include verifiable citations with file:line + quote (Manual) or ID/Dialog/Keyword (HelpData)

---

**Document Version**: 5.2
**Template Version**: FEATURE_TEMPLATE_v2.md v6.1
**Guidelines Version**: AGENTS.md v7.2
