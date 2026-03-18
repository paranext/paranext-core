---
paths:
  - "lib/platform-bible-react/**"
  - "**/*.web-view.tsx"
---

# React Component Decisions

Design decisions for React components (not enforceable by linting).

## Colocation Principle

Create folder when component has 2+ of: test, story, types, utils

```
component-name/
├── component-name.component.tsx
├── component-name.stories.tsx
├── component-name.test.tsx
├── component-name.types.ts    # If props > 20 lines
└── component-name.utils.ts    # If has helpers
```

## Storybook Conventions

- **Hierarchy**: `'Basics/'`, `'Advanced/'`, `'Shadcn/'` based on complexity
- **Tags**: `['autodocs', 'test']` - enables docs + a11y checks
- **Sample data**: Extract to `.data.ts` if reused across stories

## Handler Naming Convention

| Prefix     | When to Use                                             |
| ---------- | ------------------------------------------------------- |
| `on*`      | Simple callbacks passed as props: `onSave`, `onChange`  |
| `handle*`  | Internal/story handlers: `handleUpdateComment`          |
| `can*`     | Permission checks: `canUserAssignThread`                |

## Accessibility Checklist

- Interactive elements need `aria-label` or visible text
- Keyboard navigation for custom controls (arrow keys, escape)
- Focus management with `aria-activedescendant` for listboxes

## What's Enforced by Linting (Don't Duplicate)

- Tailwind `tw-` prefix → ESLint: PNX011
- Localized strings → ESLint: no-hardcoded-jsx-strings
- ARIA localization → ESLint: require-localized-aria
- Theme colors → ESLint: no-hardcoded-tailwind-colors

See [Component-Selection-Quick-Reference.md](/.context/standards/Component-Selection-Quick-Reference.md).
