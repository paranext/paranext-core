using System.Collections.Concurrent;
using Paranext.DataProvider;
using Paranext.DataProvider.Checks;
using Paranext.DataProvider.Projects;
using Paratext.Checks;
using Paratext.Data.ProjectFileAccess;

/// <summary>
/// A cache of checks for all Paratext projects.
/// This ensures that there is only one instance of each check and data source per project.
/// Also, this automatically clears check results when project text or settings change.
/// </summary>
internal class CheckCache
{
    private readonly ConcurrentDictionary<
        (string checkId, string projectId),
        CheckForProject
    > _checksByIds = [];

    private readonly ConcurrentDictionary<string, ChecksDataSource> _dataSourcesByProjectId = [];

    public CheckCache()
    {
        // When inventory data is changed, there is no way from the ScrText or Settings objects
        // to be notified of the change. So we have to listen for file changes in the project
        // directory and rerun checks for the project if the inventory data changes.
        ProjectFileManager.FileChanged += (scrText, relFilePath, changeType) =>
        {
            if (!relFilePath.Contains("SETTINGS.XML", StringComparison.InvariantCultureIgnoreCase))
                return;

            ThreadingUtils.RunTask(
                Task.Run(() =>
                {
                    var projectId = scrText.GetProjectDetails().Metadata.Id;
                    _checksByIds
                        .Where((kvp) => kvp.Key.projectId == projectId)
                        .Select((kvp) => kvp.Value)
                        .ToList()
                        .ForEach((check) => check.ClearResults());
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
                        Task.Run(() => newCheck.ClearResultsForBook(args.BookNum)),
                        "Text changed - clear check results for book"
                    );
                };
                return newCheck;
            }
        );
    }

    public ChecksDataSource GetChecksDataSource(string projectId)
    {
        return _dataSourcesByProjectId.GetOrAdd(
            projectId,
            id => new ChecksDataSource(LocalParatextProjects.GetParatextProject(id))
        );
    }
}
