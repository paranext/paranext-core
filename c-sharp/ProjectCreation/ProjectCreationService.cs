namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for project creation operations including file naming pattern validation
/// and restore eligibility determination.
/// This is a static service for stateless validation operations.
/// </summary>
/// <remarks>
/// STUB: Created for TDD RED phase. All methods throw NotImplementedException.
/// Implementation will be completed by TDD Implementer agent.
/// </remarks>
public static class ProjectCreationService
{
    /// <summary>
    /// Validates a file naming pattern (prefix/suffix combination).
    /// Returns error message if invalid, or generates example filenames if valid.
    /// </summary>
    /// <param name="request">The validation request containing prefix and suffix.</param>
    /// <returns>Validation result with error or examples.</returns>
    public static FileNamingPatternResult ValidateFileNamingPattern(
        FileNamingPatternRequest request
    )
    {
        // TDD RED: This will cause tests to fail
        throw new NotImplementedException("CAP-017: ValidateFileNamingPattern not yet implemented");
    }

    /// <summary>
    /// Determines whether a file should be selected for restoration based on
    /// the comparison state between source and destination.
    /// </summary>
    /// <param name="request">The eligibility request containing file comparison state.</param>
    /// <returns>Result indicating whether file should be selected and tooltip text.</returns>
    public static RestoreEligibilityResult DetermineRestoreEligibility(
        RestoreEligibilityRequest request
    )
    {
        // TDD RED: This will cause tests to fail
        throw new NotImplementedException(
            "CAP-018: DetermineRestoreEligibility not yet implemented"
        );
    }
}
