> This file is AI-generated at specific times for use with updating shadcn components and may not reflect current code. It is retained for ease of reference only. To regenerate, run `/shadcn-customizations` in Claude Code.

# Shadcn UI Component Customizations

This document captures all customizations made to shadcn/ui components relative to their original boilerplate, to aid future shadcn version upgrades. For each component, it records: whether TSDocs are present on all exports, whether DOM-rendered components have the `pr-twp` Tailwind scope class applied, and the specific code changes made (explicit annotations, other comment-indicated changes, and uncalled-out changes detected via git history).

## Standard Customizations

The table below summarizes the standard customizations that every shadcn component should have (e.g. TSDocs with library links, `pr-twp` on DOM-rendered components):

- **TSDocs on all exports?** — Whether every exported symbol (components, interfaces, types, constants) has a TSDoc comment (`/** ... */`) that includes links to the upstream libraries it uses (e.g. the shadcn/ui component page, the Radix UI primitive page, the Vaul page for drawer components). ✅ means all exports have TSDocs with appropriate library links; ❌ lists exports that are missing TSDocs or missing library links. A TSDoc that uses `@inheritdoc` pointing to a symbol whose TSDoc has the required links also passes.
- **pr-twp on DOM-rendered components?** — Whether each component that renders actual DOM output has `pr-twp` in its base Tailwind class string. `pr-twp` is a scope marker required for Platform.Bible's Tailwind CSS isolation (see `tailwind.config.ts`). ✅ means the class is present; ❌ means it is missing. Only components that produce DOM output are listed — compound root components (e.g. `Dialog`, `Popover`) that coordinate state without rendering DOM nodes are excluded, as are cva variant factories.

| Component | TSDocs on all exports? | pr-twp on DOM-rendered components? |
| --------- | ---------------------- | ---------------------------------- |
| alert.tsx | ✅ | Alert ✅, AlertTitle ❌, AlertDescription ❌ |
| avatar.tsx | ✅ | Avatar ✅, AvatarImage ✅, AvatarFallback ✅ |
| badge.tsx | ✅ | Badge ✅ |
| button-group.tsx | ❌ missing on: ButtonGroup, ButtonGroupText, ButtonGroupSeparator, buttonGroupVariants | ButtonGroup ✅, ButtonGroupText ❌, ButtonGroupSeparator ❌ |
| button.tsx | ✅ | Button ✅ |
| card.tsx | ✅ | Card ✅, CardHeader ✅, CardTitle ✅, CardDescription ✅, CardContent ✅, CardFooter ✅ |
| checkbox.tsx | ✅ | Checkbox ✅ |
| command.tsx | ✅ | Command ❌, CommandInput ❌, CommandList ❌, CommandEmpty ❌, CommandGroup ❌, CommandItem ❌, CommandShortcut ❌, CommandSeparator ❌ |
| context-menu.tsx | ✅ | ContextMenuSubTrigger ✅, ContextMenuSubContent ✅, ContextMenuContent ✅, ContextMenuItem ✅, ContextMenuCheckboxItem ❌, ContextMenuRadioItem ❌, ContextMenuLabel ❌, ContextMenuSeparator ❌, ContextMenuShortcut ❌ |
| dialog.tsx | ✅ | DialogOverlay ❌, DialogContent ✅, DialogHeader ❌, DialogFooter ❌, DialogTitle ❌, DialogDescription ❌ |
| drawer.tsx | ✅ | DrawerOverlay ❌, DrawerContent ✅, DrawerHeader ❌, DrawerFooter ❌, DrawerTitle ❌, DrawerDescription ❌ |
| dropdown-menu.tsx | ✅ | DropdownMenuSubTrigger ❌, DropdownMenuSubContent ✅, DropdownMenuContent ✅, DropdownMenuItem ❌, DropdownMenuCheckboxItem ❌, DropdownMenuRadioItem ❌, DropdownMenuLabel ❌, DropdownMenuSeparator ❌, DropdownMenuShortcut ❌ |
| input.tsx | ✅ | Input ✅ |
| label.tsx | ✅ | Label ✅ |
| menubar.tsx | ❌ missing on all exports | Menubar ❌, MenubarTrigger ✅, MenubarSubTrigger ❌, MenubarSubContent ❌, MenubarContent ✅, MenubarItem ❌, MenubarCheckboxItem ❌, MenubarRadioItem ❌, MenubarLabel ❌, MenubarSeparator ❌, MenubarShortcut ❌ |
| popover.tsx | ✅ | PopoverContent ✅ |
| progress.tsx | ✅ | Progress ✅ |
| radio-group.tsx | ✅ | RadioGroup ✅, RadioGroupItem ✅ |
| resizable.tsx | ✅ | ResizablePanelGroup ❌, ResizableHandle ❌ |
| select.tsx | ✅ | SelectTrigger ❌, SelectContent ✅, SelectLabel ❌, SelectItem ❌, SelectSeparator ❌, SelectScrollUpButton ❌, SelectScrollDownButton ❌ |
| separator.tsx | ✅ | Separator ✅ |
| sidebar.tsx | ✅ | SidebarProvider ✅, Sidebar ❌, SidebarTrigger ❌, SidebarRail ❌, SidebarInset ❌, SidebarInput ❌, SidebarHeader ❌, SidebarFooter ❌, SidebarSeparator ❌, SidebarContent ❌, SidebarGroup ❌, SidebarGroupLabel ❌, SidebarGroupAction ❌, SidebarGroupContent ❌, SidebarMenu ❌, SidebarMenuItem ❌, SidebarMenuButton ❌, SidebarMenuAction ❌, SidebarMenuBadge ❌, SidebarMenuSkeleton ❌, SidebarMenuSub ❌, SidebarMenuSubItem ❌, SidebarMenuSubButton ❌ |
| skeleton.tsx | ✅ | Skeleton ✅ |
| slider.tsx | ✅ | Slider ✅ |
| sonner.tsx | ✅ | Sonner ❌ |
| switch.tsx | ✅ | Switch ✅ |
| table.tsx | ✅ | Table ✅, TableHeader ❌, TableBody ❌, TableFooter ❌, TableRow ❌, TableHead ❌, TableCell ❌, TableCaption ❌ |
| tabs.tsx | ✅ | TabsList ✅, TabsTrigger ✅, TabsContent ✅ |
| textarea.tsx | ✅ | Textarea ✅ |
| toggle-group.tsx | ✅ | ToggleGroup ✅, ToggleGroupItem ❌ |
| toggle.tsx | ❌ missing on: Toggle, toggleVariants | Toggle ✅ |
| tooltip.tsx | ✅ | TooltipTrigger ❌, TooltipContent ✅ |

## Per-Component Customizations

Each section below details the non-standard customizations for one component. There are three subsections:

- **Explicit `// CUSTOM:` customizations** — changes that are already annotated in the source with a `// CUSTOM:` comment.
- **Other comment-indicated customizations** — changes documented by other comments that indicate intent (e.g. "Changed from X to Y", "Added for accessibility").
- **Uncalled-out customizations (from git history)** — changes detected by diffing the current file against its first-add commit, which were not already documented by a comment.

### alert.tsx

#### Explicit `// CUSTOM:` customizations

- **Where:** `alertVariants` cva base string and destructive variant
  **What:** Added `[&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground` to base, and `[&>img]:tw-text-destructive` to destructive variant
  **Why:** Copied all svg arbitrary selector variant classes as img variants so images (or svgs from file) can be used as icons. Implemented by TJ Couch, approved by Alex Mercado, 20 February 2025.

- **Where:** `Alert` component className
  **What:** Added `'pr-twp'`
  **Why:** Tailwind prefix scoping (comment: `// CUSTOM`)

#### Other comment-indicated customizations

- **Where:** `AlertTitle` render output
  **What:** Renders `{props.children}{' '}` explicitly (trailing space)
  **Note:** Added because of JSX a11y heading-has-content rule (comment references the ESLint rule URL)

#### Uncalled-out customizations (from git history)

- **Where:** `alertVariants` cva class strings
  **What:** Tailwind prefix changed from `pr-` to `tw-` throughout
  **Why:** Project-wide prefix migration

- **Where:** All component JSDoc
  **What:** Added JSDoc comments (`/** The Alert displays... */`, `/** @inheritdoc Alert */`)
  **Why:** Documentation standard

---

### avatar.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** All components
  **What:** Added JSDoc comments
  **Why:** Documentation standard

- **Where:** `AvatarImage` className
  **What:** `pr-twp` was added (not in shadcn boilerplate)
  **Why:** Tailwind prefix scoping — typically only the root needs it, but this was applied to each sub-component

---

### badge.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `badgeVariants` cva base string
  **What:** Added `pr-twp`
  **Why:** Tailwind prefix scoping

- **Where:** `badgeVariants` variants
  **What:** Added `tw-border` to default, secondary, and destructive variants (boilerplate had `tw-border-transparent` without explicit `tw-border`)
  **Why:** Explicit border rendering fix

- **Where:** `badgeVariants` variants
  **What:** Added new variants: `muted`, `blueIndicator`, `mutedIndicator`, `ghost`. Note: `ghost` variant appears to have a truncated class (`tw-text-mu` — possibly incomplete)
  **Why:** Application-specific design needs

- **Where:** `Badge` component
  **What:** Converted from plain function to `React.forwardRef` with ref support; added `displayName`
  **Why:** Consistency with other components; ref forwarding support

- **Where:** `Badge` component className
  **What:** `pr-twp` explicitly added to the div (in addition to it being in the cva base string)
  **Why:** Belt-and-suspenders scoping; uncertain if intentional duplication

---

### button-group.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- File appears to have been added in its current form (diff from boilerplate commit to HEAD is empty). This may not be a standard shadcn component copied from a boilerplate — shadcn does not ship a ButtonGroup component. It uses `@radix-ui/react-slot` and `cva` following shadcn conventions. All customizations (if any) were present at the time the file was added to this repo.

---

### button.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `buttonVariants` cva base string
  **What:** Added `pr-twp`, `tw-gap-2`, `[&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0`
  **Why:** `pr-twp` for prefix scoping; gap and svg utilities are from newer shadcn versions or custom additions

- **Where:** All Tailwind class strings
  **What:** Changed from `pr-` prefix to `tw-` prefix throughout
  **Why:** Project-wide prefix migration

- **Where:** Import statement
  **What:** Changed `import * as React from "react"` to `import React from 'react'`
  **Why:** Import style standardization

- **Where:** Exports
  **What:** Changed from `export { Button, buttonVariants }` at bottom to inline `export const` on each declaration
  **Why:** Export style preference

---

### card.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

- **Where:** `CardTitle` render output
  **What:** Renders `{props.children}` explicitly
  **Note:** Added because of JSX a11y heading-has-content rule (comment references the ESLint rule URL)

#### Uncalled-out customizations (from git history)

- **Where:** All components
  **What:** Added `pr-twp` to each component's className (not in shadcn boilerplate)
  **Why:** Tailwind prefix scoping

- **Where:** All Tailwind class strings
  **What:** Prefix migrated from `pr-` to `tw-`
  **Why:** Project-wide prefix migration

- **Where:** All components
  **What:** Added JSDoc comments
  **Why:** Documentation standard

---

### checkbox.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** Root element className
  **What:** Added `pr-twp`
  **Why:** Tailwind prefix scoping

- **Where:** All Tailwind class strings
  **What:** Migrated from `pr-` to `tw-` prefix
  **Why:** Project-wide prefix migration

- **Where:** Import statement
  **What:** Changed `import * as React` to `import React`
  **Why:** Import style standardization

- **Where:** Exports
  **What:** Changed to `export const` and added `export default Checkbox`
  **Why:** Export style preference

---

### command.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `CommandInput` wrapper div
  **What:** Added `readDirection()` call and `dir={dir}` prop; changed `tw-mr-2` to `tw-me-2`
  **Why:** RTL/bidirectional text support

- **Where:** `CommandShortcut`
  **What:** Changed `tw-ml-auto` to `tw-ms-auto`
  **Why:** RTL support (logical property)

- **Where:** All Tailwind class strings
  **What:** Migrated from `pr-` to `tw-` prefix
  **Why:** Project-wide prefix migration

- **Where:** All components
  **What:** Added JSDoc comments
  **Why:** Documentation standard

---

### context-menu.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- File appears unchanged since it was added to this repo (diff is empty). Either all customizations were already present at the time of the add commit, or no customizations have been made since.

---

### dialog.tsx

#### Explicit `// CUSTOM:` customizations

- **Where:** File-level comment
  **What:** `// CUSTOM JSDoc comments added to all components for documentation`
  **Why:** Documentation standard — all JSDoc was intentionally added as a customization

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `DialogContent`
  **What:** Added `readDirection()` and `dir={dir}` prop on `DialogPrimitive.Content`
  **Why:** RTL support

- **Where:** `DialogContent` close button
  **What:** Close button position is now dynamic: `tw-right-4` for LTR, `tw-left-4` for RTL (boilerplate had hardcoded `tw-right-4`)
  **Why:** RTL support

- **Where:** `DialogHeader`
  **What:** Changed `sm:tw-text-left` to `sm:tw-text-start`
  **Why:** RTL support (logical property)

- **Where:** `DialogOverlay`
  **What:** Fixed broken class `pr-` (empty prefix artifact) that existed in boilerplate
  **Why:** Bug fix

- **Where:** All Tailwind class strings
  **What:** Migrated from `pr-` to `tw-` prefix
  **Why:** Project-wide prefix migration

---

### drawer.tsx

#### Explicit `// CUSTOM:` customizations

- **Where:** `DrawerContext` creation (top of file)
  **What:** Added `DrawerContext` to manage drawer direction
  **Why:** Propagates direction to child components

- **Where:** `Drawer` component
  **What:** Uses `DrawerContext` to provide direction to child components
  **Why:** Direction-aware rendering

- **Where:** `DrawerContentProps` interface
  **What:** Extended `DrawerPrimitive.Content` props with additional `hideDrawerHandle` prop
  **Why:** Allows consumers to hide the drag handle

- **Where:** `DrawerContent` internal logic
  **What:** `directionStyles` object maps direction to position classes; `handleStyles` object maps direction to handle position classes
  **Why:** Direction-aware styling for different drawer positions

- **Where:** `DrawerContent` className
  **What:** Removed hardcoded bottom-only classes; added direction-aware `flex-col`/`flex-row`
  **Why:** Support for drawers on all four sides

- **Where:** `DrawerContent` render
  **What:** Conditional handle rendering based on `direction` and `hideDrawerHandle` prop
  **Why:** Direction-aware handle position and optional hiding

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `DrawerContent`
  **What:** Added `hideDrawerHandle` prop (extends original API)
  **Why:** Allows consumers to hide the drag handle

- **Where:** All sub-component JSDoc
  **What:** Added `@inheritdoc Drawer` comments
  **Why:** Documentation standard

---

### dropdown-menu.tsx

#### Explicit `// CUSTOM:` customizations

- **Where:** `DropdownMenuProps` type
  **What:** Added `variant` prop to support different styles
  **Why:** Application-specific menu variant system

- **Where:** `DropdownMenu` component
  **What:** Wraps `DropdownMenuPrimitive.Root` with `MenuContext.Provider` to propagate variant
  **Why:** Provides context to add variants to child items

- **Where:** `DropdownMenuSubTrigger`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`
  **What:** Use `useMenuContext()` and `menuVariants()` for variant-aware styling
  **Why:** Context-driven variant application

- **Where:** `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`
  **What:** Added `dir={dir}` from `readDirection()`
  **Why:** RTL support

- **Where:** `DropdownMenuSubContent`
  **What:** Wraps children in `<div dir={dir}>`
  **Why:** RTL support

- **Where:** `DropdownMenuContent`
  **What:** Added `pr-twp` with comment: "adding pr-twp because the dropdown content is added to the dom as a sibling to the app root"
  **Why:** Tailwind prefix scoping (content is portaled outside normal DOM tree)

#### Other comment-indicated customizations

- **Where:** `DropdownMenuContent`
  **What:** TODO comment documents a known limitation: does not support `dir` prop for RTL scrollbar positioning
  **Note:** Known shadcn bug; RTL scrollbar positioning not supported

- **Where:** `DropdownMenuItem`
  **What:** Comment: `// removed: tw-relative focus:tw-text-accent-foreground`
  **Note:** Documents deliberately removed classes

- **Where:** `DropdownMenuShortcut`
  **What:** `eslint-disable` comment: "Shadcn UI pattern: spreading props onto the element is necessary to forward all HTML attributes"
  **Note:** Intentional props spread pattern

#### Uncalled-out customizations (from git history)

- **Where:** Imports and new utilities
  **What:** Added `MenuContext`, `MenuContextProps`, `menuVariants`, `useMenuContext` from `@/context/menu.context`; added `readDirection` from `@/utils/dir-helper.util`
  **Why:** Variant system and RTL support

- **Where:** All prop type exports
  **What:** Explicit prop type interfaces exported (`DropdownMenuSubTriggerProps`, `DropdownMenuSubContentProps`, `DropdownMenuContentProps`, `DropdownMenuItemProps`, `DropdownMenuCheckboxItemProps`, `DropdownMenuRadioItemProps`, `DropdownMenuLabelProps`, `DropdownMenuSeparatorProps`, `DropdownMenuShortcutProps`). Boilerplate used inline types.
  **Why:** Reusability and documentation

- **Where:** `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem` class strings
  **What:** Changed `tw-pl-8 tw-pr-2` to `tw-pe-2 tw-ps-8`; indicator span uses `ltr:tw-left-2 rtl:tw-right-2`
  **Why:** RTL support (logical properties)

- **Where:** `DropdownMenuShortcut`
  **What:** Changed `tw-ml-auto` to `tw-ms-auto`
  **Why:** RTL support (logical property)

- **Where:** Exports
  **What:** Changed from bottom `export { ... }` to inline `export` on each declaration
  **Why:** Export style preference

- **Where:** File-level eslint directive
  **What:** Removed `/* eslint-disable react/prop-types */`
  **Why:** No longer needed

---

### input.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

- **Where:** `Input` component props spread
  **What:** `eslint-disable` comment: "Shadcn UI pattern: spreading props onto the element is necessary to forward all HTML attributes"
  **Note:** Intentional props spread pattern

#### Uncalled-out customizations (from git history)

- **Where:** `Input` className
  **What:** Added `pr-twp`; removed `tw-w-full` (input is no longer full-width by default); added `file:tw-text-foreground`
  **Why:** Prefix scoping and styling adjustments

- **Where:** All Tailwind class strings
  **What:** Migrated from `pr-` to `tw-` prefix
  **Why:** Project-wide prefix migration

- **Where:** Import statement
  **What:** Changed `import * as React` to `import React`
  **Why:** Import style standardization

- **Where:** Exports
  **What:** Changed from `export { Input }` to `export const Input`
  **Why:** Export style preference

---

### label.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `Label` className
  **What:** Added `'pr-twp'` as first argument to `cn()` (boilerplate had `cn(labelVariants(), className)`)
  **Why:** Tailwind prefix scoping

- **Where:** All Tailwind class strings
  **What:** Migrated from `pr-` to `tw-` prefix
  **Why:** Project-wide prefix migration

- **Where:** Code style
  **What:** Changed from double-quoted, semicolon-free style to single-quoted with semicolons
  **Why:** Code style standardization (Prettier config)

- **Where:** Exports
  **What:** Changed from `export { Label }` to `export const Label`
  **Why:** Export style preference

---

### menubar.tsx

#### Explicit `// CUSTOM:` customizations

- **Where:** `Menubar` component
  **What:** Wraps root with `MenuContext.Provider` to support variants
  **Why:** Variant system (comment: `#region CUSTOM provide context to add variants`)

- **Where:** `MenubarTrigger` className
  **What:** Added `'pr-twp'`
  **Why:** Tailwind prefix scoping (comment: `// CUSTOM`)

- **Where:** `MenubarTrigger`, `MenubarSubTrigger`, `MenubarSubContent`, `MenubarContent`, `MenubarItem`, `MenubarCheckboxItem`, `MenubarRadioItem`
  **What:** Use `useMenuContext()` and/or `menuVariants()` for variant-aware styling
  **Why:** Context-driven variant application (comment: `// CUSTOM use context to add variants`)

- **Where:** `MenubarContent` className
  **What:** Added `'pr-twp'` to reset styles so that only shadcn styles are applied
  **Why:** Tailwind prefix scoping for portaled content (comment: `// CUSTOM reset styles so that only shadcn styles are applied`)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** Imports
  **What:** Added `MenuContext`, `MenuContextProps`, `menuVariants`, `useMenuContext` from `@/context/menu.context`
  **Why:** Variant system

- **Where:** `Menubar`
  **What:** Added `variant` prop of type `MenuContextProps['variant']`
  **Why:** Menu variant support

- **Where:** `MenubarSubContent`, `MenubarContent`
  **What:** Added conditional `'tw-bg-popover': context.variant === 'muted'` class
  **Why:** Muted variant styling

- **Where:** Export order
  **What:** Exports reordered alphabetically
  **Why:** Code organization

---

### popover.tsx

#### Explicit `// CUSTOM:` customizations

- **Where:** `PopoverContent` `style` prop
  **What:** Uses `Z_INDEX_ABOVE_DOCK` shared constant via inline style instead of Tailwind `tw-z-50` class
  **Why:** Consistent z-index management via shared constant (comment: `// CUSTOM z-index uses shared constant instead of default tw-z-50`)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `PopoverContent`
  **What:** Added `readDirection()` and `dir={dir}` prop
  **Why:** RTL support

- **Where:** `PopoverContent`
  **What:** Replaced `tw-z-50` class with `style={{ zIndex: Z_INDEX_ABOVE_DOCK, ...style }}`; added `style` to destructured props
  **Why:** Consistent z-index management via shared constant

- **Where:** Exports
  **What:** Added `PopoverAnchor` (not in original boilerplate)
  **Why:** Additional primitive re-export needed by consumers

- **Where:** All Tailwind class strings
  **What:** Migrated from `pr-` to `tw-` prefix
  **Why:** Project-wide prefix migration

---

### progress.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** All
  **What:** Added JSDoc comment
  **Why:** Documentation standard

---

### radio-group.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `RadioGroup`
  **What:** Added `readDirection()` and `dir={dir}` prop
  **Why:** RTL support

- **Where:** All Tailwind class strings
  **What:** Migrated from `pr-` to `tw-` prefix
  **Why:** Project-wide prefix migration

- **Where:** All components
  **What:** Added JSDoc comments
  **Why:** Documentation standard

---

### resizable.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** All
  **What:** Added JSDoc comments
  **Why:** Documentation standard

---

### select.tsx

#### Explicit `// CUSTOM:` customizations

- **Where:** `selectTriggerVariants` base class string
  **What:** Removed `tw-justify-between`; added `tw-gap-2`, `[&>span]:tw-flex-1`, `[&>span]:tw-text-start`
  **Why:** Keeps chevron tight against text while allowing span to fill remaining space (comment: `// CUSTOM: Removed tw-justify-between. Added tw-gap-2, [&>span]:tw-flex-1, [&>span]:tw-text-start`)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `selectTriggerVariants`
  **What:** Entirely new cva factory added with size variants (default, sm, lg, icon); boilerplate had inline classes directly on SelectTrigger
  **Why:** Enables size variants matching button sizes

- **Where:** `SelectTriggerProps`
  **What:** New exported interface combining primitive props with `VariantProps<typeof selectTriggerVariants>`
  **Why:** Type support for size variants

- **Where:** `SelectTrigger`
  **What:** Added `readDirection()` and `dir={dir}` prop
  **Why:** RTL support

- **Where:** `SelectContent`
  **What:** Added `readDirection()` and wraps children in `<div dir={dir}>`
  **Why:** RTL support

- **Where:** `SelectItem` class strings
  **What:** Changed `tw-pl-8 tw-pr-2` to `tw-pe-2 tw-ps-8`; indicator span changed `tw-left-2` to `tw-start-2`
  **Why:** RTL support (logical properties)

- **Where:** All Tailwind class strings
  **What:** Migrated from `pr-` to `tw-` prefix
  **Why:** Project-wide prefix migration

---

### separator.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `Separator` className
  **What:** Added `pr-twp`
  **Why:** Tailwind prefix scoping

- **Where:** All Tailwind class strings
  **What:** Migrated from `pr-` to `tw-` prefix
  **Why:** Project-wide prefix migration

- **Where:** Import statement
  **What:** Changed `import * as React` to `import React`
  **Why:** Import style standardization

---

### sidebar.tsx

#### Explicit `// CUSTOM:` customizations

- **Where:** Keyboard shortcut handler
  **What:** `SIDEBAR_KEYBOARD_SHORTCUT` constant and `useEffect` keyboard handler commented out
  **Why:** Pending discussion with UX about keyboard shortcuts (comment: `// CUSTOM: Commented this out pending a discussion with UX about keyboard shortcuts`)

- **Where:** `SidebarContextProps`
  **What:** `side` property moved from `Sidebar` props to `SidebarContextProps`
  **Why:** Allows child components to flip the icon based on the side (comment: `// CUSTOM: this was moved from Sidebar to SidebarProvider to also be able to flip the icon based on the side`)

- **Where:** `Sidebar` inner div
  **What:** Changed `tw-fixed` to `tw-absolute`
  **Why:** Scopes the sidebar inside its container rather than the viewport (comment: `// CUSTOM: Switched tw-fixed to tw-absolute here to scope the sidebar inside of its container`)

- **Where:** `SidebarInset` and `SidebarProvider`
  **What:** Removed `tw-min-h-svh`
  **Why:** Removed minimum viewport height constraint (comment: `// CUSTOM: Removed tw-min-h-svh`)

#### Other comment-indicated customizations

- **Where:** Top-level file comment
  **What:** Documents changes from original shadcn code: removed `useIsMobile`, `Sheet`, `SheetContent`, and cookie-setting parts
  **Note:** Major structural changes from boilerplate documented at file level

#### Uncalled-out customizations (from git history)

- **Where:** `SidebarProvider`
  **What:** Removed `useIsMobile`, `openMobile`, `setOpenMobile`, `isMobile` state and props; removed mobile `Sheet` rendering path entirely
  **Why:** Mobile sidebar not needed in Platform.Bible (Electron) context

- **Where:** `SidebarProvider`
  **What:** Removed cookie setting (`SIDEBAR_COOKIE_NAME`, `SIDEBAR_COOKIE_MAX_AGE`, `useCookies`)
  **Why:** Cookies not used in Electron app

- **Where:** `SidebarProvider`
  **What:** Added `side` prop and `readDirection()` for RTL-aware side calculation
  **Why:** RTL support and primary/secondary side naming

- **Where:** `Sidebar`
  **What:** Changed `side` prop values from `'left'|'right'` to `'primary'|'secondary'` using context; removed `side` prop from `Sidebar` (now on `SidebarProvider`)
  **Why:** Logical direction naming for RTL support

- **Where:** `SidebarTrigger`
  **What:** Now shows `PanelLeft` or `PanelRight` icon based on `context.side`
  **Why:** Visual indication matches sidebar side

- **Where:** `SidebarRail`
  **What:** Changed `data-side=left/right` references to `data-side=primary/secondary`
  **Why:** Consistent with side renaming

- **Where:** `SidebarMenuButton`
  **What:** Removed `isMobile` from tooltip hidden condition
  **Why:** Mobile path removed

- **Where:** Removed imports
  **What:** Removed `Sheet`, `SheetContent`, `useIsMobile` imports
  **Why:** Mobile sidebar path removed

- **Where:** Added import
  **What:** Added `PanelRight` from lucide-react
  **Why:** Needed for secondary-side trigger icon

---

### skeleton.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** All
  **What:** Added JSDoc comment
  **Why:** Documentation standard

---

### slider.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `Slider`
  **What:** Added `readDirection()` and `dir={dir}` prop
  **Why:** RTL support

- **Where:** `Slider` className
  **What:** Added `pr-twp`
  **Why:** Tailwind prefix scoping

- **Where:** All Tailwind class strings
  **What:** Migrated from `pr-` to `tw-` prefix
  **Why:** Project-wide prefix migration

---

### sonner.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

- **Where:** `sonner` export (toast function)
  **What:** Re-export of the sonner toast function was added manually
  **Note:** "The re-export of the sonner function was added manually"

#### Uncalled-out customizations (from git history)

- **Where:** `Sonner` component
  **What:** Removed `useTheme()` from `next-themes` and the `theme` prop on `Toaster`
  **Why:** `next-themes` is not used in Platform.Bible

- **Where:** `Sonner` className
  **What:** Changed from `pr-toaster pr-group` to `tw-toaster tw-group`
  **Why:** Prefix migration. Note: these are plain class names used by sonner's own CSS selectors, not Tailwind utilities.

- **Where:** `Sonner` `toastOptions` classNames
  **What:** Class names in `toastOptions` do NOT use `tw-` prefix (e.g., `group-[.toaster]:bg-background`)
  **Why:** These classes are used by sonner's internal styling which expects unprefixed Tailwind class names — uncertain if this is intentional

---

### switch.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `Switch`
  **What:** Added `readDirection()` with conditional thumb translation classes for LTR (`tw-translate-x-5`) vs RTL (`tw-translate-x-[-20px]`)
  **Why:** RTL support — thumb needs to slide in opposite direction

- **Where:** Switch Thumb className
  **What:** Added `pr-twp` to Thumb (boilerplate did not have it on thumb)
  **Why:** Tailwind prefix scoping

- **Where:** All Tailwind class strings
  **What:** Migrated from `pr-` to `tw-` prefix
  **Why:** Project-wide prefix migration

---

### table.tsx

#### Explicit `// CUSTOM:` customizations

- **Where:** `Table` and `TableRow` refs
  **What:** Use internal refs to manage keyboard navigation and Enter key behavior; sync internal ref to forwarded ref if provided
  **Why:** Custom keyboard navigation system

- **Where:** `Table` — MutationObserver
  **What:** Forces `tabindex=-1` on all focusable elements within the table to prevent tab navigation
  **Why:** Custom tab focus management

- **Where:** `Table` — keydown handler
  **What:** `handleKeyDownInTable` handles ArrowDown and Space keys
  **Why:** Keyboard navigation

- **Where:** `Table` element
  **What:** `tabIndex={0}` makes table tabbable; `onKeyDown={handleKeyDownInTable}` enables keyboard behavior; `ref={tableRef}` for internal ref management
  **Why:** Accessible keyboard navigation

- **Where:** `Table` className
  **What:** Added `tw-outline-none` (remove duplicate outline); added focus ring styles (`focus:tw-relative focus:tw-z-10 focus:tw-ring-2 ...`)
  **Why:** Focus styling

- **Where:** `Table` attributes
  **What:** Added `aria-label="Table"` and `aria-labelledby="table-label"`
  **Why:** Accessibility

- **Where:** `useFocusableInRowKeyboardNavigation` hook (custom)
  **What:** Manages keyboard navigation and Enter key behavior for focusable elements in a row
  **Why:** Accessible row keyboard navigation

- **Where:** `focusAdjacentFocusableElementInRow` function (custom)
  **What:** Moves focus left or right to adjacent focusable items in the same row
  **Why:** Keyboard navigation

- **Where:** `focusAdjacentRow` function (custom)
  **What:** Moves focus up or down to adjacent rows in the same table
  **Why:** Keyboard navigation

- **Where:** `TableRow` element
  **What:** `tabIndex={-1}` makes row not tabbable directly; `onFocus` handler for focus-triggers-select behavior; focus ring styles and `tw-outline-none`
  **Why:** Keyboard navigation and focus management

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `Table`
  **What:** Added `stickyHeader` prop with conditional `tw-p-1` padding
  **Why:** Support for sticky table headers

- **Where:** `TableHeader`
  **What:** Added `stickyHeader` prop with sticky positioning classes
  **Why:** Sticky header support

- **Where:** `TableRow`
  **What:** Added `setFocusAlsoRunsSelect` prop and `onSelect` callback integration
  **Why:** Custom selection-on-focus behavior

- **Where:** Utility imports
  **What:** Added `getFocusableElements` from `@/utils/focus.util`
  **Why:** Keyboard navigation utility

- **Where:** `TableHead` class strings
  **What:** Changed `tw-text-left` to `tw-text-start`; `[&:has([role=checkbox])]:tw-pr-0` to `tw-pe-0`
  **Why:** RTL support (logical properties)

- **Where:** `TableCell` class strings
  **What:** Changed `[&:has([role=checkbox])]:tw-pr-0` to `tw-pe-0`
  **Why:** RTL support (logical properties)

- **Where:** All Tailwind class strings
  **What:** Migrated from `pr-` to `tw-` prefix
  **Why:** Project-wide prefix migration

- **Where:** File-level eslint directive
  **What:** Removed `/* eslint-disable react/jsx-props-no-spreading */`
  **Why:** No longer needed

---

### tabs.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `TabsList`
  **What:** Added `readDirection()` and `dir={dir}` prop
  **Why:** RTL support

- **Where:** All components
  **What:** Added `pr-twp` to className
  **Why:** Tailwind prefix scoping

- **Where:** All Tailwind class strings
  **What:** Migrated from `pr-` to `tw-` prefix
  **Why:** Project-wide prefix migration

- **Where:** Exports
  **What:** Changed from `export { Tabs, TabsList, TabsTrigger, TabsContent }` to inline `export const`
  **Why:** Export style preference

- **Where:** Types
  **What:** Added `TabsListProps`, `TabsTriggerProps`, `TabsContentProps` explicit type exports
  **Why:** Explicit type exports for consumers

- **Where:** File-level eslint directive
  **What:** Removed `/* eslint-disable react/prop-types */`
  **Why:** No longer needed

---

### textarea.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** All
  **What:** Added JSDoc comment
  **Why:** Documentation standard

---

### toggle-group.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `ToggleGroup`
  **What:** Added `readDirection()` and `dir={dir}` prop
  **Why:** RTL support

- **Where:** `ToggleGroup` className
  **What:** Removed `pr-font-sans` class
  **Why:** Font class not needed / handled elsewhere

- **Where:** All Tailwind class strings
  **What:** Migrated from `pr-` to `tw-` prefix
  **Why:** Project-wide prefix migration

- **Where:** All components
  **What:** Added JSDoc comments
  **Why:** Documentation standard

---

### toggle.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `toggleVariants` base string
  **What:** Removed `pr-font-sans` class
  **Why:** Font class not needed / handled elsewhere

- **Where:** All Tailwind class strings
  **What:** Migrated from `pr-` to `tw-` prefix
  **Why:** Project-wide prefix migration

---

### tooltip.tsx

#### Explicit `// CUSTOM:` customizations

- **Where:** `TooltipTrigger` component
  **What:** Extended to accept `ButtonProps` and applies `buttonVariants` when `variant` is provided; allows TooltipTrigger to be styled as a button without nesting a Button inside it
  **Why:** Avoids the need for a nested button inside the trigger (comment: `// CUSTOM: TooltipTrigger is a button, so allow to use the button variants`)

- **Where:** `TooltipContent` `style` prop
  **What:** Uses `Z_INDEX_ABOVE_DOCK` shared constant via inline style instead of Tailwind `tw-z-50` class
  **Why:** Consistent z-index management via shared constant (comment: `// CUSTOM z-index uses shared constant instead of default tw-z-50`)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **Where:** `TooltipTrigger`
  **What:** Changed from simple re-export (`const TooltipTrigger = TooltipPrimitive.Trigger`) to a `forwardRef` component accepting `ButtonProps` and conditionally applying `buttonVariants`
  **Why:** Allows TooltipTrigger to be styled as a button without nesting a Button inside it

- **Where:** `TooltipContent`
  **What:** Wrapped in `<TooltipPrimitive.Portal>` (boilerplate did not have Portal)
  **Why:** Ensures tooltip renders in a portal to avoid clipping/z-index issues

- **Where:** `TooltipContent`
  **What:** Replaced `tw-z-50` class with `style={{ zIndex: Z_INDEX_ABOVE_DOCK, ...style }}`; added `style` to destructured props
  **Why:** Consistent z-index management via shared constant

- **Where:** Imports
  **What:** Added `ButtonProps`, `buttonVariants` from button, and `Z_INDEX_ABOVE_DOCK` from z-index
  **Why:** Needed for customizations above
