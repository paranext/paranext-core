---
paths:
  - 'package.json'
  - '.erb/scripts/**'
  - 'extensions/lib/**'
  - 'extensions/package.json'
  - 'lib/*/package.json'
  - 'release/app/package.json'
---

# Install-Path Scripts Must Not Load the Staged Dev Packages

`@eten-tech-foundation/platform-editor` and `@eten-tech-foundation/scripture-utilities` are not
installed from the npm registry. The root `preinstall` (`.erb/scripts/stage-dev-packages.ts`) copies
them from a `scripture-editors` checkout into `dev-packages/staging/<folder>`, and every
`package.json` here depends on those folders with a `file:` specifier. `dev-packages/` is gitignored,
so on a fresh clone **it does not exist until partway through the very first `npm install`.**

Two consequences for anything that runs during an install:

- **npm runs a workspace's lifecycle scripts before the root's.** So `extensions`' `postinstall`
  runs *before* the root `preinstall` has staged anything.
- A module that requires a staged package at import time therefore throws
  `Cannot find module '@eten-tech-foundation/...'`, and because it throws from a lifecycle script,
  it aborts the whole install. A fresh clone becomes unusable with an error that names the editor
  rather than the script that loaded it.

## The rule

**A script wired to `preinstall`, `install`, `postinstall`, or `prepare` — in the root
`package.json` or in any workspace's — must not import `platform-bible-utils`, `platform-bible-react`,
or anything else whose entry point reaches the editor packages.**

`platform-bible-utils`' `index.ts` is the usual trap: it re-exports from
`@eten-tech-foundation/scripture-utilities` at runtime (`usj-reader-writer.ts`, `scripture-util.ts`),
so importing *any* symbol from it loads that package.

A workspace's own dependencies are fine — npm installs those before running its lifecycle scripts.
Only the staged dev packages are missing at this point. `extensions/lib/add-remotes.ts` is the
reference: it uses native `String.prototype.includes` rather than the helper of the same name from
`platform-bible-utils`, and says so in a comment at the import site.

The root `preinstall` and `postinstall` entry points have a stricter constraint still — they run
before any devDependency is guaranteed installed, so they are plain Node importing only the standard
library, with no build step.

Recorded as `adr-dev-packages-staged-file-deps` in
[`Architecture-Decisions.md`](../../.context/standards/Architecture-Decisions.md).
