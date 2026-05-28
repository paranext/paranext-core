using System;

namespace Paranext.DataProvider.BackupRestore;

/// <summary>
/// EXT-100 — computes the default backup ZIP filename for a project.
///
/// <para>RED-STATE STUB.</para> The body is intentionally
/// <see cref="NotImplementedException"/> so that the TDD-RED test suite at
/// <c>c-sharp-tests/BackupRestore/BackupFilenameServiceTests.cs</c> compiles
/// AND fails at runtime. The GREEN implementation lands in the
/// <c>tdd-implementer</c> step that immediately follows.
///
/// <para>Specification sources:</para>
/// <list type="bullet">
///   <item><c>.context/features/project-backup-and-restore/data-contracts.md</c> §9</item>
///   <item><c>implementation/backend-alignment.md</c> §EXT-100</item>
///   <item><c>implementation/extraction-plan.md</c> §EXT-100</item>
///   <item><c>characterization/test-scenarios.json</c> — TS-049, TS-050</item>
///   <item><c>behavior-catalog.md</c> §BHV-302</item>
/// </list>
///
/// <para>PT9 source: <c>Paratext/BackupRestore/BackupForm.cs:134-140</c>
/// (<c>DefaultBackupFileName</c>).</para>
/// </summary>
internal static class BackupFilenameService
{
    /// <summary>
    /// Computes the default backup ZIP filename:
    /// <c>"{sanitized FullName} {yyyy-MM-dd}.zip"</c>.
    /// </summary>
    /// <remarks>
    /// REVIEW-FLAG-4: strip the UNION of <c>Path.GetInvalidPathChars()</c> AND
    /// <c>Path.GetInvalidFileNameChars()</c> (PT9 only stripped the former, which
    /// on Linux/macOS is just <c>\0</c>).
    /// <para>RF-D1-006: <paramref name="date"/> is caller-pinned (NOT
    /// <c>DateTime.Now</c>) so the caller can decide UTC vs local.</para>
    /// </remarks>
    /// <param name="projectFullName">The <c>ScrText.FullName</c> of the project being backed up.</param>
    /// <param name="date">Date to embed in the filename. Time-of-day is ignored.</param>
    /// <returns>The computed default filename.</returns>
    public static string ComputeDefaultBackupFileName(string projectFullName, DateTime date)
    {
        throw new NotImplementedException(
            "BackupFilenameService.ComputeDefaultBackupFileName is RED-state. "
                + "Implementation lands in the tdd-implementer GREEN step for CAP-012."
        );
    }
}
