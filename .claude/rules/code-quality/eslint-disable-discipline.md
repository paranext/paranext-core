## Fix Code, Don't Suppress Warnings

When you encounter any code quality error — ESLint, TypeScript, Prettier, Stylelint, or other tooling — pause and reconsider before suppressing it:

1. **Understand the error** — read the message and understand what the tool is protecting against.
2. **Try to fix the code** — can you restructure, retype, or refactor so the tool is satisfied naturally? This is usually the better path.
3. **Suppress only as a last resort** — if the fix would be significantly worse (more complex, less readable, or fighting the type system), then suppressing is fine. Write a clear comment explaining why the alternatives don't work well here.

This applies to all suppression mechanisms: `eslint-disable`, `@ts-expect-error`, `// prettier-ignore`, `/* stylelint-disable */`, type assertions (`as Type`), etc.

When suppressing TypeScript errors, always use `@ts-expect-error` instead of `@ts-ignore` — it will flag when the suppression is no longer needed. Include the error code so the suppression is precise, e.g. `// @ts-expect-error ts(2345) - explanation here`.

When ESLint's `paranext/require-disable-comment` rule asks you for a justification, use that as a prompt to reconsider whether there's a better fix before writing the comment.

The goal is not zero suppressions — it's zero *thoughtless* suppressions.
