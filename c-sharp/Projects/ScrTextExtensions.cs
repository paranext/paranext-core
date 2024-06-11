using Paratext.Data;

namespace Paranext.DataProvider.Projects;

internal static class ScrTextExtensions
{
    internal static ProjectDetails GetProjectDetails(this ScrText scrText)
    {
        return new(
            scrText.Name,
            new(scrText.Guid.ToString(), LocalParatextProjects.GetParatextProjectInterfaces()),
            scrText.Directory
        );
    }
}
