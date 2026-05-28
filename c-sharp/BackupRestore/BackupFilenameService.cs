using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;

namespace Paranext.DataProvider.BackupRestore;

/// <summary>
/// Computes the default backup ZIP filename for a project, in the canonical
/// <c>"{sanitized FullName} {yyyy-MM-dd}.zip"</c> form. Equivalent to
/// <c>BackupForm.DefaultBackupFileName()</c> in Paratext 9.
/// </summary>
internal static class BackupFilenameService
{
    // Windows reserved filename chars that MUST be stripped on every platform so
    // backup ZIPs produced on macOS/Linux remain openable on Windows. The
    // BCL's Path.GetInvalidFileNameChars() returns only {'\0', '/'} on
    // POSIX hosts, which would leak Windows-reserved chars like '\\', ':',
    // '?', '*', '|', '<', '>' into filenames — see REVIEW-FLAG-4.
    private static readonly char[] WindowsReservedFilenameChars = new[]
    {
        '\\',
        '/',
        ':',
        '*',
        '?',
        '"',
        '<',
        '>',
        '|',
    };

    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/BackupForm.cs:134-140
    // Method: BackupForm.DefaultBackupFileName()
    // Maps to: EXT-100
    //
    // PT10 deltas vs PT9:
    //   * REVIEW-FLAG-4: strip the UNION of Path.GetInvalidPathChars(),
    //     Path.GetInvalidFileNameChars() AND a hard-coded Windows-reserved
    //     filename-char set. PT9 stripped only Path.GetInvalidPathChars(),
    //     which on Linux/macOS is just '\0'. Hard-coding the Windows set in
    //     addition to the BCL sets guarantees cross-platform-identical
    //     output: a backup ZIP produced on macOS must remain copyable to a
    //     Windows machine without renaming.
    //   * RF-D1-006: 'date' is a caller-provided parameter (not DateTime.Now) so
    //     the caller can pin UTC vs local time.
    /// <summary>
    /// Strips characters that are invalid on the host file system from
    /// <paramref name="projectFullName"/>, then composes
    /// <c>"{sanitized} {yyyy-MM-dd}.zip"</c> using
    /// <paramref name="date"/>'s calendar date (the time-of-day component is
    /// ignored).
    /// </summary>
    /// <remarks>
    /// The character set stripped is the union of
    /// <see cref="Path.GetInvalidPathChars"/> and
    /// <see cref="Path.GetInvalidFileNameChars"/> so the result is safe to use as
    /// a filename on any platform Platform.Bible runs on.
    /// </remarks>
    /// <param name="projectFullName">
    /// The <c>ScrText.FullName</c> of the project being backed up. May be empty
    /// or all-invalid-chars; in either case the sanitized segment collapses to
    /// empty and the result is <c>" {yyyy-MM-dd}.zip"</c> (PT9 parity).
    /// </param>
    /// <param name="date">
    /// Date to embed in the filename. Time-of-day is ignored — only the calendar
    /// date is formatted (invariant <c>yyyy-MM-dd</c>).
    /// </param>
    /// <returns>The default backup filename.</returns>
    public static string ComputeDefaultBackupFileName(string projectFullName, DateTime date)
    {
        // EXPLANATION:
        // 1. Build the union of OS-forbidden chars (REVIEW-FLAG-4). We merge:
        //      a) Path.GetInvalidPathChars() — host BCL set
        //      b) Path.GetInvalidFileNameChars() — host BCL set
        //      c) WindowsReservedFilenameChars — hard-coded so output is
        //         cross-platform-identical (on POSIX hosts (b) returns only
        //         {'\0','/'} which would let Windows-reserved chars leak
        //         through).
        // 2. Filter projectFullName through it, preserving order and whitespace.
        // 3. Format date as invariant yyyy-MM-dd (drops the time component).
        // 4. Concatenate with a single space separator and the literal ".zip"
        //    suffix. INV-A01 (filename ends in ".zip") is satisfied here for
        //    callers that use this default; callers that bypass this method get
        //    the same guarantee enforced downstream in Backup.BackupScrText.
        var forbidden = new HashSet<char>(
            Path.GetInvalidPathChars()
                .Concat(Path.GetInvalidFileNameChars())
                .Concat(WindowsReservedFilenameChars)
        );

        var sanitized = new StringBuilder(projectFullName.Length);
        foreach (char c in projectFullName)
        {
            if (!forbidden.Contains(c))
                sanitized.Append(c);
        }

        string dateString = date.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);

        return $"{sanitized} {dateString}.zip";
    }
}
