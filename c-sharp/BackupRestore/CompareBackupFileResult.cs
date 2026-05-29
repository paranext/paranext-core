using System.Text.Json.Serialization;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.8 — the wire-stable return envelope for M-004
//   compareBackupFile. Discriminated union with two cases:
//     * Success(FileCompareConfig) — the React DifferencesToolView component
//       consumes the FileCompareConfig (CAP-020 EXT-204 / FN-001 surface) to
//       render the diff. The Config carries the opaque session-scoped
//       LeftSourceToken / RightSourceToken the component passes back to M-011
//       getCompareSourceContent to fetch text on demand.
//     * Error(CompareBackupFileErrorCode, string) — wire-stable error envelope
//       (data-contracts.md §4.4 error matrix). No exceptions cross the wire
//       boundary.
//
// PT10 deltas vs PT9:
//   * PT9 had no wire-side compareBackupFile shape — RestoreForm called
//     `CompareFiles(sdfi)` directly on a `RestoreFileInfo` reference (an
//     in-process pointer into `dgvFiles`'s underlying list) and showed the
//     resulting DifferencesToolForm modal. PT10's React UI is process-
//     separated; the wire layer projects the result into a discriminated
//     union.
//   * The Success branch carries a `FileCompareConfig` (CAP-020 / EXT-204)
//     rather than a heavyweight `DiffToolConfigurationInfo` — see
//     `FileCompareConfig.cs` for PT10 deltas at that level.
//
// Maps to: data-contracts.md §3.8 (C# block — `public abstract record
//   CompareBackupFileResult { public sealed record Success(...);
//   public sealed record Error(...); }`).
// Behaviors: BHV-320 / BHV-500 / BHV-501 / BHV-502.

/// <summary>
/// Return envelope for
/// <see cref="BackupRestoreDataProvider.CompareBackupFileAsync"/>.
/// Discriminated union of two cases — see <see cref="Success"/> and
/// <see cref="Error"/>.
/// Serializes/deserializes via the <c>status</c> discriminator wired by the
/// <c>[JsonPolymorphic]</c> / <c>[JsonDerivedType]</c> attributes below, matching the
/// TypeScript discriminated union in data-contracts.md §3.8.
/// </summary>
[JsonPolymorphic(TypeDiscriminatorPropertyName = "status")]
[JsonDerivedType(typeof(Success), "success")]
[JsonDerivedType(typeof(Error), "error")]
internal abstract record CompareBackupFileResult
{
    /// <summary>
    /// The file can be compared — the React DifferencesToolView component
    /// receives the <see cref="FileCompareConfig"/> (CAP-020 / EXT-204) and
    /// resolves its <see cref="FileCompareConfig.LeftSourceToken"/> /
    /// <see cref="FileCompareConfig.RightSourceToken"/> on demand via M-011
    /// <c>getCompareSourceContent</c>.
    /// </summary>
    /// <param name="Config">The compare configuration the UI hands to the
    /// React component.</param>
    public sealed record Success(FileCompareConfig Config) : CompareBackupFileResult;

    /// <summary>
    /// The wire layer rejected the request — see
    /// <see cref="CompareBackupFileErrorCode"/> for the discrete codes and
    /// data-contracts.md §4.4 for the localize-key matrix.
    /// </summary>
    /// <param name="ErrorCode">Discrete error code per
    /// <see cref="CompareBackupFileErrorCode"/>.</param>
    /// <param name="ErrorKey">Wire-stable localize key (e.g.,
    /// <c>%restore_invalidSession%</c>) the React UI resolves via the
    /// localization service.</param>
    public sealed record Error(CompareBackupFileErrorCode ErrorCode, string ErrorKey)
        : CompareBackupFileResult;
}
