namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of factory initialization.
/// Source: data-contracts.md Section 4.1 M-001
/// </summary>
public record InitializeResult(
    bool HaveMarbleData,
    string[] AvailableResources,
    string[] AvailableGlossLanguages,
    bool RequiredProjectsMissing,
    string[] MissingRequiredPackages
);
