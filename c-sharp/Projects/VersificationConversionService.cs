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
                    + "project's versification. Pass null for sourceProjectId to treat the reference "
                    + "as canonical English. Unmapped verses are returned unchanged; segments are preserved.",
                [
                    Param("verseRef", "The Scripture reference to convert.", "object"),
                    Param(
                        "sourceProjectId",
                        "Project whose versification the reference is currently in; null = English.",
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
                    "The reference converted into the target project's versification."
                )
            )
        );
    }

    /// <summary>
    /// Converts <paramref name="verseRef"/> from <paramref name="sourceProjectId"/>'s versification
    /// (null = canonical English) into <paramref name="targetProjectId"/>'s versification.
    /// </summary>
    public VerseRef MapVerseRefBetweenProjects(
        VerseRef verseRef,
        string? sourceProjectId,
        string targetProjectId
    )
    {
        var sourceVers = sourceProjectId is null
            ? new ScrVers(ScrVersType.English)
            : LocalParatextProjects.GetParatextProject(sourceProjectId).Settings.Versification;
        var targetVers = LocalParatextProjects
            .GetParatextProject(targetProjectId)
            .Settings.Versification;

        var working = verseRef; // VerseRef is a struct; copies by value
        working.Versification = sourceVers; // ground the source frame in data
        // VerseRef.ChangeVersification already dispatches to ChangeVersificationWithRanges internally
        // when the ref HasMultiple (libpalaso VerseRef.cs), so a single call handles both cases.
        working.ChangeVersification(targetVers);
        return working;
    }
}
