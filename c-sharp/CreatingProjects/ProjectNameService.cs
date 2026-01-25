using System.Text;

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
    /// Valid characters for project short names.
    /// </summary>
    private static readonly HashSet<char> ValidChars = new HashSet<char>(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_"
    );

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
        // VAL-001: Check for empty first
        if (string.IsNullOrEmpty(shortName))
        {
            return new ValidationResult(false, "ShortName_TooShort");
        }

        // VAL-003: Check for whitespace (check before length and invalid char)
        foreach (char c in shortName)
        {
            if (char.IsWhiteSpace(c))
            {
                return new ValidationResult(false, "ShortName_HasSpace");
            }
        }

        // VAL-002: Check for invalid characters (before length check)
        foreach (char c in shortName)
        {
            if (!ValidChars.Contains(c))
            {
                return new ValidationResult(false, "ShortName_InvalidChar");
            }
        }

        // VAL-001: Length validation (min 3, max 8)
        if (shortName.Length < 3)
        {
            return new ValidationResult(false, "ShortName_TooShort");
        }

        if (shortName.Length > 8)
        {
            return new ValidationResult(false, "ShortName_TooLong");
        }

        // VAL-004: Check for Windows reserved names (case-insensitive)
        if (
            WindowsReservedNames.Any(reserved =>
                reserved.Equals(shortName, StringComparison.OrdinalIgnoreCase)
            )
        )
        {
            return new ValidationResult(false, "ShortName_Reserved");
        }

        // For editing, if the name is unchanged, it's valid
        if (
            !isNewProject
            && originalName != null
            && originalName.Equals(shortName, StringComparison.OrdinalIgnoreCase)
        )
        {
            return new ValidationResult(true);
        }

        // All validations passed
        return new ValidationResult(true);
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
        ArgumentNullException.ThrowIfNull(fullName);

        if (string.IsNullOrWhiteSpace(fullName))
        {
            return "";
        }

        var letters = new StringBuilder();
        var digits = new StringBuilder();
        bool inWord = false;

        foreach (char c in fullName)
        {
            if (ValidChars.Contains(c))
            {
                if (!inWord)
                {
                    // Only add non-digit characters to letters
                    if (!char.IsDigit(c))
                    {
                        letters.Append(c);
                    }
                    inWord = true;
                }
                // Collect all digits separately
                if (char.IsDigit(c))
                {
                    digits.Append(c);
                }
            }
            else
            {
                inWord = false;
            }
        }

        // Keep only last 2 digits
        string digitStr =
            digits.Length > 2 ? digits.ToString().Substring(digits.Length - 2) : digits.ToString();

        // Combine letters and digits
        string abbrev = letters.ToString() + digitStr;

        // Truncate to max 8 characters
        if (abbrev.Length > 8)
        {
            abbrev = abbrev.Substring(0, 8);
        }

        // Pad to min 3 characters using last valid char
        while (abbrev.Length < 3 && abbrev.Length > 0)
        {
            abbrev += abbrev[abbrev.Length - 1];
        }

        return abbrev;
    }
}
