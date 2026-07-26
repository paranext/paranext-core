# Internet & Connectivity Settings UI — Design Spec

**Ticket:** PT-4235  
**Date:** 2026-07-25  
**Author:** Katherine Jensen (AI-assisted)

---

## Overview

Redesign the existing `paratext-registration` internet settings surface:

- New title, subtitle, and option labels
- Replace the `Select` dropdown with a radio list (5 options: 2 active, 3 coming-soon)
- Row-hover tooltips (full row, not just an icon)
- Confirm-restart dialog triggered by a "Done" button (not on radio selection)
- Developer-only collapsible section (server environment toggle)
- Profile popover rename + icon swap

**This is a standalone settings surface. It is NOT part of the first-run wizard (PT-4174).**  
The sub-components are designed to be portable so a future wizard step can reuse them without modifications.

---

## Scope

**In scope:**

- `extensions/src/paratext-registration/` — internet settings component, web view, localization, stories
- `src/renderer/components/user-profile-popover/` — label rename, icon swap, test update
- New unit tests and e2e tests

**Out of scope:**

- Proxy configuration UI
- First-run wizard integration (PT-4174 subtasks)
- PT9 migration interception ("Getting Started" handoff)
- New Storybook guidelines/documentation page for the apply-pattern principle

---

## Architecture

### File changes

```
extensions/src/paratext-registration/src/
├── components/
│   ├── grid.component.tsx                         (unchanged)
│   ├── registration-form-view.component.tsx       (unchanged)
│   ├── internet-access-option-list.component.tsx  NEW
│   ├── internet-access-option-list.stories.tsx    NEW
│   ├── internet-access-option-list.component.test.tsx  NEW
│   ├── developer-section.component.tsx            NEW
│   └── developer-section.component.test.tsx       NEW
├── internet-settings.component.tsx                UPDATED (orchestrator + inline ConfirmRestartDialog)
├── internet-settings.component.test.tsx           NEW
├── internet-settings.web-view.tsx                 UPDATED (new save flow)
├── internet-settings.stories.tsx                  UPDATED
└── contributions/localizedStrings.json            UPDATED

src/renderer/components/user-profile-popover/
├── user-profile-popover.component.tsx             UPDATED (label rename, icon swap)
└── user-profile-popover.test.tsx                  UPDATED (mock string update)

e2e-tests/tests/isolated/
└── internet-settings.spec.ts                      NEW
```

### Portability contract

The sub-components (`InternetAccessOptionList`, `DeveloperSection`) are **purely presentational** — no PAPI calls, no web-view dependencies. Different containers wire them to their respective data sources:

| Container                                         | Restart behavior                                                |
| ------------------------------------------------- | --------------------------------------------------------------- |
| `internet-settings.web-view.tsx` (this ticket)    | Save setting → `platform.restart` immediately after 5 s         |
| Future wizard step container (not in this ticket) | Save setting → advance wizard step → restart once at wizard end |

This means calling `setParatextDataInternetSettings` and `platform.restart` remain independent operations; the wizard defers the restart to its final step.

---

## Component Breakdown

### `InternetAccessOptionList`

```typescript
type InternetAccessOptionListProps = {
  localizedStrings: LanguageStrings;
  value: InternetUse;
  onChange: (v: InternetUse) => void;
  disabled: boolean;
};
```

Renders a `RadioGroup` with 5 rows in this order:

| #   | Label                                             | Value                                                    | State                  |
| --- | ------------------------------------------------- | -------------------------------------------------------- | ---------------------- |
| 1   | Unrestricted                                      | `'Enabled'`                                              | Active                 |
| 2   | Disable access to some Bible translation services | `'VpnRequired'`                                          | Active                 |
| 3   | Block internet in Paratext app                    | `'Disabled'`                                             | Coming soon (disabled) |
| 4   | Block internet when in sensitive locations        | `'BlockInSensitiveLocations'` (display-only placeholder) | Coming soon (disabled) |
| 5   | Configure proxy                                   | `'ProxyOnly'`                                            | Coming soon (disabled) |

Each row has a `Tooltip` that appears on hover over the entire row (not just an icon). Tooltip copy is specified per option in `localizedStrings`; exact copy to be confirmed from the UX mockup at https://v0.app/paratext-ux/chat/internet-access-settings-v2-yM1tTN32DIp.

Options 3–5 render as `disabled` `RadioGroupItem`s with a "Coming soon" badge. If the current value from PT9 migration is one of these, the row renders selected-but-disabled (no special handling needed here — the Getting Started flow handles the interception).

Footer text below the group: "Disabled options are planned for future updates."

Option 2 wording is intentionally "some" — it only gates Registry / Send-Receive / DBL, not all services. Do not change to "all" or "specific."

### `DeveloperSection`

```typescript
type DeveloperSectionProps = {
  localizedStrings: LanguageStrings;
  selectedServer: ServerType;
  onServerChange: (s: ServerType) => void;
  disabled: boolean;
};
```

Renders a clickable "Developer only" header with a chevron. Collapsed by default (collapse state is `useState` local to this component).

When expanded: a two-item toggle for **Production** / **Development** only. QA and Test values exist in `ServerType` but are not surfaced in this UI.

### `ConfirmRestartDialog` (inlined in `InternetSettingsForm`)

Not extracted to its own file — only used once and its `open` state is managed by the form. Renders a `Dialog` with:

- Title: "Restart to apply changes?"
- Description: _(UX copy needed)_
- "Restart Now" button (primary)
- "Don't restart" button (secondary/ghost)

### `InternetSettingsForm` (updated)

```typescript
type InternetSettingsFormProps = {
  localizedStrings: LanguageStrings;
  internetSettings: InternetSettings; // staged (user-edited)
  savedInternetSettings: InternetSettings | undefined; // last persisted (change detection)
  onInternetSettingsChange: (s: InternetSettings) => void;
  isFormDisabled: boolean;
  saveState: SaveState; // drives the restarting/success alert
  saveError: string;
  onSaveAndRestart: () => void; // fired by "Restart Now"
  onCloseWithoutSaving: () => void; // fired by "Done" (no changes) OR "Don't restart"
};
```

Removed from current props: `isSaveDisabled`, old `onSaveAndRestart`.  
Manages `isConfirmDialogOpen: boolean` locally.  
Computes `hasUnsavedChanges = !deepEqual(internetSettings, savedInternetSettings)`.

Render layout (top to bottom):

1. Title: "Internet & Connectivity"
2. Subtitle: "Manage how Paratext accesses the internet. These settings only apply to the Paratext app, not the rest of your computer."
3. `InternetAccessOptionList`
4. `DeveloperSection`
5. Save error alert (if `saveError` set)
6. Restarting/success alert (if `saveState === IsRestarting || HasSaved`)
7. "Done" button (right-aligned)
8. `ConfirmRestartDialog` (Dialog, controlled by `isConfirmDialogOpen`)

---

## Interaction Flow

```
Web view opens
  → fetch savedInternetSettings via PAPI
  → set staged internetSettings = savedInternetSettings

User selects an option row
  → onInternetSettingsChange updates staged internetSettings
  → hasUnsavedChanges = !deepEqual(staged, saved)

User clicks "Done"
  ├── no changes → onCloseWithoutSaving() → web view self-closes (DOM walk)
  └── changes    → setIsConfirmDialogOpen(true)
                     │
                     ├── "Restart Now"
                     │     → setSaveState(IsSaving)
                     │     → save settings via PAPI
                     │     → setSaveState(IsRestarting)
                     │     → schedule platform.restart after 5 s
                     │
                     └── "Don't restart"
                           → setIsConfirmDialogOpen(false)
                           → onCloseWithoutSaving()
                           → web view self-closes (staged changes discarded)

User clicks tab X button (rc-dock close)
  → web view closes without dialog (staged changes discarded silently)
  → this is intentional for this ticket; wizard context has no X button
```

---

## Profile Popover Changes

**`user-profile-popover.component.tsx`:**

- `<Globe className="tw:size-3.5" />` (Language row, line ~361) → `<Languages className="tw:size-3.5" />` — update import from `lucide-react`
- The "Network" button label is driven by `%userProfile_networkSettings%`; update the localization value to "Internet and connectivity" (no code change, just the string file)

**`user-profile-popover.test.tsx`:**

- Update mock sentinel for `%userProfile_networkSettings%` to `'Internet and connectivity row'`

---

## Localization Changes

**`extensions/src/paratext-registration/contributions/localizedStrings.json`**

Updated values (existing keys):
| Key | New English value |
|---|---|
| `%internetSettings_webView_title%` | "Internet & Connectivity" |
| `%paratextRegistration_description_internetUse_option_Enabled%` | "Unrestricted" |
| `%paratextRegistration_description_internetUse_option_VpnRequired%` | "Disable access to some Bible translation services" |

The language locale for "Network" / "Internet and connectivity" is in whichever platform localization file owns `%userProfile_networkSettings%` — locate during implementation.

New keys (English only; add Spanish translations following existing `es` pattern):
| Key | English value |
|---|---|
| `%internetSettings_webView_subtitle%` | "Manage how Paratext accesses the internet. These settings only apply to the Paratext app, not the rest of your computer." |
| `%paratextRegistration_internetUse_comingSoon%` | "Coming soon" |
| `%paratextRegistration_internetUse_footer%` | "Disabled options are planned for future updates." |
| `%paratextRegistration_tooltip_internetUse_Enabled%` | _(UX copy from mockup)_ |
| `%paratextRegistration_tooltip_internetUse_VpnRequired%` | _(UX copy from mockup)_ |
| `%paratextRegistration_tooltip_internetUse_Disabled%` | _(UX copy from mockup)_ |
| `%paratextRegistration_tooltip_internetUse_BlockSensitiveLocations%` | _(UX copy from mockup)_ |
| `%paratextRegistration_tooltip_internetUse_ProxyOnly%` | _(UX copy from mockup)_ |
| `%paratextRegistration_button_done%` | "Done" |
| `%paratextRegistration_dialog_confirmRestart_title%` | "Restart to apply changes?" |
| `%paratextRegistration_dialog_confirmRestart_description%` | _(UX copy from mockup)_ |
| `%paratextRegistration_dialog_confirmRestart_restartNow%` | "Restart Now" |
| `%paratextRegistration_dialog_confirmRestart_dontRestart%` | "Don't restart" |
| `%paratextRegistration_developer_section_label%` | "Developer only" |

Server environment labels reuse existing keys:

- Production → `%paratextRegistration_label_serverType_option_Production%`
- Development → `%paratextRegistration_label_serverType_option_Development%`

---

## Storybook Stories

### `components/internet-access-option-list.stories.tsx` (new)

| Story                | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| `Unrestricted`       | Option 1 (`Enabled`) selected                                          |
| `DisabledAccess`     | Option 2 (`VpnRequired`) selected                                      |
| `ComingSoonSelected` | A coming-soon value is the current setting (row selected but disabled) |
| `FormDisabled`       | `disabled={true}` — all rows non-interactive                           |

### `internet-settings.stories.tsx` (updated)

| Story                      | Status                                                              |
| -------------------------- | ------------------------------------------------------------------- |
| `Default`                  | Updated — new radio list, Unrestricted selected, Done button        |
| `DisabledAccessSelected`   | New — option 2 selected                                             |
| `ConfirmDialogOpen`        | New — confirm-restart dialog visible                                |
| `DeveloperSectionExpanded` | New — developer section open, Production/Development toggle visible |
| `Restarting`               | Keep — form disabled, restarting alert                              |
| `SaveError`                | Keep — error alert                                                  |

---

## Tests

### Unit — `components/internet-access-option-list.component.test.tsx`

| Test                              | Assertion                                                        |
| --------------------------------- | ---------------------------------------------------------------- |
| All 5 rows render                 | All 5 labels in the DOM                                          |
| Active row click fires `onChange` | Clicking Enabled/VpnRequired calls `onChange` with correct value |
| Coming-soon row click is a no-op  | `onChange` not called for disabled rows                          |
| `disabled` prop disables all rows | No rows fire `onChange`                                          |
| Coming-soon badge on rows 3–5     | Badge text present on correct rows                               |
| Footer text renders               | "Disabled options are planned for future updates."               |

### Unit — `components/developer-section.component.test.tsx`

| Test                                     | Assertion                         |
| ---------------------------------------- | --------------------------------- |
| Collapsed by default                     | Server toggle not in DOM          |
| Header click expands                     | Toggle becomes visible            |
| Header click again collapses             | Toggle hidden                     |
| Production selected by default           | Production item `data-state="on"` |
| Development click fires `onServerChange` | Called with `'Development'`       |
| `disabled` prop disables toggle          | Toggle not interactive            |

### Unit — `internet-settings.component.test.tsx`

| Test                                            | Assertion                                        |
| ----------------------------------------------- | ------------------------------------------------ |
| Done with no changes → no dialog                | `onCloseWithoutSaving` called; dialog not in DOM |
| Done with changes → dialog opens                | Confirm dialog appears                           |
| Dialog "Restart Now" → `onSaveAndRestart`       | Callback fired; dialog closes                    |
| Dialog "Don't restart" → `onCloseWithoutSaving` | Callback fired; dialog closes                    |
| `SaveState.IsRestarting` → alert visible        | Restarting alert in DOM                          |
| `saveError` set → error alert visible           | Destructive alert in DOM                         |

### E2E — `e2e-tests/tests/isolated/internet-settings.spec.ts`

| Test                                    | What it exercises                                                                                                 |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Open via profile popover                | Profile button → "Internet and connectivity" → web view opens with "Internet & Connectivity" heading and subtitle |
| Five option rows render                 | 2 active radio rows + 3 disabled rows with "Coming soon" badges                                                   |
| Select option 2 + Done → confirm dialog | Dialog shows "Restart Now" and "Don't restart"                                                                    |
| "Don't restart" → dismisses cleanly     | Dialog closes, web view closes, no restart                                                                        |
| Tooltip on row hover                    | Hover active row → tooltip appears                                                                                |
| Developer section expands on click      | Hidden by default; toggle visible after header click                                                              |

"Restart Now" is **not** exercised in e2e (triggers a real app restart). Unit test coverage on `onSaveAndRestart` callback is sufficient.

---

## Acceptance Criteria (from ticket)

- [ ] Menu item and page heading read "Internet & Connectivity"
- [ ] Profile popover "Network" item reads "Internet and connectivity"; Language icon updated to `lucide:languages`
- [ ] Subtitle present: "These settings only apply to the Paratext app, not the rest of your computer."
- [ ] Options in order: Unrestricted → Disable access to some Bible translation services → Block internet in Paratext app → Block internet when in sensitive locations → Configure proxy
- [ ] Option 2 reads exactly "Disable access to some Bible translation services"
- [ ] Options 3–5 visibly disabled with "Coming soon" treatment; footer note present
- [ ] Tooltip appears on hover over the full row (not just an icon)
- [ ] Confirm dialog appears on Done button click (only when settings changed): "Restart Now" / "Don't restart"
- [ ] "Developer only" collapsible section with Production/Development toggle; collapsed by default

---

## Open Items

1. **Tooltip copy** — 5 tooltip strings need final copy from the UX mockup (v0.app link in ticket). Use placeholder strings during development.
2. **Confirm dialog description** — short explanation text needs UX copy.
3. **`%userProfile_networkSettings%` location** — find which platform localization file owns this key during implementation.
4. **Spanish translations** — add `es` entries for all new localization keys.
5. **Proxy settings card** — the existing proxy settings card (shown when `permittedInternetUse === 'ProxyOnly'`) is not referenced in the ticket. The new design's radio list makes it unreachable via normal UI (ProxyOnly is coming-soon/disabled). Confirm during implementation whether to remove the card entirely or leave it hidden for graceful PT9 fallback.
