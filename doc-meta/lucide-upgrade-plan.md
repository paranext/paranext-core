# Lucide Upgrade Plan

Goal: Upgrade `lucide-react` to v1.x across the monorepo and ensure all icons and builds continue to work.

Background:

- Current state: root and many `extensions` packages use `lucide-react@^0.475.0`. `lib/platform-bible-react` briefly used `^1.8.0` but was reverted to `^0.475.0` to maintain consistency.
- Lucide v1 introduces renamed/moved icons and a new packaging structure. See https://lucide.dev/guide/react/migration and https://lucide.dev/guide/version-1#upgrading-to-version-1 for reference.

Requirements (automated LLM-actionable checklist):

1. Update package.json files in workspace to a single target version `^1.8.0`.
   - Files to update: root `package.json`, `extensions/*/package.json`, `lib/*/package.json` (if present).
   - Use workspace-level override if preferred (root `package.json` `overrides` or `resolutions` for yarn).
2. Run a workspace install to update `node_modules`.
   - Command (npm): `npm install` from repo root.
3. Find all code imports from `lucide-react` and attempt mechanical replacements for renamed icons.
   - Search pattern: `from 'lucide-react'` and `require('lucide-react')`.
   - Replace icons that were renamed in v1 using a mapping table (below).
4. Build and test each package that imports Lucide.
   - Run `npm run typecheck:platform-bible-react` and `npm run build:platform-bible-react`.
   - Run `cd extensions && npm run build` (or per-extension build scripts).
5. Run Chromatic to catch visual regressions in Storybook stories.
   - Publish stories to Chromatic: `npx chromatic --project-token=<token>` from repo root.
   - Review any flagged UI changes in the Chromatic dashboard and approve or reject them.
   - Pay particular attention to stories that render icons (search stories for `lucide-react` imports).
6. Manually inspect Storybook builds and webviews for icon rendering issues not caught by Chromatic.
   - Storybook: `npm run storybook:platform-bible-react`.
7. Fix runtime mismatches by:
   - Adjusting imports (named imports vs. default) where necessary.
   - Updating any icon usage where props changed (e.g., `size`, `strokeWidth` defaults).
8. Clean up older build artifacts that may bundle older Lucide versions (e.g., `storybook-static` folders).
9. Commit changes and open PR with migration notes and any remaining manual tasks.

Icon rename mapping (common cases — extend as needed):

- `CheckCircle` => `CheckCircle2` or `CheckCircle` (confirm in v1)
- `X` => `X` (confirm export unchanged)
- `Home` => `Home` (usually unchanged)

LLM Prompt Template (for automated refactor):
"""
You are an automated code-migration assistant. Update this repository to use `lucide-react@^1.8.0`.
Steps:

1. Update package.json dependency entries (list paths below).
2. Run `npm install`.
3. For each file importing from `lucide-react`, attempt to parse named imports and apply the mapping table to rename icons. If a mapping is ambiguous, add a TODO comment above the import and leave it unchanged.
4. Run TypeScript typecheck and build commands provided. Collect and report any compiler or runtime errors.
5. Generate a PR with changes and a migration summary.

Files to update:

- package.json
- extensions/\*/package.json (list auto-detected)
- lib/\*/package.json (list auto-detected)

Icon mapping (JSON):
{"CheckCircle":"CheckCircle2",…}

If any step fails, output the failing command and the error text.
"""

Manual review notes:

- Some icons may have been removed or renamed; do not blindly replace without previewing in Storybook.

Acceptance criteria for upgrade completion:

- All workspace packages use `lucide-react@^1.8.0` in dependencies or are pinned by root overrides.
- `npm run build:platform-bible-react` succeeds without lucide-related errors.
- Storybook pages that use icons render without missing icons.
- A PR has been created with migration notes and any manual follow-ups.

Owner: Engineering
Priority: Medium
