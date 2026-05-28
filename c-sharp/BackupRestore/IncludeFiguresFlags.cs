using System;

namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: Paratext/BackupRestore/Backup.cs:19-28 (Paratext.BackupRestore.Backup.IncludeFiguresFlags)
// Maps to: data-contracts.md §3.6 + §2.1 (C# block) — PT10's wire-stable enum
//
// PT10 deltas vs PT9:
//   * Value layout SWAPPED: PT9 declares `LocalFigures = 1, Figures = 2`; PT10 declares
//     `Figures = 1, LocalFigures = 2`. PT10's layout is locked by the wire contract
//     (data-contracts.md §2.1 line 105-114 — the TypeScript counterpart declares
//     `Figures: 1, LocalFigures: 2` as numeric literals). The swap is intentional —
//     PT10 owns its own wire-stable serialization; PT9 was the upstream source for
//     SEMANTICS (which bits mean what), not for the numeric layout.
//   * Namespace: PT9 = `Paratext.BackupRestore.Backup.IncludeFiguresFlags` (nested in
//     `static class Backup` in Paratext.exe). PT10 = top-level
//     `Paranext.DataProvider.BackupRestore.IncludeFiguresFlags`. ParatextData.dll
//     (the PT10 NuGet dep) does NOT export this enum — it lives in Paratext.exe in PT9
//     and is re-declared standalone in PT10.
//   * Serialization: data-contracts.md §7.3 line 2096 — flag enums serialize as numeric
//     values (0, 1, 2, 3), NOT strings; no `[EnumMember]` annotation required.
/// <summary>
/// Flags for which figure-folder subtrees are included in a backup ZIP.
/// </summary>
/// <remarks>
/// Mirrors the PT9 <c>Paratext.BackupRestore.Backup.IncludeFiguresFlags</c> enum
/// (Backup.cs:19-28) in SEMANTICS but uses a different numeric layout — see the
/// "PORTED FROM PT9" block above for the rationale.
///
/// <para>
/// PT9 BackupForm sets <c>Figures</c> only when the "Include full size figures" checkbox
/// is unchecked, and <c>Figures | LocalFigures</c> when it is checked (BHV-309 /
/// EXT-106 / BackupForm.cs:204-208). The <see cref="None"/> value is reachable only
/// if a caller bypasses the mapper and passes <c>None</c> explicitly — the mapper
/// itself never returns it.
/// </para>
///
/// <para>
/// The bitwise OR <c>Figures | LocalFigures</c> evaluates to integer 3, which is a
/// valid value of the enum even though the literal "3" is not declared. PT9 has no
/// <c>All</c> convenience member; PT10 follows suit — the TypeScript counterpart
/// declares <c>All: 3</c> as a convenience constant on the JS side only.
/// </para>
/// </remarks>
[Flags]
internal enum IncludeFiguresFlags
{
    /// <summary>No figure folders included.</summary>
    /// <remarks>
    /// Not produced by <see cref="BackupFlagsMapper.MapFromCheckbox"/> in PT10 (or PT9);
    /// reachable only by a caller that bypasses the mapper.
    /// </remarks>
    None = 0,

    /// <summary>
    /// Include the project's <c>figures/</c> subtree (the always-included default
    /// when the UI checkbox is unchecked).
    /// </summary>
    Figures = 1,

    /// <summary>
    /// Include the project's <c>local/figures/</c> subtree (full-size figures —
    /// added on TOP of <see cref="Figures"/> when the UI checkbox is checked).
    /// </summary>
    LocalFigures = 2,
}
