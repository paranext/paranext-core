namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// The full rendering status result for a token, including the status code and supporting data.
/// StatusCode: one of the 12 TermRenderingStatusCode values
/// FoundRenderings: populated for codes 10 (GuessedRendingFound) and 11 (RenderingFound)
/// MissingInVerses: populated for code 8 (RenderingMissingInVerse)
/// TermId: the matched Biblical Term reference, populated for codes 5+
///
/// Contract: data-contracts.md (TermRenderingStatus record)
/// PT9 Source: Paratext/Marble/MarbleForm.cs:3060-3163
/// </summary>
public record TermRenderingStatus(
    TermRenderingStatusCode StatusCode,
    IReadOnlyList<string>? FoundRenderings,
    IReadOnlyList<VerseReference>? MissingInVerses,
    string? TermId
);
