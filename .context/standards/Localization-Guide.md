---
title: Localization Guide
description: Mandatory localization patterns for all user-facing text in paranext-core — UI web views (TS) and C# backend services.
version: 1.5.0
status: active
created: 2026-03-04
last_updated: 2026-06-18
toc: true
---

# Localization Guide

This guide documents localization patterns for paranext-core. All user-facing text MUST be localized — this applies to both UI web views (TypeScript/React) and C# backend services whose output reaches the user.

<!-- TOC:BEGIN -->
<!-- Anchor links are used instead of line numbers so this index cannot drift as the file changes. -->
<!-- | Section | -->
<!-- | --- | -->
<!-- | [When to Use This Guide](#when-to-use-this-guide) | -->
<!-- | [Core Principle](#core-principle) | -->
<!-- | [Architecture: One Store, Two APIs](#architecture-one-store-two-apis) | -->
<!-- | [Fallback Chain (How Missing Translations Are Handled)](#fallback-chain-how-missing-translations-are-handled) | -->
<!-- | [Localization Pattern](#localization-pattern) | -->
<!-- | [Localizing Shared Library Components (lib/platform-bible-react/)](#localizing-shared-library-components-libplatform-bible-react) | -->
<!-- | [Conventions](#conventions) | -->
<!-- | [Text Direction (RTL/LTR)](#text-direction-rtlltr) | -->
<!-- | [Reusing Existing Strings (IMPORTANT)](#reusing-existing-strings-important) | -->
<!-- | [Existing Strings Are Immutable (CRITICAL)](#existing-strings-are-immutable-critical) | -->
<!-- | [Dynamic Values with formatReplacementString](#dynamic-values-with-formatreplacementstring) | -->
<!-- | [Localization Checklist](#localization-checklist) | -->
<!-- | [Blocking Issues](#blocking-issues) | -->
<!-- | [C# Backend Localization](#c-backend-localization) | -->
<!-- | [Testing Localized C# Backends](#testing-localized-c-backends) | -->
<!-- | [Porting PT9 Features](#porting-pt9-features) | -->
<!-- | [Version Log](#version-log) | -->
<!-- TOC:END -->

## When to Use This Guide

Use this guide when:
- Building new web view components with user-facing text
- Writing C# backend services that return messages/errors to the wire
- Adding labels, buttons, error messages, or any visible text to UI
- Debugging localization issues in existing components
- Understanding the `useLocalizedStrings` hook pattern (TS) or `LocalizationService.GetLocalizedString` (C#)

## Core Principle

**Never hardcode English text in code that faces users.** All user-visible strings — whether they originate in TypeScript UI components or in C# backend services — must go through the localization system.

## Architecture: One Store, Two APIs

Localization data lives in **one shared store**, and TypeScript and C# each have an API that reads from it:

| Layer | Where strings live | How to read |
|-------|-------------------|-------------|
| Platform root (built-in UI, system messages) | `assets/localization/{lang}.json` — one flat file per language | TS: `useLocalizedStrings` hook; C#: `LocalizationService.GetLocalizedString(papiClient, key, default)` |
| Extension (extension-namespaced UI + backend features) | `extensions/src/{ext}/contributions/localizedStrings.json` — single file with `localizedStrings.{lang}.{key}` sections | Same APIs as above |

The extension-host merges all contribution files into a unified store. Both TS and C# APIs resolve the same keys against that store. There is **no separate C# translation database**; C# calls into the platform's localization service over PAPI.

### Where does my string belong?

- **Platform root** (`assets/localization/`) — strings that are part of the built-in paranext-core shell (top-level menus, system dialogs, common confirmations)
- **Extension namespace** (`extensions/src/{ext}/contributions/localizedStrings.json`) — strings belonging to an extension or to a service whose PAPI name sits under the extension namespace. Example: `platformScripture.checklistService` lives in the `platform-scripture` extension, so its strings belong in `extensions/src/platform-scripture/contributions/localizedStrings.json` — even if the C# implementation is in the main `c-sharp/` data provider.

> **Rule of thumb**: if the PAPI service name has a namespace prefix (e.g. `platformScripture.*`, `checkHost.*`), the strings belong in that extension's `localizedStrings.json`.

## Fallback Chain (How Missing Translations Are Handled)

Resolution order for any localize key lookup (see `src/extension-host/services/localization.service-host.ts:297-331`):

1. **User's preferred languages** — from the `platform.interfaceLanguage` setting (ordered array)
2. **English** — `BACKUP_LANGUAGE = 'en'` is hardcoded and always appended to the fallback list
3. **`fallbackKey` metadata** — if a key declares `fallbackKey` in the `metadata` section (e.g. `%inventoryName_Character%` → `%CheckType_3%`), that sibling key is tried across all languages
4. **Bare key** — if everything fails, the localize key (`%foo%`) itself is returned as a debug safety net

**Practical implication**: if you add an English entry for a key, users in languages without that key automatically fall back to English. You do **not** need custom fallback logic in the consumer.

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

## Localizing Shared Library Components (`lib/platform-bible-react/`)

The pattern above assumes a web view that can call `useLocalizedStrings` (a PAPI/`@papi/frontend` hook). **Components that live in `lib/platform-bible-react/` cannot do this.** That library is process-agnostic and must stay free of any PAPI dependency, so a library component must NOT resolve its own strings — the consuming extension resolves them and passes them in.

The established contract for a localizable library component is three parts:

1. **A frozen `STRING_KEYS` tuple** of the localize keys the component needs, exported so consumers have a typed handle to feed into `useLocalizedStrings`:

   ```typescript
   export const BOOK_CHAPTER_CONTROL_STRING_KEYS = Object.freeze([
     '%webView_bookChapterControl_selectChapter%',
     '%webView_bookChapterControl_selectVerse%',
     // ...
   ] as const);
   ```

2. **A `Partial<Record<…>>`-shaped type** derived from that tuple, so stories/tests can pass a partial map and rely on the fallback:

   ```typescript
   export type BookChapterControlLocalizedStrings = {
     [key in (typeof BOOK_CHAPTER_CONTROL_STRING_KEYS)[number]]?: string;
   };
   ```

3. **An optional `localizedStrings?` prop** typed as that mapped type (or the shared `LanguageStrings` type from `platform-bible-utils`). Inside the component, every read goes through an English-fallback lookup so the component still renders readable text when a key is absent:

   ```tsx
   const selectChapter =
     localizedStrings?.['%webView_bookChapterControl_selectChapter%'] ?? 'Select Chapter';
   ```

The consuming extension resolves the keys with `useLocalizedStrings(STRING_KEYS)` and passes the result down as the `localizedStrings` prop — the library never imports PAPI.

**Avoid:**
- Calling `useLocalizedStrings` (or any `@papi/*` hook) inside a `lib/platform-bible-react/` component — it couples the process-agnostic library to PAPI.
- Hardcoded English text in JSX. This is enforced by the ESLint rule **`paranext/no-hardcoded-jsx-strings`** (in `lib/eslint-plugin-paranext/`).
- Ad-hoc `localizedStrings: Record<string, string>` props with no typed `STRING_KEYS` tuple — callers lose the typed key list and the partial-map guarantee.

**Why:** the `STRING_KEYS` tuple gives consumers a typed, single-source key list for the `useLocalizedStrings` lookup; the `Partial<Record>` type lets stories pass a subset and trust the fallback; the English-fallback read keeps the component usable in isolation. Established precedent: `BookChapterControl`, `BookSelector`, `MarkerMenu`, `Inventory`, `ScopeSelector`, `CommentEditor`, `CommentList`, `FootnoteEditor`, `UndoRedoButtons`, `ErrorPopover`, `ErrorDump`. See `lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.types.ts` for the `STRING_KEYS` + `…LocalizedStrings` pair and `book-chapter-control.component.tsx` for the `?? 'English'` fallback reads.

> Note: a few components also accept a separate data map prop such as `localizedBookNames?: Map<…>` for localized book names — that is a distinct, data-shaped prop, not the string-key mechanism described here.

---

## Conventions

### Key Format

Use the pattern: `%webView_{feature}_{elementDescription}%`

Examples:
- `%webView_projectProperties_title%`
- `%webView_projectProperties_saveButton%`
- `%webView_projectProperties_cancelButton%`

#### One key-prefix convention per feature namespace

**Within a single feature namespace in `localizedStrings.json`, all new keys MUST share one prefix convention.** Prefer **camelCase feature-prefix with `_` subsegment separators** (e.g. `%webView_bookSelector_more%`, `%markerMenu_searchPlaceholder%`) — this matches the dominant in-repo style. Lowercase `snake_case` throughout is acceptable *only* if the namespace has no pre-existing keys.

- **Avoid:** mixing camelCase and snake_case variants of the same prefix inside one namespace (e.g. `markersChecklist_*` alongside `markers_checklist_*`).

Consistency is scoped *per feature namespace*, not globally: existing files mix legacy PascalCase enum keys (e.g. `CheckType_3`) with modern camelCase prefix keys, and reconciling those globally would churn established translations. Just don't introduce a second style for the same prefix.

### Ellipsis Usage

Add `...` to labels that open dialogs:
- "New Project..." (opens a dialog)
- "Save" (immediate action, no ellipsis)

### Language Requirements

**Always provide both `en` AND `es` translations.** Both are required for the build to pass.

---

## Text Direction (RTL/LTR)

**Per-content text direction MUST come from the `platform.textDirection` project setting.** Read it via:

```typescript
const [textDirection] = useProjectSetting(
  projectId,
  'platform.textDirection',
  'ltr', // default
);
```

The setting type is `'ltr' | 'rtl' | '' | undefined` (declared in `src/declarations/papi-shared-types.ts`). The platform derives it from the project's language definition by default; admins can override per project.

### Do NOT hardcode language-code direction checks

```tsx
// ❌ WRONG — misses most RTL languages, ignores admin overrides
<div dir={language === 'he' || language === 'ar' ? 'rtl' : undefined}>

// ✅ RIGHT — sourced from the project setting
<div dir={textDirection}>
```

Hardcoded language-code equality checks (`x === 'he'`, `x === 'ar'`, etc.) miss many RTL languages (Persian, Urdu, Pashto, Yiddish, Sindhi, Kurdish Sorani, Dhivehi, …) and ignore admin overrides. The project setting is the single source of truth.

### Multi-project UIs

When a UI shows content from multiple projects (e.g., parallel-passages, comparative-text columns in markers-checklist), resolve `platform.textDirection` per-project and apply the resolved direction at the column level. Cells inherit their column's direction.

### Reference implementation

`extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx` — uses `useProjectSetting(projectId, 'platform.textDirection', defaultTextDirection)` with a module-level `const defaultTextDirection = 'ltr'`. The same file shows the project-specific `OHEBGRK` exception pattern (in the `textDirectionEffective` memo) for projects that need conditional direction (OT=RTL, NT=LTR). Search for the `defaultTextDirection` constant and the `OHEBGRK` branch rather than relying on line numbers.

### Global UI direction is separate

`readDirection()` from `lib/platform-bible-react/src/utils/dir-helper.util.ts` reads the user's **global UI direction** preference from `localStorage`. That is the user's UI preference (controlling layout direction of toolbars, sidebars, dropdowns), not content direction. Do not use it for per-content / per-cell direction.

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

Before completing any UI work:

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

The following are **blocking issues** that must be resolved before the work can be marked complete:

1. **Hardcoded English text** - Any user-visible text not going through localization
2. **Missing translations** - Keys exist in `en` but not `es` (or vice versa)
3. **Modified existing strings** - Changing values of existing keys (use `metadata.fallbackKey` instead)
4. **Duplicate keys** - Creating new keys for strings that already exist

---

## C# Backend Localization

Backend services (C# code in `c-sharp/`) that return user-facing strings across the PAPI wire **must** participate in localization. Two approaches, depending on where the string originates:

### Approach 1: Resolve at the wire boundary (PREFERRED)

Stateless services return **localize keys** (`%key%`); the wrapping `NetworkObject` / `DataProvider` resolves them via `LocalizationService.GetLocalizedString(...)` before serializing the wire response. This keeps pure-function services free of `PapiClient` coupling.

```csharp
// Pure static service — returns the KEY
public static class MarkersDataSource
{
    public const string InvalidMarkerPairErrorKey = "%markersChecklist_errorInvalidMarkerPair%";

    public static MarkerSettingsValidationResult ValidateMarkerSettings(string input)
    {
        // ... parsing ...
        if (failed)
            return new MarkerSettingsValidationResult(false, null, InvalidMarkerPairErrorKey);
        return new MarkerSettingsValidationResult(true, parsed, null);
    }
}

// NetworkObject wrapper — resolves the key before sending over the wire
public class ChecklistNetworkObject(PapiClient papi, LocalParatextProjects projects)
    : NetworkObject(papi, "platformScripture.checklistService")
{
    private MarkerSettingsValidationResult ValidateMarkerSettings(string input)
    {
        var result = MarkersDataSource.ValidateMarkerSettings(input);
        if (result.ErrorMessageKey == null) return result;
        var localized = LocalizationService.GetLocalizedString(
            PapiClient,
            result.ErrorMessageKey,
            "Equivalent markers need to be entered in the form: p/q" // English fallback
        );
        return result with { ErrorMessage = localized, ErrorMessageKey = null };
    }
}
```

### Approach 2: Resolve inline (when `PapiClient` is in hand)

If the code is already inside a `DataProvider`/`NetworkObject` method, call `LocalizationService.GetLocalizedString(PapiClient, key, defaultValue)` directly.

### Suggested helper: `IsLocalizeKey` idempotence guard

When the wire layer resolves localize keys inside a record field (rather than a dedicated `xxxKey`/`xxxMessage` field pair), add a lightweight check to avoid double-resolving an already-resolved value. This matters if a record could be passed through the resolver twice (test round-trips, future pipeline changes, re-entry after caching, etc.):

```csharp
/// <summary>
/// Lightweight test for "looks like a localize key" — wrapped in %
/// sentinels per paranext-core convention. Idempotence guard: ensures
/// calling the resolver twice on the same record does not second-time
/// through LocalizationService.GetLocalizedString on an already-resolved
/// English value.
/// </summary>
private static bool IsLocalizeKey(string? s) =>
    s != null && s.Length >= 2 && s[0] == '%' && s[^1] == '%';
```

Then gate resolution on the check:

```csharp
if (!IsLocalizeKey(result.Message)) return result;
var resolved = LocalizationService.GetLocalizedString(PapiClient, result.Message, fallback);
return result with { Message = resolved };
```

Alternative design: use a dedicated `xxxKey` field (e.g. `ErrorMessageKey`) alongside `xxxMessage`, and clear the key when resolving. That is stricter but requires contract changes. The `IsLocalizeKey` sentinel approach preserves the existing contract and costs two characters of runtime check.

### What NOT to do

- ❌ **Do not return byte-exact English literals** from C# to the wire — they bypass localization
- ❌ **Do not thread `PapiClient` into stateless static services** just to localize — use Approach 1
- ❌ **Do not call `LocalizationService.GetLocalizedString` from a static service without `PapiClient`** — static services don't have one

### C# Localization Checklist

- [ ] Every user-facing string returned from C# to the wire uses a localize key, not an English literal
- [ ] The extension's `localizedStrings.json` contains the key in `en` (always) and any other supported languages
- [ ] Resolution happens at the `NetworkObject` / `DataProvider` layer, not in static services
- [ ] English fallback is provided as the `defaultValue` argument to `GetLocalizedString` so the service still returns something readable if localization lookup fails

---

## Testing Localized C# Backends

When a C# backend returns localize keys and resolves them at the wire boundary (the Approach 1 pattern above), the unit/integration tests that exercise it usually run against `DummyPapiClient` — a test double that does **not** have a real localization service wired up.

**The trap:** `DummyPapiClient.SendRequestAsync<T>` returns `Task.FromResult<T?>(default)` for any request type it has no registered handler for (see `c-sharp-tests/DummyPapiClient.cs`). The localization service is one such unregistered request. So `LocalizationService.GetLocalizedString(papiClient, key, defaultValue)` gets back `default(T)` (i.e. `null` for the resolved string) and falls back to the `defaultValue` you supplied.

**Consequence:** if you provide an English fallback as the `defaultValue` (which you should — see the C# checklist above), a wire integration test **still sees the English string**, not the localize key. The test passes whether or not localization is wired correctly, because the fallback masks the missing resolution.

```csharp
// In the backend:
var localized = LocalizationService.GetLocalizedString(
    PapiClient,           // a DummyPapiClient in tests
    "%markersChecklist_errorInvalidMarkerPair%",
    "Equivalent markers need to be entered in the form: p/q" // English fallback
);
// Under DummyPapiClient: GetLocalizedString returns default(string) → falls back to
// "Equivalent markers need to be entered in the form: p/q" — the test sees ENGLISH.
```

**Implications for test design:**

- A test that asserts the wire response equals the English literal does **not** prove localization works — it only proves the fallback works. Don't treat such a green test as evidence the key resolves.
- To verify resolution actually happens, assert that the backend emits the **localize key** (`%…%`) at the layer that hasn't resolved yet (e.g. the static service return value), and resolve-then-assert separately, or register a localization handler on the dummy client so a non-`default(T)` value comes back.
- When you rewire a backend from English literals to localize keys, expect tests that asserted on the old English literal to keep passing via the fallback — re-point them at the key, don't trust the green.

See the test-runner reference for running these C# tests: `.claude/skills/test-runner/reference.md`.

---

## Porting PT9 Features

PT9-specific localization facts to apply when porting a Paratext 9 feature to PT10.

### Don't inherit PT9's English-only surfaces

PT9 leaves some user-facing surfaces unlocalized — most notably **early-startup error dialogs shown before the localizer bootstraps** (e.g. the settings-error / reset `MessageBox` that PT9 renders English-only because its localizer is not yet available at that point in startup).

When you port a feature whose whole purpose is internationalization (or any feature that touches one of these surfaces), do **not** carry PT9's English-only behavior across as an inherited assumption. A translation/i18n feature that itself shows English-only text is a self-defeating regression. The PT10 equivalent surface MUST be internationalized through PT10's localization mechanism — even when PT9 itself does not localize it, and even if that means making the localizer available earlier in PT10's startup than PT9 did.

Treat "PT9 didn't localize this" as a gap to close in PT10, not a spec to replicate.

### Catalogue PT9 user-facing strings during discovery

Before backend TDD begins, sweep the PT9 source for **`Localizer.Str(...)` calls and other user-facing string literals** in the feature's scope, and record them as a digest of localize keys to port. Knowing the full set of keys up front prevents the localization gap from being discovered late.

This was learned the hard way: the markers-checklist port shipped two backend strings (`MarkerSettingsForm_1`, `CLParagraphCellsDataSource_1`) as English literals because the localization gap was found only during late review, then had to be retrofitted (33 language sections re-added, C# rewired to resolve at the wire boundary). A discovery-time `Localizer.Str` sweep would have surfaced every key before any backend code was written.

> The PT9-archaeology discovery agent (`.claude/agents/pt9-archaeologist.md`) performs this `Localizer.Str` sweep and emits a `UserFacingStrings` digest — consume that digest when planning a feature's localization.

---

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.5.0   | 2026-06-18 | Added "Testing Localized C# Backends" section: `DummyPapiClient.SendRequestAsync<T>` returns `default(T)` for unregistered services, so `GetLocalizedString` falls back to its `defaultValue` and wire integration tests still see English when a fallback is supplied — a green literal-asserting test does not prove resolution works. Added "Porting PT9 Features" section: don't inherit PT9's English-only surfaces (e.g. early-startup error dialogs shown before the localizer bootstraps) — the PT10 equivalent MUST be internationalized; catalogue PT9 `Localizer.Str` user-facing strings during discovery so all keys are known before backend TDD (markers-checklist shipped two strings as English literals because the gap was found late). Cross-referenced `pt9-archaeologist.md` and `test-runner/reference.md`. |
| 1.4.0   | 2026-06-17 | Added "Localizing Shared Library Components (`lib/platform-bible-react/`)" section: process-agnostic library components must not call `useLocalizedStrings`/PAPI; they expose a frozen `STRING_KEYS` tuple + a `Partial<Record<…>>` type + an optional `localizedStrings?` prop with English-fallback reads, and the consumer resolves and passes strings down. Named the hardcoded-string enforcer as the real ESLint rule `paranext/no-hardcoded-jsx-strings`. Added a "one key-prefix convention per feature namespace" subsection under Conventions › Key Format (prefer camelCase feature-prefix with `_` subsegments; don't mix camelCase and snake_case variants of the same prefix). Grounded against `book-chapter-control`, `book-selector`, and `marker-menu`. |
| 1.3.0   | 2026-04-29 | Added "Text Direction (RTL/LTR)" section codifying per-content direction via `useProjectSetting('platform.textDirection', defaultTextDirection)`. Forbids hardcoded language-code equality checks (`x === 'he' \|\| x === 'ar'`). References `platform-scripture-editor.web-view.tsx` (the `defaultTextDirection` constant and the `OHEBGRK` branch) as the canonical pattern. Clarifies separation between global UI direction (`readDirection()`) and per-content direction. Sourced from markers-checklist PR feedback (RTL-hardcoding comment). |
| 1.2.0   | 2026-04-21 | Added `toc: true` + machine-readable TOC block now that the guide has grown past the stub-patterns.md threshold. No content changes. |
| 1.1.1   | 2026-04-20 | Patch from markers-checklist post-implementation review. Clarified that extensions adding language sections do NOT register the language with the UI picker — picker reads `assets/localization/*.json` filenames, so a language is only end-user-reachable when a corresponding root file exists. Clarified that `assets/localization/metadata.json` is key-level metadata, not a language manifest. |
| 1.1.0   | 2026-04-20 | Added C# Backend Localization section. Clarified single-store/two-APIs architecture, fallback chain, and where to put strings based on PAPI namespace. Scope widened beyond UI web views. |
| 1.0.0   | 2026-03-04 | Initial version |
