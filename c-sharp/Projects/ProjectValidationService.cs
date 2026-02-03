// === PORTED FROM PT9 ===
// Source: PT9/ParatextBase/ParatextUtils.cs:164-204
// Method: ValidateShortName()
// Maps to: CAP-002, EXT-002, VAL-001, gm-001

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Service for validating project names and settings.
/// </summary>
internal static class ProjectValidationService
{
    // Windows reserved file names (case-insensitive)
    private static readonly HashSet<string> ReservedFileNames =
        new(StringComparer.OrdinalIgnoreCase)
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
    /// Validates a project short name against VAL-001 rules.
    /// </summary>
    /// <param name="request">The validation request containing the short name</param>
    /// <returns>Validation result with error message if invalid</returns>
    // EXPLANATION:
    // This algorithm validates project short names with these rules (VAL-001):
    // 1. Length must be 3-8 characters
    // 2. Can only contain letters A-Z (case-insensitive), digits 0-9, and underscores
    // 3. Cannot contain spaces (special error message)
    // 4. Cannot be a Windows reserved filename (CON, PRN, AUX, NUL, COM1-9, LPT1-9)
    // The validation order matters for error message selection.
    public static ValidationResult ValidateShortName(ShortNameValidationRequest request)
    {
        var name = request.Name;

        // Handle null/empty
        if (string.IsNullOrEmpty(name))
        {
            return ValidationResult.Failure(
                "Short name must not be less than 3 or more than 8 characters in length",
                "Strings.ProjectNameFormTooShort"
            );
        }

        // Check length (3-8 characters)
        if (
            name.Length < ProjectCreationConstants.MinShortNameLength
            || name.Length > ProjectCreationConstants.MaxShortNameLength
        )
        {
            return ValidationResult.Failure(
                "Short name must not be less than 3 or more than 8 characters in length",
                "Strings.ProjectNameFormTooShort"
            );
        }

        // Check for spaces first (specific error message)
        if (name.Contains(' '))
        {
            return ValidationResult.Failure(
                "Short name must not contain spaces",
                "Strings.ProjectNameFormContainsSpaces"
            );
        }

        // Check for invalid characters
        foreach (char c in name)
        {
            if (!ProjectCreationConstants.ProjectNameValidChars.Contains(c))
            {
                return ValidationResult.Failure(
                    "Short name can only contain letters A-Z, digits 0-9, and underscores.",
                    "Strings.ProjectNameFormMustBeValidChar"
                );
            }
        }

        // Check for Windows reserved names
        if (ReservedFileNames.Contains(name))
        {
            return ValidationResult.Failure(
                "Project Short Name is a reserved file name on Windows and cannot be used.",
                "Strings.ProjectNameFormReservedName"
            );
        }

        return ValidationResult.Success();
    }
}
