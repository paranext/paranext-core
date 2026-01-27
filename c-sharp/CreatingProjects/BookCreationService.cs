using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for book creation operations.
/// </summary>
internal static class BookCreationService
{
    public static Task<CreateBooksResult> CreateBooksAsync(
        CreateBooksRequest request,
        CancellationToken cancellationToken = default
    )
    {
        throw new NotImplementedException();
    }

    public static IReadOnlyList<ProjectReference> GetValidModelProjects(string projectGuid)
    {
        var results = new List<ProjectReference>();

        foreach (ScrText scrText in ScrTextCollection.ScrTexts(IncludeProjects.Everything))
        {
            string? guid = scrText.Settings?.Guid?.ToString();
            if (guid == null || guid == projectGuid)
                continue;

            ProjectType mappedType = ProjectType.Standard;
            bool isScripture = false;
            if (scrText.Settings?.TranslationInfo is TranslationInformation ti)
            {
                mappedType = ProjectTypeService.MapParatextDataProjectType(ti.Type);
                isScripture = ti.Type.IsScripture();
            }

            results.Add(
                new ProjectReference
                {
                    Guid = guid,
                    ShortName = scrText.Name ?? "",
                    FullName = scrText.Settings?.FullName ?? scrText.Name ?? "",
                    Versification = VersificationType.English,
                    ProjectType = mappedType,
                    IsScripture = isScripture,
                    IsResource = scrText.IsResourceProject,
                    IsRegistered = false,
                }
            );
        }

        return results;
    }
}
