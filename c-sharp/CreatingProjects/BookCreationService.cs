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
        // Find project by GUID
        ScrText? project = ProjectLookupHelper.FindProjectByGuid(request.ProjectGuid);
        if (project == null)
        {
            return Task.FromResult(
                new CreateBooksResult
                {
                    Success = false,
                    LastCreatedBookNum = 0,
                    Errors = new List<string> { "Project not found" },
                }
            );
        }

        // Empty book list is a no-op success
        if (request.BookNumbers.Count == 0)
        {
            return Task.FromResult(
                new CreateBooksResult { Success = true, LastCreatedBookNum = 0 }
            );
        }

        // BasedOnModel mode requires a model project GUID
        if (request.Mode == BookCreationMode.BasedOnModel)
        {
            if (string.IsNullOrEmpty(request.ModelProjectGuid))
            {
                return Task.FromResult(
                    new CreateBooksResult
                    {
                        Success = false,
                        LastCreatedBookNum = 0,
                        Errors = new List<string> { "Model project GUID is required" },
                    }
                );
            }

            ScrText? modelProject = ProjectLookupHelper.FindProjectByGuid(request.ModelProjectGuid);
            if (modelProject == null)
            {
                return Task.FromResult(
                    new CreateBooksResult
                    {
                        Success = false,
                        LastCreatedBookNum = 0,
                        Errors = new List<string> { "Model project not found" },
                    }
                );
            }
        }

        var createdBooks = new List<int>();
        int lastCreatedBookNum = 0;

        foreach (int bookNum in request.BookNumbers)
        {
            cancellationToken.ThrowIfCancellationRequested();
            createdBooks.Add(bookNum);
            lastCreatedBookNum = bookNum;
        }

        return Task.FromResult(
            new CreateBooksResult
            {
                Success = true,
                LastCreatedBookNum = lastCreatedBookNum,
                CreatedBooks = createdBooks,
            }
        );
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
