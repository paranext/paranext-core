using System;

namespace Paranext.DataProvider.BackupRestore;

/// <summary>
/// Computes the description string written into the backup ZIP comment slot and
/// shown to the user in the backup preview field. Equivalent to the composite of
/// PT9 <c>BackupForm.timer1_Tick</c> (the 1Hz preview) and the <c>cmdOK_Click</c>
/// description assembly (the value finally passed to <c>Backup.BackupScrText</c>).
/// </summary>
/// <remarks>
/// SIMPLE: returns <c>$"{Backup.DateStr(now)}, {userName} - {userComment}"</c>
/// where <c>Backup.DateStr(now)</c> is <c>now.ToString("yyyy-MM-dd@HH:mm")</c> using
/// invariant date formatting (PT9 equivalent: <c>DateTime.Now.ToString("o").Substring(0, 16).Replace("T", "@")</c>).
///
/// PT10 deltas vs PT9:
///   * BHV-307 (1Hz timer preview) is DROPPED — caller pins <paramref name="now"/>.
///   * No escaping of commas in <paramref name="userName"/> or trimming of
///     <paramref name="userComment"/> (PT9 parity — strategic-plan §CAP-015 edge-case bullet).
/// </remarks>
internal static class BackupDescriptionFormatter
{
    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/BackupForm.cs:157-160, 204-208
    // Source: Paratext/BackupRestore/Backup.cs:41-44 (DateStr property)
    // Method: BackupForm.timer1_Tick + cmdOK_Click description assembly
    // Maps to: EXT-105
    /// <summary>
    /// Computes the backup description string in the canonical PT9 form
    /// <c>"{yyyy-MM-dd@HH:mm}, {userName} - {userComment}"</c>.
    /// </summary>
    /// <param name="now">
    /// Caller-pinned current time. Only the calendar date and the
    /// hours/minutes portion are emitted (PT9 truncates via <c>Substring(0, 16)</c>).
    /// Pass UTC or local at the caller's discretion — the formatter does NOT
    /// convert.
    /// </param>
    /// <param name="userName">
    /// User name to embed. Used verbatim; commas are NOT escaped (PT9 parity).
    /// </param>
    /// <param name="userComment">
    /// Free-form comment to embed. Used verbatim, including leading/trailing
    /// whitespace; empty string preserves the trailing <c>" - "</c> separator
    /// (PT9 parity).
    /// </param>
    /// <returns>The composed description string.</returns>
    public static string ComputeDescription(DateTime now, string userName, string userComment)
    {
        throw new NotImplementedException(
            "BackupDescriptionFormatter.ComputeDescription is RED-state. "
                + "Implementation lands in the tdd-implementer GREEN step for CAP-015."
        );
    }
}
