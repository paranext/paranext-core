namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for retrieving encyclopedia entries with three-level language fallback.
///
/// Contract: Section 2.4 EncyclopediaLookupInput (data-contracts.md)
/// Validation: Language fallback order: (1) resourceLanguageId, (2) uiLanguageId, (3) "en" (INV-019)
/// </summary>
public record EncyclopediaLookupInput(
    string EntryId,
    string ResourceLanguageId,
    string UiLanguageId
);
