# Paratext 9 — Repository Navigation Primer

Orientation for reading the PT9 source (`~/git/Paratext`). For detailed architecture,
code patterns, and gotchas, **always consult the repo's own `AGENTS.md` files first** —
this primer is only for orientation, search exclusions, and reuse triage.

## Consult AGENTS.md first

- Root `AGENTS.md` — build commands, solution files, architecture, key components, test
  projects, code style. (`CLAUDE.md` just points to `AGENTS.md`.)
- Per-directory `AGENTS.md` carry the depth: `ParatextData/` (core abstractions, USFM
  parsing, write-lock system, patterns, gotchas), `ParatextBase/` (window system, edit
  handlers, plugin system, themes, MegaMenu), `ParatextChecks/` (checking engine),
  `Paratext/` (main app), `PtxUtils/` (utilities), `BiblicalTerms/`, `FormattedEditor/`,
  `HtmlEditor/`, `HelpSystem/`.
- **Division of labor:** use *this* file for search exclusions / reuse triage / high-level
  orientation; use `AGENTS.md` files for architecture / code patterns / gotchas.

## Search exclusions (cut the noise)

Exclude `**/.git/**`, `/DataAccessServer/`, `/DataAccessServer.Tests/`, `/PA/` (none are
relevant to PT10 work).

Ripgrep form (`--glob '!…'`):

    rg "SearchTerm" ~/git/Paratext -t cs \
      --glob '!**/.git/**' --glob '!**/DataAccessServer/**' \
      --glob '!**/DataAccessServer.Tests/**' --glob '!**/PA/**'

grep form — `grep` has no `--glob`; use `--exclude-dir` (add these flags to any `grep -r`):

    grep -rn "SearchTerm" ~/git/Paratext --include='*.cs' \
      --exclude-dir=DataAccessServer --exclude-dir=DataAccessServer.Tests --exclude-dir=PA

## Layer reuse triage (portable backend vs rewrite-UI)

- **Portable C# backend (reusable):** `ParatextData/` (.NET Standard 2.0, cross-platform),
  `ParatextChecks/` (portable business logic), `PtxUtils/` (utilities), the Repository layer
  (Mercurial/Chorus integration).
- **Windows-only, rewritten in PT10's web frontend:** all WinForms UI (`Paratext/`,
  `ParatextBase/`, editors), the MAF Plugin Framework, WCF services.
- The load-bearing split when reading a feature: logic in **ParatextData** = the backend the
  feature talks to (potentially reusable); logic in **Paratext** = UI (rewritten).

## Running PT9 APIs programmatically under .NET 8

When static reading of the PT9 source leaves a behavior ambiguous, you can characterize it
*dynamically* by calling PT9's DLLs directly from a small .NET 8 console program. PT9 ships
.NET Framework assemblies, so they are not on their native runtime — they compile and load,
but several APIs fail at runtime unless you work around the issues below.

Run on Windows (the .NET SDK invoked from WSL2 via `powershell.exe`) so WinForms-dependent
PT9 types (`MarbleForm`, the various `*Form` classes, etc.) load. Reference PT9's installed
DLLs from `C:\Program Files\Paratext 9\`; read projects from `C:\My Paratext 9 Projects\`.

### ICU native-library fix (the big one)

PT9's `icu.net.dll` targets .NET Framework, and its native-library resolution does not work
under .NET 8 — `ScrText.GetText()` and other USFM-reading APIs throw
`TypeInitializationException` in `Icu.NativeMethods`. To make USFM parsing work:

1. Reference the **NuGet `icu.net` 3.0.1** package — it has a `net8.0` target with proper
   `NativeLibrary` resolution, unlike PT9's .NET Framework copy.
2. **Pre-load the native DLLs** before any ICU code runs: `NativeLibrary.TryLoad()` for
   `icuuc59.dll`, `icuin59.dll`, `icudt59.dll` from PT9's `lib\win-x64\`.
3. Call **`Icu.Wrapper.Init()`** explicitly before SLDR / ParatextData initialization.
4. **Pin `Newtonsoft.Json` 13.0.3** — the NuGet `icu.net` transitively pulls an older
   Newtonsoft.Json that breaks PT9's `ScrTextCollection`.
5. Add the **`UnicodeHelper` dependencies** (`Microsoft.Bcl.AsyncInterfaces`, `CsvHelper`)
   referenced from PT9, needed for `UnicodeHelper.UnicodeProperties`.

With the fix in place, `ScrText.GetText()` and USFM-reading APIs work correctly.

### Disk-read workaround (when you don't need USFM parsing)

If you only need raw file content, skip the parsing overhead and read from disk:

```csharp
// Read raw book text from disk
string bookFileName = scrText.Settings.BookFileName(bookNum);
string text = File.ReadAllText(Path.Combine(scrText.Directory, bookFileName));

// Check book presence via filesystem
bool present = File.Exists(Path.Combine(scrText.Directory,
    scrText.Settings.BookFileName(bookNum)));
```

### `BooksPresent` bitmap format

The `<BooksPresent>` element in `Settings.xml` is a bitmap string: position `N-1` is `'1'`
when book number `N` is present. E.g. `"110000…0"` means GEN (1) and EXO (2) are present.

### Other runtime gotchas

- **`JsonSerializer` needs an explicit `TypeInfoResolver`** under .NET 8 — anonymous-type
  serialization fails without one.
- When a PT9 API *writes* output to a file but `GetText()` fails, trigger the action and read
  the result back from disk rather than reading the return value.
- For private/protected WinForms methods whose business logic is simple (filtering,
  conditions, formatting), replicate the logic directly instead of reflecting into it.
- When encoding/conversion APIs fail at runtime, extract known input/output pairs from PT9's
  own test assertions to characterize the expected behavior.
