## Localized-String Fallbacks in Library Components

Components in `lib/platform-bible-react/` are process-agnostic: they never call
`useLocalizedStrings`/PAPI. The consumer resolves strings and passes them in as an optional,
`Partial`-typed `localizedStrings` prop — so **any key can be absent at runtime** (a story, a test,
or a real extension may pass a subset). How a component resolves a missing key matters.

### Fall back to English, never to the raw key

```tsx
// ✅ Missing key degrades to readable English
const rangeText = localizedStrings?.['%webView_scope_selector_range%'] ?? 'Range';

// ❌ Missing key leaks the raw token into the UI as literal text
const rangeText = localizedStrings[key] ?? key;
```

`strings[key] ?? key` renders `%webView_scope_selector_range%` verbatim on screen the moment a caller
omits that key. Fall back to a built-in English default instead — the contract documented in
`.context/standards/Localization-Guide.md` §"Localizing Shared Library Components", and what
`BookChapterControl` (`?? 'Select Chapter'`) and `CommentEditor` (`?? 'Unassigned'`) already do.

When reviewing: a local `localizeString` helper of the shape `(strings, key) => strings[key] ?? key`
(copy-pasted across several components, not shared) is a bug — replace each read with a per-key
`?? 'English default'`.

### Type story fixtures as `Required<…>`

The `…LocalizedStrings` type is `Partial` by design, so a story passing a subset is type-valid and a
dropped key is silent. Type the fixture `Required<XxxLocalizedStrings>` and share one object across
the file's stories, so a missing key fails to compile:

```tsx
const sampleLocalizedStrings: Required<ScopeSelectorLocalizedStrings> = {
  '%webView_scope_selector_range%': 'Range',
  // ...every key, or it won't compile
};
```

No CI lint rule catches a raw-key leak (see
[react-patterns.md § Linting](../architecture/react-patterns.md)) — the English fallback and
`Required<…>` fixtures are the actual guardrails.
