# Paratext 9 - Infrastructure

**Category**: 16
**Focus**: Settings, localization, help system, and system support
**User Roles**: All users, Administrators
**Manual Chapters**: Admin guides, various
**Last Updated**: 2026-01-21

---

## Overview

Infrastructure features provide the foundational support that enables all other Paratext functionality. This includes settings management, UI localization into 33+ languages, the help system, application updates, user registration, and network configuration.

---

## Feature List

### 16.1 User Settings

**Description**: Per-user preferences and configuration stored locally, accessed through the Paratext Settings dialog.

**Sub-Features**:
- UI preferences (dark mode, themes)
- Default layouts
- Keyboard preferences
- Recent projects list
- Font preferences
- Behavior settings
- Data collection settings

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Paratext > Paratext settings`; Handler: `optionsToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `MainForm` opens `OptionsForm` (line 1128) | `[FR]` |
| HelpData | Keyword: `ComponentParatextSettings`; Dialog: `OptionsForm` | `[H]` |

**Key Quote** (from HelpData):
> "How can I set Options in Paratext that affect all projects?"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `optionsToolStripMenuItem_Click` at line 1126 |
| 1 | `Paratext/ToolsMenu/OptionsForm.cs` | Opens dialog in D0 | Line 1128: `using (OptionsForm optionsForm = new OptionsForm())` |

**Dialog Navigation**:
- `MainForm` → `OptionsForm` (line 1128)

**UI Entry Points**:
- Paratext > Paratext settings
  - Menu Structure: `MainForm`, handler `optionsToolStripMenuItem_Click`, line 1126
  - File: `Paratext/MainForm.cs`

**HelpData Items**:
- ID: `7e4e3ddb-49bc-4797-a12f-da2325c55027` - "What data does Paratext collect and send to the developers?"
- ID: `73416ffa-63c9-4be6-aebb-580d558da829` - "How can I set Options in Paratext that affect all projects?"
- ID: `c31e0690-9132-40f7-933c-6d0ad5a5f1ca` - Guide: "Paratext > Paratext settings"
- ID: `0337fb8f-9e9f-47e3-bbd2-dafad7d5783d` - "How do I prevent Paratext from accessing the Internet?"
- Dialogs: `OptionsForm`

**Validation**: [MS] [FR] [H] — Last verified: 2026-01-21

---

### 16.2 Project Settings

**Description**: Per-project configuration including language, versification, and team settings.

**Sub-Features**:
- Language configuration
- Versification selection
- Stylesheet assignment
- Project plan
- User permissions
- Keyboard settings
- Language settings
- Quotation rules
- Number settings

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Project settings > Project properties`; Handler: `projectPropertiesAndSettingsToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `MainForm` opens `ProjectPropertiesForm` (line 498) | `[FR]` |
| HelpData | Keyword: `ComponentProjectProperties`; Dialogs: `ProjectPropertiesForm_*` | `[H]` |

**Key Quote** (from HelpData):
> "How do I review the current settings for a project?"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `projectPropertiesAndSettingsToolStripMenuItem_Click` at line 872 |
| 1 | `Paratext/ProjectMenu/ProjectPropertiesForm.cs` | Form Relationships | Opens dialog from MainForm at line 498 |

**Dialog Navigation**:
- `MainForm` → `ProjectPropertiesForm` (line 498)
- `ProjectPropertiesForm` → `LanguageSettingsForm` (line 533)
- `ProjectPropertiesForm` → `LanguageIDSelectionForm` (line 559)
- `ProjectPropertiesForm` → `ProjectNameForm` (line 607)

**UI Entry Points**:
- Project > Project settings > Project properties
  - Menu Structure: `ParatextWindowWithMenus`, handler `projectPropertiesAndSettingsToolStripMenuItem_Click`, line 872
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Project > Project settings > User permissions
  - Menu Structure: `ParatextWindowWithMenus`, handler `uiProjectUsersMenuItem_Click`, line 861
- Project > Project settings > Keyboard
  - Menu Structure: `ParatextWindowWithMenus`, handler `keyboardToolStripMenuItem_Click`, line 893
- Project > Project settings > Language settings
  - Menu Structure: `ParatextWindowWithMenus`, handler `languageSettingsToolStripMenuItem_Click`, line 877

**HelpData Items**:
- ID: `103bc82c-7dec-454d-9408-74d27203fa06` - "How do I choose a language for my project?"
- ID: `66a992c8-572d-44b8-b3d2-357a4fb6968f` - "How do I select a versification for my project?"
- ID: `9c6d427d-a28c-4cd3-b78d-936265faa542` - "How do I review the current settings for a project?"
- ID: `759d34b8-34e8-4f17-ab23-738f9528edd3` - Guide: "Project > Project settings > Project properties: General"
- Dialogs: `ProjectPropertiesForm_tabGeneral`, `ProjectPropertiesForm_tabAdvanced`, `ProjectPropertiesForm_tabBooks`, `ProjectPropertiesForm_tabNotes`, `ProjectPropertiesForm_tabAssoc`

**Validation**: [MS] [FR] [H] — Last verified: 2026-01-21

---

### 16.3 UI Localization (33+ languages)

**Description**: User interface translated into 33+ languages of wider communication to make Paratext accessible globally.

**Sub-Features**:
- UI in 33+ languages
- RTL UI support
- Dynamic language switching
- Crowdin integration for community translation
- Fallback to English
- Date/number localization
- Localizing Biblical Terms

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| HelpData | Keyword: `ComponentLocalization`; 12 items | `[H]` |
| Requirements | Section: "Drafting Support > Internationalization/Localization" | `[R]` |

**Key Quote** (from Requirements):
> "Paratext 9 has been localized into 33 different languages as of today"

**HelpData Items**:
- ID: `658fdcde-d143-4c01-9b30-c09629e8be4a` - "Languages supported by Paratext Localization tool"
- ID: `fbc14775-a6c3-486c-b520-6696b9c3d99b` - "How do I localize Biblical Terms?"
- ID: `415023d6-63ad-4d42-9149-f009d0774cb8` - "How do I localize the names of USFMs?"
- ID: `a4016795-0df1-4c55-9786-5969c0eb65b3` - "Notes on localizing with an xlf file and using Crowd-in"

**Key Files**:
- `NetLoc/` directory - Localization resource files
- Localization managed via Crowdin platform

**Not Found**:
- No explicit "Change Interface Language" menu entry found in Menu Structure - likely accessed through OptionsForm

**Validation**: [H] [R] — Last verified: 2026-01-21

---

### 16.4 Help System

**Description**: Context-sensitive help with searchable documentation available in multiple languages.

**Sub-Features**:
- Context-sensitive help (F1)
- Searchable help content (Browse Help)
- Help in multiple languages
- Video tutorials
- Online help access
- Offline help availability
- Help Editor for content creation

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Help > Browse Help`; Handler: `contentsIndexSearchToolStripMenuItem_Click` | `[MS]` |
| HelpData | 936 English help items in HelpData.xml | `[H]` |
| Requirements | Section: "Training and support" | `[R]` |

**Key Quote** (from Requirements):
> "The third tier of educational support is a written manual. Sometimes it's just good to be able to look up a precise issue and read it"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `contentsIndexSearchToolStripMenuItem_Click` at line 1403 |

**UI Entry Points**:
- Help > Browse Help
  - Menu Structure: `MainForm`, handler `contentsIndexSearchToolStripMenuItem_Click`, line 1403
  - File: `Paratext/MainForm.cs`
- Help > Help Editor
  - Menu Structure: `MainForm`, handler `uiHelpEditorMenuItem_Click`, line 1431
- F1 key (context sensitive)

**HelpData Statistics**:
- 936 English help items
- Multiple languages supported
- Items linked to specific dialogs

**Key Files**:
- `primary_documentation/HelpData.xml` - Help content database

**Validation**: [MS] [H] [R] — Last verified: 2026-01-21

---

### 16.5 Application Updates

**Description**: System for checking, downloading, and installing Paratext updates.

**Sub-Features**:
- Check for updates
- Download updates
- Install updates
- Update notifications
- Automatic update toggle
- Version information

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Help > Check for updates`; Handler: `uiHelpCheckUpdates_Click` | `[MS]` |
| Menu Structure | Menu: `Help > Automatically update Paratext`; Handler: `enableAutomaticUpdatesToolStripMenuItem_Click` | `[MS]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `uiHelpCheckUpdates_Click` at line 1426 |
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `enableAutomaticUpdatesToolStripMenuItem_Click` at line 1421 |

**UI Entry Points**:
- Help > Check for updates
  - Menu Structure: `MainForm`, handler `uiHelpCheckUpdates_Click`, line 1426
  - File: `Paratext/MainForm.cs`
- Help > Automatically update Paratext (toggle)
  - Menu Structure: `MainForm`, handler `enableAutomaticUpdatesToolStripMenuItem_Click`, line 1421
  - File: `Paratext/MainForm.cs`

**Validation**: [MS] — Last verified: 2026-01-21

---

### 16.6 User Registration

**Description**: Register users with Paratext servers for access to resources and collaboration features.

**Sub-Features**:
- User account creation
- Login/authentication
- Password management
- Account recovery
- Organization membership
- License management
- Project registration

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Help > Registration information`; Handler: `helpChangeRegistration_Click` | `[MS]` |
| Form Relationships | `MainForm` opens `RegistrationForm` (line 1116) | `[FR]` |
| HelpData | Keyword: `ComponentRegistry`; 6 items | `[H]` |

**Key Quote** (from HelpData):
> "Why should I register my project?"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `helpChangeRegistration_Click` at line 1106 |
| 1 | `Paratext/RegistrationForm.cs` | Form Relationships | Line 1116: `using (RegistrationForm form = new RegistrationForm(...)` |

**Dialog Navigation**:
- `MainForm` → `RegistrationForm` (line 1116)

**UI Entry Points**:
- Help > Registration information
  - Menu Structure: `MainForm`, handler `helpChangeRegistration_Click`, line 1106
  - File: `Paratext/MainForm.cs`

**HelpData Items**:
- ID: `c40490ff-45ca-4395-ad61-4e72a4aba4da` - "How do I register certain types of projects separately?"
- ID: `31daee33-8ebd-4843-af6c-22b8cf4b32b6` - "Why should I register my project?"
- ID: `19a81ef4-dd34-414a-b08f-18356a5c4825` - "How do I register a project in Paratext?"
- ID: `5360bba1-45e8-47d7-929b-1c51e472abef` - "Which types of projects need to be registered?"
- ID: `cf115c00-3bec-41c6-8258-bd8ff84540a3` - "What is the Paratext Registry?"

**Validation**: [MS] [FR] [H] — Last verified: 2026-01-21

---

### 16.7 Offline Support

**Description**: Full functionality when not connected to internet, critical for translators in remote locations.

**Sub-Features**:
- Offline editing
- Local resource access
- Queue Send/Receive for later
- USB file transfer
- Offline help access

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Requirements | Section: "Environment Restrictions" | `[R]` |

**Key Quote** (from Requirements):
> "Paratext must be able to run properly while not connected to a network. This might only be a temporary situation where internet access is not reliable"

**Not Found**:
- No explicit "Offline Mode" menu entry found in Menu Structure - offline support is automatic
- No `ComponentOffline` keyword found in HelpData

**Notes**:
- Offline support is automatically detected and enabled
- Many features work without network connectivity
- USB transfer available for air-gapped environments

**Validation**: [R] — Last verified: 2026-01-21

---

### 16.8 Proxy/VPN Support

**Description**: Work through proxy servers or VPN tunnels for users in restricted network environments.

**Sub-Features**:
- Proxy server configuration
- VPN compatibility
- Authentication through proxy
- Network troubleshooting
- Sensitive location support

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| HelpData | Keyword: `ComponentConfidentialProjectSupport`; 9 items | `[H]` |
| Requirements | Section: "Environment Restrictions" | `[R]` |

**Key Quote** (from Requirements):
> "Paratext must be able to work through a proxy or VPN tunnel if required. In some sensitive locations, directly connecting to certain online services would be a problem"

**HelpData Items**:
- ID: `850aacbf-f989-444f-9b1d-bd5b0a18ed26` - "How do I access the Internet through a Virtual Private Network (VPN)?"
- ID: `6343e1ae-5c89-4cf1-8f21-6995e5eb1a14` - "What is a Virtual Private Network (VPN)?"
- ID: `0337fb8f-9e9f-47e3-bbd2-dafad7d5783d` - "How do I prevent Paratext from accessing the Internet?"
- ID: `6804646d-a8f2-4911-91d2-f0614c4e46ce` - "How do I prepare my project for work in a sensitive location?"
- ID: `a8e92f23-6600-4c61-8218-c0c2630a509f` - "Can I configure, set up, or install Paratext for use in a sensitive location?"
- ID: `b006f0b7-78e7-4760-b462-8ce3db3816f1` - "What is the file of sensitive locations?"

**Not Found**:
- No explicit "Network Settings" or "Proxy" menu entry found in Menu Structure - likely accessed through OptionsForm

**Validation**: [H] [R] — Last verified: 2026-01-21

---

### 16.9 Diagnostic Tools

**Description**: Tools for diagnosing and troubleshooting application problems.

**Sub-Features**:
- Validate projects USX
- Verify project repositories
- Gecko debugging
- Error logging
- Log file access
- System information
- HTML rendering test tool (developer/debug utility)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Paratext > Advanced > Diagnostics`; Various handlers | `[MS]` |
| Menu Structure | Menu: `Project > Advanced > Html rendering test tool`; Handler: `textRenderingDebugTool_Click`; Line: 1524; Owner: `TextForm` | `[MS]` |
| HelpData | Keyword: `ComponentTroubleShooting`; 1 item | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `validateProjectsToolStripMenuItem_Click` at line 1249 |
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `verifyProjectRepositoriesToolStripMenuItem_Click` at line 1265 |
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `enableGeckoDebugging_Click` at line 1293 |
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `textRenderingDebugTool_Click` at line 1524 |

**UI Entry Points**:
- Paratext > Advanced > Diagnostics > Validate projects USX
  - Menu Structure: `MainForm`, handler `validateProjectsToolStripMenuItem_Click`, line 1249
  - File: `Paratext/MainForm.cs`
- Paratext > Advanced > Diagnostics > Verify project repositories
  - Menu Structure: `MainForm`, handler `verifyProjectRepositoriesToolStripMenuItem_Click`, line 1265
  - File: `Paratext/MainForm.cs`
- Paratext > Advanced > Diagnostics > Enable remote Gecko debugging
  - Menu Structure: `MainForm`, handler `enableGeckoDebugging_Click`, line 1293
  - File: `Paratext/MainForm.cs`
- ≡ Tab > Project > Advanced > Html rendering test tool
  - Menu Structure: `TextForm`, handler `textRenderingDebugTool_Click`, line 1524
  - File: `Paratext/TextForm.cs`
  - Note: Developer/debug utility for testing HTML rendering in text views

**HelpData Items**:
- ID: `000415ff-6b57-4fb7-8e9a-6c28ac0be7ed` - "How do I reset Paratext?"

**Validation**: [MS] [H] — Last verified: 2026-01-21

---

### 16.10 Give Feedback

**Description**: Report problems, make suggestions, and provide feedback to Paratext developers.

**Sub-Features**:
- Report a problem
- Make a suggestion
- Attach screenshots and logs
- Send directly to development team

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Help > Give feedback`; Handler: `reportAProblemToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `ReportProblemForm` base class: `ParatextForm` | `[FR]` |
| HelpData | Keyword: `ComponentGiveFeedback`; Dialog: `ReportProblemForm` | `[H]` |

**Key Quote** (from HelpData):
> "How do I report a problem in Paratext?"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `reportAProblemToolStripMenuItem_Click` at line 1413 |
| 1 | `Paratext/ReportProblemForm.cs` | Form Relationships | Form definition at line 40 |

**UI Entry Points**:
- Help > Give feedback
  - Menu Structure: `MainForm`, handler `reportAProblemToolStripMenuItem_Click`, line 1413
  - File: `Paratext/MainForm.cs`

**HelpData Items**:
- ID: `d34804b2-df9e-4b09-894e-2559869dde73` - Guide: "Help > Give feedback"
- ID: `da857729-c1aa-4e79-852a-8d6842b607ff` - "How do I report a problem in Paratext?"
- ID: `480f0f32-4338-439f-905c-c8158e3051ad` - "How do I suggest an improvement or request a new feature for Paratext?"
- ID: `f591ddac-be8c-4fe6-bf63-055b3a0c67c2` - "decoding a Paratext problem report file"
- Dialogs: `ReportProblemForm`

**Validation**: [MS] [FR] [H] — Last verified: 2026-01-21

---

### 16.11 Keyboard Shortcuts Reference

**Description**: Reference documentation for keyboard shortcuts available throughout Paratext.

**Sub-Features**:
- Comprehensive shortcut list
- Context-sensitive shortcuts
- Navigation shortcuts
- Text entry shortcuts

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Help > Keyboard shortcuts`; Handler: `keyboardToolStripMenuItem_Click` | `[MS]` |
| HelpData | ID: `158bf6c0-5879-4797-9f20-817376ef3790`; Question: "What keyboard shortcuts are available in Paratext?" | `[H]` |
| Manual | `chapters/04_keyboarding.md`: Keyboard shortcuts section | `[M]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `keyboardToolStripMenuItem_Click` at line 1408 |

**UI Entry Points**:
- Help > Keyboard shortcuts
  - Menu Structure: `MainForm`, handler `keyboardToolStripMenuItem_Click`, line 1408
  - File: `Paratext/MainForm.cs`

**HelpData Items**:
- ID: `158bf6c0-5879-4797-9f20-817376ef3790` - "What keyboard shortcuts are available in Paratext?"
  - Keywords: `keywordNavigating`, `keywordEnteringText`, `ContentKeyboard`, `ComponentUserInterface`

**Validation**: [MS] [H] [M] — Last verified: 2026-01-21

---

## Cross-References

**Related Categories**:
- **10 Collaboration & Sync**: Registration required for Send/Receive
- **03 Exegetical Resources**: Registration required for DBL access
- **02 Language & Writing System**: UI localization relates to language support
- **08 Checklists**: Help system provides checklist guidance
- **09 Advanced Checking Tools**: Python scripting infrastructure (see 14.8)

**Dependencies**:
- Windows operating system
- .NET Framework
- Internet connection (optional for some features)

---

## Validation Summary

| Feature | MS | FR | H | M | R | C | Last Verified |
|---------|----|----|---|---|---|---|---------------|
| 16.1 User Settings | ✓ | ✓ | ✓ | - | - | - | 2026-01-21 |
| 16.2 Project Settings | ✓ | ✓ | ✓ | - | - | - | 2026-01-21 |
| 16.3 UI Localization | - | - | ✓ | - | ✓ | - | 2026-01-21 |
| 16.4 Help System | ✓ | - | ✓ | - | ✓ | - | 2026-01-21 |
| 16.5 Application Updates | ✓ | - | - | - | - | - | 2026-01-21 |
| 16.6 User Registration | ✓ | ✓ | ✓ | - | - | - | 2026-01-21 |
| 16.7 Offline Support | - | - | - | - | ✓ | - | 2026-01-21 |
| 16.8 Proxy/VPN Support | - | - | ✓ | - | ✓ | - | 2026-01-21 |
| 16.9 Diagnostic Tools | ✓ | - | ✓ | - | - | - | 2026-01-21 |
| 16.10 Give Feedback | ✓ | ✓ | ✓ | - | - | - | 2026-01-21 |
| 16.11 Keyboard Shortcuts | ✓ | - | ✓ | ✓ | - | - | 2026-01-21 |

---

## Verification Log

| Date | Action | By |
|------|--------|-----|
| 2026-01-21 | Full AGENTS.md v7.2 update: Added [MS] sources for 9 features, evidence chains, HelpData items | Claude |
| 2026-01-14 | Initial v2.0 document created | Claude |

---

## Notes

- 33+ UI languages makes Paratext globally accessible
- Offline support is critical for remote translation teams and is automatically enabled
- Help system has 936 English help items (comprehensive)
- Registration is required for full functionality (Send/Receive, DBL access)
- Proxy/VPN support critical for sensitive locations with restricted network access
- Diagnostics menu provides tools for troubleshooting project and repository issues

---

**Document Version**: 2.1
**Based on v1**: 08_Infrastructure_Features.md
