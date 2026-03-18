---
title: Component Selection Quick Reference
description: Quick-reference guide for choosing the right platform-bible-react component for extension UI.
version: 1.0.0
status: active
created: 2026-03-04
last_updated: 2026-03-04
---

# Component Selection Quick Reference

> **Source**: [UX Component Choices Google Doc](https://docs.google.com/document/d/1gKmb2PnCWtRAbVN8ERskRRy-IoTRTsEpC4-kpgEvzxY/)
>
> This guide helps the Component Builder agent select appropriate components from `platform-bible-react` when building UI for ported features.

## Common Patterns

| Need | Component(s) | Reference Extension |
|------|-------------|---------------------|
| Search + Results | SearchBar, ScriptureResultsViewer | `find.web-view.tsx` |
| Filter + List | ComboBox, DataTable/ResultsCard | `checks-side-panel.web-view.tsx` |
| Data Grid | DataTable, Inventory | `inventory.web-view.tsx` |
| Settings Form | Input, Select, Checkbox, Card | `project-settings.web-view.tsx` |
| Scripture Selection | BookChapterControl, ScopeSelector | (multiple extensions) |
| Comments/Notes | CommentList, CommentThread | `comment-manager.web-view.tsx` |
| Progress/Loading | Progress, Spinner, Skeleton | (common pattern) |
| Dialogs/Modals | Dialog, Drawer, Popover | (common pattern) |

## Component Decision Tree

### Data Display
- Need sortable columns? → **DataTable**
- Scripture results? → **ScriptureResultsViewer**
- Comments/notes? → **CommentList**
- Inventory items? → **Inventory**
- Simple key-value? → **Card** + **SettingsList**
- Hierarchical data? → **Tree** (not yet existing)
- Otherwise → **Table** or custom Card layout

### Display Text
- Plain label? → **Label**
- Markdown content? → **MarkdownRenderer**
- Smart formatting? → **SmartLabel**

### User Input
- Single line text? → **Input**
- Multi-line text? → **Textarea**
- Scripture reference? → **BookChapterControl**
- Scope selection? → **ScopeSelector**
- Single select (few options)? → **RadioGroup**
- Single select (many options)? → **Select** or **ComboBox**
- Multi-select? → **MultiSelectComboBox** or **Checklist**
- Toggle? → **Switch** or **Checkbox**
- Numeric value? → **Slider** or **Select**

### Menus
- Main application menu? → **Menubar**
- Project/hamburger menu? → **DropdownMenu**
- Right-click menu? → **ContextMenu**
- Hover/in-context menu? → **DropdownMenu** or **ContextMenu**
- Quick actions row? → **Icon Bar** / **Action Bar** (not yet existing)

### Overlays
- Blocking action? → **Dialog**
- Side panel? → **Drawer**
- Tooltip info? → **Tooltip**
- Dropdown menu? → **DropdownMenu** or **ContextMenu**
- Autocomplete? → **Popover** with **CommandList**

### Navigation
- Tab content? → **Tabs**
- Vertical menu? → **Sidebar** with **TabsVertical**
- Toolbar actions? → **Toolbar** or **TabToolbar**
- Switching between views (e.g., list/grid)? → **ButtonGroup**
- Breadcrumb trail? → **Breadcrumb**

### Toggles
- Single toggle button? → **Toggle**
- Group of toggle options? → **ToggleGroup**

### Buttons
- Primary action? → **Button** (default variant)
- Dangerous action? → **Button** (destructive variant)
- Secondary action? → **Button** (outline or secondary variant)
- Other actions (not primary workflow)? → **Button** (ghost variant)
- Link-style? → **Button** (link variant)
- Icon only? → **Button** with `size="icon"`

### Feedback
- Inline message? → **Alert**
- Toast notification? → **Sonner** (for critical updates or feedback)
- Loading? → **Spinner** or **Skeleton** (prefer Skeletons)
- Progress? → **Progress**
- Status indicator? → **Badge**

**Badge variants**: `default`, `secondary`, `muted`, `destructive`, `outline`, blue indicator, muted indicator, ghost
- Status in checks side panel → Badge with appropriate variant
- Tags in get resources → Badge

## List and Table Styling

Consistent selection and hover styles for all lists and tables:

```typescript
// Hover state
<div className="tw-bg-muted">

// Selected state
<div className="tw-bg-muted/50">
```

Apply the [listbox keyboard navigation pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) for accessibility.
See: `platform-bible-react/src/hooks/listbox-keyboard-navigation.hook.ts`

Lists may be styled as:
- Single column table
- List of Card-like items (see **ResultsCard**)

List entries and table rows may use context menus and Ellipsis button for more options.

## Icons

### Standard Icons
- Import from `lucide-react` for standard icons (inlines SVG into DOM)
- Themeable via `currentColor`

### Semantic Icons (planned)
- Will be served from `platformIcons` extension
- URL format: `papi-extension://platformIcons/assets/{icon}.svg`
- Provides consistent, meaningful icons across Platform.Bible

### Custom Icons
- Bundle custom icons in your extension's `assets/` folder
- Reference via `papi-extension://{extensionName}/assets/{icon}.svg`

### Icons in Menus
- Data-driven menus require URLs (cannot pass React components)
- Download the icon, check it into the extension repo, and pass the URL to menu config
- Example: `"iconPathAfter": "papi-extension://platformScripture/assets/icons/external-link.svg"`

### Themeability Note
- URLs in `<img>` tags don't respect `currentColor`
- Platform.Bible uses `-webkit-mask-image` workaround for themeable URL-based icons
- The icon component handles this automatically

## Toolbar Components

Common toolbar controls:
- Scripture reference input? → **BookChapterControl** (BCV)
- Scope selection? → **ScopeSelector** (dropdown or radio variants)
- Book or chapter selection? → **BookSelector** / **ChapterSelector**
- Navigation history? → Forward/Back buttons
- Edit history? → Undo/Redo buttons
- Synchronized scrolling? → **ScrollGroup**

## Key Guidelines

1. **Always use platform-bible-react** components when available
2. **Design narrow-first** (300px minimum width) - see `guidelines/responsiveness.mdx`
3. **Use `tw-` prefix** for all Tailwind classes
4. **Wrap in `pr-twp`** class for style scoping
5. **Use `cn()`** from platform-bible-react for conditional classes
6. **Import icons from `lucide-react`**

## Styling Conventions

```typescript
// Standard imports for extension web views
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

// Tailwind with tw- prefix
<div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">

// Conditional classes with cn()
<div className={cn('tw-flex tw-gap-2', { 'tw-hidden': !visible })}>

// Style scoping at component root
<div className="pr-twp">
  {/* All content here gets Platform.Bible styling */}
</div>
```

## Storybook Resources

Run `npm run storybook` and see:
- **Guidelines/Component Choices** - When to use which component
- **Guidelines/Responsiveness** - Narrow-first design requirements
- **Guidelines/Application Interactions** - Standard interaction patterns
- **Guidelines/Vocabulary** - UI terminology standards

## Design Resources

- **Component Enhancements Backlog**: [PT-2218](https://paratextstudio.atlassian.net/browse/PT-2218)

## Reference Extensions

These extensions demonstrate good patterns:

| Extension | Pattern | Location |
|-----------|---------|----------|
| platform-scripture | Search, filter, results | `extensions/src/platform-scripture/src/` |
| platform-lexical-tools | Dictionary, data display | `extensions/src/platform-lexical-tools/src/` |
| platform-get-resources | List, sorting, filtering | `extensions/src/platform-get-resources/src/` |

## Form Validation

**Note:** Form components (shadcn/ui form primitives) are NOT yet in platform-bible-react. For complex forms with validation:

1. **Simple validation**: Use controlled inputs with local state validation
2. **Complex forms**: Consider using React Hook Form directly:
   ```typescript
   import { useForm } from 'react-hook-form';
   import { Input, Label } from 'platform-bible-react';

   // Manual integration until Form components are added
   const { register, handleSubmit, formState: { errors } } = useForm();
   ```

3. **Error display**: Show errors adjacent to fields with `tw-text-destructive`

**Future**: When Form components are added to platform-bible-react, prefer those.

## Prohibited Styling Patterns

NEVER use these patterns:
- `tw-bg-black/50` or any non-theme colors → Use `tw-bg-muted` or theme variants
- `tw-shadow*` classes → Shadows are not part of Platform.Bible design
- Hardcoded colors (`#fff`, `rgb()`, `hsl()`, etc.) → Use theme tokens only
- `tw-border-black` or non-theme border colors → Use `tw-border-border` or `tw-border-input`

ALWAYS use theme colors:
- **Backgrounds**: `tw-bg-background`, `tw-bg-muted`, `tw-bg-primary`, `tw-bg-secondary`
- **Text**: `tw-text-foreground`, `tw-text-muted-foreground`, `tw-text-primary`, `tw-text-destructive`
- **Borders**: `tw-border-border`, `tw-border-input`, `tw-border-primary`

## Empty State Handling

For form fields:
- **Required fields**: Show asterisk (*) or "(required)" in the label
- **Optional fields**: No indicator needed (optional is the default assumption)
- **Empty state**: Use placeholder text explaining expected input format
- **Invalid state**: Show validation message adjacent to the field using `tw-text-destructive`

Example:
```typescript
<div className="tw-flex tw-flex-col tw-gap-1">
  <Label htmlFor="project-name">{localizedStrings['%field_projectName_label%']} *</Label>
  <Input id="project-name" placeholder={localizedStrings['%field_projectName_placeholder%']} />
  {errors.projectName && (
    <Label className="tw-text-sm tw-text-destructive">{errors.projectName.message}</Label>
  )}
</div>
```

## Placeholder Text Standards

### When to Use Placeholders

**Use placeholders for:**
- Text inputs that need format hints
- Search fields
- Inputs where example values clarify expected format

**Do NOT use placeholders for:**
- Required field indicators (use asterisk in label instead)
- Default values (set actual default)
- Instructions that don't fit in the input (use helper text below)

### Placeholder Content Guidelines

| Type | Pattern | Example |
|------|---------|---------|
| Search fields | "Search {items}..." | "Search projects..." |
| Name inputs | "Enter {thing} name" | "Enter project name" |
| Format hints | Show format | "YYYY-MM-DD" |
| Selection prompts | "Select {item}..." | "Select language..." |

**Keep placeholders:**
- Short (under 30 characters)
- Action-oriented (verbs: Enter, Search, Select)
- Helpful (format hints when non-obvious)

### Placeholder Localization (MANDATORY)

All placeholder text MUST be localized:

```typescript
// Key pattern
'%{component}_{field}_placeholder%'

// Example
<Input
  placeholder={localizedStrings['%projectName_input_placeholder%']}
/>
```

```json
{
  "localizedStrings": {
    "en": {
      "%projectName_input_placeholder%": "Enter project name"
    },
    "es": {
      "%projectName_input_placeholder%": "Ingrese el nombre del proyecto"
    }
  }
}
```

### Placeholders vs Labels

| Use Case | Use Label | Use Placeholder |
|----------|-----------|-----------------|
| Field identification | ✅ Always | ❌ Never alone |
| Format example | ❌ | ✅ In addition to label |
| Required indicator | ✅ (asterisk) | ❌ |
| Helper instructions | ✅ (as helper text) | ❌ |

**Note**: Placeholders disappear when typing. Critical information belongs in labels or helper text.

## Creating Custom Components

Only create extension-local components when:
- Building domain-specific compositions that combine multiple library components
- Adding custom logic specific to the extension's domain

Example: A `CheckCard` that combines Badge + Tooltip + ResultsCard with check-specific logic.

**Do NOT** create custom versions of components that already exist in `platform-bible-react`.

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-04 | Initial version |
