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
                    + "project's versification. If the source frame is unknown (null sourceProjectId) "
                    + "the reference is returned unchanged (it is NOT assumed English). Best-effort "
                    + "and display-oriented: if a NAMED project's versification cannot be resolved "
                    + "(e.g. not a Scripture project, or still loading) or the mapping fails, this "
                    + "THROWS so the caller can fall back to the raw reference without caching a "
                    + "transient failure. Unmapped verses are returned unchanged; segments are "
                    + "preserved.",
                [
                    Param("verseRef", "The Scripture reference to convert.", "object"),
                    Param(
                        "sourceProjectId",
                        "Project whose versification the reference is currently in; null = unknown "
                            + "project (returned unchanged, NOT assumed English).",
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
    /// into <paramref name="targetProjectId"/>'s versification. Display-oriented: a <c>null</c>
    /// <paramref name="sourceProjectId"/> means the source frame is unknown, so the reference is
    /// returned unchanged (NOT assumed English). If a NAMED project's versification cannot be
    /// resolved (e.g. not a Scripture project, or still loading) or libpalaso cannot map the
    /// reference, this throws <see cref="VersificationConversionException"/> so the caller can fall
    /// back to the raw reference WITHOUT caching a transient failure as though it were a real
    /// identity conversion.
    /// </summary>
    /// <exception cref="VersificationConversionException">
    /// A named project's versification could not be resolved, or the mapping failed.
    /// </exception>
    public VerseRef MapVerseRefBetweenProjects(
        VerseRef verseRef,
        string? sourceProjectId,
        string targetProjectId
    )
    {
        // Unknown source project (null) is NOT assumed to be English: converting a reference whose
        // versification we don't actually know would mis-frame it. Pass it through unchanged instead.
        // (This is the one non-throwing "returned unchanged" path; VerseRefConverter.Write tolerates
        // the null versification such a ref carries.)
        if (sourceProjectId is null)
            return verseRef;

        // A named source or target whose versification we cannot resolve is a genuine failure, not
        // an intentional passthrough. Throw rather than returning the input unchanged: a silent
        // passthrough is indistinguishable from a real identity conversion, so the caller would cache
        // it and latch a transient failure (e.g. a still-loading project) for the whole session.
        // Throwing routes the caller to its raw-ref fallback, which does NOT cache. (Serialization of
        // a null-versification ref is handled separately by VerseRefConverter.Write's null guard —
        // that is what keeps the null-source passthrough above safe — so it is not a reason to throw
        // here.)
        var sourceVers = TryGetVersification(sourceProjectId);
        var targetVers = TryGetVersification(targetProjectId);
        if (sourceVers is null)
            throw new VersificationConversionException(
                sourceProjectId,
                targetProjectId,
                "source project versification could not be resolved"
            );
        if (targetVers is null)
            throw new VersificationConversionException(
                sourceProjectId,
                targetProjectId,
                "target project versification could not be resolved"
            );

        var working = verseRef; // VerseRef is a struct; copies by value
        working.Versification = sourceVers; // ground the source frame in data
        try
        {
            // VerseRef.ChangeVersification already dispatches to ChangeVersificationWithRanges
            // internally when the ref HasMultiple (libpalaso VerseRef.cs), so a single call handles
            // both cases.
            working.ChangeVersification(targetVers);
        }
        catch (Exception ex)
        {
            // An edge/malformed ref that libpalaso can't map is a best-effort failure. Throw so the
            // caller falls back to the raw reference (and does not cache). Name the offending ref in
            // the message so the diagnostic keeps the breadcrumb the old Console.WriteLine had.
            throw new VersificationConversionException(
                sourceProjectId,
                targetProjectId,
                $"libpalaso could not map the reference {verseRef}",
                ex
            );
        }
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
