# Marble Schema Extractor

A small .NET 8 console tool that opens password-protected Paratext Enhanced
Resources `.mbl`-family files and emits per-field presence statistics or
representative samples for schema audit purposes.

## Why

PT10's Enhanced Resources backend deserializes shipped Marble dictionaries,
encyclopedias, semantic-domain trees, and image indexes. The shape of those
files is encoded in PT9 source as XML-serialization classes, but verifying
which fields are _actually populated_ in shipped data requires opening the
encrypted ZIP archives. This tool does that.

## Prerequisites

1. .NET 8 SDK (`dotnet --version` should report 8.x)
2. A valid Paratext registration on this machine (the tool calls
   `RegistrationInfo.DefaultUser.IsValid` via `ParatextData`)
3. .NET User Secrets configured for the data provider project, containing
   `DblResourceBase64-DO-NOT-SHARE` and `DblResourceHash-DO-NOT-SHARE`
   (already required to run paranext-core normally)

## Usage

```bash
cd tools/marble-schema-extractor

# List ZIP members in a resource
dotnet run -- --list "$HOME/.platform.bible/projects/Paratext 9 Projects/_Resources/DCLEX.mdv1z"

# Emit field-presence statistics as JSON to stdout
dotnet run -- --stats "$HOME/.platform.bible/projects/Paratext 9 Projects/_Resources/DCLEX.mdv1z" --type lexicon \
  > ../../.context/features/enhanced-resources/data-schemas/extraction-stats/DCLEX-stats.json

# Emit representative samples
dotnet run -- --samples "$HOME/.platform.bible/projects/Paratext 9 Projects/_Resources/DCLEX.mdv1z" --type lexicon --count 3 \
  > ../../.context/features/enhanced-resources/data-schemas/extraction-stats/samples-lexicon-DCLEX.json
```

## Password handling

The tool reads the User Secrets configured for `Paranext.DataProvider`, decrypts
the password in memory, passes it to SharpZipLib's `ZipFile.Password`, and
discards. The password is **never** logged, written to disk, or echoed.

## Types supported

`--type lexicon` — DCLEX, SDBG, SDBH (`.mdv1z`); LN, SDBH (`.p8z`)
`--type encyclopedia` — MBL_ENC (`.mev1z`); FAUNA, FLORA, REALIA (`.p8z`)
`--type domains` — Semantic domain XML (Greek/Hebrew, embedded in lexicon resources)
`--type images` — IMG_INDX (`.mxv1z`); image media metadata (`.miv1z`/`.miv2z`)
`--type bible` — Marble Bible (`.mbv1z`/`.mbv2z`)
`--type source` — Marble Source (`.msv1z`)
