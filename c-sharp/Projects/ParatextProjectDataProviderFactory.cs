using System.Text.Json;
using Paranext.DataProvider.Services;
using Paratext.Data;

namespace Paranext.DataProvider.Projects;

internal class ParatextProjectDataProviderFactory : ParatextProjectDataProviderFactoryBase
{
    internal const string PDPF_NAME = "Paratext";

    public ParatextProjectDataProviderFactory(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects
    )
        : base(
            papiClient,
            paratextProjects,
            LocalParatextProjects.GetParatextProjectInterfaces(isPublished: false),
            PDPF_NAME
        ) { }

    protected override List<ProjectMetadata>? GetAvailableProjects(JsonElement _ignore)
    {
        return _paratextProjects
            .GetAvailableUnpublishedProjectDetails()
            .Select(pd => pd.Metadata)
            .ToList();
    }

    // Published projects (ScrText.IsResourceProject == true) belong to
    // ParatextPublishedProjectDataProviderFactory. Reject them here so callers don't end up with an
    // unpublished PDP whose advertised interfaces lie about what the project can actually do.
    protected override bool ShouldServeProject(ScrText scrText)
    {
        return !scrText.IsResourceProject;
    }

    protected override string GetCrossFactoryRejectionMessage(string projectID)
    {
        return $"Project {projectID} is published and cannot be served by this factory";
    }

    protected override string GetRegistrationTaskDescription(
        ParatextProjectDataProvider pdp,
        ProjectDetails details
    )
    {
        return $"Register PDP {pdp.DataProviderName} for project {details.Name}";
    }
}
