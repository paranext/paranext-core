# Internet Settings Wizard Step — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an `internetSettings` wizard step before `identify` in the first-run wizard, reusing the `InternetAccessOptionList` and `DeveloperSection` components by promoting them to `lib/platform-bible-react/`.

**Architecture:** Move the two presentational sub-components to `lib/platform-bible-react/src/components/advanced/` (removing their `paratext-registration` type imports, replacing with local type aliases that are structurally identical). The renderer-side wizard step component imports both components and the PAPI command helper from `@shared/services/command.service`. Changes apply immediately on selection change (immediate-apply model) with a single-in-flight save guard to prevent race conditions.

**Tech Stack:** TypeScript, React, Vitest, `@testing-library/react`, `platform-bible-react`, `platform-bible-utils`, `@renderer/hooks/papi-hooks`, `@shared/services/command.service`.

## Global Constraints

- All new files must use Tailwind with the `tw:` prefix (ESLint enforces this).
- No hardcoded display strings in JSX — all user-visible text comes from `localizedStrings` (ESLint `no-hardcoded-jsx-strings`).
- No `eslint-disable` or `@ts-ignore` without an explanation comment; use `@ts-expect-error` if TypeScript suppression is truly needed.
- No type assertions (`as Foo`) unless genuinely unavoidable; justify inline.
- Run commands from the repo root (`c:\Users\kathe\paranext-core\.claude\worktrees\pt-4235-internet-settings`) unless otherwise noted.
- TDD for all logic: write the failing test first, then implement.
- Commit after each task passes its test run.
- Inside `lib/platform-bible-react/`, import shadcn primitives via the `@/` path alias (`@/components/shadcn-ui/...`, `@/utils/shadcn-ui/utils`), **never** from `'platform-bible-react'` itself — the latter would be a circular self-reference.

---

## File Map

| File                                                                                                                             | Action                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `lib/platform-bible-react/src/components/advanced/internet-access-option-list/internet-access-option-list.component.tsx`         | MOVED from extension (local type alias replaces extension import; `@/` aliases replace `platform-bible-react` imports) |
| `lib/platform-bible-react/src/components/advanced/internet-access-option-list/internet-access-option-list.component.test.tsx`    | MOVED from extension (import path updated)                                                                             |
| `lib/platform-bible-react/src/components/advanced/developer-section/developer-section.component.tsx`                             | MOVED from extension (local type alias replaces extension import; `@/` aliases replace `platform-bible-react` imports) |
| `lib/platform-bible-react/src/components/advanced/developer-section/developer-section.component.test.tsx`                        | MOVED from extension (import path updated)                                                                             |
| `lib/platform-bible-react/src/index.ts`                                                                                          | UPDATED — export both components                                                                                       |
| `extensions/src/paratext-registration/src/components/internet-access-option-list/internet-access-option-list.component.tsx`      | DELETED (after verification in Task 3)                                                                                 |
| `extensions/src/paratext-registration/src/components/internet-access-option-list/internet-access-option-list.component.test.tsx` | DELETED (after verification in Task 3)                                                                                 |
| `extensions/src/paratext-registration/src/components/internet-access-option-list/internet-access-option-list.stories.tsx`        | UPDATED — import path → `platform-bible-react`                                                                         |
| `extensions/src/paratext-registration/src/components/developer-section/developer-section.component.tsx`                          | DELETED (after verification in Task 3)                                                                                 |
| `extensions/src/paratext-registration/src/components/developer-section/developer-section.component.test.tsx`                     | DELETED (after verification in Task 3)                                                                                 |
| `extensions/src/paratext-registration/src/components/developer-section/developer-section.stories.tsx`                            | UPDATED — import path → `platform-bible-react`                                                                         |
| `extensions/src/paratext-registration/src/internet-settings.component.tsx`                                                       | UPDATED — imports from `platform-bible-react`                                                                          |
| `extensions/src/paratext-registration/contributions/localizedStrings.json`                                                       | UPDATED — add `%internetSettings_button_retry%` (EN + ES)                                                              |
| `src/renderer/services/first-run.model.ts`                                                                                       | UPDATED — add `'internetSettings'` to `FirstRunStep`                                                                   |
| `src/renderer/components/first-run/first-run-shell.component.tsx`                                                                | UPDATED — add step to `STEP_ORDER` + `DEFAULT_STEP_COMPONENTS`                                                         |
| `src/renderer/components/first-run/first-run-shell.component.test.tsx`                                                           | UPDATED — fix navigation tests for 5-step flow; add InternetSettingsPlaceholder stub                                   |
| `src/renderer/components/first-run/steps/internet-settings-step.component.tsx`                                                   | NEW — wizard step                                                                                                      |
| `src/renderer/components/first-run/steps/internet-settings-step.component.test.tsx`                                              | NEW — unit tests                                                                                                       |
| `src/renderer/components/first-run/steps/internet-settings-step.stories.tsx`                                                     | NEW — Storybook stories                                                                                                |

---

## Task 1: Move `InternetAccessOptionList` to `platform-bible-react`

**Files:**

- Create: `lib/platform-bible-react/src/components/advanced/internet-access-option-list/internet-access-option-list.component.tsx`
- Create: `lib/platform-bible-react/src/components/advanced/internet-access-option-list/internet-access-option-list.component.test.tsx`
- Modify: `lib/platform-bible-react/src/index.ts`

**Interfaces:**

- Produces: `InternetAccessOptionList`, `InternetAccessOptionListProps`, `INTERNET_ACCESS_OPTION_LIST_STRING_KEYS` — exported from `platform-bible-react`

- [ ] **Step 1: Create the moved component file**

  Path: `lib/platform-bible-react/src/components/advanced/internet-access-option-list/internet-access-option-list.component.tsx`

  Copy the source from the extension with these changes:

  1. Remove `import { InternetUse } from 'paratext-registration'`; add a local type alias instead.
  2. Replace the `from 'platform-bible-react'` import with `@/` aliases — importing from the library's own barrel would be circular.

  ```tsx
  import { Badge } from '@/components/shadcn-ui/badge';
  import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
  import { cn } from '@/utils/shadcn-ui/utils';
  import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';

  // Local alias — identical string literals to the extension's InternetUse type.
  // Defined here so platform-bible-react does not depend on the paratext-registration
  // extension package.
  //
  // SYNC WARNING: Keep this alias identical to `InternetUse` in
  // extensions/src/paratext-registration/src/types/paratext-registration.d.ts
  // and the matching C# enum. Structural typing makes them mutually assignable today,
  // but divergence (e.g. C# adding a new value) will silently break the wizard step's
  // prop wiring. Update this alias whenever the authoritative type changes.
  type InternetUse = 'Enabled' | 'VpnRequired' | 'Disabled' | 'ProxyOnly';

  type OptionRow = {
    value: InternetUse | 'BlockInSensitiveLocations';
    labelKey: LocalizeKey;
    descriptionKey: LocalizeKey;
    isEnabled: boolean;
  };

  const OPTION_ROWS: OptionRow[] = [
    {
      value: 'Enabled',
      labelKey: '%paratextRegistration_description_internetUse_option_Enabled_2%',
      descriptionKey: '%paratextRegistration_description_internetUse_option_Enabled_details%',
      isEnabled: true,
    },
    {
      value: 'VpnRequired',
      labelKey: '%paratextRegistration_description_internetUse_option_VpnRequired_2%',
      descriptionKey: '%paratextRegistration_description_internetUse_option_VpnRequired_details%',
      isEnabled: true,
    },
    {
      value: 'Disabled',
      labelKey: '%paratextRegistration_description_internetUse_option_Disabled%',
      descriptionKey: '%paratextRegistration_description_internetUse_option_Disabled_details%',
      isEnabled: false,
    },
    {
      value: 'BlockInSensitiveLocations',
      labelKey: '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%',
      descriptionKey:
        '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%',
      isEnabled: false,
    },
    {
      value: 'ProxyOnly',
      labelKey: '%paratextRegistration_description_internetUse_option_ProxyOnly_2%',
      descriptionKey: '%paratextRegistration_description_internetUse_option_ProxyOnly_details%',
      isEnabled: false,
    },
  ];

  function isInternetUse(v: string): v is InternetUse {
    return OPTION_ROWS.some((row) => row.value !== 'BlockInSensitiveLocations' && row.value === v);
  }

  export const INTERNET_ACCESS_OPTION_LIST_STRING_KEYS: LocalizeKey[] = [
    ...OPTION_ROWS.flatMap((row) => [row.labelKey, row.descriptionKey]),
    '%paratextRegistration_internetUse_comingSoon%',
    '%paratextRegistration_internetUse_footer%',
  ];

  export type InternetAccessOptionListProps = {
    localizedStrings: LanguageStrings;
    value: InternetUse;
    onChange: (v: InternetUse) => void;
    disabled: boolean;
  };

  export function InternetAccessOptionList({
    localizedStrings,
    value,
    onChange,
    disabled,
  }: InternetAccessOptionListProps) {
    return (
      <div className="tw:flex tw:flex-col tw:gap-1">
        <RadioGroup
          value={value}
          onValueChange={(v) => {
            if (isInternetUse(v)) onChange(v);
          }}
          disabled={disabled}
        >
          {OPTION_ROWS.map((row) => (
            <div
              key={row.value}
              className={cn(
                'tw:flex tw:w-full tw:items-start tw:gap-2 tw:rounded tw:px-2 tw:py-1.5',
                !disabled && row.isEnabled && 'tw:hover:bg-accent',
              )}
            >
              <RadioGroupItem
                value={row.value}
                id={`internet-option-${row.value}`}
                disabled={disabled || !row.isEnabled}
                className="tw:mt-0.5"
              />
              <div className="tw:flex tw:flex-1 tw:flex-col">
                <div className="tw:flex tw:items-center tw:justify-between">
                  <label
                    htmlFor={`internet-option-${row.value}`}
                    aria-disabled={!row.isEnabled || undefined}
                    className={cn(
                      'tw:text-sm tw:font-medium',
                      row.isEnabled && !disabled
                        ? 'tw:cursor-pointer'
                        : 'tw:cursor-not-allowed tw:text-muted-foreground',
                    )}
                  >
                    {localizedStrings[row.labelKey]}
                  </label>
                  {!row.isEnabled && (
                    <Badge variant="muted">
                      {localizedStrings['%paratextRegistration_internetUse_comingSoon%']}
                    </Badge>
                  )}
                </div>
                <p className="tw:text-xs tw:text-muted-foreground">
                  {localizedStrings[row.descriptionKey]}
                </p>
              </div>
            </div>
          ))}
        </RadioGroup>
        <p className="tw:px-2 tw:text-xs tw:text-muted-foreground">
          {localizedStrings['%paratextRegistration_internetUse_footer%']}
        </p>
      </div>
    );
  }

  export default InternetAccessOptionList;
  ```

- [ ] **Step 2: Move the test file**

  Copy `extensions/src/paratext-registration/src/components/internet-access-option-list/internet-access-option-list.component.test.tsx` to `lib/platform-bible-react/src/components/advanced/internet-access-option-list/internet-access-option-list.component.test.tsx`.

  The test uses a relative import `from './internet-access-option-list.component'` — no import path change is needed. The test file also mocks `'platform-bible-react'` via a `vi.mock` factory. That mock must be updated to use the same targeted-stub pattern used in Task 4 (see below) so it does not trigger the circular-import issue. Specifically, replace any `importOriginal<typeof import('platform-bible-react')>()` spread with explicit stubs for `Badge`, `RadioGroup`, and `RadioGroupItem`.

  If the existing test already uses only direct stubs (no `importOriginal`), leave it as-is.

- [ ] **Step 3: Export from `lib/platform-bible-react/src/index.ts`**

  Add near the other advanced component exports (alphabetical placement, after `Inventory`):

  ```ts
  export {
    default as InternetAccessOptionList,
    INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
  } from './components/advanced/internet-access-option-list/internet-access-option-list.component';
  export type { InternetAccessOptionListProps } from './components/advanced/internet-access-option-list/internet-access-option-list.component';
  ```

- [ ] **Step 4: Run platform-bible-react tests to verify the component passes**

  ```bash
  npm test --workspace=lib/platform-bible-react -- --run
  ```

  Expected: all `InternetAccessOptionList` tests pass (same behavior, different file location).

- [ ] **Step 5: Commit**

  ```bash
  git add lib/platform-bible-react/src/components/advanced/internet-access-option-list/ lib/platform-bible-react/src/index.ts
  git commit -m "feat: move InternetAccessOptionList to platform-bible-react (PT-4235)"
  ```

---

## Task 2: Move `DeveloperSection` to `platform-bible-react`

**Files:**

- Create: `lib/platform-bible-react/src/components/advanced/developer-section/developer-section.component.tsx`
- Create: `lib/platform-bible-react/src/components/advanced/developer-section/developer-section.component.test.tsx`
- Modify: `lib/platform-bible-react/src/index.ts`

**Interfaces:**

- Produces: `DeveloperSection`, `DeveloperSectionProps`, `DEVELOPER_SECTION_STRING_KEYS` — exported from `platform-bible-react`

- [ ] **Step 1: Create the moved component file**

  Path: `lib/platform-bible-react/src/components/advanced/developer-section/developer-section.component.tsx`

  Copy source from the extension; remove `import { ServerType } from 'paratext-registration'`; add local alias; replace `from 'platform-bible-react'` with `@/` aliases:

  ```tsx
  import { ChevronDown } from 'lucide-react';
  import { Button } from '@/components/shadcn-ui/button';
  import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';
  import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
  import { useState } from 'react';

  // Local alias — identical string literals to the extension's ServerType type.
  // Defined here so platform-bible-react does not depend on the paratext-registration
  // extension package.
  //
  // SYNC WARNING: Keep this alias identical to `ServerType` in
  // extensions/src/paratext-registration/src/types/paratext-registration.d.ts
  // and the matching C# enum. Structural typing makes them mutually assignable today,
  // but divergence (e.g. C# adding a new value) will silently break the wizard step's
  // prop wiring. Update this alias whenever the authoritative type changes.
  type ServerType = 'Production' | 'QualityAssurance' | 'Development' | 'Test';

  export const DEVELOPER_SECTION_STRING_KEYS: LocalizeKey[] = [
    '%paratextRegistration_developer_section_label%',
    '%paratextRegistration_label_serverType_option_Production%',
    '%paratextRegistration_label_serverType_option_Development%',
  ];

  export type DeveloperSectionProps = {
    localizedStrings: LanguageStrings;
    selectedServer: ServerType;
    onServerChange: (s: ServerType) => void;
    disabled: boolean;
  };

  export function DeveloperSection({
    localizedStrings,
    selectedServer,
    onServerChange,
    disabled,
  }: DeveloperSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayValue = selectedServer === 'Development' ? 'Development' : 'Production';

    return (
      <div className="tw:border-t tw:pt-2">
        <Button
          variant="ghost"
          size="sm"
          disabled={disabled}
          aria-expanded={isExpanded}
          aria-controls="developer-section-content"
          className="tw:flex tw:w-full tw:items-center tw:justify-between tw:px-2 tw:font-normal tw:text-muted-foreground"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <span>{localizedStrings['%paratextRegistration_developer_section_label%']}</span>
          <ChevronDown
            className={`tw:size-4 tw:transition-transform${isExpanded ? 'tw:rotate-180' : ''}`}
          />
        </Button>
        <div id="developer-section-content" className="tw:mt-2 tw:px-2" hidden={!isExpanded}>
          <ToggleGroup
            type="single"
            value={displayValue}
            onValueChange={(v) => {
              if (v === 'Production' || v === 'Development') onServerChange(v);
            }}
            disabled={disabled}
          >
            <ToggleGroupItem
              value="Production"
              variant="outline"
              data-testid="server-type-production"
            >
              {localizedStrings['%paratextRegistration_label_serverType_option_Production%']}
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Development"
              variant="outline"
              data-testid="server-type-development"
            >
              {localizedStrings['%paratextRegistration_label_serverType_option_Development%']}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    );
  }

  export default DeveloperSection;
  ```

- [ ] **Step 2: Move the test file**

  Copy `extensions/src/paratext-registration/src/components/developer-section/developer-section.component.test.tsx` to `lib/platform-bible-react/src/components/advanced/developer-section/developer-section.component.test.tsx`.

  The test uses a relative import `from './developer-section.component'` — no import path change needed. Apply the same targeted-stub rule as Task 1 Step 2: if the existing test uses `importOriginal` when mocking `'platform-bible-react'`, replace with explicit stubs for `Button`, `ToggleGroup`, and `ToggleGroupItem` to avoid circular-module evaluation.

- [ ] **Step 3: Export from `lib/platform-bible-react/src/index.ts`**

  Add after the `InternetAccessOptionList` exports added in Task 1:

  ```ts
  export {
    default as DeveloperSection,
    DEVELOPER_SECTION_STRING_KEYS,
  } from './components/advanced/developer-section/developer-section.component';
  export type { DeveloperSectionProps } from './components/advanced/developer-section/developer-section.component';
  ```

- [ ] **Step 4: Run platform-bible-react tests**

  ```bash
  npm test --workspace=lib/platform-bible-react -- --run
  ```

  Expected: all `DeveloperSection` tests pass.

- [ ] **Step 5: Commit**

  ```bash
  git add lib/platform-bible-react/src/components/advanced/developer-section/ lib/platform-bible-react/src/index.ts
  git commit -m "feat: move DeveloperSection to platform-bible-react (PT-4235)"
  ```

---

## Task 3: Update extension to import from `platform-bible-react`; delete old component files

**Files:**

- Modify: `extensions/src/paratext-registration/src/internet-settings.component.tsx`
- Modify: `extensions/src/paratext-registration/src/components/internet-access-option-list/internet-access-option-list.stories.tsx`
- Modify: `extensions/src/paratext-registration/src/components/developer-section/developer-section.stories.tsx`
- Delete (after verification): `extensions/src/paratext-registration/src/components/internet-access-option-list/internet-access-option-list.component.tsx`
- Delete (after verification): `extensions/src/paratext-registration/src/components/internet-access-option-list/internet-access-option-list.component.test.tsx`
- Delete (after verification): `extensions/src/paratext-registration/src/components/developer-section/developer-section.component.tsx`
- Delete (after verification): `extensions/src/paratext-registration/src/components/developer-section/developer-section.component.test.tsx`

**Interfaces:**

- Consumes: `InternetAccessOptionList`, `INTERNET_ACCESS_OPTION_LIST_STRING_KEYS`, `DeveloperSection`, `DEVELOPER_SECTION_STRING_KEYS` from `platform-bible-react`

> **Order matters**: update imports and verify BEFORE deleting. If deletion happens first and the library exports are wrong, there is no in-tree fallback.

- [ ] **Step 1: Update `internet-settings.component.tsx` imports**

  In `extensions/src/paratext-registration/src/internet-settings.component.tsx`, replace the two local component imports with a single import from `platform-bible-react`:

  Remove:

  ```ts
  import {
    DeveloperSection,
    DEVELOPER_SECTION_STRING_KEYS,
  } from './components/developer-section/developer-section.component';
  import {
    InternetAccessOptionList,
    INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
  } from './components/internet-access-option-list/internet-access-option-list.component';
  ```

  Add (merge into the existing `platform-bible-react` import line at the top of the file, or add a new import):

  ```ts
  import {
    Alert,
    AlertDescription,
    AlertTitle,
    Button,
    DeveloperSection,
    DEVELOPER_SECTION_STRING_KEYS,
    InternetAccessOptionList,
    INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
    Spinner,
  } from 'platform-bible-react';
  ```

  No changes to JSX or prop passing — the component API is unchanged.

- [ ] **Step 2: Update stories imports**

  In `internet-access-option-list.stories.tsx`, change:

  ```ts
  import {
    InternetAccessOptionList,
    INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
    type InternetAccessOptionListProps,
  } from './internet-access-option-list.component';
  ```

  to:

  ```ts
  import {
    InternetAccessOptionList,
    INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
    type InternetAccessOptionListProps,
  } from 'platform-bible-react';
  ```

  In `developer-section.stories.tsx`, change:

  ```ts
  import { DeveloperSection, DEVELOPER_SECTION_STRING_KEYS } from './developer-section.component';
  ```

  to:

  ```ts
  import { DeveloperSection, DEVELOPER_SECTION_STRING_KEYS } from 'platform-bible-react';
  ```

  Note: the stories also import `InternetUse` and `ServerType` from `'paratext-registration'` — leave those as-is, they resolve fine in the extension's TypeScript project.

- [ ] **Step 3: Verify typecheck and extension tests BEFORE deleting originals**

  ```bash
  npm run typecheck
  npm test -- extensions/src/paratext-registration --run
  ```

  Expected: zero TypeScript errors, all extension tests pass. This verifies the new library exports are correct while the original files still exist as a safety net. If this step fails, fix the library exports (Tasks 1–2) before proceeding.

- [ ] **Step 4: Delete the old component and test files**

  ```bash
  git rm extensions/src/paratext-registration/src/components/internet-access-option-list/internet-access-option-list.component.tsx
  git rm extensions/src/paratext-registration/src/components/internet-access-option-list/internet-access-option-list.component.test.tsx
  git rm extensions/src/paratext-registration/src/components/developer-section/developer-section.component.tsx
  git rm extensions/src/paratext-registration/src/components/developer-section/developer-section.component.test.tsx
  ```

- [ ] **Step 5: Typecheck again to confirm deletion didn't break anything**

  ```bash
  npm run typecheck
  ```

  Expected: zero errors. If errors appear here, a remaining import still references the deleted files.

- [ ] **Step 6: Commit**

  ```bash
  git add extensions/src/paratext-registration/src/
  git commit -m "refactor: update extension to import InternetAccessOptionList and DeveloperSection from platform-bible-react (PT-4235)"
  ```

---

## Task 4: Write wizard step tests (TDD RED) and create stub component

**Files:**

- Create: `src/renderer/components/first-run/steps/internet-settings-step.component.tsx` (stub)
- Create: `src/renderer/components/first-run/steps/internet-settings-step.component.test.tsx`

**Interfaces:**

- Consumes: `FirstRunStepProps` from `../first-run-step-props.model`
- Produces: `InternetSettingsStep` component (stub initially)

- [ ] **Step 1: Create a stub component so the test file can import it**

  Path: `src/renderer/components/first-run/steps/internet-settings-step.component.tsx`

  ```tsx
  import type { FirstRunStepProps } from '../first-run-step-props.model';

  /** Stub — replaced in Task 5. */
  export function InternetSettingsStep(_props: FirstRunStepProps) {
    return null;
  }

  export default InternetSettingsStep;
  ```

- [ ] **Step 2: Write the test file**

  Path: `src/renderer/components/first-run/steps/internet-settings-step.component.test.tsx`

  ```tsx
  // @vitest-environment jsdom

  import { describe, it, expect, vi, beforeEach } from 'vitest';
  import { render, screen, waitFor } from '@testing-library/react';
  import '@testing-library/jest-dom';
  import userEvent from '@testing-library/user-event';
  import type { FirstRunStepProps } from '../first-run-step-props.model';
  import { InternetSettingsStep } from './internet-settings-step.component';

  // Return a resolved retry-key so the Retry button has an accessible name — avoids
  // getByRole('/retry/i') failing because an empty map yields undefined button text.
  vi.mock('@renderer/hooks/papi-hooks', () => ({
    useLocalizedStrings: vi.fn(() => [{ '%internetSettings_button_retry%': 'Retry' }, false]),
  }));

  const mockSendCommand = vi.fn();
  vi.mock('@shared/services/command.service', () => ({
    sendCommand: (...args: unknown[]) => mockSendCommand(...args),
  }));

  // Targeted stubs — do NOT use importOriginal spread here. Spreading the whole
  // platform-bible-react barrel evaluates shadcn/Radix components that require
  // ResizeObserver and a CSS import, which jsdom doesn't provide. Stub only what
  // InternetSettingsStep actually uses.
  vi.mock('platform-bible-react', () => ({
    Alert: ({ children, variant }: { children: React.ReactNode; variant?: string }) => (
      <div role="alert" data-variant={variant}>
        {children}
      </div>
    ),
    AlertDescription: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
    Button: ({
      children,
      onClick,
    }: {
      children: React.ReactNode;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
    }) => (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    ),
    Spinner: () => <div data-testid="spinner" />,
    InternetAccessOptionList: ({ onChange }: { onChange: (v: string) => void }) => (
      <button data-testid="option-list" type="button" onClick={() => onChange('Enabled')}>
        option list
      </button>
    ),
    DeveloperSection: ({ onServerChange }: { onServerChange: (s: string) => void }) => (
      <button data-testid="dev-section" type="button" onClick={() => onServerChange('Development')}>
        dev section
      </button>
    ),
    INTERNET_ACCESS_OPTION_LIST_STRING_KEYS: [],
    DEVELOPER_SECTION_STRING_KEYS: [],
  }));

  const MOCK_SETTINGS = {
    permittedInternetUse: 'VpnRequired' as const,
    selectedServer: 'Production' as const,
    proxyPort: 0,
  };

  function renderStep(setCanProceed = vi.fn()) {
    const props: FirstRunStepProps = { onNext: vi.fn(), setCanProceed };
    return { ...render(<InternetSettingsStep {...props} />), setCanProceed };
  }

  describe('InternetSettingsStep', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('disables Next during the initial fetch then enables it after fetch resolves', async () => {
      mockSendCommand.mockResolvedValue(MOCK_SETTINGS);
      const { setCanProceed } = renderStep();

      // Mount must call setCanProceed(false) before the async fetch
      expect(setCanProceed).toHaveBeenCalledWith(false);
      await waitFor(() => expect(setCanProceed).toHaveBeenCalledWith(true));
    });

    it('shows an error alert and retry button when the initial fetch fails', async () => {
      mockSendCommand.mockRejectedValue(new Error('network error'));
      renderStep();

      await waitFor(() => expect(screen.getByText(/network error/i)).toBeInTheDocument());
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });

    it('clears the error and enables Next when retry succeeds', async () => {
      mockSendCommand
        .mockRejectedValueOnce(new Error('network error'))
        .mockResolvedValue(MOCK_SETTINGS);
      const { setCanProceed } = renderStep();

      await waitFor(() =>
        expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument(),
      );
      await userEvent.click(screen.getByRole('button', { name: /retry/i }));

      await waitFor(() => expect(screen.queryByText(/network error/i)).not.toBeInTheDocument());
      expect(setCanProceed).toHaveBeenCalledWith(true);
    });

    it('calls setParatextDataInternetSettings immediately when a selection changes', async () => {
      mockSendCommand.mockResolvedValue(MOCK_SETTINGS);
      renderStep();

      await waitFor(() => expect(screen.getByTestId('option-list')).toBeInTheDocument());
      await userEvent.click(screen.getByTestId('option-list'));

      expect(mockSendCommand).toHaveBeenCalledWith(
        'paratextRegistration.setParatextDataInternetSettings',
        expect.objectContaining({ permittedInternetUse: 'Enabled' }),
      );
    });

    it('shows a save error alert and disables Next when a save fails', async () => {
      mockSendCommand
        .mockResolvedValueOnce(MOCK_SETTINGS) // initial fetch succeeds
        .mockRejectedValue(new Error('save failed')); // all saves fail
      const { setCanProceed } = renderStep();

      await waitFor(() => expect(screen.getByTestId('option-list')).toBeInTheDocument());
      await userEvent.click(screen.getByTestId('option-list'));

      await waitFor(() => expect(screen.getByText(/save failed/i)).toBeInTheDocument());
      // setCanProceed(false) must be called after the failed save
      const calls = setCanProceed.mock.calls.map((c: [boolean]) => c[0]);
      expect(calls.at(-1)).toBe(false);
    });

    it('clears the save error and re-enables Next when the next save succeeds', async () => {
      mockSendCommand
        .mockResolvedValueOnce(MOCK_SETTINGS) // initial fetch
        .mockRejectedValueOnce(new Error('save failed')) // first save fails
        .mockResolvedValue(MOCK_SETTINGS); // subsequent saves succeed
      const { setCanProceed } = renderStep();

      await waitFor(() => expect(screen.getByTestId('option-list')).toBeInTheDocument());
      await userEvent.click(screen.getByTestId('option-list')); // triggers failing save
      await waitFor(() => expect(screen.getByText(/save failed/i)).toBeInTheDocument());

      await userEvent.click(screen.getByTestId('dev-section')); // triggers succeeding save
      await waitFor(() => expect(screen.queryByText(/save failed/i)).not.toBeInTheDocument());
      expect(setCanProceed).toHaveBeenLastCalledWith(true);
    });
  });
  ```

- [ ] **Step 3: Run tests to confirm RED**

  ```bash
  npm test -- src/renderer/components/first-run/steps/internet-settings-step --run
  ```

  Expected: all 6 tests **FAIL** (stub returns null — renders nothing).

- [ ] **Step 4: Commit stub + tests**

  ```bash
  git add src/renderer/components/first-run/steps/internet-settings-step.component.tsx
  git add src/renderer/components/first-run/steps/internet-settings-step.component.test.tsx
  git commit -m "test: add failing tests for InternetSettingsStep wizard step (PT-4235)"
  ```

---

## Task 5: Implement wizard step + wire into shell (TDD GREEN)

**Files:**

- Modify: `src/renderer/components/first-run/steps/internet-settings-step.component.tsx` (full implementation)
- Modify: `extensions/src/paratext-registration/contributions/localizedStrings.json`
- Modify: `src/renderer/services/first-run.model.ts`
- Modify: `src/renderer/components/first-run/first-run-shell.component.tsx`
- Modify: `src/renderer/components/first-run/first-run-shell.component.test.tsx`

**Interfaces:**

- Consumes: `InternetAccessOptionList`, `DeveloperSection`, `INTERNET_ACCESS_OPTION_LIST_STRING_KEYS`, `DEVELOPER_SECTION_STRING_KEYS` from `platform-bible-react`; `InternetSettings` from `paratext-registration`; `sendCommand` from `@shared/services/command.service`; `useLocalizedStrings` from `@renderer/hooks/papi-hooks`
- Produces: `InternetSettingsStep` (fully implemented) wired into `DEFAULT_STEP_COMPONENTS`

- [ ] **Step 1: Add `%internetSettings_button_retry%` to `localizedStrings.json`**

  In `extensions/src/paratext-registration/contributions/localizedStrings.json`, add the new key to the English (`"en"`) and Spanish (`"es"`) locale blocks. Find where the other `%internetSettings_*` keys appear and add near them:

  In the `"en"` block, add:

  ```json
  "%internetSettings_button_retry%": "Retry",
  ```

  In the `"es"` block, add:

  ```json
  "%internetSettings_button_retry%": "Reintentar",
  ```

  Do not add a `"metadata"` entry — this key has no Paratext fallback equivalent.

- [ ] **Step 2: Implement the wizard step**

  Replace the stub in `src/renderer/components/first-run/steps/internet-settings-step.component.tsx`:

  ```tsx
  import type { InternetSettings } from 'paratext-registration';
  import {
    Alert,
    AlertDescription,
    Button,
    DeveloperSection,
    DEVELOPER_SECTION_STRING_KEYS,
    InternetAccessOptionList,
    INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
    Spinner,
  } from 'platform-bible-react';
  import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
  import { sendCommand } from '@shared/services/command.service';
  import { getErrorMessage, type LocalizeKey } from 'platform-bible-utils';
  import { useCallback, useEffect, useRef, useState } from 'react';
  import type { FirstRunStepProps } from '../first-run-step-props.model';

  const STRING_KEYS: LocalizeKey[] = [
    '%internetSettings_button_retry%',
    ...INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
    ...DEVELOPER_SECTION_STRING_KEYS,
  ];

  async function fetchInternetSettings() {
    return sendCommand('paratextRegistration.getParatextDataInternetSettings');
  }

  async function persistInternetSettings(settings: InternetSettings) {
    return sendCommand('paratextRegistration.setParatextDataInternetSettings', settings);
  }

  /**
   * First-run wizard step that lets the user configure internet access before registration. Saves
   * immediately on each selection change (immediate-apply model). The identify step's restart applies
   * the chosen setting — no second restart is needed here.
   *
   * Save concurrency: only one save is in flight at a time. A second selection while a save is
   * pending is ignored (the control is disabled). This prevents out-of-order saves from leaving
   * persisted state inconsistent with the displayed state.
   */
  export function InternetSettingsStep({ setCanProceed }: FirstRunStepProps) {
    const [localizedStrings] = useLocalizedStrings(STRING_KEYS);
    const [settings, setSettings] = useState<InternetSettings | undefined>();
    const [loadError, setLoadError] = useState('');
    const [saveError, setSaveError] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const isMounted = useRef(false);

    useEffect(() => {
      isMounted.current = true;
      return () => {
        isMounted.current = false;
      };
    }, []);

    const load = useCallback(async () => {
      setCanProceed?.(false);
      setLoadError('');
      try {
        const loaded = await fetchInternetSettings();
        if (!isMounted.current) return;
        setSettings(loaded);
        setCanProceed?.(true);
      } catch (err: unknown) {
        if (!isMounted.current) return;
        setLoadError(getErrorMessage(err));
      }
    }, [setCanProceed]);

    useEffect(() => {
      load();
    }, [load]);

    const handleChange = useCallback(
      async (next: InternetSettings) => {
        if (isSaving) return;
        setSettings(next);
        setSaveError('');
        setIsSaving(true);
        setCanProceed?.(false);
        try {
          await persistInternetSettings(next);
          if (!isMounted.current) return;
          setIsSaving(false);
          setCanProceed?.(true);
        } catch (err: unknown) {
          if (!isMounted.current) return;
          setIsSaving(false);
          setSaveError(getErrorMessage(err));
          setCanProceed?.(false);
        }
      },
      [setCanProceed, isSaving],
    );

    if (loadError) {
      return (
        <div className="tw:flex tw:flex-col tw:gap-4">
          <Alert variant="destructive">
            <AlertDescription>{loadError}</AlertDescription>
          </Alert>
          <Button variant="outline" onClick={load}>
            {localizedStrings['%internetSettings_button_retry%']}
          </Button>
        </div>
      );
    }

    if (!settings) {
      return (
        <div className="tw:flex tw:justify-center tw:py-8">
          <Spinner />
        </div>
      );
    }

    return (
      <div className="tw:flex tw:flex-col tw:gap-4">
        {saveError && (
          <Alert variant="destructive">
            <AlertDescription>{saveError}</AlertDescription>
          </Alert>
        )}
        <InternetAccessOptionList
          localizedStrings={localizedStrings}
          value={settings.permittedInternetUse}
          onChange={(v) => handleChange({ ...settings, permittedInternetUse: v })}
          disabled={isSaving}
        />
        <DeveloperSection
          localizedStrings={localizedStrings}
          selectedServer={settings.selectedServer}
          onServerChange={(s) => handleChange({ ...settings, selectedServer: s })}
          disabled={isSaving}
        />
      </div>
    );
  }

  export default InternetSettingsStep;
  ```

- [ ] **Step 3: Add `'internetSettings'` to the `FirstRunStep` type**

  In `src/renderer/services/first-run.model.ts`, change line 2:

  ```ts
  export type FirstRunStep =
    | 'language'
    | 'internetSettings'
    | 'identify'
    | 'syncConsent'
    | 'syncProgress';
  ```

- [ ] **Step 4: Wire the step into the shell**

  In `src/renderer/components/first-run/first-run-shell.component.tsx`:

  Add import (alphabetical with other step imports):

  ```ts
  import { InternetSettingsStep } from './steps/internet-settings-step.component';
  ```

  Update `STEP_ORDER`:

  ```ts
  export const STEP_ORDER: FirstRunStep[] = [
    'language',
    'internetSettings',
    'identify',
    'syncConsent',
    'syncProgress',
  ];
  ```

  Update `DEFAULT_STEP_COMPONENTS`:

  ```ts
  export const DEFAULT_STEP_COMPONENTS: Record<FirstRunStep, ComponentType<FirstRunStepProps>> = {
    language: LanguagePlaceholderStep,
    internetSettings: InternetSettingsStep,
    identify: IdentifyPlaceholderStep,
    syncConsent: SyncConsentPlaceholderStep,
    syncProgress: SyncProgressPlaceholderStep,
  };
  ```

- [ ] **Step 5: Update shell tests**

  In `src/renderer/components/first-run/first-run-shell.component.test.tsx`:

  The real `InternetSettingsStep` calls `sendCommand` (unmocked in shell tests) and renders Radix UI components requiring `ResizeObserver`. Override `internetSettings` with a lightweight stub in every test that navigates by Next/Back.

  Add a local stub near the top of the test file, before the `describe` block:

  ```ts
  function InternetSettingsPlaceholder() {
    return <p>Internet settings placeholder</p>;
  }
  ```

  **Test 1 — "advances through steps":** After inserting `internetSettings`, the first Next from `language` lands on `internetSettings` (not `identify`). Update to:

  ```ts
  it('advances through steps with the shell Next button', async () => {
    render(
      <FirstRunShell
        entryStep="language"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, internetSettings: InternetSettingsPlaceholder }}
      />,
    );
    expect(screen.getByText(/language picker/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText(/internet settings placeholder/i)).toBeInTheDocument();
  });
  ```

  **Test 2 — "goes back":** Update to navigate language → internetSettings → back:

  ```ts
  it('goes back to a step visited earlier this session', async () => {
    render(
      <FirstRunShell
        entryStep="language"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, internetSettings: InternetSettingsPlaceholder }}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /next/i })); // language → internetSettings
    expect(screen.getByText(/internet settings placeholder/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(screen.getByText(/language picker/i)).toBeInTheDocument();
  });
  ```

  **Test 3 — "disables Next after navigating into a step that calls setCanProceed(false) on mount (PT-4175 FIX 2)":** After inserting `internetSettings`, one Next click from `language` now lands on `internetSettings` (not `identify`). A second click is needed to reach `identify`. Override `internetSettings` with the placeholder so no PAPI call fires en route:

  ```ts
  it('disables Next after navigating into a step that calls setCanProceed(false) on mount (PT-4175 FIX 2)', async () => {
    function BlockingStep({ setCanProceed: setCP }: FirstRunStepProps) {
      useEffect(() => setCP?.(false), [setCP]);
      return <p>blocking step</p>;
    }
    render(
      <FirstRunShell
        entryStep="language"
        stepComponents={{
          ...DEFAULT_STEP_COMPONENTS,
          internetSettings: InternetSettingsPlaceholder,
          identify: BlockingStep,
        }}
      />,
    );
    expect(screen.getByRole('button', { name: /next/i })).not.toBeDisabled();
    await userEvent.click(screen.getByRole('button', { name: /next/i })); // language → internetSettings
    await userEvent.click(screen.getByRole('button', { name: /next/i })); // internetSettings → identify (BlockingStep)
    await waitFor(() => expect(screen.getByRole('button', { name: /next/i })).toBeDisabled());
  });
  ```

- [ ] **Step 6: Run wizard step tests (GREEN)**

  ```bash
  npm test -- src/renderer/components/first-run/steps/internet-settings-step --run
  ```

  Expected: all 6 tests **PASS**.

- [ ] **Step 7: Run shell tests**

  ```bash
  npm test -- src/renderer/components/first-run/first-run-shell --run
  ```

  Expected: all shell tests pass.

- [ ] **Step 8: Typecheck and full renderer test run**

  ```bash
  npm run typecheck
  npm test -- src/renderer --run
  ```

  Expected: zero TypeScript errors, all tests pass.

- [ ] **Step 9: Commit**

  ```bash
  git add extensions/src/paratext-registration/contributions/localizedStrings.json
  git add src/renderer/services/first-run.model.ts
  git add src/renderer/components/first-run/first-run-shell.component.tsx
  git add src/renderer/components/first-run/first-run-shell.component.test.tsx
  git add src/renderer/components/first-run/steps/internet-settings-step.component.tsx
  git commit -m "feat: add InternetSettingsStep to first-run wizard before identify (PT-4235)"
  ```

---

## Task 6: Add Storybook stories for `InternetSettingsStep`

**Files:**

- Create: `src/renderer/components/first-run/steps/internet-settings-step.stories.tsx`

Each story needs a `sendCommand` mock so it renders its intended state rather than the spinner/error. Use `vi.spyOn` on the command service module in `beforeEach`.

- [ ] **Step 1: Write the stories file**

  Path: `src/renderer/components/first-run/steps/internet-settings-step.stories.tsx`

  ```tsx
  import type { Meta, StoryObj } from '@storybook/react-webpack5';
  import { vi } from '@storybook/test';
  import * as commandService from '@shared/services/command.service';
  import { InternetSettingsStep } from './internet-settings-step.component';

  const MOCK_SETTINGS = {
    permittedInternetUse: 'VpnRequired' as const,
    selectedServer: 'Production' as const,
    proxyPort: 0,
  };

  const meta: Meta<typeof InternetSettingsStep> = {
    title: 'First Run/InternetSettingsStep',
    component: InternetSettingsStep,
    tags: ['autodocs', 'test'],
    args: {
      onNext: () => {},
      setCanProceed: () => {},
    },
    beforeEach() {
      // Default: fetch resolves with production/vpn-required settings.
      vi.spyOn(commandService, 'sendCommand').mockResolvedValue(MOCK_SETTINGS);
      return () => vi.restoreAllMocks();
    },
  };
  export default meta;

  type Story = StoryObj<typeof InternetSettingsStep>;

  /** Spinner is shown while settings are loading; Next is disabled. */
  export const Loading: Story = {
    beforeEach() {
      vi.spyOn(commandService, 'sendCommand').mockImplementation(
        () => new Promise(() => {}), // never resolves — keeps component in loading state
      );
      return () => vi.restoreAllMocks();
    },
  };

  /** Settings loaded, VPN Required selected, Next enabled. */
  export const Default: Story = {};

  /** Enabled (unrestricted internet) option pre-selected. */
  export const Enabled: Story = {
    beforeEach() {
      vi.spyOn(commandService, 'sendCommand').mockResolvedValue({
        ...MOCK_SETTINGS,
        permittedInternetUse: 'Enabled',
      });
      return () => vi.restoreAllMocks();
    },
  };

  /** Error alert shown and Retry button visible when the initial fetch fails. */
  export const FetchError: Story = {
    beforeEach() {
      vi.spyOn(commandService, 'sendCommand').mockRejectedValue(new Error('Connection refused'));
      return () => vi.restoreAllMocks();
    },
  };
  ```

  > **If `vi.spyOn` doesn't work in your Storybook test runner** (some configurations don't support ES module mocking via spyOn): search for other `*.stories.tsx` files in `src/renderer/` that mock `sendCommand` and use the same pattern they do. The requirement is that each story renders its named state, not the spinner.

- [ ] **Step 2: Commit**

  ```bash
  git add src/renderer/components/first-run/steps/internet-settings-step.stories.tsx
  git commit -m "story: add InternetSettingsStep stories (PT-4235)"
  ```

---

## Task 7: Full repository verification

- [ ] **Step 1: Typecheck**

  ```bash
  npm run typecheck
  ```

  Expected: zero errors.

- [ ] **Step 2: Lint**

  ```bash
  npm run lint
  ```

  Expected: zero errors across all workspaces.

- [ ] **Step 3: Full test suite**

  ```bash
  npm test -- --run
  ```

  Expected: all tests pass, including moved component tests in `platform-bible-react`, extension tests, and renderer tests.

- [ ] **Step 4: If any errors — fix, re-verify, and commit**

  Do not proceed to PR until `typecheck`, `lint`, and `test` all exit clean.
