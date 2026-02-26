using Paranext.DataProvider.Projects;
using Paratext.Checks;
using Paratext.Data;
using Paratext.Data.Checking;
using Paratext.Data.Filters;
using Paratext.Data.Find;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Executes selected basic checks on specified books.
/// Wraps the RunBasicChecks pipeline (EXT-009) and provides check filtering (EXT-010)
/// and SBA scope configuration (EXT-011).
/// </summary>
internal static class BasicChecksExecutionService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextChecks/RunBasicChecks.cs:20
    // Maps to: INV-010
    private const int MaxCheckingResults = 5000;

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/RunBasicChecksForm.cs:195-234
    // Method: RunBasicChecksForm.cmdOK_Click()
    // Maps to: EXT-009
    /// <summary>
    /// Executes basic checks on specified books.
    /// </summary>
    /// <param name="input">Check execution parameters</param>
    /// <returns>Check execution result with errors found</returns>
    public static CheckExecutionResult ExecuteBasicChecks(ExecuteBasicChecksInput input)
    {
        return ExecuteBasicChecks(input, CancellationToken.None);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/RunBasicChecksForm.cs:195-234
    //         PT9/ParatextChecks/RunBasicChecks.cs:62-120, 232-295
    // Method: RunBasicChecksForm.cmdOK_Click(), RunBasicChecks.Run()
    // Maps to: EXT-009
    /// <summary>
    /// Executes basic checks on specified books with cancellation support.
    /// </summary>
    /// <param name="input">Check execution parameters</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Check execution result with errors found</returns>
    public static CheckExecutionResult ExecuteBasicChecks(
        ExecuteBasicChecksInput input,
        CancellationToken cancellationToken
    )
    {
        if (input.ChecksToRun.Count == 0)
        {
            return new CheckExecutionResult
            {
                Success = false,
                Error = "At least one check type must be specified",
                Results = new List<CheckError>(),
                Overflow = false,
                TotalCount = 0,
            };
        }

        if (input.BooksToCheck.Count == 0)
        {
            return new CheckExecutionResult
            {
                Success = false,
                Error = "At least one book must be specified",
                Results = new List<CheckError>(),
                Overflow = false,
                TotalCount = 0,
            };
        }

        if (cancellationToken.IsCancellationRequested)
        {
            return new CheckExecutionResult
            {
                Success = false,
                Error = "Check execution was cancelled",
                Results = new List<CheckError>(),
                Overflow = false,
                TotalCount = 0,
            };
        }

        try
        {
            ScrText scrText = LocalParatextProjects.GetParatextProject(input.ProjectId);

            if (scrText.IsResourceProject)
            {
                return new CheckExecutionResult
                {
                    Success = false,
                    Error = "Cannot record checking results for resource projects",
                    Results = new List<CheckError>(),
                    Overflow = false,
                    TotalCount = 0,
                };
            }

            List<ScriptureCheckBase> checksToRun = new();
            foreach (string checkType in input.ChecksToRun)
            {
                ScriptureCheckBase? check = BasicChecksFactory.GetCheck(checkType);
                if (check != null)
                    checksToRun.Add(check);
            }

            bool sbaContentOnly = false;
            ChecksDataSource checksDataSource = new ChecksDataSource(scrText);
            checksDataSource.SbaContentOnly = sbaContentOnly;

            scrText.Parser.ClearCaches();
            CheckingStatusRecorder? recorder = new CheckingStatusRecorder(scrText);

            foreach (ScriptureCheckBase check in checksToRun)
                check.Initialize(checksDataSource);

            List<CheckError> allErrors = new();
            int totalCount = 0;
            bool overflow = false;

            BookSet bookSet = new BookSet();
            foreach (int bookNum in input.BooksToCheck)
                bookSet.Add(bookNum);

            CheckDataFormat neededFormat = 0;
            foreach (ScriptureCheckBase check in checksToRun)
                neededFormat |= check.NeededFormat;

            foreach (int bookNum in input.BooksToCheck)
            {
                if (cancellationToken.IsCancellationRequested)
                {
                    return new CheckExecutionResult
                    {
                        Success = false,
                        Error = "Check execution was cancelled",
                        Results = allErrors,
                        Overflow = overflow,
                        TotalCount = totalCount,
                    };
                }

                checksDataSource.GetText(bookNum, 0, neededFormat);

                foreach (ScriptureCheckBase check in checksToRun)
                {
                    if (cancellationToken.IsCancellationRequested)
                    {
                        return new CheckExecutionResult
                        {
                            Success = false,
                            Error = "Check execution was cancelled",
                            Results = allErrors,
                            Overflow = overflow,
                            TotalCount = totalCount,
                        };
                    }

                    List<VerseListItem> bookCheckErrors = new();
                    CheckErrorRecorder errorRecorder = new CheckErrorRecorder(bookCheckErrors);

                    try
                    {
                        check.Run(bookNum, checksDataSource, errorRecorder);

                        if (input.FirstChapter > 0 && input.LastChapter > 0)
                        {
                            bookCheckErrors.RemoveAll(item =>
                                item.VerseReference == null
                                || item.VerseReference.Value.ChapterNum < input.FirstChapter
                                || item.VerseReference.Value.ChapterNum > input.LastChapter
                            );
                        }

                        recorder.RecordOneCheck(bookCheckErrors, bookNum, check.Type);
                    }
                    catch (RequiredCheckSettingsMissingException)
                    {
                        // Skip checks that aren't properly set up
                    }

                    foreach (VerseListItem item in bookCheckErrors)
                    {
                        if (item.VerseReference == null)
                            continue;

                        totalCount++;

                        if (!overflow && allErrors.Count < MaxCheckingResults)
                        {
                            VerseRef vref = item.VerseReference.Value;
                            string reference =
                                $"{Canon.BookNumberToId(vref.BookNum)} {vref.ChapterNum}:{vref.VerseNum}";
                            string message = item.Message ?? string.Empty;
                            string selectedText = item.Selection?.SelectedText ?? string.Empty;
                            string checkType = check.Type.InternalValue;

                            allErrors.Add(
                                new CheckError(reference, checkType, message, selectedText)
                            );
                        }
                        else if (!overflow)
                        {
                            overflow = true;
                        }
                    }
                }
            }

            CheckingStatuses.Get(scrText).Save();

            return new CheckExecutionResult
            {
                Success = true,
                Error = null,
                Results = allErrors,
                Overflow = overflow,
                TotalCount = totalCount,
            };
        }
        catch (Exception ex)
        {
            return new CheckExecutionResult
            {
                Success = false,
                Error = $"Error running checks on project {input.ProjectId}: {ex.Message}",
                Results = new List<CheckError>(),
                Overflow = false,
                TotalCount = 0,
            };
        }
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/RunBasicChecksForm.cs:69-75
    // Maps to: EXT-010
    /// <summary>
    /// Returns filtered list of available checks based on project type.
    /// Schema check hidden unless showSchema=true. QuotationTypes hidden for SBA.
    /// </summary>
    /// <param name="isSba">Whether the project is a Study Bible Additions project</param>
    /// <param name="showSchema">Whether to show the Schema check</param>
    /// <returns>List of available check type strings</returns>
    public static List<string> GetAvailableChecks(bool isSba, bool showSchema)
    {
        List<string> result = new();
        foreach (string checkType in BasicChecksFactory.AvailableChecks)
        {
            if (checkType == CheckType.Schema.InternalValue && !showSchema)
                continue;

            if (checkType == CheckType.QuotationTypes.InternalValue && isSba)
                continue;

            result.Add(checkType);
        }

        return result;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/RunBasicChecksForm.cs:236-247, 325-343
    // Maps to: EXT-011
    /// <summary>
    /// Returns check scope configuration for SBA projects.
    /// </summary>
    /// <param name="selectedIndex">Dropdown selection index</param>
    /// <returns>SBA check scope configuration</returns>
    public static SbaCheckScope GetSbaCheckScope(int selectedIndex)
    {
        // selectedIndex 0 = "All content" (no disable)
        // selectedIndex 1 = "Study content only" (disable ChapterVerse)
        return new SbaCheckScope(DisableChapterVerseCheck: selectedIndex != 0);
    }
}
