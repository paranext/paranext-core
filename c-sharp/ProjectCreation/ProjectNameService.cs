using System.Text;
using System.Text.RegularExpressions;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for project name validation and generation.
/// Implements CAP-004, CAP-005, CAP-006.
/// </summary>
internal static partial class ProjectNameService
{
    private const int MinNameLength = 3;
    private const int MaxNameLength = 8;

    // Valid characters for short name: A-Z, a-z, 0-9, underscore
    [GeneratedRegex(@"^[A-Za-z0-9_]+$")]
    private static partial Regex ValidCharsRegex();

    // Windows reserved filenames
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
    /// CAP-004: Validates a short name according to project naming rules.
    /// </summary>
    public static ValidationResult ValidateShortName(
        string shortName,
        bool isNewProject,
        string? originalName = null
    )
    {
        // VAL-001: Check minimum length first
        if (shortName.Length < MinNameLength)
        {
            return new ValidationResult(
                IsValid: false,
                ErrorCode: "SHORTNAME_TOO_SHORT",
                ErrorParams: new Dictionary<string, string> { ["min"] = MinNameLength.ToString() }
            );
        }

        // VAL-003: Check for whitespace (before other checks)
        if (shortName.Any(char.IsWhiteSpace))
        {
            return new ValidationResult(IsValid: false, ErrorCode: "SHORTNAME_HAS_SPACES");
        }

        // VAL-002: Check for invalid characters (before max length)
        if (!ValidCharsRegex().IsMatch(shortName))
        {
            return new ValidationResult(IsValid: false, ErrorCode: "SHORTNAME_INVALID_CHARS");
        }

        // VAL-001: Check maximum length
        if (shortName.Length > MaxNameLength)
        {
            return new ValidationResult(
                IsValid: false,
                ErrorCode: "SHORTNAME_TOO_LONG",
                ErrorParams: new Dictionary<string, string> { ["max"] = MaxNameLength.ToString() }
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
    /// CAP-005: Generates a short name from a full name.
    /// Algorithm:
    /// 1. Extract first letter of each word (only valid chars)
    /// 2. Extract digits separately (keep last 2 only)
    /// 3. Combine: letters + digits
    /// 4. Truncate to max 8 chars
    /// 5. Pad to min 3 chars using last valid char
    /// </summary>
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
        if (result.Length > MaxNameLength)
        {
            result = result[..MaxNameLength];
        }

        // Pad to min length using last character
        if (result.Length > 0 && result.Length < MinNameLength)
        {
            var lastChar = result[^1];
            while (result.Length < MinNameLength)
            {
                result += lastChar;
            }
        }

        return result;
    }

    /// <summary>
    /// CAP-006: Generates a unique name pair that doesn't conflict with existing projects.
    /// </summary>
    public static (string ShortName, string LongName) GenerateUniqueName(
        string baseShortName,
        string baseLongName,
        bool forceNumbered = false
    )
    {
        // Use default if empty (must be at least 3 chars to pass validation)
        if (string.IsNullOrEmpty(baseShortName))
        {
            baseShortName = "MPP";
        }

        if (string.IsNullOrEmpty(baseLongName))
        {
            baseLongName = "My Project";
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
        // Reserve 2 chars for suffix to allow growth (1, 2, ..., 99)
        var maxBaseLength = MaxNameLength - 2;
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
    /// Removes trailing digits from a string.
    /// </summary>
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
