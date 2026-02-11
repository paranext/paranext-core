namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Display style for book comparison grid.
/// Indicates how to style source and destination columns based on comparison state.
/// </summary>
/// <param name="SourceBold">Whether source column should be bold.</param>
/// <param name="DestBold">Whether destination column should be bold.</param>
/// <param name="SourceGray">Whether source column should be gray (book missing).</param>
/// <param name="DestGray">Whether destination column should be gray (book missing).</param>
public record BookDisplayStyle(bool SourceBold, bool DestBold, bool SourceGray, bool DestGray);
