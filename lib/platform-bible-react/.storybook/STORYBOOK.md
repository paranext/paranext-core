# Storybook for `platform-bible-react`

Conventions, tooling, and maintenance for this package’s Storybook. For Paratext branding (fonts, logos, manager theme), see [BRANDING.md](./BRANDING.md).

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
- **Visual regression:** `@chromatic-com/storybook` is included; follow your team’s Chromatic / CI workflow for baselines and required checks.

## Tooling

- **ESLint:** [`.eslintrc.cjs`](../.eslintrc.cjs) extends `plugin:storybook/recommended`. Keep stories and config lint-clean.
- **Upgrades:** After bumping Storybook, run **`npx storybook doctor`** from the repo (or this package) to catch duplicate React, wrong builder, or addon mismatches.
- **Versions:** Keep `storybook` and `@storybook/*` on the **same major** as the workspace root [package.json](../../../package.json).

## Configuration layout

| File | Role |
| --- | --- |
| [main.ts](./main.ts) | Stories glob, addons, Vite merge, `staticDirs` |
| [preview.ts](./preview.ts) | Global parameters, decorators, tags |
| [theme-constants.ts](./theme-constants.ts) | Toolbar theme ids shared by preview and manager |
| [theme-decorator.ts](./theme-decorator.ts) | Toolbar themes → `documentElement` + canvas colors |
| [preview-storybook.css](./preview-storybook.css) | `#storybook-root` and Storybook docs/loading surfaces |
| [manager.ts](./manager.ts) | Manager shell theme + sync with toolbar globals |
| [vitest.setup.ts](./vitest.setup.ts) | Portable stories / Vitest integration |

Add new global behavior in small modules and import them from `preview.ts` so this file stays an ordered list of decorators and parameters.

## Builds and publishing

- **Local build:** `npm run build:storybook` produces `storybook-static/` (gitignored). Use it to verify CI or to deploy a static Storybook for reviewers.
- **CI:** Ensure your pipeline runs `build:storybook` (and optional Chromatic) on relevant branches; document the artifact URL in the monorepo README if applicable.

## Canvas and theming

- Theme classes on `html` come from [theme-decorator.ts](./theme-decorator.ts); surfaces are in [preview-storybook.css](./preview-storybook.css) and [index.css](../src/index.css). **Canvas** uses `#storybook-root` for the full themed background. **Docs** uses `#storybook-docs` with `--muted` for the MDX page; embedded previews (`.sbdocs-preview`, zoom toolbar, `.docs-story`) use `--background` so they match Canvas. `body` is not painted with the canvas color so titles/descriptions are not forced to the same flat panel as the story.
