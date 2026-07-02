---
title: Component Selection Quick Reference
description: Quick-reference guide for choosing the right platform-bible-react component for extension UI.
version: 1.3.0
status: active
created: 2026-03-04
last_updated: 2026-06-18
---

# Component Selection Quick Reference

> **Source**: [UX Component Choices Google Doc](https://docs.google.com/document/d/1gKmb2PnCWtRAbVN8ERskRRy-IoTRTsEpC4-kpgEvzxY/)
>
> This guide helps you select appropriate components from `platform-bible-react` when building extension UI.

## Common Patterns

| Need | Component(s) | Reference Extension |
|------|-------------|---------------------|
| Search + Results | SearchBar, ScriptureResultsViewer | `find.web-view.tsx` |
| Filter + List | ComboBox, DataTable/ResultsCard | `checks-side-panel.web-view.tsx` |
| **Pick a project** | **ProjectSelector** (NOT ComboBox/Select) | `manage-books-sidebar.component.tsx`, `checklist.web-view.tsx` |
| Data Grid | DataTable, Inventory | `inventory.web-view.tsx` |
| **Book/file comparison grid** | **BookGridSelector** (NOT a parallel table) | `manage-books-dialog/book-grid.component.tsx` |
| Settings Form | Input, Select, Checkbox, Card | `project-settings.web-view.tsx` |
| Scripture Selection | BookChapterControl, ScopeSelector | (multiple extensions) |
| Comments/Notes | CommentList, CommentThread | `comment-manager.web-view.tsx` |
| Progress/Loading | Progress, Spinner, Skeleton | (common pattern) |
| Modal alert/confirm | `papi.dialogs.showDialog('platform.alert', …)` | `hello-rock3` |
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
- **Pick a Paratext project (any mode)? → ProjectSelector** (never Select/ComboBox — see Project Picking below)
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
- Blocking alert / confirm (acknowledge or yes-no)? → **`papi.dialogs.showDialog('platform.alert', …)`** (NOT a new Radix AlertDialog — see Alerts & Confirmations below)
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
<div className="tw:bg-muted">

// Selected state
<div className="tw:bg-muted/50">
```

Apply the [listbox keyboard navigation pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) for accessibility.
See: `platform-bible-react/src/hooks/listbox-keyboard-navigation.hook.ts`

Lists may be styled as:
- Single column table
- List of Card-like items (see **ResultsCard**)

List entries and table rows may use context menus and Ellipsis button for more options.

## Book/file comparison grids

**Decision: reuse Manage Books' `BookGridSelector` for any per-row book/file comparison grid** rather than building a parallel comparison table.

`BookGridSelector` (exported from `extensions/src/platform-scripture/src/manage-books-dialog/book-grid.component.tsx`) is the canonical multi-column pill grid for showing per-row comparison states (e.g. source-is-newer / files-are-same / destination-is-higher-version / destination-does-not-exist). It already handles tone/status grouping, per-row tooltips, pill colors, and badges.

Avoid:

- building a feature-local `*-book-comparison-table` / `*-file-comparison-table` component that duplicates the grid

*Why*: state usage, tooltip content, and styling (pill colors, badges) get fixed once in the Manage Books grid and apply everywhere — duplicating the grid means re-fixing each copy. (Note: this is the file/book-level grid. Verse-level USFM diff for a single selected file is a separate surface — see the `DifferencesToolView` shared diff surface.)

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
- **View options for a tab (especially boolean toggles)?** → single **"View" toggle button** on the **TabToolbar** with a dropdown menu containing all view options. Do NOT place each boolean toggle as its own toolbar button. Examples of view options that belong here: `showVerseText`, `hideMatches`, list-vs-grid density toggles, or other per-view preferences that don't change the data being viewed.

## Project Picking

**Decision: use `<ProjectSelector>` (from `platform-bible-react`) for ALL project-picking UI** — single-select, multi-select, and scroll-group modes. It ships shortName + fullName + scroll-group chips, keyboard search, "group by open tabs", "show selected only", per-row tooltips, a trigger tooltip, and per-row `isDisabled`/`disabledReason` out of the box.

Avoid:
- shadcn **ComboBox** for project lists
- shadcn **Select** for project lists
- ad-hoc **Popover + cmdk** wrappers for project lists
- borrowing only the `ProjectSelectorProject` type while rendering a *different* picker

*Why*: one canonical picker keeps every project-picking surface feature-complete (open-tabs grouping, multi-select chips, language hints) and lets cross-cutting fixes land once instead of per-feature; ComboBox/Select pickers consistently lose those features.

Reference: `manage-books-sidebar.component.tsx` (`mode='project'`), `manage-books-dialog.component.tsx` Copy "From" / Create "Based on" (`mode='project'`), `checklist.web-view.tsx` primary picker (`mode='project'`) and comparative-texts multi-select (`mode='project-multi'`).

### Read-only (non-editable) projects in a picker

**Decision: surface `ProjectSummary.IsEditable` (the `platform.isEditable` wire field) all the way up to the picker**, then either:
- **(a)** disable downstream mutating actions when the active target's `isEditable === false` — preferred when the picked project is the whole tab's target (e.g. the Manage Books sidebar disables Create/Copy/Import/Delete sections); or
- **(b)** pass `isDisabled: !isEditable` + `disabledReason: '<localized read-only message>'` per row into `ProjectSelector` — preferred when a read-only project shouldn't be pickable at all (e.g. a "Copy into" picker).

Avoid:
- dropping the `IsEditable` field at the TS adapter boundary (silently lets the user start a mutation the backend rejects mid-flight)
- inferring read-only from project name/type heuristics instead of consuming `IsEditable`

*Why*: surface the read-only state in the picker **before** the user commits, rather than failing late with a generic "Cannot copy" toast.

### Driving variant/visibility from project capability

When a picker (or any UI) shows/hides/enables controls based on what a project can do, drive that off `projectInterfaces` capability predicates ("what can this project do?"), NOT a PT9-style `ProjectKind` typology ("what category is it in?"). PT10's extensibility model is interface-based, so a new project type added by an extension should not require touching a global enum. See the "prefer projectInterfaces predicates over a ProjectKind enum" note in [Paranext-Core-Patterns.md](Paranext-Core-Patterns.md).

## Alerts & Confirmations

**Decision: reuse the registered `'platform.alert'` dialog** via `papi.dialogs.showDialog('platform.alert', { title, prompt, … })` for blocking modal alerts and confirmations. The renderer already ships this dialog with `dialogRole: 'alertdialog'` and `aria-describedby`/`aria-labelledby` wired in, so focus-trap, Escape, and accessibility are handled uniformly.

Avoid:
- adding `@radix-ui/react-alert-dialog` to `platform-bible-react` (the renderer dialog system already covers this)
- importing a Radix/shadcn `AlertDialog` directly into a webview/extension
- nesting a Radix `AlertDialog` inside an existing webview `Dialog` as a workaround

**Exception**: inline, in-webview **field-validation** messages stay inline (`tw:text-destructive` adjacent to the field, with a disabled OK button) — do NOT open a separate top-level alert just to report a validation error.

*Why*: one registered dialog definition gives every alert/confirm the same accessibility and focus behavior without a new dependency.

Reference: `hello-rock3/src/main.ts` — `papi.dialogs.showDialog('platform.alert', { title, prompt, isModal: true })`.

## Key Guidelines

1. **Always use platform-bible-react** components when available
2. **Design narrow-first** (300px minimum width) - see `guidelines/responsiveness.mdx`
3. **Use `tw:` prefix** for all Tailwind classes
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

// Tailwind with tw: prefix
<div className="tw:flex tw:flex-col tw:gap-4 tw:p-4">

// Conditional classes with cn()
<div className={cn('tw:flex tw:gap-2', { 'tw:hidden': !visible })}>

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

3. **Error display**: Show errors adjacent to fields with `tw:text-destructive`

**Future**: When Form components are added to platform-bible-react, prefer those.

## Prohibited Styling Patterns

NEVER use these patterns:
- `tw:bg-black/50` or any non-theme colors → Use `tw:bg-muted` or theme variants
- `tw:shadow*` classes → Disallowed in AI-authored extension/web-view code via the AI-strict lint config (`paranext/no-tailwind-shadows`). Note: the platform-bible-react shadcn-ui components themselves do use shadows like `tw:shadow-md`, so this scopes the code you write, not the library.
- Hardcoded colors (`#fff`, `rgb()`, `hsl()`, etc.) → Use theme tokens only
- `tw:border-black` or non-theme border colors → Use `tw:border-border` or `tw:border-input`

ALWAYS use theme colors:
- **Backgrounds**: `tw:bg-background`, `tw:bg-muted`, `tw:bg-primary`, `tw:bg-secondary`
- **Text**: `tw:text-foreground`, `tw:text-muted-foreground`, `tw:text-primary`, `tw:text-destructive`
- **Borders**: `tw:border-border`, `tw:border-input`, `tw:border-primary`

## Empty State Handling

For form fields:
- **Required fields**: Show asterisk (*) or "(required)" in the label
- **Optional fields**: No indicator needed (optional is the default assumption)
- **Empty state**: Use placeholder text explaining expected input format
- **Invalid state**: Show validation message adjacent to the field using `tw:text-destructive`

Example:
```typescript
<div className="tw:flex tw:flex-col tw:gap-1">
  <Label htmlFor="project-name">{localizedStrings['%field_projectName_label%']} *</Label>
  <Input id="project-name" placeholder={localizedStrings['%field_projectName_placeholder%']} />
  {errors.projectName && (
    <Label className="tw:text-sm tw:text-destructive">{errors.projectName.message}</Label>
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
| 1.1.0   | 2026-04-23 | Added "View" toggle button pattern for the TabToolbar: view options (especially boolean toggles like `showVerseText`, `hideMatches`) belong under a single "View" dropdown button, not as individual toolbar buttons. Driven by Sebastian's markers-checklist review feedback. |
| 1.2.0   | 2026-06-17 | Added Project Picking section: use `ProjectSelector` for ALL project-picking UI (not ComboBox/Select), plus the read-only (`IsEditable`) handling. Added Alerts & Confirmations section: reuse the registered `platform.alert` dialog for blocking alerts/confirms (no new Radix AlertDialog; inline field validation stays inline). Routed the Common Patterns table and User Input/Overlays decision trees accordingly. |
| 1.3.0   | 2026-06-18 | Added Book/file comparison grids section: reuse Manage Books' `BookGridSelector` for per-row comparison grids instead of a parallel table. Added "Driving variant/visibility from project capability" note under Project Picking: drive variant/visibility off `projectInterfaces` predicates, not a `ProjectKind` enum (xref Paranext-Core-Patterns.md). |
