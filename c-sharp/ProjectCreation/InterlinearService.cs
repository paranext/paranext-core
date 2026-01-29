namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for interlinear setup validation and management.
/// This is a static service for stateless validation operations.
/// Maps to CAP-008, CAP-009, CAP-010, CAP-011.
/// </summary>
public static class InterlinearService
{
    /// <summary>
    /// Validates interlinear setup configuration based on task type.
    /// Validates task type, model text requirements, destination validity, language matching.
    /// Maps to CAP-008, EXT-006.
    /// </summary>
    /// <param name="request">The interlinear setup request to validate.</param>
    /// <returns>Validation result with field-level errors.</returns>
    public static InterlinearValidationResult ValidateSetup(InterlinearSetupRequest request)
    {
        throw new NotImplementedException("CAP-008: ValidateInterlinearSetup - TDD RED phase");
    }

    /// <summary>
    /// Determines if a candidate project is valid as an interlinear destination
    /// for the given task type.
    ///
    /// Rules by task type:
    /// - BackTranslation: destination must be BT type based on source
    /// - Glossing: destination must be Standard/Daughter/Auxiliary
    /// - Adaptation: destination must be Daughter based on source
    ///
    /// Maps to CAP-009, EXT-010.
    /// </summary>
    /// <param name="candidateProjectName">Name of the candidate destination project.</param>
    /// <param name="taskType">The interlinear task type.</param>
    /// <param name="sourceProjectName">Name of the source project.</param>
    /// <param name="modelTextName">Name of the model text (optional).</param>
    /// <param name="currentSetupId">ID of the current setup if editing (optional).</param>
    /// <returns>True if the candidate is a valid destination.</returns>
    public static bool IsValidDestination(
        string candidateProjectName,
        InterlinearTaskType taskType,
        string sourceProjectName,
        string? modelTextName = null,
        string? currentSetupId = null
    )
    {
        throw new NotImplementedException("CAP-009: IsValidDestination - TDD RED phase");
    }

    /// <summary>
    /// Saves interlinear setup configuration.
    /// Handles setup conflicts and assigns setup ID.
    /// Maps to CAP-010, EXT-007.
    /// </summary>
    /// <param name="request">The interlinear setup request to save.</param>
    /// <returns>Result containing the saved setup info or error.</returns>
    public static InterlinearSetupResult SaveSetup(InterlinearSetupRequest request)
    {
        throw new NotImplementedException("CAP-010: SaveInterlinearSetup - TDD RED phase");
    }

    /// <summary>
    /// Gets all interlinear setups for a project.
    /// Maps to CAP-011.
    /// </summary>
    /// <param name="projectName">Name of the project.</param>
    /// <returns>List of interlinear setups for the project.</returns>
    public static IReadOnlyList<InterlinearSetupInfo> GetSetups(string projectName)
    {
        throw new NotImplementedException("CAP-011: GetInterlinearSetups - TDD RED phase");
    }
}
