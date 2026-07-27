# Internet Settings Wizard Step — Design Spec

**Ticket:** PT-4235 (addendum)
**Date:** 2026-07-26
**Author:** Katherine Jensen (AI-assisted)

---

## Overview

Add an Internet Settings step to the first-run setup wizard so users can configure internet access
before completing Paratext registration. The step reuses the presentational sub-components built
in PT-4235 by moving them to `lib/platform-bible-react/` (the shared component library), where
both the standalone settings web view and the new wizard step can import them.

**This is NOT part of the original PT-4235 standalone settings surface spec.**
That spec's portability contract (`InternetAccessOptionList` and `DeveloperSection` are purely
presentational, no PAPI calls) was designed to enable exactly this integration.

---

## Scope

**In scope:**

- Move `InternetAccessOptionList` and `DeveloperSection` from the extension to
  `lib/platform-bible-react/src/components/advanced/`
- Update the extension's import paths
- Move the unit tests for both components with them
- Add `'internetSettings'` to the wizard step model and shell
- New wizard step component: `internet-settings-step.component.tsx`
- Unit tests and a Storybook story for the new step
- Shell test updates for the step count change (4 → 5)

**Out of scope:**

- Any changes to the standalone internet settings web view behavior
- First-run wizard e2e tests (owned by PT-4174)
- The confirm-restart dialog (not needed in wizard context)
- The Done button (the shell provides Next)

---

## Architecture

### File changes

```
lib/platform-bible-react/src/components/advanced/
├── internet-access-option-list.component.tsx   MOVED FROM extension
└── developer-section.component.tsx             MOVED FROM extension

lib/platform-bible-react/src/
└── index.ts                                    UPDATED (export both components)

extensions/src/paratext-registration/src/
├── components/
│   ├── internet-access-option-list.component.tsx       REMOVED
│   ├── developer-section.component.tsx                 REMOVED
│   ├── internet-access-option-list.component.test.tsx  MOVED to platform-bible-react
│   └── developer-section.component.test.tsx            MOVED to platform-bible-react
│   (stories stay in extension — they use extension-specific localization mock data)
└── internet-settings.component.tsx             UPDATED (import path → platform-bible-react)

src/renderer/services/
└── first-run.model.ts                          UPDATED (add 'internetSettings' to FirstRunStep)

src/renderer/components/first-run/
├── first-run-shell.component.tsx               UPDATED (STEP_ORDER + DEFAULT_STEP_COMPONENTS)
└── steps/
    ├── internet-settings-step.component.tsx    NEW
    └── internet-settings-step.stories.tsx      NEW
    internet-settings-step.component.test.tsx   NEW
```

### Why `advanced/`

`lib/platform-bible-react/src/components/advanced/` already holds domain-specific reusable
components (inventory, settings-components, project-selector, etc.). `InternetAccessOptionList`
and `DeveloperSection` are domain-specific but share no extension-specific imports — they only
use `platform-bible-react`, `platform-bible-utils`, and React. `advanced/` is the correct home.

---

## Wizard Flow

```
language → internetSettings (NEW) → identify [restart] → syncConsent → syncProgress
```

The identify step (PT-4177) saves registration and restarts the app. Because internet settings
is saved before identify runs, the restart applies the new network setting naturally. No second
restart is needed from the internet settings step.

**Resume after identify restart:** The reducer routes to `syncConsent` when
`wizardActive = true` and `registrationValidity = 'valid'`. This correctly skips
`language`, `internetSettings`, and `identify` — no reducer changes needed.

**Back button floor:** The shell's `entryIndex` already prevents backing into pre-restart
steps on resume — no changes needed.

---

## Component Move

`InternetAccessOptionList` and `DeveloperSection` source is **unchanged**. Both are purely
presentational (no PAPI calls, no web-view-specific imports). Moving them requires:

1. Relocate files to `lib/platform-bible-react/src/components/advanced/`
2. Export from `lib/platform-bible-react/src/index.ts`
3. Update the extension's `internet-settings.component.tsx` import path
4. Relocate unit test files alongside the components

Stories remain in `extensions/src/paratext-registration/src/components/` — they use
extension-specific localization strings as mock data and are appropriate in that context.

---

## Model and Shell Changes

### `first-run.model.ts`

```typescript
export type FirstRunStep =
  | 'language'
  | 'internetSettings' // ← new
  | 'identify'
  | 'syncConsent'
  | 'syncProgress';
```

### `first-run-shell.component.tsx`

```typescript
export const STEP_ORDER: FirstRunStep[] = [
  'language',
  'internetSettings', // ← new, before identify
  'identify',
  'syncConsent',
  'syncProgress',
];

export const DEFAULT_STEP_COMPONENTS: Record<FirstRunStep, ComponentType<FirstRunStepProps>> = {
  language: LanguagePlaceholderStep,
  internetSettings: InternetSettingsStep, // ← new
  identify: IdentifyPlaceholderStep,
  syncConsent: SyncConsentPlaceholderStep,
  syncProgress: SyncProgressPlaceholderStep,
};
```

The step indicator string (`"Step X of 5"`) derives from `STEP_ORDER.length` and updates
automatically.

No skip button for this step — the existing `onSkip` is only wired when `step === 'syncConsent'`.

---

## Wizard Step Component

**File:** `src/renderer/components/first-run/steps/internet-settings-step.component.tsx`

**Apply model:** Immediate apply. Each radio selection or server toggle saves to PAPI the moment
it changes. This is the apply-model default and the only option that works correctly with the
shell: the footer Next button calls `goToStep` directly and cannot be intercepted for async work.

### Props

| Prop            | Usage                                                                            |
| --------------- | -------------------------------------------------------------------------------- |
| `setCanProceed` | `false` during load and when a save has failed; `true` otherwise                 |
| `onNext`        | Not called by the step (the shell's footer Next drives advancement)              |
| `onBack`        | Not used by the step — the shell's footer Back button drives navigation directly |

### Lifecycle

1. **Mount** → `setCanProceed(false)`, call
   `paratextRegistration.getParatextDataInternetSettings()` via PAPI
2. **Fetch resolves** → `setCanProceed(true)`, render `InternetAccessOptionList` and
   `DeveloperSection` with loaded values
3. **Fetch fails** → show inline error alert with a Retry button; `setCanProceed(false)` stays
   until a retry succeeds
4. **User changes a selection** → call `paratextRegistration.setParatextDataInternetSettings()`
   immediately
   - On success: clear any previous error, `setCanProceed(true)`
   - On failure: show inline error alert, `setCanProceed(false)` until the next successful save
5. **Footer Next** → shell advances to `identify`; no save needed from the step

### What is NOT in the wizard step (vs. standalone web view)

- No confirm-restart dialog — no restart is triggered by this step
- No Done button — the shell provides Next
- No restarting/success alert — not applicable here
- No save-error `saveState` enum — state is simpler: loading / ready / saveError

### Localization

The step calls `useLocalizedStrings` with the `INTERNET_SETTINGS_STRING_KEYS` array exported
from `internet-settings.component.tsx` (same keys as the standalone view). No new localization
keys needed.

---

## Tests

### Unit — moved with components to `lib/platform-bible-react/`

`internet-access-option-list.component.test.tsx` and `developer-section.component.test.tsx`
move unchanged. No new tests needed for the components themselves.

### Unit — `internet-settings-step.component.test.tsx` (new)

| Test                                        | Assertion                                                           |
| ------------------------------------------- | ------------------------------------------------------------------- |
| Next disabled during initial load           | `setCanProceed(false)` called; Next button has `disabled` attribute |
| Fetch failure → error + retry button        | Error alert and Retry button in DOM; Next stays disabled            |
| Retry succeeds → options rendered           | Error alert gone; Next enabled                                      |
| Next enabled after fetch resolves           | `setCanProceed(true)` called                                        |
| Selection change saves immediately          | `setParatextDataInternetSettings` called on radio change            |
| Save error → Next disabled + error alert    | `setCanProceed(false)` called; error message in DOM                 |
| Successful save after error → error cleared | Error alert gone; `setCanProceed(true)` called                      |

### Unit — `first-run-shell.component.test.tsx` (updated)

Update step count assertions from 4 → 5. Add `internetSettings` to any step-order tests.

### Stories — `internet-settings-step.stories.tsx` (new)

| Story         | Description                              |
| ------------- | ---------------------------------------- |
| `Loading`     | `canProceed = false`, spinner / skeleton |
| `Default`     | Unrestricted selected, Next enabled      |
| `VpnRequired` | Option 2 selected                        |
| `SaveError`   | Error alert shown, Next disabled         |

No new e2e tests — wizard e2e is owned by PT-4174.

---

## Acceptance Criteria

- [ ] `InternetAccessOptionList` and `DeveloperSection` exported from `platform-bible-react`
- [ ] Extension imports updated; extension behavior unchanged
- [ ] Wizard shows 5 steps; internet settings appears before identify (registration)
- [ ] Step loads current setting and disables Next during fetch
- [ ] Selecting a radio option immediately persists the change via PAPI
- [ ] Save error shows inline alert and disables Next until next successful save
- [ ] No confirm-restart dialog; no Done button
- [ ] Identify step restart (triggered by PT-4177) applies the saved internet setting
- [ ] Resume after restart correctly lands at `syncConsent`, skipping internet settings
