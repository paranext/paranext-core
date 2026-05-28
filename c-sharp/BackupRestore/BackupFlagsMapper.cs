namespace Paranext.DataProvider.BackupRestore;

/// <summary>
/// Maps the PT9 "Include full size figures" checkbox state to the
/// <see cref="IncludeFiguresFlags"/> enum used as a parameter to
/// <c>Backup.BackupScrText</c>.
/// </summary>
/// <remarks>
/// SIMPLE: <c>includeFullSizeFigures ? (Figures | LocalFigures) : Figures</c>.
///
/// <para>
/// Used at the M-001 createBackup boundary to translate the UI's boolean checkbox
/// state into the engine's flag enum. The mapper does NOT consume the project's
/// figure-folder presence — the UI is responsible for disabling the checkbox when
/// the project has no <c>Figures/</c> subfolder (BHV-309 / TS-063); by the time the
/// boolean reaches this mapper, the UI has already enforced that gating.
/// </para>
///
/// <para>
/// PT10 deltas vs PT9: none in semantics. The mapper unifies the one-line ternary
/// from PT9 <c>BackupForm.cmdOK_Click</c> (BackupForm.cs:204-208) into a named
/// pure function. Enum value layout swap is documented on
/// <see cref="IncludeFiguresFlags"/>.
/// </para>
/// </remarks>
internal static class BackupFlagsMapper
{
    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/BackupForm.cs:204-208 (cmdOK_Click)
    // Method: ternary expression passed as the 5th argument to Backup.BackupScrText
    // Maps to: EXT-106
    /// <summary>
    /// Returns the figure-flag combination corresponding to the
    /// "Include full size figures" checkbox state.
    /// </summary>
    /// <param name="includeFullSizeFigures">
    /// <c>true</c> when the UI checkbox is checked (the user wants
    /// <c>local/figures/</c> included on TOP of the always-included
    /// <c>figures/</c>); <c>false</c> when unchecked (only the default
    /// <c>figures/</c> subtree is included).
    /// </param>
    /// <returns>
    /// <see cref="IncludeFiguresFlags.Figures"/> when
    /// <paramref name="includeFullSizeFigures"/> is <c>false</c>;
    /// <c>IncludeFiguresFlags.Figures | IncludeFiguresFlags.LocalFigures</c>
    /// when <c>true</c>.
    /// </returns>
    public static IncludeFiguresFlags MapFromCheckbox(bool includeFullSizeFigures)
    {
        // EXPLANATION:
        // PT9 equivalent (BackupForm.cs:204-208) — the ternary passed as the 5th
        // argument to Backup.BackupScrText:
        //   chkIncludeFullSizeFigures.Checked
        //     ? Backup.IncludeFiguresFlags.LocalFigures | Backup.IncludeFiguresFlags.Figures
        //     : Backup.IncludeFiguresFlags.Figures
        // Bitwise OR is commutative, so PT9's `LocalFigures | Figures` is equivalent
        // to PT10's `Figures | LocalFigures` — we use PT10's enum declaration order
        // (Figures first, then LocalFigures).
        return includeFullSizeFigures
            ? IncludeFiguresFlags.Figures | IncludeFiguresFlags.LocalFigures
            : IncludeFiguresFlags.Figures;
    }
}
