namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Event payload for when a new project is successfully created.
/// Maps to data-contracts.md section 5.1.
/// </summary>
public record ProjectCreatedEvent
{
    public required ProjectInfo Project { get; init; }
    public required DateTime Timestamp { get; init; }
}

/// <summary>
/// Event payload for when an interlinear setup is created, updated, or deleted.
/// Maps to data-contracts.md section 5.2.
/// </summary>
public record InterlinearSetupChangedEvent
{
    public required InterlinearSetupInfo Setup { get; init; }
    public required InterlinearSetupAction Action { get; init; }
    public required DateTime Timestamp { get; init; }
}

/// <summary>
/// Action type for interlinear setup change events.
/// </summary>
public enum InterlinearSetupAction
{
    Created,
    Updated,
    Deleted,
}

/// <summary>
/// Event payload for when project registration status changes.
/// Maps to data-contracts.md section 5.3.
/// </summary>
public record RegistrationStatusChangedEvent
{
    public required string ProjectGuid { get; init; }
    public required RegistrationMessageType NewStatus { get; init; }
    public required DateTime Timestamp { get; init; }
}
