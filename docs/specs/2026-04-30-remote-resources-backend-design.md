# Remote Resources Backend Design

**Date:** 2026-04-30
**Scope:** C# backend only — no TypeScript UI or extension wiring

## Problem

Platform.Bible's `DblResourcesDataProvider` only supports downloading DBL Scripture resources
(`ResourceType.DBL`). The `ResourceType` enum in `ParatextData` has three additional values —
`EnhancedResource`, `XmlResource`, and `SourceLanguageResource` — and the
`platform-get-resources` extension already renders filter tabs for all three types. No backend
exists to fetch, install, or uninstall them.

All three non-DBL types are hosted on `https://media.paratext.org/` and discovered via XML
manifest files. The download and install logic lives in the main Paratext application
(`Paratext.Marble.InstallableRemoteResource`), not in the `ParatextData` NuGet package, so it
must be ported into paranext-core's C# layer.

## Non-goals

- UI / WebView changes
- TypeScript extension changes to call the new PAPI functions
- Rendering EnhancedResource (MARBLE) content inside Platform.Bible

## Server and credentials

All three resource types are served from `https://media.paratext.org/` using HTTP Basic
authentication with a shared service-account credential. These credentials must be stored in .NET
user secrets (the same mechanism used by `DblResourcePasswordProvider`) under keys:

- `RemoteResourceUsername-DO-NOT-SHARE`
- `RemoteResourcePassword-DO-NOT-SHARE`

## Manifest files

Each resource type has a versioned XML manifest file on the server listing all available resources:

| Type                     | Manifest filename               |
| ------------------------ | ------------------------------- |
| `EnhancedResource`       | `MarbleManifest_v3.xml`         |
| `XmlResource`            | `XmlManifest_9-2.xml`           |
| `SourceLanguageResource` | `SourceLanguageManifest_v1.xml` |

Manifests are fetched on demand and cached locally for 24 hours (same policy Paratext uses).
No version is specified by the caller — the user always receives whatever the current manifest
lists, which represents the latest version supported by the manifest format.

### Manifest entry structure

Each manifest XML deserializes to a list of `ManifestEntry` objects:

```
Name            short identifier, e.g. "LSJ"
FullName        human-readable name, e.g. "Liddell-Scott-Jones Greek Lexicon"
Version         version string, e.g. "1.0.0"
Size            file size in bytes
LanguageId      Ethnologue language code
ResearchData    bool (MARBLE only — true for research/data projects)
Required        bool — whether this resource is required by another
InstallAsDictionary  bool — install to _Dictionaries instead of _Resources
```

## New files

All new files live under `c-sharp/Projects/RemoteResources/`.

### `RemoteResourcePasswordProvider.cs`

Reads username and password from .NET user secrets. Provides an `IsPasswordAvailable()` static
check and a `GetClient()` method that returns a configured `RESTClient` pointed at
`https://media.paratext.org/`. Follows the same structure as `DblResourcePasswordProvider`.

### `ManifestEntry.cs`

A serializable data class whose fields match the manifest XML element names. Used by
`PlatformResourceManifest` when deserializing server responses via `Memento.GetXml<T>`.

### `PlatformResourceManifest.cs`

Wraps manifest fetching and caching for all three resource types. Contains three public static
methods:

```
GetMarbleManifest()          → List<ManifestEntry>
GetXmlManifest()             → List<ManifestEntry>
GetSourceLanguageManifest()  → List<ManifestEntry>
```

Each method:

1. Checks a local cache file in the temp directory; returns cached data if written within 24 hours.
2. Otherwise fetches the manifest XML via `RemoteResourcePasswordProvider.GetClient()`, writes it
   to the cache file, then returns the deserialized entries.
3. Returns an empty list (with a warning logged) if the server is unreachable or the response is
   malformed.

### `PlatformInstallableRemoteResource.cs`

Subclasses `Paratext.Data.Archiving.InstallableResource`. Holds the `ManifestEntry` data and
overrides `Install()` with type-specific logic:

**XmlResource**

1. Download `{Name}.xml1z` from `https://media.paratext.org/` to a temp file.
2. Set `sourceDirectory` to the temp directory.
3. Call `InternalInstall(".xml1z")` (inherited from `InstallableResource`).
4. Delete the temp file.

**SourceLanguageResource**

1. Determine the server subfolder: `SourceLanguageResources/_Dictionaries/` if
   `InstallAsDictionary`, else `SourceLanguageResources/_Resources/`.
2. Download `{serverSubfolder}/{Name}.p8z` to a temp file.
3. Set `sourceDirectory` to the temp directory.
4. Call `InternalInstall(".p8z")`.
5. Delete the temp file.

**EnhancedResource (MARBLE)**

1. Download `{Name}.mbv2z` from the server root to a temp file.
2. Copy the temp file to `ScrTextCollection.ResourcesDirectory/{Name}.mbv2z`.
3. Delete the temp file.
4. No `InternalInstall` call — MARBLE files are not zip-encrypted resources in the `.ptresource`
   format that `InternalInstall` expects.

`ExistingScrText` is not used for MARBLE. Because `ResourceScrText` cannot open `.mbv2z` files,
the `Installed` and `UpdateAvailable` flags for MARBLE are computed directly in
`RemoteResourcesDataProvider`: `Installed` = file `{Name}.mbv2z` exists in
`ScrTextCollection.ResourcesDirectory`; `UpdateAvailable` = manifest `Version` is greater than
the version stored in a sidecar metadata file written at install time (see below).

At install time, after copying the `.mbv2z`, write a small JSON sidecar
`{Name}.mbv2z.version` containing the manifest `Version` string. This is read back for the
update check. If the sidecar is absent, treat the resource as needing an update.

For `XmlResource` and `SourceLanguageResource`, the base-class `IsNewerThanCurrentlyInstalled()`
handles the update check via `ResourceVersion` and `existingScrText.Settings.Version`.

### `RemoteResourcesDataProvider.cs`

A `NetworkObjects.DataProvider` registered as
`"platformGetResources.remoteResourcesProvider"`. Mirrors the structure of
`DblResourcesDataProvider`.

**Data type:** `RemoteResources` → `List<RemoteResourceData>`

`RemoteResourceData` is a private record with fields:

- `Name` (string identifier)
- `DisplayName`, `FullName`, `BestLanguageName`
- `Type` (string — `"EnhancedResource"`, `"XmlResource"`, or `"SourceLanguageResource"`)
- `Size` (long)
- `Installed` (bool)
- `UpdateAvailable` (bool)
- `ProjectId` (string GUID of the installed `ScrText`, empty if not installed)

**Functions:**

`getRemoteResources` — requires valid user registration (throws with a detectable message if not).
Fetches all three manifests, builds `PlatformInstallableRemoteResource` objects, and returns the
combined list with installed/update status.

`installRemoteResource(name, type)` — finds the resource by name+type in the cached manifest
list, calls `PlatformInstallableRemoteResource.Install()`, calls
`ScrTextCollection.RefreshScrTexts()`, verifies the resource is now present, throws a localized
error if not.

`uninstallRemoteResource(name, type)` — for XmlResource and SourceLanguageResource, calls
`ScrTextCollection.DeleteProject()`. For EnhancedResource, deletes the `.mbv2z` file directly
from `ScrTextCollection.ResourcesDirectory`, then calls `ScrTextCollection.RefreshScrTexts()`.

`isGetRemoteResourcesAvailable` — returns true if credentials are configured
(`RemoteResourcePasswordProvider.IsPasswordAvailable()`).

## Modified files

### `c-sharp/ParatextUtils/PlatformScrTextCollection.cs`

No changes needed for this task. `MarbleResourceLookup` can remain returning `null` because the
data provider computes MARBLE installed/update status directly rather than through `ExistingScrText`.

### `c-sharp/Program.cs`

Instantiate and register `RemoteResourcesDataProvider` alongside `DblResourcesDataProvider`.

## Error handling

Follows the `DblResourcesDataProvider` pattern throughout:

- Network failures during manifest fetch → log warning, return empty list
- Network failures during install → exception propagates to PAPI caller
- Invalid user registration → throw with the message string
  `"User registration is not valid. Cannot retrieve resources from server."` (same searchable
  pattern as the DBL equivalent so Node.js services can detect it)
- Resource not found in manifest list → throw localized error
- Resource already up to date → throw localized error
- Resource still present after uninstall → throw localized error

## Testing

Manual test: configure credentials in user secrets, run paranext-core, call
`installRemoteResource("LSJ", "XmlResource")` via the PAPI, verify `LSJ.xml1z` appears in
`~/.platform.bible/projects/Paratext 9 Projects/_Resources/`.

Unit tests for `PlatformResourceManifest` are not viable since they hit a live server. The
`PlatformInstallableRemoteResource` install paths can be unit-tested by injecting a mock
`RESTClient` (following the `DblParatextApi` test pattern).

## File structure summary

```
c-sharp/
  Projects/
    RemoteResources/
      ManifestEntry.cs
      PlatformInstallableRemoteResource.cs
      PlatformResourceManifest.cs
      RemoteResourcePasswordProvider.cs
      RemoteResourcesDataProvider.cs
  Program.cs                        (modified)
```
