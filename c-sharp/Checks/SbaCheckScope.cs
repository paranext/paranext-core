namespace Paranext.DataProvider.Checks;

/// <summary>
/// Configuration for SBA (Study Bible Additions) check scope.
/// Determines which checks are enabled/disabled based on the selected content mode.
/// </summary>
public record SbaCheckScope(bool DisableChapterVerseCheck);
