---
title: Component Builder Patterns Reference
description: Reference patterns and examples for building React UI components — file naming, structure, shadcn/ui conventions.
version: 1.0.0
status: active
created: 2026-03-04
last_updated: 2026-03-04
toc: true
---

# Component Builder Patterns Reference

This is a reference document (not an agent) containing patterns and examples for the Component Builder agent to consult during UI development.

<!-- TOC:BEGIN -->
<!-- | Line | Section | -->
<!-- | --- | --- | -->
<!-- | 32 | File Naming Conventions | -->
<!-- | 48 | Web View Provider Patterns | -->
<!-- | 121 | PAPI Integration Patterns | -->
<!-- | 158 | Styling Patterns | -->
<!-- | 199 | Localization Patterns | -->
<!-- | 323 | Provenance Comment Patterns | -->
<!-- | 371 | Common Component Patterns | -->
<!-- | 399 | Debounce Usage Guidelines | -->
<!-- | 430 | Disabled Button with Tooltip Pattern | -->
<!-- | 452 | Test File Patterns | -->
<!-- | 497 | Reference Extensions | -->
<!-- | 510 | Design Reference Resources | -->
<!-- | 517 | Version Log | -->
<!-- TOC:END -->

## File Naming Conventions

Use kebab-case for all file names with the appropriate suffix:

| Type      | Pattern                               | Example                        |
| --------- | ------------------------------------- | ------------------------------ |
| Web View  | `{feature-name}.web-view.tsx`         | `find.web-view.tsx`            |
| Provider  | `{feature-name}.web-view-provider.ts` | `find.web-view-provider.ts`    |
| Component | `{component-name}.component.tsx`      | `search-result.component.tsx`  |
| Hook      | `use-{hook-name}.hook.ts`             | `use-project-settings.hook.ts` |
| Types     | `{extension-name}.d.ts`               | `platform-scripture.d.ts`      |
| Styles    | `{feature-name}.web-view.scss`        | `find.web-view.scss`           |
| Tests     | `{feature-name}.test.tsx`             | `find.test.tsx`                |

---

## Web View Provider Patterns

Every extension web view requires two files:

### Web View Component (`{feature}.web-view.tsx`)

```typescript
import { WebViewProps } from '@papi/core';
import { Button, Card, cn } from 'platform-bible-react';
import './feature-name.web-view.scss'; // Optional SCSS

// IMPORTANT: Use `global.webViewComponent` (NOT `globalThis.webViewComponent`)
// `globalThis` causes TypeScript strict mode errors
global.webViewComponent = function FeatureWebView({
  projectId,
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  // Component implementation using platform-bible-react components
  return (
    <div className={cn('tw-flex tw-flex-col tw-gap-2')}>
      {/* Your UI here */}
    </div>
  );
};
```

### Web View Provider (`{feature}.web-view-provider.ts`)

```typescript
import { IWebViewProvider, WebViewDefinition } from '@papi/core';
import featureWebView from './feature-name.web-view.tsx?inline';
import tailwindStyles from './tailwind.css?inline';

export class FeatureWebViewProvider implements IWebViewProvider {
  async getWebView(
    savedWebView: WebViewDefinition,
    options: FeatureWebViewOptions,
  ): Promise<WebViewDefinition> {
    return {
      ...savedWebView,
      title: 'Feature Title',
      content: featureWebView,
      styles: tailwindStyles,
      projectId: options.projectId,
    };
  }
}
```

**Note:** Use `?inline` imports for content and styles in providers.

### Real Backend Data Pattern

Since backend implementation completes before the UI phase, **use real PAPI calls**:

```typescript
async getWebView(savedWebView, options): Promise<WebViewDefinition> {
  // Real backend service call - backend is available
  const realData = await papi.commands.sendCommand('featureName.getData', options.id);

  const webViewProps = {
    title: 'Feature Title',
    content: featureWebView,
    styles: tailwindStyles,
    data: realData, // Real data from backend
  };
  // ...
}
```

---

## PAPI Integration Patterns

### Standard imports for extension web views

```typescript
import {
  Button,
  Card,
  CardContent,
  Badge,
  cn,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { SomeIcon } from 'lucide-react';
```

### Component Usage Guidelines

**Always import from `platform-bible-react`:**

- Generic UI: Button, Card, Dialog, Input, Checkbox, Label, Badge, Alert, Tooltip, Popover, etc.
- Complex components: DataTable, Inventory, CommentList, Editor, ScriptureResultsViewer, etc.
- Utilities: `cn()` for class composition
- Hooks: `useEvent`, `usePromise`, `useEventAsync`
- Icons: Import from `lucide-react`

**Create locally only when:**

- Building domain-specific compositions that combine multiple library components
- Adding custom logic specific to the extension's domain
- Example: `CheckCard` that combines Badge + Tooltip + ResultsCard with check-specific logic

---

## Styling Patterns

### Primary Approach: Tailwind CSS with `tw-` prefix

```typescript
// Tailwind with tw- prefix (primary approach)
<div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">

// Conditional classes with cn()
import { cn } from 'platform-bible-react';
<div className={cn('tw-flex tw-gap-2', { 'tw-hidden': !visible })}>

// Using platform-bible-react components
import { Button, Card, CardContent, Input, Label } from 'platform-bible-react';
<Card>
  <CardContent>
    <Label htmlFor="name">Name</Label>
    <Input id="name" />
    <Button variant="default">Submit</Button>
  </CardContent>
</Card>
```

### Styling Rules (Enforced by ESLint)

These patterns are enforced by linting rules:

| Prohibited | Allowed | Rule |
|------------|---------|------|
| Hardcoded colors (`tw-bg-black`, `tw-text-white`, `#fff`) | Theme tokens (`tw-bg-background`, `tw-text-foreground`) | `paranext/no-hardcoded-tailwind-colors` |
| Shadow classes (`tw-shadow*`) | (Not used in Platform.Bible) | `paranext/no-tailwind-shadows` |

**Theme tokens to use**:
- Backgrounds: `tw-bg-background`, `tw-bg-muted`, `tw-bg-primary`, `tw-bg-secondary`
- Text: `tw-text-foreground`, `tw-text-muted-foreground`, `tw-text-destructive`
- Borders: `tw-border-border`, `tw-border-input`, `tw-border-primary`

See [Code-Style-Guide.md](/.context/standards/Code-Style-Guide.md#theming-requirements) for details.

---

## Localization Patterns

**Reference implementation**: `extensions/src/platform-scripture/src/checks-side-panel.web-view.tsx`

### Define Localized String Keys

```typescript
// {feature}.utils.ts
import { LocalizeKey } from 'platform-bible-utils';

export const LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_{feature}_title%',
  '%webView_{feature}_submitButton%',
  '%webView_{feature}_cancelButton%',
  '%webView_{feature}_loadingMessage%',
  // Add ALL user-facing strings
];
```

### Use the useLocalizedStrings Hook

```typescript
import { useLocalizedStrings } from '@papi/frontend/react';
import { useMemo } from 'react';
import { LOCALIZED_STRINGS } from './{feature}.utils';

global.webViewComponent = function FeatureWebView({ ... }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));

  return (
    <div>
      <h1>{localizedStrings['%webView_{feature}_title%']}</h1>
      <Button>{localizedStrings['%webView_{feature}_submitButton%']}</Button>
    </div>
  );
};
```

### Add Translations to localizedStrings.json

```json
{
  "localizedStrings": {
    "en": {
      "%webView_{feature}_title%": "Feature Title",
      "%webView_{feature}_submitButton%": "Submit",
      "%webView_{feature}_cancelButton%": "Cancel"
    },
    "es": {
      "%webView_{feature}_title%": "Titulo de la funcion",
      "%webView_{feature}_submitButton%": "Enviar",
      "%webView_{feature}_cancelButton%": "Cancelar"
    }
  }
}
```

### Conventions

- Key format: `%webView_{feature}_{elementDescription}%`
- Use ellipsis (`...`) for items that open dialogs: "New Project..."
- Always provide BOTH English (`en`) AND Spanish (`es`) translations

### Dynamic Values with formatReplacementString

```typescript
import { formatReplacementString } from 'platform-bible-utils';

const message = formatReplacementString(
  localizedStrings['%webView_{feature}_resultsCount%'], // "{count} results found"
  { count: results.length }
);
```

### Localized Accessibility Attributes

All accessibility attributes with user-facing text MUST be localized:

```typescript
// BAD - hardcoded English in accessibility
<Input aria-label="Search projects" />
<Button aria-label="Close dialog" />

// GOOD - localized accessibility
<Input aria-label={localizedStrings['%search_ariaLabel%']} />
<Button aria-label={localizedStrings['%dialog_close_ariaLabel%']} />
```

**Enforced by ESLint**: `paranext/require-localized-aria`

### Reuse Existing Strings

Before creating new keys, scan the extension's `localizedStrings.json` for existing strings:

```bash
grep -i "cancel\|ok\|save\|close\|submit\|error\|loading" \
  extensions/src/{ext}/contributions/localizedStrings.json
```

Common reusable keys: `%general_cancel%`, `%general_ok%`, `%general_save%`, `%general_close%`, `%general_loading%`

### Existing Strings Are Immutable

**NEVER modify existing key/value pairs.** If a string needs replacement:

1. Create a NEW key with the desired value
2. Add a fallback mapping in the `metadata` section:

```json
{
  "metadata": {
    "%oldKey_toReplace%": {
      "fallbackKey": "%newKey_withCorrectValue%"
    }
  },
  "localizedStrings": {
    "en": { "%newKey_withCorrectValue%": "Correct text" },
    "es": { "%newKey_withCorrectValue%": "Texto correcto" }
  }
}
```

---

## Common Component Patterns

### Grid/Table Components (Checklists, Parallel Passages)

- Use virtualization for lists > 100 items
- Implement row selection with visual feedback
- Handle column sorting and filtering
- Support full keyboard navigation (arrow keys, Enter, Escape)
- Manage focus correctly when rows are added/removed

### Form Components (Project Settings)

- Use controlled inputs exclusively
- Implement validation with clear error messages
- Display error states adjacent to invalid fields
- Handle submit/cancel with loading states
- Track dirty state to warn on unsaved changes

### Dialog Components (Conflict Resolution)

- Manage modal overlay with proper z-index
- Implement focus trapping within dialog
- Handle Escape key to close
- Disable action buttons during processing
- Return focus to trigger element on close

---

## Debounce Usage Guidelines

**When to use debounce:**
- Search-as-you-type that triggers API calls
- Autocomplete suggestions
- Input that updates expensive derived calculations
- Typing in a shared/synchronized view

**When NOT to use debounce:**
- Input in a modal dialog (user will click OK/Submit anyway)
- Immediate local state updates
- Toggle switches and checkboxes
- Selections from dropdowns

**Typical debounce values:**
- Search/autocomplete: 300-500ms
- Validation: 200-300ms

```typescript
// Use debounce for search in a main view
const debouncedSearch = useDebouncedCallback(
  (query: string) => papi.commands.sendCommand('search', query),
  300
);

// DON'T debounce in a dialog - user will click Submit
const handleNameChange = (name: string) => setProjectName(name);
```

---

## Disabled Button with Tooltip Pattern

**CRITICAL:** Wrap disabled buttons in `<span>` - disabled elements don't fire mouse events.

```typescript
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'platform-bible-react';

// Wrap disabled button in span so tooltip works
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <span>
        <Button disabled>Choose...</Button>
      </span>
    </TooltipTrigger>
    <TooltipContent>This feature is not yet available</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

## Test File Patterns

### Interaction Tests

```typescript
// {feature-name}.test.tsx - co-located with component
import { render, fireEvent } from '@testing-library/react';

describe('FeatureName interactions', () => {
  it('handles row selection', () => {
    const onSelect = vi.fn();
    const { getByRole } = render(<FeatureName onSelect={onSelect} />);
    fireEvent.click(getByRole('row'));
    expect(onSelect).toHaveBeenCalled();
  });
});
```

### Snapshot Tests (optional)

```typescript
// {feature-name}.test.tsx - same file as interaction tests
describe('FeatureName snapshots', () => {
  it('renders default state', () => {
    const { container } = render(<FeatureName {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
  // Add snapshots for loading, error, empty, and populated states
});
```

### Accessibility Tests

```typescript
import { axe } from 'jest-axe';

it('has no accessibility violations', async () => {
  const { container } = render(<FeatureName />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Reference Extensions

Find similar React components in the codebase for patterns to follow:

| Extension | Pattern | Location |
|-----------|---------|----------|
| checks-side-panel | Filter + results list | `extensions/src/platform-scripture/src/checks-side-panel.web-view.tsx` |
| find | Search + results | `extensions/src/platform-scripture/src/find.web-view.tsx` |
| inventory | Data grid | `extensions/src/platform-scripture/src/inventory.web-view.tsx` |
| project-settings | Settings/form | `extensions/src/platform-scripture/src/project-settings.web-view.tsx` |

---

## Design Reference Resources

- `lib/platform-bible-react/src/stories/guidelines/` - Component choices, responsiveness, interactions
- `.context/standards/Component-Selection-Quick-Reference.md` - Component decision tree, patterns, and detailed use cases
- `extensions/src/platform-scripture/` - Reference implementation patterns
- Run Storybook (`npm run storybook`) for live component examples

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-04 | Initial version |
