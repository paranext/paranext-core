namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Result of text collection creation (BHV-500, BHV-501).
/// Represents a discriminated union: success, error, or fallback.
/// </summary>
public record TextCollectionCreateResult
{
    public bool Success { get; init; }
    public string? WindowId { get; init; }
    public bool Reused { get; init; }
    public IList<TextCollectionItem>? Items { get; init; }
    public TextCollectionError? Error { get; init; }
    public bool Fallback { get; init; }
    public string? FallbackWindowType { get; init; }
    public string? FallbackProjectId { get; init; }
}

/// <summary>
/// Structured error for Text Collection API failures.
/// </summary>
public record TextCollectionError(
    string Code,
    string Message,
    IDictionary<string, object>? Details = null
);

/// <summary>
/// Error codes for Text Collection API.
/// </summary>
public static class TextCollectionErrorCodes
{
    public const string NotInitialized = "NOT_INITIALIZED";
    public const string ProjectNotFound = "PROJECT_NOT_FOUND";
    public const string InvalidState = "INVALID_STATE";
    public const string InsufficientTexts = "INSUFFICIENT_TEXTS";
    public const string IneligibleText = "INELIGIBLE_TEXT";
    public const string PermissionDenied = "PERMISSION_DENIED";
    public const string CollectionNotFound = "COLLECTION_NOT_FOUND";
    public const string DuplicateCollectionName = "DUPLICATE_COLLECTION_NAME";
    public const string MementoCorrupt = "MEMENTO_CORRUPT";
}
