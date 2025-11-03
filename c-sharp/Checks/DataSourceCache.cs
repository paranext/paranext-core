using System.Collections.Concurrent;
using Paranext.DataProvider.Projects;
using Paratext.Checks;

namespace Paranext.DataProvider.Checks;

public static class DataSourceCache
{
    private static readonly ConcurrentDictionary<string, ChecksDataSource> _dataSourcesByProjectId =
        new();

    public static ChecksDataSource GetChecksDataSource(string projectId)
    {
        return _dataSourcesByProjectId.GetOrAdd(
            projectId,
            id => new ChecksDataSource(LocalParatextProjects.GetParatextProject(id))
        );
    }
}
