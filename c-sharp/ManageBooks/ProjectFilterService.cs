using Paratext.Data;

namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 ===
// Source: ParatextBase/ScrTextComboxBox.cs:38-69 (PT9)
// Method: ScrTextComboBox.LoadAllScripture() / LoadEditableTexts() predicates
// Maps to: EXT-014 — ScrTextComboBox project filtering predicates
// Contract: .context/features/manage-books/data-contracts.md Section 4.13
// Behaviors: BHV-411
// Scenarios: TS-082
//
// EXPLANATION:
// Dispatches on ProjectFilterPurpose to enumerate a filtered subset of
// ScrTextCollection projects. The five purposes are:
//
//   AllScripture    -> scripture projects (any editability)
//   EditableTexts   -> scripture projects with IsEditableText = true
//   ModelProject    -> all scripture projects (same as AllScripture; read-only
//                      access is sufficient for a "model" project)
//   DeleteSource    -> editable scripture projects (same predicate as
//                      EditableTexts; admin-on-shared-project is a separate
//                      check at the wire-layer call site)
//   CopyDestination -> delegates to CAP-008 GetToProjectFilter (BHV-603/606).
//                      BE-1 only validates SourceProjectType and returns an
//                      empty placeholder; real implementation lands in BE-3.
//
// Unknown/out-of-range purpose -> INVALID_ARGUMENT via PlatformErrorCodes.

/// <summary>
/// Stateless filter service that returns project subsets keyed by
/// <see cref="ProjectFilterPurpose"/>. Used by Create Books / Copy Books /
/// Delete Books / general "choose a project" dropdowns. Read-only — no
/// mutations, no events.
/// </summary>
public static class ProjectFilterService
{
    /// <summary>
    /// Returns the projects matching the filter described by
    /// <paramref name="input"/>.
    /// </summary>
    public static ProjectListResult FilterProjects(ProjectFilterInput input)
    {
        switch (input.Purpose)
        {
            case ProjectFilterPurpose.AllScripture:
            case ProjectFilterPurpose.ModelProject:
                return new ProjectListResult(
                    EnumerateScriptureProjects().Select(ToSummary).ToList()
                );

            case ProjectFilterPurpose.EditableTexts:
            case ProjectFilterPurpose.DeleteSource:
                return new ProjectListResult(
                    EnumerateScriptureProjects()
                        .Where(scrText => scrText.Settings.IsEditableText)
                        .Select(ToSummary)
                        .ToList()
                );

            case ProjectFilterPurpose.CopyDestination:
                if (string.IsNullOrEmpty(input.SourceProjectType))
                    throw PlatformErrorCodes.WithCode(
                        PlatformErrorCodes.InvalidArgument,
                        "SourceProjectType is required when purpose is CopyDestination"
                    );
                // TODO (CAP-008, BE-3): delegate to GetToProjectFilter for
                // BHV-603/606 source-type-aware destination filtering. Until
                // then, return an empty placeholder so dispatch tests pass.
                return new ProjectListResult(new List<ProjectSummary>());

            default:
                throw PlatformErrorCodes.WithCode(
                    PlatformErrorCodes.InvalidArgument,
                    $"Unknown project filter purpose: {input.Purpose}"
                );
        }
    }

    /// <summary>
    /// Enumerates all scripture-type projects from <see cref="ScrTextCollection"/>.
    /// Matches PT9 <c>ScrTextComboBox.LoadAllScripture()</c>:
    /// <c>scrText.Settings.TranslationInfo.Type.IsScripture()</c>.
    /// </summary>
    private static IEnumerable<ScrText> EnumerateScriptureProjects() =>
        ScrTextCollection
            .ScrTexts(IncludeProjects.ScriptureOnly)
            .Where(scrText => scrText.Settings.TranslationInfo.Type.IsScripture());

    /// <summary>
    /// Maps a <see cref="ScrText"/> to the minimal <see cref="ProjectSummary"/>
    /// contract shape (Section 3.8).
    /// </summary>
    private static ProjectSummary ToSummary(ScrText scrText) =>
        new(
            ProjectId: scrText.Guid.ToString(),
            Name: scrText.Name,
            ProjectType: scrText.Settings.TranslationInfo.Type.InternalValue,
            IsEditable: scrText.Settings.IsEditableText
        );
}
