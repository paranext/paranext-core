using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for determining the rendering status of linked terms against
/// a tracked project's Biblical Terms. Returns one of 12 status codes.
///
/// Contract: Section 4.9 GetTermRenderingStatus (data-contracts.md)
/// Behaviors: BHV-404, BHV-111 (IMarbleDataAccess), BHV-112 (IMarbleWindow)
/// Extraction: EXT-023 (Term Rendering Status Determination)
///
/// STUB: This is a stub created by the TDD test writer. The implementer
/// agent will fill in the actual logic.
/// </summary>
public class TermRenderingStatusService
{
    // =====================================================================
    // Test seams: Static delegates for test fixture injection
    // =====================================================================

    /// <summary>
    /// Test seam: Looks up the rendering status for a term.
    /// Returns (statusCode, foundRendering, hasRendering, errorCode, errorMessage).
    /// If errorCode is non-null, the lookup failed.
    /// </summary>
    public static Func<
        string?, // trackedProjectId
        string, // lemma
        VerseRef, // verseRef
        (
            TermRenderingStatusCode StatusCode,
            string? FoundRendering,
            bool HasRendering,
            string? ErrorCode,
            string? ErrorMessage
        )
    >? TestTermLookup;

    /// <summary>
    /// Test seam: Returns list of projects that can be tracked.
    /// </summary>
    public static Func<(string Name, string Id, bool IsResource)[]>? TestGetTrackableProjects;

    /// <summary>
    /// Test seam: Simulates setting a tracked project.
    /// Returns true if successful, false if project not found.
    /// </summary>
    public static Func<string, bool>? TestSetTrackedProject;

    /// <summary>
    /// Test seam: Returns whether Marble data is available.
    /// </summary>
    public static Func<bool>? TestHaveMarbleData;

    /// <summary>
    /// Test seam: Returns available gloss languages.
    /// </summary>
    public static Func<IReadOnlyList<string>>? TestAvailableGlossLanguages;

    /// <summary>
    /// Test seam: Finds localized glosses for a term.
    /// </summary>
    public static Func<string, string, IEnumerable<string>>? TestFindLocalizedGlossesForTerm;

    // =====================================================================
    // State
    // =====================================================================

    private string? _trackedProjectId;

    /// <summary>
    /// Whether a tracked project is currently set.
    /// BHV-112: IMarbleWindow interface contract.
    /// </summary>
    public bool HasTrackedProject => _trackedProjectId != null;

    /// <summary>
    /// The ID of the currently tracked project, or null.
    /// BHV-112: IMarbleWindow.TrackedProject.
    /// </summary>
    public string? TrackedProjectId => _trackedProjectId;

    /// <summary>
    /// BHV-111: IMarbleDataAccess.HaveMarbleData.
    /// </summary>
    public bool HaveMarbleData => TestHaveMarbleData?.Invoke() ?? false;

    /// <summary>
    /// BHV-111: IMarbleDataAccess.AvailableGlossLanguages.
    /// </summary>
    public IReadOnlyList<string> AvailableGlossLanguages =>
        TestAvailableGlossLanguages?.Invoke() ?? Array.Empty<string>();

    // =====================================================================
    // Public API
    // =====================================================================

    /// <summary>
    /// Determines the rendering status of a linked term against a tracked
    /// project's Biblical Terms.
    ///
    /// Contract: Section 4.9 GetTermRenderingStatus
    /// </summary>
    public Task<TermRenderingStatusResult> GetTermRenderingStatusAsync(
        TermRenderingStatusInput input,
        CancellationToken ct
    )
    {
        ct.ThrowIfCancellationRequested();

        // TODO: Implement the 12-code decision tree (EXT-023)
        // This stub delegates to the test seam if available,
        // otherwise throws NotImplementedException.

        if (TestTermLookup != null)
        {
            var (statusCode, foundRendering, hasRendering, errorCode, errorMessage) =
                TestTermLookup(input.TrackedProjectId, input.Link.Lemma, input.VerseRef);

            if (errorCode != null)
            {
                return Task.FromResult(
                    new TermRenderingStatusResult(
                        Success: false,
                        StatusCode: null,
                        FoundRendering: null,
                        HasRendering: null,
                        CssClass: null,
                        Error: new ErrorInfo(errorCode, errorMessage ?? "Unknown error")
                    )
                );
            }

            return Task.FromResult(
                new TermRenderingStatusResult(
                    Success: true,
                    StatusCode: statusCode,
                    FoundRendering: foundRendering,
                    HasRendering: hasRendering,
                    CssClass: GetCssClassForStatus(statusCode),
                    Error: null
                )
            );
        }

        throw new NotImplementedException(
            "TermRenderingStatusService.GetTermRenderingStatusAsync not yet implemented"
        );
    }

    /// <summary>
    /// Returns the CSS class for a given status code.
    /// Found-family -> "showfound", Missing-family -> "showmissing",
    /// Neutral -> null.
    ///
    /// Behavior: BHV-404, GM-025
    /// </summary>
    public static string? GetCssClassForStatus(TermRenderingStatusCode statusCode)
    {
        return statusCode switch
        {
            TermRenderingStatusCode.Found => "showfound",
            TermRenderingStatusCode.FoundInVerse => "showfound",
            TermRenderingStatusCode.FoundElsewhere => "showfound",
            TermRenderingStatusCode.GuessFound => "showfound",
            TermRenderingStatusCode.Missing => "showmissing",
            TermRenderingStatusCode.MissingInVerse => "showmissing",
            TermRenderingStatusCode.MissingElsewhere => "showmissing",
            TermRenderingStatusCode.GuessMissing => "showmissing",
            TermRenderingStatusCode.Denied => "showmissing",
            _ => null,
        };
    }

    /// <summary>
    /// Returns the CSS classes that should be applied based on highlight flags.
    ///
    /// Behavior: BHV-404, GM-025
    /// </summary>
    public static IReadOnlyList<string> GetHighlightCssClasses(HighlightFlags flags)
    {
        var classes = new List<string>();
        if (flags.ResearchTerms)
            classes.Add("showeverylink");
        if (flags.Found)
            classes.Add("showfound");
        if (flags.Missing)
            classes.Add("showmissing");
        return classes;
    }

    /// <summary>
    /// Returns the list of projects that can be tracked (non-resource projects).
    ///
    /// Behavior: BHV-404, TS-131
    /// </summary>
    public (string Name, string Id, bool IsResource)[] GetTrackableProjects()
    {
        if (TestGetTrackableProjects != null)
            return TestGetTrackableProjects();

        throw new NotImplementedException(
            "TermRenderingStatusService.GetTrackableProjects not yet implemented"
        );
    }

    /// <summary>
    /// Sets the tracked project and loads BiblicalTerms data.
    ///
    /// Behavior: BHV-404, TS-132
    /// </summary>
    public Task<TermRenderingStatusResult> SetTrackedProjectAsync(
        string projectId,
        CancellationToken ct
    )
    {
        ct.ThrowIfCancellationRequested();

        if (TestSetTrackedProject != null)
        {
            var success = TestSetTrackedProject(projectId);
            if (success)
            {
                _trackedProjectId = projectId;
                return Task.FromResult(
                    new TermRenderingStatusResult(
                        Success: true,
                        StatusCode: null,
                        FoundRendering: null,
                        HasRendering: null,
                        CssClass: null,
                        Error: null
                    )
                );
            }
            return Task.FromResult(
                new TermRenderingStatusResult(
                    Success: false,
                    StatusCode: null,
                    FoundRendering: null,
                    HasRendering: null,
                    CssClass: null,
                    Error: new ErrorInfo("NOT_FOUND", $"Project '{projectId}' not found")
                )
            );
        }

        throw new NotImplementedException(
            "TermRenderingStatusService.SetTrackedProjectAsync not yet implemented"
        );
    }

    /// <summary>
    /// Clears the tracked project and all tracking state.
    ///
    /// Behavior: BHV-404, TS-133
    /// </summary>
    public void ClearTrackedProject()
    {
        _trackedProjectId = null;
    }

    /// <summary>
    /// Called when the tracked project is removed from ScrTextCollection.
    /// Silently clears tracking state.
    ///
    /// Behavior: BHV-404, TS-134
    /// </summary>
    public void OnTrackedProjectRemoved()
    {
        ClearTrackedProject();
    }

    /// <summary>
    /// BHV-111: IMarbleDataAccess.FindLocalizedGlossesForTerm.
    /// </summary>
    public IEnumerable<string> FindLocalizedGlossesForTerm(string term, string bestLangId)
    {
        if (TestFindLocalizedGlossesForTerm != null)
            return TestFindLocalizedGlossesForTerm(term, bestLangId);

        throw new NotImplementedException(
            "TermRenderingStatusService.FindLocalizedGlossesForTerm not yet implemented"
        );
    }

    /// <summary>
    /// INV-015: Checks if the reference overlap meets the >25% threshold.
    /// </summary>
    public bool IsReferenceMatch(int totalReferences, int overlappingReferences)
    {
        if (totalReferences <= 0)
            return false;

        double ratio = (double)overlappingReferences / totalReferences;
        return ratio > 0.25;
    }
}
