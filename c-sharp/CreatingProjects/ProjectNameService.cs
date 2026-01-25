namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for project name validation and generation.
/// Implements EXT-003 (ShortNameValidator) and EXT-004 (ShortNameGenerator).
/// </summary>
public static class ProjectNameService
{
    /// <summary>
    /// Windows reserved filenames that cannot be used as project short names.
    /// </summary>
    public static readonly IReadOnlyList<string> WindowsReservedNames = new[]
    {
        "CON",
        "PRN",
        "AUX",
        "NUL",
        "COM1",
        "COM2",
        "COM3",
        "COM4",
        "COM5",
        "COM6",
        "COM7",
        "COM8",
        "COM9",
        "LPT1",
        "LPT2",
        "LPT3",
        "LPT4",
        "LPT5",
        "LPT6",
        "LPT7",
        "LPT8",
        "LPT9",
    };

    /// <summary>
    /// Validates a project short name against all naming rules.
    /// </summary>
    /// <param name="shortName">Proposed short name</param>
    /// <param name="isNewProject">True if creating new project</param>
    /// <param name="originalName">Original name if editing existing project</param>
    /// <returns>Validation result with error code if invalid</returns>
    /// <remarks>
    /// Implements EXT-003: Short Name Validator
    /// Golden master: gm-003-short-name-validation
    ///
    /// Validation rules (VAL-001 through VAL-005):
    /// 1. Length: 3-8 characters (VAL-001)
    /// 2. Characters: Only A-Za-z0-9_ (VAL-002)
    /// 3. No whitespace (VAL-003)
    /// 4. Not Windows reserved (CON, PRN, AUX, NUL, COM1-9, LPT1-9) (VAL-004)
    /// 5. For new projects: must not exist (VAL-005)
    /// </remarks>
    public static ValidationResult ValidateShortName(
        string shortName,
        bool isNewProject,
        string? originalName = null
    )
    {
        throw new NotImplementedException(
            "EXT-003: ValidateShortName not yet implemented. "
                + "See extraction-plan.md for implementation details."
        );
    }

    /// <summary>
    /// Generates a short name from a full name.
    /// </summary>
    /// <param name="fullName">The full project name</param>
    /// <returns>Generated short name (3-8 characters)</returns>
    /// <remarks>
    /// Implements EXT-004: Short Name Generator
    /// Golden master: gm-004-name-generation
    ///
    /// Algorithm:
    /// 1. Extract first letter of each word (valid chars only)
    /// 2. Extract digits separately (last 2 only)
    /// 3. Combine: letters + digits
    /// 4. Truncate to max 8 chars
    /// 5. Pad to min 3 chars using last valid char
    /// </remarks>
    public static string GenerateShortName(string fullName)
    {
        throw new NotImplementedException(
            "EXT-004: GenerateShortName not yet implemented. "
                + "See extraction-plan.md for implementation details."
        );
    }
}
