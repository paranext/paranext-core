# Platform.Bible Utils

A set of utility functions, types, and classes for use inside Platform.Bible and extensions.

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
