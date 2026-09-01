# Platform.Bible Utils

A set of utility functions, types, and classes for use inside Platform.Bible and extensions.

## Behavior Changes

If you consume this package from an extension, read this section before upgrading. The string
utilities and the new `GraphemeString` class changed behavior for inputs that were always valid.
None of it is caught by a type error. Rationale for each decision lives in
`.context/standards/Architecture-Decisions.md` under `adr-grapheme-string-native-parity` and
`adr-grapheme-segmenter-unicode-segmenter`.

### 1. Grapheme segmentation is now UAX #29 conformant

This is the change most likely to affect you, because it changes results for ordinary text rather
than edge-case arguments. Segmentation moved from `stringz` to `unicode-segmenter`. `stringz` was
never a UAX #29 implementation — it scored 65.8% on Unicode's own `GraphemeBreakTest.txt` — so any
count, index, `slice`, or search over the following scripts was wrong before and is right now:

| Text                              | Before | Now |
| --------------------------------- | ------ | --- |
| `בְּרֵאשִׁית` — pointed Hebrew    | 11     | 6   |
| `مَرْحَبً` — Arabic with harakat  | 8      | 4   |
| `ܣܰܘܪ` — Syriac with vowel points | 4      | 3   |
| `हिन्दी` — Devanagari conjunct    | 6      | 2   |
| `กุ๊` — Thai base + vowel + tone  | 3      | 1   |
| decomposed Hangul jamo            | 6      | 2   |
| `\r\n`                            | 2      | 1   |

Emoji, flags, skin-tone modifiers and Latin diacritics were already correct and are unchanged.

Two consequences follow from conformance and are worth checking your code against:

- **`\r\n` is a single cluster.** Searches only report boundary-aligned hits, so `'\n'` is not
  findable inside a `\r\n`, and `split(text, '\n')` will not break Windows-style lines apart. Use a
  regex matching the whole terminator: `split(text, /\r?\n/)`.
- **A zero-width joiner attaches to the character before it**, not after. A string ending in
  ZWJ + space now ends in a cluster that is entirely whitespace.

### 2. Bug fixes — the old behavior was trying to match native `String` and failed

| Function                                                  | Before                                                                                              | Now                |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------ |
| `endsWith(s, needle, endPosition)`                        | required the _last_ occurrence to end at `endPosition`, so `endsWith('abcabc','abc',3)` was `false` | `true`             |
| `split(s, sep)` with a string separator                   | compiled the separator as a regex, so `split('a.b','.')` split on every character                   | splits literally   |
| `slice(s, 1, 0)`                                          | tested `indexEnd` for truthiness, returning `'bcdef'`                                               | `''`               |
| `padStart`/`padEnd` with a multi-grapheme pad             | overshot `targetLength`                                                                             | exact              |
| `lastIndexOf(s, '')`                                      | `stringLength(s) - 1`                                                                               | `stringLength(s)`  |
| `split(s, sep, limit)` with `limit` above the match count | threw `RangeError`                                                                                  | returns the pieces |
| `indexOf(s, needle, -Infinity)`                           | looped forever                                                                                      | returns `0`        |

### 3. Behavior changes for valid input, adopting native `String` semantics

| Call                       | Before                                              | Now                                                                 |
| -------------------------- | --------------------------------------------------- | ------------------------------------------------------------------- |
| `split(s, sep, limit)`     | kept the unsplit remainder as a final element       | **discards** everything past the limit; `0` → `[]`, `-1` → no limit |
| `split(s, /(-)/)`          | dropped capture groups                              | interleaves them, so length and every position shift                |
| `split(s, /x/i)`           | recompiled the source, discarding all flags but `g` | honors the regex's own flags                                        |
| `substring(s, 5, 2)`       | `''`                                                | `'cde'` — a backwards range is swapped                              |
| `endsWith(s, '')`          | `false`                                             | `true`, for every input                                             |
| `charAt(s, NaN)`           | `''`                                                | element 0                                                           |
| `at(s, -0.5)`              | last grapheme                                       | element 0                                                           |
| `at(s, stringLength(s))`   | `''`                                                | `undefined`                                                         |
| `startsWith('a', 'a', -1)` | `false`                                             | `true`                                                              |
| `indexOf('abc', '', -1)`   | `-1`                                                | `0`                                                                 |

**Scrutinize the `split` limit change.** It is the only one that loses text silently:
`split('Look𐐷At🦄This𐐷Thing', '𐐷', 2)` was `['Look', 'At🦄This𐐷Thing']` and is now
`['Look', 'At🦄This']`.

### 4. Two deliberate divergences from native

- `padStart`/`padEnd` throw `RangeError` above 2²⁰ graphemes. Native only gives up at V8's string
  limit, which is unreachable here — padding builds an array element per grapheme, so the heap goes
  first.
- `split(s, regex)` yields `''` where native yields `undefined` for a capture group that did not
  participate, so the declared `string[]` is honest. Use `GraphemeString.split`, which declares
  `(GraphemeString | undefined)[]`, if you need to tell the two apart.

## Scripture Location Types Overview

There are many types exported from this package that describe specific positions in a Scripture project.

The types generally follow this name format:

```
<scripture_format><location_format?><location_anchor?>Location
```

- `<scripture_format>` - Which Scripture format the location information is specified against. For example, if the Scripture format is `Usfm`, offsets from the anchor to the specified position are string character index offsets within the USFM representation of the Scripture data.
- `<location_format?>` - Particulars about the way the anchor is specified. If this is not included, this type is likely a catch-all containing a union of multiple subtypes that all include the same information in different location formats.
- `<location_anchor?>` - `Book`, `Chapter`, `Verse`, or `Document` - Which kind of more general, well-known position this location is relative to. The more general location "anchor" may be an absolute position: the start of a specified chapter, book, verse; the data in this location type is expected to specify which chapter, book, or verse the location data is relative to. The anchor may also be a specific USJ document, in which case the location type is not expected to specify which document it is relative to. Document-relative positions are only interpretable if you have the document the position is based on; other location types layer over the document-relative types to indicate which document (and therefore which absolute position) the document-relative position is based on. If this is not specified, this type is a union of multiple subtypes that all specify positions in the same Scripture format.

Examples:

- `UsfmVerseLocation` - Locations relative to the start of a specified verse and at an offset in the USFM representation of the Scripture data

  - `<scripture_format>` - `Usfm` - the information specifying the position relative to the anchor is an offset based on the USFM representation of the Scripture data
  - `<location_format>` - None; this is a union type of multiple subtypes that all specify the same data.
  - `<location_anchor>` - `Verse` - this location specifies a specific verse that its position is relative to

- `UsfmVerseRefVerseLocation` - Location relative to the start of a specified verse and at an offset in the USFM representation of the Scripture data. This is a particular format of `UsfmVerseLocation`

  - `<scripture_format>` - `Usfm` - the information specifying the position relative to the anchor is an offset based on the USFM representation of the Scripture data
  - `<location_format>` - `VerseRef` - the anchor is specified in a `verseRef` field that contains all the information needed to clarify where in a project the offset is relative to (book, chapter, verse, and optionally versification)
  - `<location_anchor>` - `Verse` - this location specifies a specific verse that its position is relative to

- `UsjLocation` - Location whose JSONPath is specified on a USJ document which contains either the entire book or the entire chapter specified and whose offset information is in the USJ representation of the Scripture data

  - `<scripture_format>` - `Usj` - the information specifying the position relative to the anchor is an offset based on the USJ representation of the Scripture data
  - `<location_format>` - None; this is a union type of multiple subtypes whose subtypes all specify the same data as one another.
  - `<location_anchor>` - None; this is a union type of multiple subtypes that all specify either a USJ book or chapter location

- Document-relative locations - various location types that specify a location within some USJ document which is not determinable based on the information in these types
  - `UsjDocumentLocation` - A JSONPath query to an object, string, or property within a USJ document and additional information that point to a specific location in that USJ document.
    - Note: The subtypes of this type do not conform to the naming format specified above. They are all different forms of USJ document-relative locations.
    - JSONPath types - subsets of [JSONPath](https://www.rfc-editor.org/rfc/rfc9535.html) that point to some object, string, or property in a USJ document
      - `ContentJsonPath` - JSON path to an object or text content string in a USJ document.
      - `PropertyJsonPath` - JSON path to a property on an object in a USJ document.
    - Types of USJ document locations - each type is a different format specifying various kinds of locations in a USJ document.
      - `UsjAttributeKeyLocation`
      - `UsjAttributeMarkerLocation`
      - `UsjClosingAttributeMarkerLocation`
      - `UsjClosingMarkerLocation`
      - `UsjMarkerLocation`
      - `UsjTextContentLocation`
  - `UsjNodeAndDocumentLocation` - An object or string in a USJ document and its location in that document.
- Absolute locations - various location types that specify a location within a determinable document or relative to a specific point in the Scripture data.

  - `UsfmVerseLocation` - A verse ref and an offset within that verse in USFM space that point to a specific location in USFM.
    - `UsfmVerseRefVerseLocation` - A particular format for specifying a verse ref and an offset within that verse in USFM space that point to a specific location in USFM.
    - `SerializedVerseRef` - Just a verse reference. The offset is implied to be 0, meaning this always points to the very beginning of a verse.
  - `UsjLocation` - A verse ref and a location in USJ space that point to a specific location in USJ. The location in USJ space should be interpreted as starting from either the start of the book or the chapter depending on the type of location used.

    - `UsjBookLocation` - A verse ref and a location in USJ space that point to a specific location in USJ. The location in USJ space should be interpreted as starting from the start of the book specified.
      - `UsjFlatBookLocation`
      - `UsjVerseRefBookLocation`
    - `UsjChapterLocation` - A verse ref and a location in USJ space that point to a specific location in USJ. The location in USJ space should be interpreted as starting from the start of the chapter specified.
      - `UsjFlatChapterLocation`
      - `UsjVerseRefChapterLocation`

## Development

When we publish this npm package, then in the root `package.json`, a version can be given to `platform-bible-utils` instead of the existing file link. At that time we will likely need to use `npm link` and `npm unlink` to develop the components ([see here](https://github.com/jasonsturges/vite-typescript-npm-package#development)).

TODO:

- [ ] Decide if this package will be public, if not it will probably need an NPM organization setup to publish it to privately.
- [ ] What NPM user login will we use to publish it (each developer or an app-wide user)?

### Building

#### Setting up

To set up the dev environment to build, you must run the following from `paranext-core`:

```bash
npm i
```

#### Building `platform-bible-utils`

Once you have set up your environment, you can run the build command in this folder to build `platform-bible-utils`:

```bash
npm run build
```

Or you can build from `paranext-core`:

```bash
npm run build:platform-bible-utils
```

If you want a quick build that doesn't lint, run the following:

```bash
npm run build:basic
```

Do not commit changes after running this basic build. Before committing, always run a full build.

## Acknowledgements

Inspired by https://github.com/jasonsturges/vite-typescript-npm-package
