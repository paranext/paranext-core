# Internet & Connectivity Settings UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the paratext-registration internet settings surface with a radio option list (always-visible second-row description text per option), Reset + Save and restart explicit-apply buttons, and a developer-only collapsible section; update the Storybook Applying Changes doc with Ian's principle; rename the profile popover "Network" entry to "Internet and connectivity" and swap the Language row icon.

**Architecture:** The new `InternetAccessOptionList` and `DeveloperSection` are pure presentational components (no PAPI calls) reusable by the future wizard container without modification. `InternetSettingsForm` orchestrates them plus Reset + Save and restart buttons; it receives `savedInternetSettings` from the web view and computes `hasUnsavedChanges = !deepEqual(staged, saved)` locally. The web view manages PAPI fetch/save; after a successful save it updates `savedInternetSettings` to match the staged value. No confirm dialog, no Done button, no self-close.

**Tech Stack:** TypeScript, React, Vitest, @testing-library/react, @testing-library/jest-dom, Playwright (e2e), platform-bible-react (RadioGroup, RadioGroupItem, ToggleGroup, ToggleGroupItem, Button, Alert/AlertTitle/AlertDescription, Spinner), lucide-react (ChevronDown, AlertCircle, CircleCheck, Languages), platform-bible-utils (deepEqual, getErrorMessage, wait)

## Global Constraints

- Option 1 label reads exactly **"Unrestricted"**.
- Option 2 label reads exactly **"Disable access to some Bible translation services"** — do not change "some" to "all" or "specific."
- Option 3 label reads exactly **"Disable ALL internet access"** — emphatic wording matching PT9.
- Option 3 description text is honest about scope: blocking only affects Registry / Send-Receive / DBL within the Paratext app, not all internet traffic on the machine.
- Options 3–5 are `disabled` `RadioGroupItem`s with a "Coming soon" badge — they must not fire `onChange`.
- `BlockInSensitiveLocations` is a **display-only placeholder** value (not in the `InternetUse` union type); use it as the `RadioGroupItem` value for option 4; the row is always disabled so `onChange` is never called with it.
- Each radio option has **two rows of text**: a short label (the radio `<label>`) and a second, smaller description paragraph visible at all times — no tooltip required.
- `DeveloperSection` shows **Production** and **Development** only in the toggle; QA and Test exist in `ServerType` but are not surfaced.
- Proxy settings card is **removed** entirely — `ProxyOnly` is coming-soon and unreachable via the redesigned UI.
- The form uses **explicit apply** with **[Reset] [Save and restart]** buttons — no immediate-apply-on-select, no Done button, no confirm dialog.
- **Reset** is disabled when there are no unsaved changes or when the form is disabled.
- **Save and restart** is disabled when there are no unsaved changes or when the form is disabled.
- **PT9 compatibility:** internet settings are stored machine-wide and shared with any co-installed Paratext 9. The UI changes in this PR only affect how settings are presented and edited — they do not change the underlying storage format or keys. Do not modify the C# data provider or the settings schema.
- `isSaveDisabled` prop is removed from `InternetSettingsFormProps`; it is replaced by `savedInternetSettings` + `hasUnsavedChanges` computed inside the form.
- `onCloseWithoutSaving` prop does not exist — there is no Done button and no self-close.
- All Tailwind classes must use the `tw:` prefix.
- All localized string accesses must use localization keys, never hardcoded English text in JSX.
- Run `npm run typecheck && npm run lint && npm test` before each commit; fix all errors before committing.

---

### Task 0: Add Ian's principle to the Applying Changes Storybook doc

**Files:**

- Modify: `lib/platform-bible-react/src/stories/guidelines/applying-changes.mdx`

**Interfaces:**

- Consumes: nothing from other tasks
- Produces: updated Storybook guidance referenced by the PR description

- [ ] **Step 1: Insert the restart-changes special-case note**

In `lib/platform-bible-react/src/stories/guidelines/applying-changes.mdx`, find the "Choosing a model" section (currently ending with "If more than one seems to fit, prefer the earliest…"). Insert the following **after the numbered list** (after "If more than one seems to fit…") and **before the horizontal rule** that follows:

```mdx
> **Special case — restart-triggering changes:** if applying a change requires restarting the application, use **explicit apply** rather than immediate apply, regardless of whether the change might otherwise qualify for immediate apply. Do not offer "select-to-apply + restart" unless a restart is undoubtedly the only correct response to every possible setting value — the user did not sign up for an interruption just by touching a control. (Ian's principle, 2025.)
```

After the edit, the end of the "Choosing a model" section should read:

```mdx
If more than one seems to fit, prefer the earliest — immediate apply is the cheapest and least astonishing.

> **Special case — restart-triggering changes:** if applying a change requires restarting the application, use **explicit apply** rather than immediate apply, regardless of whether the change might otherwise qualify for immediate apply. Do not offer "select-to-apply + restart" unless a restart is undoubtedly the only correct response to every possible setting value — the user did not sign up for an interruption just by touching a control. (Ian's principle, 2025.)

---

## Hard rule: never interleave apply models
```

- [ ] **Step 2: Verify the Storybook page renders (lint check)**

```bash
npm run lint -- lib/platform-bible-react/src/stories/guidelines/applying-changes.mdx
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/platform-bible-react/src/stories/guidelines/applying-changes.mdx
git commit -m "docs: add Ian's principle on restart-triggering changes to Applying Changes (PT-4235)"
```

---

### Task 1: Profile popover — rename label + swap Language icon

**Files:**

- Modify: `assets/localization/en.json:463`
- Modify: `assets/localization/es.json:563`
- Modify: `src/renderer/components/user-profile-popover/user-profile-popover.component.tsx:20,361`
- Modify: `src/renderer/components/user-profile-popover/user-profile-popover.test.tsx:75`

**Interfaces:**

- Consumes: nothing from other tasks
- Produces: updated localization values consumed by the profile popover and by e2e tests (Task 7) that check the button label

- [ ] **Step 1: Update `%userProfile_networkSettings%` English value**

In `assets/localization/en.json` line 463, change:

```diff
-  "%userProfile_networkSettings%": "Network settings",
+  "%userProfile_networkSettings%": "Internet and connectivity",
```

- [ ] **Step 2: Update `%userProfile_networkSettings%` Spanish value**

In `assets/localization/es.json` line 563, change:

```diff
-  "%userProfile_networkSettings%": "Configuración de red",
+  "%userProfile_networkSettings%": "Internet y conectividad",
```

- [ ] **Step 3: Swap the Language row icon from `Globe` to `Languages`**

In `src/renderer/components/user-profile-popover/user-profile-popover.component.tsx`:

Line 20 — update the lucide import (remove `Globe`, add `Languages`):

```diff
-import { CircleUserRound, Globe, Monitor, Moon, Sun, User, Wifi } from 'lucide-react';
+import { CircleUserRound, Languages, Monitor, Moon, Sun, User, Wifi } from 'lucide-react';
```

Line 361 — swap the icon in the Language row:

```diff
-            <Globe className="tw:size-3.5" />
+            <Languages className="tw:size-3.5" />
```

- [ ] **Step 4: Update the test mock sentinel for `%userProfile_networkSettings%`**

In `src/renderer/components/user-profile-popover/user-profile-popover.test.tsx` line 75:

```diff
-      '%userProfile_networkSettings%': 'Network settings row',
+      '%userProfile_networkSettings%': 'Internet and connectivity row',
```

- [ ] **Step 5: Run the user-profile-popover tests to confirm they are green**

```bash
npm test -- src/renderer/components/user-profile-popover/user-profile-popover.test.tsx
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add assets/localization/en.json assets/localization/es.json
git add src/renderer/components/user-profile-popover/user-profile-popover.component.tsx
git add src/renderer/components/user-profile-popover/user-profile-popover.test.tsx
git commit -m "feat: rename 'Network' label to 'Internet and connectivity'; swap Globe → Languages icon"
```

---

### Task 2: Add new localization keys to paratext-registration

**Files:**

- Modify: `extensions/src/paratext-registration/contributions/localizedStrings.json`

**Interfaces:**

- Consumes: nothing from other tasks
- Produces: localization keys consumed by Tasks 3, 4, 5 (components) and Task 7 (e2e)

**Note on existing keys:** `%paratextRegistration_button_saveAndRestart%` and `%paratextRegistration_button_restarting%` already exist in `localizedStrings.json` and do not need to be added. `%paratextRegistration_label_serverType_option_Production%` and `%paratextRegistration_label_serverType_option_Development%` also already exist.

- [ ] **Step 1: Update existing English values**

In `extensions/src/paratext-registration/contributions/localizedStrings.json`, in the `"en"` block:

```diff
-      "%internetSettings_webView_title%": "Internet Settings",
+      "%internetSettings_webView_title%": "Internet & Connectivity",
```

```diff
-      "%paratextRegistration_description_internetUse_option_Enabled%": "Allow unrestricted Internet use",
+      "%paratextRegistration_description_internetUse_option_Enabled%": "Unrestricted",
```

```diff
-      "%paratextRegistration_description_internetUse_option_VpnRequired%": "Disable Internet use in sensitive locations",
+      "%paratextRegistration_description_internetUse_option_VpnRequired%": "Disable access to some Bible translation services",
```

```diff
-      "%paratextRegistration_description_internetUse_option_Disabled%": "Disable all Internet use",
+      "%paratextRegistration_description_internetUse_option_Disabled%": "Disable ALL internet access",
```

```diff
-      "%paratextRegistration_description_internetUse_option_ProxyOnly%": "Use a proxy",
+      "%paratextRegistration_description_internetUse_option_ProxyOnly%": "Configure proxy",
```

- [ ] **Step 2: Add new English keys**

Insert the following entries into the `"en"` block. Position them alphabetically by key name within the `paratextRegistration_*` block:

```json
      "%internetSettings_webView_subtitle%": "Manage how Paratext accesses the internet. These settings only apply to the Paratext app (not all internet traffic on your computer), and are shared with any co-installed Paratext 9.",
      "%paratextRegistration_button_reset%": "Reset",
      "%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%": "Block internet when in sensitive locations",
      "%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%": "Automatically blocks Paratext internet access in configured sensitive areas. (Coming soon)",
      "%paratextRegistration_description_internetUse_option_Disabled_details%": "Blocks all internet access within the Paratext app. Other applications on your computer are not affected. (Coming soon)",
      "%paratextRegistration_description_internetUse_option_Enabled_details%": "Allows Paratext to use the internet for all services: Registry, Send/Receive, and resource downloads.",
      "%paratextRegistration_description_internetUse_option_ProxyOnly_details%": "Routes Paratext internet traffic through a configured proxy server. (Coming soon)",
      "%paratextRegistration_description_internetUse_option_VpnRequired_details%": "Disables access to Registry, Send/Receive, and the Digital Bible Library within the Paratext app. Other internet features and other applications are not affected.",
      "%paratextRegistration_developer_section_label%": "Developer only",
      "%paratextRegistration_internetUse_comingSoon%": "Coming soon",
      "%paratextRegistration_internetUse_footer%": "Disabled options are planned for future updates.",
```

- [ ] **Step 3: Add matching Spanish translations to the `"es"` block**

Insert into the `"es"` block (parallel to the English entries above):

```json
      "%internetSettings_webView_subtitle%": "Gestiona cómo Paratext accede a internet. Esta configuración solo afecta a la aplicación Paratext (no todo el tráfico de internet en tu computadora) y se comparte con cualquier Paratext 9 instalado.",
      "%paratextRegistration_button_reset%": "Restablecer",
      "%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%": "Bloquear internet en lugares sensibles",
      "%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%": "Bloquea automáticamente el acceso a internet de Paratext en áreas sensibles configuradas. (Próximamente)",
      "%paratextRegistration_description_internetUse_option_Disabled%": "Deshabilitar TODO el acceso a internet",
      "%paratextRegistration_description_internetUse_option_Disabled_details%": "Bloquea todo el acceso a internet dentro de la aplicación Paratext. Otras aplicaciones en tu computadora no se ven afectadas. (Próximamente)",
      "%paratextRegistration_description_internetUse_option_Enabled%": "Sin restricciones",
      "%paratextRegistration_description_internetUse_option_Enabled_details%": "Permite a Paratext usar internet para todos los servicios: Registro, Enviar/Recibir y descargas de recursos.",
      "%paratextRegistration_description_internetUse_option_ProxyOnly%": "Configurar proxy",
      "%paratextRegistration_description_internetUse_option_ProxyOnly_details%": "Enruta el tráfico de internet de Paratext a través de un servidor proxy configurado. (Próximamente)",
      "%paratextRegistration_description_internetUse_option_VpnRequired%": "Deshabilitar acceso a algunos servicios de traducción bíblica",
      "%paratextRegistration_description_internetUse_option_VpnRequired_details%": "Deshabilita el acceso al Registro, Enviar/Recibir y la Biblioteca Bíblica Digital dentro de la aplicación Paratext. Otras funciones de internet y otras aplicaciones no se ven afectadas.",
      "%paratextRegistration_developer_section_label%": "Solo para desarrolladores",
      "%paratextRegistration_internetUse_comingSoon%": "Próximamente",
      "%paratextRegistration_internetUse_footer%": "Las opciones deshabilitadas están previstas para futuras actualizaciones.",
```

- [ ] **Step 4: Commit**

```bash
git add extensions/src/paratext-registration/contributions/localizedStrings.json
git commit -m "feat: add localization keys for redesigned internet settings UI (PT-4235)"
```

---

### Task 3: `InternetAccessOptionList` component — tests, implementation, stories

**Files:**

- Create: `extensions/src/paratext-registration/src/components/internet-access-option-list.component.tsx`
- Create: `extensions/src/paratext-registration/src/components/internet-access-option-list.component.test.tsx`
- Create: `extensions/src/paratext-registration/src/components/internet-access-option-list.stories.tsx`

**Interfaces:**

- Consumes: `InternetUse` from `paratext-registration`; `RadioGroup`, `RadioGroupItem` from `platform-bible-react`; `LanguageStrings`, `LocalizeKey` from `platform-bible-utils`
- Produces:

  - `InternetAccessOptionList` (default + named export) — props: `{ localizedStrings: LanguageStrings; value: InternetUse; onChange: (v: InternetUse) => void; disabled: boolean }`
  - `InternetAccessOptionListProps` (type export)
  - `INTERNET_ACCESS_OPTION_LIST_STRING_KEYS: LocalizeKey[]` (named export) — consumed by Task 5's `INTERNET_SETTINGS_STRING_KEYS`

- [ ] **Step 1: Write the failing tests**

Create `extensions/src/paratext-registration/src/components/internet-access-option-list.component.test.tsx`:

```typescript
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { LanguageStrings } from 'platform-bible-utils';
import {
  InternetAccessOptionList,
  type InternetAccessOptionListProps,
} from './internet-access-option-list.component';

// Radix RadioGroup uses ResizeObserver internally; jsdom doesn't provide it, so stub a no-op.
beforeAll(() => {
  global.ResizeObserver = class {
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  };
});

const mockLocalizedStrings = {
  '%paratextRegistration_description_internetUse_option_Enabled%': 'Unrestricted',
  '%paratextRegistration_description_internetUse_option_Enabled_details%': 'Desc Enabled sentinel',
  '%paratextRegistration_description_internetUse_option_VpnRequired%': 'Disable access sentinel',
  '%paratextRegistration_description_internetUse_option_VpnRequired_details%': 'Desc VPN sentinel',
  '%paratextRegistration_description_internetUse_option_Disabled%': 'Disable ALL sentinel',
  '%paratextRegistration_description_internetUse_option_Disabled_details%': 'Desc Disabled sentinel',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%':
    'Block sensitive sentinel',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%':
    'Desc Sensitive sentinel',
  '%paratextRegistration_description_internetUse_option_ProxyOnly%': 'Configure proxy sentinel',
  '%paratextRegistration_description_internetUse_option_ProxyOnly_details%': 'Desc Proxy sentinel',
  '%paratextRegistration_internetUse_comingSoon%': 'Coming soon',
  '%paratextRegistration_internetUse_footer%': 'Footer text sentinel',
} as LanguageStrings;

function renderList(overrides: Partial<InternetAccessOptionListProps> = {}) {
  const defaults: InternetAccessOptionListProps = {
    localizedStrings: mockLocalizedStrings,
    value: 'VpnRequired',
    onChange: vi.fn(),
    disabled: false,
  };
  return render(<InternetAccessOptionList {...defaults} {...overrides} />);
}

describe('InternetAccessOptionList', () => {
  test('renders all 5 option labels, their descriptions, and the footer', () => {
    renderList();
    expect(screen.getByLabelText('Unrestricted')).toBeInTheDocument();
    expect(screen.getByText('Desc Enabled sentinel')).toBeInTheDocument();
    expect(screen.getByLabelText('Disable access sentinel')).toBeInTheDocument();
    expect(screen.getByText('Desc VPN sentinel')).toBeInTheDocument();
    expect(screen.getByLabelText('Disable ALL sentinel')).toBeInTheDocument();
    expect(screen.getByText('Desc Disabled sentinel')).toBeInTheDocument();
    expect(screen.getByLabelText('Block sensitive sentinel')).toBeInTheDocument();
    expect(screen.getByText('Desc Sensitive sentinel')).toBeInTheDocument();
    expect(screen.getByLabelText('Configure proxy sentinel')).toBeInTheDocument();
    expect(screen.getByText('Desc Proxy sentinel')).toBeInTheDocument();
    expect(screen.getByText('Footer text sentinel')).toBeInTheDocument();
  });

  test('clicking an active option calls onChange with the correct value', () => {
    const onChange = vi.fn();
    renderList({ value: 'VpnRequired', onChange });
    fireEvent.click(screen.getByLabelText('Unrestricted'));
    expect(onChange).toHaveBeenCalledWith('Enabled');
  });

  test('coming-soon radio items are disabled (do not fire onChange)', () => {
    const onChange = vi.fn();
    renderList({ onChange });
    expect(screen.getByLabelText('Disable ALL sentinel')).toBeDisabled();
    expect(screen.getByLabelText('Block sensitive sentinel')).toBeDisabled();
    expect(screen.getByLabelText('Configure proxy sentinel')).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('disabled prop makes all radio items non-interactive', () => {
    renderList({ disabled: true });
    const radios = screen.getAllByRole('radio');
    radios.forEach((r) => expect(r).toBeDisabled());
  });

  test('coming-soon badge appears on exactly 3 rows', () => {
    renderList();
    expect(screen.getAllByText('Coming soon')).toHaveLength(3);
  });

  test('coming-soon badge does not appear on active option rows (options 1 and 2)', () => {
    renderList({ value: 'Enabled' });
    // Options 1 and 2 are active; only options 3-5 have badges
    expect(screen.getAllByText('Coming soon')).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails (component not yet defined)**

```bash
npm test -- extensions/src/paratext-registration/src/components/internet-access-option-list.component.test.tsx
```

Expected: FAIL — cannot find module `./internet-access-option-list.component`.

- [ ] **Step 3: Implement `InternetAccessOptionList`**

Create `extensions/src/paratext-registration/src/components/internet-access-option-list.component.tsx`:

```typescript
import { InternetUse } from 'paratext-registration';
import { RadioGroup, RadioGroupItem } from 'platform-bible-react';
import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';

type OptionRow = {
  value: InternetUse | 'BlockInSensitiveLocations';
  labelKey: LocalizeKey;
  descriptionKey: LocalizeKey;
  isEnabled: boolean;
};

const OPTION_ROWS: OptionRow[] = [
  {
    value: 'Enabled',
    labelKey: '%paratextRegistration_description_internetUse_option_Enabled%',
    descriptionKey: '%paratextRegistration_description_internetUse_option_Enabled_details%',
    isEnabled: true,
  },
  {
    value: 'VpnRequired',
    labelKey: '%paratextRegistration_description_internetUse_option_VpnRequired%',
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
    labelKey: '%paratextRegistration_description_internetUse_option_ProxyOnly%',
    descriptionKey: '%paratextRegistration_description_internetUse_option_ProxyOnly_details%',
    isEnabled: false,
  },
];

export const INTERNET_ACCESS_OPTION_LIST_STRING_KEYS: LocalizeKey[] = [
  '%paratextRegistration_description_internetUse_option_Enabled%',
  '%paratextRegistration_description_internetUse_option_Enabled_details%',
  '%paratextRegistration_description_internetUse_option_VpnRequired%',
  '%paratextRegistration_description_internetUse_option_VpnRequired_details%',
  '%paratextRegistration_description_internetUse_option_Disabled%',
  '%paratextRegistration_description_internetUse_option_Disabled_details%',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%',
  '%paratextRegistration_description_internetUse_option_ProxyOnly%',
  '%paratextRegistration_description_internetUse_option_ProxyOnly_details%',
  '%paratextRegistration_internetUse_comingSoon%',
  '%paratextRegistration_internetUse_footer%',
];

export type InternetAccessOptionListProps = {
  /** Localized strings; pass strings resolved from `INTERNET_ACCESS_OPTION_LIST_STRING_KEYS`. */
  localizedStrings: LanguageStrings;
  /** The currently selected internet use value. */
  value: InternetUse;
  /** Called when the user selects an active (non-coming-soon) option. */
  onChange: (v: InternetUse) => void;
  /** When true, all rows are non-interactive (loading or saving in progress). */
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
        onValueChange={(v) => onChange(v as InternetUse)}
        disabled={disabled}
      >
        {OPTION_ROWS.map((row) => (
          <div
            key={row.value}
            className="tw:flex tw:w-full tw:items-start tw:gap-2 tw:rounded tw:px-2 tw:py-1.5 tw:hover:bg-accent"
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
                  className={`tw:cursor-pointer tw:text-sm tw:font-medium${!row.isEnabled ? ' tw:cursor-not-allowed tw:text-muted-foreground' : ''}`}
                >
                  {localizedStrings[row.labelKey]}
                </label>
                {!row.isEnabled && (
                  <span className="tw:shrink-0 tw:rounded tw:bg-muted tw:px-1.5 tw:py-0.5 tw:text-xs tw:text-muted-foreground">
                    {localizedStrings['%paratextRegistration_internetUse_comingSoon%']}
                  </span>
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

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- extensions/src/paratext-registration/src/components/internet-access-option-list.component.test.tsx
```

Expected: all 6 tests pass.

- [ ] **Step 5: Write Storybook stories**

Create `extensions/src/paratext-registration/src/components/internet-access-option-list.stories.tsx`:

```typescript
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ReactElement, useState } from 'react';
import { InternetUse } from 'paratext-registration';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import {
  InternetAccessOptionList,
  INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
  type InternetAccessOptionListProps,
} from './internet-access-option-list.component';

const localizedStrings = getLocalizedStrings(INTERNET_ACCESS_OPTION_LIST_STRING_KEYS);

const meta: Meta<typeof InternetAccessOptionList> = {
  title: 'Bundled Extensions/paratext-registration/InternetAccessOptionList',
  component: InternetAccessOptionList,
  tags: ['autodocs', 'test'],
  args: {
    localizedStrings,
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<typeof InternetAccessOptionList>;

function createDecorator(initialValue: InternetUse) {
  return function Decorator(
    Story: (update?: { args: InternetAccessOptionListProps }) => ReactElement,
  ) {
    const [value, setValue] = useState<InternetUse>(initialValue);
    return <Story args={{ value, onChange: setValue }} />;
  };
}

/** Option 1 (Unrestricted) selected — active row, description text visible. */
export const Unrestricted: Story = {
  decorators: [createDecorator('Enabled')],
};

/** Option 2 selected — "Disable access to some Bible translation services". */
export const DisabledAccess: Story = {
  decorators: [createDecorator('VpnRequired')],
};

/**
 * A coming-soon value is the current setting (e.g., from a PT9 migration).
 * The row renders selected-but-disabled; the user cannot interact with it.
 */
export const ComingSoonSelected: Story = {
  decorators: [createDecorator('Disabled')],
};

/** All rows non-interactive — simulates the loading or saving state. */
export const FormDisabled: Story = {
  decorators: [createDecorator('VpnRequired')],
  args: { disabled: true },
};
```

- [ ] **Step 6: Commit**

```bash
git add extensions/src/paratext-registration/src/components/internet-access-option-list.component.tsx
git add extensions/src/paratext-registration/src/components/internet-access-option-list.component.test.tsx
git add extensions/src/paratext-registration/src/components/internet-access-option-list.stories.tsx
git commit -m "feat: add InternetAccessOptionList with radio rows, inline description text, coming-soon badges (PT-4235)"
```

---

### Task 4: `DeveloperSection` component — tests, implementation, stories

**Files:**

- Create: `extensions/src/paratext-registration/src/components/developer-section.component.tsx`
- Create: `extensions/src/paratext-registration/src/components/developer-section.component.test.tsx`
- Create: `extensions/src/paratext-registration/src/components/developer-section.stories.tsx`

**Interfaces:**

- Consumes: `ServerType` from `paratext-registration`; `Button`, `ToggleGroup`, `ToggleGroupItem` from `platform-bible-react`; `ChevronDown` from `lucide-react`; `LanguageStrings`, `LocalizeKey` from `platform-bible-utils`
- Produces:

  - `DeveloperSection` (default + named export) — props: `{ localizedStrings: LanguageStrings; selectedServer: ServerType; onServerChange: (s: ServerType) => void; disabled: boolean }`
  - `DeveloperSectionProps` (type export)
  - `DEVELOPER_SECTION_STRING_KEYS: LocalizeKey[]` (named export) — consumed by Task 5's `INTERNET_SETTINGS_STRING_KEYS`

- [ ] **Step 1: Write the failing tests**

Create `extensions/src/paratext-registration/src/components/developer-section.component.test.tsx`:

```typescript
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { LanguageStrings } from 'platform-bible-utils';
import {
  DeveloperSection,
  type DeveloperSectionProps,
} from './developer-section.component';

// Radix ToggleGroup uses ResizeObserver internally; jsdom doesn't provide it, so stub a no-op.
beforeAll(() => {
  global.ResizeObserver = class {
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  };
});

const mockLocalizedStrings = {
  '%paratextRegistration_developer_section_label%': 'Developer only',
  '%paratextRegistration_label_serverType_option_Production%': 'Production',
  '%paratextRegistration_label_serverType_option_Development%': 'Development',
} as LanguageStrings;

function renderSection(overrides: Partial<DeveloperSectionProps> = {}) {
  const defaults: DeveloperSectionProps = {
    localizedStrings: mockLocalizedStrings,
    selectedServer: 'Production',
    onServerChange: vi.fn(),
    disabled: false,
  };
  return render(<DeveloperSection {...defaults} {...overrides} />);
}

describe('DeveloperSection', () => {
  test('server toggle not visible when collapsed (default)', () => {
    renderSection();
    expect(screen.queryByTestId('server-type-production')).not.toBeInTheDocument();
    expect(screen.queryByTestId('server-type-development')).not.toBeInTheDocument();
  });

  test('clicking the header expands the section and shows the toggle', () => {
    renderSection();
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-production')).toBeInTheDocument();
    expect(screen.getByTestId('server-type-development')).toBeInTheDocument();
  });

  test('clicking the header again collapses the section', () => {
    renderSection();
    const header = screen.getByRole('button', { name: /Developer only/ });
    fireEvent.click(header);
    fireEvent.click(header);
    expect(screen.queryByTestId('server-type-production')).not.toBeInTheDocument();
  });

  test('Production item is active when selectedServer is Production', () => {
    renderSection({ selectedServer: 'Production' });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-production')).toHaveAttribute('data-state', 'on');
    expect(screen.getByTestId('server-type-development')).toHaveAttribute('data-state', 'off');
  });

  test('Development item is active when selectedServer is Development', () => {
    renderSection({ selectedServer: 'Development' });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-development')).toHaveAttribute('data-state', 'on');
    expect(screen.getByTestId('server-type-production')).toHaveAttribute('data-state', 'off');
  });

  test('clicking Development calls onServerChange with Development', () => {
    const onServerChange = vi.fn();
    renderSection({ onServerChange });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    fireEvent.click(screen.getByTestId('server-type-development'));
    expect(onServerChange).toHaveBeenCalledWith('Development');
  });

  test('disabled prop makes toggle items non-interactive', () => {
    renderSection({ disabled: true });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-production')).toBeDisabled();
    expect(screen.getByTestId('server-type-development')).toBeDisabled();
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails (component not yet defined)**

```bash
npm test -- extensions/src/paratext-registration/src/components/developer-section.component.test.tsx
```

Expected: FAIL — cannot find module `./developer-section.component`.

- [ ] **Step 3: Implement `DeveloperSection`**

Create `extensions/src/paratext-registration/src/components/developer-section.component.tsx`:

```typescript
import { ChevronDown } from 'lucide-react';
import { ServerType } from 'paratext-registration';
import { Button, ToggleGroup, ToggleGroupItem } from 'platform-bible-react';
import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useState } from 'react';

export const DEVELOPER_SECTION_STRING_KEYS: LocalizeKey[] = [
  '%paratextRegistration_developer_section_label%',
  '%paratextRegistration_label_serverType_option_Production%',
  '%paratextRegistration_label_serverType_option_Development%',
];

export type DeveloperSectionProps = {
  /** Localized strings; pass strings resolved from `DEVELOPER_SECTION_STRING_KEYS`. */
  localizedStrings: LanguageStrings;
  /** The currently selected server type. QA and Test values display as Production. */
  selectedServer: ServerType;
  /** Called when the user switches to Production or Development. */
  onServerChange: (s: ServerType) => void;
  /** When true, the toggle items are non-interactive (loading or saving in progress). */
  disabled: boolean;
};

export function DeveloperSection({
  localizedStrings,
  selectedServer,
  onServerChange,
  disabled,
}: DeveloperSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  // QA and Test are not surfaced in this UI; they display as Production.
  const displayValue = selectedServer === 'Development' ? 'Development' : 'Production';

  return (
    <div className="tw:border-t tw:pt-2">
      <Button
        variant="ghost"
        size="sm"
        className="tw:flex tw:w-full tw:items-center tw:justify-between tw:px-2 tw:font-normal tw:text-muted-foreground"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <span>{localizedStrings['%paratextRegistration_developer_section_label%']}</span>
        <ChevronDown
          className={`tw:size-4 tw:transition-transform${isExpanded ? ' tw:rotate-180' : ''}`}
        />
      </Button>
      {isExpanded && (
        <div className="tw:mt-2 tw:px-2">
          <ToggleGroup
            type="single"
            value={displayValue}
            onValueChange={(v) => {
              if (!v) return; // Ignore deselect attempts — the toggle must always have a value.
              onServerChange(v as 'Production' | 'Development');
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
      )}
    </div>
  );
}

export default DeveloperSection;
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- extensions/src/paratext-registration/src/components/developer-section.component.test.tsx
```

Expected: all 7 tests pass.

- [ ] **Step 5: Write Storybook stories**

Create `extensions/src/paratext-registration/src/components/developer-section.stories.tsx`:

```typescript
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { DeveloperSection, DEVELOPER_SECTION_STRING_KEYS } from './developer-section.component';

const localizedStrings = getLocalizedStrings(DEVELOPER_SECTION_STRING_KEYS);

const meta: Meta<typeof DeveloperSection> = {
  title: 'Bundled Extensions/paratext-registration/DeveloperSection',
  component: DeveloperSection,
  tags: ['autodocs', 'test'],
  args: {
    localizedStrings,
    selectedServer: 'Production',
    onServerChange: () => {},
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<typeof DeveloperSection>;

/** Collapsed by default — the server toggle is not visible. */
export const Collapsed: Story = {};

/** Section expanded — Production is the active server. */
export const Expanded: Story = {
  play: async ({ canvasElement }) => {
    const { userEvent } = await import('@storybook/testing-library');
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  },
};

/** Section expanded — Development is the active server. */
export const DevelopmentActive: Story = {
  args: { selectedServer: 'Development' },
  play: async ({ canvasElement }) => {
    const { userEvent } = await import('@storybook/testing-library');
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  },
};

/**
 * `disabled={true}` — header still clickable, but the Production/Development toggle is greyed out
 * and non-interactive.
 */
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const { userEvent } = await import('@storybook/testing-library');
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  },
};
```

- [ ] **Step 6: Commit**

```bash
git add extensions/src/paratext-registration/src/components/developer-section.component.tsx
git add extensions/src/paratext-registration/src/components/developer-section.component.test.tsx
git add extensions/src/paratext-registration/src/components/developer-section.stories.tsx
git commit -m "feat: add DeveloperSection collapsible with Production/Development toggle (PT-4235)"
```

---

### Task 5: Redesign `InternetSettingsForm` — tests, implementation, stories update

**Files:**

- Modify: `extensions/src/paratext-registration/src/internet-settings.component.tsx`
- Create: `extensions/src/paratext-registration/src/internet-settings.component.test.tsx`
- Modify: `extensions/src/paratext-registration/src/internet-settings.stories.tsx`

**Interfaces:**

- Consumes:
  - `INTERNET_ACCESS_OPTION_LIST_STRING_KEYS`, `InternetAccessOptionList` from `./components/internet-access-option-list.component` (Task 3)
  - `DEVELOPER_SECTION_STRING_KEYS`, `DeveloperSection` from `./components/developer-section.component` (Task 4)
  - `deepEqual` from `platform-bible-utils`
  - `Alert`, `AlertTitle`, `AlertDescription`, `Button`, `Spinner` from `platform-bible-react`
  - `AlertCircle`, `CircleCheck` from `lucide-react`
  - `scrollToRef`, `SaveState` from `./utils`
- Produces:
  - `InternetSettingsForm` (default + named export)
  - `InternetSettingsFormProps` (type export, replaces old version)
  - `INTERNET_SETTINGS_STRING_KEYS: LocalizeKey[]` (named export, replaces old version) — consumed by Task 6's web view

`InternetSettingsFormProps` (new signature):

```typescript
type InternetSettingsFormProps = {
  localizedStrings: LanguageStrings;
  internetSettings: InternetSettings; // staged (user-edited)
  savedInternetSettings: InternetSettings | undefined; // last persisted; undefined while loading
  onInternetSettingsChange: (s: InternetSettings) => void;
  isFormDisabled: boolean;
  saveState: SaveState;
  saveError: string;
  onSaveAndRestart: () => void;
  // NOTE: no onCloseWithoutSaving — there is no Done button
};
```

**Removed from old props:** `isSaveDisabled`, `onCloseWithoutSaving`.

- [ ] **Step 1: Write the failing tests**

Create `extensions/src/paratext-registration/src/internet-settings.component.test.tsx`:

```typescript
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { LanguageStrings } from 'platform-bible-utils';
import { InternetSettings } from 'paratext-registration';
import {
  InternetSettingsForm,
  type InternetSettingsFormProps,
} from './internet-settings.component';
import { SaveState } from './utils';

// Radix RadioGroup/ToggleGroup use ResizeObserver; jsdom doesn't provide it, so stub a no-op.
beforeAll(() => {
  global.ResizeObserver = class {
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  };
});

// Sentinel strings: deliberately differ from production English to prove localization wiring.
const mockLocalizedStrings = {
  '%internetSettings_webView_title%': 'Title sentinel',
  '%internetSettings_webView_subtitle%': 'Subtitle sentinel',
  '%paratextRegistration_button_reset%': 'Reset sentinel',
  '%paratextRegistration_button_saveAndRestart%': 'Save and restart sentinel',
  '%paratextRegistration_button_restarting%': 'Restarting sentinel',
  '%general_error_title%': 'Error sentinel',
  '%paratextRegistration_alert_updatedInternetSettings%': 'Settings updated sentinel',
  '%paratextRegistration_alert_updatedRegistration_description%': 'Restarting description sentinel',
  '%paratextRegistration_alert_updatedRegistration_description_hasRestarted%': 'Restarted sentinel',
  // Minimum required for sub-components to render
  '%paratextRegistration_description_internetUse_option_Enabled%': 'Unrestricted',
  '%paratextRegistration_description_internetUse_option_Enabled_details%': '',
  '%paratextRegistration_description_internetUse_option_VpnRequired%': 'VPN sentinel',
  '%paratextRegistration_description_internetUse_option_VpnRequired_details%': '',
  '%paratextRegistration_description_internetUse_option_Disabled%': 'Blocked sentinel',
  '%paratextRegistration_description_internetUse_option_Disabled_details%': '',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%':
    'Sensitive sentinel',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%': '',
  '%paratextRegistration_description_internetUse_option_ProxyOnly%': 'Proxy sentinel',
  '%paratextRegistration_description_internetUse_option_ProxyOnly_details%': '',
  '%paratextRegistration_internetUse_comingSoon%': 'Coming soon',
  '%paratextRegistration_internetUse_footer%': 'Footer sentinel',
  '%paratextRegistration_developer_section_label%': 'Developer only',
  '%paratextRegistration_label_serverType_option_Production%': 'Production',
  '%paratextRegistration_label_serverType_option_Development%': 'Development',
} as LanguageStrings;

const defaultSettings: InternetSettings = {
  permittedInternetUse: 'VpnRequired',
  selectedServer: 'Production',
  proxyPort: 0,
};

function renderForm(overrides: Partial<InternetSettingsFormProps> = {}) {
  const defaults: InternetSettingsFormProps = {
    localizedStrings: mockLocalizedStrings,
    internetSettings: defaultSettings,
    savedInternetSettings: defaultSettings,
    onInternetSettingsChange: vi.fn(),
    isFormDisabled: false,
    saveState: SaveState.HasNotSaved,
    saveError: '',
    onSaveAndRestart: vi.fn(),
  };
  return render(<InternetSettingsForm {...defaults} {...overrides} />);
}

describe('InternetSettingsForm', () => {
  test('Reset and Save buttons are disabled when savedInternetSettings is undefined', () => {
    renderForm({ savedInternetSettings: undefined });
    expect(screen.getByRole('button', { name: 'Reset sentinel' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Save and restart sentinel' })).toBeDisabled();
  });

  test('Reset and Save buttons are disabled when staged settings equal saved settings', () => {
    // staged === saved (defaultSettings deep-equals defaultSettings)
    renderForm();
    expect(screen.getByRole('button', { name: 'Reset sentinel' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Save and restart sentinel' })).toBeDisabled();
  });

  test('Reset and Save buttons are enabled when there are unsaved changes', () => {
    const changedSettings: InternetSettings = {
      ...defaultSettings,
      permittedInternetUse: 'Enabled',
    };
    renderForm({ internetSettings: changedSettings, savedInternetSettings: defaultSettings });
    expect(screen.getByRole('button', { name: 'Reset sentinel' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Save and restart sentinel' })).toBeEnabled();
  });

  test('Reset button calls onInternetSettingsChange with savedInternetSettings', () => {
    const onInternetSettingsChange = vi.fn();
    const changedSettings: InternetSettings = {
      ...defaultSettings,
      permittedInternetUse: 'Enabled',
    };
    renderForm({
      internetSettings: changedSettings,
      savedInternetSettings: defaultSettings,
      onInternetSettingsChange,
    });
    fireEvent.click(screen.getByRole('button', { name: 'Reset sentinel' }));
    expect(onInternetSettingsChange).toHaveBeenCalledWith(defaultSettings);
  });

  test('Save and restart button calls onSaveAndRestart', () => {
    const onSaveAndRestart = vi.fn();
    const changedSettings: InternetSettings = {
      ...defaultSettings,
      permittedInternetUse: 'Enabled',
    };
    renderForm({ internetSettings: changedSettings, onSaveAndRestart });
    fireEvent.click(screen.getByRole('button', { name: 'Save and restart sentinel' }));
    expect(onSaveAndRestart).toHaveBeenCalledTimes(1);
  });

  test('Save and restart button shows Restarting text when saveState is IsRestarting', () => {
    renderForm({ saveState: SaveState.IsRestarting });
    // Button renders restarting text; "Save and restart sentinel" is no longer the accessible name
    expect(screen.getByText('Restarting sentinel')).toBeInTheDocument();
    expect(screen.queryByText('Save and restart sentinel')).not.toBeInTheDocument();
  });

  test('restarting alert is visible when saveState is IsRestarting', () => {
    renderForm({ saveState: SaveState.IsRestarting });
    expect(screen.getByText('Settings updated sentinel')).toBeInTheDocument();
    expect(screen.getByText('Restarting description sentinel')).toBeInTheDocument();
  });

  test('error alert is visible when saveError is set', () => {
    renderForm({ saveError: 'Something went wrong' });
    expect(screen.getByText('Error sentinel')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to confirm they fail (old props shape)**

```bash
npm test -- extensions/src/paratext-registration/src/internet-settings.component.test.tsx
```

Expected: FAIL — type errors or runtime errors from missing/changed props.

- [ ] **Step 3: Replace `internet-settings.component.tsx` with the redesigned form**

Overwrite `extensions/src/paratext-registration/src/internet-settings.component.tsx` with:

```typescript
import { AlertCircle, CircleCheck } from 'lucide-react';
import { InternetSettings } from 'paratext-registration';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Spinner,
} from 'platform-bible-react';
import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { deepEqual } from 'platform-bible-utils';
import {
  DeveloperSection,
  DEVELOPER_SECTION_STRING_KEYS,
} from './components/developer-section.component';
import {
  InternetAccessOptionList,
  INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
} from './components/internet-access-option-list.component';
import { scrollToRef, SaveState } from './utils';

/**
 * All localization keys used by InternetSettingsForm and its sub-components. Pass these into the
 * platform's localization hook and forward the resolved map into the `localizedStrings` prop.
 */
export const INTERNET_SETTINGS_STRING_KEYS: LocalizeKey[] = [
  '%internetSettings_webView_title%',
  '%internetSettings_webView_subtitle%',
  '%paratextRegistration_button_reset%',
  '%paratextRegistration_button_saveAndRestart%',
  '%paratextRegistration_button_restarting%',
  '%general_error_title%',
  '%paratextRegistration_alert_updatedInternetSettings%',
  '%paratextRegistration_alert_updatedRegistration_description%',
  '%paratextRegistration_alert_updatedRegistration_description_hasRestarted%',
  ...INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
  ...DEVELOPER_SECTION_STRING_KEYS,
];

export type InternetSettingsFormProps = {
  /** Localized strings; import `INTERNET_SETTINGS_STRING_KEYS` to resolve them. */
  localizedStrings: LanguageStrings;
  /** The current (user-edited, staged) internet settings shown in the form. */
  internetSettings: InternetSettings;
  /** The last-persisted settings from PAPI; `undefined` while the initial fetch is in flight. */
  savedInternetSettings: InternetSettings | undefined;
  /** Called whenever a field changes with the next staged settings object. */
  onInternetSettingsChange: (s: InternetSettings) => void;
  /** True while loading or while saveState === IsSaving. */
  isFormDisabled: boolean;
  /** Progress of the save/restart flow; drives the success alert and button label. */
  saveState: SaveState;
  /** A save error message to show in a destructive alert, or empty string for none. */
  saveError: string;
  /** Called when "Save and restart" is clicked. */
  onSaveAndRestart: () => void;
};

/**
 * Presentational half of the Internet settings web view. Renders the option list, developer
 * section, alerts, and Reset / Save and restart buttons. The web view owns PAPI fetch/save;
 * this component is fully controlled.
 */
export function InternetSettingsForm({
  localizedStrings,
  internetSettings,
  savedInternetSettings,
  onInternetSettingsChange,
  isFormDisabled,
  saveState,
  saveError,
  onSaveAndRestart,
}: InternetSettingsFormProps) {
  const hasUnsavedChanges =
    savedInternetSettings !== undefined && !deepEqual(internetSettings, savedInternetSettings);

  const areButtonsDisabled = !hasUnsavedChanges || isFormDisabled;

  return (
    <div className="tw:flex tw:h-screen tw:flex-col tw:gap-4 tw:overflow-y-auto tw:p-4">
      <div>
        <h2 className="tw:text-lg tw:font-semibold">
          {localizedStrings['%internetSettings_webView_title%']}
        </h2>
        <p className="tw:text-sm tw:text-muted-foreground">
          {localizedStrings['%internetSettings_webView_subtitle%']}
        </p>
      </div>

      <InternetAccessOptionList
        localizedStrings={localizedStrings}
        value={internetSettings.permittedInternetUse}
        onChange={(v) =>
          onInternetSettingsChange({ ...internetSettings, permittedInternetUse: v })
        }
        disabled={isFormDisabled}
      />

      <DeveloperSection
        localizedStrings={localizedStrings}
        selectedServer={internetSettings.selectedServer}
        onServerChange={(s) =>
          onInternetSettingsChange({ ...internetSettings, selectedServer: s })
        }
        disabled={isFormDisabled}
      />

      {saveError && (
        <Alert ref={scrollToRef} variant="destructive">
          <AlertCircle className="tw:h-4 tw:w-4" />
          <AlertTitle>{localizedStrings['%general_error_title%']}</AlertTitle>
          <AlertDescription>{saveError}</AlertDescription>
        </Alert>
      )}

      {!saveError &&
        (saveState === SaveState.IsRestarting || saveState === SaveState.HasSaved) && (
          <Alert ref={scrollToRef}>
            <CircleCheck className="tw:h-4 tw:w-4" />
            <AlertTitle>
              {localizedStrings['%paratextRegistration_alert_updatedInternetSettings%']}
            </AlertTitle>
            <AlertDescription>
              {saveState === SaveState.IsRestarting
                ? localizedStrings['%paratextRegistration_alert_updatedRegistration_description%']
                : localizedStrings[
                    '%paratextRegistration_alert_updatedRegistration_description_hasRestarted%'
                  ]}
            </AlertDescription>
          </Alert>
        )}

      <div className="tw:flex tw:justify-end tw:gap-2">
        <Button
          variant="outline"
          disabled={areButtonsDisabled}
          onClick={() => {
            if (savedInternetSettings) onInternetSettingsChange(savedInternetSettings);
          }}
        >
          {localizedStrings['%paratextRegistration_button_reset%']}
        </Button>
        <Button disabled={areButtonsDisabled} onClick={onSaveAndRestart}>
          {saveState === SaveState.IsRestarting ? (
            <>
              <Spinner /> {localizedStrings['%paratextRegistration_button_restarting%']}
            </>
          ) : (
            localizedStrings['%paratextRegistration_button_saveAndRestart%']
          )}
        </Button>
      </div>
    </div>
  );
}

export default InternetSettingsForm;
```

- [ ] **Step 4: Run the component tests to verify they pass**

```bash
npm test -- extensions/src/paratext-registration/src/internet-settings.component.test.tsx
```

Expected: all 8 tests pass.

- [ ] **Step 5: Update `internet-settings.stories.tsx` with the new prop shape and new stories**

Replace the contents of `extensions/src/paratext-registration/src/internet-settings.stories.tsx`:

```typescript
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { InternetSettings } from 'paratext-registration';
import { ReactElement, useState } from 'react';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import { alertCommand } from '../../../../.storybook/story.utils';
import {
  INTERNET_SETTINGS_STRING_KEYS,
  InternetSettingsForm,
  InternetSettingsFormProps,
} from './internet-settings.component';
import { SaveState } from './utils';

/**
 * `InternetSettingsForm` orchestrates the radio option list, developer section, and
 * Reset / Save and restart buttons. The web view manages PAPI fetch/save; this component
 * is fully controlled.
 */

const localizedStrings = getLocalizedStrings(INTERNET_SETTINGS_STRING_KEYS);

const defaultSettings: InternetSettings = {
  permittedInternetUse: 'VpnRequired',
  selectedServer: 'Production',
  proxyPort: 0,
};

const meta: Meta<typeof InternetSettingsForm> = {
  title: 'Bundled Extensions/paratext-registration/InternetSettingsForm',
  component: InternetSettingsForm,
  tags: ['autodocs', 'test'],
};
export default meta;

type Story = StoryObj<typeof InternetSettingsForm>;

type DecoratorConfig = {
  initialSettings?: InternetSettings;
  savedInternetSettings?: InternetSettings | undefined;
  isFormDisabled?: boolean;
  saveState?: SaveState;
  saveError?: string;
};

/** Wraps the form in state so the radio list and developer toggle remain interactive. */
function createDecorator(config: DecoratorConfig) {
  return function InternetSettingsDecorator(
    Story: (update?: { args: InternetSettingsFormProps }) => ReactElement,
  ) {
    const [internetSettings, setInternetSettings] = useState<InternetSettings>(
      config.initialSettings ?? defaultSettings,
    );
    const saved =
      'savedInternetSettings' in config ? config.savedInternetSettings : defaultSettings;

    return (
      <Story
        args={{
          localizedStrings,
          internetSettings,
          savedInternetSettings: saved,
          onInternetSettingsChange: setInternetSettings,
          isFormDisabled: config.isFormDisabled ?? false,
          saveState: config.saveState ?? SaveState.HasNotSaved,
          saveError: config.saveError ?? '',
          onSaveAndRestart: () =>
            alertCommand('paratextRegistration.setParatextDataInternetSettings', internetSettings),
        }}
      />
    );
  };
}

/** Default: VPN-required selected, Reset and Save buttons disabled (no changes yet). */
export const Default: Story = {
  decorators: [createDecorator({})],
};

/** Initial load in flight — `savedInternetSettings` is undefined; both buttons are disabled. */
export const Loading: Story = {
  decorators: [createDecorator({ savedInternetSettings: undefined, isFormDisabled: true })],
};

/**
 * User has changed the selection (Unrestricted vs the saved VPN-required).
 * Reset and Save and restart are enabled.
 */
export const UnsavedChanges: Story = {
  decorators: [
    createDecorator({
      initialSettings: { permittedInternetUse: 'Enabled', selectedServer: 'Production', proxyPort: 0 },
      savedInternetSettings: defaultSettings,
    }),
  ],
};

/** Developer section expanded — Production/Development toggle visible. */
export const DeveloperSectionExpanded: Story = {
  decorators: [createDecorator({})],
  play: async ({ canvasElement }) => {
    const { userEvent } = await import('@storybook/testing-library');
    const buttons = Array.from(canvasElement.querySelectorAll('button'));
    const header = buttons.find((b) => b.textContent?.includes('Developer'));
    if (header) await userEvent.click(header);
  },
};

/** Mid-restart: buttons disabled, spinner visible, success alert showing. */
export const Restarting: Story = {
  decorators: [
    createDecorator({
      isFormDisabled: true,
      saveState: SaveState.IsRestarting,
    }),
  ],
};

/** A save failure surfaces the error in a destructive alert. */
export const SaveError: Story = {
  decorators: [
    createDecorator({
      saveError: 'Could not reach the registration server. Check your connection and try again.',
    }),
  ],
};
```

- [ ] **Step 6: Run typecheck and lint to catch import/prop errors**

```bash
npm run typecheck && npm run lint
```

Fix any errors before proceeding.

- [ ] **Step 7: Run the full component test suite to confirm all tests still pass**

```bash
npm test -- extensions/src/paratext-registration/src/internet-settings.component.test.tsx
```

- [ ] **Step 8: Commit**

```bash
git add extensions/src/paratext-registration/src/internet-settings.component.tsx
git add extensions/src/paratext-registration/src/internet-settings.component.test.tsx
git add extensions/src/paratext-registration/src/internet-settings.stories.tsx
git commit -m "feat: redesign InternetSettingsForm with radio list, Reset/Save-and-restart buttons (PT-4235)"
```

---

### Task 6: Update `InternetSettingsWebView`

**Files:**

- Modify: `extensions/src/paratext-registration/src/internet-settings.web-view.tsx`

**Interfaces:**

- Consumes:
  - `INTERNET_SETTINGS_STRING_KEYS`, `InternetSettingsForm` from Task 5
  - `SaveState` from `./utils`
  - `WebViewProps` from `@papi/core`; `papi`, `logger` from `@papi/frontend`; `useLocalizedStrings` from `@papi/frontend/react`
  - `usePromise` from `platform-bible-react`
  - `getErrorMessage`, `wait` from `platform-bible-utils`
- Produces: `globalThis.webViewComponent` (the Electron web view entry point)

- [ ] **Step 1: Replace `internet-settings.web-view.tsx` with the updated implementation**

Overwrite `extensions/src/paratext-registration/src/internet-settings.web-view.tsx`:

```typescript
import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { InternetSettings } from 'paratext-registration';
import { usePromise } from 'platform-bible-react';
import { getErrorMessage, wait } from 'platform-bible-utils';
import { useEffect, useRef, useState } from 'react';
import {
  INTERNET_SETTINGS_STRING_KEYS,
  InternetSettingsForm,
} from './internet-settings.component';
import { SaveState } from './utils';

/**
 * Time in milliseconds to wait before restarting the application after changing internet settings.
 */
const INTERNET_SETTINGS_RESTART_DELAY_MS = 5 * 1000;

// #region PAPI helpers

async function getInternetSettings() {
  return papi.commands.sendCommand('paratextRegistration.getParatextDataInternetSettings');
}

async function saveInternetSettings(internetSettings: InternetSettings) {
  return papi.commands.sendCommand(
    'paratextRegistration.setParatextDataInternetSettings',
    internetSettings,
  );
}

// #endregion

globalThis.webViewComponent = function InternetSettingsComponent({
  useWebViewState,
}: WebViewProps) {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [localizedStrings] = useLocalizedStrings(INTERNET_SETTINGS_STRING_KEYS);

  const [saveState, setSaveState] = useWebViewState(
    'internetSettingsSaveState',
    SaveState.HasNotSaved,
  );
  const [saveError, setSaveError] = useState('');

  // If the app just finished restarting, transition from IsRestarting to HasSaved.
  useEffect(() => {
    if (saveState === SaveState.IsRestarting) setSaveState(SaveState.HasSaved);
    // This hook must only run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Staged settings: what the user has edited in the form (persisted in web view state).
  const [internetSettings, setInternetSettings] = useWebViewState<InternetSettings>(
    'internetSettings',
    { permittedInternetUse: 'VpnRequired', selectedServer: 'Production', proxyPort: 0 },
  );

  // Last-persisted settings from PAPI: undefined while the fetch is in flight.
  const [savedInternetSettings, setSavedInternetSettings] = useState<
    InternetSettings | undefined
  >();

  // Fetch current settings from PAPI on mount; undefined until resolved.
  const [fetchedInternetSettings] = usePromise(getInternetSettings, undefined);

  // When fetch resolves, update both staged and saved baselines.
  useEffect(() => {
    if (fetchedInternetSettings === undefined) return;
    setInternetSettings(fetchedInternetSettings);
    setSavedInternetSettings(fetchedInternetSettings);
  }, [fetchedInternetSettings, setInternetSettings]);

  const isFormDisabled = savedInternetSettings === undefined || saveState === SaveState.IsSaving;

  const handleSaveAndRestart = async () => {
    setSaveState(SaveState.IsSaving);
    setSaveError('');
    try {
      await saveInternetSettings(internetSettings);
      // Update the saved baseline so Reset reflects the just-persisted state.
      setSavedInternetSettings(internetSettings);
      // Queue restart asynchronously so the UI can update first.
      (async () => {
        try {
          await wait(INTERNET_SETTINGS_RESTART_DELAY_MS);
          await papi.commands.sendCommand('platform.restart');
        } catch {
          logger.warn(
            'Failed to restart after saving Internet settings! The user will need to restart manually.',
          );
        }
      })();
      if (isMounted.current) setSaveState(SaveState.IsRestarting);
    } catch (err: unknown) {
      logger.warn(`Failed to save Internet settings ${err}`);
      setSaveError(getErrorMessage(err));
      setSaveState(SaveState.HasNotSaved);
    }
  };

  return (
    <InternetSettingsForm
      localizedStrings={localizedStrings}
      internetSettings={internetSettings}
      savedInternetSettings={savedInternetSettings}
      onInternetSettingsChange={setInternetSettings}
      isFormDisabled={isFormDisabled}
      saveState={saveState}
      saveError={saveError}
      onSaveAndRestart={handleSaveAndRestart}
    />
  );
};
```

- [ ] **Step 2: Verify the float size — open the settings and check for clipping**

Run the app (`npm start`) and open the internet settings panel via the profile popover. Check:

- All 5 radio rows with their description text are visible without scrolling
- The developer section header is visible
- The Reset and Save and restart buttons are visible

If content is clipped, increase `floatSize` in `internet-settings.web-view-provider.ts`:

```typescript
// In getWebView, add or update:
floatSize: { width: 520, height: 650 },
```

Adjust the values until content is comfortably visible.

- [ ] **Step 3: Run typecheck and lint**

```bash
npm run typecheck && npm run lint
```

Fix any errors before proceeding.

- [ ] **Step 4: Run all paratext-registration tests to confirm no regressions**

```bash
npm test -- extensions/src/paratext-registration/
```

- [ ] **Step 5: Commit**

```bash
git add extensions/src/paratext-registration/src/internet-settings.web-view.tsx
git add extensions/src/paratext-registration/src/internet-settings.web-view-provider.ts
git commit -m "feat: update InternetSettingsWebView — Reset/Save flow, savedInternetSettings baseline update (PT-4235)"
```

---

### Task 7: E2E tests

**Files:**

- Create: `e2e-tests/tests/isolated/internet-settings.spec.ts`

**Interfaces:**

- Consumes: `isolated.fixture` (per-test Electron instance), `waitForAppReady` from `../../fixtures/helpers`
- Depends on Task 1 (profile popover label), Task 3 (radio rows with description text), Task 5 (Reset/Save buttons)

**Note:** The "Save and restart" button is NOT exercised in e2e (it would trigger a real app restart). Unit tests in Task 5 provide callback wiring coverage. The e2e tests verify visible behavior: label, radio rows with descriptions, Reset button state, developer section expand/collapse.

- [ ] **Step 1: Create the e2e spec file**

Create `e2e-tests/tests/isolated/internet-settings.spec.ts`:

```typescript
/**
 * E2E tests for PT-4235 — Internet & Connectivity settings UI.
 *
 * Covers:
 *
 * - Opening via profile popover
 * - Radio row visibility (2 active with descriptions, 3 coming-soon with badges)
 * - Reset and Save and restart button state (disabled when no changes, enabled after change)
 * - Reset restores original selection (buttons become disabled again)
 * - Developer section expand/collapse
 *
 * "Save and restart" is NOT tested here — it triggers a real app restart. onSaveAndRestart callback
 * wiring is covered by unit tests.
 */
import { test, expect } from '../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

/** Opens the internet settings panel from the profile popover. */
async function openInternetSettings(mainPage: import('@playwright/test').Page) {
  await mainPage.getByTestId('user-profile-popover-trigger').click();
  await mainPage.getByTestId('user-profile-action-network').click();
}

/** Returns a FrameLocator scoped to the internet settings web view iframe. */
function internetSettingsFrame(mainPage: import('@playwright/test').Page) {
  return mainPage.frameLocator('iframe').filter({ hasText: 'Internet & Connectivity' });
}

test.describe('Internet & Connectivity settings', () => {
  test('profile popover shows "Internet and connectivity" label and opens settings panel', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await mainPage.getByTestId('user-profile-popover-trigger').click();

    // The button label should read "Internet and connectivity" (not "Network settings")
    await expect(mainPage.getByTestId('user-profile-action-network')).toContainText(
      'Internet and connectivity',
    );

    await mainPage.getByTestId('user-profile-action-network').click();

    const frame = internetSettingsFrame(mainPage);
    await expect(frame.locator('h2')).toBeVisible({ timeout: 15_000 });
    await expect(frame.locator('h2')).toContainText('Internet & Connectivity');
    await expect(frame.locator('p').first()).toContainText('only apply to the Paratext app');
  });

  test('shows 2 active radio rows with descriptions and 3 coming-soon rows with badges', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await expect(frame.locator('h2')).toBeVisible({ timeout: 15_000 });

    // Active rows have enabled radio buttons
    await expect(frame.getByRole('radio', { name: 'Unrestricted' })).toBeEnabled({
      timeout: 10_000,
    });
    await expect(
      frame.getByRole('radio', { name: /Disable access to some Bible translation services/ }),
    ).toBeEnabled();

    // Active rows have always-visible description text (no hover required)
    await expect(
      frame.getByText(/Allows Paratext to use the internet for all services/),
    ).toBeVisible();
    await expect(frame.getByText(/Disables access to Registry, Send\/Receive/)).toBeVisible();

    // Coming-soon rows have disabled radio buttons
    await expect(frame.getByRole('radio', { name: /Disable ALL internet access/ })).toBeDisabled();
    await expect(
      frame.getByRole('radio', { name: /Block internet when in sensitive locations/ }),
    ).toBeDisabled();
    await expect(frame.getByRole('radio', { name: /Configure proxy/ })).toBeDisabled();

    // Three "Coming soon" badges appear
    await expect(frame.getByText('Coming soon')).toHaveCount(3);

    // Footer text is present
    await expect(frame.getByText(/Disabled options are planned for future updates/)).toBeVisible();
  });

  test('Reset and Save and restart are disabled until settings load and change is made', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await expect(frame.locator('h2')).toBeVisible({ timeout: 15_000 });

    // Wait for the form to finish loading (buttons become present but disabled)
    const saveButton = frame.getByRole('button', { name: 'Save and restart' });
    const resetButton = frame.getByRole('button', { name: 'Reset' });

    await expect(saveButton).toBeDisabled({ timeout: 10_000 });
    await expect(resetButton).toBeDisabled();
  });

  test('selecting a different option enables Reset and Save and restart', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await expect(frame.locator('h2')).toBeVisible({ timeout: 15_000 });

    const saveButton = frame.getByRole('button', { name: 'Save and restart' });
    const resetButton = frame.getByRole('button', { name: 'Reset' });
    await expect(saveButton).toBeDisabled({ timeout: 10_000 });

    // Default is VpnRequired; clicking Unrestricted (option 1) makes a change.
    await frame.getByRole('radio', { name: 'Unrestricted' }).click();

    await expect(saveButton).toBeEnabled();
    await expect(resetButton).toBeEnabled();
  });

  test('Reset button restores original selection and disables both buttons', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await expect(frame.locator('h2')).toBeVisible({ timeout: 15_000 });

    const saveButton = frame.getByRole('button', { name: 'Save and restart' });
    const resetButton = frame.getByRole('button', { name: 'Reset' });
    await expect(saveButton).toBeDisabled({ timeout: 10_000 });

    // Change selection
    await frame.getByRole('radio', { name: 'Unrestricted' }).click();
    await expect(saveButton).toBeEnabled();

    // Click Reset — should restore original state
    await resetButton.click();

    // Both buttons become disabled again (no unsaved changes)
    await expect(saveButton).toBeDisabled({ timeout: 5_000 });
    await expect(resetButton).toBeDisabled();
  });

  test('developer section is collapsed by default and expands on click', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await expect(frame.locator('h2')).toBeVisible({ timeout: 15_000 });

    // Toggle items are not visible initially
    await expect(frame.getByTestId('server-type-production')).not.toBeVisible({ timeout: 5_000 });

    // Click the Developer only header
    await frame.getByRole('button', { name: /Developer only/ }).click();

    // Toggle items become visible
    await expect(frame.getByTestId('server-type-production')).toBeVisible({ timeout: 5_000 });
    await expect(frame.getByTestId('server-type-development')).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the e2e tests in local development mode to verify they pass**

Make sure the dev server is running (`npm start` in a separate terminal), then:

```bash
npm run test:e2e:isolated -- --grep "Internet & Connectivity"
```

Expected: all 5 tests pass. If a test fails due to timing (app still loading), increase the relevant timeout.

- [ ] **Step 3: Commit**

```bash
git add e2e-tests/tests/isolated/internet-settings.spec.ts
git commit -m "test: add e2e spec for internet settings panel — Reset/Save flow (PT-4235)"
```

---

### Final verification

- [ ] **Step 1: Run full typecheck, lint, and unit tests**

```bash
npm run typecheck && npm run lint && npm test
```

Expected: all checks green.

- [ ] **Step 2: Run the e2e suite**

```bash
npm run test:e2e:isolated -- --grep "Internet & Connectivity"
```

Expected: all 5 tests pass.

- [ ] **Step 3: Manually verify the feature end-to-end**

Open the app (`npm start`), click the profile button, and confirm:

1. The button label reads "Internet and connectivity"
2. The Language section shows the `Languages` icon (not `Globe`)
3. The settings panel opens with title "Internet & Connectivity" and the subtitle (mentions PT9 compatibility)
4. 5 radio rows render — options 1–2 are interactive with description text visible (no hover needed), options 3–5 have "Coming soon" badges and description text
5. With no changes made, Reset and Save and restart are both disabled
6. Click option 1 (Unrestricted) → both buttons become enabled
7. Click Reset → option reverts to VpnRequired, both buttons become disabled again
8. Click "Developer only" header → Production / Development toggle appears

- [ ] **Step 4: Verify PT9 compatibility**

Confirm by reading the existing C# data provider code (no changes made to it in this PR) that the settings storage format and keys are unchanged. The question to answer in the PR description: "PT9 compatibility: confirmed — this PR only changes the UI presentation layer; the PAPI commands (`getParatextDataInternetSettings` / `setParatextDataInternetSettings`) and their underlying Paratext settings storage are not modified."

- [ ] **Step 5: Check open items from the spec before merging**

- [ ] Subtitle text confirmed from UX mockup — update `%internetSettings_webView_subtitle%` and `%internetSettings_webView_subtitle%` (es) if copy changes
- [ ] Description detail texts for all 5 options confirmed from UX mockup — update `%paratextRegistration_description_internetUse_option_*_details%` keys if copy changes
- [ ] Float size (`floatSize` in `internet-settings.web-view-provider.ts`) verified visually (no clipping)
- [ ] Spanish translations reviewed by a Spanish speaker
