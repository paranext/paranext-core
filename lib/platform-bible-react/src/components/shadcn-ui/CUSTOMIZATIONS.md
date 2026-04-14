> This file is AI-generated at specific times for use with updating shadcn components and may not reflect current code. It is retained for ease of reference only. To regenerate, run `/shadcn-customizations` in Claude Code.

# Shadcn UI Component Customizations

This document captures all customizations made to shadcn/ui components relative to their original boilerplate, to aid future shadcn version upgrades. For each component, it records: whether TSDocs are present on all exports, whether DOM-rendered components have the `pr-twp` Tailwind scope class applied, and the specific code changes made (explicit annotations, other comment-indicated changes, and uncalled-out changes detected via git history).

## Standard Customizations

The table below summarizes the two standard customizations that every shadcn component should have:

- **TSDocs on all exports?** — Whether every exported symbol (components, interfaces, types, constants) has a TSDoc comment (`/** ... */`) that includes links to the upstream libraries it uses (e.g. the shadcn/ui component page, the Radix UI primitive page, the Vaul page for drawer components). ✅ means all exports have TSDocs with appropriate library links; ❌ lists exports that are missing TSDocs or missing library links. A TSDoc that uses `@inheritdoc` pointing to a symbol whose TSDoc has the required links also passes.
- **pr-twp on DOM-rendered components?** — Whether each component that renders actual DOM output has `pr-twp` in its base Tailwind class string. `pr-twp` is a scope marker required for Platform.Bible's Tailwind CSS isolation (see `tailwind.config.ts`). ✅ means the class is present; ❌ means it is missing. Only components that produce DOM output are listed — compound root components (e.g. `Dialog`, `Popover`) that coordinate state without rendering DOM nodes are excluded, as are cva variant factories.

| Component | TSDocs on all exports? | pr-twp on DOM-rendered components? |
| --------- | ---------------------- | ---------------------------------- |
| alert.tsx | ✅ | `Alert` ✅<br/>`AlertTitle` ❌<br/>`AlertDescription` ❌ |
| avatar.tsx | ✅ | `Avatar` ✅<br/>`AvatarImage` ✅<br/>`AvatarFallback` ✅ |
| badge.tsx | ✅ | `Badge` ✅ |
| button-group.tsx | ❌ missing TSDocs: ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants | `ButtonGroup` ✅<br/>`ButtonGroupText` ❌<br/>`ButtonGroupSeparator` ❌ |
| button.tsx | ✅ | `Button` ✅ (via `buttonVariants` base class) |
| card.tsx | ✅ | `Card` ✅<br/>`CardHeader` ✅<br/>`CardTitle` ✅<br/>`CardDescription` ✅<br/>`CardContent` ✅<br/>`CardFooter` ✅ |
| checkbox.tsx | ✅ | `Checkbox` ✅ |
| command.tsx | ❌ missing TSDocs: CommandDialogProps | `Command` ❌<br/>`CommandInput` ❌<br/>`CommandList` ❌<br/>`CommandEmpty` ❌<br/>`CommandGroup` ❌<br/>`CommandSeparator` ❌<br/>`CommandItem` ❌<br/>`CommandShortcut` ❌ |
| context-menu.tsx | ✅ | `ContextMenuSubTrigger` ✅<br/>`ContextMenuSubContent` ✅<br/>`ContextMenuContent` ✅<br/>`ContextMenuItem` ✅<br/>`ContextMenuCheckboxItem` ❌<br/>`ContextMenuRadioItem` ❌<br/>`ContextMenuLabel` ❌<br/>`ContextMenuSeparator` ❌<br/>`ContextMenuShortcut` ❌ |
| dialog.tsx | ❌ missing TSDocs: DialogContentProps / ❌ missing links: DialogTrigger, DialogPortal, DialogClose, DialogOverlay, DialogHeader, DialogFooter, DialogTitle, DialogDescription | `DialogContent` ✅<br/>`DialogOverlay` ❌<br/>`DialogHeader` ❌<br/>`DialogFooter` ❌<br/>`DialogTitle` ❌<br/>`DialogDescription` ❌ |
| drawer.tsx | ❌ missing TSDocs: DrawerContentProps | `DrawerContent` ✅<br/>`DrawerOverlay` ❌<br/>`DrawerHeader` ❌<br/>`DrawerFooter` ❌<br/>`DrawerTitle` ❌<br/>`DrawerDescription` ❌ |
| dropdown-menu.tsx | ✅ | `DropdownMenuSubContent` ✅<br/>`DropdownMenuContent` ✅<br/>`DropdownMenuSubTrigger` ❌<br/>`DropdownMenuItem` ❌<br/>`DropdownMenuCheckboxItem` ❌<br/>`DropdownMenuRadioItem` ❌<br/>`DropdownMenuLabel` ❌<br/>`DropdownMenuSeparator` ❌<br/>`DropdownMenuShortcut` ❌ |
| input.tsx | ✅ | `Input` ✅ |
| label.tsx | ✅ | `Label` ✅ |
| menubar.tsx | ❌ missing TSDocs: Menubar, MenubarTrigger, MenubarSubTrigger, MenubarSubContent, MenubarContent, MenubarItem, MenubarCheckboxItem, MenubarRadioItem, MenubarLabel, MenubarSeparator, MenubarShortcut, MenubarMenu, MenubarGroup, MenubarPortal, MenubarRadioGroup, MenubarSub | `MenubarTrigger` ✅<br/>`MenubarContent` ✅<br/>`Menubar` ❌<br/>`MenubarSubTrigger` ❌<br/>`MenubarSubContent` ❌<br/>`MenubarItem` ❌<br/>`MenubarCheckboxItem` ❌<br/>`MenubarRadioItem` ❌<br/>`MenubarLabel` ❌<br/>`MenubarSeparator` ❌<br/>`MenubarShortcut` ❌ |
| popover.tsx | ✅ | `PopoverContent` ✅ |
| progress.tsx | ✅ | `Progress` ✅ |
| radio-group.tsx | ✅ | `RadioGroup` ✅<br/>`RadioGroupItem` ✅ |
| resizable.tsx | ✅ | `ResizablePanelGroup` ❌<br/>`ResizablePanel` ❌ (bare re-export — pr-twp cannot be injected)<br/>`ResizableHandle` ❌ |
| select.tsx | ✅ | `SelectContent` ✅<br/>`SelectTrigger` ❌<br/>`SelectScrollUpButton` ❌<br/>`SelectScrollDownButton` ❌<br/>`SelectLabel` ❌<br/>`SelectItem` ❌<br/>`SelectSeparator` ❌ |
| separator.tsx | ✅ | `Separator` ✅ |
| sidebar.tsx | ✅ | `SidebarProvider` ✅<br/>`Sidebar` ❌<br/>`SidebarTrigger` ❌<br/>`SidebarRail` ❌<br/>`SidebarInset` ❌<br/>`SidebarInput` ❌<br/>`SidebarHeader` ❌<br/>`SidebarFooter` ❌<br/>`SidebarSeparator` ❌<br/>`SidebarContent` ❌<br/>`SidebarGroup` ❌<br/>`SidebarGroupLabel` ❌<br/>`SidebarGroupAction` ❌<br/>`SidebarGroupContent` ❌<br/>`SidebarMenu` ❌<br/>`SidebarMenuItem` ❌<br/>`SidebarMenuButton` ❌<br/>`SidebarMenuAction` ❌<br/>`SidebarMenuBadge` ❌<br/>`SidebarMenuSkeleton` ❌<br/>`SidebarMenuSub` ❌<br/>`SidebarMenuSubItem` ❌<br/>`SidebarMenuSubButton` ❌ |
| skeleton.tsx | ✅ | `Skeleton` ✅ |
| slider.tsx | ✅ | `Slider` ✅ |
| sonner.tsx | ❌ missing TSDocs: sonner (re-exported `toast` function) | `Sonner` ❌ (pr-twp cannot be injected into third-party `Toaster` internal DOM) |
| switch.tsx | ✅ | `Switch` ✅ (present but not at front — `tw-peer` precedes `pr-twp`) |
| table.tsx | ✅ | `Table` ✅<br/>`TableHeader` ❌<br/>`TableBody` ❌<br/>`TableFooter` ❌<br/>`TableRow` ❌<br/>`TableHead` ❌<br/>`TableCell` ❌<br/>`TableCaption` ❌ |
| tabs.tsx | ✅ | `TabsList` ✅<br/>`TabsTrigger` ✅<br/>`TabsContent` ✅ |
| textarea.tsx | ✅ | `Textarea` ✅ |
| toggle-group.tsx | ✅ | `ToggleGroup` ✅<br/>`ToggleGroupItem` ✅ (via `toggleVariants` from toggle.tsx) |
| toggle.tsx | ❌ missing TSDocs: toggleVariants, Toggle | `Toggle` ✅ (via `toggleVariants` base class) |
| tooltip.tsx | ✅ | `TooltipContent` ✅<br/>`TooltipTrigger` ✅ (conditionally — only when `variant` prop is provided; no `pr-twp` when used without a variant) |

## Per-Component Customizations

Each section below details the non-standard customizations for one component. There are three subsections:

- **Explicit `// CUSTOM:` customizations** — changes that are already annotated in the source with a `// CUSTOM:` comment.
- **Other comment-indicated customizations** — changes documented by other comments that indicate intent (e.g. "Changed from X to Y", "Added for accessibility").
- **Uncalled-out customizations (from git history)** — changes detected by diffing the current file against its first-add commit, which were not already documented by a comment.

### alert.tsx

#### Explicit `// CUSTOM:` customizations

- **`alertVariants` base class string** — Added `[&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground` alongside existing `svg` arbitrary selectors, so that `<img>` elements (or SVGs loaded from file) can be used as icons in the same position as inline `<svg>` icons. Implemented by TJ Couch, approved by Alex Mercado, 20 February 2025.
- **`alertVariants` destructive variant** — Added `[&>img]:tw-text-destructive` alongside `[&>svg]:tw-text-destructive` for the same img-as-icon support in the destructive variant.
- **`Alert` className** — Added `'pr-twp'` as the first argument to `cn()`. The comment reads `// CUSTOM` (no colon, no explanation) — this is the standard `pr-twp` customization but the annotation is incomplete.

#### Other comment-indicated customizations

- **`AlertTitle` `<h5>` element** — Added explicit `{props.children}{' '}` (trailing space after children) rather than relying solely on `{...props}`. The comment references the `jsx-a11y/heading-has-content` rule, ensuring the heading always has content for the accessibility linter.

#### Uncalled-out customizations (from git history)

- **TSDocs** — `Alert` gained a full TSDoc with library link; `AlertTitle` and `AlertDescription` gained `/** @inheritdoc Alert */`. None of these carry `// CUSTOM:` annotations.
- **Incomplete annotation** — The `// CUSTOM` comment above `'pr-twp'` in `Alert` is missing the required colon and explanation. The `// CUSTOM:` convention requires explaining what was changed, what it does, and why.

---

### avatar.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **TSDocs** — `Avatar` gained a full TSDoc with library link; `AvatarImage` and `AvatarFallback` gained `/** @inheritdoc Avatar */`. None carry `// CUSTOM:` annotations.
- **`pr-twp`** — Present in all three components' className strings. No `// CUSTOM:` annotation.

---

### badge.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **`badgeVariants` base class** — Removed `tw-border` from the base class string. Border is now applied per-variant so that new indicator variants can be borderless.
- **Per-variant border additions** — `default`, `secondary`, `destructive`, and `outline` variants each gained an explicit `tw-border` at the start of their class strings (consequence of moving border out of the base).
- **New variants** — Four variants were added that did not exist in the boilerplate: `muted` (`'tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80'`), `blueIndicator` (small blue dot), `mutedIndicator` (small muted dot), `ghost`. Note: `ghost` contains `tw-text-mu` which appears to be a truncated class — likely `tw-text-muted-foreground`. None carry `// CUSTOM:` annotations.
- **`Badge` refactored to `React.forwardRef`** — Boilerplate used a plain function; current code uses `React.forwardRef<HTMLDivElement, BadgeProps>` with `Badge.displayName`. Not annotated.
- **Explicit `pr-twp` in `Badge`** — Added `'pr-twp'` as the first argument to `cn()` in `Badge`, separate from the `badgeVariants` base string. Not annotated.
- **TSDocs** — All three exports (`badgeVariants`, `BadgeProps`, `Badge`) gained TSDocs with library links. None carry `// CUSTOM:` annotations.

---

### button-group.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **`pr-twp`** — added `pr-twp`. Not annotated.
- **TSDocs** — **None of the exports have any TSDoc comments.** This is a significant gap relative to the standard; no TSDoc additions have been made to this file.

---

### button.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **`buttonVariants` base class** — Added `pr-twp` at the front, `tw-gap-2`, and three SVG-targeting classes (`[&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0`). Boilerplate had none of these. Not annotated.
- **TSDocs** — `buttonVariants`, `ButtonProps`, and `Button` all gained TSDocs with library links. None carry `// CUSTOM:` annotations.

---

### card.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

- **`CardTitle` `<h3>` element** — Added explicit `{props.children}` rendering inside `<h3>`. Comment references `jsx-a11y/heading-has-content`.

#### Uncalled-out customizations (from git history)

- **`pr-twp` on all six components** — Added `pr-twp` as the first class in the className string for `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`. Boilerplate had none. Not annotated.
- **TSDocs** — `Card` gained a full TSDoc with library link; all five sub-components gained `/** @inheritdoc Card */`. None carry `// CUSTOM:` annotations.

---

### checkbox.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **`pr-twp`** — `pr-twp` added at the front of the `Checkbox` className string, and `CheckboxPrimitive.Indicator` and the `Check` icon classes also migrated. Not annotated.

---

### command.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **New import** — Added `import { Direction, readDirection } from '@/utils/dir-helper.util'` for RTL support. Not annotated.
- **TSDocs** — `Command` gained a full TSDoc with shadcn/ui and cmdk links; all other exports gained `/** @inheritdoc Command */`. `CommandDialogProps` (interface) still has no TSDoc — this is the remaining gap. None carry `// CUSTOM:` annotations.
- **`CommandInput` RTL refactor** — Refactored from a single-expression arrow function to a block body that calls `readDirection()`, storing the result in `dir`. The outer `<div>` received `dir={dir}`. The `Search` icon class changed from `tw-mr-2` to `tw-me-2` (logical margin-end for RTL). Not annotated.
- **`CommandShortcut` `tw-ml-auto` → `tw-ms-auto`** — Physical margin-left replaced with logical margin-start for RTL support. Not annotated.

---

### context-menu.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **`pr-twp`** — added `pr-twp`. Not annotated.

**Missing `pr-twp`:** `ContextMenuCheckboxItem`, `ContextMenuRadioItem`, `ContextMenuLabel`, `ContextMenuSeparator`, and `ContextMenuShortcut` do not have `pr-twp`.

---

### dialog.tsx

#### Explicit `// CUSTOM:` customizations

- **`DialogOverlay` className + `style` prop** — Removed `tw-z-50` from the className. Added `style={{ zIndex: Z_INDEX_MODAL_BACKDROP, ...style }}` to replace the hardcoded Tailwind z-index with a shared constant from `@/components/z-index`, ensuring modals stack above rc-dock and other overlay layers.
- **`DialogContentProps` type** — Introduced a new exported type extending `React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>` with an `overlayClassName?: string` prop, allowing callers to pass per-instance overlay styling.
- **`DialogContent` — `overlayClassName` forwarded to `DialogOverlay`** — Passes the `overlayClassName` prop through to `<DialogOverlay>` so per-call backdrop styling flows correctly.
- **`DialogContent` className + `style` prop** — Removed `tw-z-50`; added `pr-twp`; added `style={{ zIndex: Z_INDEX_MODAL, ...style }}` using the shared z-index constant.

#### Other comment-indicated customizations

- **File header comment** — `// CUSTOM JSDoc comments added to all components for documentation` documents that TSDocs were added to all components, serving as a catch-all annotation.

#### Uncalled-out customizations (from git history)

- **New imports** — `Z_INDEX_MODAL`, `Z_INDEX_MODAL_BACKDROP` from `@/components/z-index` and `readDirection` from `@/utils/dir-helper.util`. Not separately annotated.
- **`DialogOverlay` props destructuring** — Added `style` to destructured props to allow merging with the custom z-index style object. Not annotated beyond the CUSTOM on the style attribute.
- **`DialogContent` — `dir` prop** — Added `const dir = readDirection()` and `dir={dir}` on `DialogPrimitive.Content` for RTL support. Not annotated.
- **`DialogContent` — RTL-aware close button** — `tw-right-4` replaced with `{ 'tw-right-4': dir === 'ltr' }` / `{ 'tw-left-4': dir === 'rtl' }`. Not annotated.
- **`DialogContent` — block body refactor** — Changed from single-expression arrow function to block body to accommodate the `readDirection()` call. Not annotated.
- **`DialogHeader` — `sm:tw-text-start`** — `sm:pr-text-left` changed to `sm:tw-text-start` (logical property for RTL awareness). Not annotated.
- **Missing library links on most exports** — `DialogTrigger`, `DialogPortal`, `DialogClose` have short JSDoc descriptions but no library links. `DialogOverlay`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription` have TSDoc comments but no library links. These are gaps relative to the standard.

---

### drawer.tsx

#### Explicit `// CUSTOM:` customizations

- **`DrawerContext`** — Added `React.createContext` to hold the drawer `direction` value, enabling child components to read it without prop-drilling.
- **`Drawer` function** — Wraps `DrawerPrimitive.Root` in a `DrawerContext.Provider` with a `React.useMemo`-memoized context value containing `direction`.
- **`DrawerContentProps` interface** — Declared as a new exported type extending `React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>` with `hideDrawerHandle?: boolean`, allowing consumers to suppress the drag handle.
- **`DrawerContent` — direction context read** — Reads `direction` from `DrawerContext` to style the content correctly for the active direction.
- **`DrawerContent` — `directionStyles` map** — A lookup map of Tailwind position/size classes for each direction value (bottom/top/left/right), replacing the boilerplate's bottom-only layout.
- **`DrawerContent` — `handleStyles` map** — A lookup map of Tailwind classes for the drag handle visual, varying by direction.
- **`DrawerContent` — className string** — Replaces the original bottom-only layout classes with a direction-agnostic base set plus a conditional flex direction.
- **`DrawerContent` — handle and children rendering** — Conditionally renders the handle `<div>` before or after `{children}` depending on direction, gated by `!hideDrawerHandle`.

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **TSDocs** — `Drawer` gained a full TSDoc with shadcn/ui and Vaul links; all sub-components gained `/** @inheritdoc Drawer */`. `DrawerContentProps` (interface) still has no TSDoc — this is a gap. None carry `// CUSTOM:` annotations.

---

### dropdown-menu.tsx

#### Explicit `// CUSTOM:` customizations

- **`DropdownMenuProps` type (`#region CUSTOM`)** — New exported type extending `React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>` with `variant?: MenuContextProps['variant']`. Boilerplate had no `DropdownMenu` type.
- **`DropdownMenu` function (`#region CUSTOM`)** — Replaces the boilerplate's `const DropdownMenu = DropdownMenuPrimitive.Root` with a function component that wraps the root in a `MenuContext.Provider`, propagating `variant` down the tree via context.
- **`DropdownMenuSubTrigger`** — Added `useMenuContext()` and appended `menuVariants({ variant: context.variant })` to `cn(...)` for variant-driven styling.
- **`DropdownMenuSubContent`** — Wraps `{children}` in `<div dir={dir}>` where `dir = readDirection()` for RTL support.
- **`DropdownMenuItem`** — Added `readDirection()` → `dir`, `dir={dir}` on the element, and `menuVariants(...)` in `cn(...)` for RTL and variant styling.
- **`DropdownMenuCheckboxItem`** — Added RTL `dir` prop, `menuVariants` in className, and changed indicator `<span>` to use `ltr:tw-left-2 rtl:tw-right-2` for RTL-aware positioning.
- **`DropdownMenuRadioItem`** — Same RTL and variant pattern as `DropdownMenuCheckboxItem`.

#### Other comment-indicated customizations

- **`DropdownMenuContent` — TODO comment** — Documents a known limitation: `DropdownMenuContent` cannot fully fix the scrollbar-position issue in RTL layouts; a workaround wraps children in `<div dir={dir}>`.
- **`DropdownMenuContent` — `pr-twp` comment** — `/* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */` explains why `pr-twp` is present on portal-rendered content.

#### Uncalled-out customizations (from git history)

- **New imports** — `@/context/menu.context`, `@/utils/dir-helper.util`, `@/utils/shadcn-ui.util`. Not annotated.
- **`DropdownMenuSubContent` — block body refactor** — Changed to a block body to call `readDirection()` and wrap children in `<div dir={dir}>`. Function body refactoring not separately annotated.
- **`DropdownMenuContent` — block body + `children` destructured** — Changed to a block body; `children` explicitly destructured and wrapped in `<div dir={dir}>`. Not annotated.
- **`DropdownMenuItem` — removed `tw-relative` and `focus:tw-text-accent-foreground`** — An inline comment notes the removal (`// removed: tw-relative focus:tw-text-accent-foreground`) but does not use the `// CUSTOM:` format.
- **`DropdownMenuCheckboxItem` and `DropdownMenuRadioItem` — logical padding** — `tw-pl-8 tw-pr-2` → `tw-ps-8 tw-pe-2` (logical properties for RTL). The existing CUSTOM comments cover RTL generally but not these specific class changes.

---

### input.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **`Input` className — `tw-w-full` removed** — Boilerplate had `tw-w-full`; current file omits it, giving callers control over width. This is a visual/behavioral change that should have had UX review per the guidelines. Not annotated.
- **`file:tw-text-foreground` added** — Not present in boilerplate; ensures the file-picker button text matches the foreground design token. Not annotated.

---

### label.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **`pr-twp` in `Label`** — Added `'pr-twp'` as the first argument to `cn(...)`, before `labelVariants()` and `className`. Not annotated.
- **TSDocs** — `Label` gained a full TSDoc with shadcn/ui and Radix UI links. Not annotated.

---

### menubar.tsx

#### Explicit `// CUSTOM:` customizations

- **`Menubar` — variant prop + `MenuContext.Provider` (`#region CUSTOM`)** — Added `variant?: MenuContextProps['variant']` to `Menubar`'s props; the component wraps `MenubarPrimitive.Root` in a `MenuContext.Provider` with a `React.useMemo`-memoized context value, propagating the variant down the tree.
- **`MenubarTrigger` — `pr-twp` + variant context** — Added `'pr-twp'` as a separate string argument to `cn(...)` (standard `pr-twp` customization); added `useMenuContext()` and `menuVariants({ variant: context.variant })` to apply variant-driven styles.
- **`MenubarContent` — `pr-twp` + variant context + muted background** — Added `'pr-twp'` with comment "reset styles so that only shadcn styles are applied"; added variant context and a conditional `{ 'tw-bg-popover': context.variant === 'muted' }` for background override.
- **`MenubarSubContent` — variant context + muted background** — Same variant context and muted background conditional as `MenubarContent`.
- **`MenubarSubTrigger`, `MenubarItem`, `MenubarCheckboxItem`, `MenubarRadioItem` — variant context** — All four use `useMenuContext()` and append `menuVariants({ variant: context.variant })` to their `cn(...)` calls.

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **New imports** — `MenuContext`, `MenuContextProps`, `menuVariants`, `useMenuContext` from `@/context/menu.context`. Not annotated.
- **TSDocs** — **None of the exports have any TSDoc comments.** This is a significant gap relative to the standard; no TSDoc additions have been made to this file.

---

### popover.tsx

#### Explicit `// CUSTOM:` customizations

- **`PopoverContent` — z-index via `style` prop** — Removed `tw-z-50` from className and replaced with `style={{ zIndex: Z_INDEX_ABOVE_DOCK, ...style }}` (importing `Z_INDEX_ABOVE_DOCK` from `@/components/z-index`), ensuring the popover always renders above the dock.

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **`PopoverContent` props destructuring** — Added `style` to the destructured props to merge with the custom z-index style. Not annotated.
- **`PopoverContent` — `dir` prop** — Added `const dir: Direction = readDirection()` and `dir={dir}` to `PopoverPrimitive.Content` for RTL support. Not annotated.
- **New imports** — `Direction`, `readDirection` from `@/utils/dir-helper.util`; `Z_INDEX_ABOVE_DOCK` from `@/components/z-index`. Not annotated.
- **`PopoverTrigger` TSDoc** — `/** @inheritdoc Popover */` added; not present in boilerplate. Not annotated.
- **Radix UI link format** — The Radix UI link in `Popover`'s TSDoc uses the old URL format (`https://www.radix-ui.com/docs/primitives/components/popover`) rather than the current format (`https://www.radix-ui.com/primitives/docs/components/popover`).

---

### progress.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **TSDoc** — `Progress` gained a full TSDoc with shadcn/ui and Radix UI documentation links (embedded as plain text URLs rather than `{@link ...}` tags, a minor formatting inconsistency). Not annotated.
- **`pr-twp`** — added (`'pr-twp tw-relative tw-h-4 ...'`)

---

### radio-group.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **`RadioGroup` — `dir` prop** — Added `const dir: Direction = readDirection()` and `dir={dir}` on `RadioGroupPrimitive.Root`; new import `Direction, readDirection` from `@/utils/dir-helper.util`. Not annotated.
- **`pr-twp`** — added `pr-twp`. Not annotated.
- **TSDocs** — `RadioGroup` gained a full TSDoc with shadcn/ui and Radix UI links (as plain text URLs); `RadioGroupItem` gained `/** @inheritdoc RadioGroup */`. None carry `// CUSTOM:` annotations.

---

### resizable.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **TSDocs** — `ResizablePanelGroup` gained a full TSDoc with shadcn/ui and react-resizable-panels links; `ResizablePanel` and `ResizableHandle` gained `/** @inheritdoc ResizablePanelGroup */`. None carry `// CUSTOM:` annotations.
- **Missing `pr-twp`** — None of the three DOM-rendered components have `pr-twp`. `ResizablePanel` is a bare re-export of `ResizablePrimitive.Panel` with no wrapper, making `pr-twp` impossible to inject without wrapping. `ResizablePanelGroup` and `ResizableHandle` could have `pr-twp` added to their class strings but do not currently.

---

### select.tsx

#### Explicit `// CUSTOM:` customizations

- **`selectTriggerVariants` base class** — Removed `tw-justify-between`; added `tw-gap-2`, `[&>span]:tw-flex-1`, and `[&>span]:tw-text-start`. Keeps the chevron icon tight against text content instead of drifting to the far edge on resize.

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **New imports** — `Direction`, `readDirection` from `@/utils/dir-helper.util`; `cva`, `VariantProps` from `class-variance-authority`. Not annotated.
- **`SelectTriggerProps` changed** — From a simple `type` alias to an `interface` extending `React.ComponentPropsWithoutRef` and `VariantProps<typeof selectTriggerVariants>`, plus `asChild?: boolean`. Not annotated.
- **`SelectTrigger` — RTL + size variant** — Refactored to a block body; added `readDirection()` → `dir`, `dir={dir}` on the trigger, `size` prop, and `cn(selectTriggerVariants({ size, className }))`. Not annotated.
- **`SelectContent` — RTL + `pr-twp`** — Refactored to a block body; added `readDirection()` → `dir`, wraps `{children}` in `<div dir={dir}>`; added `pr-twp` to class string. Not annotated.
- **`SelectItem` — logical padding** — `tw-pl-8 tw-pr-2` → `tw-ps-8 tw-pe-2`; `tw-w-full` added back; inner `<span>` changed from `tw-absolute tw-left-2` to `tw-absolute tw-start-2`. Not annotated.
- **`selectTriggerVariants` TSDoc wrong link** — The `@see` link in `selectTriggerVariants`'s TSDoc points to `https://ui.shadcn.com/docs/components/button` instead of the select component page. Likely a copy-paste error.

---

### separator.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **`pr-twp` + all Tailwind class prefixes** — `pr-twp` added and all `pr-` utility prefixes changed to `tw-` in both the base and conditional class strings. Neither change is annotated with `// CUSTOM:` despite `pr-twp` being a required standard customization.
- **TSDoc** — `Separator` gained a full TSDoc with shadcn/ui and Radix UI links. Not annotated.

---

### sidebar.tsx

#### Explicit `// CUSTOM:` customizations

- **Top-level comment block** — Documents that `useIsMobile`, `Sheet`, and `SheetContent` were removed, and cookie-setting logic was removed (not applicable in Platform.Bible).
- **`SIDEBAR_KEYBOARD_SHORTCUT` + `React.useEffect`** — The keyboard shortcut constant and the Ctrl/Cmd+B listener effect are commented out, pending UX discussion.
- **`SidebarContextProps.side`** — The `side` property was moved from `Sidebar` into the context so that `SidebarTrigger` can flip its icon (`PanelLeft` vs. `PanelRight`) based on the active side.
- **`Sidebar` inner div — `tw-fixed` → `tw-absolute`** — Changed positioning to scope the sidebar inside its containing element rather than the viewport, matching Platform.Bible's layout model.
- **`SidebarInset` — `tw-min-h-svh` removed** — Minimum viewport height removed as not appropriate in Platform.Bible's windowed layout.

#### Other comment-indicated customizations

- **`SidebarProvider` className — `tw-min-h-svh` removal comment** — Inline comment `// Removed tw-min-h-svh` documents the removal from the `SidebarProvider` wrapper `<div>` for the same reason as `SidebarInset`.

#### Uncalled-out customizations (from git history)

- **New imports** — `PanelRight` added from `lucide-react`; `Sheet`, `SheetContent`, `useIsMobile` removed; `Direction`, `readDirection` added from `@/utils/dir-helper.util`. Not individually annotated.
- **`SidebarProvider.side` prop** — New `side?: Side` prop (defaulting to `'primary'`) added at the provider level. Not annotated.
- **Direction-aware side computation** — `dir`, `oppositeSide`, `directionAwareSide` variables added to `SidebarProvider`; context populated with `directionAwareSide` for RTL support. Not annotated.
- **Mobile state removal** — `isMobile`, `openMobile`, `setOpenMobile` state and context fields removed; `SIDEBAR_COOKIE_NAME`, `SIDEBAR_COOKIE_MAX_AGE`, `SIDEBAR_WIDTH_MOBILE` constants removed; cookie write removed from `setOpen`. Partially documented by the top-level CUSTOM comment.
- **`data-side` naming** — All `data-side` values changed from directional (`left`/`right`) to positional (`primary`/`secondary`), and all CSS selectors updated accordingly throughout `Sidebar` and `SidebarRail`. Not annotated.
- **`SidebarTrigger` icon** — Renders `{context.side === 'primary' ? <PanelLeft /> : <PanelRight />}` instead of always `<PanelLeft />`. Not annotated.
- **`SidebarMenuButton` isMobile** — `hidden={state !== 'collapsed' || isMobile}` → `hidden={state !== 'collapsed'}` (mobile condition removed). Not annotated.
- **`sidebarMenuButtonVariants` class order** — Minor reordering of `data-[active=true]` classes; no functional impact. Not annotated.
- **`pr-twp` missing from most components** — Only `SidebarProvider` carries `pr-twp`. All other DOM-rendering components in this file are missing it. `SidebarTrigger` and `SidebarInput` delegate to `Button` and `Input` respectively (which have their own `pr-twp`), but all other direct DOM-rendering components lack it.

---

### skeleton.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **TSDoc** — `Skeleton` gained a full TSDoc with shadcn/ui link. Not annotated.
- **`pr-twp`** — added (`'pr-twp tw-animate-pulse ...'`)

---

### slider.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **New import** — `Direction`, `readDirection` from `@/utils/dir-helper.util`. Not annotated.
- **TSDoc** — `Slider` gained a full TSDoc with shadcn/ui and Radix UI links. Not annotated.
- **Block body refactor** — Converted from inline arrow function to block body to accommodate `readDirection()`. Not annotated.
- **`dir` prop** — `const dir: Direction = readDirection()` and `dir={dir}` on `SliderPrimitive.Root` for RTL slider fill direction. Not annotated.
- **`pr-twp`** — `pr-twp` added at the front of the `SliderPrimitive.Root` class string and updated throughout inner elements. Not annotated.

---

### sonner.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

- **`export { Sonner, sonner }` statement** — A comment documents that the re-export of the `sonner` (i.e., `toast`) function was added manually to the export list.

#### Uncalled-out customizations (from git history)

- **`useTheme` / `next-themes` removed** — The boilerplate imported `useTheme` from `next-themes` and passed `theme` to `<Toaster>`. Removed because this project does not use `next-themes`. The `theme` prop defaults to `"system"`. Not annotated.
- **Tailwind class prefix** — `"pr-toaster pr-group"` → `"tw-toaster tw-group"`. Not annotated.
- **TSDocs** — `SonnerProps` and `Sonner` gained TSDocs with shadcn/ui and sonner docs links. `sonner` (re-exported `toast` function) still has no TSDoc — remaining gap. Not annotated.
- **`pr-twp` absent** — The `Sonner` component renders `<Toaster>` from the `sonner` package; `pr-twp` cannot be injected into the third-party component's internal DOM without forking the library. This is a known limitation.

---

### switch.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **RTL direction support** — Added `import { Direction, readDirection } from '@/utils/dir-helper.util'`; `const dir = readDirection()` added inside the component; `SwitchPrimitives.Thumb` className changed from a static string to a `cn()` call that picks LTR or RTL `translate-x` classes based on `dir`. The boilerplate only had a single translate-x value valid for LTR. Not annotated.
- **pr-twp** — `pr-twp` added. Not annotated.
- **`pr-twp` position** — `tw-peer` was inserted before `pr-twp` in `SwitchPrimitives.Root`'s class string, so `pr-twp` is not at the very front as the standard requires. Not annotated.
- **TSDoc** — `Switch` gained a full TSDoc with shadcn/ui and Radix UI links. Not annotated.

---

### table.tsx

#### Explicit `// CUSTOM:` customizations

- **`Table` — `tableRef` + ref assignment effect** — Internal `React.useRef<HTMLTableElement>(null)` created; external `ref` assigned to it via `useEffect`. Enables keyboard navigation management while still forwarding the ref to consumers.
- **`Table` — `MutationObserver` effect** — Watches the table for DOM mutations and sets all focusable elements' `tabindex` to `-1` via `getFocusableElements`, ensuring Tab key navigation is handled exclusively by arrow key logic.
- **`Table` — `handleKeyDownInTable` + `onKeyDown`** — Keydown handler on the outer `<div>`: `ArrowDown` moves focus to the first focusable row; `Space` prevents default scroll when the table itself is focused.
- **`Table` — `<table> tabIndex={0}`** — Makes the table element focusable via Tab as the entry point for arrow key navigation.
- **`Table` — `<table> onKeyDown={handleKeyDownInTable}`** — Attaches the custom keyboard handler.
- **`Table` — `<table> ref={tableRef}`** — Uses the internal ref rather than the forwarded ref on `<table>`.
- **`Table` — `<table>` className: `tw-outline-hidden` + focus ring** — Removes default outline; adds `focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background` as a custom accessible focus indicator.
- **`Table` — ARIA attributes** — `aria-label="Table"` and `aria-labelledby="table-label"` added to `<table>`.
- **`useFocusableInRowKeyboardNavigation` hook** — New custom hook managing ArrowLeft/ArrowRight navigation between focusable elements in a row, and Escape to return focus to the row.
- **`focusAdjacentFocusableElementInRow` function** — Helper that moves focus to the next/previous focusable element within a row.
- **`focusAdjacentRow` function** — Helper that moves focus to the next/previous `<tr>` in the table.
- **`TableRow` — `rowRef` + ref forwarding + keyboard navigation hook** — Same internal-ref pattern as `Table`; calls `useFocusableInRowKeyboardNavigation`.
- **`TableRow` — `focusablesInRow` memoized** — `React.useMemo` computes and caches focusable elements in the row for keyboard navigation.
- **`TableRow` — `handleKeyDown` callback** — Full composite widget keyboard navigation: ArrowDown/Up between rows, ArrowLeft/Right within a row, Escape to return focus to the table.
- **`TableRow` — `handleFocus` + `onFocus`** — When `setFocusAlsoRunsSelect` is true, calls `onSelect` when the row receives focus (selection-on-focus behavior).
- **`TableRow` — `tabIndex={-1}`** — Rows are not directly Tab-reachable; only reachable via arrow keys from the table.
- **`TableRow` — `tw-outline-hidden` + focus ring** — Same pattern as `Table` for accessible focus indicator on focused rows.

#### Other comment-indicated customizations

(none beyond the `// CUSTOM:` annotations listed above)

#### Uncalled-out customizations (from git history)

- **`Table` outer `<div>` — `tw-overflow-auto` removed** — The boilerplate wrapper had `tw-overflow-auto` for horizontal scrolling; it was removed. This may affect layout in wide-table scenarios. Not annotated.
- **`Table` + `TableHeader` — `stickyHeader` prop** — New `stickyHeader?: boolean` prop added to both; `TableHeader` applies sticky classes (`tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm`) when true. Not annotated.
- **`TableHead` and `TableCell` — logical properties** — `pr-text-left` → `tw-text-start`; `[&:has([role=checkbox])]:pr-pr-0` → `[&:has([role=checkbox])]:tw-pe-0` for RTL support. Not annotated.
- **New import** — `getFocusableElements` from `@/utils/focus.util`. Not annotated.
- **TSDocs** — `Table` gained a full TSDoc with shadcn/ui link; all sub-components gained `/** @inheritdoc Table */`. None carry `// CUSTOM:` annotations.

---

### tabs.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **`TabsList` — `dir` prop** — Refactored to block body; added `readDirection()` → `dir`, `dir={dir}` on `TabsPrimitive.List` for RTL keyboard navigation direction. Not annotated.
- **New exported prop type aliases** — `TabsListProps`, `TabsTriggerProps`, `TabsContentProps` — three new exported type aliases wrapping `React.ComponentPropsWithoutRef<...> & { className?: string }`. Not annotated.
- **`pr-twp`** — `pr-twp` added at the front of each DOM-rendered component's class string. Not annotated.
- **TSDocs** — `Tabs` gained a full TSDoc with shadcn/ui and Radix UI links; all sub-components and prop types gained `/** @inheritdoc Tabs */`. None carry `// CUSTOM:` annotations.

---

### textarea.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **TSDoc** — `Textarea` gained a full TSDoc with shadcn/ui link. Not annotated.
- **`pr-twp`** — added `pr-twp`. Class string otherwise unchanged from baseline.

---

### toggle-group.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **`ToggleGroup` — `dir` prop** — Refactored to block body; added `readDirection()` → `dir`, `dir={dir}` on `ToggleGroupPrimitive.Root` for RTL support. New import `Direction`, `readDirection` from `@/utils/dir-helper.util`. Not annotated.
- **`ToggleGroup` className — `pr-font-sans` removed** — The boilerplate had `pr-font-sans` in the base class string; it was dropped, relying on inherited font instead. This is a visual/behavioral change. Not annotated.
- **pr-twp** — `pr-twp` added. Not annotated.
- **TSDocs** — `ToggleGroupContext`, `ToggleGroup`, and `ToggleGroupItem` all gained TSDocs (`ToggleGroup` full TSDoc with links; others `/** @inheritdoc ToggleGroup */`). None carry `// CUSTOM:` annotations.

---

### toggle.tsx

#### Explicit `// CUSTOM:` customizations

(none)

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **`toggleVariants` base class — `pr-font-sans` removed** — Boilerplate had `'pr-twp pr-font-sans pr-inline-flex ...'`; current is `'pr-twp tw-inline-flex ...'`. `pr-font-sans` dropped (same as `toggle-group.tsx`). Not annotated.
- **TSDocs missing** — Unlike other components, `toggle.tsx` still has no TSDoc comments on either `toggleVariants` or `Toggle`. This is a missing standard customization that has not been applied.

---

### tooltip.tsx

#### Explicit `// CUSTOM:` customizations

- **`TooltipTrigger` — `React.forwardRef` wrapper with `variant` prop** — Boilerplate assigned `TooltipTrigger = TooltipPrimitive.Trigger` (simple alias). Current version declares it as a `React.forwardRef` component that additionally accepts `ButtonProps` (specifically the `variant` prop), allowing the trigger to be styled directly with button variants.
- **`TooltipContent` — z-index via `style` prop** — Removed `tw-z-50` from className; added `style={{ zIndex: Z_INDEX_ABOVE_DOCK, ...style }}` using a shared constant from `@/components/z-index` for correct stacking above the dock.

#### Other comment-indicated customizations

(none)

#### Uncalled-out customizations (from git history)

- **New imports** — `ButtonProps`, `buttonVariants` from button.tsx; `Z_INDEX_ABOVE_DOCK` from `@/components/z-index`. Covered by intent via the CUSTOM comments on usage sites but the imports themselves are not annotated.
- **`TooltipContent` — wrapped in `<TooltipPrimitive.Portal>`** — Boilerplate rendered `<TooltipPrimitive.Content>` directly; current version wraps it in `<TooltipPrimitive.Portal>`, portaling the content to `document.body`. This is a significant behavioral change — ensures the tooltip is not clipped by overflow constraints and makes z-index management predictable. The existing `// CUSTOM z-index` comment only describes the z-index change, not the portal wrapping. Not annotated.
- **`style` prop destructured** — Added to `TooltipContent`'s destructured props to allow merging with the custom z-index style. Not annotated.
- **TSDocs** — `Tooltip` gained a full TSDoc with shadcn/ui and Radix UI links; all sub-components gained `/** @inheritdoc Tooltip */`. None carry `// CUSTOM:` annotations.
