// PT9 Provenance: Paratext/Marble/MarbleForm.cs:3060-3163 (TermRenderingStatus enum values)
// Extraction: EXT-001, EXT-051
// INV-014: Rendering Status Has 12 Distinct Codes

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// The 12-code enum representing rendering status of a Biblical Term in an Enhanced Resource token.
/// NotDefined (0) is the initial/default state. Codes 1-12 represent progressively more specific
/// evaluation outcomes. SomeRenderingsFound (12) is only produced by the CombineTermStatusCodes
/// state machine, never by single-token evaluation.
/// </summary>
public enum TermRenderingStatusCode
{
    NotDefined = 0,
    NoTrackedProject = 1,
    NoLink = 2,
    NoDictionaryEntry = 3,
    NotTermInProject = 4,
    NotInVerse = 5,
    NoVerseText = 6,
    NoRenderingsEntered = 7,
    RenderingMissingInVerse = 8,
    RenderingDeniedInVerse = 9,
    GuessedRendingFound = 10,
    RenderingFound = 11,
    SomeRenderingsFound = 12,
}
