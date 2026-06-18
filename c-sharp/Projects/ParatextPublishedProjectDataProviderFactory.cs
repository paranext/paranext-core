using System.Text.Json;
using Paranext.DataProvider.Services;
using Paratext.Data;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// PDP factory dedicated to <em>published</em> Paratext projects (the same projects
/// <c>platform.isPublished</c> reports as true). The factory advertises every projectInterface the
/// regular factory does EXCEPT <c>legacyCommentManager.comments</c>, because:
/// <list type="bullet">
///   <item>Published projects are read-only at the storage layer -
///     <c>ResourceProjectFileManager.SetXml</c> throws
///     <c>AttemptedResourceWritingException</c> on every write, so all 12 comment wire methods
///     would be guaranteed to either throw or return empty data.</item>
///   <item>Comments are <em>technically</em> readable on these projects (the reads aren't
///     storage-blocked), but no published project format we know of ships with embedded comment
///     XML. Choosing not to advertise the interface trades a theoretical read-only capability we
///     don't believe is exercised for a wire surface that's honest about what the project can do.</item>
/// </list>
///
/// <para>
/// <strong>This factory is specifically for published projects.</strong> Other PT9 project types
/// that <em>also</em> have restricted comment support are intentionally NOT served here:
/// </para>
/// <list type="bullet">
///   <item><strong>Study Bible Additions (<c>IsStudyBibleAdditions</c>):</strong> can host real
///     comments. PT9's <c>ParatextDataExtensions.CanAddNotes</c> takes an <c>allowInSba</c>
///     escape parameter, used by <c>WordListForm</c> to create spelling notes that flow through
///     the normal <c>CommentManager</c> infrastructure. Stays on the regular factory; the
///     <c>IsStudyBibleAdditions</c> guard in
///     <see cref="ParatextProjectDataProvider"/>.<c>VerifyUserCanCreateComments</c> remains
///     load-bearing for the general-creation path.</item>
///   <item><strong><c>ProjectType.TransliterationWithEncoder</c>:</strong> has no escape hatch in
///     PT9's <c>CanAddNotes</c>, but we lack certainty about read-only scenarios (a project
///     converted to this type from another could still hold existing threads someone needs to
///     read). Stays on the regular factory; the <c>TransliterationWithEncoder</c> guard in
///     <see cref="ParatextProjectDataProvider"/>.<c>VerifyUserCanCreateComments</c> remains
///     load-bearing for creation.</item>
///   <item><strong>Note-only project types</strong> (<c>ConsultantNotes</c>,
///     <c>GlobalConsultantNotes</c>, <c>GlobalAnthropologyNotes</c>): filtered out before any
///     factory sees them by <c>ScrTextCollection.ScrTexts(IncludeProjects.ScriptureOnly)</c>.
///     Not served by any factory today; out of scope for this PR.</item>
/// </list>
///
/// <para>
/// <strong>Future restricted-interface project types should get their own dedicated PDPF</strong>
/// rather than being folded in here. This factory's contract is specifically "the data shape
/// published projects can support" - broadening it to cover other restriction patterns would
/// re-create the dishonest-interface problem this factory exists to fix.
/// </para>
/// </summary>
internal class ParatextPublishedProjectDataProviderFactory : ParatextProjectDataProviderFactoryBase
{
    internal const string PDPF_NAME = "ParatextPublished";

    public ParatextPublishedProjectDataProviderFactory(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects
    )
        : base(
            papiClient,
            paratextProjects,
            LocalParatextProjects.GetParatextProjectInterfaces(isPublished: true),
            PDPF_NAME
        ) { }

    protected override List<ProjectMetadata>? GetAvailableProjects(JsonElement _ignore)
    {
        return _paratextProjects
            .GetAvailablePublishedProjectDetails()
            .Select(pd => pd.Metadata)
            .ToList();
    }

    // Unpublished projects belong to ParatextProjectDataProviderFactory. Reject them here so they
    // don't accidentally get served by the published factory.
    protected override bool ShouldServeProject(ScrText scrText)
    {
        return scrText.IsResourceProject;
    }

    protected override string GetCrossFactoryRejectionMessage(string projectID)
    {
        return $"Project {projectID} is not published and cannot be served by this factory";
    }

    protected override string GetRegistrationTaskDescription(
        ParatextProjectDataProvider pdp,
        ProjectDetails details
    )
    {
        return $"Register published PDP {pdp.DataProviderName} for project {details.Name}";
    }
}
