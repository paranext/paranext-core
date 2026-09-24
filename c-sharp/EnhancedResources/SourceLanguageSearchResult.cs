using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of source language search pipeline.
/// VAL-009: If results exceed ShowInContextLimit, ExceedsLimit is true
/// and the UI prompts the user before showing in context.
/// Only triggered from SOURCELANG_TAB (not PTLiveRestriction).
/// Source: EXT-070-077, BHV-451, VAL-009
/// </summary>
public record SourceLanguageSearchResult(
    IList<LemmaSearchResult> Results,
    int TotalOccurrences,
    bool ExceedsLimit,
    string? ErrorMessage
);

public record LemmaSearchResult(
    string Lemma,
    string Translit,
    string StrongNumber,
    int OccurrenceCount,
    IList<VerseRef> Occurrences,
    string Gloss,
    string PartOfSpeech
);
