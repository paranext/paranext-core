namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of GetAvailableGlossLanguages: languages where more than 50%
/// of senses have translations.
///
/// Contract: Section 4.17 GetAvailableGlossLanguages (data-contracts.md)
/// Invariant: INV-014, INV-C11 (50% inclusion threshold)
/// Invariant: INV-C18 (Spanish "sp" corrected to "es")
/// </summary>
public record GlossLanguagesResult(
    bool Success,
    IReadOnlyList<GlossLanguageInfo>? Languages = null,
    ErrorInfo? Error = null
);

/// <summary>
/// A single available gloss language with its display name.
/// </summary>
public record GlossLanguageInfo(string Id, string DisplayName);
