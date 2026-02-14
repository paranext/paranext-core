namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Model book validation result.
/// </summary>
/// <remarks>
/// Ported from PT9/Paratext/ToolsMenu/CreateBooksForm.cs:248-288 (EXT-003)
/// Maps to: CAP-017, VAL-008
/// </remarks>
/// <param name="IsValid">Whether all books exist in model.</param>
/// <param name="ValidBooks">Books that exist in model project.</param>
/// <param name="MissingBooks">Books that do not exist in model project.</param>
/// <param name="WarningMessage">Warning message if any books are missing, null otherwise.</param>
public record ModelValidationResult(
    bool IsValid,
    int[] ValidBooks,
    int[] MissingBooks,
    string? WarningMessage
);
