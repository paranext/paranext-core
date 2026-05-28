namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: Paratext/BackupRestore/RestoreZipMember.cs (full class — namespace Paratext.BackupRestore)
// Maps to: data-contracts.md §9 (extracted services consume RestoreFileInfo.SourceFile.FileName);
//          data-contracts.md §3.4 line 613 (`sourceCrc: number` — BHV-322 / REVIEW-FLAG-7).
//
// PT10 deltas vs PT9:
//   * Namespace: PT9 = `Paratext.BackupRestore.RestoreZipMember` (lives in Paratext.exe — the WinForms
//     project — NOT in ParatextData.dll). The PT10 dependency `ParatextData` NuGet package does NOT
//     export this type (verified: `strings ParatextData.dll | grep RestoreZipMember` returns 0 hits).
//     PT10 therefore declares its own type under `Paranext.DataProvider.BackupRestore`.
//   * Minimum-surface-plus-CAP-017 port: PT9's class exposes
//       FileName, ModificationDateTime, Comment, CRC, Data, FileVersion, Rank, FileTitle,
//       Classifier, EnsureDataLoadedFromZip(), ToString()
//     CAP-018 (EXT-201 SharedProjectFilterService) shipped ONLY `FileName`.
//     CAP-017 (EXT-200 RestoreFilePlanService) extends this with `CRC` — the raw CRC needed
//     for the BHV-322 Hide-Same-Files filter (REVIEW-FLAG-7 — the filter uses raw CRC
//     equality, NOT `ComparisonResult == FilesAreSame`). The UI layer reads `CRC` directly
//     off the row's underlying source/destination file when applying the filter.
//   * PT9 declared `FileName` as a public field; PT10 uses an auto-property to satisfy
//     Roslyn analyzers.
/// <summary>
/// Wire-level representation of one ZIP entry inside a Paratext backup file. Minimum-surface
/// PT10 port — exposes the members consumed by the EXT-201 shared-project filter
/// (BackupRestore CAP-018: <c>FileName</c>) and the EXT-200 RestoreFilePlanService
/// (BackupRestore CAP-017: also <c>CRC</c>). Future capabilities will extend this type with
/// additional members as they need them (<c>ModificationDateTime</c>, <c>FileVersion</c>, etc.).
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

    /// <summary>
    /// The raw CRC32 of the entry's bytes. Used by the BHV-322 Hide-Same-Files filter
    /// (REVIEW-FLAG-7) — the filter compares <c>source.CRC == destination.CRC</c> directly
    /// rather than relying on <c>ComparisonResult == FilesAreSame</c>, because the comparison
    /// state can be <c>Undetermined</c> (e.g., when both have equal mtime + no FileVersion)
    /// while the bytes are still identical. Default <c>0</c> when not set by a test fixture.
    /// Typed as <c>uint</c> to match data-contracts.md §3.4 line 613 (wire-side
    /// <c>sourceCrc: number</c>).
    /// </summary>
    public uint CRC { get; set; }
}
