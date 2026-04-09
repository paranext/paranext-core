# Storybook for `platform-bible-react`

Conventions, tooling, and maintenance for this package’s Storybook. For Paratext branding (fonts, logos, optional manager shell theming), see [BRANDING.md](./BRANDING.md). For developer-facing theming guidance (tokens, toolbar, overrides), see [Guidelines/Theming](../src/stories/guidelines/theming.mdx) and [Guides / Theme Colors](../src/stories/guides/theme-colors.stories.tsx).

## Authoring stories (CSF 3)

- Use **CSF 3** with TypeScript: `Meta`, `StoryObj`, and `satisfies Meta<typeof Component>` (or `satisfies Meta<typeof meta>`) so `args` and controls stay type-safe.
- **Titles:** Follow the sidebar order configured in [preview.ts](./preview.ts) (`storySort.order`). Use a stable pattern such as `Shadcn/Button`, `Guidelines/Theming`, `Basics/Tabs`.
- **Autodocs:** Default tag is `autodocs`. Opt out with `tags: ['!autodocs']` when you supply a custom primary docs page.
- **Controls:** Prefer `argTypes` with descriptions and appropriate `control` types. Optional controls are sorted with `parameters.controls.sort: 'requiredFirst'` in [preview.ts](./preview.ts).
- **Docs:** Use `parameters.docs.description` or story-level descriptions before adding bespoke MDX.

## Testing

- **Vitest + Storybook:** [vitest.setup.ts](./vitest.setup.ts) calls `setProjectAnnotations` with this package’s `preview.ts`. Use **`play`** functions for interaction tests where the behavior is UI-driven; keep fast unit tests in Vitest `unit` project when logic does not need Storybook.
- **Browser tests:** Install Playwright browsers once: `npm run test:storybook:install-browsers` (see [package.json](../package.json)).
- **Accessibility:** `@storybook/addon-a11y` is enabled with `parameters.a11y.test: 'todo'`. Tighten to `'error'` in CI when violations are under control.
- **Visual regression:** `@chromatic-com/storybook` is installed so Storybook can talk to Chromatic, a hosted service that captures story screenshots and compares them to approved "baseline" images. This repo’s CI/release setup is what decides when baselines are updated and whether Chromatic is a required check on PRs.

## Tooling

- **ESLint:** [`.eslintrc.cjs`](../.eslintrc.cjs) extends `plugin:storybook/recommended`. Keep stories and config lint-clean.
- **Upgrades:** After bumping Storybook, run **`npx storybook doctor`** from the repo (or this package) to catch duplicate React, wrong builder, or addon mismatches.
- **Versions:** Keep `storybook` and `@storybook/*` on the **same major** as the workspace root [package.json](../../../package.json).

## Configuration layout

| File                                             | Role                                                                                                                                 |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| [main.ts](./main.ts)                             | Stories glob, addons, Vite merge, `staticDirs`                                                                                       |
| [preview.ts](./preview.ts)                       | Global parameters, decorators, tags                                                                                                  |
| [theme-constants.ts](./theme-constants.ts)       | Toolbar theme family / color scheme ids + legacy composite ids (shared with manager + theme apply)                                   |
| [theme-apply.ts](./theme-apply.ts)               | Class mapping, `localStorage` persistence, preview iframe DOM helper                                                                 |
| [theme-decorator.ts](./theme-decorator.ts)       | Preview: apply theme classes + channel sync                                                                                          |
| [manager.tsx](./manager.tsx)                     | Color scheme + Theme toolbars (direct iframe DOM updates, no `globals.theme`); optional shell tweaks in [BRANDING.md](./BRANDING.md) |
| [preview-storybook.css](./preview-storybook.css) | `#storybook-root` and Storybook docs/loading surfaces                                                                                |
| [vitest.setup.ts](./vitest.setup.ts)             | Portable stories / Vitest integration                                                                                                |

Add new global behavior in small modules and import them from `preview.ts` so this file stays an ordered list of decorators and parameters.

## Builds and publishing

- **Local build:** `npm run build:storybook` produces `storybook-static/` (gitignored). Use it to verify CI or to deploy a static Storybook for reviewers.
- **CI:** Ensure your pipeline runs `build:storybook` (and optional Chromatic) on relevant branches; document the artifact URL in the monorepo README if applicable.

## Canvas and theming

- Theme classes on `html` come from [theme-apply.ts](./theme-apply.ts) / [theme-decorator.ts](./theme-decorator.ts) and the **Color scheme** + **Theme** tools in [manager.tsx](./manager.tsx); surfaces are in [preview-storybook.css](./preview-storybook.css) and [index.css](../src/index.css). **Canvas** uses `#storybook-root` for the full themed background. **Docs** uses `#storybook-docs` with `--muted` for the MDX page; embedded previews (`.sbdocs-preview`, zoom toolbar, `.docs-story`) use `--background` so they match Canvas. `body` is not painted with the canvas color so titles/descriptions are not forced to the same flat panel as the story.
- **Persisted theme state:** The **Color scheme** and **Theme** tools store one JSON string under `localStorage` key `platform-bible-storybook-theme`: `{ family, colorScheme }` where `colorScheme` is `light`, `dark`, or `system` (see [theme-apply.ts](./theme-apply.ts)). If the value is still a legacy plain-text composite id from older Storybook builds, it is rewritten to JSON on first read. An older ThemeProvider used `vite-ui-theme`; that value is not migrated.
- **Authoring:** [Guidelines/Theming](../src/stories/guidelines/theming.mdx) explains the toolbar, per-story overrides, and adding themes. [Guides / Theme Colors](../src/stories/guides/theme-colors.stories.tsx) shows live token values for the selected theme.
