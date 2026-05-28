namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: Paratext/BackupRestore/RestoreZipMember.cs (full class — namespace Paratext.BackupRestore)
// Maps to: data-contracts.md §9 (extracted services consume RestoreFileInfo.SourceFile.FileName)
//
// PT10 deltas vs PT9:
//   * Namespace: PT9 = `Paratext.BackupRestore.RestoreZipMember` (lives in Paratext.exe — the WinForms
//     project — NOT in ParatextData.dll). The PT10 dependency `ParatextData` NuGet package does NOT
//     export this type (verified: `strings ParatextData.dll | grep RestoreZipMember` returns 0 hits).
//     PT10 therefore declares its own type under `Paranext.DataProvider.BackupRestore`.
//   * Minimum-surface port: PT9's class exposes
//       FileName, ModificationDateTime, Comment, CRC, Data, FileVersion, Rank, FileTitle,
//       Classifier, EnsureDataLoadedFromZip(), ToString()
//     The EXT-201 (SharedProjectFilterService) contract reads ONLY `FileName`, so this initial port
//     ships ONLY `FileName`. Downstream CAPs (CAP-002 openRestoreSession, CAP-017
//     RestoreFilePlanService) will extend this class with the rest of the members as they
//     consume them — each CAP grows the surface by the minimum amount needed.
//   * PT9 declared `FileName` as a public field; PT10 uses an auto-property to satisfy
//     Roslyn analyzers and to allow future-proofing (e.g., init-only setter).
/// <summary>
/// Wire-level representation of one ZIP entry inside a Paratext backup file. Minimum-surface
/// PT10 port — exposes only the members consumed by the EXT-201 shared-project filter
/// (BackupRestore CAP-018). Future capabilities will extend this type with additional members
/// as they need them (CRC, ModificationDateTime, FileVersion, etc.).
/// </summary>
/// <remarks>
/// See the <c>// === PORTED FROM PT9 ===</c> block in the source file for the full list of
/// PT9 members this PT10 port currently OMITS. Reviewers comparing this against the PT9
/// source should expect the missing members to be added incrementally by later CAPs.
/// </remarks>
public sealed class RestoreZipMember
{
    /// <summary>
    /// The filename of this ZIP entry, exactly as it appears in the ZIP central directory.
    /// PT9 parity: case-sensitive on disk, but consumers (e.g., <see cref="SharedProjectFilterService"/>)
    /// compare against well-known filenames using <c>StringComparison.OrdinalIgnoreCase</c>.
    /// </summary>
    public string FileName { get; set; } = string.Empty;
}
