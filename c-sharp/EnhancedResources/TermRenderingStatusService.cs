// PT9 Provenance: Paratext/Marble/DictionaryTab.cs:1378-1419 (CombineTermStatusCodes)
// Extraction: EXT-051
// Also contains: EXT-001 (CalculateRenderingStatus) -- added by CAP-007

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Abstraction for Biblical Terms lookup operations used by CalculateRenderingStatus.
/// Enables testability by decoupling from ParatextData concrete classes.
/// In production, implemented by a wrapper around ParatextData APIs.
/// In tests, implemented by simple test doubles.
/// </summary>
// === NEW IN PT10 ===
// Reason: PAPI testability pattern - ParatextData BT APIs cannot be easily mocked
// Maps to: CAP-007
internal interface IBtLookup
{
    /// <summary>
    /// Looks up whether the given dbKey (lemma) exists in the dictionary.
    /// Returns the lemma string if found, null otherwise.
    /// </summary>
    string? GetLemma(string dbKey);

    /// <summary>
    /// Finds a matching Biblical Term for the given lemma at the given verse.
    /// Returns (termId, isAtThisVerse) where:
    /// - termId is the term identifier if found in project (non-null), or null if not in project.
    /// - isAtThisVerse indicates whether the term occurs at this specific verse.
    /// When termId is non-null but isAtThisVerse is false, the term exists elsewhere
    /// in the project but not at this verse.
    /// </summary>
    (string? TermId, bool IsAtThisVerse) GetMatchingTerm(string lemma, VerseReference verseRef);

    /// <summary>
    /// Returns alternate lemma forms for the given dbKey, or null if no dictionary entry.
    /// </summary>
    IReadOnlyList<string>? GetAlternateLemmas(string dbKey);

    /// <summary>
    /// Gets the verse text for the given reference in the tracked project.
    /// Returns null or empty if no text available.
    /// </summary>
    string? GetVerseText(VerseReference verseRef);

    /// <summary>
    /// Gets the rendering status for a term at a specific verse.
    /// Returns (hasRenderings, isDenied, isGuess, foundRendering).
    /// </summary>
    (bool HasRenderings, bool IsDenied, bool IsGuess, string? FoundRendering) GetRenderingStatus(
        string termId,
        VerseReference verseRef
    );
}

/// <summary>
/// Service for rendering status calculation and combination.
/// Contains CombineTermStatusCodes (EXT-051, CAP-008) and
/// CalculateRenderingStatus (EXT-001, CAP-007).
/// </summary>
internal static class TermRenderingStatusService
{
    /// <summary>
    /// Merges a new per-verse status code into the display item's overall FoundStatus.
    /// INV-015: State machine with global override codes and priority rules.
    /// Global override codes (NotTermInProject, NoDictionaryEntry, NoRenderingsEntered,
    /// NoTrackedProject) always replace current status.
    /// </summary>
    /// <param name="currentStatus">The current combined status of the display item.</param>
    /// <param name="newStatus">The new per-verse status to merge in.</param>
    /// <returns>The combined status code after applying state machine rules.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs:1378-1419
    // Method: DictionaryDisplayItem.CombineTermStatusCodes()
    // Maps to: EXT-051, BHV-304, CAP-008
    //
    // EXPLANATION:
    // This state machine merges per-verse rendering status codes into a combined
    // display-item status. The rules are:
    // 1. Global override codes (NotTermInProject, NoDictionaryEntry, NoRenderingsEntered,
    //    NoTrackedProject) always replace the current status immediately.
    // 2. If the current status is NotDefined (initial state), any new status is accepted.
    // 3. RenderingMissingInVerse: if current is Found/Guessed/SomeRenderingsFound, the
    //    result is SomeRenderingsFound; otherwise Missing replaces current.
    // 4. RenderingFound/GuessedRendingFound: if current is NotDefined/Denied/NoVerseText,
    //    the new status replaces current. If current is RenderingMissingInVerse, the result
    //    is SomeRenderingsFound (some verses found, some missing).
    // 5. RenderingDeniedInVerse/NoVerseText/NotInVerse: only replace NotDefined.
    // 6. All other combinations leave the current status unchanged.
    public static TermRenderingStatusCode CombineTermStatusCodes(
        TermRenderingStatusCode currentStatus,
        TermRenderingStatusCode newStatus
    )
    {
        // Global override codes always replace current status
        if (
            newStatus
            is TermRenderingStatusCode.NotTermInProject
                or TermRenderingStatusCode.NoDictionaryEntry
                or TermRenderingStatusCode.NoRenderingsEntered
                or TermRenderingStatusCode.NoTrackedProject
        )
        {
            return newStatus;
        }

        // NotDefined (initial state) accepts any new status
        if (currentStatus == TermRenderingStatusCode.NotDefined)
        {
            return newStatus;
        }

        // RenderingMissingInVerse: combine with existing positive statuses
        if (newStatus == TermRenderingStatusCode.RenderingMissingInVerse)
        {
            if (
                currentStatus
                is TermRenderingStatusCode.RenderingFound
                    or TermRenderingStatusCode.GuessedRendingFound
                    or TermRenderingStatusCode.SomeRenderingsFound
            )
            {
                return TermRenderingStatusCode.SomeRenderingsFound;
            }

            return TermRenderingStatusCode.RenderingMissingInVerse;
        }

        // RenderingFound or GuessedRendingFound: override low-priority current statuses
        if (
            newStatus
            is TermRenderingStatusCode.RenderingFound
                or TermRenderingStatusCode.GuessedRendingFound
        )
        {
            if (
                currentStatus
                is TermRenderingStatusCode.RenderingDeniedInVerse
                    or TermRenderingStatusCode.NoVerseText
            )
            {
                return newStatus;
            }

            // If current is Missing and new is Found/Guessed, some are found some are missing
            if (currentStatus == TermRenderingStatusCode.RenderingMissingInVerse)
            {
                return TermRenderingStatusCode.SomeRenderingsFound;
            }

            return currentStatus;
        }

        // RenderingDeniedInVerse, NoVerseText, NotInVerse: only override NotDefined
        // (already handled above), otherwise keep current
        return currentStatus;
    }

    /// <summary>
    /// Evaluates the rendering status for a token in a given verse.
    /// INV-014: 12 distinct codes evaluated in strict sequential order.
    /// </summary>
    /// <param name="btState">
    /// BT state for the tracked project (TermsList, TermRenderings, Analyzer).
    /// Null means no tracked project is set.
    /// </param>
    /// <param name="lexicalLink">
    /// The parsed lexical link from the token. Null means no link on this token.
    /// </param>
    /// <param name="verseRef">The verse reference for the current context.</param>
    /// <returns>
    /// TermRenderingStatus with the status code and supporting data
    /// (FoundRenderings, MissingInVerses, TermId).
    /// </returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:3060-3163
    // Method: MarbleForm.TermRenderingStatus
    // Maps to: EXT-001, BHV-304, CAP-007
    //
    // EXPLANATION:
    // This algorithm evaluates 12 rendering status codes in strict sequential order.
    // Each step checks a condition and returns early if matched:
    //  1. btState == null -> NoTrackedProject
    //  2. lexicalLink == null or Lemma empty -> NoLink
    //  3. GetLemma(dbKey) returns null -> NoDictionaryEntry
    //  4. GetMatchingTerm returns no term and no alternate -> NotTermInProject
    //     GetMatchingTerm returns foundTermAnywhere but not at this verse -> NotInVerse
    //  5. GetVerseText returns empty -> NoVerseText
    //  6. GetRenderingStatus has no renderings -> NoRenderingsEntered (or Denied)
    //  7-11. Based on rendering match: Missing/Denied/Guessed/Found
    public static TermRenderingStatus CalculateRenderingStatus(
        BtState? btState,
        ParsedLexicalLink? lexicalLink,
        VerseReference verseRef
    )
    {
        // Step 1: No tracked project
        if (btState is null)
            return StatusWithoutTerm(TermRenderingStatusCode.NoTrackedProject);

        // Step 2: No link or empty lemma
        if (lexicalLink is null || string.IsNullOrEmpty(lexicalLink.Lemma))
            return StatusWithoutTerm(TermRenderingStatusCode.NoLink);

        // Get the lookup interface from Analyzer field
        if (btState.Analyzer is not IBtLookup lookup)
            return StatusWithoutTerm(TermRenderingStatusCode.NoDictionaryEntry);

        // Step 3: Check if lemma exists in dictionary
        string dbKey = lexicalLink.Lemma;
        string? lemma = lookup.GetLemma(dbKey);
        if (lemma is null)
            return StatusWithoutTerm(TermRenderingStatusCode.NoDictionaryEntry);

        // Step 4: Find matching Biblical Term (primary, then alternate lemmas)
        var (termId, isAtThisVerse) = ResolveMatchingTerm(lookup, lemma, dbKey, verseRef);

        if (termId is null)
            return StatusWithoutTerm(TermRenderingStatusCode.NotTermInProject);

        if (!isAtThisVerse)
            return StatusWithTerm(TermRenderingStatusCode.NotInVerse, termId);

        // Step 5: Check verse text
        string? verseText = lookup.GetVerseText(verseRef);
        if (string.IsNullOrEmpty(verseText))
            return StatusWithTerm(TermRenderingStatusCode.NoVerseText, termId);

        // Steps 6-11: Check renderings
        return EvaluateRenderingStatus(lookup, termId, verseRef);
    }

    /// <summary>
    /// Creates a TermRenderingStatus for early-exit codes where no term was resolved.
    /// Used for codes 1-4 (NoTrackedProject, NoLink, NoDictionaryEntry, NotTermInProject).
    /// </summary>
    private static TermRenderingStatus StatusWithoutTerm(TermRenderingStatusCode code) =>
        new(code, null, null, null);

    /// <summary>
    /// Creates a TermRenderingStatus for codes where a term was resolved but no renderings data.
    /// Used for codes 5-6 and 8-9 (NotInVerse, NoVerseText, RenderingMissingInVerse, etc.).
    /// </summary>
    private static TermRenderingStatus StatusWithTerm(
        TermRenderingStatusCode code,
        string termId
    ) => new(code, null, null, termId);

    /// <summary>
    /// Resolves the matching Biblical Term for a lemma, trying alternate lemmas if the
    /// primary lookup fails. Returns (termId, isAtThisVerse) where termId is null if
    /// no match is found via either path.
    /// </summary>
    private static (string? TermId, bool IsAtThisVerse) ResolveMatchingTerm(
        IBtLookup lookup,
        string lemma,
        string dbKey,
        VerseReference verseRef
    )
    {
        var (termId, isAtThisVerse) = lookup.GetMatchingTerm(lemma, verseRef);
        if (termId is not null)
            return (termId, isAtThisVerse);

        // Primary lookup failed - try alternate lemmas
        var alternates = lookup.GetAlternateLemmas(dbKey);
        if (alternates is null)
            return (null, false);

        foreach (string alternate in alternates)
        {
            var (altTermId, altIsAtVerse) = lookup.GetMatchingTerm(alternate, verseRef);
            if (altTermId is not null)
                return (altTermId, altIsAtVerse);
        }

        return (null, false);
    }

    /// <summary>
    /// Evaluates rendering status for a term that is confirmed to be at this verse
    /// with non-empty verse text. Handles steps 6-11 of the evaluation pipeline.
    /// </summary>
    private static TermRenderingStatus EvaluateRenderingStatus(
        IBtLookup lookup,
        string termId,
        VerseReference verseRef
    )
    {
        var (hasRenderings, isDenied, isGuess, foundRendering) = lookup.GetRenderingStatus(
            termId,
            verseRef
        );

        if (!hasRenderings)
        {
            return StatusWithTerm(
                isDenied
                    ? TermRenderingStatusCode.RenderingDeniedInVerse
                    : TermRenderingStatusCode.NoRenderingsEntered,
                termId
            );
        }

        // Has renderings - check if found in verse
        if (!string.IsNullOrEmpty(foundRendering))
        {
            return new TermRenderingStatus(
                isGuess
                    ? TermRenderingStatusCode.GuessedRendingFound
                    : TermRenderingStatusCode.RenderingFound,
                [foundRendering],
                null,
                termId
            );
        }

        // Rendering defined but not found in verse
        return StatusWithTerm(
            isDenied
                ? TermRenderingStatusCode.RenderingDeniedInVerse
                : TermRenderingStatusCode.RenderingMissingInVerse,
            termId
        );
    }
}
