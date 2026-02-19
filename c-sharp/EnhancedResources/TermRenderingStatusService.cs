// PT9 Provenance: Paratext/Marble/DictionaryTab.cs:1378-1419 (CombineTermStatusCodes)
// Extraction: EXT-051
// Also contains: EXT-001 (CalculateRenderingStatus) -- to be added by CAP-007

namespace Paranext.DataProvider.EnhancedResources;

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
    // === STUB for CAP-007 (TDD RED phase) ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:3060-3163
    // Method: MarbleForm.TermRenderingStatus
    // Maps to: EXT-001, BHV-304, CAP-007
    public static TermRenderingStatus CalculateRenderingStatus(
        BtState? btState,
        ParsedLexicalLink? lexicalLink,
        VerseReference verseRef
    )
    {
        throw new NotImplementedException(
            "CAP-007: CalculateRenderingStatus not yet implemented. "
                + "This stub exists for TDD RED phase compilation."
        );
    }
}
