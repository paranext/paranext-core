---
title: Localization Guide
description: Mandatory localization patterns for all user-facing text in paranext-core — UI web views (TS) and C# backend services.
version: 1.6.0
status: active
created: 2026-03-04
last_updated: 2026-07-28
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
<!-- | [Spanish (es) Localization Decisions](#spanish-es-localization-decisions) | -->
<!-- | [Text Direction (RTL/LTR)](#text-direction-rtlltr) | -->
<!-- | [Reusing Existing Strings (IMPORTANT)](#reusing-existing-strings-important) | -->
<!-- | [Existing Strings Are Immutable (CRITICAL)](#existing-strings-are-immutable-critical) | -->
<!-- | [Dynamic Values with formatReplacementString](#dynamic-values-with-formatreplacementstring) | -->
<!-- | [Embedding JSX in Localized Text with formatReplacementStringToArray](#embedding-jsx-in-localized-text-with-formatreplacementstringtoarray) | -->
<!-- | [Localization Checklist](#localization-checklist) | -->
<!-- | [Blocking Issues](#blocking-issues) | -->
<!-- | [C# Backend Localization](#c-backend-localization) | -->
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

### 4. Flag Unclear or Non-Standard English Source Text

Before translating, check whether the English string itself is clear and grammatically standard. If it's ambiguous, idiomatic, or likely to trip up a non-native English speaker, don't just translate around the problem — flag it to the developer and suggest clearer alternatives for the English string.

This is advisory, not a [blocking issue](#blocking-issues) — raise it, don't hold up the PR over it. There's a real tension between brevity and grammatical completeness (e.g. "Save project" vs. "Save the project" vs. "Save your project"); UX is aware of this tradeoff, but call it out when the terseness is likely to confuse non-native speakers.

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

### Translation Style (All Languages)

Apply these regardless of target language:

- Prioritize industry best practices first, Paratext 9 precedent second, when choosing terminology or phrasing.
- Prefer simple vocabulary and sentence structure — many users run the software in a non-native language.
- Translations don't need to be literal. Prioritize clarity: if the English string is vague or leaves something implicit, make it explicit in the target language. Consider where the string appears in the UI so the translation makes sense in context.
- Watch for length: long strings can break layouts (e.g. menus). Test in-app where possible; if a translation must be shortened, put the fuller explanation in a tooltip/description instead, or flag it to the dev team so the UI can accommodate it.
- Error and exception messages: never blame the user. Use neutral phrasing and, where possible, briefly suggest how to resolve the issue.
- Capitalization: sentence case only — capitalize just the first word of a sentence/instruction plus proper nouns. Do not mirror English title case, even for tab/window/section names (e.g. "Show Recent Searches" → "Mostrar búsquedas recientes"). Exceptions that stay capitalized: proper nouns (*Internet*, *Paratext*), single letters identifying scroll groups/additional books/etc., and acronyms (*ISO*, *JSON*).
- Not every string maps neatly to an "interactive control" (button/menu/command) or an "alert/message" — tooltips, status bar text, placeholder text, and progress labels are common ambiguous cases. Classify by function first: an ongoing process (e.g. "Saving…", "Loading…") reads differently from a completed/current state (e.g. "Saved", "Connected") or a static description (a control's purpose, a tooltip). Apply your language's convention for each case; when it's still unclear, default to the same tone as static interactive-control labels.
- Placeholder text depends on what it's a placeholder for — it is not one category. A field expecting a specific value (e.g. a name or email field) is typically a noun phrase naming the expected content, with no verb at all. A field that suggests an action (e.g. a search box) should match the register/tone used for other interactive-control action labels in your language.

### Revising an Existing Localization Decision

If a later localizer disagrees with a documented style decision (here or in a per-language section below), see [Exception: Fixing Errors or Applying a Revised Style Rule](#exception-fixing-errors-or-applying-a-revised-style-rule) under Existing Strings Are Immutable for how to update it without breaking the immutability rule.

---

## Spanish (es) Localization Decisions

Distilled from the team's ["Localization decisions - Paratext 10 Studio"](https://docs.google.com/document/d/1eczM9NS_ErRGR00WrPnThLn17POuYDLufF_tVukTHnU/edit?tab=t.sxfosibwx6hc#heading=h.errty21z3k1k) Google Doc (Spanish tab — the doc's French tab is not yet fleshed out enough to be authoritative, so no French guidance is captured here yet). These decisions apply on top of the [general translation style principles](#translation-style-all-languages) above — apply both when writing or reviewing `es` strings; if using an AI-assisted translator, feed it both as context.

**Last synced:** 2026-07-28. This section is a snapshot, not a live mirror — if the Google Doc has been updated since this date, re-check it and update this section accordingly before treating it as authoritative.

To revise a decision below, see [Exception: Fixing Errors or Applying a Revised Style Rule](#exception-fixing-errors-or-applying-a-revised-style-rule) — update the Google Doc first, then sync this section.

### Regional variant

Target broadly-understood **Latin American Spanish** rather than defaulting to a European "standard" — Platform.Bible's localization strategy supports regional variants layered on top of a general one. If no single term covers all regions well, use the best general term and add region-specific strings only if truly needed.

### Formality

Always use formal **usted** — never *tú*, *vos*, or *vosotros*. Keep the tone respectful and professional but not cold or distant; avoid colloquialisms or the joking tone sometimes seen in other apps' error messages.

### Error message templates

Two templates (in addition to the general "never blame the user" guidance above):
- **"No se pudo…"** ("Could not…") — the action did not complete (e.g. failed save, failed project open).
- **"Se produjo un error al…"** ("An error occurred while…") — a system-level failure where the action started but failed mid-process.

### Verb mood

- **Infinitive** for actions the user invokes — buttons, menus, commands: *Guardar*, *Abrir proyecto*, *Cancelar*, *Aceptar*.
- **Conjugated imperative** only when the software is directly telling the user what to do — messages/alerts: *Inténtelo de nuevo*.
- Courtesy phrasing: prefer **"Por favor, + imperative"** (e.g. *Por favor, cierre otras ventanas antes de continuar*). **"Favor de + infinitive"** is common in formal Mexican and other Latin American contexts, but is not the team's preferred style.
- **Progress indicators for an ongoing process** → **gerund**: *Guardando…*, *Cargando…*, *Sincronizando…*.
- **Completed/current-state labels** (often in the status bar) → **past participle**, used adjectivally rather than as a verb mood: *Guardado*, *Sincronizado*, *Conectado*, *Desconectado*.
- **Placeholder text** (see general placeholder-text guidance above): a field expecting a specific value takes a plain noun phrase, no verb at all — *Nombre del proyecto*, *Correo electrónico*. A field that suggests an action (e.g. a search box) takes the **infinitive**, same as buttons: *Buscar…*.
- Tooltips and other static descriptive labels → **infinitive**, same as buttons/menus (e.g. a tooltip on a save icon reads *Guardar cambios*).
- **When in doubt, default to the infinitive.**

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

### Exception: Fixing Errors or Applying a Revised Style Rule

The immutability rule above protects a key's **meaning** — not the exact characters of its value. It's fine to correct a string's value in place, without a new key or `fallbackKey`, when the fix does not change what the string means:
- Spelling, grammar, or punctuation corrections.
- Bringing an existing string in line with a style rule that was revised or newly clarified after the string shipped (e.g. a capitalization or verb-mood rule changed).

**If the meaning changes at all** — including a "clarification" that changes what the user understands, not just how it's phrased — that's not a correction. Treat it as a replacement and follow [If a String Needs Replacement](#if-a-string-needs-replacement) above (new key + `fallbackKey`) instead of editing in place. In-place edits are invisible to anyone (a downstream consumer, a third-party translator working from an old export) holding a reference to the old value; only a meaning-preserving fix is safe to make silently.

**Process for revising a documented decision:**
1. For a language whose decisions are sourced from an external document (e.g. the [Spanish tab of the Localization Decisions Google Doc](#spanish-es-localization-decisions)), update the source document first — it is the authoritative record, and this guide is a synced snapshot of it.
2. Update this guide to match, including bumping any "Last synced" date, so the guide doesn't silently drift from the source.
3. Update the shipped strings to match the revised rule.

For decisions that live directly in this guide — the language-agnostic rules under [Translation Style (All Languages)](#translation-style-all-languages) — skip step 1: change the rule here directly and record the change in the [Version Log](#version-log). Note that some of the language-agnostic rules may be appropriate to call out in the (English) Explanation page of the Localization Decisions Google Doc, so review that document and consider whether that may be the case for any new decisions.

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

## Embedding JSX in Localized Text with formatReplacementStringToArray

`formatReplacementString` only produces a plain string, so it can't carry a React element (a link, an icon, a `Kbd`) embedded mid-sentence. For that case, use its sibling `formatReplacementStringToArray` from `platform-bible-utils`: it tokenizes the same `{placeholder}` syntax but returns an array of strings interleaved with whatever replacer values you pass — including JSX — which you render directly as children.

Because the result is an array, each item needs a `key` when rendered — wrap it with `.map` into `Fragment`s keyed by index (safe here since the array is static and never reordered):

```tsx
import { Fragment } from 'react';
import { formatReplacementStringToArray } from 'platform-bible-utils';

// localized string: "{intro} {websiteLink} ({license}, {terms})"
<p>
  {formatReplacementStringToArray(introFormat, {
    intro: introText,
    websiteLink: (
      <a target="_blank" rel="noreferrer" href={WEBSITE_LINK}>
        {WEBSITE_NAME}
      </a>
    ),
    license: licenseText,
    terms: (
      <a target="_blank" rel="noreferrer" href={TERMS_LINK}>
        {termsText}
      </a>
    ),
  }).map((contribution, index) => (
    // We can use index as key here because the array is static and will not change.
    // eslint-disable-next-line react/no-array-index-key
    <Fragment key={`key-${index}`}>{contribution}</Fragment>
  ))}
</p>
```

**Why this matters:** embedding a non-text element (a `Kbd`, an icon, a link) by string-concatenating it before or after a localized string — e.g. `<Kbd>{key}</Kbd> {message}` — bakes in an assumption about word order and spacing that not every language shares, and forces the element into a fixed position the string can't control. Letting the *localized string itself* place the `{placeholder}` fixes both problems: each translation decides where the embedded element goes, and any surrounding punctuation/spacing lives in the translated string, not in code.

For key names specifically, use the `Kbd`/`KbdGroup` components exported from `platform-bible-react` rather than a raw `<kbd>` element, per the [Tooltips guideline](../../lib/platform-bible-react/src/stories/guidelines/tooltips.mdx). And don't hardcode a key's display word (`"Backspace"`, `"Delete"`) — once merged, `getLocalizeKeyForPhysicalKey(key: NameablePhysicalKey): LocalizeKey` (`platform-bible-utils/keyboard-util.ts`, added in [#2590](https://github.com/paranext/paranext-core/pull/2590)) resolves a `NameablePhysicalKey` to its localized key, so the key label goes through the same localization pipeline as everything else instead of being hardcoded per caller. If a key you need to display isn't already in `NameablePhysicalKey`, add it there (with a corresponding `localizedStrings.json` entry) rather than falling back to a hardcoded string.

**Which key names to actually translate:** whether a language's `getLocalizeKeyForPhysicalKey` entries should translate a key's label, rather than keep it in English, depends on that language's physical-keyboard landscape, not on whether a plausible translation exists:
- If physical keyboards commonly used for that language print localized key names/abbreviations, translate to match what's printed on those keyboards — even though some users of that locale may still be typing on an English-labeled keyboard.
- If localized physical keyboards are rare or don't exist for that language, keep the English key name, even if a plausible translation exists — unless industry-standard software conventions for that language dictate otherwise.

**Reference implementation:** `src/renderer/components/dialogs/about-dialog.component.tsx` (the `%about_db_ip_attribution_format%` string interpolates two `<a>` links this way).

**Don't reimplement this.** A second, parallel `{placeholder}`-splitting helper (`interleavePlaceholders`) exists in `extensions/src/platform-enhanced-resources/src/components/guide/marble-guide.component.tsx` because that code didn't find `formatReplacementStringToArray` first. Reuse the shared utility instead of writing a local one — this isn't just duplication: `interleavePlaceholders` tokenizes with `/\{(\w+)\}/g`, so a hyphenated placeholder name (e.g. `{color-word}`) doesn't match and is silently left in the rendered UI as literal `{color-word}` text; `formatReplacementStringToArray` doesn't have this defect. Tracked in [PT-4269](https://paratextstudio.atlassian.net/browse/PT-4269) — once that's fixed (marble-guide migrated to `formatReplacementStringToArray`), remove this paragraph.

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

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.6.0   | 2026-07-28 | Code-review pass on the 1.5.0 additions. Fixed TOC section order (Spanish now listed before Text Direction, matching the body). Added the source Google Doc link and a "Last synced" date to the Spanish section. Split out language-agnostic content into a new "Translation Style (All Languages)" subsection under Conventions (terminology priority, plain vocabulary, non-literal clarity, length, neutral error tone, sentence-case capitalization, classifying ambiguous UI text, placeholder-text categorization) so it's not scoped to Spanish only. Closed a gap in Spanish verb-mood rules for tooltips/placeholders/progress indicators/status-bar labels (gerund for in-progress, past participle for current-state, infinitive as the default fallback), with Spanish examples. Reworded the "Favor de + infinitive" guidance from "non-standard" to a regional-preference note, since it's a well-established Mexican/Latin American variant the team simply isn't adopting. Added a "Flag Unclear or Non-Standard English Source Text" step to the Localization Pattern. Documented `getLocalizeKeyForPhysicalKey`/`NameablePhysicalKey` (not yet merged, see [#2590](https://github.com/paranext/paranext-core/pull/2590)) and the per-language policy for translating vs. preserving physical key names. Moved "Revising an Existing Localization Decision" under "Existing Strings Are Immutable" as a named, meaning-preservation-scoped exception (`Exception: Fixing Errors or Applying a Revised Style Rule`), and clarified the sync direction (Google Doc first, then this guide, then shipped strings). Fixed the `formatReplacementStringToArray` example's placeholder count to match its cited reference implementation and added the missing `.map`/`Fragment` key-wrapping it also uses. Documented a real correctness defect in the `interleavePlaceholders` duplicate helper (its `\w+` regex silently drops hyphenated placeholder names) and filed [PT-4269](https://paratextstudio.atlassian.net/browse/PT-4269) to track migrating it to the shared utility. |
| 1.5.0   | 2026-07-27 | Added "Embedding JSX in Localized Text with formatReplacementStringToArray" section (mid-sentence JSX interpolation, e.g. links/`Kbd` elements, via the existing `formatReplacementStringToArray` utility — was previously undocumented and had already been reimplemented once as a local helper; also notes to use the shadcn `Kbd`/`KbdGroup` components and, once merged, `getLocalizeKeyForPhysicalKey` for key names rather than hardcoding them). Added "Spanish (es) Localization Decisions" section distilled from the team's "Localization decisions - Paratext 10 Studio" Google Doc (Spanish tab): regional-variant/priority guidance, formal `usted` register, error-message templates, capitalization rules, and verb-mood rules (infinitive for controls, conjugated imperative for messages/alerts). French tab exists but is not yet authoritative, so not captured. |
| 1.4.0   | 2026-06-17 | Added "Localizing Shared Library Components (`lib/platform-bible-react/`)" section: process-agnostic library components must not call `useLocalizedStrings`/PAPI; they expose a frozen `STRING_KEYS` tuple + a `Partial<Record<…>>` type + an optional `localizedStrings?` prop with English-fallback reads, and the consumer resolves and passes strings down. Named the hardcoded-string enforcer as the real ESLint rule `paranext/no-hardcoded-jsx-strings`. Added a "one key-prefix convention per feature namespace" subsection under Conventions › Key Format (prefer camelCase feature-prefix with `_` subsegments; don't mix camelCase and snake_case variants of the same prefix). Grounded against `book-chapter-control`, `book-selector`, and `marker-menu`. |
| 1.3.0   | 2026-04-29 | Added "Text Direction (RTL/LTR)" section codifying per-content direction via `useProjectSetting('platform.textDirection', defaultTextDirection)`. Forbids hardcoded language-code equality checks (`x === 'he' \|\| x === 'ar'`). References `platform-scripture-editor.web-view.tsx` (the `defaultTextDirection` constant and the `OHEBGRK` branch) as the canonical pattern. Clarifies separation between global UI direction (`readDirection()`) and per-content direction. Sourced from markers-checklist PR feedback (RTL-hardcoding comment). |
| 1.2.0   | 2026-04-21 | Added `toc: true` + machine-readable TOC block now that the guide has grown past the stub-patterns.md threshold. No content changes. |
| 1.1.1   | 2026-04-20 | Patch from markers-checklist post-implementation review. Clarified that extensions adding language sections do NOT register the language with the UI picker — picker reads `assets/localization/*.json` filenames, so a language is only end-user-reachable when a corresponding root file exists. Clarified that `assets/localization/metadata.json` is key-level metadata, not a language manifest. |
| 1.1.0   | 2026-04-20 | Added C# Backend Localization section. Clarified single-store/two-APIs architecture, fallback chain, and where to put strings based on PAPI namespace. Scope widened beyond UI web views. |
| 1.0.0   | 2026-03-04 | Initial version |
