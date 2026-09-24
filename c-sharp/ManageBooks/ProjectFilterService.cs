using Paratext.Data;
using PtxUtils;

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
//   EditableTexts   -> scripture projects that are editable targets
//                      (Settings.Editable, excluding resources)
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
    // Localize key + English fallback for the missing-source-type validation
    // error (see patterns.errorHandling.backendLocalization in the decision
    // registry). Wire boundary (ManageBooksService.FilterProjectsAsync)
    // catches PlatformErrorCodes and does not re-resolve the message — the
    // key is resolved inline here via LocalizationService when surfaced to
    // the wire (currently only via FilterProjectsAsync, which throws
    // directly; resolution happens at the caller). For simplicity in this
    // retrofit the service keeps the English literal as its message,
    // preserving the existing contract; the KEY form is reserved for the
    // CopyDestination path where the wire method ManageBooksService
    // resolves it explicitly.

    /// <summary>Localize key for the missing-source-type error (CopyDestination filter). Used when no PT9 Localizer.Str source existed — new in PT10.</summary>
    public const string MissingSourceProjectTypeKey =
        "%manageBooks_error_missingSourceProjectType%";

    /// <summary>English fallback for <see cref="MissingSourceProjectTypeKey"/>.</summary>
    public const string MissingSourceProjectTypeFallback =
        "SourceProjectType is required when purpose is CopyDestination";

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
                return BuildScriptureProjectList();

            case ProjectFilterPurpose.EditableTexts:
            case ProjectFilterPurpose.DeleteSource:
                return BuildEditableScriptureProjectList();

            case ProjectFilterPurpose.CopyDestination:
                return BuildCopyDestinationProjectList(input.SourceProjectType);

            default:
                throw PlatformErrorCodes.WithCode(
                    PlatformErrorCodes.InvalidArgument,
                    $"Unknown project filter purpose: {input.Purpose}"
                );
        }
    }

    /// <summary>
    /// Builds the project list for <see cref="ProjectFilterPurpose.AllScripture"/> and
    /// <see cref="ProjectFilterPurpose.ModelProject"/> — every scripture project, with no
    /// editability filter. ModelProject uses the same predicate because read-only access
    /// is sufficient when picking a model.
    /// </summary>
    private static ProjectListResult BuildScriptureProjectList() =>
        ToProjectListResult(EnumerateScriptureProjects());

    /// <summary>
    /// Builds the project list for <see cref="ProjectFilterPurpose.EditableTexts"/> and
    /// <see cref="ProjectFilterPurpose.DeleteSource"/> — scripture projects further
    /// restricted to <see cref="ProjectSummary.IsEditableTarget"/>. DeleteSource uses the same
    /// predicate; the admin-on-shared-project check is enforced separately at the
    /// wire-layer call site (see CAP-005).
    /// </summary>
    private static ProjectListResult BuildEditableScriptureProjectList() =>
        ToProjectListResult(EnumerateScriptureProjects().Where(ProjectSummary.IsEditableTarget));

    /// <summary>
    /// Delegation seam for <see cref="ProjectFilterPurpose.CopyDestination"/>. Validates
    /// that a source project type was supplied, then delegates into CAP-008's
    /// <see cref="CopyBooksOrchestrator.GetToProjectFilterProjects"/> so the BHV-603/606
    /// decision tree has exactly one production implementation. The incoming wire string
    /// is wrapped in <see cref="Enum{ProjectType}"/> (PT9-compatible) and dispatched by
    /// <c>InternalValue</c> equality.
    /// </summary>
    private static ProjectListResult BuildCopyDestinationProjectList(string? sourceProjectType)
    {
        if (string.IsNullOrEmpty(sourceProjectType))
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                MissingSourceProjectTypeKey
            );
        var fromType = new Enum<ProjectType>(sourceProjectType);
        return CopyBooksOrchestrator.GetToProjectFilterProjects(fromType);
    }

    /// <summary>
    /// Materialises a <see cref="ScrText"/> sequence into a <see cref="ProjectListResult"/>
    /// by mapping each entry through <see cref="ProjectSummary.FromScrText"/>. Shared by the scripture
    /// and editable-scripture build paths so the mapping shape is expressed once.
    /// </summary>
    private static ProjectListResult ToProjectListResult(IEnumerable<ScrText> scrTexts) =>
        new(scrTexts.Select(ProjectSummary.FromScrText).ToList());

    /// <summary>
    /// Enumerates all scripture-type projects from <see cref="ScrTextCollection"/>.
    /// Matches PT9 <c>ScrTextComboBox.LoadAllScripture()</c>:
    /// <c>scrText.Settings.TranslationInfo.Type.IsScripture()</c>.
    /// </summary>
    /// <remarks>
    /// TODO(future): candidate for unification with
    /// <c>LocalParatextProjects.GetScrTexts</c> once a shared scripture-project
    /// enumeration helper exists. Kept local here to avoid cross-service coupling
    /// during the initial CAP-011 port.
    /// </remarks>
    private static IEnumerable<ScrText> EnumerateScriptureProjects() =>
        ScrTextCollection
            .ScrTexts(IncludeProjects.ScriptureOnly)
            .Where(scrText => scrText.Settings.TranslationInfo.Type.IsScripture());
}
