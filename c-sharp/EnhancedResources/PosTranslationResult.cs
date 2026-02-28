namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Human-readable part-of-speech translation result.
///
/// Contract: Section 3.6 (data-contracts.md)
/// Behavior: BHV-610 (Part-of-Speech Translation System)
///
/// On success: Success=true, Translation contains the human-readable POS string,
/// Components contains the individual POS elements.
///
/// On failure: Success=false, Error contains the error code and message.
/// </summary>
public record PosTranslationResult(
    bool Success,
    string? Translation,
    IReadOnlyList<PosComponent>? Components,
    ErrorInfo? Error
);
