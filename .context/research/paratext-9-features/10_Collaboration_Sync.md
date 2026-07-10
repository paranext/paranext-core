# Paratext 9 - Collaboration & Synchronization

**Category**: 10  
**Focus**: Team collaboration, data sharing, and version control  
**User Roles**: All team members  
**Manual Chapters**: 15 (Using Notes), 18 (Compare Text), 20 (Collaboration Tools)  
**Last Updated**: 2026-01-21

---

## Overview

Collaboration features enable distributed translation teams to work together on projects. This includes cloud synchronization (Send/Receive), real-time collaboration (Paratext Live), notes for communication, and version control for tracking changes.

---

## Feature List

### 10.1 Send/Receive

**Description**: Cloud-based synchronization system for sharing project data between team members. The primary method for distributed teams to collaborate asynchronously.

**Sub-Features**:
- Upload local changes to server
- Download remote changes
- Automatic merge of changes
- Conflict detection and resolution
- Connection to Paratext servers (Internet)
- USB transfer option (offline/airgap)
- Chorus Hub (local server)
- Saved project selections
- Progress indication

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Paratext > Send/Receive projects`; Handler: `sendReceiveToolStripMenuItem_Click` | `[MS]` |
| Menu Structure | Menu: `Project > Send/Receive this project`; Handler: `sendReceiveThisProjectToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `MainForm` opens `SendReceiveProjectsForm` (line 3395) | `[FR]` |
| Requirements | Section: "Workflow Management > Cloud Synchronization" | `[R]` |
| Manual | `admin/ma_06_send_receive.md`: Setup guide | `[M]` |
| Manual | `chapters/04_keyboarding.md`, line 163: "Send/receive this project to the Internet" | `[M]` |
| HelpData | Keyword: `ComponentSend/ReceiveGeneral`; Dialog: `SendReceiveProjectsForm` | `[H]` |

**Key Quote** (from Requirements):
> "Known as 'Send/Receive' in Paratext, members of a translation project can synchronize their changes to a cloud server and download team member changes at the click of a single button"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `sendReceiveToolStripMenuItem_Click` at line 950 |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `sendReceiveThisProjectToolStripMenuItem_Click` at line 706 |
| 0 | `Paratext/Repository/SendReceiveProjectsForm.cs` | Form Relationships | opened from MainForm line 3395 |
| 1 | `ParatextData/Repository/SharedRepositorySource.cs` | Field type in D0 | Line 51: `private SharedRepositorySource source;` |
| 1 | `ParatextData/Repository/SharingLogic.cs` | Import in D0 | Line 24: `using Paratext.Data.Repository;` |
| 2 | `ParatextData/Repository/Hg.cs` | Used by D1 | SharingLogic.cs calls Hg for Mercurial operations |
| 2 | `ParatextData/Repository/InternetSharedRepositorySource.cs` | Base class | Extends SharedRepositorySource |
| 2 | `ParatextData/Repository/FileSharedRepositorySource.cs` | Base class | Extends SharedRepositorySource (USB) |

**Dialog Navigation**:
- `MainForm` → `SendReceiveProjectsForm` (line 3395)
- `ParatextWindowWithMenus` → `SendReceiveProjectsForm` (via menu handler)

**UI Entry Points**:
- Paratext > Send/Receive projects (Ctrl+Shift+S)
  - Menu Structure: `MainForm`, handler `sendReceiveToolStripMenuItem_Click`, line 950
  - File: `Paratext/MainForm.cs`
- Project > Send/Receive this project (no shortcut — PT9 binds F9 to Next Book; the multi-project dialog uses Ctrl+Shift+S)
  - Menu Structure: `ParatextWindowWithMenus`, handler `sendReceiveThisProjectToolStripMenuItem_Click`, line 706
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- USB Backup Option
  - HelpData ID: `7ab331ff-c1aa-4aa7-b25a-82ea2dc0d60e`
  - Dialog: `SendReceiveProjectsForm`
  - Question: "How do I backup my project to a USB drive?"

**HelpData Items**:
- ID: `e3522fa8-f979-4cbd-a71b-7efb72f01493` - "Introduction to Send/Receive"
- ID: `d6363907-fa5c-4b4a-b0eb-9be31c1c3eb3` - "How do I set up to Send/Receive a project?"
- ID: `b1c86764-47ce-4073-a600-526ccdf8cfbb` - "How do I send my project changes to someone else and receive their changes?"
- ID: `633cc80a-50b6-40e6-8f19-f6fb9f3b74f9` - "How do I receive a project from someone else?"
- ID: `7ab331ff-c1aa-4aa7-b25a-82ea2dc0d60e` - "How do I backup my project to a USB drive?"
- ID: `fcd92ec8-28da-4547-8286-d5879c649d6e` - "How do I set a schedule to automatically Send/Receive a project?"
- ID: `c8a4ce1d-98ea-46ef-8319-52234fd2dc8f` - "What is Chorus Hub?"
- Dialogs: `SendReceiveProjectsForm`, `ProjectUsersForm`, `ProjectUsersSetupForm`

**Validation**: [MS] [FR] [R] [M] [H] [C] — Last verified: 2026-01-21

---

### 10.2 Automatic Send/Receive

**Description**: Schedule automatic synchronization at regular intervals without manual intervention.

**Sub-Features**:
- Configure sync interval (hourly, 4-hourly, daily, on startup/shutdown)
- Enable/disable per project
- Background synchronization
- Notification of changes received
- Error notifications

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Not found - accessed via Options dialog | `-` |
| Form Relationships | Settings live inside the Send/Receive Projects dialog (`cmbProjectUpdates` combo + "Schedule..." button → `SendReceiveScheduleForm` in `AutomaticSendReceiveSettingsForm.cs`) — NOT `OptionsForm`, which contains no auto-S/R settings | `[FR]` (corrected against source 2026-07-10) |
| Requirements | Not explicitly mentioned | `-` |
| Manual | `admin/ma_06_send_receive.md`: Setup guide | `[M]` |
| HelpData | Keyword: `ComponentSend/ReceiveGeneral`; ID: `fcd92ec8-28da-4547-8286-d5879c649d6e` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/Repository/AutoSendReceiveManager.cs` | HelpData/Feature search | Manages automatic S/R scheduling |
| 0 | `Paratext/Repository/AutomaticSendReceiveSettingsForm.cs` | Feature search | Settings form for S/R scheduling |
| 1 | `ParatextData/Repository/SendReceiveMemento.cs` | Used by D0 | Stores S/R **dialog** state (source, selections, last tip IDs); the schedule itself lives in `SendReceiveScheduleMemento` (`Paratext/Repository/AutoSendReceiveManager.cs`, UI layer) |
| 1 | `ParatextData/Repository/SharingLogic.cs` | Import in D0 | `using Paratext.Data.Repository;` |

**UI Entry Points**:
- Tools > Options > Send/Receive settings
  - HelpData ID: `fcd92ec8-28da-4547-8286-d5879c649d6e`
  - Question: "How do I set a schedule to automatically Send/Receive a project?"
  - [Inferred] Settings accessed through main Options dialog

**HelpData Items**:
- ID: `fcd92ec8-28da-4547-8286-d5879c649d6e` - "How do I set a schedule to automatically Send/Receive a project?"

**Validation**: [-] [FR] [M] [H] [C] — Last verified: 2026-01-21

---

### 10.3 Paratext Live (Real-time Collaboration)

**Description**: Real-time collaborative editing allowing multiple users to see changes instantly without Send/Receive. Works over local network or Internet.

**Sub-Features**:
- Start/stop live session
- Join existing session
- Real-time change propagation
- Host/participant roles
- Server selection (Primary, Secondary, LAN)
- Exchange all files (for non-text changes)
- Session management
- Dedicated local server option

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Paratext Live`; Handler: `paratextLiveToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | `PTLiveDedicatedServerForm` at `Paratext/PTLive/PTLiveDedicatedServerForm.cs` | `[FR]` |
| Form Relationships | `SelectServerForm` at `Paratext/PTLive/SelectServerForm.cs` | `[FR]` |
| Requirements | Section: "Real-time Collaborative Editing" | `[R]` |
| Manual | `chapters/20_collaboration.md`, line 1: "In this module you will use Paratext Live as a way that the team can collaborate together" | `[M]` |
| HelpData | Keyword: `ComponentPTLive`; Dialog: `PTLiveTag` | `[H]` |

**Key Quote** (from Requirements):
> "Paratext currently supports RCE, but only within the same geographic location"

**Key Quote** (from Manual, `chapters/20_collaboration.md`, line 5):
> "Paratext Live allows everyone to look at the text on their own computer and see the changes in real time"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `paratextLiveToolStripMenuItem_Click` at line 1151 |
| 0 | `Paratext/PTLive/SelectServerForm.cs` | Form Relationships | Server selection form, line 6005 |
| 1 | `Paratext/PTLive/PTLiveControlCentre.cs` | Reference in D0 | Line 64: `PTLiveControlCentre.Default.StatusChanged` |
| 1 | `Paratext/PTLive/PTLiveSessionManager.cs` | Used by D1 | Line 33: `List<PTLiveSessionManager> sessionManagers` |
| 1 | `ParatextData/Repository/SharingLogic.cs` | Import in D1 | Line 46: `SharingLogic.BeforeSharingProject` |
| 2 | `Paratext/PTLive/PTLiveHg.cs` | Related functionality | Mercurial operations for PTLive |
| 2 | `Paratext/PTLive/PTLiveServiceAdvertiser.cs` | Related functionality | LAN service discovery |
| 2 | `PTLiveBase/` | Project reference | Core PTLive library |

**Dialog Navigation**:
- `ParatextWindowWithMenus` → PTLive session (via menu handler line 1151)
- `MainForm` → `PTLiveDedicatedServerForm` (line 4113)

**UI Entry Points**:
- Tools > Paratext Live
  - Menu Structure: `ParatextWindowWithMenus`, handler `paratextLiveToolStripMenuItem_Click`, line 1151
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Toolbar Paratext Live button
  - Manual: `chapters/20_collaboration.md`, line 50
  - Quote: "Or use the icon on the toolbar"
  - HelpData ID: `6ad6852b-3df8-441a-9bac-bdd40c3acac9`
  - Dialog: `PTLiveTag`
  - Question: "How do I start or join a Paratext Live session?"

**HelpData Items**:
- ID: `be924acb-ca0a-4b73-9e2d-465086af0803` - "Introduction to Paratext Live"
- ID: `6ad6852b-3df8-441a-9bac-bdd40c3acac9` - "How do I start or join a Paratext Live session?"
- ID: `c9f90de5-98c1-44ac-bfb6-f270fac45d23` - "How do I end or leave a Paratext Live session?"
- ID: `017ece9d-0506-412e-9f2c-ba6718787fad` - "Why should I use a local dedicated Paratext Live server?"
- ID: `f3c77e99-7891-4d92-b29e-61d0fd2cbdf2` - "What is a local dedicated Paratext Live server?"
- ID: `c5a959c1-c621-486e-a530-2e3abb6be714` - "How do I start a local dedicated Paratext Live server?"
- ID: `4d48903a-8047-42ca-97f7-05cbd1c05630` - "Which programs need to communicate through a software firewall for a Paratext Live session?"
- Dialogs: `PTLiveTag`, `OptionsForm`, `SelectServerForm`

**Validation**: [MS] [FR] [R] [M] [H] [C] — Last verified: 2026-01-21

---

### 10.4 Project Notes

**Description**: Add comments and discussions attached to specific locations in the text. Essential for team communication during translation and review.

**Sub-Features**:
- Add note at verse/word location
- Note categories/tags (customizable icons)
- Assign notes to team members
- Note threading (replies/comments)
- Mark note as resolved
- Filter notes by status/user/tag
- Navigate to note locations
- Notes list window
- Print notes report
- Apply notes to multiple projects

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Insert > Project note`; Handler: `noteToolStripMenuItem_Click` | `[MS]` |
| Menu Structure | Menu: `Tools > Notes list`; Handler: `uiFileOpenNotes_Click` | `[MS]` |
| Menu Structure | Menu: `View > Show project notes`; Handler: `showProjectNotesToolStripMenuItemClicked` | `[MS]` |
| Form Relationships | `CommentListForm` at `Paratext/ProjectComments/CommentListForm.cs` | `[FR]` |
| Requirements | Section: "Workflow Management > Project Comments" | `[R]` |
| Manual | `chapters/15_using_notes.md`, line 1: "As you are translating and checking you may want to make comments on various errors or issues" | `[M]` |
| HelpData | Keyword: `ComponentProjectNotes`; Dialog: `CreateCommentReportForm` | `[H]` |

**Key Quote** (from Requirements):
> "Distributed team members need to be able to comment on each other's work. Adding a comment to a specific location of a vernacular Scripture text is a very convenient way of interacting"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `noteToolStripMenuItem_Click` at line 1719 |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `uiFileOpenNotes_Click` at line 766 |
| 0 | `Paratext/ProjectComments/CommentListForm.cs` | Form Relationships | Notes list form, line 718 |
| 1 | `ParatextData/ProjectComments/CommentManager.cs` | Import in D0 | Line 28: `using Paratext.Data.ProjectComments;` |
| 1 | `ParatextData/ProjectComments/CommentThread.cs` | Used by D1 | Thread management |
| 2 | `ParatextData/ProjectComments/CommentList.cs` | Field in D1 | Line 35: `CommentList allComments` |
| 2 | `ParatextData/ProjectComments/CommentTags.cs` | Used by D1 | Note categories/icons |
| 2 | `ParatextData/ProjectComments/ThreadStatus.cs` | Used by D1 | Resolved/unresolved status |

**Dialog Navigation**:
- `CommentListForm` → `BookChooserForm` (line 724)
- `CommentListForm` → `CreateCommentReportForm` (line 731)

**UI Entry Points**:
- Insert > Project note (Ctrl+Shift+N)
  - Menu Structure: `TextForm`, handler `noteToolStripMenuItem_Click`, line 1719
  - File: `Paratext/TextForm.cs`
- Tools > Notes list
  - Menu Structure: `ParatextWindowWithMenus`, handler `uiFileOpenNotes_Click`, line 766
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- View > Show project notes
  - Menu Structure: `TextForm`, handler `showProjectNotesToolStripMenuItemClicked`, line 2154
  - File: `Paratext/TextForm.cs`
- Click note icon in text
  - Manual: `chapters/15_using_notes.md`, line 96
  - Quote: "Click the icon in the text"

**HelpData Items**:
- ID: `59616af9-1196-44a6-aa84-371a3b2f4ce2` - "Best practice for using project notes"
- ID: `dd4ccee9-3000-473f-a011-2afe20748e32` - "How do I resolve a project note?"
- ID: `0e1c1eff-51f4-4360-928d-83d51b327a18` - "How do I assign a project note?"
- ID: `d10198ac-963e-44a9-9c6d-9e6d7e9012a5` - "How do I add a comment to a note?"
- ID: `9d7d6c80-bc8c-458e-9832-a58690644095` - "How do I filter notes which are assigned to me?"
- ID: `239095dc-7388-4647-9939-c977d53d556e` - "How do I create a notes report?"
- ID: `13fb5260-e839-4460-b25d-d8dd54fc821b` - "How do I add a note to multiple projects?"
- ID: `b2e70829-4dfa-46e4-94ab-ac8355771bbc` - "Can I create more project note categories or tags for a project?"
- Dialogs: `CreateCommentReportForm`, `ProjectPropertiesForm_tabNotes`, `CommentListForm`

**Validation**: [MS] [FR] [R] [M] [H] [C] — Last verified: 2026-01-21

---

### 10.5 Consultant Notes

**Description**: Pre-written notes that can be applied to multiple projects. Allows consultants to share expertise across translation projects in a cluster or region.

**Sub-Features**:
- Create consultant notes project
- Apply notes to translation projects
- Global Consultant Notes sharing
- Insert consultant notes
- Category assignment
- TNE notes import

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Insert > Consultant note`; Handler: `consultantNoteToolStripMenuItem_Click` | `[MS]` |
| Menu Structure | Menu: `Edit > Insert consultant note` (TextCollectionForm); Handler: `insertNoteToolStripMenuItem_Click` | `[MS]` |
| Menu Structure | Menu: `View > Show consultant notes`; ownerForm: `TextForm` | `[MS]` |
| Menu Structure | Menu: `Paratext > Advanced > Import TNE notes`; Handler: `importTNENotesToolStripMenuItem_Click` | `[MS]` |
| Menu Structure | Menu: `Paratext > Advanced > Import new Global Consultant Notes`; Handler: `importIntoGToolStripMenuItem_Click` | `[MS]` |
| Requirements | Section: "Exegetical Research" | `[R]` |
| Manual | *[Not found in main manual chapters]* | `-` |
| HelpData | Keyword: `ComponentConsultantNotes`; Dialog: `ProjectPropertiesForm_tabGeneral` | `[H]` |

**Key Quote** (from Requirements):
> "Consultant Notes are a collection of Paratext project notes that have been curated and included as a shareable set of notes"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `consultantNoteToolStripMenuItem_Click` at line 1740 |
| 0 | `Paratext/TextCollectionForm.cs` | Menu Structure | handler `insertNoteToolStripMenuItem_Click` at line 490 |
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `importTNENotesToolStripMenuItem_Click` at line 1202 |
| 1 | `ParatextData/ProjectComments/CommentManager.cs` | Import in D0 | `using Paratext.Data.ProjectComments;` |
| 2 | `ParatextData/ScrText.cs` | Used by D1 | `ProjectType.ConsultantNotes` check |

**UI Entry Points**:
- Insert > Consultant note
  - Menu Structure: `TextForm`, handler `consultantNoteToolStripMenuItem_Click`, line 1740
  - File: `Paratext/TextForm.cs`
- Edit > Insert consultant note (Text Collection)
  - Menu Structure: `TextCollectionForm`, handler `insertNoteToolStripMenuItem_Click`, line 490
  - File: `Paratext/TextCollectionForm.cs`
- View > Show consultant notes
  - Menu Structure: `TextForm`, ownerForm: `TextForm`
  - File: `Paratext/TextForm.cs`
- Paratext > Advanced > Import TNE notes
  - Menu Structure: `MainForm`, handler `importTNENotesToolStripMenuItem_Click`, line 1202
  - File: `Paratext/MainForm.cs`
- Paratext > Advanced > Import new Global Consultant Notes
  - Menu Structure: `MainForm`, handler `importIntoGToolStripMenuItem_Click`, line 1232
  - File: `Paratext/MainForm.cs`
- Paratext > Advanced > Publish accepted Global Consultant Notes
  - Menu Structure: `MainForm`, handler `publishAcceptedGlobalConsultantNotesToolStripMenuItem_Click`, line 1240
  - File: `Paratext/MainForm.cs`

**HelpData Items**:
- ID: `19cb99f0-03df-42dc-99f8-d3c69afbd5bb` - "Introduction to Consultant Notes projects"
- ID: `5c7d2d10-fec4-464e-be17-be1c5ddf9002` - "How do I create a Consultant Notes project?"
- ID: `12de9c5d-3d9b-4111-bcca-2b70ed954080` - "How do I view consultant notes?"
- ID: `f03402e9-8b0b-4a46-8bfb-88c8d1847f62` - "How do I insert a consultant note?"
- ID: `56beb73e-6214-4e20-97d1-39d35dce76ab` - "What is the Global Consultant Notes project?"
- ID: `d3937ddb-524d-486e-bfe6-11911a45f9ca` - "How do I enter a category for a consultant note?"
- ID: `df13bc44-d40d-48e9-924f-987b4e2d6f34` - "How do I import TNE notes into a consultant notes project?"
- Dialogs: `ProjectPropertiesForm_tabGeneral`

**Validation**: [MS] [R] [-] [H] [C] — Last verified: 2026-01-21

---

### 10.6 Project History (Version Control)

**Description**: View complete history of changes to the project with ability to compare versions and restore earlier states.

**Sub-Features**:
- Mark point in project history
- View revision history
- Compare two versions
- See who made changes
- Restore previous versions (revert)
- View change descriptions
- Baseline concept
- Repository management

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Project history`; Handler: `viewHistoryToolStripMenuItem_Click` | `[MS]` |
| Menu Structure | Menu: `Project > Mark point in history`; Handler: `recordProjectStatusToolStripMenuItem_Click` | `[MS]` |
| Menu Structure | Menu: `Project > Compare versions`; Handler: `uiToolsCompareTexts_Click` | `[MS]` |
| Form Relationships | `CommitChangesForm` at `Paratext/Repository/CommitChangesForm.cs` | `[FR]` |
| Requirements | Section: "Workflow Management > Version Control" | `[R]` |
| Manual | `chapters/18_compare_text.md`, line 1: "In this module, you will learn how to save your text at various points and review them later" | `[M]` |
| HelpData | Keyword: `ComponentProjectHistory`; Dialog: `CommitChangesForm` | `[H]` |

**Key Quote** (from Requirements):
> "A basic requirement for version control is a view of document history. The next requirement is the ability to see the differences between any two points in history"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `viewHistoryToolStripMenuItem_Click` at line 947 |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `recordProjectStatusToolStripMenuItem_Click` at line 938 |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `uiToolsCompareTexts_Click` at line 531 |
| 0 | `Paratext/Repository/CommitChangesForm.cs` | Form Relationships | Mark point in history dialog, line 760 |
| 1 | `ParatextData/Repository/Hg.cs` | Import in D0 | `using Paratext.Data.Repository;` |
| 1 | `ParatextData/Repository/HgRevision.cs` | Used by D0 | Revision data structure |
| 1 | `ParatextData/Repository/HgRevisionCollection.cs` | Field in D0 | `HgRevisionCollection revisions` |
| 2 | `ParatextData/Repository/VersioningManager.cs` | Used by D1 | Manages versioned texts |
| 2 | `ParatextData/Repository/VersionedText.cs` | Used by D2 | `Dictionary<HexId, VersionedText>` |

**Dialog Navigation**:
- `ParatextWindowWithMenus` → `CommitChangesForm` (via menu handler)

**UI Entry Points**:
- Project > Project history
  - Menu Structure: `ParatextWindowWithMenus`, handler `viewHistoryToolStripMenuItem_Click`, line 947
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Project > Mark point in history
  - Menu Structure: `ParatextWindowWithMenus`, handler `recordProjectStatusToolStripMenuItem_Click`, line 938
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
  - HelpData ID: `1dc95456-5703-49cf-b58b-d32c49b34c24`
  - Dialog: `CommitChangesForm`
- Project > Compare versions
  - Menu Structure: `ParatextWindowWithMenus`, handler `uiToolsCompareTexts_Click`, line 531
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
  - HelpData ID: `4c0d2e79-260b-4a98-a6d0-08f03f40c421`
  - Dialog: `CommitChangesForm`

**HelpData Items**:
- ID: `31242b6f-9006-42b8-8628-a07a16df1a41` - "Introduction to Project history"
- ID: `1dc95456-5703-49cf-b58b-d32c49b34c24` - "How do I record the current state of a text in the project history?"
- ID: `4c0d2e79-260b-4a98-a6d0-08f03f40c421` - "How do I review changes made to a text?"
- ID: `1081e0eb-8771-47c7-9765-e89425ba4db7` - "How do I revert text from an earlier version of a project?"
- ID: `1485c65a-aaf1-4419-becc-f02bee712d08` - "How do I revert to a previous version of the text?"
- ID: `f9c0aef5-298d-4ee6-bae9-13d7927243b4` - "How do I find a previous version of a project?"
- ID: `489071a1-7950-42d6-86a4-9bfe54ad6400` - "How do I see who has made what changes in a project text?"
- ID: `147948fa-02c4-49c3-b82a-2bef197f8f00` - "What is the 'Baseline'?"
- ID: `c81aec7e-188a-4ead-a07d-d76e9fc756b3` - "When does Paratext automatically mark a point in project history?"
- Dialogs: `CommitChangesForm`

**Validation**: [MS] [FR] [R] [M] [H] [C] — Last verified: 2026-01-21

---

### 10.7 Merge Conflict Resolution

**Description**: Handle merge conflicts when multiple team members edit the same text between synchronizations.

**Sub-Features**:
- Detect conflicts during Send/Receive
- Display conflict notes with special icon (red triangle with !)
- Show conflicting versions
- Manual resolution interface
- Delete conflict notes
- View who made changes causing conflict

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Open conflict notes`; Handler: `uiProjectShowConflicts_Click` | `[MS]` |
| Menu Structure | Menu: `Paratext > Support and development > Delete all conflict notes`; Handler: `deleteAllConflictsToolStripMenuItem_Click` | `[MS]` |
| Form Relationships | Uses `SendReceiveProjectsForm` for conflict detection | `[FR]` |
| Requirements | Section: "Workflow Management > Cloud Synchronization" | `[R]` |
| Manual | `chapters/15_using_notes.md`, line 43: Conflict icon description | `[M]` |
| HelpData | Keyword: `ComponentMergeConflict`; Dialog: `SendReceiveProjectsForm` | `[H]` |

**Key Quote** (from Requirements):
> "Given that this is an asynchronous method of collaboration there is the possibility of a merge conflict. In most cases merge conflicts can be resolved quickly and easily"

**Key Quote** (from Manual, `chapters/15_using_notes.md`, line 43):
> "Icon is a **black exclamation point !** within a **red triangle.** There is a Send/Receive merge conflict because two users have made different changes to the same verse."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `uiProjectShowConflicts_Click` at line 994 |
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `deleteAllConflictsToolStripMenuItem_Click` at line 1655 |
| 0 | `Paratext/Repository/SendReceiveProjectsForm.cs` | Form Relationships | Conflict detection during S/R |
| 1 | `ParatextData/Repository/SharingLogic.cs` | Import in D0 | Handles merge operations |
| 1 | `ParatextData/Repository/Mergers/` | Directory | Merge logic implementations |
| 2 | `ParatextData/Repository/MergeMessage.cs` | Used by D1 | Merge result messaging |
| 2 | `ParatextData/Repository/BookFileMergeMessage.cs` | Extends D2 | Book-level merge messages |
| 2 | `ParatextData/ProjectComments/TagIcons/conflict1.png` | Assets | Conflict note icons (conflict1, conflict4, conflict5) |

**Dialog Navigation**:
- `ParatextWindowWithMenus` → Conflict notes list (via `uiProjectShowConflicts_Click` line 994)

**UI Entry Points**:
- Project > Open conflict notes
  - Menu Structure: `ParatextWindowWithMenus`, handler `uiProjectShowConflicts_Click`, line 994
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Paratext > Support and development > Delete all conflict notes
  - Menu Structure: `MainForm`, handler `deleteAllConflictsToolStripMenuItem_Click`, line 1655
  - File: `Paratext/MainForm.cs`
- Conflict note icon in text (appears automatically after Send/Receive with conflict)
  - Manual: `chapters/15_using_notes.md`, line 43 (icon description)
  - HelpData ID: `b847ea4c-bdc9-43df-820b-e59e1a797cbc`
  - Question: "What is a Send/Receive merge conflict?"

**HelpData Items**:
- ID: `b847ea4c-bdc9-43df-820b-e59e1a797cbc` - "What is a Send/Receive merge conflict?"
- ID: `6ad238eb-d7e1-449e-9dd4-f63f2f3023a7` - "How do I resolve a Send/Receive merge conflict?"
- ID: `f2510dc9-334a-4dfa-9142-5aed43c09d1d` - "What happens to the text when there is a Send/Receive merge conflict?"
- ID: `2e4bb3be-fa40-4054-84cd-7f27096eb3ea` - "How do I see who made the changes that resulted in a merge conflict?"
- ID: `c1265358-7157-466a-a321-ab5be5ef0ee7` - "How do I delete all conflict notes?"
- Dialogs: `SendReceiveProjectsForm`, `ProjectUsersForm`

**Validation**: [MS] [FR] [R] [M] [H] [C] — Last verified: 2026-01-21

---

## Cross-References

**Related Categories**:
- **11 Project Planning**: Notes integrate with task workflow
- **06 Checking Inventories**, **07 Automated Checks**: Check results can be discussed in notes
- **12 Back Translation**: Back translation and Study Bible projects shared via Send/Receive
- **13 Data Formats**: Send/Receive transfers USFM/USX data
- **16 Infrastructure**: Network settings affect collaboration

**Dependencies**:
- Internet connection (for cloud sync and primary Paratext Live server)
- Local network (for LAN-based Paratext Live)
- Server registration (for Send/Receive)
- Mercurial (Hg) version control system

---

## Validation Summary

| Feature | MS | FR | R | M | H | C | Last Verified |
|---------|----|----|---|---|---|---|---------------|
| 10.1 Send/Receive | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 10.2 Auto Send/Receive | - | ✓ | - | ✓ | ✓ | ✓ | 2026-01-21 |
| 10.3 Paratext Live | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 10.4 Project Notes | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 10.5 Consultant Notes | ✓ | - | ✓ | - | ✓ | ✓ | 2026-01-21 |
| 10.6 Project History | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 10.7 Merge Conflicts | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |

**Overall**: 6/7 in Menu Structure, 6/7 in Form Relationships, 6/7 in Requirements, 6/7 in Manual, 7/7 in HelpData, 7/7 Code verified

---

## Verification Log

| Date | Action | By |
|------|--------|-----|
| 2026-01-14 | Initial v2 document created | Claude |
| 2026-01-17 | HelpData queries for all features | Claude |
| 2026-01-17 | Manual citations with line numbers added | Claude |
| 2026-01-17 | Code tracing - Evidence Chains completed for all 7 features | Claude |
| 2026-01-17 | Updated to AGENTS.md v6.4 / FEATURE_TEMPLATE v5.2 compliance | Claude |
| 2026-01-21 | Reorganized: Category 08 renumbered to 10; feature numbers updated | Claude |
| 2026-01-21 | Added Menu Structure [MS] sources for all 7 features | Claude |
| 2026-01-21 | Added Form Relationships [FR] sources and Dialog Navigation sections | Claude |
| 2026-01-21 | Updated Evidence Chain tables with Menu Structure entry points | Claude |
| 2026-01-21 | Updated Validation Summary table with MS and FR columns | Claude |

---

## Notes

- Send/Receive uses Mercurial (Hg) for version control backend
- Paratext Live supports multiple server options since 9.3 (Primary, Secondary, LAN)
- 44+ HelpData items for Send/Receive indicate significant feature complexity
- Project Notes and Consultant Notes share some data structures but serve different purposes
- Key repository files in `ParatextData/Repository/` handle core version control operations
- PTLive functionality spans `Paratext/PTLive/` and `PTLiveBase/` projects

---

**Document Version**: 5.0
**Based on v1**: 05_Workflow_Features.md Sections 1-3
**Compliance**: AGENTS.md v7.2, FEATURE_TEMPLATE_v2.md v6.1
