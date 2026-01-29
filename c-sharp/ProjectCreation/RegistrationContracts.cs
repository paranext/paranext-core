namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Request to check project registration status.
/// Maps to EXT-009.
/// </summary>
public record RegistrationStatusRequest
{
    public string? ProjectGuid { get; init; }
    public string? ProjectName { get; init; }
    public ProjectType? ProjectType { get; init; }
    public string? BaseProjectName { get; init; }
    public string? BaseProjectGuid { get; init; }
    public bool AllowDerivedProjectRegistration { get; init; }
}

/// <summary>
/// Result of registration status check.
/// Maps to EXT-009.
/// </summary>
public record RegistrationStatusResult
{
    public required RegistrationMessageType MessageType { get; init; }
    public required string MessageText { get; init; }
    public bool ShowManageLink { get; init; }
    public bool ShowRegisterButton { get; init; }
    public bool ShowOfflineCheckbox { get; init; }
    public string? VisibilityNote { get; init; }
    public bool BlocksCreation { get; init; }
}

/// <summary>
/// Request to determine restore file eligibility.
/// Maps to EXT-008.
/// </summary>
public record RestoreEligibilityRequest
{
    public required FileComparisonState ComparisonState { get; init; }
}

/// <summary>
/// Result of restore eligibility check.
/// Maps to EXT-008.
/// </summary>
public record RestoreEligibilityResult
{
    public required bool DefaultSelected { get; init; }
    public required string Tooltip { get; init; }
}

/// <summary>
/// Result of user change evaluation.
/// </summary>
public record UserChangeResult
{
    public required bool RequiresCommit { get; init; }
    public required bool ShowConfirmation { get; init; }
    public required int AffectedProjectCount { get; init; }
    public string? ConfirmationMessage { get; init; }
}
