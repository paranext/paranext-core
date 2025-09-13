using System.Collections.Concurrent;
using Paranext.DataProvider.Projects;
using Paratext.Checks;
using Paratext.Data.ProjectFileAccess;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// A cache of checks (the executable code and the results) for all Paratext projects.
/// This ensures that there is only one instance of each check and data source per project.
/// Also, this automatically clears check results when project text or settings change.
/// </summary>
internal sealed class CheckCache
{
    // See platform-scripture.d.ts for the TypeScript definition
    private const string INVALIDATE_CHECK_RESULTS =
        "command:platformScripture.invalidateCheckResults";

    private readonly ConcurrentDictionary<
        (string checkId, string projectId),
        CheckForProject
    > _checksByIds = [];
    private readonly ConcurrentDictionary<string, ChecksDataSource> _dataSourcesByProjectId = [];
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
                    _checksByIds
                        .Where((kvp) => kvp.Key.projectId == projectId)
                        .Select((kvp) => kvp.Value)
                        .ToList()
                        .ForEach(
                            (check) =>
                            {
                                check.SettingsChanged = true;
                            }
                        );

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
                var newCheck = new CheckForProject(
                    CheckFactory.CreateCheck(checkId, dataSource),
                    checkId,
                    projectId
                );
                dataSource.ScrText.TextChanged += (sender, args) =>
                {
                    ThreadingUtils.RunTask(
                        Task.Run(async () =>
                        {
                            newCheck.ClearResultsForBook(args.BookNum);

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
                return newCheck;
            }
        );
    }

    public IEnumerable<CheckForProject> GetChecks(IEnumerable<string> checkIds, string projectId)
    {
        return checkIds.Select((id) => GetCheck(id, projectId));
    }

    public ChecksDataSource GetChecksDataSource(string projectId)
    {
        return _dataSourcesByProjectId.GetOrAdd(
            projectId,
            id => new ChecksDataSource(LocalParatextProjects.GetParatextProject(id))
        );
    }
}
