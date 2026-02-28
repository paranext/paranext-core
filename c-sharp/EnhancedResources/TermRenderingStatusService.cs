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
    // Constants and compiled regex
    // =====================================================================

    /// <summary>Regex to strip trailing "-N" homonym suffix (EXT-023).</summary>
    private static readonly Regex s_homonymSuffixRegex = new(@"-\d+$", RegexOptions.Compiled);

    private const double ReferenceMatchThreshold = 0.25;

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

    /// <summary>
    /// Determines the rendering status of a linked term against a tracked
    /// project's Biblical Terms. Implements the 12-code decision tree.
    ///
    /// Contract: Section 4.9 GetTermRenderingStatus
    /// Ported from: PT9 MarbleForm.GetTermRenderingStatus (EXT-023)
    /// </summary>
    public Task<TermRenderingStatusResult> GetTermRenderingStatusAsync(
        TermRenderingStatusInput input,
        CancellationToken ct
    )
    {
        ct.ThrowIfCancellationRequested();

        if (TestTermLookup != null)
            return Task.FromResult(ResolveViaTestSeam(input));

        return Task.FromResult(DetermineRenderingStatus(input));
    }

    /// <summary>
    /// Returns the CSS class for a given status code.
    /// Found-family returns "showfound", Missing-family returns "showmissing",
    /// Neutral returns null.
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
    /// Ported from: PT9 MarbleForm highlight toggle logic (BHV-404)
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
    /// Ported from: PT9 MarbleForm.PopulateTrackedProjectDropDown (EXT-026)
    /// </summary>
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
    /// Ported from: PT9 MarbleForm.SetTrackedProject (EXT-026)
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
                return Task.FromResult(OperationResult());
            }
            return Task.FromResult(ErrorResult("NOT_FOUND", $"Project '{projectId}' not found"));
        }

        return Task.FromResult(LoadTrackedProject(projectId));
    }

    /// <summary>
    /// Clears the tracked project and all tracking state.
    ///
    /// Behavior: BHV-404, TS-133
    /// Ported from: PT9 MarbleForm.ClearTrackedProject (EXT-026)
    /// </summary>
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
    /// Ported from: PT9 MarbleForm change listener for ScrTextCollection (EXT-026)
    /// </summary>
    public void OnTrackedProjectRemoved()
    {
        ClearTrackedProject();
    }

    /// <summary>
    /// Finds localized glosses for a term in the given language.
    ///
    /// BHV-111: IMarbleDataAccess.FindLocalizedGlossesForTerm.
    /// Ported from: PT9 MarbleDataAccess.FindLocalizedGlossesForTerm (BHV-111)
    /// </summary>
    public IEnumerable<string> FindLocalizedGlossesForTerm(string term, string bestLangId)
    {
        if (TestFindLocalizedGlossesForTerm != null)
            return TestFindLocalizedGlossesForTerm(term, bestLangId);

        try
        {
            if (_biblicalTerms != null)
            {
                var matchingTerm = _biblicalTerms.Terms.FirstOrDefault(t => t.Lemma == term);
                if (matchingTerm != null)
                {
                    if (!string.IsNullOrWhiteSpace(matchingTerm.LocalGloss))
                        return [matchingTerm.LocalGloss];
                    if (!string.IsNullOrWhiteSpace(matchingTerm.Gloss))
                        return [matchingTerm.Gloss];
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
    /// Ported from: PT9 ErToBtMapping.cs reference overlap logic (INV-015)
    /// </summary>
    public bool IsReferenceMatch(int totalReferences, int overlappingReferences)
    {
        if (totalReferences <= 0)
            return false;

        double ratio = (double)overlappingReferences / totalReferences;
        return ratio > ReferenceMatchThreshold;
    }

    /// <summary>
    /// Strips the trailing "-N" homonym suffix from a lemma, where N is
    /// one or more digits. E.g., "agapao-2" becomes "agapao".
    /// Non-homonym terms are returned unchanged.
    ///
    /// Behavior: BHV-404, TS-093, GM-023
    /// Ported from: PT9 MarbleForm.GetTermRenderingStatus homonym stripping (EXT-023)
    /// </summary>
    public static string StripHomonymSuffix(string lemma)
    {
        var match = s_homonymSuffixRegex.Match(lemma);
        return match.Success ? lemma[..match.Index] : lemma;
    }

    // =====================================================================
    // Private Implementation
    // =====================================================================

    /// <summary>
    /// Resolves a term rendering status via the test seam delegate.
    /// </summary>
    private TermRenderingStatusResult ResolveViaTestSeam(TermRenderingStatusInput input)
    {
        var (statusCode, foundRendering, hasRendering, errorCode, errorMessage) = TestTermLookup!(
            input.TrackedProjectId,
            input.Link.Lemma,
            input.VerseRef
        );

        if (errorCode != null)
            return ErrorResult(errorCode, errorMessage ?? "Unknown error");

        return StatusResult(statusCode, foundRendering, hasRendering);
    }

    /// <summary>
    /// Production code path: 12-code decision tree using ParatextData
    /// BiblicalTerms and TermRenderings.
    ///
    /// Ported from: PT9 MarbleForm.GetTermRenderingStatus (EXT-023)
    /// </summary>
    private TermRenderingStatusResult DetermineRenderingStatus(TermRenderingStatusInput input)
    {
        if (input.TrackedProjectId == null)
            return StatusResult(TermRenderingStatusCode.NoTrackedProject);

        var validationError = ValidateTrackedProject(input.TrackedProjectId);
        if (validationError != null)
            return validationError;

        if (_biblicalTerms == null || _termRenderings == null)
            return ErrorResult("INVALID_STATE", "Biblical Terms data not available for project");

        var baseLemma = StripHomonymSuffix(input.Link.Lemma);
        return LookupTermAndDetermineStatus(baseLemma, input.VerseRef);
    }

    /// <summary>
    /// Validates that the tracked project exists in ScrTextCollection.
    /// Returns an error result if invalid, or null if valid.
    /// </summary>
    private TermRenderingStatusResult? ValidateTrackedProject(string trackedProjectId)
    {
        if (_trackedScrText != null && _trackedProjectId == trackedProjectId)
            return null;

        try
        {
            var scrText = ScrTextCollection
                .ScrTexts(IncludeProjects.ScriptureOnly)
                .FirstOrDefault(st => st.Name == trackedProjectId);

            if (scrText == null)
                return ErrorResult("NOT_FOUND", $"Tracked project '{trackedProjectId}' not found");
        }
        catch
        {
            return ErrorResult("NOT_FOUND", $"Tracked project '{trackedProjectId}' not found");
        }

        return null;
    }

    /// <summary>
    /// Looks up a term in the BiblicalTerms list and determines its rendering status.
    /// </summary>
    private TermRenderingStatusResult LookupTermAndDetermineStatus(
        string baseLemma,
        VerseRef verseRef
    )
    {
        try
        {
            var foundTerm = false;
            var term = _biblicalTerms!.GetMatchingTerm(
                baseLemma,
                verseRef,
                out foundTerm,
                lemmaIsFromER: true
            );

            if (term == null || !foundTerm)
                return StatusResult(TermRenderingStatusCode.TermNotInProject);

            return EvaluateRendering(term, verseRef);
        }
        catch
        {
            return StatusResult(TermRenderingStatusCode.Unknown);
        }
    }

    /// <summary>
    /// Evaluates the rendering status of a matched term: checks for denied,
    /// guessed, found-in-verse, or missing.
    /// </summary>
    private TermRenderingStatusResult EvaluateRendering(Term term, VerseRef verseRef)
    {
        var rendering = _termRenderings!.GetRendering(term.Id);
        if (rendering == null || !_termRenderings.HasEntry(term.Id))
            return StatusResult(TermRenderingStatusCode.Missing);

        var hasRendering = rendering.HasRenderingsDefined;

        if (rendering.Denials is { Count: > 0 })
            return StatusResult(TermRenderingStatusCode.Denied, hasRendering: hasRendering);

        if (!hasRendering)
        {
            var noRenderingStatus = rendering.Guess
                ? TermRenderingStatusCode.GuessMissing
                : TermRenderingStatusCode.Missing;
            return StatusResult(noRenderingStatus);
        }

        var (foundInVerse, renderingText) = CheckVerseForRendering(rendering, verseRef);

        if (rendering.Guess)
        {
            var guessStatus = foundInVerse
                ? TermRenderingStatusCode.GuessFound
                : TermRenderingStatusCode.GuessMissing;
            return StatusResult(guessStatus, foundInVerse ? renderingText : null, hasRendering);
        }

        var finalStatus = foundInVerse
            ? TermRenderingStatusCode.Found
            : TermRenderingStatusCode.Missing;
        return StatusResult(finalStatus, foundInVerse ? renderingText : null, hasRendering);
    }

    /// <summary>
    /// Checks whether a rendering text appears in the verse text.
    /// Returns (foundInVerse, renderingText).
    /// </summary>
    private (bool FoundInVerse, string? RenderingText) CheckVerseForRendering(
        TermRendering rendering,
        VerseRef verseRef
    )
    {
        try
        {
            var renderingText = rendering.RenderingsEntries?.FirstOrDefault();
            if (string.IsNullOrEmpty(renderingText) || _trackedScrText == null)
                return (false, renderingText);

            var verseText = _trackedScrText.GetVerseText(verseRef);
            if (string.IsNullOrEmpty(verseText))
                return (false, renderingText);

            var found = verseText.Contains(renderingText, StringComparison.OrdinalIgnoreCase);
            return (found, renderingText);
        }
        catch
        {
            // If we can't read verse text, fall back to not found in verse
            return (false, null);
        }
    }

    /// <summary>
    /// Loads a tracked project from ScrTextCollection and initializes
    /// BiblicalTerms and TermRenderings for it.
    ///
    /// Ported from: PT9 MarbleForm.SetTrackedProject (EXT-026)
    /// </summary>
    private TermRenderingStatusResult LoadTrackedProject(string projectId)
    {
        try
        {
            var scrText = ScrTextCollection
                .ScrTexts(IncludeProjects.ScriptureOnly)
                .FirstOrDefault(st => st.Name == projectId);

            if (scrText == null)
                return ErrorResult("NOT_FOUND", $"Project '{projectId}' not found");

            _trackedScrText = scrText;
            _trackedProjectId = projectId;
            _biblicalTerms = BiblicalTerms.GetProjectBiblicalTerms(scrText);
            _termRenderings = TermRenderings.GetTermRenderings(scrText);

            return OperationResult();
        }
        catch (Exception ex)
        {
            ClearTrackedProject();
            return ErrorResult("INVALID_STATE", $"Failed to load project: {ex.Message}");
        }
    }

    // =====================================================================
    // Result factory helpers
    // =====================================================================

    /// <summary>
    /// Creates a successful status result with the given status code and optional data.
    /// CSS class is derived automatically from the status code.
    /// </summary>
    private static TermRenderingStatusResult StatusResult(
        TermRenderingStatusCode statusCode,
        string? foundRendering = null,
        bool hasRendering = false
    )
    {
        return new TermRenderingStatusResult(
            Success: true,
            StatusCode: statusCode,
            FoundRendering: foundRendering,
            HasRendering: hasRendering,
            CssClass: GetCssClassForStatus(statusCode),
            Error: null
        );
    }

    /// <summary>
    /// Creates a successful operation result (no status code, used for SetTrackedProject).
    /// </summary>
    private static TermRenderingStatusResult OperationResult()
    {
        return new TermRenderingStatusResult(
            Success: true,
            StatusCode: null,
            FoundRendering: null,
            HasRendering: null,
            CssClass: null,
            Error: null
        );
    }

    /// <summary>
    /// Creates an error result with the given code and message.
    /// </summary>
    private static TermRenderingStatusResult ErrorResult(string errorCode, string errorMessage)
    {
        return new TermRenderingStatusResult(
            Success: false,
            StatusCode: null,
            FoundRendering: null,
            HasRendering: null,
            CssClass: null,
            Error: new ErrorInfo(errorCode, errorMessage)
        );
    }
}
