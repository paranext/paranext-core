namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: Paratext/BackupRestore/RestoreFileInfo.cs (full class — namespace Paratext.BackupRestore)
// Maps to: data-contracts.md §9 file table line 2266 (consumed by EXT-201 SharedProjectFilterService);
//          backend-alignment.md §EXT-201 line 238-249 (Filter signature)
//
// PT10 deltas vs PT9:
//   * Namespace: PT9 = `Paratext.BackupRestore.RestoreFileInfo` (lives in Paratext.exe — the WinForms
//     project — NOT in ParatextData.dll). The PT10 dependency `ParatextData` NuGet package does NOT
//     export this type (verified: `strings ParatextData.dll | grep RestoreFileInfo` returns 0 hits).
//     PT10 therefore declares its own type under `Paranext.DataProvider.BackupRestore`.
//
//     `backend-alignment.md` line 716 and 794 lists `RestoreFileInfo` under
//     "From ParatextData.dll" — this attribution is incorrect, and is documented in this CAP's
//     test-writer plan (test-writer-CAP-018.md §Resolved Ambiguities §1).
//
//   * Minimum-surface port: PT9's class exposes
//       SourceFile, DestinationFile, RestoreThisFile, ToolTipInfo, IsNormallyRestored,
//       ComparisonResult, RestoreFile(), ToString(), CompareTo()
//     The EXT-201 (SharedProjectFilterService) contract reads ONLY `SourceFile.FileName`, so this
//     initial port ships ONLY `SourceFile`. Downstream CAPs (CAP-017 RestoreFilePlanService — which
//     consumes ComparisonResult + IsNormallyRestored; CAP-002 openRestoreSession — which consumes
//     DestinationFile) will extend this class as they need additional members.
//
//   * PT9 declared `SourceFile`/`DestinationFile` as public fields; PT10 uses an auto-property
//     to satisfy Roslyn analyzers and allow future-proofing (e.g., init-only setter, or replacing
//     with a getter that derives from a backing object).
/// <summary>
/// Information about a single file inside a Paratext backup ZIP, paired with its
/// corresponding file (if any) on the destination project. Minimum-surface PT10 port —
/// exposes only the members consumed by the EXT-201 shared-project filter (CAP-018).
/// Later capabilities (CAP-002 openRestoreSession, CAP-017 RestoreFilePlanService) will
/// extend this type with additional members.
/// </summary>
/// <remarks>
/// See the <c>// === PORTED FROM PT9 ===</c> block in the source file for the full list of
/// PT9 members this PT10 port currently OMITS. The PT9 type also implements
/// <c>IComparable&lt;RestoreFileInfo&gt;</c> for the "identical files sort last" rule
/// (INV-A10); that ordering is owned by CAP-017 and is not part of CAP-018's surface.
/// </remarks>
public sealed class RestoreFileInfo
{
    /// <summary>
    /// The ZIP entry inside the backup that this file would be restored FROM. PT9 parity:
    /// non-null in normal operation (the file plan is built by walking the ZIP central
    /// directory); typed as nullable here so test fixtures can construct partial instances
    /// when only specific filenames need to be exercised.
    /// </summary>
    public RestoreZipMember? SourceFile { get; set; }
}
