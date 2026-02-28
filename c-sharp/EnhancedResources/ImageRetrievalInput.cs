namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for retrieving image metadata and image data by reference range or image ID.
/// Contract: Section 2.5 ImageRetrievalInput (data-contracts.md)
/// </summary>
public record ImageRetrievalInput(
    string? ImageId,
    string? VerseRef,
    string? Collection,
    string Quality,
    string? LanguageId,
    string? TabType
);
