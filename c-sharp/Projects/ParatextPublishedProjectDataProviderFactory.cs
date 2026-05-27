using System.Collections.Concurrent;
using System.Text.Json;
using Paranext.DataProvider.Services;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// PDP factory dedicated to <em>published</em> Paratext projects - those backed by
/// <c>ResourceScrText</c> (loaded from <c>.p8z</c> DBL / biblical resource files) or
/// <c>JoinedScrText</c> (joined-resource views). These are identified by
/// <c>ScrText.IsResourceProject == true</c>, the same flag <c>platform.isPublished</c> is computed
/// from (see PR #2333). The factory advertises every projectInterface the regular factory does
/// EXCEPT <c>legacyCommentManager.comments</c>, because:
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
/// <strong>This factory is specifically for published projects (<c>IsResourceProject</c>).</strong>
/// Other PT9 project types that <em>also</em> have restricted comment support are intentionally
/// NOT served here:
/// </para>
/// <list type="bullet">
///   <item><strong>Study Bible Additions (<c>IsStudyBibleAdditions</c>):</strong> can host real
///     comments. PT9's <c>ParatextDataExtensions.CanAddNotes</c> takes an <c>allowInSba</c>
///     escape parameter, used by <c>WordListForm.cs</c> (lines 950, 2205) to create spelling
///     notes that flow through the normal <c>CommentManager</c> infrastructure. Stays on the
///     regular factory; the runtime guard at <c>ParatextProjectDataProvider.cs</c> line 654
///     remains load-bearing for the general-creation path.</item>
///   <item><strong><c>ProjectType.TransliterationWithEncoder</c>:</strong> has no escape hatch in
///     PT9's <c>CanAddNotes</c>, but we lack certainty about read-only scenarios (a project
///     converted to this type from another could still hold existing threads someone needs to
///     read). Stays on the regular factory; the runtime guard at
///     <c>ParatextProjectDataProvider.cs</c> line 660 remains load-bearing for creation.</item>
///   <item><strong>Note-only project types</strong> (<c>ConsultantNotes</c>,
///     <c>GlobalConsultantNotes</c>, <c>GlobalAnthropologyNotes</c>): filtered out before any
///     factory sees them by <c>ScrTextCollection.ScrTexts(IncludeProjects.ScriptureOnly)</c>.
///     Not served by any factory today; out of scope for this PR.</item>
/// </list>
///
/// <para>
/// <strong>Future restricted-interface project types should get their own dedicated PDPF</strong>
/// rather than being folded in here. This factory's contract is specifically "the data shape
/// published projects (<c>ResourceScrText</c> / <c>JoinedScrText</c>) can support" - broadening it
/// to cover other restriction patterns would re-create the dishonest-interface problem this
/// factory exists to fix.
/// </para>
/// </summary>
internal class ParatextPublishedProjectDataProviderFactory : ProjectDataProviderFactory
{
    internal const string PDPF_NAME = "ParatextPublished";
    private readonly LocalParatextProjects _paratextProjects;
    private readonly ConcurrentDictionary<string, ParatextProjectDataProvider> _pdpMap = new();
    private readonly object _creationLock = new();
    private readonly Random _random = new((int)DateTime.Now.Ticks);

    public ParatextPublishedProjectDataProviderFactory(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects
    )
        : base(
            LocalParatextProjects.GetParatextProjectInterfaces(isPublished: true),
            PDPF_NAME,
            papiClient
        )
    {
        _paratextProjects = paratextProjects;
    }

    protected override Task StartFactoryAsync()
    {
        _paratextProjects.Initialize();
        return Task.CompletedTask;
    }

    protected override List<ProjectMetadata>? GetAvailableProjects(JsonElement _ignore)
    {
        return _paratextProjects
            .GetAvailablePublishedProjectDetails()
            .Select(pd => pd.Metadata)
            .ToList();
    }

    public override string GetProjectDataProviderID(string projectID)
    {
        projectID = projectID.ToUpperInvariant();

        if (_pdpMap.TryGetValue(projectID, out var existingPdp))
            return existingPdp.DataProviderName;

        lock (_creationLock)
        {
            if (_pdpMap.TryGetValue(projectID, out var existingPdpInLock))
                return existingPdpInLock.DataProviderName;

            ProjectDetails details;
            try
            {
                details = _paratextProjects.GetProjectDetails(projectID);
            }
            catch (KeyNotFoundException)
            {
                throw new KeyNotFoundException("Unknown project ID: " + projectID);
            }

            // Unpublished projects belong to ParatextProjectDataProviderFactory. Reject them here
            // (identified by the presence of legacyCommentManager.comments in their advertised
            // interfaces) so they don't accidentally get served by the published factory.
            if (details.Metadata.ProjectInterfaces.Contains(ProjectInterfaces.LEGACY_COMMENT))
            {
                throw new KeyNotFoundException(
                    $"Project {projectID} is not published and cannot be served by this factory"
                );
            }

            var name = new string(
                Enumerable.Range(0, 30).Select(_ => (char)_random.Next(65, 90)).ToArray()
            );

            var newPdp = new ParatextProjectDataProvider(
                name,
                PapiClient,
                details,
                _paratextProjects
            );
            if (!_pdpMap.TryAdd(projectID, newPdp))
                throw new InvalidOperationException("Internal error adding project data provider");

            ThreadingUtils.RunTask(
                newPdp.RegisterDataProviderAsync(),
                $"Register published PDP {newPdp.DataProviderName} for project {details.Name}",
                ThreadingUtils.DefaultTimeout
            );
            return newPdp.DataProviderName;
        }
    }

    /// <summary>
    /// Get an existing PDP if it exists for a project id. Symmetrical with
    /// <see cref="ParatextProjectDataProviderFactory.GetExistingProjectDataProvider"/> so the
    /// unpublished-side callers (ManageBooksService, ParatextProjectSendReceiveService) have a
    /// parallel hook if they ever need one - but published projects don't currently flow through
    /// send/receive or manage-books, so no caller change is required.
    /// </summary>
    public ParatextProjectDataProvider? GetExistingProjectDataProvider(string projectID)
    {
        projectID = projectID.ToUpperInvariant();

        if (_pdpMap.TryGetValue(projectID, out var existingPdp))
            return existingPdp;
        return null;
    }
}
