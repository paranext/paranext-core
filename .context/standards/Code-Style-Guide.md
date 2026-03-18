---
title: Code Style Guide
description: TypeScript/C# conventions, design principles, localization, component patterns, and shadcn/ui usage.
version: 1.0.0
status: active
created: 2026-03-04
last_updated: 2026-03-04
toc: true
---

<!-- TOC:BEGIN -->
<!-- | Line | Section | -->
<!-- | --- | --- | -->
<!-- | 31 | Software Design and Review Principles | -->
<!-- | 66 | TypeScript-specific Guidelines | -->
<!-- | 95 | TypeScript Module Declaration Order | -->
<!-- | 105 | Class Declaration Order | -->
<!-- | 118 | package.json Dependency Guidelines | -->
<!-- | 126 | Documentation Comments | -->
<!-- | 142 | C#-specific Guidelines | -->
<!-- | 148 | Code Patterns We Use | -->
<!-- | 156 | Editor Guidelines | -->
<!-- | 162 | Localized Strings Guidelines | -->
<!-- | 207 | Component Usage and Creation | -->
<!-- | 242 | shadcn/ui Guidelines | -->
<!-- | 252 | Shared Utilities and Common Code | -->
<!-- | 412 | Related Documentation | -->
<!-- | 549 | Version Log | -->
<!-- TOC:END -->

## Software Design and Review Principles

Best-practice high-level development guidelines that should guide developers and reviewers in their work on our code. The base bullets in the list are essential guiding principles to keep in front of mind while working. The sub-bullets are important clarifications, descriptions, examples, and common pitfalls that would be best to digest thoroughly for understanding and growth but are not necessary to have memorized literally.

- **Minimize breaking changes**
  - Avoid changes in things we provide for other developers to use that would cause our things to stop working as expected given the way other developers may be using them
    - Package APIs (e.g. [props on a component in `platform-bible-react`](https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx#L32))
  - Extension APIs (e.g. [contributions](https://github.com/paranext/paranext-core/blob/main/extensions/src/platform-scripture-editor/contributions/menus.json) or [functions on the PAPI](https://github.com/paranext/paranext-core/blob/main/extensions/src/platform-scripture-editor/src/main.ts#L85))
  - Localized strings
  - Template features (e.g. [importing WebView code with `?inline`](https://github.com/paranext/paranext-extension-template/blob/main/webpack/webpack.config.base.ts#L62))
  - Non-breaking additions are usually acceptable, but it is always good to consider if a change is really necessary
  - Deprecate but continue to support what was there before when possible
  - Sometimes, a change is important enough or just necessary enough to make a break
  - Always announce breaking changes in [#platform-changes](https://discord.com/channels/1064938364597436416/1136038164818034849)
- **Consider high-level organization**
  - When reasonably possible, colocate code/files. There are situations in which it is not appropriate to do so (e.g. different code running in different processes)
  - For `platform-bible-react`, colocate all files for a component together:
    - The component file (e.g. `Button.tsx`)
    - The Storybook file (e.g. `Button.stories.tsx`)
    - The test file (e.g. `Button.test.tsx`)
  - Try to keep files relatively smaller and self-contained
  - Make [regions](https://github.com/paranext/paranext-core/blob/dbc2b7686aa83c1e6528f7bb0258f2bcbdd88130/src/renderer/services/web-view.service-host.ts#L126) to divide up [larger files](https://github.com/paranext/paranext-core/blob/dbc2b7686aa83c1e6528f7bb0258f2bcbdd88130/src/extension-host/services/extension.service.ts#L806) into more digestable sections
  - Generally best to change only what you need to change; unrelated tidying or refactors are often not worth the burden on testing and review. If you need to tidy something, it is best to do it in a separate PR.
  - Don't duplicate code when reasonably straight-forward
- **Follow existing/established patterns and code**
  - Follow the [Code Style Guide] (this document)
  - Respect separation of execution environments like across processes, extensions, renderer, etc. For example, there are service hosts that run on one process and services which represent the service host on other processes. Avoid doing extension-related work in core code and vice-versa. Avoid passing functions or class instances over the PAPI. [Do not use `instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms) when values may be crossing execution environments.
  - Instead of using multiple booleans for related characteristics, consider using a string union if you can represent the multiple booleans as finite states. Defining finite states rather than multiple interdependent booleans reduces the chance of getting into an indetermine or contradictory state and increases future flexibility. For example, instead of using `didError`, `isRunning`, `didComplete`, etc. and having to deal with senseless combinations like `isRunning: true` and `didComplete: true`, you could [make a string union](https://github.com/paranext/paranext-core/blob/main/extensions/src/platform-scripture/src/types/platform-scripture.d.ts#L730) that defines the exact states you want to handle.
- **Prioritize sustainability**
  - You (the code owner) will be responsible for fixing/updating later whatever you approve in your owned code areas
  - If you aren't comfortable with how it will end up, don't approve it
  - If the impact of the changes isn't obvious from just looking at the code changes, check out the branch locally so you can look at the changes in context and even run the code yourself.
- **Ask for help when unsure**
  - If you are unsure about something or don't think you understand the potential consequences of a change, reach out to someone for help with the review. E.g. necessary divergence from existing patterns, big breaking changes, foundational code changes that could have wide-spread impact

## TypeScript-specific Guidelines

- **Filenames and paths**: Filenames and paths are _kebab-case_ to avoid git issues with case-insensitive file systems as per the last heading in this [article](https://profy.dev/article/react-folder-structure). Use the `<feature>.<type>.{ts,tsx,html,scss}` filename pattern that describes the symbol's _feature_ then its _type_, e.g. `network-object.service.ts`. Examples of _types_ are `.component.tsx`, `.hook.ts`, `.context.tsx`, `.service.ts`, `.model.ts`, `.interface.ts`, `.test.tsx`, `.e2e-test.ts`. Use `.interface.ts` to distinguish interfaces of classes from an interface that just describes a data model, in which case use `.model.ts` (type declarations also use this). Note: interface names of classes within the file should be prefixed with capital `I`, e.g. `INetworkConnector`.
- **Prefer truthy/falsy checks over coerced `undefined` checks**: Prefer `!variable` over `variable === undefined` unless we specifically need to check `variable === undefined || variable === null` (such as if 0 or a string is an option). We generally will not need this specificity since we are using TypeScript to help with types at compile time.
- **Explain rule exceptions**: If you disable a rule for a line or a file, explain in a comment above the rule why you decided to make the exception. That way, code reviewers and future developers can see why you disabled the rule and aren't left wondering if they should re-enable the rule and refactor your code.
  - For example, with `no-restricted-syntax`, `for...of` is a disabled syntax. [There is much discussion](https://github.com/airbnb/javascript/issues/1271) around if this should be disabled. In most cases, you can use some kind of function to 'loop' over the object instead of using this syntax, but there are good uses in some cases. For example, if you want to loop over a `Map`'s `entries()`, you don't want to have to destructure into an array and then `.forEach()` over that array (like `[...new Map().entries()].forEach()`) because that iterates twice for no good reason. Additionally, you can await promises and not continue the loop if you use a loop instead of a 'looping' function.
- **Include Type Declarations when relevant**: When you are working with objects that have a known type that is used in multiple locations, use a type and specify the type on that object. For example, if you have `const connectionInfo = { clientId: 3 };`, then you use that kind of object in many places, it is best to go ahead and make a `type` for that object and use that type in all the places it is relevant like `const connectionInfo: ConnectionInfo = { clientId: 3 };`. That way, if you add required fields to the `ConnectionInfo` type, you will know you need to add more fields at this line. If, however, you are just using an object inside one function or something, you do not necessarily need to create a type. Please use discretion.
- **Types vs interfaces**: The use of either is fine until we have a use case that would prefer one over the other. Do note the following:
  - Interfaces are open and can be added to after declaration. It is useful to be able to extend publicly exposed ‘types’ such as in libraries.
  - Types are closed and can’t be added to after declaration. This can often be a desired restriction.
  - Interfaces have better error messages than types.
  - There are some things that only types can do such as primitives, unions, and tuples.
  - More detail is in this [post](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript/52682220#52682220) linked in the official [TypeScript one](https://www.typescriptlang.org/play#example/types-vs-interfaces).
- **Clear variable names**: Use descriptive names for variables to help people to read the code better. Follow normal naming conventions such as the following:
  - Functions/Methods: use verbs at the start like `getClientId` or `checkStatus`
  - Booleans: use status words like `didFinish`, `isInitialized`, or `hasPolicy`
    - `success` is commonly understood as a boolean and is acceptable
    - Booleans inside of an `options` parameter for a function do not have to conform strictly to status wording. Make them as descriptive as possible to support API users well.
  - Avoid abbreviations or contractions as part of identifier names. Don't use any acronyms or initialisms that are not widely accepted, and even if they are, only when necessary.
  - Capitalize acronyms and initialisms according to [the .NET capitalization conventions](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/capitalization-conventions): capitalize two-letter acronyms and initialisms together (`ioStream` or `IOStream`) and capitalize longer acronyms and initialisms as if they were words (`httpRequest` or `HttpRequest`).
- **Use comments to help others to read the code**: Do not state exactly what every line does with comments where it is obvious, but include the overall purpose and meaning of code with comments, especially where it does not seem to be readily apparent. We want people to be able to read our code later without too much trouble.
- **Use `undefined` instead of `null`**: Using `null` in JavaScript and TypeScript [can have some unexpected consequences](https://medium.com/@hbarcelos/why-i-banned-null-from-my-js-code-and-why-you-should-too-13df90323cfa). Unlike most programming languages, `null` and `undefined` represent two similar concepts (i.e., "explicit nothingness" and 'implicit nothingness") but are not the same thing. Most language have a single concept labeled `null` that stands for "nothingness." We always use `undefined` to stand for "nothingness." `null` should be used only in cases when some external API requires or returns it. In those cases, it is best to limit use of `null` to the direct points of interaction with external APIs, and translate input/output values from `null` to `undefined` when passing them through the rest of the system.
- **Use empty array instead of `undefined`**: since empty arrays mean something. It's nice to be able to just use it.
- **Prefer path aliases for imports**: Prefer `import ... from '<path_alias>/...'` over `import ... from '../../<path_stuff>/...'`. We have special webpack magic that does things with these aliases, so it is likely best to use the aliases in all situations.
- **async/await**: Use async/await by default as it's far easier to read and less error prone. If you need to use **promise/then** add a comment to document your reasoning.
- **Throwing Errors**: Although `throw Error();` works, it is not technically correct. Always use `throw new Error();`.
- **Specify bundled dependencies in `devDependencies`**: Because webpack bundles non-[`external`](https://webpack.js.org/configuration/externals/) imported code from a package into the final bundle, that package is no longer needed alongside the final bundled code. As such, all webpack-bundled package dependencies should be installed in `npm` as `devDependencies` with `npm install -D <package_name>`. See [this discussion](https://reviewable.io/reviews/paranext/paranext-core/380#-NcPBady7ifJq0YLZtwN) for more information.
- **Prefer TSDoc Syntax**: in TypeScript files, when creating comment documentation (above functions, for example), prefer using [TSDoc syntax](https://tsdoc.org/) (don't include types in the comment - these are what VSCode generates when you type `/**` and click enter) over [JSDoc syntax](https://jsdoc.app/about-getting-started) (include types in the comment) because those types are already included in the code in TypeScript.

## TypeScript Module Declaration Order

When creating a module (TypeScript file with exports), generally put local (not exported) members at the top and exported members afterward. However, it is acceptable to put members in functionality order. Put types, interfaces, and fields at the top before functions and classes. Note that there are cases where exported members must come before local members because of [execution order](https://typescript-eslint.io/rules/no-use-before-define/), which is acceptable.

General layout of a module:

1. Types/interfaces/fields
2. Functions
3. Classes

## Class Declaration Order

When creating or adding to a class, please conform to the following ordering:

1. Interface properties
2. Public properties
3. Private properties
4. Interface methods
5. Public methods
6. Private methods

\*Note: you can deviate from this order for very small accessors and other code that is very closely related to other code that is in a specific section.

## `package.json` Dependency Guidelines

In `package.json`, the `dependencies`, `devDependencies`, and `peerDependencies` fields are often confused and/or difficult to understand. As such, following are guidelines for listing packages in these dependency fields in order to use them the way `npm` handles them. Note that these guidelines are very important to follow when creating packages that other projects will use through the `npm` command-line tool like [`platform-bible-react`](https://github.com/paranext/paranext-core/tree/main/lib/platform-bible-react); it doesn't matter nearly as much if you do not follow these guidelines for a project that is intended to create a final application like [`paranext-core`](https://github.com/paranext/paranext-core).

- `dependencies`: packages that are directly imported and used in the executable code of this package (except `peerDependencies`) that you do not want to bundle them into your package's distributable files. These packages will be updatable to newer non-breaking versions when others use your package because you did not bundle them into your package's distributable files.
- `devDependencies`: packages that are not directly imported (or they are directly imported but you want to bundle them into your package's distributable files) and used in the executable code of this package (except `peerDependencies`). These packages are either used in the dev process like when linting or bundling this package. Packages whose code you want to bundle into your package's distributable files instead of importing externally should be added here. This is almost never a good idea under normal circumstances, though. Most packages you import should be `dependencies`. Bundled-in `devDependencies` packages are not updatable to newer non-breaking versions when others use your package because you bundled them into your package's distributable files; they cannot be changed.
- `peerDependencies`: packages that the _user_ of this package _must_ be using in order to use this package (for example, projects who use a React component library like [`platform-bible-react`](https://github.com/paranext/paranext-core/tree/main/lib/platform-bible-react) _must_ use React to use the code. Otherwise these react components are meaningless). These packages may or may not be directly imported and used in the executable code of this package, but that's not really very important to the definition.

## Documentation Comments

### TypeScript (JSDoc/TSDoc)

- Use JSDoc (`/** ... */`) for all public TypeScript APIs
- Prefer [TSDoc syntax](https://tsdoc.org/) over JSDoc syntax (don't include types in comments - TypeScript already has them)
- Follow existing patterns in `papi.d.ts` for type declarations
- Use `@param`, `@returns`, `@example` tags where appropriate
- Reference the **JSDOC SOURCE/DESTINATION** pattern in CLAUDE.md for propagating docs across generated files

### C# (XML Documentation)

- Use XML documentation comments (`/// <summary>`) for public APIs
- Follow [Microsoft XML documentation guidelines](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/)
- Include `<param>`, `<returns>`, `<exception>`, and `<example>` tags where helpful

## C#-specific Guidelines

Unless otherwise mentioned, please follow the Official Microsoft [C# Coding Conventions](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions) and the more comprehensive [Design Guidelines](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/).

Follow the [Unit testing best practices with .NET Core and .NET Standard](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices).

## Code Patterns We Use

- Early Return Pattern (aka [Guard Clauses](https://refactoring.guru/replace-nested-conditional-with-guard-clauses))
  - [example in JavaScript](https://gomakethings.com/the-early-return-pattern-in-javascript/#what-is-the-early-return-pattern)
  - [Understanding and benefits](https://www.linkedin.com/pulse/return-early-pattern-marny-lopez-eq6je)
  - Code style: always add a blank line after early returns to indicate the break in the code.
- [Get/Set/Reset for Value Stores](https://github.com/paranext/paranext/wiki/Get,-Set,-Reset-Pattern-for-Value-Stores)

## Editor Guidelines

- The text editor we primarily use for development is [Visual Studio Code](https://code.visualstudio.com/). Though you do not have to use this editor, it may be the easiest and best-supported.
- As a general rule, we try to make configuration available for use in or out of VSCode as much as possible. For example, we add `npm` scripts to build parts of the project and add configuration to VSCode to call those `npm` scripts instead of adding particular build configuration in VSCode where possible.
- If you want to add a word to the [`CSpell`](https://cspell.org/) dictionary, please add it to the `cspell.json` file in the root of the project. In VSCode, you can do that in the Quick Fix menu by choosing `Add: "<your_word>" to config: paranext-core/cspell.json` or in the context menu by choosing `Spelling > Add Words to CSpell Configuration`. Using the Quick Fix menu will keep the items in alphabetical order.

## Localized Strings Guidelines

Follow these rules when considering using existing or creating new localized string key/value pairs:

- **Decide between using an existing key or creating a new key**: if you need a string whose exact text is already represented by an existing localized string, you may consider using that existing string instead of creating a new localized string key/value pair. Following are some guidelines to consider when deciding between using an existing key and creating a new one (these are not exact; please consider and do what you see is most fitting):
  1. Is the existing key deprecated? If so, find the replacement key if there is one and consider these questions using that key.
  2. Do they have the exact same text? If not, make separate keys.
  3. Do they serve a very similar purpose such that they probably will always _mean_ the same thing and have the same intended function? If not, make separate keys.
  4. Does it seem vaguely plausible that these two might have different localizations in another language? If so, make separate keys.
- **Name new string keys by their purpose**: If you create a new string key/value pair, please name the localized string key after the purpose it serves where reasonably possible. You should aim to name the keys so people who read your key might have some reasonable idea of how it might be used without having to go find where it is used in the code. Generally try to follow existing conventions and patterns.
  - Note this guideline is very significantly different than the way of naming string keys in Paratext 9 where the key contained the entire contents of the English localization of the string.
  - Example: [`%platformScriptureEditor_dialog_openResourceViewer_prompt%`](https://github.com/paranext/paranext-core/blob/df652fe6a4a944ddeaa683bbe863bb6bf913a4cd/extensions/src/platform-scripture-editor/contributions/localizedStrings.json#L20) properly indicates it is the prompt shown for the dialog displayed for opening the resource viewer. Embedding the literal words of the English localization of this key, "Choose a resource to open:", into the key instead of telling the purpose this key serves would make it harder to understand _how_ the key is being used.
- **Alphabetize**: Please keep the localized string key files alphabetized for simple organization.
- **Paratext 9 Fallback Keys**: If you add a string that has an equivalent or very similar matching string (matching localized value AND purpose) in Paratext 9, add that string's key as a `fallbackKey` for your new string. Be careful to make sure the string formatting groups match. [Example](https://github.com/paranext/paratext-bible-internal-extensions/blob/bd3989092457764f720b0d9d5383e39f4155dd99/src/paratext-bible-send-receive/contributions/localizedStrings.json#L70)
- **Don't change or remove localized string keys**: Changing or removing localized string keys could break existing uses of that localized string key. In an environment where many bodies of code exist across many different repositories, it may be impossible to find and change all uses. Rather, create a new string if you need to change or remove a localized string key. If you change all known uses of that key in the code that provides that key, consider [deprecating](https://github.com/paranext/paranext-core/blob/197c0893752324fbb587c50e2f98699969cf39cc/assets/localization/metadata.json#L13) the key to indicate it is old and not to be used anymore.
- **Don't change a localized string value's meaning**: You can correct grammar or punctuation mistakes, but don't change the meaning of a string. You may break other uses of the string if you do. Rather, create a new string if you need to change a string's meaning. If you change all known uses of that key in the code that provides that key, consider [deprecating](https://github.com/paranext/paranext-core/blob/197c0893752324fbb587c50e2f98699969cf39cc/assets/localization/metadata.json#L13) the key to indicate it is old and not to be used anymore.
- **Concatenate strings with format strings**: When concatenating localized strings in any other way than newline (colon, parentheses, plain space, quotes, hyphen, etc.), it is generally best to use string formatting with a format localized string to concatenate the strings in a localizable manner. That way, if the strings are concatenated in a way that doesn't make sense in a locale, they can change how the string is concatenated and format it differently. Example: [string key](https://github.com/paranext/paranext-core/blob/23bb51837bab8b34ab6de9fc9064c95dc7cbf0c7/extensions/src/platform-scripture/contributions/localizedStrings.json#L37) and [usage](https://github.com/paranext/paranext-core/blob/23bb51837bab8b34ab6de9fc9064c95dc7cbf0c7/extensions/src/platform-scripture/src/checking-results-list.web-view.tsx#L134)
- **Be careful with counts and ordinals**: Counting word forms like "1 puppy" vs "100 puppies" and ordinals like "1st" vs "2nd" are localized with vastly different rules in different languages. Please be cautious when creating strings including these kinds of words. Consider rewording to avoid using them. Example: Instead of "1 puppy", use "Puppies: 1"
- **Use an ellipsis for a menu item opening a dialog**: If a menu item's primary purpose is to open a dialog, add an ellipsis "..." at the end of the string. Example: "Send/Receive projects..." has an ellipsis because it does nothing more than opening a dialog. "Send/Receive this project", on the other hand, primarily executes a Send/Receive on the project to which the menu belongs; it also opens a screen reporting the changes made, but that is not its primary purpose.
- **Never compare against hardcoded strings**: In business logic, never compare variables against hardcoded English strings. This creates hidden dependencies on English text that break in other locales.

  **Bad patterns:**
  ```typescript
  // ❌ Comparing against hardcoded English
  if (status === "Loading...") { ... }
  if (tabName === "General") { ... }
  if (errorMessage.includes("not found")) { ... }
  ```

  **Good patterns:**
  ```typescript
  // ✅ Use constants or enums
  if (status === LoadingStatus.Loading) { ... }
  if (tabId === TabId.General) { ... }
  if (errorCode === ErrorCode.NotFound) { ... }

  // ✅ Or use localization keys for comparison
  if (statusKey === '%status_loading%') { ... }
  ```

  This applies to:
  - Conditional logic (`if`, `switch`, ternary)
  - Array filtering and finding
  - String matching and includes checks

## Component Usage and Creation

The Platform.Bible project prioritizes intentional component selection based on the **YAGNI principle**: "You aren't gonna need it." Use few components, deployed consistently across the application to maintain a cohesive user experience.

### Component Selection Framework

Before creating new components, follow this decision framework:

1. **Can existing `platform-bible-react` components meet requirements?** Use them first.
2. **Should existing components be enhanced?** Consider extending current components to serve the broader ecosystem.
3. **Can you build on `platform-bible-react`, Shadcn, or Radix?** Prefer these foundations over external libraries.
4. **Only then** consider external libraries that meet quality and licensing standards.

### Theming Requirements

- Use **TailwindCSS** with the custom `pr-` prefix for theming
- Use semantic color variables (e.g., `pr-bg-card`) instead of hardcoded colors
- Add `pr-twp` at the top level of components to apply scoped Tailwind Preflight

### RTL/LTR Support

Components must support both text directions:
- Use logical properties (`start`/`end`) instead of directional properties (`left`/`right`)
- Example: Use `margin-inline-start` instead of `margin-left`

### Preview App

A preview app exists for experimentation and testing. Launch it locally:
```bash
cd lib/platform-bible-react
npm start
```

For complete guidelines, see [Component usage and creation wiki](https://github.com/paranext/paranext/wiki/Component-usage-and-creation).

## shadcn/ui Guidelines

When editing styles in a shadcn/ui file, please follow these guidelines:

- **Add pr-twp**: At the front of the class list at the top level of every exported component, add `pr-twp` to make sure the [scoped](https://www.npmjs.com/package/tailwindcss-scoped-preflight?activeTab=readme) [Tailwind Preflight](https://tailwindcss.com/docs/preflight) is applied properly to the components wherever they are used. (No need to consult UX or leave a comment about this)
- **Consult UX**: UX has a certain understanding of what the shadcn/ui components look like and how to use them to build UIs. When changing how the components look, please discuss with UX to make sure they agree with changes you are making.
- **Leave a specific comment about the change**: When changing styles or other parts of shadcn/ui components, be sure to leave a comment explaining exactly what you did, what your change does, and why. Additionally, leave a prefix of `CUSTOM: ` at the start of the comment. For example, if you changed a checkbox's padding because UX said they wanted it, add a comment like "CUSTOM: Changed pr-p-1 to pr-p-2 to add additional padding according to UX specifications".

---

## Shared Utilities and Common Code

**Parsing methods and scripture-related utilities are common code** and should NOT be added directly in new extension code or data provider code. These include:

- Scripture reference parsing (book/chapter/verse extraction)
- Localized book name lookups
- Arrays or constants of all Bible books
- USJ/USFM manipulation utilities
- Any string parsing for scripture-specific formats

### Decision Framework

Before creating utility functions:

1. **Check `platform-bible-utils`** first for existing implementations:
   - `lib/platform-bible-utils/src/scripture/` - Scripture utilities
   - `lib/platform-bible-utils/src/string-util.ts` - String manipulation
   - `lib/platform-bible-utils/src/index.ts` - All public exports

2. **If functionality exists**: Use it. Import from `platform-bible-utils`.

3. **If functionality doesn't exist**: Create it in the appropriate shared location (see Utility Placement below)

4. **Check the utility registry**: `.context/utility-registry.json` tracks all shared utilities
   - Read this file to find utilities not yet in your search scope
   - When creating shared utilities, append to this registry

### Utility Placement Decision Tree

Before creating any utility function, class, or helper:

```
Is this logic specific to ONE feature's unique domain model?
├─ YES → Feature directory (rare - justify in plan)
└─ NO → Shared location (default):

    C# Utilities:
    ├─ Project operations      → c-sharp/Projects/
    ├─ Scripture/verse logic   → c-sharp/Scripture/ (or ParatextUtils/)
    ├─ Settings/configuration  → c-sharp/Services/
    ├─ JSON/serialization      → c-sharp/JsonUtils/
    ├─ Checks/validation       → c-sharp/Checks/
    └─ General helpers         → c-sharp/ (root or new folder by domain)

    TypeScript Utilities:
    ├─ Scripture functions     → lib/platform-bible-utils/src/scripture/
    ├─ String/data utilities   → lib/platform-bible-utils/src/
    ├─ React hooks             → lib/platform-bible-react/src/hooks/
    ├─ PAPI hooks              → src/renderer/hooks/papi-hooks/
    └─ Shared extension code   → extensions/src/common/ (if extension-specific)
```

### C# Utility Decision Framework

Before creating C# helper functions:

1. **Check `c-sharp/` directories** for existing implementations:
   - `c-sharp/Projects/` - Project lookup, metadata, ScrText operations
   - `c-sharp/Services/` - Settings, localization, shared store
   - `c-sharp/JsonUtils/` - Serialization, converters
   - `c-sharp/ParatextUtils/` - ParatextData initialization

2. **Check the utility registry**: `.context/utility-registry.json` section `"csharp"`

3. **If functionality exists**: Use it. Do NOT recreate with a different name.

4. **If functionality doesn't exist but is reusable**: Create in appropriate `c-sharp/` folder and add to registry.

### Registry Update Requirement

When creating a **shared** utility (not feature-local):

1. Add the utility to `.context/utility-registry.json`
2. Include: name, location, purpose, addedBy (feature name)
3. This enables future features to discover and reuse your utility

### Adding to `platform-bible-utils` (REQUIRES USER INPUT)

When you determine new code should be added to `platform-bible-utils`:

1. **Pause and ask for user confirmation** before proceeding
2. **List what already exists** in the relevant area (e.g., existing scripture utilities)
3. **Explain your proposed addition** and where it would fit
4. **Wait for approval** before creating new files or functions

**After adding code to `platform-bible-utils`:**

1. **Update the main export file**: `lib/platform-bible-utils/src/index.ts`
   - Add exports for any new public functions, types, or constants
2. **Run the build**:
   ```bash
   cd lib/platform-bible-utils
   npm run build
   ```
3. **Verify exports**: Check that your new utilities are accessible from the package

### Unit Test Requirements

**Always add unit tests with examples** for any parsing methods or utilities you create:

- Co-locate test files: `{utility-name}.test.ts` next to `{utility-name}.ts`
- Include example-based tests that document expected behavior
- Test edge cases (empty strings, invalid input, boundary conditions)
- Follow patterns from existing tests like `scripture-util.test.ts`

Example test structure:
```typescript
describe('parseScriptureReference', () => {
  it('parses standard reference', () => {
    expect(parseScriptureReference('Gen 1:1')).toEqual({
      book: 'GEN',
      chapter: 1,
      verse: 1
    });
  });

  it('handles book name variations', () => {
    // Example-based documentation
    expect(parseScriptureReference('Genesis 1:1').book).toBe('GEN');
    expect(parseScriptureReference('Gn 1:1').book).toBe('GEN');
  });

  it('returns undefined for invalid input', () => {
    expect(parseScriptureReference('')).toBeUndefined();
    expect(parseScriptureReference('not a reference')).toBeUndefined();
  });
});
```

### Regex Requirements (MANDATORY)

Every regular expression in the codebase MUST have:

1. **Unit tests with examples** - At least 5 test cases showing valid matches and invalid non-matches
2. **Origin documentation** - Where the pattern came from or how it was derived
3. **EXPLANATION comment** - What the regex matches and why

**AI-generated regexes require user validation**:
- When creating a new regex, **STOP and ask the user** to validate the pattern
- Show example matches/non-matches for user review before proceeding

Example test structure:
```typescript
describe('projectNamePattern', () => {
  // Valid matches
  it.each(['ABC', 'Test123', 'My_Project'])('accepts valid name: %s', (name) => {
    expect(projectNamePattern.test(name)).toBe(true);
  });

  // Invalid matches
  it.each(['', '123', 'a b c', 'CON'])('rejects invalid name: %s', (name) => {
    expect(projectNamePattern.test(name)).toBe(false);
  });
});
```

---

## Related Documentation

- [Code-Review-Guide.md](Code-Review-Guide.md) - PR review process
- [Git-Guide.md](Git-Guide.md) - Branch and merge practices
- [Architecture.md](Architecture.md) - System architecture
- [Testing-Guide.md](Testing-Guide.md) - Testing infrastructure
- [Component usage and creation wiki](https://github.com/paranext/paranext/wiki/Component-usage-and-creation)

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-04 | Initial version |
