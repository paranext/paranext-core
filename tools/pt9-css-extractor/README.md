# pt9-css-extractor

A tiny Windows-only CLI that loads a Paratext 9 project or resource and writes
the CSS that PT9 would generate for it via
`Paratext.InternalShared.ScriptureEditor.CSSCreator.CreateDefaultCSS`. This is
the same routine PT9 uses to render the scripture editor, so the output is the
canonical PT9 styling for the project.

The CLI calls `CreateDefaultCSS(scrText, zoom: 1.0, fontFamilies: [], includeFontFaces: false)`.
That matches what PT9 itself passes from `LegacyPluginManager` and `MarbleForm` —
`zoom: 1` produces real `pt`/`vw` values, not 100×-inflated ones. Before opening the
project we also initialise `Theme.Current` from the embedded `Default` theme in
`ParatextData.dll`, otherwise PT9's `\ColorName` directives silently zero out every
marker colour (the `\Color <int>` value PT9 emits a line earlier gets overwritten
by `GetThemeColor()` returning 0 when no theme is configured).

We use it once per resource to capture a frozen CSS snapshot that the
[`pt9-css-to-editor-scss`](../../../scripture-editors) converter then turns
into the editor's view-mode-bucketed SCSS shape.

## Requirements

- **Windows.** Paratext 9 is Windows-only, so this tool is too.
- **.NET 8 SDK** (the SDK can build the `net48` target on Windows).
- **.NET Framework 4.8 Developer Pack.**
- **Paratext 9** installed. Default install path: `C:\Program Files\Paratext 9`.
- A Paratext projects directory containing the project or resource you want
  to extract. Resources (`HBKENG.p8z`, `TNN.p8z`, `TND.p8z`, …) live in the
  `_Resources` subdirectory. Default projects path:
  `C:\My Paratext 9 Projects`.

The tool references three DLLs from the Paratext 9 install at build time
(`ParatextData.dll`, `ParatextInternalShared.dll`, `PtxUtils.dll`) and pulls
in the rest of Paratext's transitive DLLs from the same directory via an
`AssemblyResolve` handler at runtime.

If your Paratext install or projects directory differs from the defaults,
override via:

- MSBuild property: `dotnet build /p:ParatextInstallDir="D:\Paratext 9"`
- Environment variables: `PARATEXT_INSTALL_DIR`, `PARATEXT_PROJECTS_DIR`
- CLI flags: `--paratext-install-dir`, `--projects-dir`

## Build

From this directory:

```powershell
dotnet build
```

## Run

```powershell
# Extract HBKENG to data/pt9-css/hbkeng.css (relative to this directory):
dotnet run -- --project HBKENG --out ..\..\data\pt9-css\hbkeng.css

# Other handbook resources used by the editor:
dotnet run -- --project TNN --out ..\..\data\pt9-css\tnn.css
dotnet run -- --project TND --out ..\..\data\pt9-css\tnd.css

# Custom install / projects locations:
dotnet run -- `
  --project HBKENG `
  --out ..\..\data\pt9-css\hbkeng.css `
  --paratext-install-dir "D:\Paratext 9" `
  --projects-dir "D:\My Paratext 9 Projects"
```

## Verifying the output

The first time we extract for a project we also capture a reference snapshot
from PT9 itself and commit it as `<name>-manual.css` alongside the generated
`<name>.css`. How to grab it: open the project in PT9, open the embedded
webview's dev tools (right-click in the scripture pane → Inspect), and copy
the contents of the `<style>` block from `<head>` into the file. That live
stylesheet is a superset of what `CSSCreator.CreateDefaultCSS` produces — PT9
appends ~37 editor-overlay rules (`marker`, `annot_*`, `caller_*`, etc.) and
includes a `@font-face` block — so the right comparison is "every `.usfm_*`
selector emitted by the CLI also appears in the manual file with an identical
body." A successful HBKENG run produced 398 identical `.usfm_*` selectors,
0 missing, 0 extras, 0 differing bodies.

If the diff is non-trivial (different bodies on shared `.usfm_*` selectors,
or selectors the CLI emits that PT9 doesn't), the CLI is wrong — fix it
before extracting any more projects.
