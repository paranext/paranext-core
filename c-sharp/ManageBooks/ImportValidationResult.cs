namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Import validation result.
/// </summary>
/// <param name="IsValid">Whether all files valid.</param>
/// <param name="Files">Validated file information.</param>
/// <param name="ErrorMessage">Error if invalid.</param>
public record ImportValidationResult(bool IsValid, ValidatedFileInfo[] Files, string? ErrorMessage);

/// <summary>
/// Validated file information.
/// </summary>
/// <param name="FilePath">Full path to the file.</param>
/// <param name="BookNum">Detected book number (0 if not detected).</param>
/// <param name="BookName">Display name of the book.</param>
/// <param name="Comparison">Comparison with existing book in project.</param>
/// <param name="CanImport">Whether this file can be imported.</param>
/// <param name="Tooltip">Tooltip text explaining status.</param>
public record ValidatedFileInfo(
    string FilePath,
    int BookNum,
    string BookName,
    ComparisonResult Comparison,
    bool CanImport,
    string? Tooltip
);
