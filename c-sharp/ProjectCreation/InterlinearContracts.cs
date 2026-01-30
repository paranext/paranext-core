namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Request to save or validate interlinear configuration.
/// Maps to EXT-006, EXT-007.
/// </summary>
public record InterlinearSetupRequest
{
    public required InterlinearTaskType TaskType { get; init; }
    public required string SourceProjectName { get; init; }
    public required string SourceProjectGuid { get; init; }
    public string? ModelTextName { get; init; }
    public string? ModelTextGuid { get; init; }
    public string? DestinationProjectName { get; init; }
    public string? DestinationProjectGuid { get; init; }
    public bool RelatedLanguages { get; init; }
    public string? LanguageId { get; init; }
    public bool OutputGlosses { get; init; }
    public string? ExistingSetupId { get; init; }
}

/// <summary>
/// Result of interlinear setup operation.
/// Maps to EXT-007.
/// </summary>
public record InterlinearSetupResult
{
    public required bool Success { get; init; }
    public InterlinearSetupInfo? Setup { get; init; }
    public InterlinearSetupError? Error { get; init; }

    public static InterlinearSetupResult Succeeded(InterlinearSetupInfo setup) =>
        new() { Success = true, Setup = setup };

    public static InterlinearSetupResult Failed(
        InterlinearErrorCode code,
        string message,
        string? field = null
    ) =>
        new()
        {
            Success = false,
            Error = new InterlinearSetupError
            {
                Code = code,
                Message = message,
                Field = field,
            },
        };
}

/// <summary>
/// Information about an interlinear setup.
/// </summary>
public record InterlinearSetupInfo
{
    public required string Id { get; init; }
    public required InterlinearTaskType TaskType { get; init; }
    public required string SourceProjectName { get; init; }
    public string? DestinationProjectName { get; init; }
    public string? ModelTextName { get; init; }
    public string? LanguageId { get; init; }
}

/// <summary>
/// Interlinear setup error details.
/// </summary>
public record InterlinearSetupError
{
    public required InterlinearErrorCode Code { get; init; }
    public required string Message { get; init; }
    public string? Field { get; init; }
}

/// <summary>
/// Result of interlinear setup validation.
/// Maps to EXT-006.
/// </summary>
public record InterlinearValidationResult
{
    public required bool IsValid { get; init; }
    public string? TaskTypeError { get; init; }
    public string? ModelTextError { get; init; }
    public string? DestinationError { get; init; }
    public string? LanguageError { get; init; }
}
