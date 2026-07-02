## Localized-String Fallbacks in Library Components

Components in `lib/platform-bible-react/` are process-agnostic: they never call
`useLocalizedStrings`/PAPI. The consumer resolves strings and passes them in as an optional,
`Partial`-typed `localizedStrings` prop. That means **any key can be absent at runtime** — a story,
a test, or a real extension may pass a subset — so how a component resolves a missing key matters.

### Fall back to English, never to the raw key

When reading a localized string, fall back to a built-in **English default**, not to the key:

```tsx
// ✅ Missing key degrades to readable English
const rangeText = localizedStrings?.['%webView_scope_selector_range%'] ?? 'Range';

// ❌ Missing key leaks the raw token into the UI as literal text
const rangeText = localizedStrings[key] ?? key;
```

A `strings[key] ?? key` resolver renders `%webView_scope_selector_range%` verbatim on screen the
moment a caller omits that key. The English fallback is the contract documented in
`.context/standards/Localization-Guide.md` §"Localizing Shared Library Components", and is what
`BookChapterControl`, `CommentList`, and `CommentEditor` already do (e.g.
`book-chapter-control.component.tsx`: `?? 'Select Chapter'`).

**When adding or reviewing a library component:** if you see the shared helper
`const localizeString = (strings, key) => strings[key] ?? key;`, treat it as a bug — replace each
read with a per-key `?? 'English default'`. This protects real extension consumers, not just
stories.

### Type story fixtures as `Required<…>`

The `…LocalizedStrings` type is `Partial` by design, so a story passing a subset is type-valid and
TypeScript stays silent when a key is dropped. For stories of these components, type the fixture as
`Required<XxxLocalizedStrings>` and share one object across all stories in the file, so the compiler
fails when a key goes missing:

```tsx
const sampleLocalizedStrings: Required<ScopeSelectorLocalizedStrings> = {
  '%webView_scope_selector_range%': 'Range',
  // ...every key, or it won't compile
};
```

This is belt-and-suspenders on top of the English fallback: the fallback protects runtime consumers;
`Required<…>` keeps the story fixtures honest and self-documenting.

### Don't rely on lint to catch this

The ESLint rules that sound relevant (`paranext/no-hardcoded-jsx-strings`,
`paranext/require-localized-aria`) run **only** under `npm run lint:ai-strict` (`.eslintrc.ai.js`),
not the CI `npm run lint`, and are disabled for `*.stories.tsx` / test files. They also target
hardcoded JSX literals, not missing keys. Nothing in CI flags a raw-key leak — the fallback contract
and `Required<…>` fixtures above are the actual guardrails.
