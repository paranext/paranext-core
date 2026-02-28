namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for parsing USX XML content into a structured token stream.
/// Contract: Section 2.6 TokenParsingInput (data-contracts.md)
/// </summary>
public record TokenParsingInput(
    string UsxContent,
    int BookNumber,
    bool IncludeSourceWords,
    string ResourceId
);
