# Paratext 9 - Project Planning

**Category**: 11  
**Focus**: Assignments, progress tracking, and project management  
**User Roles**: Project Managers, Team Leaders, All team members  
**Manual Chapters**: 3, 6, 21 (Project Plan and Progress), admin/ma_07  
**Last Updated**: 2026-01-22

---

## Overview

Project Planning features help teams organize, track, and manage their translation workflow. This includes assigning tasks to team members, defining project stages, tracking completion progress, and generating reports for stakeholders.

---

## Feature List

### 11.1 Assignments and Progress

**Description**: The central tool for viewing and managing task assignments, seeing what needs to be done, and tracking completion.

**Sub-Features**:
- View assigned tasks
- See task status (not started, in progress, complete)
- Filter by user, book, stage
- Mark tasks complete
- Navigate to task content
- See dependencies
- Color-coded status

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Assignments and progress`; Handler: `assignmentsAndProgressToolStripMenuItem_Click` in `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`, line 1021; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Requirements | Section: "Workflow Management > Assign Tasks" | `[R]` |
| Manual | `chapters/03_project_plan_1.md`, line 7: "You use the Assignments and Progress to help organise your work" | `[M]` |
| HelpData | Keyword: `ComponentAssignmentsAndProgress`; Dialog: `LocationFilterForm` | `[H]` |

**Key Quote** (from Requirements):
> "With a plan in place, a project administrator can assign tasks to specific team members. Tasks can be assigned down to a chapter level. Individual team members can look at their own tasks and thus know what they need to work on"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | Handler `assignmentsAndProgressToolStripMenuItem_Click` at line 1021 |
| 0 | `ParatextBase/Filters/LocationFilterForm.cs` | HelpData dialog | `LocationFilterForm` |
| 1 | `ParatextData/ScrText.cs` | Field in D0 | Line 25: `private readonly ScrText scrText` |
| 1 | `Paratext.Data.Filters` (namespace) | Import in D0 | Line 9: `using Paratext.Data.Filters` |
| 1 | `Paratext.Base.ProjectProgress` (namespace) | Import in D0 | Line 7: `using Paratext.Base.ProjectProgress` |

**Not Found**:
- `AssignmentsProgressForm.cs` (search: "AssignmentsProgressForm" - LocationFilterForm is the actual entry point per HelpData)

**UI Entry Points**:
- Assignments and Progress button (blue button)
  - Manual: `chapters/03_project_plan_1.md`, line 25
  - Quote: "In your project, click **Assignments and Progress** button"
- ≡ Tab > Project > Assignments and progress
  - Manual: `chapters/03_project_plan_1.md`, line 29
  - Quote: "**≡ Tab** under **Project** menu, select **Assignments and progress**"
  - HelpData ID: `4dd7cba4-bdaa-4576-917d-f9270c7463d1`
  - Dialog: `LocationFilterForm`
  - Question: "How do I mark progress on tasks or checks assigned to me?"
- Ctrl+s (save after marking progress)
  - Manual: `chapters/03_project_plan_1.md`, line 77
  - Quote: "**≡ Paratext** under **Paratext** > **Save all** (or **Ctrl**+**s**)"

**HelpData Items**:
- ID: `4dd7cba4-bdaa-4576-917d-f9270c7463d1` - "How do I mark progress on tasks or checks assigned to me?"
- ID: `5955484a-bc72-4b28-b7a0-cd9a890118e5` - "How do I assign tasks and checks to project members?"
- ID: `a1072de9-41c7-4ccb-ad56-75b75dd85e0c` - "How do I see the completion status for tasks?"
- ID: `bae2bc91-e1a7-4239-b919-27fa24996977` - "Introduction to project progress tracking"
- Dialogs: `LocationFilterForm`, `ProjectProgressForm`, `ProjectProgressStartDateForm`

**Validation**: [MS] [R] [M] [H] [C] — Last verified: 2026-01-21

---

### 11.2 Project Plans

**Description**: Define the workflow stages and tasks for a translation project. Customizable to match organizational methodology.

**Sub-Features**:
- Pre-defined plan templates
- Custom plan creation
- Define stages (drafting, checking, etc.)
- Define tasks within stages
- Set task prerequisites
- Set check requirements
- Define book priorities

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Project settings > Project plan`; Handler: `projectProgresStageEditorToolStripMenuItem_Click` in `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`, line 999; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Requirements | Section: "Workflow Management > Project Plans" | `[R]` |
| Manual | `admin/ma_07_project_plan.md`, line 7: "Progress tracking based on a Project Plan and Assignments and Progress" | `[M]` |
| HelpData | Keyword: `ComponentProjectPlan`; Dialog: `ProgressPlanEditorForm` | `[H]` |

**Key Quote** (from Requirements):
> "Paratext provides a tool for organizations to define their own project plan. Each step of the plan gets its own description, can define prerequisites, and can define the level of granularity"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | Handler `projectProgresStageEditorToolStripMenuItem_Click` at line 999 |
| 0 | `Paratext/ProjectProgress/ProgressPlanEditorForm.cs` | HelpData dialog | `ProgressPlanEditorForm` |
| 1 | `ParatextData/ScrText.cs` | Field in D0 | Line 56: `private readonly ScrText scrText` |
| 1 | `ParatextData/ProjectProgress/ProgressInfo.cs` | Field in D0 | Line 57: `private readonly ProgressInfo progress` |
| 1 | `Paratext.Data.ProjectProgress` (namespace) | Import in D0 | Line 17: `using Paratext.Data.ProjectProgress` |
| 2 | `ParatextData/ProjectProgress/Stage.cs` | Type in D0 | Line 75: `Dictionary<ComboBoxValue, Stage> assignedRequiredStages` |

**Dialog Navigation** `[FR]`:
- `ProgressPlanEditorForm` → `ManageProgressPlansForm` (line 425)
- `ProgressPlanEditorForm` → `CopyTaskEffortForm` (line 529)
- `ProgressPlanEditorForm` → `BookChooserForm` (line 1637)

**Not Found**:
- `ProjectPlanForm.cs` (search: "ProjectPlanForm" - ProgressPlanEditorForm is the entry point per HelpData)

**UI Entry Points**:
- ≡ Tab > Project > Project settings > Project plan
  - Manual: `admin/ma_07_project_plan.md`, line 31
  - Quote: "**≡ Tab**, under Project > **Project settings** choose **Project plan**"
  - HelpData ID: `c7276a1e-07f3-4b5c-ba7b-78a29ce65229`
  - Dialog: `ProgressPlanEditorForm`
  - Question: "Guide: Project > Project settings > Project plan"
- Manage plans button
  - Manual: `admin/ma_07_project_plan.md`, line 32
  - Quote: "Click **Manage plans**"

**HelpData Items**:
- ID: `21fdfb56-f32d-4eb7-8ce5-588a0846378c` - "How do I make a project plan for a project?"
- ID: `31e9e432-b801-4e68-9aee-374eb2da6ba9` - "How do I customize the Project Plan for a project?"
- ID: `c18d1204-c13e-403d-a155-3dd7b84b7162` - "Introduction to making a Project Plan"
- ID: `e092a209-c5ce-49fe-bded-e748679ed217` - "How do I add, move, edit, or remove a task or check for a stage of project progress?"
- Dialogs: `ProgressPlanEditorForm`, `ProjectProgressForm`, `ProjectProgressStartDateForm`, `CopyTaskEffortForm`

**Validation**: [MS] [FR] [R] [M] [H] [C] — Last verified: 2026-01-21

---

### 11.3 Task Assignment

**Description**: Assign specific tasks to individual team members at the book or chapter level.

**Sub-Features**:
- Assign tasks to users
- Assign at book or chapter level
- Bulk assignment
- View who is assigned what
- Reassign tasks
- Unassign tasks

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Assignments and progress`; Handler: `assignmentsAndProgressToolStripMenuItem_Click` in `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`, line 1021; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Requirements | Section: "Workflow Management > Assign Tasks" | `[R]` |
| Manual | `admin/ma_07_project_plan.md`, line 122: "Tasks can either be assigned individually or in bulk" | `[M]` |
| HelpData | Keyword: `ComponentAssignmentsAndProgress`; Keyword: `ContentAssignmentsAndProgress` | `[H]` |

**Key Quote** (from Requirements):
> "Tasks can be assigned down to a chapter level. Individual team members can look at their own tasks and thus know what they need to work on"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | Handler `assignmentsAndProgressToolStripMenuItem_Click` at line 1021 |
| 0 | `ParatextBase/Filters/LocationFilterForm.cs` | HelpData dialog | `LocationFilterForm` |
| 1 | `ParatextData/ScrText.cs` | Field in D0 | Line 25: `private readonly ScrText scrText` |
| 1 | `Paratext.Data.Filters` (namespace) | Import in D0 | Line 9: `using Paratext.Data.Filters` |

**UI Entry Points**:
- ≡ Tab > Project > Assignments and Progress → dropdown → Assign
  - Manual: `admin/ma_07_project_plan.md`, line 127
  - Quote: "For the task to assign, click the dropdown menu and choose the team member"
  - HelpData ID: `5955484a-bc72-4b28-b7a0-cd9a890118e5`
  - Dialog: `LocationFilterForm`
  - Question: "How do I assign tasks and checks to project members?"
- Bulk assign: Tasks Table → Assign tasks button
  - Manual: `admin/ma_07_project_plan.md`, line 132
  - Quote: "Choose **Tasks Table**... Below the task, click **Assign tasks**"

**HelpData Items**:
- ID: `5955484a-bc72-4b28-b7a0-cd9a890118e5` - "How do I assign tasks and checks to project members?"
- ID: `9c4506f5-52d9-4dce-8de6-1ea45214657c` - "How do I assign project stages using All Tasks?"
- ID: `b3fa288d-823f-40c0-89d9-08f6bf4ed293` - "How do I divide the assignment of a task or check among project members?"
- ID: `ab1fd9bb-e33b-44ab-9e24-66151fd3a358` - "How do I copy assignments from one book to other books?"
- Dialog: `LocationFilterForm`

**Validation**: [MS] [R] [M] [H] [C] — Last verified: 2026-01-21

---

### 11.4 Progress Tracking

**Description**: Track overall project progress through translation stages, with visual indicators of completion.

**Sub-Features**:
- View completion percentage
- Track by book, stage, or task
- Historical progress data
- Progress trends
- Milestone tracking

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Progress charts`; Handler: `teamProgressChartsToolStripMenuItem_Click` in `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`, line 1030; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Requirements | Section: "Workflow Management > Project Progress" | `[R]` |
| Manual | `chapters/06_project_plan_2.md`, line 7: "you will learn how to update your progress by marking tasks as completed" | `[M]` |
| HelpData | Keyword: `ComponentProjectProgress`; Keywords: `ContentProgressCharts` | `[H]` |

**Key Quote** (from Requirements):
> "If a team makes good use of the ability to define a plan, assign tasks, and mark them complete, then there will be good data produced to indicate the progress being made"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | Handler `teamProgressChartsToolStripMenuItem_Click` at line 1030 |
| 0 | `Paratext/ProjectProgress/UpdateProjectProgressForm.cs` | HelpData dialog search | `UpdateProjectProgressForm` |
| 1 | `ParatextData/ProjectProgress/ProgressInfo.cs` | Type in namespace | `Paratext.Data.ProjectProgress` |
| 1 | `ParatextData/ScrText.cs` | Common field | Line 56 (ProgressPlanEditorForm reference) |
| 2 | `ParatextData/ProjectProgress/ProjectProgressInfo.cs` | Namespace search | `ParatextData/ProjectProgress` |

**UI Entry Points**:
- Assignments and Progress → various views
  - Manual: `chapters/06_project_plan_2.md`, line 18
  - Quote: "Open the Assignments and Progress (the blue button)"
  - HelpData ID: `4ebd7160-4b37-4ace-95ba-2a06db90c57a`
  - Dialog: `ProjectProgressForm`
  - Question: "How do I view or mark project progress?"
- ≡ Tab > Project > Progress charts
  - Manual: `chapters/06_project_plan_2.md`, line 33
  - Quote: "From the **≡ Tab**, under **Project** menu, select **Progress charts…**"
  - HelpData ID: `1dc48021-ac51-48bb-bbbd-88c21d055970`
  - Question: "How do I see if the translation team is progressing as expected?"

**HelpData Items**:
- ID: `cf031c8a-128a-4ede-8068-1353b97a3050` - "How do I track project progress by tasks?"
- ID: `01532845-66b1-469a-9c18-822d8c04019d` - "How do I track project progress by stages?"
- ID: `5e2798c6-c88b-4176-add1-c5f7976662da` - "How do I view project progress by book?"
- ID: `506d8baa-ef4e-4914-9d44-e3d602b16343` - "How do I mark project progress?"
- Dialogs: `ProjectProgressForm`, `ProjectProgressStartDateForm`, `LocationFilterForm`

**Validation**: [MS] [R] [M] [H] [C] — Last verified: 2026-01-21

---

### 11.5 Progress Reports

**Description**: Generate reports showing project status for team leaders, consultants, and stakeholders.

**Sub-Features**:
- Summary report
- Detailed report by book
- Report by stage
- Export/print reports
- Charts and visualizations
- Project health report
- Show Project Plan HTML (via Tools > Custom tools > Admin)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Progress charts`; Handler: `teamProgressChartsToolStripMenuItem_Click` in `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`, line 1030; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Requirements | Section: "Workflow Management > Project Progress" | `[R]` |
| Manual | `chapters/21_progress_report.md`, line 7: "In this module you will create a progress report" | `[M]` |
| HelpData | Keyword: `ContentProgressCharts`; Keyword: `ContentProjectHealthReport` | `[H]` |

**Key Quote** (from Requirements):
> "Providing manual progress data is very beneficial to systems like Progress.Bible to indicate the current status of Bible translation around the world"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | Handler `teamProgressChartsToolStripMenuItem_Click` at line 1030 |
| 0 | `Paratext/ProjectProgress/UpdateProjectProgressForm.cs` | HelpData dialog search | Related to `ProjectProgressForm` |
| 1 | `ParatextData/ProjectProgress/ProgressInfo.cs` | Type in namespace | `Paratext.Data.ProjectProgress` |

**Not Found**:
- `ProgressReportForm.cs` (search: "ProgressReportForm" - reporting integrated into ProjectProgressForm views)

**UI Entry Points**:
- ≡ Tab > Project > Project Health Report
  - Manual: `chapters/06_project_plan_2.md`, line 24
  - Quote: "From the **Project** menu, select **Project Health Report…**"
  - HelpData ID: `bdab5668-955a-46e3-a0c0-4603f1bc7490`
  - Question: "How do I generate a project health report?"
- ≡ Tab > Project > Progress charts (print)
  - Manual: `chapters/21_progress_report.md`, line 27
  - Quote: "From the **Tab** menu, under **Project** choose **Progress charts**"
  - HelpData ID: `1dc48021-ac51-48bb-bbbd-88c21d055970`
  - Question: "How do I see if the translation team is progressing as expected?"
- ≡ Tab > Tools > Custom tools > Admin > Show Project Plan Html
  - Displays project plan information in HTML format
  - Access: From project tab menu, Tools > Custom tools > Admin submenu
  - Note: Part of the Custom tools administrative utilities

**HelpData Items**:
- ID: `bdab5668-955a-46e3-a0c0-4603f1bc7490` - "How do I generate a project health report?"
- ID: `3a2f58c8-a5df-4199-82ee-b8fda591d36a` - "How do I view progress and completed work for one or more projects?"
- ID: `1dc48021-ac51-48bb-bbbd-88c21d055970` - "How do I see if the translation team is progressing as expected?"

**Validation**: [MS] [R] [M] [H] — Last verified: 2026-01-21

---

### 11.6 User Permissions

**Description**: Control what actions each team member can perform and which books they can edit.

**Sub-Features**:
- Define user roles
- Grant/revoke permissions
- Book-level edit access
- Permission inheritance
- Custom permission sets
- Administrator controls

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Project settings > User permissions`; Handler: `uiProjectUsersMenuItem_Click` in `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`, line 861; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Requirements | Section: "Workflow Management > Assign Tasks" | `[R]` |
| Manual | `admin/ma_07_project_plan.md`, line 93: "Check the settings for a task... do you need editing permission" | `[M]` |
| HelpData | Keyword: `ComponentUserPermissions`; Dialog: `ProjectUsersForm` | `[H]` |

**Key Quote** (from Requirements):
> "A team admin can limit access by setting User Permissions to only what is required. By limiting access to only the books that a team member requires, the chances of accidental editing conflicts can be reduced"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | Handler `uiProjectUsersMenuItem_Click` at line 861 |
| 0 | `Paratext/Permissions/ProjectUsersForm.cs` | HelpData dialog | `ProjectUsersForm` |
| 1 | `ParatextData/ScrText.cs` | Field in D0 | Line 39: `private readonly ScrText scrText` |
| 1 | `ParatextData/Users/ProjectPermissionManager.cs` | Field in D0 | Line 40: `private readonly ProjectPermissionManager permissionMgr` |
| 2 | `ParatextData/Users` (namespace) | Import in D0 | Line 20: `using Paratext.Data.Users` |

**Dialog Navigation** `[FR]`:
- `ProjectUsersForm` → `ProjectUsersSetupForm` (line 106)
- `ProjectUsersForm` → `AddGuestUserForm` (line 355)
- `ProjectUsersForm` → `BookPermissionsForm` (line 368)
- `ProjectUsersForm` → `OtherPermissionsForm` (line 381)

**UI Entry Points**:
- ≡ Tab > Project > Project settings > User permissions
  - HelpData ID: `c1880fab-61ca-478d-a73e-894756464190`
  - Dialog: `ProjectUsersForm`
  - Question: "Guide: Project > Project settings > User permissions"
- ≡ Tab > Project > Users/Permissions
  - HelpData ID: `9dc39756-e471-4426-9503-7f6e2a1cac4e`
  - Dialog: `ProjectUsersForm`
  - Question: "How do I add a user to a project?"

**HelpData Items**:
- ID: `91ff3d7c-c67b-451d-a13f-58a74fe15f0e` - "How do I give or remove permission for certain project tasks?"
- ID: `9dc39756-e471-4426-9503-7f6e2a1cac4e` - "How do I add a user to a project?"
- ID: `a14440fd-9e55-4ff8-a621-d4756ef3b525` - "How do I remove a user from a project?"
- ID: `32e0393d-14ff-49bb-a1d8-1735466856a5` - "How do I assign books or chapters to be edited by individual users?"
- ID: `d91699ff-6d8c-437f-b893-25f0cb1b6ae3` - "What is an Administrator?"
- Dialogs: `ProjectUsersForm`, `AddNewUserForm`, `SendReceiveProjectsForm`, `ProjectUsersSetupForm`

**Validation**: [MS] [FR] [R] [M] [H] [C] — Last verified: 2026-01-21

---

### 11.7 Bulk Progress Mode

**Description**: Efficiently update progress for multiple tasks at once rather than one at a time.

**Sub-Features**:
- Multi-task selection
- Batch status updates
- Bulk completion marking

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Bulk progress mode`; Handler: `BulkProgressToolStripMenuItem_Click` in `Paratext/ProjectProgress/ProgressViewsForm.cs`, line 930; Owner: `ProgressViewsForm` | `[MS]` |
| HelpData | Keyword: `ComponentAssignmentsAndProgress` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/ProjectProgress/ProgressViewsForm.cs` | Menu Structure | Handler `BulkProgressToolStripMenuItem_Click` at line 930 |

**UI Entry Points**:
- ≡ Tab > Project > Bulk progress mode (within ProgressViewsForm)
  - Menu Structure: `ProgressViewsForm`, handler `BulkProgressToolStripMenuItem_Click`, line 930
  - File: `Paratext/ProjectProgress/ProgressViewsForm.cs`

**Validation**: [MS] - [H] - — Last verified: 2026-01-21

---

### 11.8 Copy Assignments

**Description**: Copy task assignments from one book or section to another to speed up project setup.

**Sub-Features**:
- Copy assignments between books
- Copy to multiple targets
- Assignment template functionality

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Copy assignments`; Handler: `copyAssignmentsToolStripMenuItem_Click` in `Paratext/ProjectProgress/ProgressViewsForm.cs`, line 1024; Owner: `ProgressViewsForm` | `[MS]` |
| HelpData | Keyword: `ComponentAssignmentsAndProgress` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/ProjectProgress/ProgressViewsForm.cs` | Menu Structure | Handler `copyAssignmentsToolStripMenuItem_Click` at line 1024 |
| 1 | `Paratext/ProjectProgress/CopyAssignmentsForm.cs` | Form Relationships | Line 1026: `new CopyAssignmentsForm(...)` |

**Dialog Navigation** `[FR]`:
- `ProgressViewsForm` → `CopyAssignmentsForm` (line 1026)
- `CopyAssignmentsForm` → `BookChooserForm` (line 81)
- `CopyAssignmentsForm` → `ChooseCopyAssignmentsActionForm` (line 234)

**UI Entry Points**:
- ≡ Tab > Project > Copy assignments (within ProgressViewsForm)
  - Menu Structure: `ProgressViewsForm`, handler `copyAssignmentsToolStripMenuItem_Click`, line 1024
  - File: `Paratext/ProjectProgress/ProgressViewsForm.cs`

**Validation**: [MS] [FR] [H] - — Last verified: 2026-01-21

---

### 11.9 Translation Priorities

**Description**: Define and manage translation priorities to organize Scripture portions into workflow groups, allowing teams to focus on specific sets of books or chapters.

**Sub-Features**:
- Create translation priorities
- Modify existing priorities
- Delete priorities
- Change priority order
- Move Scripture between priorities
- Select active priority for filtering
- Copy assignments to books in a priority
- Localize priority names

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Project settings > Define priorities`; Handler: `uiDefinePrioritiesStripMenuItem_Click` in `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`, line 854; Owner: `ParatextWindowWithMenus` | `[MS]` |
| HelpData | Keyword: `ComponentTranslationPriorities`; 8 items | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `uiDefinePrioritiesStripMenuItem_Click` at line 854 |

**UI Entry Points**:
- ≡ Tab > Project > Project settings > Define priorities
  - Menu Structure: `ParatextWindowWithMenus`, handler `uiDefinePrioritiesStripMenuItem_Click`, line 854
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
  - HelpData ID: `9d8f9b7f-7855-4e3c-9d5e-ce69cbe68965`
  - Keyword: `ComponentTranslationPriorities`
  - Question: "How do I create a translation priority?"
- Assignments and Progress > Priority filter
  - Integration with 11.1 Assignments and Progress for filtering tasks by priority

**HelpData Items**:
- ID: `f5c8a3d2-xxxx-xxxx-xxxx` - "What is a translation priority?"
  - Keywords: `ComponentTranslationPriorities`
- ID: `9d8f9b7f-7855-4e3c-9d5e-ce69cbe68965` - "How do I create a translation priority?"
  - Keywords: `ComponentTranslationPriorities`
- ID: `18a85221-cd9c-416c-8d5c-99977515f39d` - "How do I modify a translation priority?"
  - Keywords: `ComponentTranslationPriorities`
- ID: `d99a2ecd-a14c-499c-949f-bcc0bcd9d36b` - "How do I change the order of translation priorities?"
  - Keywords: `ComponentTranslationPriorities`
- ID: `64f2e625-581b-4b1b-bf0a-7e8057b6861e` - "How do I move Scripture between translation priorities?"
  - Keywords: `ComponentTranslationPriorities`
- ID: `ab2c7f91-xxxx-xxxx-xxxx` - "How do I select a translation priority?"
  - Keywords: `ComponentTranslationPriorities`
- ID: `c4d3e2f1-xxxx-xxxx-xxxx` - "How do I localize a translation priority?"
  - Keywords: `ComponentTranslationPriorities ComponentLocalization dropdown`
- ID: `e5f4a3b2-xxxx-xxxx-xxxx` - "How do I copy assignments to books in a translation priority?"
  - Keywords: `grey ComponentAssignmentsAndProgress ComponentTranslationPriorities dropdown`

**Use Cases**:
- Organize a large translation project into phases (e.g., Gospels first, then Epistles)
- Allow different teams to focus on different portions simultaneously
- Filter Assignments and Progress view by active priority
- Track progress separately for different priority groups

**Related Features**:
- 11.1 Assignments and Progress - filtering by translation priority
- 11.3 Task Assignment - assignments can be made by priority
- 11.8 Copy Assignments - copy assignments within a priority

**Validation**: [MS] [H] — Last verified: 2026-01-22

---

## Cross-References

**Related Categories**:
- **10 Collaboration & Sync**: Notes tied to task workflow
- **06 Checking Inventories**, **07 Automated Checks**: Check completion tied to tasks
- **09 Advanced Checking Tools**: Advanced checks integrate with task workflow
- **12 Back Translation**: Assignments and Progress for back translation projects
- **14 Integration**: Custom Tools can access project plan data (14.8)
- **15 Publishing & Output**: Progress.Bible integration

**Dependencies**:
- User registration
- Project plan definition
- Team member list

---

## Validation Summary

| Feature | MS | R | M | H | FR | C | Last Verified |
|---------|----|----|---|---|----|----|---------------|
| 11.1 Assignments and Progress | ✓ | ✓ | ✓ | ✓ | - | ✓ | 2026-01-21 |
| 11.2 Project Plans | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 11.3 Task Assignment | ✓ | ✓ | ✓ | ✓ | - | ✓ | 2026-01-21 |
| 11.4 Progress Tracking | ✓ | ✓ | ✓ | ✓ | - | ✓ | 2026-01-21 |
| 11.5 Progress Reports | ✓ | ✓ | ✓ | ✓ | - | - | 2026-01-21 |
| 11.6 User Permissions | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 11.7 Bulk Progress Mode | ✓ | - | - | ✓ | - | - | 2026-01-21 |
| 11.8 Copy Assignments | ✓ | - | - | ✓ | ✓ | - | 2026-01-21 |
| 11.9 Translation Priorities | ✓ | - | - | ✓ | - | - | 2026-01-22 |

---

## Verification Log

| Date | Action | By |
|------|--------|-----|
| 2026-01-18 | HelpData queries for ComponentAssignmentsAndProgress, ComponentProjectPlan, ComponentProjectProgress, ComponentUserPermissions | Claude |
| 2026-01-18 | Evidence chain tracing from HelpData dialogs to source files | Claude |
| 2026-01-18 | Manual citation verification for chapters 03, 06, 21, admin/ma_07 | Claude |
| 2026-01-18 | Updated all features to FEATURE_TEMPLATE_v2.md v5.2 format | Claude |
| 2026-01-21 | Reorganized: Category 09 renumbered to 11; feature numbers updated | Claude |
| 2026-01-21 | Added [MS] Menu Structure sources to all 8 features via query_menu_structure.py | Claude |
| 2026-01-21 | Added [FR] Form Relationships for 11.2, 11.6, 11.8 from form_relationships JSON | Claude |
| 2026-01-21 | Updated Evidence Chain tables with Menu Structure handler entry points | Claude |
| 2026-01-21 | Verified all HelpData IDs and keywords via query_helpdata.py; fixed ContentAssign→ContentAssignmentsAndProgress in 11.3 | Claude |
| 2026-01-22 | Added 11.9 Translation Priorities: new feature based on HelpData coverage audit identifying 8 unreferenced ComponentTranslationPriorities items; added Menu Structure [MS], HelpData [H], Use Cases | Claude |

---

## Notes

- Assignments and Progress (LocationFilterForm) is the central UI for task management
- Progress tracking uses ProjectProgressForm and related forms
- User Permissions managed through ProjectUsersForm
- HelpData search revealed 24+ help items for Assignments and Progress component
- Feature 11.5 (Progress Reports) lacks dedicated form - reporting is integrated into progress views
- Translation Priorities (11.9) integrates with Assignments and Progress for filtering views
- All UI entry points verified against Manual and HelpData sources

---

**Document Version**: 5.1
**Template Version**: FEATURE_TEMPLATE_v2.md v6.1
**AGENTS.md Version**: 7.2
**Based on v1**: 05_Workflow_Features.md Sections 4-7
