// === STUB: TextCollectionService ===
// TDD Phase: RED (stub for test compilation only)
// All methods throw NotImplementedException.
// The TDD Implementer will replace these with real implementations.
//
// === PORTED FROM PT9 ===
// Source: PT9/Paratext/TextCollectionForm.cs:364-380
// Extraction: EXT-003
// Behaviors: BHV-T006, VAL-009

namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Stateless service for Text Collection operations.
/// </summary>
internal static class TextCollectionService
{
    /// <summary>
    /// Filters texts for TC eligibility. Rejects MarbleResource, Dictionary,
    /// XmlResource, StudyBibleAdditions, and NoteType projects.
    /// </summary>
    /// <param name="projectIds">List of project GUIDs to filter.</param>
    /// <returns>TextFilterResult separating accepted from rejected texts.</returns>
    public static TextFilterResult FilterEligibleTexts(IList<string> projectIds)
    {
        // RED PHASE: This method intentionally throws NotImplementedException.
        // The TDD Implementer will provide the real implementation.
        throw new NotImplementedException(
            "FilterEligibleTexts not yet implemented (TDD RED phase)"
        );
    }
}
