using System.Text;
using System.Text.RegularExpressions;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for project naming operations including short name generation,
/// validation, and sanitization.
/// This is a static service for stateless validation and generation operations.
/// </summary>
public static partial class ProjectNamingService
{
    // Short name constraints (VAL-001)
    private const int MinShortNameLength = 3;
    private const int MaxShortNameLength = 8;

    // Padding threshold: only pad results shorter than this to avoid padding 2-letter abbreviations
    // Per golden master GM-UI-001: "X" -> "X__" but "TP" stays "TP"
    private const int PaddingThreshold = 2;

    // Compiled regex patterns for performance
    [GeneratedRegex(@"[\s/\\]+")]
    private static partial Regex WordSeparatorPattern();

    [GeneratedRegex(@"^[a-zA-Z0-9]+$")]
    private static partial Regex AlphanumericPattern();

    /// <summary>
    /// Windows reserved names that cannot be used as project short names.
    /// These names are reserved by Windows for device handles (VAL-003).
    /// </summary>
    internal static readonly HashSet<string> WindowsReservedNames =
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
    /// Generates a short name abbreviation from a full project name.
    /// Algorithm: First letter of each word + last 2 digits (if any).
    /// Result is 3-8 characters.
    /// </summary>
    /// <param name="request">The generation request containing the full name.</param>
    /// <returns>The generated abbreviation and modification status.</returns>
    public static ShortNameGenerationResult GenerateShortName(ShortNameGenerationRequest request)
    {
        string fullName = request.FullName ?? string.Empty;

        // Handle empty input
        if (string.IsNullOrWhiteSpace(fullName))
        {
            return new ShortNameGenerationResult { Abbreviation = "___", WasModified = true };
        }

        // Determine which characters are valid for output
        string validChars = request.ValidChars ?? "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var validCharsSet = new HashSet<char>(validChars.ToUpperInvariant());

        // Extract all digits from the full name
        var allDigits = new StringBuilder();
        foreach (char c in fullName)
        {
            if (char.IsDigit(c))
            {
                allDigits.Append(c);
            }
        }

        // Get last 2 digits (if any)
        string lastTwoDigits =
            allDigits.Length >= 2
                ? allDigits.ToString().Substring(allDigits.Length - 2)
                : allDigits.ToString();

        // Split by whitespace and slashes (/ and \) to get words
        string[] words = WordSeparatorPattern().Split(fullName);

        // Extract first letter of each word (uppercase)
        var abbreviation = new StringBuilder();
        foreach (string word in words)
        {
            if (string.IsNullOrEmpty(word))
                continue;

            // Find the first letter in the word
            foreach (char c in word)
            {
                if (char.IsLetter(c))
                {
                    char upperC = char.ToUpperInvariant(c);
                    if (validCharsSet.Contains(upperC))
                    {
                        abbreviation.Append(upperC);
                    }
                    break;
                }
            }
        }

        // Append digits if they are valid and we have room
        if (lastTwoDigits.Length > 0)
        {
            foreach (char d in lastTwoDigits)
            {
                if (validCharsSet.Contains(d))
                {
                    abbreviation.Append(d);
                }
            }
        }

        string result = abbreviation.ToString();

        // Truncate to max length
        if (result.Length > MaxShortNameLength)
        {
            result = result.Substring(0, MaxShortNameLength);
        }

        // Pad to min length with underscores only if result is below padding threshold
        if (result.Length < PaddingThreshold)
        {
            while (result.Length < MinShortNameLength)
            {
                result += "_";
            }
        }

        bool wasModified = !result.Equals(fullName, StringComparison.Ordinal);

        return new ShortNameGenerationResult { Abbreviation = result, WasModified = wasModified };
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
        string? fullNameError = null;
        string? shortNameError = null;
        List<string>? suggestions = null;

        // Validate full name (VAL-007)
        if (string.IsNullOrWhiteSpace(request.FullName))
        {
            fullNameError = "Full name is required";
        }

        // Validate short name
        string shortName = request.ShortName ?? string.Empty;

        // Check for spaces first (VAL-002) - priority over length because
        // "MY PROJECT" should report "contains spaces" not "too long"
        if (shortName.Contains(' '))
        {
            shortNameError = "Short name cannot contain spaces";
            suggestions = GenerateSuggestions(request.FullName);
        }
        // Check for reserved names (VAL-003)
        else if (WindowsReservedNames.Contains(shortName))
        {
            shortNameError = "Short name cannot be a Windows reserved name";
            suggestions = GenerateSuggestions(request.FullName);
        }
        // Check for valid characters (alphanumeric only)
        else if (!AlphanumericPattern().IsMatch(shortName))
        {
            shortNameError = "Short name can only contain letters and digits";
            suggestions = GenerateSuggestions(request.FullName);
        }
        // Check length (VAL-001)
        else if (shortName.Length < MinShortNameLength)
        {
            shortNameError = $"Short name must be at least {MinShortNameLength} characters";
            suggestions = GenerateSuggestions(request.FullName);
        }
        else if (shortName.Length > MaxShortNameLength)
        {
            shortNameError = $"Short name must be at most {MaxShortNameLength} characters";
            suggestions = GenerateSuggestions(request.FullName);
        }

        bool isValid = fullNameError == null && shortNameError == null;

        return new ProjectNameValidationResult
        {
            IsValid = isValid,
            FullNameError = fullNameError,
            ShortNameError = shortNameError,
            ShortNameSuggestions = suggestions,
        };
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
        // If not forced numbered and base name is available, use it
        if (!forceNumbered && !projectExists(baseShortName))
        {
            return (baseShortName, baseLongName);
        }

        // Otherwise, append incrementing numbers
        int counter = 1;
        while (true)
        {
            string suffix = counter.ToString();

            // Calculate how much room we have for the base name
            int maxBaseLength = MaxShortNameLength - suffix.Length;
            string truncatedBase =
                baseShortName.Length > maxBaseLength
                    ? baseShortName.Substring(0, maxBaseLength)
                    : baseShortName;

            string candidateShort = truncatedBase + suffix;
            string candidateLong = baseLongName + " " + suffix;

            if (!projectExists(candidateShort))
            {
                return (candidateShort, candidateLong);
            }

            counter++;

            // Safety limit to prevent infinite loop
            if (counter > 10000)
            {
                throw new InvalidOperationException(
                    "Could not find an unused project name after 10000 attempts"
                );
            }
        }
    }

    /// <summary>
    /// Sanitizes a full name by replacing backslash with forward slash.
    /// Per FB 15254 bug fix.
    /// </summary>
    /// <param name="fullName">The full name to sanitize.</param>
    /// <returns>The sanitized full name, or null if input is null.</returns>
    public static string? SanitizeFullName(string? fullName)
    {
        return fullName?.Replace('\\', '/');
    }

    /// <summary>
    /// Generates suggestions for valid short names based on the full name.
    /// </summary>
    private static List<string> GenerateSuggestions(string fullName)
    {
        var suggestions = new List<string>();

        if (string.IsNullOrWhiteSpace(fullName))
        {
            return suggestions;
        }

        // Generate a suggestion using the abbreviation algorithm
        var request = new ShortNameGenerationRequest { FullName = fullName };
        var result = GenerateShortName(request);

        if (!string.IsNullOrEmpty(result.Abbreviation))
        {
            suggestions.Add(result.Abbreviation);
        }

        return suggestions;
    }
}
