using Paratext.Data;

namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: Paratext/BackupRestore/RestoreFileInfo.cs (full class — namespace Paratext.BackupRestore)
// Maps to: data-contracts.md §9 file table line 2266 (consumed by EXT-201 SharedProjectFilterService);
//          backend-alignment.md §EXT-201 line 238-249 (Filter signature);
//          backend-alignment.md §EXT-200 line 217-233 (RestoreFilePlanService signature) — CAP-017 extension.
//
// PT10 deltas vs PT9:
//   * Namespace: PT9 = `Paratext.BackupRestore.RestoreFileInfo` (lives in Paratext.exe — the WinForms
//     project — NOT in ParatextData.dll). The PT10 dependency `ParatextData` NuGet package does NOT
//     export this type (verified: `strings ParatextData.dll | grep RestoreFileInfo` returns 0 hits).
//     PT10 therefore declares its own type under `Paranext.DataProvider.BackupRestore`.
//
//     `backend-alignment.md` line 716 and 794 lists `RestoreFileInfo` under
//     "From ParatextData.dll" — this attribution is incorrect, and is documented in the test-writer
//     plans for CAP-017 / CAP-018 (Resolved Ambiguities §1).
//
//   * Minimum-surface-plus-CAP-017 port: PT9's class exposes
//       SourceFile, DestinationFile, RestoreThisFile, ToolTipInfo, IsNormallyRestored,
//       ComparisonResult, RestoreFile(), ToString(), CompareTo()
//     CAP-018 (EXT-201) shipped ONLY `SourceFile`.
//     CAP-017 (EXT-200 RestoreFilePlanService) extends this type with
//       `DestinationFile`, `ComparisonResult`, `IsNormallyRestored`
//     so the service can build the per-row file plan + auto-tick + downgrade-confirm gate.
//     Downstream CAPs (CAP-002 openRestoreSession) may extend further.
//
//   * PT9 declared `SourceFile`/`DestinationFile` as public fields; PT10 uses auto-properties to
//     satisfy Roslyn analyzers.
//
//   * `ComparisonResult` + `IsNormallyRestored` are read-write here so test fixtures can construct
//     RestoreFileInfo instances with pre-set canonical values, decoupling `RestoreFilePlanService`
//     from spec-007's classifier (which is owned by a separate capability). The classifier itself
//     produces these values via the 9-state decision tree (spec-007 / INV-A08/A09/A10); the
//     service-under-test trusts the input values per REVIEW-FLAG-2 (extraction-plan.md §EXT-200).
/// <summary>
/// Information about a single file inside a Paratext backup ZIP, paired with its
/// corresponding file (if any) on the destination project. Minimum-surface PT10 port —
/// exposes only the members consumed by the EXT-201 shared-project filter (CAP-018) and
/// the EXT-200 RestoreFilePlanService (CAP-017).
/// Later capabilities (CAP-002 openRestoreSession) may extend this type further.
/// </summary>
/// <remarks>
/// See the <c>// === PORTED FROM PT9 ===</c> block in the source file for the full list of
/// PT9 members this PT10 port currently OMITS. The PT9 type also implements
/// <c>IComparable&lt;RestoreFileInfo&gt;</c> for the "identical files sort last" rule
/// (INV-A10); that ordering is owned by CAP-017 internally (via the input ordering to
/// <c>Build</c>) and is not yet ported as an explicit member here.
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

    /// <summary>
    /// The on-disk file inside the destination project that the source would overwrite, or
    /// <c>null</c> if no such file exists on disk. PT9 parity:
    /// <c>RestoreForm.ShowFileList</c> populates this from the destination ScrText; here it
    /// is a settable property so test fixtures can construct the various comparison-state
    /// scenarios (DestDoesNotExist when null; everything else when non-null).
    /// </summary>
    public RestoreZipMember? DestinationFile { get; set; }

    /// <summary>
    /// The 9-state comparison classification — one of <see cref="PtwFileComparisonStates"/>.
    /// CAP-017 (RestoreFilePlanService) consumes this directly to compute the row's column
    /// styles + tooltip key. The value is set by spec-007's classifier (owned by a separate
    /// capability). Settable here so test fixtures can pre-set canonical values, decoupling
    /// the service-under-test from the classifier.
    /// </summary>
    public PtwFileComparisonStates ComparisonResult { get; set; } =
        PtwFileComparisonStates.Undetermined;

    /// <summary>
    /// PT9 <c>IsNormallyRestored</c> — whether the row's checkbox should be auto-ticked when
    /// the form opens. Per INV-A09 / REVIEW-FLAG-2, this is the canonical source for the
    /// <c>RestoreFilePlanRow.ShouldRestore</c> field — NOT the per-state defaults in the PT9
    /// tooltip switch (RestoreForm.cs:623-670). The auto-tick set per PT9 enum comments
    /// (<c>ParatextData/SourceAndDestFileInfo.cs:7-11</c>) is
    /// <c>{ DestDoesNotExist, SourceIsNewer, SourceIsHigherVersion }</c>.
    /// </summary>
    public bool IsNormallyRestored { get; set; }
}
