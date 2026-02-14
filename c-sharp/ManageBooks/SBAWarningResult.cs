namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// SBA base project book warning result.
/// </summary>
/// <remarks>
/// Ported from PT9/ParatextBase/CommonForms/BookChooserForm.cs:173-206 (EXT-013)
/// Maps to: CAP-027, TS-068, BHV-314, BHV-T016
///
/// This record is returned by CheckSBABaseProjectOverlap to indicate whether
/// an SBA project has selected books that don't exist in its base project.
/// </remarks>
/// <param name="ShowWarning">Whether a warning should be shown to the user.</param>
/// <param name="BooksNotInBase">Book numbers that are selected but not in the base project.</param>
/// <param name="WarningMessage">Warning message if books are missing from base, null otherwise.</param>
public record SBAWarningResult(bool ShowWarning, int[] BooksNotInBase, string? WarningMessage);
