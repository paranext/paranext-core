namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for project naming operations including short name generation,
/// validation, and sanitization.
/// This is a static service for stateless validation and generation operations.
/// </summary>
public static class ProjectNamingService
{
    /// <summary>
    /// Generates a short name abbreviation from a full project name.
    /// Algorithm: First letter of each word + last 2 digits (if any).
    /// Result is 3-8 characters.
    /// </summary>
    /// <param name="request">The generation request containing the full name.</param>
    /// <returns>The generated abbreviation and modification status.</returns>
    public static ShortNameGenerationResult GenerateShortName(ShortNameGenerationRequest request)
    {
        // STUB: This is a TDD stub that throws NotImplementedException.
        // The TDD Implementer agent will replace this with the actual implementation.
        throw new NotImplementedException("CAP-004: GenerateShortName not yet implemented");
    }

    /// <summary>
    /// Validates project names according to Paratext rules.
    /// Validates short name length (3-8), no spaces, no reserved names.
    /// Validates full name is not empty.
    /// </summary>
    /// <param name="request">The validation request containing names and mode.</param>
    /// <returns>Validation result with field-level errors.</returns>
    public static ProjectNameValidationResult ValidateProjectNames(
        ProjectNameValidationRequest request
    )
    {
        // STUB: This is a TDD stub that throws NotImplementedException.
        // The TDD Implementer agent will replace this with the actual implementation.
        throw new NotImplementedException("CAP-005: ValidateProjectNames not yet implemented");
    }

    /// <summary>
    /// Gets the next unused project name by appending incrementing numbers
    /// until a unique name is found.
    /// </summary>
    /// <param name="baseShortName">The base short name to start with.</param>
    /// <param name="baseLongName">The base full name to start with.</param>
    /// <param name="projectExists">Function to check if a project name exists.</param>
    /// <param name="forceNumbered">If true, always append a number even if base is available.</param>
    /// <returns>A tuple containing the unique short name and long name.</returns>
    public static (string ShortName, string LongName) GetNextUnusedProjectName(
        string baseShortName,
        string baseLongName,
        Func<string, bool> projectExists,
        bool forceNumbered = false
    )
    {
        // STUB: This is a TDD stub that throws NotImplementedException.
        // The TDD Implementer agent will replace this with the actual implementation.
        throw new NotImplementedException("CAP-006: GetNextUnusedProjectName not yet implemented");
    }

    /// <summary>
    /// Sanitizes a full name by replacing backslash with forward slash.
    /// Per FB 15254 bug fix.
    /// </summary>
    /// <param name="fullName">The full name to sanitize.</param>
    /// <returns>The sanitized full name.</returns>
    public static string SanitizeFullName(string fullName)
    {
        // STUB: This is a TDD stub that throws NotImplementedException.
        // The TDD Implementer agent will replace this with the actual implementation.
        throw new NotImplementedException("CAP-007: SanitizeFullName not yet implemented");
    }
}
