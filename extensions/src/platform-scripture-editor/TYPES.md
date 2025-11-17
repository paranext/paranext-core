# Scripture Location & Range Types - Cheat Sheet

## Overview

This reference covers location and range types used to specify positions in Scripture text across two formats: **USFM** (text-based) and **USJ** (JSON-based).

---

## Key Concepts

### Absolute vs. Relative Locations

- **Absolute locations**: Point to a specific position in Scripture using verse references (work across any document containing that Scripture)
- **Relative locations**: Point to positions within a specific USJ document structure (like a character index in a string)

### USFM vs. USJ

- **USFM**: Text format with markers like `\v 1` - locations use character offsets
- **USJ**: JSON format - locations use JSONPath queries to navigate the object structure

---

## Type Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    ABSOLUTE LOCATIONS                       │
│                  (verse reference based)                    │
└─────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            │                               │
    ┌───────▼────────┐            ┌────────▼────────┐
    │ USFM Locations │            │  USJ Locations  │
    │  (text-based)  │            │ (JSON-based)    │
    └────────────────┘            └─────────────────┘
            │                               │
            │                               ├─► Uses UsjDocumentLocation
            │                               │   (relative to document)
            │                               │
            └───────────────┬───────────────┘
                            │
                ┌───────────▼──────────┐
                │  ScriptureLocation   │
                │   (union of both)    │
                └──────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    RELATIVE LOCATIONS                       │
│              (document structure based)                     │
└─────────────────────────────────────────────────────────────┘
            │
    ┌───────▼─────────────────┐
    │  UsjDocumentLocation    │
    │  (7 specific subtypes)  │
    └─────────────────────────┘
```

---

## USFM Location Types

### Current Types

| Type                          | Properties                      | Offset Behavior                                                     | Status        | Notes                                        |
| ----------------------------- | ------------------------------- | ------------------------------------------------------------------- | ------------- | -------------------------------------------- |
| **UsfmLocation**              | Currently = `UsfmVerseLocation` | N/A                                                                 | ⚠️ May expand | Internal only; will add book/chapter offsets |
| **UsfmVerseLocation**         | Union of 3 formats              | N/A                                                                 | ✅ Current    | Flexible format, accepts multiple shapes     |
| **UsfmVerseRefVerseLocation** | `verseRef`, `offset?`           | If verse=0: from chapter start<br>If verse>0: from verse marker `\` | ✅ Preferred  | Modern format                                |
| **UsfmScrRefVerseLocation**   | `scrRef`, `offset?`             | Same as above                                                       | ⛔ Deprecated | Use `verseRef` instead of `scrRef`           |
| `SerializedVerseRef`          | Just the verse ref              | Assumed offset = 0                                                  | ✅ OK         | Shorthand when no offset needed              |

### Deprecated Types

| Type                        | Replacement                                        | Deprecated Date |
| --------------------------- | -------------------------------------------------- | --------------- |
| **VerseRefOffset**          | `UsfmVerseLocation` or `UsfmVerseRefVerseLocation` | 23 Oct 2025     |
| **UsfmScrRefVerseLocation** | `UsfmVerseLocation`                                | 13 Nov 2025     |

---

## USJ Location Types (Absolute)

These combine a verse reference with a `UsjDocumentLocation` to create an absolute position.

### Top-Level Union

```typescript
UsjLocation = UsjChapterLocation | UsjBookLocation;
```

### Granularity Levels

| Granularity | JSON Document Starts At    | First Content Entry        |
| ----------- | -------------------------- | -------------------------- |
| **Book**    | Start of entire book       | `id` marker                |
| **Chapter** | Start of specified chapter | `id` (ch.1) or `c` (ch.>1) |

### Using VerseRef (Newer Style)

| Type                           | Structure                                                 | Key Field                 | Default Granularity |
| ------------------------------ | --------------------------------------------------------- | ------------------------- | ------------------- |
| **UsjVerseRefBookLocation**    | `{ verseRef, granularity: 'book', documentLocation }`     | `granularity: 'book'`     | N/A                 |
| **UsjVerseRefChapterLocation** | `{ verseRef, granularity?: 'chapter', documentLocation }` | `granularity?: 'chapter'` | `'chapter'`         |

### Using Flat Properties (Newer Style)

| Type                       | Structure                                | Usage                        |
| -------------------------- | ---------------------------------------- | ---------------------------- |
| **UsjFlatBookLocation**    | `{ book, documentLocation }`             | Book ID + location           |
| **UsjFlatChapterLocation** | `{ book, chapterNum, documentLocation }` | Book ID + chapter + location |

### Deprecated USJ Absolute Type

| Type                           | Properties                                | Limitation                       | Deprecated Date |
| ------------------------------ | ----------------------------------------- | -------------------------------- | --------------- |
| **UsjFlatTextChapterLocation** | `{ book, chapterNum, jsonPath, offset? }` | Only markers/text, no attributes | 13 Nov 2025     |

---

## USJ Document Locations (Relative)

These are **relative to a specific USJ document** (book or chapter). They use JSONPath to navigate the JSON structure.

### The 7 Subtypes

| Type                                  | What It Points To             | Key Properties                                  | USFM Equivalent                     |
| ------------------------------------- | ----------------------------- | ----------------------------------------------- | ----------------------------------- |
| **UsjMarkerLocation**                 | Beginning of a marker object  | `jsonPath`                                      | The `\` in `\v 1`                   |
| **UsjClosingMarkerLocation**          | Point in closing marker       | `jsonPath`, `closingMarkerOffset`               | Character in `\nd*`                 |
| **UsjTextContentLocation**            | Point in text content         | `jsonPath`, `offset`                            | Character in verse text             |
| **UsjPropertyValueLocation**          | Point in property value       | `jsonPath`, `propertyOffset`                    | Character in marker/attribute value |
| **UsjAttributeKeyLocation**           | Point in attribute key        | `jsonPath`, `keyName`, `keyOffset`              | Character in attribute name         |
| **UsjAttributeMarkerLocation**        | Beginning of attribute marker | `jsonPath`, `keyName`                           | The `\` in `\ca`                    |
| **UsjClosingAttributeMarkerLocation** | Point in closing attr marker  | `jsonPath`, `keyName`, `keyClosingMarkerOffset` | Character in `\ca*`                 |

### JSONPath Types

| Type                 | Points To                      | Example                                              |
| -------------------- | ------------------------------ | ---------------------------------------------------- |
| **ContentJsonPath**  | Marker objects or text strings | `$.content[0].content[1]`                            |
| **PropertyJsonPath** | Properties on objects          | `$.content[0].marker` or `$.content[0]['altnumber']` |

### Important Limitations

Some USFM positions **cannot be represented** in USJ:

- Second slash in `//` (optbreak)
- Nested marker prefix `+`
- Closing marker attribute delimiters: `|`, `=`, quotes, spaces

Some locations are **conceptual** (no exact USJ equivalent):

- `UsjClosingMarkerLocation` - JSON doesn't have distinct closing objects
- `UsjAttributeKeyLocation` - When it's an attribute marker, offset applies to USFM marker name, not JSON property name
- `UsjAttributeMarkerLocation` - Attribute markers are just JSON properties
- `UsjClosingAttributeMarkerLocation` - Same issues as above

---

## Helper Types

### UsjNodeAndDocumentLocation

Pairs a USJ node with its document location:

```typescript
{
  node: string | MarkerObject | Usj,
  documentLocation: UsjDocumentLocation
}
```

### UsjSearchResult

Result from searching text in USJ:

```typescript
{
  start: UsjNodeAndDocumentLocation<UsjTextContentLocation>,
  end: UsjNodeAndDocumentLocation<UsjTextContentLocation>,
  text: string
}
```

---

## Range Types

### ScriptureRange (platform-scripture-editor)

Used in the editor to represent selections:

```typescript
{
  start: UsjChapterLocation | UsfmVerseLocation | ScriptureLocation,
  end: UsjChapterLocation | UsfmVerseLocation | ScriptureLocation
}
```

### Deprecated in ScriptureRange

- Old `ScriptureLocation` type (limited to markers/text only) - deprecated 13 Nov 2025
- Use full `UsjChapterLocation` and `UsfmVerseLocation` instead

---

## Quick Reference Table: When to Use What

| Scenario                               | Use This Type                             |
| -------------------------------------- | ----------------------------------------- |
| Point to verse with offset in USFM     | `UsfmVerseRefVerseLocation`               |
| Point to verse without offset          | `SerializedVerseRef`                      |
| Point anywhere in USJ (with verse ref) | `UsjChapterLocation` or `UsjBookLocation` |
| Point within a specific USJ document   | `UsjDocumentLocation` (one of 7 subtypes) |
| Represent an editor selection          | `ScriptureRange`                          |
| Search results in USJ                  | `UsjSearchResult`                         |
| Working with legacy code               | Check for deprecated types and migrate    |

---

## Status Legend

- ✅ Current/Preferred - Use these types
- ⚠️ May Change - Internal use, API may expand
- ⛔ Deprecated - Migrate away from these

---

## Migration Guide

| If You See...                     | Replace With...                                             |
| --------------------------------- | ----------------------------------------------------------- |
| `VerseRefOffset`                  | `UsfmVerseRefVerseLocation`                                 |
| `scrRef` property                 | `verseRef` property                                         |
| `UsfmScrRefVerseLocation`         | `UsfmVerseLocation` (with `verseRef`)                       |
| `UsjFlatTextChapterLocation`      | Full `UsjChapterLocation` with proper `UsjDocumentLocation` |
| Old `ScriptureLocation` in ranges | `UsjChapterLocation` or `UsfmVerseLocation`                 |

---

## Key Insights

1. **USFM uses character offsets**, USJ uses JSONPath + offsets within nodes
2. **Absolute locations** need verse references; **relative locations** are document-specific
3. **USJ locations** are more complex because JSON structure is nested
4. **Not everything in USFM can be represented in USJ** (and vice versa)
5. **Generic types** like `UsjLocation<TDocumentLocation>` let you narrow to specific location subtypes
6. **Deprecation trend**: Moving from flat/limited types to flexible, well-structured types
