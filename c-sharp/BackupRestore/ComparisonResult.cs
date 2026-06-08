namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: ParatextData PtwFileComparisonStates enum
//         (Paratext/ParatextData/SourceAndDestFileInfo.cs:3-14 — namespace
//         Paratext.Data). The PT9 enum lives in ParatextData.dll and is reused
//         directly by EXT-200 (CAP-017 RestoreFilePlanService) inside the data
//         provider via `using Paratext.Data;`. THIS file is the WIRE-side
//         projection of the same lattice (data-contracts.md §3.5
//         ComparisonResult) — it's the serializable shape sent over JSON-RPC
//         to the React UI.
// Maps to: data-contracts.md §3.5 (C# enum block) — 9 values, exact spelling
//          preserved. The wire-side enum DELIBERATELY duplicates the
//          ParatextData enum's value names so the mapping from PT-data-side to
//          wire-side is a 1:1 enum-to-enum projection in the M-002 metadata
//          builder.
// Behavior: BHV-503 (FN-001 shared comparison-state lattice). TS-099 pins the
//          9-state enum surface.

/// <summary>
/// Per-file comparison classification (PT9 <c>PtwFileComparisonStates</c>
/// projected to the wire layer). One of 9 values driving auto-tick (BHV-319 /
/// INV-A08 / INV-A09), per-state column styling (BHV-318), and the downgrade-
/// confirm gate (VAL-B07).
/// </summary>
/// <remarks>
/// Values match PT9's <see cref="Paratext.Data.PtwFileComparisonStates"/>
/// spelling exactly so the metadata builder can project
/// <c>PtwFileComparisonStates → ComparisonResult</c> by name.
/// </remarks>
internal enum ComparisonResult
{
    /// <summary>Source and destination CRCs match (INV-A07).</summary>
    FilesAreSame,

    /// <summary>
    /// Source file not present in the backup ZIP — destination row only.
    /// (No PT9 tooltip case — RestoreForm.cs:629-666 default branch.)
    /// </summary>
    SourceDoesNotExist,

    /// <summary>Source mtime is newer than destination mtime.</summary>
    SourceIsNewer,

    /// <summary>Source mtime is older than destination mtime.</summary>
    SourceIsOlder,

    /// <summary>
    /// Destination file not present on disk — backup-side row only. Auto-ticks
    /// per INV-A09.
    /// </summary>
    DestDoesNotExist,

    /// <summary>
    /// Both files carry the same parsed `# version=N.N` line (no per-byte CRC
    /// equality necessary).
    /// </summary>
    FilesAreSameVersion,

    /// <summary>Source parses to a higher `# version=N.N`. Auto-ticks per INV-A09.</summary>
    SourceIsHigherVersion,

    /// <summary>
    /// Destination parses to a higher `# version=N.N`. Toggling on requires
    /// downgrade confirmation per VAL-B07.
    /// </summary>
    DestIsHigherVersion,

    /// <summary>
    /// Neither mtime nor parsed version disambiguates the two — caller may
    /// fall back to raw-CRC equality (BHV-322).
    /// </summary>
    Undetermined,
}
