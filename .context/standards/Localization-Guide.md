---
title: Localization Guide
description: Mandatory localization patterns for all user-facing text in Platform.Bible extension web views.
version: 1.0.0
status: active
created: 2026-03-04
last_updated: 2026-03-04
---

# Localization Guide

This guide documents UI localization patterns for Platform.Bible extensions. All user-facing text in web views MUST be localized.

## When to Use This Guide

Use this guide when:
- Building new web view components with user-facing text
- Adding labels, buttons, error messages, or any visible text to UI
- Debugging localization issues in existing components
- Understanding the `useLocalizedStrings` hook pattern

## Core Principle

**Never hardcode English text in UI components.** All user-visible strings must go through the localization system.

---

## Localization Pattern

### 1. Create a LOCALIZED_STRINGS Array

In a utils file or at the top of the web view file:

```typescript
// {feature}.utils.ts or at top of web view file
import { LocalizeKey } from 'platform-bible-utils';

export const LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_{feature}_title%',
  '%webView_{feature}_submitButton%',
  '%webView_{feature}_cancelButton%',
  '%webView_{feature}_errorMessage%',
  // Add all user-facing strings
];
```

### 2. Use the useLocalizedStrings Hook

In the web view component:

```typescript
import { useLocalizedStrings } from '@papi/frontend/react';
import { useMemo } from 'react';
import { LOCALIZED_STRINGS } from './{feature}.utils';

globalThis.webViewComponent = function FeatureWebView({ ... }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));

  return (
    <div>
      <h1>{localizedStrings['%webView_{feature}_title%']}</h1>
      <Button>{localizedStrings['%webView_{feature}_submitButton%']}</Button>
    </div>
  );
};
```

### 3. Add Translations to localizedStrings.json

In `contributions/localizedStrings.json`:

```json
{
  "localizedStrings": {
    "en": {
      "%webView_{feature}_title%": "Feature Title",
      "%webView_{feature}_submitButton%": "Submit",
      "%webView_{feature}_cancelButton%": "Cancel",
      "%webView_{feature}_errorMessage%": "An error occurred"
    },
    "es": {
      "%webView_{feature}_title%": "Título de la función",
      "%webView_{feature}_submitButton%": "Enviar",
      "%webView_{feature}_cancelButton%": "Cancelar",
      "%webView_{feature}_errorMessage%": "Ocurrió un error"
    }
  }
}
```

---

## Conventions

### Key Format

Use the pattern: `%webView_{feature}_{elementDescription}%`

Examples:
- `%webView_projectProperties_title%`
- `%webView_projectProperties_saveButton%`
- `%webView_projectProperties_cancelButton%`

### Ellipsis Usage

Add `...` to labels that open dialogs:
- "New Project..." (opens a dialog)
- "Save" (immediate action, no ellipsis)

### Language Requirements

**Always provide both `en` AND `es` translations.** Both are required for the build to pass.

---

## Reusing Existing Strings (IMPORTANT)

**Before creating new keys**, scan the extension's `localizedStrings.json` for existing strings you can reuse:

```bash
# Search for common strings in the extension's localization file
grep -i "cancel\|ok\|save\|close\|submit\|error\|loading" \
  extensions/src/{ext}/contributions/localizedStrings.json
```

Common reusable keys (check if they exist first):
- `%general_cancel%` - "Cancel"
- `%general_ok%` - "OK"
- `%general_save%` - "Save"
- `%general_close%` - "Close"
- `%general_loading%` - "Loading..."
- `%general_error%` - "Error"

**Do NOT create duplicate keys** for generic strings that already exist.

---

## Existing Strings Are Immutable (CRITICAL)

**NEVER modify existing key/value pairs in `localizedStrings.json`.** Changing existing strings breaks translations and downstream consumers.

### If a String Needs Replacement

If a string needs to be replaced with a different value:

1. **Create a NEW key** with the desired value
2. **Add a fallback mapping** in the `metadata` section to redirect the old key:

```json
{
  "metadata": {
    "%oldKey_thatNeedsReplacement%": {
      "fallbackKey": "%newKey_withCorrectValue%"
    }
  },
  "localizedStrings": {
    "en": {
      "%newKey_withCorrectValue%": "The new correct text"
    },
    "es": {
      "%newKey_withCorrectValue%": "El nuevo texto correcto"
    }
  }
}
```

**What this achieves:**
- Old code using `%oldKey_thatNeedsReplacement%` continues to work (falls back to new key)
- New code uses the new key directly
- No breaking changes to existing translations

---

## Dynamic Values with formatReplacementString

For strings with dynamic values (counts, names, etc.):

```typescript
import { formatReplacementString } from 'platform-bible-utils';

const message = formatReplacementString(
  localizedStrings['%webView_{feature}_resultsCount%'], // "Found {count} results"
  { count: results.length }
);
```

In `localizedStrings.json`:
```json
{
  "en": {
    "%webView_{feature}_resultsCount%": "Found {count} results"
  },
  "es": {
    "%webView_{feature}_resultsCount%": "Se encontraron {count} resultados"
  }
}
```

---

## Localization Checklist

Before completing any UI work package:

- [ ] Scanned existing `localizedStrings.json` for reusable keys (Cancel, OK, Save, etc.)
- [ ] Reused existing keys where applicable (no duplicates created)
- [ ] All visible text uses `localizedStrings[key]`
- [ ] `LOCALIZED_STRINGS` array includes all keys
- [ ] English translations added to `localizedStrings.json`
- [ ] Spanish translations added to `localizedStrings.json`
- [ ] No hardcoded English strings in JSX
- [ ] Dynamic values use `formatReplacementString`
- [ ] NO existing key/value pairs were modified (used `metadata.fallbackKey` if replacement needed)

---

## Blocking Issues

The following are **blocking issues** that must be resolved before a work package can be marked complete:

1. **Hardcoded English text** - Any user-visible text not going through localization
2. **Missing translations** - Keys exist in `en` but not `es` (or vice versa)
3. **Modified existing strings** - Changing values of existing keys (use `metadata.fallbackKey` instead)
4. **Duplicate keys** - Creating new keys for strings that already exist

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-04 | Initial version |
