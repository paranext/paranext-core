using System.Collections.Concurrent;
using Paranext.DataProvider.Projects;
using Paratext.Checks;
using Paratext.Data.Checking;
using Paratext.Data.ProjectFileAccess;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// A cache of checks (executable code, input data, and results) for all Paratext projects.
/// This ensures that there is only one instance of each check per project.
/// Also, this automatically clears check results when project text or settings change.
/// <br/>
/// Check results are cached because running checks can be time-consuming, and we expect the UI
/// to frequently request check results for the same project and check multiple times.
/// </summary>
internal sealed class CheckCache
{
    // See platform-scripture.d.ts for the TypeScript definition
    private const string INVALIDATE_CHECK_RESULTS =
        "command:platformScripture.invalidateCheckResults";

    private readonly ConcurrentDictionary<string, ChecksDataSource> _dataSourcesByProjectId = [];
    private readonly ConcurrentDictionary<
        (string checkId, string projectId),
        CheckForProject
    > _checksByIds = [];
    private readonly List<string> _allCheckIds;
    private readonly PapiClient _papiClient;

    private readonly Func<string, ChecksDataSource, ScriptureCheckBase> _createCheck;

    public CheckCache(
        List<string> allCheckIds,
        PapiClient papiClient,
        Func<string, ChecksDataSource, ScriptureCheckBase>? createCheck = null
    )
    {
        _allCheckIds = allCheckIds;
        _papiClient = papiClient;
        _createCheck = createCheck ?? CheckFactory.CreateCheck;

        // When inventory data is changed, there is no way from the ScrText or Settings objects
        // to be notified of the change. So we have to listen for file changes in the project
        // directory and rerun checks for the project if the inventory data changes.
        ProjectFileManager.FileChanged += (scrText, relFilePath, changeType) =>
        {
            if (!relFilePath.Contains("SETTINGS.XML", StringComparison.InvariantCultureIgnoreCase))
                return;

            ThreadingUtils.RunTask(
                Task.Run(async () =>
                {
                    // Read the id directly rather than building the whole (now display-enriched)
                    // ProjectDetails just to pull one field on every Settings.xml change; this is
                    // exactly what ProjectMetadata.Id holds (see ScrTextExtensions.GetProjectDetails).
                    var projectId = scrText.Guid.ToString().ToUpperInvariant();

                    // Update all checks for this project to indicate that settings have changed
                    // This will cause them to reload settings and clear results before the next run
                    foreach (
                        var check in _checksByIds
                            .Where((kvp) => kvp.Key.projectId == projectId)
                            .Select((kvp) => kvp.Value)
                    )
                    {
                        check.SettingsChanged = true;
                    }

                    // Notify the front end that all check results for this project are invalid
                    try
                    {
                        await _papiClient.SendRequestAsync<CheckResultsInvalidated>(
                            INVALIDATE_CHECK_RESULTS,
                            [new CheckResultsInvalidated(_allCheckIds, projectId, null)]
                        );
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(
                            $"Error calling {INVALIDATE_CHECK_RESULTS} for {projectId}: {ex.Message}"
                        );
                    }
                }),
                "Project settings file changed - clear check results for project"
            );
        };
    }

    public CheckForProject GetCheck(string checkId, string projectId)
    {
        return _checksByIds.GetOrAdd(
            (checkId, projectId),
            _ =>
            {
                var dataSource = GetChecksDataSource(projectId);
                return new CheckForProject(_createCheck(checkId, dataSource), checkId, projectId);
            }
        );
    }

    /// <returns>
    /// The checks that threw, each with its exception. The other checks still ran and have results.
    /// </returns>
    public List<(string CheckId, Exception Exception)> RunChecksForProject(
        InputRange range,
        IEnumerable<string> checkIds,
        ErrorMessageDenials denials
    )
    {
        var projectId = range.ProjectId;
        var bookNum = range.Start.BookNum;

        // A check that cannot be created or that throws must not cost the other checks their
        // results. Its recorder is left not ready, so the next job runs it again.
        var failures = new List<(string CheckId, Exception Exception)>();
        var checksToRun = new List<(string checkId, CheckForProject check)>();
        CheckDataFormat neededDataFormat = 0;
        foreach (var checkId in checkIds)
        {
            try
            {
                var check = GetCheck(checkId, projectId);
                neededDataFormat |= check.Check.NeededFormat;
                checksToRun.Add((checkId, check));
            }
            catch (Exception ex)
            {
                failures.Add((checkId, ex));
            }
        }

        // Read before the text, so an edit whose clear reaches a check before that check ends is
        // noticed. A clear that arrives late for an edit made before this read drops results that
        // were computed on the edited text, which costs one more run of that check.
        var editCountsBeforeTextRead = checksToRun
            .Select(item => item.check.GetEditCount(bookNum))
            .ToList();

        // Text has to be tokenized for the checks before the checks can run.
        // "GetText" will tokenize the text for checks to use
        // "0" chapter number means all chapters
        var dataSource = GetChecksDataSource(projectId);
        dataSource.GetText(bookNum, 0, neededDataFormat);

        for (var i = 0; i < checksToRun.Count; i++)
        {
            var (checkId, check) = checksToRun[i];
            try
            {
                if (check.SettingsChanged)
                {
                    // Cleared before Initialize so a settings change that lands during Initialize
                    // is not lost. A failed Initialize leaves the flag set so the next job retries.
                    check.SettingsChanged = false;
                    try
                    {
                        check.Check.Initialize(dataSource);
                        check.ClearResults();
                    }
                    catch
                    {
                        check.SettingsChanged = true;
                        throw;
                    }
                }
                check.Run(dataSource, bookNum, denials, editCountsBeforeTextRead[i]);
            }
            catch (Exception ex)
            {
                failures.Add((checkId, ex));
            }
        }
        return failures;
    }

    private ChecksDataSource GetChecksDataSource(string projectId)
    {
        return _dataSourcesByProjectId.GetOrAdd(
            projectId,
            id =>
            {
                var dataSource = new ChecksDataSource(LocalParatextProjects.GetParatextProject(id));

                dataSource.ScrText.TextChanged += (sender, args) =>
                {
                    ThreadingUtils.RunTask(
                        Task.Run(async () =>
                        {
                            foreach (
                                var check in _checksByIds
                                    .Where((kvp) => kvp.Key.projectId == projectId)
                                    .Select((kvp) => kvp.Value)
                            )
                            {
                                check.ClearResultsForBook(args.BookNum);
                            }
                            // Notify the front end that all check results for this project are invalid
                            try
                            {
                                await _papiClient.SendRequestAsync<CheckResultsInvalidated>(
                                    INVALIDATE_CHECK_RESULTS,
                                    [
                                        new CheckResultsInvalidated(
                                            _allCheckIds,
                                            projectId,
                                            dataSource.ScrText.BookNames[args.BookNum].BookCode
                                        ),
                                    ]
                                );
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine(
                                    $"Error calling {INVALIDATE_CHECK_RESULTS} for {projectId}: {ex.Message}"
                                );
                            }
                        }),
                        "Text changed - clear check results for book"
                    );
                };
                return dataSource;
            }
        );
    }
}
