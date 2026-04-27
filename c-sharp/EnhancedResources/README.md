# Enhanced Resources - Developer Guide

This directory implements the Enhanced Resources (Marble) backend for
Platform.Bible. It loads marble package files (`.mbv*z`, `.mdv1z`, `.mev1z`,
`.miv*z`, `.mxv1z`, `.msv1z`) from disk, extracts typed data records, and
exposes 14 PAPI commands on a single NetworkObject named
`platform.enhancedResources`.

This file is the developer entry point. It captures the pieces that aren't
obvious from reading a single source file - the pipeline shape, the
`IMarblePackage` seam, how to run marble data locally, and the secrets
posture.

See also:

- Spec: [2026-04-24-marble-data-port-design.md](../../.context/features/enhanced-resources/working-docs/2026-04-24-marble-data-port-design.md)
- Data contracts: [data-contracts.md](../../.context/features/enhanced-resources/data-contracts.md)

---

## Loader pipeline

```
ScrTextCollection.ResourcesDirectory + {SettingsDirectory}/_resourcesById/
(files: *.mbv2z *.mbv1z *.mdv1z *.mev1z *.miv1z *.miv2z *.mxv1z *.msv1z)
                  |
                  v
        MarbleDataLoader.LoadAsync
                  |
                  +--> MarblePackageDiscoverer        --> (BiblePackages, ResearchPackages)
                  +--> MarbleLexiconLoader            --> LexiconLoadResult            [SDBG/SDBH/DCLEX]
                  |                                       (DictionaryData + GlossData
                  |                                        + SourceLanguageData via <LEXReferences>)
                  +--> MarbleEncyclopediaLoader       --> EncyclopediaData             [MBL_ENC]
                  +--> MarbleImageIndexLoader         --> MediaData                    [IMG_INDX]
                  +--> MarbleLanguageMapBuilder       --> LanguageMapping
                  v
            MarbleData record
                  v
      EnhancedResourceFactory.CompleteLoadAsync
                  |
                  v
        MarbleDataAccessService, DictionaryService, EncyclopediaService,
        MediaService, SourceLanguageSearchService, TooltipService
                  v
        14 PAPI command handlers on platform.enhancedResources NetworkObject
```

The composition root is `EnhancedResourceFactory`. Only it knows how all the
pieces fit together; no other class wires services. Every loader is stateless
and XML-direct (XDocument / XPath over text from `IMarblePackage.ReadAllText`)
- no `XmlSerializer`, no PT9 type hierarchy.

The factory's `InitializeAsync` returns as soon as the NetworkObject is
registered; loading happens on a fire-and-forget `Task.Run(CompleteLoadAsync)`.
Until that task finishes successfully, every data-returning command throws
`FAILED_PRECONDITION`. Publication safety: the last field the load task writes
is `_marbleDataAccess` via `Volatile.Write`, so readers that observe it
non-null also observe the other service fields.

See spec Section 7 for the exact service signatures and Section 11 for the
publication-safety model.

## `IMarblePackage` abstraction

Loaders consume `IMarblePackage`, not `ResourceScrText` directly. The
production implementation (`MarblePackage`) wraps a `ResourceScrText`; tests
implement the interface in-memory with hand-authored XML strings
(`FakeMarblePackage` in `c-sharp-tests/EnhancedResources/Fixtures/`).

The interface surface is intentionally small (~6 members):

```csharp
string ShortName { get; }
bool   IsResearchData { get; }
bool   Exists(string internalPath);
string ReadAllText(string internalPath);
IEnumerable<string> EnumerateFiles(string searchPattern);
string? ResolveAccessiblePath(string internalPath);  // for image-byte extraction
```

If this surface balloons past ~15 members, the abstraction is leaking too
much - revisit its shape (spec Section 17, open question 2).

## Running the smoke check

`scripts/enhanced-resources-smoke.ts` exercises all 14 ER PAPI commands +
`fetchImageBytes` against a running data provider. Run it whenever you need
a quick end-to-end sanity check - until UI end-to-end tests replace it.

```bash
# Terminal 1: start the data provider.
./.erb/scripts/refresh.sh

# Wait for: "Enhanced Resources: ready - N bible packages, M gloss languages"

# Terminal 2: run the smoke check.
npm run er:smoke
```

The script exits:

- `0` if every command returned a non-empty, non-error result.
- `1` if at least one command failed or returned empty.
- `2` if it couldn't connect to the PAPI WebSocket (port 8876).

The script asserts only shape (non-empty lists, non-null results) - specific
resource names and counts depend on which marble packages the developer has
installed, so hard-coded expectations would fail on clean boxes.

Override the default resource via `ER_SMOKE_RESOURCE=MyResource npm run er:smoke`
if the script's default (`TECLOT`) isn't among your installed packages.

The smoke check intentionally validates `fetchImageBytes` over JSON-RPC
directly rather than fetching `papi-er://images/{imageId}` through the
Electron protocol handler. Electron custom protocols are only reachable from
inside an Electron renderer; the JSON-RPC path exercises the same C# image-
extraction code, so it covers the bug-prone backend without requiring a GUI
session. A full Playwright round-trip is a follow-up once the UI lands.

## Local setup: dotnet user-secrets

Marble resource zips are encrypted with the same password used by DBL
resources. Platform.Bible's `DblResourcePasswordProvider` reads the
password from .NET user-secrets - nothing is hardcoded.

**One-time setup:**

```bash
cd c-sharp
dotnet user-secrets init  # if not already done
dotnet user-secrets set "DblResourceBase64-DO-NOT-SHARE" "<your-base64-here>"
dotnet user-secrets set "DblResourceHash-DO-NOT-SHARE"   "<your-hash-here>"
```

The two values are distributed out-of-band to authorized developers. Ask a
code steward for the current pair; do NOT paste them into code, commits,
Slack, or PR descriptions.

If either secret is missing, `DblResourcePasswordProvider.IsPasswordAvailable()`
returns false and the loader treats the marble directory as empty -
`HaveMarbleData` stays false, every PAPI command returns
`FAILED_PRECONDITION`. Same outcome as "no marble packages installed."

## Installing marble packages locally

1. Identify `ScrTextCollection.ResourcesDirectory` on your platform:
   - Windows: `%LOCALAPPDATA%\Paratext95\resources\`
   - macOS: `~/Library/Application Support/Paratext95/resources/`
   - Linux: `~/.local/share/Paratext95/resources/`
2. Drop marble packages (file extensions above) into that directory. The
   loader scans both `ResourcesDirectory` and
   `{SettingsDirectory}/_resourcesById/`.
3. Restart the data provider. Look for
   `Enhanced Resources: ready - N bible packages, M gloss languages` in
   stdout. If you see
   `Enhanced Resources: ready=false - missing required packages: ...`,
   that's PT9's required-set check (MBL_ENC, IMG_INDX, IMG_THMB, SDBG,
   SDBH, GNT, BHS) reporting which ones you're missing.

## V1/V2 handling

PT9's V1/V2 coexistence rules are ported verbatim. Summary:

| Kind            | V1 ext   | V2 ext                      | Rule                                                                            |
| --------------- | -------- | --------------------------- | ------------------------------------------------------------------------------- |
| Bible           | `.mbv1z` | `.mbv2z`                    | V2 preferred; V1 loaded only when no matching V2                                |
| Image package   | `.miv1z` | `.miv2z`                    | V2 preferred; V1 deleted when V2 exists                                         |
| Image index     | `.mxv1z` | (internal `IMAGES_V2.XML`)  | Single extension; loader picks `IMAGES_V2.XML` over `IMAGES.XML` when both present |
| Dictionary      | `.mdv1z` | (none)                      | V1 only                                                                         |
| Source language | `.msv1z` | (none)                      | V1 only                                                                         |
| Encyclopedia    | `.mev1z` | (none)                      | V1 only                                                                         |

`MarblePackageDiscoverer` deletes V1 bible/image files that have a V2
companion (`File.Delete`). This is the only filesystem mutation in the
pipeline. Disable it for tests or smoke runs by constructing the discoverer
with `skipV1Deletion: true`. See spec Section 12.

## Error domains

Three categories, all non-fatal:

1. **Per-file discovery failure** (corrupt zip, password failure): logged,
   file skipped, discovery continues.
2. **Required-project missing**: `HaveMarbleData = false`; commands return
   `FAILED_PRECONDITION`.
3. **Catastrophic loader failure** (unhandled exception): caught at the
   load task boundary, full stack logged, services stay null. Data provider
   keeps running - other features work normally.

Every ER log line is prefixed `Enhanced Resources:` for grep-ability.

## Testing

C# tests live in `c-sharp-tests/EnhancedResources/`:

- Loader tests use hand-authored XML via `FakeMarblePackage`.
- Service tests construct records via domain fixtures
  (`DictionaryFixtures.Build*Data()`) and instantiate the service directly -
  no static `*Override` state, no `[SetUp]/[TearDown]` fixture dance.
- Factory tests use `StubMarbleDataLoader` and await
  `factory.LoadCompleted`.
- `MarbleDataBuilder` composes end-to-end `MarbleData` records for
  cross-service integration tests.

Run the subset:

```bash
cd c-sharp-tests
dotnet test --filter FullyQualifiedName~EnhancedResources
```

No real marble zip files are checked into the repo. Real-package behavior
is validated by the smoke check in `scripts/enhanced-resources-smoke.ts`.

## Not supported (deliberate non-goals)

- Install / update / delete of marble packages (`MarbleManifest`,
  `UpdateResource`, `RemoveResource`).
- Videos / UBS video language handling.
- Biblical Terms integration and the ~600K reference-to-meanings cache.
- Runtime reload after package install (requires restart).
- Server-side thumbnail synthesis (PT9's `ImageUtils.MakeThumbnail`).

See spec Section 1 and Section 17 for the full list.
