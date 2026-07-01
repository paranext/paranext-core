using SIL.Scripture;
using static Paranext.DataProvider.NetworkObjects.Documentation.ExperimentalMethodDocumentation;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// PAPI command that converts a Scripture reference between two projects' versifications. Hosted as a
/// project-agnostic command (not a per-project data provider) because it takes both project IDs.
/// </summary>
internal class VersificationConversionService(PapiClient papiClient)
{
    protected PapiClient PapiClient { get; } = papiClient;

    public async Task InitializeAsync()
    {
        await PapiClient.RegisterRequestHandlerAsync(
            "command:platformScripture.mapVerseRefBetweenProjects",
            MapVerseRefBetweenProjects,
            null,
            Create(
                "Converts a Scripture reference from a source project's versification into a target "
                    + "project's versification. Best-effort: if the source frame is unknown (null "
                    + "sourceProjectId) or either project's versification cannot be resolved (e.g. not "
                    + "a Scripture project), the reference is returned unchanged rather than throwing. "
                    + "Unmapped verses are returned unchanged; segments are preserved.",
                [
                    Param("verseRef", "The Scripture reference to convert.", "object"),
                    Param(
                        "sourceProjectId",
                        "Project whose versification the reference is currently in; null = unknown "
                            + "frame (returned unchanged, NOT assumed English).",
                        "string"
                    ),
                    Param(
                        "targetProjectId",
                        "Project whose versification to convert into.",
                        "string"
                    ),
                ],
                ResultOf(
                    "object",
                    "The reference converted into the target project's versification, or unchanged "
                        + "when it could not be converted."
                )
            )
        );
    }

    /// <summary>
    /// Converts <paramref name="verseRef"/> from <paramref name="sourceProjectId"/>'s versification
    /// into <paramref name="targetProjectId"/>'s versification. Best-effort and display-oriented: a
    /// <c>null</c> <paramref name="sourceProjectId"/> means the source frame is unknown, and if either
    /// project's versification cannot be resolved (e.g. not a Scripture project) the reference is
    /// returned unchanged rather than thrown. This keeps a caller from having to blocklist a project
    /// on a transient or structural failure — the only useful fallback is the raw reference, which is
    /// exactly what this returns.
    /// </summary>
    public VerseRef MapVerseRefBetweenProjects(
        VerseRef verseRef,
        string? sourceProjectId,
        string targetProjectId
    )
    {
        // Unknown source frame (null) is NOT assumed to be English: converting a reference whose
        // versification we don't actually know would mis-frame it. Pass it through unchanged instead.
        var sourceVers = sourceProjectId is null ? null : TryGetVersification(sourceProjectId);
        var targetVers = TryGetVersification(targetProjectId);
        if (sourceVers is null || targetVers is null)
            return verseRef;

        var working = verseRef; // VerseRef is a struct; copies by value
        working.Versification = sourceVers; // ground the source frame in data
        // VerseRef.ChangeVersification already dispatches to ChangeVersificationWithRanges internally
        // when the ref HasMultiple (libpalaso VerseRef.cs), so a single call handles both cases.
        working.ChangeVersification(targetVers);
        return working;
    }

    /// <summary>
    /// Resolves a project's versification, or returns <c>null</c> when the project cannot be resolved
    /// (e.g. it is not a Scripture project or is not currently loaded) so callers can fall back to
    /// returning the reference unconverted.
    /// </summary>
    private static ScrVers? TryGetVersification(string projectId)
    {
        try
        {
            return LocalParatextProjects.GetParatextProject(projectId).Settings.Versification;
        }
        catch (Exception)
        {
            return null;
        }
    }
}
