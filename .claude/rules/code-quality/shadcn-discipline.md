## shadcn/ui Edit Discipline

Every change to any file in `lib/platform-bible-react/src/components/shadcn-ui/`
**must** be annotated with a `// CUSTOM:` comment placed immediately before the
changed code. The comment must explain:

- **What** was changed (be specific — name the class, prop, or element)
- **What** the change does
- **Why** it was made

Example:

```tsx
// CUSTOM: Updated shadow color from hsl(var(--sidebar-border)) to var(--sidebar-border)
// to use the updated CSS variable format that includes the color space in the variable value
outline:
  'tw:bg-background tw:shadow-[0_0_0_1px_var(--sidebar-border)] ...',
```

This applies to **every** edit — including small find-and-replace changes that feel
mechanical. There are no exceptions.

See the full convention: `.context/standards/Code-Style-Guide.md#shadcnui-guidelines`
