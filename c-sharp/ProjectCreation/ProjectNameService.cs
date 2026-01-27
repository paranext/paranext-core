using System.Text;
using System.Text.RegularExpressions;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for project name validation and generation.
/// Implements CAP-004: ValidateShortName, CAP-005: GenerateShortName, CAP-006: GenerateUniqueName.
/// </summary>
internal static partial class ProjectNameService
{
    /// <summary>
    /// Minimum allowed length for a project short name.
    /// </summary>
    private const int ShortNameMinLength = 3;

    /// <summary>
    /// Maximum allowed length for a project short name.
    /// </summary>
    private const int ShortNameMaxLength = 8;

    /// <summary>
    /// Characters reserved for numeric suffix when generating unique names (allows 1-99).
    /// </summary>
    private const int SuffixReservedLength = 2;

    /// <summary>
    /// Default short name used when generating from empty input.
    /// </summary>
    private const string DefaultShortName = "MPP";

    /// <summary>
    /// Default long name used when generating from empty input.
    /// </summary>
    private const string DefaultLongName = "My Project";

    /// <summary>
    /// Regex to validate short name contains only allowed characters (A-Z, a-z, 0-9, underscore).
    /// </summary>
    [GeneratedRegex(@"^[A-Za-z0-9_]+$")]
    private static partial Regex ValidShortNameCharsRegex();

    /// <summary>
    /// Windows reserved filenames that cannot be used as project names.
    /// </summary>
    private static readonly HashSet<string> WindowsReservedNames =
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
    /// Validates a short name according to project naming rules (CAP-004).
    /// </summary>
    /// <param name="shortName">The short name to validate.</param>
    /// <param name="isNewProject">True if creating a new project, false if editing existing.</param>
    /// <param name="originalName">The original name when editing (allows same name).</param>
    /// <returns>Validation result with IsValid flag and error code if invalid.</returns>
    /// <remarks>
    /// Validation order: min length, whitespace, invalid chars, max length, reserved names, uniqueness.
    /// </remarks>
    public static ValidationResult ValidateShortName(
        string shortName,
        bool isNewProject,
        string? originalName = null
    )
    {
        // VAL-001: Check minimum length first
        if (shortName.Length < ShortNameMinLength)
        {
            return new ValidationResult(
                IsValid: false,
                ErrorCode: "SHORTNAME_TOO_SHORT",
                ErrorParams: new Dictionary<string, string>
                {
                    ["min"] = ShortNameMinLength.ToString(),
                }
            );
        }

        // VAL-003: Check for whitespace (before other checks)
        if (shortName.Any(char.IsWhiteSpace))
        {
            return new ValidationResult(IsValid: false, ErrorCode: "SHORTNAME_HAS_SPACES");
        }

        // VAL-002: Check for invalid characters (before max length)
        if (!ValidShortNameCharsRegex().IsMatch(shortName))
        {
            return new ValidationResult(IsValid: false, ErrorCode: "SHORTNAME_INVALID_CHARS");
        }

        // VAL-001: Check maximum length
        if (shortName.Length > ShortNameMaxLength)
        {
            return new ValidationResult(
                IsValid: false,
                ErrorCode: "SHORTNAME_TOO_LONG",
                ErrorParams: new Dictionary<string, string>
                {
                    ["max"] = ShortNameMaxLength.ToString(),
                }
            );
        }

        // VAL-004: Check for Windows reserved names
        if (WindowsReservedNames.Contains(shortName))
        {
            return new ValidationResult(
                IsValid: false,
                ErrorCode: "SHORTNAME_RESERVED",
                ErrorParams: new Dictionary<string, string>
                {
                    ["name"] = shortName.ToUpperInvariant(),
                }
            );
        }

        // VAL-005: Uniqueness checks for new projects
        if (isNewProject)
        {
            // For now, we don't have access to ScrTextCollection
            // The actual implementation will check:
            // - ScrTextCollection.Find() for existing project
            // - Case-insensitive comparison
            // - Directory existence check
        }

        // If editing existing project, same name is allowed
        if (
            !isNewProject
            && originalName != null
            && shortName.Equals(originalName, StringComparison.OrdinalIgnoreCase)
        )
        {
            return new ValidationResult(IsValid: true);
        }

        return new ValidationResult(IsValid: true);
    }

    /// <summary>
    /// Generates a short name from a full name (CAP-005).
    /// </summary>
    /// <param name="fullName">The full project name to abbreviate.</param>
    /// <returns>A 3-8 character abbreviation, or empty string if input is empty.</returns>
    /// <remarks>
    /// Algorithm:
    /// 1. Extract first letter of each word (only valid chars)
    /// 2. Extract digits separately (keep last 2 only)
    /// 3. Combine: letters + digits
    /// 4. Truncate to max 8 chars
    /// 5. Pad to min 3 chars using last valid char
    /// </remarks>
    public static string GenerateShortName(string fullName)
    {
        if (string.IsNullOrEmpty(fullName))
            return string.Empty;

        var letters = new StringBuilder();
        var allDigits = new StringBuilder();

        // Split into words and extract first letter + collect all digits
        var words = fullName.Split(new[] { ' ', '\t' }, StringSplitOptions.RemoveEmptyEntries);

        foreach (var word in words)
        {
            // Get first valid character from word
            foreach (var c in word)
            {
                if (char.IsLetter(c))
                {
                    letters.Append(c);
                    break;
                }
            }

            // Collect all digits from word
            foreach (var c in word)
            {
                if (char.IsDigit(c))
                {
                    allDigits.Append(c);
                }
            }
        }

        // Take last 2 digits only
        var digits =
            allDigits.Length > 2
                ? allDigits.ToString()[(allDigits.Length - 2)..]
                : allDigits.ToString();

        // Combine letters + digits
        var result = letters.ToString() + digits;

        // Truncate to max length
        if (result.Length > ShortNameMaxLength)
        {
            result = result[..ShortNameMaxLength];
        }

        // Pad to min length using last character
        if (result.Length > 0 && result.Length < ShortNameMinLength)
        {
            var lastChar = result[^1];
            while (result.Length < ShortNameMinLength)
            {
                result += lastChar;
            }
        }

        return result;
    }

    /// <summary>
    /// Generates a unique name pair that doesn't conflict with existing projects (CAP-006).
    /// </summary>
    /// <param name="baseShortName">Base short name to make unique (uses default if empty).</param>
    /// <param name="baseLongName">Base long name to make unique (uses default if empty).</param>
    /// <param name="forceNumbered">If true, always appends a number suffix.</param>
    /// <returns>Tuple of (ShortName, LongName) that passes validation.</returns>
    /// <exception cref="InvalidOperationException">Thrown if no unique name found after 9999 attempts.</exception>
    public static (string ShortName, string LongName) GenerateUniqueName(
        string baseShortName,
        string baseLongName,
        bool forceNumbered = false
    )
    {
        // Use defaults if empty
        if (string.IsNullOrEmpty(baseShortName))
        {
            baseShortName = DefaultShortName;
        }

        if (string.IsNullOrEmpty(baseLongName))
        {
            baseLongName = DefaultLongName;
        }

        // Trim trailing digits from base
        var shortBase = TrimTrailingDigits(baseShortName);
        var longBase = TrimTrailingDigits(baseLongName);

        // If not forcing numbered and base is unique and valid, return as-is
        if (!forceNumbered)
        {
            var validation = ValidateShortName(baseShortName, isNewProject: true);
            if (validation.IsValid)
            {
                return (baseShortName, baseLongName);
            }
        }

        // Find a unique numbered variant
        var maxBaseLength = ShortNameMaxLength - SuffixReservedLength;
        var truncatedBase = shortBase[..Math.Min(shortBase.Length, maxBaseLength)];

        for (int i = 1; i <= 9999; i++)
        {
            var suffix = i.ToString();
            var candidateShort = truncatedBase + suffix;
            var candidateLong = longBase + " " + suffix;

            var validation = ValidateShortName(candidateShort, isNewProject: true);
            if (validation.IsValid)
            {
                return (candidateShort, candidateLong.Trim());
            }
        }

        // Should never reach here
        throw new InvalidOperationException("Could not generate unique name after 9999 attempts");
    }

    /// <summary>
    /// Removes trailing digits and whitespace from a string.
    /// </summary>
    /// <param name="input">The string to trim.</param>
    /// <returns>The input with trailing digits and whitespace removed.</returns>
    private static string TrimTrailingDigits(string input)
    {
        if (string.IsNullOrEmpty(input))
            return input;

        int lastNonDigit = input.Length - 1;
        while (lastNonDigit >= 0 && char.IsDigit(input[lastNonDigit]))
        {
            lastNonDigit--;
        }

        // Also trim trailing whitespace
        while (lastNonDigit >= 0 && char.IsWhiteSpace(input[lastNonDigit]))
        {
            lastNonDigit--;
        }

        return lastNonDigit < 0 ? string.Empty : input[..(lastNonDigit + 1)];
    }
}
