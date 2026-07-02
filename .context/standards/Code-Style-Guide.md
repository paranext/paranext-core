---
title: Code Style Guide
description: TypeScript/C# conventions, design principles, localization, component patterns, and shadcn/ui usage.
---

# Code Style Guide

## Software Design and Review Principles

High-level guidelines that should shape both writing and reviewing code. The top-level bullets are essential; the sub-bullets are important clarifications and examples.

- **Minimize breaking changes**
  - Avoid changes to things other developers depend on that would cause their code to stop working as expected:
    - Package APIs (props on components in `platform-bible-react`)
    - Extension APIs (`contributions`, functions on the PAPI)
    - Localized strings
    - Template features (e.g. importing WebView code with `?inline`)
  - Non-breaking additions are usually acceptable, but consider whether the change is necessary at all.
  - Deprecate rather than remove when possible.
  - Sometimes a break is necessary. When it is, announce it in the [#platform-changes Discord channel](https://discord.com/channels/1064938364597436416/1136038164818034849).
- **Consider high-level organization**
  - Colocate related code/files when reasonable. (Exception: code running in different processes.)
  - For `platform-bible-react`, colocate component, story, and test files together:
    - `Button.tsx`, `Button.stories.tsx`, `Button.test.tsx`.
  - Keep files relatively small and self-contained. Use regions to divide larger files.
  - Don't include tidying or unrelated refactors in a feature PR. Open a separate PR.
  - Don't duplicate code when reasonably straightforward to share.
- **Follow existing patterns and code**
  - Respect separation of execution environments (processes, extension/renderer). Don't pass functions or class instances over the PAPI. Don't use `instanceof` on values that may have crossed execution environments — see [MDN's note](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms).
  - Prefer string unions over multiple interdependent booleans. Instead of `didError`, `isRunning`, `didComplete`, use a finite state union. This reduces contradictory states and increases flexibility.
- **Prioritize sustainability**
  - As the code owner, you're responsible for maintaining what you approve in your area.
  - If you aren't comfortable with the change, don't approve it.
  - If the impact isn't obvious from the diff, check out the branch locally and run the code.
- **Ask for help when unsure**
  - Necessary divergence from existing patterns, breaking changes, or foundational changes with wide-spread impact all warrant a second opinion.

---

## TypeScript-specific Guidelines

- **Filenames and paths are _kebab-case_** to avoid case-sensitivity issues across operating systems. Use the pattern `<feature>.<type>.{ts,tsx,html,scss}`, e.g. `network-object.service.ts`. Common types: `.component.tsx`, `.hook.ts`, `.context.tsx`, `.service.ts`, `.model.ts`, `.interface.ts`, `.test.tsx`, `.e2e-test.ts`. Use `.interface.ts` for class interfaces (prefix the interface name with capital `I`) and `.model.ts` for data-shape interfaces/types.
- **Prefer truthy/falsy checks** over `variable === undefined` — unless you specifically need `variable === undefined || variable === null` (e.g., when `0` or `""` is a valid value).
- **Explain rule exceptions**: If you disable a lint rule for a line or file, write a comment above the disable explaining why. This saves future readers from wondering whether the rule could be re-enabled.
- **Type declarations for reused objects**: If an object shape is used in multiple places, define a `type` for it and annotate usages — e.g. `const connectionInfo: ConnectionInfo = {...}`. This way, adding required fields surfaces errors at every usage.
- **Types vs interfaces**: Either is acceptable. Interfaces are open (extensible after declaration) and have better error messages; types are closed and can express primitives, unions, and tuples. Use whichever fits the situation. See [this comparison](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript/52682220#52682220).
- **Clear variable names**:
  - Functions use verbs: `getClientId`, `checkStatus`.
  - Booleans use status words: `didFinish`, `isInitialized`, `hasPolicy`. `success` is acceptable.
  - Avoid abbreviations that aren't widely accepted.
  - Capitalize acronyms per [.NET capitalization conventions](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/capitalization-conventions): two-letter together (`IOStream`), longer as words (`HttpRequest`).
- **Use comments to explain why**, not what. Don't narrate obvious code; do explain non-obvious intent or purpose.
- **Prefer `undefined` over `null`**: [JavaScript's two concepts of nothing](https://medium.com/@hbarcelos/why-i-banned-null-from-my-js-code-and-why-you-should-too-13df90323cfa) cause confusion. Use `undefined` throughout the codebase. Confine `null` to the boundary with external APIs that require or return it.
- **Use empty arrays over `undefined`** when an absent collection is meaningful — empty arrays are always safe to iterate.
- **Prefer path aliases for imports**: `import ... from '<alias>/...'` over long relative paths. Webpack is configured to understand the aliases.
- **`async/await` by default**: Use `Promise.then()` only when there's a concrete reason, and comment the reason.
- **`throw new Error()`**, not `throw Error()`.
- **Bundled deps belong in `devDependencies`**: Webpack bundles non-`external` imports into the final output, so those packages are `devDependencies`. See [this discussion](https://reviewable.io/reviews/paranext/paranext-core/380#-NcPBady7ifJq0YLZtwN).
- **Prefer TSDoc over JSDoc** in TypeScript. TSDoc does not duplicate types in the comment — TypeScript already has them.
- **Namespace-prefix shared-library exported types**: Types exported from `lib/platform-bible-react` (or any other shared library) should carry a feature/namespace prefix so they stay collision-proof across the whole monorepo — e.g. `ManageBooksAlertEntry`, not bare `AlertEntry`. Consumers re-import them under a short alias at the module boundary for component-local readability: `import { ManageBooksAlertEntry as AlertEntry } from 'platform-bible-react'`. This keeps library exports unambiguous without forcing consumers to read long names everywhere.

---

## Sanctioned TypeScript Libraries

For these concerns, use the platform-provided primitive — don't reach for the popular external library. Each entry lists what to use, what to avoid, and why.

- **State management** — Use `PlatformEventEmitter` plus local state objects.
  - **Avoid:** RxJS, Redux, MobX, Zustand, signals.
  - Lightweight and event-driven; integrates with the PAPI network model rather than introducing a parallel store.
- **Event emitting** — Use `PlatformEventEmitter` from `platform-bible-utils`.
  - **Avoid:** Node.js `EventEmitter`, `mitt`, `eventemitter3`.
  - The platform implementation adds lazy init, dispose support, and subscription tracking.
- **Async coordination** — Use `Mutex` (exclusive execution) and `AsyncVariable` (promise-based sync with a built-in timeout) from `platform-bible-utils`.
  - **Avoid:** raw `Promise.race` for timeouts, hand-rolled lock implementations.
  - `Mutex.runExclusive` serializes access; `AsyncVariable` resolves/rejects with timeout handling so callers don't re-implement either.
- **Serialization of wire data** — Use `serialize()`/`deserialize()` from `platform-bible-utils` for any cross-process/network payload.
  - **Avoid:** direct `JSON.parse`/`JSON.stringify` on wire data.
  - These handle the `null`↔`undefined` conversion across the boundary (`undefined` → `null` on the way out, `null` → `undefined` on the way back); raw `JSON` does not, so the codebase's `undefined`-everywhere convention silently breaks.
- **Logging** — Use `electron-log` via `logger.service.ts` (`src/shared/services/logger.service.ts`).
  - **Avoid:** `winston`, `pino`, `bunyan`, and `console.log` in production code.
  - Process-aware with combined file + console output, integrated with Electron. (`no-console` is enforced as an ESLint warning.)
- **Cross-boundary errors** — Use `PlatformError` (via `newPlatformError` from `platform-bible-utils`) for errors that cross a process/network boundary.
  - **Avoid:** plain `Error` objects across boundaries.
  - `PlatformError` is a serializable plain object that survives iframe/JSON-RPC serialization, carries a version field, and copies the source `stack` so the trace is preserved; a raw `Error` loses its prototype and stack across the boundary.

For UI styling, the sanctioned framework (TailwindCSS with the `tw:` prefix) is covered under [Theming](#theming). One addition:

- **CSS / styling** — **Avoid:** CSS-in-JS (`styled-components`, `emotion`), inline styles, and CSS modules. Use the `tw:`-prefixed Tailwind utilities described in [Theming](#theming) for consistent theming and performance.

---

## TypeScript Module Declaration Order

When creating a module, put local (non-exported) members at the top and exported members afterward, unless functionality ordering makes more sense. Put types, interfaces, and fields before functions and classes.

General layout:

1. Types/interfaces/fields
2. Functions
3. Classes

Occasionally [execution order](https://typescript-eslint.io/rules/no-use-before-define/) forces exported members to come first — that's acceptable.

---

## Class Declaration Order

1. Interface properties
2. Public properties
3. Private properties
4. Interface methods
5. Public methods
6. Private methods

Small accessors or closely-related code may deviate for readability.

---

## package.json Dependency Guidelines

`dependencies`, `devDependencies`, and `peerDependencies` are often confused. These guidelines matter most for packages others consume (e.g., `platform-bible-react`); they matter less for application projects like `paranext-core` itself.

- **`dependencies`**: packages directly imported in executable code (except `peerDependencies`) that you do NOT bundle into your distributable. Consumers of your package can independently update these to non-breaking versions.
- **`devDependencies`**: packages used only at dev time (linting, bundling, testing), OR packages whose code you bundle into your distributable. Bundled-in `devDependencies` are frozen into your package and can't be updated by consumers.
- **`peerDependencies`**: packages the _user_ of your package must also install (e.g., a React component library requires `react` as a peer). Whether or not you also import these directly, users need to bring their own compatible version.

---

## Documentation Comments

### TypeScript (TSDoc)

- Use TSDoc (`/** ... */`) for all public TypeScript APIs.
- Don't include types in the comment — TypeScript already has them.
- Follow existing patterns in `papi.d.ts` for type declarations.
- Use `@param`, `@returns`, `@example` where appropriate.
- For symbols at the **API surface** (definition below), follow the [API Surface TSDoc Requirements](#api-surface-tsdoc-requirements) — TSDoc must stand on its own as documentation.
- Reference the **JSDOC SOURCE/DESTINATION** pattern (documented in [`paranext-core`'s top-level `README.md`](https://github.com/paranext/paranext-core/blob/main/README.md)) when the same TSDoc needs to appear on more than one export — e.g. a service definition and its `papi.d.ts` re-export. It is _not_ the only way TSDoc reaches `papi.d.ts`; normal TSDoc on any exported symbol is already copied through by the type generator. Use SOURCE/DESTINATION only to _share_ one comment across multiple exports.

#### API Surface TSDoc Requirements

Code at the public **API surface** is read by extension authors using IntelliSense in their editors and visitors to the published TypeDoc site (https://paranext.github.io/paranext-core/papi-dts). **TSDoc on these symbols must stand on its own as documentation. Assume readers cannot look up anything outside the comment itself.**

**What counts as API surface (cross-boundary):**

- `lib/platform-bible-react/` — every exported component, hook, type, and prop interface
- `lib/platform-bible-utils/` — every exported function, type, and class
- `papi.d.ts` and `lib/papi-dts/` — auto-generated from `src/`; the type generator copies TSDoc through from each exported symbol's source file (typically `src/shared/services/`, `src/shared/models/`, etc.). Edit the source TSDoc, not the generated `.d.ts`. The `JSDOC SOURCE` / `JSDOC DESTINATION` pattern (see the TypeScript bullet under [Documentation Comments](#documentation-comments)) is reserved for when one comment must appear on multiple exports
- Extension `.d.ts` files declaring `papi-shared-types` augmentations — `CommandHandlers`, `DataProviders`, `SettingTypes`, web view options interfaces, anything other extensions can import or invoke
- Public types in `src/shared/` consumed across processes

**What does NOT count as API surface:** extension-internal helpers, `*.web-view.tsx` and `*.web-view-provider.ts` files, and component-internal exports used only within the same feature. Rich standalone TSDoc is encouraged but not required.

**Required content for API-surface TSDoc:**

1. **Purpose sentence** — what the symbol is and when to use it
2. **`@param` for each parameter** — describe the _meaning_; TypeScript already carries the type
3. **`@returns`** — what the caller receives, including units, sentinels, and edge cases (e.g. empty array for "none found", `undefined` when the input is out of range)
4. **`@example`** — for non-trivial functions, hooks, or components
5. **Preconditions / failure modes** — when the call throws, returns `undefined`, or behaves differently from the naive expectation
6. **`@deprecated <date> — <replacement>`** when superseding an older API; retain the old export marked deprecated rather than deleting it

### C# (XML Documentation)

- Use XML documentation comments (`/// <summary>`) for public APIs.
- Follow [Microsoft XML documentation guidelines](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/).
- Include `<param>`, `<returns>`, `<exception>`, and `<example>` where helpful.
- The API-surface TSDoc guidance above applies equivalently to public C# APIs visible across processes (e.g. data provider methods exposed via JSON-RPC) — the `///` XML doc must stand on its own.

---

## C#-specific Guidelines

Unless stated otherwise, follow:

- [Microsoft C# Coding Conventions](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- [Microsoft .NET Design Guidelines](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/)
- [Unit testing best practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices)

---

## Code Patterns We Use

- **Early Return (Guard Clauses)** — see [this explanation](https://gomakethings.com/the-early-return-pattern-in-javascript/#what-is-the-early-return-pattern). Always add a blank line after an early return to visually separate it.
- **[Get/Set/Reset for Value Stores](https://github.com/paranext/paranext/wiki/Get,-Set,-Reset-Pattern-for-Value-Stores)**.

---

## Editor Guidelines

- The team primarily uses [VS Code](https://code.visualstudio.com/). Other editors work, but VS Code has the most integration support.
- Prefer `npm` scripts over editor-specific build configuration. That way a script works in or out of VS Code.
- To add a word to the [CSpell](https://cspell.org/) dictionary, use VS Code's Quick Fix → `Add: "<word>" to config: paranext-core/cspell.json`. This keeps the entries alphabetized.

---

## Localized Strings Guidelines

- **Reuse vs new key**: Decide whether to reuse an existing localized string key or create a new one.
  1. If the existing key is deprecated, use its replacement (if any) and re-evaluate.
  2. If the texts are not exactly the same, make separate keys.
  3. If the two uses might diverge in another language, make separate keys.
  4. If the two uses serve the same purpose _and_ mean the same thing, reuse.
- **Name keys by purpose, not by English text**: The key `%platformScriptureEditor_dialog_openResourceViewer_prompt%` tells a reader what the string is for. Embedding the English text into the key obscures that.
- **Alphabetize** localized string key files.
- **Don't change or remove localized string keys** — existing uses across other repositories may break. Instead, create a new key. If all known uses of an old key are migrated, mark the old key [deprecated](https://github.com/paranext/paranext-core/blob/197c0893752324fbb587c50e2f98699969cf39cc/assets/localization/metadata.json#L13).
- **Don't change a string's meaning.** You can fix grammar or punctuation. If the meaning changes, create a new key.
- **Concatenate with format strings**, not string concatenation, unless you're joining with a newline. This lets translators rearrange the pieces for their language.
- **Be careful with counts and ordinals** — plural forms and ordinals localize very differently across languages. Prefer phrasings like "Puppies: 1" over "1 puppy".
- **Use "..." on menu items that open a dialog**. E.g., "Send/Receive projects..." opens a dialog; "Send/Receive this project" primarily acts, even if it also shows a dialog.
- **Never compare variables against hardcoded English strings**:

  ```typescript
  // ❌ Comparing against hardcoded English
  if (status === "Loading...") { ... }
  if (tabName === "General") { ... }
  if (errorMessage.includes("not found")) { ... }

  // ✅ Use constants or enums
  if (status === LoadingStatus.Loading) { ... }
  if (tabId === TabId.General) { ... }
  if (errorCode === ErrorCode.NotFound) { ... }

  // ✅ Or compare by localization key
  if (statusKey === '%status_loading%') { ... }
  ```

  This applies to conditional logic, array filtering/finding, and string includes/matching.

---

## Component Usage and Creation

Platform.Bible prioritizes intentional component selection based on **YAGNI** ("You aren't gonna need it"). Prefer a small set of consistently-deployed components over a proliferation of one-offs.

### Selection Framework

Before creating a new component:

1. Can an existing `platform-bible-react` component meet the requirement? Use it.
2. Should an existing component be enhanced to cover the new case?
3. Can you build on `platform-bible-react`, Shadcn, or Radix? Prefer these over external libraries.
4. Only then, consider an external library — and only if it meets quality and licensing standards.

### Theming

- Use **TailwindCSS** with the `tw:` prefix (configured via `@import 'tailwindcss/...' ... prefix(tw)` in `src/index.css`).
- Use semantic color variables (e.g., `tw:bg-card`) instead of hardcoded colors.
- Add `pr-twp` at the top level of components to apply scoped Tailwind Preflight.

### RTL/LTR Support

Components must support both text directions:

- Use logical properties (`start`/`end`) instead of directional properties (`left`/`right`).
- E.g., `margin-inline-start` instead of `margin-left`.

### Preview App

```bash
cd lib/platform-bible-react
npm start
```

For complete guidelines, see the [Component usage and creation wiki](https://github.com/paranext/paranext/wiki/Component-usage-and-creation).

### Rebuild `platform-bible-react` After Editing Its Sources

Extensions (and the renderer) import `platform-bible-react` as a package — type resolution goes through the **committed build artifact** `lib/platform-bible-react/dist/index.d.ts`, not the library's source. If you add a prop, export, or change a type under `lib/platform-bible-react/src/`, extension typechecks will still see the **old** types until you rebuild:

```bash
cd lib/platform-bible-react
npm run build:basic   # tsc → vite build → dts-bundle-generator
```

`build:basic` is the fast path (the full `npm run build` also runs lint-fix and typedoc). Re-run it whenever the library's public surface changes.

Symptoms when you forget:
- Extension `npm run typecheck` reports a prop or export as missing that you just added.
- `npm run build` (transpile-only webpack) may succeed misleadingly — the library's changes compile fine, but consumers fail type-checking against the stale `.d.ts`.

The rebuilt `dist/` changes are normally part of the same PR that changes the library source.

---

## shadcn/ui Guidelines

### Folder

All shadcn/ui components live in `lib/platform-bible-react/src/components/shadcn-ui/`. Each file is a single shadcn component (e.g. `button.tsx`, `dialog.tsx`) copied directly from the [shadcn/ui](https://ui.shadcn.com) boilerplate and then customized in place. The folder also contains `CUSTOMIZATIONS.md`, an AI-generated snapshot of all customizations made relative to the boilerplate.

### Boilerplate baseline

When a shadcn component is first added to the repo, it should be committed as-is from the shadcn boilerplate in a standalone commit — no customizations yet. This "add" commit becomes the boilerplate baseline. All subsequent commits on that file are customizations. This convention lets tooling (and AI agents) diff the current file against the baseline commit to discover every customization ever made, including ones that were never annotated with a comment.

### `// CUSTOM:` annotation convention

Every customization to a shadcn component **must** be annotated with a `// CUSTOM:` comment placed immediately before the changed code. The comment must explain:

- **What** was changed (be specific — name the class, prop, or element)
- **What** the change does
- **Why** it was made

Example:

```tsx
// CUSTOM: Changed tw:p-1 to tw:p-2 to add additional padding according to UX specifications
```

The `// CUSTOM:` prefix makes customizations machine-readable and easy to audit when upgrading shadcn to a new version.

### Standard customizations

Every shadcn component in this folder must have two standard customizations applied (for ease of tracking, they should have `// CUSTOM:` comments even though they are standard):

#### 1. `pr-twp` on DOM-rendered components

Add `pr-twp` at the **front** of the base Tailwind class string for every component that renders actual DOM output. This applies the [scoped Tailwind Preflight](https://www.npmjs.com/package/tailwindcss-scoped-preflight) correctly wherever the component is used.

- **Applies to**: components whose props include `HTMLDivElement`, `HTMLButtonElement`, etc., use `React.ComponentPropsWithoutRef<...>` or `React.HTMLAttributes<...>`, or are declared with `React.forwardRef<HTMLSomeElement, ...>`.
- **Does not apply to**: compound root components that coordinate state without rendering DOM (e.g. `Dialog`, `Popover` roots), or cva variant factories (these are functions, not components).

#### 2. TSDocs with library links on all exports

Every exported symbol (components, interfaces, types, constants) must have a TSDoc comment (`/** ... */`) that includes a hyperlink to the upstream library page for that component. Required links depend on what the file imports:

- shadcn/ui boilerplate → link to the [shadcn/ui component page](https://ui.shadcn.com/docs/components/)
- `@radix-ui/*` imports → link to the [Radix UI primitive page](https://www.radix-ui.com/primitives/docs/overview/introduction)
- `vaul` → link to [Vaul docs](https://vaul.emilkowal.ski/)
- Other notable upstream libraries → link to their docs

To get the canonical shadcn/ui docs and examples link for a component, run:

```bash
npx shadcn docs <component> --json
```

Example output for `button`:

```json
{
  "results": [
    {
      "component": "button",
      "links": {
        "docs": "https://ui.shadcn.com/docs/components/radix/button",
        "examples": "https://raw.githubusercontent.com/shadcn-ui/ui/refs/heads/main/apps/v4/registry/bases/radix/examples/button-example.tsx"
      }
    }
  ]
}
```

Use the `docs` URL as the shadcn/ui link in the TSDoc. For Radix UI links, you still need to search [radix-ui.com/primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) manually.

A TSDoc that uses `@inheritdoc <Symbol>` pointing to a symbol whose TSDoc already has the required links counts as passing.

### Consult UX for visual changes

UX has a defined understanding of what shadcn components look like. When changing how a component looks (colors, spacing, layout, variants), discuss with UX before committing. Standard customizations (`pr-twp`, TSDocs) do not require UX review.

---

## Storybook MDX Guidelines

`.mdx` files used by Storybook are excluded from Prettier (MDX v3 is not supported). No formatter runs on them — indentation is purely manual. Follow these conventions to stay consistent and avoid merge conflicts.

### JSX inside prop expressions

**Inline form** — use when the JSX is a single element that fits on one line:

```mdx
preview={<Button>Save</Button>}
```

**Block form** — use for multi-element or multi-line JSX. The root element starts at **2 spaces from the left margin** (the project's standard tab width), each nested level adds 2 more spaces, and the closing `}` returns to column 0:

```mdx
preview={
  <TooltipProvider>
    <Tooltip open>
      <TooltipTrigger asChild>
        <Button>Save</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Save</TooltipContent>
    </Tooltip>
  </TooltipProvider>
}
```

Do **not** write JSX flush-left inside a block form, and do **not** align it to the surrounding prop's indentation depth — neither style survives the next person who edits the file and neither reflects the project convention.

> **Note for LLMs and editors:** Prettier does not run on `.mdx` files in this repo. When you edit an `.mdx` file, preserve the indentation style above exactly. Do not reformat JSX blocks to flush-left, do not align them to the enclosing prop's column, and do not add or remove blank lines between sibling JSX elements inside a prop expression.

---

## Shared Utilities and Common Code

**Parsing methods and scripture-related utilities are common code** and should NOT be added directly in new extension or data provider code. These include:

- Scripture reference parsing (book/chapter/verse extraction)
- Localized book name lookups
- Arrays or constants of all Bible books
- USJ/USFM manipulation
- Any scripture-specific string parsing

### Decision Framework

Before creating utility functions:

1. **Check `platform-bible-utils` first**:
   - `lib/platform-bible-utils/src/scripture/` — scripture utilities
   - `lib/platform-bible-utils/src/string-util.ts` — string manipulation
   - `lib/platform-bible-utils/src/index.ts` — all public exports
2. If it exists, use it — import from `platform-bible-utils`.
3. If it doesn't exist, create it in the appropriate shared location (see Placement below).

### Utility Placement

```
Is this logic specific to ONE feature's unique domain model?
├─ YES → Feature directory (rare — justify it)
└─ NO → Shared location:

    C# Utilities:
    ├─ Project operations     → c-sharp/Projects/
    ├─ Scripture/verse logic  → c-sharp/Scripture/ (or ParatextUtils/)
    ├─ Settings/configuration → c-sharp/Services/
    ├─ JSON/serialization     → c-sharp/JsonUtils/
    ├─ Checks/validation      → c-sharp/Checks/
    └─ General helpers        → c-sharp/ (root or new domain folder)

    TypeScript Utilities:
    ├─ Scripture functions    → lib/platform-bible-utils/src/scripture/
    ├─ String/data utilities  → lib/platform-bible-utils/src/
    ├─ React hooks            → lib/platform-bible-react/src/hooks/
    ├─ PAPI hooks             → src/renderer/hooks/papi-hooks/
    └─ Shared extension code  → extensions/src/common/
```

### Adding to `platform-bible-utils` (ask first)

Adding public API to `platform-bible-utils` is a load-bearing decision. Before creating new files there:

1. **Pause and ask for user confirmation.**
2. **List what already exists** in the relevant area.
3. **Explain the proposed addition** and where it would fit.
4. **Wait for approval** before creating new files or functions.

After adding code to `platform-bible-utils`:

1. Update `lib/platform-bible-utils/src/index.ts` with the new public exports.
2. Build:
   ```bash
   cd lib/platform-bible-utils
   npm run build
   ```
3. Verify new exports are accessible from the package.

### Unit Tests for Utilities

Always add unit tests with example-based cases for any parsing method or utility:

- Co-locate: `{utility-name}.test.ts` next to `{utility-name}.ts`.
- Document expected behavior with example inputs and outputs.
- Cover edge cases (empty strings, invalid input, boundary conditions).
- Follow patterns from existing tests like `scripture-util.test.ts`.

### Regular Expressions

Every regex in the codebase should have:

1. **Example-based unit tests** — at least 5 cases covering valid matches and invalid non-matches.
2. **A comment explaining what it matches and why.** Magic regexes without explanation are very hard to maintain.

Example:

```typescript
describe('projectNamePattern', () => {
  it.each(['ABC', 'Test123', 'My_Project'])('accepts: %s', (name) => {
    expect(projectNamePattern.test(name)).toBe(true);
  });
  it.each(['', '123', 'a b c', 'CON'])('rejects: %s', (name) => {
    expect(projectNamePattern.test(name)).toBe(false);
  });
});
```

---

## Related Documentation

- [Git-Guide.md](Git-Guide.md) — branch and merge practices
- [Testing-Guide.md](Testing-Guide.md) — testing infrastructure
- [Security-Guide.md](Security-Guide.md) — CSP and sandboxing
- [Component usage and creation wiki](https://github.com/paranext/paranext/wiki/Component-usage-and-creation)
