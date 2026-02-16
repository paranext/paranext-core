namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Information about a project for copy target selection.
///
/// CAP-013: Used by GetCompatibleCopyTargets to return filtered project list.
/// </summary>
/// <param name="ProjectId">Unique identifier for the project</param>
/// <param name="ProjectName">Human-readable project name</param>
/// <param name="ProjectType">Type of the project (e.g., Standard, StudyBible, StudyBibleAdditions)</param>
/// <param name="IsStudyBible">Whether this is a StudyBible project (for INV-007)</param>
public record ProjectInfo(
    string ProjectId,
    string ProjectName,
    string ProjectType,
    bool IsStudyBible
);
