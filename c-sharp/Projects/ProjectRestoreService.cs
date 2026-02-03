// === NEW IN PT10 ===
// Reason: Service for project backup analysis and restore operations
// Maps to: CAP-012 (RestoreProject), CAP-013 (AnalyzeBackup)

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Service for project backup analysis and restore operations.
/// PT9 Provenance: RestoreForm, Restorer
/// Maps to: CAP-012 (RestoreProject), CAP-013 (AnalyzeBackup)
/// </summary>
internal static class ProjectRestoreService
{
    /// <summary>
    /// Analyzes a backup file.
    /// PT9 Provenance: RestoreForm logic
    /// Maps to: CAP-013, EXT-301
    /// </summary>
    /// <param name="backupFilePath">Path to the backup ZIP file</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Analysis result with project info and file list</returns>
    public static Task<RestoreAnalysisResult> AnalyzeBackupAsync(
        string backupFilePath,
        CancellationToken cancellationToken = default
    )
    {
        // TODO: Implement in TDD GREEN phase
        throw new NotImplementedException(
            "ProjectRestoreService.AnalyzeBackupAsync - to be implemented by TDD Implementer"
        );
    }
}
