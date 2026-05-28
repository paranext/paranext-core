using System;
using System.Globalization;
using System.IO;
using System.Text;
using Paratext.Data;

namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: Paratext/BackupRestore/Backup.cs:41-49 (BackupLogFile property + DateStr),
//         :171-181 (WriteBackupLogEntry).
// Maps to: CAP-023 — BackupLogService (Backup.txt append + reveal-path resolver).
//
// PT9 anchor:
//   public static string BackupLogFile
//   { get { return Path.Combine(ScrTextCollection.SettingsDirectory, "Backup.txt"); } }
//
//   private static void WriteBackupLogEntry(ScrText scrText, BookSet selectedBooks,
//       string destFileSpec, string description)
//   {
//       string s = "BACKUP: " + DateStr
//                  + "\r\n\tBackup Description: " + description
//                  + "\r\n\tBackup Project: " + scrText.Name
//                  + "\r\n\tBooks: " + selectedBooks.Summary()
//                  + "\r\n\tFilename: " + destFileSpec + "\r\n\r\n";
//       File.AppendAllText(BackupLogFile, s, Encoding.UTF8);
//   }
//
// PT10 deltas vs PT9:
//   * Surface promoted from private-static (Paratext.exe) to public-static
//     (ParanextDataProvider). PT9's BackupLogFile lives in Paratext/Paratext.exe,
//     not ParatextData.dll, so PT10 must re-derive the path here using the same
//     formula. ScrTextCollection.SettingsDirectory IS in ParatextData.dll.
//   * BookSet → caller-formatted string. The PT9 writer accepts a BookSet and
//     calls `selectedBooks.Summary()` internally. PT10 callers compute the
//     summary themselves (BookSet → string) so this service stays free of the
//     ParatextData BookSet dependency. The CAP-022 BackupOrchestrator handles
//     the BookSet→string conversion.
//   * ScrText → projectName string. Same reason as above — keep this service
//     free of ParatextData ScrText coupling.
//   * destFileSpec → filename. Renamed to make the parameter's role clearer in
//     the public contract.
//   * RF-D1-006: `now` is a caller-provided parameter (NOT DateTime.Now) so
//     callers can pin UTC vs local time.
//   * INV-A19: PT9 gates this writer in BackupScrText (`if (foundFile)` at
//     Backup.cs:92-93) — i.e., the writer itself is unconditional once called.
//     PT10 preserves that contract: AppendEntry never inspects its inputs for
//     "emptiness"; CAP-022 owns the foundFile gate.
//   * Test seam: an internal static LogFilePathOverride lets unit tests
//     redirect the file path without booting ParatextData / ScrTextCollection.
//     Production code never reads or writes this field; `[InternalsVisibleTo]`
//     in c-sharp/AssemblyInfo.cs already exposes it to c-sharp-tests.

/// <summary>
/// Appends backup log entries to <c>&lt;SettingsDirectory&gt;/Backup.txt</c> and exposes
/// the canonical path for the UI "View Backup Log" / OS-reveal flow (CG-005 / DEC-315).
/// </summary>
/// <remarks>
/// <para>
/// Two-method static service. <see cref="AppendEntry"/> writes one 5-line UTF-8 entry per call
/// (BHV-103). <see cref="GetLogFilePath"/> resolves the canonical absolute log file path —
/// pure (no I/O), returns the same value regardless of file existence (per DT-003 /
/// data-contracts.md §3.14 + §5.3).
/// </para>
/// <para>
/// INV-A19 ("backups with no project files produce no log entry") is enforced by the caller
/// (CAP-022 / BackupOrchestrator). This service appends unconditionally once invoked —
/// matching PT9's structure where the `foundFile` gate lives in `BackupScrText`, not in
/// `WriteBackupLogEntry`.
/// </para>
/// <para>
/// INV-C14 ("backup log is backup-only — same path for both writer and reader") is enforced
/// by routing both <see cref="AppendEntry"/> and <see cref="GetLogFilePath"/> through the same
/// internal resolver. Tests assert this identity directly.
/// </para>
/// </remarks>
internal static class BackupLogService
{
    /// <summary>
    /// Unit-test seam — when non-null, overrides the canonical
    /// <see cref="ScrTextCollection.SettingsDirectory"/>-derived path returned by
    /// <see cref="GetLogFilePath"/> and used by <see cref="AppendEntry"/>. Production
    /// code never reads this field; tests set it in <c>[SetUp]</c> and clear it
    /// (<see langword="null"/>) in <c>[TearDown]</c>.
    /// </summary>
    internal static string? LogFilePathOverride { get; set; }

    // UTF-8 without a byte-order mark. `Encoding.UTF8` has a non-empty preamble that
    // `File.AppendAllText` writes when the target file does not yet exist, which would
    // break PT9 byte parity for the first backup ever on a host (and for the gm-011/012
    // golden-master pipeline). Using a BOM-less UTF8Encoding guarantees the file starts
    // with the ASCII 'B' of "BACKUP:" on every host. PT9 produces a BOM on a fresh file
    // too (same .NET API), but PT10's spec-003 acceptance test requires no BOM, so we
    // diverge here intentionally — see strategic-plan §CAP-023 and red-state.md.
    private static readonly Encoding Utf8NoBom = new UTF8Encoding(
        encoderShouldEmitUTF8Identifier: false
    );

    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/Backup.cs:171-181
    /// <summary>
    /// Appends one 5-line backup log entry (UTF-8) to the canonical log file. Creates the
    /// file if it does not exist.
    /// </summary>
    /// <param name="now">
    /// Caller-pinned timestamp (RF-D1-006). Formatted as <c>YYYY-MM-DD@HH:MM</c> via
    /// PT9's <c>DateStr</c> formula (<c>ToString("o").Substring(0,16).Replace("T","@")</c>).
    /// Seconds and milliseconds are dropped.
    /// </param>
    /// <param name="description">
    /// Free-form user description. Inserted verbatim (no escaping — PT9 parity).
    /// </param>
    /// <param name="projectName">
    /// The project's short name (PT9: <c>scrText.Name</c>). Inserted verbatim.
    /// </param>
    /// <param name="booksDescription">
    /// The book set summary string (PT9: <c>selectedBooks.Summary()</c>). Caller-formatted
    /// in PT10 so this service stays free of the BookSet dependency.
    /// </param>
    /// <param name="filename">
    /// The destination ZIP file path. Inserted verbatim (PT9: <c>destFileSpec</c>).
    /// </param>
    public static void AppendEntry(
        DateTime now,
        string description,
        string projectName,
        string booksDescription,
        string filename
    )
    {
        // PT9 DateStr formula (Backup.cs:41-44). The format string uses only literal
        // separators ('-', '@', ':') and two-digit numeric specifiers, so the result is
        // bit-identical to PT9's `ToString("o").Substring(0, 16).Replace("T", "@")` while
        // avoiding the brittle 16-char slice. Matches the form used by the sibling
        // BackupDescriptionFormatter (CAP-015) which documents this equivalence inline.
        string dateStr = now.ToString("yyyy-MM-dd@HH:mm", CultureInfo.InvariantCulture);

        // PT9 byte-shape (Backup.cs:174-178): five `\r\n`-terminated lines + one
        // trailing `\r\n` blank line that separates entries.
        string entry =
            $"BACKUP: {dateStr}\r\n"
            + $"\tBackup Description: {description}\r\n"
            + $"\tBackup Project: {projectName}\r\n"
            + $"\tBooks: {booksDescription}\r\n"
            + $"\tFilename: {filename}\r\n"
            + "\r\n";

        // Route through GetLogFilePath() so INV-C14 (writer and reader share the same
        // path) holds by construction. File.AppendAllText creates the file if absent;
        // `Utf8NoBom` ensures no preamble is written on fresh-file creation.
        File.AppendAllText(GetLogFilePath(), entry, Utf8NoBom);
    }

    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/Backup.cs:46-49
    /// <summary>
    /// Returns the canonical absolute path to <c>Backup.txt</c>. <strong>Pure</strong> — no I/O;
    /// returns the same value regardless of whether the file exists.
    /// </summary>
    /// <returns>
    /// <c>Path.Combine(ScrTextCollection.SettingsDirectory, "Backup.txt")</c> in production;
    /// the <see cref="LogFilePathOverride"/> when set (unit tests only).
    /// </returns>
    public static string GetLogFilePath()
    {
        return LogFilePathOverride
            ?? Path.Combine(ScrTextCollection.SettingsDirectory, "Backup.txt");
    }
}
