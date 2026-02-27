namespace Paranext.DataProvider.Checks;

/// <summary>
/// Parameters for executing basic checks.
/// Maps to EXT-009 (RunBasicChecksForm.cmdOK_Click).
/// </summary>
public record ExecuteBasicChecksInput(
    string ProjectId,
    List<string> ChecksToRun,
    List<int> BooksToCheck,
    int FirstChapter = 0,
    int LastChapter = 0
);
