using System.Text.RegularExpressions;
using Paratext.Data;
using Paratext.Data.Terms;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for determining the rendering status of linked terms against
/// a tracked project's Biblical Terms. Returns one of 12 status codes.
///
/// Contract: Section 4.9 GetTermRenderingStatus (data-contracts.md)
/// Behaviors: BHV-404, BHV-111 (IMarbleDataAccess), BHV-112 (IMarbleWindow)
/// Extraction: EXT-023 (Term Rendering Status Determination)
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
    // Homonym suffix regex (compiled once for performance)
    // =====================================================================

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:3060-3162
    // Method: MarbleForm.GetTermRenderingStatus() homonym handling
    // Maps to: EXT-023
    private static readonly Regex s_homonymSuffixRegex = new(@"-\d+$", RegexOptions.Compiled);

    // =====================================================================
    // State
    // =====================================================================

    private string? _trackedProjectId;
    private ScrText? _trackedScrText;
    private BiblicalTerms? _biblicalTerms;
    private TermRenderings? _termRenderings;

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

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:3060-3162
    // Method: MarbleForm.GetTermRenderingStatus()
    // Maps to: EXT-023
    //
    // EXPLANATION:
    // This method implements the 12-code rendering status decision tree:
    // 1. If no tracked project (trackedProjectId is null) -> NoTrackedProject
    // 2. If tracked project not found in ScrTextCollection -> NOT_FOUND error
    // 3. If Biblical Terms data not loaded for project -> INVALID_STATE error
    // 4. Strip homonym suffix from lemma (e.g., "agapao-2" -> "agapao")
    // 5. Look up term in project's Biblical Terms list
    // 6. If term not in list -> TermNotInProject
    // 7. Check rendering status via TermRenderings:
    //    - Found/FoundInVerse/FoundElsewhere (rendering exists and found)
    //    - Missing/MissingInVerse/MissingElsewhere (no rendering found)
    //    - GuessFound/GuessMissing (guessed rendering)
    //    - Denied (rendering explicitly denied)
    //    - Unknown (status cannot be determined)
    // 8. Apply CSS class: showfound for found-family, showmissing for missing-family
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

        // === PORTED FROM PT9 ===
        // Source: PT9/Paratext/Marble/MarbleForm.cs:3060-3162
        // Method: MarbleForm.GetTermRenderingStatus()
        // Maps to: EXT-023
        return Task.FromResult(DetermineRenderingStatus(input));
    }

    /// <summary>
    /// Returns the CSS class for a given status code.
    /// Found-family -> "showfound", Missing-family -> "showmissing",
    /// Neutral -> null.
    ///
    /// Behavior: BHV-404, GM-025
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:3060-3162
    // Method: MarbleForm CSS class assignment logic
    // Maps to: EXT-023
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
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs highlight toggle logic
    // Method: MarbleForm toggle button CSS class assignment
    // Maps to: BHV-404
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
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:2338-2391
    // Method: MarbleForm.PopulateTrackedProjectDropDown()
    // Maps to: EXT-026
    public (string Name, string Id, bool IsResource)[] GetTrackableProjects()
    {
        if (TestGetTrackableProjects != null)
            return TestGetTrackableProjects();

        try
        {
            return ScrTextCollection
                .ScrTexts(IncludeProjects.ScriptureOnly)
                .Where(st => !st.Settings.IsMarbleResource)
                .Select(st => (Name: st.Name, Id: st.Name, IsResource: false))
                .ToArray();
        }
        catch
        {
            return Array.Empty<(string Name, string Id, bool IsResource)>();
        }
    }

    /// <summary>
    /// Sets the tracked project and loads BiblicalTerms data.
    ///
    /// Behavior: BHV-404, TS-132
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:2338-2391
    // Method: MarbleForm.SetTrackedProject()
    // Maps to: EXT-026
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

        return Task.FromResult(LoadTrackedProject(projectId));
    }

    /// <summary>
    /// Clears the tracked project and all tracking state.
    ///
    /// Behavior: BHV-404, TS-133
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:2338-2391
    // Method: MarbleForm.ClearTrackedProject()
    // Maps to: EXT-026
    public void ClearTrackedProject()
    {
        _trackedProjectId = null;
        _trackedScrText = null;
        _biblicalTerms = null;
        _termRenderings = null;
    }

    /// <summary>
    /// Called when the tracked project is removed from ScrTextCollection.
    /// Silently clears tracking state.
    ///
    /// Behavior: BHV-404, TS-134
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs tracked project removal handling
    // Method: MarbleForm change listener for ScrTextCollection
    // Maps to: EXT-026
    public void OnTrackedProjectRemoved()
    {
        ClearTrackedProject();
    }

    /// <summary>
    /// BHV-111: IMarbleDataAccess.FindLocalizedGlossesForTerm.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs
    // Method: MarbleDataAccess.FindLocalizedGlossesForTerm()
    // Maps to: BHV-111
    public IEnumerable<string> FindLocalizedGlossesForTerm(string term, string bestLangId)
    {
        if (TestFindLocalizedGlossesForTerm != null)
            return TestFindLocalizedGlossesForTerm(term, bestLangId);

        // Production path: use BiblicalTermsLocalizations from ParatextData.
        // The Term.Gloss and Term.LocalGloss properties contain gloss data.
        // If BiblicalTerms is loaded, look up the term and return its glosses.
        try
        {
            if (_biblicalTerms != null)
            {
                var matchingTerm = _biblicalTerms
                    .Terms.Where(t => t.Lemma == term)
                    .FirstOrDefault();
                if (matchingTerm != null)
                {
                    var glosses = new List<string>();
                    if (!string.IsNullOrWhiteSpace(matchingTerm.LocalGloss))
                        glosses.Add(matchingTerm.LocalGloss);
                    else if (!string.IsNullOrWhiteSpace(matchingTerm.Gloss))
                        glosses.Add(matchingTerm.Gloss);
                    return glosses;
                }
            }
        }
        catch
        {
            // Graceful degradation
        }

        return Array.Empty<string>();
    }

    /// <summary>
    /// INV-015: Checks if the reference overlap meets the >25% threshold.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/ErToBtMapping.cs reference overlap logic
    // Method: Reference matching threshold check
    // Maps to: INV-015
    public bool IsReferenceMatch(int totalReferences, int overlappingReferences)
    {
        if (totalReferences <= 0)
            return false;

        double ratio = (double)overlappingReferences / totalReferences;
        return ratio > 0.25;
    }

    /// <summary>
    /// Strips the trailing "-N" homonym suffix from a lemma, where N is
    /// one or more digits. E.g., "agapao-2" becomes "agapao".
    /// Non-homonym terms are returned unchanged.
    ///
    /// Behavior: BHV-404, TS-093, GM-023
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:3060-3162
    // Method: MarbleForm.GetTermRenderingStatus() homonym stripping
    // Maps to: EXT-023
    public static string StripHomonymSuffix(string lemma)
    {
        var match = s_homonymSuffixRegex.Match(lemma);
        return match.Success ? lemma[..match.Index] : lemma;
    }

    // =====================================================================
    // Private Implementation
    // =====================================================================

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:3060-3162
    // Method: MarbleForm.GetTermRenderingStatus()
    // Maps to: EXT-023
    //
    // EXPLANATION:
    // Production code path for the 12-code decision tree.
    // Uses ParatextData BiblicalTerms and TermRenderings to determine
    // the rendering status of a term in a tracked project.
    // Steps:
    // 1. No tracked project -> NoTrackedProject
    // 2. Validate tracked project exists in ScrTextCollection
    // 3. Validate Biblical Terms data is loaded
    // 4. Strip homonym suffix from lemma
    // 5. Look up term in Biblical Terms list using GetMatchingTerm
    // 6. Check rendering status (found/missing/guessed/denied)
    // 7. Return status code with CSS class
    private TermRenderingStatusResult DetermineRenderingStatus(TermRenderingStatusInput input)
    {
        // Step 1: No tracked project
        if (input.TrackedProjectId == null)
        {
            return new TermRenderingStatusResult(
                Success: true,
                StatusCode: TermRenderingStatusCode.NoTrackedProject,
                FoundRendering: null,
                HasRendering: false,
                CssClass: null,
                Error: null
            );
        }

        // Step 2: Validate tracked project exists
        if (_trackedScrText == null || _trackedProjectId != input.TrackedProjectId)
        {
            try
            {
                var scrText = ScrTextCollection
                    .ScrTexts(IncludeProjects.ScriptureOnly)
                    .FirstOrDefault(st => st.Name == input.TrackedProjectId);

                if (scrText == null)
                {
                    return new TermRenderingStatusResult(
                        Success: false,
                        StatusCode: null,
                        FoundRendering: null,
                        HasRendering: null,
                        CssClass: null,
                        Error: new ErrorInfo(
                            "NOT_FOUND",
                            $"Tracked project '{input.TrackedProjectId}' not found"
                        )
                    );
                }
            }
            catch
            {
                return new TermRenderingStatusResult(
                    Success: false,
                    StatusCode: null,
                    FoundRendering: null,
                    HasRendering: null,
                    CssClass: null,
                    Error: new ErrorInfo(
                        "NOT_FOUND",
                        $"Tracked project '{input.TrackedProjectId}' not found"
                    )
                );
            }
        }

        // Step 3: Validate Biblical Terms data is loaded
        if (_biblicalTerms == null || _termRenderings == null)
        {
            return new TermRenderingStatusResult(
                Success: false,
                StatusCode: null,
                FoundRendering: null,
                HasRendering: null,
                CssClass: null,
                Error: new ErrorInfo(
                    "INVALID_STATE",
                    "Biblical Terms data not available for project"
                )
            );
        }

        // Step 4: Strip homonym suffix
        var baseLemma = StripHomonymSuffix(input.Link.Lemma);

        // Step 5: Look up term in Biblical Terms list
        try
        {
            var foundTerm = false;
            var term = _biblicalTerms.GetMatchingTerm(
                baseLemma,
                input.VerseRef,
                out foundTerm,
                lemmaIsFromER: true
            );

            if (term == null || !foundTerm)
            {
                return new TermRenderingStatusResult(
                    Success: true,
                    StatusCode: TermRenderingStatusCode.TermNotInProject,
                    FoundRendering: null,
                    HasRendering: false,
                    CssClass: null,
                    Error: null
                );
            }

            // Step 6: Check rendering status
            var rendering = _termRenderings.GetRendering(term.Id);
            if (rendering == null || !_termRenderings.HasEntry(term.Id))
            {
                var statusCode = TermRenderingStatusCode.Missing;
                return new TermRenderingStatusResult(
                    Success: true,
                    StatusCode: statusCode,
                    FoundRendering: null,
                    HasRendering: false,
                    CssClass: GetCssClassForStatus(statusCode),
                    Error: null
                );
            }

            var hasRendering = rendering.HasRenderingsDefined;

            // Check for denied renderings
            if (rendering.Denials != null && rendering.Denials.Count > 0)
            {
                return new TermRenderingStatusResult(
                    Success: true,
                    StatusCode: TermRenderingStatusCode.Denied,
                    FoundRendering: null,
                    HasRendering: hasRendering,
                    CssClass: GetCssClassForStatus(TermRenderingStatusCode.Denied),
                    Error: null
                );
            }

            if (!hasRendering)
            {
                // Check if rendering is guessed
                if (rendering.Guess)
                {
                    return new TermRenderingStatusResult(
                        Success: true,
                        StatusCode: TermRenderingStatusCode.GuessMissing,
                        FoundRendering: null,
                        HasRendering: false,
                        CssClass: GetCssClassForStatus(TermRenderingStatusCode.GuessMissing),
                        Error: null
                    );
                }

                return new TermRenderingStatusResult(
                    Success: true,
                    StatusCode: TermRenderingStatusCode.Missing,
                    FoundRendering: null,
                    HasRendering: false,
                    CssClass: GetCssClassForStatus(TermRenderingStatusCode.Missing),
                    Error: null
                );
            }

            // Has rendering - check if found in verse text
            var foundInVerse = false;
            string? renderingText = null;

            try
            {
                // Get all rendering entries as text
                var entries = rendering.RenderingsEntries?.ToList();
                if (entries != null && entries.Count > 0)
                {
                    renderingText = entries.First();
                }

                if (!string.IsNullOrEmpty(renderingText) && _trackedScrText != null)
                {
                    var verseText = _trackedScrText.GetVerseText(input.VerseRef);
                    if (!string.IsNullOrEmpty(verseText))
                    {
                        foundInVerse = verseText.Contains(
                            renderingText,
                            StringComparison.OrdinalIgnoreCase
                        );
                    }
                }
            }
            catch
            {
                // If we can't read verse text, fall back to generic Found
            }

            if (rendering.Guess)
            {
                var guessStatus = foundInVerse
                    ? TermRenderingStatusCode.GuessFound
                    : TermRenderingStatusCode.GuessMissing;
                return new TermRenderingStatusResult(
                    Success: true,
                    StatusCode: guessStatus,
                    FoundRendering: foundInVerse ? renderingText : null,
                    HasRendering: hasRendering,
                    CssClass: GetCssClassForStatus(guessStatus),
                    Error: null
                );
            }

            var finalStatus = foundInVerse
                ? TermRenderingStatusCode.Found
                : TermRenderingStatusCode.Missing;
            return new TermRenderingStatusResult(
                Success: true,
                StatusCode: finalStatus,
                FoundRendering: foundInVerse ? renderingText : null,
                HasRendering: hasRendering,
                CssClass: GetCssClassForStatus(finalStatus),
                Error: null
            );
        }
        catch
        {
            return new TermRenderingStatusResult(
                Success: true,
                StatusCode: TermRenderingStatusCode.Unknown,
                FoundRendering: null,
                HasRendering: false,
                CssClass: null,
                Error: null
            );
        }
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:2338-2391
    // Method: MarbleForm.SetTrackedProject()
    // Maps to: EXT-026
    //
    // EXPLANATION:
    // Loads a tracked project from ScrTextCollection and initializes
    // BiblicalTerms and TermRenderings for it. This is the production
    // code path when the test seam is null.
    private TermRenderingStatusResult LoadTrackedProject(string projectId)
    {
        try
        {
            var scrText = ScrTextCollection
                .ScrTexts(IncludeProjects.ScriptureOnly)
                .FirstOrDefault(st => st.Name == projectId);

            if (scrText == null)
            {
                return new TermRenderingStatusResult(
                    Success: false,
                    StatusCode: null,
                    FoundRendering: null,
                    HasRendering: null,
                    CssClass: null,
                    Error: new ErrorInfo("NOT_FOUND", $"Project '{projectId}' not found")
                );
            }

            _trackedScrText = scrText;
            _trackedProjectId = projectId;

            // Load Biblical Terms and TermRenderings for the project
            _biblicalTerms = BiblicalTerms.GetProjectBiblicalTerms(scrText);
            _termRenderings = TermRenderings.GetTermRenderings(scrText);

            return new TermRenderingStatusResult(
                Success: true,
                StatusCode: null,
                FoundRendering: null,
                HasRendering: null,
                CssClass: null,
                Error: null
            );
        }
        catch (Exception ex)
        {
            _trackedProjectId = null;
            _trackedScrText = null;
            _biblicalTerms = null;
            _termRenderings = null;

            return new TermRenderingStatusResult(
                Success: false,
                StatusCode: null,
                FoundRendering: null,
                HasRendering: null,
                CssClass: null,
                Error: new ErrorInfo("INVALID_STATE", $"Failed to load project: {ex.Message}")
            );
        }
    }
}
