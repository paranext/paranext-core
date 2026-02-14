namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Represents file info for source and destination in copy operation.
/// Based on PT9 CopyBooksForm.SourceAndDestFileInfo internal class.
/// </summary>
/// <remarks>
/// === PORTED FROM PT9 ===
/// Source: PT9/Paratext/ToolsMenu/CopyBooksForm.cs (internal class SourceAndDestFileInfo)
/// Maps to: CAP-020, EXT-006
/// </remarks>
public record SourceAndDestFileInfo
{
    /// <summary>The book number (1-123).</summary>
    public required int BookNum { get; init; }

    /// <summary>Whether to include this book in the copy operation.</summary>
    public required bool IncludeThisFile { get; init; }
}
