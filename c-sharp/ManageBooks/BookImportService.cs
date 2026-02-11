namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Service for validating and importing books from external files.
/// CAP-006: ValidateImportFiles capability.
///
/// This is a STUB implementation for TDD RED phase.
/// All methods throw NotImplementedException until GREEN phase.
/// </summary>
public static class BookImportService
{
    /// <summary>
    /// Validates import files before importing into a project.
    /// </summary>
    /// <param name="projectId">The target project ID.</param>
    /// <param name="filePaths">Array of file paths to validate.</param>
    /// <returns>Validation result with file information.</returns>
    /// <exception cref="ArgumentNullException">If projectId or filePaths is null.</exception>
    public static Task<ImportValidationResult> ValidateImportFilesAsync(
        string projectId,
        string[] filePaths
    )
    {
        ArgumentNullException.ThrowIfNull(projectId);
        ArgumentNullException.ThrowIfNull(filePaths);

        // STUB: Throw NotImplementedException for RED phase
        throw new NotImplementedException("CAP-006: ValidateImportFilesAsync not yet implemented");
    }
}
