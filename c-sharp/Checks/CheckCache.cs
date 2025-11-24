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

    public CheckCache(List<string> allCheckIds, PapiClient papiClient)
    {
        _allCheckIds = allCheckIds;
        _papiClient = papiClient;

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
                    var projectId = scrText.GetProjectDetails().Metadata.Id;

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
                return new CheckForProject(
                    CheckFactory.CreateCheck(checkId, dataSource),
                    checkId,
                    projectId
                );
            }
        );
    }

    public IEnumerable<CheckForProject> GetChecks(IEnumerable<string> checkIds, string projectId)
    {
        return checkIds.Select((id) => GetCheck(id, projectId));
    }

    public void RunChecksForProject(
        InputRange range,
        IEnumerable<string> checkIds,
        ErrorMessageDenials denials
    )
    {
        var projectId = range.ProjectId;
        var bookNum = range.Start.BookNum;

        // Text has to be tokenized for the checks before the checks can run
        var enabledChecksForProject = GetChecks(checkIds, projectId);
        CheckDataFormat neededDataFormat = 0;
        foreach (var check in enabledChecksForProject)
            neededDataFormat |= check.Check.NeededFormat;

        // "GetText" will tokenize the text for checks to use
        // "0" chapter number means all chapters
        var dataSource = GetChecksDataSource(projectId);
        dataSource.GetText(bookNum, 0, neededDataFormat);

        foreach (var checkId in checkIds)
        {
            var check = GetCheck(checkId, projectId);
            if (check.SettingsChanged)
            {
                check.SettingsChanged = false;
                check.Check.Initialize(dataSource);
                check.ClearResults();
            }
            check.Run(dataSource, bookNum, denials);
        }
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
