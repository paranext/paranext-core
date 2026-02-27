using Paranext.DataProvider.Projects;
using Paratext.Checks;
using Paratext.Data;
using Paratext.Data.Checking;
using Paratext.Data.Find;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Executes selected basic checks on specified books.
/// Wraps the RunBasicChecks pipeline and provides check filtering
/// and SBA scope configuration.
/// </summary>
internal static class BasicChecksExecutionService
{
    private const int MaxCheckingResults = 5000;

    /// <summary>
    /// Executes basic checks on specified books.
    /// </summary>
    /// <param name="input">Check execution parameters</param>
    /// <returns>Check execution result with errors found</returns>
    public static CheckExecutionResult ExecuteBasicChecks(ExecuteBasicChecksInput input)
    {
        return ExecuteBasicChecks(input, CancellationToken.None);
    }

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
            return CreateErrorResult("At least one check type must be specified");

        if (input.BooksToCheck.Count == 0)
            return CreateErrorResult("At least one book must be specified");

        if (cancellationToken.IsCancellationRequested)
            return CreateErrorResult("Check execution was cancelled");

        try
        {
            ScrText scrText = LocalParatextProjects.GetParatextProject(input.ProjectId);

            if (scrText.IsResourceProject)
                return CreateErrorResult("Cannot record checking results for resource projects");

            return RunChecksOnBooks(input, scrText, cancellationToken);
        }
        catch (Exception ex)
        {
            return CreateErrorResult(
                $"Error running checks on project {input.ProjectId}: {ex.Message}"
            );
        }
    }

    /// <summary>
    /// Returns filtered list of available checks based on project type.
    /// Schema check hidden unless showSchema=true. QuotationTypes hidden for SBA.
    /// </summary>
    /// <param name="isSba">Whether the project is a Study Bible Additions project</param>
    /// <param name="showSchema">Whether to show the Schema check</param>
    /// <returns>List of available check type strings</returns>
    public static List<string> GetAvailableChecks(bool isSba, bool showSchema)
    {
        return BasicChecksFactory
            .AvailableChecks.Where(checkType =>
                (checkType != CheckType.Schema.InternalValue || showSchema)
                && (checkType != CheckType.QuotationTypes.InternalValue || !isSba)
            )
            .ToList();
    }

    /// <summary>
    /// Returns check scope configuration for SBA projects.
    /// </summary>
    /// <param name="selectedIndex">Dropdown selection index (0 = All content, 1+ = Study content only)</param>
    /// <returns>SBA check scope configuration</returns>
    public static SbaCheckScope GetSbaCheckScope(int selectedIndex)
    {
        return new SbaCheckScope(DisableChapterVerseCheck: selectedIndex != 0);
    }

    private static CheckExecutionResult RunChecksOnBooks(
        ExecuteBasicChecksInput input,
        ScrText scrText,
        CancellationToken cancellationToken
    )
    {
        List<ScriptureCheckBase> checksToRun = ResolveChecks(input.ChecksToRun);

        ChecksDataSource checksDataSource = new(scrText) { SbaContentOnly = false };
        scrText.Parser.ClearCaches();
        CheckingStatusRecorder recorder = new(scrText);

        foreach (ScriptureCheckBase check in checksToRun)
            check.Initialize(checksDataSource);

        CheckDataFormat neededFormat = checksToRun.Aggregate(
            (CheckDataFormat)0,
            (format, check) => format | check.NeededFormat
        );

        List<CheckError> allErrors = new();
        int totalCount = 0;
        bool overflow = false;

        foreach (int bookNum in input.BooksToCheck)
        {
            if (cancellationToken.IsCancellationRequested)
                return CreateCancelledResult(allErrors, overflow, totalCount);

            checksDataSource.GetText(bookNum, 0, neededFormat);

            foreach (ScriptureCheckBase check in checksToRun)
            {
                if (cancellationToken.IsCancellationRequested)
                    return CreateCancelledResult(allErrors, overflow, totalCount);

                List<VerseListItem> bookCheckErrors = RunSingleCheck(
                    check,
                    bookNum,
                    checksDataSource,
                    recorder,
                    input.FirstChapter,
                    input.LastChapter
                );

                CollectErrors(
                    bookCheckErrors,
                    check.Type.InternalValue,
                    allErrors,
                    ref totalCount,
                    ref overflow
                );
            }
        }

        CheckingStatuses.Get(scrText).Save();

        return new CheckExecutionResult
        {
            Success = true,
            Results = allErrors,
            Overflow = overflow,
            TotalCount = totalCount,
        };
    }

    private static List<ScriptureCheckBase> ResolveChecks(List<string> checkTypes)
    {
        List<ScriptureCheckBase> checks = new();
        foreach (string checkType in checkTypes)
        {
            ScriptureCheckBase? check = BasicChecksFactory.GetCheck(checkType);
            if (check != null)
                checks.Add(check);
        }
        return checks;
    }

    private static List<VerseListItem> RunSingleCheck(
        ScriptureCheckBase check,
        int bookNum,
        ChecksDataSource dataSource,
        CheckingStatusRecorder recorder,
        int firstChapter,
        int lastChapter
    )
    {
        List<VerseListItem> bookCheckErrors = new();
        CheckErrorRecorder errorRecorder = new(bookCheckErrors);

        try
        {
            check.Run(bookNum, dataSource, errorRecorder);

            if (firstChapter > 0 && lastChapter > 0)
            {
                bookCheckErrors.RemoveAll(item =>
                    item.VerseReference == null
                    || item.VerseReference.Value.ChapterNum < firstChapter
                    || item.VerseReference.Value.ChapterNum > lastChapter
                );
            }

            recorder.RecordOneCheck(bookCheckErrors, bookNum, check.Type);
        }
        catch (RequiredCheckSettingsMissingException)
        {
            // Skip checks that aren't properly set up
        }

        return bookCheckErrors;
    }

    private static void CollectErrors(
        List<VerseListItem> bookCheckErrors,
        string checkType,
        List<CheckError> allErrors,
        ref int totalCount,
        ref bool overflow
    )
    {
        foreach (VerseListItem item in bookCheckErrors)
        {
            if (item.VerseReference == null)
                continue;

            totalCount++;

            if (!overflow && allErrors.Count < MaxCheckingResults)
            {
                VerseRef vref = item.VerseReference.Value;
                allErrors.Add(
                    new CheckError(
                        Reference: $"{Canon.BookNumberToId(vref.BookNum)} {vref.ChapterNum}:{vref.VerseNum}",
                        CheckType: checkType,
                        Message: item.Message ?? string.Empty,
                        SelectedText: item.Selection?.SelectedText ?? string.Empty
                    )
                );
            }
            else if (!overflow)
            {
                overflow = true;
            }
        }
    }

    private static CheckExecutionResult CreateErrorResult(string error) =>
        new()
        {
            Success = false,
            Error = error,
            Results = new List<CheckError>(),
            Overflow = false,
            TotalCount = 0,
        };

    private static CheckExecutionResult CreateCancelledResult(
        List<CheckError> results,
        bool overflow,
        int totalCount
    ) =>
        new()
        {
            Success = false,
            Error = "Check execution was cancelled",
            Results = results,
            Overflow = overflow,
            TotalCount = totalCount,
        };
}
