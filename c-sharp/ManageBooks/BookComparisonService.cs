using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Service for book comparison operations.
/// Provides functionality for comparing books between projects for copy dialog.
///
/// Contains CAP-022 (BookDisplayStyling) and CAP-013 (GetCompatibleCopyTargets).
/// </summary>
internal static class BookComparisonService
{
    /// <summary>
    /// Get compatible copy target projects for a source project.
    ///
    /// === NEW IN PT10 ===
    /// Reason: PAPI command pattern for copy books dialog
    /// Maps to: CAP-013
    ///
    /// Filters projects based on source project type compatibility.
    ///
    /// Rules (from PT9):
    /// - INV-007: StudyBible projects can only copy to other StudyBible projects
    /// - INV-008: SBA (StudyBibleAdditions) projects can only copy to other SBA projects
    /// - Standard projects can copy to multiple compatible types
    ///
    /// Maps to: BHV-552, BHV-553, BHV-554
    /// Golden Masters: gm-003, gm-004, gm-005
    /// </summary>
    /// <param name="sourceProjectId">ID of the source project</param>
    /// <param name="paratextProjects">Project repository for accessing project metadata</param>
    /// <returns>Array of compatible target projects (never null)</returns>
    public static ProjectInfo[] GetCompatibleCopyTargets(
        string sourceProjectId,
        LocalParatextProjects paratextProjects
    )
    {
        // Get the source project
        ScrText? sourceScrText;
        try
        {
            sourceScrText = LocalParatextProjects.GetParatextProject(sourceProjectId);
        }
        catch (Exception)
        {
            // Source project not found - return empty array
            return [];
        }

        // Get source project type information
        var sourceType = sourceScrText.Settings.TranslationInfo.Type;
        bool sourceIsSBA = sourceScrText.Settings.IsStudyBibleAdditions;
        bool sourceIsStudyBible = sourceType == ProjectType.StudyBible;

        // Get all available projects
        var allProjects = ScrTextCollection.ScrTexts(IncludeProjects.ScriptureOnly);

        var compatibleTargets = new List<ProjectInfo>();

        foreach (var targetScrText in allProjects)
        {
            // Exclude the source project from its own target list
            // Use case-insensitive comparison because HexId.ToString() may differ in case
            if (
                string.Equals(
                    targetScrText.Guid.ToString(),
                    sourceProjectId,
                    StringComparison.OrdinalIgnoreCase
                )
            )
                continue;

            var targetType = targetScrText.Settings.TranslationInfo.Type;
            bool targetIsSBA = targetScrText.Settings.IsStudyBibleAdditions;
            bool targetIsStudyBible = targetType == ProjectType.StudyBible;

            // Apply compatibility rules:
            // INV-007: StudyBible can only copy to StudyBible
            if (sourceIsStudyBible && !targetIsStudyBible)
                continue;

            // INV-008: SBA can only copy to SBA
            if (sourceIsSBA && !targetIsSBA)
                continue;

            // For standard projects (not StudyBible, not SBA):
            // Can copy to most types including StudyBible and SBA per gm-003
            // No additional filtering needed for standard projects

            // Project is compatible - add to results
            compatibleTargets.Add(
                new ProjectInfo(
                    ProjectId: targetScrText.Guid.ToString(),
                    ProjectName: targetScrText.Name,
                    ProjectType: targetType.ToString() ?? "Unknown",
                    IsStudyBible: targetIsStudyBible || targetIsSBA
                )
            );
        }

        return [.. compatibleTargets];
    }

    /// <summary>
    /// Determine display style based on comparison state.
    ///
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/FileMenu/ImportBooksForm.cs:114-156
    /// Method: ImportBooksForm.StyleDataGridRow
    /// Maps to: EXT-008, BHV-T009
    /// </summary>
    /// <param name="state">Comparison result</param>
    /// <returns>Style to apply (Bold for newer, Gray for missing, Regular for same)</returns>
    public static BookDisplayStyle GetDisplayStyle(ComparisonResult state)
    {
        return state switch
        {
            ComparisonResult.SourceNewer => new BookDisplayStyle(
                SourceBold: true,
                DestBold: false,
                SourceGray: false,
                DestGray: false
            ),
            ComparisonResult.DestNewer => new BookDisplayStyle(
                SourceBold: false,
                DestBold: true,
                SourceGray: false,
                DestGray: false
            ),
            ComparisonResult.Same => new BookDisplayStyle(
                SourceBold: false,
                DestBold: false,
                SourceGray: false,
                DestGray: false
            ),
            ComparisonResult.OnlyInSource => new BookDisplayStyle(
                SourceBold: false,
                DestBold: false,
                SourceGray: false,
                DestGray: true
            ),
            ComparisonResult.OnlyInDest => new BookDisplayStyle(
                SourceBold: false,
                DestBold: false,
                SourceGray: true,
                DestGray: false
            ),
            _ => throw new ArgumentOutOfRangeException(
                nameof(state),
                state,
                "Unknown ComparisonResult value"
            ),
        };
    }
}
